/**
 * @file      FaqHub.tsx
 * @summary   Pagina /faq (e /en/faq): l'indice unico delle domande a cui BAB risponde.
 *            Due parti. In alto le domande su BAB, con risposta per esteso e ancora
 *            propria (/faq#id). Sotto, tutte le domande degli articoli: qui NON si
 *            ripete la risposta — si linka la sua ancora esatta nell'articolo che la
 *            contiene, così la risposta ha un solo indirizzo canonico e la pagina
 *            resta una mappa, non un duplicato.
 * @author    Sajid Hossain <sajid.hossain2009@gmail.com>
 * @copyright (c) 2026 Breaking All Barriers. Tutti i diritti riservati.
 */
import { FAQ_BAB } from '../data/faqBab';
import { blogPath } from '../lib/blogLocale';
import faqData from '../generated/blog-faq.json';

interface FaqHubProps {
  /** Lingua imposta dall'URL (/faq → it, /en/faq → en). */
  lang?: string;
}

interface FaqEntry {
  slug: string;
  lang: string;
  title: string;
  date: string | null;
  questions: { q: string; id?: string }[];
}

/**
 * Domande del blog raggruppate per articolo, nella lingua richiesta.
 * Legge blog-faq.json (solo domanda + ancora, mai le risposte): questa pagina
 * è una mappa, e così non trascina nel bundle i corpi degli articoli.
 * Stessa semantica di postsForLang: lingua preferita con fallback IT,
 * ordinamento per data decrescente.
 */
function blogQuestions(lang: string) {
  const bySlug = new Map<string, FaqEntry>();
  for (const p of (faqData as { posts: FaqEntry[] }).posts) {
    const cur = bySlug.get(p.slug);
    if (!cur || (p.lang === lang && cur.lang !== lang)) bySlug.set(p.slug, p);
  }
  return [...bySlug.values()]
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
    .map((p) => ({ slug: p.slug, title: p.title, questions: p.questions }));
}

export default function FaqHub({ lang: langProp }: FaqHubProps = {}) {
  const lang = langProp === 'en' ? 'en' : 'it';
  const isEn = lang === 'en';
  const groups = blogQuestions(lang);
  const total = groups.reduce((n, g) => n + g.questions.length, 0) + FAQ_BAB.length;

  return (
    <article className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <a
        href={blogPath(lang)}
        className="inline-flex items-center gap-2 font-bold uppercase text-xs tracking-wide text-vividteal hover:underline focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#34BBC0] mb-8"
      >
        <span aria-hidden="true">←</span> {isEn ? 'Back to the blog' : 'Torna al blog'}
      </a>

      <header className="mb-10">
        <h1 className="font-['Bricolage_Grotesque',_sans-serif] text-3xl sm:text-5xl font-black tracking-tight leading-[1.05] mb-4">
          {isEn ? 'Questions and answers about young female athletes' : 'Domande e risposte sulle giovani atlete'}
        </h1>
        <p className="text-[17px] leading-relaxed text-[#0F0F12]/80">
          {isEn
            ? `All ${total} questions BAB answers, in one place: first the ones about the project, then every question covered by the articles — each linking straight to its answer, with its source. Every health claim on this site carries a peer-reviewed reference and states the population it was measured in.`
            : `Tutte le ${total} domande a cui BAB risponde, in un posto solo: prima quelle sul progetto, poi ogni domanda coperta dagli articoli — ciascuna con il link diretto alla sua risposta e alla sua fonte. Ogni affermazione di salute su questo sito ha un riferimento peer-reviewed e dichiara la popolazione in cui è stata misurata.`}
        </p>
      </header>

      {/* Parte 1 — le domande su BAB, con risposta completa in pagina */}
      <section className="blog-faq mb-14" aria-labelledby="faq-bab">
        <h2
          id="faq-bab"
          className="font-['Bricolage_Grotesque',_sans-serif] text-2xl sm:text-3xl font-black tracking-tight mb-6"
        >
          {isEn ? 'About BAB' : 'Su BAB'}
        </h2>
        <dl className="flex flex-col gap-6">
          {FAQ_BAB.map((f) => (
            <div key={f.id} id={f.id} className="scroll-mt-24">
              <dt className="font-['Space_Grotesk',_sans-serif] font-bold text-[17px] text-[#0F0F12] mb-1.5">
                {isEn ? f.qEn : f.q}
              </dt>
              <dd className="font-['Space_Grotesk',_sans-serif] text-[#0F0F12]/80 leading-relaxed">
                {isEn ? f.aEn : f.a}
                <a
                  href={`#${f.id}`}
                  aria-label={isEn ? 'Link to this answer' : 'Link a questa risposta'}
                  className="ml-2 text-vividteal font-black no-underline hover:underline focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#34BBC0]"
                >
                  #
                </a>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Parte 2 — mappa delle domande del blog: solo link alle ancore, mai la risposta duplicata */}
      <section aria-labelledby="faq-blog">
        <h2
          id="faq-blog"
          className="font-['Bricolage_Grotesque',_sans-serif] text-2xl sm:text-3xl font-black tracking-tight mb-2"
        >
          {isEn ? 'Every question, by topic' : 'Tutte le domande, per argomento'}
        </h2>
        <p className="text-[15px] leading-relaxed text-[#0F0F12]/70 mb-8">
          {isEn
            ? 'Each question opens the exact answer inside the article that covers it, sources included.'
            : 'Ogni domanda apre la risposta esatta dentro l’articolo che la tratta, fonti comprese.'}
        </p>

        <div className="flex flex-col gap-8">
          {groups.map((g) => (
            <div key={g.slug} className="border-[3px] border-black bg-white p-5 shadow-[6px_6px_0_0_#0F0F12]">
              <h3 className="font-['Bricolage_Grotesque',_sans-serif] text-lg font-black tracking-tight mb-3">
                <a
                  href={blogPath(lang, g.slug)}
                  className="hover:underline focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#34BBC0]"
                >
                  {g.title}
                </a>
              </h3>
              <ul className="flex flex-col gap-1.5 list-none">
                {g.questions.map((q, i) => (
                  <li key={q.id ?? i}>
                    <a
                      href={q.id ? `${blogPath(lang, g.slug)}#${q.id}` : blogPath(lang, g.slug)}
                      className="text-[15px] text-vividteal font-bold hover:underline focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#34BBC0]"
                    >
                      {q.q}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <p className="mt-14 border-t-[3px] border-black pt-6 text-[15px] leading-relaxed text-[#0F0F12]/70">
        {isEn
          ? 'These answers are educational and are not medical advice or a clinical assessment. For a symptom that persists, speak to a healthcare professional.'
          : 'Queste risposte hanno finalità educative e non costituiscono parere medico né una valutazione clinica. Per un sintomo che persiste, rivolgersi a un professionista sanitario.'}
      </p>
    </article>
  );
}

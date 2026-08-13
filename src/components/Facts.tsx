/**
 * @file      Facts.tsx
 * @summary   Pagina /dati (e /en/dati): i numeri di BAB, uno per riga, ognuno con la
 *            popolazione in cui è stato misurato, la fonte con DOI e un'ancora propria
 *            (/dati#{id}). È la pagina pensata per le domande che iniziano con «quante»
 *            e «quanto»: chi cita un dato di qui si porta dietro anche il suo limite.
 * @author    Sajid Hossain <sajid.hossain2009@gmail.com>
 * @copyright (c) 2026 Breaking All Barriers. Tutti i diritti riservati.
 */
import { FACTS } from '../data/facts';
import { blogPath } from '../lib/blogLocale';
import { postsForLang } from './Blog';

interface FactsProps {
  /** Lingua imposta dall'URL (/dati → it, /en/dati → en). */
  lang?: string;
}

export default function Facts({ lang: langProp }: FactsProps = {}) {
  const lang = langProp === 'en' ? 'en' : 'it';
  const isEn = lang === 'en';
  const titles = new Map(postsForLang(lang).map((p) => [p.slug, p.title]));

  // Raggruppati per articolo di provenienza: il dato resta accanto al testo che lo
  // spiega, e chi arriva da una ricerca numerica trova subito dove approfondire.
  const groups: { slug: string; title: string; facts: typeof FACTS }[] = [];
  for (const f of FACTS) {
    const last = groups[groups.length - 1];
    if (last && last.slug === f.article) last.facts.push(f);
    else groups.push({ slug: f.article, title: titles.get(f.article) ?? f.article, facts: [f] });
  }

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
          {isEn
            ? 'The numbers on young female athletes’ health'
            : 'I numeri sulla salute delle giovani atlete'}
        </h1>
        <p className="text-[17px] leading-relaxed text-[#0F0F12]/80">
          {isEn
            ? `${FACTS.length} figures, each with the population it was measured in and the source that produced it. Where a study was run on adults, on male athletes or with wide confidence intervals, it says so in the same sentence: a number without its population is not a fact, it is a slogan.`
            : `${FACTS.length} dati, ognuno con la popolazione in cui è stato misurato e la fonte che l’ha prodotto. Dove lo studio è su adulte, su atleti maschi o con intervalli di confidenza ampi, è scritto nella stessa frase: un numero senza la sua popolazione non è un dato, è uno slogan.`}
        </p>
      </header>

      <div className="flex flex-col gap-10">
        {groups.map((g) => (
          <section key={g.slug} aria-labelledby={`group-${g.slug}`}>
            <h2
              id={`group-${g.slug}`}
              className="font-['Bricolage_Grotesque',_sans-serif] text-xl sm:text-2xl font-black tracking-tight mb-4"
            >
              <a
                href={blogPath(lang, g.slug)}
                className="hover:underline focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#34BBC0]"
              >
                {g.title}
              </a>
            </h2>
            <ul className="flex flex-col gap-4 list-none">
              {g.facts.map((f) => (
                <li
                  key={f.id}
                  id={f.id}
                  className="scroll-mt-24 border-[3px] border-black bg-white p-5 shadow-[6px_6px_0_0_#0F0F12]"
                >
                  <p className="text-[16px] leading-relaxed text-[#0F0F12]">{isEn ? f.claimEn : f.claim}</p>
                  <p className="mt-3 text-[13px] font-bold uppercase tracking-wide text-[#0F0F12]/60">
                    {isEn ? 'Source' : 'Fonte'}:{' '}
                    {f.doi ? (
                      <a
                        href={`https://doi.org/${f.doi}`}
                        rel="noopener noreferrer nofollow"
                        target="_blank"
                        className="text-vividteal hover:underline focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#34BBC0]"
                      >
                        {f.source} ↗
                      </a>
                    ) : (
                      <span>{f.source}</span>
                    )}
                    <a
                      href={`#${f.id}`}
                      aria-label={isEn ? 'Link to this figure' : 'Link a questo dato'}
                      className="ml-2 text-vividteal font-black no-underline hover:underline focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#34BBC0]"
                    >
                      #
                    </a>
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <p className="mt-14 border-t-[3px] border-black pt-6 text-[15px] leading-relaxed text-[#0F0F12]/70">
        {isEn
          ? 'These figures are educational and are not medical advice. Most of the studies cited are observational: they describe associations, not proven cause and effect. Where possible, cite the primary source with its DOI.'
          : 'Questi dati hanno finalità educative e non costituiscono parere medico. Gran parte degli studi citati è osservazionale: descrive associazioni, non rapporti di causa-effetto dimostrati. Quando possibile, citare la fonte primaria con il suo DOI.'}
      </p>
    </article>
  );
}

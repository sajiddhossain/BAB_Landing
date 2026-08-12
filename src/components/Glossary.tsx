/**
 * @file      Glossary.tsx
 * @summary   Pagina pubblica del glossario BAB (/glossario e /en/glossario).
 *            Ogni termine ha un'ancora propria (#chiave), la stessa dichiarata come
 *            `url` nel DefinedTerm dei dati strutturati: così la definizione che legge
 *            una persona e quella che un motore cita sono lo stesso testo allo stesso
 *            indirizzo. Sotto ogni voce, gli articoli che la trattano per esteso.
 * @author    Sajid Hossain <sajid.hossain2009@gmail.com>
 * @copyright (c) 2026 Breaking All Barriers. Tutti i diritti riservati.
 */
import { GLOSSARY, glossaryKeysSorted, termName, termDescription } from '../data/glossary';
import { blogPath } from '../lib/blogLocale';
import { BLOG_POSTS, postsForLang } from './Blog';

interface GlossaryProps {
  /** Lingua imposta dall'URL (/glossario → it, /en/glossario → en). */
  lang?: string;
}

/**
 * Articoli che trattano un termine: il match è sui tag della versione ITALIANA,
 * che usano le stesse chiavi del glossario, così anche la pagina inglese elenca
 * gli stessi articoli — nella traduzione corrispondente quando esiste.
 */
function articlesForTerm(key: string, lang: string): { slug: string; title: string }[] {
  const itSlugs = BLOG_POSTS.filter((p) => p.lang === 'it' && p.tags?.includes(key)).map((p) => p.slug);
  const inLang = new Map(postsForLang(lang).map((p) => [p.slug, p]));
  return itSlugs
    .map((slug) => inLang.get(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .map((p) => ({ slug: p.slug, title: p.title }));
}

export default function Glossary({ lang: langProp }: GlossaryProps = {}) {
  const lang = langProp === 'en' ? 'en' : 'it';
  const isEn = lang === 'en';
  const keys = glossaryKeysSorted(lang);

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
          {isEn ? 'Glossary of young female athletes’ health' : 'Glossario della salute delle giovani atlete'}
        </h1>
        <p className="text-[17px] leading-relaxed text-[#0F0F12]/80">
          {isEn
            ? 'The recurring concepts in BAB’s articles, defined one by one. Each definition carries the figure, the population it was measured in and the source, and is written to stand on its own — so it can be quoted as it is. Terms are listed alphabetically; each has its own link.'
            : 'I concetti che ricorrono negli articoli BAB, definiti uno per uno. Ogni definizione riporta il dato, la popolazione in cui è stato misurato e la fonte, ed è scritta per reggere da sola — così può essere citata com’è. I termini sono in ordine alfabetico e ognuno ha un link proprio.'}
        </p>
      </header>

      {/* Indice: tutti i termini in cima, ciascuno verso la propria ancora */}
      <nav
        className="mb-12 border-[3px] border-black bg-white p-5 shadow-[6px_6px_0_0_#0F0F12]"
        aria-labelledby="glossary-index"
      >
        <h2 id="glossary-index" className="font-black uppercase text-xs tracking-widest mb-3">
          {isEn ? `All terms (${keys.length})` : `Tutti i termini (${keys.length})`}
        </h2>
        <ul className="flex flex-wrap gap-x-3 gap-y-1.5 list-none">
          {keys.map((k) => (
            <li key={k}>
              <a
                href={`#${k}`}
                className="text-[15px] text-vividteal font-bold hover:underline focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#34BBC0]"
              >
                {termName(k, lang)}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <dl className="flex flex-col gap-10">
        {keys.map((k) => {
          const articles = articlesForTerm(k, lang);
          return (
            <div key={k} id={k} className="scroll-mt-24">
              <dt className="font-['Bricolage_Grotesque',_sans-serif] text-xl sm:text-2xl font-black tracking-tight mb-2">
                {termName(k, lang)}
                <a
                  href={`#${k}`}
                  aria-label={isEn ? 'Link to this definition' : 'Link a questa definizione'}
                  className="ml-2 text-vividteal text-base align-middle no-underline hover:underline focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#34BBC0]"
                >
                  #
                </a>
              </dt>
              <dd className="text-[17px] leading-relaxed text-[#0F0F12]/85">
                {termDescription(k, lang)}
                <span className="block mt-2 text-[15px]">
                  {articles.length > 0 && (
                    <>
                      <span className="font-bold uppercase text-[11px] tracking-widest text-[#0F0F12]/60 mr-2">
                        {isEn ? 'Read more' : 'Approfondimenti'}
                      </span>
                      {articles.map((a, i) => (
                        <span key={a.slug}>
                          {i > 0 && <span aria-hidden="true"> · </span>}
                          <a
                            href={blogPath(lang, a.slug)}
                            className="text-vividteal font-bold hover:underline focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#34BBC0]"
                          >
                            {a.title}
                          </a>
                        </span>
                      ))}
                    </>
                  )}
                  {GLOSSARY[k].sameAs && (
                    <a
                      href={GLOSSARY[k].sameAs}
                      rel="noopener noreferrer nofollow"
                      target="_blank"
                      className="block mt-1 text-[13px] text-[#0F0F12]/60 hover:underline focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#34BBC0]"
                    >
                      {isEn ? 'Encyclopedia entry ↗' : 'Voce enciclopedica ↗'}
                    </a>
                  )}
                </span>
              </dd>
            </div>
          );
        })}
      </dl>

      <p className="mt-14 border-t-[3px] border-black pt-6 text-[15px] leading-relaxed text-[#0F0F12]/70">
        {isEn
          ? 'These definitions are educational and are not medical advice. Figures are reported with the population in which they were measured: a result obtained in adult athletes is not automatically valid for a 13-year-old, and where that is the case the articles say so explicitly.'
          : 'Queste definizioni hanno finalità educative e non costituiscono parere medico. I dati sono riportati insieme alla popolazione in cui sono stati misurati: un risultato ottenuto su atlete adulte non vale automaticamente per una ragazza di 13 anni, e dove accade gli articoli lo dichiarano.'}
      </p>
    </article>
  );
}

/**
 * @file      autolink.ts
 * @summary   Collega la prima occorrenza dei termini tecnici di un articolo alla loro
 *            definizione nel glossario (/glossario#chiave).
 *            Serve a due lettori diversi: a chi legge, che trova la definizione senza
 *            uscire dal pezzo; e a un motore, per cui un link con l'ancora del termine
 *            è la dichiarazione più esplicita che quel testo parla di quell'entità.
 *
 *            Regole di prudenza, perché il testo è già scritto e non va rovinato:
 *            una sola occorrenza per termine, al massimo MAX_LINKS per articolo, mai
 *            dentro un link esistente, un titolo, un blocco di codice o la bibliografia,
 *            e solo su termini tecnici — le parole comuni («dolore», «sonno», «energia»)
 *            non si linkano, perché diventerebbero rumore.
 * @author    Sajid Hossain <sajid.hossain2009@gmail.com>
 * @copyright (c) 2026 Breaking All Barriers. Tutti i diritti riservati.
 */

/** Chiave del glossario → forme testuali da riconoscere, per lingua. */
export const AUTOLINK_TERMS: Record<string, { it: string[]; en: string[] }> = {
  'red-s': { it: ['RED-S'], en: ['RED-S'] },
  dismenorrea: { it: ['dismenorrea'], en: ['dysmenorrhoea'] },
  endometriosi: { it: ['endometriosi'], en: ['endometriosis'] },
  amenorrea: { it: ['amenorrea'], en: ['amenorrhoea'] },
  menarca: { it: ['menarca'], en: ['menarche'] },
  tanner: { it: ['stadi di Tanner', 'scala di Tanner'], en: ['Tanner stage'] },
  spondilolisi: { it: ['spondilolisi'], en: ['spondylolysis'] },
  gird: { it: ['GIRD'], en: ['GIRD'] },
  'discinesia-scapolare': { it: ['discinesia scapolare'], en: ['scapular dyskinesis'] },
  propriocezione: { it: ['propriocezione'], en: ['proprioception'] },
  'cartilagine-di-accrescimento': { it: ['cartilagine di accrescimento'], en: ['growth plate'] },
  'picco-di-crescita': {
    it: ['picco di velocità di crescita', 'picco di crescita'],
    en: ['peak height velocity'],
  },
  'frattura-da-stress': { it: ['fratture da stress', 'frattura da stress'], en: ['stress fracture'] },
  'dolore-femoro-rotuleo': { it: ['dolore femoro-rotuleo'], en: ['patellofemoral pain'] },
  'osgood-schlatter': { it: ['Osgood-Schlatter'], en: ['Osgood-Schlatter'] },
  'instabilità-di-caviglia': {
    it: ['instabilità cronica di caviglia'],
    en: ['chronic ankle instability'],
  },
  incontinenza: { it: ['incontinenza urinaria'], en: ['urinary incontinence'] },
  'pavimento-pelvico': { it: ['pavimento pelvico'], en: ['pelvic floor'] },
  'gestione-del-carico': { it: ['gestione del carico'], en: ['load management'] },
  'specializzazione-precoce': { it: ['specializzazione precoce'], en: ['early specialisation'] },
  'sport-overhead': { it: ['sport overhead'], en: ['overhead sports'] },
  'gioco-libero': { it: ['gioco libero'], en: ['deliberate play'] },
  crociato: { it: ['legamento crociato anteriore'], en: ['anterior cruciate ligament'] },
  energia: { it: ['disponibilità energetica'], en: ['energy availability'] },
  maturazione: { it: ['maturazione biologica'], en: ['biological maturation'] },
  'commozione-cerebrale': { it: ['commozione cerebrale'], en: ['concussion'] },
};

/** Oltre questa soglia i link al glossario smettono di aiutare e iniziano a distrarre. */
const MAX_LINKS = 6;

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Inserisce i link al glossario nell'HTML di un articolo.
 * `html` è l'HTML già generato dal markdown; `lang` decide sia le forme da cercare
 * sia il prefisso di lingua della destinazione.
 */
export function autolinkGlossary(html: string, lang: string): string {
  const isEn = lang === 'en';
  const prefix = isEn ? '/en' : '';
  // La bibliografia contiene i titoli degli studi: lì i termini vanno lasciati stare.
  const sourcesIdx = html.search(/<h2[^>]*>\s*(Fonti|Sources)\s*</i);
  const head = sourcesIdx === -1 ? html : html.slice(0, sourcesIdx);
  const tail = sourcesIdx === -1 ? '' : html.slice(sourcesIdx);

  // Segmenta in tag e testo, così le sostituzioni non toccano mai il markup.
  const parts = head.split(/(<[^>]+>)/);
  const used = new Set<string>();
  let placed = 0;
  let skipDepth = 0; // dentro <a>, <h1-6>, <code>, <pre>

  for (let i = 0; i < parts.length && placed < MAX_LINKS; i++) {
    const part = parts[i];
    if (part.startsWith('<')) {
      if (/^<(a|h[1-6]|code|pre)\b/i.test(part)) skipDepth++;
      else if (/^<\/(a|h[1-6]|code|pre)\s*>/i.test(part)) skipDepth = Math.max(0, skipDepth - 1);
      continue;
    }
    if (skipDepth > 0 || !part.trim()) continue;

    let text = part;
    for (const [key, forms] of Object.entries(AUTOLINK_TERMS)) {
      if (placed >= MAX_LINKS) break;
      if (used.has(key)) continue;
      for (const form of isEn ? forms.en : forms.it) {
        // Confine di parola a mano: \b non funziona con accenti e trattini.
        const re = new RegExp(`(^|[\\s(«"'—-])(${escapeRegExp(form)})(?=[\\s.,;:!?)»"'—-]|$)`, 'i');
        const m = re.exec(text);
        if (!m) continue;
        const before = m[1];
        const match = m[2];
        text =
          text.slice(0, m.index) +
          before +
          `<a class="glossary-link" href="${prefix}/glossario#${key}">${match}</a>` +
          text.slice(m.index + m[0].length);
        used.add(key);
        placed++;
        break;
      }
    }
    parts[i] = text;
  }
  return parts.join('') + tail;
}

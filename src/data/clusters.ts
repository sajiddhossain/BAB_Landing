/**
 * @file      src/data/clusters.ts
 * @summary   I temi del blog (topic cluster): ogni articolo appartiene a un tema solo, e
 *            ogni tema ha una pagina pilastro propria su /blog/tema/{chiave} (e /en/…).
 *            È l'unica fonte di verità per:
 *            (1) le pagine hub prerenderizzate (CollectionPage + ItemList, vite.config.ts),
 *            (2) il blocco «Nello stesso tema» in fondo a ogni articolo,
 *            (3) la striscia dei temi in cima all'indice del blog,
 *            (4) il terzo livello del breadcrumb degli articoli e la sezione «Temi» di llms.txt.
 *
 *            Regola di scrittura: i testi dei temi DESCRIVONO che cosa si trova nel tema,
 *            non fanno affermazioni di salute. I numeri della pagina hub arrivano da
 *            facts.ts e dalle capsule degli articoli, che portano già popolazione e fonte.
 *
 *            Invariante verificata al build: ogni slug di content/blog/it sta in un tema e
 *            in uno solo. Un articolo nuovo senza tema fa fallire il prerender, apposta.
 * @author    Sajid Hossain <sajid.hossain2009@gmail.com>
 * @copyright (c) 2026 Breaking All Barriers. Tutti i diritti riservati.
 */

export interface Cluster {
  /** Chiave stabile: è il segmento di URL (/blog/tema/{key}) in entrambe le lingue. */
  key: string;
  name: string;
  nameEn: string;
  /** Title SEO della pagina hub (≤ 60 caratteri, senza il suffisso « | BAB »). */
  seoTitle: string;
  seoTitleEn: string;
  /** Meta description della pagina hub (≈ 150 caratteri). */
  seoDescription: string;
  seoDescriptionEn: string;
  /** Apertura della pagina hub: che cosa copre il tema e per chi. Nessun claim di salute. */
  intro: string;
  introEn: string;
  /** L'articolo da cui partire: il più trasversale del tema, non il più recente. */
  startHere: string;
  /** Gli slug del tema, nell'ordine di lettura consigliato (startHere compreso). */
  slugs: string[];
}

export const CLUSTERS: Cluster[] = [
  {
    key: 'ciclo-mestruale',
    name: 'Ciclo mestruale e sport',
    nameEn: 'The menstrual cycle and sport',
    seoTitle: 'Ciclo mestruale e sport nelle adolescenti: la guida',
    seoTitleEn: 'The menstrual cycle and sport in teenage girls: a guide',
    seoDescription:
      'Performance, dolori mestruali, contraccezione ormonale, ovaio policistico e come parlarne con chi allena: tutti gli articoli di BAB sul ciclo, con le fonti.',
    seoDescriptionEn:
      'Performance, period pain, hormonal contraception, polycystic ovary syndrome and how to raise it with a coach: every BAB article on the cycle, with sources.',
    intro:
      "Che cosa cambia davvero con il ciclo quando una ragazza si allena — e che cosa no. Qui ci sono gli articoli su prestazione, dolore mestruale, gestione pratica in palestra e in trasferta, contraccezione ormonale, sindrome dell'ovaio policistico e sul modo di parlarne con chi allena. Ogni numero è accompagnato dalla popolazione in cui è stato misurato: su questo tema gran parte degli studi è su atlete adulte, e gli articoli lo dichiarano riga per riga.",
    introEn:
      'What the cycle actually changes when a girl trains — and what it does not. These are the articles on performance, period pain, practical management at the gym and on the road, hormonal contraception, polycystic ovary syndrome, and how to raise the subject with a coach. Every number travels with the population it was measured in: on this topic most studies are in adult athletes, and the articles say so line by line.',
    startHere: 'ciclo-e-performance',
    slugs: [
      'ciclo-e-performance',
      'gestire-ciclo-nello-sport',
      'dolori-mestruali-giovani-atlete',
      'parlare-di-ciclo-con-allenatore',
      'contraccezione-ormonale-giovani-atlete',
      'ovaio-policistico-giovani-atlete',
    ],
  },
  {
    key: 'energia-ossa-recupero',
    name: 'Energia, ossa e recupero',
    nameEn: 'Energy, bone and recovery',
    seoTitle: 'RED-S, ossa, ferro e sonno nelle giovani atlete',
    seoTitleEn: 'RED-S, bone, iron and sleep in young female athletes',
    seoDescription:
      'Bassa disponibilità energetica, fratture da stress, ferro, integratori e sonno: gli articoli di BAB su ciò che alimenta una giovane atleta, con le fonti.',
    seoDescriptionEn:
      'Low energy availability, stress fractures, iron, supplements and sleep: the BAB articles on what fuels a young athlete, with sources.',
    intro:
      "L'energia che resta dopo l'allenamento è quella con cui un'adolescente cresce, costruisce osso, recupera e dorme. Questo tema raccoglie gli articoli sulla bassa disponibilità energetica (RED-S), sulla salute ossea e le fratture da stress, sul ferro, sugli integratori e sul sonno: sono capitoli della stessa storia, e conviene leggerli insieme.",
    introEn:
      'The energy left after training is what an adolescent uses to grow, build bone, recover and sleep. This topic gathers the articles on low energy availability (RED-S), bone health and stress fractures, iron, supplements and sleep: they are chapters of one story, best read together.',
    startHere: 'red-s-bassa-disponibilita-energetica',
    slugs: [
      'red-s-bassa-disponibilita-energetica',
      'salute-ossea-fratture-da-stress-giovani-atlete',
      'ferro-atlete-adolescenti',
      'integratori-energy-drink-giovani-atlete',
      'sonno-atlete-adolescenti',
    ],
  },
  {
    key: 'puberta-crescita',
    name: 'Pubertà e crescita',
    nameEn: 'Puberty and growth',
    seoTitle: 'Pubertà, crescita e sport: cosa cambia nelle ragazze',
    seoTitleEn: 'Puberty, growth and sport: what changes for girls',
    seoDescription:
      'Picco di crescita, apofisiti, scoliosi, ipermobilità, allenamento della forza e reggiseno sportivo: gli articoli di BAB sul corpo che cambia, con le fonti.',
    seoDescriptionEn:
      'Growth spurt, apophysitis, scoliosis, hypermobility, strength training and sports bras: the BAB articles on a changing body, with sources.',
    intro:
      "Fra gli 11 e i 15 anni il corpo di un'atleta cambia più in fretta del programma di allenamento che le viene proposto. Questo tema mette in fila gli articoli sugli anni dello scatto di crescita: come riconoscerlo, che cosa succede a ossa, tendini e colonna, perché la forza si può allenare, e che cosa serve — anche di molto pratico — perché una ragazza continui a muoversi a suo agio.",
    introEn:
      "Between 11 and 15 an athlete's body changes faster than the training plan she is handed. This topic lines up the articles on the growth-spurt years: how to recognise it, what happens to bone, tendon and spine, why strength can be trained, and what it takes — including the very practical — for a girl to keep moving comfortably.",
    startHere: 'picco-di-crescita-giovani-atlete',
    slugs: [
      'picco-di-crescita-giovani-atlete',
      'forza-ragazze-adolescenti',
      'apofisiti-osgood-schlatter-sever-giovani-atlete',
      'scoliosi-idiopatica-sport-giovani-atlete',
      'ipermobilita-articolare-giovani-atlete',
      'reggiseno-sportivo-ragazze',
    ],
  },
  {
    key: 'infortuni-dolore',
    name: 'Infortuni e dolore',
    nameEn: 'Injury and pain',
    seoTitle: 'Infortuni e dolore nelle giovani atlete: la guida',
    seoTitleEn: 'Injury and pain in young female athletes: a guide',
    seoDescription:
      'Crociato, caviglia, ginocchio, inguine, spalla, schiena, commozione cerebrale e ritorno allo sport: gli articoli di BAB sugli infortuni, con le fonti.',
    seoDescriptionEn:
      'ACL, ankle, knee, groin, shoulder, back, concussion and return to sport: the BAB articles on injury in adolescent girls, with sources.',
    intro:
      "Distretto per distretto, gli infortuni e i dolori più frequenti nelle atlete adolescenti: che cosa dicono i dati su chi si fa male e perché, che cosa ha dimostrato di prevenirli, e come si torna in campo senza farsi male una seconda volta. Si parte dal dolore in sé — da come funziona in pubertà — perché è il filo che tiene insieme tutti gli altri articoli.",
    introEn:
      'Region by region, the most common injuries and pains in adolescent female athletes: what the data say about who gets hurt and why, what has been shown to prevent it, and how to get back on the pitch without getting hurt a second time. It starts with pain itself — how it works in puberty — because that is the thread running through every other article.',
    startHere: 'dolore-in-puberta-neuroscienza',
    slugs: [
      'dolore-in-puberta-neuroscienza',
      'crociato-giovani-atlete',
      'distorsione-caviglia-giovani-atlete',
      'dolore-ginocchio-femoro-rotuleo-giovani-atlete',
      'dolore-inguine-giovani-atlete',
      'dolore-spalla-giovani-atlete',
      'mal-di-schiena-giovani-atlete',
      'commozione-cerebrale-giovani-atlete',
      'ritorno-allo-sport-dopo-infortunio',
    ],
  },
  {
    key: 'salute-prevenzione',
    name: 'Salute e prevenzione',
    nameEn: 'Health and prevention',
    seoTitle: 'Salute delle giovani atlete: visita, respiro, caldo, mono',
    seoTitleEn: 'Young athlete health: screening, breathing, heat',
    seoDescription:
      "Visita di idoneità, fiato corto, caldo, pavimento pelvico e rientro dopo la mononucleosi: gli articoli di BAB sui temi di salute di cui si parla meno.",
    seoDescriptionEn:
      'The eligibility exam, breathlessness, heat, the pelvic floor and returning after mono: the BAB articles on the health topics gyms talk about least.',
    intro:
      "I temi di salute che non sono infortuni e di cui in palestra si parla poco: che cosa guarda — e che cosa non guarda — la visita di idoneità agonistica, il fiato corto sotto sforzo, l'allenamento al caldo, le perdite di urina durante i salti, il rientro in campo dopo la mononucleosi. Sono articoli scritti per sapere quando una cosa è normale, quando non lo è, e a chi portarla.",
    introEn:
      'The health topics that are not injuries and that gyms rarely discuss: what the competitive eligibility exam looks at — and what it misses — breathlessness on exertion, training in the heat, leaking urine when jumping, getting back on the pitch after glandular fever. These articles are written to tell when something is normal, when it is not, and who to take it to.',
    startHere: 'visita-idoneita-sportiva-giovani-atlete',
    slugs: [
      'visita-idoneita-sportiva-giovani-atlete',
      'fiato-corto-giovani-atlete',
      'allenarsi-al-caldo-giovani-atlete',
      'perdite-urina-giovani-atlete',
      'mononucleosi-sport-giovani-atlete',
    ],
  },
  {
    key: 'ambiente-sportivo',
    name: 'Allenatori, famiglie e ambiente',
    nameEn: 'Coaches, families and environment',
    seoTitle: 'Abbandono sportivo femminile: allenatori e famiglie',
    seoTitleEn: 'Why girls drop out of sport: coaches and families',
    seoDescription:
      "Abbandono in pubertà, linguaggio di chi allena, genitori a bordo campo, ansia e burnout, selezione, specializzazione precoce, safeguarding: gli articoli di BAB.",
    seoDescriptionEn:
      'Drop-out in puberty, coaching language, sideline parents, anxiety and burnout, selection, early specialisation, safeguarding: the BAB articles.',
    intro:
      "Perché tante ragazze smettono proprio negli anni della pubertà, e che cosa possono fare gli adulti intorno a loro. Questo tema raccoglie gli articoli su ciò che non è fisiologia: le parole di chi allena, il comportamento dei genitori, l'ansia e il burnout, i meccanismi di selezione, la specializzazione precoce e la tutela delle atlete minorenni. È il tema pensato prima di tutto per società e allenatori.",
    introEn:
      'Why so many girls stop in exactly the years of puberty, and what the adults around them can do. This topic gathers the articles on everything that is not physiology: what coaches say, how parents behave, anxiety and burnout, selection mechanisms, early specialisation and the safeguarding of underage athletes. It is the topic written first of all for clubs and coaches.',
    startHere: 'abbandono-puberta',
    slugs: [
      'abbandono-puberta',
      'allenare-ragazze-adolescenti',
      'parole-allenatore-salute-atlete',
      'genitori-a-bordo-campo-giovani-atlete',
      'ansia-prestazione-burnout-giovani-atlete',
      'specializzazione-precoce-giovani-atlete',
      'eta-relativa-selezione-giovani-atlete',
      'safeguarding-abusi-nello-sport-giovani-atlete',
    ],
  },
];

/** Segmento di URL che distingue una pagina hub da un articolo: /blog/tema/{key}. */
export const CLUSTER_SEGMENT = 'tema';

/** Tema di appartenenza di un articolo (undefined solo se l'invariante è rotta). */
export const clusterOf = (slug: string): Cluster | undefined => CLUSTERS.find((c) => c.slugs.includes(slug));

export const clusterByKey = (key: string): Cluster | undefined => CLUSTERS.find((c) => c.key === key);

/** Path della pagina hub nella lingua data; l'italiano è canonico e non ha prefisso. */
export const clusterPath = (lang: string, key: string): string =>
  `${lang === 'en' ? '/en' : ''}/blog/${CLUSTER_SEGMENT}/${key}`;

export const clusterName = (c: Cluster, lang: string): string => (lang === 'en' ? c.nameEn : c.name);

/**
 * Gli articoli da proporre in fondo a `slug`: prima quello da cui partire (se non è
 * l'articolo stesso), poi i vicini nell'ordine di lettura del tema — il successivo e
 * il precedente prima dei lontani — fino a `max`. L'ordine è deterministico: client e
 * prerender devono produrre gli stessi link.
 */
export function relatedSlugs(slug: string, max = 3): string[] {
  const c = clusterOf(slug);
  if (!c) return [];
  const i = c.slugs.indexOf(slug);
  const out: string[] = [];
  if (c.startHere !== slug) out.push(c.startHere);
  for (let d = 1; d < c.slugs.length && out.length < max; d++) {
    for (const j of [i + d, i - d]) {
      const s = c.slugs[j];
      if (s && s !== slug && !out.includes(s) && out.length < max) out.push(s);
    }
  }
  return out;
}

/** Verifica l'invariante «ogni articolo in un tema e in uno solo». Ritorna gli errori. */
export function validateClusters(allSlugs: string[]): string[] {
  const errors: string[] = [];
  const seen = new Map<string, string>();
  for (const c of CLUSTERS) {
    if (!c.slugs.includes(c.startHere)) errors.push(`tema «${c.key}»: startHere «${c.startHere}» non è fra i suoi slug`);
    for (const s of c.slugs) {
      if (seen.has(s)) errors.push(`«${s}» compare in due temi: ${seen.get(s)} e ${c.key}`);
      seen.set(s, c.key);
      if (!allSlugs.includes(s)) errors.push(`tema «${c.key}»: lo slug «${s}» non esiste in content/blog/it`);
    }
  }
  for (const s of allSlugs) {
    if (!seen.has(s)) errors.push(`«${s}» non appartiene a nessun tema: aggiungilo a src/data/clusters.ts`);
  }
  return errors;
}

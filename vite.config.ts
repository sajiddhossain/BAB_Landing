/**
 * @file      vite.config.ts
 * @summary   Config Vite + plugin di prerender SEO per BAB: genera un index.html
 *            statico per ogni rotta (title/description/OG/canonical) e inietta i
 *            dati strutturati FAQPage nella homepage per i rich results di Google.
 * @author    Sajid Hossain <sajid.hossain2009@gmail.com>
 * @copyright (c) 2026 Breaking All Barriers. Tutti i diritti riservati.
 */
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'

const DOMAIN = 'https://www.babsport.com'

// Rotte da pre-renderizzare → chiave SEO nel locale IT
const PRERENDER_ROUTES: Record<string, string> = {
  '/features': 'features',
  // '/app' temporaneamente nascosta (APP_ENABLED=false): non pre-renderizzata.
  '/about': 'about',
  '/privacy': 'privacy',
  '/cookie': 'cookie',
  '/termini': 'termini',
  '/blog': 'blog',
}

// Lingue del blog che hanno un URL proprio. L'italiano è la versione canonica e
// vive sotto /blog; le altre lingue vivono sotto un prefisso (/en/blog/...).
// Senza un URL dedicato una traduzione esiste solo dentro il bundle JS, cioè
// dopo il mount di React: nessun crawler può indicizzarla, e cercarne il titolo
// esatto su Google non restituisce nulla. Il prefisso è ciò che la rende una
// pagina. Per ora riguarda SOLO il blog: le altre rotte restano in italiano.
const BLOG_LOCALES: Record<string, { prefix: string; htmlLang: string; ogLocale: string; inLanguage: string; hreflang: string }> = {
  it: { prefix: '', htmlLang: 'it', ogLocale: 'it_IT', inLanguage: 'it-IT', hreflang: 'it' },
  en: { prefix: '/en', htmlLang: 'en', ogLocale: 'en_GB', inLanguage: 'en-GB', hreflang: 'en' },
}

// Etichette brevi per il breadcrumb (il <title> SEO è troppo lungo come nodo)
const BREADCRUMB_LABEL: Record<string, string> = {
  '/features': 'Funzionalità',
  '/app': "L'App",
  '/about': 'Chi siamo',
  '/privacy': 'Privacy Policy',
  '/cookie': 'Cookie Policy',
  '/termini': 'Termini e Condizioni',
  '/blog': 'Blog',
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// --- Glossario BAB (GEO): concetti-chiave come entità DefinedTerm, ancorati a
// voci enciclopediche (sameAs). Il set completo è pubblicato in home; ogni
// articolo referenzia i termini pertinenti via `about`, aiutando i motori
// generativi a collegare i contenuti a entità note (entity/answer grounding). ---
const GLOSSARY_ID = `${DOMAIN}/#glossario`
const GLOSSARY: Record<string, { name: string; description: string; sameAs?: string }> = {
  'red-s': {
    name: 'RED-S (Relative Energy Deficiency in Sport)',
    description:
      "Sindrome da bassa disponibilità di energia nello sport: quando l'apporto energetico non copre la spesa dell'allenamento, con effetti su ciclo, ossa, sistema immunitario e umore.",
    sameAs: 'https://en.wikipedia.org/wiki/Relative_energy_deficiency_in_sport',
  },
  ciclo: {
    name: 'Ciclo mestruale',
    description: 'Il ciclo ormonale femminile; nello sport giovanile è un segnale di salute da riconoscere, non un dato clinico da diagnosticare.',
    sameAs: 'https://it.wikipedia.org/wiki/Ciclo_mestruale',
  },
  dismenorrea: {
    name: 'Dismenorrea (dolore mestruale)',
    description:
      "Dolore associato alle mestruazioni. È la forma di dolore ricorrente più diffusa tra le ragazze in età scolare: la prevalenza stimata tra le giovani donne sotto i 25 anni è del 71,1%, con il 20,1% che riferisce assenze da scuola o università e il 40,9% un impatto su concentrazione e rendimento (Armour et al., 2019). Tra le atlete è il disturbo del ciclo più frequente, con prevalenza del 32,3% e un intervallo molto ampio tra studi, 7,8-85,6% (Taim et al., 2023). Si distingue in primaria (senza patologia pelvica sottostante, la forma di gran lunga più comune nelle adolescenti) e secondaria.",
    sameAs: 'https://it.wikipedia.org/wiki/Dismenorrea',
  },
  endometriosi: {
    name: 'Endometriosi',
    description:
      "Presenza di tessuto simile all'endometrio fuori dalla cavità uterina; è la principale causa di dismenorrea secondaria nelle adolescenti. Il riferimento clinico dedicato a questa fascia d'età indica di indagare le cause secondarie quando il dolore mestruale non migliora entro 3-6 mesi dall'inizio della terapia (ACOG Committee Opinion No. 760, 2018). Nel contesto sportivo il punto non è diagnosticare, ma non normalizzare un dolore che continua a far saltare allenamenti e scuola.",
    sameAs: 'https://it.wikipedia.org/wiki/Endometriosi',
  },
  'pubertà': {
    name: 'Pubertà',
    description: 'La fase di sviluppo in cui il corpo matura; finestra in cui emergono molti dei cambiamenti fisiologici rilevanti per le giovani atlete.',
    sameAs: 'https://it.wikipedia.org/wiki/Pubert%C3%A0',
  },
  dolore: {
    name: 'Dolore',
    description: "Esperienza sensoriale ed emotiva che durante la pubertà cambia nei suoi meccanismi; il dolore clinico tende ad aumentare in questa fascia d'età.",
    sameAs: 'https://it.wikipedia.org/wiki/Dolore',
  },
  amenorrea: {
    name: 'Amenorrea',
    description: "Assenza di mestruazioni; nello sport non è un effetto collaterale innocuo dell'allenamento ma un possibile segnale d'allarme.",
    sameAs: 'https://it.wikipedia.org/wiki/Amenorrea',
  },
  menarca: {
    name: 'Menarca',
    description: 'La prima mestruazione; il suo timing è associato a diversi esiti di salute in adolescenza e in età adulta.',
    sameAs: 'https://it.wikipedia.org/wiki/Menarca',
  },
  'drop-out': {
    name: 'Drop-out sportivo femminile',
    description:
      "L'abbandono dello sport in adolescenza: tra le ragazze tesserate a 10-14 anni il 71% smette senza mai rientrare (Eime et al., 2020). Non è un calo di motivazione, ma l'esito di un ambiente che smette di funzionare quando il corpo cambia.",
  },
  'reggiseno-sportivo': {
    name: 'Reggiseno sportivo',
    description:
      'Indumento di sostegno per il seno durante il movimento. Il tessuto mammario non ha muscoli propri che lo sostengano: a 13-14 anni il 51% delle ragazze dice che il seno influenza la partecipazione allo sport, ma solo il 10% ne indossa sempre uno (Scurr et al., 2016).',
    sameAs: 'https://it.wikipedia.org/wiki/Reggiseno_sportivo',
  },
  ferro: {
    name: 'Carenza di ferro',
    description:
      "Riserve di ferro insufficienti, misurate con la ferritina; può esserci anche senza anemia. Nelle atlete adolescenti la prevalenza di carenza lieve (ferritina ≤30 µg/L) è del 53% (Nicotra et al., 2023). Si accerta con un esame del sangue, non si presume.",
    sameAs: 'https://it.wikipedia.org/wiki/Carenza_di_ferro',
  },
  energia: {
    name: 'Disponibilità energetica',
    description:
      "L'energia che resta al corpo per le sue funzioni vitali dopo aver coperto la spesa dell'allenamento. Quando è troppo bassa il corpo riduce funzioni come ciclo mestruale, salute ossea e recupero: è il meccanismo alla base della RED-S.",
  },
  sonno: {
    name: 'Sonno in adolescenza',
    description:
      "Il riposo notturno nella fascia 13-18 anni, per cui la raccomandazione di consenso è di 8-10 ore per notte (Paruthi et al., 2016). Negli atleti adolescenti dormire meno di 8 ore è associato a essere infortunati 1,7 volte più spesso (Milewski et al., 2014). Non è recupero opzionale: è parte della crescita.",
    sameAs: 'https://it.wikipedia.org/wiki/Sonno',
  },
  'ritmo-circadiano': {
    name: 'Ritmo circadiano',
    description:
      "L'orologio biologico interno che regola sonno e veglia. Con la pubertà la sua temporizzazione slitta in avanti: il bisogno di sonno non diminuisce, cambia l'orario in cui il corpo riesce ad addormentarsi, e questo entra in conflitto con gli orari scolastici (Carskadon, 2011).",
    sameAs: 'https://it.wikipedia.org/wiki/Ritmo_circadiano',
  },
  crociato: {
    name: 'Legamento crociato anteriore (LCA)',
    description:
      "Legamento che stabilizza il ginocchio; la sua rottura è l'infortunio che più spesso interrompe la carriera sportiva di una ragazza. Nello sport scolastico le atlete subiscono 1,40 volte le rotture dei coetanei maschi (0,084 contro 0,060 per 1.000 esposizioni), con il divario più ampio nel basket (RR 4,14) (Bram et al., 2021).",
    sameAs: 'https://it.wikipedia.org/wiki/Legamento_crociato_anteriore',
  },
  prevenzione: {
    name: 'Allenamento neuromuscolare preventivo',
    description:
      "Riscaldamento strutturato con stabilizzazione all'atterraggio, forza e controllo del bacino. Riduce il rischio di rottura del crociato da circa 1 su 54 a 1 su 111 (OR 0,51), con effetto più forte tra le atlete di 13-19 anni (OR 0,38) (Petushek et al., 2019). Funziona solo sopra il ~66% di aderenza (Sugimoto et al., 2012).",
  },
  'pavimento-pelvico': {
    name: 'Pavimento pelvico',
    description:
      "Il gruppo di muscoli che sostiene vescica e organi pelvici e partecipa al meccanismo della continenza. Nello sport a impatto ripetuto è sollecitato a ogni salto e atterraggio: tra le atlete adolescenti la prevalenza media di incontinenza urinaria è del 48,58% (Rial Rebullido et al., 2021).",
    sameAs: 'https://it.wikipedia.org/wiki/Pavimento_pelvico',
  },
  incontinenza: {
    name: 'Incontinenza urinaria nello sport',
    description:
      "Perdite involontarie di urina durante l'attività fisica, tipicamente in salti, sprint e cambi di direzione. È frequente ma non fisiologica: l'87% delle atlete adolescenti dichiara che non ne parlerebbe con l'allenatore e fino al 90% non ha mai sentito nominare l'allenamento del pavimento pelvico (Rial Rebullido et al., 2021).",
    sameAs: 'https://it.wikipedia.org/wiki/Incontinenza_urinaria',
  },
  'commozione-cerebrale': {
    name: 'Commozione cerebrale nello sport',
    description:
      "Trauma cranico funzionale indotto da forze biomeccaniche: non richiede né un colpo visibile alla testa né la perdita di coscienza. Nel calcio scolastico le atlete ne subiscono 1,88 volte quelle dei coetanei maschi (IC 95% 1,69-2,09) e il meccanismo prevalente è il contatto con un oggetto (41,9%) anziché con un altro giocatore (Bretzin et al., 2021). In caso di sospetto l'atleta va rimossa immediatamente dall'attività.",
    sameAs: 'https://it.wikipedia.org/wiki/Commozione_cerebrale',
  },
  'ritorno-al-gioco': {
    name: 'Ritorno al gioco (return-to-sport)',
    description:
      "Il percorso graduale che riporta un'atleta all'attività dopo un infortunio. Dopo una commozione cerebrale il consenso internazionale di Amsterdam 2022 prevede 24-48 ore di riposo relativo (non assoluto), 4 tappe di ritorno a scuola e 6 tappe di ritorno allo sport di almeno 24 ore ciascuna, con il rientro scolastico completo prima di quello sportivo senza restrizioni e l'autorizzazione finale affidata a un professionista sanitario (Patricios et al., 2023).",
  },
  'specializzazione-precoce': {
    name: 'Specializzazione sportiva precoce',
    description:
      "Praticare un solo sport per più di 8 mesi all'anno, sceglierlo come sport principale e abbandonare gli altri: tre criteri che definiscono l'alta specializzazione sulla scala a 3 punti usata in letteratura. Tra le atlete di 13-18 anni le altamente specializzate riferiscono una storia di infortuni 2,93 volte più spesso delle poco specializzate (Okoruwa et al., 2022); l'American Academy of Pediatrics raccomanda di praticare più sport almeno fino alla pubertà (Brenner e AAP, 2016).",
  },
  sovraccarico: {
    name: 'Infortunio da sovraccarico (overuse)',
    description:
      "Danno da carico ripetuto senza un trauma singolo identificabile: si accumula nel tempo e per questo viene notato tardi. Negli atleti molto specializzati il rischio è 1,81 volte quello dei poco specializzati (Bell et al., 2018), e chi si allena più ore a settimana dei propri anni d'età ha 2,07 volte le probabilità di un infortunio grave da sovraccarico (Jayanthi et al., 2015).",
  },
  'gioco-libero': {
    name: 'Gioco libero (deliberate play)',
    description:
      "Attività fisica non strutturata, scelta e regolata dai ragazzi stessi, distinta dall'allenamento organizzato. Non è tempo perso: quando il rapporto tra sport organizzato e gioco libero supera 2:1 ore a settimana, le probabilità di un infortunio grave da sovraccarico salgono a 1,87 volte (Jayanthi et al., 2015).",
  },
  ossa: {
    name: 'Salute ossea e picco di massa ossea',
    description:
      "Il patrimonio osseo che si accumula durante la crescita. Il contenuto minerale osseo totale raggiunge un plateau in media 6 anni dopo il picco di velocità di crescita staturale, cioè intorno ai 18 anni nelle ragazze (Baxter-Jones et al., 2011); i fattori di stile di vita — attività fisica, alimentazione, calcio, vitamina D — ne influenzano il 20-40% (Weaver et al., 2016). È una finestra che si chiude: l'osso si costruisce in adolescenza, non dopo.",
    sameAs: 'https://it.wikipedia.org/wiki/Osso',
  },
  'frattura-da-stress': {
    name: 'Frattura da stress (lesione ossea da stress)',
    description:
      "Danno osseo da carico ripetuto senza un trauma singolo: si manifesta come dolore localizzato in un punto preciso, che compare sotto carico e nel tempo arriva sempre prima nella seduta. Nello sport delle scuole superiori le atlete ne subiscono 2,22 ogni 100.000 esposizioni contro 1,27 dei coetanei maschi (rapporto 1,75) e rappresentano il 63,3% di tutti i casi (Changstrom et al., 2015); le recidive negli atleti adolescenti arrivano al 21% (Beck e Drysdale, 2021).",
    sameAs: 'https://it.wikipedia.org/wiki/Frattura_da_stress',
  },
  'dolore-femoro-rotuleo': {
    name: 'Dolore femoro-rotuleo (patellofemoral pain)',
    description:
      "Dolore diffuso attorno o dietro la rotula, provocato dal carico del ginocchio in flessione: scale, accosciate, salti, corsa e lo stare seduta a lungo. Non è un dolore puntiforme sull'osso e non nasce da un trauma singolo: nella coorte danese il 68,3% dei dolori al ginocchio degli adolescenti aveva esordio insidioso (Rathleff et al., 2013). La prevalenza annuale stimata negli adolescenti è del 28,9% (Smith et al., 2018) e non è autolimitante: a 2 anni il 55,9% ha ancora dolore (Rathleff et al., 2016), a 5 anni il 40,5%, con il 60% di questi che ha smesso o ridotto lo sport (Rathleff et al., 2019).",
    sameAs: 'https://it.wikipedia.org/wiki/Sindrome_femoro-rotulea',
  },
  'osgood-schlatter': {
    name: 'Morbo di Osgood-Schlatter',
    description:
      "Dolore localizzato sulla tuberosità tibiale, dove il tendine rotuleo si inserisce appena sotto la rotula; tipico dell'adolescenza in crescita. Non richiede solo attesa: in una coorte prospettica su 51 adolescenti di 10-14 anni (51% ragazze) una scala di progressione del carico con esercizi di rinforzo ha prodotto l'80% di esiti positivi a 12 settimane e il 90% a 12 mesi, pur senza gruppo di controllo (Rathleff et al., 2020).",
    sameAs: 'https://it.wikipedia.org/wiki/Morbo_di_Osgood-Schlatter',
  },
  'gestione-del-carico': {
    name: 'Gestione del carico (load management)',
    description:
      "Dosare progressivamente il carico di allenamento invece di alternare stop totale e ripresa piena. Nel dolore femoro-rotuleo degli adolescenti è l'approccio con i risultati migliori: 12 settimane di modifica dell'attività, rinforzo e ritorno graduale allo sport hanno prodotto l'86% di esiti positivi a 12 settimane e l'81% a 12 mesi in 151 ragazzi e ragazze di 10-14 anni (Rathleff et al., 2019); aggiungere esercizio supervisionato all'educazione raddoppia le probabilità di guarigione a 24 mesi (OR 2,52; Rathleff et al., 2015).",
  },
  tanner: {
    name: 'Stadi di Tanner',
    description:
      'La scala clinica che descrive le tappe dello sviluppo puberale. È utile perché molti fenomeni si legano allo stadio puberale più che allo stadio anagrafico: i sintomi di insonnia nelle ragazze, per esempio, salgono dal 3,4% al 12,2% tra lo stadio 1 e lo stadio 5 (Zhang et al., 2016).',
    sameAs: 'https://it.wikipedia.org/wiki/Scala_di_Tanner',
  },
  'picco-di-crescita': {
    name: 'Picco di velocità di crescita (peak height velocity, PHV)',
    description:
      "Il momento in cui la statura aumenta alla velocità massima durante la pubertà. Nelle giovani atlete l'età media stimata è di 11,18 anni, ma con un intervallo di credibilità al 90% che va da 8,62 a 12,94 anni (Lima et al., 2024): due atlete della stessa categoria possono essere biologicamente distanti anni. Il picco di accumulo di minerale osseo arriva circa 6 mesi dopo (Bailey et al., 1999), quindi per un periodo l'osso è più lungo ma non ancora altrettanto denso.",
    sameAs: 'https://en.wikipedia.org/wiki/Adolescent_growth_spurt',
  },
  'allenamento-della-forza': {
    name: 'Allenamento della forza in età giovanile (youth resistance training)',
    description:
      "L'allenamento contro resistenza svolto prima della maturità scheletrica. Le dichiarazioni di consenso lo considerano sicuro ed efficace quando appropriatamente progettato e supervisionato (Lloyd et al., 2014; Stricker et al., AAP 2020): in una revisione di 22 programmi sperimentali su bambini e preadolescenti non ha influenzato la crescita in statura e peso, con tassi di infortunio stimati tra 0,053 e 0,176 ogni 100 ore di partecipazione (Malina, 2006). L'effetto sulla forza è ampio (effect size 1,12; IC 95% 0,9-1,3) e cresce con la maturazione, senza un'impennata alla pubertà (Behringer et al., 2010).",
    sameAs: 'https://it.wikipedia.org/wiki/Allenamento_con_i_pesi',
  },
  'cartilagine-di-accrescimento': {
    name: 'Cartilagine di accrescimento (growth plate)',
    description:
      "La zona cartilaginea da cui l'osso lungo si allunga durante la crescita, meccanicamente più fragile dell'osso maturo e per questo al centro del timore che i pesi «blocchino la crescita». Il timore non è confermato: i protocolli supervisionati non hanno effetti negativi su crescita e maturazione (Malina, 2006). Il rischio documentato riguarda il carico senza supervisione, senza tecnica e con progressioni improvvisate.",
    sameAs: 'https://it.wikipedia.org/wiki/Cartilagine_di_accrescimento',
  },
  maturazione: {
    name: 'Maturazione biologica',
    description:
      "Il punto a cui è arrivato lo sviluppo di un corpo, distinto dall'età anagrafica. Nelle giovani atlete l'evidenza che lega lo stato di maturazione agli infortuni è limitata, mentre è moderata quella che lo lega a fattori di rischio del ginocchio in salto e atterraggio (Zoellner e Whatman, 2026). Si stima con misurazioni ripetute della statura ed equazioni di maturity offset (Moore et al., 2015): sono stime con margini d'errore ampi, utili a programmare il carico, non a etichettare un'atleta.",
  },
  caviglia: {
    name: 'Distorsione di caviglia',
    description:
      "Lesione dei legamenti della caviglia, tipicamente del compartimento laterale, causata da un movimento che eccede l'escursione articolare. È l'infortunio più frequente nello sport femminile giovanile: la caviglia è la sede del 23% di tutti gli infortuni, davanti a ginocchio (16%) e coscia (13%) (Beech et al., 2024). L'incidenza è più alta nelle femmine che nei maschi (13,6 contro 6,94 ogni 1.000 esposizioni) e più alta nei più giovani (Doherty et al., 2014).",
    sameAs: 'https://it.wikipedia.org/wiki/Distorsione_(medicina)',
  },
  'instabilità-di-caviglia': {
    name: 'Instabilità cronica di caviglia',
    description:
      "La condizione in cui, dopo una o più distorsioni, la caviglia continua a cedere e a fare male oltre la guarigione dei tessuti. Tra gli atleti di 14-18 anni la prevalenza è del 20,0%: 23,6% tra le ragazze contro il 16,3% tra i ragazzi, con funzione sportiva della caviglia (FAAM-Sport 87,0 contro 97,7) e qualità di vita percepita più basse, a parità di attività fisica svolta (Donovan et al., 2020). È l'esito che la frase «è solo una storta» rende invisibile.",
  },
  'mal-di-schiena': {
    name: 'Lombalgia nello sport giovanile (mal di schiena)',
    description:
      "Dolore nella regione lombare in atleti di 10-19 anni. È frequente: la prevalenza stimata negli ultimi 12 mesi è del 42% (IC 95% 29-55%), quella negli ultimi 3 mesi del 46% e la prevalenza puntuale del 16% (Wall et al., 2022; 80 studi, 60 sport, eterogeneità I² fino al 98% perché manca una definizione condivisa). Tra i fattori di rischio riportati compaiono volume e intensità dell'allenamento, dolore concomitante all'arto inferiore, sovrappeso, età adolescenziale più avanzata, familiarità e sesso femminile. La morfologia più frequentemente descritta in questa fascia d'età è la spondilolisi, non il disco.",
    sameAs: 'https://it.wikipedia.org/wiki/Lombalgia',
  },
  spondilolisi: {
    name: 'Spondilolisi (frattura da stress dell’istmo vertebrale)',
    description:
      "Frattura da stress della pars interarticularis, il ponte osseo che unisce le articolazioni posteriori di una vertebra, quasi sempre nelle ultime lombari. Nasce dal carico ripetuto della colonna in estensione e rotazione, non da un trauma singolo. È la causa che distingue la schiena adolescente da quella adulta: in un confronto diretto spiegava il 47% dei casi negli atleti di 12-18 anni contro il 5% negli adulti, mentre il disco spiegava 11 casi su 100 contro 48 (Micheli e Wood, 1995 — campione di clinica specialistica). Tra atleti adolescenti non d'élite con lombalgia la quota è del 30% (Selhorst et al., 2019). Il ritorno alla competizione è stimato al 92,2% con trattamento conservativo (Overley et al., 2018).",
    sameAs: 'https://it.wikipedia.org/wiki/Spondilolisi',
  },
  propriocezione: {
    name: 'Propriocezione e allenamento dell’equilibrio',
    description:
      "La capacità di percepire la posizione e il movimento del proprio corpo nello spazio, allenabile con esercizi di equilibrio e controllo monopodalico. Nello sport giovanile i programmi che la includono riducono gli infortuni di caviglia di circa il 26% (IRR 0,74; IC 95% 0,60-0,91) con 15-20 minuti due volte a settimana per 3-6 mesi (Berkey et al., 2024); in uno studio randomizzato su 765 atleti di scuola superiore, 523 dei quali ragazze, il gruppo con allenamento dell'equilibrio ha registrato 1,13 distorsioni ogni 1.000 esposizioni contro 1,87 (McGuine e Keene, 2006).",
    sameAs: 'https://it.wikipedia.org/wiki/Propriocezione',
  },
}
const definedTerm = (key: string) => ({
  '@type': 'DefinedTerm',
  '@id': `${DOMAIN}/#term-${key}`,
  name: GLOSSARY[key].name,
  description: GLOSSARY[key].description,
  inDefinedTermSet: GLOSSARY_ID,
  ...(GLOSSARY[key].sameAs ? { sameAs: GLOSSARY[key].sameAs } : {}),
})

// --- Sorgente markdown degli articoli (GEO) ---
// Un assistente che apre una pagina HTML deve prima ripulirla da menu, script e
// markup; una pagina markdown è già il testo. Pubblicare la fonte accanto alla
// pagina (convenzione .md a fianco dell'URL) elimina quel passaggio e riduce le
// possibilità che una citazione riporti male un numero.
const readPostBody = (lang: string, slug: string): string | null => {
  const file = path.resolve('content/blog', lang, `${slug}.md`)
  if (!fs.existsSync(file)) return null
  const raw = fs.readFileSync(file, 'utf8')
  const fm = raw.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/)
  return (fm ? raw.slice(fm[0].length) : raw).trim()
}

/**
 * I punti del blocco "In breve" / "Key points" in cima a ogni articolo: sono già
 * scritti come affermazioni autonome con la fonte tra parentesi, cioè la forma
 * che un motore generativo può citare senza doverla riassumere.
 */
const keyPoints = (body: string): string[] => {
  const out: string[] = []
  let inQuote = false
  for (const line of body.split('\n')) {
    if (line.startsWith('>')) {
      inQuote = true
      const t = line.replace(/^>\s?/, '').trim()
      if (t.startsWith('- ')) out.push(t.slice(2).replace(/\*\*/g, '').trim())
    } else if (inQuote) break
  }
  return out
}

/** Legge larghezza/altezza da JPEG e PNG senza dipendenze (per ImageObject/OG). AVIF → null. */
function imageSize(absPath: string): { w: number; h: number; type: string } | null {
  try {
    const buf = fs.readFileSync(absPath)
    if (buf.length > 24 && buf.toString('ascii', 1, 4) === 'PNG')
      return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20), type: 'image/png' }
    if (buf[0] === 0xff && buf[1] === 0xd8) {
      let o = 2
      while (o < buf.length - 8) {
        if (buf[o] !== 0xff) { o++; continue }
        const m = buf[o + 1]
        if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc)
          return { h: buf.readUInt16BE(o + 5), w: buf.readUInt16BE(o + 7), type: 'image/jpeg' }
        o += 2 + buf.readUInt16BE(o + 2)
      }
    }
  } catch { /* ignora: nessuna dimensione */ }
  return null
}

const ldScript = (obj: unknown) =>
  `<script type="application/ld+json">${JSON.stringify(obj)}</script>`

/**
 * Meta description tagliata alla lunghezza che i motori mostrano davvero (~160
 * caratteri). Gli `excerpt` degli articoli sono lunghi 300-470 caratteri perché
 * servono anche da sommario in pagina e da `description` nei dati strutturati:
 * usarli tali e quali in <meta name="description"> significa farsi troncare la
 * frase a metà nella SERP. Qui tagliamo all'ultimo confine di frase utile, e in
 * mancanza di questo all'ultima parola intera. OG/Twitter/JSON-LD continuano a
 * ricevere il testo completo.
 */
function metaDescription(text: string, max = 160): string {
  const s = text.trim().replace(/\s+/g, ' ')
  if (s.length <= max) return s
  const head = s.slice(0, max)
  // Preferisci chiudere su una frase compiuta, se ne finisce una oltre metà stringa.
  const sentence = Math.max(head.lastIndexOf('. '), head.lastIndexOf('! '), head.lastIndexOf('? '))
  if (sentence > max * 0.55) return head.slice(0, sentence + 1)
  const word = head.lastIndexOf(' ')
  return `${head.slice(0, word > 0 ? word : max).replace(/[,;:—-]$/, '')}…`
}

/** Breadcrumb Home › Pagina: candidabile al rich result "briciole di pane" di Google. */
const breadcrumbLd = (route: string, label: string) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${DOMAIN}/` },
    { '@type': 'ListItem', position: 2, name: label, item: `${DOMAIN}${route}` },
  ],
})

/** Scheda app gratuita (categoria salute) per la pagina /app. */
const softwareAppLd = (name: string, desc: string) => ({
  '@context': 'https://schema.org',
  '@type': 'MobileApplication',
  name: 'BAB — Breaking All Barriers',
  alternateName: name,
  applicationCategory: 'HealthApplication',
  operatingSystem: 'iOS, Android',
  description: desc,
  inLanguage: 'it-IT',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  publisher: { '@type': 'Organization', name: 'BAB — Breaking All Barriers', url: `${DOMAIN}/` },
})

/**
 * Genera un index.html statico per ogni rotta con <title>, meta description, OG,
 * canonical e un blocco di contenuto SEO dentro #root (React lo sostituisce al
 * mount; createRoot non fa hydration → nessun mismatch). Dà ai crawler una pagina
 * indicizzabile per ogni URL anche senza eseguire JS.
 */
function prerenderRoutes(): Plugin {
  return {
    name: 'bab-prerender-routes',
    apply: 'build',
    closeBundle() {
      const dist = path.resolve('dist')
      const indexPath = path.join(dist, 'index.html')
      if (!fs.existsSync(indexPath)) return
      const baseHtml = fs.readFileSync(indexPath, 'utf8')
      const it = JSON.parse(fs.readFileSync(path.resolve('src/locales/it.json'), 'utf8'))
      const seo = it.seo

      // Schemi della home: WebSite (identità del sito) + FAQPage (dalle stesse Q&A
      // mostrate in pagina → candidabili ai rich result senza duplicare contenuto).
      const homeLd: unknown[] = [
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          '@id': `${DOMAIN}/#website`,
          name: 'BAB — Breaking All Barriers',
          // Le varianti con cui il nome viene effettivamente cercato e scritto:
          // senza dichiararle, "BAB sport" e "Breaking All Barriers" restano tre
          // stringhe scollegate invece che tre modi di nominare la stessa cosa.
          alternateName: ['BAB', 'BAB Sport', 'Breaking All Barriers', 'babsport'],
          url: `${DOMAIN}/`,
          inLanguage: ['it-IT', 'en-GB'],
          publisher: { '@id': `${DOMAIN}/#organization` },
          hasPart: { '@type': 'Blog', '@id': `${DOMAIN}/blog#blog`, url: `${DOMAIN}/blog` },
        },
        // NB: l'entità Organization (con logo, sameAs, knowsAbout) è statica nel
        // template index.html → è site-wide su ogni pagina. Non la ripetiamo qui
        // per non creare un nodo duplicato dello stesso editore.
      ]
      const faqItems: Array<{ q: string; a: string }> = it.faqHome?.items ?? []
      if (faqItems.length) {
        homeLd.push({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqItems.map(({ q, a }) => ({
            '@type': 'Question',
            name: q,
            acceptedAnswer: { '@type': 'Answer', text: a },
          })),
        })
      }
      // Glossario dei concetti-chiave come DefinedTermSet (GEO): dà ai motori
      // generativi definizioni curate e ancorate a entità note, referenziate dai
      // singoli articoli via `about`.
      homeLd.push({
        '@context': 'https://schema.org',
        '@type': 'DefinedTermSet',
        '@id': GLOSSARY_ID,
        name: 'Glossario BAB — salute e sviluppo delle giovani atlete',
        description:
          "Definizioni operative dei concetti ricorrenti negli articoli BAB: ogni voce riporta, dove esiste, il dato quantitativo e la fonte, e dichiara la popolazione a cui si riferisce. Sono i termini che gli articoli richiamano come entità (`about` e `mentions`).",
        url: `${DOMAIN}/`,
        inLanguage: 'it-IT',
        publisher: { '@id': `${DOMAIN}/#organization` },
        hasDefinedTerm: Object.keys(GLOSSARY).map(definedTerm),
      })

      const homeTags = homeLd.map(ldScript).join('\n    ')
      fs.writeFileSync(indexPath, baseHtml.replace('</head>', `    ${homeTags}\n  </head>`))

      const replaceAttr = (html: string, re: RegExp, value: string) =>
        re.test(html) ? html.replace(re, `$1${esc(value)}$2`) : html

      for (const [route, key] of Object.entries(PRERENDER_ROUTES)) {
        const s = seo[key]
        if (!s) continue
        let page = baseHtml
        page = page.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(s.title)}</title>`)
        page = replaceAttr(page, /(<meta name="description" content=")[^"]*(")/, s.desc)
        page = replaceAttr(page, /(<meta property="og:title" content=")[^"]*(")/, s.title)
        page = replaceAttr(page, /(<meta property="og:description" content=")[^"]*(")/, s.desc)
        page = replaceAttr(page, /(<meta property="og:url" content=")[^"]*(")/, `${DOMAIN}${route}`)
        page = replaceAttr(page, /(<meta name="twitter:title" content=")[^"]*(")/, s.title)
        page = replaceAttr(page, /(<meta name="twitter:description" content=")[^"]*(")/, s.desc)
        page = replaceAttr(page, /(<link rel="canonical" href=")[^"]*(")/, `${DOMAIN}${route}`)
        // Contenuto SEO dentro #root (sostituito da React al caricamento)
        page = page.replace(
          /<div id="root">\s*<\/div>/,
          `<div id="root"><h1>${esc(s.title)}</h1><p>${esc(s.desc)}</p></div>`,
        )

        // Dati strutturati per-rotta: breadcrumb sempre, scheda app solo su /app
        const routeLd: unknown[] = [breadcrumbLd(route, BREADCRUMB_LABEL[route] ?? s.title)]
        if (route === '/app') routeLd.push(softwareAppLd(s.title, s.desc))
        // FAQPage su /features dalle stesse Q&A in pagina (q1/a1…): candidabili
        // ai rich result e pescabili dalle risposte AI, senza duplicare contenuto.
        if (route === '/features') {
          const f: Record<string, string> = it.features?.faqs ?? {}
          const qa = [1, 2, 3].map((n) => ({ q: f[`q${n}`], a: f[`a${n}`] })).filter((x) => x.q && x.a)
          if (qa.length) {
            routeLd.push({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: qa.map(({ q, a }) => ({
                '@type': 'Question',
                name: q,
                acceptedAnswer: { '@type': 'Answer', text: a },
              })),
            })
          }
        }
        page = page.replace('</head>', `    ${routeLd.map(ldScript).join('\n    ')}\n  </head>`)

        const outDir = path.join(dist, route)
        fs.mkdirSync(outDir, { recursive: true })
        fs.writeFileSync(path.join(outDir, 'index.html'), page)
      }

      // --- Blog: una pagina statica per ogni coppia (slug, lingua) ---
      // IT canonica su /blog/{slug}, EN su /en/blog/{slug}. Le versioni si
      // dichiarano a vicenda con hreflang, così i motori sanno che sono la stessa
      // pagina in due lingue e non contenuto duplicato.
      const blogPath = path.resolve('src/generated/blog.json')
      const blogUrls: string[] = []
      // URL dei gemelli markdown (finiscono in llms.txt) e corpo integrale degli
      // articoli, che diventa llms-full.txt: l'intero sapere di BAB in un file.
      const mdUrls: string[] = []
      type CorpusEntry = { url: string; title: string; updated?: string | null; body: string }
      const fullCorpus: CorpusEntry[] = []
      const enCorpus: CorpusEntry[] = []
      const blogForLlms: Array<{ slug: string; title: string; excerpt: string; date: string | null; updated?: string | null; tags?: string[]; sources?: Array<{ name: string; url: string }>; faq?: Array<{ q: string; a: string }>; altUrls?: string[]; keyPoints?: string[] }> = []
      const blogLastmod = new Map<string, string>()
      // Indice statico inglese: servono titolo ed excerpt reali, non lo slug.
      const blogEnIndex: Array<{ url: string; title: string; excerpt: string; date: string | null; updated?: string | null; slug: string }> = []
      // url → alternate hreflang, per annotare la sitemap (Google legge gli
      // xhtml:link nella sitemap tanto quanto quelli in <head>).
      const blogAlternates = new Map<string, Array<{ hreflang: string; href: string }>>()
      if (fs.existsSync(blogPath)) {
        type Post = { slug: string; lang: string; title: string; date: string | null; updated?: string | null; author: string | null; excerpt: string; cover: string | null; tags?: string[]; words?: number; timeRequired?: string; sources?: Array<{ name: string; url: string }>; faq?: Array<{ q: string; a: string }>; html?: string }
        const allPosts: Post[] = JSON.parse(fs.readFileSync(blogPath, 'utf8')).posts ?? []
        // slug → lingua → articolo (solo le lingue che hanno un URL proprio)
        const bySlug = new Map<string, Map<string, Post>>()
        for (const p of allPosts) {
          if (!BLOG_LOCALES[p.lang]) continue
          if (!bySlug.has(p.slug)) bySlug.set(p.slug, new Map())
          bySlug.get(p.slug)!.set(p.lang, p)
        }
        // I link interni negli articoli sono scritti come /blog/{slug}: nelle
        // versioni tradotte vanno riscritti col prefisso, altrimenti un lettore
        // inglese viene rimbalzato sulla versione italiana al primo link.
        const localizeLinks = (html: string, prefix: string) =>
          prefix ? html.replace(/href="\/blog\//g, `href="${prefix}/blog/`) : html

        for (const [slug, variants] of bySlug) {
          const alternates = [...variants.keys()].map((l) => ({
            lang: l,
            url: `${DOMAIN}${BLOG_LOCALES[l].prefix}/blog/${slug}`,
          }))
          const canonicalIt = `${DOMAIN}/blog/${slug}`
          // Il corpo italiano serve due volte: per l'entità `mentions` (quali
          // concetti del glossario l'articolo tocca davvero, oltre a quelli dei
          // tag) e per llms-full.txt.
          const itBody = readPostBody('it', slug)
          for (const [lang, post] of variants) {
            const loc = BLOG_LOCALES[lang]
            const url = `${DOMAIN}${loc.prefix}/blog/${slug}`
            let page = baseHtml
            page = page.replace(/<html lang="[^"]*"/, `<html lang="${loc.htmlLang}"`)
            page = page.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(post.title)} — BAB</title>`)
            page = replaceAttr(page, /(<meta name="description" content=")[^"]*(")/, metaDescription(post.excerpt))
            page = replaceAttr(page, /(<meta property="og:title" content=")[^"]*(")/, post.title)
            page = replaceAttr(page, /(<meta property="og:description" content=")[^"]*(")/, post.excerpt)
            page = replaceAttr(page, /(<meta property="og:url" content=")[^"]*(")/, url)
            page = replaceAttr(page, /(<meta property="og:type" content=")[^"]*(")/, 'article')
            page = replaceAttr(page, /(<meta property="og:locale" content=")[^"]*(")/, loc.ogLocale)
            page = replaceAttr(page, /(<meta name="twitter:title" content=")[^"]*(")/, post.title)
            page = replaceAttr(page, /(<meta name="twitter:description" content=")[^"]*(")/, metaDescription(post.excerpt, 200))
            page = replaceAttr(page, /(<link rel="canonical" href=")[^"]*(")/, url)
            const coverDim = post.cover ? imageSize(path.join(path.resolve('public'), post.cover)) : null
            if (post.cover) {
              page = replaceAttr(page, /(<meta property="og:image" content=")[^"]*(")/, `${DOMAIN}${post.cover}`)
              page = replaceAttr(page, /(<meta name="twitter:image" content=")[^"]*(")/, `${DOMAIN}${post.cover}`)
              page = replaceAttr(page, /(<meta property="og:image:alt" content=")[^"]*(")/, post.title)
              page = replaceAttr(page, /(<meta name="twitter:image:alt" content=")[^"]*(")/, post.title)
              if (coverDim) {
                page = replaceAttr(page, /(<meta property="og:image:type" content=")[^"]*(")/, coverDim.type)
                page = replaceAttr(page, /(<meta property="og:image:width" content=")[^"]*(")/, String(coverDim.w))
                page = replaceAttr(page, /(<meta property="og:image:height" content=")[^"]*(")/, String(coverDim.h))
              }
            }
            // hreflang reciproci + x-default sulla versione italiana (canonica).
            const hreflangTags = [
              ...alternates.map((a) => `<link rel="alternate" hreflang="${BLOG_LOCALES[a.lang].hreflang}" href="${a.url}" />`),
              `<link rel="alternate" hreflang="x-default" href="${canonicalIt}" />`,
            ].join('\n    ')
            // Meta OpenGraph specifiche degli articoli (article:*): non presenti nel
            // template base, quindi iniettate qui prima di </head>.
            const articleMeta = [
              post.date ? `<meta property="article:published_time" content="${post.date}" />` : '',
              post.updated || post.date ? `<meta property="article:modified_time" content="${post.updated || post.date}" />` : '',
              post.author ? `<meta property="article:author" content="${esc(post.author)}" />` : '',
              post.tags?.[0] ? `<meta property="article:section" content="${esc(post.tags[0])}" />` : '',
              ...(post.tags ?? []).map((t) => `<meta property="article:tag" content="${esc(t)}" />`),
            ].filter(Boolean).join('\n    ')
            // Sorgente markdown della stessa pagina, dichiarata in <head>: un agente
            // che sa leggere `alternate` la preferisce all'HTML e cita il testo esatto.
            const mdUrl = `${url}.md`
            const mdLink = `<link rel="alternate" type="text/markdown" href="${mdUrl}" title="${esc(post.title)} (markdown)" />`
            page = page.replace('</head>', `    ${hreflangTags}\n    ${mdLink}\n    ${articleMeta}\n  </head>`)
            // Le FAQ finiscono anche nel contenuto statico di #root (React lo
            // sostituisce al mount): così sono visibili ai crawler senza JS e
            // combaciano con il dato strutturato FAQPage qui sotto.
            const faqHtml = (post.faq ?? [])
              .map((f) => `<h2>${esc(f.q)}</h2><p>${esc(f.a)}</p>`)
              .join('')
            // Corpo COMPLETO dell'articolo nell'HTML statico. Prima qui finivano solo
            // titolo, excerpt, sommario e FAQ: circa il 40% del testo. Il resto
            // arrivava solo dopo il mount di React, cioè nella seconda ondata di
            // rendering di Google — lenta e non garantita su un dominio giovane.
            // Ora il crawler trova l'articolo intero, fonti comprese, senza JS.
            const bodyHtml = localizeLinks(post.html ?? '', loc.prefix)
            page = page.replace(
              /<div id="root">\s*<\/div>/,
              `<div id="root"><article><h1>${esc(post.title)}</h1><p>${esc(post.excerpt)}</p>${bodyHtml}${faqHtml}</article></div>`,
            )
            const breadcrumb = {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: `${DOMAIN}/` },
                { '@type': 'ListItem', position: 2, name: 'Blog', item: `${DOMAIN}${loc.prefix}/blog` },
                { '@type': 'ListItem', position: 3, name: post.title, item: url },
              ],
            }
            const blogPosting = {
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              '@id': `${url}#article`,
              url,
              headline: post.title,
              description: post.excerpt,
              ...(post.date ? { datePublished: post.date } : {}),
              ...(post.updated || post.date ? { dateModified: post.updated || post.date } : {}),
              // L'autore è la stessa entità su tutti gli articoli (@id condiviso):
              // è così che un motore capisce che 21 pagine hanno una firma sola.
              ...(post.author
                ? { author: { '@type': 'Person', '@id': `${DOMAIN}/about#autore`, name: post.author, url: `${DOMAIN}/about` } }
                : {}),
              // L'articolo appartiene al blog e ha una controparte tradotta: due
              // relazioni che evitano di leggere IT ed EN come pagine scollegate.
              isPartOf: { '@type': 'Blog', '@id': `${DOMAIN}${loc.prefix}/blog#blog` },
              ...(() => {
                const other = alternates.find((a) => a.lang !== lang)
                if (!other) return {}
                return lang === 'it'
                  ? { workTranslation: { '@type': 'BlogPosting', '@id': `${other.url}#article`, url: other.url, inLanguage: BLOG_LOCALES[other.lang].inLanguage } }
                  : { translationOfWork: { '@type': 'BlogPosting', '@id': `${other.url}#article`, url: other.url, inLanguage: BLOG_LOCALES[other.lang].inLanguage } }
              })(),
              // Dove sta il testo in chiaro: per un agente è la via più corta al
              // contenuto, e toglie di mezzo il rischio di citare il menu del sito.
              encoding: { '@type': 'MediaObject', encodingFormat: 'text/markdown', contentUrl: `${url}.md` },
              ...(post.cover
                ? {
                    image: {
                      '@type': 'ImageObject',
                      url: `${DOMAIN}${post.cover}`,
                      ...(coverDim ? { width: coverDim.w, height: coverDim.h } : {}),
                    },
                  }
                : {}),
              ...(post.tags?.length ? { keywords: post.tags.join(', '), articleSection: post.tags[0] } : {}),
              ...(post.words ? { wordCount: post.words } : {}),
              ...(post.timeRequired ? { timeRequired: post.timeRequired } : {}),
              isAccessibleForFree: true,
              inLanguage: loc.inLanguage,
              // Entità collegate (GEO): i concetti-chiave dell'articolo come DefinedTerm.
              // Il glossario è in italiano: lo agganciamo tramite i tag della versione
              // italiana, così anche la pagina EN punta alle stesse entità.
              ...(() => {
                const tagSource = variants.get('it')?.tags ?? post.tags ?? []
                const terms = tagSource.filter((t) => GLOSSARY[t]).map(definedTerm)
                return terms.length ? { about: terms } : {}
              })(),
              // `about` dice di cosa parla la pagina, `mentions` quali altre entità
              // del glossario compaiono nel testo: è la differenza tra "questo
              // articolo tratta la dismenorrea" e "questo articolo nomina la RED-S".
              // Il match è sul nome breve del termine e solo sul corpo italiano, che
              // è la versione canonica; niente match, niente menzione.
              ...(() => {
                if (!itBody) return {}
                const tagged = new Set(variants.get('it')?.tags ?? post.tags ?? [])
                const haystack = itBody.toLowerCase()
                const found = Object.keys(GLOSSARY)
                  .filter((k) => !tagged.has(k))
                  .filter((k) => {
                    const short = GLOSSARY[k].name.split(/\s*[(—]/)[0].trim().toLowerCase()
                    return short.length > 3 && haystack.includes(short)
                  })
                  .slice(0, 12)
                return found.length ? { mentions: found.map(definedTerm) } : {}
              })(),
              // Citazioni scientifiche (E-E-A-T/GEO): le stesse fonti elencate in fondo
              // all'articolo, come dato strutturato ScholarlyArticle.
              ...(post.sources?.length
                ? { citation: post.sources.map((s) => ({ '@type': 'ScholarlyArticle', name: s.name, url: s.url, '@id': s.url })) }
                : {}),
              // Contenuto leggibile ad alta voce (AEO / voice assistant).
              // Speakable (AEO): oltre ai titoli, indichiamo il sommario "In breve", il
              // primo paragrafo e l'elenco puntato del sommario — cioè le parti scritte
              // per essere lette ad alta voce come risposta autonoma da un assistente
              // vocale. Includiamo anche il blocco FAQ, che è già in forma domanda →
              // risposta breve e quindi il candidato migliore a una lettura vocale.
              // `h2 + p` copre il paragrafo che segue ogni H2: negli articoli è scritto
              // in forma "risposta prima di tutto", cioè la risposta autonoma alla
              // domanda posta dal titolo — esattamente ciò che un answer engine cerca.
              speakable: {
                '@type': 'SpeakableSpecification',
                cssSelector: [
                  'h1',
                  'h2',
                  '.blog-prose > blockquote:first-of-type',
                  '.blog-prose > blockquote:first-of-type li',
                  '.blog-prose > p:first-of-type',
                  '.blog-prose > h2 + p',
                  '.blog-prose > h2 + ul > li',
                  '.blog-faq',
                ],
              },
              mainEntityOfPage: { '@type': 'WebPage', '@id': url },
              publisher: {
                '@type': 'Organization',
                name: 'BAB — Breaking All Barriers',
                url: `${DOMAIN}/`,
                // Google richiede il logo dell'editore per i rich result "Article".
                logo: { '@type': 'ImageObject', url: `${DOMAIN}/icon-512.png`, width: 512, height: 512 },
              },
            }
            const articleLd: unknown[] = [breadcrumb, blogPosting]
            // FAQPage dagli stessi Q&A mostrati in pagina: pescabile dalle risposte
            // AI (AEO/GEO) e candidabile ai rich result, senza duplicare contenuto.
            if (post.faq?.length) {
              articleLd.push({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: post.faq.map((f) => ({
                  '@type': 'Question',
                  name: f.q,
                  acceptedAnswer: { '@type': 'Answer', text: f.a },
                })),
              })
            }
            page = page.replace('</head>', `    ${articleLd.map(ldScript).join('\n    ')}\n  </head>`)
            const outDir = path.join(dist, ...loc.prefix.split('/').filter(Boolean), 'blog', slug)
            fs.mkdirSync(outDir, { recursive: true })
            fs.writeFileSync(path.join(outDir, 'index.html'), page)
            // --- Gemello markdown della pagina (GEO) ---
            // Stesso contenuto, senza markup: intestazione con i metadati che
            // servono a citare (URL canonico, date, autore, come attribuire) e poi
            // il testo integrale, fonti comprese.
            const rawBody = lang === 'it' ? itBody : readPostBody(lang, slug)
            if (rawBody) {
              const isIt = lang === 'it'
              // Le FAQ vivono nel frontmatter, quindi non sono nel corpo markdown:
              // senza questo blocco sparirebbero proprio dalla versione pensata per
              // essere letta da una macchina, che è dove servono di più — sono già
              // in forma domanda → risposta breve e autonoma.
              const faqMd = post.faq?.length
                ? [
                    '',
                    `## ${isIt ? 'Domande frequenti' : 'Frequently asked questions'}`,
                    '',
                    ...post.faq.flatMap((f) => [`### ${f.q}`, '', f.a, '']),
                  ].join('\n')
                : ''
              // Le FAQ vanno prima delle fonti: l'elenco delle fonti resta l'ultima
              // cosa del file, che è dove chi cita va a cercarlo.
              const srcIdx = rawBody.search(/^## (Fonti|Sources)\b/m)
              const body =
                faqMd && srcIdx >= 0
                  ? `${rawBody.slice(0, srcIdx).trimEnd()}\n${faqMd}\n${rawBody.slice(srcIdx)}`
                  : `${rawBody}\n${faqMd}`
              // Nota: il filtro toglie solo le righe condizionali vuote, non le righe
              // vuote di impaginazione — che in markdown sono sintassi, non spazio.
              const meta = [
                `- ${isIt ? 'Pagina' : 'Page'}: ${url}`,
                `- ${isIt ? 'Fonte markdown' : 'Markdown source'}: ${url}.md`,
                post.date ? `- ${isIt ? 'Pubblicato' : 'Published'}: ${post.date}` : '',
                post.updated ? `- ${isIt ? 'Aggiornato' : 'Updated'}: ${post.updated}` : '',
                post.author ? `- ${isIt ? 'Autore' : 'Author'}: ${post.author}` : '',
                `- ${isIt ? 'Editore' : 'Publisher'}: BAB — Breaking All Barriers (${DOMAIN}/)`,
                post.tags?.length ? `- Tag: ${post.tags.join(', ')}` : '',
                isIt
                  ? `- Come citare: BAB — Breaking All Barriers, «${post.title}», ${url}`
                  : `- How to cite: BAB — Breaking All Barriers, "${post.title}", ${url}`,
                isIt
                  ? "- Nota: contenuto educativo, non parere medico. Ogni affermazione di salute è ancorata a una fonte elencata in «Fonti»; quando uno studio è condotto su adulti, il testo lo dichiara."
                  : '- Note: educational content, not medical advice. Every health claim is anchored to a source listed under "Sources"; where a study was run on adults, the text says so.',
              ].filter(Boolean)
              const head = [`# ${post.title}`, '', `> ${post.excerpt}`, '', ...meta, '', '---', '', ''].join('\n')
              fs.writeFileSync(path.join(dist, ...loc.prefix.split('/').filter(Boolean), 'blog', `${slug}.md`), `${head}${body}\n`)
              mdUrls.push(`${url}.md`)
              if (lang === 'it') fullCorpus.push({ url, title: post.title, updated: post.updated || post.date, body })
              else enCorpus.push({ url, title: post.title, updated: post.updated || post.date, body })
            }
            blogUrls.push(url)
            if (lang === 'en') blogEnIndex.push({ url, title: post.title, excerpt: post.excerpt, date: post.date, updated: post.updated, slug })
            blogAlternates.set(url, [
              ...alternates.map((a) => ({ hreflang: BLOG_LOCALES[a.lang].hreflang, href: a.url })),
              { hreflang: 'x-default', href: canonicalIt },
            ])
            // lastmod = data dell'ultima revisione reale (updated), non della prima
            // pubblicazione: è ciò che dice ai crawler che vale la pena ripassare.
            const lastmod = post.updated || post.date
            if (lastmod) blogLastmod.set(url, lastmod)
            // llms.txt è in italiano: elenchiamo la versione IT, segnalando l'URL
            // inglese come traduzione disponibile della stessa pagina.
            if (lang === 'it') {
              blogForLlms.push({
                slug,
                title: post.title,
                excerpt: post.excerpt,
                date: post.date,
                updated: post.updated,
                tags: post.tags,
                sources: post.sources,
                faq: post.faq,
                altUrls: alternates.filter((a) => a.lang !== 'it').map((a) => a.url),
                keyPoints: itBody ? keyPoints(itBody) : [],
              })
            }
          }
        }
      }

      // --- Indice italiano del blog (/blog): link interni statici + entità Blog ---
      // Fino a qui l'indice italiano usciva dal prerender con solo titolo e
      // sottotitolo: zero link verso i 21 articoli finché React non montava.
      // L'indice inglese, più recente, li aveva già. Qui si allinea l'italiano —
      // che è la versione canonica — e si dichiara il blog come entità unica di
      // cui ogni articolo è parte (`isPartOf` punta a questo @id).
      {
        const idxPath = path.join(dist, 'blog', 'index.html')
        const byRecency = [...blogForLlms].sort((a, b) =>
          String(b.updated || b.date || '').localeCompare(String(a.updated || a.date || '')),
        )
        if (fs.existsSync(idxPath) && byRecency.length) {
          let page = fs.readFileSync(idxPath, 'utf8')
          const items = byRecency
            .map(
              (p) =>
                `<li><a href="/blog/${p.slug}">${esc(p.title)}</a> — ${esc(metaDescription(p.excerpt, 180))}</li>`,
            )
            .join('')
          page = page.replace(/(<div id="root">[\s\S]*?)<\/div>/, `$1<ul>${items}</ul></div>`)
          const blogEntity = {
            '@context': 'https://schema.org',
            '@type': 'Blog',
            '@id': `${DOMAIN}/blog#blog`,
            url: `${DOMAIN}/blog`,
            name: 'Blog BAB — salute e crescita delle giovani atlete',
            description:
              "Articoli con fonti peer-reviewed su pubertà, ciclo mestruale, infortuni, dolore e abbandono sportivo nelle atlete adolescenti. Ogni affermazione di salute è ancorata a una fonte citata; quando uno studio è condotto su adulti, l'articolo lo dichiara.",
            inLanguage: 'it-IT',
            publisher: { '@type': 'Organization', name: 'BAB — Breaking All Barriers', url: `${DOMAIN}/` },
            blogPost: byRecency.map((p) => ({
              '@type': 'BlogPosting',
              '@id': `${DOMAIN}/blog/${p.slug}#article`,
              url: `${DOMAIN}/blog/${p.slug}`,
              headline: p.title,
              description: p.excerpt,
              ...(p.date ? { datePublished: p.date } : {}),
              ...(p.updated || p.date ? { dateModified: p.updated || p.date } : {}),
            })),
          }
          const itemList = {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Articoli del blog BAB',
            numberOfItems: byRecency.length,
            itemListOrder: 'https://schema.org/ItemListOrderDescending',
            itemListElement: byRecency.map((p, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              url: `${DOMAIN}/blog/${p.slug}`,
              name: p.title,
            })),
          }
          page = page.replace('</head>', `    ${[blogEntity, itemList].map(ldScript).join('\n    ')}\n  </head>`)
          fs.writeFileSync(idxPath, page)
        }
      }

      // --- Pagina lista del blog in inglese (/en/blog) ---
      // Stessa logica degli articoli: senza un URL proprio, l'indice inglese non
      // esiste per un crawler e le pagine EN restano orfane di link interni.
      {
        const en = JSON.parse(fs.readFileSync(path.resolve('src/locales/en.json'), 'utf8'))
        const s = en.seo?.blog
        if (s) {
          const url = `${DOMAIN}/en/blog`
          let page = baseHtml
          page = page.replace(/<html lang="[^"]*"/, '<html lang="en"')
          page = page.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(s.title)}</title>`)
          page = replaceAttr(page, /(<meta name="description" content=")[^"]*(")/, s.desc)
          page = replaceAttr(page, /(<meta property="og:title" content=")[^"]*(")/, s.title)
          page = replaceAttr(page, /(<meta property="og:description" content=")[^"]*(")/, s.desc)
          page = replaceAttr(page, /(<meta property="og:url" content=")[^"]*(")/, url)
          page = replaceAttr(page, /(<meta property="og:locale" content=")[^"]*(")/, 'en_GB')
          page = replaceAttr(page, /(<meta name="twitter:title" content=")[^"]*(")/, s.title)
          page = replaceAttr(page, /(<meta name="twitter:description" content=")[^"]*(")/, s.desc)
          page = replaceAttr(page, /(<link rel="canonical" href=")[^"]*(")/, url)
          const hreflangTags = [
            `<link rel="alternate" hreflang="it" href="${DOMAIN}/blog" />`,
            `<link rel="alternate" hreflang="en" href="${url}" />`,
            `<link rel="alternate" hreflang="x-default" href="${DOMAIN}/blog" />`,
          ].join('\n    ')
          page = page.replace('</head>', `    ${hreflangTags}\n  </head>`)
          // Indice statico degli articoli inglesi: dà ai crawler i link interni
          // verso ogni /en/blog/{slug} anche senza eseguire JS. Il testo del link
          // è il TITOLO inglese, non lo slug: l'anchor text è uno dei segnali più
          // forti su cosa tratti la pagina di destinazione, e uno slug italiano
          // ("mal-di-schiena-giovani-atlete") su un indice inglese non ne è uno.
          const enIndex = blogEnIndex
            .map(
              (p) =>
                `<li><a href="${p.url.replace(DOMAIN, '')}">${esc(p.title)}</a> — ${esc(metaDescription(p.excerpt, 180))}</li>`,
            )
            .join('')
          page = page.replace(
            /<div id="root">\s*<\/div>/,
            `<div id="root"><h1>${esc(s.title)}</h1><p>${esc(s.desc)}</p><ul>${enIndex}</ul></div>`,
          )
          // Stesse entità dell'indice italiano, sul ramo inglese: il blog come
          // entità (a cui gli articoli EN dichiarano di appartenere) e la lista
          // ordinata dei pezzi, così l'indice EN non è solo una pagina di link.
          const enByRecency = [...blogEnIndex].sort((a, b) =>
            String(b.updated || b.date || '').localeCompare(String(a.updated || a.date || '')),
          )
          const enBlogEntity = {
            '@context': 'https://schema.org',
            '@type': 'Blog',
            '@id': `${DOMAIN}/en/blog#blog`,
            url,
            name: 'BAB Blog — health and development of young female athletes',
            description:
              'Evidence-based articles on puberty, the menstrual cycle, injury, pain and drop-out in adolescent female athletes. Every health claim is anchored to a cited source; where a study was run on adults, the article says so.',
            inLanguage: 'en-GB',
            publisher: { '@type': 'Organization', name: 'BAB — Breaking All Barriers', url: `${DOMAIN}/` },
            blogPost: enByRecency.map((p) => ({
              '@type': 'BlogPosting',
              '@id': `${p.url}#article`,
              url: p.url,
              headline: p.title,
              description: p.excerpt,
              ...(p.date ? { datePublished: p.date } : {}),
              ...(p.updated || p.date ? { dateModified: p.updated || p.date } : {}),
            })),
          }
          const enItemList = {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'BAB blog articles',
            numberOfItems: enByRecency.length,
            itemListOrder: 'https://schema.org/ItemListOrderDescending',
            itemListElement: enByRecency.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: p.url, name: p.title })),
          }
          page = page.replace(
            '</head>',
            `    ${[breadcrumbLd('/en/blog', 'Blog'), enBlogEntity, enItemList].map(ldScript).join('\n    ')}\n  </head>`,
          )
          const outDir = path.join(dist, 'en', 'blog')
          fs.mkdirSync(outDir, { recursive: true })
          fs.writeFileSync(path.join(outDir, 'index.html'), page)
          blogUrls.push(url)
        }
      }

      // --- Sitemap: inserisce le URL del blog (lista + articoli) prima di </urlset> ---
      const sitemapPath = path.join(dist, 'sitemap.xml')
      if (fs.existsSync(sitemapPath)) {
        let xml = fs.readFileSync(sitemapPath, 'utf8')
        const latestBlog = [...blogLastmod.values()].sort().slice(-1)[0]
        // Le pagine indice (IT ed EN) prendono la data dell'articolo più recente.
        const indexPages = new Set([`${DOMAIN}/blog`, `${DOMAIN}/en/blog`])
        const entries = [`${DOMAIN}/blog`, ...blogUrls]
          .filter((u) => !xml.includes(`<loc>${u}</loc>`))
          .map((u) => {
            const lm = indexPages.has(u) ? latestBlog : blogLastmod.get(u)
            const lmTag = lm ? `\n    <lastmod>${lm}</lastmod>` : ''
            // Alternate hreflang anche nella sitemap: è il canale che Google
            // consiglia quando le versioni linguistiche sono molte, e non
            // dipende dal fatto che il crawler renderizzi la pagina.
            const alt = (blogAlternates.get(u) ?? [])
              .map((a) => `\n    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}" />`)
              .join('')
            return `  <url>\n    <loc>${u}</loc>${lmTag}${alt}\n    <changefreq>weekly</changefreq>\n    <priority>0.6</priority>\n  </url>`
          })
          .join('\n')
        if (entries) xml = xml.replace('</urlset>', `${entries}\n</urlset>`)
        fs.writeFileSync(sitemapPath, xml)
      }

      // --- llms.txt (GEO): guida per assistenti/answer engine, generata dal manifest ---
      // Convenzione llmstxt.org: titolo, sintesi, e link curati alle risorse chiave.
      const llms = [
        '# BAB — Breaking All Barriers',
        '',
        '> BAB è un ecosistema digitale per la salute e la crescita delle giovani atlete (13-17 anni). ' +
          "Aiuta le atlete a riconoscere in privato i segnali del proprio corpo — energia, umore, recupero, ciclo mestruale — " +
          'e fornisce alle società sportive solo segnali aggregati e anonimi, mai il dato di salute individuale.',
        '',
        '## Principi',
        '- I dati di salute individuali restano privati: le società vedono solo aggregati anonimi.',
        '- Approccio evidence-based: si monitora e si segnala, non si diagnostica; la fase del ciclo è una stima, non un dato clinico.',
        '- Pensato per minori: privacy-first, linguaggio non giudicante, nessun uso dei dati per addestrare modelli.',
        '',
        '## Politica editoriale (come leggere e citare questi contenuti)',
        '- Ogni affermazione di salute, fisiologica o statistica è ancorata a una fonte citata in fondo a ciascun articolo, preferibilmente con DOI.',
        "- Quando una fonte è stata condotta su adulti, l'articolo lo dichiara esplicitamente: i risultati su atlete adulte non vengono presentati come validi per ragazze di 13-14 anni.",
        "- La ricerca \"grigia\" (report non peer-reviewed) è etichettata come tale, e distinta dalla letteratura peer-reviewed.",
        '- I contenuti sono educativi e non costituiscono parere medico né strumento diagnostico.',
        '- Citazione consigliata: BAB — Breaking All Barriers, titolo dell\'articolo, ' + `${DOMAIN}/blog/{slug}.`,
        '',
        '## Come leggere questo sito da macchina',
        `- Ogni articolo ha un gemello in markdown allo stesso URL con suffisso .md: ${DOMAIN}/blog/{slug}.md (inglese: ${DOMAIN}/en/blog/{slug}.md). È il testo integrale, fonti comprese, senza markup di pagina — la via più corta e più fedele al contenuto.`,
        '- La stessa URL è dichiarata in ogni pagina HTML come <link rel="alternate" type="text/markdown">.',
        `- L'intero corpus in un solo file: ${DOMAIN}/llms-full.txt (italiano e inglese, tutti gli articoli per esteso).`,
        '- Dati strutturati su ogni articolo: BlogPosting con citation (ScholarlyArticle, una per fonte), FAQPage, DefinedTerm in `about` e `mentions`, SpeakableSpecification, BreadcrumbList. Le versioni italiana e inglese si dichiarano a vicenda con translationOfWork/workTranslation.',
        '- Le date da guardare sono due: `datePublished` e `dateModified`. Gli articoli vengono rivisti, e `dateModified` cambia solo quando il testo cambia davvero.',
        '',
        '## Come citare BAB',
        '- Attribuire alla pagina, non al sito: ogni affermazione vive in un articolo preciso, e i «punti chiave» elencati qui sotto sono già formulati per essere citati con il loro URL.',
        "- Riportare sempre la popolazione insieme al numero. Molti dati di questo campo vengono da studi su donne adulte: citarli su una ragazza di 13-14 anni senza dirlo è l'errore più comune del settore, ed è la ragione per cui questo sito ripete la popolazione a ogni cifra.",
        '- Le fonti primarie sono elencate in fondo a ogni articolo con DOI: quando possibile citare quella, e usare BAB come tramite verificabile.',
        '- Non usare questi contenuti come base diagnostica né come parere medico: sono materiale educativo.',
        '',
        '## Blog (articoli con fonti)',
        ...blogForLlms.flatMap((p) => {
          const meta = [p.updated ? `aggiornato ${p.updated}` : p.date, ...(p.tags ?? [])].filter(Boolean).join(' · ')
          const lines = [`- [${p.title}](${DOMAIN}/blog/${p.slug})${meta ? ` — ${meta}` : ''}: ${p.excerpt}`]
          lines.push(`  Testo integrale in markdown: ${DOMAIN}/blog/${p.slug}.md`)
          if (p.altUrls?.length) lines.push(`  Versione inglese della stessa pagina: ${p.altUrls.join(' · ')} (markdown: ${p.altUrls.map((u) => `${u}.md`).join(' · ')})`)
          if (p.faq?.length) lines.push(`  Risponde a: ${p.faq.map((f) => f.q).join(' | ')}`)
          // I punti chiave sono già affermazioni autonome con la loro fonte: qui
          // stanno sotto l'URL da cui provengono, così una citazione non perde
          // l'ancora alla pagina che la sostiene.
          if (p.keyPoints?.length) {
            lines.push('  Punti chiave (da attribuire a questa pagina):')
            for (const k of p.keyPoints) lines.push(`    · ${k}`)
          }
          if (p.sources?.length) lines.push(`  Fonti: ${p.sources.map((s) => s.url).join(' · ')}`)
          return lines
        }),
        '',
        // Affermazioni fattuali nette, ciascuna legata alla sua fonte: pensate per
        // essere citate testualmente da un motore generativo senza perdere l'ancora.
        '## Fatti citabili (ognuno con la sua fonte e la sua popolazione)',
        '- Tra le ragazze tesserate a 10-14 anni, il 71% abbandona lo sport senza mai rientrare. Fonte: Eime et al., 2020.',
        "- Il 77% delle atlete d'élite riferisce che il ciclo mestruale ha influenzato negativamente la propria performance. Popolazione: 128 atlete ADULTE, età media 28 anni. Fonte: Jones et al., 2024, doi:10.3389/fspor.2024.1296189.",
        '- Tra le adolescenti di 10-18 anni, dal 25,2% al 61,1% evita o riduce l\'attività fisica durante le mestruazioni. Fonte: Harvey et al., 2025, doi:10.1186/s12905-025-03825-w.',
        "- Solo l'11% delle atlete parla di ciclo mestruale con il proprio allenatore: 4% se è un uomo, 55% se è una donna; l'88% ha imparato queste cose da sola. Popolazione: 1.086 atlete, adulte e adolescenti insieme, dati non suddivisi per età. Fonte: Höök et al., 2022, doi:10.3390/ijerph191911932.",
        '- Il 44% delle atlete adolescenti crede erroneamente che perdere il ciclo sia una normale risposta a carichi di allenamento elevati. Popolazione: 90 atlete adolescenti. Fonte: Armento et al., 2021, doi:10.4085/624-20.',
        '- Nelle atlete adolescenti (11-18 anni) la prevalenza di carenza di ferro lieve (ferritina ≤30 µg/L) è del 53,2%, mentre l\'anemia sideropenica riguarda il 4%. Fonte: Nicotra et al., 2023, doi:10.3390/jcm12030970.',
        "- A 13-14 anni il 51% delle ragazze dice che il seno influenza la partecipazione allo sport, ma solo il 10% indossa sempre un reggiseno sportivo. Fonte: Scurr et al., 2016.",
        '- La raccomandazione di consenso per i 13-18 anni è di 8-10 ore di sonno per notte. Fonte: Paruthi et al., 2016, doi:10.5664/jcsm.5866.',
        '- Negli atleti adolescenti, dormire meno di 8 ore per notte è associato a essere infortunati 1,7 volte più spesso (IC 95% 1,0-3,0; p=0,04). Popolazione: 112 atleti adolescenti di entrambi i sessi, risultati non suddivisi per sesso; associazione, non causa dimostrata. Fonte: Milewski et al., 2014, doi:10.1097/BPO.0000000000000151.',
        '- I sintomi di insonnia salgono dal 3,4% al 12,2% nelle ragazze tra lo stadio 1 e lo stadio 5 di Tanner, contro il 4,3%-9,1% nei ragazzi. Popolazione: 7.507 bambini e adolescenti di 6-17 anni. Fonte: Zhang et al., 2016, doi:10.5665/sleep.6022.',
        '- Solo il 6% degli studi in scienze dello sport è condotto esclusivamente su donne. Fonte: Cowley et al., 2021, doi:10.1123/wspaj.2021-0028.',
        "- Nello sport delle scuole superiori le ragazze subiscono 0,084 rotture del legamento crociato anteriore ogni 1.000 esposizioni contro 0,060 nei ragazzi (rapporto 1,40; IC 95% 1,25-1,57); il divario più ampio è nel basket (RR 4,14) e il tasso assoluto più alto nel calcio femminile (0,166). Popolazione: atleti adolescenti delle scuole superiori. Fonte: Bram et al., 2021, doi:10.1177/0363546520959619.",
        "- L'allenamento neuromuscolare preventivo riduce il rischio di rottura del crociato da circa 1 su 54 a 1 su 111 (OR 0,51; IC 95% 0,37-0,69); tra le atlete di 13-19 anni l'odds ratio scende a 0,38 (IC 95% 0,24-0,60), circa il 60% di rischio in meno. Dose media efficace: 24,1 minuti a sessione, 2,51 volte a settimana. Popolazione: 27.231 atlete di 13-24 anni, sottogruppo 13-19 riportato separatamente. Fonte: Petushek et al., 2019, doi:10.1177/0363546518782460.",
        "- Il beneficio dei programmi di prevenzione dipende dall'aderenza: gli studi ad alta aderenza registrano un'incidenza di rotture pari a 0,27 volte quella degli studi a bassa aderenza (IC 95% 0,07-0,80), con una soglia stimata intorno al 66%. Popolazione: atlete di 14-22 anni. Fonte: Sugimoto et al., 2012, doi:10.4085/1062-6050-47.6.10.",
        "- Dopo la pubertà le ragazze atterrano con un valgismo dinamico di ginocchio significativamente maggiore dei coetanei maschi (-9,3° contro -3,6°; p<0,001), mentre nei maschi il valore non cambia negli anni. Popolazione: 315 giovani atleti di entrambi i sessi, studio longitudinale. Fonte: Ford et al., 2010, doi:10.1249/MSS.0b013e3181dc99b1.",
        "- Non esiste evidenza sufficiente per legare la fase del ciclo mestruale al rischio di rottura del crociato: su 21 studi e 68.758 partecipanti la qualità complessiva delle prove è giudicata «molto bassa» secondo GRADE. Fonte: Herzberg et al., 2017, doi:10.1177/2325967117718781.",
        "- L'effetto della fase del ciclo mestruale sulla performance è di entità banale (ES 0,5 = -0,06; CrI 95% -0,16 a 0,04), con qualità delle prove bassa secondo GRADE. Popolazione: 78 studi, 1.193 donne ADULTE di 18-40 anni; nessun dato equivalente sulle adolescenti. Fonte: McNulty et al., 2020, doi:10.1007/s40279-020-01319-3.",
        "- Dopo una ricostruzione del crociato, il 23% degli atleti under 25 che tornano allo sport subisce un secondo infortunio al crociato. Popolazione: atleti di entrambi i sessi. Fonte: Wiggins et al., 2016, doi:10.1177/0363546515621554.",
        "- Tra le atlete adolescenti la prevalenza di incontinenza urinaria durante lo sport va dal 18,2% all'80% a seconda della disciplina, con una media del 48,58%; i valori più alti sono nel trampolino elastico (80%), nel salto con la corda (75%) e nel calcio (62,8%). Popolazione: 9 studi, 633 atlete sotto i 19 anni, età media 16,15. Fonte: Rial Rebullido et al., 2021, doi:10.3390/jfmk6010012.",
        "- L'87% delle atlete adolescenti dichiara che non parlerebbe dei propri sintomi di incontinenza urinaria con il proprio allenatore, e dal 69% al 90% non ha mai sentito nominare l'allenamento del pavimento pelvico. Fonte: Rial Rebullido et al., 2021, doi:10.3390/jfmk6010012.",
        "- Ai Mondiali under 20 di atletica di Lima 2024 il 43,7% degli atleti riferiva almeno un sintomo di disfunzione del pavimento pelvico (53,7% tra le ragazze, 29,3% tra i ragazzi) e il 12,9% perdite di urina durante salti, sprint e cambi di direzione; il 78,2% non ne aveva mai parlato con nessuno, l'88% non era mai stato sottoposto a screening e solo il 30% era consapevole del tema. Popolazione: 325 atleti under 20 di entrambi i sessi, età media 18,1 anni. Fonte: Giagio et al., 2025, doi:10.1136/bmjsem-2025-002564.",
        "- Tra 319 ginnaste e cheerleader di 12-36 anni (età media 17,4) la prevalenza di incontinenza urinaria è del 67,4%; tra chi ha incontinenza da sforzo l'82,6% riferisce un effetto negativo sulla prestazione e il 22,4% evita a volte l'allenamento o esercizi specifici. Fonte: Skaug et al., 2022, doi:10.1007/s00192-021-04696-z.",
        "- Nel calcio delle scuole superiori del Michigan le atlete hanno un rischio di commozione cerebrale 1,88 volte quello dei coetanei maschi (IC 95% 1,69-2,09): 950 casi tra le ragazze contro 557 tra i ragazzi. Il meccanismo prevalente differisce: contatto con un oggetto nelle ragazze (41,9%), con un altro giocatore nei ragazzi (48,4%); i maschi hanno 1,54 volte la probabilità di essere rimossi immediatamente dal campo. Popolazione: 83.378 atleti di scuola superiore (43.741 maschi, 39.637 femmine), 2016-2019, sport scolastico statunitense. Fonte: Bretzin et al., 2021, doi:10.1001/jamanetworkopen.2021.8191.",
        "- Negli sport confrontabili tra i due sessi, le atlete hanno 1,26 volte la probabilità di NON essere tolte dall'attività dopo una commozione cerebrale (IC 95% 1,09-1,45); nel calcio 1,37 (IC 95% 1,09-1,72). Popolazione: 4.418 commozioni cerebrali (2.773 femmine, 1.645 maschi) in 22 sport, scuole superiori del Michigan 2016-2019. Fonte: Zynda et al., 2021, doi:10.1177/03635465211020007.",
        "- Gli atleti adolescenti rimossi immediatamente dal gioco dopo una commozione cerebrale recuperano in media in 22,0 giorni, contro 44,4 giorni per chi continua a giocare (p=0,003); chi resta in campo ha 8,8 volte la probabilità di un recupero prolungato oltre i 21 giorni. Popolazione: 69 atleti di 12-19 anni di entrambi i sessi, reclutati in centro specialistico — campione piccolo e selezionato. Fonte: Elbin et al., 2016, doi:10.1542/peds.2016-0910.",
        "- Il 60% degli episodi di commozione cerebrale ricordati dagli atleti non era stato riferito a un adulto responsabile; per i colpi lievi («bell-ringer») la quota di non segnalazione sale all'87%. Popolazione: 167 atleti di scuola superiore di entrambi i sessi, età media 15,7 anni; studio preliminare. Fonte: Register-Mihalik et al., 2013, doi:10.4085/1062-6050-48.3.20.",
        "- Dopo una commozione cerebrale il consenso internazionale di Amsterdam 2022 indica riposo relativo (non assoluto) fino ai primi 2 giorni, attività fisica leggera già nelle prime 24-48 ore, ritorno a scuola in 4 tappe e ritorno allo sport in 6 tappe di almeno 24 ore ciascuna; il tempo medio aggregato al ritorno allo sport senza restrizioni è di circa 19,8 giorni (IC 95% 18,8-20,7; 57 studi) e si parla di sintomi persistenti oltre le 4 settimane. Fonte: Patricios et al., 2023, doi:10.1136/bjsports-2023-106898.",
        "- Le tre dichiarazioni di consenso più influenti sulla commozione cerebrale nello sport poggiano su 171 studi i cui campioni sono all'80,1% maschili; il 40,4% degli studi non include nemmeno un'atleta. Fonte: D'Lauro et al., 2022, doi:10.1136/bjsports-2021-105045.",
        "- Tra 219 atlete di 13-18 anni, le altamente specializzate in un solo sport riferiscono una storia di infortuni 2,93 volte più spesso delle poco specializzate (IC 95% 1,38-6,24) e una storia di commozione cerebrale 5,00 volte più spesso (IC 95% 1,86-13,42); le moderatamente specializzate riferiscono fratture da stress 3,62 volte più spesso (IC 95% 1,27-10,26). Popolazione: 219 atlete di scuola superiore, studio trasversale su questionario, intervalli di confidenza ampi. Fonte: Okoruwa et al., 2022, doi:10.1177/19417381221123532.",
        "- Gli atleti giovanili molto specializzati hanno un rischio di infortunio da sovraccarico 1,81 volte quello dei poco specializzati (IC 95% 1,26-2,60); il passaggio da bassa a moderata specializzazione porta già un RR di 1,39 (IC 95% 1,04-1,87). Popolazione: revisione sistematica con meta-analisi, atleti di entrambi i sessi, risultati non suddivisi per sesso; forza della raccomandazione grado B. Fonte: Bell et al., 2018, doi:10.1542/peds.2018-0657.",
        "- I giovani atleti che praticano più ore di sport organizzato a settimana dei propri anni d'età hanno 2,07 volte le probabilità di un infortunio grave da sovraccarico (IC 95% 1,40-3,05); un rapporto tra sport organizzato e gioco libero superiore a 2:1 porta a 1,87 volte (IC 95% 1,26-2,76). La specializzazione resta un fattore indipendente anche correggendo per età e ore (OR 1,27; IC 95% 1,07-1,52). Popolazione: studio caso-controllo su giovani atleti di entrambi i sessi. Fonte: Jayanthi et al., 2015, doi:10.1177/0363546514567298.",
        "- In uno studio longitudinale su 579 giovani atleti (età media 14,1 anni, 53% femmine) gli altamente specializzati avevano 1,41 volte le probabilità di infortunarsi (IC 95% 1,06-1,87) e le atlete femmine 1,43 volte le probabilità di un infortunio da sovraccarico (IC 95% 1,05-1,96; p=0,02). Popolazione: campione clinico, quindi selezionato verso chi già si rivolge a un medico. Fonte: Jayanthi et al., 2020, doi:10.1177/2325967120922764.",
        "- Gli atleti di livello mondiale da adulti hanno praticato più sport diversi da bambini, iniziato più tardi il proprio sport principale, accumulato meno pratica specifica e progredito più lentamente rispetto agli atleti di livello nazionale; tra i giovani atleti vale invece il contrario. Popolazione: meta-analisi di 51 studi, 6.096 atleti di entrambi i sessi, di cui 772 di livello mondiale. Fonte: Güllich et al., 2022, doi:10.1177/1745691620974772.",
        "- La guidance dell'American Academy of Pediatrics per gli under 18 indica: praticare più sport almeno fino alla pubertà, specializzarsi più tardi (tarda adolescenza, ~15-16 anni), meno ore settimanali di sport organizzato degli anni d'età e comunque sotto le 16, almeno 1-2 giorni a settimana liberi dallo sport specifico e almeno 3 mesi all'anno di stacco in blocchi di un mese. È guidance di consenso su evidenza limitata — l'AAP stessa scrive che la soglia esatta non è stata chiarita — e nasce nel contesto sportivo statunitense. Fonte: Brenner e AAP, 2016, doi:10.1542/peds.2016-2148.",
        "- Negli sport confrontabili tra i due sessi delle scuole superiori statunitensi, le atlete subiscono 2,22 fratture da stress ogni 100.000 esposizioni contro 1,27 dei coetanei maschi (rapporto 1,75; IC 95% 1,38-2,23) e rappresentano il 63,3% di tutti i casi; i tassi più alti sono nella corsa campestre femminile (10,62) e nella ginnastica femminile (7,43); le sedi più frequenti sono gamba (40,3%), piede (34,9%) e zona lombare o pelvica (15,2%). Popolazione: 389 fratture da stress su 51.773 infortuni, atleti di scuola superiore di entrambi i sessi, 2005-2013. Fonte: Changstrom et al., 2015, doi:10.1177/0363546514562739.",
        "- In uno studio prospettico su 748 corridori di scuola superiore (442 ragazze, 306 ragazzi) ha riportato una frattura da stress il 5,4% delle ragazze contro il 4,0% dei ragazzi; nelle ragazze i fattori associati erano indice di massa corporea basso, menarca tardivo e precedente pratica di ginnastica o danza, mentre nei ragazzi la pratica del basket risultava protettiva. Fonte: Tenforde et al., 2013, doi:10.1249/MSS.0b013e3182963d75.",
        "- Negli atleti adolescenti l'incidenza stimata di lesioni ossee da stress va dal 3,9% al 19%, con recidive fino al 21%. Attenzione: si tratta di una revisione narrativa, non sistematica, e l'intervallo è molto ampio perché dipende da sport, metodo diagnostico e popolazione. Fonte: Beck e Drysdale, 2021, doi:10.3390/sports9040052.",
        "- All'aumentare dei fattori di rischio della triade dell'atleta femminile cresce l'incidenza di lesioni ossee da stress: con bassa densità ossea (Z-score < -1,0) e ≥12 ore di allenamento a settimana il 29,7% ne ha subita una; sommando ≥12 ore, uno sport «di magrezza» e restrizione alimentare la quota sale al 46,2%, contro un 10,8% complessivo. Popolazione: 259 ragazze e giovani donne attive, ETÀ MEDIA 18,1 anni — non preadolescenti; studio osservazionale prospettico, associazioni e non causalità. Fonte: Barrack et al., 2014, doi:10.1177/0363546513520295.",
        "- Il contenuto minerale osseo totale raggiunge un plateau in media 6 anni dopo il picco di velocità di crescita staturale, che nelle ragazze corrisponde grosso modo ai 18 anni: la finestra per costruire massa ossea si chiude in adolescenza. Fonte: Baxter-Jones et al., 2011, doi:10.1002/jbmr.412.",
        "- I fattori di stile di vita (attività fisica, alimentazione, calcio, vitamina D) influenzano il 20-40% della massa ossea di picco dell'adulto; la parte restante è genetica. Fonte: Weaver et al., 2016 (revisione sistematica, National Osteoporosis Foundation), doi:10.1007/s00198-015-3440-3.",
        "- 10 minuti di salti al posto del riscaldamento dell'ora di educazione fisica, 2 volte a settimana per 8 mesi, hanno aumentato nelle ragazze il contenuto minerale osseo del collo del femore del 13,9% contro il 4,9% dei controlli, e la densità minerale ossea apparente lombare del 5,2% contro l'1,5%. Popolazione: studio controllato randomizzato su 99 adolescenti (53 ragazze, 46 ragazzi), età media 13,8 anni; effetti sesso-specifici. Fonte: Weeks et al., 2008, doi:10.1359/jbmr.080226.",
        "- La prevalenza annuale di dolore femoro-rotuleo negli adolescenti è stimata al 28,9%, contro il 22,7% nella popolazione generale; tra gli atleti adolescenti amatoriali l'incidenza nell'arco di una stagione va dal 5,1% al 14,9%. Attenzione: gli autori segnalano pochi studi e definizioni eterogenee. Popolazione: revisione sistematica con meta-analisi di 23 studi. Fonte: Smith et al., 2018, doi:10.1371/journal.pone.0190892.",
        "- Tra 504 adolescenti danesi di 15-19 anni con dolore al ginocchio almeno mensile, 363 (il 72%) erano ragazze; la durata mediana del dolore era di 24 mesi, il 68,3% aveva un esordio insidioso senza trauma e solo il 59% aveva cercato assistenza sanitaria. Tra le ragazze, chi aveva un dolore da trauma cercava aiuto nell'80% dei casi contro il 55,7% di chi aveva un esordio insidioso. Fonte: Rathleff et al., 2013, doi:10.1186/1471-2474-14-225.",
        "- Il dolore al ginocchio in adolescenza in molti casi non è autolimitante: a due anni il 55,9% di chi ne riferiva all'inizio ne riferiva ancora, e il dolore femoro-rotuleo aveva un rischio relativo di 1,26 rispetto ad altri tipi di dolore al ginocchio. Popolazione: adolescenti danesi di entrambi i sessi. Fonte: Rathleff et al., 2016, doi:10.1177/0363546515622456.",
        "- A cinque anni dal primo rilevamento, il 40,5% degli adolescenti con dolore al ginocchio ne ha ancora (IC 95% 35,4-45,6) contro il 13,2% dei controlli; tra chi ha ancora dolore il 60% ha smesso o ridotto lo sport a causa del ginocchio, il 15% dichiara che ha influenzato la scelta del lavoro e circa un terzo usa antidolorifici regolarmente. Popolazione: 504 adolescenti danesi di 15-19 anni di entrambi i sessi, coorte di popolazione scolastica. Fonte: Rathleff et al., 2019, doi:10.1136/bmjopen-2018-024113.",
        "- Nel dolore femoro-rotuleo degli adolescenti funziona la gestione del carico, non il riposo totale: 12 settimane di modifica dell'attività, esercizi a casa e ritorno graduale allo sport hanno prodotto l'86% di esiti riferiti come positivi a 12 settimane e l'81% a 12 mesi, con forza di anca e ginocchio aumentata del 20-33%. Popolazione: 151 adolescenti di 10-14 anni; studio prospettico SENZA gruppo di controllo, quindi non dimostrativo di efficacia. Fonte: Rathleff et al., 2019, doi:10.1177/0363546519843915.",
        "- Aggiungere esercizio supervisionato in orario scolastico alla sola educazione del paziente aumenta le probabilità di guarigione dal dolore femoro-rotuleo: OR 1,73 (IC 95% 1,02-2,93; NNT 11) a 12 mesi e OR 2,52 (NNT 5) a 24 mesi. Popolazione: trial randomizzato a cluster su 121 adolescenti di 15-19 anni. Fonte: Rathleff et al., 2015, doi:10.1136/bjsports-2014-093929.",
        "- Il consenso internazionale sul dolore femoro-rotuleo raccomanda la terapia con esercizio, in particolare la combinazione di esercizi per anca e ginocchio, e NON raccomanda le mobilizzazioni articolari isolate né gli agenti elettrofisici. Popolazione: dichiarazione di consenso su popolazione in larga parte ADULTA. Fonte: Collins et al., 2018, doi:10.1136/bjsports-2018-099397.",
        "- Le adolescenti femmine con dolore femoro-rotuleo hanno soglie di dolore alla pressione più basse delle coetanee senza dolore, anche in sedi lontane dal ginocchio: un dolore che dura mesi non resta un problema locale. Popolazione: studio trasversale su adolescenti femmine e controlli della stessa età. Fonte: Rathleff et al., 2013, doi:10.2519/jospt.2013.4383.",
        "- Nel morbo di Osgood-Schlatter una scala di progressione del carico sul tendine rotuleo con esercizi di rinforzo ha prodotto l'80% di esiti riferiti come positivi a 12 settimane e il 90% a 12 mesi. Popolazione: 51 adolescenti di 10-14 anni, 51% ragazze; coorte prospettica SENZA gruppo di controllo. Fonte: Rathleff et al., 2020, doi:10.1177/2325967120911106.",
        "- Tra 2.953 adolescenti danesi di 12-19 anni, il dolore al ginocchio era riferito dal 35,0% delle ragazze contro il 27,9% dei ragazzi, e il dolore quasi quotidiano in qualsiasi sede dal 23,8% contro il 13,3%. Fonte: Rathleff et al., 2013, doi:10.1186/1471-2431-13-191.",
        "- La riabilitazione del pavimento pelvico ha migliorato i sintomi in 5 studi su 6 (in uno, 64% del gruppo di allenamento contro 8% dei controlli), ma su popolazione ADULTA: 131 atlete, età media 23,19 anni. Gli autori segnalano che le evidenze sulle atlete adolescenti sono molto limitate. Fonte: Demeco et al., 2024, doi:10.3390/sports12120338.",
        "- Nelle giovani atlete l'età media stimata al picco di velocità di crescita (PHV) è di 11,18 anni, con intervallo di credibilità al 90% da 8,62 a 12,94 anni: l'ampiezza dell'intervallo è il dato, non un difetto della stima — in una stessa categoria convivono atlete biologicamente distanti anni. Popolazione: meta-analisi longitudinale bayesiana di 14 studi e 21 campioni indipendenti di giovani atlete. Fonte: Lima et al., 2024, doi:10.7759/cureus.59482.",
        '- Il picco di accumulo di contenuto minerale osseo si colloca circa 6 mesi DOPO il picco di velocità di crescita staturale: in quell\'intervallo l\'osso è già più lungo ma non ancora altrettanto denso. Popolazione: 53 ragazze e 60 ragazzi canadesi seguiti per 6 anni. Fonte: Bailey et al., 1999, doi:10.1359/jbmr.1999.14.10.1672.',
        "- Nelle giovani atlete l'evidenza a sostegno di un'associazione tra maturazione biologica e infortunio è LIMITATA; è invece moderata l'evidenza di un'associazione tra maturazione e fattori di rischio potenziali, soprattutto nella biomeccanica di salto e atterraggio e nel rischio di infortunio al ginocchio. Popolazione: revisione sistematica di 31 studi (10 sugli infortuni, 21 sui fattori di rischio) su ragazze e giovani donne nello sport. Fonte: Zoellner e Whatman, 2026, doi:10.1016/j.ptsp.2025.08.007.",
        "- In un'accademia calcistica d'élite una crescita superiore a 7,2 cm/anno prima del picco si associa a un'incidenza di infortuni 1,65 e 2,38 volte maggiore rispetto a crescita moderata e lenta, e il periodo attorno al picco registra il carico più alto: 136,0 giorni persi ogni 1.000 ore (IC 95% 119,6-154,6). ATTENZIONE: popolazione di 84 giocatori MASCHI seguiti per 20 stagioni — non trasferibile alle atlete. Fonte: Monasterio et al., 2024, doi:10.5114/biolsport.2024.129472.",
        "- Nelle giovani atlete l'incidenza complessiva di infortuni è di 4,4 ogni 1.000 ore (16,5 in partita, 2,2 in allenamento); il 40% subisce almeno un infortunio con perdita di tempo, il 67% degli infortuni riguarda l'arto inferiore (caviglia 23%, ginocchio 16%) e la mediana dei giorni persi è 10. Popolazione: revisione sistematica con meta-analisi di 32 studi, 15.908 giovani atlete. Fonte: Beech et al., 2024, doi:10.1007/s40279-023-01988-w.",
        "- La «goffaggine adolescenziale» non è un fatto acquisito: non esiste una definizione condivisa né un metodo standard di misurazione, alcuni studi osservano un calo della funzione sensomotoria durante lo scatto di crescita e altri un miglioramento continuo o un'elevata variabilità; sprint e salto tendono a migliorare. Gli autori segnalano che pochissimi studi hanno analizzato questi cambiamenti nelle ragazze adolescenti. Fonte: revisione NARRATIVA, Borato et al., 2025, doi:10.1177/17479541251364101; ipotesi originaria in Quatman-Yates et al., 2012, doi:10.1136/bjsm.2010.079616.",
        "- L'allenamento con i pesi non blocca la crescita: in una revisione basata sull'evidenza di 22 programmi sperimentali di allenamento contro resistenza in bambini e preadolescenti i programmi hanno migliorato significativamente la forza, NON hanno influenzato la crescita in statura e peso, e nei 10 studi che monitoravano sistematicamente gli infortuni ne sono stati riportati in tutto tre (tassi stimati 0,176 / 0,053 / 0,055 ogni 100 ore di partecipazione). La conclusione è condizionata: vale per protocolli CON supervisione e basso rapporto istruttore/partecipanti. I guadagni di forza si perdono con il detraining. Fonte: Malina, 2006, doi:10.1097/01.jsm.0000248843.31874.be.",
        "- Solo il 38,51% di bambini e adolescenti rispetta la raccomandazione OMS di attività di rinforzo muscolare almeno 3 giorni a settimana (IC 95% 34,35-42,75); tra i predittori del rispetto delle raccomandazioni compare l'essere maschio. Popolazione: meta-analisi di 29 studi, 1.273.544 bambini e adolescenti di 36 Paesi, 49,40% ragazze, età media 13,40 anni. Fonte: García-Hermoso et al., 2025, doi:10.1111/apa.70315.",
        "- L'effetto dell'allenamento contro resistenza sulla forza muscolare in bambini e adolescenti sani sotto i 18 anni ha un effect size complessivo di 1,12 (IC 95% 0,9-1,3); la maturità è un moderatore significativo e durata (r=0,28) e frequenza (r=0,26) correlano positivamente con i guadagni. La capacità di guadagnare forza cresce con età e stato maturativo, senza un'impennata alla pubertà. Fonte: Behringer et al., 2010, doi:10.1542/peds.2010-0445.",
        "- Nei giovani atleti di 6-18 anni l'allenamento contro resistenza produce effetti moderati su forza e salto verticale (SMD 0,8-1,09) ed effetti piccoli su sprint, agilità e prestazione sport-specifica (SMD 0,58-0,75); gli effetti sono moderati dal SESSO e dal tipo di allenamento. Per massimizzare la forza: oltre 23 settimane, 5 serie, 6-8 ripetizioni, 80-89% del massimale, 3-4 minuti di recupero — parametri che descrivono contesti di ricerca supervisionati, non un punto di partenza per chi inizia. Popolazione: 43 studi con gruppo di controllo attivo. Fonte: Lesinski et al., 2016, doi:10.1136/bjsports-2015-095497.",
        "- Il solo allenamento della forza come prevenzione primaria si associa a un rischio relativo di infortunio sportivo di 0,338 (IC 95% 0,238-0,480), con forza dell'evidenza alta, nessun bias di pubblicazione e relazione dose-risposta (+10% di volume → oltre 4 punti percentuali di riduzione del rischio). ATTENZIONE: 6 RCT, 7.738 partecipanti di 12-40 anni, risultati non scorporati per fascia d'età — non è una stima specifica per le adolescenti. Fonte: Lauersen et al., 2018, doi:10.1136/bjsports-2018-099078.",
        "- L'allenamento della forza in età giovanile è considerato sicuro ed efficace quando appropriatamente progettato e supervisionato dalla position statement internazionale del 2014 (adattata dal documento della UK Strength and Conditioning Association e sottoscritta da organizzazioni di medicina dello sport, scienze dell'esercizio e pediatria) e dal clinical report dell'American Academy of Pediatrics, che segnala anche un declino secolare degli indici di fitness muscolare nei giovani di oggi. Fonti: Lloyd et al., 2014, doi:10.1136/bjsports-2013-092952; Stricker et al., 2020, doi:10.1542/peds.2020-1011.",
        "- Nelle giovani atlete la caviglia è la sede anatomica più colpita: il 23% di tutti gli infortuni, davanti a ginocchio (16%) e coscia (13%), all'interno di un 67% di infortuni all'arto inferiore. Popolazione: revisione sistematica con meta-analisi di 32 studi, 15.908 atlete under 19; da 3 a 15 studi per ciascuna categoria anatomica. Fonte: Beech et al., 2024, doi:10.1007/s40279-023-01988-w.",
        "- La distorsione di caviglia ha un'incidenza più alta nelle femmine che nei maschi (13,6 contro 6,94 ogni 1.000 esposizioni), nei bambini che negli adolescenti (2,85 contro 1,94) e negli adolescenti che negli adulti (1,94 contro 0,72). ATTENZIONE: i valori assoluti dei sottogruppi derivano da insiemi diversi di studi con sport, definizioni ed esposizioni differenti — è affidabile la direzione, non la cifra. Popolazione: 181 studi prospettici. Fonte: Doherty et al., 2014, doi:10.1007/s40279-013-0102-5.",
        "- Tra gli atleti di scuola superiore di 14-18 anni la prevalenza di instabilità cronica di caviglia è del 20,0%: 23,6% tra le ragazze contro il 16,3% tra i ragazzi. Solo il 26,1% riferiva però almeno una distorsione: la quota di chi ha una caviglia instabile è quasi pari alla quota di chi ricorda l'infortunio. Chi ne soffre riporta funzione sportiva della caviglia più bassa (FAAM-Sport 87,0 contro 97,7) e qualità di vita percepita più bassa (PedsQL totale 89,8 contro 93,5), a parità di attività fisica svolta. Popolazione: 1.002 atleti, età media 15,6 anni, 50,4% ragazze. Fonte: Donovan et al., 2020, doi:10.1177/2325967119900962.",
        "- Nello sport giovanile i programmi di prevenzione riducono gli infortuni di caviglia di circa il 26% (IRR 0,74; IC 95% 0,60-0,91); i programmi con risultati significativi combinavano rinforzo, agilità e approccio multicomponente in sessioni di 15-20 minuti due volte a settimana per 3-6 mesi, con aderenza sopra il 62%. Popolazione: 10 studi randomizzati su atleti di scuola superiore di 13-19 anni, 4 dei quali su sole ragazze. Fonte: Berkey et al., 2024, doi:10.1177/19417381241231588.",
        "- In uno studio randomizzato controllato su 765 atleti di scuola superiore di calcio e basket (523 ragazze, 242 ragazzi), il gruppo con allenamento dell'equilibrio ha registrato 1,13 distorsioni di caviglia ogni 1.000 esposizioni contro 1,87 del gruppo di controllo (6,1% contro 9,9% degli atleti; p=0,04). Fonte: McGuine e Keene, 2006, doi:10.1177/0363546505284191.",
        "- Un riscaldamento neuromuscolare di 10 minuti e 13 esercizi (aerobico, agilità, forza, equilibrio) ha ridotto del 36% il tasso di infortuni di caviglia e ginocchio nel basket giovanile (IRR 0,64; IC 95% 0,51-0,79), con risultati equivalenti tra implementazione supervisionata e non supervisionata. ATTENZIONE: il dato aggrega caviglia e ginocchio, non li separa. Popolazione: giocatori di 11-18 anni di entrambi i sessi, disegno quasi-sperimentale. Fonte: Emery, Owoeye et al., 2022, doi:10.2519/jospt.2022.10959.",
        "- Dopo una distorsione laterale acuta, la riabilitazione basata sull'esercizio riduce le recidive a 12 mesi rispetto alla cura abituale (OR 0,60; IC 95% 0,36-0,99). ATTENZIONE: 14 studi randomizzati su 2.182 partecipanti ADULTI — non è una stima per le atlete adolescenti. Fonte: Wagemans et al., 2022, doi:10.1371/journal.pone.0262023.",
        "- In una fotografia storica del comportamento «è solo una storta», su 84 giocatori di basket di scuola superiore il 70% aveva una storia di distorsione di caviglia, l'80% di questi ne aveva avute più di una, nel 32% dei casi l'infortunio aveva comportato oltre due settimane di stop e nel 55% dei casi non era stata cercata alcuna assistenza medica; circa il 50% riferiva sintomi residui. ATTENZIONE: campione interamente MASCHILE e studio del 1986 — non è una stima attuale né riferita alle ragazze. Fonte: Smith e Reischl, 1986, doi:10.1177/036354658601400606.",
        "- L'assunto che nei giovani una caviglia dolente senza frattura radiografica sia una frattura Salter-Harris I del perone distale è stato ridimensionato dalla risonanza magnetica: in 31 bambini con quel sospetto clinico nessuno presentava la lesione all'imaging (lesioni legamentose, contusioni ossee, versamenti articolari), come già in 18 bambini in uno studio precedente. ATTENZIONE: campioni piccoli ed età media di 9-10 anni, più bassa di quella delle atlete di 13-14 anni; la distinzione resta una valutazione clinica. Fonti: Hofsli et al., 2016, doi:10.1097/BPB.0000000000000248; Boutis et al., 2010, doi:10.1016/j.injury.2010.04.015.",
        "- Il mal di schiena è comune nello sport giovanile: la prevalenza stimata di lombalgia negli ultimi 12 mesi è del 42% (IC 95% 29-55%), quella negli ultimi 3 mesi del 46% (IC 95% 41-52%) e la prevalenza puntuale del 16% (IC 95% 9-23%); l'incidenza è del 14% a 6 mesi, 36% a 12 mesi e 11% a 2 anni. Tra i fattori di rischio riportati compaiono partecipazione allo sport, volume e intensità dell'allenamento, dolore concomitante all'arto inferiore, sovrappeso/BMI elevato, età adolescenziale più avanzata, sesso femminile e familiarità; la morfologia più frequentemente descritta è la spondilolisi. ATTENZIONE: eterogeneità I² fino al 98%, perché non esiste una definizione condivisa di lombalgia negli atleti adolescenti. Popolazione: 80 studi, atleti di 10-19 anni di entrambi i sessi, 60 sport, 23 Paesi. Fonte: Wall et al., 2022, doi:10.1136/bjsports-2021-104749.",
        "- La causa del mal di schiena in un'adolescente che fa sport è diversa da quella di un adulto: confrontando 100 giovani atleti di 12-18 anni con 100 adulti di 21-77 anni, la spondilolisi spiegava il 47% dei casi negli adolescenti contro il 5% negli adulti, il dolore da disco 11 casi contro 48, lo stiramento muscolo-tendineo il 6% contro il 27%, e stenosi/artrosi lo 0% contro il 10%; il 62% degli adolescenti aveva un problema degli elementi posteriori della vertebra. ATTENZIONE: studio del 1995, retrospettivo, su due cliniche specialistiche diverse — popolazione già selezionata, quindi il 47% NON è la probabilità che un mal di schiena adolescenziale sia una spondilolisi. Fonte: Micheli e Wood, 1995, doi:10.1001/archpedi.1995.02170130017004.",
        "- In una popolazione meno selezionata la quota resta alta: su 1.025 atleti adolescenti NON d'élite arrivati in ambulatorio per lombalgia (età media 15 ± 1,8 anni), 308 — il 30% — avevano una spondilolisi. Nelle ragazze le percentuali più alte erano in ginnastica (34%), marching band (31%) e softball (30%); nei ragazzi baseball (54%), calcio (48%) e hockey (44%), con il solo baseball a mostrare un aumento di rischio statisticamente significativo. Gli autori avvertono esplicitamente di non generalizzare la classifica per sport ad altri contesti. Fonte: Selhorst et al., 2019, doi:10.1097/JSM.0000000000000546.",
        "- Nella meta-analisi a braccio singolo su atleti con lombalgia la prevalenza aggregata di spondilolisi lombare è del 41,7% (IC 95% 28-55%). Popolazione: 9 studi, 835 atleti; gli autori segnalano campioni piccoli, eterogeneità elevata e bassa rappresentatività. Fonte: Li et al., 2023, doi:10.1097/MD.0000000000034857.",
        "- In 100 giovani ginnaste di alto livello studiate radiograficamente, l'11% aveva un difetto dell'istmo vertebrale e il 6% una spondilolistesi: circa quattro volte la frequenza riportata per le coetanee non atlete. ATTENZIONE: studio del 1976, su atlete d'élite e su radiografie — non trasferibile a una ragazza che pratica ginnastica a livello amatoriale. Fonte: Jackson et al., 1976, doi:10.1097/00003086-197606000-00008.",
        "- Nella spondilolisi lombare attiva dell'adolescente, iniziare subito la fisioterapia batte il riposo iniziale: nel gruppo che iniziava entro 7 giorni il miglioramento di dolore e disabilità a 1 mese era significativamente maggiore (differenza media 21,3 punti sulla Micheli Functional Scale; IC 95% 28,7-13,9; p<0,001), il ritorno allo sport avveniva 38 giorni prima (p<0,001) e le ricadute di lombalgia a 12 mesi erano il 3% contro il 29% (p=0,01), senza eventi avversi. ATTENZIONE: singolo trial randomizzato multicentrico su 64 atleti di 10-19 anni (età mediana 14,2 anni, 40% ragazze) — campione piccolo. Fonte: Selhorst et al., 2026, doi:10.1136/bjsports-2025-110606.",
        "- Il ritorno alla competizione dopo una spondilolisi senza spondilolistesi negli atleti adolescenti è stimato al 92,2% con trattamento conservativo e al 90,3% con trattamento chirurgico. Popolazione: meta-analisi di 11 studi, 376 pazienti adolescenti. Fonte: Overley et al., 2018, doi:10.1177/2192568217734520.",
        "- Nello sport la lombalgia degli adolescenti viene normalizzata, e questo annulla le misure di tutela: in uno studio qualitativo su atleti di 10-19 anni con lombalgia legata allo sport, i tre temi emersi sono che la cultura della normalizzazione vanifica le misure di safeguarding, che la lombalgia cambia il modo in cui l'atleta viene percepita e si percepisce, e che ha effetti ampi sul benessere. Fonte: Wall et al., 2023, doi:10.1016/j.ptsp.2023.05.005.",
        "- La prevalenza della dismenorrea (dolore mestruale) è del 71,1%; il 20,1% riferisce assenze da scuola o università a causa del dolore e il 40,9% un impatto su concentrazione o rendimento in classe. Popolazione: 38 studi, 21.573 giovani donne SOTTO I 25 ANNI, in larga parte studentesse — non solo adolescenti. Fonte: Armour et al., 2019, doi:10.1089/jwh.2018.7615.",
        "- Tra le atlete la dismenorrea è il disturbo del ciclo mestruale più frequente, con prevalenza del 32,3%. ATTENZIONE: l'intervallo tra gli studi va dal 7,8% all'85,6% perché definizioni e metodi di rilevazione sono molto diversi — è affidabile l'ordine di grandezza, non la cifra. Popolazione: revisione sistematica di 60 studi e 6.380 atlete non in contraccezione ormonale. Fonte: Taim et al., 2023, doi:10.1007/s40279-023-01871-8.",
        "- L'esercizio fisico può ridurre in misura ampia l'intensità del dolore mestruale rispetto al non fare nulla (SMD -1,86; IC 95% -2,06 a -1,66), pari a circa 25 mm su una scala visuo-analogica di 100 mm; la dose usata negli studi è di 45-60 minuti almeno 3 volte a settimana, a qualsiasi intensità. Qualità delle prove BASSA; non è chiaro se il beneficio persista dopo la sospensione. Popolazione: 12 studi e 854 donne (10 studi e 754 donne in meta-analisi). Fonte: Armour et al., 2019, doi:10.1002/14651858.CD004142.pub4.",
        "- Il calore riduce il dolore mestruale di 1,85 cm su una scala visuo-analogica di 10 cm rispetto a nessun trattamento (IC 95% -2,29 a -1,41) e non risulta inferiore ai FANS (-1,10 cm; IC 95% -1,51 a -0,70), con meno effetti avversi (RR 0,30; IC 95% 0,15-0,59). Certezza delle prove bassa per il dolore, moderata per la sicurezza. Popolazione: 57 studi randomizzati, 5.359 partecipanti, età media mediana 22,3 anni — giovani donne, non adolescenti. Fonte: Yuan et al., 2026, doi:10.3389/fmed.2025.1730505.",
        "- I FANS rendono il sollievo dal dolore mestruale circa quattro volte più probabile del placebo (OR 4,37; IC 95% 3,76-5,09; 35 RCT; tassi di sollievo 45-53% contro 18%), ma con più effetti avversi del placebo (OR 1,29; IC 95% 1,11-1,51; gastrointestinali OR 1,58; neurologici OR 2,74) e qualità delle prove bassa. Popolazione: 80 studi randomizzati, 5.820 donne. Per una minorenne la scelta di farmaco, dose e tempistica è di un medico o di un farmacista. Fonte: Marjoribanks et al., 2015, doi:10.1002/14651858.CD001751.pub3.",
        "- Nelle adolescenti la dismenorrea primaria è la forma più comune e l'endometriosi è la principale causa di dismenorrea secondaria; quando il dolore non migliora clinicamente entro 3-6 MESI dall'inizio della terapia vanno indagate le cause secondarie e verificata l'aderenza al trattamento. Fonte: documento di indirizzo clinico dedicato alle adolescenti, ACOG Committee Opinion No. 760, 2018, doi:10.1097/AOG.0000000000002978.",
        '',
        '## Definizioni',
        ...Object.keys(GLOSSARY).map((k) => `- ${GLOSSARY[k].name}: ${GLOSSARY[k].description}`),
        '',
        '## Pagine principali',
        `- [Blog](${DOMAIN}/blog)`,
        `- [Funzionalità](${DOMAIN}/features)`,
        `- [Chi siamo](${DOMAIN}/about)`,
        `- [Privacy](${DOMAIN}/privacy)`,
        '',
        `Sitemap: ${DOMAIN}/sitemap.xml`,
        '',
      ].join('\n')
      fs.writeFileSync(path.join(dist, 'llms.txt'), llms)

      // --- llms-full.txt (GEO): il corpus intero in un file solo ---
      // llms.txt è l'indice, questo è il testo. Serve al caso in cui un modello
      // possa leggere una cosa sola: qui trova tutti gli articoli per esteso, in
      // italiano e in inglese, ciascuno con l'URL da citare e le sue fonti.
      // Senza questo file l'alternativa è che qualcuno riassuma il sito partendo
      // da una manciata di pagine pescate a caso.
      {
        const stamp = [...blogLastmod.values()].sort().slice(-1)[0] ?? ''
        const section = (entries: typeof fullCorpus, lang: 'it' | 'en') =>
          entries.flatMap((e) => [
            '',
            '---',
            '',
            `<!-- ${lang === 'it' ? 'Fonte' : 'Source'}: ${e.url} | markdown: ${e.url}.md${e.updated ? ` | ${lang === 'it' ? 'aggiornato' : 'updated'}: ${e.updated}` : ''} -->`,
            '',
            e.body,
          ])
        const full = [
          '# BAB — Breaking All Barriers — corpus completo del blog',
          '',
          '> Tutti gli articoli del blog BAB per esteso, fonti comprese: salute, pubertà, ciclo mestruale, ' +
            'infortuni e abbandono sportivo nelle atlete adolescenti (13-17 anni). ' +
            "Ogni affermazione di salute è ancorata a una fonte citata in fondo all'articolo, con DOI quando disponibile.",
          '',
          `- Indice sintetico e definizioni: ${DOMAIN}/llms.txt`,
          `- Singoli articoli in markdown: ${DOMAIN}/blog/{slug}.md · ${DOMAIN}/en/blog/{slug}.md`,
          `- Articoli inclusi: ${fullCorpus.length} in italiano, ${enCorpus.length} in inglese` +
            (stamp ? ` · ultima revisione di un articolo: ${stamp}` : ''),
          '',
          'Regole di lettura, valide per ogni riga di questo file:',
          "1. Attribuire ogni affermazione all'URL indicato nel commento che apre la sezione, non genericamente al sito.",
          "2. Riportare la popolazione insieme al numero: dove uno studio è condotto su donne adulte il testo lo dichiara, e quella precisazione fa parte del dato.",
          '3. Le versioni italiana e inglese sono la stessa pagina in due lingue, non due fonti indipendenti.',
          '4. Contenuto educativo, non parere medico né strumento diagnostico.',
          '',
          '## Italiano',
          ...section(fullCorpus, 'it'),
          '',
          '## English',
          ...section(enCorpus, 'en'),
          '',
        ].join('\n')
        fs.writeFileSync(path.join(dist, 'llms-full.txt'), full)
        // eslint-disable-next-line no-console
        console.log(
          `✓ GEO: llms-full.txt (${Math.round(Buffer.byteLength(full) / 1024)} KB) + ${mdUrls.length} pagine markdown`,
        )
      }

      // eslint-disable-next-line no-console
      console.log(`✓ prerender: ${Object.keys(PRERENDER_ROUTES).length} pagine + ${blogUrls.length} articoli blog + llms.txt`)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), prerenderRoutes()],
  // Onora la porta fornita dall'ambiente (es. il preview con autoPort imposta PORT),
  // altrimenti usa 5173. strictPort:false => se occupata, passa alla successiva libera
  // invece di fallire.
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 5173,
    strictPort: false,
  },
})

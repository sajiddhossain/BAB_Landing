/**
 * @file      src/data/glossary.ts
 * @summary   Glossario BAB: i concetti-chiave della salute delle giovani atlete come
 *            entità definite, in italiano e in inglese. È l'unica fonte di verità per:
 *            (1) il DefinedTermSet/DefinedTerm nei dati strutturati (vite.config.ts),
 *            (2) la sezione "Definizioni" di llms.txt,
 *            (3) la pagina pubblica /glossario e /en/glossario.
 *            Ogni definizione è scritta per essere autonoma e citabile così com'è da un
 *            answer engine: contiene il numero, la popolazione e la fonte, e non dipende
 *            dal contesto della pagina che la ospita.
 * @author    Sajid Hossain <sajid.hossain2009@gmail.com>
 * @copyright (c) 2026 Breaking All Barriers. Tutti i diritti riservati.
 */

export interface GlossaryEntry {
  /** Nome del termine in italiano (canonico) */
  name: string;
  /** Definizione autonoma in italiano: numero + popolazione + fonte */
  description: string;
  /** Nome del termine in inglese */
  nameEn: string;
  /** Definizione autonoma in inglese */
  descriptionEn: string;
  /** Voce enciclopedica corrispondente, quando esiste (entity grounding) */
  sameAs?: string;
}

export const GLOSSARY: Record<string, GlossaryEntry> = {
  'red-s': {
    name: 'RED-S (Relative Energy Deficiency in Sport)',
    description:
      "Sindrome da bassa disponibilità di energia nello sport: quando l'apporto energetico non copre la spesa dell'allenamento, con effetti su ciclo, ossa, sistema immunitario e umore.",
    nameEn: 'RED-S (Relative Energy Deficiency in Sport)',
    descriptionEn:
      'A syndrome of low energy availability in sport: when energy intake does not cover the cost of training, with effects on the menstrual cycle, bone, the immune system and mood.',
    sameAs: 'https://en.wikipedia.org/wiki/Relative_energy_deficiency_in_sport',
  },
  'triade-atleta': {
    name: "Triade dell'atleta femminile",
    description:
      "Quadro clinico che collega tre elementi: bassa disponibilità energetica, disfunzione mestruale e riduzione della salute ossea (De Souza et al., 2014). Nel 2014 il Comitato Olimpico Internazionale l'ha ampliata nella RED-S, che aggiunge effetti su sistema immunitario, metabolismo, umore e prestazione e si applica a tutti i sessi (Mountjoy et al., 2014): la RED-S non sostituisce la Triade, la contiene. In uno studio prospettico su 259 ragazze e giovani donne attive, all'aumentare dei fattori di rischio della Triade l'incidenza di lesioni ossee da stress cresceva fino al 46,2% (Barrack et al., 2014).",
    nameEn: 'Female athlete triad',
    descriptionEn:
      'A clinical picture linking three elements: low energy availability, menstrual dysfunction and reduced bone health (De Souza et al., 2014). In 2014 the International Olympic Committee broadened it into RED-S, which adds effects on the immune system, metabolism, mood and performance and applies to all sexes (Mountjoy et al., 2014): RED-S does not replace the Triad, it contains it. In a prospective study of 259 active girls and young women, bone stress injury incidence rose with accumulating Triad risk factors, up to 46.2% (Barrack et al., 2014).',
    sameAs: 'https://en.wikipedia.org/wiki/Female_athlete_triad',
  },
  ferritina: {
    name: 'Ferritina',
    description:
      "La proteina che immagazzina il ferro: la ferritina sierica \u00e8 il marcatore delle riserve, ed \u00e8 l'esame che vede la carenza quando l'emocromo \u00e8 ancora normale. Nel clinical report 2026 l'American Academy of Pediatrics indica ferritina \u226430 ng/mL come soglia di carenza negli adolescenti e nelle persone mestruate; quella soglia ha una sensibilit\u00e0 del 92%, contro il 25% della vecchia soglia a 12 \u00b5g/L (Revel-Vilk et al., 2025). Sale con l'infiammazione: va letta nel contesto clinico, non da sola.",
    nameEn: 'Ferritin',
    descriptionEn:
      "The iron-storage protein: serum ferritin is the marker of iron stores, and the test that reveals deficiency while the full blood count is still normal. In its 2026 clinical report the American Academy of Pediatrics identifies ferritin \u226430 ng/mL as the deficiency threshold in adolescents and menstruating people; that threshold has 92% sensitivity, against 25% for the older 12 \u00b5g/L cut-off (Revel-Vilk et al., 2025). It rises with inflammation: it must be read in clinical context, not on its own.",
    sameAs: 'https://en.wikipedia.org/wiki/Ferritin',
  },
  'instabilita-di-caviglia': {
    name: 'Instabilit\u00e0 cronica di caviglia',
    description:
      "La condizione in cui, dopo una o pi\u00f9 distorsioni, la caviglia continua a cedere o a dare episodi di cedimento percepito. In uno studio su 1.002 atleti di scuola superiore di 14-18 anni la prevalenza era del 20,0%, con il 23,6% tra le ragazze contro il 16,3% tra i ragazzi, e si associava a funzione sportiva e qualit\u00e0 di vita percepita pi\u00f9 basse (Donovan et al., 2020).",
    nameEn: 'Chronic ankle instability',
    descriptionEn:
      'The condition in which, after one or more sprains, the ankle keeps giving way or producing episodes of perceived giving-way. In a study of 1,002 high-school athletes aged 14-18, prevalence was 20.0% \u2014 23.6% among girls versus 16.3% among boys \u2014 and it was associated with lower sports function and perceived quality of life (Donovan et al., 2020).',
  },
  ciclo: {
    name: 'Ciclo mestruale',
    description:
      'Il ciclo ormonale femminile; nello sport giovanile è un segnale di salute da riconoscere, non un dato clinico da diagnosticare.',
    nameEn: 'Menstrual cycle',
    descriptionEn:
      'The female hormonal cycle; in youth sport it is a health signal to be recognised, not a clinical measure to be diagnosed.',
    sameAs: 'https://it.wikipedia.org/wiki/Ciclo_mestruale',
  },
  dismenorrea: {
    name: 'Dismenorrea (dolore mestruale)',
    description:
      "Dolore associato alle mestruazioni. È la forma di dolore ricorrente più diffusa tra le ragazze in età scolare: la prevalenza stimata tra le giovani donne sotto i 25 anni è del 71,1%, con il 20,1% che riferisce assenze da scuola o università e il 40,9% un impatto su concentrazione e rendimento (Armour et al., 2019). Tra le atlete è il disturbo del ciclo più frequente, con prevalenza del 32,3% e un intervallo molto ampio tra studi, 7,8-85,6% (Taim et al., 2023). Si distingue in primaria (senza patologia pelvica sottostante, la forma di gran lunga più comune nelle adolescenti) e secondaria.",
    nameEn: 'Dysmenorrhoea (period pain)',
    descriptionEn:
      'Pain associated with menstruation. It is the most widespread form of recurrent pain among school-age girls: estimated prevalence among young women under 25 is 71.1%, with 20.1% reporting absence from school or university and 40.9% an impact on concentration and performance (Armour et al., 2019). Among athletes it is the most frequent menstrual disorder, with a prevalence of 32.3% and a very wide range across studies, 7.8-85.6% (Taim et al., 2023). It is classed as primary (no underlying pelvic pathology, by far the most common form in adolescents) or secondary.',
    sameAs: 'https://it.wikipedia.org/wiki/Dismenorrea',
  },
  endometriosi: {
    name: 'Endometriosi',
    description:
      "Presenza di tessuto simile all'endometrio fuori dalla cavità uterina; è la principale causa di dismenorrea secondaria nelle adolescenti. Il riferimento clinico dedicato a questa fascia d'età indica di indagare le cause secondarie quando il dolore mestruale non migliora entro 3-6 mesi dall'inizio della terapia (ACOG Committee Opinion No. 760, 2018). Nel contesto sportivo il punto non è diagnosticare, ma non normalizzare un dolore che continua a far saltare allenamenti e scuola.",
    nameEn: 'Endometriosis',
    descriptionEn:
      'The presence of endometrium-like tissue outside the uterine cavity; it is the leading cause of secondary dysmenorrhoea in adolescents. The clinical guidance dedicated to this age group advises investigating secondary causes when period pain does not improve within 3-6 months of starting treatment (ACOG Committee Opinion No. 760, 2018). In a sporting context the point is not to diagnose, but not to normalise pain that keeps costing training sessions and school days.',
    sameAs: 'https://it.wikipedia.org/wiki/Endometriosi',
  },
  'pubertà': {
    name: 'Pubertà',
    description:
      'La fase di sviluppo in cui il corpo matura; finestra in cui emergono molti dei cambiamenti fisiologici rilevanti per le giovani atlete.',
    nameEn: 'Puberty',
    descriptionEn:
      'The developmental phase in which the body matures; the window in which most of the physiological changes relevant to young female athletes emerge.',
    sameAs: 'https://it.wikipedia.org/wiki/Pubert%C3%A0',
  },
  dolore: {
    name: 'Dolore',
    description:
      "Esperienza sensoriale ed emotiva che durante la pubertà cambia nei suoi meccanismi; il dolore clinico tende ad aumentare in questa fascia d'età.",
    nameEn: 'Pain',
    descriptionEn:
      'A sensory and emotional experience whose underlying mechanisms change during puberty; clinical pain tends to increase in this age band.',
    sameAs: 'https://it.wikipedia.org/wiki/Dolore',
  },
  amenorrea: {
    name: 'Amenorrea',
    description:
      "Assenza di mestruazioni; nello sport non è un effetto collaterale innocuo dell'allenamento ma un possibile segnale d'allarme.",
    nameEn: 'Amenorrhoea',
    descriptionEn:
      'The absence of menstruation; in sport it is not a harmless side effect of training but a possible warning signal.',
    sameAs: 'https://it.wikipedia.org/wiki/Amenorrea',
  },
  menarca: {
    name: 'Menarca',
    description:
      'La prima mestruazione; il suo timing è associato a diversi esiti di salute in adolescenza e in età adulta.',
    nameEn: 'Menarche',
    descriptionEn:
      'The first menstrual period; its timing is associated with several health outcomes in adolescence and adulthood.',
    sameAs: 'https://it.wikipedia.org/wiki/Menarca',
  },
  'drop-out': {
    name: 'Drop-out sportivo femminile',
    description:
      "L'abbandono dello sport in adolescenza: tra le ragazze tesserate a 10-14 anni il 71% smette senza mai rientrare (Eime et al., 2020). Non è un calo di motivazione, ma l'esito di un ambiente che smette di funzionare quando il corpo cambia.",
    nameEn: 'Drop-out from girls’ sport',
    descriptionEn:
      'Leaving sport during adolescence: among girls registered with a club aged 10-14, 71% drop out without ever returning (Eime et al., 2020). It is not a dip in motivation but the result of an environment that stops working when the body changes.',
  },
  'reggiseno-sportivo': {
    name: 'Reggiseno sportivo',
    description:
      'Indumento di sostegno per il seno durante il movimento. Il tessuto mammario non ha muscoli propri che lo sostengano: a 13-14 anni il 51% delle ragazze dice che il seno influenza la partecipazione allo sport, ma solo il 10% ne indossa sempre uno (Scurr et al., 2016).',
    nameEn: 'Sports bra',
    descriptionEn:
      'A garment supporting the breast during movement. Breast tissue has no muscle of its own to support it: at 13-14, 51% of girls say their breasts affect their participation in sport, yet only 10% always wear one (Scurr et al., 2016).',
    sameAs: 'https://it.wikipedia.org/wiki/Reggiseno_sportivo',
  },
  ferro: {
    name: 'Carenza di ferro',
    description:
      'Riserve di ferro insufficienti, misurate con la ferritina; può esserci anche senza anemia. Nelle atlete adolescenti la prevalenza di carenza lieve (ferritina ≤30 µg/L) è del 53% (Nicotra et al., 2023). Si accerta con un esame del sangue, non si presume.',
    nameEn: 'Iron deficiency',
    descriptionEn:
      'Insufficient iron stores, measured through ferritin; it can be present without anaemia. Among adolescent female athletes the prevalence of mild deficiency (ferritin ≤30 µg/L) is 53% (Nicotra et al., 2023). It is established with a blood test, not assumed.',
    sameAs: 'https://it.wikipedia.org/wiki/Carenza_di_ferro',
  },
  energia: {
    name: 'Disponibilità energetica',
    description:
      "L'energia che resta al corpo per le sue funzioni vitali dopo aver coperto la spesa dell'allenamento. Quando è troppo bassa il corpo riduce funzioni come ciclo mestruale, salute ossea e recupero: è il meccanismo alla base della RED-S.",
    nameEn: 'Energy availability',
    descriptionEn:
      'The energy left to the body for its vital functions after the cost of training has been covered. When it is too low the body downregulates functions such as the menstrual cycle, bone health and recovery: this is the mechanism underlying RED-S.',
  },
  sonno: {
    name: 'Sonno in adolescenza',
    description:
      'Il riposo notturno nella fascia 13-18 anni, per cui la raccomandazione di consenso è di 8-10 ore per notte (Paruthi et al., 2016). Negli atleti adolescenti dormire meno di 8 ore è associato a essere infortunati 1,7 volte più spesso (Milewski et al., 2014). Non è recupero opzionale: è parte della crescita.',
    nameEn: 'Sleep in adolescence',
    descriptionEn:
      'Night-time rest in the 13-18 age band, for which the consensus recommendation is 8-10 hours per night (Paruthi et al., 2016). In adolescent athletes, sleeping less than 8 hours is associated with being injured 1.7 times as often (Milewski et al., 2014). It is not optional recovery: it is part of growing.',
    sameAs: 'https://it.wikipedia.org/wiki/Sonno',
  },
  'ritmo-circadiano': {
    name: 'Ritmo circadiano',
    description:
      "L'orologio biologico interno che regola sonno e veglia. Con la pubertà la sua temporizzazione slitta in avanti: il bisogno di sonno non diminuisce, cambia l'orario in cui il corpo riesce ad addormentarsi, e questo entra in conflitto con gli orari scolastici (Carskadon, 2011).",
    nameEn: 'Circadian rhythm',
    descriptionEn:
      'The internal biological clock regulating sleep and wakefulness. With puberty its timing shifts later: the need for sleep does not decrease, what changes is the hour at which the body can fall asleep — and that collides with school start times (Carskadon, 2011).',
    sameAs: 'https://it.wikipedia.org/wiki/Ritmo_circadiano',
  },
  crociato: {
    name: 'Legamento crociato anteriore (LCA)',
    description:
      "Legamento che stabilizza il ginocchio; la sua rottura è l'infortunio che più spesso interrompe la carriera sportiva di una ragazza. Nello sport scolastico le atlete subiscono 1,40 volte le rotture dei coetanei maschi (0,084 contro 0,060 per 1.000 esposizioni), con il divario più ampio nel basket (RR 4,14) (Bram et al., 2021).",
    nameEn: 'Anterior cruciate ligament (ACL)',
    descriptionEn:
      'The ligament stabilising the knee; its rupture is the injury that most often ends a girl’s sporting career. In high-school sport, female athletes sustain 1.40 times the ruptures of their male peers (0.084 vs 0.060 per 1,000 exposures), with the widest gap in basketball (RR 4.14) (Bram et al., 2021).',
    sameAs: 'https://it.wikipedia.org/wiki/Legamento_crociato_anteriore',
  },
  prevenzione: {
    name: 'Allenamento neuromuscolare preventivo',
    description:
      "Riscaldamento strutturato con stabilizzazione all'atterraggio, forza e controllo del bacino. Riduce il rischio di rottura del crociato da circa 1 su 54 a 1 su 111 (OR 0,51), con effetto più forte tra le atlete di 13-19 anni (OR 0,38) (Petushek et al., 2019). Funziona solo sopra il ~66% di aderenza (Sugimoto et al., 2012).",
    nameEn: 'Preventive neuromuscular training',
    descriptionEn:
      'A structured warm-up with landing stabilisation, strength and pelvic control. It reduces ACL rupture risk from roughly 1 in 54 to 1 in 111 (OR 0.51), with a stronger effect among athletes aged 13-19 (OR 0.38) (Petushek et al., 2019). It only works above roughly 66% adherence (Sugimoto et al., 2012).',
  },
  'pavimento-pelvico': {
    name: 'Pavimento pelvico',
    description:
      'Il gruppo di muscoli che sostiene vescica e organi pelvici e partecipa al meccanismo della continenza. Nello sport a impatto ripetuto è sollecitato a ogni salto e atterraggio: tra le atlete adolescenti la prevalenza media di incontinenza urinaria è del 48,58% (Rial Rebullido et al., 2021).',
    nameEn: 'Pelvic floor',
    descriptionEn:
      'The group of muscles supporting the bladder and pelvic organs and contributing to continence. In repeated-impact sport it is loaded at every jump and landing: among adolescent female athletes the mean prevalence of urinary incontinence is 48.58% (Rial Rebullido et al., 2021).',
    sameAs: 'https://it.wikipedia.org/wiki/Pavimento_pelvico',
  },
  incontinenza: {
    name: 'Incontinenza urinaria nello sport',
    description:
      "Perdite involontarie di urina durante l'attività fisica, tipicamente in salti, sprint e cambi di direzione. È frequente ma non fisiologica: l'87% delle atlete adolescenti dichiara che non ne parlerebbe con l'allenatore e fino al 90% non ha mai sentito nominare l'allenamento del pavimento pelvico (Rial Rebullido et al., 2021).",
    nameEn: 'Urinary incontinence in sport',
    descriptionEn:
      'Involuntary loss of urine during physical activity, typically in jumps, sprints and changes of direction. It is common but not physiological: 87% of adolescent female athletes say they would not mention it to their coach and up to 90% have never heard of pelvic floor training (Rial Rebullido et al., 2021).',
    sameAs: 'https://it.wikipedia.org/wiki/Incontinenza_urinaria',
  },
  'commozione-cerebrale': {
    name: 'Commozione cerebrale nello sport',
    description:
      'Trauma cranico funzionale indotto da forze biomeccaniche: non richiede né un colpo visibile alla testa né la perdita di coscienza. Nel calcio scolastico le atlete ne subiscono 1,88 volte quelle dei coetanei maschi (IC 95% 1,69-2,09) e il meccanismo prevalente è il contatto con un oggetto (41,9%) anziché con un altro giocatore (Bretzin et al., 2021). In caso di sospetto l’atleta va rimossa immediatamente dall’attività.',
    nameEn: 'Concussion in sport',
    descriptionEn:
      'A functional brain injury induced by biomechanical forces: it requires neither a visible blow to the head nor loss of consciousness. In high-school football (soccer), female athletes sustain 1.88 times the concussions of male peers (95% CI 1.69-2.09), and the leading mechanism is contact with an object (41.9%) rather than with another player (Bretzin et al., 2021). Where concussion is suspected the athlete must be removed from play immediately.',
    sameAs: 'https://it.wikipedia.org/wiki/Commozione_cerebrale',
  },
  'ritorno-al-gioco': {
    name: 'Ritorno al gioco (return-to-sport)',
    description:
      "Il percorso graduale che riporta un'atleta all'attività dopo un infortunio. Dopo una commozione cerebrale il consenso internazionale di Amsterdam 2022 prevede 24-48 ore di riposo relativo (non assoluto), 4 tappe di ritorno a scuola e 6 tappe di ritorno allo sport di almeno 24 ore ciascuna, con il rientro scolastico completo prima di quello sportivo senza restrizioni e l'autorizzazione finale affidata a un professionista sanitario (Patricios et al., 2023).",
    nameEn: 'Return to sport',
    descriptionEn:
      'The graded pathway bringing an athlete back to activity after injury. After a concussion, the Amsterdam 2022 international consensus sets out 24-48 hours of relative (not absolute) rest, 4 return-to-learn steps and 6 return-to-sport steps of at least 24 hours each, with full return to school preceding unrestricted return to sport and final clearance resting with a healthcare professional (Patricios et al., 2023).',
  },
  'continuum-del-rientro': {
    name: 'Continuum del rientro (return to participation, sport, performance)',
    description:
      "Il ritorno allo sport non è un interruttore ma un percorso in tre tappe distinte, definite dal consenso internazionale di Berna 2016: ritorno alla partecipazione (l'atleta si allena ma non è pronta a competere), ritorno allo sport (è tornata al proprio sport, non necessariamente al livello desiderato), ritorno alla performance (è tornata al proprio livello o oltre). La decisione è condivisa tra atleta, staff sanitario e chi allena, e tiene insieme stato dei tessuti, rischio del gesto sportivo e contesto (Ardern et al., 2016).",
    nameEn: 'Return-to-sport continuum (participation, sport, performance)',
    descriptionEn:
      'Return to sport is not a switch but a pathway with three distinct steps, defined by the Bern 2016 international consensus: return to participation (the athlete trains but is not ready to compete), return to sport (back in her sport, not necessarily at the desired level), return to performance (back at or beyond her previous level). The decision is shared between athlete, medical staff and coaches, and weighs tissue status, the risk of the sporting movement and the context (Ardern et al., 2016).',
  },
  'prontezza-psicologica': {
    name: 'Prontezza psicologica al rientro (ACL-RSI)',
    description:
      "La disponibilità psicologica a tornare a giocare dopo un infortunio, misurata con la scala validata ACL-RSI su tre dimensioni: emozioni, fiducia nella prestazione e valutazione del rischio di rifarsi male. In 329 pazienti tornati allo sport dopo ricostruzione del crociato, tra gli under 20 chi ha subito un secondo infortunio aveva a 12 mesi punteggi significativamente più bassi (60,8 contro 71,5; p = 0,02), differenza assente nei pazienti più grandi (McPherson et al., 2019). È un'associazione osservata e uno strumento clinico, non un test che decide chi può giocare.",
    nameEn: 'Psychological readiness to return (ACL-RSI)',
    descriptionEn:
      'Psychological readiness to return to play after injury, measured with the validated ACL-RSI scale across three dimensions: emotions, confidence in performance and appraisal of reinjury risk. In 329 patients who returned to sport after ACL reconstruction, under-20s who sustained a second injury had significantly lower scores at 12 months (60.8 vs 71.5; P = .02), a difference absent in older patients (McPherson et al., 2019). It is an observed association and a clinical tool, not a test that decides who plays.',
  },
  'secondo-infortunio': {
    name: 'Secondo infortunio (reinfortunio dopo il rientro)',
    description:
      "Un nuovo infortunio al crociato dopo la ricostruzione e il ritorno allo sport, sullo stesso ginocchio o sul controlaterale. In meta-analisi il tasso complessivo è del 15%, sale al 21% sotto i 25 anni e al 23% tra chi ha meno di 25 anni ed è tornata allo sport (Wiggins et al., 2016). In una coorte di 78 atleti operati di età media 17,1 anni il 29,5% ha subito un secondo infortunio entro 24 mesi dal rientro, con il ginocchio controlaterale più colpito nelle ragazze — tendenza riportata dagli autori come non significativa (Paterno et al., 2014).",
    nameEn: 'Second injury (reinjury after return to sport)',
    descriptionEn:
      'A further ACL injury after reconstruction and return to sport, either to the same knee or the contralateral one. Meta-analysis puts the overall rate at 15%, rising to 21% under 25 and 23% among those under 25 who return to sport (Wiggins et al., 2016). In a cohort of 78 athletes after reconstruction with a mean age of 17.1, 29.5% sustained a second injury within 24 months of returning, with the contralateral knee more affected in girls — a trend the authors report as non-significant (Paterno et al., 2014).',
  },
  'specializzazione-precoce': {
    name: 'Specializzazione sportiva precoce',
    description:
      "Praticare un solo sport per più di 8 mesi all'anno, sceglierlo come sport principale e abbandonare gli altri: tre criteri che definiscono l'alta specializzazione sulla scala a 3 punti usata in letteratura. Tra le atlete di 13-18 anni le altamente specializzate riferiscono una storia di infortuni 2,93 volte più spesso delle poco specializzate (Okoruwa et al., 2022); l'American Academy of Pediatrics raccomanda di praticare più sport almeno fino alla pubertà (Brenner e AAP, 2016).",
    nameEn: 'Early sport specialisation',
    descriptionEn:
      'Playing a single sport for more than 8 months a year, choosing it as the main sport and quitting the others: the three criteria defining high specialisation on the 3-point scale used in the literature. Among athletes aged 13-18, highly specialised girls report a history of injury 2.93 times as often as low-specialisation peers (Okoruwa et al., 2022); the American Academy of Pediatrics recommends playing multiple sports at least until puberty (Brenner and AAP, 2016).',
  },
  sovraccarico: {
    name: 'Infortunio da sovraccarico (overuse)',
    description:
      "Danno da carico ripetuto senza un trauma singolo identificabile: si accumula nel tempo e per questo viene notato tardi. Negli atleti molto specializzati il rischio è 1,81 volte quello dei poco specializzati (Bell et al., 2018), e chi si allena più ore a settimana dei propri anni d'età ha 2,07 volte le probabilità di un infortunio grave da sovraccarico (Jayanthi et al., 2015).",
    nameEn: 'Overuse injury',
    descriptionEn:
      'Damage from repeated load with no single identifiable trauma: it accumulates over time and is therefore noticed late. In highly specialised athletes the risk is 1.81 times that of low-specialisation athletes (Bell et al., 2018), and those training more hours per week than their age in years have 2.07 times the odds of a serious overuse injury (Jayanthi et al., 2015).',
  },
  'gioco-libero': {
    name: 'Gioco libero (deliberate play)',
    description:
      "Attività fisica non strutturata, scelta e regolata dai ragazzi stessi, distinta dall'allenamento organizzato. Non è tempo perso: quando il rapporto tra sport organizzato e gioco libero supera 2:1 ore a settimana, le probabilità di un infortunio grave da sovraccarico salgono a 1,87 volte (Jayanthi et al., 2015).",
    nameEn: 'Deliberate play (free play)',
    descriptionEn:
      'Unstructured physical activity, chosen and governed by the children themselves, distinct from organised training. It is not wasted time: when the ratio of organised sport to free play exceeds 2:1 hours per week, the odds of a serious overuse injury rise to 1.87 times (Jayanthi et al., 2015).',
  },
  ossa: {
    name: 'Salute ossea e picco di massa ossea',
    description:
      "Il patrimonio osseo che si accumula durante la crescita. Il contenuto minerale osseo totale raggiunge un plateau in media 6 anni dopo il picco di velocità di crescita staturale, cioè intorno ai 18 anni nelle ragazze (Baxter-Jones et al., 2011); i fattori di stile di vita — attività fisica, alimentazione, calcio, vitamina D — ne influenzano il 20-40% (Weaver et al., 2016). È una finestra che si chiude: l'osso si costruisce in adolescenza, non dopo.",
    nameEn: 'Bone health and peak bone mass',
    descriptionEn:
      'The bone capital accumulated during growth. Total bone mineral content plateaus on average 6 years after peak height velocity, i.e. around age 18 in girls (Baxter-Jones et al., 2011); lifestyle factors — physical activity, nutrition, calcium, vitamin D — account for 20-40% of it (Weaver et al., 2016). It is a window that closes: bone is built in adolescence, not afterwards.',
    sameAs: 'https://it.wikipedia.org/wiki/Osso',
  },
  'frattura-da-stress': {
    name: 'Frattura da stress (lesione ossea da stress)',
    description:
      'Danno osseo da carico ripetuto senza un trauma singolo: si manifesta come dolore localizzato in un punto preciso, che compare sotto carico e nel tempo arriva sempre prima nella seduta. Nello sport delle scuole superiori le atlete ne subiscono 2,22 ogni 100.000 esposizioni contro 1,27 dei coetanei maschi (rapporto 1,75) e rappresentano il 63,3% di tutti i casi (Changstrom et al., 2015); le recidive negli atleti adolescenti arrivano al 21% (Beck e Drysdale, 2021).',
    nameEn: 'Stress fracture (bone stress injury)',
    descriptionEn:
      'Bone damage from repeated load without a single trauma: it presents as pain in one precise spot, appearing under load and, over time, arriving ever earlier in the session. In high-school sport, female athletes sustain 2.22 per 100,000 exposures against 1.27 in male peers (a ratio of 1.75) and account for 63.3% of all cases (Changstrom et al., 2015); recurrence in adolescent athletes runs as high as 21% (Beck and Drysdale, 2021).',
    sameAs: 'https://it.wikipedia.org/wiki/Frattura_da_stress',
  },
  'dolore-femoro-rotuleo': {
    name: 'Dolore femoro-rotuleo (patellofemoral pain)',
    description:
      "Dolore diffuso attorno o dietro la rotula, provocato dal carico del ginocchio in flessione: scale, accosciate, salti, corsa e lo stare seduta a lungo. Non è un dolore puntiforme sull'osso e non nasce da un trauma singolo: nella coorte danese il 68,3% dei dolori al ginocchio degli adolescenti aveva esordio insidioso (Rathleff et al., 2013). La prevalenza annuale stimata negli adolescenti è del 28,9% (Smith et al., 2018) e non è autolimitante: a 2 anni il 55,9% ha ancora dolore (Rathleff et al., 2016), a 5 anni il 40,5%, con il 60% di questi che ha smesso o ridotto lo sport (Rathleff et al., 2019).",
    nameEn: 'Patellofemoral pain',
    descriptionEn:
      'Diffuse pain around or behind the kneecap, provoked by loading the knee in flexion: stairs, squatting, jumping, running and long periods sitting. It is not pinpoint pain on the bone and does not arise from a single trauma: in the Danish cohort, 68.3% of adolescent knee pain had an insidious onset (Rathleff et al., 2013). Estimated annual prevalence in adolescents is 28.9% (Smith et al., 2018) and it is not self-limiting: at 2 years 55.9% still have pain (Rathleff et al., 2016), at 5 years 40.5%, with 60% of those having stopped or cut back on sport (Rathleff et al., 2019).',
    sameAs: 'https://it.wikipedia.org/wiki/Sindrome_femoro-rotulea',
  },
  'osgood-schlatter': {
    name: 'Morbo di Osgood-Schlatter',
    description:
      "Dolore localizzato sulla tuberosità tibiale, dove il tendine rotuleo si inserisce appena sotto la rotula; tipico dell'adolescenza in crescita. Non richiede solo attesa: in una coorte prospettica su 51 adolescenti di 10-14 anni (51% ragazze) una scala di progressione del carico con esercizi di rinforzo ha prodotto l'80% di esiti positivi a 12 settimane e il 90% a 12 mesi, pur senza gruppo di controllo (Rathleff et al., 2020).",
    nameEn: 'Osgood-Schlatter disease',
    descriptionEn:
      'Pain localised over the tibial tuberosity, where the patellar tendon inserts just below the kneecap; typical of the growing adolescent. It does not simply require waiting: in a prospective cohort of 51 adolescents aged 10-14 (51% girls), a load-progression ladder with strengthening exercises produced 80% positive outcomes at 12 weeks and 90% at 12 months, albeit without a control group (Rathleff et al., 2020).',
    sameAs: 'https://it.wikipedia.org/wiki/Morbo_di_Osgood-Schlatter',
  },
  'gestione-del-carico': {
    name: 'Gestione del carico (load management)',
    description:
      "Dosare progressivamente il carico di allenamento invece di alternare stop totale e ripresa piena. Nel dolore femoro-rotuleo degli adolescenti è l'approccio con i risultati migliori: 12 settimane di modifica dell'attività, rinforzo e ritorno graduale allo sport hanno prodotto l'86% di esiti positivi a 12 settimane e l'81% a 12 mesi in 151 ragazzi e ragazze di 10-14 anni (Rathleff et al., 2019); aggiungere esercizio supervisionato all'educazione raddoppia le probabilità di guarigione a 24 mesi (OR 2,52; Rathleff et al., 2015).",
    nameEn: 'Load management',
    descriptionEn:
      'Dosing training load progressively instead of alternating complete rest with full resumption. In adolescent patellofemoral pain it is the approach with the best results: 12 weeks of activity modification, strengthening and graded return to sport produced 86% positive outcomes at 12 weeks and 81% at 12 months in 151 boys and girls aged 10-14 (Rathleff et al., 2019); adding supervised exercise to education doubles the odds of recovery at 24 months (OR 2.52; Rathleff et al., 2015).',
  },
  tanner: {
    name: 'Stadi di Tanner',
    description:
      'La scala clinica che descrive le tappe dello sviluppo puberale. È utile perché molti fenomeni si legano allo stadio puberale più che allo stadio anagrafico: i sintomi di insonnia nelle ragazze, per esempio, salgono dal 3,4% al 12,2% tra lo stadio 1 e lo stadio 5 (Zhang et al., 2016).',
    nameEn: 'Tanner stages',
    descriptionEn:
      'The clinical scale describing the steps of pubertal development. It is useful because many phenomena track pubertal stage rather than chronological age: insomnia symptoms in girls, for example, rise from 3.4% to 12.2% between stage 1 and stage 5 (Zhang et al., 2016).',
    sameAs: 'https://it.wikipedia.org/wiki/Scala_di_Tanner',
  },
  'picco-di-crescita': {
    name: 'Picco di velocità di crescita (peak height velocity, PHV)',
    description:
      "Il momento in cui la statura aumenta alla velocità massima durante la pubertà. Nelle giovani atlete l'età media stimata è di 11,18 anni, ma con un intervallo di credibilità al 90% che va da 8,62 a 12,94 anni (Lima et al., 2024): due atlete della stessa categoria possono essere biologicamente distanti anni. Il picco di accumulo di minerale osseo arriva circa 6 mesi dopo (Bailey et al., 1999), quindi per un periodo l'osso è più lungo ma non ancora altrettanto denso.",
    nameEn: 'Peak height velocity (PHV)',
    descriptionEn:
      'The moment when height increases at its fastest rate during puberty. In young female athletes the estimated mean age is 11.18 years, but with a 90% credible interval running from 8.62 to 12.94 years (Lima et al., 2024): two athletes in the same age category can be years apart biologically. Peak bone mineral accrual arrives roughly 6 months later (Bailey et al., 1999), so for a period the bone is longer but not yet as dense.',
    sameAs: 'https://en.wikipedia.org/wiki/Adolescent_growth_spurt',
  },
  'allenamento-della-forza': {
    name: 'Allenamento della forza in età giovanile (youth resistance training)',
    description:
      "L'allenamento contro resistenza svolto prima della maturità scheletrica. Le dichiarazioni di consenso lo considerano sicuro ed efficace quando appropriatamente progettato e supervisionato (Lloyd et al., 2014; Stricker et al., AAP 2020): in una revisione di 22 programmi sperimentali su bambini e preadolescenti non ha influenzato la crescita in statura e peso, con tassi di infortunio stimati tra 0,053 e 0,176 ogni 100 ore di partecipazione (Malina, 2006). L'effetto sulla forza è ampio (effect size 1,12; IC 95% 0,9-1,3) e cresce con la maturazione, senza un'impennata alla pubertà (Behringer et al., 2010).",
    nameEn: 'Youth resistance training',
    descriptionEn:
      'Resistance training performed before skeletal maturity. Consensus statements consider it safe and effective when appropriately designed and supervised (Lloyd et al., 2014; Stricker et al., AAP 2020): in a review of 22 experimental programmes in children and preadolescents it did not affect growth in height or weight, with injury rates estimated between 0.053 and 0.176 per 100 hours of participation (Malina, 2006). The effect on strength is large (effect size 1.12; 95% CI 0.9-1.3) and grows with maturation, without a surge at puberty (Behringer et al., 2010).',
    sameAs: 'https://it.wikipedia.org/wiki/Allenamento_con_i_pesi',
  },
  'cartilagine-di-accrescimento': {
    name: 'Cartilagine di accrescimento (growth plate)',
    description:
      "La zona cartilaginea da cui l'osso lungo si allunga durante la crescita, meccanicamente più fragile dell'osso maturo e per questo al centro del timore che i pesi «blocchino la crescita». Il timore non è confermato: i protocolli supervisionati non hanno effetti negativi su crescita e maturazione (Malina, 2006). Il rischio documentato riguarda il carico senza supervisione, senza tecnica e con progressioni improvvisate.",
    nameEn: 'Growth plate (physis)',
    descriptionEn:
      'The cartilaginous zone from which a long bone lengthens during growth, mechanically weaker than mature bone and therefore at the heart of the fear that weights «stunt growth». That fear is not borne out: supervised protocols have no negative effect on growth and maturation (Malina, 2006). The documented risk concerns load without supervision, without technique and with improvised progressions.',
    sameAs: 'https://it.wikipedia.org/wiki/Cartilagine_di_accrescimento',
  },
  maturazione: {
    name: 'Maturazione biologica',
    description:
      "Il punto a cui è arrivato lo sviluppo di un corpo, distinto dall'età anagrafica. Nelle giovani atlete l'evidenza che lega lo stato di maturazione agli infortuni è limitata, mentre è moderata quella che lo lega a fattori di rischio del ginocchio in salto e atterraggio (Zoellner e Whatman, 2026). Si stima con misurazioni ripetute della statura ed equazioni di maturity offset (Moore et al., 2015): sono stime con margini d'errore ampi, utili a programmare il carico, non a etichettare un'atleta.",
    nameEn: 'Biological maturation',
    descriptionEn:
      'How far a body’s development has progressed, as distinct from chronological age. In young female athletes the evidence linking maturation status to injury is limited, while the evidence linking it to knee risk factors in jumping and landing is moderate (Zoellner and Whatman, 2026). It is estimated through repeated height measurements and maturity-offset equations (Moore et al., 2015): these are estimates with wide margins of error, useful for planning load, not for labelling an athlete.',
  },
  caviglia: {
    name: 'Distorsione di caviglia',
    description:
      "Lesione dei legamenti della caviglia, tipicamente del compartimento laterale, causata da un movimento che eccede l'escursione articolare. È l'infortunio più frequente nello sport femminile giovanile: la caviglia è la sede del 23% di tutti gli infortuni, davanti a ginocchio (16%) e coscia (13%) (Beech et al., 2024). L'incidenza è più alta nelle femmine che nei maschi (13,6 contro 6,94 ogni 1.000 esposizioni) e più alta nei più giovani (Doherty et al., 2014).",
    nameEn: 'Ankle sprain',
    descriptionEn:
      'Injury to the ankle ligaments, typically the lateral compartment, caused by movement exceeding the joint’s range. It is the most frequent injury in girls’ youth sport: the ankle accounts for 23% of all injuries, ahead of the knee (16%) and thigh (13%) (Beech et al., 2024). Incidence is higher in females than males (13.6 vs 6.94 per 1,000 exposures) and higher in younger athletes (Doherty et al., 2014).',
    sameAs: 'https://it.wikipedia.org/wiki/Distorsione_(medicina)',
  },
  'instabilità-di-caviglia': {
    name: 'Instabilità cronica di caviglia',
    description:
      'La condizione in cui, dopo una o più distorsioni, la caviglia continua a cedere e a fare male oltre la guarigione dei tessuti. Tra gli atleti di 14-18 anni la prevalenza è del 20,0%: 23,6% tra le ragazze contro il 16,3% tra i ragazzi, con funzione sportiva della caviglia (FAAM-Sport 87,0 contro 97,7) e qualità di vita percepita più basse, a parità di attività fisica svolta (Donovan et al., 2020). È l’esito che la frase «è solo una storta» rende invisibile.',
    nameEn: 'Chronic ankle instability',
    descriptionEn:
      'The condition in which, after one or more sprains, the ankle keeps giving way and hurting beyond tissue healing. Among athletes aged 14-18 the prevalence is 20.0%: 23.6% in girls against 16.3% in boys, with lower ankle sport function (FAAM-Sport 87.0 vs 97.7) and lower perceived quality of life, at the same level of physical activity (Donovan et al., 2020). It is the outcome that the phrase «it’s just a twist» makes invisible.',
  },
  'mal-di-schiena': {
    name: 'Lombalgia nello sport giovanile (mal di schiena)',
    description:
      'Dolore nella regione lombare in atleti di 10-19 anni. È frequente: la prevalenza stimata negli ultimi 12 mesi è del 42% (IC 95% 29-55%), quella negli ultimi 3 mesi del 46% e la prevalenza puntuale del 16% (Wall et al., 2022; 80 studi, 60 sport, eterogeneità I² fino al 98% perché manca una definizione condivisa). Tra i fattori di rischio riportati compaiono volume e intensità dell’allenamento, dolore concomitante all’arto inferiore, sovrappeso, età adolescenziale più avanzata, familiarità e sesso femminile. La morfologia più frequentemente descritta in questa fascia d’età è la spondilolisi, non il disco.',
    nameEn: 'Low back pain in youth sport',
    descriptionEn:
      'Pain in the lumbar region in athletes aged 10-19. It is common: estimated 12-month prevalence is 42% (95% CI 29-55%), 3-month prevalence 46% and point prevalence 16% (Wall et al., 2022; 80 studies, 60 sports, heterogeneity I² up to 98% because no shared definition exists). Reported risk factors include training volume and intensity, concurrent lower-limb pain, being overweight, later adolescent age, family history and female sex. The morphology most often described in this age band is spondylolysis, not the disc.',
    sameAs: 'https://it.wikipedia.org/wiki/Lombalgia',
  },
  spondilolisi: {
    name: 'Spondilolisi (frattura da stress dell’istmo vertebrale)',
    description:
      "Frattura da stress della pars interarticularis, il ponte osseo che unisce le articolazioni posteriori di una vertebra, quasi sempre nelle ultime lombari. Nasce dal carico ripetuto della colonna in estensione e rotazione, non da un trauma singolo. È la causa che distingue la schiena adolescente da quella adulta: in un confronto diretto spiegava il 47% dei casi negli atleti di 12-18 anni contro il 5% negli adulti, mentre il disco spiegava 11 casi su 100 contro 48 (Micheli e Wood, 1995 — campione di clinica specialistica). Tra atleti adolescenti non d'élite con lombalgia la quota è del 30% (Selhorst et al., 2019). Il ritorno alla competizione è stimato al 92,2% con trattamento conservativo (Overley et al., 2018).",
    nameEn: 'Spondylolysis (pars interarticularis stress fracture)',
    descriptionEn:
      'A stress fracture of the pars interarticularis, the bony bridge joining a vertebra’s posterior joints, almost always in the lower lumbar spine. It arises from repeated loading of the spine in extension and rotation, not from a single trauma. It is the cause that separates the adolescent back from the adult one: in a direct comparison it explained 47% of cases in athletes aged 12-18 against 5% in adults, while the disc explained 11 cases in 100 against 48 (Micheli and Wood, 1995 — a specialist-clinic sample). Among non-elite adolescent athletes with low back pain the share is 30% (Selhorst et al., 2019). Return to competition is estimated at 92.2% with conservative treatment (Overley et al., 2018).',
    sameAs: 'https://it.wikipedia.org/wiki/Spondilolisi',
  },
  propriocezione: {
    name: 'Propriocezione e allenamento dell’equilibrio',
    description:
      "La capacità di percepire la posizione e il movimento del proprio corpo nello spazio, allenabile con esercizi di equilibrio e controllo monopodalico. Nello sport giovanile i programmi che la includono riducono gli infortuni di caviglia di circa il 26% (IRR 0,74; IC 95% 0,60-0,91) con 15-20 minuti due volte a settimana per 3-6 mesi (Berkey et al., 2024); in uno studio randomizzato su 765 atleti di scuola superiore, 523 dei quali ragazze, il gruppo con allenamento dell'equilibrio ha registrato 1,13 distorsioni ogni 1.000 esposizioni contro 1,87 (McGuine e Keene, 2006).",
    nameEn: 'Proprioception and balance training',
    descriptionEn:
      'The ability to sense the position and movement of one’s own body in space, trainable with balance and single-leg control exercises. In youth sport, programmes including it reduce ankle injuries by roughly 26% (IRR 0.74; 95% CI 0.60-0.91) with 15-20 minutes twice a week for 3-6 months (Berkey et al., 2024); in a randomised study of 765 high-school athletes, 523 of them girls, the balance-training group recorded 1.13 sprains per 1,000 exposures against 1.87 (McGuine and Keene, 2006).',
    sameAs: 'https://it.wikipedia.org/wiki/Propriocezione',
  },
  spalla: {
    name: 'Dolore di spalla nello sport giovanile',
    description:
      "Dolore e problemi funzionali dell'articolazione della spalla legati al gesto ripetuto sopra la testa. In uno studio prospettico su 471 atleti di pallamano d'élite di 15-18 anni monitorati ogni settimana, il 23% ha riferito problemi di spalla sostanziali in una stagione e il 43% di questi per almeno 3 settimane consecutive; la prevalenza era 1,46 volte più alta nelle ragazze (IC 95% 1,04-2,06) (Asker et al., 2018). Nel nuoto la fascia 15-17 anni riporta il tasso di dolore di spalla più alto di tutte le età considerate, il 91,3% (prevalenza auto-riferita; Feijen et al., 2020).",
    nameEn: 'Shoulder pain in youth sport',
    descriptionEn:
      'Pain and functional problems of the shoulder joint linked to repeated overhead movement. In a prospective study of 471 elite handball players aged 15-18 monitored every week, 23% reported substantial shoulder problems in one season and 43% of those for at least 3 consecutive weeks; prevalence was 1.46 times higher in girls (95% CI 1.04-2.06) (Asker et al., 2018). In swimming, the 15-17 age band reports the highest shoulder-pain rate of all ages considered, 91.3% (self-reported prevalence; Feijen et al., 2020).',
    sameAs: 'https://it.wikipedia.org/wiki/Spalla',
  },
  'sport-overhead': {
    name: 'Sport overhead (gesto sopra la testa)',
    description:
      "Discipline il cui gesto principale si compie sopra la testa — pallavolo, nuoto, pallamano, tennis, badminton. Il carico si concentra su una spalla che nell'adolescente non ha finito di crescere: la cartilagine di accrescimento dell'omero prossimale fornisce circa l'80% della crescita in lunghezza dell'omero e si chiude tra i 18 e i 21 anni (Casadei e Kiel, StatPearls). La revisione sistematica sui fattori di rischio in questi sport conclude che l'evidenza è ancora limitata o contrastante (Asker et al., 2018).",
    nameEn: 'Overhead sports',
    descriptionEn:
      'Disciplines whose defining movement happens above the head — volleyball, swimming, handball, tennis, badminton. The load concentrates on a shoulder that in an adolescent has not finished growing: the proximal humeral growth plate provides roughly 80% of the humerus’s growth in length and closes between 18 and 21 (Casadei and Kiel, StatPearls). The systematic review of risk factors in these sports concludes that the evidence is still limited or conflicting (Asker et al., 2018).',
  },
  'discinesia-scapolare': {
    name: 'Discinesia scapolare',
    description:
      "Alterazione del movimento della scapola durante l'elevazione del braccio, spesso proposta come test di screening per la spalla. Il suo valore predittivo è contestato: una meta-analisi su 5 studi e 419 atleti stima un rischio di dolore di spalla maggiore del 43% (RR 1,43; IC 95% 1,05-1,93) (Hickey et al., 2018), mentre una più ampia su 7 studi e 923 atleti non trova alcuna associazione statisticamente significativa (RR 1,07; IC 95% 0,85-1,34; p=0,59) (Hogan et al., 2021). Da sola non identifica chi si farà male.",
    nameEn: 'Scapular dyskinesis',
    descriptionEn:
      'Altered movement of the shoulder blade during arm elevation, often proposed as a shoulder screening test. Its predictive value is contested: a meta-analysis of 5 studies and 419 athletes estimates a 43% greater risk of shoulder pain (RR 1.43; 95% CI 1.05-1.93) (Hickey et al., 2018), while a larger one of 7 studies and 923 athletes finds no statistically significant association (RR 1.07; 95% CI 0.85-1.34; p=0.59) (Hogan et al., 2021). On its own it does not identify who will get injured.',
  },
  'salute-mestruale': {
    name: 'Salute mestruale nello sport (gestione pratica)',
    description:
      "L'insieme delle condizioni che permettono di allenarsi durante le mestruazioni: prodotti adatti al gesto, abbigliamento che non aumenti la paura delle perdite, disponibilità di un kit e una prassi dichiarata sulle assenze. Non è un tema fisiologico ma organizzativo: tra le adolescenti di 10-18 anni dal 25,2% al 61,1% evita o riduce l'attività fisica durante le mestruazioni, con la paura delle perdite tra le barriere ricorrenti e carenze informative in 24 studi su 42 (Harvey et al., 2025).",
    nameEn: 'Menstrual health in sport (practical management)',
    descriptionEn:
      'The set of conditions that make training during menstruation possible: products suited to the movement, clothing that does not add to the fear of leaking, an available supply kit and a stated practice on absences. It is not a physiological topic but an organisational one: among adolescents aged 10-18, between 25.2% and 61.1% avoid or reduce physical activity during their period, with fear of leaking among the recurring barriers and informational gaps in 24 of 42 studies (Harvey et al., 2025).',
  },
  gird: {
    name: 'GIRD (deficit di rotazione interna gleno-omerale)',
    description:
      "Perdita di rotazione interna della spalla dominante rispetto alla controlaterale, adattamento tipico di chi lavora sopra la testa. In uno studio caso-controllo su 123 pallavolisti di scuola superiore (età media 15,8 anni) il 38,2% presentava GIRD, ma nello stesso campione non è emersa alcuna relazione con la storia di infortunio di spalla; i maschi tendevano all'ipomobilità e le femmine all'ipermobilità (Mizoguchi et al., 2022).",
    nameEn: 'GIRD (glenohumeral internal rotation deficit)',
    descriptionEn:
      'Loss of internal rotation in the dominant shoulder compared with the other side, a typical adaptation in those who work overhead. In a case-control study of 123 high-school volleyball players (mean age 15.8), 38.2% had GIRD, but in that same sample no relationship emerged with history of shoulder injury; males tended towards hypomobility and females towards hypermobility (Mizoguchi et al., 2022).',
  },
  'colpo-di-calore': {
    name: 'Colpo di calore da sforzo',
    description:
      "Innalzamento severo della temperatura corporea centrale — tipicamente sopra i 40°C — con segni di disfunzione del sistema nervoso centrale (incoordinazione motoria, delirio, convulsioni), causato da sforzo intenso in condizioni calde e umide (Morris e Patel, StatPearls). Nella sorveglianza sugli sport liceali USA colpisce per l'87,7% ragazzi, ma la quota scende al 50,9% togliendo il football americano: il divario riflette l'esposizione allo sport a rischio più alto, non una differenza di sesso nella tolleranza al caldo (Kerr et al., 2013).",
    nameEn: 'Exertional heat stroke',
    descriptionEn:
      'A severe rise in core body temperature — typically above 40°C — with signs of central nervous system dysfunction (uncoordinated movement, delirium, seizures), caused by intense exertion in hot, humid conditions (Morris and Patel, StatPearls). In U.S. high school sports surveillance it affects boys in 87.7% of cases, but that share drops to 50.9% once American football is excluded: the gap reflects exposure to the highest-risk sport, not a sex difference in heat tolerance (Kerr et al., 2013).',
  },
  'acclimatazione-al-caldo': {
    name: 'Acclimatazione al caldo',
    description:
      "Processo fisiologico e comportamentale con cui il corpo si adatta a fare sforzo in condizioni calde: aumenta il volume plasmatico, la risposta sudorale diventa più efficiente, la frequenza cardiaca scende a parità di carico. Le linee guida di riferimento per le scuole superiori la raccomandano nell'arco di 1-2 settimane a inizio stagione, con introduzione graduale di durata, intensità ed equipaggiamento (Casa e Csillan, 2009).",
    nameEn: 'Heat acclimatization',
    descriptionEn:
      'The physiological and behavioural process by which the body adapts to exercising in heat: plasma volume increases, the sweat response becomes more efficient, heart rate drops at a given workload. Guidelines for U.S. secondary schools recommend building it over 1-2 weeks at the start of the season, gradually introducing duration, intensity and equipment (Casa and Csillan, 2009).',
  },
  'dispnea-da-sforzo': {
    name: 'Dispnea da sforzo (fiato corto durante l\u2019attivit\u00e0)',
    description:
      "Sensazione di respiro corto o difficolt\u00e0 a respirare che compare durante o dopo l'attivit\u00e0 fisica intensa. In un campione svedese di 2.309 adolescenti di 12-13 anni la riferisce il 14%, con il sesso femminile associato in modo indipendente a un rischio pi\u00f9 alto; il 61% di chi la riferisce non ha alcuna diagnosi di asma (Johansson et al., 2014). \u00c8 un sintomo, non una diagnosi: sotto ci possono essere broncocostrizione da sforzo, ostruzione laringea da sforzo, respirazione disfunzionale, carenza di ferro o decondizionamento.",
    nameEn: 'Exercise-induced dyspnoea (breathlessness on exertion)',
    descriptionEn:
      "Shortness of breath or difficulty breathing appearing during or after strenuous physical activity. In a Swedish sample of 2,309 adolescents aged 12-13, 14% report it, with female sex independently associated with higher risk; 61% of those reporting it have no asthma diagnosis at all (Johansson et al., 2014). It is a symptom, not a diagnosis: underlying causes include exercise-induced bronchoconstriction, exercise-induced laryngeal obstruction, dysfunctional breathing, iron deficiency or deconditioning.",
    sameAs: 'https://en.wikipedia.org/wiki/Shortness_of_breath',
  },
  'broncocostrizione-da-sforzo': {
    name: 'Broncocostrizione indotta da esercizio (EIB)',
    description:
      "Restringimento transitorio delle vie aeree inferiori provocato dallo sforzo: il picco arriva tipicamente entro 10-15 minuti dalla fine dell'esercizio e si risolve in 30-90 minuti, seguito da un periodo refrattario di 1-3 ore. La diagnosi richiede un test oggettivo con un calo del FEV1 pari o superiore al 10% rispetto al basale, non i soli sintomi (linea guida ATS, Parsons et al., 2013; Goldin e Bruner, StatPearls, 2025). Prevalenza stimata del 19,2% in una popolazione adolescente svedese testata (Johansson et al., 2015).",
    nameEn: 'Exercise-induced bronchoconstriction (EIB)',
    descriptionEn:
      'Transient narrowing of the lower airways triggered by exertion: it typically peaks within 10-15 minutes of stopping and resolves in 30-90 minutes, followed by a refractory period of 1-3 hours. Diagnosis requires objective testing with a fall in FEV1 of 10% or more from baseline, not symptoms alone (ATS guideline, Parsons et al., 2013; Goldin and Bruner, StatPearls, 2025). Estimated prevalence 19.2% in a tested Swedish adolescent population (Johansson et al., 2015).',
    sameAs: 'https://en.wikipedia.org/wiki/Exercise-induced_bronchoconstriction',
  },
  eilo: {
    name: 'Ostruzione laringea indotta da esercizio (EILO)',
    description:
      "Restringimento transitorio e reversibile della laringe durante lo sforzo: compare tipicamente al culmine dell'esercizio e si risolve rapidamente fermandosi, il contrario di quanto accade nella broncocostrizione da sforzo. Prevalenza stimata del 5,7% in una popolazione adolescente testata, dove pu\u00f2 coesistere con l'EIB (Johansson et al., 2015). Lo standard diagnostico \u00e8 la laringoscopia eseguita durante l'episodio sintomatico; algoritmi terapeutici validati non sono ancora stabiliti (statement congiunto ERS/ELS, Halvorsen et al., 2017).",
    nameEn: 'Exercise-induced laryngeal obstruction (EILO)',
    descriptionEn:
      'Transient, reversible narrowing of the larynx during exertion: it typically appears at peak exercise and resolves quickly on stopping — the opposite pattern to exercise-induced bronchoconstriction. Estimated prevalence 5.7% in a tested adolescent population, where it can coexist with EIB (Johansson et al., 2015). The diagnostic standard is laryngoscopy performed during the symptomatic episode; validated treatment algorithms are not yet established (joint ERS/ELS statement, Halvorsen et al., 2017).',
  },
  apofisi: {
    name: 'Apofisi',
    description:
      "Nucleo di accrescimento dell'osso su cui si inserisce un tendine: finché non è fuso resta cartilagineo, ed è il punto meno resistente della catena muscolo-tendine-osso. È la ragione per cui in un corpo in crescita un gesto esplosivo tende a danneggiare l'attacco osseo invece del ventre muscolare: nelle serie di avulsioni pelviche in atleti adolescenti l'età media dei campioni va da 13,6 a 16,8 anni (Di Maria et al., 2022; campione all'82% maschile).",
    nameEn: 'Apophysis',
    descriptionEn:
      'A bone growth centre where a tendon inserts: until it fuses it stays cartilaginous, and it is the least resistant point in the muscle-tendon-bone chain. This is why, in a growing body, an explosive movement tends to damage the bony attachment rather than the muscle belly: across pelvic avulsion series in adolescent athletes, sample mean ages run from 13.6 to 16.8 years (Di Maria et al., 2022; sample 82% male).',
  },
  'avulsione-apofisaria': {
    name: 'Avulsione apofisaria',
    description:
      "Distacco di un frammento osseo nel punto in cui un tendine si inserisce su un'apofisi non ancora fusa, tipicamente in un singolo gesto esplosivo — uno scatto, un calcio, una spaccata — e non per accumulo. Su 453 pazienti adolescenti le sedi più colpite sono la spina iliaca antero-superiore (37%), la antero-inferiore (31%) e la tuberosità ischiatica (14%), con ritorno al livello precedente nel 79% dei trattamenti conservativi (Di Maria et al., 2022). In una serie di 242 casi il calcio è lo sport più frequente e la corsa o lo sprint il meccanismo più comune; le femmine hanno più spesso avulsioni della cresta iliaca (Moeller e Galasso, 2022).",
    nameEn: 'Apophyseal avulsion',
    descriptionEn:
      'Separation of a bone fragment where a tendon inserts onto an unfused apophysis, typically in a single explosive movement — a sprint start, a kick, a split — rather than through accumulation. Across 453 adolescent patients the commonest sites are the anterior superior iliac spine (37%), the anterior inferior iliac spine (31%) and the ischial tuberosity (14%), with return to previous level in 79% of conservatively treated cases (Di Maria et al., 2022). In a series of 242 cases football is the commonest sport and running or sprinting the commonest mechanism; girls more often have iliac crest avulsions (Moeller and Galasso, 2022).',
    sameAs: 'https://en.wikipedia.org/wiki/Avulsion_fracture',
  },
  epifisiolisi: {
    name: 'Epifisiolisi della testa del femore',
    description:
      "Scivolamento del nucleo di accrescimento della testa del femore rispetto al collo, tipico dell'età puberale; è più frequente nei maschi e in presenza di peso corporeo elevato. Il dolore si presenta spesso lontano dall'anca: in uno studio prospettico su 107 pazienti (122 anche) era riferito al ginocchio nel 26,2% dei casi e all'inguine nel 13,9%, e il 49% aveva avuto più di una visita prima della diagnosi (Uvodich et al., 2019).",
    nameEn: 'Slipped capital femoral epiphysis (SCFE)',
    descriptionEn:
      "Slipping of the femoral head growth plate relative to the neck, typical of puberty; it is more common in boys and with higher body weight. Pain often presents away from the hip: in a prospective study of 107 patients (122 hips) it was reported in the knee in 26.2% of cases and in the groin in 13.9%, and 49% had more than one visit before diagnosis (Uvodich et al., 2019).",
    sameAs: 'https://en.wikipedia.org/wiki/Slipped_capital_femoral_epiphysis',
  },
  'ipermobilità-articolare': {
    name: 'Ipermobilità articolare generalizzata',
    description:
      "Escursione articolare superiore alla norma in più articolazioni del corpo, misurata con il punteggio di Beighton. Non è una malattia né una diagnosi: è una caratteristica diffusa, e nelle ragazze più che nei ragazzi. In una meta-analisi di 20 studi e 21.145 partecipanti di 3-19 anni la prevalenza è del 34,1%, con il 32,5% nelle femmine contro il 18,1% nei maschi e valori in calo con l'età (Sobhani-Eraghi et al., 2020; eterogeneità elevata dichiarata dagli autori). Il rischio in più nello sport è specifico, non generale: lesione al ginocchio negli sport di contatto, odds ratio combinato 4,69 (IC 95% 1,33-16,52), nessun rischio aumentato alla caviglia (Pacey et al., 2010).",
    nameEn: 'Generalised joint hypermobility',
    descriptionEn:
      'A greater-than-normal range of motion across several joints, measured with the Beighton score. It is neither a disease nor a diagnosis: it is a common characteristic, and more common in girls than in boys. In a meta-analysis of 20 studies and 21,145 participants aged 3-19 the prevalence is 34.1%, with 32.5% in girls against 18.1% in boys and figures declining with age (Sobhani-Eraghi et al., 2020; high heterogeneity declared by the authors). The extra risk in sport is specific, not general: knee injury in contact sports, pooled odds ratio 4.69 (95% CI 1.33-16.52), with no increased risk at the ankle (Pacey et al., 2010).',
    sameAs: 'https://en.wikipedia.org/wiki/Hypermobility_(joints)',
  },
  beighton: {
    name: 'Punteggio di Beighton',
    description:
      "Il test standard per l'ipermobilità articolare generalizzata: nove punti assegnati per mignolo iperesteso oltre 90°, pollice che si appoggia all'avambraccio, gomito e ginocchio oltre i 10° di iperestensione (un punto per lato) e flessione del tronco con i palmi a terra a ginocchia estese (Beighton et al., 1973). La soglia cambia con l'età: la classificazione internazionale 2017 delle sindromi di Ehlers-Danlos indica ≥6 su 9 nei prepuberi, ≥5 nei puberi e negli adulti fino a 50 anni, ≥4 oltre i 50 (Malfait et al., 2017). Misura l'escursione, non il dolore né la stabilità sotto carico: da solo non è una diagnosi.",
    nameEn: 'Beighton score',
    descriptionEn:
      'The standard test for generalised joint hypermobility: nine points awarded for a little finger extending beyond 90°, a thumb resting against the forearm, an elbow and a knee past 10° of hyperextension (one point per side) and trunk flexion with the palms on the floor and knees straight (Beighton et al., 1973). The cut-off changes with age: the 2017 international classification of the Ehlers-Danlos syndromes sets ≥6 out of 9 in prepubertal children, ≥5 in pubertal people and adults up to 50, and ≥4 over 50 (Malfait et al., 2017). It measures range of motion, not pain or stability under load: on its own it is not a diagnosis.',
  },
  'dolore-inguinale': {
    name: "Dolore inguinale dell'atleta",
    description:
      "Dolore della regione inguinale legato allo sport. L'accordo di Doha, siglato da 24 esperti di 14 Paesi, lo classifica in tre gruppi: entità cliniche definite (dolore correlato ad adduttori, ileopsoas, regione inguinale e regione pubica), dolore correlato all'anca e altre cause (Weir et al., 2015). È il problema che raramente ferma chi ne soffre: nelle calciatrici adulte di Super League svizzera la prevalenza stagionale di problemi d'anca e inguine è del 60,7%, ma solo l'11,1% degli episodi comporta perdita di tempo di allenamento (Reichmann et al., 2025).",
    nameEn: "Groin pain in athletes",
    descriptionEn:
      'Sport-related pain in the groin region. The Doha agreement, signed by 24 experts from 14 countries, classifies it into three groups: defined clinical entities (adductor-, iliopsoas-, inguinal- and pubic-related groin pain), hip-related groin pain, and other causes (Weir et al., 2015). It is the problem that rarely stops the athlete who has it: in adult Swiss Super League women footballers, seasonal prevalence of hip and groin problems is 60.7%, but only 11.1% of episodes involve any training time loss (Reichmann et al., 2025).',
  },
};

export type GlossaryKey = keyof typeof GLOSSARY;

/** Chiavi in ordine alfabetico sul nome italiano: l'ordine di lettura della pagina. */
export const glossaryKeysSorted = (lang: string = 'it'): string[] =>
  Object.keys(GLOSSARY).sort((a, b) =>
    (lang === 'en' ? GLOSSARY[a].nameEn : GLOSSARY[a].name).localeCompare(
      lang === 'en' ? GLOSSARY[b].nameEn : GLOSSARY[b].name,
      lang,
    ),
  );

/** Nome del termine nella lingua richiesta (fallback italiano). */
export const termName = (key: string, lang: string): string =>
  lang === 'en' ? GLOSSARY[key].nameEn : GLOSSARY[key].name;

/** Definizione del termine nella lingua richiesta (fallback italiano). */
export const termDescription = (key: string, lang: string): string =>
  lang === 'en' ? GLOSSARY[key].descriptionEn : GLOSSARY[key].description;

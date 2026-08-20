/**
 * @file      src/data/facts.ts
 * @summary   I dati citabili di BAB: una statistica per voce, con la popolazione in cui
 *            è stata misurata e la fonte. Alimenta la pagina /dati (e /en/dati), dove
 *            ogni numero ha un'ancora propria, e la sezione "Fatti citabili" di llms.txt.
 *
 *            Regola di scrittura: il numero non viaggia mai da solo. Ogni voce dichiara
 *            su chi è stato misurato e, quando lo studio è su adulte o su maschi, lo dice
 *            in chiaro — è la differenza tra un dato citabile e un dato fuorviante.
 *            Le avvertenze metodologiche fanno parte del claim, non sono una postilla:
 *            se un motore cita la frase, deve portarsi dietro anche il limite.
 * @author    Sajid Hossain <sajid.hossain2009@gmail.com>
 * @copyright (c) 2026 Breaking All Barriers. Tutti i diritti riservati.
 */

export interface Fact {
  /** Ancora stabile: /dati#{id} è l'URL citabile di questa singola statistica. */
  id: string;
  /** Slug dell'articolo che la tratta per esteso, con le sue fonti. */
  article: string;
  claim: string;
  claimEn: string;
  /** Autori e anno, come compaiono nella bibliografia dell'articolo. */
  source: string;
  doi?: string;
}

export const FACTS: Fact[] = [
  {
    id: 'abbandono-puberta-1',
    article: 'abbandono-puberta',
    claim: 'Tra le ragazze tesserate a 10-14 anni, il 71% abbandona lo sport senza mai rientrare.',
    claimEn: 'Among girls registered with a club at ages 10-14, 71% drop out of sport without ever returning.',
    source: 'Eime et al., 2020',
    doi: '10.3389/fspor.2020.00039',
  },
  {
    id: 'ciclo-e-performance-1',
    article: 'ciclo-e-performance',
    claim:
      "Il 77% delle atlete d'élite riferisce che il ciclo mestruale ha influenzato negativamente la propria performance. Popolazione: 128 atlete ADULTE, età media 28 anni.",
    claimEn:
      '77% of elite athletes report that their menstrual cycle has negatively affected their performance. Population: 128 ADULT athletes, mean age 28.',
    source: 'Jones et al., 2024',
    doi: '10.3389/fspor.2024.1296189',
  },
  {
    id: 'ciclo-e-performance-2',
    article: 'ciclo-e-performance',
    claim:
      "L'effetto della fase del ciclo mestruale sulla performance è di entità banale (ES 0,5 = -0,06; CrI 95% -0,16 a 0,04), con qualità delle prove bassa secondo GRADE. Popolazione: 78 studi, 1.193 donne ADULTE di 18-40 anni; nessun dato equivalente sulle adolescenti.",
    claimEn:
      'The effect of menstrual cycle phase on performance is of trivial magnitude (ES 0.5 = -0.06; 95% CrI -0.16 to 0.04), with evidence quality rated low under GRADE. Population: 78 studies, 1,193 ADULT women aged 18-40; no equivalent data exists for adolescents.',
    source: 'McNulty et al., 2020',
    doi: '10.1007/s40279-020-01319-3',
  },
  {
    id: 'dolori-mestruali-giovani-atlete-1',
    article: 'dolori-mestruali-giovani-atlete',
    claim:
      "Tra le adolescenti di 10-18 anni, dal 25,2% al 61,1% evita o riduce l'attività fisica durante le mestruazioni.",
    claimEn:
      'Among adolescents aged 10-18, between 25.2% and 61.1% avoid or reduce physical activity during their period.',
    source: 'Harvey et al., 2025',
    doi: '10.1186/s12905-025-03825-w',
  },
  {
    id: 'dolori-mestruali-giovani-atlete-2',
    article: 'dolori-mestruali-giovani-atlete',
    claim:
      'La prevalenza della dismenorrea (dolore mestruale) è del 71,1%; il 20,1% riferisce assenze da scuola o università a causa del dolore e il 40,9% un impatto su concentrazione o rendimento in classe. Popolazione: 38 studi, 21.573 giovani donne SOTTO I 25 ANNI, in larga parte studentesse — non solo adolescenti.',
    claimEn:
      'The prevalence of dysmenorrhoea (period pain) is 71.1%; 20.1% report absence from school or university because of the pain and 40.9% an impact on concentration or classroom performance. Population: 38 studies, 21,573 young women UNDER 25, largely students — not adolescents only.',
    source: 'Armour et al., 2019',
    doi: '10.1089/jwh.2018.7615',
  },
  {
    id: 'dolori-mestruali-giovani-atlete-3',
    article: 'dolori-mestruali-giovani-atlete',
    claim:
      "Tra le atlete la dismenorrea è il disturbo del ciclo mestruale più frequente, con prevalenza del 32,3%. ATTENZIONE: l'intervallo tra gli studi va dal 7,8% all'85,6% perché definizioni e metodi di rilevazione sono molto diversi — è affidabile l'ordine di grandezza, non la cifra. Popolazione: revisione sistematica di 60 studi e 6.380 atlete non in contraccezione ormonale.",
    claimEn:
      'Among athletes, dysmenorrhoea is the most frequent menstrual disorder, with a prevalence of 32.3%. CAUTION: the range across studies runs from 7.8% to 85.6% because definitions and measurement methods differ widely — the order of magnitude is reliable, the figure is not. Population: systematic review of 60 studies and 6,380 athletes not using hormonal contraception.',
    source: 'Taim et al., 2023',
    doi: '10.1007/s40279-023-01871-8',
  },
  {
    id: 'dolori-mestruali-giovani-atlete-4',
    article: 'dolori-mestruali-giovani-atlete',
    claim:
      "L'esercizio fisico può ridurre in misura ampia l'intensità del dolore mestruale rispetto al non fare nulla (SMD -1,86; IC 95% -2,06 a -1,66), pari a circa 25 mm su una scala visuo-analogica di 100 mm; la dose usata negli studi è di 45-60 minuti almeno 3 volte a settimana, a qualsiasi intensità. Qualità delle prove BASSA; non è chiaro se il beneficio persista dopo la sospensione. Popolazione: 12 studi e 854 donne (10 studi e 754 donne in meta-analisi).",
    claimEn:
      'Exercise can substantially reduce the intensity of period pain compared with doing nothing (SMD -1.86; 95% CI -2.06 to -1.66), roughly 25 mm on a 100 mm visual analogue scale; the dose used in the studies is 45-60 minutes at least 3 times a week, at any intensity. Evidence quality LOW; whether the benefit persists after stopping is unclear. Population: 12 studies and 854 women (10 studies and 754 women in the meta-analysis).',
    source: 'Armour et al., 2019 (Cochrane)',
    doi: '10.1002/14651858.CD004142.pub4',
  },
  {
    id: 'dolori-mestruali-giovani-atlete-5',
    article: 'dolori-mestruali-giovani-atlete',
    claim:
      "Solo l'11% delle atlete parla di ciclo mestruale con il proprio allenatore: 4% se è un uomo, 55% se è una donna; l'88% ha imparato queste cose da sola. Popolazione: 1.086 atlete, adulte e adolescenti insieme, dati non suddivisi per età.",
    claimEn:
      'Only 11% of athletes discuss their menstrual cycle with their coach: 4% if the coach is a man, 55% if a woman; 88% learned about it on their own. Population: 1,086 athletes, adults and adolescents together, data not broken down by age.',
    source: 'Höök et al., 2022',
    doi: '10.3390/ijerph191911932',
  },
  {
    id: 'parole-allenatore-salute-atlete-1',
    article: 'parole-allenatore-salute-atlete',
    claim:
      'Il 44% delle atlete adolescenti crede erroneamente che perdere il ciclo sia una normale risposta a carichi di allenamento elevati. Popolazione: 90 atlete adolescenti.',
    claimEn:
      '44% of adolescent female athletes mistakenly believe that losing their period is a normal response to heavy training loads. Population: 90 adolescent female athletes.',
    source: 'Armento et al., 2021',
    doi: '10.4085/624-20',
  },
  {
    id: 'gestire-ciclo-nello-sport-1',
    article: 'gestire-ciclo-nello-sport',
    claim:
      "Le carenze informative sono una barriera documentata quanto i sintomi: nella revisione globale su 86 studi in 33 Paesi compaiono in 24 studi su 42 (57,1%), con scarsa alfabetizzazione mestruale tra le ragazze e formazione inadeguata di chi insegna educazione fisica. Popolazione: adolescenti di 10-18 anni.",
    claimEn:
      'Informational gaps are as documented a barrier as symptoms: in the global review of 86 studies across 33 countries they appear in 24 of 42 studies (57.1%), with poor menstrual health literacy among girls and inadequate training among PE staff. Population: adolescents aged 10-18.',
    source: 'Harvey et al., 2025',
    doi: '10.1186/s12905-025-03825-w',
  },
  {
    id: 'gestire-ciclo-nello-sport-2',
    article: 'gestire-ciclo-nello-sport',
    claim:
      "Le coppette mestruali risultano sicure e con perdite simili o inferiori ad assorbenti e tamponi: nei 4 studi che hanno confrontato direttamente i prodotti (293 partecipanti) tre non hanno trovato differenze e uno ha riportato perdite significativamente minori. Gli autori segnalano una necessaria fase di familiarizzazione ed eventi avversi rari (5 casi di sindrome da shock tossico, 47 difficoltà di rimozione, 13 dislocazioni di IUD). ATTENZIONE: 43 studi e 3.319 partecipanti, senza analisi per fascia d'età — non è una raccomandazione specifica per le adolescenti.",
    claimEn:
      'Menstrual cups are found to be safe, with leakage similar to or lower than pads and tampons: of the 4 studies directly comparing products (293 participants), three found no difference and one reported significantly less leakage. The authors note a necessary familiarisation phase and rare adverse events (5 cases of toxic shock syndrome, 47 removal difficulties, 13 IUD dislodgements). CAUTION: 43 studies and 3,319 participants, with no breakdown by age — not a recommendation specific to adolescents.',
    source: 'van Eijk et al., 2019',
    doi: '10.1016/S2468-2667(19)30111-2',
  },
  {
    id: 'ferro-atlete-adolescenti-1',
    article: 'ferro-atlete-adolescenti',
    claim:
      "Nelle atlete adolescenti (11-18 anni) la prevalenza di carenza di ferro lieve (ferritina ≤30 µg/L) è del 53,2%, mentre l'anemia sideropenica riguarda il 4%.",
    claimEn:
      'In adolescent female athletes (aged 11-18) the prevalence of mild iron deficiency (ferritin ≤30 µg/L) is 53.2%, while iron-deficiency anaemia affects 4%.',
    source: 'Nicotra et al., 2023',
    doi: '10.3390/jcm12030970',
  },
  {
    id: 'reggiseno-sportivo-ragazze-1',
    article: 'reggiseno-sportivo-ragazze',
    claim:
      'A 13-14 anni il 51% delle ragazze dice che il seno influenza la partecipazione allo sport, ma solo il 10% indossa sempre un reggiseno sportivo. Popolazione: 2.089 ragazze britanniche di 11-18 anni.',
    claimEn:
      'At 13-14, 51% of girls say their breasts affect their participation in sport, yet only 10% always wear a sports bra. Population: 2,089 British girls aged 11-18.',
    source: 'Scurr et al., 2016',
    doi: '10.1016/j.jadohealth.2015.10.005',
  },
  {
    id: 'sonno-atlete-adolescenti-1',
    article: 'sonno-atlete-adolescenti',
    claim: 'La raccomandazione di consenso per i 13-18 anni è di 8-10 ore di sonno per notte.',
    claimEn: 'The consensus recommendation for ages 13-18 is 8-10 hours of sleep per night.',
    source: 'Paruthi et al., 2016',
    doi: '10.5664/jcsm.5866',
  },
  {
    id: 'sonno-atlete-adolescenti-2',
    article: 'sonno-atlete-adolescenti',
    claim:
      'Negli atleti adolescenti, dormire meno di 8 ore per notte è associato a essere infortunati 1,7 volte più spesso (IC 95% 1,0-3,0; p=0,04). Popolazione: 112 atleti adolescenti di entrambi i sessi, risultati non suddivisi per sesso; associazione, non causa dimostrata.',
    claimEn:
      'In adolescent athletes, sleeping fewer than 8 hours a night is associated with being injured 1.7 times as often (95% CI 1.0-3.0; p=0.04). Population: 112 adolescent athletes of both sexes, results not broken down by sex; an association, not a demonstrated cause.',
    source: 'Milewski et al., 2014',
    doi: '10.1097/BPO.0000000000000151',
  },
  {
    id: 'sonno-atlete-adolescenti-3',
    article: 'sonno-atlete-adolescenti',
    claim:
      'I sintomi di insonnia salgono dal 3,4% al 12,2% nelle ragazze tra lo stadio 1 e lo stadio 5 di Tanner, contro il 4,3%-9,1% nei ragazzi. Popolazione: 7.507 bambini e adolescenti di 6-17 anni.',
    claimEn:
      'Insomnia symptoms rise from 3.4% to 12.2% in girls between Tanner stage 1 and stage 5, against 4.3%-9.1% in boys. Population: 7,507 children and adolescents aged 6-17.',
    source: 'Zhang et al., 2016',
    doi: '10.5665/sleep.6022',
  },
  {
    id: 'commozione-cerebrale-giovani-atlete-1',
    article: 'commozione-cerebrale-giovani-atlete',
    claim: 'Solo il 6% degli studi in scienze dello sport è condotto esclusivamente su donne.',
    claimEn: 'Only 6% of sport and exercise science studies are conducted exclusively on women.',
    source: 'Cowley et al., 2021',
    doi: '10.1123/wspaj.2021-0028',
  },
  {
    id: 'commozione-cerebrale-giovani-atlete-2',
    article: 'commozione-cerebrale-giovani-atlete',
    claim:
      'Nel calcio delle scuole superiori le atlete hanno un rischio di commozione cerebrale 1,88 volte quello dei coetanei maschi (IC 95% 1,69-2,09). Il meccanismo prevalente differisce: contatto con un oggetto nelle ragazze (41,9%), con un altro giocatore nei ragazzi (48,4%); i maschi hanno 1,54 volte la probabilità di essere rimossi immediatamente dal campo. Popolazione: 83.378 atleti di scuola superiore statunitensi, 2016-2019.',
    claimEn:
      'In high-school football (soccer), female athletes have 1.88 times the concussion risk of male peers (95% CI 1.69-2.09). The leading mechanism differs: contact with an object in girls (41.9%), with another player in boys (48.4%); boys are 1.54 times as likely to be removed from play immediately. Population: 83,378 US high-school athletes, 2016-2019.',
    source: 'Bretzin et al., 2021',
    doi: '10.1001/jamanetworkopen.2021.8191',
  },
  {
    id: 'commozione-cerebrale-giovani-atlete-3',
    article: 'commozione-cerebrale-giovani-atlete',
    claim:
      "Il 60% degli episodi di commozione cerebrale ricordati dagli atleti non era stato riferito a un adulto responsabile; per i colpi lievi («bell-ringer») la quota di non segnalazione sale all'87%. Popolazione: 167 atleti di scuola superiore di entrambi i sessi, età media 15,7 anni; studio preliminare.",
    claimEn:
      'Athletes had not reported 60% of the concussion events they recalled to a responsible adult; for minor blows («bell-ringers») the non-reporting share rises to 87%. Population: 167 high-school athletes of both sexes, mean age 15.7; preliminary study.',
    source: 'Register-Mihalik et al., 2013',
    doi: '10.4085/1062-6050-48.3.20',
  },
  {
    id: 'commozione-cerebrale-giovani-atlete-4',
    article: 'commozione-cerebrale-giovani-atlete',
    claim:
      'Gli atleti adolescenti rimossi immediatamente dal gioco dopo una commozione cerebrale recuperano in media in 22,0 giorni, contro 44,4 giorni per chi continua a giocare (p=0,003); chi resta in campo ha 8,8 volte la probabilità di un recupero prolungato oltre i 21 giorni. Popolazione: 69 atleti di 12-19 anni di entrambi i sessi, reclutati in centro specialistico — campione piccolo e selezionato.',
    claimEn:
      'Adolescent athletes removed from play immediately after a concussion recover in a mean of 22.0 days, against 44.4 days for those who keep playing (p=0.003); those who stay on are 8.8 times as likely to have a prolonged recovery beyond 21 days. Population: 69 athletes aged 12-19 of both sexes, recruited at a specialist centre — a small, selected sample.',
    source: 'Elbin et al., 2016',
    doi: '10.1542/peds.2016-0910',
  },
  {
    id: 'crociato-giovani-atlete-1',
    article: 'crociato-giovani-atlete',
    claim:
      'Nello sport delle scuole superiori le ragazze subiscono 0,084 rotture del legamento crociato anteriore ogni 1.000 esposizioni contro 0,060 nei ragazzi (rapporto 1,40; IC 95% 1,25-1,57); il divario più ampio è nel basket (RR 4,14) e il tasso assoluto più alto nel calcio femminile (0,166).',
    claimEn:
      'In high-school sport, girls sustain 0.084 anterior cruciate ligament ruptures per 1,000 exposures against 0.060 in boys (ratio 1.40; 95% CI 1.25-1.57); the widest gap is in basketball (RR 4.14) and the highest absolute rate is in girls’ football/soccer (0.166).',
    source: 'Bram et al., 2021',
    doi: '10.1177/0363546520959619',
  },
  {
    id: 'crociato-giovani-atlete-2',
    article: 'crociato-giovani-atlete',
    claim:
      "L'allenamento neuromuscolare preventivo riduce il rischio di rottura del crociato da circa 1 su 54 a 1 su 111 (OR 0,51; IC 95% 0,37-0,69); tra le atlete di 13-19 anni l'odds ratio scende a 0,38 (IC 95% 0,24-0,60), circa il 60% di rischio in meno. Dose media efficace: 24,1 minuti a sessione, 2,51 volte a settimana. Popolazione: 27.231 atlete di 13-24 anni, sottogruppo 13-19 riportato separatamente.",
    claimEn:
      'Preventive neuromuscular training reduces ACL rupture risk from roughly 1 in 54 to 1 in 111 (OR 0.51; 95% CI 0.37-0.69); among athletes aged 13-19 the odds ratio falls to 0.38 (95% CI 0.24-0.60), about 60% lower risk. Mean effective dose: 24.1 minutes per session, 2.51 times a week. Population: 27,231 female athletes aged 13-24, with the 13-19 subgroup reported separately.',
    source: 'Petushek et al., 2019',
    doi: '10.1177/0363546518782460',
  },
  {
    id: 'crociato-giovani-atlete-3',
    article: 'crociato-giovani-atlete',
    claim:
      'Dopo una ricostruzione del crociato, il 23% degli atleti under 25 che tornano allo sport subisce un secondo infortunio al crociato. Popolazione: atleti di entrambi i sessi.',
    claimEn:
      'After ACL reconstruction, 23% of athletes under 25 who return to sport sustain a second ACL injury. Population: athletes of both sexes.',
    source: 'Wiggins et al., 2016',
    doi: '10.1177/0363546515621554',
  },
  {
    id: 'picco-di-crescita-giovani-atlete-1',
    article: 'picco-di-crescita-giovani-atlete',
    claim:
      "Nelle giovani atlete l'età media stimata al picco di velocità di crescita (PHV) è di 11,18 anni, con intervallo di credibilità al 90% da 8,62 a 12,94 anni: l'ampiezza dell'intervallo è il dato, non un difetto della stima — in una stessa categoria convivono atlete biologicamente distanti anni. Popolazione: meta-analisi longitudinale bayesiana di 14 studi e 21 campioni indipendenti di giovani atlete.",
    claimEn:
      'In young female athletes the estimated mean age at peak height velocity (PHV) is 11.18 years, with a 90% credible interval from 8.62 to 12.94 years: the width of that interval is the finding, not a flaw in the estimate — one age category holds athletes years apart biologically. Population: Bayesian longitudinal meta-analysis of 14 studies and 21 independent samples of young female athletes.',
    source: 'Lima et al., 2024',
    doi: '10.7759/cureus.59482',
  },
  {
    id: 'picco-di-crescita-giovani-atlete-2',
    article: 'picco-di-crescita-giovani-atlete',
    claim:
      "Il picco di accumulo di contenuto minerale osseo si colloca circa 6 mesi DOPO il picco di velocità di crescita staturale: in quell'intervallo l'osso è già più lungo ma non ancora altrettanto denso. Popolazione: 53 ragazze e 60 ragazzi canadesi seguiti per 6 anni.",
    claimEn:
      'Peak bone mineral content accrual occurs roughly 6 months AFTER peak height velocity: in that window the bone is already longer but not yet as dense. Population: 53 Canadian girls and 60 boys followed for 6 years.',
    source: 'Bailey et al., 1999',
    doi: '10.1359/jbmr.1999.14.10.1672',
  },
  {
    id: 'picco-di-crescita-giovani-atlete-3',
    article: 'picco-di-crescita-giovani-atlete',
    claim:
      "Nelle giovani atlete l'evidenza a sostegno di un'associazione tra maturazione biologica e infortunio è LIMITATA; è invece moderata l'evidenza di un'associazione tra maturazione e fattori di rischio potenziali, soprattutto nella biomeccanica di salto e atterraggio e nel rischio di infortunio al ginocchio. Popolazione: revisione sistematica di 31 studi (10 sugli infortuni, 21 sui fattori di rischio) su ragazze e giovani donne nello sport.",
    claimEn:
      'In young female athletes the evidence supporting an association between biological maturation and injury is LIMITED; the evidence linking maturation to potential risk factors is moderate, above all in jumping and landing biomechanics and knee injury risk. Population: systematic review of 31 studies (10 on injury, 21 on risk factors) in girls and young women in sport.',
    source: 'Zoellner e Whatman, 2026',
    doi: '10.1016/j.ptsp.2025.08.007',
  },
  {
    id: 'perdite-urina-giovani-atlete-1',
    article: 'perdite-urina-giovani-atlete',
    claim:
      "Tra le atlete adolescenti la prevalenza di incontinenza urinaria durante lo sport va dal 18,2% all'80% a seconda della disciplina, con una media del 48,58%; i valori più alti sono nel trampolino elastico (80%), nel salto con la corda (75%) e nel calcio (62,8%). Popolazione: 9 studi, 633 atlete sotto i 19 anni, età media 16,15.",
    claimEn:
      'Among adolescent female athletes the prevalence of urinary incontinence during sport ranges from 18.2% to 80% depending on the discipline, with a mean of 48.58%; the highest values are in trampolining (80%), rope skipping (75%) and football/soccer (62.8%). Population: 9 studies, 633 athletes under 19, mean age 16.15.',
    source: 'Rial Rebullido et al., 2021',
    doi: '10.3390/jfmk6010012',
  },
  {
    id: 'perdite-urina-giovani-atlete-2',
    article: 'perdite-urina-giovani-atlete',
    claim:
      "L'87% delle atlete adolescenti dichiara che non parlerebbe dei propri sintomi di incontinenza urinaria con il proprio allenatore, e dal 69% al 90% non ha mai sentito nominare l'allenamento del pavimento pelvico.",
    claimEn:
      '87% of adolescent female athletes say they would not discuss their urinary incontinence symptoms with their coach, and between 69% and 90% have never heard of pelvic floor training.',
    source: 'Rial Rebullido et al., 2021',
    doi: '10.3390/jfmk6010012',
  },
  {
    id: 'specializzazione-precoce-giovani-atlete-1',
    article: 'specializzazione-precoce-giovani-atlete',
    claim:
      'Tra 219 atlete di 13-18 anni, le altamente specializzate in un solo sport riferiscono una storia di infortuni 2,93 volte più spesso delle poco specializzate (IC 95% 1,38-6,24) e una storia di commozione cerebrale 5,00 volte più spesso (IC 95% 1,86-13,42). Studio trasversale su questionario, intervalli di confidenza ampi.',
    claimEn:
      'Among 219 female athletes aged 13-18, those highly specialised in a single sport report a history of injury 2.93 times as often as low-specialisation peers (95% CI 1.38-6.24) and a history of concussion 5.00 times as often (95% CI 1.86-13.42). Cross-sectional questionnaire study, wide confidence intervals.',
    source: 'Okoruwa et al., 2022',
    doi: '10.1177/19417381221123532',
  },
  {
    id: 'specializzazione-precoce-giovani-atlete-2',
    article: 'specializzazione-precoce-giovani-atlete',
    claim:
      "I giovani atleti che praticano più ore di sport organizzato a settimana dei propri anni d'età hanno 2,07 volte le probabilità di un infortunio grave da sovraccarico (IC 95% 1,40-3,05); un rapporto tra sport organizzato e gioco libero superiore a 2:1 porta a 1,87 volte (IC 95% 1,26-2,76).",
    claimEn:
      'Young athletes who play more hours of organised sport per week than their age in years have 2.07 times the odds of a serious overuse injury (95% CI 1.40-3.05); a ratio of organised sport to free play above 2:1 raises it to 1.87 times (95% CI 1.26-2.76).',
    source: 'Jayanthi et al., 2015',
    doi: '10.1177/0363546514567298',
  },
  {
    id: 'specializzazione-precoce-giovani-atlete-3',
    article: 'specializzazione-precoce-giovani-atlete',
    claim:
      "La guidance dell'American Academy of Pediatrics per gli under 18 indica: praticare più sport almeno fino alla pubertà, specializzarsi più tardi (tarda adolescenza), meno ore settimanali di sport organizzato degli anni d'età e comunque sotto le 16, almeno 1-2 giorni a settimana liberi dallo sport specifico e almeno 3 mesi all'anno di stacco in blocchi di un mese. È guidance di consenso su evidenza limitata, e nasce nel contesto sportivo statunitense.",
    claimEn:
      'American Academy of Pediatrics guidance for under-18s: play multiple sports at least until puberty, specialise later (late adolescence), keep weekly hours of organised sport below the athlete’s age in years and under 16 in any case, take 1-2 days a week free from the specific sport, and at least 3 months a year off in one-month blocks. This is consensus guidance on limited evidence, written for the US sporting context.',
    source: 'Brenner e AAP, 2016',
    doi: '10.1542/peds.2016-2148',
  },
  {
    id: 'salute-ossea-fratture-da-stress-giovani-atlete-1',
    article: 'salute-ossea-fratture-da-stress-giovani-atlete',
    claim:
      'Negli sport confrontabili tra i due sessi delle scuole superiori statunitensi, le atlete subiscono 2,22 fratture da stress ogni 100.000 esposizioni contro 1,27 dei coetanei maschi (rapporto 1,75; IC 95% 1,38-2,23) e rappresentano il 63,3% di tutti i casi; i tassi più alti sono nella corsa campestre femminile (10,62) e nella ginnastica femminile (7,43). Popolazione: 389 fratture da stress su 51.773 infortuni, 2005-2013.',
    claimEn:
      'In sex-comparable US high-school sports, female athletes sustain 2.22 stress fractures per 100,000 exposures against 1.27 in male peers (ratio 1.75; 95% CI 1.38-2.23) and account for 63.3% of all cases; the highest rates are in girls’ cross-country (10.62) and girls’ gymnastics (7.43). Population: 389 stress fractures out of 51,773 injuries, 2005-2013.',
    source: 'Changstrom et al., 2015',
    doi: '10.1177/0363546514562739',
  },
  {
    id: 'salute-ossea-fratture-da-stress-giovani-atlete-2',
    article: 'salute-ossea-fratture-da-stress-giovani-atlete',
    claim:
      "All'aumentare dei fattori di rischio della triade dell'atleta femminile cresce l'incidenza di lesioni ossee da stress: con bassa densità ossea (Z-score < -1,0) e ≥12 ore di allenamento a settimana il 29,7% ne ha subita una; sommando ≥12 ore, uno sport «di magrezza» e restrizione alimentare la quota sale al 46,2%, contro un 10,8% complessivo. Popolazione: 259 ragazze e giovani donne attive, ETÀ MEDIA 18,1 anni; studio osservazionale, associazioni e non causalità.",
    claimEn:
      'As female athlete triad risk factors accumulate, the incidence of bone stress injury rises: with low bone density (Z-score < -1.0) and ≥12 training hours a week, 29.7% sustained one; combining ≥12 hours, a «leanness» sport and dietary restriction takes it to 46.2%, against 10.8% overall. Population: 259 active girls and young women, MEAN AGE 18.1; observational study, associations rather than causation.',
    source: 'Barrack et al., 2014',
    doi: '10.1177/0363546513520295',
  },
  {
    id: 'forza-ragazze-adolescenti-1',
    article: 'forza-ragazze-adolescenti',
    claim:
      "10 minuti di salti al posto del riscaldamento dell'ora di educazione fisica, 2 volte a settimana per 8 mesi, hanno aumentato nelle ragazze il contenuto minerale osseo del collo del femore del 13,9% contro il 4,9% dei controlli. Popolazione: studio controllato randomizzato su 99 adolescenti (53 ragazze, 46 ragazzi), età media 13,8 anni; effetti sesso-specifici.",
    claimEn:
      '10 minutes of jumping replacing the PE warm-up, twice a week for 8 months, increased femoral neck bone mineral content in girls by 13.9% against 4.9% in controls. Population: randomised controlled trial of 99 adolescents (53 girls, 46 boys), mean age 13.8; sex-specific effects.',
    source: 'Weeks et al., 2008',
    doi: '10.1359/jbmr.080226',
  },
  {
    id: 'forza-ragazze-adolescenti-2',
    article: 'forza-ragazze-adolescenti',
    claim:
      "L'allenamento con i pesi non blocca la crescita: in una revisione di 22 programmi sperimentali su bambini e preadolescenti i programmi hanno migliorato significativamente la forza, NON hanno influenzato la crescita in statura e peso, e nei 10 studi che monitoravano sistematicamente gli infortuni ne sono stati riportati in tutto tre (tassi stimati 0,176 / 0,053 / 0,055 ogni 100 ore). La conclusione è condizionata: vale per protocolli CON supervisione e basso rapporto istruttore/partecipanti.",
    claimEn:
      'Weight training does not stunt growth: in a review of 22 experimental programmes in children and preadolescents, the programmes significantly improved strength, did NOT affect growth in height or weight, and across the 10 studies that systematically monitored injuries a total of three were reported (estimated rates 0.176 / 0.053 / 0.055 per 100 hours). The conclusion is conditional: it holds for SUPERVISED protocols with a low instructor-to-participant ratio.',
    source: 'Malina, 2006',
    doi: '10.1097/01.jsm.0000248843.31874.be',
  },
  {
    id: 'forza-ragazze-adolescenti-3',
    article: 'forza-ragazze-adolescenti',
    claim:
      "Solo il 38,51% di bambini e adolescenti rispetta la raccomandazione OMS di attività di rinforzo muscolare almeno 3 giorni a settimana (IC 95% 34,35-42,75); tra i predittori del rispetto delle raccomandazioni compare l'essere maschio. Popolazione: meta-analisi di 29 studi, 1.273.544 bambini e adolescenti di 36 Paesi, 49,40% ragazze, età media 13,40 anni.",
    claimEn:
      'Only 38.51% of children and adolescents meet the WHO recommendation of muscle-strengthening activity on at least 3 days a week (95% CI 34.35-42.75); being male is among the predictors of meeting it. Population: meta-analysis of 29 studies, 1,273,544 children and adolescents across 36 countries, 49.40% girls, mean age 13.40.',
    source: 'García-Hermoso et al., 2025',
    doi: '10.1111/apa.70315',
  },
  {
    id: 'forza-ragazze-adolescenti-4',
    article: 'forza-ragazze-adolescenti',
    claim:
      "Il solo allenamento della forza come prevenzione primaria si associa a un rischio relativo di infortunio sportivo di 0,338 (IC 95% 0,238-0,480), con forza dell'evidenza alta, nessun bias di pubblicazione e relazione dose-risposta. ATTENZIONE: 6 studi randomizzati, 7.738 partecipanti di 12-40 anni, risultati non scorporati per fascia d'età — non è una stima specifica per le adolescenti.",
    claimEn:
      'Strength training alone as primary prevention is associated with a relative risk of sports injury of 0.338 (95% CI 0.238-0.480), with high strength of evidence, no publication bias and a dose-response relationship. CAUTION: 6 randomised studies, 7,738 participants aged 12-40, results not broken down by age band — this is not an estimate specific to adolescents.',
    source: 'Lauersen et al., 2018',
    doi: '10.1136/bjsports-2018-099078',
  },
  {
    id: 'dolore-ginocchio-femoro-rotuleo-giovani-atlete-1',
    article: 'dolore-ginocchio-femoro-rotuleo-giovani-atlete',
    claim:
      "La prevalenza annuale di dolore femoro-rotuleo negli adolescenti è stimata al 28,9%, contro il 22,7% nella popolazione generale; tra gli atleti adolescenti amatoriali l'incidenza nell'arco di una stagione va dal 5,1% al 14,9%. Gli autori segnalano pochi studi e definizioni eterogenee.",
    claimEn:
      'The estimated annual prevalence of patellofemoral pain in adolescents is 28.9%, against 22.7% in the general population; among amateur adolescent athletes, incidence over a season runs from 5.1% to 14.9%. The authors flag few studies and heterogeneous definitions.',
    source: 'Smith et al., 2018',
    doi: '10.1371/journal.pone.0190892',
  },
  {
    id: 'dolore-ginocchio-femoro-rotuleo-giovani-atlete-2',
    article: 'dolore-ginocchio-femoro-rotuleo-giovani-atlete',
    claim:
      'A cinque anni dal primo rilevamento, il 40,5% degli adolescenti con dolore al ginocchio ne ha ancora (IC 95% 35,4-45,6) contro il 13,2% dei controlli; tra chi ha ancora dolore il 60% ha smesso o ridotto lo sport a causa del ginocchio. Popolazione: 504 adolescenti danesi di 15-19 anni di entrambi i sessi.',
    claimEn:
      'Five years after baseline, 40.5% of adolescents with knee pain still have it (95% CI 35.4-45.6) against 13.2% of controls; among those still in pain, 60% have stopped or cut back on sport because of the knee. Population: 504 Danish adolescents aged 15-19 of both sexes.',
    source: 'Rathleff et al., 2019 (BMJ Open)',
    doi: '10.1136/bmjopen-2018-024113',
  },
  {
    id: 'dolore-ginocchio-femoro-rotuleo-giovani-atlete-3',
    article: 'dolore-ginocchio-femoro-rotuleo-giovani-atlete',
    claim:
      "Nel dolore femoro-rotuleo degli adolescenti funziona la gestione del carico, non il riposo totale: 12 settimane di modifica dell'attività, esercizi a casa e ritorno graduale allo sport hanno prodotto l'86% di esiti riferiti come positivi a 12 settimane e l'81% a 12 mesi. Popolazione: 151 adolescenti di 10-14 anni; studio prospettico SENZA gruppo di controllo, quindi non dimostrativo di efficacia.",
    claimEn:
      'In adolescent patellofemoral pain what works is load management, not complete rest: 12 weeks of activity modification, home exercises and graded return to sport produced 86% self-reported positive outcomes at 12 weeks and 81% at 12 months. Population: 151 adolescents aged 10-14; prospective study WITHOUT a control group, so not proof of efficacy.',
    source: 'Rathleff et al., 2019 (AJSM)',
    doi: '10.1177/0363546519843915',
  },
  {
    id: 'dolore-ginocchio-femoro-rotuleo-giovani-atlete-4',
    article: 'dolore-ginocchio-femoro-rotuleo-giovani-atlete',
    claim:
      'Tra 2.953 adolescenti danesi di 12-19 anni, il dolore al ginocchio era riferito dal 35,0% delle ragazze contro il 27,9% dei ragazzi, e il dolore quasi quotidiano in qualsiasi sede dal 23,8% contro il 13,3%.',
    claimEn:
      'Among 2,953 Danish adolescents aged 12-19, knee pain was reported by 35.0% of girls against 27.9% of boys, and near-daily pain at any site by 23.8% against 13.3%.',
    source: 'Rathleff et al., 2013',
    doi: '10.1186/1471-2431-13-191',
  },
  {
    id: 'distorsione-caviglia-giovani-atlete-1',
    article: 'distorsione-caviglia-giovani-atlete',
    claim:
      "Nelle giovani atlete la caviglia è la sede anatomica più colpita: il 23% di tutti gli infortuni, davanti a ginocchio (16%) e coscia (13%), all'interno di un 67% di infortuni all'arto inferiore. Popolazione: revisione sistematica con meta-analisi di 32 studi, 15.908 atlete under 19.",
    claimEn:
      'In young female athletes the ankle is the most affected site: 23% of all injuries, ahead of the knee (16%) and thigh (13%), within 67% of injuries occurring at the lower limb. Population: systematic review with meta-analysis of 32 studies, 15,908 athletes under 19.',
    source: 'Beech et al., 2024',
    doi: '10.1007/s40279-023-01988-w',
  },
  {
    id: 'distorsione-caviglia-giovani-atlete-2',
    article: 'distorsione-caviglia-giovani-atlete',
    claim:
      "Tra gli atleti di scuola superiore di 14-18 anni la prevalenza di instabilità cronica di caviglia è del 20,0%: 23,6% tra le ragazze contro il 16,3% tra i ragazzi. Solo il 26,1% riferiva però almeno una distorsione: la quota di chi ha una caviglia instabile è quasi pari alla quota di chi ricorda l'infortunio. Popolazione: 1.002 atleti, età media 15,6 anni, 50,4% ragazze.",
    claimEn:
      'Among high-school athletes aged 14-18 the prevalence of chronic ankle instability is 20.0%: 23.6% in girls against 16.3% in boys. Yet only 26.1% reported ever having sprained an ankle: the share with an unstable ankle is almost equal to the share who remember the injury. Population: 1,002 athletes, mean age 15.6, 50.4% girls.',
    source: 'Donovan et al., 2020',
    doi: '10.1177/2325967119900962',
  },
  {
    id: 'distorsione-caviglia-giovani-atlete-3',
    article: 'distorsione-caviglia-giovani-atlete',
    claim:
      'Nello sport giovanile i programmi di prevenzione riducono gli infortuni di caviglia di circa il 26% (IRR 0,74; IC 95% 0,60-0,91); i programmi con risultati significativi combinavano rinforzo, agilità e approccio multicomponente in sessioni di 15-20 minuti due volte a settimana per 3-6 mesi, con aderenza sopra il 62%. Popolazione: 10 studi randomizzati su atleti di 13-19 anni, 4 dei quali su sole ragazze.',
    claimEn:
      'In youth sport, prevention programmes reduce ankle injuries by roughly 26% (IRR 0.74; 95% CI 0.60-0.91); the programmes with significant results combined strengthening, agility and a multicomponent approach in 15-20 minute sessions twice a week for 3-6 months, with adherence above 62%. Population: 10 randomised studies in athletes aged 13-19, 4 of them in girls only.',
    source: 'Berkey et al., 2024',
    doi: '10.1177/19417381241231588',
  },
  {
    id: 'mal-di-schiena-giovani-atlete-1',
    article: 'mal-di-schiena-giovani-atlete',
    claim:
      "Il mal di schiena è comune nello sport giovanile: la prevalenza stimata di lombalgia negli ultimi 12 mesi è del 42% (IC 95% 29-55%), quella negli ultimi 3 mesi del 46% e la prevalenza puntuale del 16%. ATTENZIONE: eterogeneità I² fino al 98%, perché non esiste una definizione condivisa di lombalgia negli atleti adolescenti. Popolazione: 80 studi, atleti di 10-19 anni di entrambi i sessi, 60 sport, 23 Paesi.",
    claimEn:
      'Low back pain is common in youth sport: estimated 12-month prevalence is 42% (95% CI 29-55%), 3-month prevalence 46% and point prevalence 16%. CAUTION: heterogeneity I² up to 98%, because no shared definition of low back pain in adolescent athletes exists. Population: 80 studies, athletes aged 10-19 of both sexes, 60 sports, 23 countries.',
    source: 'Wall et al., 2022',
    doi: '10.1136/bjsports-2021-104749',
  },
  {
    id: 'mal-di-schiena-giovani-atlete-2',
    article: 'mal-di-schiena-giovani-atlete',
    claim:
      "La causa del mal di schiena in un'adolescente che fa sport è diversa da quella di un adulto: confrontando 100 giovani atleti di 12-18 anni con 100 adulti di 21-77 anni, la spondilolisi spiegava il 47% dei casi negli adolescenti contro il 5% negli adulti, e il dolore da disco 11 casi contro 48. ATTENZIONE: studio del 1995, retrospettivo, su cliniche specialistiche — popolazione già selezionata, quindi il 47% NON è la probabilità che un mal di schiena adolescenziale sia una spondilolisi.",
    claimEn:
      'The cause of back pain in an adolescent who plays sport differs from an adult’s: comparing 100 young athletes aged 12-18 with 100 adults aged 21-77, spondylolysis explained 47% of cases in adolescents against 5% in adults, and disc pain 11 cases against 48. CAUTION: a 1995 retrospective study in specialist clinics — an already selected population, so 47% is NOT the probability that adolescent back pain is spondylolysis.',
    source: 'Micheli e Wood, 1995',
    doi: '10.1001/archpedi.1995.02170130017004',
  },
  {
    id: 'mal-di-schiena-giovani-atlete-3',
    article: 'mal-di-schiena-giovani-atlete',
    claim:
      'In una popolazione meno selezionata la quota resta alta: su 1.025 atleti adolescenti NON d\'élite arrivati in ambulatorio per lombalgia (età media 15 ± 1,8 anni), 308 — il 30% — avevano una spondilolisi. Gli autori avvertono esplicitamente di non generalizzare la classifica per sport ad altri contesti.',
    claimEn:
      'In a less selected population the share stays high: of 1,025 NON-elite adolescent athletes presenting to a clinic with low back pain (mean age 15 ± 1.8), 308 — 30% — had spondylolysis. The authors explicitly warn against generalising their sport-by-sport ranking to other settings.',
    source: 'Selhorst et al., 2019',
    doi: '10.1097/JSM.0000000000000546',
  },
  {
    id: 'dolore-spalla-giovani-atlete-1',
    article: 'dolore-spalla-giovani-atlete',
    claim:
      "Tra gli atleti adolescenti di sport overhead il problema di spalla è comune e persistente: su 471 giocatori di pallamano d'élite di 15-18 anni monitorati OGNI SETTIMANA per una stagione, il 23% ha riferito problemi di spalla sostanziali e il 43% di questi li ha avuti per almeno 3 settimane consecutive; la prevalenza settimanale era del 6%. La prevalenza era 1,46 volte più alta nelle RAGAZZE (IC 95% 1,04-2,06).",
    claimEn:
      'Among adolescent athletes in overhead sports, shoulder problems are common and persistent: of 471 elite handball players aged 15-18 monitored EVERY WEEK for one season, 23% reported substantial shoulder problems and 43% of those had them for at least 3 consecutive weeks; weekly prevalence was 6%. Prevalence was 1.46 times higher in GIRLS (95% CI 1.04-2.06).',
    source: 'Asker et al., 2018',
    doi: '10.1007/s00167-018-4857-y',
  },
  {
    id: 'dolore-spalla-giovani-atlete-2',
    article: 'dolore-spalla-giovani-atlete',
    claim:
      "Nel nuoto agonistico il tasso di dolore di spalla più alto si registra in adolescenza: 91,3% tra i 15 e i 17 anni, contro il 20,0% sotto i 15 anni e il 19,4% nei master, in coincidenza con il volume più alto della carriera fino a quel momento (17,27 ± 5,25 ore di vasca a settimana). ATTENZIONE: prevalenze AUTO-RIFERITE di «dolore», non diagnosi; associazione, non causa. Popolazione: revisione sistematica di 12 studi e 1.460 nuotatori di entrambi i sessi.",
    claimEn:
      'In competitive swimming the highest shoulder-pain rate is recorded in adolescence: 91.3% between 15 and 17, against 20.0% under 15 and 19.4% in masters, coinciding with the highest training volume of the career so far (17.27 ± 5.25 pool hours a week). CAUTION: SELF-REPORTED prevalences of «pain», not diagnoses; association, not cause. Population: systematic review of 12 studies and 1,460 swimmers of both sexes.',
    source: 'Feijen et al., 2020',
    doi: '10.4085/1062-6050-439-18',
  },
  {
    id: 'dolore-spalla-giovani-atlete-3',
    article: 'dolore-spalla-giovani-atlete',
    claim:
      'Il programma di prevenzione della spalla con più evidenza (OSTRC), svolto 3 volte a settimana dentro il riscaldamento per una stagione, ha ridotto del 28% il rischio di problemi di spalla (prevalenza 17% contro 23%; OR 0,72; IC 95% 0,52-0,98); sui problemi sostanziali la riduzione stimata era del 22% ma NON statisticamente significativa. ATTENZIONE: 45 squadre e 660 giocatori di pallamano ADULTI d\'élite — non è una stima per le atlete di 13-16 anni.',
    claimEn:
      'The shoulder prevention programme with the strongest evidence (OSTRC), performed 3 times a week inside the warm-up for one season, reduced the risk of shoulder problems by 28% (prevalence 17% vs 23%; OR 0.72; 95% CI 0.52-0.98); for substantial problems the estimated reduction was 22% but NOT statistically significant. CAUTION: 45 teams and 660 ADULT elite handball players — not an estimate for athletes aged 13-16.',
    source: 'Andersson et al., 2017',
    doi: '10.1136/bjsports-2016-096226',
  },
  {
    id: 'dolore-spalla-giovani-atlete-4',
    article: 'dolore-spalla-giovani-atlete',
    claim:
      "Nell'atleta ancora in crescita la spalla ha un punto debole anatomico: la cartilagine di accrescimento dell'omero prossimale fornisce circa l'80% della crescita in lunghezza dell'omero, si chiude tra i 18 e i 21 anni e finché è aperta è in gran parte cartilaginea, quindi meccanicamente più debole di legamenti e tendini circostanti. ATTENZIONE: fonte di riferimento CLINICO (StatPearls), non studio primario, e letteratura originale prevalentemente su baseball giovanile MASCHILE.",
    claimEn:
      'In a still-growing athlete the shoulder has an anatomical weak point: the proximal humeral growth plate provides roughly 80% of the humerus’s growth in length, closes between 18 and 21, and while open is largely cartilaginous, hence mechanically weaker than the surrounding ligaments and tendons. CAUTION: a CLINICAL reference text (StatPearls), not a primary study, with original literature mostly on MALE youth baseball.',
    source: 'Casadei e Kiel, StatPearls, 2023',
  },
  {
    id: 'ritorno-allo-sport-dopo-infortunio-1',
    article: 'ritorno-allo-sport-dopo-infortunio',
    claim:
      "Dopo la ricostruzione del legamento crociato anteriore l'81% torna a fare sport in qualche forma, il 65% al livello che aveva prima dell'infortunio e il 55% a livello competitivo. Popolazione: meta-analisi di 69 studi e 7.556 partecipanti, campione IN PREVALENZA ADULTO — non è una stima misurata sulle atlete adolescenti.",
    claimEn:
      'After anterior cruciate ligament reconstruction, 81% return to sport in some form, 65% to their preinjury level and 55% to competitive level. Population: meta-analysis of 69 studies and 7,556 participants, a MOSTLY ADULT sample — not an estimate measured in adolescent athletes.',
    source: 'Ardern et al., 2014',
    doi: '10.1136/bjsports-2013-093398',
  },
  {
    id: 'ritorno-allo-sport-dopo-infortunio-2',
    article: 'ritorno-allo-sport-dopo-infortunio',
    claim:
      'Il tasso di reinfortunio si riduceva del 51% per ogni mese di rientro rinviato fino al nono mese dopo la ricostruzione del crociato; oltre i 9 mesi non si osservava alcuna ulteriore riduzione del rischio. Chi tornava a sport di livello I aveva un tasso di reinfortunio 4,32 volte più alto (p = 0,048). Popolazione: coorte prospettica Delaware-Oslo, 106 pazienti operati praticanti sport di pivot, seguiti 2 anni.',
    claimEn:
      'The reinjury rate fell by 51% for each month return to sport was delayed up to nine months after ACL reconstruction; beyond nine months no further risk reduction was seen. Those returning to level I sports had a 4.32 times higher reinjury rate (P = .048). Population: Delaware-Oslo prospective cohort, 106 patients after reconstruction playing pivoting sports, followed for 2 years.',
    source: 'Grindem et al., 2016',
    doi: '10.1136/bjsports-2016-096031',
  },
  {
    id: 'ritorno-allo-sport-dopo-infortunio-3',
    article: 'ritorno-allo-sport-dopo-infortunio',
    claim:
      "Tra chi ha meno di 25 anni ed è tornata allo sport, il tasso di secondo infortunio al crociato è del 23% — quasi una su quattro. Il tasso complessivo della meta-analisi è del 15% (7% sullo stesso ginocchio, 8% sul controlaterale) e sale al 21% sotto i 25 anni. ATTENZIONE: campioni misti per sesso, età media al primo intervento 24,4 anni negli studi inclusi.",
    claimEn:
      'Among those under 25 who return to sport, the second ACL injury rate is 23% — nearly one in four. The overall rate in the meta-analysis is 15% (7% ipsilateral, 8% contralateral), rising to 21% under 25. CAUTION: mixed-sex samples, mean age at primary reconstruction 24.4 years across the included studies.',
    source: 'Wiggins et al., 2016',
    doi: '10.1177/0363546515621554',
  },
  {
    id: 'ritorno-allo-sport-dopo-infortunio-4',
    article: 'ritorno-allo-sport-dopo-infortunio',
    claim:
      'Il 29,5% degli atleti operati di crociato ha subito un secondo infortunio entro 24 mesi dal ritorno allo sport: 20,5% al ginocchio controlaterale e 9,0% sul ginocchio operato. Per le ragazze operate il tasso era 4,51 volte quello delle coetanee mai infortunate (IC 95% 1,5-18,2). Popolazione: 78 atleti di età media 17,1 anni e 47 controlli — campione piccolo, da leggere come ordine di grandezza.',
    claimEn:
      'Of athletes after ACL reconstruction, 29.5% sustained a second injury within 24 months of returning to sport: 20.5% to the contralateral knee and 9.0% to the reconstructed one. For the girls, the rate was 4.51 times that of never-injured female controls (95% CI 1.5-18.2). Population: 78 athletes with a mean age of 17.1 and 47 controls — a small sample, to be read as an order of magnitude.',
    source: 'Paterno et al., 2014',
    doi: '10.1177/0363546514530088',
  },
  {
    id: 'ritorno-allo-sport-dopo-infortunio-5',
    article: 'ritorno-allo-sport-dopo-infortunio',
    claim:
      "Tra gli atleti under 20 tornati allo sport dopo la ricostruzione del crociato, chi ha poi subito un secondo infortunio aveva a 12 mesi una prontezza psicologica significativamente più bassa (ACL-RSI 60,8 contro 71,5 punti; p = 0,02); nei pazienti più grandi la differenza non compariva. Popolazione: 329 pazienti tornati allo sport, 52 secondi infortuni. È un'associazione osservata in uno studio di coorte, non un test per decidere chi può giocare.",
    claimEn:
      'Among under-20 athletes who returned to sport after ACL reconstruction, those who went on to sustain a second injury had significantly lower psychological readiness at 12 months (ACL-RSI 60.8 vs 71.5 points; P = .02); in older patients no such difference appeared. Population: 329 patients who returned to sport, 52 second injuries. This is an association observed in a cohort study, not a test for deciding who can play.',
    source: 'McPherson et al., 2019',
    doi: '10.1177/0363546518825258',
  },
  {
    id: 'allenarsi-al-caldo-giovani-atlete-1',
    article: 'allenarsi-al-caldo-giovani-atlete',
    claim:
      "Nella sorveglianza sugli sport liceali statunitensi (2005-2011) l'87,7% dei colpi di calore da sforzo ha colpito ragazzi, ma togliendo il football americano — che da solo ha un tasso 11,4 volte quello di tutti gli altri sport combinati — la quota scende al 50,9%: il divario riflette l'esposizione allo sport a rischio più alto, non una differenza di sesso nella tolleranza al caldo.",
    claimEn:
      "In U.S. high school sports surveillance (2005-2011), 87.7% of exertional heat illness events involved boys, but excluding American football — which alone has a rate 11.4 times that of all other sports combined — the share drops to 50.9%: the gap reflects exposure to the highest-risk sport, not a sex difference in heat tolerance.",
    source: 'Kerr et al., 2013',
    doi: '10.1016/j.amepre.2012.09.058',
  },
  {
    id: 'allenarsi-al-caldo-giovani-atlete-2',
    article: 'allenarsi-al-caldo-giovani-atlete',
    claim:
      "Un colpo di calore da sforzo su tre (33,6%) nella sorveglianza sugli sport liceali statunitensi è avvenuto quando nessun professionista sanitario era presente sul campo — un vuoto organizzativo prima che medico.",
    claimEn:
      'One in three exertional heat illness events (33.6%) in U.S. high school sports surveillance occurred when no medical professional was on site — an organizational gap before it is a medical one.',
    source: 'Kerr et al., 2013',
    doi: '10.1016/j.amepre.2012.09.058',
  },
  {
    id: 'fiato-corto-giovani-atlete-1',
    article: 'fiato-corto-giovani-atlete',
    claim:
      "In un campione svedese di 2.309 adolescenti di 12-13 anni, il 14% riferisce episodi di respiro corto dopo attivit\u00e0 fisica intensa e il sesso femminile \u00e8 associato in modo indipendente a un rischio pi\u00f9 alto; il 61% di chi riferisce il sintomo non ha alcuna diagnosi di asma.",
    claimEn:
      'In a Swedish sample of 2,309 adolescents aged 12-13, 14% report attacks of breathlessness after strenuous physical activity and female sex is independently associated with higher risk; 61% of those reporting the symptom have no asthma diagnosis at all.',
    source: 'Johansson et al., 2014',
    doi: '10.1016/j.rmed.2014.03.010',
  },
  {
    id: 'fiato-corto-giovani-atlete-2',
    article: 'fiato-corto-giovani-atlete',
    claim:
      "Testando con prova da sforzo e laringoscopia continua una popolazione adolescente svedese (3.838 questionari, 146 testati), la prevalenza stimata \u00e8 del 19,2% per la broncocostrizione indotta da esercizio e del 5,7% per l'ostruzione laringea indotta da esercizio, che possono coesistere nella stessa persona; nel campione testato non emergono differenze significative fra ragazze e ragazzi.",
    claimEn:
      'Testing a Swedish adolescent population with exercise challenge and continuous laryngoscopy (3,838 questionnaires, 146 tested), estimated prevalence is 19.2% for exercise-induced bronchoconstriction and 5.7% for exercise-induced laryngeal obstruction, which can coexist in the same person; no significant differences between girls and boys emerged in the tested sample.',
    source: 'Johansson et al., 2015',
    doi: '10.1136/thoraxjnl-2014-205738',
  },
  {
    id: 'fiato-corto-giovani-atlete-3',
    article: 'fiato-corto-giovani-atlete',
    claim:
      "La diagnosi di broncocostrizione indotta da esercizio richiede un test oggettivo con un calo del FEV1 pari o superiore al 10% rispetto al basale: fuori dai casi con asma gi\u00e0 diagnosticata e sintomi tipici, la diagnosi clinica basata sui soli sintomi ha sensibilit\u00e0 e specificit\u00e0 basse.",
    claimEn:
      'Diagnosing exercise-induced bronchoconstriction requires objective testing with a fall in FEV1 of 10% or more from baseline: outside patients with established asthma and typical symptoms, a clinical diagnosis based on symptoms alone has low sensitivity and specificity.',
    source: 'Parsons et al., 2013; Goldin e Bruner, StatPearls, 2025',
    doi: '10.1164/rccm.201303-0437ST',
  },
];

/** Il numero di dati pubblicati: usato nei testi di pagina e nelle meta description. */
export const FACTS_COUNT = FACTS.length;

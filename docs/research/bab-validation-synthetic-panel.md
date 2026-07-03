# Validazione sintetica — panel atlete 13-14 (discovery interview)

> Panel di validazione **sintetica**: 5 atlete-persona simulate, ancorate ai dati della knowledge base ([../research_data/](../research_data/) — studio 1086 atlete, Armento 44%, coach-uomo 4%, gap educativo, modello check-in v1), fatte passare per una discovery interview sul concept BAB + sul check-in quotidiano. **Non sono ragazze reali**: sono simulazioni fondate sull'evidenza, utili a far emergere obiezioni, punti di abbandono e leve di fiducia *prima* di condurre la validazione sul campo con minori reali. Metodo: 5 agenti indipendenti (ciascuno cieco rispetto agli altri) per evitare convergenza artificiale.

**Data:** luglio 2026 · **Natura:** artefatto di ricerca prodotto, non validazione clinica né campo reale.

---

## Executive summary — cosa ne è uscito

Cinque voci indipendenti convergono su un punto solo, ed è il cuore del progetto: **le atlete mentono nel check-in se sospettano che il coach veda il loro dato singolo.** Tutte — comprese le due tranquille col ciclo — mettono "tutto sorridente, energia al massimo" e falsano stress e pressione al minimo dubbio sulla privacy. Poiché il valore di BAB (segnale aggregato al club + insight personale) si regge su check-in sinceri, e la sincerità si regge sulla privacy *creduta*, **la prova di anonimato non è UX: è validità del dato.**

Le altre convergenze: retention fortissima in settimana 1 poi crollo senza (a) notifica gentile e (b) un insight personale utile entro 7-14 giorni; l'"anonimato" dichiarato non è creduto — in una squadra di 15 il coach risale a chi sta male (problema reale di k-anonymity); il ciclo non è mai il volto del prodotto; il tono clinico ("monitoraggio", "report") respinge, la trasparenza *dimostrata* conquista.

---

## Il panel (5 persona indipendenti)

| # | Nome | Sport | Archetipo | Prob. attiva a 3 settimane |
|---|---|---|---|---|
| 1 | Giulia, 14 | calcio | agonista seria, ambiziosa, coach uomo | **bassa** (media se insight ≤7gg) |
| 2 | Sara, 13 | pallavolo | a rischio abbandono, pubertà, motivazione in calo | **bassa/media** |
| 3 | Nour, 13 | basket | diligente, **non ha ancora il ciclo**, imbarazzo alto | **media** |
| 4 | Aicha, 14 | calcio | scettica digitale, disinstalla app in 3 giorni | **bassa** |
| 5 | Emma, 14 | nuoto | early-adopter, ama grafici/streak, aspettative alte | **alta** (condizionata) |

---

## Findings convergenti (dove tutte dicono la stessa cosa)

### 1. Auto-censura sotto sospetto di sorveglianza — il rischio esistenziale
Tutte e 5 mentono su stress/pressione se sospettano che la società veda il singolo. Emma (la più fidata): *"proprio perché mi avete detto che vedono solo i dati di tutte insieme, allora dico la verità. È tutto lì il punto."* → Se non credono alla privacy, il dato aggregato è spazzatura e l'insight personale è falso. **Garbage in.**

### 2. Paradosso dell'anonimato in squadra piccola (Aicha)
*"Aggregato de che, siamo in quindici. Se tre segnano che stanno a terra il lunedì, il mister capisce chi sono."* Problema reale di k-anonymity. → **soppressione degli aggregati sotto soglia** (es. non mostrare nulla con <5-7 risposte).

### 3. La privacy va dimostrata, non giurata
Aicha: *"fammi vedere di preciso la schermata che vede il mister."* → schermo onboarding "Ecco *esattamente* cosa vede il club".

### 4. Retention: settimana 1 fortissima, poi crollo senza due leve
- **Notifica gentile** — una, delicata. Senza → si dimenticano. Troppe → disinstallano "il giorno due, per principio" (Aicha).
- **Insight personale entro 7-14 giorni** — *"il lunedì sei scarica", "dormi poco → giochi peggio", "certi giorni è il ciclo, non sei tu"*. Senza ritorno è "solo un diario" e lo mollano tutte.

### 5. Cold-start = trappola mortale (Emma)
*"Nei primi giorni non avete ancora dati miei per darmi insight — ed è lì che rischiate di perdermi."* → micro-contenuti/curiosità che danno valore prima che l'insight sui dati sia possibile.

### 6. Il ciclo non è mai il volto del prodotto
Mai primo schermo, sempre facoltativo. **"Non l'ho ancora avuto" come stato normale e previsto** (Nour: ribalta da "non fa per me" a "è pensato anche per me"). Persino chi non ha tabù (Aicha) non lo segna "in un database della società".

### 7. Tono e copy
- **Respinge:** "monitoraggio", "report", "il tuo allenatore potrà…"; l'adulto che finge di parlare teen; "come ti senti oggi :)" da solo.
- **Conquista:** "solo tu vedi i tuoi dati, il club mai il tuo singolo" + "ti aiutiamo a scoprire cose su di te che da sola non noteresti" + estetica "da gioco, non da dottore".
- **Streak sì, punti no** — i punti sono "roba da bambini"; la *storyline*/"guarda com'eri" prende tutte.
- **"Fase = stima, non certezza" costruisce fiducia** (Emma si fida di più, e nota che anche sua madre apprezzerebbe). Il "no AI training" detto in negazione *ritorce contro* (Aicha: "perché me lo specifichi? = qualcuno lo fa").

---

## Implicazioni di prodotto — backlog prioritizzato

**Ordine non negoziabile prima del field test sulle 20 atlete.** Un MVP "check-in only" misurerebbe un falso negativo: aderenza bassa + dati falsati dall'auto-censura.

### P0 — Prova di validità del dato (senza, i check-in sono bugie)
1. **Soglia di k-anonymity sulla dashboard club** — nessun aggregato mostrato sotto ~5-7 risposte; nessuna sotto-fetta che permetta di risalire al singolo.
2. **Schermo "Cosa vede il club"** nell'onboarding — mostra *esattamente* la vista coach, per dimostrare (non giurare) che il singolo non è visibile.
3. **Copy della privacy in positivo** — "i tuoi dati restano tuoi" invece di "non addestrano l'AI" (che insinua sospetto).

### P1 — Loop di ritorno (senza, retention crolla dopo settimana 1)
4. **Motore insight personale** — correlazioni leggibili su di sé ("il lunedì sei scarica", "dormi poco → giochi peggio"), primo insight utile entro 7-14 giorni.
5. **Normalizzazione** — "certi giorni è il ciclo, non sei tu": riconoscimento + non-colpa.
6. **Notifica gentile** — una al giorno, delicata, saltabile; mai a raffica.
7. **Cold-start content** — micro-contenuti/curiosità nei primi giorni per riempire il vuoto prima che ci siano dati sufficienti.
8. **Streak / storyline** — progressione e "guarda com'eri", non punti infantili.

### P2 — Ciclo e tono
9. **Ciclo facoltativo, mai primo schermo**; "non l'ho ancora avuto" come stato normale e previsto.
10. **Audit del linguaggio** — eliminare parole cliniche/di controllo; niente teen-speak posticcio; mantenere "la fase è una stima".

### Dopo → field test
11. **Diary test sulle 20 atlete** solo dopo P0+P1. Metriche: retention D3/D7/D21 + **tasso di "faccina media/tutto perfetto"** (termometro della sfiducia) + % "preferisco non dirlo" sul blocco ciclo.

**Testa di ponte:** Emma (early-adopter) è l'unica "alta", condizionata all'insight precoce. Costruire per lei per prima; le altre quattro seguono quando privacy provata + loop di ritorno sono in piedi.

---

## Transcript integrali

### 1 · Giulia, 14 — agonista seria (calcio)

**Settimana tipo / cosa stressa:** allenamenti mar/gio/ven + partita domenica; ama quando in partita riesce una cosa provata in allenamento; stressata quando gioca male e sente lo sguardo del mister, e dalle convocazioni. **Con chi parla:** con la migliore amica (Sofi) di tutto; col mister mai — "se dici che sei stanca pensa che non hai voglia". **Ciclo:** col mister "morirei" (uomo, età del padre); con le ragazze sì ma sottovoce; segnarlo in app ok se solo suo, ma "dipende chi lo vede". **Reazione a BAB:** faccine simpatiche, sembra veloce; *"il mister vede? Se vede questa non la apro proprio"* — capire bene l'anonimato è la cosa che conta. **Retention:** prima settimana sì, poi "me la dimentico… senza notifica di sicuro"; 3 settimane di fila "non ci credo". **Paure:** il mister al 100% (panchina se vede "poca energia"); mamma un po' (imbarazzo ciclo); il ciclo "non deve vederlo nessuno tranne me". **Cosa la tiene:** insight che collegano check-in e calcio ("dormi poco → giochi peggio", "in questo periodo sei più stanca ed è normale"); streak. **Mente:** sì, sulla pressione ("metto faccina più tranquilla, non voglio ammetterlo"); se dubita che il mister veda, mente su tutto; il ciclo no (o vero o non lo scrive).

*Segnali:* obiezione più forte = non crede che il mister non veda il singolo → falsifica; mollerebbe senza notifiche + senza ritorno; resterebbe con insight concreti + streak; respinta da "il tuo club può vedere…"; conquistata da "solo tu vedi il tuo dato + ti aiuta a giocare meglio"; D21 **bassa** (media con insight ≤7gg).

### 2 · Sara, 13 — a rischio abbandono (pallavolo)

**Settimana tipo / stress:** allenamenti mar/gio + partita domenica; ama lo stare insieme in spogliatoio; stressata quando l'allenatore urla (si blocca) e dall'ansia pre-partita; *"mi sento un po' impedita, prima saltavo meglio e adesso mi sento goffa… magari sono io"*. **Con chi parla:** poco; con l'amica Giulia via chat; con la mamma poco perché "si preoccupa troppo". **Ciclo:** "no no no", non se ne parla; app solo se è "solo mio"; *"certi giorni sto una schifezza e non so se è per quello"*. **Reazione BAB:** faccine carine, "sembra un gioco non un compito"; la parte educativa le serve ("nessuno mi ha spiegato niente, ho guardato TikTok"). **Retention:** "una settimana e mezza… se non mi arriva la notifica non me lo ricordo". **Paure:** l'allenatore (panchina se sa dell'ansia); la mamma (interrogatorio); le compagne (ridano del ciclo). **Cosa la tiene:** capire "è normale, è il ciclo, non sono scema io"; "storyline mia" nel tempo; estetica carina/colorata "non da dottore". **Mente:** sì, abbassa ansia/pressione per vergogna; se dubita mette "bene bene"; il ciclo lo salta o lo mette vero.

*Segnali:* obiezione = "come faccio a fidarmi che nessuno vede me me"; mollerebbe con troppe notifiche/sensazione di compito/zero ritorno; resterebbe con storyline + normalizzazione + estetica da gioco; respinta da linguaggio clinico/di controllo; conquistata da "dati solo tuoi" + "non sei tu, certi giorni è il ciclo"; D21 **bassa/media**.

### 3 · Nour, 13 — diligente, non ha ancora il ciclo (basket)

**Settimana tipo / stress:** 3 allenamenti + partita sabato; ama i passaggi che funzionano e le compagne; ansia pre-partita ("e se sbaglio, e se l'allenatore mi toglie") + carico scuola ("le cose le voglio fare bene"). **Con chi parla:** poco; con l'allenatore mai ("paura di sembrare quella che non ce la fa"); a casa non si parla di stress. **Ciclo:** *(imbarazzo)* non se ne parla mai; **lei non ce l'ha ancora** e si sente "indietro, come se ci fosse qualcosa che non va in me"; vorrebbe cambiare argomento. **Reazione BAB:** "non è tutto sul ciclo, ok"; le faccine umore/energia le farebbe tranquilla; **"non l'ho ancora avuto" come opzione → "mi fa strano in senso buono, come se fosse normale, previsto"**; se il ciclo fosse obbligatorio "chiudevo subito". **Retention:** prima settimana precisa; poi "senza notifica gentile salto"; 1-2 settimane forti. **Paure:** l'allenatore n.1; **i maschi della scuola** ("un'app da femmine sul ciclo… morirei, a scuola ti prendono in giro per meno"). **Cosa la tiene:** insight su di sé + contenuti che normalizzano "senza farmi sentire scema", in un posto privato "dove non devo chiedere a un adulto". **Mente:** abbassa pressione/stress; il ciclo lo salta o "preferisco non dirlo" — "è una cosa mia" anche se nessuno vede.

*Segnali:* obiezione = paura viscerale che allenatore/maschi risalgano al singolo → "aggregato" va dimostrato e ripetuto; mollerebbe senza notifica o se percepito come "app del ciclo" (vergogna sociale → disinstalla per l'icona); resterebbe con micro-insight + normalizzazione senza giudizio; respinta da inquadrarlo come "app sul/per il ciclo" o quella sezione centrale/obbligatoria; conquistata da "non l'ho ancora avuto" come stato normale + "solo tu vedi" + "facoltativo"; D21 **media**. **Nota chiave:** per chi non ha ancora il ciclo il rischio non è il ciclo, è essere "indietro" — l'opzione va trattata come stato previsto, non casella di ripiego.

### 4 · Aicha, 14 — scettica digitale (calcio)

**Settimana tipo / stress:** 3 allenamenti + partita; "il calcio è l'unica cosa che non mollo"; stressata dal mister che guarda male e dall'incastro con la scuola. **Con chi parla:** con 2-3 amiche; col mister no ("pensa che mi lamento, o mi mette in panchina"). **Ciclo:** con le amiche zero problemi, ci scherza; ma "in un database della società" no — *"con le amiche è una cosa, in un database è un'altra"*. **Reazione BAB:** faccine "fatte per noi non per i boomer"; **individua subito i due buchi:** (1) *"aggregato de che, siamo in quindici, il mister capisce chi sono"*; (2) *"'i dati non addestrano l'AI' — perché me lo specifichi? Vuol dire che qualcun altro lo fa"*. **Retention:** 3-4 giorni per novità, poi "nella cartella con le altre 50 app morte"; notifiche a raffica → disinstalla il giorno due "per principio". **Fiducia:** non crede alla parola "anonimo" scritta; *"fammi vedere di preciso la schermata del mister, così controllo che non ci sia il mio nome"*; dubita della cancellazione reale. **Cosa la tiene:** "qualcosa di mio, non della società" — insight utile entro 1-2 settimane; contenuti ciclo fatti bene, non "adulto che finge di parlare come noi". **Mente:** sì — "se lo vede la società metto la faccina media a tutto, mai che sono a pezzi, te la usano contro".

*Segnali:* obiezione = anonimato inesistente in squadra piccola → avvelena tutta la fiducia; disinstalla con notifiche insistenti + attrito senza ritorno immediato; resterebbe con un insight su di sé non banale (≤1-2 settimane); alza gli occhi al cielo per "non addestra l'AI" e per il teen-speak posticcio; conquistata da "guarda tu esattamente cosa vede il club" (trasparenza dimostrata); D21 **bassa**.

### 5 · Emma, 14 — early-adopter (nuoto)

**Settimana tipo / stress:** nuota 6/7 giorni, sveglie alle 5:30; ama abbassare i tempi e la sensazione post-allenamento; stressata da scuola+nuoto e dai giorni "lentissima, mi sento pesante e mi arrabbio con me stessa pensando di non essermi impegnata — magari era solo una giornata storta". **Con chi parla:** con la mamma tantissimo; con l'allenatore meno ("paura di non sembrare tosta"); con le amiche c'è competizione. **Ciclo:** tranquilla, ne parla con la mamma; con l'allenatore uomo mai; **vuole capire come la influenza** ("settimane in cui in acqua sono un macigno, mi chiedo se c'entra"). **Reazione BAB:** faccine simpatiche, veloce; convinta dal "club vede solo i dati di tutte, non i miei" (*"altrimenti col cavolo che scrivevo com'è che mi sento davvero"*); **domanda vera: "io cosa ci vedo? Se compilo e non mi mostrate niente di interessante, dopo 3 giorni ho mollato"**. **Retention:** tiene già un diario → naturale; "il problema non è iniziare, è continuare"; 2 settimane a occhi chiusi, poi dipende dal ritorno; se arriva l'insight "continuo per mesi, anni". **Motivazione:** streak "benzina pura" + grafici + imparare qualcosa su di sé. **Delusione temuta:** compilare e ricevere schermata vuota / "bravo continua così" → "mi sento presa in giro, come se lavorassi io per l'app". **Cold-start:** "all'inizio l'app non ha ancora niente da dirmi ed è lì che rischiate di perdermi — riempite il vuoto con micro-contenuti". **"Stima non certezza":** *"la me fantasiosa vorrebbe l'app magica; la me vera si fida molto di più così. Se mi promettete che indovina tutto e sbaglia, vi smaschero. La mamma apprezzerebbe, è sospettosa con le app"* — ma "stima" non diventi scusa per non dire niente. **Mente:** su un'app che vede solo lei no ("imbroglio me stessa, sballo i grafici"); se sospettasse il club "mentirei di brutto, tutto perfetto".

*Segnali:* entusiasma = dati propri come grafici + correlazioni + streak; mollerebbe se compila tanto e riceve poco (schermata vuota/frasi generiche); pretende una dashboard personale con andamenti e insight; conquistata da "ti aiutiamo a scoprire cose su di te che da sola non noteresti" + garanzia "il club non vede mai il singolo"; rischio da gestire = **cold-start** (perdere la più motivata proprio all'inizio); D21 **alta**, condizionata a un insight personale non banale entro 2 settimane.

---

## Limiti del metodo

Validazione **sintetica**, non campo reale: le persona sono simulazioni fondate sulla letteratura, utili a stress-testare il concept e a preparare le domande giuste — non sostituiscono le interviste con atlete reali. Rischio di convergenza da modello mitigato con 5 agenti indipendenti e archetipi divergenti, ma resta una simulazione. **Prossimo passo:** protocollo di validazione sul campo (consenso genitoriale + assenso, tramite club, diary test sulle 20 atlete) — vedi [bab-mvp-diario](../../.claude/projects) e la sezione backlog P2→field test qui sopra.

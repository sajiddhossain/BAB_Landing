# Engagement, Game Design e Retention — BAB Buddy

> **Documento di strategia di prodotto — Behavioral & Game Design**
> Versione 1.0 · Lingua: Italiano · Mercato: Italia-first · Target: atlete adolescenti 13–18

---

## Perché questo documento

> **In una riga:** spiega come trasformare il "logging quotidiano del proprio stato" — un'attività noiosa, clinica e percepita come sorveglianza — in un gesto di **cura affettiva di 30–60 secondi** che l'atleta *vuole* fare, senza usare le leve di dipendenza che rendono tossici TikTok, Instagram o i giochi free-to-play.
>
> BAB compete per l'attenzione di un'adolescente con un *attention span* di pochi secondi e un avversario fortissimo (i social a ricompensa variabile infinita). Non possiamo e non vogliamo vincere quella guerra con le stesse armi. Questo documento definisce **un sistema di engagement etico**: abbastanza coinvolgente da creare un'abitudine sana e quotidiana, ma con freni espliciti contro FOMO tossica, dark pattern, ansia da streak e dipendenza — perché il nostro utente è una **minore**, e la nostra responsabilità verso di lei viene prima di qualsiasi metrica.
>
> Il documento serve a: (a) product designer e sviluppatori che costruiscono il loop del Buddy; (b) chi scrive i contenuti delle notifiche e dell'onboarding; (c) chi definisce le metriche; (d) chiunque debba dire "no" a una richiesta di business che spingerebbe verso un dark pattern.

---

## Indice

1. [Filosofia di engagement](#1-filosofia-di-engagement)
2. [Il loop di cura del Buddy come sistema (mappato su Hooked)](#2-il-loop-di-cura-del-buddy-come-sistema)
3. [Catalogo delle micro-meccaniche da 5–10 secondi](#3-catalogo-delle-micro-meccaniche-da-510-secondi)
4. [Sistema di progressione: evoluzione, streak, badge, livelli](#4-sistema-di-progressione)
5. [Notifiche e re-engagement etici](#5-notifiche-e-re-engagement-etici)
6. [Onboarding del primo minuto (time-to-fun)](#6-onboarding-del-primo-minuto)
7. [Retention: curve, abbandono, contromisure, metriche](#7-retention-curve-abbandono-contromisure-metriche)
8. [Gamification etica per minori: principi, divieti, checklist](#8-gamification-etica-per-minori)
9. [Accessibilità ed esperienza mobile](#9-accessibilità-ed-esperienza-mobile)
10. [Fonti](#10-fonti)
- [Appendice A — Roadmap di introduzione delle meccaniche](#appendice-a--roadmap-di-introduzione-delle-meccaniche)
- [Appendice B — Glossario](#appendice-b--glossario)
- [Appendice C — Riepilogo dei principi non-negoziabili](#appendice-c--riepilogo-dei-principi-non-negoziabili)

---

## 1. Filosofia di engagement

### 1.1 Il problema che stiamo davvero risolvendo

Il bisogno clinico è semplice: vogliamo che un'atleta adolescente registri ogni giorno il proprio stato (idratazione, energia, umore, livello di stress/calma). Questo dato, aggregato nel tempo, è ciò che permette a BAB di accorgersi di un calo, di un segnale di sovrallenamento, di un possibile RED-S, di un disagio emotivo. È letteralmente il sensore del benessere.

Il problema è che **chiedere questo dato come si fa di solito non funziona con un'adolescente**:

- Un **questionario** ("Da 1 a 10, quanto ti senti stanca oggi?") è percepito come un compito scolastico o, peggio, come un test clinico. La compliance crolla dopo 3–4 giorni.
- Una **app di tracking medicale** la fa sentire un paziente, non un'atleta.
- Qualsiasi cosa che assomigli a **sorveglianza** ("il coach saprà come ti senti") attiva una resistenza immediata: l'adolescente sotto-riporta, mente, o smette.

E c'è un avversario costante: **TikTok e i social a ricompensa variabile infinita**. Non competiamo per "più tempo dell'app rivale"; competiamo per *un singolo, breve, volontario gesto al giorno*. Questo cambia tutto: non ci serve trattenere l'attenzione per minuti, ci serve meritarci 60 secondi e poi *lasciarla andare* — l'opposto del design estrattivo dei social.

La nostra intuizione di prodotto è ribaltare la transazione: **invece di chiederle un dato, le diamo qualcuno di cui prendersi cura.** Il dato emerge come *effetto collaterale dell'affetto*.

### 1.2 Perché un gioco di cura e non un quiz

Il BAB Buddy è un compagno in stile Tamagotchi che parte "giù" e che l'atleta tiene su con micro-task tattili. La scelta del genere *care/nurture* non è estetica, è strategica:

| Dimensione | Quiz / Form | Gioco di cura (Buddy) |
|---|---|---|
| **Soggetto dell'azione** | "Parla di te" (esposizione) | "Aiuta lui" (proiezione, schermo emotivo) |
| **Carico cognitivo** | Alto: devo introspezionare e dare un numero | Basso: tocco, tengo premuto, soffio |
| **Tono emotivo** | Clinico, valutativo | Caldo, giocoso, accudente |
| **Chi "sbaglia"** | Io, se sto male | Nessuno: il Buddy ha bisogni, non giudizi |
| **Tempo richiesto** | 2–5 min percepiti lunghi | 30–60 s percepiti brevi |
| **Dato catturato** | Esplicito e auto-riferito | Implicito, derivato dai gesti |

Il genere di cura abilita un meccanismo psicologico chiave: la **proiezione**. È molto più facile, e meno minaccioso, per un'adolescente dire "il Buddy è giù di umore oggi, gli faccio una coccola" che dire "io sono triste". Il Buddy diventa uno **schermo proiettivo** su cui può loggare il proprio stato in terza persona. Questo riduce la desiderabilità sociale (la tendenza a riportare ciò che ci si aspetta) e aumenta l'onestà del dato.

### 1.3 Il principio non-negoziabile: il valore deve essere reale *per l'atleta*

Questa è la differenza tra engagement etico ed *engagement estrattivo*. In un'app estrattiva, il valore va all'azienda (tempo-schermo, dati da rivendere, ad impression) e all'utente resta solo il rinforzo dopaminergico. La letteratura sul Hook Model è esplicita: il modello può creare prodotti che generano abitudini *positive* o abitudini *dannose*, e la differenza dipende dall'allineamento tra l'interesse del creatore e il benessere reale dell'utente (Nir Eyal introduce per questo il "Manipulation Matrix").

Per BAB, il valore reale per l'atleta deve essere tangibile e immediato, non solo "i tuoi dati aiuteranno il coach":

1. **Auto-consapevolezza:** il loop la costringe, dolcemente, a un check-in interno quotidiano ("come sto davvero?"). È mindfulness mascherata da gioco.
2. **Micro-regolazione:** alcune micro-meccaniche *sono di per sé* interventi di benessere (es. il respiro guidato per la calma abbassa realmente l'attivazione).
3. **Specchio nel tempo:** vede il proprio andamento ("questa settimana il Buddy è stato spesso stanco" = "questa settimana ti sei spinta tanto").
4. **Privacy come regalo:** il finale rivela che coach e genitori vedono **solo 🟢🟡🔴**, mai i dettagli. Questo è un atto di rispetto che costruisce fiducia e diventa esso stesso una ragione per usare l'app.

> **Regola d'oro:** se un giorno togliessimo tutte le ricompense di gioco (badge, streak, festa), l'atleta dovrebbe comunque avere un motivo per aprire l'app. Se la risposta è "no", stiamo costruendo dipendenza, non valore.

### 1.5 La "Manipulation Matrix" applicata a BAB

Nir Eyal propone una matrice a quattro quadranti per testare l'eticità di un prodotto che crea abitudini, incrociando due domande: *"Userei io stesso questo prodotto?"* (il creatore migliora materialmente la vita dell'utente?) e *"Migliora davvero la vita dell'utente?"*.

| | Migliora la vita dell'utente | Non la migliora |
|---|---|---|
| **Lo userei io stesso** | **Facilitatore** (etico) | **Intrattenitore** (neutro/effimero) |
| **Non lo userei io stesso** | **Spacciatore di abitudini** (rischioso) | **Sfruttatore** (non etico) |

BAB deve stare *fermamente* nel quadrante **Facilitatore**: costruiamo qualcosa che vorremmo usasse una sorella, una figlia, noi stesse da adolescenti — e che migliora materialmente il benessere. Ogni volta che una scelta di design ci sposterebbe verso "spacciatore" (creo abitudine ma non sono sicura che le faccia bene) o "sfruttatore", è un segnale di stop. Questa matrice è il test filosofico che precede la checklist operativa del §8.3.

### 1.6 Tre tensioni di design da governare

Tutto il documento nasce dal tentativo di tenere in equilibrio tre tensioni strutturali. Renderle esplicite aiuta a prendere decisioni coerenti quando si presentano casi nuovi.

1. **Coinvolgente ma non compulsivo.** Vogliamo abbastanza attrazione da formare un'abitudine, non così tanta da generare craving. *Bilanciamo verso:* sessione breve, ricompensa cosmetica, streak morbido.
2. **Privato ma utile alla rete di cura.** Il dato deve servire a coach/genitori per proteggere l'atleta, ma senza esporla. *Bilanciamo verso:* segnale 🟢🟡🔴 in uscita, dettaglio che resta solo suo.
3. **Affettivo ma onesto.** Il legame col Buddy è una leva potente; non deve mai diventare ricatto emotivo. *Bilanciamo verso:* il Buddy invita, non implora; ha bisogni, non sensi di colpa.

### 1.4 Cosa NON siamo

- **Non** siamo un gioco che vuole massimizzare il tempo-schermo. La sessione ideale dura **30–60 secondi**. Una sessione che dura 20 minuti è un *fallimento*, non un successo.
- **Non** usiamo ricompense variabili per creare craving compulsivo. Le usiamo per togliere noia a un'azione utile.
- **Non** mettiamo l'atleta in competizione con altre atlete sul proprio stato di salute (no leaderboard sul benessere).

---

## 2. Il loop di cura del Buddy come sistema

### 2.1 Il loop in cinque fasi

Il cuore del prodotto è un loop chiuso che traduce uno *stato interno* in un *gesto* e poi in un *dato*:

```
   ┌──────────────────────────────────────────────────────────┐
   │                                                          │
   │   [1] BISOGNO ──► [2] MICRO-AZIONE ──► [3] FEEDBACK      │
   │   il Buddy ha      gesto tattile        immediato,        │
   │   un indicatore    da 5–10 s            sensoriale         │
   │   "giù"                                                    │
   │        ▲                                     │             │
   │        │                                     ▼             │
   │   [5] ABITUDINE ◄──────────── [4] RICOMPENSA              │
   │   "torna domani"              festa + progressione        │
   │   (investimento)              (variabile, contenuta)      │
   │                                                          │
   └──────────────────────────────────────────────────────────┘
```

1. **Bisogno** — All'apertura, il Buddy è "giù": uno o più indicatori (idratazione, energia, umore, calma) sono bassi. Questo è il **prompt visivo** che innesca l'azione. È empatico, non allarmante: il Buddy fa un faccino stanco, non piange disperato.
2. **Micro-azione** — L'atleta esegue un gesto tattile breve (tieni premuto = "bevi"; tap veloce = "energia"; carezza = "umore"; respiro guidato = "calma").
3. **Feedback** — Risposta sensoriale immediata: l'indicatore si riempie, il Buddy reagisce (sorride, fa un suono, cambia colore), micro-vibrazione (haptics).
4. **Ricompensa** — Al completamento: piccola "festa" (coriandoli, suono, frase del Buddy). La ricompensa è **leggermente variabile** (vedi §2.3) ma *contenuta*.
5. **Abitudine / Investimento** — Lo streak ("Giorno 1, torna domani"), la personalizzazione progressiva del Buddy e la storia accumulata creano un *investimento* che rende più probabile il ritorno l'indomani.

### 2.2 Mappatura sul Hook Model (Nir Eyal)

Il Hook Model descrive quattro fasi — **Trigger → Azione → Ricompensa Variabile → Investimento** — che, ripetute, trasformano un comportamento in abitudine. Ecco come BAB Buddy le implementa **in chiave etica** (cioè frenando deliberatamente ciò che renderebbe il loop compulsivo).

| Fase Hooked | Cosa dice il modello | Implementazione BAB Buddy | Freno etico applicato |
|---|---|---|---|
| **Trigger esterno** | Notifica/icona che riporta dentro | Una sola notifica gentile al giorno, a orario scelto dall'atleta | Mai più di 1/giorno di default; nessuna notifica di "guilt" |
| **Trigger interno** | Emozione/routine associata al prodotto | "Dopo l'allenamento controllo il mio Buddy"; l'app si associa al momento di defaticamento | Promuoviamo un *internal trigger sano* (routine post-sport), non l'ansia |
| **Azione** | Comportamento più semplice possibile in vista della ricompensa (B=MAP di Fogg: motivazione, abilità, prompt) | Gesti da 5–10 s, una mano, zero testo da digitare | Sotto i 60 s totali; l'azione è *facile* per design, non per trucco |
| **Ricompensa variabile** | Incentivo imprevedibile → dopamina dell'attesa | Festa con elementi che variano (frase del Buddy, micro-animazione, accessorio occasionale) | Variabilità **bassa e prevedibile nel risultato**: completi sempre = vinci sempre. Nessuna ricompensa "a perdere" stile slot machine |
| **Investimento** | L'utente mette dentro tempo/dati → torna | Buddy che cresce/si personalizza; storico del proprio andamento; streak | Lo streak è "morbido" (vedi §4.3): perderlo non azzera nulla |

> **Il punto critico — la ricompensa variabile.** La ricerca è chiara: gli schedule di rinforzo variabile (come le slot machine) creano l'engagement più forte *e più compulsivo*, perché la dopamina risponde all'**imprevedibilità**, non al premio in sé. Questo è esattamente il meccanismo che vogliamo **dosare con estrema cautela**. Per BAB:
> - **L'esito utile è sempre garantito:** se ti prendi cura del Buddy, lo riempi. Sempre. Nessuna casualità sull'obiettivo di salute.
> - **Varia solo l'"involucro":** *quale* frase carina ti dice il Buddy, *quale* micro-coriandolo, *se oggi* sblocchi un cappellino. Mai *se* hai successo.
> - **Nessuna "perdita variabile":** non esistono ricompense che a volte arrivano e a volte no in modo frustrante. La frustrazione casuale è la leva delle loot box, ed è vietata (§8).

### 2.3 Variabilità "buona" vs variabilità "tossica"

| | Variabilità BUONA (usiamo) | Variabilità TOSSICA (vietata) |
|---|---|---|
| Cosa varia | Il *contorno* (frase, animazione, accessorio raro) | Il *raggiungimento dell'obiettivo* |
| Effetto | Sorpresa lieve, freschezza, anti-noia | Craving, "ancora un tentativo", ansia |
| Esempio sì | "Oggi il Buddy ti dice una frase diversa" | — |
| Esempio no | — | "Hai il 30% di sblocco accessorio: ritenta domani" |
| Controllo utente | L'atleta sa che completando vince | L'app decide a sorpresa se ti premia |

---

### 2.4 Le basi di scienza comportamentale del loop

Ogni fase del loop poggia su decenni di ricerca comportamentale. Conoscerle aiuta a capire *perché* le scelte di design funzionano — e dove sta il confine etico.

| Principio | Origine | Come lo usiamo | Dove sta il limite etico |
|---|---|---|---|
| **B = MAP** (comportamento = Motivazione × Abilità × Prompt) | BJ Fogg | Rendiamo l'azione facilissima (alta Abilità) così serve poca Motivazione | Non gonfiamo la motivazione con paura/FOMO |
| **Rinforzo variabile** | Skinner | Variabilità cosmetica per togliere noia | Niente rinforzo "a perdere" (slot machine) |
| **Dopamina dell'attesa** | Schultz | L'anticipazione della "festa" rende piacevole tornare | Non costruiamo craving; l'esito è prevedibile |
| **Habit formation lenta** | Lally | Micro-azioni ripetute che si consolidano in routine | Tempi naturali, niente forzature |
| **Loss aversion** | Kahneman & Tversky | Lo streak dà valore alla costanza | Streak morbido: la perdita non è punitiva |
| **Endowment / IKEA effect** | Thaler et al. | Personalizzare il Buddy lo rende "mio" → investimento | L'ownership non si monetizza mai |

> Il filo conduttore: usiamo questi principi per **abbassare la frizione di un'azione che fa bene**, mai per **alzare la compulsione verso un'azione che fa male o è neutra**. È esattamente la linea che separa il "Facilitatore" dallo "Sfruttatore" della Manipulation Matrix (§1.5).

---

## 3. Catalogo delle micro-meccaniche da 5–10 secondi

Ogni micro-meccanica è una coppia **gesto ⇄ dato**. Il gesto deve essere: (a) eseguibile con una mano, (b) sotto i 10 secondi, (c) sensorialmente soddisfacente, (d) tematicamente coerente col bisogno. Il dato catturato è **sempre privato** e **derivato**, mai mostrato come "punteggio clinico" all'atleta.

### 3.1 Le quattro meccaniche esistenti (da raffinare)

#### M1 — Bevi (idratazione) · *tieni premuto*
- **Scopo:** loggare percezione di idratazione e creare il gesto-ancora dell'app.
- **Gesto:** tieni premuto sul Buddy/borraccia per ~3–5 s; un riempimento liquido segue il dito.
- **Feedback:** suono di sorso, l'indicatore "goccia" sale, il Buddy fa "ahh".
- **Dato (privato):** idratazione auto-percepita (basso/medio/alto in base a quanto risponde lei stessa rispetto al prompt) + timestamp + frequenza nel giorno.
- **Do/Don't:** *Do* un riempimento fluido e fisico. *Don't* chiedere "quanti ml hai bevuto?" (è un quiz).

#### M2 — Energia · *tap veloce*
- **Scopo:** loggare energia/vitalità percepita.
- **Gesto:** tap rapidi ritmici per ~5 s per "ricaricare" il Buddy; una barra di carica si riempie.
- **Feedback:** scintille, accelerazione del battito visivo, il Buddy si "sveglia".
- **Dato (privato):** livello di energia percepito; *opzionalmente* il ritmo/vigore del tapping come segnale soft (mai diagnostico).
- **Do/Don't:** *Do* premiare anche un tapping lento (nessuno "perde"). *Don't* trasformarlo in un test di reazione competitivo.

#### M3 — Umore · *coccola / carezza*
- **Scopo:** loggare l'umore senza chiederlo direttamente.
- **Gesto:** carezza/strofinio sul Buddy per ~5 s.
- **Feedback:** il Buddy fa le fusa/sorride, cuoricini, haptics morbidi.
- **Dato (privato):** valenza dell'umore. **Variante chiave:** dopo la coccola, il Buddy può chiedere *in modo opzionale e proiettivo* "Come ci sentiamo oggi?" con 3–4 faccine tappabili (non una scala 1–10). Saltabile sempre.
- **Do/Don't:** *Do* rendere l'auto-report dell'umore facoltativo e in terza persona. *Don't* bloccare la progressione se non lo compila.

#### M4 — Calma · *respiro guidato*
- **Scopo:** loggare stress/attivazione *e* fornire un intervento reale.
- **Gesto:** segui un cerchio che si espande/contrae respirando (inspira 4 / espira 6) per ~15–20 s — l'unica meccanica volutamente più lunga, perché *è* il beneficio.
- **Feedback:** il Buddy si calma in sincrono, colori che si raffreddano, vibrazione lenta.
- **Dato (privato):** livello di calma/stress percepito; completamento della pratica.
- **Do/Don't:** *Do* lasciarla interrompere quando vuole senza penalità. *Don't* gamificare il respiro con punteggi di "perfezione" (creerebbe ansia da prestazione sul rilassamento).

### 3.2 Nuove micro-meccaniche proposte

> Tutte da introdurre **gradualmente** (non al day-1) e tutte **facoltative**. Più meccaniche = più ricchezza, ma anche più carico: tenerle modulari.

| # | Nome | Bisogno | Gesto (5–10 s) | Feedback | Dato privato catturato |
|---|---|---|---|---|---|
| M5 | **Stretch / Defatica** | Recupero muscolare | Trascina il Buddy in un allungamento (drag lento) | Il Buddy si stira, "crack" soddisfacente | Percezione di affaticamento muscolare / DOMS |
| M6 | **Buonanotte** | Sonno | Tap per "spegnere la luce" la sera; il Buddy si addormenta | Dissolvenza, suono notturno, stelline | Ora del check-in serale + sonno auto-percepito |
| M7 | **Nutri** | Alimentazione (delicatissimo) | Offri uno snack tappabile tra opzioni neutre e positive | Il Buddy mangia contento | Segnale soft "mi sono nutrita oggi" — **mai conteggio calorie** |
| M8 | **Pioggia di pensieri** | Sfogo emotivo | Scrivi *una* parola/emoji su come va (max 1 tap o 1 parola) | Il pensiero diventa una nuvoletta che il Buddy abbraccia | Tag emotivo libero, privatissimo |
| M9 | **Scalda i muscoli** | Pre-gara / attivazione | Strofina veloce per "scaldare" il Buddy prima dell'allenamento | Bagliore caldo, il Buddy fa stretching | Contesto: giorno di gara/allenamento |
| M10 | **Soleggia** | Esposizione/umore stagionale | Inclina il telefono per dare "sole" al Buddy (gyro) | Il Buddy si crogiola | Segnale leggero di routine/outdoor |

#### Approfondimento sui due più sensibili

**M7 — Nutri (alimentazione).** Con atlete adolescenti, l'alimentazione è il tema più a rischio (disturbi alimentari, RED-S). Regole ferree: **mai** numeri, calorie, "giusto/sbagliato", body talk. La meccanica registra solo un segnale binario e gentile ("oggi mi sono presa cura del nutrirmi"), e qualunque tendenza preoccupante viene gestita dalla logica clinica di BAB tramite il segnale 🟡🔴 al supporto, **non** rinfacciata all'atleta dal gioco.

**M8 — Pioggia di pensieri (sfogo).** Un solo tocco o una sola parola: deve restare sotto i 10 secondi e non diventare un diario obbligato. È la valvola per chi *vuole* dire di più, mai un campo da riempire.

### 3.3 Regole trasversali del catalogo

- **Mai più di 3–4 meccaniche per sessione.** Il Buddy non chiede tutto ogni giorno: ruota i bisogni per tenere la sessione sotto i 60 s ed evitare la fatica (e per non rendere il logging un lavoro).
- **Tutto è skippabile.** Saltare un bisogno non "fa stare male" il Buddy in modo colpevolizzante; semplicemente resta a metà, senza dramma.
- **Il gesto deve corrispondere fisicamente al significato.** Premere a lungo = bere; soffiare/respirare = calmarsi; accarezzare = affetto. La coerenza embodied riduce il carico cognitivo a quasi zero.

---

### 3.4 Scenario concreto: una sessione tipo (45 secondi)

Per rendere tangibile il loop, ecco una sessione reale di "Giulia", 15 anni, pallavolista, che apre l'app la sera dopo l'allenamento.

| t | Schermo | Gesto di Giulia | Reazione del Buddy | Dato (privato) loggato |
|---|---|---|---|---|
| 0s | Apre l'app. Il Buddy è un po' spento, indicatore acqua e umore bassi | — | "Ehilà! Giornata tosta? Diamoci una mano" | Apertura serale registrata |
| 3s | Prompt "bevi" | Tiene premuto 4 s | Beve, fa "ahh", goccia sale | Idratazione percepita: media |
| 10s | Prompt "energia" | Tap veloci, ma stanchi/lenti | Si ricarica a metà | Energia percepita: bassa |
| 20s | Coccola | Accarezza, poi tocca la faccina "così così" | Fa le fusa, si rasserena | Umore: neutro-basso |
| 30s | Respiro | Segue il cerchio per 15 s | Si calma in sincrono | Calma praticata + stress percepito medio |
| 45s | Festa | — | Coriandoli, "Grazie! A domani 🌙", +1 giorno | Streak aggiornato, sessione chiusa |

**Cosa è successo dietro le quinte:** in 45 secondi e senza un solo questionario, BAB ha registrato che Giulia stasera ha energia bassa, umore sotto la media e stress medio dopo un allenamento intenso. Se questo pattern si ripete per più giorni, la logica clinica può alzare il segnale verso 🟡 — *senza mai dire al coach "Giulia è giù di morale"*, solo "vale la pena di un occhio di riguardo". Giulia, dal canto suo, ha fatto 15 secondi di respirazione che le hanno davvero abbassato l'attivazione prima di dormire: **il valore per lei è arrivato dentro la sessione, non solo a valle.**

### 3.5 Tabella riassuntiva gesto ⇄ dato

| Meccanica | Bisogno | Gesto | Durata | Canale del dato |
|---|---|---|---|---|
| M1 Bevi | Idratazione | Tieni premuto | 3–5 s | Idratazione percepita |
| M2 Energia | Vitalità | Tap veloce | ~5 s | Energia percepita |
| M3 Umore | Affetto/umore | Carezza (+ faccina opz.) | ~5 s | Valenza umore |
| M4 Calma | Stress | Respiro guidato | 15–20 s | Calma/stress + pratica |
| M5 Stretch | Recupero | Drag lento | ~7 s | Affaticamento muscolare |
| M6 Buonanotte | Sonno | Tap "spegni luce" | ~3 s | Check-in serale + sonno |
| M7 Nutri | Nutrizione | Tap su snack | ~5 s | Segnale binario gentile |
| M8 Pensieri | Sfogo | 1 parola/emoji | <10 s | Tag emotivo libero |
| M9 Scalda | Pre-gara | Strofina veloce | ~7 s | Contesto gara/allenamento |
| M10 Soleggia | Outdoor/umore | Inclina (gyro) | ~5 s | Routine/esposizione |

---

## 4. Sistema di progressione

La progressione dà un *senso di crescita* e alimenta la fase di **Investimento** del loop. Il rischio è che diventi una macchina d'ansia (streak da difendere, badge da completare). Il design qui è tutto un esercizio di **bilanciamento**: motivare senza intrappolare.

### 4.1 Evoluzione del Buddy (la ricompensa di investimento principale)

Il Buddy **cresce e si trasforma** in funzione della *costanza della cura*, non della performance sportiva e non dello stato di salute (un Buddy "stanco" non è un Buddy "peggiore").

- **Stadi evolutivi:** es. cucciolo → giovane → forma piena → forme stagionali/speciali. Sblocchi legati a *giorni di cura accumulati*, non a streak ininterrotti (così una pausa non azzera la crescita).
- **Personalizzazione:** accessori, colori, ambienti sbloccabili. Questo è investimento puro: più personalizzo, più è *mio*, più torno.
- **Bilanciamento:** la crescita deve essere **percepibile presto** (un primo cambiamento visibile entro 2–3 giorni) ma **non esauribile in fretta** (mesi di contenuti). Curva logaritmica: tanti micro-sblocchi all'inizio, poi più radi e speciali.

### 4.2 Badge / obiettivi

- Badge legati a **comportamenti sani e a sé stessi**, non a confronti: "Hai respirato con calma 5 volte", "Una settimana di check-in serali", "Hai dato voce a un pensiero".
- **Niente badge di completismo ansiogeno** ("collezionali tutti!"). I badge celebrano, non obbligano.
- Badge **a sorpresa** (variabilità buona): ogni tanto ne arriva uno inatteso. Mai badge che *mancano* in modo evidente per indurre senso di vuoto.

### 4.3 Streak / serie — la zona più delicata

Lo streak è potentissimo (sfrutta l'**anticipazione** e la **loss aversion**: più è lungo, più fa male perderlo) ed è proprio per questo che con i minori va **disinnescato il lato tossico**. Adottiamo il modello dello "streak gentile / hot streak senza vergogna":

**Do (streak etico):**
- **Streak "morbido":** una pausa **non azzera**. Si "congela" o si recupera con un *grace day* automatico nel weekend o dopo un giorno saltato.
- **Encomio, non ricatto:** "Bentornata! Riprendiamo da dove eravamo" invece di "Hai perso 27 giorni di streak 💔".
- **Tetto basso e celebrazioni periodiche:** festeggia traguardi (3, 7, 14 giorni) ma non spingere verso streak infiniti che diventano un peso.
- **Streak come specchio, non come gabbia:** serve a far notare la costanza, non a tenere in ostaggio.

**Don't (streak tossico — vietato):**
- ❌ Azzeramento brutale a un giorno saltato.
- ❌ Notifiche di colpevolizzazione ("Il tuo Buddy è triste perché non sei tornata 😢").
- ❌ Countdown ansiogeni ("Ti restano 2 ore per salvare lo streak!").
- ❌ Streak pubblici/condivisi che creino pressione sociale.

### 4.4 Livelli e "valuta"

- Eventuale livello/XP del Buddy: puramente cosmetico-affettivo, **mai** convertibile in vantaggi che creino dipendenza o spinte all'acquisto.
- **Nessuna valuta premium, nessun acquisto in-app per minori**, nessuna meccanica pay-to-progress. (Vedi §8.)

### 4.5 Tabella di bilanciamento riassuntiva

| Elemento | Funzione (Hooked) | Forza motivazionale | Rischio | Freno |
|---|---|---|---|---|
| Evoluzione Buddy | Investimento | Alta | Basso | Crescita su giorni totali, non streak |
| Personalizzazione | Investimento | Alta | Basso | Tutto gratis, niente acquisti |
| Badge | Ricompensa variabile | Media | Medio (completismo) | No "colleziona tutti", badge celebrativi |
| Streak | Ricompensa + loss aversion | Molto alta | **Alto** | Streak morbido, grace day, no shaming |
| Festa di completamento | Ricompensa | Media | Basso | Variabilità solo cosmetica |

---

### 4.6 Do / Don't della progressione

**Do:**
- ✅ Legare la crescita ai **giorni totali di cura**, così una pausa non distrugge mesi di affetto.
- ✅ Mostrare un **primo cambiamento entro 2–3 giorni** (prova che la cura "funziona").
- ✅ Badge che **celebrano comportamenti sani** e auto-riferiti.
- ✅ Sblocchi **a sorpresa** ogni tanto (variabilità buona, contorno cosmetico).

**Don't:**
- ❌ Azzerare l'evoluzione o lo streak per un giorno saltato.
- ❌ Mostrare "X premi che ti sei persa" per indurre senso di vuoto.
- ❌ Badge con logica "collezionali tutti" che genera ansia da completismo.
- ❌ Qualsiasi livello/valuta convertibile in vantaggi o acquisti.

### 4.7 Esempio di curva di sblocco (illustrativa)

| Giorno cumulativo di cura | Sblocco | Tipo |
|---|---|---|
| 1 | Nome + primo accessorio in regalo | Ownership iniziale |
| 2–3 | Primo cambiamento di forma visibile | Prova di efficacia |
| 7 | Badge "prima settimana" + nuovo colore | Celebrazione + personalizzazione |
| 14 | Stadio evolutivo "giovane" | Crescita percepibile |
| 30 | Forma piena + ambiente sbloccabile | Investimento consolidato |
| 60+ | Forme stagionali/speciali, rare e a sorpresa | Profondità di lungo periodo |

La densità di sblocchi è **alta all'inizio** (servono ragioni rapide per tornare nei giorni critici 2–7) e poi **rada e speciale** (per non esaurire i contenuti e non trasformare la crescita in una corsa). È una curva logaritmica deliberata.

---

## 5. Notifiche e re-engagement etici

Le notifiche sono un *trigger esterno*: necessarie per innescare l'abitudine finché il *trigger interno* (la routine) non si è formato. Ma sono anche lo strumento più facilmente abusabile e la principale fonte di dark pattern. Con una minore, la barra etica è altissima.

### 5.1 Principi

1. **Default minimalista:** **una sola** notifica al giorno di default. L'utente può ridurre, non c'è bisogno che possa aumentare di molto.
2. **Timing scelto dall'atleta:** durante l'onboarding chiede *quando* le fa comodo (es. "dopo l'allenamento", "la sera"). La notifica è ancorata a un momento *suo*, non a un orario che massimizza i nostri tap.
3. **Tono: invito, mai ricatto.** "Il tuo Buddy ti aspetta per il check-in 🌱" — gentile, opzionale, breve. Mai colpa, mai urgenza, mai paura.
4. **Trasparenza:** dire chiaramente cosa fa la notifica; controllo facile e granulare; opt-out senza attriti.
5. **Decadimento intelligente:** se l'atleta ignora le notifiche per N giorni, **riduciamo** la frequenza (non aumentiamo). Il silenzio è una risposta da rispettare. Eventuale switch da push a un riepilogo più leggero.

### 5.2 Quando, come, limiti

| Aspetto | Linea guida | Limite assoluto |
|---|---|---|
| **Frequenza** | 1/giorno di default | Mai >2/giorno; mai notturne (es. 22:00–7:30) |
| **Timing** | Ancorato alla routine scelta dall'utente | No A/B test che massimizzano solo l'apertura |
| **Tono** | Caldo, invitante, breve | Mai FOMO, urgenza, colpa, paura |
| **Re-engagement (utente inattiva)** | 1 promemoria gentile, poi *decadimento* | Mai sequenze di "win-back" insistenti |
| **Streak** | Eventuale reminder neutro | Mai "stai per perdere lo streak!" |
| **Contenuto** | Generico e sicuro nella lockscreen | Mai dati di salute/umore nel testo della notifica (privacy) |

### 5.3 Do / Don't delle notifiche

**Do:**
- ✅ "Ciao! Quando hai un minuto, il tuo Buddy è qui 🌿"
- ✅ Far scegliere orario e frequenza all'utente.
- ✅ Ridurre la frequenza per chi non risponde.
- ✅ Notifiche utili e personalizzate, mai a tappeto.

**Don't:**
- ❌ "Il tuo Buddy è triste e solo senza di te 😭" (manipolazione emotiva su una minore — vietato).
- ❌ "Solo OGGI sblocchi…!" (FOMO/urgenza artificiale).
- ❌ Badge-count gonfiati sull'icona per indurre apertura.
- ❌ Notifiche multiple/ravvicinate (notification overload).
- ❌ Push notturne che interferiscono col sonno (controsenso per un'app di benessere).

---

### 5.4 Esempi pronti di copy per notifiche (libreria)

Una libreria di testi *approvati*, da ruotare per evitare ripetitività (varietà = anti-noia, ma sempre dentro il tono etico). Tutti gentili, brevi, senza colpa, senza urgenza.

**Promemoria quotidiano (ruotabili):**
- "Quando hai un minuto, il tuo Buddy è qui 🌿"
- "Pronta per il check-in di oggi? Solo un attimo 💚"
- "Il tuo Buddy ti aspetta per un saluto"
- "Un minuto per te (e per il Buddy)?"

**Post-allenamento (ancorato alla routine scelta):**
- "Allenamento finito? Facciamo defaticare anche il Buddy 🧘"
- "Bel lavoro oggi. Recupero time con il Buddy?"

**Bentornato (dopo assenza):**
- "Che bello rivederti! Riprendiamo con calma 🌱"
- "Ci sei, ed è quello che conta. Ricominciamo insieme"

**Celebrazione (occasionale):**
- "Il tuo Buddy è cresciuto! Vieni a vederlo 🎉"
- "Piccolo traguardo raggiunto. Festeggiamo?"

**Vietati (esempi di ciò che NON scriviamo mai):**
- ❌ "Il tuo Buddy è triste e solo 😭"
- ❌ "Stai per perdere lo streak! Affrettati ⏰"
- ❌ "Non ti sei fatta vedere… ci hai abbandonati?"
- ❌ "ULTIMO giorno per sbloccare!"

### 5.5 La voce del Buddy (tono di scrittura)

Il Buddy è il personaggio attraverso cui passa tutto l'engagement: la sua voce *è* l'etica del prodotto resa parola. Linee guida di scrittura:

- **Caldo e paritario, mai paternalistico.** Parla *con* lei, non *a* lei. È un compagno, non un'autorità.
- **Breve.** Frasi corte, una emoji al massimo. L'attention span non perdona muri di testo.
- **Mai giudicante sullo stato.** "Sei stanca" non è un difetto. Il Buddy non dice mai "dovresti", "non hai", "hai sbagliato".
- **Proiettivo quando serve.** "Diamoci una mano", "come ci sentiamo oggi?" — il plurale e la terza persona abbassano la difesa.
- **Onesto sulla privacy.** Quando parla di cosa è condiviso, è chiaro e rassicurante, mai vago.
- **Inclusivo.** Niente body talk, niente riferimenti a peso/aspetto, linguaggio neutro rispetto al genere e al tipo di sport.

---

## 6. Onboarding del primo minuto

Il pubblico ha un *attention span* di pochi secondi e una **finestra di abbandono di ~3–4 secondi**: se non percepisce valore quasi subito, se ne va. Quindi l'onboarding non spiega — *fa giocare*. Obiettivo: **time-to-fun sotto i 30 secondi**, primo "momento aha" entro il primo minuto.

### 6.1 La sceneggiatura del primo minuto

| Secondi | Cosa accade | Obiettivo |
|---|---|---|
| 0–5 | Compare il Buddy, un po' giù, che la guarda. Una frase: "Ciao! Sono un po' a terra oggi… mi aiuti?" | Curiosità + empatia immediata, **nessun form** |
| 5–15 | Tutorial *facendo*: "Tienimi premuto per darmi da bere" → lei lo fa → indicatore sale, festa micro | Prima azione riuscita = primo dopamina sano, *competenza* |
| 15–30 | Seconda meccanica (energia o coccola) guidata | Conferma che è facile e piacevole, ritmo |
| 30–45 | Il Buddy "rinasce", primo mini-festeggiamento, primo accessorio in regalo | **Momento aha**: "ho cambiato il suo stato" |
| 45–60 | Reveal della promessa di privacy: "Quello che facciamo qui resta tra noi. Chi ti allena vede solo 🟢🟡🔴, mai i dettagli." | Fiducia + ragione razionale per restare |
| ~60 | Setup leggerissimo: nome del Buddy + *quando* vuoi che ti cerchi. Fine. | Investimento minimo (naming = ownership) |

### 6.2 Principi di onboarding

- **Valore prima della registrazione.** Far giocare *prima* di chiedere account/permessi (compatibilmente con i requisiti di età/consenso, gestiti a parte). L'iscrizione percepita come barriera uccide il day-1.
- **Naming = primo investimento.** Dare un nome al Buddy crea ownership con un costo psicologico minimo: è la prima pietra dell'abitudine.
- **Permessi chiesti al momento giusto.** Notifiche e altri permessi richiesti *in contesto* ("vuoi che ti ricordi dopo l'allenamento?"), non in raffica all'avvio.
- **Zero testo lungo.** Niente wall of text, niente carosello di slide. Si impara facendo.

### 6.3 Do / Don't onboarding

- ✅ *Do:* prima azione tattile entro 10 s.
- ✅ *Do:* mostrare la trasformazione del Buddy (prova di efficacia).
- ✅ *Do:* svelare presto la promessa di privacy (è un differenziatore di fiducia).
- ❌ *Don't:* questionario iniziale ("compila il tuo profilo di salute").
- ❌ *Don't:* paywall o richiesta dati prima del primo momento di gioia.
- ❌ *Don't:* tutorial bloccanti e prolissi.

---

## 7. Retention: curve, abbandono, contromisure, metriche

### 7.1 Curva di retention attesa

La retention delle app mobile segue tipicamente una curva a decadimento ripido nei primi giorni, poi un plateau. Per un'app di benessere quotidiano con target adolescenti, ipotesi di lavoro (da validare con i dati reali, non come promessa):

| Momento | Benchmark "ok" indicativo | Cosa lo determina |
|---|---|---|
| **Day-1** | il check-in più critico | Onboarding / time-to-fun |
| **Day-7** | tiene chi ha formato l'inizio di routine | Streak morbido + evoluzione visibile |
| **Day-30** | qui si vede se l'abitudine ha attecchito | Trigger interno consolidato + valore reale |
| **Plateau** | il nucleo di utenti abituate | Investimento accumulato (Buddy "loro") |

> Nota: i benchmark numerici vanno fissati con i dati di BAB e con cautela etica. **L'obiettivo non è massimizzare la retention a ogni costo**, ma sostenere un'abitudine sana. Un'utente che usa l'app meno ma sta meglio è un *successo*, non una churn da combattere.

### 7.2 Momenti di abbandono tipici e contromisure

| Momento | Perché abbandona | Contromisura |
|---|---|---|
| **Durante l'onboarding** | Friction prima del valore, form percepito | Time-to-fun <30 s, gioco prima della registrazione |
| **Day 2–3** | Novità svanita, non ha ancora una routine | Evoluzione del Buddy visibile presto + 1 notifica gentile ancorata alla routine |
| **Day 7–10** | "Ho già visto tutto" | Nuove micro-meccaniche sbloccate gradualmente, prima personalizzazione |
| **Dopo un giorno saltato** | Senso di colpa / streak rotto → "tanto vale mollare" | **Streak morbido + grace day + messaggio di bentornato**, mai shaming |
| **Periodo di stress/infortunio** | Proprio quando servirebbe di più | Modalità "leggera"; il Buddy resta presente senza pretendere; nessuna pressione |
| **Saturazione** | Troppe notifiche/richieste | Decadimento delle notifiche, sessioni brevi, rispetto del silenzio |

### 7.3 Metriche di engagement (etiche)

**Metriche che guardiamo:**
- **Tasso di check-in completati** (giorni con almeno un loop di cura) — il KPI di salute del prodotto.
- **D1 / D7 / D30 retention** e **streak length distribution** (con attenzione a *non* spingere streak patologici).
- **Time-to-fun** medio in onboarding.
- **Durata di sessione** — qui vogliamo che resti **bassa** (~30–60 s). Una durata crescente è un *segnale d'allarme*, non di successo.
- **Tasso di skip per meccanica** — per capire quali sono troppo lunghe o noiose.
- **Adozione delle meccaniche di benessere reale** (respiro, sfogo) come proxy di valore vero.

**Anti-metriche (deliberatamente NON ottimizzate):**
- ❌ Tempo-schermo totale massimizzato.
- ❌ Numero di sessioni al giorno spinto verso l'alto.
- ❌ Aperture indotte da notifiche colpevolizzanti.

> **Principio:** scegliamo metriche che si rompono se diventiamo tossici. Se per alzare un KPI dovremmo introdurre un dark pattern, quel KPI è sbagliato.

### 7.4 Il "ritorno dopo l'assenza": il momento che definisce l'etica del prodotto

Il modo in cui un'app tratta un'utente che **torna dopo aver saltato giorni** è il test decisivo. Un'app estrattiva la accoglie con colpa e perdita ("hai perso il tuo streak di 23 giorni"); un'app etica la accoglie con sollievo. Per BAB questo momento è particolarmente delicato, perché *un'assenza può coincidere proprio con un periodo difficile* (infortunio, ansia da gara, un momento no), cioè esattamente quando l'atleta avrebbe più bisogno di non sentirsi giudicata.

**Sceneggiatura del bentornato (etica):**

| Situazione | Messaggio del Buddy | Cosa NON facciamo |
|---|---|---|
| Torna dopo 1 giorno | "Bentornata! Riprendiamo 🌱" | Nessun accenno al salto |
| Torna dopo qualche giorno | "Mi sei mancata, ma va benissimo. Ci sei ora, è quello che conta" | No countdown, no "streak perso", no dramma |
| Torna dopo settimane | "Che bello rivederti. Ricominciamo con calma, un piccolo passo" | No "ti sei persa X premi", no senso di vuoto |

La crescita del Buddy è legata ai **giorni totali di cura** (§4.1), non a una catena ininterrotta: l'assenza mette in pausa, non distrugge. Questo trasforma una potenziale fonte di abbandono ("tanto ho già rotto tutto, mollo") in un *invito a ricominciare senza costo psicologico*.

### 7.5 Modalità "leggera" nei periodi difficili

Quando i segnali indicano un periodo di stress alto, infortunio o disagio prolungato, l'app può entrare (in modo trasparente, dichiarato all'utente) in una **modalità leggera**: il Buddy chiede meno, le notifiche si diradano ulteriormente, il tono diventa ancora più accogliente e meno "giocoso". È il momento in cui smettiamo di spingere sull'engagement e diamo priorità assoluta al benessere — e in cui, se i segnali lo richiedono, la rete di cura (coach/famiglia, via 🟡🔴) viene attivata. **Engagement e cura non sono in competizione: quando confliggono, vince la cura.**

---

## 8. Gamification etica per minori

Questa sezione ha **priorità sulle altre**. Il nostro utente è una minore (13–18) e qualunque servizio probabilmente accessibile da minori nel Regno Unito (e in spirito ovunque, GDPR/Italia incluse) deve rispettare standard come l'**Age Appropriate Design Code (Children's Code)** dell'ICO: *privacy alta di default, minimizzazione dei dati, profilazione e geolocalizzazione disattivate di default, niente "dark pattern" che inducano i minori a condividere più del necessario o a fare scelte rischiose, trasparenza adatta all'età, e il "best interests of the child" come bussola*.

### 8.1 Principi

1. **Il miglior interesse della minore prima di ogni metrica.** In ogni scelta di design, la domanda è: *questo serve a lei o serve a noi?*
2. **Privacy alta di default + minimizzazione.** Raccogliamo solo il dato necessario al benessere; nessuna profilazione pubblicitaria; coach/genitori vedono **solo 🟢🟡🔴**.
3. **Trasparenza adatta all'età.** Spiegazioni semplici, oneste, comprensibili a 13 anni su cosa raccogliamo e chi vede cosa.
4. **No leve di dipendenza.** Le tecniche del Hook Model sono usate per *togliere noia a un'azione utile*, non per creare compulsione. Variabilità solo cosmetica, streak morbidi, sessioni brevi.
5. **No monetizzazione predatoria sui minori.** Nessuna loot box, nessun acquisto in-app spinto, nessuna valuta premium, nessuna pubblicità comportamentale.
6. **Controllo (genitoriale e dell'utente) trasparente.** I genitori partecipano alla sicurezza *senza* avere accesso ai dati intimi: vedono il segnale, non i dettagli. L'atleta sa esattamente cosa è condiviso. La sorveglianza nascosta è essa stessa un dark pattern.
7. **Accessibilità e inclusività by design** (vedi §9): il gioco deve funzionare per tutte.

### 8.2 Divieti espliciti (dark pattern vietati)

| Dark pattern | Cos'è | Perché vietato per BAB |
|---|---|---|
| **FOMO tossica** | Urgenza/scarsità artificiale ("solo oggi!") | Manipola; crea ansia in una minore |
| **Guilt / emotional blackmail** | "Il tuo Buddy soffre senza di te" | Manipolazione emotiva di una minore — inaccettabile |
| **Streak shaming** | Punire/umiliare per un giorno saltato | Crea ansia, dipendenza, abbandono |
| **Loot box / gambling** | Ricompense casuali "a perdere", spinta a ritentare | Meccanica d'azzardo su minori |
| **Pay-to-progress** | Sbloccare con denaro | Monetizzazione predatoria |
| **Roach motel** | Facile entrare, difficile uscire/cancellare | Toglie controllo |
| **Confirmshaming** | "No, non mi interessa stare bene" come opzione di rifiuto | Manipola le scelte |
| **Notification overload** | Bombardamento | Intrusivo, stressante |
| **Sorveglianza nascosta** | Condividere dati intimi col coach/genitori all'insaputa | Tradisce la fiducia, viola la privacy by design |
| **Privacy zuckering** | Indurre a condividere più del necessario | Vietato dal Children's Code |
| **Leaderboard di salute** | Classifiche su umore/peso/performance | Crea confronto tossico tra atlete |

### 8.3 Checklist etica (da passare prima di ogni release)

- [ ] La ricompensa variabile riguarda **solo l'estetica/contorno**, mai il raggiungimento dell'obiettivo di salute?
- [ ] Lo streak è **morbido** (no azzeramento brutale, grace day, no shaming)?
- [ ] La sessione tipica resta **sotto i ~60 secondi**? La durata crescente è monitorata come allarme?
- [ ] Le notifiche sono **≤1/giorno di default**, gentili, ancorate alla routine, **mai colpevolizzanti**, mai notturne?
- [ ] Le notifiche **decadono** se ignorate (frequenza giù, non su)?
- [ ] Nessuna **FOMO**, urgenza, scarsità, confirmshaming, guilt?
- [ ] **Privacy alta di default**; coach/genitori vedono **solo 🟢🟡🔴**; l'atleta **sa** cosa è condiviso?
- [ ] **Zero** acquisti in-app, valuta premium, loot box, pubblicità comportamentale?
- [ ] Niente **leaderboard** o confronti su stato di salute/umore/corpo?
- [ ] La meccanica sull'**alimentazione** (M7) è priva di numeri, calorie, giudizi sul corpo?
- [ ] L'app passa il test del **"miglior interesse della minore"** (serve a lei, non a noi)?
- [ ] Se togliessimo tutte le ricompense di gioco, **resterebbe** un motivo reale per usarla?
- [ ] Disiscrizione/cancellazione dati **facile** come l'iscrizione (no roach motel)?
- [ ] Funziona con **reduced motion**, screen reader, target tattili adeguati (§9)?

---

## 9. Accessibilità ed esperienza mobile

Il nostro utente è **mobile-only**, spesso in movimento (spogliatoio, autobus, fine allenamento), con poco tempo e bassa tolleranza alla frizione. L'accessibilità non è un extra: una meccanica che non è accessibile semplicemente *non viene fatta*, e quindi il dato si perde.

### 9.1 Movimento e animazione

- **Reduced motion:** rispettare `prefers-reduced-motion`. Tutte le animazioni di "festa", riempimento, transizioni devono avere una **fallback statica/attenuata**. Le animazioni non devono mai essere l'unico canale di feedback (sempre accompagnate da cambio di stato, suono opzionale, testo).
- **Niente flash/stroboscopia**, niente movimenti che possano dare nausea (importante anche per chi ha device più vecchi/lenti).
- **Haptics opzionali** e disattivabili.

### 9.2 Target tattili e gesti

- **Tap target ampi** (almeno ~44–48 px) — adatti a dita, fretta, schermi piccoli.
- **Gesti semplici e a una mano:** tieni-premuto, tap, carezza, drag. Evitare gesti complessi multi-touch o di precisione.
- **Alternative ai gesti difficili:** chi non può "tenere premuto" o "soffiare" deve avere un'alternativa (es. tap singolo) per ogni meccanica. Nessun bisogno deve dipendere da un'unica modalità motoria.

### 9.3 Attenzione e carico

- **Sessioni cortissime** progettate per il vero attention span: 30–60 s, max 3–4 micro-task.
- **Un'azione alla volta**, schermo pulito, gerarchia chiara, zero testo lungo.
- **Feedback immediato** a ogni gesto (micro-interazione): conferma sensoriale entro pochi ms — è ciò che rende l'azione soddisfacente e leggibile.

### 9.4 Inclusività

- **Linguaggio e Buddy inclusivi:** il Buddy non ha un genere/corpo che induca confronto; il tono evita body talk.
- **Contrasto e leggibilità** adeguati (WCAG); testo ridimensionabile; compatibilità screen reader con etichette descrittive per gesti e stati.
- **Suono mai obbligatorio:** tutto funziona in silenzio (spogliatoio, lezione), con feedback visivi e tattili equivalenti.

### 9.5 Do / Don't accessibilità & mobile

- ✅ *Do:* fallback statica per ogni animazione; alternativa a ogni gesto; feedback multi-canale.
- ✅ *Do:* progettare per "una mano, di fretta, in silenzio".
- ❌ *Don't:* affidare informazione *solo* al colore o *solo* al movimento.
- ❌ *Don't:* gesti di precisione o multi-touch come unica via.
- ❌ *Don't:* sessioni lunghe o testo da leggere prima di poter agire.

---

## Appendice A — Roadmap di introduzione delle meccaniche

Non tutto va rilasciato al day-1: la ricchezza si dosa per non sovraccaricare e per dare *ragioni di ritorno* nel tempo. Proposta di fasaggio.

| Fase | Quando | Cosa attiviamo | Obiettivo |
|---|---|---|---|
| **Core** | Lancio (day-1) | M1 Bevi, M2 Energia, M3 Umore, M4 Calma + evoluzione base + streak morbido | Loop completo, time-to-fun, abitudine iniziale |
| **Espansione 1** | Day 7–14 | M5 Stretch, M6 Buonanotte + prima personalizzazione + badge celebrativi | Freschezza, contrastare la noia da novità svanita |
| **Espansione 2** | Mese 1–2 | M8 Pensieri, M9 Scalda, M10 Soleggia + stadi evolutivi avanzati | Profondità, copertura di più contesti |
| **Sensibili** | Quando la logica clinica e il design sono maturi | M7 Nutri (con tutte le cautele) | Coprire un'area ad alto rischio solo quando siamo pronti |

## Appendice B — Glossario

| Termine | Significato in BAB |
|---|---|
| **Loop di cura** | Il ciclo bisogno → micro-azione → feedback → ricompensa → abitudine che è il cuore del prodotto |
| **Micro-meccanica** | Singolo gesto tattile da 5–10 s che logga un dato (es. "bevi", "respiro") |
| **Hook Model** | Modello di Nir Eyal: Trigger → Azione → Ricompensa Variabile → Investimento |
| **Trigger interno/esterno** | Esterno = notifica/icona; interno = emozione/routine che richiama l'app |
| **Ricompensa variabile (buona)** | Variabilità del solo "contorno" cosmetico, esito utile sempre garantito |
| **Streak morbido** | Serie che non si azzera bruscamente: grace day, recupero, nessun shaming |
| **Schermo proiettivo** | Il Buddy come terza persona su cui loggare il proprio stato senza esporsi |
| **Modalità leggera** | Stato in cui l'app chiede meno e accudisce di più nei periodi difficili |
| **Segnale 🟢🟡🔴** | L'unica cosa che coach/genitori vedono: mai i dettagli intimi |
| **Time-to-fun** | Tempo dall'apertura al primo momento di gioia/competenza (target <30 s) |
| **Dark pattern** | Design ingannevole/manipolatorio: vietato (vedi §8.2) |
| **Manipulation Matrix** | Test etico di Eyal: facilitatore / intrattenitore / spacciatore / sfruttatore |
| **Age Appropriate Design Code** | "Children's Code" dell'ICO (UK): standard di privacy e design per minori |

## Appendice C — Riepilogo dei principi non-negoziabili

1. Il valore deve essere **reale per l'atleta**, anche senza ricompense di gioco.
2. La sessione resta **breve** (~30–60 s); durata crescente = allarme, non successo.
3. La ricompensa variabile è **solo cosmetica**; l'esito di salute è sempre garantito.
4. Lo **streak è morbido**; il bentornato è accogliente, mai colpevolizzante.
5. Le **notifiche** sono ≤1/giorno di default, gentili, decadono se ignorate.
6. **Privacy alta di default**: coach/genitori vedono solo 🟢🟡🔴.
7. **Zero** monetizzazione predatoria, loot box, leaderboard di salute.
8. **Accessibile e inclusivo** by design.
9. In conflitto tra metrica e benessere della minore, **vince la minore**.

---

## 10. Fonti

**Hook Model / habit formation (Nir Eyal):**
- Nir Eyal — *How to Manufacture Desire / The Hooked Model*: https://www.nirandfar.com/how-to-manufacture-desire/
- Growth Method — *The Hooked Model by Nir Eyal*: https://growthmethod.com/hooked-model/
- Amplitude — *The Hook Model: Retain Users by Creating Habit-Forming Products*: https://amplitude.com/blog/the-hook-model
- Mindtools — *The Hook Model of Behavioral Design*: https://www.mindtools.com/aapqtdb/the-hook-model-of-behavioral-design/
- UI-Patterns — *Nir Eyal: Trigger users' actions and reward them to build habits*: https://ui-patterns.com/blog/nir-eyal-trigger-actions-and-reward-them-to-build-habits

**Ricompense variabili, dopamina, streak, retention:**
- UX Magazine — *The Psychology of Hot Streak Game Design (without shame)*: https://uxmag.com/articles/the-psychology-of-hot-streak-game-design-how-to-keep-players-coming-back-every-day-without-shame
- StriveCloud — *Habit formation & user retention*: https://www.strivecloud.io/blog/habit-formation-user-retention
- Gamification Hub — *5 Ethical Gamification Principles for Human-Centric Design*: https://www.gamificationhub.org/ethical-gamification-principles/
- NetPsychology — *The Reward Circuit: Dopamine and Digital Addiction*: https://netpsychology.org/the-reward-circuit-dopamine-and-digital-addiction/
- PUG Interactive — *The Dark Psychology of Addictive Game Design (Warning)*: https://puginteractive.com/the-dark-psychology-of-addictive-game-design-warning/

**Gamification per adolescenti e salute mentale:**
- PMC — *Promoting Physical and Mental Health among Children and Adolescents via Gamification (Systematic Review)*: https://pmc.ncbi.nlm.nih.gov/articles/PMC10886329/
- Behavioral Health Business — *Gamification Could Be Key to Treating Adolescent Mental Health*: https://bhbusiness.com/2024/10/17/well-played-gamification-could-be-key-to-treating-adolescent-mental-health/
- MDPI — *Gamification for Mental Health and Health Psychology*: https://www.mdpi.com/1660-4601/21/8/990

**Design etico per minori / Age Appropriate Design Code:**
- ICO Children's Code — guida (Ondato): https://ondato.com/blog/uk-age-appropriate-design-code/
- 5Rights Foundation — *Setting new standards for children's data privacy: the Children's Code*: https://5rightsfoundation.com/resource/setting-new-standards-for-childrens-data-privacy-the-childrens-code/
- Wikipedia — *Children's Code*: https://en.wikipedia.org/wiki/Children%27s_Code
- TechCrunch — *UK now expects compliance with its child privacy design code*: https://techcrunch.com/2021/09/01/uk-now-expects-compliance-with-its-child-privacy-design-code/

**Attention span, micro-interazioni, accessibilità mobile (Gen Z):**
- Smashing Magazine — *Designing for Gen Z: Expectations and UX Guidelines*: https://www.smashingmagazine.com/2024/10/designing-for-gen-z/
- Designlab — *Designing for Gen Z*: https://designlab.com/blog/designing-for-gen-z
- Beta Soft Technology — *Motion UI Trends: Micro-Interactions That Elevate UX*: https://www.betasofttechnology.com/motion-ui-trends-and-micro-interactions/

**Notifiche e dark pattern:**
- Built In — *Avoiding Push Notification Overload*: https://builtin.com/articles/push-notifications
- Stéphanie Walter — *The Ultimate Guide to Not F#!@ing Up Push Notifications*: https://stephaniewalter.design/blog/the-ultimate-guide-to-not-fck-up-push-notifications/
- Designlab — *Are Notifications a Dark Pattern?*: https://designlab.com/blog/are-notifications-a-dark-pattern-ux-ui
- Bejamas — *10 Dark Patterns in UX Design and How to Avoid Them*: https://bejamas.com/blog/10-dark-patterns-in-ux-design

---

> *Documento vivo. Ogni nuova meccanica, badge, notifica o esperimento di retention deve passare la **Checklist etica (§8.3)** prima del rilascio. In caso di conflitto tra una metrica di business e il miglior interesse della minore, vince sempre la minore.*

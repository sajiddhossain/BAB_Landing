# BAB — Roadmap di prodotto e specifica delle feature

> **Documento 04 della serie Strategia** · Owner: Product (con input Founder Gaia Manzone) · Stato: bozza viva · Mercato di partenza: Italia

---

> ## Perché questo documento
>
> Questo documento è la **fonte unica di verità** su *cosa* costruiamo, *in che ordine* e *perché*, per i prossimi 12-18 mesi di BAB. Serve a tre tipi di lettori:
>
> - **Chi sviluppa** (design + engineering): per capire scopo, comportamento utente e modello dati di ogni feature, con il confine di privacy reso esplicito feature per feature.
> - **Chi decide** (founder, futuri investitori, eventuali partner sportivi): per vedere la logica di prioritizzazione (RICE + MoSCoW) e le fasi MVP → V1 → V2.
> - **Chi vende e supporta** (futuro team commerciale verso le società, e il supporto alle atlete): per allineare la promessa di prodotto con ciò che esiste davvero.
>
> **Tre vincoli non negoziabili attraversano tutto il documento:**
>
> 1. **L'atleta possiede i suoi dati.** Ciclo, umore, sonno, energia, sintomi: sono suoi. Punto.
> 2. **Coach e genitori vedono SOLO segnali aggregati e anonimi** — il semaforo di squadra 🟢🟡🔴 — **MAI** dati di salute individuali.
> 3. **L'app dell'atleta è e resta gratuita.** A pagare è la **società** (Coach Dashboard, B2B); i genitori sono un canale B2C secondario.
>
> Se una feature mette in tensione uno di questi vincoli, il vincolo vince. Sempre. Questo è ciò che rende BAB difendibile e degno di fiducia in un mercato — quello del tracciamento mestruale — segnato da gravi abusi di dati (vendita a data broker, advertiser, perfino accessi governativi). Vedi §9, Fonti.

---

## Indice

1. [Panoramica dell'ecosistema](#1-panoramica-dellecosistema)
2. [App Atleta (gratuita)](#2-app-atleta-gratuita)
   - 2.1 [Onboarding](#21-onboarding)
   - 2.2 [Check-in giornaliero leggero](#22-check-in-giornaliero-leggero)
   - 2.3 [Il Buddy — loop di cura (gamification)](#23-il-buddy--loop-di-cura-gamification)
   - 2.4 [Educazione corporea e salute mestruale](#24-educazione-corporea-e-salute-mestruale)
   - 2.5 [Modulo prevenzione infortuni (LCA / RED-S)](#25-modulo-prevenzione-infortuni-lca--red-s)
   - 2.6 [Tracciamento energia / umore / sonno](#26-tracciamento-energia--umore--sonno)
   - 2.7 [Comunicazione anonima col coach](#27-comunicazione-anonima-col-coach)
   - 2.8 [Privacy, consenso e controllo dati](#28-privacy-consenso-e-controllo-dati)
3. [Coach Dashboard (a pagamento)](#3-coach-dashboard-a-pagamento)
4. [Vista Genitore](#4-vista-genitore)
5. [Modello dati ad alto livello e confine privacy](#5-modello-dati-ad-alto-livello-e-confine-privacy)
6. [Roadmap per fasi: MVP → V1 → V2](#6-roadmap-per-fasi-mvp--v1--v2)
7. [Prioritizzazione (RICE + MoSCoW)](#7-prioritizzazione-rice--moscow)
8. [User stories e criteri di accettazione](#8-user-stories-e-criteri-di-accettazione)
9. [La logica del semaforo 🟢🟡🔴 in dettaglio](#9-la-logica-del-semaforo--in-dettaglio)
10. [Metriche di successo e KPI per fase](#10-metriche-di-successo-e-kpi-per-fase)
11. [Edge case e decisioni di prodotto difficili](#11-edge-case-e-decisioni-di-prodotto-difficili)
12. [Requisiti non-funzionali](#12-requisiti-non-funzionali)
13. [Glossario](#13-glossario)
14. [Fonti](#14-fonti)

---

## 1. Panoramica dell'ecosistema

BAB è una piattaforma di salute e benessere per **atlete adolescenti (13-18 anni)**, costruita attorno a tre problemi sottovalutati e interconnessi:

- **Salute mestruale.** Il **77%** delle atlete riferisce che il ciclo mestruale influenza la propria performance (Jones & Bishop, 2024), eppure solo il **~6%** della ricerca in scienze dello sport è condotta esclusivamente su donne (Cowley et al., 2021). Le atlete vivono un'esperienza reale di cui nessuno parla e su cui quasi nessuno ha dati.
- **Prevenzione infortuni.** Le atlete adolescenti hanno un rischio di rottura del **legamento crociato anteriore (LCA)** marcatamente più alto dei coetanei maschi, con fattori ormonali, biomeccanici e di carico che variano lungo il ciclo. A questo si lega la **RED-S** (Relative Energy Deficiency in Sport): un deficit energetico cronico che si manifesta spesso proprio come irregolarità o scomparsa del ciclo, ed è un campanello d'allarme precoce di rischio infortunio.
- **Drop-out.** Circa **1 atleta su 2 abbandona lo sport con la pubertà**. Il corpo cambia, l'imbarazzo cresce, l'ambiente non si adatta — e l'atleta sparisce.

BAB affronta questi tre problemi con un design unico nel suo genere: **l'atleta tiene tutto per sé, e la società riceve solo un battito collettivo della squadra.**

### 1.1 Gli attori e il flusso di valore

```
                          ┌───────────────────────────────────────┐
                          │              ATLETA (13-18)            │
                          │            App gratuita · B2C          │
                          │                                        │
                          │  • Check-in giornaliero (5-10s)        │
                          │  • Buddy / loop di cura (Tamagotchi)   │
                          │  • Educazione corpo + ciclo            │
                          │  • Prevenzione infortuni (LCA/RED-S)   │
                          │  • Tracciamento energia/umore/sonno    │
                          │                                        │
                          │  ┌──────────────────────────────────┐  │
                          │  │  DATI INDIVIDUALI = PRIVATI       │  │
                          │  │  ciclo · umore · sonno · sintomi  │  │
                          │  │  (l'atleta li possiede)           │  │
                          │  └──────────────────────────────────┘  │
                          └─────────────────┬─────────────────────┘
                                            │
                       ┌────────────────────┴─────────────────────┐
                       │   CONFINE DI PRIVACY (anonimizzazione +   │
                       │   aggregazione · soglia minima k atlete)  │
                       │   SOLO segnali di squadra escono da qui   │
                       └────────────────────┬─────────────────────┘
                                            │
                 segnale aggregato 🟢🟡🔴   │   segnale aggregato 🟢🟡🔴
            (squadra, mai individuale)      │   (squadra, mai individuale)
                       ┌────────────────────┴───────┐   ┌──────────────────────────┐
                       ▼                            │   ▼                          │
        ┌──────────────────────────────┐           │   ┌─────────────────────────┐│
        │     SOCIETÀ / COACH          │           │   │       GENITORE          ││
        │   Coach Dashboard · B2B €    │           │   │    Vista Genitore · B2C ││
        │                              │           │   │                         ││
        │  • Semaforo di squadra       │           │   │  • Stato benessere       ││
        │  • Partecipazione aggregata  │           │   │    aggregato del gruppo  ││
        │  • Energia media squadra     │           │   │  • Risorse educative     ││
        │  • Alert di carico/segnali   │           │   │  • MAI il dato della     ││
        │  • Esport. aggregate/anonime │           │   │    propria figlia in     ││
        │  • MAI dato individuale      │           │   │    chiaro                ││
        └──────────────────────────────┘           │   └─────────────────────────┘│
                                                    └──────────────────────────────┘

  Legenda:  €  = chi paga       🟢 tutto bene    🟡 attenzione    🔴 carico/affaticamento alto
```

### 1.2 Le tre relazioni, in una riga ciascuna

| Relazione | Chi dà cosa | Chi riceve cosa | Vincolo |
|---|---|---|---|
| **Atleta ↔ Società** | L'atleta fa check-in; il sistema aggrega | Il coach vede il semaforo di squadra e i trend collettivi | Mai dato individuale, mai sotto la soglia *k* |
| **Atleta ↔ Genitore** | L'atleta usa l'app; il genitore è coinvolto come supporto | Il genitore vede risorse educative e, al più, segnali di gruppo | Mai il ciclo/umore della figlia in chiaro |
| **Società ↔ BAB** | La società paga l'abbonamento Coach Dashboard | BAB fornisce strumento di benessere + valore di retention | Il valore B2B nasce dall'anonimato, non lo viola |

### 1.3 Il "perché funziona" del modello

Il modello commerciale e il modello etico **coincidono**: la società paga per ciò che è *legittimo* sapere (lo stato collettivo della squadra, utile a programmare carichi e prevenire drop-out e infortuni), e *non può* accedere a ciò che non le spetta. Questo elimina alla radice il conflitto di interessi che ha distrutto la fiducia in molte app di tracciamento mestruale, dove il dato individuale è diventato merce (vedi §9). In BAB **il dato individuale non è mai un asset commerciale**: è dell'atleta.

---

## 2. App Atleta (gratuita)

Principio guida dell'app atleta: **leggera, quotidiana, non clinica, mai colpevolizzante.** L'atleta di 14 anni non vuole un diario clinico; vuole qualcosa che la capisca, che le rubi 10 secondi e le restituisca un senso di cura. Da qui la scelta del **Buddy** come cuore emotivo dell'app (la demo Tamagotchi già presente sulla landing valida questa direzione).

Per ogni feature documentiamo quattro cose: **Scopo**, **Comportamento utente**, **Dati coinvolti**, **Come restano privati**.

### 2.1 Onboarding

**Scopo.** Portare un'adolescente da "non so cosa sia" a "ho un Buddy e ho capito che i miei dati sono miei" in meno di 2 minuti, costruendo fiducia *prima* di chiedere qualunque dato sensibile.

**Comportamento utente.**
1. Schermata di benvenuto con il Buddy che "nasce" / si sveglia.
2. Scelta/personalizzazione del Buddy (nome, aspetto) — primo gesto di possesso ed engagement.
3. Spiegazione in linguaggio teen di **cosa NON faremo mai** ("Il tuo coach non vedrà mai il tuo ciclo o il tuo umore. Vede solo se *la squadra* in generale è carica o stanca."). La promessa di privacy è parte dell'onboarding, non delle note legali.
4. Codice/invito società opzionale (se l'atleta entra via club) — collega l'atleta a una squadra *senza* esporne i dati.
5. Domande minime e saltabili (età/fascia, sport). Niente raccolta di dati sensibili in onboarding.

**Dati coinvolti.** Identificativo pseudonimo, fascia d'età, sport, eventuale codice squadra, preferenze Buddy.

**Come restano privati.** Nessun dato di salute è raccolto in onboarding. Il collegamento alla squadra avviene tramite identificativo pseudonimo: la società sa che "un'atleta in più si è unita", non *chi* sarà nel dettaglio dei dati di salute. Consenso granulare richiesto prima di qualunque tracciamento (§2.8).

> **Design note.** La ricerca su app di mood per teen mostra che i ragazzi rifiutano i "grandi check-in emotivi" e premiano interfacce minimali e prevedibili (Daylio-style: emoji invece di testo libero). L'onboarding deve sottopromettere e dare subito un piccolo "win" (il Buddy). Vedi §9.

### 2.2 Check-in giornaliero leggero

**Scopo.** Catturare un battito quotidiano di benessere in **5-10 secondi**, abbastanza ricco da alimentare i trend personali dell'atleta e il semaforo aggregato della squadra, abbastanza leggero da diventare abitudine.

**Comportamento utente.**
- Una schermata, pochi tap. Esempio di flusso: *Come va l'energia oggi?* (scala a 3-5 emoji) → *Come hai dormito?* (poco/ok/bene) → *Umore?* (emoji) → opzionale *ciclo oggi?* (sì/no/non dico).
- Tutto tap-based, niente testo obbligatorio (testo solo come opzione "scrivi qualcosa per te").
- Il completamento **nutre il Buddy** (vedi §2.3): il check-in è la principale "fonte di cura" del loop di gioco.
- Reminder gentile (push opzionale), mai aggressivo, mai a tarda sera per non disturbare il sonno.

**Dati coinvolti.** Energia, sonno, umore, flag ciclo (opzionale), timestamp, eventuale nota personale.

**Come restano privati.** Il record completo del check-in vive **solo lato atleta** (modello dati §5). Verso la società esce **esclusivamente** il contributo a un'aggregazione di squadra: ad esempio l'energia media del gruppo, e solo se almeno *k* atlete (soglia, default *k* = 5) hanno fatto check-in nel periodo. La nota personale e il flag ciclo **non lasciano mai** il dominio dell'atleta e non entrano in nessun aggregato condiviso.

### 2.3 Il Buddy — loop di cura (gamification)

**Scopo.** Trasformare un comportamento "salutista" in un loop affettivo. Il Buddy è la ragione *emotiva* per cui l'atleta torna ogni giorno; il check-in è la ragione *funzionale*. Il Buddy rende sostenibile l'abitudine.

**Comportamento utente.** Loop di cura stile Tamagotchi (già prototipato nella demo della landing):
- **Micro-task da 5-10 secondi**: dare energia al Buddy, "accudirlo", piccole azioni di cura. Questi micro-task sono *intrecciati* al check-in (fare il check-in = prendersi cura del Buddy).
- Il Buddy reagisce allo stato dell'atleta in modo **gentile e non giudicante**: se l'atleta segnala stanchezza, il Buddy non "muore" né colpevolizza — propone riposo, idratazione, una micro-risorsa.
- Streak morbide e ricompense estetiche (sblocco di accessori/ambienti del Buddy), evitando meccaniche d'ansia (no "il Buddy muore se salti un giorno").
- Eventi educativi: il Buddy può "imparare" o "raccontare" qualcosa sul corpo/ciclo, agganciando l'educazione (§2.4).

**Dati coinvolti.** Stato del Buddy, streak, oggetti sbloccati, eventi del loop — tutti dati di *gioco*, derivati dall'attività ma non sensibili di per sé.

**Come restano privati.** I dati di gioco sono individuali e restano lato atleta. **Nulla del Buddy** (streak, stato, reazioni) è visibile a coach o genitori: un Buddy "triste" potrebbe rivelare lo stato della singola atleta, quindi resta privato per costruzione. La gamification non crea una backdoor sui dati di salute.

> **Design note — etica della gamification per minori.** Niente meccaniche da dark-pattern (pressione, perdita, FOMO acuta). Le streak sono "perdonanti" (giorni di grazia). L'obiettivo è cura, non dipendenza. Questo è coerente con le buone pratiche di codesign con i giovani su app di self-monitoring (§9).

### 2.4 Educazione corporea e salute mestruale

**Scopo.** Colmare il vuoto informativo che alimenta imbarazzo e drop-out: spiegare in modo accurato, inclusivo e *non clinico* come funziona il corpo di un'atleta, come il ciclo interagisce con allenamento, energia e umore, e perché tutto questo è normale e gestibile.

**Comportamento utente.**
- Libreria di micro-contenuti (schede da 30-90 secondi, fumetti, brevi video) organizzati per tema: ciclo e fasi, energia e nutrizione, sonno, cambiamenti puberali, gestione di crampi/sintomi, come parlarne con coach/genitori.
- Contenuti **agganciati al contesto**: se l'atleta segnala spesso bassa energia in una certa fase, l'app può proporle la scheda pertinente (suggerimento, mai diagnosi).
- Tono peer-to-peer, validato da esperti (ginecologia dello sport, nutrizione, psicologia).
- Possibilità di salvare le schede preferite.

**Dati coinvolti.** Contenuti consultati, schede salvate. Eventuale segnale debole "questo tema interessa a questa atleta".

**Come restano privati.** La cronologia educativa è privata dell'atleta. I suggerimenti contestuali sono calcolati **lato atleta**; il fatto che abbia letto "crampi mestruali" non viene condiviso con nessuno. Verso la società può uscire — sempre aggregato e sopra soglia *k* — al più un dato come "i contenuti su nutrizione/energia sono molto consultati nella squadra", utile a orientare iniziative collettive, mai riconducibile a una persona.

### 2.5 Modulo prevenzione infortuni (LCA / RED-S)

**Scopo.** Ridurre il rischio di infortuni gravi (in primis LCA) e intercettare precocemente i segnali di RED-S, educando l'atleta e fornendole routine concrete — senza mai sostituirsi a un medico.

**Comportamento utente.**
- **Educazione**: perché le atlete adolescenti hanno rischio LCA più alto; come ciclo, carico e sonno modulano il rischio.
- **Routine pratiche**: programmi di riscaldamento neuromuscolare e rinforzo (es. di tipo prevenzione-infortuni), come video-guide brevi, con una piccola checklist gamificata (aggancio al Buddy).
- **Segnali RED-S**: l'app aiuta l'atleta a riconoscere segnali (ciclo che salta/scompare, fatica cronica, calo di performance) e — punto cruciale — **la indirizza verso un adulto di fiducia / professionista sanitario**. BAB *segnala e educa*, non diagnostica.
- Eventuale aggancio al check-in: assenza prolungata del ciclo + bassa energia persistente → messaggio educativo privato e suggerimento di parlarne con un medico.

**Dati coinvolti.** Adesione alle routine, contenuti consultati, e — per il rilevamento RED-S — pattern di ciclo/energia (già raccolti nel check-in, §2.2).

**Come restano privati.** Il rilevamento dei segnali RED-S avviene **sul dato individuale dell'atleta e resta con lei**: è un campanello d'allarme *per lei*, non un alert per il coach. Questo è deliberato e delicato — un segnale RED-S è un dato sanitario sensibilissimo. Verso la società può uscire soltanto, in forma aggregata e sopra soglia, l'adesione alle routine di prevenzione ("il 70% della squadra ha completato il warm-up neuromuscolare questa settimana"), che è un dato di *partecipazione*, non di salute individuale.

> **Disclaimer di prodotto.** Il modulo prevenzione è informativo/educativo. Ogni schermata che tocca segnali di salute deve includere un invito chiaro a rivolgersi a un professionista e non deve mai presentarsi come diagnosi.

### 2.6 Tracciamento energia / umore / sonno

**Scopo.** Dare all'atleta uno **specchio personale** dei propri trend (energia, umore, sonno, in relazione al ciclo e all'allenamento), così da auto-conoscersi e auto-regolarsi. È il valore "egoistico-sano" che la fa restare.

**Comportamento utente.**
- Viste a trend semplici: grafici/timeline che mostrano come energia/umore/sonno variano nel tempo e, opzionalmente, in relazione alle fasi del ciclo.
- Insight leggeri e *non prescrittivi*: "nei giorni X tendi ad avere meno energia" — osservazioni, non ordini.
- Nessun obbligo di compilare tutto: i campi non compilati semplicemente non popolano i trend.

**Dati coinvolti.** Serie storiche di energia, umore, sonno; fasi del ciclo (se l'atleta le traccia); correlazioni calcolate lato client/atleta.

**Come restano privati.** Questi sono i **dati più sensibili e i più protetti**. Vivono nel dominio dell'atleta. Gli insight personali sono calcolati per lei e mostrati solo a lei. Verso la società esce esclusivamente il contributo all'**energia media di squadra** (aggregata, sopra soglia *k*, e solo se l'atleta ha acconsentito a contribuire al dato di squadra). Umore individuale, sonno individuale e ciclo individuale **non escono mai**, in nessuna forma riconducibile.

### 2.7 Comunicazione anonima col coach

**Scopo.** Dare all'atleta un canale per segnalare al coach qualcosa che la riguarda (es. "oggi ho bisogno di un carico più leggero", "non sto bene") **senza dover esporre il motivo** né la propria identità nei dettagli di salute.

**Comportamento utente.**
- L'atleta può inviare un **segnale strutturato e anonimo** alla squadra/coach, scegliendo da opzioni predefinite e neutre (es. "scarico oggi", "ho un fastidio fisico", "ho bisogno di parlare con qualcuno"). Le opzioni sono progettate per *non rivelare* la causa (il coach non sa se è ciclo, stress, infortunio).
- Il coach riceve il segnale a livello di squadra/anonimo (es. "alcune atlete chiedono scarico oggi"), non con nome e diagnosi.
- Per situazioni che richiedono identità (es. l'atleta *vuole* parlare apertamente con il coach), il flusso è **esplicito e iniziato dall'atleta**, che sceglie consapevolmente di togliere l'anonimato per quel messaggio.

**Dati coinvolti.** Tipo di segnale (categoria neutra), timestamp, riferimento di squadra. Niente causa/diagnosi.

**Come restano privati.** Per design, la categoria del segnale **non codifica la causa sanitaria**. L'aggregazione e la soglia *k* si applicano anche qui: se una sola atleta invia un segnale, il coach lo vede come stato di squadra, non come "atleta X". L'unico caso in cui l'identità è associata è quando **l'atleta stessa la rivela volontariamente** in un messaggio diretto da lei iniziato.

> **Edge case.** La de-anonimizzazione per inferenza (squadre piccole) è un rischio reale: se la squadra ha 4 atlete, "alcune chiedono scarico" può tradire l'individuo. Mitigazione: soglia *k* configurabile, finestre temporali più ampie per squadre piccole, e — sotto soglia — *nessun* segnale mostrato al coach. Vedi §5 e §8.

### 2.8 Privacy, consenso e controllo dati

**Scopo.** Rendere il controllo dell'atleta sui propri dati **reale, visibile e reversibile** — non una clausola, ma una feature di prodotto. È il cuore della proposta di valore e del posizionamento etico di BAB.

**Comportamento utente.**
- **Centro privacy** in-app, in linguaggio teen: cosa è raccolto, dove vive, chi può vedere cosa (con la frase chiave "il coach NON vede mai i tuoi dati individuali").
- **Consensi granulari e revocabili**: l'atleta sceglie se contribuire al dato aggregato di squadra; può disattivarlo in qualunque momento (continuando a usare l'app per sé).
- **Esporta / scarica i tuoi dati** e **cancella tutto** (diritto all'oblio), con effetto reale sui backend.
- Per i **minori**, gestione del consenso conforme alla normativa (in Italia: GDPR + soglia di età per il consenso digitale; coinvolgimento del genitore dove richiesto dalla legge, *senza* per questo dare al genitore accesso ai dati di salute in chiaro).

**Dati coinvolti.** Stati di consenso, log di accesso, richieste di export/cancellazione.

**Come restano privati.** Questa feature *è* il meccanismo di privacy. Il consenso al contributo aggregato è la chiave che apre/chiude il flusso verso la società; di default è impostato in modo conservativo. Le richieste di cancellazione rimuovono il dato individuale dai backend; gli aggregati storici già calcolati e anonimi (privi di qualunque riconducibilità) possono persistere come previsto dalla normativa, ma nessun dato individuale resta.

---

## 3. Coach Dashboard (a pagamento)

La Coach Dashboard è il prodotto **B2B** che la **società paga**. La sua intera proposta di valore poggia su un paradosso virtuoso: **è preziosa proprio perché vede poco.** Il coach ottiene il battito collettivo della squadra — abbastanza per programmare meglio carichi, prevenire infortuni e ridurre il drop-out — senza mai violare la privacy delle atlete. Questo è anche ciò che rende il prodotto *vendibile alle famiglie e alle federazioni*: nessuno deve temere lo strumento.

**Regola d'oro, valida per ogni vista:** mai un dato individuale, mai un'aggregazione sotto la soglia minima *k* di atlete, mai un campo che possa de-anonimizzare per inferenza.

### 3.1 Viste e funzioni

| Vista / funzione | Cosa mostra (sempre aggregato, anonimo, sopra soglia *k*) | Cosa NON mostra mai | Valore per la società |
|---|---|---|---|
| **Semaforo di squadra** | Stato sintetico 🟢/🟡/🔴 del gruppo (es. carico/affaticamento collettivo) | Lo stato della singola atleta | Colpo d'occhio per decidere l'intensità della seduta |
| **Partecipazione** | % di atlete che hanno fatto check-in nel periodo (a livello di squadra) | Chi ha/ non ha fatto check-in | Indicatore di engagement e aderenza del gruppo |
| **Energia media squadra** | Media/trend dell'energia di gruppo nel tempo | Energia, umore, sonno individuali | Programmazione carichi, lettura della fatica collettiva |
| **Segnali di squadra** | Conteggio aggregato di segnali anonimi (es. "richieste di scarico in aumento") | La causa (ciclo? stress? infortunio?) e l'identità | Adattare l'allenamento, intercettare periodi critici |
| **Alert** | Notifiche su trend collettivi (es. "energia media in calo da 5 giorni") | Alert su singole atlete o su dati sanitari individuali | Intervento tempestivo a livello di gruppo |
| **Adesione prevenzione** | % squadra che ha completato routine warm-up/rinforzo | Chi le ha fatte e chi no | Misura dell'efficacia del programma infortuni |
| **Gestione squadra** | Crea squadre, genera codici invito, dimensione del gruppo, stato abbonamento | Qualunque dato di salute legato all'identità | Amministrazione del club |
| **Esportazioni** | Report aggregati e anonimi (PDF/CSV) per la società/federazione | Righe per singola atleta, dati sensibili | Reportistica per dirigenza/sponsor/federazione |

### 3.2 Principi di design della Dashboard

- **Soglia *k* visibile e onesta.** Quando un dato non è mostrabile perché sotto soglia, la Dashboard lo dice esplicitamente ("Servono almeno *k* check-in per mostrare questo dato, a tutela della privacy delle atlete") invece di mostrare un numero fragile. La privacy è un *feature*, comunicata come tale.
- **Niente classifiche tra atlete.** Nessuna leaderboard individuale: solo viste di gruppo.
- **Aggregazione su finestre temporali**, non istantanea, per ridurre l'inferenza.
- **Linguaggio di supporto, non di sorveglianza.** La Dashboard parla di "come sta la squadra", non di "controllo".

### 3.3 Modello di pricing (sintesi, dettaglio in doc commerciale)

L'app atleta è gratuita; la società paga per squadra/stagione l'accesso alla Coach Dashboard. La leva di vendita è **retention delle atlete** (meno drop-out), **prevenzione infortuni** (meno stop) e **immagine del club** (un club che si prende cura delle ragazze, in modo dimostrabilmente rispettoso della privacy). Il dettaglio di pricing/packaging vive nel documento commerciale, non qui.

---

## 4. Vista Genitore

Il genitore è un canale **B2C secondario**. Il design della Vista Genitore è governato da un principio scomodo ma fondante: **il genitore di un'adolescente non ha diritto, dentro BAB, ai dati di salute in chiaro della figlia.** Questo non è un difetto: è la ragione per cui l'atleta si fida dell'app e la usa davvero. Un'app che spia per conto dei genitori sarebbe disinstallata in un pomeriggio.

### 4.1 Cosa vede il genitore

| Il genitore VEDE | Il genitore NON VEDE |
|---|---|
| Risorse educative per accompagnare la figlia (ciclo, energia, RED-S, drop-out, come parlarne) | Il ciclo della figlia |
| Spiegazione del modello di privacy di BAB (cosa è protetto e perché) | L'umore / il sonno / l'energia individuali della figlia |
| Eventuale stato di benessere **aggregato di gruppo** (se l'atleta fa parte di un contesto e ha acconsentito), mai individuale | I check-in giornalieri della figlia |
| Conferma che la figlia usa uno strumento sicuro e rispettoso | I segnali anonimi inviati al coach |
| Strumenti di consenso previsti dalla legge per i minori (gestione del consenso, non accesso ai contenuti) | Le note personali, i contenuti consultati, lo stato del Buddy |

### 4.2 Perché questo confine

- **Fiducia dell'atleta.** L'adolescenza è la fase in cui l'autonomia sul proprio corpo è cruciale. Se l'app è percepita come un occhio dei genitori, fallisce nel suo scopo (combattere il drop-out e l'imbarazzo).
- **Conformità.** Per i minori, la legge richiede gestione del consenso che coinvolge chi esercita la responsabilità genitoriale — ma "gestire il consenso al trattamento" **non equivale** a "accedere ai contenuti sanitari". BAB tiene separate le due cose by design.
- **Valore comunque reale per il genitore.** Il genitore riceve educazione e tranquillità: sa che la figlia ha uno strumento serio, e impara *lui stesso* come supportarla. È un valore di accompagnamento, non di sorveglianza.

> **Edge case di prodotto.** Va gestito con attenzione il caso del genitore che pretende accesso. La risposta di prodotto è chiara e va comunicata in onboarding genitore: BAB non fornisce ai genitori i dati di salute individuali, per scelta etica e per legge; offre invece risorse e, dove l'atleta lo consente e la legge lo permette, segnali aggregati. Questo va detto *prima* che il genitore paghi, per non generare aspettative che violerebbero il vincolo.

---

## 5. Modello dati ad alto livello e confine privacy

Questa sezione descrive il modello dati **concettuale** (non lo schema fisico definitivo), con un solo obiettivo: rendere il **confine di privacy** una proprietà strutturale, non una promessa. Backend di riferimento: Supabase (Postgres + RLS).

### 5.1 Le due grandi zone

```
  DOMINIO ATLETA  (individuale · privato · di proprietà dell'atleta)
  ─────────────────────────────────────────────────────────────────
   athlete            (pseudonimo, fascia età, sport, preferenze)
   daily_checkin      (energia, umore, sonno, flag_ciclo, nota, ts)   ← SENSIBILE
   cycle_log          (fasi/eventi del ciclo)                          ← SENSIBILE
   trend_personali    (insight derivati, calcolati PER l'atleta)
   buddy_state        (stato, streak, sblocchi)
   education_history  (contenuti letti/salvati)
   reds_signals       (campanelli RED-S, PRIVATI per l'atleta)         ← SENSIBILE
   consents           (consensi granulari, revocabili)

        │
        │   ╔═══════════════════════════════════════════════╗
        │   ║   CONFINE DI PRIVACY  (gate di anonimizzazione)║
        └──▶║   • rimuove ogni identificatore                ║
            ║   • aggrega su gruppo + finestra temporale     ║
            ║   • applica soglia minima k (default 5)        ║
            ║   • richiede consenso "contribuisci a squadra" ║
            ╚═══════════════════════════════════════════════╝
        │
        ▼
  DOMINIO SQUADRA  (aggregato · anonimo · condivisibile)
  ─────────────────────────────────────────────────────────────────
   team                       (società, squadra, codice invito)
   team_participation_agg     (% check-in, n. contributi ≥ k)
   team_energy_agg            (energia media/trend di gruppo)
   team_signals_agg           (conteggi di segnali anonimi ≥ k)
   team_prevention_agg        (% adesione routine prevenzione)
   team_traffic_light         (🟢🟡🔴 derivato dagli aggregati)
```

### 5.2 La regola, in forma esplicita

| Categoria di dato | Zona | Esce verso società/genitore? | Condizione |
|---|---|---|---|
| Ciclo / fasi | Atleta | **No, mai** | — |
| Umore individuale | Atleta | **No, mai** | — |
| Sonno individuale | Atleta | **No, mai** | — |
| Energia individuale | Atleta | **No, mai** (solo come contributo a media) | — |
| Segnali RED-S | Atleta | **No, mai** | — |
| Nota personale | Atleta | **No, mai** | — |
| Stato Buddy / streak | Atleta | **No, mai** | — |
| Contenuti educativi letti | Atleta | No (solo segnale aggregato d'interesse di gruppo) | ≥ *k*, consenso |
| Energia **media di squadra** | Squadra | Sì (alla società) | ≥ *k* contributi, consenso, finestra temporale |
| % partecipazione di squadra | Squadra | Sì (alla società) | ≥ *k* |
| Conteggio segnali anonimi | Squadra | Sì (alla società) | ≥ *k* |
| % adesione prevenzione | Squadra | Sì (alla società) | ≥ *k* |
| Semaforo 🟢🟡🔴 di squadra | Squadra | Sì (società; al genitore solo se applicabile) | derivato da aggregati ≥ *k* |

### 5.3 Come il confine è *strutturale* (non solo procedurale)

- **Separazione fisica/logica delle tabelle.** I dati individuali sensibili e gli aggregati di squadra vivono in spazi distinti; la Coach Dashboard ha accesso **solo** allo spazio aggregato.
- **Row Level Security (Supabase/Postgres).** Le policy garantiscono che un'atleta veda solo i propri record; un coach veda solo gli aggregati della propria squadra; nessun ruolo coach/genitore possa interrogare la zona individuale.
- **Pipeline di aggregazione one-way.** Gli aggregati sono prodotti da job che leggono il dominio atleta e scrivono nel dominio squadra applicando soglia *k* e finestra temporale; non esiste percorso inverso che ricostruisca l'individuo.
- **Soglia *k* enforced a livello dati**, non solo UI: se i contributi sono < *k*, l'aggregato non viene nemmeno materializzato/servito.
- **Consenso come gate.** Il flag "contribuisci alla squadra" dell'atleta è una pre-condizione del flusso di aggregazione; revocarlo rimuove il contributo futuro.

---

## 6. Roadmap per fasi: MVP → V1 → V2

Strategia di sequenza: **prima dimostrare il loop emotivo e il valore privato per l'atleta** (senza cui non c'è adozione né dato), **poi** accendere il valore B2B per le società, **infine** approfondire prevenzione, insight e scala. Mercato di partenza: **Italia**.

### 6.1 MVP — "Il Buddy e il check-in che resta tuo"

**Obiettivo.** Dimostrare che un'adolescente fa il check-in ogni giorno perché *ama il Buddy*, e che il modello "i tuoi dati restano tuoi" è credibile e comprensibile. Validare retention dell'app atleta. Mettere in piedi una Coach Dashboard *minima* per il primo club pilota.

| Feature | Incluso nell'MVP |
|---|---|
| Onboarding leggero + promessa privacy | ✅ |
| Check-in giornaliero (energia/umore/sonno, flag ciclo opzionale) | ✅ |
| Buddy / loop di cura (evoluzione della demo Tamagotchi) | ✅ |
| Trend personali di base (energia/umore/sonno) | ✅ (versione semplice) |
| Centro privacy + consensi granulari + export/cancella | ✅ |
| Coach Dashboard minima: semaforo di squadra + partecipazione + energia media (con soglia *k*) | ✅ |
| Gestione squadra: codici invito, creazione squadra | ✅ |
| Educazione: prima libreria di micro-contenuti (ciclo base, energia) | ✅ (set ridotto) |

**Fuori MVP (consapevolmente):** RED-S automatizzato, comunicazione anonima strutturata avanzata, esportazioni per federazioni, vista genitore completa, insight predittivi.

**Criteri di uscita MVP:** retention D7/D30 dell'app atleta sopra soglia target; almeno 1 società pilota che usa la Dashboard; zero incidenti di privacy; comprensione del modello privacy verificata in test utente con adolescenti.

### 6.2 V1 — "Valore per la società + cura più profonda per l'atleta"

**Obiettivo.** Rendere la Coach Dashboard un prodotto *vendibile* (B2B) e arricchire l'app atleta su prevenzione e comunicazione, mantenendo intatto il confine privacy. Avvio della monetizzazione.

| Feature | V1 |
|---|---|
| Comunicazione anonima col coach (segnali strutturati neutri) | ✅ |
| Modulo prevenzione infortuni (educazione LCA + routine + checklist gamificata) | ✅ |
| Adesione prevenzione aggregata in Dashboard | ✅ |
| Segnali/alert di squadra in Dashboard (trend collettivi) | ✅ |
| Esportazioni aggregate/anonime (PDF/CSV) | ✅ |
| Vista Genitore (educazione + modello privacy + consenso minori) | ✅ |
| Libreria educativa estesa + suggerimenti contestuali | ✅ |
| Trend personali con relazione ciclo↔energia/umore | ✅ |
| Pricing/abbonamento società attivo | ✅ |

**Criteri di uscita V1:** prime società paganti; NPS coach positivo; nessun caso di de-anonimizzazione; vista genitore compresa e accettata (non genera richieste di accesso ai dati individuali).

### 6.3 V2 — "Prevenzione intelligente e scala"

**Obiettivo.** Approfondire il valore sanitario (sempre lato atleta), migliorare gli insight, e preparare la scala (oltre l'Italia, più sport, integrazioni).

| Feature | V2 |
|---|---|
| Rilevamento RED-S assistito (campanelli privati + rinvio a professionista) | ✅ |
| Insight personali avanzati per l'atleta (pattern energia/ciclo/carico) | ✅ |
| Integrazioni opzionali (es. wearable per sonno/HR), sempre con dato che resta dell'atleta | ✅ (esplorativa) |
| Personalizzazione avanzata del Buddy + nuovi loop educativi | ✅ |
| Strumenti società avanzati (più squadre, più stagioni, reportistica federazioni) | ✅ |
| Localizzazione/espansione oltre Italia | ✅ (avvio) |
| Eventuale tier B2C genitore premium (solo educazione/accompagnamento) | ✅ (valutazione) |

**Criteri di uscita V2:** efficacia misurabile su drop-out/aderenza in coorti pilota; pipeline RED-S validata clinicamente come *educativa/di rinvio*, mai diagnostica; impianto pronto per nuovi mercati.

### 6.4 Vista d'insieme della roadmap

```
   MVP                          V1                          V2
   ───                          ──                          ──
   Buddy + check-in        →    Comunicazione anonima  →    RED-S assistito (privato)
   Trend personali base    →    Modulo prevenzione      →    Insight avanzati
   Privacy/consenso        →    Vista Genitore          →    Integrazioni wearable
   Dashboard minima        →    Esportazioni + alert     →    Strumenti club avanzati
   1 club pilota           →    Prime società paganti    →    Scala / oltre Italia

   [Validare adozione]          [Validare monetizzazione]    [Validare efficacia + scala]
```

---

## 7. Prioritizzazione (RICE + MoSCoW)

Usiamo **due lenti complementari**: **MoSCoW** per dire cosa *deve* esserci in una fase (taglio per timebox), e **RICE** per ordinare *all'interno* del backlog quando le risorse sono scarse.

### 7.1 Nota di metodo

- **RICE** = (Reach × Impact × Confidence) / Effort. Reach = quante persone tocca in un periodo; Impact su scala 3 / 2 / 1 / 0.5 / 0.25 (massivo→minimo); Confidence in % (100/80/50); Effort in persona-mese. Framework nato in Intercom. (ProductPlan; Intercom — §9.)
- **MoSCoW** = Must / Should / Could / Won't, per timebox. Sviluppato da Dai Clegg (1994), usato in DSDM/Agile: i "Must" sono critici, se ne salta uno la consegna è un fallimento. (Wikipedia; ProductPlan — §9.)

Le stime qui sono **direzionali** (per dare ordine e razionale), da raffinare con dati reali. Reach è espresso come quota della base atlete/società toccata dalla feature nel suo orizzonte; Effort in persona-mese indicativi.

### 7.2 Tabella RICE (backlog prioritizzato)

| # | Feature | Reach | Impact | Confidence | Effort (p-mese) | RICE ≈ | Razionale |
|---|---|---:|---:|---:|---:|---:|---|
| 1 | Buddy + loop di cura | 1.0 | 3 | 80% | 3 | **0.80** | È il motore di adozione/retention; senza, niente dato e niente funnel. Già validato dalla demo landing. |
| 2 | Check-in giornaliero leggero | 1.0 | 3 | 90% | 2 | **1.35** | Comportamento core: alimenta trend personali e aggregati. Basso effort, altissimo impatto. |
| 3 | Privacy/consenso + export/cancella | 1.0 | 3 | 90% | 2.5 | **1.08** | È la proposta di valore *e* requisito legale per minori. Non opzionale. |
| 4 | Dashboard minima (semaforo + partecipazione + energia media) | 0.3 | 3 | 70% | 4 | **0.16** | Sblocca il B2B (chi paga). Reach minore (solo società) ma impatto sul business alto. |
| 5 | Trend personali (energia/umore/sonno) | 0.9 | 2 | 80% | 2 | **0.72** | Valore "specchio" che trattiene l'atleta; effort contenuto. |
| 6 | Educazione corporea/ciclo (libreria base) | 0.9 | 2 | 70% | 3 | **0.42** | Affronta direttamente imbarazzo/drop-out; contenuti richiedono cura editoriale. |
| 7 | Modulo prevenzione infortuni (LCA, routine) | 0.7 | 3 | 60% | 4 | **0.32** | Alto impatto sanitario/di vendita; confidence più bassa (contenuti clinici da validare). |
| 8 | Comunicazione anonima col coach | 0.6 | 2 | 70% | 3 | **0.28** | Potente per agency dell'atleta; richiede design anti-deanonimizzazione. |
| 9 | Esportazioni aggregate/anonime | 0.2 | 2 | 80% | 2 | **0.16** | Leva di vendita verso dirigenze/federazioni; reach limitato. |
| 10 | Vista Genitore (educazione + consenso) | 0.4 | 1 | 70% | 2.5 | **0.11** | Importante per fiducia/conformità; impatto diretto sull'atleta basso (by design). |
| 11 | Rilevamento RED-S assistito | 0.5 | 3 | 40% | 5 | **0.12** | Altissimo valore sanitario ma confidence bassa (delicatezza clinica/etica) ed effort alto → V2. |
| 12 | Insight personali avanzati | 0.6 | 2 | 50% | 4 | **0.15** | Approfondisce il valore; meglio dopo aver raccolto dati reali → V2. |
| 13 | Integrazioni wearable | 0.3 | 1 | 50% | 5 | **0.03** | Nice-to-have, dipendenze esterne, privacy aggiuntiva → V2 esplorativa. |

> Letti insieme: i top-RICE (#2, #3, #1, #5) coincidono con il cuore dell'MVP, confermando la sequenza. La Dashboard (#4) ha RICE numerico basso ma è **strategicamente Must** perché abilita il modello di ricavo — è qui che MoSCoW corregge RICE.

### 7.3 Tabella MoSCoW per fase

| Feature | MVP | V1 | V2 |
|---|---|---|---|
| Onboarding + promessa privacy | **Must** | Must | Must |
| Check-in giornaliero | **Must** | Must | Must |
| Buddy / loop di cura | **Must** | Must | Must |
| Privacy/consenso + export/cancella | **Must** | Must | Must |
| Trend personali base | **Should** | Must | Must |
| Educazione base (ciclo/energia) | **Should** | Must | Must |
| Dashboard minima (semaforo/partecip./energia media) | **Must** | Must | Must |
| Gestione squadra (codici invito) | **Must** | Must | Must |
| Comunicazione anonima col coach | Won't (ora) | **Must** | Must |
| Modulo prevenzione infortuni | Could | **Must** | Must |
| Adesione prevenzione in Dashboard | Won't | **Should** | Must |
| Alert/segnali di squadra | Won't | **Should** | Must |
| Esportazioni aggregate/anonime | Won't | **Should** | Should |
| Vista Genitore | Won't | **Must** | Must |
| Educazione estesa + suggerimenti contestuali | Won't | **Should** | Must |
| Pricing/abbonamento società | Could | **Must** | Must |
| Rilevamento RED-S assistito | Won't | Could | **Must** |
| Insight personali avanzati | Won't | Could | **Must** |
| Integrazioni wearable | Won't | Won't | **Could** |
| Localizzazione oltre Italia | Won't | Won't | **Should** |

### 7.4 Razionale delle scelte non ovvie

- **Perché la Dashboard è Must già nell'MVP**, pur con RICE basso: senza un minimo di valore per la società, non c'è club pilota e non si può testare il modello commerciale che finanzia tutto. Resta *minima* per non rubare risorse al loop atleta.
- **Perché RED-S è V2 e non prima**: il valore è enorme ma è la feature più delicata (dato sanitario individuale, rischio di falsi positivi, dovere di rinvio a professionista). Richiede dati reali e validazione clinica/etica. Confidence bassa → si aspetta.
- **Perché la comunicazione anonima non è nell'MVP**: il design anti-deanonimizzazione (squadre piccole) richiede maturità sul confine privacy; meglio dopo aver consolidato aggregazione e soglia *k*.
- **Perché la Vista Genitore è Must in V1** ma a impatto "basso" sull'atleta: serve a *non rompere* la fiducia (gestione aspettative dei genitori paganti) e a essere conformi; il suo valore è di sistema, non di feature.

---

## 8. User stories e criteri di accettazione

Le user story qui sotto rendono concrete le feature chiave nella forma *"Come [ruolo], voglio [obiettivo], così che [valore]"*, con criteri di accettazione verificabili e — dove pertinente — il vincolo di privacy reso esplicito come criterio.

### 8.1 Atleta

**US-A1 — Check-in lampo.**
> Come atleta, voglio registrare come sto in pochi tap, così che diventi un'abitudine senza fatica.
- **Dato:** completo il check-in in ≤ 10 secondi senza digitare testo obbligatorio.
- **Dato:** posso saltare qualunque campo (incluso il flag ciclo) e il check-in si salva comunque.
- **Dato:** al termine il Buddy reagisce visibilmente (cura completata).
- **Privacy:** nessun campo del mio check-in è visibile a coach o genitore in forma individuale.

**US-A2 — Il Buddy mi tiene compagnia, non mi punisce.**
> Come atleta, voglio un Buddy che reagisca con gentilezza, così che prendermi cura di me sia piacevole e non ansiogeno.
- **Dato:** se salto un giorno, il Buddy non "muore" e non ricevo messaggi colpevolizzanti.
- **Dato:** se segnalo stanchezza, il Buddy propone riposo/idratazione, non rimprovera.
- **Dato:** le streak hanno giorni di grazia.

**US-A3 — I miei dati sono miei e lo capisco.**
> Come atleta, voglio capire chi vede cosa, così che mi fidi dell'app.
- **Dato:** in onboarding leggo, in linguaggio semplice, che il coach non vedrà mai il mio ciclo/umore individuale.
- **Dato:** nel centro privacy posso esportare e cancellare i miei dati, con effetto reale.
- **Dato:** posso attivare/disattivare in qualsiasi momento il contributo al dato aggregato di squadra.

**US-A4 — Chiedere aiuto senza esporre il motivo.**
> Come atleta, voglio segnalare al coach che oggi ho bisogno di scaricare, senza dover dire perché.
- **Dato:** scelgo da categorie neutre che non rivelano la causa (ciclo/stress/infortunio indistinguibili).
- **Dato:** il coach riceve il segnale a livello di squadra/anonimo.
- **Privacy:** se sono l'unica ad aver segnalato e la squadra è sotto soglia *k*, il segnale non viene mostrato al coach.

**US-A5 — Capire il mio corpo.**
> Come atleta, voglio vedere come variano energia/umore/sonno nel tempo, così che impari a conoscermi.
- **Dato:** vedo trend semplici, opzionalmente in relazione alle fasi del ciclo.
- **Dato:** gli insight sono osservazioni, mai ordini o diagnosi.

### 8.2 Coach / Società

**US-C1 — Il battito della squadra a colpo d'occhio.**
> Come coach, voglio vedere lo stato di benessere collettivo, così che programmi il carico della seduta.
- **Dato:** vedo un semaforo 🟢🟡🔴 di squadra e l'energia media nel tempo.
- **Privacy:** non posso in alcun modo risalire allo stato della singola atleta.
- **Dato:** se i check-in nel periodo sono < *k*, la Dashboard mi dice che il dato non è mostrabile per tutela della privacy, invece di mostrarmi un numero fragile.

**US-C2 — Capire l'aderenza.**
> Come coach, voglio sapere quante atlete partecipano, così che valuti l'engagement del gruppo.
- **Dato:** vedo la % di partecipazione a livello di squadra.
- **Privacy:** non vedo *chi* ha o non ha fatto check-in.

**US-C3 — Reportistica per la dirigenza.**
> Come responsabile di società, voglio esportare report, così che mostri il valore del programma a dirigenza/federazione.
- **Dato:** esporto PDF/CSV con soli dati aggregati e anonimi.
- **Privacy:** nessuna riga dell'export è riconducibile a una singola atleta.

### 8.3 Genitore

**US-G1 — Accompagnare senza spiare.**
> Come genitore, voglio risorse per supportare mia figlia, così che la aiuti senza invadere la sua privacy.
- **Dato:** accedo a contenuti educativi e alla spiegazione del modello di privacy.
- **Privacy:** non vedo il ciclo/umore/sonno/check-in individuali di mia figlia, e questo mi è comunicato chiaramente *prima* di un eventuale pagamento.

---

## 9. La logica del semaforo 🟢🟡🔴 in dettaglio

Il semaforo è l'output principale verso la società e merita una specifica propria, perché è il punto in cui dati sensibili individuali diventano un segnale lecito e anonimo.

### 9.1 Cosa rappresenta

Il semaforo esprime lo **stato di carico/benessere collettivo** di una squadra in una finestra temporale, **derivato esclusivamente da aggregati** (energia media, trend, partecipazione, conteggi di segnali) — mai dalla lettura di record individuali.

| Colore | Significato (livello squadra) | Lettura per il coach |
|---|---|---|
| 🟢 Verde | Energia/benessere collettivo nella norma | Si può procedere come pianificato |
| 🟡 Giallo | Segnali di affaticamento o calo collettivo | Valutare un alleggerimento, osservare |
| 🔴 Rosso | Affaticamento collettivo marcato / più segnali di scarico | Considerare scarico, ascolto, recupero |

### 9.2 Come si calcola (concettuale)

```
  Per ogni squadra, su finestra temporale W (es. ultimi 3-7 giorni):

  1. Raccogli i contributi individuali SOLO dalle atlete che hanno
     dato consenso "contribuisci alla squadra".
  2. Se numero_contributi < k  →  semaforo NON calcolato (stato "dato insufficiente").
  3. Altrimenti calcola gli aggregati: energia_media, trend_energia,
     tasso_segnali_scarico, partecipazione.
  4. Mappa gli aggregati su 🟢/🟡/🔴 con soglie definite e validate.
  5. Esponi alla Dashboard SOLO il colore e gli aggregati, mai gli input.
```

### 9.3 Garanzie anti-deanonimizzazione

- **Soglia *k*** (default 5, più alta per squadre piccole) prima di calcolare/mostrare qualunque cosa.
- **Finestra temporale**: il semaforo riflette un periodo, non un singolo giorno, riducendo la possibilità di legare un cambiamento a una persona.
- **Soppressione dei piccoli numeri** nei conteggi di segnali.
- **Nessun drill-down**: dal semaforo non si scende mai verso l'individuo. Non esiste, per costruzione, un percorso UI o dati che lo permetta.
- **Stato onesto "dato insufficiente"** comunicato come tutela, non come errore.

---

## 10. Metriche di successo e KPI per fase

Le metriche sono organizzate per fase e ancorate agli obiettivi di §6. Principio: **non misuriamo mai a scapito della privacy** — le metriche di prodotto usano gli stessi aggregati anonimi, mai dati sensibili individuali identificabili.

### 10.1 KPI MVP (adozione e fiducia)

| KPI | Cosa misura | Perché conta |
|---|---|---|
| Retention D7 / D30 app atleta | L'abitudine sta nascendo? | È il segnale che il loop Buddy+check-in funziona |
| % check-in giornaliero su utenti attivi | Aderenza al comportamento core | Senza, niente dato né funnel |
| Tempo medio di completamento check-in | Resta sotto i 10s? | Validazione della "leggerezza" |
| Comprensione del modello privacy (test utente) | Le teen capiscono "i miei dati sono miei"? | Cuore della proposta di valore |
| Club pilota attivi sulla Dashboard | Esiste valore B2B minimo? | Pre-condizione della monetizzazione |
| Incidenti di privacy | Quante violazioni del confine | Deve restare a zero |

### 10.2 KPI V1 (monetizzazione e profondità)

| KPI | Cosa misura | Perché conta |
|---|---|---|
| Società paganti / conversione pilota→pagante | Il B2B regge economicamente? | Sostenibilità del modello |
| NPS coach | La Dashboard è utile e fidata? | Retention B2B |
| Adozione modulo prevenzione | Le atlete fanno le routine? | Valore sanitario e di vendita |
| Uso comunicazione anonima | Le atlete si sentono al sicuro a segnalare? | Validazione del design anti-deanonimizzazione |
| Accettazione vista genitore | I genitori comprendono i limiti senza frustrazione? | Evita richieste che violerebbero il vincolo |

### 10.3 KPI V2 (efficacia e scala)

| KPI | Cosa misura | Perché conta |
|---|---|---|
| Effetto su drop-out (coorti pilota) | BAB riduce l'abbandono? | È la missione |
| Aderenza prevenzione → outcome infortuni | Le routine fanno differenza? | Valore clinico difendibile |
| Tasso di rinvio RED-S a professionista | Il sistema indirizza correttamente? | Sicurezza ed etica del modulo |
| Mercati/sport coperti | La scala è avviata? | Crescita |

---

## 11. Edge case e decisioni di prodotto difficili

Raccogliamo qui i casi spinosi che attraversano più feature, con la decisione di prodotto presa.

| Edge case | Rischio | Decisione di prodotto |
|---|---|---|
| **Squadra molto piccola (< *k*)** | De-anonimizzazione per inferenza | Nessun aggregato/semaforo mostrato; soglia *k* configurabile verso l'alto; messaggio onesto "dato insufficiente" |
| **Genitore che pretende accesso ai dati di salute** | Pressione a violare il vincolo | Rifiuto by design, comunicato *prima* del pagamento; si offrono educazione e (se consentito) segnali aggregati |
| **Segnale RED-S su una minore** | Dato sanitario gravissimo | Il campanello resta privato per l'atleta; l'app educa e *rinvia* a un professionista; mai alert al coach, mai diagnosi |
| **Atleta che revoca il consenso al contributo di squadra** | Buco nei dati aggregati | L'app resta pienamente usabile per lei; il suo contributo futuro esce dagli aggregati; nessuna penalizzazione |
| **Coach che vuole "vedere chi sta male"** | Conflitto col vincolo | Non è possibile per costruzione; la Dashboard parla di squadra, non di individui; nessun drill-down |
| **Richiesta di cancellazione (oblio)** | Persistenza dati individuali | Cancellazione effettiva del dato individuale; aggregati storici anonimi e non riconducibili possono persistere secondo legge |
| **Uso offline prolungato (campo senza rete)** | Perdita check-in / Buddy rotto | Check-in e Buddy funzionano offline e sincronizzano poi; conflitti risolti a favore del dato dell'atleta |
| **Atleta che vuole parlare apertamente col coach** | Tensione con l'anonimato | Flusso esplicito iniziato dall'atleta, che sceglie consapevolmente di rivelare l'identità per quel messaggio |
| **Contenuti educativi clinicamente delicati** | Disinformazione/diagnosi impropria | Validazione da esperti; disclaimer su ogni superficie sanitaria; il prodotto educa e rinvia |

---

## 12. Requisiti non-funzionali

### 12.1 Privacy e sicurezza (priorità assoluta)

- **Privacy by design e by default** (GDPR): minimizzazione, finalità limitata, default conservativi sul contributo aggregato.
- **Minori**: gestione del consenso conforme alla normativa italiana/UE per chi è sotto l'età del consenso digitale; coinvolgimento di chi esercita la responsabilità genitoriale per il *consenso*, mai per l'*accesso* ai dati di salute in chiaro.
- **Soglia *k* enforced a livello dati** (default *k* = 5, configurabile verso l'alto per squadre piccole) prima di servire qualunque aggregato; sotto soglia, nessun aggregato.
- **Difesa dalla de-anonimizzazione per inferenza**: finestre temporali, soppressione dei piccoli numeri, niente incroci di dimensioni che isolino l'individuo.
- **Separazione dei domini** dati individuale vs aggregato con **Row Level Security** (Supabase/Postgres); nessun ruolo coach/genitore può interrogare il dominio individuale.
- **Cifratura** in transito e a riposo; gestione segreti; log di accesso; nessuna vendita o condivisione di dati a terzi (posizionamento esplicito e contrattuale — è il contrario dell'industria del period-tracking, §9).
- **Diritti dell'interessato**: export e cancellazione effettivi e verificabili.
- **Niente tracker pubblicitari di terze parti** nelle superfici che toccano dati sensibili.

### 12.2 Accessibilità

- Conformità **WCAG 2.2 AA** come baseline; contrasti AA garantiti (cfr. sistema colori di brand).
- Target tocco ampi, tipografia leggibile, linguaggio semplice (lettura adatta a 13 anni).
- Supporto screen reader, navigazione da tastiera, rispetto di `prefers-reduced-motion` (le animazioni del Buddy non devono essere un ostacolo).
- Inclusività di genere/linguaggio nei contenuti; tono mai stigmatizzante.

### 12.3 Performance

- App leggera e veloce: il check-in deve *sentirsi* da 5-10 secondi, animazioni Buddy fluide su dispositivi entry-level.
- Tempi di caricamento bassi su rete mobile italiana media; budget di peso per le superfici principali.
- Aggregati Dashboard calcolati via job/batch, non a ogni richiesta, per reattività e per disaccoppiare dal dominio individuale.

### 12.4 Offline e resilienza

- Il **check-in giornaliero deve funzionare offline** e sincronizzare poi (la palestra/il campo possono non avere rete). Il loop del Buddy non deve rompersi senza connessione.
- Gestione conflitti di sync semplice e a favore del dato dell'atleta.
- Degradazione elegante: se un aggregato non è disponibile, la Dashboard lo comunica (incl. il caso "sotto soglia *k*").

### 12.5 Affidabilità e conformità operativa

- Backup e disaster recovery sul dominio dati; test di ripristino.
- Audit log degli accessi privilegiati.
- Processo di **data breach** conforme (notifica entro i termini di legge).
- Disclaimer sanitari su ogni superficie che tocca salute (il prodotto **educa e rinvia**, non diagnostica).
- Versionamento dei consensi e dell'informativa; tracciabilità delle accettazioni.

---

## 13. Glossario

| Termine | Significato in BAB |
|---|---|
| **Atleta** | Utente principale dell'app gratuita, ragazza 13-18 anni che pratica sport |
| **Buddy** | Personaggio stile Tamagotchi al centro del loop di cura; motore emotivo della retention |
| **Check-in** | Registrazione quotidiana leggera (energia/umore/sonno/flag ciclo) in 5-10 secondi |
| **Coach Dashboard** | Prodotto B2B a pagamento per la società; mostra solo aggregati anonimi |
| **Confine di privacy** | Gate strutturale che separa il dominio individuale (atleta) da quello aggregato (squadra) |
| **Dominio atleta** | Zona dei dati individuali, privati, di proprietà dell'atleta |
| **Dominio squadra** | Zona dei dati aggregati, anonimi, condivisibili con la società |
| **Drop-out** | Abbandono dello sport, frequente con la pubertà (~1 atleta su 2) |
| **LCA** | Legamento crociato anteriore; infortunio a rischio più alto nelle atlete adolescenti |
| **MoSCoW** | Framework di prioritizzazione: Must / Should / Could / Won't have |
| **RED-S** | Relative Energy Deficiency in Sport; deficit energetico cronico, spesso segnalato da irregolarità del ciclo |
| **RICE** | Framework di prioritizzazione: (Reach × Impact × Confidence) / Effort |
| **RLS** | Row Level Security (Postgres/Supabase); enforce a livello dati di chi vede cosa |
| **Semaforo 🟢🟡🔴** | Stato di benessere collettivo di squadra, unico output di salute verso la società |
| **Soglia *k*** | Numero minimo di contributi prima di calcolare/mostrare un aggregato (default 5) |

---

## 14. Fonti

**Statistiche di dominio (BAB)**
- Jones & Bishop (2024) — il **77%** delle atlete riferisce che il ciclo mestruale influenza la performance. *(Riferimento interno BAB — stats sources.)*
- Cowley et al. (2021) — solo il **~6%** della ricerca in scienze dello sport è condotta esclusivamente su donne. *(Riferimento interno BAB — stats sources.)*
- Dato di settore: **~1 atleta su 2** abbandona lo sport con la pubertà. *(Riferimento interno BAB — stats sources.)*

**Framework di prioritizzazione**
- ProductPlan — *RICE Scoring Model* (glossario): https://www.productplan.com/glossary/rice-scoring-model
- Intercom — *RICE: Simple prioritization for product managers*: https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/
- Wikipedia — *MoSCoW method*: https://en.wikipedia.org/wiki/MoSCoW_method
- ProductPlan — *MoSCoW Prioritization* (glossario): https://www.productplan.com/glossary/moscow-prioritization
- Agile Business Consortium — *MoSCoW Prioritisation (DSDM handbook)*: https://www.agilebusiness.org/dsdm-project-framework/moscow-prioritisation.html

**Design di app di check-in/journaling e benessere per teen**
- luna app — *Best mood tracking apps for teens*: https://weareluna.app/parents/guides/growing-up/best-mood-tracking-apps-for-teens/
- LifeStance Health — *Best Mood Tracking Apps (therapists' picks)*: https://lifestance.com/blog/best-mood-tracking-apps-therapists-top-choices-2026/
- NCBI/PMC — *Youth Codesign of a Mobile Phone App to Facilitate Self-Monitoring of Mood in Young People*: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5801516/
- NCBI/PMC — *User Perspectives of Mood-Monitoring Apps Available to Young People*: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7585773/

**Privacy del tracciamento mestruale e atlete (motivazione del confine privacy di BAB)**
- Oxford Open Digital Health — *Flowing data: women's views and experiences on privacy and data security when using menstrual cycle tracking apps*: https://academic.oup.com/oodh/article/doi/10.1093/oodh/oqaf011/8134275
- University of Cambridge — *Menstrual tracking app data is a 'gold mine' for advertisers that risks women's safety*: https://www.cam.ac.uk/research/news/menstrual-tracking-app-data-is-a-gold-mine-for-advertisers-that-risks-womens-safety-report
- NPR — *Period tracking apps, surveillance capitalism, health data privacy*: https://www.npr.org/transcripts/1068930998
- AthleteMonitoring — *Menstrual cycle tracker for female athletes (RED-S, LCA prevention)*: https://www.athletemonitoring.com/menstrual-cycle-tracker/

---

*Fine del documento 04. Questo è un documento vivo: ogni feature nuova va inquadrata rispetto al confine di privacy (§5) prima ancora che rispetto al RICE (§7).*

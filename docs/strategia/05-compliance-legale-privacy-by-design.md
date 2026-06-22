# 05 — Compliance legale e Privacy by Design

> ⚠️ **DISCLAIMER — Leggere prima di tutto il resto**
>
> Questo documento è una **guida operativa interna** pensata per orientare il team BAB
> nella progettazione e nelle scelte tecniche/organizzative in materia di protezione dei dati.
> **Non costituisce un parere legale** e **non sostituisce la consulenza di un avvocato
> qualificato in materia di privacy né di un DPO/RPD certificato.**
>
> Tutti i testi (informative, consensi, cookie policy, termini), le basi giuridiche scelte,
> i tempi di conservazione, le valutazioni di rischio e la DPIA qui abbozzati **devono essere
> validati legalmente prima del lancio in produzione**, e in particolare **prima di raccogliere
> qualsiasi dato di salute auto-riportato da atlete minorenni**. Le norme citate sono riportate
> in buona fede ma possono cambiare; verificare sempre la versione vigente.
>
> Stato del documento: **bozza di lavoro — da validare legalmente.**
> Titolare (provvisorio, da formalizzare): contatto `bab.community.official@gmail.com`.

---

## Perché questo documento

BAB tratta la categoria di dati più delicata che esista nel GDPR — **dati di salute (art. 9)** —
e li raccoglie dalla categoria di interessati più protetta — **minori (13–18 anni)**. Questa
combinazione colloca BAB nella fascia di **rischio privacy più alta** e fa scattare quasi
certamente l'obbligo di **DPIA** (Valutazione d'Impatto, art. 35) e probabilmente la necessità
(o forte opportunità) di un **DPO/RPD** (art. 37).

La buona notizia è che BAB nasce con un **vincolo architetturale che è esso stesso una misura di
privacy by design**: coach e genitori vedono **solo segnali aggregati e anonimi** (🟢🟡🔴), **mai**
i dati di salute individuali dell'atleta. Questa scelta non è un dettaglio di prodotto: è il
cuore della strategia di conformità e di riduzione del rischio, ed è ciò che rende il progetto
difendibile davanti al Garante e credibile davanti alle famiglie.

Questo documento serve a:

- **Mappare** tutti i trattamenti e renderli registrabili (registro art. 30).
- **Tradurre** gli obblighi normativi in **scelte concrete di ingegneria e prodotto**.
- **Dare al team una checklist di go-live** e una lista chiara di "cosa far validare dal legale".
- **Costruire l'accountability** (art. 5.2): non basta essere conformi, bisogna **dimostrarlo**.

---

## Indice

1. [Mappa dei trattamenti e dei dati (Registro art. 30)](#1-mappa-dei-trattamenti-e-dei-dati-registro-art-30)
2. [Minori: età del consenso, consenso genitoriale, verifica età, linguaggio child-friendly](#2-minori-eta-del-consenso-consenso-genitoriale-verifica-eta-linguaggio-child-friendly)
3. [Dati di salute (categoria particolare, art. 9)](#3-dati-di-salute-categoria-particolare-art-9)
4. [Privacy by Design & by Default (art. 25)](#4-privacy-by-design--by-default-art-25)
5. [DPIA — Valutazione d'Impatto (art. 35)](#5-dpia--valutazione-dimpatto-art-35)
6. [Sicurezza del trattamento (art. 32)](#6-sicurezza-del-trattamento-art-32)
7. [Consenso & Cookie (ePrivacy)](#7-consenso--cookie-eprivacy)
8. [Diritti dell'interessato, conservazione e cancellazione](#8-diritti-dellinteressato-conservazione-e-cancellazione)
9. [DPO, fornitori/DPA e trasferimenti extra-UE](#9-dpo-fornitoridpa-e-trasferimenti-extra-ue)
10. [Data breach: procedura e notifica (72h)](#10-data-breach-procedura-e-notifica-72h)
11. [Checklist di go-live legale + cosa far validare dal legale](#11-checklist-di-go-live-legale--cosa-far-validare-dal-legale)
12. [Fonti normative](#12-fonti-normative)

---

## 1. Mappa dei trattamenti e dei dati (Registro art. 30)

Il **Registro delle attività di trattamento** (art. 30 GDPR) è obbligatorio di fatto per BAB:
l'esenzione per organizzazioni < 250 dipendenti **non si applica** quando il trattamento include
**categorie particolari di dati** (salute) o riguarda **soggetti vulnerabili** in modo non
occasionale. Quindi: **BAB deve tenere il registro fin dal primo dato raccolto.**

### 1.1 Macro-trattamenti individuati

| # | Trattamento | Fase | Dati principali | Interessati |
|---|-------------|------|-----------------|-------------|
| T1 | Lead / waitlist (landing B2C atlete/famiglie) | Già live | Email, nome, eventuale ruolo/società | Atlete, genitori, simpatizzanti |
| T2 | Lead / waitlist B2B (società sportive) | Già live | Nome referente, email, società, ruolo | Dirigenti/allenatori |
| T3 | Analytics e marketing (GA4, Meta Pixel) | Già live | Identificatori online, cookie, eventi | Visitatori del sito |
| T4 | Account atleta (futura app) | Futuro | Dati anagrafici minimi, credenziali | Atlete minorenni |
| T5 | **Dati di benessere auto-riportati** | Futuro | Energia, umore, sonno, **salute mestruale** | Atlete minorenni |
| T6 | Account genitore / responsabilità genitoriale | Futuro | Anagrafica genitore, relazione col minore | Genitori/tutori |
| T7 | Account coach / società | Futuro | Anagrafica coach, ruolo nel team | Coach/staff |
| T8 | **Segnali aggregati/anonimi** (🟢🟡🔴) verso coach e genitori | Futuro | Indicatori aggregati **non individuali** | (derivato, non identificativo) |
| T9 | Supporto, comunicazioni, ticket | Futuro | Email, contenuto della richiesta | Tutti |

### 1.2 Schema di voce di registro (template da compilare per ciascun trattamento)

Per **ogni** trattamento T1–T9 il registro deve riportare:

- **Titolare** e dati di contatto; eventuale **DPO/RPD**.
- **Finalità** del trattamento.
- **Categorie di interessati** e **categorie di dati**.
- **Base giuridica** (art. 6) e, per i dati di salute, **condizione di liceità ex art. 9.2**.
- **Categorie di destinatari** (es. fornitori = responsabili ex art. 28).
- **Trasferimenti extra-UE** e relative garanzie (SCC, ecc.).
- **Termini di cancellazione** previsti (retention).
- **Descrizione generale delle misure di sicurezza** (art. 32).

### 1.3 Basi giuridiche per trattamento

| # | Finalità | Base art. 6 | Condizione art. 9 (se salute) | Note |
|---|----------|-------------|-------------------------------|------|
| T1/T2 | Gestione lead, contatto pre-lancio | **6.1.a consenso** (o 6.1.b se pre-contratto) | — | Consenso documentato al submit |
| T3 | Misurazione e marketing | **6.1.a consenso** (cookie non tecnici) | — | Gated da cookie banner |
| T4/T6/T7 | Erogazione del servizio (account) | **6.1.b contratto** (col genitore per il minore) | — | Il contratto lo stipula chi ha la responsabilità genitoriale |
| T5 | **Tracciamento benessere/salute** | **6.1.a consenso** | **9.2.a consenso esplicito** | Doppia base: consenso art. 6 + consenso esplicito art. 9 |
| T8 | Restituzione segnali aggregati | Non è dato personale se **realmente anonimo** | — | Vedi §3 e §4: l'anonimato va garantito tecnicamente |
| T9 | Supporto | **6.1.b / 6.1.f** | event. 9.2.a se emergono dati salute | Minimizzare |

> ⚠️ **Punto da far validare dal legale:** la scelta tra `6.1.a (consenso)` e `6.1.b (contratto)`
> per gli account, e in particolare **come il consenso esplicito ex 9.2.a interagisce con il
> fatto che l'interessato è minorenne** (chi lo presta, in che forma). Vedi §2.

---

## 2. Minori: età del consenso, consenso genitoriale, verifica età, linguaggio child-friendly

### 2.1 L'età del consenso digitale in Italia: 14 anni

L'**art. 8 GDPR** fissa a **16 anni** l'età per il consenso "digitale" relativo all'offerta
**diretta** di servizi della società dell'informazione basati sul **consenso (6.1.a)**, ma consente
agli Stati membri di abbassarla **fino a un minimo di 13 anni**.

L'**Italia**, con il **D.Lgs. 101/2018** (che ha adeguato il Codice Privacy, D.Lgs. 196/2003,
introducendo l'**art. 2-quinquies**), ha fissato la soglia a **14 anni**:

- **≥ 14 anni:** il minore **può** prestare validamente il consenso ai propri dati.
- **< 14 anni:** il trattamento è lecito **solo** se il consenso è **prestato o autorizzato da chi
  esercita la responsabilità genitoriale**.

### 2.2 Implicazione critica per BAB: la soglia dei 14 anni NON basta

Attenzione a due trappole frequenti:

1. **La soglia art. 8 / 14 anni vale per il consenso (6.1.a) all'offerta di servizi.** Per i
   **dati di salute** la liceità passa **comunque** dal **consenso esplicito art. 9.2.a**, che è
   un livello ulteriore e più stringente. La maturità a 14 anni per il "consenso digitale" non
   risolve automaticamente la questione del consenso *esplicito* su dati sanitari di un minore.
2. BAB raccoglie dati di salute **anche** da atlete di **13 anni** (fascia 13–18). Per le
   **tredicenni** il consenso digitale **deve provenire dal genitore/tutore** in ogni caso.

> ✅ **Scelta consigliata (da validare): consenso genitoriale per tutta la fascia 13–18 sui
> dati di salute (T5).** Data la natura sanitaria e la vulnerabilità, **non** appoggiarsi al
> solo consenso del minore quattordicenne: prevedere il **consenso/autorizzazione del genitore**
> come requisito per l'attivazione del tracciamento benessere, affiancato (per le ragazze più
> grandi, ≥14) dall'**assenso informato della minore** (modello "doppia firma"). Questo è più
> protettivo e più facile da difendere.

### 2.3 Modello operativo "doppia firma" (assenso minore + consenso genitore)

```
Flusso di attivazione account atleta minorenne
───────────────────────────────────────────────
1. La società/atleta scarica l'app → onboarding atleta.
2. L'app rileva età < 18 → richiede attivazione del "genitore garante".
3. Il genitore riceve link/codice → crea il proprio account (T6) e
   verifica la relazione con la minore.
4. Schermata di CONSENSO ESPLICITO ai dati di salute (art. 9.2.a):
   - testo child-friendly per la minore (assenso informato),
   - testo per l'adulto con tutte le info art. 13,
   - checkbox separate e granulari (vedi 2.6).
5. Solo dopo entrambi gli atti → si abilita T5 (tracciamento benessere).
6. Registrazione PROVA del consenso (chi, quando, quale versione del testo).
```

### 2.4 Verifica dell'età (age assurance)

Il titolare deve compiere **ogni sforzo ragionevole**, **proporzionato** alla natura e ai rischi
del trattamento, per **verificare** che l'utente abbia l'età dichiarata e che il consenso
genitoriale sia autentico. L'**EDPB** ha posto principi di *age assurance*: rispetto di tutti i
diritti fondamentali, **interesse superiore del minore**, liceità/correttezza/trasparenza,
**minimizzazione** (non trasformare la verifica dell'età in una sorveglianza invasiva).

Tecniche, dalla più leggera alla più robusta (scegliere in proporzione al rischio):

| Tecnica | Robustezza | Invasività | Note per BAB |
|---------|-----------|------------|--------------|
| Auto-dichiarazione (data di nascita) | Bassa | Minima | Insufficiente da sola per dati salute |
| Verifica via genitore (codice/link/email) | Media | Bassa | **Consigliata**: lega l'attivazione all'adulto |
| Conferma del rapporto società↔atleta | Media | Bassa | BAB ha il canale "società" → sfruttarlo |
| Verifica documentale / terza parte | Alta | Alta | Sproporzionata in fase iniziale, evitare |

> ✅ **Approccio BAB consigliato:** combinare **auto-dichiarazione età + attivazione obbligatoria
> del genitore + (dove possibile) il legame con la società sportiva**. Questo dà robustezza senza
> raccogliere documenti d'identità di minori (che sarebbe esso stesso un trattamento ad alto rischio).

### 2.5 Trasparenza child-friendly

Il GDPR (Considerando 58 e art. 12) impone che le informazioni rivolte ai minori siano in
**linguaggio chiaro e semplice**, comprensibile. Concretamente per BAB:

- **Due livelli di informativa**: una versione "per te" (per la ragazza, breve, concreta,
  seconda persona, senza legalese) e una versione completa per l'adulto.
- **Icone e micro-spiegazioni** ("Perché ti chiediamo questo?", "Chi vede questo dato?").
- **Messaggio-chiave ripetuto e onesto:** *"Le tue risposte su umore, sonno, energia e ciclo
  restano private. Il tuo coach e i tuoi genitori vedono solo un semaforo del team, mai i tuoi
  dati personali."* — è il cuore della fiducia ed è anche **vero** grazie all'architettura (§3).
- **Niente dark pattern**: i pulsanti "Accetta" e "Più tardi/No" devono avere lo stesso peso visivo.

### 2.6 Granularità dei consensi (esempio di checkbox)

```
[ ] Confermo di avere letto l'informativa (versione per famiglie).        (obbligatorio)
[ ] (Genitore) Autorizzo il trattamento dei dati di benessere/salute di
    mia/o figlia/o per le finalità di monitoraggio descritte. — ART. 9.2.a (obbligatorio per T5)
[ ] (Atleta ≥14) Ho capito e sono d'accordo a registrare come mi sento.    (assenso)
[ ] Voglio ricevere comunicazioni/novità via email.                        (FACOLTATIVO, separato)
```

Regole: consensi **separati per finalità**, **mai pre-spuntati**, il consenso facoltativo
(marketing) **non** può essere condizione per usare il servizio (no "consenso forzato").

---

## 3. Dati di salute (categoria particolare, art. 9)

### 3.1 Cosa rende "salute" i dati BAB

L'**art. 9.1** vieta in linea di principio il trattamento dei dati relativi alla **salute** (e
alla vita sessuale). I dati BAB di T5 — energia, umore, **sonno**, **salute mestruale** —
rientrano nei **dati relativi alla salute** (la salute mestruale è inequivocabilmente dato
sanitario; umore/sonno/energia auto-riportati nel contesto di un'app di benessere sono
ragionevolmente trattati come dati sulla salute → approccio prudenziale: **trattarli tutti come
art. 9**).

### 3.2 Condizione di liceità: consenso esplicito (art. 9.2.a)

Il divieto dell'art. 9.1 cade se ricorre una delle condizioni del 9.2. Per BAB la via naturale è
il **consenso esplicito (9.2.a)** per **finalità specifiche**. "Esplicito" significa un atto
**chiaro e affermativo dedicato**, tipicamente **scritto/checkbox dedicata** con dichiarazione
espressa — **non** un consenso generico annegato nei Termini. Per i minori: prestato/autorizzato
dal genitore (vedi §2.2).

### 3.3 Minimizzazione e cautele

- **Raccogliere solo ciò che serve** alla finalità dichiarata. Se una metrica non alimenta né il
  valore per l'atleta né il segnale aggregato, **non raccoglierla**.
- **Granularità temporale minima**: non serve geolocalizzazione, non servono note di testo libere
  con potenziali dettagli clinici (o, se presenti, isolarle e proteggerle).
- **Niente diagnosi, niente consigli medici**: BAB è **benessere**, non dispositivo medico. Chiarirlo
  nei Termini per evitare di scivolare in ambito sanitario regolamentato (MDR).
- **Separazione logica** dei dati art. 9 dal resto (tabelle/schema dedicati, accessi ristretti).

### 3.4 Perché "solo aggregati per coach/genitori" riduce drasticamente il rischio

Questa è **la** misura di privacy by design di BAB. Effetti concreti:

- **Coach e genitori non sono destinatari di dati di salute individuali.** Vedono **T8**:
  un indicatore **aggregato di team** (🟢🟡🔴). Se T8 è **realmente anonimo/aggregato**, **non è
  dato personale** e quindi esce dal perimetro GDPR per quei destinatari.
- **Riduce la superficie di esposizione**: il dato individuale resta confinato nell'app
  dell'atleta + backend cifrato, non "viaggia" verso adulti.
- **Riduce il rischio di re-identificazione e di pressione sociale** sull'atleta (es. un coach
  che vede "umore basso" della singola → conseguenze reali). L'aggregazione **protegge la persona**,
  non solo il dato.

> ⚠️ **Attenzione: "aggregato" deve essere vero, non cosmetico.** Con team piccoli, un semaforo
> "di squadra" calcolato su **poche** atlete può essere **re-identificabile** (es. squadra di 3
> ragazze, due verdi e una rossa → si capisce chi). Vedi mitigazioni in §4.4. **Questo è uno dei
> rischi-chiave da analizzare nella DPIA.**

---

## 4. Privacy by Design & by Default (art. 25)

L'**art. 25** impone due obblighi paralleli: **by design** (misure tecniche/organizzative
integrate *fin dalla progettazione* dei mezzi) e **by default** (di default si trattano **solo**
i dati necessari per ciascuna finalità: volume, conservazione, accessibilità). Le **Linee guida
EDPB 4/2019** elencano misure esemplificative: pseudonimizzazione, minimizzazione, default
restrittivi, possibilità per l'interessato di intervenire, ecc.

### 4.1 Cosa BAB sceglie di NON raccogliere (data minimization by default)

- ❌ Documenti d'identità dei minori.
- ❌ Geolocalizzazione precisa.
- ❌ Note di testo libero clinicamente sensibili (o, se presenti, opzionali e isolate).
- ❌ Dati di salute *individuali* verso coach/genitori (**mai**).
- ❌ Profilazione pubblicitaria sui minori.

### 4.2 Default privacy-friendly

| Impostazione | Default BAB |
|--------------|-------------|
| Visibilità del dato individuale | Solo l'atleta (e backend) — **mai** condiviso di default |
| Cookie non tecnici | **Disattivati** finché non c'è consenso (vedi §7) |
| Comunicazioni marketing | **Off** di default (opt-in separato) |
| Condivisione verso coach/genitori | **Solo segnale aggregato**, mai dato grezzo |
| Conservazione | Tempo minimo necessario, poi cancellazione/anonimizzazione |

### 4.3 Misure by design lato architettura

- **Separazione netta** tra dati identificativi e dati di salute (schema/tabelle distinte,
  riferimenti pseudonimizzati dove possibile).
- **Il calcolo del segnale aggregato (T8) avviene server-side** e produce **solo** l'indicatore
  di team; il dato individuale **non** viene esposto via API ai ruoli coach/genitore (a livello di
  query e di RLS, vedi §6).
- **Endpoint distinti per ruolo**: l'API che serve il coach **non ha alcun percorso** per ottenere
  righe individuali di salute.

### 4.4 Soglia di k-anonimato per i segnali aggregati (mitigazione re-identificazione)

Per garantire che T8 sia **veramente** anonimo:

- **Soglia minima di gruppo (k):** non mostrare un segnale aggregato se il gruppo ha meno di
  **k** atlete che hanno risposto (es. **k ≥ 5**). Sotto soglia → mostrare "dati insufficienti".
- **Niente sotto-aggregati a rischio** (es. evitare segnali per fasce troppo strette che isolino
  individui).
- **Nessun trend a granularità tale** da permettere di "seguire" la singola atleta nel tempo.
- Documentare la scelta di *k* e testarla nella DPIA con scenari di team piccoli.

---

## 5. DPIA — Valutazione d'Impatto (art. 35)

### 5.1 Per BAB la DPIA è (quasi certamente) obbligatoria

L'art. 35.3 e i criteri WP29/EDPB rendono la DPIA obbligatoria, tra l'altro, per:

- **Trattamento su larga scala di categorie particolari** (salute) — art. 35.3.b.
- **Dati di soggetti vulnerabili** (minori) trattati in modo non occasionale.
- Combinazione di più criteri ad alto rischio (l'EDPB indica che **≥2 criteri** → DPIA dovuta).

BAB cumula: **dati di salute + minori + (prospetticamente) larga scala + valutazione di aspetti
personali (umore/benessere) + uso di nuove tecnologie (app)**. → **DPIA obbligatoria**, da
svolgere **prima** dell'avvio del trattamento T5 e da **aggiornare** (processo continuo, non
una-tantum). Se il rischio residuo resta alto nonostante le misure → **consultazione preventiva
del Garante** (art. 36).

> ℹ️ La DPIA va fatta **anche** se in dubbio: documentare la valutazione (anche la decisione di
> "non serve") fa parte dell'accountability.

### 5.2 Outline / bozza di DPIA per BAB

**A. Descrizione sistematica del trattamento (art. 35.7.a)**
- Finalità: monitoraggio benessere auto-riportato a beneficio dell'atleta; segnali aggregati al team.
- Natura: app mobile + backend (Supabase) + landing.
- Ambito: atlete 13–18, Italia first; volume previsto (stimare N).
- Contesto: relazione asimmetrica (minore vs titolare; atleta vs società/coach).
- Dati: anagrafici minimi, **salute (energia, umore, sonno, ciclo)**, identificatori tecnici.
- Flussi: vedi diagramma 5.3.

**B. Necessità e proporzionalità (art. 35.7.b)**
- Base giuridica: 6.1.a/6.1.b + **9.2.a consenso esplicito** (genitore + assenso minore).
- Minimizzazione: cosa NON si raccoglie (§4.1).
- Limitazione conservazione: retention definita (§8).
- Diritti interessato: come esercitabili (§8).
- Misure verso i responsabili (DPA con fornitori, §9).

**C. Valutazione dei rischi per i diritti e le libertà (art. 35.7.c)**

| Rischio | Probabilità | Impatto | Mitigazione |
|---------|-------------|---------|-------------|
| Re-identificazione via segnale aggregato (team piccoli) | Media | Alto | k-anonimato (§4.4), soglia "dati insufficienti" |
| Accesso non autorizzato ai dati salute | Media | Molto alto | RLS, cifratura, MFA, minimo privilegio (§6) |
| Coach/genitore vede dato individuale | Bassa (by design) | Molto alto | Endpoint per ruolo, RLS, niente API individuali |
| Consenso non valido/genitoriale falsificato | Media | Alto | Flusso doppia firma + verifica via genitore (§2) |
| Data breach presso fornitore | Bassa | Alto | DPA, cifratura at-rest, procedura breach (§10) |
| Profilazione/uso secondario indebito | Bassa | Alto | Divieto di marketing su minori, finalità vincolate |
| Conservazione oltre il necessario | Media | Medio | Cancellazione automatica, retention policy |

**D. Misure per affrontare i rischi (art. 35.7.d)**
- Tecniche: §6 (sicurezza), §4 (by design), §4.4 (k-anonimato).
- Organizzative: formazione, ruoli, procedura breach, contratti DPA.
- **Coinvolgere il DPO** (parere, art. 35.2) e, ove opportuno, raccogliere il **parere degli
  interessati** (art. 35.9): es. consultare famiglie/società pilota.

**E. Esito**
- Rischio residuo accettabile? Sì → procedere documentando.
- No → **art. 36 consultazione preventiva del Garante** prima del lancio.

### 5.3 Diagramma di flusso dei dati (testuale)

```
ATLETA (app)
  │  inserisce: energia, umore, sonno, ciclo  [DATO SALUTE — art.9]
  ▼
BACKEND (Supabase, UE)
  ├─ archivia dato individuale  → tabella SALUTE (RLS: solo l'atleta + service ristretto)
  ├─ calcola aggregato di team  → applica k-anonimato (k≥5)
  ▼
SEGNALE AGGREGATO 🟢🟡🔴  [NON personale se realmente anonimo]
  ├─► COACH  (vede solo semaforo team, mai righe individuali)
  └─► GENITORE (vede solo semaforo team / stato sintetico, mai dato grezzo)

ANALYTICS (GA4/Meta)  ← solo landing, gated da consenso cookie, MAI dati salute
```

---

## 6. Sicurezza del trattamento (art. 32)

L'**art. 32** impone misure **adeguate al rischio**; cita esplicitamente **cifratura** e
**pseudonimizzazione**, **riservatezza/integrità/disponibilità/resilienza**, capacità di
**ripristino** e **test periodici**. Per dati di salute di minori il livello richiesto è **alto**.

### 6.1 Cifratura

- **In transito:** HTTPS/TLS ovunque (landing, app, API). Forzare HSTS.
- **At-rest:** cifratura del database e dei backup (Supabase/Postgres offre cifratura at-rest;
  verificare e documentarla nel registro e nella DPIA).
- **Segreti applicativi:** mai chiavi nel client. La `anon key` di Supabase è pubblica per design
  **ma** la sicurezza dipende **interamente dalle RLS** (vedi 6.3). La `service_role key` **non
  deve mai** finire nel frontend.

> ✅ La cifratura at-rest ha anche un effetto sul §10: secondo l'art. 34, se i dati erano resi
> **incomprensibili** (cifrati) a chi non autorizzato, può venire meno l'obbligo di **comunicare**
> il breach agli interessati. È quindi una misura a doppio valore.

### 6.2 Controllo accessi e minimo privilegio

- **MFA obbligatoria** per ogni account amministrativo (Supabase dashboard, Vercel, Google, Meta,
  email titolare).
- **Ruoli applicativi distinti** (atleta / genitore / coach / admin) con permessi minimi.
- **Nessun account condiviso**; revoca accessi al turnover; log degli accessi amministrativi.

### 6.3 RLS su Supabase (il pilastro tecnico di BAB)

Le **Row Level Security policies** sono ciò che traduce in codice la promessa "il coach non vede
il dato individuale". Principi:

```
-- Esempio concettuale (DA ADATTARE, non copiare in produzione senza verifica)

-- 1) Abilitare RLS su OGNI tabella con dati personali/salute
ALTER TABLE wellbeing_entries ENABLE ROW LEVEL SECURITY;

-- 2) L'atleta vede SOLO le proprie righe
CREATE POLICY athlete_owns_rows ON wellbeing_entries
  FOR SELECT USING (auth.uid() = athlete_id);

-- 3) NESSUNA policy che dia a coach/genitore SELECT sulle righe individuali di salute.
--    I coach/genitori accedono SOLO a viste/funzioni che restituiscono l'aggregato.

-- 4) Vista/funzione aggregata con soglia k-anonimato (server-side)
--    restituisce il semaforo SOLO se COUNT(distinct athlete) >= k.
```

Regole operative RLS:

- **RLS abilitata di default su tutte le tabelle** (anche quelle "innocue"): default deny.
- **Testare le policy** con utenti di ruoli diversi (test automatici di accesso negato).
- **`service_role` bypassa le RLS** → usarla solo in backend fidato, mai esporla.
- Le **viste aggregate** non devono permettere di "ricostruire" il dato individuale.

### 6.4 Gestione segreti

- Variabili d'ambiente fuori dal repo (`.env` in `.gitignore`); segreti in Vercel/host.
- **Rotazione** delle chiavi; revoca immediata in caso di sospetto leak.
- Scansione del repo per evitare commit accidentali di chiavi.

### 6.5 Backup, disponibilità, resilienza, test

- Backup **automatici e cifrati**; test periodico di **ripristino** (un backup non testato non esiste).
- Definire **RPO/RTO** minimi.
- **Logging e monitoraggio** di accessi anomali; alerting.
- **Test/verifiche periodiche** delle misure (art. 32.1.d): non solo a go-live.

### 6.6 Implementazione passo-passo (sintesi)

1. Abilitare TLS/HSTS ovunque; verificare cifratura at-rest del DB e dei backup.
2. RLS **enabled + default deny** su tutte le tabelle; scrivere e **testare** le policy per ruolo.
3. Separare schema dati salute; nessuna API individuale per coach/genitore.
4. MFA su tutti gli account admin; minimo privilegio; rimuovere `service_role` dal client.
5. Implementare la soglia **k-anonimato** lato server per i segnali aggregati.
6. Backup cifrati + test di ripristino + logging/alerting.
7. Registrare tutte queste misure nel **registro (§1)** e nella **DPIA (§5)**.

---

## 7. Consenso & Cookie (ePrivacy)

Quadro: **Direttiva ePrivacy 2002/58/CE** (lex specialis) + **GDPR** + **Linee guida cookie del
Garante del 10 giugno 2021**.

### 7.1 Principi del banner (Garante 2021)

- I cookie/strumenti **non tecnici** (analytics non anonimizzati, marketing) richiedono
  **consenso preventivo**; di **default sono bloccati** (privacy by default).
- **No scrolling come consenso**; **no cookie wall**.
- Il banner deve avere: informativa breve + link alla cookie policy estesa, pulsante **Accetta**,
  pulsante **Rifiuta** (o **X** in alto a destra = rifiuto), e accesso alle **scelte granulari**.
- **Granularità**: poter scegliere per categoria/finalità/soggetto (prima vs terze parti).
- **"Accetta" e "Rifiuta" con pari peso visivo** (no dark pattern).
- **Revoca facile** in qualunque momento (link sempre raggiungibile).
- Ricontattare per nuovo consenso **non prima di 6 mesi**, salvo cambi rilevanti.

### 7.2 GA4 / Meta Pixel

- **GA4 e Meta Pixel restano disattivati finché l'utente non acconsente** (gating reale: gli
  script non devono partire prima del consenso — verificare l'implementazione effettiva).
- I cookie analytics possono essere equiparati ai **tecnici** (quindi senza consenso) **solo** se
  adeguatamente **minimizzati/anonimizzati** (IP mascherato, no incrocio con altri trattamenti,
  no identificazione diretta). In dubbio → trattarli come **soggetti a consenso**.
- **Meta Pixel** è marketing/profilazione → **sempre consenso**.
- **Sui minori**: non fare profilazione pubblicitaria. Sulla landing pubblica il pubblico è misto;
  nell'**app** delle atlete **non** inserire pixel marketing.

### 7.3 Mappatura consensi (esempio)

| Strumento | Categoria | Serve consenso? | Default |
|-----------|-----------|-----------------|---------|
| Cookie di sessione/funzionali | Tecnico | No | Attivo |
| GA4 (anonimizzato) | Analytics | Solo se NON pienamente anonimizzato | Off finché incerto |
| Meta Pixel | Marketing/profilazione | **Sì** | **Off** |

### 7.4 Documentazione del consenso

Per ogni consenso (cookie e art. 9): **registrare chi/quando/quale versione del testo** e
**rendere la revoca semplice**. La prova del consenso è parte dell'accountability.

---

## 8. Diritti dell'interessato, conservazione e cancellazione

### 8.1 Diritti (artt. 15–22) e gestione operativa

| Diritto | Art. | Come BAB lo gestisce |
|---------|------|----------------------|
| Accesso | 15 | Esportazione dei dati dell'atleta su richiesta verificata |
| Rettifica | 16 | Modifica self-service in app dove possibile |
| Cancellazione ("oblio") | 17 | Cancellazione account + dati salute; rilevante perché dati dati da minore |
| Limitazione | 18 | Sospensione del trattamento su richiesta |
| Portabilità | 20 | Export in formato strutturato/leggibile |
| Opposizione | 21 | Stop a trattamenti su base legittimo interesse/marketing |
| No decisioni automatizzate | 22 | BAB **non** prende decisioni automatizzate con effetti giuridici sui minori |

Operativamente:

- **Canale unico** per le richieste: `bab.community.official@gmail.com` (da formalizzare; valutare
  un indirizzo dedicato es. `privacy@…`).
- **Verifica dell'identità** del richiedente (e, per i minori, della responsabilità genitoriale)
  prima di evadere — senza raccogliere dati eccessivi.
- **Tempo di risposta: 1 mese** (art. 12.3), prorogabile.
- **Diritto all'oblio rafforzato** quando i dati erano stati conferiti da minore (Considerando 65):
  facilitare la cancellazione.

### 8.2 Conservazione (retention) — bozza da validare

| Dato | Conservazione proposta | Poi |
|------|------------------------|-----|
| Lead/waitlist (T1/T2) | Fino a lancio + X mesi, o revoca consenso | Cancellazione |
| Dati salute (T5) | Durata del rapporto + periodo minimo | Cancellazione/anonimizzazione |
| Account inattivi | Dopo N mesi di inattività | Avviso + cancellazione |
| Log di sicurezza | Periodo tecnico minimo | Cancellazione |
| Prove di consenso | Per tutta la durata + periodo difensivo | Cancellazione |

Principio: **limitazione della conservazione (art. 5.1.e)** → cancellare/anonimizzare appena la
finalità è esaurita. Preferire **cancellazione automatica** schedulata.

---

## 9. DPO, fornitori/DPA e trasferimenti extra-UE

### 9.1 Serve il DPO/RPD? (art. 37)

Il DPO è **obbligatorio** quando l'attività **principale** consiste in **trattamento su larga
scala di categorie particolari** (salute) o in **monitoraggio regolare e sistematico** su larga
scala. BAB, una volta a regime, **rientra plausibilmente in entrambe** le ipotesi (il monitoraggio
del benessere è regolare e sistematico). Inoltre il **Garante raccomanda fortemente** il DPO
quando gli interessati sono **vulnerabili (minori)**.

> ✅ **Conclusione operativa:** prevedere la **nomina di un DPO/RPD** (interno o esterno) **prima
> del lancio dell'app**. Anche se si concludesse che non è strettamente obbligatorio in fase
> embrionale, **documentare la valutazione** (art. accountability) e propendere per il **sì**.

### 9.2 Fornitori = responsabili del trattamento (art. 28) → servono i DPA

Ogni fornitore che tratta dati per conto di BAB è **responsabile** e richiede un **Data Processing
Agreement (DPA)** ex art. 28.

| Fornitore | Ruolo | DPA | Note trasferimenti |
|-----------|-------|-----|--------------------|
| **Supabase** | Hosting DB/backend (responsabile) | DPA da sottoscrivere | **Scegliere region UE**; verificare sub-processor (es. AWS) e SCC |
| **Vercel** | Hosting frontend | DPA da sottoscrivere | Verificare edge/region e garanzie trasferimenti |
| **Google (GA4)** | Analytics | DPA Google | Trasferimenti USA → meccanismo adeguato (es. DPF/SCC) |
| **Meta (Pixel)** | Marketing | DPA Meta | Trasferimenti USA → idem; **non** usare su minori |
| **Provider email** | Comunicazioni | DPA | Verificare UE/garanzie |

### 9.3 Trasferimenti extra-UE (artt. 44–49)

- **Default BAB: tenere i dati di salute in UE.** Configurare Supabase in **region UE** e
  preferire fornitori/sub-processor UE per T4–T7.
- Dove il trasferimento USA è inevitabile (analytics): assicurarsi di un **meccanismo valido**
  (adeguatezza/Data Privacy Framework o **SCC** con misure supplementari) e documentarlo.
- **Mai** trasferire dati di salute individuali fuori dal perimetro cifrato/UE senza base solida.

---

## 10. Data breach: procedura e notifica (72h)

Quadro: **art. 33** (notifica al Garante) e **art. 34** (comunicazione agli interessati).

### 10.1 Regole-chiave

- **Notifica al Garante** "senza ingiustificato ritardo e, ove possibile, **entro 72 ore**" da
  quando il titolare **viene a conoscenza** della violazione, **salvo** che sia improbabile un
  rischio per diritti e libertà.
- **Comunicazione agli interessati** se il rischio è **elevato** (art. 34) — e con dati di salute
  di minori il rischio è facilmente "elevato". **Eccezione**: non serve se i dati erano resi
  **incomprensibili** (es. **cifrati**) o se misure successive hanno scongiurato il rischio.
- **Registro interno delle violazioni**: tutte le violazioni vanno **documentate**, anche quelle
  non notificate (art. 33.5).

### 10.2 Procedura operativa (runbook)

```
T0  RILEVAZIONE → chiunque nel team apra immediatamente un "incident".
T0  CONTENIMENTO → isolare, revocare chiavi compromesse, bloccare accessi.
+   VALUTAZIONE → quali dati? quante atlete? salute? minori? cifrati?
+   DECISIONE RISCHIO (con DPO):
      - rischio improbabile → registra, non notifica
      - rischio presente    → NOTIFICA Garante entro 72h
      - rischio ELEVATO     → notifica Garante + COMUNICA agli interessati
≤72h NOTIFICA al Garante (anche parziale/incrementale se non hai tutto).
+   COMUNICAZIONE agli interessati (linguaggio chiaro; per minori → anche ai genitori).
+   REGISTRAZIONE nel registro violazioni (fatti, effetti, rimedi).
+   POST-MORTEM → cause, correzioni, aggiornamento misure/DPIA.
```

### 10.3 Contenuto minimo della notifica (art. 33.3)

Natura della violazione, categorie/numero approssimativo di interessati e di record, contatti
del DPO, conseguenze probabili, misure adottate/proposte per attenuare gli effetti.

> ⚠️ La cifratura at-rest (§6.1) è la migliore polizza: può eliminare l'obbligo di **comunicare**
> agli interessati ex art. 34. Motivo in più per non rimandarla.

---

## 11. Checklist di go-live legale + cosa far validare dal legale

### 11.1 Checklist tecnico-organizzativa (prima dell'app con dati salute)

- [ ] **Registro art. 30** compilato per T1–T9.
- [ ] **DPIA (art. 35)** redatta, con esito e misure; valutata l'eventuale **consultazione Garante (art. 36)**.
- [ ] **Base giuridica** chiara per ogni trattamento; **9.2.a consenso esplicito** per T5.
- [ ] **Flusso consenso minori** "doppia firma" (genitore + assenso atleta) implementato.
- [ ] **Verifica età** proporzionata (auto-dichiarazione + attivazione genitore + legame società).
- [ ] **Informativa child-friendly** + informativa completa per adulti.
- [ ] **RLS abilitata (default deny)** su tutte le tabelle; **policy testate** per ruolo.
- [ ] **Nessuna API/vista** che esponga dati salute individuali a coach/genitori.
- [ ] **k-anonimato (k≥5)** sui segnali aggregati, testato su team piccoli.
- [ ] **Cifratura** in transito e at-rest (DB + backup) verificata.
- [ ] **MFA** su tutti gli account admin; `service_role` fuori dal client.
- [ ] **Backup cifrati + test di ripristino**; logging/alerting attivi.
- [ ] **Cookie banner** conforme (default off, Accetta/Rifiuta pari peso, granularità, revoca).
- [ ] **GA4/Meta** gated dal consenso; **nessun pixel marketing nell'app** delle atlete.
- [ ] **DPA** firmati con Supabase, Vercel, Google, Meta, provider email.
- [ ] **Region UE** per i dati di salute; trasferimenti extra-UE coperti (SCC/DPF).
- [ ] **Procedura data breach** + registro violazioni pronti.
- [ ] **Procedure diritti interessato** + canale dedicato + tempi (1 mese).
- [ ] **Retention policy** con cancellazione automatica.
- [ ] **DPO/RPD** nominato (o decisione motivata documentata).

### 11.2 Cosa far validare dal legale/DPO (NON improvvisare)

- [ ] Testi di **Informativa privacy, Cookie policy, Termini** (italiano).
- [ ] **Formulazione del consenso esplicito art. 9.2.a** e dei consensi granulari.
- [ ] **Modello di consenso/autorizzazione genitoriale** e gestione della responsabilità genitoriale.
- [ ] Scelta **base giuridica** account (6.1.a vs 6.1.b) e interazione con i minori.
- [ ] **DPIA**: revisione e firma; valutazione consultazione preventiva (art. 36).
- [ ] **Retention** e politiche di cancellazione.
- [ ] **DPA e trasferimenti extra-UE** (adeguatezza dei meccanismi).
- [ ] **Qualificazione del prodotto**: confermare che BAB **non** sia dispositivo medico (MDR).
- [ ] **Obbligo/opportunità del DPO** e formalizzazione del **titolare** del trattamento.

---

## 12. Fonti normative

### Normativa primaria

- **GDPR — Reg. (UE) 2016/679**: art. 5 (principi), art. 6 (liceità), **art. 8** (condizioni
  consenso minori), **art. 9** (categorie particolari/salute), **art. 25** (privacy by design/default),
  **art. 28** (responsabili/DPA), **art. 30** (registro), **art. 32** (sicurezza), **art. 33–34**
  (data breach), **art. 35–36** (DPIA/consultazione), **art. 37** (DPO), artt. 15–22 (diritti),
  artt. 44–49 (trasferimenti).
- **D.Lgs. 196/2003 (Codice Privacy)** come modificato dal **D.Lgs. 101/2018** — **art. 2-quinquies**:
  età del consenso digitale fissata a **14 anni** in Italia.
- **Direttiva ePrivacy 2002/58/CE** (lex specialis cookie/comunicazioni elettroniche).

### Linee guida e fonti istituzionali

- Garante per la protezione dei dati personali — **Tema Minori**: <https://www.garanteprivacy.it/temi/minori>
- Garante — **Linee guida cookie e altri strumenti di tracciamento (10 giugno 2021)**: <https://www.garanteprivacy.it/home/docweb/-/docweb-display/docweb/9677876>
- Garante — **DPIA / Valutazione d'impatto**: <https://www.garanteprivacy.it/valutazione-d-impatto-della-protezione-dei-dati-dpia->
- EDPB — **Guidelines 4/2019 on Article 25 Data Protection by Design and by Default**: <https://www.edpb.europa.eu/our-work-tools/our-documents/guidelines/guidelines-42019-article-25-data-protection-design-and_en>
- EDPB / WP29 — Linee guida su DPIA e determinazione del "rischio elevato".
- EDPB — Dichiarazione/principi sull'**age assurance** (verifica dell'età online).

### Approfondimenti (secondari, in italiano)

- Agenda Digitale — *Il consenso digitale del minore dopo il decreto GDPR 101/2018*: <https://www.agendadigitale.eu/sicurezza/il-consenso-digitale-del-minore-dopo-il-decreto-gdpr-101-2018/>
- Federprivacy — *Il consenso del minore tra GDPR e normativa nazionale*: <https://www.federprivacy.org/informazione/primo-piano/il-consenso-del-minore-tra-gdpr-e-normativa-nazionale>
- Studio Previti — *La verifica dell'età del minore per l'accesso ai servizi online*: <https://www.previti.it/la-verifica-delleta-del-minore>
- Studio Previti — *La recente dichiarazione dell'EDPB sulla verifica dell'età online*: <https://www.previti.it/la-recente-dichiarazione-delledpb-sulla-verifica-delleta-online>
- Altalex — *Art. 9 GDPR*: <https://www.altalex.com/documents/news/2018/04/12/articolo-9-gdpr-trattamento-di-categorie-particolari-di-dati>
- Altalex — *Art. 33 GDPR (notifica violazione)*: <https://www.altalex.com/documents/news/2018/04/12/articolo-33-gdpr-notifica-violazione-dati-personali>
- Altalex — *Art. 37 GDPR (designazione DPO)*: <https://www.altalex.com/documents/news/2018/04/12/articolo-37-gdpr-designazione-del-responsabile-della-protezione-dei-dati>
- Agenda Digitale — *Data breach nel GDPR*: <https://www.agendadigitale.eu/sicurezza/data-breach-nel-gdpr-cose-e-cosa-sapere-per-segnalazione-e-prevenzione/>
- GDPR-Text — *Art. 34 GDPR*: <https://gdpr-text.com/read/article-34/>

---

> **Promemoria finale.** Questo documento è una guida operativa interna. **Prima del lancio**, e
> in particolare prima di raccogliere qualsiasi dato di salute da minori, far **validare tutto da
> un avvocato/DPO qualificato**. La conformità non è un traguardo una-tantum ma un **processo
> continuo**: aggiornare registro, DPIA e misure ad ogni cambiamento rilevante del prodotto.

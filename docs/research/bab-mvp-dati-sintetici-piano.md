# BAB — MVP di desiderabilità con dati sintetici · Piano operativo

**Versione:** rev.2 — 4 luglio 2026 · *allineato al documento persona aggiornato (10 persona complete + nuovi sport)*
**Scopo del documento:** unico riferimento operativo per validare la **desiderabilità** di BAB (problem–solution fit) partendo da user persona e dati sintetici, senza dati reali di minori.
**Come è nato:** sintesi di tre analisi parallele (schema dati · motore generativo+guardrail · piano di validazione), ancorate al codice reale di `bab-diario` e ai dati di ricerca in `docs/research_data/`.

> ⚠️ **Regola che tiene in piedi tutto:** i dati sintetici validano **l'esperienza e il demo**, non la scienza e non la desiderabilità. La validazione vera sta nelle **interviste**. La dashboard demo è uno *stimolo*, mai una *prova*.

---

## 0. TL;DR + divisione dei compiti

Il percorso consigliato (interviste → correggi persona → genera dataset sintetico → dashboard demo) è corretto. Si divide naturalmente in due binari paralleli:

| Binario | Chi | Step | Stato |
|---|---|---|---|
| **Ricerca / qualitativo** | **Gaia** | 1. Interviste desiderabilità · 2. Correzione persona | parte ora (§2) |
| **Tecnico / prodotto** | **Sajid** | 3. Motore dati sintetici · 4. Dashboard demo | costruibile *da subito*, parametrizzato (§3–§4) |

I due binari **non si bloccano a vicenda**: Sajid costruisce il *motore* (parametrizzato sulle persona) mentre Gaia raccoglie le interviste. Quando le persona sono confermate, si preme un bottone e si genera dataset + demo con i parametri giusti. Il motore si costruisce ora; **i dati definitivi si generano dopo le interviste.**

---

## 1. Cosa validiamo (e cosa no)

- ✅ **Sì:** il problema è sentito? esistono comportamenti reali di coping? c'è intenzione? la privacy è un ostacolo e come si scioglie? l'esperienza/demo è comprensibile e desiderata?
- ❌ **No (non ancora):** gli insight sono corretti? il modello di fase è accurato? l'app "prevede" il rischio? → richiede dati reali e verifica clinica, fase successiva.

Confondere le due è la trappola principale. Se in intervista qualcuno dice *"quindi l'app capisce quando un'atleta è a rischio"*, si corregge subito: *"no, questo è un esempio simulato; se lo strumento serve, il passo dopo è dimostrarlo sul serio."*

---

## 2. [GAIA] Kit interviste di desiderabilità

### 2.1 Cosa misurare per dire "validato" (con soglie)

Una riga per intervistato. Cinque dimensioni:

| # | Dimensione | Come si misura | Soglia di successo |
|---|---|---|---|
| A | **Intensità del problema** | racconta *spontaneamente* un episodio concreto e recente, con carica emotiva (0–3) | ≥60% a livello 2–3; ≥40% con episodio delle ultime 4 settimane |
| B | **Comportamenti esistenti** (il test più duro) | cosa fa *già oggi*: diario, TikTok/Google, app ciclo, ne parla, **ha speso tempo/soldi** | ≥50% ha ≥1 coping attivo; ≥25% ha già investito tempo/denaro |
| C | **Intenzione** | email (debole) → "quando esce?" (medio) → accetta di provare il prototipo (forte) → **atto concreto ora**: presenta un'altra atleta, coinvolge coach/genitore (fortissimo) | ≥40% a livello forte; ≥1–2 coach ospitano il diary test |
| D | **Rischio privacy/sorveglianza** (invertita) | emerge da sola? direbbe che *mentirebbe*? cosa la rassicura? | successo = confermato reale (≥50% lo solleva) **e** rassicurazione praticabile per ≥80% di chi lo solleva |
| E | **Gatekeeper** (minori!) | genitore dà consenso di principio? coach lo vede come aiuto o rogna? | ≥50% genitori consenso di principio; ≥1 coach ospita il test |

**Lettura d'insieme:** "validato" = **A e B sopra soglia** *prima* di guardare C. Alta intenzione con A/B bassi = cortesia, non desiderabilità. Puntare a **8–12 interviste per segmento**.

### 2.2 Regola d'oro (Mom Test)
Chiedi del **passato e dei fatti**, mai *"useresti un'app che…"*. Se scappa una domanda ipotetica, riportala a terra con *"raccontami l'ultima volta che…"*. Ignora i complimenti; dai peso solo a fatti passati e impegni concreti.

### 2.3 Domande comportamentali

**Atlete (12–18)** — mai il ciclo come primo tema:
1. "Raccontami la tua ultima settimana di allenamenti e la gara. Quando è andata bene? Quando storta?"
2. "L'ultima volta che ti sei sentita un macigno / goffa / più stanca del solito — quando? Cosa hai pensato che fosse?"
3. "Quando ti succede, con chi ne parli? Raccontami l'ultima volta." *(coach? mamma? amica? nessuno?)*
4. "Hai mai tenuto traccia di come stai / dormi / vai giorno per giorno? Fammi vedere come, se ce l'hai." *(cerca il comportamento B)*
5. "Hai mai cercato online perché ti sentivi così? Dove? Cosa hai trovato?"
6. "C'è qualcosa che avresti voluto capire prima e che nessuno ti ha spiegato?"
7. "L'ultima volta che eri stanca/in ansia prima di una gara — l'hai detto al coach? Perché sì/no?"
8. "Se scrivessi da qualche parte come stai *davvero*, chi ti preoccuperebbe che lo legga?" *(privacy senza suggerirla)*
9. (dopo che si è aperta) "Il ciclo, con chi ne parli? E con chi non lo faresti mai?"
10. (chi non l'ha ancora avuto) "Quando se ne parla tra amiche/a scuola, come ti senti?"
11. "Se ci fosse qualcosa che ti aiuta, cosa dovrebbe fare per non finire nella cartella delle 50 app morte?"
12. "Conosci un'altra ragazza che vivrebbe le stesse cose?" *(intenzione forte)*

**Genitori:**
1. "Ultimamente hai notato tua figlia diversa — più stanca, più giù, diversa in campo? L'ultimo episodio?"
2. "Cosa hai fatto? Ne hai parlato, cercato info, sei andata da qualcuno?" *(+ eventuale spesa)*
3. "C'è stata una volta in cui non sapevi come aiutarla o cosa dirle? Com'è andata?"
4. "Come sai come sta davvero quando è in palestra? Da lei? Dal coach? Non lo sai?"
5. "Hai mai pagato/cercato qualcosa — visita, nutrizionista, app, libro — su crescita/ciclo/sport?"
6. "Cosa ti farebbe stare tranquilla, o preoccupare, su uno strumento che raccoglie come sta tua figlia?"
7. "Se il club lo proponesse, quali domande faresti prima di dire sì?"

**Coach:**
1. "L'ultima stagione, un'atleta il cui rendimento è calato e hai scoperto dopo che c'entravano cambiamenti fisici/ciclo? Raccontami."
2. "Come ti accorgi che un'atleta non sta bene o è sotto pressione? Cosa fai?"
3. "Ti è capitato che un'atleta non ti dicesse qualcosa di importante? Come l'hai gestita?"
4. "Di questi temi (ciclo, sviluppo) parli? Come? Con chi ti appoggi — medico, genitore, nessuno?"
5. "Hai mai usato foglio/app/questionario per il polso della squadra? Com'è andata?"
6. "Se vedessi un segnale d'insieme della squadra ma *mai* il dato della singola atleta — ti servirebbe o ti sembrerebbe inutile?" *(sonda la tensione col modello privacy)*
7. "Chi decide nel club se si adotta uno strumento così? Chi gestisce il consenso dei genitori?"

### 2.4 Come usare la dashboard demo in intervista
1. **Prima le domande (demo spenta).** Non mostrare niente finché non hai il racconto del passato, o rispondono alla UI e non alla loro vita.
2. **Introduci come reazione:** "Ti mostro una cosa che stiamo provando — sono dati finti d'esempio. Dimmi la prima cosa che ti passa in testa."
3. **Osserva e taci.** Dove guarda? Cosa la respinge? *Test chiave atlete:* capisce da sola che il coach **non** vede il suo singolo dato?
4. **Domande sempre concrete:** "Se fosse la tua schermata, cosa penseresti il lunedì?" / "Cosa ci manca perché tu la apra domani?" / "Cosa qui ti farebbe **non** fidarti?"
5. **Onestà esplicita** (specie coach/genitori): "I numeri sono simulati, mostrano solo com'è l'esperienza. Non stiamo dicendo che l'app ha capito qualcosa di vero su una ragazza vera."

### 2.5 Loop: interviste → correzione persona
- **10 minuti a caldo dopo ogni intervista:** per ogni persona toccata, tre righe *Confermato / Smentito / Nuovo*.
- **Ogni 3–4 interviste** aggiorna `bab-validation-synthetic-panel.md`: **non cancellare, marca** `[rev. data: era X → ora Y, da intervista #n]`. Aggiorna soprattutto: Frustrazioni, Comportamenti attuali, formulazione esatta dell'obiezione privacy, probabilità retention.
- **Changelog** in cima al file; sezione **"Assunti ribaltati"** in fondo per le contraddizioni che cambiano il *prodotto* (non solo la persona).
- **Criterio di stop/pivot:** se dopo ~8 interviste/segmento A e B restano sotto soglia → *non validato*. Meglio saperlo ora che con l'MVP costruito.

---

## 3. [SAJID] Schema del dataset sintetico

Allineato **campo-per-campo** al codice reale di `bab-diario`, così è "drop-in" per la demo.

### 3.1 Cosa l'app raccoglie DAVVERO oggi (fonte: `bab-diario/src/types.ts`, `content.ts`, `schema.sql`)
- **Check-in mattino** (`MorningPayload`): `energia`, `concentrazione`, `motivazione` (0–100), `emozioni[]` (bene/calma/ansia/rabbia/giu/imbarazzo), `nota?`, + esito calcolato (`CB-REC` recupero / `CB-PUSH` spingi / `CB-ONE` supporto / `CB-BAL` regolare) + affermazione.
- **Check-in post** (`PostPayload`): `comeAndata` (alla-grande…storta), `rpe` (1–5), `nota?`.
- **Solo locale / derivato (non su Supabase):** `nick`, `streakDays` (con "giorno di grazia"), `reminder`, `mostraReteSicurezza` (≥3/5 mattine difficili).
- **Viste dashboard già pronte:** `aderenza`, `aderenza_griglia`, `risposte_mattino`, `risposte_post`, `risposte_flatline` (termometro-sfiducia).

### 3.2 Schema sintetico proposto (3 tabelle)
- **`atleta`** (profilo statico, 20 righe) — *tutta scaffolding sintetica*, l'app oggi raccoglie solo il `code`: `code`, `nick`, `eta`, `sport`, `livello`, `tanner`, `menarche_status`, `eta_menarca?`, `archetipo`, `flag_reds_risk`, `prob_retention`.
- **`checkin_giornaliero`** — i campi mattino/post = **replica esatta** dei payload reali (drop-in 100%). Campi **sintetici** (previsti dalla spec v1 ma mai implementati) tenuti separati: `sonno`, `pressione`, `allenata`, `dolori[]`, `dolore_acuto`, `ciclo_oggi`, `corpo_come_allenamento`.
- **`eventi_episodici`** — interamente sintetica: `infortunio / gara / giorno-ciclo-stimato / picco-carico`, con `fase_ciclo_stimata?` (sempre stima).

### 3.3 Disallineamenti da dichiarare (onestà del demo)
1. **Ciclo, sonno, dolori, carico, infortuni, RED-S, profilo atleta: l'app reale NON li raccoglie.** Sono nella spec v1 ma non implementati. Se la demo li mostra, sono **estensioni sintetiche** oltre l'MVP attuale → tenerle in tabelle satellite marcate.
2. **RED-S non ha un flag nell'app.** Va derivato da proxy; l'unico segnale reale vicino è `mostraReteSicurezza`, che però è **benessere psicologico, non RED-S** — non confonderli in dashboard.
3. **Scale diverse:** `rpe` 1–5 vs energia/concentrazione/motivazione 0–100 → mai sullo stesso asse.
4. **k-anonymity:** con 20 atlete le sotto-fette scendono sotto soglia facilmente → sopprimere ogni aggregato con **n < 7**.
5. **Auto-censura:** generare *di proposito* il pattern "tutto alto, bassa varianza, zero emozioni difficili" in 2–3 atlete, così la vista `risposte_flatline` ha qualcosa da mostrare.

---

## 4. [SAJID] Motore generativo + guardrail

Ancorato ai dati in `docs/research_data/` (con DOI/PMC). Principio-cardine: **la varianza individuale domina** (≈60–70%), fase (≈10–15%) e sport (≈15–20%) sono piccoli spostamenti sulla baseline personale — non valori assoluti. Riflette McNulty 2020 (effetto fase triviale, ES −0.06/−0.14).

### 4.1 Parametri chiave (sintesi)
- **Stratificazione per atleta:** Tanner (per età), `menarche_status` (derivato da Tanner), `sport_cluster` (**4 cluster** — vedi §4.4), `hc_use`, baseline individuale.
- **Fase ciclo:** 4 fasi come **stima calcolata dalle date**, con `stima_confidenza` (alta solo se regolare + ≥3 cicli). **`non_ancora` o Tanner T1–T2 → `cicloFase = null`.**
- **Effetti fase (piccoli, rumorosi):** sonno e fatica peggiori in luteale/pre-mestruale (Fort-Vanmeerhaeghe 2025, adolescenti 14–18 — lo studio più on-target); umore/sintomi affettivi giù in mestruale/pre-mestruale; dismenorrea ~32% nei giorni di flusso (Taim 2023).
- **Carico:** RPE come scostamento dalla baseline personale, **mai** ACWR/safe-zone (tarati su maschi adulti).
- **Infortuni:** evento raro; **preferibilmente nessuna** correlazione fase→infortunio iniettata (evidenza debole e contraddittoria).

### 4.2 Vincoli macchina (guardrail cablati — estratto)
```
G1  synthetic_flag = true su OGNI record
G4  IF cicloFase != null → stima=true, confidenza∈[0,1], UI dice "stima" mai "sei in fase X"
G5  IF menarche_status=="non_ancora" OR tanner∈{T1,T2} → cicloFase = null
G8  nessun risk_score / LEAF-Q / Triad / semaforo RED-S per singola atleta
G9  aggregati club: sopprimi celle con n_risposte < 7 (k-anonymity)
G10 |Δ effetto-fase| ≤ 0.4 punti ordinali E varianza-individuo > varianza-fase
G11 injury_event non porta MAI un campo "causa = fase"
G12 metriche per singola disciplina → headline_safe=false; solo aggregati robusti in headline
G13 ogni parametro chiave porta source_ref (DOI/PMC)
G14 correlazioni iniettate registrate in manifest "injected_correlations" (forza, segno, fonte, label dimostrativo-non-causale)
```

### 4.3 Correlazioni: ammesse vs vietate
- ✅ **Ammesse** (come "pattern verosimile a scopo dimostrativo"): luteale/pre-mestruale → sonno/fatica peggiori; mestruale → umore giù + sintomi affettivi; flusso → dismenorrea; endurance → energia media più bassa; energia↔fatica↔sonno coerenti (r~0.4–0.5 rumoroso); carico come scostamento dalla baseline.
- ❌ **Vietate** (sfiorerebbero un claim clinico): fase→performance come predittore; fase→infortunio causale; riprodurre OR forti (2.30 / 6.07 / 78.4%) come regola; score di rischio individuale; numeri per disciplina come headline; fase "certa" senza flag stima; soglie ACWR; amenorrea presentata come esito neutro/normale.

### 4.4 Cluster sport (aggiornato — 4 cluster)

Il documento persona aggiornato copre 9 discipline: *ginnastica artistica e ritmica, danza, nuoto, pallavolo, basket, calcio, atletica, tennis, sollevamento pesi*. Si mappano su **4 cluster** con profili di rischio distinti:

| Cluster | Discipline | Profilo di rischio |
|---|---|---|
| **A — endurance / estetici** | nuoto, danza, ginnastica artistica/ritmica, atletica (mezzofondo) | alta prevalenza RED-S; menarca più tardivo (mediana ~15 anni in ginnastica); pressione su leanness/immagine corporea |
| **B — squadra** | pallavolo, calcio, basket | baseline; più eventi articolari (ginocchio/caviglia; contesto ACL femminile — mai causa-ciclo) |
| **C — tennis** | tennis | leggermente sotto B per densità gare |
| **D — categorie di peso** | sollevamento pesi | alta prevalenza RED-S da *weight-cutting* pre-gara; deficit energetico durante i "cut"; forza femminile valorizzata (leva narrativa positiva) |

> Nota generativa: i cluster A e D condividono il rischio RED-S ma per meccanismi diversi (volume/estetica vs taglio del peso). Il `flag_reds_risk` va derivato da proxy coerenti col cluster (A: menarca tardivo/assente + volume alto; D: weight-cutting + energia bassa pre-gara), **mai** come score diagnostico per singola atleta (vincolo G8).

---

## 5. Nodi aperti da chiarire (importanti)

1. **~~Le persona genitore e coach non esistono ancora~~ → RISOLTO (rev.2).** Il documento persona aggiornato contiene ora **10 persona complete**: 6 atlete (Giulia 13 ginnastica · Sofia 15 pallavolo · Martina 17 nuoto/amenorrea · Alice 14 calcio+atletica/drop-out · Chiara 16 danza-ginnastica/body-image · **Federica 15 sollevamento pesi/categorie di peso** — nuova), 2 genitori (Elena, Marco), 2 coach (Laura early-adopter, Roberto scettico/gatekeeper). Non sono più l'ipotesi debole: sono **scritte**, vanno **confermate** dalle interviste, non inventate. Da fare: allineare `bab-validation-synthetic-panel.md` (vecchio roster: Giulia/Sara/Nour/Aicha/Emma) a questo set.
2. **L'app raccoglie meno della spec di design.** Decisione da prendere: la demo mostra solo il core reale (energia/emozioni/RPE) o anche le estensioni sintetiche (ciclo/sonno/infortuni)? Consiglio: core reale come base + un pannello "roadmap" chiaramente etichettato per le estensioni.
3. **Posizione sul training AI** (dalla chat con Gaia): resta la decisione fondativa da mettere nera su bianco. Questo piano non richiede training di alcun modello — le raccomandazioni sono a regole + dati sintetici.

---

## 6. Prossimo passo

Tradurre §3–§4 in un **generatore** (Python/numpy) con:
- le 3 tabelle di §3.2 (20 atlete × 14 giorni × 2 check-in + eventi),
- i parametri di §4.1 e i flag `G1–G14` già cablati,
- un manifest `injected_correlations` per l'audit di provenienza,
- output in JSON/CSV drop-in per una dashboard demo.

Il generatore si costruisce **ora**; i parametri delle persona si iniettano **dopo** le interviste di Gaia.

---

*Fonti quantitative: `docs/research_data/` (female_athlete_physiology, menstrual_cycle_performance, injury_data_acl, cycle_tracking_data_model, performance_metrics). Documento di lavoro a supporto della progettazione dell'MVP — non costituisce indicazione medica. Ogni dataset derivato sarà SINTETICO e non riferibile a persone reali.*

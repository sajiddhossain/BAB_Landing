# Performance Metrics — GPS, carico interno/esterno, ACWR

> ⚠️ **Nota di affidabilità:** i claim di questo file sono stati **estratti da fonti primarie** (PMC, Nature, Frontiers) dagli agenti di ricerca, ma la **verifica avversariale 3-voti non è stata completata** (limite di sessione esaurito). Trattali come "riportati da fonte primaria, non ancora verificati in modo indipendente". I due claim sui moduli Kama sono invece **confermati 3-0**.

---

## Executive Summary

Mappa lo stato dell'arte del **monitoraggio del carico** nel calcio (prevalentemente maschile/élite) e le metriche GPS di performance. Serve a BAB per: (1) capire il vocabolario tecnico che coach e staff già usano; (2) decidere *cosa NON fare* (BAB non è un GPS/AMS di carico) e *cosa riusare* (il paradigma internal/external load, il primato del self-report/RPE); (3) evitare di importare in modo acritico metriche pensate per uomini adulti. **Messaggio centrale per BAB: il self-report soggettivo — non i wearable — è lo strumento con il miglior rapporto validità/scalabilità, e la letteratura sul carico è quasi tutta maschile → il campo "carico × atleta adolescente donna" è scoperto.**

---

## Data Points & Metrics

### 1. Il paradigma carico interno vs carico esterno
- **External load** = attività meccanica prodotta dal giocatore, misurata da GPS/accelerometri (distanza, velocità, accelerazioni). 
- **Internal load** = stress psico-fisiologico *subìto* dal corpo, misurato da HR e **RPE** (rating of perceived exertion). 
- Sono **due stream distinti ma accoppiati**: lo stesso external load produce internal load diverso a seconda dello stato di forma/recupero. → un dashboard serio li modella in coppia. *Fonte: PMC7468376 (Frontiers in Physiology 2020).*

### 2. Soglie GPS (elite soccer) — parametri di tracking
- **High-speed running (HSR):** 19.8–24.8 km/h
- **Sprint running:** ≥ 25.2 km/h
- **Accelerazioni/decelerazioni:** ±3 m/s² (raccomandazione recente: abbassare a ±2 m/s² per catturare più eventi)
- Limitazione nota: le metriche a soglia sono sensibili alla scelta della soglia e all'hardware. *Fonte: PMC7468376.*
- **Tassonomia a 5 bande alternativa** (10 Hz GPS): total distance; > 14.4 km/h = moderate-speed (MSD); > 18.0 = high-speed (HSD); > 21.0 = very-high-speed (VHSD); > 24 = sprinting. *Fonte: PMC7739681.*

### 3. ACWR — Acute:Chronic Workload Ratio (formula implementabile)
Formula base:
```
ACWR = carico_acuto / carico_cronico
  carico_acuto   = carico della settimana corrente (rolling 1 settimana)
  carico_cronico = media mobile (o EWMA) delle 4 settimane precedenti
```
- **Coupled ACWR** = rolling acute 1-sett / rolling chronic 4-sett.
- **Uncoupled ACWR** = acute settimanale / media delle 3 settimane precedenti (l'acuta esclusa dalla cronica).
- **EWMA (exponentially weighted moving average):**
```
EWMA_oggi = Load_oggi × λ + (1 − λ) × EWMA_ieri
  λ = 2 / (N + 1)
  N = 7 giorni  → finestra acuta ("fatigue")
  N = 28 giorni → finestra cronica ("fitness")
```
*Fonti: PMC7468376, PMC8958769.*

### 4. ACWR — evidenza, safe zone e limiti
- **Meta-analisi 2025** (22 studi coorte, 921 partecipanti, 657 infortuni): associazione positiva significativa ACWR ↔ infortunio, **ES pooled = 0.72 (95% CI 0.60–0.82, Z = 14.47, p < 0.01)**. *Fonte: PMC12487117.* **[l'unico dato "meta" qui — il più solido]**
- **Safe zone 0.8–1.3** (minima probabilità di infortunio, ES = 0.56); < 0.8 o > 1.3 = rischio elevato; **> 1.5 = "danger zone"**; **> 2.0 = alta probabilità** di infortunio. *Fonti: PMC12487117, PMC7739681.*
- **Sweet-spot week-specific** (moderate-speed running, rimpiazza il generico 0.80–1.30 di Gabbett): W1 0.960–1.480; W2 0.879–1.408; W3 0.805–1.535; W4 0.733–1.705. *Fonte: PMC12654017.*
- **Miglior predittore GPS:** ACWR del *moderate-speed running* (15–20 km/h), picco a 3 settimane pre-infortunio **AUC = 0.811** (95% CI 0.675–0.947), sens 0.80, spec 0.80, accuratezza 80%. *Fonte: PMC12654017.*
- **⚠️ Contraddizione:** in 15 calciatori prof (18.6±0.8 anni) gli spike di ACWR **NON** erano associati a infortunio successivo (caveat: N piccolissimo, 2 infortuni). → ACWR *non* è un predittore standalone affidabile. *Fonte: PMC7739681.*
- **⚠️ Bias di genere:** l'81% (17/22) degli studi ACWR è su calcio, ma **quasi solo dati maschili** (solo 2 studi con entrambi i sessi); gli autori indicano la ricerca sulle differenze di genere come gap aperto. → **applicare ACWR alle calciatrici adolescenti non è supportato dall'evidenza.** *Fonte: PMC12487117.*

### 5. Il primato del self-report (il dato più rilevante per BAB)
- In 25 giovani calciatori élite, **la session-RPE è la misura di internal load più sensibile** a riflettere l'external load precedente, in tutti i metodi di calcolo. RPE vs total distance **r = 0.41** (p < 0.001); RPE vs high metabolic power distance **r = 0.43** (p < 0.001). *Fonte: Nature s41598-025-31487-z.*
- **I questionari self-report soggettivi (RPE, drive/energy, sleep) correlano più fortemente e in modo più consistente con il carico rispetto a biomarcatori ematici o test neuromuscolari (CMJ)** → gli autori raccomandano **questionari ben disegnati come strumento di monitoraggio primario**. *Fonte: Nature s41598-025-31487-z.* **[valida direttamente l'approccio di BAB: il check-in soggettivo quotidiano non è un ripiego, è lo strumento con la miglior resa reale]**

---

## Technical Insights (→ feature BAB)

1. **Non competere sul carico esterno.** GPS, HSR, sprint, metabolic power richiedono hardware e sono territorio di Kama/PULSE/Catapult. BAB *non* deve misurarli. Semmai, in futuro, potrà **accoglierli come input opzionale** (import da wearable) accanto al suo dato nativo.
2. **Il dato nativo di BAB è internal load soggettivo.** Energia, umore, fatica, sonno percepito, dolore: sono esattamente le variabili che la letteratura indica come *le più utili e scalabili*. Il check-in quotidiano di BAB è, in linguaggio tecnico, un **subjective internal-load & wellness monitoring tool** — con l'aggiunta del segnale ciclo.
3. **Modella coppie, non singoli numeri.** Se un giorno BAB integrasse dati esterni, il pattern giusto è "external ↔ internal" (stesso allenamento, risposta soggettiva diversa = segnale di fatica/scarso recupero).
4. **Trend > valore assoluto.** La lezione ACWR/EWMA per BAB non è "calcola l'ACWR" (richiede carico quantificato che BAB non ha), ma il *principio*: **ciò che conta è la variazione rispetto alla baseline personale**, non il valore del singolo giorno. La dashboard di squadra dovrebbe evidenziare *scostamenti* aggregati, non soglie assolute.
5. **Guardrail anti-import maschile.** Ogni volta che si è tentati di riusare una soglia "standard" (safe zone 0.8–1.3, HSR 19.8 km/h), ricordare che è tarata su uomini adulti élite. Per adolescenti femmine non esistono soglie validate → BAB deve ragionare per **baseline individuale**, non per cut-off di popolazione.

---

## Source Mapping

| Dato | Fonte |
|---|---|
| Internal vs external load; ACWR formula; soglie GPS 19.8–24.8 / ≥25.2 / ±3 m/s² | https://pmc.ncbi.nlm.nih.gov/articles/PMC7468376/ (Frontiers Physiology 2020) |
| Meta-analisi ACWR 2025 (22 studi, 921, ES 0.72); safe zone 0.8–1.3; >1.5/>2.0; bias maschile 17/22 | https://pmc.ncbi.nlm.nih.gov/articles/PMC12487117/ |
| Session-RPE più sensibile; RPE r=0.41/0.43; questionari > biomarcatori/CMJ | https://www.nature.com/articles/s41598-025-31487-z |
| Spike ACWR NON associati a infortunio (15 giocatori); 5-band speed taxonomy | https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7739681/ |
| ACWR moderate-speed miglior predittore AUC 0.811; sweet-spot week-specific | https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12654017/ |
| Studio 20-settimane; coupled/uncoupled ACWR + EWMA (λ=2/(N+1), N=7/28) | https://pmc.ncbi.nlm.nih.gov/articles/PMC8958769/ |
| Moduli Kama Manager/Analysis (confermati 3-0) | https://kama.sport/en/tools/ |

# Modello dati per il tracking del ciclo (→ schema BAB)

> Come la letteratura e le app di riferimento (FitrWoman) modellano il tracking del ciclo, e come tradurlo in uno schema dati per BAB coerente con i guardrail (fase = stima, non diagnosi).

---

## Executive Summary

Definisce il **modello dati** per il core di BAB. La letteratura converge su un punto scomodo ma liberatorio: **le "fasi" del ciclo dedotte dal self-report calendar-based sono stime, non fatti** — determinarle con certezza richiederebbe misure ormonali non praticabili in un'app per adolescenti. La conseguenza di design è netta: BAB deve registrare **eventi osservabili** (sanguinamento, intensità, durata) e **rating soggettivi** (energia, umore, dolore, sonno) — entrambi affidabili nel self-report — e derivare la fase solo come **approssimazione etichettata come tale**. Il modello FitrWoman (18 sintomi, scala di flusso ordinale, 4 fasi calcolate, ramo contraccettivi) è il riferimento operativo più concreto e replicabile.

---

## Data Points & Metrics

### Il problema metodologico (perché il modello è fatto così)
- **~55% degli studi** su performance usa **calendar-based counting** per la fase, ma stimare le fasi senza verifica ormonale è considerato **inaffidabile** (alta variabilità intra/inter-individuale). *(% da confermare su full text — audit J Sports Sci 2025, DOI 10.1080/02640414.2025.2583013.)*
- FitrWoman/volleyball 2024 lo dichiara esplicitamente: *"we performed a calculated approximation"* delle fasi, senza validazione ormonale, perché il self-report è "more accessible, non-invasive, better acceptance". *PMC11239427.*
- Retrospettivo vs prospettico (108 atlete, 554 cicli): documenta la **discrepanza** tra ricordo e diario giornaliero → **argomento a favore del daily check-in di BAB.** *PMC12685902.*

### Convenzione a 4 fasi (operativa, non verità biologica)
1. **Menstruation** (early follicular — durata del sanguinamento)
2. **Follicular** (fine mestruazione → midpoint del ciclo)
3. **Luteal** (midpoint → inizio del sanguinamento successivo)
4. **Late luteal / pre-menstrual** (ultimi ~5 giorni)

### Il modello dati FitrWoman (riferimento concreto) — PMC11239427
- **Cadenza:** una voce serale quotidiana (prima di dormire). *(In BAB: check-in ~2 min, vedi [../research/bab-checkin-domande-quotidiane-v1.md](../research/bab-checkin-domande-quotidiane-v1.md).)*
- **Variabili registrate:**
  - `cycle_length`, `period_duration`
  - `flow_intensity` — **scala ordinale**: none / spotting / light / medium / heavy
  - `symptoms[]` — fino a **18 sintomi** (crampi addominali, fatica, gonfiore, dolori muscolari, "gambe pesanti", sonno disturbato, voglie, seno teso, mal di testa, …)
- **Fasi** = approssimazione calcolata dalle date, **etichettata come stima**.
- **Descrittivi (n=15, [DEBOLE]):** durata flusso 4.6±1.8 gg; ~10 sintomi/ciclo; crampi riportati dal 100%, sonno disturbato 73.3%, stanchezza 73.3%.
- **Ramo contraccettivi (HC):** per le atlete su HC (pillola/anello/IUD) non c'è mestruazione biologica → si registrano **sintomi ricorrenti + withdrawal bleeding**.

### Parametri clinici di normalità (da FIFA/Mikkonen — vedi [fifa_health_protocols.md](fifa_health_protocols.md))
- Cycle length normale **21–35 gg**; sanguinamento **~5 gg**; **baseline 3 cicli** prima di leggere trend; red flags come trigger educativi.

---

## Technical Insights (→ schema dati BAB)

**Schema `daily_checkin` (proposta, non-medica, self-report ordinale):**
```
daily_checkin
  athlete_id            (pseudonimo, mai nome reale)
  date
  mood                  ordinale 1–5 (faccine)
  energy                ordinale 1–5
  sport_feeling         enum {carica, tranquilla, nervosa, stanca_testa, poca_voglia}
  perceived_pressure    ordinale 1–5
  bleeding              enum {none, spotting, light, medium, heavy}   ← evento osservabile
  symptoms[]            multi-select (crampi, gonfiore, seno teso, mal_testa, gambe_pesanti,
                        sonno_disturbato, voglie, dolori_muscolari, nausea, umore_giù, …)
  pain_intensity        ordinale 0–3 (se dolore presente)
  sleep_quality         ordinale 1–5 (opzionale)
  note                  free text opzionale
```
**Schema `cycle_context` (una tantum + aggiornabile):**
```
cycle_context
  athlete_id
  menarche_status       enum {avuto_regolare, avuto_irregolare, non_ancora, preferisco_non_dire}
  hc_use                enum {no, pillola, anello, iud, altro, preferisco_non_dire}   ← ramo HC
  typical_cycle_length  int nullable   (derivato, non chiesto ai 13-14 anni)
```

**Principi (tutti guardrail-compliant):**
1. **Registra eventi + rating, deriva le fasi.** `bleeding` e `symptoms` sono self-report affidabile; la **fase è calcolata e mostrata come "stima"** (mai "sei in fase ovulatoria").
2. **Ramo HC esplicito** — senza di esso il modello sbaglia su ~metà delle atlete più grandi; per il target 13–14 spesso sarà "no", ma il campo deve esistere.
3. **Ordinali, non cliniche.** Nessuna variabile è un punteggio diagnostico; sono percezioni. Coerente con il primato del self-report soggettivo (vedi [performance_metrics.md](performance_metrics.md)).
4. **Baseline 3 cicli / individuale.** Nessuna soglia di popolazione; i trend sono personali.
5. **Aggregazione club = descrittiva e anonima.** La dashboard mostra pattern di squadra (es. "molte segnalano stanchezza questa settimana"), **mai** il dato della singola né uno score di rischio individuale. Filosofia semaforica (da CAT2) *senza* scoring clinico.
6. **Minori-first:** ai 13–14 anni le domande sul ciclo includono sempre "preferisco non dirlo" e "non l'ho ancora avuto" (già presente nel check-in v1); i cicli irregolari post-menarca sono normalizzati, non allarmati.

---

## Source Mapping

| Dato | Fonte |
|---|---|
| ~55% calendar-based, inaffidabilità senza verifica ormonale | audit DOI 10.1080/02640414.2025.2583013 (da confermare full text) |
| Modello FitrWoman: 18 sintomi, flusso ordinale, 4 fasi calcolate, ramo HC, descrittivi | https://pmc.ncbi.nlm.nih.gov/articles/PMC11239427/ (DOI 10.3389/fspor.2024.1408711) |
| Discrepanza retrospettivo vs prospettico (108 atlete, 554 cicli) | https://pmc.ncbi.nlm.nih.gov/articles/PMC12685902/ |
| Parametri normalità 21–35 gg / 5 gg / baseline 3 cicli | Mikkonen 2025, DOI 10.1007/s40279-025-02338-8 |
| Primato self-report soggettivo | Nature s41598-025-31487-z (vedi performance_metrics.md) |

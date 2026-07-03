# Fisiologia & salute dell'atleta donna

> Prevalenze di sintomi e disturbi mestruali nelle atlete, RED-S / Triade dell'atleta femminile, e strumenti di screening validati.
> **Grading:** [FORTE] review/consensus/strumento validato · [MEDIA] survey ampia · [DEBOLE] singolo studio.

---

## Executive Summary

Documenta *quanto sono comuni* i sintomi e i disturbi mestruali nelle atlete, e *quali strumenti clinici* esistono per lo screening (LEAF-Q, Triad Cumulative Risk Assessment, REDs CAT2). Due usi per BAB: (1) i **numeri difendibili** (dismenorrea ~32%, sintomi fino all'80%) che giustificano il prodotto senza sovravendere; (2) la **struttura logica** degli strumenti di screening — "somma di segnali → livello di attenzione", semaforo a più livelli — che ispira i check-in e la dashboard di squadra **senza** trasformare BAB in uno strumento diagnostico. Il confine è netto: BAB usa la *filosofia* di questi strumenti, non i loro cut-off diagnostici.

---

## Data Points & Metrics

### Prevalenza di sintomi mestruali (atlete)
- **Taim et al. 2023, Sports Medicine [FORTE]** — systematic review, 60 studi, **6380 atlete**. **Dismenorrea = disturbo più prevalente: 32.3%** (range 7.8–85.6%). Sintomi affettivi > fisici. Prevalenza disturbi mestruali tra studi 0–61%. **90% degli studi usa self-report retrospettivo** → la review raccomanda **monitoraggio prospettico**. *DOI 10.1007/s40279-023-01871-8.*
- **Bruinvels et al. 2021, BJSM (Strava) [MEDIA, self-report]** — 6812 donne attive. Sintomi: mood changes/anxiety **90.6%**, tiredness/fatigue **86.2%**, stomach cramps **84.2%**, breast pain **83.1%**. Il Menstrual Symptom index si associa a maggiore probabilità di saltare/modificare l'allenamento (OR 1.09), saltare gare (OR 1.07), usare antidolorifici (OR 1.09). *DOI 10.1136/bjsports-2020-102792.*
- **FIFA/Mikkonen 2025 (calciatrici) [FORTE, review]** — ~**20%** delle calciatrici con disturbo mestruale; amenorrea primaria **7%**, secondaria **16%**, oligomenorrea ~**24%**, dismenorrea ~**32%**; **fino all'80%** riporta ≥1 sintomo fisico/affettivo. PMS ~15–20% (generale) → **49–60% in popolazione atletica**. *DOI 10.1007/s40279-025-02338-8.* (Dettagli in [fifa_health_protocols.md](fifa_health_protocols.md).)

### Adolescenti (target BAB)
- **Armento et al. 2021, J Athl Train [DEBOLE, N=90] cross-sectional** — 90 atlete high-school 13–18. **Disfunzione mestruale 28%.** **44% crede che perdere il ciclo sia "una risposta normale all'alto carico"** (misconcezione pericolosa). Disfunzione associata a maggiore ansia, fatigue, pain interference. *DOI 10.4085/624-20 · PMC8530419.* → documenta il **gap di consapevolezza** che BAB può colmare.

### Prevalenza disturbi per disciplina [DEBOLE i valori puntuali]
> ⚠️ Rapid review, 48 studi, definizioni eterogenee, molti valori da singolo studio piccolo. **Citare il pattern, non i decimali.** *PMC9658102.*
- **Definizioni operative (utili al data model):** amenorrea primaria = menarca mai raggiunto; secondaria = assenza ≥3 mesi (cicli prima regolari) o ≥6 mesi (prima irregolari); oligomenorrea = cicli > 35 giorni o solo 5–7/anno.
- **Calcio:** amenorrea primaria ~20%, secondaria 5–10%, oligomenorrea 10–20%.
- Pattern generale: prevalenza più alta in **ginnastica ed endurance**; presente anche nei team sport (volley, calcio). Range complessivo **0–61%**.

### RED-S / Triade dell'atleta femminile
- **IOC REDs consensus 2023, BJSM [FORTE]** — radice = **Low Energy Availability (LEA)**; disfunzione mestruale = segno chiave. Soglia LEA convenzionale femminile: **< 30 kcal/kg fat-free mass/giorno** (vs ~45 ottimale) — **cut-off convenzionale e dibattuto**, non soglia biologica netta. Introduce il **REDs Clinical Assessment Tool v2 (CAT2)**. *DOI 10.1136/bjsports-2023-106994.*

### Strumenti di screening validati (struttura, non da replicare come diagnosi)
- **LEAF-Q** (Low Energy Availability in Females Questionnaire) [FORTE]: **25 item**, 3 domini (funzione **mestruale**, **gastrointestinale**, **infortuni/storia**). **Cut-off ≥ 8 = "at risk"**. Validazione Melin 2014: **sensibilità 78%, specificità 90%**. Applicato a giovani calciatrici (n=34, 13–18 anni): 64.7% "at-risk" [DEBOLE, singolo studio]. *Melin 2014 DOI 10.1136/bjsports-2013-093240; calciatrici PMC8420870.*
- **Female Athlete Triad Cumulative Risk Assessment** (De Souza 2014) [FORTE]: **6 item**, ciascuno **0/1/2** (LEA ± disordered eating, low BMI, menarca ritardato, oligo/amenorrea, low BMD, pregressa stress fracture). **Stratificazione: low 0–1 · moderate 2–5 · high ≥6.** Predittivo verso bone stress injuries. *BJSM 2014;48:289 · PMC8034341.*
- **IOC REDs CAT2** (2023) [FORTE]: 3 step (screening → severity/risk stratification su primary+secondary indicators pesati → diagnosi medico-guidata). **Semaforo a 4 livelli: green / yellow / orange / red**, ciascuno con linee guida di partecipazione. (Conteggio esatto indicatori [NON VERIFICATO].) *Stellingwerff 2023, DOI 10.1136/bjsports-2023-106914.*

---

## Technical Insights (→ feature BAB)

1. **Numeri per la comunicazione (con fonte).** Per la landing/blog usa i dati [FORTE]: dismenorrea ~32% (Taim 2023, 6380 atlete), sintomi fino all'80% (FIFA/Mikkonen), impatto sui giorni di allenamento (Bruinvels). **Non** usare "64.7% at-risk" né "RED-S 50%" come headline.
2. **Struttura dei check-in ispirata a LEAF-Q.** I tre domini di LEAF-Q (mestruazioni / GI / infortuni) sono un'ottima *tassonomia* per le domande, ma le domande di BAB restano non-cliniche (energia, umore, dolore, sonno) e **non** sommano a un punteggio diagnostico.
3. **Semaforo di rischio a livello di squadra (non individuale).** La logica "più segnali che si accumulano → alza l'attenzione" del Triad CRA e il semaforo a 4 livelli del CAT2 sono il *pattern giusto* per la dashboard aggregata del club: mostrare al coach un livello di attenzione della squadra, **mai** uno score diagnostico della singola.
4. **Segnala verso il referral, non verso la diagnosi.** Quando emergono red flags (es. amenorrea prolungata), BAB può gentilmente suggerire "parlane con un medico", coerente con il fatto che RED-S è dominio clinico.
5. **Il monitoraggio prospettico è il punto.** Taim 2023 critica il self-report *retrospettivo*: BAB, essendo un daily check-in *prospettico*, è metodologicamente dalla parte giusta. È un argomento di vendita verso staff scientifici.

---

## Source Mapping

| Dato | Fonte |
|---|---|
| Dismenorrea 32.3%, 60 studi/6380 atlete, raccomanda prospettico | DOI 10.1007/s40279-023-01871-8 · PMID 37389782 |
| Sintomi 90.6/86.2/84.2/83.1%, OR impatto allenamento | DOI 10.1136/bjsports-2020-102792 · PMID 33199360 |
| Adolescenti: disfunzione 28%, misconcezione 44% | DOI 10.4085/624-20 · https://pmc.ncbi.nlm.nih.gov/articles/PMC8530419/ |
| Prevalenza per disciplina + definizioni amenorrea/oligo | https://pmc.ncbi.nlm.nih.gov/articles/PMC9658102/ |
| IOC REDs 2023, LEA <30 kcal/kg FFM, CAT2 | DOI 10.1136/bjsports-2023-106994 · PMID 37752011 |
| LEAF-Q 25 item, cut-off ≥8, sens 78/spec 90 | Melin 2014 DOI 10.1136/bjsports-2013-093240; PMC8420870 |
| Triad CRA 6 item 0-2, low/moderate/high | BJSM 2014;48:289 · https://pmc.ncbi.nlm.nih.gov/articles/PMC8034341/ |
| REDs CAT2 3-step, semaforo 4 livelli | Stellingwerff 2023 DOI 10.1136/bjsports-2023-106914 · PMID 37752002 |

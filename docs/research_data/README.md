# BAB — Research Data (knowledge base tecnico-scientifica)

> Base di conoscenza per l'app **BAB — Breaking All Barriers** (atlete adolescenti 13–17, check-in quotidiano ciclo/energia/umore + dashboard aggregata per club).
> Prodotta da ricerca multi-agente (giu–lug 2026): 4 seed + espansione ricorsiva su letteratura peer-reviewed, competitor e protocolli FIFA.
> **Scopo:** materiale per RAG / retrieval e per il design di prodotto. NON è materiale clinico e NON abilita claim medici sul sito.

---

## Come è organizzata

| File | Macro-area | Cosa contiene |
|---|---|---|
| [performance_metrics.md](performance_metrics.md) | Metriche di carico e performance | GPS, internal/external load, ACWR, EWMA, soglie di velocità, RPE |
| [menstrual_cycle_performance.md](menstrual_cycle_performance.md) | Ciclo × performance | Evidenza (meta-analisi, calcio femminile), effetti per fase, paper SAGE seed |
| [female_athlete_physiology.md](female_athlete_physiology.md) | Fisiologia & salute atleta donna | Prevalenze sintomi/disturbi, RED-S/Triade, strumenti di screening (LEAF-Q, Triad CRA, CAT2) |
| [injury_data_acl.md](injury_data_acl.md) | Infortuni × ciclo | ACL, infortuni muscolari, rischio per fase, dati calcio femminile |
| [fifa_health_protocols.md](fifa_health_protocols.md) | Protocolli FIFA | FIFA Female Health & Performance Project, protocollo di monitoraggio mestruale, collection Sports Medicine |
| [cycle_tracking_data_model.md](cycle_tracking_data_model.md) | Modello dati tracking | Metodologia 4-fasi, self-report, ramo contraccettivi, → schema dati BAB |
| [education_support_gap.md](education_support_gap.md) | Problem statement | Gap di conoscenza/comunicazione (studio 1086 atlete) |
| [kama_data_architecture_study.md](kama_data_architecture_study.md) | Competitor / architettura | Kama.Sport: pipeline, KPI, moduli, business model |
| [pulsesport_competitor_study.md](pulsesport_competitor_study.md) | Competitor diretto | PULSE Sport: AMS ciclo+wellness+load per squadre femminili |

---

## Metodo & fonti

- **Fan-out**: 4 agenti seed (Kama.Sport, PULSE Sport, paper SAGE + letteratura, FIFA) + 1 agente wave-2 sui nodi scoperti + 1 workflow di ricerca (6 angoli, 28 fonti, 139 claim estratti).
- **Verifica**: dove possibile, verifica avversariale 3-voti. ⚠️ Il layer *performance metrics* del workflow è stato **estratto da fonti primarie ma NON verificato avversarialmente** (la fase di verifica ha esaurito il limite di sessione). È marcato come tale nei rispettivi file.
- **Grading dell'evidenza** (usato ovunque):
  - **[FORTE]** = review sistematica / consensus / strumento validato psicometricamente.
  - **[MEDIA]** = survey cross-sectional ampia o pattern aggregato coerente, ma self-report / eterogeneità.
  - **[DEBOLE]** = singolo studio piccolo, definizioni eterogenee, o associazione dichiarata non causale.

---

## ⚠️ Guardrail (validi per tutti i file e per qualsiasi uso su prodotto/marketing)

Coerenti con i claims-guardrail già stabiliti per BAB (niente E2E/team medico/claim inventati):

1. **Nessun claim causale ciclo→infortunio o fase→performance.** La letteratura *esplora* legami, ma l'evidenza è spesso debole, mista o non causale (gli autori stessi lo dichiarano). A livello di popolazione, gli effetti della fase sulla performance sono piccoli e non generalizzabili.
2. **La fase del ciclo è una STIMA, non un fatto.** Il self-report calendar-based non identifica l'ovulazione né conferma le fasi. In UI la fase va etichettata come "stima/approssimazione", mai "sei in fase ovulatoria".
3. **BAB monitora e segnala, non diagnostica.** RED-S, amenorrea, disturbi mestruali sono dominio clinico. Gli strumenti validati (LEAF-Q, Triad CRA, REDs CAT2) ispirano la *struttura* dei check-in e la *filosofia* del semaforo di rischio, ma NON vanno replicati come strumenti diagnostici né usati con i loro cut-off per "diagnosticare" in-app.
4. **Non citare i decimali fragili.** Prevalenze per-disciplina (es. "71.5% ice hockey", "55.6% cycling"), "RED-S 50% adolescenti", "64.7% at-risk calciatrici" derivano da singoli studi e NON vanno usate come headline. Citare il *pattern*, non il numero.
5. **Numeri sempre con fonte.** Ogni dato in questi file ha URL/DOI/PMID nel proprio Source Mapping. Nulla è inventato; ciò che non è stato verificabile è marcato `[NON VERIFICATO]`.
6. **Il target è 13–14/17 anni.** Molti studi sono su adulte/élite: la trasferibilità agli adolescenti è limitata e va dichiarata. Per i minori valgono cautele extra (consenso genitori, cicli irregolari post-menarca, tracking "leggero").

---

## Da confermare (aperti)

- Full text paper SAGE seed (10.1177/17455057261456871): dietro Cloudflare, non in PMC → effect size/CI esatti non disponibili.
- Conteggio esatto degli indicatori primary/secondary del REDs CAT2 (PDF IOC non apribile).
- % esatta "calendar-based counting ~55% degli studi" (audit Tandfonline, da full text).
- Ruolo di Kirsty Elliott-Sale nel progetto FIFA: [NON VERIFICATO].

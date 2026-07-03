# FIFA Female Health & Performance Project — protocolli

> Estrazione del **FIFA Female Health and Performance Project** (lancio 1 giugno 2026) e della collection peer-reviewed *Sports Medicine* collegata. Il paper Mikkonen et al. 2025 è, di fatto, un **manuale operativo di monitoraggio mestruale** direttamente rilevante per il core di BAB.

---

## Executive Summary

FIFA ha lanciato il progetto di riferimento globale sulla salute e performance delle calciatrici: ~30 moduli educativi su 13 topic, 4 livelli (Introduction→Integrated), rivolti a 211 federazioni, atlete, coach, staff medico **e genitori**. Il valore per BAB è duplice: (1) **autorità e allineamento** — BAB copre lo stesso spazio (ciclo, tracking, screening) su cui l'istituzione massima del calcio sta investendo, e il **6% di ricerca esclusivamente femminile** citato da FIFA coincide con la statistica del data-ledger BAB; (2) **protocolli operativi** — il paper Mikkonen et al. 2025 fornisce parametri concreti (ciclo 21–35 giorni, baseline 3 cicli, red flags) e, cruciale per BAB, le **cautele sui minori** (consenso genitori, cicli irregolari post-menarca) che mappano esattamente sul target 13–14 anni.

---

## Data Points & Metrics

### Struttura del progetto
- **Nome:** FIFA Female Health and Performance Project. **Lancio:** 1 giugno 2026. **Orizzonte:** FIFA Women's World Cup Brazil 2027.
- **Radice pilota:** FIFA Women's National Team Preparation Programme (WNTPP), 2021, 10 nazionali per FWWC 2023.
- **Architettura:** ~30 moduli su **13 topic**, **4 livelli di conoscenza** (Introduction → Intermediate → Advanced → Integrated), erogati via FIFA Training Centre.
- **13 topic:** 1 Female physiology · 2 Reproductive years · 3 **Menstrual health tracking** · 4 Pregnancy & postpartum · 5 Fertility · 6 Menopause · 7 Pelvic health · 8 Nutrition · 9 Recovery · 10 Sleep · 11 Strength & conditioning · 12 **Screening & profiling** · 13 **Injury & injury prevention**. Trasversali: breast health/reggiseni sportivi, hormonal contraceptive use.
- **Esperti (verificati):** Prof. Charles R. Pedlar (St Mary's Univ) e Dr Katrine Okholm Kryger (UEFA / St Mary's) = guest editor della collection. University of Portsmouth RGBH per il breast health (>700 reggiseni testati, >1M "breast bounces"). Kirsty Elliott-Sale nel progetto = **[NON VERIFICATO]**.

### Protocollo di monitoraggio mestruale (Mikkonen et al. 2025) — il più rilevante per BAB
Fonte: "Monitoring Menstrual Health in Footballers", *Sports Medicine* Review, DOI 10.1007/s40279-025-02338-8.

**Principio guida:** partire dai metodi *base* prima di quelli sofisticati; il monitoraggio dev'essere specifico agli obiettivi di atleta/squadra.

**Metodi field-based (base, raccomandati come punto di partenza) — il livello di BAB:**
- Cycle length tracking (calendario / registrazione semplice)
- Uterine bleeding pattern (durata, intensità, regolarità)
- Log sintomi + effetti collaterali
- Wellness soggettivo (readiness, percezione di performance)
- Application-based tracking (citato genericamente)

**Metodi ormonali (livello superiore, NON di BAB):** urinary LH-surge testing, mid-luteal progesterone da sangue, cervical mucus. Prelievi/ecografia **solo da professionisti medici**; auto-monitoraggio (sintomi/muco/LH) dall'atleta.

**Parametri di normalità (ciclo eumenorroico):**
- **Cycle length: 21–35 giorni**
- **Sanguinamento: ~5 giorni**
- **Baseline: minimo 3 mesi / 3 cicli** di tracking continuativo prima di leggere pattern.

**Contraccettivi ormonali (HC):** tracciare fasi attive/inattive della pillola (21–24 gg attiva + 7–4 inattivi), withdrawal bleeding, spotting, effetti collaterali, percezione performance/wellness.

**Red flags (→ referral medico):** ciclo < 21 o > 35 gg per cicli consecutivi; ripetuta assenza di LH surge; fase luteale corta ripetuta; cessazione del sanguinamento; cambi di pattern/volume/spotting; peggioramento progressivo di sintomi.

### Dati epidemiologici (con fonte)
- **Gap di ricerca:** su 5261 articoli di sport & exercise science (2014–2020), solo **34%** includeva partecipanti femminili, solo **6%** esclusivamente donne. → **il 6% coincide col data-ledger di BAB.**
- **Salute mestruale calciatrici (Mikkonen 2025):** ~20% con disturbo mestruale; amenorrea primaria 7%, secondaria 16%, oligomenorrea ~24%, dismenorrea ~32%; fino all'80% con ≥1 sintomo; PMS 49–60% in popolazione atletica.
- **Ferro (Smith-Ryan et al., DOI 10.1007/s40279-026-02413-8):** carenza di ferro ~**35%** delle atlete donne.

### Raccomandazioni operative per staff/coach (Mikkonen 2025) — trasferibili a BAB
- **Educazione PRIMA del tracking** (atlete + staff tecnico + team medico), poi consenso informato.
- **Consenso volontario e revocabile**, senza impatto su status/contratto; chiarire raccolta e condivisione.
- **Dati mestruali = dati medici**; solo i medici diagnosticano; personale dedicato formato ad analizzarli eticamente; percorsi di referral definiti.
- **Atlete giovani/junior:** comprendere la fisiologia della pubertà, cicli irregolari post-menarca; **consenso dei genitori** dove necessario; tracking "leggero" senza parere medico. ← **mappa diretta sul target BAB 13–14 anni.**
- **Feasibility/burden:** non aggiungere dati ormonali se le caratteristiche base del ciclo sono nella norma.

---

## Technical Insights (→ feature BAB)

1. **BAB si colloca esattamente al "livello field-based base" raccomandato da FIFA.** Sanguinamento, durata, intensità, sintomi, wellness soggettivo: è quello che FIFA dice di fare *per primo*. BAB può legittimamente dire "il nostro approccio è coerente con le raccomandazioni FIFA per il monitoraggio mestruale di base" (senza claim di endorsement).
2. **Parametri da hard-codare nel data model:** normalità ciclo **21–35 giorni**, sanguinamento **~5 giorni**, **baseline 3 cicli** prima di mostrare trend. Red flags come trigger di messaggi educativi "parlane con un adulto/medico" (mai diagnosi).
3. **Le cautele sui minori sono un requisito, non un'opzione.** Consenso genitori, gestione dei cicli irregolari post-menarca (non allarmare), tracking leggero: sono esattamente ciò che serve al target 13–14. Da riflettere in onboarding e UX.
4. **Ramo HC nel data model** (vedi [cycle_tracking_data_model.md](cycle_tracking_data_model.md)): withdrawal bleeding ≠ mestruazione biologica.
5. **"Dati mestruali = dati medici" → privacy-by-design.** Coerente col posizionamento BAB: aggregazione anonima per il club, dato individuale visibile solo all'atleta. Le raccomandazioni FIFA sono un ottimo scudo argomentativo verso i club scettici sulla privacy.
6. **Contenuti educativi allineabili ai 13 topic FIFA** per il blog/app (menstrual health tracking, screening, injury prevention, breast health, sleep, nutrition) → coerenza con l'agenda istituzionale = SEO + autorevolezza.

---

## Source Mapping

| Dato | Fonte |
|---|---|
| Struttura progetto, 13 topic, 4 livelli, 6%/34% su 5261 articoli, lancio 1 giu 2026 | https://inside.fifa.com/media-releases/health-performance-project-female-athletes-knowledge-research · https://www.fifatrainingcentre.com/en/course-overviews/female-health-and-performance-project.php |
| Protocollo monitoraggio: 21–35 gg, ~5 gg, baseline 3 cicli, LH/P4, red flags, HC, cautele junior; prevalenze mestruali | Mikkonen et al. 2025, DOI 10.1007/s40279-025-02338-8 · https://link.springer.com/article/10.1007/s40279-025-02338-8 |
| Carenza ferro ~35% | Smith-Ryan et al., DOI 10.1007/s40279-026-02413-8 |
| Collection Sports Medicine (guest ed Pedlar & Okholm Kryger) | https://link.springer.com/collections/ffcdffcfcb |
| Breast health RGBH Portsmouth (>700 reggiseni, >1M bounces) | University of Portsmouth RGBH (via comunicati) |

**Collection completa (11 articoli, tutti OA):** Fueling Women's Football (10.1007/s40279-026-02413-8); Monitoring Menstrual Health (10.1007/s40279-025-02338-8); Benchmarking Physical Performance (10.1007/s40279-025-02251-0); From Growth to Greatness (10.1007/s40279-025-02266-7); Sleep in Women's Football (10.1007/s40279-025-02247-w); Back to the Future (10.1007/s40279-025-02250-1); Return to Play Postpartum (10.1007/s40279-025-02248-9); Physical & Mental Recovery (10.1007/s40279-025-02246-x); Pregnant Pitches (10.1007/s40279-025-02249-8); Preface (10.1007/s40279-026-02424-5); Announcement (10.1007/s40279-026-02430-7).

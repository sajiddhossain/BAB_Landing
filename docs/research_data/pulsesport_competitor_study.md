# PULSE Sport — studio del competitor diretto

> Seed #2. **Il competitor più vicino a BAB in Europa**: AMS che unisce ciclo + wellness + carico per squadre femminili, con phase-detection automatica. Mappa esatta delle sovrapposizioni e dei punti di differenziazione per BAB.

---

## Executive Summary

PULSE Sport (Amsterdam, NL) è, tra tutti i player mappati, **quello che occupa più vicino il territorio di BAB**: un Athlete Management System che integra ciclo mestruale, wellness soggettivo e carico, con posizionamento esplicito *"The First Athlete Operating System Designed for Women's Teams"* e un modulo dedicato di Menstrual Cycle Monitoring (confermato 3-0 dal workflow). Ma i punti di differenziazione sono netti e sfruttabili: PULSE vende **all'élite** (demo-only, AMS completo con wearable/GPS), **ammette i minori under-13** con consenso genitoriale, e **usa i dati pseudonimizzati per il training della propria AI**. BAB si differenzia su tre assi difendibili: **fascia 13–14 non-élite + educazione + privacy-first radicale** (niente uso dei dati per addestrare modelli, aggregazione anonima). Il check-in "30 secondi" di PULSE conferma inoltre che la cadenza scelta da BAB è quella giusta.

---

## Data Points & Metrics

### Profilo
- PULSE Sport B.V., Amsterdam (VU campus) + ufficio KNVB Campus Zeist. Fondata ~2021. Founder: Siwan Aberkane (CEO), Nikolai Manchev (CPO). Team ~21 [NON VERIFICATO].
- Funding: pre-seed €250k (SportInnovator, 2023) + grant €20k MIT (progetto ATHPEM, wearable EMG). Premio Dutch Sports Innovation Award 2024.
- Prodotto: app atleta (iOS `tech.pulsesport.app` v6.5.3 / Android `com.pulsebv.pulse`, 1000+ download) + dashboard cloud staff (`dashboard.pulsesport.tech`, React+Vite su Firebase/GCP; DB Firestore).
- Go-to-market: **demo-only**, pricing non pubblicato.

### Fonti dati & metriche
- **Check-in in-app ~30 secondi** ("captures how you feel, not just what you did") + survey post-allenamento + screening psicologico.
- Import: Apple Health/Google Fit/Health Connect (HRV, RHR, VO2max, Sleep); wearable terzi (Garmin, Polar, Whoop, Catapult, STATSports, force plates); GPS+HR live via API **JOHAN Sports**.
- **Modulo ciclo (opt-in, GDPR art. 9):** date mestruazione, sintomi fisici/emotivi, sleep, appetite, energy, uso contraccettivi; **auto phase-detection** + predizione ciclo; correlazione fase ↔ readiness/recovery/load.
- **KPI esposti:** PULSE Score (body+mind+environment), Readiness Score, Recovery Score, Freshness Index, Fitness Index; internal load (HR/HRV/RHR/RPE/stress/wellbeing); external load (velocity, acc/dec, distance, power); wellness (mood, motivation, optimism, social support, "early depression symptoms" flaggati).
- **Claim di outcome (marketing, NON peer-reviewed, [NON VERIFICATO]):** −91% injuries / +12% performance / +4h/day risparmiate (brochure); LinkedIn dice −92% → **incoerenza interna**, nessuna metodologia.

### Posizionamento & confermati
- **Confermato 3-0 (workflow):** PULSE ha una feature dedicata **Menstrual Cycle Monitoring** ("performance changes for women"), pagina `pulsesport.tech/menstrual-cycle-monitoring`. → prova diretta che gli AMS commerciali spediscono il cycle-tracking come modulo club-facing (lo spazio di BAB).
- Posizionamento "First Athlete OS Designed for Women's Teams" (claim "first-mover" [NON VERIFICATO] — contestabile vs FitrWoman/Orreco, Wild.AI).
- Clienti nominati: Legia Ladies (Ekstraliga polacca, partnership 5 anni), hub KNVB #11.

### Privacy (i punti di differenziazione per BAB)
- Club = data controller, PULSE = data processor. **Dati pseudonimizzati usati per il training della loro AI** (consenso nei T&C).
- **Minori:** policy dichiara conformità COPPA + consenso genitoriale sotto i 13, con raccolta dati anche da under-13 "subject to safeguards" → **NON escludono i minori**.
- Cancellazione dati ciclo entro 30 gg; liability cap €10.000/anno.

---

## Technical Insights (→ posizionamento & feature BAB)

1. **La cadenza è validata.** Il check-in 30" di PULSE = stessa scelta di BAB. Non reinventare: 2 minuti max, faccine/ordinali, tutti i giorni. *(Vedi [cycle_tracking_data_model.md](cycle_tracking_data_model.md).)*
2. **Tre assi di differenziazione difendibili:**
   - **Fascia & mercato:** PULSE = élite/demo-only/wearable. BAB = **13–14 non-élite, senza hardware, gratis per l'atleta.** Non ci si scontra sullo stesso buyer.
   - **Educazione:** PULSE è uno strumento di performance; BAB aggiunge il **layer educativo** (il vuoto documentato in [education_support_gap.md](education_support_gap.md)) — differenziatore che PULSE non ha.
   - **Privacy-first radicale:** PULSE usa i dati (pseudonimizzati) per addestrare la sua AI e ammette under-13. BAB può prendere la posizione opposta e più forte: **i dati non addestrano modelli, il dato individuale non lascia l'atleta, il club vede solo aggregati anonimi.** Con un target di minori, questa è la scelta giusta *ed* è marketing potente.
3. **"Answers, not raw data".** Il principio UX di PULSE (e Kama) è corretto e va adottato: la dashboard mostra segnali leggibili, non tabelle.
4. **Attenzione all'over-claiming altrui = opportunità.** I claim −91%/−92% injuries senza metodologia sono il tipo di affermazione che BAB **non** deve fare. La sobrietà evidence-based (vedi guardrail) è un differenziatore di fiducia verso buyer scettici.
5. **Auto phase-detection: prudenza.** PULSE fa "precise phase detection"; la letteratura dice che senza dati ormonali la fase è una stima (vedi data model). BAB deve resistere alla tentazione di promettere precisione che la scienza non supporta.
6. **Modulo ciclo come dato speciale (GDPR art. 9).** PULSE lo tratta come categoria speciale opt-in: conferma il requisito legale che BAB già rispetta (Supabase UE, opt-in, cancellabile).

---

## Source Mapping

| Dato | Fonte |
|---|---|
| Menstrual Cycle Monitoring feature (confermato 3-0) | https://www.pulsesport.tech/menstrual-cycle-monitoring · https://www.pulsesport.tech/ |
| Profilo, founder, stack, funding | https://www.pulsesport.tech/contact-us · siliconcanals.com (pre-seed €250k) · footer pulsesport.tech |
| Fonti dati, KPI, check-in 30s, wearable, JOHAN | pulsesport.tech (listing App Store/Play) · pulsesport.tech/post/pulse-johan-sports-partnership |
| Modulo ciclo, phase-detection, framework tracking | pulsesport.tech/menstrual-cycle-monitoring · pulsesport.tech/post/menstrual-cycle-tracking-womens-sport |
| Privacy: pseudonimizzazione AI, COPPA/under-13, 30gg | https://www.pulsesport.tech/privacy-policy-and-terms-conditions |
| Claim −91%/−92% (marketing, non verificati) | brochure pulsesport.tech + LinkedIn company |
| Internal/external load definizioni, ML injury | pulsesport.tech/post/predicting-internal-and-external-training-load-with-ai |

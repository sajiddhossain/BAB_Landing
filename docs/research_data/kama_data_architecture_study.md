# Kama.Sport — studio dell'architettura dati

> Seed #1. Kama.Sport è un **system integrator** di dati calcistici (pro maschile): utile a BAB come *reference architetturale* per la dashboard aggregata, e come conferma che il verticale "atlete donne / ciclo / adolescenti" è **scoperto** anche dal player italiano più avanzato.

---

## Executive Summary

Kama.Sport (Sarnico/Paratico, IT) è la startup italiana di sports-data più avanzata: Official Innovation Partner della Lega Serie A, Official Technical Supplier FIGC, valutata fino a €40M. Il suo modello — **aggregare fonti eterogenee (GPS, video, tracking, dati medici) → algoritmi → insight/report per lo staff** — è un ottimo *reference architetturale* per la dashboard di club di BAB. Ma la lettura strategica è netta: Kama copre **zero** dell'universo BAB (atlete donne, ciclo, wellness soggettivo, adolescenti-salute). L'unico punto di contatto è il *pattern* "dashboard per staff" e il canale dilettanti/giovanili (Smartkam/LND). **Kama non è un competitor di BAB; è la prova che il verticale femminile-adolescenti è vuoto anche in Italia**, e un modello di come strutturare KPI e presentazione dati a un coach.

---

## Data Points & Metrics

### Profilo
- KAMA.SPORT SRL, P.IVA IT04387780168, sede Sarnico (BG). Costituita 2019 (idea 2017, hackathon FIGC). Fondatori: Davide Ragazzi (CEO), Carlo Bertelli, Nicola Bosio (CTO).
- Valuation €21M post-money (2021 Round A); EY 2022 fino a €40M. Ricavi 2022 €1,4M; 2023–24 ~€1,45M. Team ~45 under-35 (2023). Sedi estere: Brasile (Fortaleza), Miami.
- **Partnership istituzionali:** Lega Serie A "Official Innovation Partner" (2022); FIGC "Official Technical Supplier" (2024, nazionali maggiori → U15); Kings League "Official Data Partner" (2024); LND/Housefootball (2021).

### Architettura dati (il reference per BAB)
- **NON produce hardware:** è un **system integrator** — aggrega provider esterni + dati proprietari.
- **Input integrati:** GPS, cardiofrequenzimetri, telecamere, droni (allenamento); Opta/Stats Perform, StatsBomb, Wyscout, InStat, tracking data (match); DB scouting.
- **Tipologie dati:** tecnici, tattici, atletici, **medicali**, posizionali, video.
- **Pipeline:** raw multi-sorgente → integrazione/normalizzazione → "sophisticated algorithms" → insight/report/video.
- **Confermato 3-0 (workflow):** il modulo **Manager** centralizza GPS + video + parametri per prima squadra e academy e traccia il **return-to-play/recupero infortuni** nello stesso layer; il modulo **Analysis** copre >100 competizioni, fonde feed provider + dati proprietari, e permette **benchmark e indici compositi custom**. *(kama.sport/en/tools/)*

### Metodologia KPI (pattern riusabili)
- **Kama.Index (0–10):** prodotto scalare (punteggi · vettore pesi) **normalizzato per la somma dei pesi** (combinazione convessa); 7 ruoli, 6–8 statistiche per ruolo (10 causavano "appiattimento"), da un pool di 300+ statistiche.
- **Player/Team Labels:** archetipi via ML con % di aderenza; Strengths/Weaknesses su **percentili** ("Top" = top 5° percentile; "Strong" = 85–95°); finestra di calcolo = **ultimi 1000 minuti giocati**.
- **>2000 parametri individuali da >120 competizioni**; benchmark personalizzabili; video-linked heatmap.
- Metriche tattiche: xT (Expected Threat), PPDA, Field Tilt, Match Momentum, High Ball Recovery.

### UX per lo staff (4+1 moduli)
- **Manager** (pianificazione, centralizzazione dati, return-to-play, cartelle mediche), **Analysis** (report pre/post match custom, benchmark), **Video** (AI Game Scenarios), **Scouting** ("Shadow Team"), **Tagging** (telestration).
- **Adozione virale interna:** il club compra la base → il coach aggiunge funzioni per lo staff → il videoanalista personalizza. Stessa piattaforma, layer diversi.

### Assenza strategica (il dato per BAB)
- **Ciclo mestruale / dati femminili: assenti del tutto** dall'offerta pubblica.
- **RPE / wellness soggettivo (umore/sonno):** nessuna menzione pubblica [NON VERIFICATO].
- **Adolescenti in ottica salute:** fuori scope (il canale giovanile Smartkam/LND è video/tattico).

---

## Technical Insights (→ feature BAB)

1. **Reference per la dashboard di club, non competitor.** Il pattern Kama — *aggregare → normalizzare → mostrare insight, non dati grezzi, allo staff* — è esattamente il modello mentale della dashboard aggregata di BAB. "Answers, not raw data" (anche PULSE) è il principio UX da adottare.
2. **Normalizzazione e percentili individuali.** Kama.Index (combinazione convessa normalizzata) e le label su percentili sono un modello per come BAB può presentare **trend relativi alla baseline** in modo leggibile, senza esporre numeri clinici.
3. **Finestra temporale mobile.** "Ultimi 1000 minuti" ↔ per BAB "ultimi N cicli / ultime N settimane": leggere sempre su una finestra, non sul singolo giorno.
4. **Il "medicali" nel data model di un integratore.** Kama tiene i dati medici/return-to-play nello stesso layer: conferma che staff tecnici *si aspettano* un posto per dati di salute — ma Kama non li rende privacy-sensibili come il ciclo. È lì la differenza di BAB: **stesso valore per lo staff, con privacy radicalmente diversa.**
5. **Conferma del white space italiano.** Il player IT più avanzato, partner di Lega e FIGC, non tocca il femminile-adolescenti-ciclo. Argomento forte per pitch/investitori: il vuoto non è per mancanza di capacità tecnica, è per mancanza di focus. BAB lo occupa.
6. **Possibile canale futuro.** Il modello Smartkam+LND mostra come si entra nel dilettantismo/giovanile italiano — mercato adiacente a BAB, eventuale terreno di partnership più che di scontro.

---

## Source Mapping

| Dato | Fonte |
|---|---|
| Profilo societario, sedi, fondatori | https://kama.sport/en/legal-notes/ · PDF EY kama.sport/investors/files/pdf/EOY_21_Profilo_Kama.Sport.pdf |
| Moduli Manager/Analysis (confermati 3-0), >100 competizioni, benchmark custom | https://kama.sport/en/tools/ |
| Pipeline, input (GPS/droni/Opta), tipologie dati, adozione virale | https://kama.sport/en/article/index.php?id=68 · PDF EY |
| Kama.Index, Labels, percentili, 1000 minuti, 2000 parametri | blog.kama.sport/it/indice-kama-... · blog.kama.sport/what-are-kama-player-labels-... · LinkedIn Pulse "The Kama.Sport Platform" |
| Partnership Lega Serie A / FIGC / Kings League / LND | forbes.it 05/08/2022 · figc.it (12/02/2024) · lnd.it |
| Valuation/finanziari | affaritaliani.it · milanofinanza.it · ilsole24ore.com |

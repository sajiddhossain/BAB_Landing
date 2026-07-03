# Ciclo mestruale × Performance

> Evidenza sull'effetto del ciclo mestruale sulla performance sportiva, con focus su calcio femminile e sul paper SAGE seed.
> **Grading:** [FORTE] review/meta-analisi · [MEDIA] survey ampia · [DEBOLE] singolo studio piccolo / non causale.

---

## Executive Summary

La domanda "il ciclo peggiora la performance?" ha una risposta scientificamente sobria: **l'effetto medio a livello di popolazione è piccolo, incoerente e di bassa qualità di evidenza.** Le meta-analisi migliori trovano effetti *triviali*; gli studi con verifica ormonale non trovano effetti generalizzabili. Questo è il guardrail più importante per BAB: **non si può vendere "sappiamo come il tuo ciclo cambia la tua performance"**. Ciò che è invece solido e difendibile è che **i sintomi mestruali compromettono la disponibilità ad allenarsi/competere** (vedi [female_athlete_physiology.md](female_athlete_physiology.md)) — ed è lì, non nella predizione della performance, che BAB crea valore. Il posizionamento corretto è: *dati individuali, non regole generali; ascolto dei sintomi, non predizione della prestazione.*

---

## Data Points & Metrics

### Il paper SAGE seed (fonte #3 della richiesta)
- **Titolo:** "Uncovering a hidden modulator for women in sports: An exploratory study of menstrual pain and brain connectivity."
- **Autori:** Pohle C, Büchel D, Bucher Sandbakk S, Sandbakk Ø, Pletzer B, Baumeister J. **Rivista:** *Women's Health* (SAGE), 2026, Vol. 22. **DOI:** 10.1177/17455057261456871 · **PMID:** 42389884.
- **Disegno:** esplorativo/osservazionale. **Campione:** 41 reclutate (24 naturally cycling + 17 contraccettivo orale), **n = 37 analizzate**. **Misura:** EEG a riposo, connettività funzionale (mCPL, clustering coefficient, phase lag index, mdWPLI), banda theta. Stat: MANOVA + MANCOVA con **dolore mestruale come covariata**.
- **Risultati:** nessuna differenza significativa in connettività tra fasi o tra gruppi da soli; introducendo il **dolore** come covariata emergono interazioni significative (fase×dolore su mCPL e CC; gruppo×dolore su mdWPLI). Effect size/CI esatti **non disponibili** (full text dietro Cloudflare, non OA).
- **Conclusione (verbatim-sense):** il dolore mestruale "may influence baseline brain network states, which may have potential implications for performance and injury risk in female athletes."
- **[DEBOLE]** — esplorativo, N=37, outcome = proxy neurofisiologico, nessuna misura diretta di performance/infortuni.
- **Rilevanza BAB:** conferma *scientificamente recente* che **il dolore mestruale non è solo soggettivo ma un modulatore misurabile** → sostiene il razionale "traccia i sintomi/il dolore, non solo la fase". Ma niente claim clinici: lo studio stesso non dimostra causalità.

### Meta-analisi & review (il quadro solido)
- **McNulty et al. 2020, Sports Medicine [FORTE]** — systematic review + meta-analisi bayesiana, 78 studi. Effetto del ciclo sulla performance = **TRIVIALE**: performance leggermente ridotta in fase follicolare precoce, ES₀.₅ = **−0.06** (95% CrI −0.16…0.04); massimo ES₀.₅ = **−0.14** (−0.26…−0.03). Qualità GRADE = **"low"**. Raccomandano **approccio individuale**. *DOI 10.1007/s40279-020-01319-3.*
- **Systematic review calcio femminile 2024 [MEDIA/DEBOLE]** — 9 clinical trial; **5 non trovano differenze** tra fasi (Vila 2017, Tounsi 2018, Carmichael 2021, Campa 2022, Tsampoukos 2010); qualità "very low". Conclude: performance *può* essere ridotta in early follicular e migliorare in altre fasi, **ma non consistente**. *Frontiers in Physiology, DOI 10.3389/fphys.2024.1359953.*
- **Studi hormone-verified 2025 [FORTE come metodo]** — con fasi verificate ormonalmente **NON c'è effetto consistente/generalizzabile** della fase sulla performance. Popolazione adulta (età media 25.6), non adolescenti. *J Appl Physiol, DOI 10.1152/japplphysiol.00223.2025.* → **implicazione design:** predizioni "fase X = performance Y" a livello di popolazione non sono evidence-based.
- **Meta-analisi forza 2024 [MEDIA]** — 22 studi, 433 soggetti: forza isometrica massimale più alta in late-follicular vs early-follicular, **SMD = 0.60** (medium), ma eterogeneità altissima **I² = 95%** → segnale instabile.

### Sport-specifico calcio (segnali, non prove)
- **Julian et al. 2017, PLoS One [DEBOLE, N=9]** — 9 calciatrici sub-elite. Yo-Yo IET: **2833±896 m (luteale) vs 3288±800 m (follicolare)**, p=0.07 (possibile calo endurance in luteale); CMJ e sprint invariati. *DOI 10.1371/journal.pone.0173951.*

---

## Technical Insights (→ feature BAB)

1. **Vietato il "performance predictor" per fase.** Nessuna schermata deve dire "oggi sei in fase X → renderai meno/più". L'evidenza non lo sostiene ed esporrebbe BAB a critiche facili dai buyer scettici (staff con background scientifico).
2. **La fase è UN segnale debole, individualmente calibrato.** Se BAB mostra correlazioni fase↔sintomi/energia, devono essere *della singola atleta nel tempo* ("negli ultimi cicli, TU tendi a sentirti così"), mai regole di popolazione.
3. **Sposta il valore dal "performance" al "disponibilità & benessere".** Il claim difendibile non è "miglioriamo la prestazione" ma "riduciamo il rischio che i sintomi ti facciano saltare/mollare" (vedi problem statement). È vero, misurabile e non contestabile.
4. **Il dolore è un dato di prima classe.** Il paper SAGE e la letteratura sui sintomi convergono: il dolore mestruale conta. Nel data model di BAB il dolore va tracciato con intensità (ordinale), non ridotto a "hai il ciclo sì/no".
5. **Onestà come vantaggio competitivo.** Comunicare l'incertezza ("la scienza è ancora giovane, per questo contano i TUOI dati") è più credibile del determinismo delle app che promettono cycle-syncing miracoloso.

---

## Source Mapping

| Dato | Fonte |
|---|---|
| Paper SAGE seed (menstrual pain × brain connectivity) | DOI 10.1177/17455057261456871 · PMID 42389884 · https://pubmed.ncbi.nlm.nih.gov/42389884/ |
| McNulty 2020 meta-analisi (ES −0.06/−0.14, GRADE low) | DOI 10.1007/s40279-020-01319-3 · PMID 32661839 |
| Review calcio femminile 2024 (5/9 trial no diff, very low) | https://www.frontiersin.org/journals/physiology/articles/10.3389/fphys.2024.1359953/full |
| Studi hormone-verified 2025 (no effetto consistente) | https://journals.physiology.org/doi/full/10.1152/japplphysiol.00223.2025 |
| Meta-analisi forza 2024 (SMD 0.60, I²=95%) | via workflow finder (estratto, non verificato) |
| Julian 2017 calcio (Yo-Yo luteale vs follicolare) | DOI 10.1371/journal.pone.0173951 · PMID 28288203 |

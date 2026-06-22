# BAB — Documentazione Strategica

> **Cos'è questa cartella.** Dieci documenti di lavoro che definiscono BAB oltre il problema:
> chi è il target, dove andiamo, come funziona il prodotto, come restiamo conformi alla legge,
> come cresciamo e come lo costruiamo. Materiale interno, vivo, da aggiornare man mano.

Aggiornato: giugno 2026 · Mercato primario: **Italia** · Founder: **Gaia Manzone**

---

## Indice dei documenti

| # | Documento | Cosa contiene |
|---|-----------|---------------|
| 01 | [Target e personas](01-target-e-personas.md) | Studio approfondito dell'atleta adolescente (13–18) e delle buyer personas (allenatore/club, genitore): psicologia, pubertà, attention span, drop-out, JTBD, journey, anti-pattern di copy. |
| 02 | [Vision, missione e strategia](02-vision-mission-strategia.md) | Vision a 5–10 anni, North Star, value proposition (atleta/società/genitore), posizionamento, business model a due lati, perché ora, rischi, roadmap Now/Next/Later. |
| 03 | [Il problema e le evidenze](03-il-problema-e-le-evidenze.md) | Mappa del problema con bibliografia rigorosa: drop-out, salute mestruale, infortuni LCA, RED-S, gap di ricerca, impatto. Le statistiche fondative con fonti verificate. |
| 04 | [Roadmap di prodotto e feature](04-roadmap-prodotto-e-feature.md) | Specifica dell'ecosistema: app atleta, Coach Dashboard, vista genitore; modello dati con confine privacy; MVP→V1→V2; prioritizzazione RICE/MoSCoW. |
| 05 | [Compliance legale e privacy by design](05-compliance-legale-privacy-by-design.md) | GDPR per i minori, consenso, dati di salute, DPIA, sicurezza (RLS), cookie, diritti, data breach, checklist di go-live. **Da validare con un legale/DPO.** |
| 06 | [Engagement, game design e retention](06-engagement-game-design-retention.md) | Il loop Tamagotchi del Buddy, behavioral design (Hooked), micro-meccaniche 5–10s, streak, retention, gamification **etica per minori**. |
| 07 | [Brand, voce e content strategy](07-brand-voce-content-strategy.md) | Piattaforma di brand, tone of voice (atlete vs società/genitori), sistema visivo, content pillars, Substack/Instagram, calendario editoriale, lancio. |
| 08 | [Go-to-market e crescita](08-go-to-market-e-growth.md) | GTM a due lati, vendita alle società, acquisizione atlete/genitori, pricing B2B, growth loop, partnership, piano di lancio del dominio. |
| 09 | [Metriche, KPI e validazione](09-metriche-kpi-e-validazione.md) | North Star, AARRR, funnel di validazione della landing, piano analytics, lead score SITG, esperimenti, definizione di product-market fit. |
| 10 | [Architettura tecnica e implementazione](10-architettura-tecnica-e-implementazione.md) | Stack attuale, architettura target, modello dati con il confine privacy (k-anonimato), sicurezza/RLS, percorso landing→MVP→prodotto, DevOps. |

---

## Contesto condiviso (la base di tutti i documenti)

**Prodotto.** BAB (Breaking All Barriers) è una piattaforma di salute e benessere per **atlete adolescenti (~13–18)**. Aiuta le ragazze a riconoscere, comprendere e gestire i segnali del corpo durante la pubertà, per restare nello sport, performare e sentirsi meglio. Temi: **salute mestruale, prevenzione infortuni (LCA), drop-out**.

**Modello.** App atleta **gratuita**; le **società sportive pagano** la *Coach Dashboard* (B2B); i **genitori** sono pubblico B2C secondario.

**Vincolo non negoziabile — privacy by design.** Coach e genitori vedono **solo segnali aggregati e anonimi** (semaforo 🟢🟡🔴): **mai** il ciclo, l'umore o dati di salute individuali. L'atleta possiede i suoi dati. Questa membrana è il differenziatore competitivo e il pilastro di compliance.

**Statistiche verificate** (usate in tutti i documenti con citazione):
- **77%** delle atlete ritiene che il ciclo mestruale influenzi negativamente la performance — *Jones & Bishop et al. (2024), n=128 atlete d'élite (PMC10912517)*.
- **6%** della ricerca sport-science è condotta esclusivamente su donne — *Cowley et al. (2021), «Invisible Sportswomen», WSPAJ 29(2):146, DOI 10.1123/wspaj.2021-0028*.
- La ricerca scientifica sugli **infortuni delle atlete adolescenti è quasi inesistente** — *Horan et al. (2024), Sports Medicine, DOI 10.1007/s40279-023-01988-w (32 studi under-19)*.
- **~1 ragazza su 2** abbandona lo sport con la pubertà.
- ⚠️ Non si usa il vecchio "93%" (era Findlay 2020, n=15, riferito ai sintomi).

> **Nota legale.** Il documento 05 e ogni testo a contenuto legale sono **bozze operative interne**: vanno validati da un avvocato/DPO qualificato prima della pubblicazione o del lancio.

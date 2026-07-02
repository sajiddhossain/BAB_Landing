# BAB — Analisi SEO & Competitor (giu 2026)

> Ricerca multi-agente (SERP brand, competitor femtech/sport, mercato italiano, keyword IT/EN, audit sito). Sintesi operativa per posizionare BAB.

## 1. Diagnosi: perché ora BAB non si trova
- **Il sito NON è ancora indicizzato.** `site:babsport.com` → 0 pagine. Normale per un dominio di pochi giorni, appena deployato. Non è un bug di codice.
- **On-page tecnico solido**: sitemap valida, canonical, OG, JSON-LD (Organization + WebSite + FAQPage), robots ok. Titolo/description ora resi descrittivi.
- **Off-page ~ inesistente**: un solo backlink di peso — [LeccoToday, "Techstars Lecco, vince BAB"](https://www.leccotoday.it/eventi/techstars-lecco-chi-ha-vinto-2026.html). Nessuna autorità ancora.
- **EN/FR invisibili ai motori**: le traduzioni sono solo lato client (i18next), senza URL per lingua né `hreflang` → Google indicizza tutto come italiano. L'inglese oggi non porta traffico organico.

## 2. Verità strategica sui termini di ricerca
- **"BAB" secco = imbattibile e da NON inseguire**: dominato da Build-A-Bear, bab.la, "the Báb" (Wikipedia), BritishAmerican Business.
- **"Breaking All Barriers" secco = conteso**: Breaking All Barriers 365 (US), libri, un webcomic ("Gaia – Breaking All Barriers"), programmi vari.
- **Si vince coi qualificatori**: `babsport`, `BAB sport`, `BAB atlete`, `BAB Gaia Manzone`, `BAB community sport` → nessun incumbent, ranking #1 facile una volta indicizzati.

## 3. Competitor — matrice sintetica
| Player | Cosa | Mercato | App teen? | B2B club/coach | Note |
|---|---|---|---|---|---|
| **Voice In Sport (VIS)** | membership app atlete 13–23 (mentorship, "keep girls in sport") | 🇺🇸 EN | ✅ sì | ❌ (B2C abbonamento) | **analogo più vicino**, ma US-only, B2C |
| **The Well HQ** | corsi/CPD salute atleta donna (Puberty + Girls-in-Sport Edition) | 🇬🇧 EN | ❌ (vende ai coach) | ~ (partnership England Netball) | closest sul teen+coach, ma education per adulti |
| **FitrWoman / Orreco** | app cycle-sync + piattaforma team; sta comprando il mercato (Jennis) | 🌍 EN elite | ❌ (adulti elite) | ~ (team pro) | forte e in crescita, non teen, non IT |
| **Wild.AI** | app training/hormones + wearable | 🌍 EN adulti | ❌ | ❌ (D2C) | non teen, non IT |
| **Clue / Flo** | tracker mestruale mass-market (anche in italiano) | 🌍 multi | ❌ | ❌ | nessun angolo sport/teen/coach |
| **Ove Care** | educazione mestruale ragazze 9–17 | 🇬🇧 EN | ~ (education) | ❌ | teen ma non sport-specifico |
| **Women in Sport / WSF / This Girl Can / Kyniska / Project RED-S / Dame Kelly Holmes** | ricerca/advocacy/campagne | 🇬🇧🇺🇸 EN | ❌ | ❌ (charity/grant) | **non competitor** — fonti di autorità e citazioni |

### Mercato italiano (decisivo)
- **Nessun prodotto/app per atlete adolescenti in italiano.** Esiste solo discorso, non prodotto.
- **Terre des Hommes** ("indifesa"/Sport4Rights) possiede la narrativa dell'abbandono femminile + un corso per coach (education, non tool). Stat molto citate.
- **SYNLAB CAM Monza — "My Period, My Sport"**: pilota *clinico* che sincronizza allenamento e fasi del ciclo, target 16–30, con intento di "cedere il metodo" ai club → l'unico segnale B2B, ma clinico e non teen, non un'app.
- Federazioni (FIGC), clinici (Graziottin, Humanitas, AIDAP), media (Ultimo Uomo, Gazzetta) → articoli e PDF, nessun prodotto.

## 4. White space di BAB (l'intersezione che nessuno occupa)
**Prodotto in italiano, per atlete 13–17, uso quotidiano (ciclo/energia/umore + educazione) + dashboard B2B per club/coach.** VIS ha l'app teen ma è US/B2C; The Well HQ ha il coach-B2B ma è UK/education; l'Italia è vuota. BAB sta esattamente all'incrocio di cui tutti parlano e che nessuno ha costruito.

## 5. Keyword & contenuti (IT vince, EN è secondario)
**Italia = vincibile** (i primi risultati sono siti fitness generici o portali clinici, nessuno scrive per la teenager-atleta o il suo genitore). **Inglese = duro** (Boston Children's, AAP, UNICEF, PMC/Frontiers). → Vincere prima in italiano con contenuti per atleta/genitore/coach; EN solo come layer di credibilità/PR.

Cluster IT prioritari (🟢 subito): ciclo×sport teen-framed · pubertà→abbandono ragazze · **reggiseno sportivo adolescenti** (bassissima concorrenza) · ciclo irregolare/menarca "quando preoccuparsi" · genitori "cosa dire a mia figlia" · **coach: allenare ragazze adolescenti** (SERP quasi vuota, alimenta il B2B).

### Primi contenuti blog da pubblicare (IT, ranked)
1. Reggiseno sportivo per ragazze: guida al primo + taglia giusta
2. Si può fare sport durante il ciclo? Cosa dire a un'atleta di 13-14 anni
3. Perché una ragazza su due smette di fare sport in adolescenza (flagship, data-backed)
4. Come allenare ragazze adolescenti: guida per coach e società (feed B2B, SERP vuota)
5. Mia figlia ha il ciclo e fa sport: come sostenerla (genitori)
6. Ciclo irregolare e sport: quando è normale e quando parlarne al medico
7. Le fasi del ciclo e l'allenamento, spiegato semplice
8. RED-S/triade: 5 segnali che genitori e allenatori dovrebbero conoscere
9. FAQ: 10 domande su ciclo, corpo e sport (con FAQ-schema)
10–12. EN (reference/PR, non traffico): talk to your daughter · RED-S signs · puberty & dropout data

## 6. Piano d'azione
### A) Off-page — da fare TU (massimo impatto, subito)
1. **Google Search Console**: verifica dominio (record DNS su Cloudflare) + invia `sitemap.xml` + "Richiedi indicizzazione" su home e /about. ← **azione #1**
2. **Bing Webmaster Tools**: stessa cosa (alimenta anche ChatGPT/Copilot).
3. **Google Business Profile**: crea profilo (anche senza sede) con NAP coerente.
4. **Coerenza brand ovunque**: sempre "BAB — Breaking All Barriers" (bio Instagram/Substack/LinkedIn identiche).
5. **Backlink/mentions**: media sport-femminile/startup IT, interviste founder, directory. Ogni menzione linkata rafforza l'entità.
6. **Wikidata**: creare voce "BAB (Breaking All Barriers)" quando ci sono 2-3 fonti indipendenti (Techstars + Substack sono un inizio) → on-ramp al Knowledge Panel, disambigua da Build-A-Bear.

### B) On-page — GIÀ FATTO da Claude
- Title/description descrittivi con keyword vincibili (mantenendo il brand).
- `alternateName: "BAB"` + `knowsAbout` nello schema Organization.
- (Fatto in precedenza: dominio www.babsport.com, sitemap/robots puliti, OG = screenshot reale.)

### C) Da valutare (più grosse, richiedono decisione)
- **SEO inglese vero**: esporre EN come URL indicizzabili (`/en/...`) con `hreflang`. Serve prerender per-lingua → intervento strutturale. Oggi a bassa priorità (IT-first).
- **Content engine**: pubblicare i post §5 (posso redigerli io, in bozza da approvare — copy difendibile senza claim medici inventati).

## Fonti principali
Terre des Hommes/indifesa · SYNLAB CAM "My Period My Sport" · The Well HQ · FitrWoman/Orreco · Voice In Sport · Women in Sport UK · WSF "Go Out and Play" (Sabo & Veliz 2008) · keyword IT: my-personaltrainer, Humanitas, Nike IT, Graziottin, OK Salute, AOGOI.

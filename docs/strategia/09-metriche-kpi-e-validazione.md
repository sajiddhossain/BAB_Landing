# 09 — Metriche, KPI e Validazione

> **Perché questo documento**
>
> BAB ha appena messo online una **landing di validazione** (dominio attivo da domani, Italia first) il cui unico scopo è generare **evidenza misurabile** prima di investire nello sviluppo del prodotto. Senza una definizione condivisa di cosa misuriamo, perché lo misuriamo e quale numero ci dice "vai / fermati / cambia", il rischio è duplice: (1) inseguire **vanity metric** (visite, like, iscritti grezzi) che non predicono nulla, e (2) costruire mesi di prodotto su un'intuizione mai falsificata. Questo documento definisce la **North Star Metric**, il framework **AARRR** declinato sui tre pubblici di BAB (atleta, società, genitore), il **funnel di validazione della landing**, il **piano di misurazione/analytics** (eventi, naming, privacy), l'interpretazione operativa del **lead score SITG**, una batteria di **esperimenti** con criteri di successo, i modelli di **retention/cohort** per il prodotto futuro, la definizione operativa di **Product-Market Fit** per BAB, e la **cadenza di revisione** settimanale. È un documento operativo: ogni metrica ha una definizione, una formula, una soglia attesa e un'azione collegata.
>
> Pubblico: founder, growth/PM, eventuale advisor data. Orizzonte: fase pre-prodotto (validazione landing) con ponte verso le metriche del prodotto live.

---

## Indice

1. [Principi e gerarchia delle metriche](#1-principi-e-gerarchia-delle-metriche)
2. [North Star Metric: proposta e razionale](#2-north-star-metric-proposta-e-razionale)
3. [Framework AARRR per i tre pubblici](#3-framework-aarrr-per-i-tre-pubblici)
4. [Funnel di validazione della landing](#4-funnel-di-validazione-della-landing)
5. [Piano di misurazione e analytics](#5-piano-di-misurazione-e-analytics)
6. [Il lead score SITG](#6-il-lead-score-sitg)
7. [Esperimenti di validazione](#7-esperimenti-di-validazione)
8. [Retention e cohort per il prodotto futuro](#8-retention-e-cohort-per-il-prodotto-futuro)
9. [Definizione di Product-Market Fit per BAB](#9-definizione-di-product-market-fit-per-bab)
10. [Dashboard e cadenza di revisione](#10-dashboard-e-cadenza-di-revisione)
11. [Appendice: definizioni operative delle metriche](#11-appendice-definizioni-operative-delle-metriche-chiave)
12. [Glossario](#12-glossario)
13. [Fonti](#13-fonti)

---

## 1. Principi e gerarchia delle metriche

Prima di elencare i numeri, fissiamo i principi che decidono **quali** numeri contano. Valgono per tutta la durata della validazione e oltre.

### 1.1 I quattro principi guida

1. **Una metrica per livello.** Ogni livello dell'organizzazione (azienda, funnel, esperimento) ha **una** metrica primaria. Il resto sono input o guardrail. Troppe "metriche principali" significa nessuna priorità.
2. **Output vs. input.** La North Star è un **output** che non si tocca direttamente; si muove tirando le **leve di input**. Il lavoro del team è capire quali leve, in quale ordine. (cfr. modello North Star + input + guardrail.)
3. **Comportamento batte dichiarazione.** Un'iscrizione vale più di un sondaggio, un lead qualificato vale più di un'iscrizione, un pagamento vale più di tutto. In fase pre-prodotto privilegiamo i segnali che costano qualcosa all'utente (tempo, email vera, richiesta demo).
4. **Antidoto alla vanity metric.** Per ogni numero che riportiamo ci chiediamo: *"se questo sale del 50%, cambia qualcosa nelle nostre decisioni?"* Se la risposta è no, è una vanity metric e va declassata.

### 1.2 La gerarchia in tre livelli

| Livello | Tipo di metrica | Esempio per BAB | Cadenza di lettura |
|---|---|---|---|
| **Strategico** | North Star Metric (NSM) | Atlete settimanalmente attive che completano il "loop di cura" (proxy in validazione: lead qualificati) | Mensile |
| **Tattico** | Metriche di input / AARRR | Tasso di attivazione waitlist, lead-submit rate, SITG medio | Settimanale |
| **Operativo** | Metriche di esperimento / guardrail | CR per variante copy, bounce rate, costo per lead | Giornaliero / per esperimento |

### 1.3 Distinzione output / input / guardrail

- **Output (NSM):** la misura di valore consegnato. Si osserva, non si forza.
- **Input (leve):** ciò che il team può cambiare direttamente — onboarding completato, ratio di attivazione, qualità del traffico.
- **Guardrail (contro-metriche):** impediscono di "vincere male". Esempi: bounce rate, tasso di unsubscribe, percentuale di lead spam, latenza del form. Servono a evitare ottimizzazioni locali che distruggono valore di lungo periodo.

---

## 2. North Star Metric: proposta e razionale

### 2.1 Cos'è e perché serve

La **North Star Metric** è l'unico numero quantificabile che cattura meglio il **valore consegnato all'utente** e che **predice la crescita sostenibile** di lungo periodo. Non è una vanity metric: sta all'intersezione tra valore per il cliente e valore per il business, è misurabile ad alta frequenza ed è influenzabile da prodotto e go-to-market. Misura il valore *ricevuto* (es. "consegne riuscite"), non l'attività grezza (es. "ordini effettuati").

### 2.2 La NSM del prodotto BAB (visione)

BAB è un'app salute/benessere per **atlete adolescenti (13–18)**: l'app per l'atleta è gratuita, le **società pagano** la Coach Dashboard (B2B), i **genitori** sono un B2C secondario; coach e genitori vedono **solo segnali aggregati e anonimi**. Il valore non è "aprire l'app", è **prendersi cura di sé con continuità** e che quel valore generi un **segnale aggregato utile** per chi sostiene l'atleta.

> **North Star Metric (prodotto):**
> **Numero di atlete che, in una settimana, completano almeno un "loop di cura" (check-in/azione di benessere) per ≥ 3 settimane consecutive.**

Razionale:

- **Cattura il valore vero.** Il loop di cura completato è l'unità minima di beneficio per l'atleta (consapevolezza, abitudine, dato per sé).
- **È leading, non lagging.** Anticipa retention, passaparola e — via segnali aggregati — il valore percepito dalla società che rinnova.
- **Allinea i tre pubblici.** Più atlete completano il loop → più ricco e affidabile il segnale aggregato per coach/genitori → maggiore disponibilità a pagare/rinnovare.
- **È resistente al gaming** se accompagnata dai guardrail (vedi sotto): non premia l'apertura passiva né le notifiche spam.

La scelta della finestra **settimanale** (non giornaliera) è deliberata: il benessere di un'atleta adolescente non richiede un uso ossessivo quotidiano; anzi, un'app salute che spinge all'uso compulsivo tradirebbe la sua missione. La WAU (Weekly Active Users) è quindi una base più sana della DAU per questo dominio.

### 2.3 La NSM proxy in fase di validazione

In pre-prodotto non abbiamo atlete che completano loop. La NSM va quindi **proxata** con il miglior segnale di domanda disponibile sulla landing:

> **NSM proxy (validazione):**
> **Numero di lead qualificati a settimana** = (iscrizioni waitlist con email valida **+** richieste demo società) con **SITG ≥ soglia di qualità**.

È il miglior predittore disponibile di "esiste un pubblico che vuole abbastanza il valore di BAB da lasciare un contatto reale e qualificato".

### 2.4 Metriche di input (leve) e guardrail della NSM

| Categoria | Metrica | Definizione | Direzione desiderata |
|---|---|---|---|
| **Input – prodotto** | Tasso di completamento onboarding | % di nuove atlete che completano il primo loop entro 24h | ↑ |
| **Input – prodotto** | Attivazione W1 | % di atlete che completano ≥1 loop nella settimana 1 | ↑ |
| **Input – validazione** | Lead-submit rate | lead inviati / waitlist aperte | ↑ |
| **Input – validazione** | Qualità traffico | % visite da canali in-target (sport femminile, scuole, club) | ↑ |
| **Guardrail** | Bounce rate landing | % sessioni a pagina singola senza interazione | ↓ (< 55%) |
| **Guardrail** | Tasso lead spam/invalidi | % lead con email non valida o dominio usa-e-getta | ↓ (< 8%) |
| **Guardrail** | Unsubscribe / opt-out | % di iscritti che si disiscrivono dopo la prima email | ↓ (< 5%) |
| **Guardrail – etico** | Frequenza media loop/atleta (prodotto) | loop per atleta a settimana | mantenere in range sano (non massimizzare) |

Il guardrail etico è specifico di BAB: trattandosi di **minori** e di **salute**, la massimizzazione dell'engagement non è un bene in sé. Un aumento incontrollato di sessioni/notifiche è un **segnale d'allarme**, non di successo.

---

## 3. Framework AARRR per i tre pubblici

Il framework **AARRR** ("Pirate Metrics", Dave McClure, 2007) scompone il ciclo di vita dell'utente in cinque fasi — **Acquisition, Activation, Retention, Revenue, Referral** — e serve proprio a non farsi distrarre dalle metriche superficiali. Per BAB va declinato **tre volte**, perché i pubblici hanno economie e comportamenti diversi:

- **Atleta** (utente del valore, gratis, minore)
- **Società/allenatore** (cliente pagante B2B)
- **Genitore** (B2C secondario)

### 3.1 AARRR — Atleta

| Fase | Domanda | Metrica (prodotto) | Metrica (validazione oggi) | Target indicativo |
|---|---|---|---|---|
| **Acquisition** | Come ci scoprono? | Nuove atlete/settimana per canale | Visite landing in-target, waitlist aperte (atleta) | — |
| **Activation** | Fanno l'azione chiave? | % che completa il 1° loop entro 24h | quiz_step1 → quiz_step2 → lead_submit (atleta) | Attivazione ≥ 40% |
| **Retention** | Continuano a usarlo? | WAU che completa ≥1 loop; curva di cohort | Apertura email / click sequenza pre-lancio | curva che si appiattisce |
| **Revenue** | (Non monetizzata) | n/d — l'app atleta è gratuita | n/d | — |
| **Referral** | Lo consigliano? | Inviti inviati, k-factor tra coetanee | Condivisioni landing, "porta un'amica" | k > 0.3 |

L'atleta **non** genera revenue diretta: è il motore del valore e del passaparola. Il suo successo si misura su Activation, Retention e Referral.

### 3.2 AARRR — Società / Allenatore (B2B pagante)

| Fase | Domanda | Metrica (prodotto) | Metrica (validazione oggi) | Target indicativo |
|---|---|---|---|---|
| **Acquisition** | Come arrivano i club? | Demo richieste/mese; SQL | demo_request, lead user_type=societa/allenatore | — |
| **Activation** | Provano davvero il valore? | Dashboard attivata, ≥1 squadra collegata | SITG ≥ soglia + demo prenotata | — |
| **Retention** | Restano? | Rinnovo stagionale; club attivi mensili | Risposta al follow-up, interesse a pilot | — |
| **Revenue** | Pagano? | ARR, ACV per club, MRR | Disponibilità a pagare dichiarata in demo | — |
| **Referral** | Portano altri club? | Club referenziati, casi studio | Presidenti/DS che segnalano altre società | — |

Il B2B è dove vive la **revenue**. Qui le metriche di lead qualification (MQL/SQL) e il SITG (sez. 6) sono centrali.

### 3.3 AARRR — Genitore (B2C secondario)

| Fase | Domanda | Metrica (prodotto) | Metrica (validazione oggi) | Target indicativo |
|---|---|---|---|---|
| **Acquisition** | Come arrivano i genitori? | Iscrizioni genitore/settimana | waitlist (user_type=genitore) | — |
| **Activation** | Capiscono il valore? | Visualizzazione primo segnale aggregato | lead_submit genitore + email valida | — |
| **Retention** | Tornano a guardare? | Login mensile al pannello genitore | Apertura digest mensile | — |
| **Revenue** | Pagano (eventuale)? | Conversione a piano famiglia | Disponibilità a pagare (sondaggio) | — |
| **Referral** | Passaparola tra genitori? | Inviti tra genitori, gruppi squadra | Condivisioni nei gruppi WhatsApp squadra | — |

### 3.4 Acquisition: canali e metriche per pubblico (Italia first)

L'Acquisition merita un dettaglio a sé perché i tre pubblici si raggiungono in posti diversi. Per ogni canale tracciamo **volume**, **SITG medio** (qualità) e, quando a pagamento, **costo per lead**.

| Pubblico | Canali primari (Italia) | Metrica di canale | Note |
|---|---|---|---|
| Atleta | Instagram/TikTok sport femminile, ambassador, scuole | Lead per canale, SITG medio | Il passaparola tra coetanee è il canale più sano |
| Società | Federazioni, leghe, contatto diretto DS/presidenti, eventi | demo_request per canale, SITG medio | Canale "partner_club" tende ad avere SITG alto |
| Genitore | Gruppi WhatsApp squadra, passaparola, contenuti educativi | Lead per canale, opt-out rate | Bassa scala, alta fiducia |

> **Regola d'oro dell'Acquisition:** non ottimizzare il **volume** di lead ma il **volume di lead qualificati** (SITG ≥ 40) per euro/ora spesi. Un canale che porta 100 lead cold vale meno di uno che porta 20 lead hot.

### 3.5 Tabella sintesi: la metrica primaria per pubblico e fase

| | Atleta | Società | Genitore |
|---|---|---|---|
| Metrica AARRR più critica **ora** | Activation (quiz→lead) | Revenue intent (demo + SITG) | Activation (lead valido) |
| Metrica AARRR più critica **a regime** | Retention (WAU loop) | Retention (rinnovo) | Retention (digest) |

---

## 4. Funnel di validazione della landing

### 4.1 Le tappe del funnel

La landing è un **MVP landing-page / smoke test**: presenta la proposta di valore e misura la risposta. Le iscrizioni, i click e le richieste demo sono i **segnali di domanda precoce** a costo di sviluppo minimo. Il funnel ha queste tappe:

```
[1] view (atterraggio)
      │
      ▼
[2] target_switch  (l'utente sceglie/identifica il proprio profilo: atleta/genitore/società)
      │
      ▼
[3] waitlist_open  (apre il modal waitlist)  ──►  hero_cta (click CTA principale)
      │                                              │
      ▼                                              │
[4] quiz_step1 → quiz_step2  (compila i passi)       │
      │                                              │
      ▼                                              ▼
[5] lead_submit  (atleta/genitore)        demo_request (società)
```

### 4.2 Metriche di funnel e tassi attesi

I tassi attesi sono **ipotesi di partenza** (benchmark di landing di validazione, traffico freddo Italia, da ricalibrare con i dati reali entro 2 settimane). Servono come linea di base per dire "stiamo sopra o sotto le attese".

| # | Tappa | Metrica | Definizione | Conversione di step attesa | Conversione cumulata attesa |
|---|---|---|---|---|---|
| 1 | view | Sessioni | sessioni uniche sulla landing | 100% (base) | 100% |
| 2 | target_switch | Engagement rate | sessioni con ≥1 target_switch / sessioni | 35–50% | ~40% |
| 3 | waitlist_open / hero_cta | CTA rate | sessioni con waitlist_open o hero_cta / sessioni | 15–25% | ~18% |
| 4 | quiz_step1 → step2 | Step completion | quiz_step2 / quiz_step1 | 60–75% | ~12% |
| 5 | lead_submit / demo_request | **Conversione lead** | lead inviati / sessioni | — | **6–10%** |

> **Nota metodologica.** In landing di validazione ben targettizzate la conversione lead (visita → email) si colloca spesso nella forbice 5–10%; sotto il 2–3% il segnale di domanda è debole, sopra il 10% è forte. Questi valori vanno **letti per canale**: il traffico organico/in-target converte molto più del traffico a pagamento generalista.

### 4.3 Diagnostica del funnel: dove guardare se i numeri non tornano

| Sintomo | Tappa critica | Ipotesi | Azione |
|---|---|---|---|
| Tanti view, pochi target_switch | 1→2 | Hero poco chiara / non parla al pubblico | Test copy hero, chiarire "per chi è" |
| target_switch alto, waitlist_open basso | 2→3 | CTA debole o sotto la piega | Test CTA, spostarla above-the-fold |
| waitlist_open alto, quiz_step2 basso | 3→4 | Form troppo lungo / attrito | Ridurre campi, progress indicator |
| quiz_step2 alto, lead_submit basso | 4→5 | Frizione finale / dubbi privacy | Microcopy fiducia, badge privacy minori |
| Lead alti ma SITG basso | qualità | Traffico fuori target | Cambiare mix canali |

### 4.4 Esempio di funnel quantificato (illustrativo)

Esempio con 5.000 sessioni in-target, per mostrare come si traducono i tassi in numeri assoluti e in lead qualificati (post-SITG).

| Tappa | Tasso applicato | Volume |
|---|---|---|
| view (sessioni in-target) | — | 5.000 |
| target_switch | 40% | 2.000 |
| waitlist_open / hero_cta | 18% | 900 |
| quiz_step2 | 12% delle sessioni | 600 |
| lead_submit / demo_request | 8% delle sessioni | **400 lead** |
| di cui qualificati (SITG ≥ 40) | ~60% dei lead | **~240 lead warm/hot** |
| di cui hot (SITG ≥ 70) | ~25% dei lead | **~100 lead hot** |

Questo si traduce nella **NSM proxy**: ~240 lead qualificati su 5.000 sessioni in-target. È la cifra da confrontare con le attese settimana su settimana.

### 4.5 Segmentazione obbligatoria del funnel

Ogni metrica di funnel va sempre letta **segmentata per `user_type`** (atleta / genitore / società / allenatore) e **per canale**. Un funnel aggregato nasconde il fatto che, ad esempio, le società convertono poco ma con SITG altissimo, mentre le atlete convertono molto ma vanno coltivate nel tempo.

---

## 5. Piano di misurazione e analytics

### 5.1 Principi di tracciamento

- **Privacy-first, consenso-gated.** GA4 e Meta Pixel sono **predisposti ma attivi solo dopo consenso cookie**. Nessun evento di analytics di terze parti parte prima dell'opt-in. Trattandosi di **minori**, questa è una linea non negoziabile (anche oltre l'obbligo GDPR/“Garante”).
- **Primo livello server-side affidabile.** I lead sono salvati su **Supabase** indipendentemente dal consenso ai cookie di marketing: è un dato di **prima parte**, conferito esplicitamente dall'utente compilando il form (base giuridica diversa dal tracciamento pubblicitario). Questo garantisce che il dato di conversione "vero" non dipenda dall'accettazione del banner.
- **Naming coerente.** `snake_case`, verbo/oggetto, niente PII nelle proprietà evento (l'email vive su Supabase, non nelle proprietà GA4/Meta).
- **Una sola fonte di verità per i lead:** Supabase. GA4/Meta servono per il **funnel e l'ottimizzazione campagne**, non per il conteggio ufficiale dei lead.

### 5.2 Tabella eventi (event schema)

| Evento | Quando scatta | Proprietà | GA4 | Meta Pixel | Note privacy |
|---|---|---|---|---|---|
| `view` (page_view) | Caricamento landing | `page_path`, `referrer`, `channel` | ✓ | PageView | Post-consenso |
| `target_switch` | L'utente seleziona/cambia profilo | `from_target`, `to_target` | ✓ | custom | Post-consenso |
| `hero_cta` | Click sulla CTA principale dell'hero | `cta_label`, `target` | ✓ | custom | Post-consenso |
| `waitlist_open` | Apertura del modal waitlist | `target` (user_type), `source` | ✓ | custom | Post-consenso |
| `quiz_step1` | Completamento 1° passo del form | `target` | ✓ | custom | Post-consenso |
| `quiz_step2` | Completamento 2° passo del form | `target` | ✓ | custom | Post-consenso |
| `lead_submit` | Invio lead (atleta/genitore) andato a buon fine | `user_type`, `sitg_score`, `sitg_band`, `channel` | ✓ (key event) | Lead | **No PII** nelle proprietà; email solo su Supabase |
| `demo_request` | Invio form demo società | `user_type`, `sitg_score`, `club_size?` | ✓ (key event) | Lead/Schedule | **No PII** nelle proprietà |

> **Convenzione `sitg_band`:** invece di mandare solo lo score grezzo, inviare anche la **banda** (es. `cold`/`warm`/`hot`, sez. 6) facilita la lettura nei report GA4/Meta senza dover ricalcolare le soglie.

### 5.3 Eventi e "key events" / conversioni

| In GA4 (key event) | In Meta (conversione) | Perché |
|---|---|---|
| `lead_submit` | `Lead` | Conversione primaria atleta/genitore |
| `demo_request` | `Lead` (o `Schedule`) | Conversione primaria B2B |
| `waitlist_open` | `InitiateCheckout`-like (custom) | Micro-conversione di intento |

Le conversioni in Meta servono **solo** per ottimizzare le campagne quando partiranno; in fase organica iniziale la fonte di verità resta Supabase.

### 5.4 Mappa dei parametri standard (per evitare divergenze)

| Parametro | Valori ammessi | Usato in |
|---|---|---|
| `user_type` | `atleta`, `genitore`, `societa`, `allenatore` | lead_submit, demo_request, target_switch |
| `target` | come sopra | waitlist_open, quiz_step*, hero_cta |
| `sitg_score` | intero 0–100 | lead_submit, demo_request |
| `sitg_band` | `cold`, `warm`, `hot` | lead_submit, demo_request |
| `channel` | `organic`, `paid_meta`, `referral`, `direct`, `partner_club`, … | view, lead_submit |

### 5.5 Esempi di payload evento

Esempi concreti del payload da inviare (JSON concettuale; in GA4 sono parametri evento, in Meta proprietà custom). **Nessuna PII** (email, nome, data di nascita) compare mai qui: vive solo su Supabase.

**`lead_submit` (atleta, lead caldo da organico):**
```json
{
  "event": "lead_submit",
  "user_type": "atleta",
  "sitg_score": 70,
  "sitg_band": "hot",
  "channel": "organic",
  "page_path": "/",
  "has_sport": true,
  "has_focus": true
}
```

**`demo_request` (società, lead caldo):**
```json
{
  "event": "demo_request",
  "user_type": "societa",
  "sitg_score": 100,
  "sitg_band": "hot",
  "channel": "partner_club",
  "club_size_band": "50_150"
}
```

**`target_switch` (l'utente passa da atleta a società):**
```json
{
  "event": "target_switch",
  "from_target": "atleta",
  "to_target": "societa",
  "page_path": "/"
}
```

**`waitlist_open` (apertura modal dalla CTA hero):**
```json
{
  "event": "waitlist_open",
  "target": "genitore",
  "source": "hero_cta"
}
```

> **Riga corrispondente su Supabase (fonte di verità, CON dato di contatto):** `id`, `created_at`, `email`, `user_type`, `sport`, `focus`, `sitg_score`, `consent_marketing`, `channel`. La separazione è netta: il **fatto** della conversione (anonimo) va anche in GA4/Meta; il **contatto** resta solo su Supabase.

### 5.6 Data quality checklist

- [ ] Nessun evento di marketing prima del consenso (test col banner rifiutato).
- [ ] `lead_submit` su GA4 ≈ righe Supabase (entro tolleranza dovuta al consenso negato). Se GA4 ≪ Supabase, è il consenso; va bene.
- [ ] Nessuna email/PII nei payload GA4/Meta (audit periodico).
- [ ] `user_type` e `sitg_band` valorizzati su ogni lead.
- [ ] De-duplica viste/refresh (no doppi conteggi).

---

## 6. Il lead score SITG

### 6.1 Cos'è

**SITG** ("Should I Take it on the Go" — lead score interno) è un punteggio 0–100 calcolato al volo quando un lead viene salvato su Supabase. Combina, in stile lead scoring B2B classico, una componente di **fit** (chi è il lead) e una di **comportamento/qualità del contatto** (cosa ha fornito). La regola attuale:

| Criterio | Punti | Dimensione |
|---|---|---|
| Indica uno **sport** | +20 | Fit (intento, profilo in-target) |
| Indica un **focus** (obiettivo/area di interesse) | +20 | Fit / intento |
| **Email valida** (formato corretto) | +30 | Qualità del contatto |
| **Bonus dominio non generico** (es. dominio società/club, non gmail/hotmail…) | +30 | Fit B2B (firmografico) |

Punteggio massimo teorico **100**. La struttura ricalca il principio del lead scoring: pochi segnali pesati (5–8 max) per mantenere il modello **leggibile**, evitando l'opacità dei modelli a 30 input.

### 6.2 Esempi di calcolo (worked examples)

| Lead | Sport | Focus | Email valida | Dominio non generico | **SITG** | Banda |
|---|---|---|---|---|---|---|
| Atleta curiosa con gmail, senza focus | +20 | — | +30 | — | **50** | warm |
| Atleta motivata con gmail | +20 | +20 | +30 | — | **70** | hot |
| Genitore con email rotta | — | +20 | 0 | — | **20** | cold |
| Allenatore con email del club | +20 | +20 | +30 | +30 | **100** | hot |
| Contatto generico (solo email valida) | — | — | +30 | — | **30** | cold |

Si nota subito il punto debole strutturale: senza il **bonus dominio** (tipico delle società) è difficile superare 70 da soli i criteri atleta. È coerente col design: il modello premia i lead **B2B qualificati**, che sono quelli economicamente più preziosi.

### 6.3 Interpretazione e bande (soglie)

Mutuando le soglie tipiche dei modelli B2B (MQL ~40, SQL ~80) e adattandole alla scala SITG:

| Banda | Range SITG | Significato | Priorità di ricontatto |
|---|---|---|---|
| **Cold** | 0–39 | Curiosità o contatto debole; spesso email generica senza sport/focus | Nurturing automatico (sequenza email), nessun contatto 1:1 |
| **Warm** | 40–69 | Fit discreto: sport o focus + email valida; equivalente a **MQL** | Inserire in nurturing prioritario; ricontatto entro 72h se società |
| **Hot** | 70–100 | Forte fit + qualità: tipicamente email valida + dominio non generico (segnale B2B); equivalente a **SQL** | **Ricontatto umano entro 24h**, priorità massima per le società |

> Le bande mappano su `sitg_band` (sez. 5). Un lead **hot** con `user_type=societa` è il lead più prezioso in assoluto: combina intento commerciale e qualità del contatto.

### 6.4 Uso operativo: prioritizzare i ricontatti

1. **Routing.** I lead `hot` con `user_type ∈ {societa, allenatore}` vanno in cima alla coda di ricontatto manuale (entro 24h). I `warm` entro 72h. I `cold` solo nurturing automatico.
2. **Segmentazione email.** Sequenze diverse per banda: i `hot` ricevono un invito diretto a una demo/call; i `cold` ricevono contenuto educativo per "scaldarsi".
3. **Lettura del traffico.** Lo **SITG medio per canale** è un indicatore di **qualità della sorgente**: un canale con tanti lead ma SITG basso porta volume inutile. Spostare budget verso i canali ad alto SITG.
4. **Soglia di qualità per la NSM proxy.** Per la NSM proxy (sez. 2.3) contiamo come "lead qualificato" i lead **warm e hot** (SITG ≥ 40). I cold contano per il volume, non per la qualità.

### 6.5 Playbook di nurturing per banda

| Banda | Touchpoint 1 (giorno 0) | Touchpoint 2 | Touchpoint 3 | Obiettivo |
|---|---|---|---|---|
| **Hot (società)** | Email umana personalizzata + proposta call entro 24h | Call/demo | Proposta pilot stagionale | Pilot firmato |
| **Hot (atleta/genitore)** | Email di benvenuto + accesso prioritario beta | Anteprima feature | Inviti early access | Beta tester attivo |
| **Warm** | Email di benvenuto automatica | Contenuto di valore (storia, scienza dietro BAB) | Inviti a lasciare info aggiuntive (sport/focus) | Salire a hot |
| **Cold** | Sequenza educativa automatica | Re-engagement a 14 gg | Sondaggio "cosa ti serve?" | Qualificare o decadere |

### 6.6 Limiti e accorgimenti del modello SITG attuale

- **Solo dati espliciti.** Il SITG attuale è quasi tutto **fit/qualità del contatto**; non include segnali **comportamentali** (es. ha guardato la demo del Buddy, è tornato due volte). Evoluzione naturale: aggiungere punti per micro-conversioni (`waitlist_open` ripetuti, tempo sulla pagina demo).
- **Decay.** I modelli forti prevedono che i punti **decadano** dopo 30–60 giorni di inattività: un lead caldo a giugno non resta caldo a settembre senza nuova interazione. Da introdurre quando avremo segnali comportamentali nel tempo.
- **Calibrazione.** Le soglie (40/70) sono ipotesi iniziali: vanno **ricalibrate** confrontando il SITG con l'esito reale (chi ha risposto al ricontatto, chi ha fatto demo). Obiettivo: massimizzare la correlazione tra banda e conversione.
- **Validità predittiva.** Il SITG è utile solo se i lead `hot` convertono davvero più dei `cold`. Va verificato come esperimento (vedi sez. 7, E6).

### 6.7 SLA di ricontatto (per non bruciare i lead caldi)

La velocità di risposta è essa stessa una leva di conversione: un lead caldo non ricontattato si raffredda in fretta. Fissiamo SLA espliciti.

| Banda + tipo | SLA di primo contatto | Canale | Escalation |
|---|---|---|---|
| Hot + società/allenatore | **entro 24h** | email umana + call | se nessuna risposta in 48h, secondo tentativo |
| Hot + atleta/genitore | entro 48h | email beta prioritaria | sequenza early-access |
| Warm | entro 72h | email semi-automatica | nurturing |
| Cold | automatico immediato | sequenza educativa | re-engagement a 14 gg |

Metrica di processo da monitorare: **% di lead hot ricontattati entro SLA**. Target ≥ 90%. Se cala, è un collo di bottiglia operativo, non di domanda.

---

## 7. Esperimenti di validazione

Approccio **Build–Measure–Learn**: ogni assunzione rischiosa diventa un'**ipotesi falsificabile**, testata con un MVP minimo (qui: la landing e le sue varianti), con una **metrica** e un **criterio di successo** decisi *prima*. Si testano per primi gli assunti più rischiosi, per ridurre l'incertezza presto.

### 7.1 Gli assunti rischiosi di BAB (da falsificare)

1. **Domanda atleta:** esistono atlete 13–18 (o chi per loro) che vogliono un'app di cura/benessere e lasciano un contatto.
2. **Disponibilità a pagare delle società:** i club percepiscono valore nella Coach Dashboard al punto da chiedere una demo / pagare.
3. **Accettabilità della privacy aggregata:** genitori e coach accettano il modello "solo segnali aggregati anonimi".
4. **Messaggio:** quale framing converte meglio (cura di sé vs. performance vs. prevenzione infortuni).
5. **Qualità del segnale SITG:** lo score predice davvero la conversione.

### 7.2 Tabella esperimenti (ipotesi → metrica → criterio di successo)

| ID | Ipotesi | Variabile / intervento | Metrica primaria | Criterio di successo | Criterio di fallimento (pivot) |
|---|---|---|---|---|---|
| **E1** | C'è domanda atleta in Italia | Landing live, traffico in-target | Conversione lead atleta (visita→lead) | ≥ 6% su ≥ 1.000 sessioni in-target | < 2% |
| **E2** | Le società vogliono la Dashboard | Sezione "Per le Società" + form demo | demo_request rate (società) | ≥ 8 demo qualificate (SITG≥40) in 30 gg | < 3 demo |
| **E3** | Il framing "cura di sé" batte "performance" | A/B test copy hero (2 varianti) | CTA rate (waitlist_open+hero_cta) | Variante vincente con +20% rel. e significatività | Nessuna differenza |
| **E4** | Il form a 2 step non perde troppi utenti | step1→step2→submit | Step completion quiz_step2/step1 | ≥ 65% | < 50% (semplificare form) |
| **E5** | I genitori accettano la privacy aggregata | Microcopy privacy + sondaggio | % lead genitore + opt-out rate | opt-out < 5% e ≥ 50 lead genitore | opt-out > 15% |
| **E6** | Il SITG predice la conversione | Confronto banda vs. esito ricontatto | Tasso risposta per banda | hot risponde ≥ 2× di cold | hot ≈ cold (ricalibrare score) |
| **E7** | Esiste passaparola tra atlete | "Porta un'amica" / condivisione | Quota lead da referral | ≥ 10% lead da canale referral | < 2% |
| **E8** | I canali a pagamento valgono | Piccolo budget Meta in-target | SITG medio + CAC per lead | SITG medio ≥ organico × 0,8 | SITG molto più basso dell'organico |

### 7.3 Regole di disciplina sperimentale

- **Un'ipotesi per esperimento.** Niente test che cambiano cinque cose insieme.
- **Soglia di significatività e dimensione minima.** Non dichiarare un vincitore A/B sotto un campione adeguato (per CTA rate intorno a queste basi, servono tipicamente ≥ 1.000 sessioni per variante prima di concludere).
- **Decidere prima.** Criterio di successo scritto *prima* di vedere i dati, per evitare di razionalizzare il risultato.
- **Documentare l'apprendimento.** Ogni esperimento chiuso produce una riga in un "registro degli apprendimenti": ipotesi, risultato, decisione (persevera / pivota / itera).

### 7.4 Soglie di decisione complessive (go / pivot)

Al termine della finestra di validazione (es. 6–8 settimane):

- **GO (costruisci):** E1 ≥ 6% **e** E2 ≥ 8 demo qualificate **e** segnali privacy (E5) sani.
- **ITERA (cambia messaggio/offerta):** segnali misti — domanda atleta sì ma società no (o viceversa). Ripeti con nuovo framing/segmento.
- **PIVOT (cambia tesi):** E1 < 2% **e** E2 < 3 demo dopo traffico in-target sufficiente.

---

## 8. Retention e cohort per il prodotto futuro

La validazione dice se c'è domanda; la **retention** dirà se c'è un *prodotto*. È la metrica che separa gli utenti reali dai curiosi. Qui definiamo i modelli da implementare quando il prodotto sarà live.

### 8.1 Atleta: retention comportamentale

- **Unità di retention:** la settimana in cui l'atleta completa ≥ 1 loop di cura (coerente con la NSM).
- **Curva di cohort (settimanale):** per ogni coorte di iscrizione (settimana N), % ancora attive in N+1, N+2, … La diagnosi è la **forma** della curva:
  - *declino perpetuo* → niente PMF, l'app non crea abitudine;
  - *appiattimento (plateau)* → c'è un nucleo di valore reale: è il segnale che vogliamo;
  - *"smile" (risale)* → riattivazione/espansione del valore.
- **Obiettivo:** curva che **si appiattisce** dopo le prime 4–8 settimane su un plateau il più alto possibile. Il calo iniziale è fisiologico; conta dove si stabilizza.

#### Metriche di engagement atleta

| Metrica | Definizione | Lettura per BAB |
|---|---|---|
| **WAU** | atlete uniche con ≥1 loop in 7 gg | base sana per app benessere adolescenti |
| **MAU** | atlete uniche attive in 30 gg | denominatore di stickiness |
| **Stickiness WAU/MAU** | WAU / MAU | quanto è "settimanale" l'abitudine |
| **DAU/MAU** | DAU / MAU | da monitorare ma **non da massimizzare** (guardrail etico) |

> **Nota sui benchmark di stickiness.** Per le app consumer un DAU/MAU > 20% è considerato sano; social e gaming arrivano a 20–50%. Per BAB **non** inseguiamo i numeri da social: l'app salute per minori punta a un'abitudine **settimanale** sostenibile. La metrica di riferimento è **WAU/MAU**, non DAU/MAU.

#### Esempio di tabella di cohort (settimanale, illustrativo)

Lettura: ogni riga è la coorte iscritta in quella settimana; le colonne sono le settimane successive (% ancora attive). I numeri sono **illustrativi** per mostrare come si legge la forma.

| Coorte iscrizione | W0 | W1 | W2 | W3 | W4 | W8 | Forma |
|---|---|---|---|---|---|---|---|
| Settimana A | 100% | 55% | 42% | 38% | 36% | 35% | ✅ si appiattisce su ~35% |
| Settimana B | 100% | 48% | 30% | 20% | 12% | 4% | ❌ declino perpetuo |
| Settimana C | 100% | 60% | 50% | 48% | 50% | 53% | 😀 "smile" (risale) |

La domanda da porsi ogni settimana non è "quanti utenti ho perso" ma **"dove si stabilizza la curva?"**. Un plateau al 35% di atlete ancora attive a 8 settimane è un segnale forte di nucleo di valore; un declino verso lo zero dice che l'app non crea abitudine, indipendentemente da quante nuove atlete entrano in cima.

#### Formule di riferimento

- **Retention W_n** = (atlete della coorte attive nella settimana n) / (atlete della coorte in W0)
- **Stickiness** = WAU / MAU
- **Quick Ratio (crescita)** = (nuove + risvegliate) / perse — se < 1 la base si erode anche con tante acquisizioni

### 8.2 Società: retention contrattuale (rinnovo)

Per il B2B la retention è economica, non comportamentale quotidiana:

| Metrica | Definizione | Target indicativo |
|---|---|---|
| **Renewal rate (logo)** | % club che rinnovano la stagione successiva | ≥ 80% |
| **Net revenue retention** | revenue coorte club a 12 mesi / revenue iniziale | ≥ 100% |
| **Churn club** | % club persi nel periodo | ≤ 20%/anno |
| **Lead indicator di rinnovo** | % atlete attive del club + uso dashboard dal coach | usare come early warning |

L'**early warning** del rinnovo è comportamentale a monte: se nel club le atlete smettono di completare loop e il coach non guarda la dashboard, il rinnovo è a rischio **mesi prima** della scadenza. Qui la NSM e la retention atleta diventano predittori della revenue B2B.

### 8.3 Genitore: retention leggera

- **Unità:** apertura del **digest mensile** del segnale aggregato.
- **Metrica:** % genitori che aprono ≥ 1 digest al mese; trend su 3 mesi.
- Retention bassa attesa e accettabile: il genitore è un osservatore periodico, non un utente quotidiano.

---

## 9. Definizione di Product-Market Fit per BAB

Il PMF non è un sentimento: per BAB lo definiamo con **una soglia di sondaggio + una soglia comportamentale + una soglia economica**, perché abbiamo due lati (atleta gratis, società pagante).

### 9.1 Test del sondaggio (Sean Ellis 40%)

Quando avremo una base di atlete attive, somministriamo la domanda di **Sean Ellis**: *"Come ti sentiresti se non potessi più usare BAB?"* (molto delusa / un po' delusa / non delusa). La soglia di riferimento è **≥ 40% di "molto delusa"** come forte indicatore di product/market fit; sotto il 25% si fatica a crescere a ogni livello.

### 9.2 Test comportamentale (retention)

Il sondaggio da solo non basta: serve evidenza comportamentale. **Curva di cohort che si appiattisce** su un plateau positivo (utenti ancora attive a 3, 6, 12 mesi) = prova comportamentale di PMF. Una curva che non si appiattisce smentisce un buon punteggio Ellis.

### 9.3 Test economico (lato società)

Per il lato pagante, PMF significa **domanda B2B ripetibile e con churn basso**:

- club che pagano **senza sconti pesanti** né forzature;
- **renewal rate ≥ 80%**;
- **passaparola** tra club (referral B2B);
- ciclo di vendita che si **accorcia** col tempo (segnale che il messaggio "prende").

### 9.4 Tabella: segnali di PMF da monitorare

| Lato | Segnale | Soglia "ci siamo" | Segnale "non ancora" |
|---|---|---|---|
| Atleta | Sean Ellis "molto delusa" | ≥ 40% | < 25% |
| Atleta | Cohort retention | si appiattisce su plateau | declino perpetuo |
| Atleta | Passaparola (k-factor) | crescente | nullo |
| Società | Renewal rate | ≥ 80% | < 50% |
| Società | Ciclo di vendita | si accorcia | si allunga |
| Trasversale | "Problemi belli" (scalare, assumere) | presenti | assenti, fatica a ogni livello |

### 9.5 Come combinare i tre test (regole di lettura)

I tre test (sondaggio, comportamento, economia) vanno letti **insieme**, non isolati. Casi tipici:

- **Ellis alto + cohort piatta + rinnovi alti** → PMF solido su entrambi i lati: si scala.
- **Ellis alto + cohort che crolla** → falso positivo del sondaggio: la gente *dice* di amarlo ma non torna. Indagare l'onboarding e il valore reale del loop.
- **Cohort piatta + Ellis basso** → c'è un nucleo che usa il prodotto ma il messaggio/posizionamento non risuona col mercato ampio: lavorare sul segmento e sul framing.
- **Atleta bene + società no** → PMF di prodotto ma non di **business model**: rivedere offerta/prezzo B2B o il valore del segnale aggregato per il club.
- **Società sì + atleta no** → rischio strutturale: senza atlete attive il segnale aggregato si svuota e il club non rinnova. Priorità assoluta alla retention atleta.

> La regola: **il comportamento vince sul dichiarato, e il business model vince sul prodotto isolato.** BAB ha PMF solo quando atlete che tornano generano un segnale che i club pagano e rinnovano.

### 9.6 PMF in fase di validazione: i proxy

Non avremo il PMF "vero" durante la validazione. I **proxy** che cerchiamo ora:

- conversione lead atleta nella forbice alta (≥ 6–8%);
- società che chiedono **spontaneamente** un pilot/demo (pull, non push);
- SITG alto e crescente sui lead in-target;
- richieste e domande qualitative ("quando esce?", "posso provarlo per la mia squadra?") — segnale di *pull* di mercato.

---

## 10. Dashboard e cadenza di revisione

### 10.1 Cosa guardare ogni settimana (Weekly Growth Review)

Riunione/rito settimanale, 30 minuti, sempre nello stesso ordine (dall'output alle leve):

1. **NSM proxy** (lead qualificati settimana, trend 4 settimane).
2. **Funnel di validazione** (view → target_switch → waitlist_open → lead_submit/demo_request), conversioni di step vs. attese.
3. **Mix lead per `user_type`** e **SITG medio per banda e per canale**.
4. **Guardrail** (bounce, lead spam, opt-out).
5. **Stato esperimenti** (cosa è chiuso, cosa è in corso, decisioni go/pivot/iter).
6. **Una decisione**: la riunione finisce con *almeno una* azione sulle leve.

### 10.2 Layout della dashboard (validazione)

| Blocco | Widget | Fonte |
|---|---|---|
| **Nord** | NSM proxy: lead qualificati/sett (trend) | Supabase |
| **Funnel** | Funnel a imbuto con conversioni di step, segmentato per user_type | GA4 + Supabase |
| **Qualità** | SITG: distribuzione bande, SITG medio per canale | Supabase |
| **Sorgenti** | Lead e SITG medio per canale, CAC se paid | GA4/Meta + Supabase |
| **Guardrail** | Bounce, % spam, opt-out | GA4 + Supabase + email |
| **Esperimenti** | Tabella esperimenti attivi e stato | foglio/registro |

### 10.3 Cadenza per orizzonte temporale

| Cadenza | Cosa | Chi |
|---|---|---|
| **Giornaliera** (light) | Guardrail e anomalie (crollo conversione, spam spike) | Growth/PM |
| **Settimanale** | Weekly Growth Review (sez. 10.1) | Founder + Growth |
| **Mensile** | NSM proxy, decisioni go/pivot, ricalibrazione soglie SITG | Founder + advisor |
| **A regime (prodotto)** | Cohort retention, Sean Ellis, renewal club | Tutto il team |

### 10.4 Regole di igiene della dashboard

- **Trend, non istantanee.** Sempre confronto a 4 settimane; un numero singolo non dice nulla.
- **Segmenta sempre.** Per `user_type` e per canale. L'aggregato mente.
- **Annota gli eventi.** Lancio dominio, partenza campagne, modifiche copy: annotare sul grafico per leggere i salti.
- **Una metrica primaria visibile.** In cima, sempre, la NSM proxy. Tutto il resto la spiega.

---

## 11. Appendice: definizioni operative delle metriche chiave

Per evitare ambiguità, ogni metrica primaria ha qui la sua **definizione operativa univoca** (formula, fonte, finestra, owner). Una metrica senza definizione condivisa genera discussioni inutili.

| Metrica | Formula | Fonte | Finestra | Owner |
|---|---|---|---|---|
| NSM proxy (lead qualificati) | conteggio lead con SITG ≥ 40 | Supabase | settimanale | Growth |
| Conversione lead | lead_submit + demo_request / sessioni | GA4 + Supabase | settimanale, per canale | Growth |
| CTA rate | (waitlist_open + hero_cta) / sessioni | GA4 | settimanale | Growth |
| Step completion | quiz_step2 / quiz_step1 | GA4 | settimanale | PM |
| SITG medio | media(sitg_score) | Supabase | settimanale, per canale | Growth |
| % lead spam | lead con email invalida / lead totali | Supabase | settimanale | Growth |
| Opt-out rate | disiscritti / iscritti | tool email | mensile | Growth |
| WAU loop (prodotto) | atlete uniche con ≥1 loop in 7 gg | DB prodotto | settimanale | PM |
| Renewal rate (prodotto) | club rinnovati / club in scadenza | CRM | stagionale | Founder |
| Sean Ellis score (prodotto) | % "molto delusa" | sondaggio | trimestrale | PM |

### 11.1 Anti-pattern da evitare

- **Contare i lead dove non vanno contati.** I lead ufficiali sono su Supabase, non in GA4 (che dipende dal consenso).
- **Leggere un numero senza trend.** Sempre confronto a 4 settimane.
- **Aggregare i pubblici.** Atleta, società e genitore hanno economie diverse: mischiarli nasconde i segnali.
- **Massimizzare l'engagement dei minori.** Per BAB è un anti-pattern etico, non un obiettivo.
- **Festeggiare le vanity metric.** Visite e iscritti grezzi non sono la NSM.

---

## 12. Glossario

| Termine | Definizione |
|---|---|
| **NSM** | North Star Metric — l'unico numero che cattura il valore consegnato e predice la crescita. |
| **AARRR** | Acquisition, Activation, Retention, Revenue, Referral (Pirate Metrics). |
| **Activation** | L'utente compie l'azione chiave che fa percepire il valore (per BAB: primo loop di cura). |
| **Retention** | Quota di utenti che continuano a tornare/usare nel tempo. |
| **Cohort** | Gruppo di utenti che condividono un evento iniziale (es. settimana di iscrizione), tracciato nel tempo. |
| **DAU/WAU/MAU** | Utenti attivi giornalieri/settimanali/mensili. |
| **Stickiness** | DAU/MAU o WAU/MAU: quanto frequentemente tornano gli utenti. |
| **SITG** | Lead score interno BAB (0–100): fit + qualità del contatto. |
| **MQL / SQL** | Marketing/Sales Qualified Lead: fit + engagement (MQL), + intento (SQL). |
| **Guardrail** | Contro-metrica che impedisce di "crescere male". |
| **Vanity metric** | Numero che sale ma non cambia le decisioni. |
| **PMF** | Product-Market Fit. |
| **Build-Measure-Learn** | Ciclo lean: costruisci un MVP, misura, impara, persevera o pivota. |
| **k-factor** | Coefficiente virale: nuovi utenti generati per utente via referral. |

---

## 13. Fonti

**North Star Metric, input e guardrail**
- North Star Metric Framework (Product-Led Growth) — Umbrex: https://umbrex.com/resources/frameworks/marketing-frameworks/north-star-metric-framework-product-led-growth/
- North Star and Guardrail Metrics — Siftfeed: https://siftfeed.com/guides/north-star-guardrail-metrics
- The North Star Metric — Growth Method: https://growthmethod.com/the-north-star-metric/
- What Is a North Star Metric? — UXCam: https://uxcam.com/blog/north-star-metric-framework/

**AARRR / Pirate Metrics (Dave McClure)**
- AARRR Pirate Metrics Framework — ProductPlan: https://www.productplan.com/glossary/aarrr-framework
- The AARRR pirate funnel explained — PostHog: https://posthog.com/product-engineers/aarrr-pirate-funnel
- Pirate Metrics for Startups (PDF originale) — Dave McClure: https://mcgaw.io/wp-content/uploads/2016/04/PirateMetrics_Final.pdf
- AARRR: the Pirate Metrics Framework — Amplitude: https://amplitude.com/blog/pirate-metrics-framework

**Product-Market Fit (Sean Ellis 40%) e retention**
- Product/Market Fit Survey — Sean Ellis & GoPractice: https://pmfsurvey.com/
- Sean Ellis Score — Learning Loop: https://learningloop.io/glossary/sean-ellis-score
- The Sean Ellis 40% Test — FitSignal: https://www.fitsignal.com/blog/sean-ellis-40-percent-test
- How Superhuman Built an Engine to Find PMF — First Round Review: https://review.firstround.com/how-superhuman-built-an-engine-to-find-product-market-fit/

**Lean validation / Build-Measure-Learn**
- The Lean Startup — Principles: https://theleanstartup.com/principles
- Build-Measure-Learn Loop in Startups' MVP — Upsilon: https://www.upsilonit.com/blog/build-measure-learn-loop-in-startups-mvp
- Lean Experimentation: Step-by-Step Guide — Userpilot: https://userpilot.com/blog/lean-experimentation/

**Retention, cohort, stickiness (DAU/WAU/MAU)**
- Measuring Product Health — Sequoia: https://articles.sequoiacap.com/measuring-product-health
- The Essential Guide to the DAU/MAU Ratio — Gainsight: https://www.gainsight.com/essential-guide/product-management-metrics/dau-mau/
- Cohort Retention Analysis — Amplitude: https://amplitude.com/explore/analytics/cohort-retention-analysis
- DAU vs. MAU: App Stickiness Metrics — CleverTap: https://clevertap.com/blog/dau-vs-mau-app-stickiness-metrics/

**Lead scoring / qualification (SITG, MQL/SQL)**
- B2B Lead Scoring Criteria: 12 Signals + Point Values — Ivris: https://ivristech.com/b2b-lead-scoring-criteria/
- B2B Lead Scoring Model: 100-Point Template — Scalarly: https://scalarly.com/blog/b2b-lead-scoring-model/
- MQL, SAL, SQL: Lead Qualification Stages — Kubaru: https://kubaru.io/blog/mql-sal-sql-lead-qualification-stages/
- MQL to SQL Conversion Benchmarks (B2B SaaS) — Understory: https://www.understoryagency.com/blog/mql-to-sql-conversion-rate-benchmarks

---

*Documento di validazione BAB — fase pre-prodotto. Le soglie attese sono ipotesi di partenza da ricalibrare con i dati reali entro le prime 2 settimane dal lancio del dominio. Aggiornare la dashboard e questo documento a ogni Weekly Growth Review.*

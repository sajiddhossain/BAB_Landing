# 02 — Audit UX della landing

Analisi della Home attuale ([`src/components/Home.tsx`](../../src/components/Home.tsx)) e del
guscio ([`src/App.tsx`](../../src/App.tsx)) con la lente del [principio di fiducia](01-principio-fiducia.md).
Severità: 🔴 alta (intacca fiducia/orientamento) · 🟡 media · 🟢 punto di forza da preservare.

---

## Quadro d'insieme

**Punti di forza reali (da non toccare):**
- Accessibilità di base seria: skip-to-content, `aria-current`, focus-visible ovunque,
  `aria-pressed` sul toggle, `motion-reduce` sul marquee, `role="status"` sui fallback.
- Architettura informativa chiara: nav per persona, routing pulito, 404 in-brand.
- Coerenza estetica altissima: il sistema neobrutalista è applicato con disciplina.
- Privacy/GDPR già presi sul serio (cookie gate, analytics consent-first).

**Rischio sistemico #1 — densità costante.** La pagina è ad **alta energia dall'inizio alla
fine**: ogni sezione ha bordi `[4px]`, ombre dure, `skew`, doodle, nastri washi. Manca il
**pendolo** calma/energia ([01 §2](01-principio-fiducia.md)). Senza zone di respiro, l'occhio
non trova dove riposare e il tutto può leggere come "rumore" — l'opposto di "sicurezza totale".
→ vedi 03 §Ritmo.

**Rischio sistemico #2 — la prova di fiducia arriva tardi.** Il primo segnale forte e
*verificabile* per un buyer scettico (fonti dati, privacy) compare solo dopo molte sezioni.
Luna e i competitor mettono rating/expert-backed/parent-approved **subito sotto l'hero**.

---

## Sezione per sezione

### 0. Header / Nav — `App.tsx:229`
- 🟢 Logo a sinistra, nav per persona, CTA waitlist evidenziata, switch lingua chiaro.
- 🟡 **Cinque voci + lingua + CTA**: a `lg` può affollarsi nelle etichette IT. Verificare che
  non vada a capo o comprima la CTA. Considerare di raggruppare `App`/`Coach` sotto la logica
  delle due persone già usata nell'hero.
- 🟡 La CTA header "waitlist" e la CTA hero dinamica possono dire cose diverse: assicurarsi
  che il primo verbo che l'utente vede sia coerente (un solo "next step" dominante).

### 1. Hero — `Home.tsx:60`
- 🟢 Il **toggle Allenatore/Genitore** è un'ottima mossa: auto-segmentazione immediata,
  CTA e sottotesto dinamici. Rara chiarezza di "questo è per te".
- 🔴 **Carico cognitivo del primo viewport.** Nel primo schermo competono per attenzione:
  badge nastrato, h1 con highlight skew + doodle SVG, paragrafo, (mobile) foto nastrata,
  toggle 2 stati, sottotesto bordato, CTA grande, tag `appTag`. Sono **7–8 blocchi ad alto
  contrasto**: viola il test dello squint (niente domina) e alza la complessità visiva proprio
  nei 50 ms decisivi. → Stabilire **una** gerarchia: h1 → CTA come unici protagonisti; il
  resto retrocede (peso, bordo, ombra ridotti).
- 🟡 **Default del toggle = "allenatore"** (`Home.tsx:19`): il primo messaggio che legge un
  genitore/atleta è quello B2B. Valutare default per-contesto o un terzo stato neutro.
- 🟡 Il widget flottante "+ / widgetTitle" decora ma non comunica prova; potrebbe ospitare un
  micro-trust signal (es. "dati anonimi").

### 2. Marquee trust badges — `Home.tsx:224`
- 🟢 Idea giusta (GDPR · Backed by Science · Built with Elite Athletes), `aria-label` corretto.
- 🔴 **Sono claim non verificabili e in movimento.** Un marquee scorrevole legge come
  *decorazione/marketing*, non come *prova* — e il movimento abbassa la leggibilità nel punto
  in cui serve più credibilità. Inoltre attenzione ai guardrail claim ("Elite Athletes",
  "Backed by Science" vanno sostanziati). → Trasformare in una **trust-bar statica** con badge
  cliccabili che portano alla prova (fonti, pagina privacy). Vedi 03 §Segnali-di-fiducia.

### 1.5 La Missione — `Home.tsx:237`
- 🟢 Verde-teal (il colore-ponte), copy forte, gerarchia leggibile. Momento "calmo-ma-intenso".
- 🟡 Titolo con `WebkitTextStroke` + doppia drop-shadow su fondo scuro: controllare contrasto
  AA e che lo stroke non comprometta la leggibilità su mobile.

### 1.6 Il costo del silenzio (Senza/Con BAB) — `Home.tsx:260`
- 🟢 **Pezzo forte.** Il prima→dopo è il cuore emotivo del brand, mappato a citazioni reali.
  Comunica trasformazione in modo immediato.
- 🟡 Le emoji `💚`/`✕`/`✓` come marcatori: ok ma le emoji su brand health possono leggere
  informali. Coerente preferire gli SVG disegnati a mano già adottati altrove (cfr. commit
  "lucchetto e scudo disegnati a mano al posto delle emoji").
- 🟡 Affidarsi al solo colore (rosso spento vs evidenziato) per "male vs bene" → garantire che
  il significato passi anche senza colore (icona + barratura), per daltonici.

### 2. Il tuo bivio — `Home.tsx:320`
- 🟢 Ribadisce le due strade con pari dignità: buona scelta architetturale.
- 🔴 **Ridondanza con l'hero.** L'utente ha già scelto la persona nel toggle in cima; qui
  ripropone la stessa biforcazione. Rischio "déjà-vu/spaesamento" ("non avevo già scelto?").
  → Differenziare: l'hero *segmenta*, il bivio deve *approfondire* (cosa ottieni concretamente),
  o spostare il bivio più in alto e togliere il doppione.

### 3. Un problema sistemico (il ledger 50%→6%→0%) — `Home.tsx:395`
- 🟢🟢 **Il momento di massima fiducia della pagina** ed è dove serve: dati + **fonti citate**
  (`home.dataSources`) per il buyer senior. Numeri cavi allineati, ottima data-viz editoriale.
- 🔴 **È troppo in basso.** Questa è la prova che converte lo scettico: una versione compatta
  dovrebbe comparire molto prima (sotto l'hero), con la versione estesa qui.
- 🟡 Numeri in `text-transparent` con stroke + textShadow: verificare leggibilità/contrasto su
  mobile e che lo screen reader legga il valore (è testo, ok, ma controllare).

### 5. Testimonial (slider polaroid) — `Home.tsx:471`
- 🟢 Formato polaroid coerente, frecce accessibili, snap scroll.
- 🟡 **Credibilità delle testimonianze**: nomi senza foto/ruolo verificabile pesano poco su un
  pubblico scettico. Aggiungere contesto (sport, club, città) e — se reali — un marchio di
  verifica. Se sono placeholder, segnalarlo internamente: claim guardrail.
- 🟡 Slider orizzontale senza indicatore di quante card ci sono: aggiungere dot/contatore così
  l'utente sa che è scrollabile e quanto.

### 5.5 FAQ — `Home.tsx:519`
- 🟢 Posizione giusta: intercetta le obiezioni prima della chiusura.
- 🟡 Assicurarsi che la prima FAQ visibile sia **la domanda di sicurezza** ("chi vede i dati?"),
  non una operativa: è la leva di fiducia.

### 6. Manifesto + Privacy — `Home.tsx:522`
- 🟢 Chiudere sulla privacy è la scelta giusta per il tema.
- 🟡 Stesso punto del ledger: questa rassicurazione privacy meriterebbe un'**eco anticipata**
  vicino all'hero, non solo in fondo.

### Footer / Cookie / Waitlist modal — `App.tsx:388`
- 🟢 Cookie consent-first, modal lazy, focus management implicito da rivedere.
- 🟡 Verificare **focus-trap** nel `WaitlistModal` e nel menu mobile fullscreen (focus che non
  esce dal modale, ritorno del focus al trigger alla chiusura). Critico per a11y e per la
  sensazione di "controllo".

---

## Sintesi prioritaria (cosa muovere per primo)

| # | Intervento | Severità | Effetto su fiducia |
|---|---|---|---|
| 1 | Anticipare una **trust-strip compatta** (1 dato + privacy) sotto l'hero | 🔴 | alto |
| 2 | **Sfoltire il primo viewport**: una sola gerarchia h1+CTA | 🔴 | alto |
| 3 | Marquee → **trust-bar statica e verificabile** | 🔴 | alto |
| 4 | Introdurre **ritmo calma/energia** (sezioni di respiro) | 🔴 | alto |
| 5 | Risolvere **ridondanza hero↔bivio** | 🟡 | medio |
| 6 | Focus-trap modale/menu, dot slider, contrasto stroke | 🟡 | medio |

Le regole per realizzarli sono in [03 — Linee guida operative](03-linee-guida-operative.md).

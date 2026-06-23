# 03 — Linee guida operative

Regole azionabili per costruire fiducia e togliere lo spaesamento, senza tradire il
neobrutalismo. Pensate per essere citate in PR e review di design.

---

## Ritmo — il pendolo calma/energia <a id="ritmo"></a>

La pagina deve **respirare**. Alterna deliberatamente:

- **Zone ENERGIA** (neobrutalismo pieno): hero, manifesto/missione, costo del silenzio,
  testimonial. Bordi spessi, ombre dure, skew, doodle.
- **Zone CALMA** (bassa complessità): trust-strip, dati/fonti, privacy, form. Fondo neutro,
  meno bordi, un solo accento, più spazio bianco.

Regole:
1. **Mai due picchi di energia consecutivi** senza una zona calma in mezzo.
2. **Una sola "voce dominante" per sezione**: un titolo, un'azione, un colore d'accento.
   Se tutto è grassetto/bordato/ombreggiato, niente guida l'occhio (test dello squint).
3. **Spazio bianco = lusso, non spreco.** Aumentare il padding verticale tra blocchi; lo
   spazio comunica controllo e serietà al buyer.

---

## Gerarchia & primo viewport

- L'hero deve avere **due protagonisti e basta**: `h1` e CTA primaria. Tutto il resto
  (badge, tag, widget, sottotesto) è **secondario** → riduci peso, bordo, ombra, dimensione.
- **Un solo "next step" dominante** per schermata. Se ci sono CTA secondarie, devono essere
  visibilmente subordinate (ghost/testo, non un secondo bottone pieno).
- Applica una scala tipografica chiara: display (h1) ≫ heading (h2) ≫ corpo. Evita che corpo
  e heading abbiano lo stesso "peso percepito" per via di grassetto+uppercase ovunque.
- **Uppercase con parsimonia**: ottimo per label/badge corti, dannoso per leggibilità su
  frasi lunghe. Il corpo lungo va in case normale.

---

## Segnali di fiducia <a id="segnali-di-fiducia"></a>

Ordine di priorità (dal più forte al più debole per uno scettico):

1. **Prova verificabile** — fonti citate (già presenti nel ledger!), dato concreto,
   "expert-backed" con link.
2. **Privacy esplicita** — "i dati di tua figlia non li vede nessuno; il coach vede solo
   aggregati anonimi". Questa frase deve comparire **vicino all'hero**, non solo in fondo.
3. **Riprova sociale credibile** — testimonial con contesto (sport/club/città), rating,
   numeri d'uso. Niente nomi nudi.
4. **Conformità** — GDPR, server UE, titolare. Badge che **linkano alla prova**, non testo
   decorativo in movimento.

Regole:
- **Niente claim non sostenibili** (rispetta i *claims guardrails*): no "team medico", no
  "E2E", no "Techstars". Ogni badge deve reggere un click di verifica.
- Trasforma il **marquee scorrevole in trust-bar statica**: il movimento abbassa credibilità
  e leggibilità proprio dove serve fiducia.
- Crea un **micro-blocco privacy** riutilizzabile (icona lucchetto disegnata a mano + 1 frase
  + link) da usare sotto l'hero, nel form waitlist e nel footer.

---

## Motion & animazioni

- Le animazioni d'ingresso (framer-motion) vanno bene ma **brevi e una volta sola**; mai
  loop che distraggono nelle zone calma.
- **Rispetta `prefers-reduced-motion`** ovunque (il marquee già lo fa: estendere a tutte le
  entrate e agli hover-translate). Per un pubblico ansioso, il movimento ridotto è cura, non
  ripiego.
- Hover-translate/skew sui bottoni: ok come feedback, ma garantisci che lo stato sia
  riconoscibile anche da tastiera (`focus-visible` già presente — mantenerlo).

---

## Mobile-first

- Il primo viewport mobile è ancora più affollato (foto nastrata + toggle + CTA + tag).
  **Taglia il superfluo su mobile**: foto più piccola o sotto la CTA, tag `appTag` spostato.
- **Target touch ≥ 44×44px** (toggle, frecce slider, chip lingua: verificare).
- Slider testimonial: aggiungere **indicatore di posizione** (dots/contatore) e affordance di
  swipe; su mobile l'utente deve sapere che c'è altro a destra.
- Menu fullscreen: **focus-trap** + ritorno focus al trigger; bloccare lo scroll del body
  (già fatto in `App.tsx:113`).

---

## Accessibilità (oltre a quanto già fatto bene)

- **Non affidare significato al solo colore** (Senza/Con BAB, ledger): aggiungi sempre
  icona/forma/etichetta. Daltonismo + modalità alto contrasto.
- **Contrasto AA**: i testi con `WebkitTextStroke`/`textShadow` su fondi colorati vanno
  verificati con un checker; lo stroke non conta come contrasto del riempimento.
- **Focus-trap** in tutti i layer modali (waitlist, menu, dropdown lingua).
- **Heading order** senza salti (h1→h2→h3); i badge stilizzati non devono essere heading
  semantici se non lo sono.
- Le **emoji decorative** vanno con `aria-hidden` (già fatto in più punti) o sostituite con
  gli SVG hand-drawn del brand per coerenza e tono.

---

## Tono visivo per persona (dove va l'energia)

| Contesto / pagina | Energia | Calma | Note |
|---|---|---|---|
| Hero, manifesto, costo del silenzio | ●●● | ● | il cuore athlete-facing |
| Trust-strip, dati/fonti, privacy | ● | ●●● | qui si conquista il buyer |
| `/coach` (Coach Dashboard) — B2B | ●● | ●●● | serietà, struttura, prova; "compromessi invisibili" |
| `/app` (AppSimulator) — atleta | ●●● | ● | gioco, scrapbook, divertimento |
| Form waitlist & legal | ● | ●●● | minima frizione, massima chiarezza/controllo |

---

## Checklist pre-rilascio (da spuntare in PR di UI)

- [ ] Il primo viewport passa il **test dello squint** (emergono solo h1 + CTA)?
- [ ] C'è **un solo next step** dominante per schermata?
- [ ] Una **prova di fiducia** (dato/privacy) è visibile entro 1 scroll dall'hero?
- [ ] Ogni **claim/badge** è verificabile (regge un click) e rispetta i guardrail?
- [ ] La pagina **alterna** zone energia/calma (niente 2 picchi di fila)?
- [ ] Tutti i **modali** hanno focus-trap + ritorno focus + Escape?
- [ ] Nessun significato è affidato **al solo colore**?
- [ ] `prefers-reduced-motion` rispettato su entrate, hover, marquee?
- [ ] Contrasto **AA** verificato sui testi con stroke/shadow?
- [ ] Target touch ≥ 44px sugli elementi interattivi mobile?

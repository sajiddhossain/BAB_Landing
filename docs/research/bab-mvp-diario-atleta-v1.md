# BAB — MVP Diario Atleta · Sistema di domande (v1)

> **Scopo del test:** dare a **20 atlete di atletica leggera** un sistema di journaling per **2 settimane** e misurare **quanto lo compilano** (aderenza). Non testiamo le feature: testiamo se la pratica quotidiana regge.
> **Metrica #1:** % di giorni compilati per atleta + curva di abbandono.
> Status: **DRAFT** — copy da approvare; semaforo/RED-S da validazione clinica.
> Pseudonimo: ogni atleta = un codice (es. `BAB-7F3K`), nessun nome reale nei dati del diario.

---

## Principio guida (aderenza prima di tutto)
- **Daily < 60 secondi.** Tutto a tap/slider. Una sola nota libera, **opzionale**.
- **Stessa struttura ogni giorno.** La costanza vale più della ricchezza.
- **Un "dolce" che fa tornare:** ogni giorno un micro-contenuto (quiz/pillola) dopo il check-in.
- Se un campo rischia di far mollare → spostalo nel settimanale.

---

## 0. Baseline (Giorno 0 · una volta sola, ~2 min)
Serve da fotografia di partenza e da consenso.

1. **Codice atleta** (assegnato): `BAB-____`
2. **Disciplina:** velocità / mezzofondo-fondo / salti / lanci / ostacoli / prove multiple
3. **Fascia d'età:** 14–15 / 16–17 / 18+
4. **Da quanto ti alleni in modo strutturato:** <1 anno / 1–3 / 3+
5. **Ciclo mestruale:**
   - Ho un ciclo regolare
   - Ho un ciclo irregolare
   - Non ho ancora avuto il primo ciclo
   - Uso contraccezione ormonale
   - Preferisco non rispondere
6. **In una settimana normale, quanto ti senti in forma?** (1–5)
7. **Quanto pensi che ti sarà facile compilare ogni giorno?** (1–5) ← *baseline di aspettativa, da confrontare a fine test*
8. ☐ Consenso informato (dati pseudonimi, salute, cancellazione a fine test) · ☐ 14+ (o consenso genitore allegato)

---

## 1. Check-in giornaliero (il cuore · ogni giorno, <60s)

Usa il linguaggio BAB così è già "esperienza", non questionario.

**1.1 — Chi sta giocando oggi?** *(stato, no risposta giusta)*
💪 Energia · 🧠 Concentrazione · ❤️ Emozioni · 😴 Recupero
→ *E chi ha bisogno di supporto oggi?* (1 scelta)

**1.2 — Energia** (slider 1–5: scarica → carica)

**1.3 — Sonno di stanotte** (slider 1–5: pessimo → ottimo)

**1.4 — Oggi ti sei allenata?**
- Sì → **quanto è stata dura?** (RPE 1–10)
- Riposo programmato
- No (avrei dovuto)

**1.5 — Fastidi/dolori?** (tap multiplo, default "nessuno")
nessuno · tibie · caviglia · ginocchio · coscia post. (femorali) · polpaccio · anca · schiena · piede · altro
→ se selezioni qualcosa: *forte e improvviso?* sì/no

**1.6 — Ciclo oggi** (1 tap)
nessuno · leggero · medio · abbondante · non applicabile

**1.7 — (Opzionale) Una cosa sul tuo corpo oggi** (nota libera, max 200, *si può saltare*)

> Tutto qui sono ~6 tap. È il minimo che cattura: umore/stato, energia, sonno, carico, infortuni, ciclo.

---

## 2. Layer scoperta (il "dolce" · 1 micro-contenuto/giorno)

Dopo il check-in, un contenuto breve. Rotazione sui contenuti già scritti ([bab-demo-quiz-content-v1.md](bab-demo-quiz-content-v1.md)). NON un punteggio per le modalità "Specchio".

Calendario proposto (14 giorni):

| Giorno | Contenuto | Tipo |
|---|---|---|
| 1 | Se il tuo corpo fosse un allenamento → micro-azione | 🪞 |
| 2 | Time Out: cosa ti serve? | 🪞 |
| 3 | Semaforo del corpo | 🧭 |
| 4 | (solo check-in) | — |
| 5 | Corpo in aggiornamento | 🧭 |
| 6 | Come lo diresti al coach | 🗣️ |
| 7 | **Riflessione settimanale** (sotto) | — |
| 8 | Se il tuo corpo fosse un allenamento | 🪞 |
| 9 | Time Out: cosa ti serve? | 🪞 |
| 10 | Semaforo del corpo | 🧭 |
| 11 | (solo check-in) | — |
| 12 | Come lo diresti al coach | 🗣️ |
| 13 | Squadra interiore (approfondito) | 🪞 |
| 14 | **Exit survey** (sotto) | — |

---

## 3. Riflessione settimanale (Giorno 7 · ~2 min)
1. **Com'è andata la settimana col corpo?** (1–5)
2. **Hai mangiato abbastanza per quello che hai fatto?** sempre / quasi / a volte no / spesso no *(segnale fueling/RED-S, tenuto settimanale per non appesantire il daily)*
3. **C'è qualcosa che vorresti dire al coach ma non hai detto?** (nota libera, opzionale)
4. **Compilare il diario questa settimana è stato:** facile / ok / faticoso

---

## 4. Exit survey (Giorno 14 · ~3 min)
1. Quanto è stato **facile** compilarlo? (1–5)
2. Ti ha fatto **notare qualcosa** su di te? sì molto / un po' / no
3. Lo **continueresti** dopo il test? sì / forse / no
4. Cosa ti ha fatto **mollare** nei giorni in cui non l'hai fatto? (scelta multipla: dimenticato / troppo lungo / non mi interessava / problemi tecnici / altro)
5. **Cosa mancava** o cosa toglieresti? (nota libera)
6. Il **reminder** ti è arrivato/servito? sì / no / non l'ho ricevuto

---

## 5. Cosa misuriamo (il senso del test)
Metriche da loggare (eventi, non solo risposte):

- **Completion rate giornaliero** = giorni con check-in / 14 → *metrica #1*
- **Curva di abbandono** = in che giorno iniziano a saltare
- **Distribuzione per atleta** (chi compila 13/14 vs chi 3/14)
- **Orario di compilazione** (quando, e se dopo il reminder)
- **Engagement quiz** = % che apre il contenuto del giorno
- **Fill-rate nota libera** = scrivono o solo tap?
- **Aspettativa vs realtà** = domanda baseline #7 vs exit #1

**Lettura:** >70% completion medio = segnale forte; sotto, capiamo *dove e perché* si rompe (curva + exit Q4).

---

## Aperti (non bloccano la scrittura delle domande, ma decidili prima del lancio)
1. **Solo maggiorenni o anche under-18?** (se under, serve consenso genitore → vedi baseline #8)
2. **Canale reminder:** email / Telegram / WhatsApp / web-push (la mia proposta: canale affidabile + push opzionale)
3. **Revisione clinica** del Semaforo del corpo e dei segnali RED-S (stanchezza pluri-giorno, fueling).

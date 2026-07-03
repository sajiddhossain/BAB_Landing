# BAB — Il check di oggi · Domande quotidiane (v1)

> **La feature che fa girare tutta la macchina BAB.** Mini check-in da ~2 minuti, **uguale ogni giorno** per **10–14 giorni**, su un gruppo di **20 atlete di atletica leggera, 13–14 anni**.
> **Unico scopo del test:** capire se lo compilano. Se non rispondono a 2 min di domande al giorno, il modello va sistemato qui prima di costruire altro.
> Status: **DRAFT** — copy da approvare. Tono e linguaggio pensati per ragazzine di 13–14 anni.

---

## Regole di design (perché è fatto così)
- **Stesse domande ogni giorno.** Serve per abitudine *e* per misurare: senza un set fisso non possiamo confrontare i giorni né leggere la curva di abbandono.
- **Tutto a tocco.** Faccine e slider, **niente numeri freddi**. A 13–14 anni le faccine funzionano, i punteggi no.
- **≤ 2 minuti.** 3 blocchi, ~10 micro-tocchi totali. Una sola domanda aperta, **opzionale**.
- **Mai far sentire "sbagliata".** Nessuna risposta è giusta o sbagliata. Il ciclo si può saltare. Non averlo ancora è del tutto normale.
- **Si può sempre saltare una domanda** senza sensi di colpa.

---

## 🟢 Una volta sola (Giorno 1, ~1 min)
Solo per dare un contesto ai dati. Niente nome reale.
- **Codice atleta:** `BAB-____`
- **La tua specialità:** corsa veloce · mezzofondo/fondo · salti · lanci · ostacoli · non lo so ancora
- **Quanti anni hai:** 13 · 14
- **Il ciclo:** ce l'ho (più o meno regolare) · ce l'ho ma irregolare · non l'ho ancora avuto · preferisco non dirlo

---

# Il check di oggi (uguale ogni giorno)

Apertura calda, non una domanda:
> *"Ciao! 30 secondi per te. Come stai oggi?"*

---

## 🧠❤️ TIPO 1 — TESTA E CUORE
*Come ti senti dentro* · ~30 sec

**1. Come ti senti oggi?**
😞 · 😕 · 😐 · 🙂 · 😄

**2. E con lo sport, oggi come sei messa?** *(scegli 1)*
- ⚡ Carica e motivata
- 🙂 Tranquilla
- 😬 Un po' nervosa / in ansia
- 😴 Stanca di testa
- 😶 Poca voglia

**3. Oggi ti senti sotto pressione?**
😌 per niente —•———— tantissimo 😣 *(slider a 5 faccine)*

---

## 💪 TIPO 2 — IL TUO CORPO
*Come va il motore* · ~50 sec

**4. Quanta energia hai nel corpo oggi?**
🔋 scarica —•———— a mille ⚡ *(slider 1–5)*

**5. Come hai dormito stanotte?**
😴 malissimo —•———— benissimo 🌙 *(slider 1–5)*

**6. Oggi ti sei allenata?**
- ✅ Sì → **Quanto è stata dura?** facile 😮‍💨 —•———— durissima 🥵 *(1–5)*
- 🔵 Era giorno di riposo
- ❌ No (avrei voluto)

**7. Hai qualche fastidio o dolore?** *(puoi toccarne più di uno · default "Tutto ok")*
Tutto ok · Tibie/stinchi · Caviglia · Piede · Polpaccio · Ginocchio · Coscia dietro · Anca · Schiena · Altro
→ se ne tocchi uno: **"È un dolore forte o arrivato all'improvviso?"** Sì / No

**8. Il ciclo, oggi?** *(1 tocco · si può saltare)*
- 🚫 Non ce l'ho / non è il momento
- 🔴 Sì, oggi c'è
- 🟠 Sta per arrivare
- 🌱 Non l'ho ancora avuto

---

## 🗣️ TIPO 3 — LA TUA VOCE
*Una cosa tua* · ~30 sec

**9. Se il tuo corpo oggi fosse un allenamento, sarebbe…** *(scegli 1)*
- 🔥 Sprint (esplosiva)
- ⚡ Tecnica (ci sono, ma da curare)
- 🌱 Recupero attivo (piano piano)
- 🛌 Riposo (oggi scarica)

**10. Vuoi aggiungere una cosa?** *(facoltativo — anche una sola parola, o salta 😊)*
`[ scrivi qui… ]`

> Chiusura calda: *"Fatto 💚 Ci vediamo domani."*

---

## Riepilogo: le 3 tipologie
| Tipo | Cosa cattura | Formato | Domande |
|---|---|---|---|
| 🧠❤️ **Testa e cuore** | umore, stato mentale, pressione | faccine / scelta / slider | 1–3 |
| 💪 **Il tuo corpo** | energia, sonno, carico, dolori, ciclo | slider / scelta / tap multiplo | 4–8 |
| 🗣️ **La tua voce** | ascolto di sé + espressione libera | scelta + testo opzionale | 9–10 |

---

## Cosa significa "compilato" e cosa misuriamo
- **Compilato = ha risposto al Tipo 1 e Tipo 2** (il cuore). Tipo 3 e domanda aperta sono bonus.
- **Metrica #1:** giorni compilati / totale, per ogni atleta.
- **Curva di abbandono:** in che giorno iniziano a saltare.
- **Quante scrivono** nella domanda 10 (segnale di coinvolgimento vero).
- **Orario:** quando compilano (utile per tarare il reminder).

**Lettura del test:** se in media restano sopra ~70% dei giorni → il modello regge, andiamo avanti. Se crollano → la domanda 10 dell'exit ("cosa ti ha fatto mollare") ci dice se è troppo lungo, noioso, o tecnico.

---

## I miei consigli (sintesi)
1. **Non aggiungere un 4° tipo.** Tre blocchi è il massimo per stare sotto i 2 minuti. La tentazione di "chiedere anche…" è la cosa che uccide l'aderenza.
2. **Una sola domanda aperta, opzionale.** Forzare la scrittura fa mollare. Lasciala come regalo, non come compito.
3. **Ciclo: gentile e saltabile.** A 13–14 anni alcune non l'hanno ancora avuto: "Non l'ho ancora avuto" deve essere un'opzione normale, mai un errore.
4. **Reminder (quando lo imposti tu):** stessa ora ogni sera, **dopo l'allenamento** (es. 20:30). La costanza dell'orario conta più del canale.
5. **Stesso set per tutte e 14 le sere.** Non cambiare le domande a metà: rovinerebbe sia l'abitudine sia la misura.
6. **Tienilo "leggero" anche nel tono:** apertura e chiusura calde ("30 secondi per te" / "Ci vediamo domani 💚") fanno percepire il diario come un momento per sé, non un test.

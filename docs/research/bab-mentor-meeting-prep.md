# BAB — Prep incontro col mentor

> Obiettivo dell'incontro: **validare l'approccio** del mini-test (l'idea è giusta e fattibile? cosa miglioreresti?).
> Io sono il developer; il mentor è una guida, non chi costruisce.

---

## Come spiegare l'idea (60 secondi)

> "BAB aiuta le giovani atlete a stare bene e a conoscersi meglio. Il cuore del prodotto è un **check-in quotidiano**: due momenti brevissimi — la **mattina** ('come mi sento') e subito **dopo l'allenamento**, nello spogliatoio, in 20 secondi ('com'è andata').
>
> Prima di costruire l'app vera, vogliamo testare l'unica cosa da cui dipende tutto il resto: **lo fanno davvero?** Diamo a **20 atlete di atletica leggera (13-14 anni)** una web app semplicissima, vissuta come un **diario per diventare più consapevoli**, per **14 giorni**. La CEO va **di persona** nella società sportiva a presentarlo alle ragazze.
>
> Backend leggero: sottodominio di babsport.com, **Supabase**, un **codice personale** per ogni ragazza così sappiamo chi compila senza login pesanti.
>
> Se in 2 settimane lo compilano con costanza, il modello regge e costruiamo sopra. Se no, sistemiamo le domande prima di spendere sul resto."

---

## Le decisioni che abbiamo già preso (da raccontare)
- **Si testa l'aderenza, non le feature.** Metrica #1: quante ragazze compilano, quanti giorni.
- **Web app, non app da scaricare.** Per 14 giorni è inutile lo store.
- **Due check-in:** mattina (readiness) + post-allenamento (RPE/com'è andata) — è il modello del monitoraggio sportivo vero.
- **Reclutamento in presenza** della CEO = la leva di aderenza più forte.
- **Codice/nickname personale** (non UUID anonimo, non login con password): dati puliti + recuperabili, frizione minima.
- **Niente tracciamento del ciclo** → meno dati sensibili.
- **Pseudonimo, non anonimo** + minorenni → consenso genitori + informativa.
- **UX:** una domanda per schermata, slider/selezioni, feedback immediato, scrittura facoltativa, onboarding caloroso, schermata-risultato come ricompensa.
- **Contenuto mattutino** già pronto: «La squadra interiore» (energia/concentrazione/emozioni/motivazione → spingere/recuperare).

---

## Domande da fare al mentor

### ⭐ La domanda numero uno
**"È giusto testare prima di tutto l'aderenza? O c'è una domanda più importante a cui dovrei rispondere con queste 2 settimane?"**

### Sull'approccio / la scommessa
- Due check-in al giorno sono troppi per un primo test, o il doppio aggancio (mattina + spogliatoio) aiuta a creare l'abitudine?
- Il framing "diario per la consapevolezza" è quello giusto per delle tredicenni, o rischia di sembrare un compito?

### Sul disegno del test
- 20 ragazze e 14 giorni sono abbastanza per imparare qualcosa di reale, o è troppo poco?
- Quale **soglia di aderenza** mi fa dire "funziona, vado avanti" vs "il modello va sistemato"?
- Le ragazze reclutate di persona sono motivate: come distinguo l'entusiasmo iniziale da un'abitudine vera (effetto novità)?

### Sulle scelte tecniche
- Web app + Supabase + codice personale: è solido per un test così, o sto sovra/sotto-ingegnerizzando?
- Reminder senza contatti salvati: meglio affidarsi a un promemoria **sociale** (allenatrice nel gruppo squadra) che a una notifica tecnica?

### Su minorenni ed etica
- Cosa serve davvero per essere a posto col consenso dei genitori e l'informativa, senza appesantire l'esperienza?
- C'è una **rete di sicurezza** che dovrei prevedere se una ragazza segnala più giorni "giù"? (rimando a un adulto di riferimento)

### La domanda aperta finale
**"Cosa stiamo sovra-ingegnerizzando? Cosa taglieresti per un test di 2 settimane?"**

---

## Se hai 5 minuti, queste 4
1. È giusto testare prima l'aderenza?
2. Due check-in al giorno: troppi o ok?
3. Qual è la soglia che fa dire "funziona"?
4. Cosa taglieresti / cosa ci sfugge?

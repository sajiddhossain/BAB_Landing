# BAB · Quiz 1 «La tua squadra interiore» — Spec logica + UX (di Gaia)

> Estratto dai due file di Gaia (`BAB_Quiz1_logica_UX.xlsx.pdf` e `…(1).pdf`).
> **La versione (1) è la più recente/ricca** → è quella canonica. Differenze elencate in fondo.
> Tono: ragazze **13–15 anni**. Colonna "Trigger logico" = pseudocodice per chi sviluppa.

---

## Cos'è
Il check si basa su **4 "giocatrici" interiori**:
- 💪 **Energia** — slider 0–100
- 🧠 **Concentrazione** — slider 0–100
- ❤️ **Emozioni** — selezione multipla a chip (positive / ansia / rabbia / tristezza)
- 🚀 **Motivazione** — slider 0–100

Ogni risposta apre una **card** (titolo + microcopy + azione + CTA). Dopo le 4 risposte, una **schermata-risultato** dice se è giornata da spingere o da recuperare.

---

## FOGLIO 1 — Logica risposte singole

### 💪 Energia (slider)
| ID | Stato | Trigger | Titolo | Microcopy | Azione | CTA |
|---|---|---|---|---|---|---|
| EN-L | Bassa | ≤33 | Modalità risparmio 🔋 | "Oggi la tua Energia è un po' giù, e va benissimo. Non vuol dire fermarti: vuol dire partire piano ed ascoltarti." | 3 respiri lenti, sorso d'acqua, snack veloce; parti con calma. Affermazione: «Oggi il mio corpo va più piano, e va bene: gli voglio bene lo stesso.» | Provo adesso |
| EN-M | Media | 34–66 | In equilibrio | "L'energia c'è ma è importante dosarla." | Parti col tuo ritmo, ricontrolla dopo i primi minuti. | Ok, ci sono |
| EN-H | Alta | ≥67 | Hai benzina ⚡ | "Oggi sei carica! Usa questa energia nei momenti chiave, non tutta nei primi minuti." | Scegli un momento in cui spingere di più. | Sì, spingo |

### 🧠 Concentrazione (slider)
| ID | Stato | Trigger | Titolo | Microcopy | Azione | CTA |
|---|---|---|---|---|---|---|
| CO-L | Bassa | ≤33 | La testa vola 💭 | "Se oggi concentrarsi sembra più difficile, non preoccuparti, capita a tutte: non sei tu il problema." | Esercizio àncora: nomina 3 cose che vedi + 1 che senti col corpo. Poi 1 solo obiettivo piccolo. | Mi riporto qui |
| CO-M | Media | 34–66 | Presente | "Ci siamo. Una piccola routine ti aiuta a restare sul pezzo." | Respiro profondo + parola-chiave (es. 'via'). | Ci sono |
| CO-H | Alta | ≥67 | Mente lucida 🎯 | "Oggi la tua testa è al top. Sfruttala per la qualità, non solo per fare tanto." | Scegli una cosa da curare nei dettagli oggi. | Ci lavoro |

### ❤️ Emozioni (chip multi-selezione)
| ID | Categoria | Titolo | Microcopy | Azione | CTA |
|---|---|---|---|---|---|
| EM-POS | gioia/entusiasmo/calma | Sei nel momento giusto ☀ | "Ti senti bene — ricordati com'è questa sensazione: è uno stato che potrai richiamare." | Condividila: incoraggia una compagna. Affermazione: «Sto bene, mi merito questo momento e qui ho il mio posto.» | Prontissima! |
| EM-ANX | ansia/nervi/agitazione | Un po' di nervi 🦋 | "Sentire i nervi prima di fare qualcosa è normale: vuol dire che ci tieni." | Respiro 4s dentro / 6s fuori ×4. Affermazione: «Anche con un po' di paura, sono abbastanza e posso farcela.» | Respiro con te |
| EM-ANG | rabbia/frustrazione | C'è un po' di rabbia 🔥 | "La rabbia ha energia dentro. Scaricala nel corpo, poi torni più leggera." | Stringi i pugni 5s e molla, o corsa breve. | Scarico |
| EM-SAD | tristezza/giù/stanchezza emotiva | Giornata un po' giù 🌧 | "Oggi va bene esserci e basta. Non devi dare il massimo per forza." | Sii gentile con te; se ti va dillo a qualcuno di fiducia. Affermazione: «Anche nei giorni storti valgo, e sono amata.» | Ok, grazie |

> EM-SAD: nessun invito a "spingere". Se selezionata spesso → valuta messaggio di supporto/adulto di riferimento.

### 🚀 Motivazione (slider)
| ID | Stato | Trigger | Titolo | Microcopy | Azione | CTA |
|---|---|---|---|---|---|---|
| MO-L | Bassa | ≤33 | Poca voglia oggi 😴 | "Oggi la voglia è poca, e può capitare. Spesso torna dopo che hai iniziato, non prima." | Ricorda il tuo perché + obiettivo piccolissimo. Affermazione: «Il mio valore non dipende da quanto faccio oggi.» | Ci provo |
| MO-M | Media | 34–66 | Voglia normale | "Hai una voglia normale di esserci. Un piccolo traguardo la rende più viva." | Scegli una cosa da portarti a casa oggi. | Ok |
| MO-H | Alta | ≥67 | Carica 🚀 | "Sei super motivata! È il giorno giusto per uscire dalla comfort zone." | Prova qualcosa di un po' più difficile. | Ci sto |

---

## FOGLIO 2 — Risultato finale (dopo le 4 risposte)
**Conteggio:** basse = slider ≤33 + emozione negativa · alte = slider ≥67 + emozione positiva.

| ID | Scenario | Trigger | Titolo | Azione / CTA |
|---|---|---|---|---|
| CB-REC | 3–4 giocatrici giù | n_basse ≥ 3 | Giornata di recupero 🌙 | "Recuperare = amarsi. Riposa, dormi bene. Domani si riparte." → *Mi prendo cura di me* |
| CB-PUSH | 2+ al top | n_alte ≥ 2 | Giornata per spingere 🔥 | "La tua squadra interiore è in forma." Obiettivo più ambizioso. → *Accetto la sfida* |
| CB-ONE | 1 sola giù | n_basse == 1 | Una sola da supportare 🤝 | Deep-link alla micro-azione della giocatrice bassa. → *Aiuto la mia giocatrice* |
| CB-BAL | equilibrio | default | Giornata regolare ⚖ | "Ascolta la giocatrice che ha bisogno e parti." → *Si parte* |

---

## FOGLIO 3 — Legenda, regole, tono di voce
- **Slider:** Bassa 0–33 · Media 34–66 · Alta 67–100. UX: **slider senza numeri**, solo "bassa ↔ alta"; il valore resta interno.
- **Emozioni:** chip multi-categoria. Se più categorie → mostra **prima il supporto** (ansia/rabbia/tristezza), **poi** il rinforzo positivo.
- **Regola d'oro (cuore di BAB):** 1 giù → micro-gesto e continui · 3+ giù → giornata di recupero · 2+ al top → giornata da spingere. **Obiettivo: imparare QUANDO spingere e QUANDO recuperare.**
- **Tono 13–15:** dare del tu, caldo; **valida sempre prima** ("capita a tutte"); mai imporre (inviti, non "devi"); frasi brevi, niente gergo; stare bene non è un dovere di performare. Le frasi valgono anche in **off-season** (parlano della "giornata", non solo dell'allenamento).
- **Nota di sicurezza:** se tristezza/recupero si ripetono per molti giorni → messaggio gentile che invita a parlarne con un **adulto di riferimento** (allenatrice/famiglia).

---

## FOGLIO 4 (solo file 1) — Affermazioni, 3 varianti da ruotare
L'app mostra una variante a rotazione. Temi: valore, sentirsi abbastanza/amata, accettazione del corpo che cambia — **mai la performance**. Sempre in prima persona e in positivo.

- **EN-L:** «Oggi il mio corpo va più piano, e va bene così» · «Il mio corpo sta facendo del suo meglio, e lo ringrazio» · «Riposare non mi rende meno forte»
- **EM-ANX:** «Credo in me e posso farcela» · «I nervi vogliono dire che ci tengo: respiro e ce la faccio» · «Non devo essere perfetta per valere: basto io»
- **EM-SAD:** «Anche nei giorni storti valgo, e sono amata» · «Non esistono emozioni giuste o sbagliate» · «Anche quando sono giù, merito di ascoltarmi ed amarmi»
- **MO-L:** «Il mio valore non dipende da quanto riesco a fare oggi» · «Anche il più piccolo passo è un progresso» · «Un piccolo passo è comunque mio»
- **EM-POS:** «Mi merito di godermi questo momento» · «Questa gioia è mia e me la tengo» · «Sono al posto giusto, posso brillare senza chiedere permesso»

---

## Differenze tra i due file (usa il (1) come canonico)
Il file **(1)** aggiunge rispetto al primo:
- **Card "affermazione" ripetibili** integrate nelle azioni (EN-L, EM-ANX, EM-SAD, MO-L, EM-POS).
- **Foglio 4** con 3 varianti di affermazione da ruotare.
- Microcopy più caldo/esteso; titoli rifiniti ("Giornata **di** recupero", "Giornata **per** spingere").
- Nota **off-season** (le frasi parlano della "giornata", non solo dell'allenamento).
- Piccole emoji (CO-L 🌤 → 💭).

---

## Come si incastra nel MVP (mia lettura)
Questo **è** il "Tipo 1 — Testa e cuore" del [check-in quotidiano](bab-checkin-domande-quotidiane-v1.md), ma molto più ricco e curato. Da notare:
- Copre **mente/stato interiore** (Energia/Concentrazione/Emozioni/Motivazione). **NON** copre il fisico (sonno, carico, dolori, ciclo) → quello resta il "Tipo 2", da affiancare.
- Le **micro-azioni** (respiro, àncora, affermazioni) sono già **dietro un CTA** ("Provo adesso") → opt-in. Per l'aderenza è giusto tenerle opzionali: il flusso veloce resta *4 input → risultato push/recover*.
- La **nota di sicurezza** (tristezza/recupero ripetuti → adulto di riferimento) va implementata come regola vera nel test, trattandosi di minorenni.

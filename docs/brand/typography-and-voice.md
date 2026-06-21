# BAB — Tipografia & Tono di Voce

> Terzo pilastro della bibbia del brand, con **[vision-and-target.md](./vision-and-target.md)** e **[color-system.md](./color-system.md)**.
> La tipografia porta la personalità; la voce porta la fiducia. Entrambe devono suonare come una **sorella maggiore + scienziata**, mai paternalistiche né cliniche.

---

## 1. I caratteri (2 ruoli)

| Ruolo | Font | Uso | In codice |
|---|---|---|---|
| **Display** | **Bricolage Grotesque** (800/900, opsz alto) | Titoli, numeri eroe, badge. Carattere forte, "da poster". Usato con decisione, non per il testo lungo. | `font-['Bricolage_Grotesque',_sans-serif]` |
| **Body** | **Space Grotesk** (400–700) | Testo corrente, paragrafi, label, dati. Leggibile, tecnico-ma-umano. | `font-['Space_Grotesk',_sans-serif]` |

Caricati via Google Fonts in `index.html`/`index.css`. Niente terzo font: la varietà la danno **peso, dimensione, maiuscolo e skew**, non altre famiglie.

---

## 2. Scala tipografica (mobile → desktop)

| Livello | Classi Tailwind | Peso | Note |
|---|---|---|---|
| Hero H1 | `text-4xl md:text-5xl lg:text-6xl` | `font-black` | display, `tracking-tighter`, `leading-[1.1]` |
| Sezione H2 | `text-4xl sm:text-6xl` (fino a `7xl`) | `font-black` uppercase | spesso con highlight/box |
| Numero eroe | `text-6xl sm:text-7xl` (fino a `8rem`) | `font-black` | display, spesso cavo + contorno ink |
| H3 / sottotitolo | `text-2xl sm:text-3xl` | `font-black` | |
| Body | `text-base sm:text-lg` | `font-bold` / `font-extrabold` | Space Grotesk |
| Label / dato | `text-xs` / `text-[11px]` uppercase | `font-black` | `tracking-widest` |

**Regole tipografiche**
- Display = `font-black` (900). Body emphasis = `font-bold`/`font-extrabold` (700/800).
- Maiuscolo (`uppercase`) per titoli/label/badge; sentence/normale per il testo lungo.
- `tracking-tighter` sui titoloni; `tracking-widest` su label piccole.
- Lo **skew** (`skew-btn`, `-skew-x-6`) e il contorno (`WebkitTextStroke`) sono "accessori" del display: uno alla volta, non cumulati su testo piccolo (vedi [[bab-design-principle]] — compromessi invisibili sul percorso B2B).

---

## 3. Tono di voce

**Personalità:** energica, onesta, dalla parte della ragazza. *Agonismo empatico* — forte ma tenera, femminile ma non zuccherosa, scientifica ma non clinica.

**Principi**
1. **Parla *con* l'atleta, non *di* lei.** "Ascolta il tuo corpo", non "monitoraggio dei parametri".
2. **Le sue parole valgono più dei dati.** Le citazioni reali ("Appartengo") battono qualsiasi statistica.
3. **Diretto e concreto.** Verbi attivi, niente burocratese, niente medichese.
4. **Il bottone dice cosa fa** e mantiene lo stesso nome nel flusso ("Entra in lista d'attesa" → "Sei in lista d'attesa").
5. **Italiano nativo** (mercato primario). EN/FR strutturali. Mai mix di lingue maccheronico.

### Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| "Ti aiuta a riconoscere, comprendere e gestire i segnali del tuo corpo." | "Sistema di monitoraggio biometrico per la prevenzione infortuni." |
| "Performando al meglio e sentendoti meglio." | "Ottimizzazione delle performance atletiche." |
| "Il vuoto che BAB colma." | "Soluzione data-driven per il gender gap." |
| "Sono sbagliata" → "Appartengo" (parole vere) | claim clinici non verificabili |
| "Solo dati aggregati e anonimi. Mai il ciclo individuale." | esporre fasi del ciclo individuali |

### Note di registro
- **Errori/vuoti = direzione, non scuse.** "Non siamo riusciti a salvare la tua richiesta. Riprova tra poco." (cosa è successo + come rimediare).
- **Niente performance/infortuni come messaggio primario** verso le atlete (decisione CEO): il primo messaggio è *corpo & consapevolezza*. La prevenzione/retention resta nel linguaggio **B2B** (club).
- **Trust per chi compra:** verso club/genitori il tono si fa più sobrio e rassicurante (privacy, GDPR, "spazio sicuro"), pur restando in-brand.

---

## 4. Microcopy ricorrente (glossario)
- "Entra in lista d'attesa" (non "Iscriviti"/"Submit")
- "Per le Società" (B2B), "Chi siamo" (About)
- "Check-in", "energia squadra", "segnali aggregati" (Coach — onesti, MVP)
- "L'allenatrice fuori dal campo" (tagline piattaforma)

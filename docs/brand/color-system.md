# BAB — Sistema Colore

> Deriva da **[vision-and-target.md](./vision-and-target.md)**. Ogni colore ha un *ruolo* e un *significato*: non si usano tutti insieme, si scelgono in base a cosa deve provare la persona davanti allo schermo.
> Token implementati in `src/index.css` (`@theme`) → utility Tailwind (`bg-coral`, `text-deepteal`, …).

---

## 1. Principi (le regole d'armonia)

1. **Il colore segue l'emozione, non la decorazione.** Mappa il colore al *momento* (problema vs riscatto, energia vs calma).
2. **Caldo per l'atleta, sereno per chi compra.** Le superfici athlete-facing possono cantare; quelle coach/genitore restano teal + neutri, disciplinate.
3. **Niente blu notte.** Il navy è ritirato. Il "non-maschile" si ottiene dalla *palette calda*, non ammorbidendo i bordi.
4. **Il nero è inchiostro.** `#0F0F12` resta per bordi, testo e ombre: dà il punch neobrutalista e fa risaltare i colori. Non è un "colore", è la penna.
5. **Due livelli per ogni famiglia:** un colore *pieno* (saturo, per accenti/blocchi/evidenziatori) e un *tint* chiaro (per superfici/sfondi morbidi).
6. **Spendi l'audacia in un punto.** In una sezione: un colore eroe + neutri attorno. Lo spettro pieno (arcobaleno) solo dove ha senso narrativo (es. il coro "Con BAB").

---

## 2. La palette

### CORE — l'identità (questi 6 *sono* BAB)

| Colore | Hex | Ruolo | Note |
|---|---|---|---|
| **Cream** | `#FAF9F6` | Carta / spazio sicuro (sfondo primario) | la pagina del diario |
| **Ink** | `#0F0F12` | Bordi · testo · ombre | la penna; mai come "tema scuro" generico |
| **Deep Teal** | `#143F36` | Superfici scure "spazio sicuro" / fiducia | sostituisce il navy ritirato |
| **Vivid Teal** | `#1F7A63` | Brand primario / "ci sono io per te" | il verde-teal è il ponte tra atleta e coach |
| **Electric Lime** | `#D4F46A` | Vai / azione / energia positiva | il "sì, parti!" |
| **Bubble Pink** | `#FF8FB1` | Il corpo · il ciclo · femminilità senza scuse | mossa coraggiosa: rosa come **core**, non accessorio |

> **Perché il rosa nel core:** è la risposta più diretta a "non deve essere maschile". Il rosa rivendica "questo è per le ragazze" senza chiedere permesso. Usato con il nero e il teal resta forte, non zuccheroso.

### SPETTRO EMOTIVO — energia, gioco, benessere (accenti con significato)

| Colore | Hex | Significato (gamification / emozione) |
|---|---|---|
| **Coral** | `#FF6B5C` | Energia · sfida · allarme · "fatica" |
| **Sunny Gold** | `#FFC042` | Ricompensa · badge · vittoria |
| **Sky Blue** | `#8FD4E8` | Calma · respiro · recupero |
| **Soft Lavender** | `#B8A9E8` | Umore · emozioni · introspezione |

### NEUTRI & TINT (superfici morbide)

| Colore | Hex | Ruolo |
|---|---|---|
| **Sand** | `#E8E4D8` | Carta secondaria / superficie spenta |
| **Peach** | `#FFE3D1` | Tint del corallo (superficie calda) |
| **Pale Lavender** | `#EBE5FF` | Tint della lavanda (superficie) |
| **Sage Lime** | `#DAE69A` | Tint del lime (superficie morbida) |

### LEGACY in migrazione (presenti nel sito, da armonizzare nel tempo)

| Colore | Hex | Stato |
|---|---|---|
| **Yellow** | `#FFDE4D` | CTA storica. Convive con Sunny Gold; tenerlo come **giallo CTA/highlight**, non moltiplicarlo. |
| **Bright Teal** | `#34BBC0` | Accento interattivo storico (cyan). Tenere come "teal brillante"; il *brand* primario però è Vivid Teal `#1F7A63`. |
| **Navy** | `#3B4A6B` | ❌ **RITIRATO.** Sostituito da Deep Teal. Non reintrodurre. |

---

## 3. Mappatura semantica (quando uso cosa)

- **Fiducia / "spazio sicuro" / sezioni serie:** Deep Teal, Vivid Teal, neutri.
- **Call-to-action / "vai":** Yellow (CTA principale storica) + Electric Lime (energia). Un solo CTA dominante per vista.
- **Energia / sfide / gioco:** Coral, Sunny Gold.
- **Corpo / ciclo / temi femminili:** Bubble Pink (+ Peach come tint).
- **Calma / recupero / mood:** Sky Blue, Soft Lavender (+ Pale Lavender come tint).
- **Problema / "vecchio modo":** spento — Sand/Peach, testo barrato, Coral come segnale di dolore.
- **Riscatto / "modo BAB":** acceso — Cream/bianco con lo **spettro caldo** (lime/sky/pink/lavender/gold) come coro.

---

## 4. L'arco emotivo applicato (caso reale: "Il costo del silenzio")

- **Lato Senza BAB:** carta Peach, voci **barrate** in Coral, monocromo e spento. Ombra **nera** (peso).
- **Lato Con BAB:** carta bianca, voci **evidenziate** ruotando lo spettro caldo (lime → sky → pink → lavender → gold), spunte Vivid Teal. Ombra **rosa** (vivo).

La struttura *è* il messaggio: spento↔acceso, nero↔rosa.

---

## 5. Accessibilità (contrasto)

Regola pratica nel nostro stile (testo bold su blocchi pieni con bordo nero):

- **Testo nero (`#0F0F12`)** su: Cream, Sand, Peach, Pale Lavender, Sage Lime, Electric Lime, Yellow, Sunny Gold, Bubble Pink, Sky Blue, Soft Lavender, Coral → **OK** (tutti chiari/medi).
- **Testo bianco** SOLO su: Deep Teal, Vivid Teal, Ink. (Coral `#FF6B5C` regge il bianco solo in grande/bold, non per testo piccolo.)
- I **bordi neri** garantiscono separazione anche tra tinte simili (es. lime su crema).
- Mantenere `focus-visible` e rispettare `prefers-reduced-motion` (già in essere).

---

## 6. Applicazione scrapbook

- **Bordi:** sempre Ink `#0F0F12`, 3–4px.
- **Ombre dure:** Ink per il default; usa un **colore caldo** (es. Pink, Teal, Lime) quando vuoi segnalare "vivo/positivo".
- **Nastri washi:** Sunny Gold, Soft Lavender, Sky Blue (pastelli) con `clip-path` strappato.
- **Evidenziatori:** lo spettro caldo con `box-decoration-clone`.
- **Doodle:** Vivid Teal / Coral / Pink secondo il tono del punto.

---

## 7. Do / Don't

✅ **Do**
- Un colore eroe per sezione + neutri.
- Rosa e lavanda come segnali femminili **forti** (con nero).
- Deep Teal per le superfici scure serie.

❌ **Don't**
- Reintrodurre il navy o qualsiasi blu freddo "corporate".
- Usare tutti i colori in ogni sezione (diventa rumore).
- Cambiare i bordi neri in colore (si perde il punch).
- Testo piccolo bianco su Coral/giallo/lime.

---

## 8. Token (in `src/index.css` → `@theme`)

```
cream #FAF9F6 · sand #E8E4D8 · ink #0F0F12 · deepteal #143F36
vividteal #1F7A63 · teal #34BBC0 · sky #8FD4E8
lime #D4F46A · sagelime #DAE69A · yellow #FFDE4D · gold #FFC042
coral #FF6B5C · peach #FFE3D1 · pink #FF8FB1 · lavender #B8A9E8 · palelavender #EBE5FF
```

Uso: `bg-deepteal`, `text-pink`, `shadow-[6px_6px_0_0_var(--color-coral)]`, ecc.

---

## 9. Stato della migrazione

- [x] Navy `#3B4A6B` ritirato → Deep Teal (hero highlight, sezione Platform, colonna coach Bivio).
- [x] Spettro caldo introdotto con significato (sezione "Il costo del silenzio").
- [x] Token palette v2 definiti in `@theme`.
- [ ] Propagazione graduale (una sezione alla volta): Bivio, Funzionalità, About, Coach.
- [ ] Decidere se il brand-teal interattivo passa da `#34BBC0` (cyan) a `#1F7A63` (vivid) anche nelle CTA/hover.
- [ ] Verificare contrasto AA sui nuovi accoppiamenti man mano che si applicano.

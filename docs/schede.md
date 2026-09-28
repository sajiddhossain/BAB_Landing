# Schede A4 stampabili

Le schede sono lo strumento di distribuzione più concreto del sito: una società le stampa e le
appende nello spogliatoio perché risolvono un suo problema, e ognuna porta in fondo l'indirizzo
dell'articolo e l'invito al sondaggio (`/sondaggio`).

| Scheda | PDF pubblicato | Articolo di riferimento | Data |
| --- | --- | --- | --- |
| Colpo alla testa: cosa fare nei primi minuti | `/schede/colpo-alla-testa.pdf` · EN `/schede/head-impact.pdf` | `commozione-cerebrale-giovani-atlete` (link nella sezione «Quando si chiama subito il 118?») | 2026-09-28 |

## Regole

- **Nessun contenuto nuovo**: una scheda riassume un articolo pubblicato e ne eredita le fonti, che
  stanno in fondo alla pagina. Se un dato non è nell'articolo, non va nella scheda.
- Il limite della popolazione viaggia con il numero anche qui (es. «69 atleti di 12-19 anni,
  campione piccolo»).
- Chiude sempre con «materiale educativo, non parere medico».
- Una pagina A4, niente di più: verificare il numero di pagine del PDF dopo il render.

## Come si rigenera

Sorgente in `docs/schede/` (copia di `bab-design-system/schede/`, dove il render funziona perché
i percorsi relativi puntano a token, CSS e logo del design system):

```bash
cd ../bab-design-system
python3 schede/build-colpo-testa.py   # testi IT/EN → colpo-alla-testa.{it,en}.html
./scripts/render.sh schede/colpo-alla-testa.it.html ../BAB_Landing/public/schede/colpo-alla-testa.pdf
./scripts/render.sh schede/colpo-alla-testa.en.html ../BAB_Landing/public/schede/head-impact.pdf
```

I link ai PDF funzionano anche dentro l'app React: il click handler di `App.tsx` lascia passare
i percorsi con estensione di file invece di trattarli come rotte.

## Prossime candidate

«La regola del collo» (ritorno all'attività con il raffreddore), «I segnali della RED-S»,
«Caldo: quando fermare l'allenamento». Una per run al massimo, e solo da articoli già pubblicati.

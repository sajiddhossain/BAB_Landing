# Sondaggio agli allenatori — come si distribuisce

Il sondaggio vive su **https://www.babsport.com/sondaggio**. Questo file è il piano per
raccogliere le risposte. Va tenuto aggiornato a mano: è l'unico punto in cui si sa a chi si è
già scritto.

## Perché questo, e perché adesso

Il sito ha tre mesi, nessun backlink e nessun pubblico di partenza. SEO, AEO e GEO sono canali
*pull*: rendono solo quando qualcuno cerca **e** Google si fida già. Il sondaggio serve a
rompere quel cerchio per tre motivi, in ordine di importanza:

1. **Produce un dato italiano.** Tutti i 100+ numeri del sito vengono da studi stranieri, e una
   rassegna di studi stranieri non la linka nessuno. Il primo numero italiano su un tema lo cita
   chiunque ne scriva — ed è così che arrivano i primi backlink veri.
2. **È un pretesto legittimo per scrivere a sconosciuti.** «Leggi il mio articolo» non si può
   chiedere. «Rispondi a dieci domande in tre minuti e ti mando i risultati» sì.
3. **Costruisce una lista.** Chi lascia l'email è un contatto qualificato, ricontattabile, e non
   dipende da Google.

**Obiettivo minimo: 150 risposte.** Sotto quella soglia il dato non si pubblica — si dice che il
sondaggio è ancora aperto. Un numero costruito su 40 risposte è peggio di nessun numero: è
esattamente il tipo di statistica debole che il resto del sito si impegna a non pubblicare.

## Come si dichiara il dato, quando si pubblicherà

Non negoziabile, vale come per ogni altro numero del sito: **campione di convenienza, non
rappresentativo**. La frase da usare, ogni volta, accanto a ogni percentuale:

> Sondaggio online BAB su **N** persone che allenano o dirigono squadre giovanili femminili in
> Italia, raccolto fra {data} e {data} tramite società sportive e comitati. **Campione di
> convenienza, non rappresentativo della popolazione degli allenatori italiani**: le percentuali
> descrivono chi ha risposto, non l'Italia.

Quando i risultati si pubblicano vanno in `src/data/facts.ts` come gli altri, con `source: 'BAB,
2026 (sondaggio, campione di convenienza)'` e senza DOI.

## Il messaggio

Tre regole, per esperienza su cosa fa rispondere una società sportiva: **corto**, **niente
allegati al primo contatto** (finiscono nello spam), **una sola richiesta**.

### Email a una società sportiva

> **Oggetto:** 3 minuti per una ricerca sullo sport femminile giovanile
>
> Buongiorno,
>
> mi chiamo {nome} e curo BAB, un progetto sulla salute delle atlete adolescenti: pubblichiamo
> materiale gratuito e con le fonti su ciclo, crescita, infortuni e carichi (babsport.com).
>
> Stiamo raccogliendo il primo dato italiano su una cosa di cui non esistono numeri: che cosa sa,
> concretamente, chi allena ragazze. Dieci domande, tre minuti, anonimo — non è un test e non c'è
> una risposta giusta.
>
> **https://www.babsport.com/sondaggio**
>
> Se lo girate a chi allena nella vostra società ci fate un favore grande. A chi lascia l'email
> mandiamo i risultati in anteprima, prima della pubblicazione.
>
> Grazie,
> {nome} — BAB

### Messaggio per WhatsApp / gruppi di allenatori

> Ciao, sto raccogliendo il primo dato italiano su che cosa sa davvero chi allena ragazze
> (ciclo, colpi alla testa, safeguarding, formazione ricevuta). 10 domande, 3 minuti, anonimo,
> non è un test: https://www.babsport.com/sondaggio — se lo giri a un'altra persona che allena
> mi aiuti parecchio.

## A chi scrivere, in ordine di resa

Si parte dai gruppi che hanno già un pubblico: non si costruisce un pubblico, si prende in
prestito quello di chi ce l'ha.

| # | Destinatario | Perché risponde | Fatto? |
| --- | --- | --- | --- |
| 1 | Società di pallavolo/basket femminile della propria provincia | Rapporto diretto, il tema le riguarda | ☐ |
| 2 | Comitati regionali FIPAV / FIP / FIGC femminile | Hanno newsletter da migliaia di iscritti e cercano contenuti formativi gratis | ☐ |
| 3 | Docenti di corsi allenatori e di scienze motorie | Il materiale con i DOI è ciò che mettono in bibliografia | ☐ |
| 4 | Gruppi Facebook di genitori e allenatori di sport giovanile | È dove il pubblico sta davvero, e non cerca su Google | ☐ |
| 5 | Fisioterapisti e nutrizionisti dello sport su Instagram | Ricondividono materiale con le fonti perché li fa sembrare seri | ☐ |
| 6 | Giornaliste/i che si occupano di sport femminile | Non per il sondaggio: per **i risultati**, quando ci saranno | ☐ |

**Regola del contatto:** si scrive una volta, si aspetta dieci giorni, si manda **un solo**
sollecito di due righe. Poi si lascia perdere. Un secondo sollecito brucia il contatto per sempre,
e questi contatti servono anche dopo.

## Registro dei contatti

Da compilare a mano, una riga per ente. Serve a non riscrivere due volte agli stessi e a sapere
quale canale ha reso.

| Data | Ente | Canale | Persona | Esito | Risposte stimate |
| --- | --- | --- | --- | --- | --- |
| | | | | | |

## Attivazione tecnica (una volta sola)

1. Supabase → SQL Editor → esegui `docs/supabase_survey_setup.sql`.
2. Verifica che le variabili `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` siano già su Vercel
   (lo sono: le usa la waitlist).
3. Facoltativo: `VITE_SUPABASE_SURVEY_TABLE` se vuoi un nome di tabella diverso da `survey_coach`.
4. Manda **tu** la prima risposta e controlla che la riga arrivi. Se non arriva, quasi sempre è la
   policy RLS: la tabella deve avere la sola `insert` per il ruolo `anon`.

Le risposte **non** sono leggibili dal browser (nessuna policy SELECT): lo spoglio si fa nello SQL
Editor di Supabase. In fondo al file SQL c'è la query di esempio.

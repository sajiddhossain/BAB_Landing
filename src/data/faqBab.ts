/**
 * @file      src/data/faqBab.ts
 * @summary   Le domande su BAB — cos'è, per chi, cosa NON fa, che fine fanno i dati,
 *            come sono scritti i contenuti. Sono le uniche FAQ del sito che parlano
 *            del progetto invece che di fisiologia: quelle sui contenuti vivono nei
 *            singoli articoli, ognuna con la propria ancora.
 *            Alimenta la pagina /faq (e /en/faq), il dato strutturato FAQPage e
 *            il file /faq.txt letto dagli assistenti.
 *            Regola per chi scrive qui: nessuna affermazione che non regga davanti a
 *            un genitore scettico. Niente funzioni non ancora esistenti, niente
 *            certificazioni non ottenute, niente promesse cliniche.
 * @author    Sajid Hossain <sajid.hossain2009@gmail.com>
 * @copyright (c) 2026 Breaking All Barriers. Tutti i diritti riservati.
 */

export interface FaqEntry {
  /** Ancora stabile: /faq#{id} è l'URL citabile di questa singola risposta. */
  id: string;
  q: string;
  a: string;
  qEn: string;
  aEn: string;
}

export const FAQ_BAB: FaqEntry[] = [
  {
    id: 'cose-bab',
    q: 'Che cos’è BAB (Breaking All Barriers)?',
    a: "BAB è un progetto italiano dedicato alla salute e alla performance delle giovani atlete di 13-17 anni. Due componenti: un'app in cui l'atleta annota in privato i segnali del proprio corpo — energia, umore, recupero, dolore, ciclo mestruale — e una parte per la società sportiva, che riceve solo segnali aggregati e anonimi della squadra, mai il dato di salute della singola. Attorno a questo c'è un blog basato su letteratura peer-reviewed, con la fonte citata per ogni affermazione di salute.",
    qEn: 'What is BAB (Breaking All Barriers)?',
    aEn: "BAB is an Italian project dedicated to the health and performance of young female athletes aged 13-17. Two parts: an app in which the athlete privately notes the signals of her own body — energy, mood, recovery, pain, menstrual cycle — and a club-facing side that receives only aggregated, anonymous team signals, never an individual's health data. Around this sits a blog grounded in peer-reviewed literature, with a source cited for every health claim.",
  },
  {
    id: 'a-chi-si-rivolge',
    q: 'A chi si rivolge BAB?',
    a: "A due pubblici distinti. Le atlete adolescenti e le loro famiglie, che hanno bisogno di un linguaggio per capire cosa succede al corpo durante la pubertà. E allenatori e società sportive, che hanno bisogno di segnali di squadra leggibili senza diventare operatori sanitari e senza entrare nella salute della singola atleta. Il blog è scritto per essere utile a entrambi: i dati sono gli stessi, cambia cosa se ne fa chi legge.",
    qEn: 'Who is BAB for?',
    aEn: 'Two distinct audiences. Adolescent athletes and their families, who need a language for what happens to the body during puberty. And coaches and clubs, who need readable team-level signals without becoming healthcare providers and without entering an individual athlete’s health. The blog is written to be useful to both: the data is the same, what changes is what the reader does with it.',
  },
  {
    id: 'bab-fa-diagnosi',
    q: 'BAB fa diagnosi o sostituisce un medico?',
    a: "No, in nessun caso. BAB è uno strumento educativo e di osservazione: aiuta a notare e a mettere in parole ciò che l'atleta sente, non a stabilire che cosa sia. Non produce diagnosi, non prescrive terapie e non decide rientri dopo un infortunio: quelle decisioni sono di un professionista sanitario. Quando i contenuti citano una soglia clinica lo fanno per indicare quando vale la pena chiedere un parere, non per sostituirlo.",
    qEn: 'Does BAB diagnose anything, or replace a doctor?',
    aEn: 'No — never. BAB is an educational and observational tool: it helps notice and put into words what an athlete feels, not determine what it is. It produces no diagnoses, prescribes no treatment and decides no return-to-play: those decisions belong to a healthcare professional. Where the content cites a clinical threshold, it does so to indicate when it is worth seeking an opinion, not to replace one.',
  },
  {
    id: 'chi-vede-i-dati',
    q: 'Chi vede i dati di salute di un’atleta che usa BAB?',
    a: "Solo l'atleta. Il principio di progetto è che il dato individuale di salute non arriva alla società sportiva: allenatori e dirigenti vedono esclusivamente indicatori aggregati e anonimi di squadra, cioè come sta andando il gruppo, mai chi ha scritto cosa. È una scelta di architettura prima che di policy, ed è anche la condizione perché una quattordicenne scriva la verità: se sa che l'allenatore leggerà, non scriverà.",
    qEn: 'Who can see the health data of an athlete using BAB?',
    aEn: 'Only the athlete. The project principle is that individual health data never reaches the club: coaches and staff see exclusively aggregated, anonymous team indicators — how the group is doing, never who wrote what. It is an architectural choice before it is a policy one, and it is also the condition for a fourteen-year-old writing the truth: if she knows her coach will read it, she will not write it.',
  },
  {
    id: 'dove-sono-i-dati',
    q: 'Dove sono conservati i dati e con quali garanzie?',
    a: "I dati sono conservati su infrastruttura gestita all'interno dell'Unione Europea (regione di Francoforte, Germania) e il trattamento segue il GDPR. Il titolare del trattamento è indicato nella privacy policy del sito. I dati non vengono usati per addestrare modelli di intelligenza artificiale. Le informative complete — privacy, cookie e termini — sono pubblicate sul sito e sono la fonte autorevole su questo punto: quanto scritto qui è un riassunto, non il testo legale.",
    qEn: 'Where is the data stored, and under what guarantees?',
    aEn: 'Data is stored on infrastructure managed inside the European Union (Frankfurt region, Germany) and processing follows the GDPR. The data controller is named in the site’s privacy policy. Data is not used to train artificial-intelligence models. The full notices — privacy, cookies and terms — are published on the site and are the authoritative source on this point: what is written here is a summary, not the legal text.',
  },
  {
    id: 'come-si-usa-in-societa',
    q: 'Come si usa BAB in una società sportiva?',
    a: "L'idea è che costi trenta secondi al giorno all'atleta e nessuna competenza clinica alla società. L'atleta risponde a poche domande sul proprio stato; la società vede l'andamento aggregato della squadra e può accorgersi che un gruppo sta accumulando fatica prima che qualcuno si fermi. Non richiede un medico in sede, non sostituisce lo staff sanitario e non produce cartelle cliniche: produce la domanda che nessuno fa e la traccia che nessuno tiene.",
    qEn: 'How is BAB used inside a sports club?',
    aEn: 'The idea is that it costs the athlete thirty seconds a day and the club no clinical expertise. The athlete answers a few questions about how she is; the club sees the team-level trend and can notice a group accumulating fatigue before someone breaks down. It requires no doctor on site, does not replace medical staff and produces no clinical records: it produces the question nobody asks and the record nobody keeps.',
  },
  {
    id: 'app-disponibile',
    q: 'L’app BAB è già disponibile?',
    a: "Non ancora pubblicamente: l'accesso avviene tramite lista d'attesa e sperimentazioni con società sportive, mentre il prodotto è in sviluppo. Il blog, invece, è pubblico e gratuito da subito, in italiano e in inglese, ed è la parte del progetto già utilizzabile da chiunque: atlete, famiglie, allenatori.",
    qEn: 'Is the BAB app available yet?',
    aEn: 'Not publicly yet: access runs through a waiting list and pilots with sports clubs while the product is in development. The blog, by contrast, is public and free right now, in Italian and English, and is the part of the project anyone can already use: athletes, families, coaches.',
  },
  {
    id: 'come-sono-scritti-i-contenuti',
    q: 'Su cosa si basano i contenuti del blog BAB?',
    a: "Su letteratura peer-reviewed, citata in fondo a ogni articolo con il DOI dove esiste. Tre regole editoriali che valgono per ogni pezzo: ogni numero ha una fonte; la popolazione studiata viene sempre dichiarata insieme al numero; quando uno studio è stato condotto su atlete adulte l'articolo lo dice esplicitamente invece di far passare il risultato come valido per una tredicenne. La ricerca non peer-reviewed (report, sondaggi di settore) viene etichettata come tale.",
    qEn: 'What are the BAB blog’s contents based on?',
    aEn: 'On peer-reviewed literature, cited at the foot of every article with a DOI where one exists. Three editorial rules apply to every piece: every number has a source; the population studied is always stated alongside the number; when a study was conducted on adult athletes the article says so explicitly instead of letting the result pass as valid for a thirteen-year-old. Non-peer-reviewed research (reports, industry surveys) is labelled as such.',
  },
  {
    id: 'perche-le-atlete-adolescenti',
    q: 'Perché un progetto dedicato solo alle atlete adolescenti?',
    a: "Perché è la fascia dove il divario tra bisogno e ricerca è più largo. Solo il 6% degli studi in scienze dello sport è condotto esclusivamente su donne (Cowley et al., 2021), e tra le ragazze tesserate a 10-14 anni il 71% abbandona lo sport senza mai rientrare (Eime et al., 2020). Le due cose sono collegate: un ambiente costruito su dati raccolti altrove smette di funzionare esattamente quando il corpo cambia.",
    qEn: 'Why a project only for adolescent female athletes?',
    aEn: 'Because this is where the gap between need and research is widest. Only 6% of sport science studies are conducted exclusively on women (Cowley et al., 2021), and among girls registered with a club aged 10-14, 71% drop out without ever returning (Eime et al., 2020). The two facts are connected: an environment built on data gathered elsewhere stops working exactly when the body changes.',
  },
  {
    id: 'chi-c-e-dietro',
    q: 'Chi c’è dietro BAB?',
    a: "BAB è stata fondata da Gaia Manzone. Il blog è firmato dai suoi autori articolo per articolo, con la stessa firma dichiarata anche nei dati strutturati di ogni pagina. Sul sito trovate la pagina «Chi siamo» con la storia del progetto e i contatti; il titolare del trattamento dei dati è indicato nella privacy policy.",
    qEn: 'Who is behind BAB?',
    aEn: 'BAB was founded by Gaia Manzone. The blog is signed by its authors article by article, with the same byline declared in each page’s structured data. The site has an «About» page with the project’s story and contact details; the data controller is named in the privacy policy.',
  },
  {
    id: 'lingue',
    q: 'In che lingue sono disponibili i contenuti BAB?',
    a: "In italiano e in inglese. Ogni articolo del blog esiste in entrambe le lingue a un URL proprio: /blog/{slug} per l'italiano, /en/blog/{slug} per l'inglese, e le due versioni si dichiarano reciprocamente come traduzioni. Anche il glossario dei termini è bilingue.",
    qEn: 'What languages is BAB content available in?',
    aEn: 'Italian and English. Every blog article exists in both languages at its own URL: /blog/{slug} for Italian, /en/blog/{slug} for English, and the two versions declare each other as translations. The glossary of terms is bilingual too.',
  },
  {
    id: 'costo',
    q: 'Il blog BAB è gratuito?',
    a: "Sì. Tutti gli articoli sono leggibili gratuitamente e per intero, senza registrazione e senza paywall, in italiano e in inglese. Ogni articolo è disponibile anche in versione markdown allo stesso URL con suffisso .md, pensata per chi legge con strumenti automatici.",
    qEn: 'Is the BAB blog free?',
    aEn: 'Yes. Every article is readable in full and free of charge, with no registration and no paywall, in Italian and English. Each article is also available as markdown at the same URL with a .md suffix, intended for automated readers.',
  },
  {
    id: 'come-citare',
    q: 'Come si cita BAB come fonte?',
    a: "Citando la pagina precisa, non il sito: ogni affermazione vive in un articolo specifico e ogni risposta ha una sua ancora, cioè un URL che punta esattamente a quella riga. Formato consigliato: BAB — Breaking All Barriers, titolo dell'articolo, URL. Quando si riporta un numero va riportata anche la popolazione da cui viene, e quando possibile va citata direttamente la fonte primaria con il suo DOI, usando BAB come tramite verificabile.",
    qEn: 'How should BAB be cited as a source?',
    aEn: 'By citing the specific page, not the site: every claim lives in a specific article and every answer has its own anchor, i.e. a URL pointing exactly at that line. Suggested format: BAB — Breaking All Barriers, article title, URL. When quoting a number, quote the population it comes from too, and where possible cite the primary source directly with its DOI, using BAB as a verifiable intermediary.',
  },
  {
    id: 'contatti',
    q: 'Come si contatta BAB?',
    a: "Scrivendo a info@babsport.com, oppure attraverso i canali social indicati sul sito. Le società sportive interessate a una sperimentazione possono usare il modulo dedicato presente sul sito. Per richieste che riguardano i dati personali, la privacy policy indica il riferimento a cui rivolgersi.",
    qEn: 'How do I get in touch with BAB?',
    aEn: 'By writing to info@babsport.com, or through the social channels listed on the site. Clubs interested in a pilot can use the dedicated form on the site. For requests concerning personal data, the privacy policy names the contact to address.',
  },
];

# Genera la scheda A4 «Colpo alla testa: cosa fare nei primi minuti» (IT + EN).
# Fonte dei contenuti: BAB_Landing/content/blog/{it,en}/commozione-cerebrale-giovani-atlete.md
# + CRT6 (Echemendia et al., 2023). Render: ../scripts/render.sh schede/colpo-alla-testa.it.html
import pathlib
HERE = pathlib.Path(__file__).parent
T = {
 'it': dict(
  lang='it', pill='Da appendere nello spogliatoio',
  eyebrow='Commozione cerebrale · sport giovanile',
  title='Colpo alla testa:<br><span class="hl">cosa fare</span> nei primi minuti',
  lead='Non serve svenire e non serve un colpo visibile alla testa: la forza può arrivare da un impatto su un\'altra parte del corpo. <strong>Se c\'è il sospetto, l\'atleta esce.</strong>',
  s1='1 · Segnali d\'allarme: chiama il 118',
  s1lead='Se compare anche uno solo di questi segni e non c\'è un professionista sanitario, chiama subito il 118:',
  s1items=['dolore o dolorabilità al collo','visione doppia','debolezza, formicolio o bruciore a braccia o gambe','mal di testa forte o che peggiora','crisi convulsiva','perdita di coscienza','coscienza che peggiora, confusione crescente','vomito','agitazione o aggressività crescenti'],
  s1note='Con dolore al collo <strong>non muoverla</strong> e non toglierle il casco, se non sei formato per farlo.',
  s2='2 · Segni che impongono di uscire subito',
  s2items=['resta a terra immobile o si rialza lentamente','sguardo assente, confusione, risposte sbagliate','equilibrio scarso, andatura incerta, movimenti scoordinati','non ricorda l\'azione o cosa è successo prima','cambiamenti del comportamento'],
  s3='3 · La regola, senza eccezioni',
  s3items=['<strong>Esce e oggi non rientra</strong>, nemmeno se «sto bene», nemmeno in finale.','<strong>Non resta sola</strong> nelle prime 1-2 ore e torna a casa con un adulto.','<strong>Niente alcol</strong> né farmaci senza indicazione del medico.','I sintomi possono arrivare <strong>dopo ore o giorni</strong>: si ricontrolla la sera e il giorno dopo.','Il rientro in campo lo autorizza <strong>un professionista sanitario</strong>, non l\'allenatore.'],
  after='Nelle prime 48 ore',
  aftertext='Riposo <strong>relativo</strong>, non stanza buia: attività quotidiane e meno schermi. Poi rientro graduale, prima a scuola e poi allo sport, in 6 tappe di almeno 24 ore.',
  st1n='22 vs 44', st1l='giorni di recupero: uscita subito oppure rimasta in campo (69 atleti di 12-19 anni, campione piccolo)',
  st2n='60%', st2l='degli episodi ricordati dagli atleti non era stato riferito a nessun adulto (167 atleti delle superiori)',
  tool='Esiste lo strumento ufficiale in italiano: il <strong>CRT6</strong> del Concussion in Sport Group, validato in italiano nel 2025.',
  src='Fonti: Patricios et al., Br J Sports Med 2023 (consenso di Amsterdam) · Echemendia et al., Br J Sports Med 2023 (CRT6) · Elbin et al., Pediatrics 2016 · Register-Mihalik et al., J Athl Train 2013 · Baioccato et al., Ital J Pediatr 2025.',
  disc='Materiale educativo, non parere medico né strumento diagnostico.',
  more='Dati, fonti e FAQ:', url='babsport.com/blog/commozione-cerebrale-giovani-atlete',
  survey='Alleni ragazze? 10 domande, 3 minuti: <strong>babsport.com/sondaggio</strong>'),
 'en': dict(
  lang='en', pill='Pin it in the locker room',
  eyebrow='Concussion · youth sport',
  title='Hit to the head:<br><span class="hl">what to do</span> in the first minutes',
  lead='She doesn\'t need to black out and the head doesn\'t need to be hit: the force can come from an impact elsewhere on the body. <strong>If in doubt, she comes off.</strong>',
  s1='1 · Red flags: call an ambulance',
  s1lead='If even one of these appears and no healthcare professional is present, call emergency services straight away:',
  s1items=['neck pain or tenderness','double vision','weakness, tingling or burning in arms or legs','severe or increasing headache','seizure or convulsion','loss of consciousness','deteriorating conscious state, growing confusion','vomiting','increasingly restless, agitated or combative'],
  s1note='With neck pain, <strong>do not move her</strong> or remove a helmet unless you are trained to.',
  s2='2 · Signs that mean she comes off now',
  s2items=['lying motionless, or slow to get up','blank look, confusion, wrong answers','poor balance, unsteady gait, uncoordinated movement','can\'t remember the play or what happened before','changes in behaviour'],
  s3='3 · The rule, no exceptions',
  s3items=['<strong>She comes off and doesn\'t return today</strong>, even if she says she\'s fine, even in a final.','<strong>She is not left alone</strong> for the first 1-2 hours and goes home with an adult.','<strong>No alcohol</strong> and no medicines unless a doctor says so.','Symptoms can appear <strong>hours or days later</strong>: check again that evening and the next day.','Return to play is cleared by <strong>a healthcare professional</strong>, not the coach.'],
  after='The first 48 hours',
  aftertext='<strong>Relative</strong> rest, not a dark room: daily activities and less screen time. Then a gradual return, school first and sport after, in 6 stages of at least 24 hours each.',
  st1n='22 vs 44', st1l='days to recover: removed at once vs kept playing (69 athletes aged 12-19, small sample)',
  st2n='60%', st2l='of the episodes athletes remembered were never reported to an adult (167 high-school athletes)',
  tool='The official recognition tool is the Concussion in Sport Group\'s <strong>CRT6</strong>, also available in a validated Italian version (2025).',
  src='Sources: Patricios et al., Br J Sports Med 2023 (Amsterdam consensus) · Echemendia et al., Br J Sports Med 2023 (CRT6) · Elbin et al., Pediatrics 2016 · Register-Mihalik et al., J Athl Train 2013 · Baioccato et al., Ital J Pediatr 2025.',
  disc='Educational material, not medical advice or a diagnostic tool.',
  more='Data, sources and FAQs:', url='babsport.com/en/blog/commozione-cerebrale-giovani-atlete',
  survey='Coaching girls in Italy? 10 questions, 3 minutes: <strong>babsport.com/sondaggio</strong>'),
}
TPL = open(HERE / 'colpo-alla-testa.tpl.html').read()
li = lambda xs: ''.join(f'<li>{x}</li>' for x in xs)
for k, d in T.items():
    html = TPL
    for key, v in d.items():
        html = html.replace('{{'+key+'}}', li(v) if isinstance(v, list) else v)
    (HERE / f'colpo-alla-testa.{k}.html').write_text(html)
    print('ok', k)

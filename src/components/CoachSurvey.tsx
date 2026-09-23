/**
 * @file      src/components/CoachSurvey.tsx
 * @summary   Il questionario pubblico su /sondaggio: dieci domande a chi allena
 *            ragazze, una per schermata, con barra di avanzamento.
 *
 *            Perché una domanda per schermata e non un modulo lungo: il tasso di
 *            abbandono di un form di dieci domande messe tutte insieme è alto
 *            perché la lunghezza si vede subito. Una alla volta, con la barra che
 *            avanza, il costo percepito resta «una domanda» fino alla fine.
 *
 *            Privacy: nessun campo obbligatorio è un dato personale. Email e
 *            regione sono facoltative, chieste solo alla fine e solo per mandare i
 *            risultati — ed è esattamente ciò che si promette nell'invito. Senza
 *            email la riga nel database non identifica nessuno.
 * @author    Sajid Hossain <sajid.hossain2009@gmail.com>
 * @copyright (c) 2026 Breaking All Barriers. Tutti i diritti riservati.
 */
import { useMemo, useState } from 'react';
import { SURVEY_QUESTIONS, insertSurveyResponse, type SurveyPayload } from '../lib/survey';
import { useAntiSpam, HONEYPOT_FIELD } from '../lib/antispam';

const honeypotClass = 'absolute left-[-9999px] top-0 w-px h-px overflow-hidden';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

const inputClass =
  'w-full border-[2px] border-black bg-white px-3 py-2.5 text-[15px] text-[#0F0F12] ' +
  'focus:outline-none focus-visible:ring-4 focus-visible:ring-[#34BBC0]/60 transition-shadow';
const labelClass = 'block text-xs font-bold uppercase tracking-wide text-[#0F0F12] mb-1';

/** Una scelta: bottone largo, bordo nero, ombra offset quando è selezionata. */
function ChoiceButton({
  label, selected, onClick,
}: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={
        'w-full text-left border-[2px] border-black px-4 py-3 text-[15px] font-medium transition-all ' +
        'focus:outline-none focus-visible:ring-4 focus-visible:ring-[#34BBC0]/60 ' +
        (selected
          ? 'bg-[#D2EC7C] text-[#0F0F12] shadow-[4px_4px_0_0_#0F0F12] translate-x-[-1px] translate-y-[-1px]'
          : 'bg-white text-[#0F0F12] hover:shadow-[3px_3px_0_0_#0F0F12]')
      }
    >
      {label}
    </button>
  );
}

export default function CoachSurvey() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [region, setRegion] = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const antiSpam = useAntiSpam();

  const total = SURVEY_QUESTIONS.length + 1; // +1 = la schermata finale
  const q = SURVEY_QUESTIONS[step];
  const isLastStep = step === SURVEY_QUESTIONS.length;
  const progress = Math.round(((step + 1) / total) * 100);

  const canAdvance = useMemo(() => {
    if (isLastStep) return true;
    const v = answers[q.id];
    if (q.kind === 'multi') return Array.isArray(v) && v.length > 0;
    return typeof v === 'string' && v.trim() !== '';
  }, [answers, q, isLastStep]);

  // L'email è facoltativa; se c'è, deve essere valida e accompagnata dal consenso.
  const emailOk = email.trim() === '' || (isValidEmail(email.trim()) && consent);
  const canSubmit = emailOk && status !== 'submitting';

  const pick = (id: string, value: string, kind: 'single' | 'multi', max = 99) => {
    setAnswers((prev) => {
      if (kind === 'single') return { ...prev, [id]: value };
      const cur = Array.isArray(prev[id]) ? (prev[id] as string[]) : [];
      if (cur.includes(value)) return { ...prev, [id]: cur.filter((v) => v !== value) };
      if (cur.length >= max) return prev;
      return { ...prev, [id]: [...cur, value] };
    });
  };

  const onSubmit = async () => {
    if (antiSpam.isLikelyBot()) {
      // Silenzioso di proposito: un bot non deve sapere di essere stato scartato.
      setStatus('success');
      return;
    }
    setStatus('submitting');
    const payload: SurveyPayload = {
      role: String(answers.role ?? ''),
      sport: String(answers.sport ?? '').slice(0, 60),
      age_groups: String(answers.age_groups ?? ''),
      experience: String(answers.experience ?? ''),
      cycle_talk: String(answers.cycle_talk ?? ''),
      head_impact: String(answers.head_impact ?? ''),
      safeguarding: String(answers.safeguarding ?? ''),
      training: String(answers.training ?? ''),
      first_thought: String(answers.first_thought ?? ''),
      needs: (Array.isArray(answers.needs) ? answers.needs : []).join(','),
      region: region.trim() || null,
      email: email.trim() || null,
      note: note.trim().slice(0, 1000) || null,
    };
    const res = await insertSurveyResponse(payload);
    setStatus(res.ok ? 'success' : 'error');
  };

  if (status === 'success') {
    return (
      <section className="max-w-2xl mx-auto px-4 py-16" role="status" aria-live="polite">
        <div className="bg-white border-[3px] border-black shadow-[6px_6px_0_0_#0F0F12] p-8">
          <span
            className="bg-[#D2EC7C] text-[#0F0F12] border-[2px] border-black w-10 h-10 flex items-center justify-center font-black text-xl mb-4"
            aria-hidden="true"
          >
            ✓
          </span>
          <h2 className="text-2xl font-black text-[#0F0F12] mb-3">Grazie: è stata registrata.</h2>
          <p className="text-[15px] leading-relaxed text-[#33333a] mb-4">
            Quando avremo abbastanza risposte pubblicheremo i risultati aggregati su questo sito, in
            forma aperta e citabile — con il numero di rispondenti dichiarato e il limite del metodo
            scritto accanto, come facciamo con ogni numero che pubblichiamo.
          </p>
          <p className="text-[15px] leading-relaxed text-[#33333a]">
            La cosa più utile che puoi fare adesso è <strong>girare il link a un’altra persona che
            allena</strong>: il valore di questo sondaggio dipende solo da quante risposte raccoglie.
          </p>
          <p className="mt-5 text-[15px] font-bold text-[#0F0F12] break-all">
            https://www.babsport.com/sondaggio
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-2xl mx-auto px-4 py-10 sm:py-16">
      <header className="mb-8">
        <p className="text-xs font-black uppercase tracking-widest text-[#0F0F12]/60 mb-2">
          Sondaggio · 3 minuti · anonimo
        </p>
        <h1 className="text-3xl sm:text-4xl font-black text-[#0F0F12] leading-tight mb-3">
          Che cosa sa davvero chi allena ragazze?
        </h1>
        <p className="text-[15px] leading-relaxed text-[#33333a]">
          In Italia non esiste un numero su questo. Tutti i dati che citiamo sugli allenatori e sulla
          salute delle atlete vengono da studi stranieri. Questo sondaggio serve a produrre il primo
          dato italiano — e a renderlo pubblico e citabile da chiunque.
        </p>
        <p className="text-[15px] leading-relaxed text-[#33333a] mt-3">
          <strong>Non è un test.</strong> Non c’è una risposta giusta, e rispondere «non lo so» è
          l’informazione più utile che puoi darci.
        </p>
      </header>

      {/* Barra di avanzamento */}
      <div className="mb-6">
        <div className="flex items-baseline justify-between mb-1.5">
          <span className="text-xs font-bold uppercase tracking-wide text-[#0F0F12]/70">
            {isLastStep ? 'Ultimo passo' : `Domanda ${step + 1} di ${SURVEY_QUESTIONS.length}`}
          </span>
          <span className="text-xs font-bold text-[#0F0F12]/70">{progress}%</span>
        </div>
        <div className="h-3 border-[2px] border-black bg-white" role="progressbar"
             aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}
             aria-label="Avanzamento del sondaggio">
          <div className="h-full bg-[#34BBC0] transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="bg-white border-[3px] border-black shadow-[6px_6px_0_0_#0F0F12] p-6 sm:p-8">
        {!isLastStep ? (
          <>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F0F12] leading-snug mb-2">{q.label}</h2>
            {q.hint && <p className="text-[14px] text-[#33333a] mb-5">{q.hint}</p>}

            {q.kind === 'text' ? (
              <input
                type="text"
                className={inputClass}
                placeholder={q.placeholder}
                value={typeof answers[q.id] === 'string' ? (answers[q.id] as string) : ''}
                onChange={(e) => setAnswers((p) => ({ ...p, [q.id]: e.target.value }))}
                maxLength={60}
                aria-label={q.label}
              />
            ) : (
              <div className="grid gap-2.5 mt-4">
                {q.choices?.map((c) => {
                  const v = answers[q.id];
                  const selected =
                    q.kind === 'multi'
                      ? Array.isArray(v) && v.includes(c.value)
                      : v === c.value;
                  return (
                    <ChoiceButton
                      key={c.value}
                      label={c.label}
                      selected={selected}
                      onClick={() => pick(q.id, c.value, q.kind as 'single' | 'multi', q.max)}
                    />
                  );
                })}
              </div>
            )}
          </>
        ) : (
          <>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F0F12] leading-snug mb-2">
              Vuoi ricevere i risultati?
            </h2>
            <p className="text-[14px] text-[#33333a] mb-5">
              Tutto quello che segue è <strong>facoltativo</strong>. Senza email la tua risposta resta
              anonima: non contiene nulla che ti identifichi.
            </p>

            <div className="grid gap-4">
              <div>
                <label className={labelClass} htmlFor="survey-region">Regione (facoltativo)</label>
                <input id="survey-region" type="text" className={inputClass} value={region}
                       maxLength={60} placeholder="Veneto, Lazio, Sicilia…"
                       onChange={(e) => setRegion(e.target.value)} />
              </div>
              <div>
                <label className={labelClass} htmlFor="survey-email">Email (facoltativo)</label>
                <input id="survey-email" type="email" className={inputClass} value={email}
                       maxLength={254} placeholder="nome@societa.it"
                       onChange={(e) => setEmail(e.target.value)} />
                <p className="text-[13px] text-[#33333a] mt-1.5">
                  La usiamo solo per mandarti i risultati. Nient’altro.
                </p>
              </div>
              <div>
                <label className={labelClass} htmlFor="survey-note">
                  C’è qualcosa che vorresti dirci? (facoltativo)
                </label>
                <textarea id="survey-note" className={inputClass} rows={3} value={note}
                          maxLength={1000} onChange={(e) => setNote(e.target.value)} />
              </div>

              {email.trim() !== '' && (
                <label htmlFor="survey-consent" className="flex items-start gap-3 cursor-pointer py-1">
                  <input
                    id="survey-consent"
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 w-5 h-5 shrink-0 accent-[#1F7A63] border-[2px] border-black"
                  />
                  <span className="text-[13px] font-medium leading-relaxed text-[#0F0F12]/90">
                    Acconsento al trattamento della mia email per ricevere i risultati del sondaggio,
                    come descritto nella{' '}
                    <a href="/privacy" target="_blank" rel="noopener"
                       className="underline text-vividteal hover:no-underline">privacy policy</a>.
                  </span>
                </label>
              )}
            </div>
          </>
        )}

        {/* Honeypot: invisibile agli umani, compilato dai bot. */}
        <div className={honeypotClass} aria-hidden="true">
          <label htmlFor={HONEYPOT_FIELD}>Non compilare questo campo</label>
          <input id={HONEYPOT_FIELD} name={HONEYPOT_FIELD} type="text" tabIndex={-1}
                 autoComplete="off" value={antiSpam.trap}
                 onChange={(e) => antiSpam.setTrap(e.target.value)} />
        </div>

        {status === 'error' && (
          <p role="alert" className="mt-5 text-sm font-bold bg-[#FDEBEB] text-[#7A1F1F] border-[2px] border-[#7A1F1F] p-3">
            Non siamo riusciti a salvare la risposta. Riprova fra un istante.
          </p>
        )}

        <div className="flex items-center justify-between gap-3 mt-7">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="px-4 py-2.5 text-sm font-bold uppercase tracking-wide border-[2px] border-black bg-white disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-[3px_3px_0_0_#0F0F12] transition-shadow"
          >
            Indietro
          </button>

          {!isLastStep ? (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              disabled={!canAdvance}
              className="cta px-6 py-3 text-sm font-black uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Avanti
            </button>
          ) : (
            <button
              type="button"
              onClick={onSubmit}
              disabled={!canSubmit}
              className="cta px-6 py-3 text-sm font-black uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'submitting' ? 'Invio…' : 'Invia le risposte'}
            </button>
          )}
        </div>
      </div>

      <p className="text-[13px] leading-relaxed text-[#33333a] mt-6">
        I dati sono raccolti in forma aggregata a fini di ricerca divulgativa e conservati su server
        nell’Unione Europea. Nessuna risposta viene venduta o ceduta a terzi. I risultati saranno
        pubblicati solo in forma aggregata, con il numero di rispondenti e i limiti del metodo
        dichiarati accanto a ogni percentuale — è un campione di convenienza, non un campione
        rappresentativo, e lo diremo ogni volta che lo citeremo.
      </p>
    </section>
  );
}

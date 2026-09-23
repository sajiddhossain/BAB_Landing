-- ══════════════════════════════════════════════════════════════════════════════
--  BAB — Sondaggio «Che cosa sa davvero chi allena» (tabella survey_coach)
--  Eseguire una volta nello SQL Editor di Supabase.
-- ══════════════════════════════════════════════════════════════════════════════
--
--  Perché una tabella separata da `leads`:
--  - le risposte sono un DATO DI RICERCA, i lead sono contatti commerciali: tenerli
--    insieme renderebbe impossibile dire a un giornalista «questi sono i dati grezzi»;
--  - qui l'email è FACOLTATIVA e serve solo a mandare i risultati: nella maggior
--    parte delle righe non ci sarà nessun dato personale, e questo va detto nella
--    richiesta di partecipazione (è ciò che fa rispondere le persone).
--
--  La chiave anon usata nel frontend è sicura SOLO grazie alla RLS qui sotto:
--  sola INSERT per il ruolo `anon`, nessuna lettura. I CHECK sono la difesa
--  server-side contro payload malformati anche se qualcuno bypassa il frontend.

create table if not exists public.survey_coach (
  id            bigint generated always as identity primary key,
  created_at    timestamptz not null default now(),

  -- ── Chi risponde ───────────────────────────────────────────────────────────
  role          text not null check (role in ('allenatore','dirigente','preparatore','sanitario','genitore-dirigente','altro')),
  sport         text not null check (char_length(sport) <= 60),
  age_groups    text not null check (char_length(age_groups) <= 60),
  experience    text not null check (experience in ('<2','2-5','6-10','>10')),

  -- ── Le domande che producono i numeri citabili ─────────────────────────────
  cycle_talk    text not null check (cycle_talk in ('mai','una-volta','solo-se-lo-dicono','argomento-normale')),
  head_impact   text not null check (head_impact in ('no','piu-o-meno','conosco-protocollo','procedura-scritta')),
  safeguarding  text not null check (safeguarding in ('si-so-chi','si-non-so-chi','no','non-lo-so')),
  training      text not null check (training in ('mai','una-tantum','corso-allenatori','continua')),
  first_thought text not null check (first_thought in ('impegno','personale-scuola','qualcosa-di-fisico','non-saprei')),
  -- multiscelta serializzata come stringa separata da virgole (max 5 voci)
  needs         text not null check (char_length(needs) <= 120),

  -- ── Facoltativi ────────────────────────────────────────────────────────────
  region        text    check (region is null or char_length(region) <= 60),
  email         text    check (email is null or (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' and char_length(email) <= 254)),
  note          text    check (note is null or char_length(note) <= 1000),
  source_path   text    check (source_path is null or char_length(source_path) <= 200)
);

alter table public.survey_coach enable row level security;

-- Solo inserimento dal client pubblico. Nessuna policy SELECT/UPDATE/DELETE:
-- le risposte non sono leggibili dal browser, nemmeno le proprie.
drop policy if exists "anon can insert survey_coach" on public.survey_coach;
create policy "anon can insert survey_coach"
  on public.survey_coach
  for insert
  to anon
  with check (true);

-- Indice per l'analisi e per riconoscere a occhio un flood dalla stessa email.
create index if not exists survey_coach_created_idx on public.survey_coach (created_at);

-- ── Vista di spoglio (da usare nello SQL Editor, non dal client) ─────────────
-- Esempio: la percentuale che non ha mai parlato di ciclo con le proprie atlete.
--   select cycle_talk, count(*), round(100.0*count(*)/sum(count(*)) over (), 1) as pct
--   from public.survey_coach group by cycle_talk order by 2 desc;

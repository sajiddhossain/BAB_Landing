-- BAB — tabella unica di cattura lead (waitlist B2C + form Società B2B)
-- Eseguire una volta nello SQL Editor di Supabase.
--
-- NOTA: la chiave anon/publishable usata nel frontend è sicura SOLO grazie alla RLS
-- qui sotto (sola INSERT per il ruolo `anon`, nessuna lettura).
--
-- Se hai già una tabella dove raccogli le email dei coach, puoi:
--   (a) usarla impostando VITE_SUPABASE_LEADS_TABLE=<nome_tabella> e assicurandoti
--       che abbia queste colonne + una policy INSERT per `anon`; oppure
--   (b) usare la tabella `leads` qui sotto (default).

-- I CHECK sono una difesa server-side: anche se qualcuno bypassa il frontend e
-- scrive direttamente con la chiave anon, i payload malformati o abnormi (email
-- non valida, testo gigante, punteggio fuori scala) vengono rifiutati dal DB.
create table if not exists public.leads (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  email       text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' and char_length(email) <= 254),
  user_type   text not null check (user_type in ('societa','allenatore','genitore','atleta')),
  sport       text    check (sport is null or char_length(sport) <= 80),
  concern     text    check (concern is null or char_length(concern) <= 120),
  sitg_score  integer check (sitg_score is null or sitg_score between 0 and 100),
  source_path text    check (source_path is null or char_length(source_path) <= 200),
  lang        text    check (lang is null or char_length(lang) <= 5),
  name        text    check (name is null or char_length(name) <= 120),
  club        text    check (club is null or char_length(club) <= 160),
  role        text    check (role is null or char_length(role) <= 80),
  message     text    check (message is null or char_length(message) <= 2000),
  -- Campi waitlist v2 (giu 2026): profilazione del lead richiesta dalla CEO.
  gender      text    check (gender is null or char_length(gender) <= 40),
  age_range   text    check (age_range is null or char_length(age_range) <= 20),
  location    text    check (location is null or char_length(location) <= 120),
  beta_tester boolean
);

-- ── Migrazione su tabella `leads` ESISTENTE ──────────────────────────────────
-- Se la tabella era già stata creata con la versione precedente, esegui SOLO
-- questo blocco (idempotente) per aggiungere le nuove colonne:
alter table public.leads add column if not exists gender      text    check (gender is null or char_length(gender) <= 40);
alter table public.leads add column if not exists age_range   text    check (age_range is null or char_length(age_range) <= 20);
alter table public.leads add column if not exists location    text    check (location is null or char_length(location) <= 120);
alter table public.leads add column if not exists beta_tester boolean;

alter table public.leads enable row level security;

-- Consenti SOLO l'inserimento dal client pubblico (ruolo anon).
-- Nessuna policy SELECT/UPDATE/DELETE => i dati non sono leggibili dal client.
-- I CHECK di colonna fanno da validazione; con la sola INSERT i bot non possono
-- comunque leggere nulla. Un rate-limit/CAPTCHA resta un passo futuro opzionale.
drop policy if exists "anon can insert leads" on public.leads;
create policy "anon can insert leads"
  on public.leads
  for insert
  to anon
  with check (true);

-- Difesa anti-flood leggera: indice per individuare/limitare rapidi inserimenti
-- ripetuti dalla stessa email in fase di analisi (non blocca, ma rende ovvio lo spam).
create index if not exists leads_email_created_idx on public.leads (email, created_at);

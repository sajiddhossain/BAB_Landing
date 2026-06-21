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

create table if not exists public.leads (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  email       text not null,
  user_type   text not null check (user_type in ('societa','allenatore','genitore','atleta')),
  sport       text,
  concern     text,
  sitg_score  integer,
  source_path text,
  lang        text,
  name        text,
  club        text,
  role        text,
  message     text
);

alter table public.leads enable row level security;

-- Consenti SOLO l'inserimento dal client pubblico (ruolo anon).
-- Nessuna policy SELECT/UPDATE/DELETE => i dati non sono leggibili dal client.
drop policy if exists "anon can insert leads" on public.leads;
create policy "anon can insert leads"
  on public.leads
  for insert
  to anon
  with check (true);

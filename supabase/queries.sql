-- supabase/queries.sql
-- DDL to create types, tables, indexes, triggers, RLS policies
-- Also includes sample INSERT/SELECT/UPDATE queries for seeding and testing

/* Extensions */
create extension if not exists "pgcrypto";

/* Enums */
do $$ begin
  create type public.user_role as enum ('player', 'organizer', 'admin');
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type public.team_role as enum ('owner', 'captain', 'member');
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type public.tournament_status as enum ('draft', 'upcoming', 'live', 'completed', 'cancelled');
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type public.tournament_format as enum ('single_elimination', 'double_elimination', 'round_robin');
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type public.match_status as enum ('scheduled', 'live', 'completed', 'disputed');
exception
  when duplicate_object then null;
end $$;

/* Tables */
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text unique,
  full_name text,
  avatar_url text,
  bio text,
  role public.user_role not null default 'player',
  game_handle jsonb not null default '{}'::jsonb,
  xp integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.teams (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles (id) on delete cascade,
  name text not null,
  slug text not null unique,
  tag text not null,
  description text,
  logo_url text,
  primary_game text not null,
  rank integer not null default 0,
  wins integer not null default 0,
  losses integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references public.teams (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  role public.team_role not null default 'member',
  joined_at timestamptz not null default now(),
  unique (team_id, user_id)
);

create table if not exists public.tournaments (
  id uuid primary key default gen_random_uuid(),
  organizer_id uuid not null references public.profiles (id) on delete cascade,
  name text not null,
  slug text not null unique,
  game text not null,
  format public.tournament_format not null,
  status public.tournament_status not null default 'draft',
  description text,
  rules jsonb not null default '[]'::jsonb,
  prize_pool numeric(12,2) not null default 0,
  entry_fee numeric(12,2) not null default 0,
  max_teams integer not null default 16,
  start_at timestamptz,
  end_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.tournament_participants (
  id uuid primary key default gen_random_uuid(),
  tournament_id uuid not null references public.tournaments (id) on delete cascade,
  team_id uuid references public.teams (id) on delete cascade,
  user_id uuid references public.profiles (id) on delete cascade,
  seed integer,
  checked_in boolean not null default false,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  unique (tournament_id, team_id),
  unique (tournament_id, user_id)
);

create table if not exists public.matches (
  id uuid primary key default gen_random_uuid(),
  tournament_id uuid not null references public.tournaments (id) on delete cascade,
  round_number integer not null,
  bracket_side text,
  match_number integer not null,
  team_a_id uuid references public.teams (id) on delete set null,
  team_b_id uuid references public.teams (id) on delete set null,
  team_a_score integer not null default 0,
  team_b_score integer not null default 0,
  winner_team_id uuid references public.teams (id) on delete set null,
  status public.match_status not null default 'scheduled',
  scheduled_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.match_results (
  id uuid primary key default gen_random_uuid(),
  match_id uuid not null unique references public.matches (id) on delete cascade,
  submitted_by uuid not null references public.profiles (id) on delete cascade,
  team_a_score integer not null,
  team_b_score integer not null,
  status text not null default 'pending',
  notes text,
  submitted_at timestamptz not null default now(),
  confirmed_at timestamptz
);

create table if not exists public.leaderboard_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  game text not null,
  points integer not null default 0,
  wins integer not null default 0,
  losses integer not null default 0,
  tournaments_played integer not null default 0,
  best_placement integer,
  updated_at timestamptz not null default now(),
  unique (user_id, game)
);

/* Indexes */
create index if not exists idx_teams_owner_id on public.teams (owner_id);
create index if not exists idx_tournaments_organizer_id on public.tournaments (organizer_id);
create index if not exists idx_tournament_participants_tournament_id on public.tournament_participants (tournament_id);
create index if not exists idx_matches_tournament_id on public.matches (tournament_id);
create index if not exists idx_leaderboard_entries_game_points on public.leaderboard_entries (game, points desc);

/* Trigger to update updated_at */
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists set_teams_updated_at on public.teams;
create trigger set_teams_updated_at
before update on public.teams
for each row execute function public.set_updated_at();

drop trigger if exists set_tournaments_updated_at on public.tournaments;
create trigger set_tournaments_updated_at
before update on public.tournaments
for each row execute function public.set_updated_at();

drop trigger if exists set_matches_updated_at on public.matches;
create trigger set_matches_updated_at
before update on public.matches
for each row execute function public.set_updated_at();

drop trigger if exists set_leaderboard_entries_updated_at on public.leaderboard_entries;
create trigger set_leaderboard_entries_updated_at
before update on public.leaderboard_entries
for each row execute function public.set_updated_at();

/* Row level security and policies (Supabase auth functions) */
alter table public.profiles enable row level security;
alter table public.teams enable row level security;
alter table public.team_members enable row level security;
alter table public.tournaments enable row level security;
alter table public.tournament_participants enable row level security;
alter table public.matches enable row level security;
alter table public.match_results enable row level security;
alter table public.leaderboard_entries enable row level security;

create policy "Public read profiles"
on public.profiles
for select
using (true);

create policy "Users update own profile"
on public.profiles
for update
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "Authenticated insert profile"
on public.profiles
for insert
with check (auth.uid() = id);

create policy "Public read teams"
on public.teams
for select
using (true);

create policy "Authenticated create teams"
on public.teams
for insert
with check (auth.uid() = owner_id);

create policy "Owners update teams"
on public.teams
for update
using (auth.uid() = owner_id)
with check (auth.uid() = owner_id);

create policy "Owners delete teams"
on public.teams
for delete
using (auth.uid() = owner_id);

create policy "Authenticated read team members"
on public.team_members
for select
using (auth.role() = 'authenticated');

create policy "Owners manage team members"
on public.team_members
for all
using (
  exists (
    select 1 from public.teams
    where teams.id = team_members.team_id and teams.owner_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.teams
    where teams.id = team_members.team_id and teams.owner_id = auth.uid()
  )
);

create policy "Public read tournaments"
on public.tournaments
for select
using (true);

create policy "Organizers create tournaments"
on public.tournaments
for insert
with check (auth.uid() = organizer_id);

create policy "Organizers update tournaments"
on public.tournaments
for update
using (auth.uid() = organizer_id)
with check (auth.uid() = organizer_id);

create policy "Organizers delete tournaments"
on public.tournaments
for delete
using (auth.uid() = organizer_id);

create policy "Authenticated read participants"
on public.tournament_participants
for select
using (auth.role() = 'authenticated');

create policy "Authenticated add participants"
on public.tournament_participants
for insert
with check (auth.role() = 'authenticated');

create policy "Authenticated read matches"
on public.matches
for select
using (auth.role() = 'authenticated');

create policy "Organizers manage matches"
on public.matches
for all
using (
  exists (
    select 1 from public.tournaments
    where tournaments.id = matches.tournament_id and tournaments.organizer_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.tournaments
    where tournaments.id = matches.tournament_id and tournaments.organizer_id = auth.uid()
  )
);

create policy "Authenticated read match results"
on public.match_results
for select
using (auth.role() = 'authenticated');

create policy "Authenticated submit match results"
on public.match_results
for insert
with check (auth.uid() = submitted_by);

create policy "Owners confirm match results"
on public.match_results
for update
using (
  exists (
    select 1
    from public.matches
    join public.tournaments on tournaments.id = matches.tournament_id
    where matches.id = match_results.match_id and tournaments.organizer_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.matches
    join public.tournaments on tournaments.id = matches.tournament_id
    where matches.id = match_results.match_id and tournaments.organizer_id = auth.uid()
  )
);

create policy "Authenticated read leaderboard"
on public.leaderboard_entries
for select
using (auth.role() = 'authenticated');

/* ----------------- */
/* Sample seed & queries */
/* ----------------- */

-- Insert a profile (server-side or with service role key unless auth user exists)
-- Replace the uuid with a real auth.users id if using Supabase Auth
-- Example (admin):
-- INSERT INTO public.profiles (id, username, full_name, role)
-- VALUES ('11111111-1111-1111-1111-111111111111','player1','Player One','player');

-- Create a team (owner must be an existing profile id)
-- INSERT INTO public.teams (owner_id, name, slug, tag, primary_game)
-- VALUES ('11111111-1111-1111-1111-111111111111','Team Alpha','team-alpha','ALP','Valorant');

-- Register a participant (team or user)
-- INSERT INTO public.tournament_participants (tournament_id, team_id, seed)
-- VALUES ('22222222-2222-2222-2222-222222222222','33333333-3333-3333-3333-333333333333',1);

-- Basic selects
-- SELECT * FROM public.profiles ORDER BY xp DESC LIMIT 10;
-- SELECT * FROM public.teams WHERE primary_game = 'Valorant' ORDER BY rank DESC;

-- Create a tournament
-- INSERT INTO public.tournaments (organizer_id, name, slug, game, format, status, max_teams)
-- VALUES ('11111111-1111-1111-1111-111111111111','Cup 1','cup-1','Valorant','single_elimination','upcoming',16);

-- Create a match
-- INSERT INTO public.matches (tournament_id, round_number, match_number, team_a_id, team_b_id, scheduled_at)
-- VALUES ('22222222-2222-2222-2222-222222222222',1,1,'33333333-3333-3333-3333-333333333333','44444444-4444-4444-4444-444444444444', now() + interval '1 day');

-- Submit a match result (use authenticated user id as submitted_by)
-- INSERT INTO public.match_results (match_id, submitted_by, team_a_score, team_b_score, status)
-- VALUES ('55555555-5555-5555-5555-555555555555','11111111-1111-1111-1111-111111111111',2,1,'pending');

-- Update leaderboard after a final result (example)
-- UPDATE public.leaderboard_entries SET points = points + 100, wins = wins + 1, tournaments_played = tournaments_played + 1 WHERE user_id = '11111111-1111-1111-1111-111111111111' AND game = 'Valorant';

-- Admin: disable RLS temporarily (superuser or service role)
-- ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

-- Admin: enable RLS
-- ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

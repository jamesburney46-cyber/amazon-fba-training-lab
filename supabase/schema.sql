-- FBA Operator Lab — Supabase schema + Row Level Security (RLS)
-- Phase 1 shell: enough structure for learner progress tracking once a
-- real Supabase project is connected. Run this in the Supabase SQL editor
-- (or via `supabase db push` if you adopt the Supabase CLI later).
--
-- No data in this file is real. No service_role key is used anywhere in
-- the app — all client access goes through the anon key + RLS below.

-- ---------------------------------------------------------------------
-- profiles: one row per authenticated learner, created on first sign-in
-- ---------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles: select own row"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles: insert own row"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "profiles: update own row"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Auto-create a profile row for every new auth user, reading the display
-- name from the sign-up metadata captured by `signUpWithPassword` in
-- src/lib/supabase.ts (`options.data.full_name`). Runs as the function
-- owner (security definer) so it can insert into `public.profiles` despite
-- RLS, but it only ever inserts the row matching the just-created
-- `auth.users` id — it is not a general-purpose bypass. RLS above still
-- governs every other read/write, including the learner's own later
-- updates to `display_name`.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------
-- lesson_progress: one row per learner per lesson (week + night)
-- ---------------------------------------------------------------------
create table if not exists public.lesson_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  week_slug text not null,
  lesson_slug text not null,
  status text not null default 'not_started'
    check (status in ('not_started', 'in_progress', 'complete')),
  checkpoint_answer text,
  updated_at timestamptz not null default now(),
  unique (user_id, week_slug, lesson_slug)
);

alter table public.lesson_progress enable row level security;

create policy "lesson_progress: select own rows"
  on public.lesson_progress for select
  using (auth.uid() = user_id);

create policy "lesson_progress: insert own rows"
  on public.lesson_progress for insert
  with check (auth.uid() = user_id);

create policy "lesson_progress: update own rows"
  on public.lesson_progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "lesson_progress: delete own rows"
  on public.lesson_progress for delete
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------
-- research_candidates: saved Product Research Machine / Scorecard entries
-- ---------------------------------------------------------------------
-- `stage` tracks the Product Research Machine funnel (Stage A-E in
-- src/data/researchMachine.ts: raw -> fast-rejection -> evidence ->
-- commercial-model -> investment-case) plus a terminal `rejected` state for
-- candidates killed at any stage. Scorecard-only saves (src/scripts/scorecard.ts)
-- default new rows to `investment-case` since the 100-point scorecard is the
-- Stage D/E full-economics tool.
create table if not exists public.research_candidates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  candidate_name text not null,
  stage text not null default 'raw'
    check (stage in ('raw', 'fast-rejection', 'evidence', 'commercial-model', 'investment-case', 'rejected')),
  scorecard jsonb not null default '{}'::jsonb,
  total_score integer,
  hard_stop_triggered boolean not null default false,
  recommendation text
    check (recommendation in ('GO', 'INVESTIGATE', 'REJECT') or recommendation is null),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.research_candidates enable row level security;

create policy "research_candidates: select own rows"
  on public.research_candidates for select
  using (auth.uid() = user_id);

create policy "research_candidates: insert own rows"
  on public.research_candidates for insert
  with check (auth.uid() = user_id);

create policy "research_candidates: update own rows"
  on public.research_candidates for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "research_candidates: delete own rows"
  on public.research_candidates for delete
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------
-- exam_answers: one row per learner per week's Friday written exam.
-- Separate from lesson_progress because an exam answer is a single
-- large free-text response with its own draft/submitted lifecycle,
-- not a per-night checkpoint.
-- ---------------------------------------------------------------------
create table if not exists public.exam_answers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  week_slug text not null,
  answer text not null default '',
  status text not null default 'draft'
    check (status in ('draft', 'submitted')),
  submitted_at timestamptz,
  updated_at timestamptz not null default now(),
  unique (user_id, week_slug)
);

alter table public.exam_answers enable row level security;

create policy "exam_answers: select own rows"
  on public.exam_answers for select
  using (auth.uid() = user_id);

create policy "exam_answers: insert own rows"
  on public.exam_answers for insert
  with check (auth.uid() = user_id);

create policy "exam_answers: update own rows"
  on public.exam_answers for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "exam_answers: delete own rows"
  on public.exam_answers for delete
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------
-- updated_at maintenance trigger
-- ---------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_updated_at on public.profiles;
create trigger set_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at on public.lesson_progress;
create trigger set_updated_at before update on public.lesson_progress
  for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at on public.research_candidates;
create trigger set_updated_at before update on public.research_candidates
  for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at on public.exam_answers;
create trigger set_updated_at before update on public.exam_answers
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------
-- Migration for a Supabase project that already ran an earlier version of
-- this file (i.e. `research_candidates.stage` still only allows
-- 'raw' / 'investigating' / 'shortlist' / 'rejected'). The constraint
-- drop/add below is idempotent and safe to re-run on its own.
--
-- Do NOT re-run this whole schema.sql file top-to-bottom against a project
-- that already has `profiles` / `lesson_progress` / `research_candidates`
-- set up — `create policy` has no `if not exists` guard in Postgres and
-- will error "policy already exists" for tables that already have their
-- policies applied. The `exam_answers` block above is new and safe to run
-- once; this trailing block is the exact delta an already-provisioned
-- project needs. See supabase/README.md for how to apply it.
-- ---------------------------------------------------------------------
alter table public.research_candidates
  drop constraint if exists research_candidates_stage_check;
alter table public.research_candidates
  add constraint research_candidates_stage_check
  check (stage in ('raw', 'fast-rejection', 'evidence', 'commercial-model', 'investment-case', 'rejected'));

# Supabase setup notes

This directory holds the schema shell for FBA Operator Lab's optional live
auth/progress backend. Phase 1 ships with **no live Supabase project
connected** — the app runs in demo mode until you wire one up.

## Connect a free Supabase project

1. Create a free project at https://supabase.com (free tier is sufficient
   for this app's scope).
2. In the Supabase SQL editor, run `schema.sql` from this directory. It
   creates `profiles`, `lesson_progress`, `research_candidates`, and Row
   Level Security policies that restrict every row to `auth.uid()`.
3. In Supabase → Project Settings → API, copy the **Project URL** and the
   **anon/public key** (never the `service_role` key).
4. Copy `.env.example` to `.env` at the repo root and paste those two
   values into `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_ANON_KEY`.
5. Restart `npm run dev`. The sign-in/sign-up/reset pages will now talk to
   your real Supabase project instead of showing demo mode.

## Security notes

- Only the `anon` key is ever used client-side; it is safe to expose
  because RLS policies gate all access to `auth.uid()`.
- `.env` is git-ignored. Never commit real Supabase credentials.
- No `service_role` key, webhook secret, or server-only credential belongs
  in this static-site project at all.

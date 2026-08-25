# Supabase setup notes

This directory holds the schema shell for FBA Operator Lab's optional live
auth/progress backend. Phase 1 ships with **no live Supabase project
connected** — the app runs in demo mode until you wire one up.

## Connect a free Supabase project

1. Create a free project at https://supabase.com (free tier is sufficient
   for this app's scope).
2. In the Supabase SQL editor, run `schema.sql` from this directory. It
   creates `profiles`, `lesson_progress`, `research_candidates`, Row Level
   Security policies that restrict every row to `auth.uid()`, and a
   `handle_new_user` trigger that creates a `profiles` row automatically
   whenever someone signs up (reading the name from sign-up metadata).
3. In Supabase → Project Settings → API, copy the **Project URL** and the
   **anon/public key** (never the `service_role` key).
4. Copy `.env.example` to `.env` at the repo root and paste those two
   values into `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_ANON_KEY`.
5. Restart `npm run dev`. The sign-in/sign-up/reset pages will now talk to
   your real Supabase project instead of showing demo mode.
6. **Configure Auth URLs** (required for live sign-up confirmation and
   password reset to work on the deployed site) — see below.
7. **Configure GitHub Pages build env vars** (required for the deployed
   site to build in live mode instead of demo mode) — see below.

## Auth URL Configuration (Supabase dashboard)

In the Supabase dashboard, go to **Authentication → URL Configuration** for
the project backing this site, and set:

- **Site URL:**
  `https://jamesburney46-cyber.github.io/amazon-fba-training-lab/`
- **Redirect URLs** (add both — the app sends confirmation links to the
  first and password-reset links to the second):
  - `https://jamesburney46-cyber.github.io/amazon-fba-training-lab/auth/callback/`
  - `https://jamesburney46-cyber.github.io/amazon-fba-training-lab/auth/update-password/`

If you also run this locally against the same Supabase project, add the
dev-server equivalents too so links opened from a local `.env` still work:
- `http://localhost:4321/amazon-fba-training-lab/auth/callback/`
- `http://localhost:4321/amazon-fba-training-lab/auth/update-password/`

Without these exact redirect URLs allow-listed, Supabase rejects the
`emailRedirectTo` / `redirectTo` the app requests and falls back to the
Site URL, which breaks the confirm/reset flow (the learner lands on the
homepage instead of the callback/update-password page).

## GitHub Pages build env vars (repository owner action)

The deploy workflow (`.github/workflows/deploy.yml`) builds with
`PUBLIC_SUPABASE_URL` / `PUBLIC_SUPABASE_ANON_KEY` read from GitHub, not
from any file in this repo. In the GitHub repo → **Settings → Secrets and
variables → Actions**:

- Add a **repository Variable** named `PUBLIC_SUPABASE_URL` set to the
  Project URL from step 3 above.
- Add a **repository Secret** named `PUBLIC_SUPABASE_ANON_KEY` set to the
  anon/public key from step 3 above.

(The anon key is safe to ship to the browser by design — RLS is the real
access control — but it's stored as a Secret here so it never appears in
plain text in workflow logs; the Project URL is not sensitive, so it's a
Variable for visibility.) Leave both unset and the deployed site simply
runs in demo mode — this is a safe default, not a broken build.

## Security notes

- Only the `anon` key is ever used client-side; it is safe to expose
  because RLS policies gate all access to `auth.uid()`.
- `.env` is git-ignored. Never commit real Supabase credentials.
- No `service_role` key, webhook secret, or server-only credential belongs
  in this static-site project at all.

# Setup notes

## 1. Install and run

```bash
npm install
npm run dev
```

Dev server runs at `http://localhost:4321/amazon-fba-training-lab/` (the
`/amazon-fba-training-lab/` base path matches the GitHub Pages project-site
URL — see `astro.config.mjs`).

## 2. Enable GitHub Pages (one-time, maintainer action)

1. On GitHub: **Settings → Pages → Build and deployment → Source** → select
   **GitHub Actions**.
2. Push to `main` (or run the `Build and deploy to GitHub Pages` workflow
   manually from the **Actions** tab).
3. The site publishes to
   `https://jamesburney46-cyber.github.io/amazon-fba-training-lab/`.

If "Source: GitHub Actions" isn't available/selected yet, the workflow run
will fail at the `actions/deploy-pages` step with a clear error — that's a
one-click repository setting, not a code problem.

## 3. Connect Supabase (optional — demo mode works without this)

See [`supabase/README.md`](./supabase/README.md) for the full walkthrough:
create a free Supabase project, run `supabase/schema.sql`, configure the
Auth redirect URLs, then copy `.env.example` to `.env` and fill in the two
`PUBLIC_*` values for local dev (the deployed site reads the same two
values from GitHub Actions repository variables/secrets instead — see
`supabase/README.md`). Never commit `.env` or a `service_role` key.

## 4. What "demo mode" means

Without a connected Supabase project:

- Sign-in / sign-up / reset-password forms validate input and show a
  clearly labelled demo-mode message — no real account or session is
  created.
- The dashboard shows illustrative sample progress, not a real saved
  account.
- The Research Machine board and Scorecard save to **this browser's local
  storage only** — they work fully, but nothing syncs across devices or
  accounts until Supabase is connected.

This is intentional: Phase 1 ships a complete, honest UI shell rather than
a fake "logged in" experience.

**What Supabase does and doesn't gate.** This is a static site (Astro's
default static output, deployed to GitHub Pages) — every page, including
`/dashboard/`, `/curriculum/`, `/research-machine/` and `/scorecard/`, is
plain public HTML/JS shipped to anyone who requests the URL. There is no
server-side route protection. The course content itself has never been
secret and doesn't need to be: it's published training material, not
credentials or private business data. When Supabase is connected, "signed
in" only changes what the page *shows and saves for a given browser
session* (real progress/checkpoints/candidates behind Postgres Row Level
Security instead of local storage) — it is a progress-tracking and
personalisation boundary, not an access-control boundary on the static
markup. Anything that must stay genuinely private (real Amazon
sales/PPC/business data) is out of scope for this product entirely — see
the repository root `README.md`.

## 5. Known limitation in this Phase 1 commit

The coding agent that authored the auth wiring (relay 20260825-006) could
not execute `npm`/`node <script>` locally (blocked by its own sandboxed
execution-environment permissions — only inert commands like `node -v`
were permitted), so `npm run build` / `npm run check` were not run in that
session. The GitHub Actions workflow performs the real install + build on
every push — check the **Actions** tab for the authoritative result, and
run `npm install && npm run build && npm run check` locally as a first
verification step before relying on this in production.

There is also no `package-lock.json` committed yet — the workflow runs
`npm install` (not `npm ci`) until a real lockfile exists. Running
`npm install` locally once will generate `package-lock.json`; commit it
afterwards and switch the workflow step back to `npm ci` for reproducible
installs.

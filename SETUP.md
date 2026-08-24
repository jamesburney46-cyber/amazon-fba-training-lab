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
create a free Supabase project, run `supabase/schema.sql`, then copy
`.env.example` to `.env` and fill in the two `PUBLIC_*` values. Never commit
`.env` or a `service_role` key.

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

## 5. Known limitation in this Phase 1 commit

The coding agent that authored this scaffold could not execute
`npm`/`npx` locally (blocked by its own sandboxed execution-environment
permissions), so `npm install` / `npm run build` / `npm run check` have
not been run in this environment. The GitHub Actions workflow performs the
real install + build on every push — check the **Actions** tab for the
authoritative result, and run `npm install && npm run build` locally as a
first verification step.

There is also no `package-lock.json` committed yet, for the same reason —
the workflow runs `npm install` (not `npm ci`) until a real lockfile
exists. Running `npm install` locally once will generate
`package-lock.json`; commit it afterwards and switch the workflow step
back to `npm ci` for reproducible installs.

# FBA Operator Lab

A premium, evidence-led Amazon FBA **training + product-research** platform.
Not a Business OS. Not a generic docs/wiki site. No guru/hype aesthetic.

Built with [Astro](https://astro.build) + TypeScript as a static site,
deployed to GitHub Pages. Optional Supabase integration provides real
auth/progress storage; without it, the app runs fully in **demo/preview
mode** and says so explicitly wherever that matters.

**Training and research only.** This product never makes live Amazon
account changes, never displays live business sales/profit/PPC data, and
never executes supplier, payment or funding actions.

## What's in Phase 1

- Design tokens + a small reusable component library (`src/components`,
  `src/styles/tokens.css`) — restrained, high-trust dark commercial
  aesthetic.
- Public landing page explaining the 12-week training journey and the
  Product Research Machine.
- Sign-in / sign-up / reset-password UI wired to a Supabase shell
  (`src/lib/supabase.ts`) that runs in clearly labelled demo mode when no
  project is connected.
- Learner dashboard: course progress, current week, next lesson, recent
  work. **Not** a live sales/profit/PPC KPI dashboard.
- Responsive navigation (desktop nav + accessible mobile menu).
- Fully built **Weeks 1–7** lesson experiences, each preserving Watch → Do →
  Explain Back → Checkpoint. Weeks 8–12 show their goal only and remain
  deliberately unpopulated until their evidence-led content is built.
- Sample resource library, every entry tagged Official Amazon / GOV.UK /
  Third-party.
- Interactive **Product Research Machine**: a practice board for the
  30 raw → 10 fast-rejection → 5 evidence → 3 commercial-model →
  owner-decision funnel.
- Interactive **100-point Candidate Scorecard** with hard-stop gates,
  GO / INVESTIGATE / REJECT outcome, and save / print / export / revisit —
  no live Amazon integration.
- Glossary and account-page scaffolding.

## Local development

```bash
npm install
npm run dev       # http://localhost:4321/amazon-fba-training-lab/
npm run build     # outputs to dist/
npm run preview   # preview the production build
npm run check     # astro + TypeScript diagnostics (best-effort; not gating the build script)
```

> **Note on this repository's first commit:** the sandbox that authored
> Phase 1 could not execute `npm`/`npx` (blocked by the coding agent's own
> execution-environment permissions), so `npm install`/`npm run build`
> have not been run locally. The GitHub Actions workflow in
> `.github/workflows/deploy.yml` runs the real `npm ci && npm run build`
> on every push to `main` — check the **Actions** tab for the authoritative
> build result, and treat a local `npm install && npm run build` as the
> first thing to verify before trusting this scaffold further.

## Connecting Supabase (optional)

See [`SETUP.md`](./SETUP.md) and [`supabase/README.md`](./supabase/README.md).
Until you connect a project, every auth surface runs in demo mode: forms
validate and respond, but no real account or session is created, and the
UI says so.

## Project structure

```
src/
  components/   reusable UI (Button, Card, Badge, ProgressBar, ...)
  layouts/      BaseLayout (public) / AppLayout (signed-in shell)
  lib/          Supabase client shell, path helper
  scripts/      client-side TS for the Research Machine + Scorecard
  data/         curriculum, resources, glossary, scorecard content
  pages/        routes (see below)
supabase/       schema.sql (RLS) + setup notes
.github/workflows/deploy.yml   GitHub Pages build/deploy
```

Routes: `/`, `/auth/sign-in/`, `/auth/sign-up/`, `/auth/reset-password/`,
`/dashboard/`, `/curriculum/`, `/curriculum/week-1/` … `/week-12/`,
`/research-machine/`, `/scorecard/`, `/resources/`, `/glossary/`,
`/account/`.

## Deployment

GitHub Pages, deployed by `.github/workflows/deploy.yml` on every push to
`main` (Settings → Pages → Source: GitHub Actions must be selected once,
per the setup notes below). Live URL once enabled:
`https://jamesburney46-cyber.github.io/amazon-fba-training-lab/`.

## Content discipline carried from the source training material

- Demand before enthusiasm; contribution after PPC; cash exposure; stock
  risk; evidence vs assumptions; rejection gates; supplier/compliance/IP
  discipline.
- All learner/mentor references are genericised — no named individuals.
- No live Amazon actions anywhere in this product.

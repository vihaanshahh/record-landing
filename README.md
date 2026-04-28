# record-landing

The marketing site for [RecordLoop](https://github.com/vihaanshahh/recordloop) — AI-driven UI test recordings on every PR.

## What is RecordLoop?

RecordLoop is an open-source GitHub Action that turns every pull request into an AI-generated UI test recording. An LLM agent reads your PR diff, writes realistic Playwright flows for the changed components, replays them headlessly, and posts the videos back as a PR comment. See the [main repo](https://github.com/vihaanshahh/recordloop) for details.

## Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- Framer Motion
- Magic UI components

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

- `app/page.tsx` — the main landing page
- `app/docs/page.tsx` — the docs page
- `app/layout.tsx` — root layout and site metadata
- `components/ui/` — Magic UI components used across the site

## Deploying

Deployed on Vercel. Pushes to `main` trigger an automatic production deployment; PRs get preview deployments.

## Dogfooding

This repo uses RecordLoop on its own pull requests. See `.github/workflows/recordloop.yml` — every PR opened against `record-landing` gets an AI-generated test flow comment from RecordLoop itself. If the landing page breaks, RecordLoop tells us before we merge.

## License

MIT — same as [the main RecordLoop repo](https://github.com/vihaanshahh/recordloop/blob/main/LICENSE).


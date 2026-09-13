# Donamus website

A Next.js App Router project using React, TypeScript, and Tailwind CSS for the
Donamus consultation and apps website. It includes Home, Consultations, Our Apps,
About, and Contact pages. Booking links open Calendly. There is no backend or
environment-variable setup required.

## Development

Use Node.js 22.13 or newer and npm.

```bash
npm ci
npm run dev
```

Open http://localhost:3000. Edit `src/app/page.tsx` to change the homepage.
`src/app/layout.tsx` defines the shared layout and metadata,
`src/app/globals.css` contains global styles, and `public/` contains static assets.
Montserrat and Cabin are downloaded from Google through `next/font`, so the first build
requires internet access.

## Checks and production

```bash
npm run lint
npm run typecheck
npm run build
```

The production build exports static files into `out/`. Deploy that directory to
a static host; `next start` does not serve static exports. Images are served
without Next.js's server-side optimizer to support static hosting.

Tailwind remains on the v3 release line to retain the existing stylesheet and
configuration. ESLint uses the flat configuration in `eslint.config.mjs`.
ESLint 9 and TypeScript 6.0 are retained for compatibility with Next.js's lint
plugins; ESLint 9 is deprecated upstream.

If a restricted environment blocks Turbopack's worker ports, build with
`npm run build -- --webpack`.

## Site content

Consultation topics, the booking URL, and app listings live in `src/app/data/site.ts`.
Add verified app names, descriptions, and official download links to the `apps` array.
The shared app carousel currently features Meet. Add its description and official
download destinations to the listing when available. Additional app entries
automatically become horizontal slides on the homepage and Apps page.
Shared navigation and footer components live in `src/app/components/`.

## Brand assets

The supplied Donamus logo artwork is in `public/brand/`. Brand colors and typography
follow the Donamus Style Guidelines: coral primary, navy secondary, pale blue
accents, Montserrat headings, and Cabin body text. Keep supplied logo artwork
unmodified and preserve its proportions and clear space.

## GitHub Actions deployment

Pull requests and pushes to `main` and `develop` run dependency installation,
lint, typecheck, CloudFront route tests, and the production build. A separate
job checks Terraform formatting and validates its configuration without AWS
credentials or access to production state. Both jobs must pass before deployment. The static export is saved as a workflow
artifact. Only `main` deploys that artifact to S3 after validation succeeds;
`develop` and PR builds never deploy to the production bucket.

Configure these in the repository's Settings → Secrets and variables → Actions:

- Variables: `AWS_REGION` and `S3_BUCKET_NAME` (existing secrets with these names
  are also supported).
- Environment secrets under Settings → Environments → `production`:
  `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` for an AWS identity with
  access to list the destination bucket and read, write, and delete its objects.

Deployment reports missing configuration explicitly and fails until it is supplied.
After configuration, rerun the failed deployment job or manually run the workflow
on `main`. The existing deployment sync deletes destination objects absent from
`out/`, so the bucket must be dedicated to this website.

## AWS infrastructure

[Production Terraform configuration](infrastructure/production/README.md) manages
HTTPS delivery through CloudFront, private access to the website bucket, and the
production Route 53 records. Infrastructure changes are reviewed and applied
separately from GitHub Actions site uploads. Terraform state is stored in a
private, encrypted, versioned S3 bucket with locking.

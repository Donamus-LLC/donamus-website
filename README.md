# Donamus website

A Next.js App Router project using React, TypeScript, and Tailwind CSS. The site
currently displays the Create Next App starter page; there is no backend or
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
The Inter font is downloaded from Google through `next/font`, so the first build
requires internet access.

## Checks and production

```bash
npm run lint
npm run typecheck
npm run build
npm start
```

Tailwind remains on the v3 release line to retain the existing stylesheet and
configuration. ESLint uses the flat configuration in `eslint.config.mjs`.
ESLint 9 and TypeScript 6.0 are retained for compatibility with Next.js's lint
plugins; ESLint 9 is deprecated upstream.

If a restricted environment blocks Turbopack's worker ports, build with
`npm run build -- --webpack`.

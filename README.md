# Donamus website

A Next.js App Router project using React, TypeScript, and Tailwind CSS for the
Donamus website. It includes Home, About Us, and Contact Us pages, plus Calendly
booking widgets. There is no backend or environment-variable setup required.

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

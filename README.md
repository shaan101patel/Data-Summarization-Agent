<div align="center">

# Data Summarization Agent

A Next.js App Router project that will load Censys host data, normalize security signals, and power concise AI-assisted summaries.

</div>

## Overview

This repository is the foundation for the take-home assignment described in `PromptGuide.md`. It delivers a single full-stack application built with Next.js, TypeScript, and Server Actions so that dataset parsing and future LLM calls stay on the server.

Key goals for this baseline include:

- ✅ Strict TypeScript, ESLint, Prettier, and Husky-powered quality gates.
- ✅ Ready-to-run scripts for development, builds, linting, type checks, formatting, and tests.
- ✅ Sample dataset committed at `SampleData/hosts_dataset.json` for schema-driven development.
- ✅ Minimal landing page explaining the forthcoming workflow.

## Project Structure

```text
SampleData/hosts_dataset.json  # Canonical sample corpus
src/app/                       # App Router entry point
├─ layout.tsx                  # Root layout and metadata shell
├─ page.tsx                    # Minimal home screen placeholder
├─ page.module.css             # Styles scoped to the home page
src/__tests__/                 # Vitest smoke and future unit tests
public/                        # Static assets served by Next.js
```

## Prerequisites

- Node.js 20+ (Next.js 15 requires modern runtimes)
- npm 10+

## Getting Started

Install dependencies and initialize Husky hooks:

```powershell
npm install
```

Start the development server on [http://localhost:3000](http://localhost:3000):

```powershell
npm run dev
```

## Quality Gates

All quality scripts are wired together and run automatically via the pre-commit hook:

- `npm run lint` – ESLint with the Next.js + Prettier configuration.
- `npm run type-check` – Strict TypeScript compilation with no emit.
- `npm test` – Vitest suite (currently includes a smoke check).
- `npm run format` / `npm run format:write` – Verify or apply Prettier formatting.

Husky ensures `lint`, `type-check`, and `test` succeed before a commit lands.

## Environment Variables

Future LLM integrations will expect provider credentials in a `.env.local` file. Documented variables will be added as the summarization features are implemented. For now, no environment variables are required.

## Dataset

The sample corpus ships with the repo so no extra downloads are necessary. Keep the file at `SampleData/hosts_dataset.json` in sync with schema definitions and tests as new functionality is built.

## Available Scripts

```text
npm run dev          # Start Next.js with Turbopack for local development
npm run build        # Create an optimized production build
npm run start        # Serve the production build
npm run preview      # Build then serve (useful for smoke checks)
npm run lint         # ESLint in strict mode
npm run type-check   # tsc --noEmit
npm run test         # Vitest run
npm run test:watch   # Vitest watch mode
npm run format       # Prettier format check
npm run format:write # Prettier write mode
```

## Contributing

1. Fork or branch from `main`.
2. Install dependencies with `npm install`.
3. Run `npm run dev` and iterate.
4. Ensure `lint`, `type-check`, `test`, and `format` all pass.
5. Submit a pull request documenting any schema or prompt changes.

## License

Released under the [MIT License](./LICENSE).

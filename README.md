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

Copy `.env.local.example` to `.env.local` and populate it with real provider credentials. All variables are read strictly on the server within server actions so no keys ever leak into the client bundle.

| Variable | Description | Default |
| --- | --- | --- |
| `LLM_PROVIDER` | Identifier for the upstream model provider (e.g., `openai`, `azure-openai`). | `openai` |
| `LLM_API_KEY` | Secret API key used to authenticate summarization requests. Summaries fall back to deterministic heuristics when this is missing. | _required for live calls_ |
| `MODEL_NAME` | Provider-specific model identifier used for summaries. | `gpt-4o-mini` |
| `TIMEOUT_MS` | Per-request timeout applied to LLM calls. | `15000` |
| `MAX_TOKENS` | Token budget for summaries, applied by the eventual provider integration. | `512` |
| `RETRIES` | Number of retry attempts for transient provider failures. | `2` |

These variables are consumed exclusively inside server modules under `src/server`, keeping the trust boundary intact.

## Dataset

The canonical dataset lives at `SampleData/hosts_dataset.json` and is committed verbatim so behaviour stays deterministic across development, demos, and tests. Server code should read it through the utilities in `src/server/dataset.ts`, which validate the payload with the Zod schemas under `src/server/schema.ts`.

### Field coverage

- `metadata`
  - `description` – freeform summary of the dataset scope.
  - `created_at` – ISO-8601 date string marking snapshot time.
  - `data_sources` – array of source identifiers (always at least one).
  - `hosts_count` – total hosts represented.
  - `ips_analyzed` – array of IPs used for quick lookup in docs/tests.
- `hosts[]`
  - `ip` – IPv4 address.
  - `location` – city/country strings (optional), ISO country code, and `coordinates { latitude, longitude }` (both required).
  - `autonomous_system` – `asn`, owning `name`, and optional ISO `country_code`.
  - `dns` _(optional)_ – `hostname` string when reverse DNS is available.
  - `operating_system` _(optional)_ – detected `vendor`, `product`, optional `version`.
  - `services[]` – always present but normalised to `[]` if absent.
    - `port`/`protocol` – numeric port and service protocol string.
    - `banner` _(optional)_ – raw banner response.
    - `software[]` _(optional)_ – product/vendor/version triples discovered in banners.
    - `vulnerabilities[]` _(optional)_ – CVE id, severity, optional CVSS score/description.
    - `malware_detected` _(optional)_ – malware family name, type, confidence (0-1), and `threat_actors[]` labels.
    - `authentication_required`, `tls_enabled`, `access_restricted` – boolean flags for interaction requirements.
    - `certificate` _(optional)_ – TLS fingerprint, subject/issuer, optional SANs, `self_signed` indicator.
    - `response_details` _(optional)_ – HTTP status code with optional title/content language.
    - `error_message` _(optional)_ – service error banner (e.g., MySQL access rejection).
  - `threat_intelligence` _(optional)_ –
    - `security_labels[]` defaults to `[]` when missing.
    - `malware_families[]` optional array of known families.
    - `risk_level` string describing overall host risk.

### Loader utilities

`src/server/dataset.ts` exposes:

- `loadHostsDataset()` – reads and validates the JSON once, caching the typed result for reuse.
- `loadHosts()` – convenience helper returning just the hosts array.
- `loadNormalizedHosts()` – returns hosts augmented with derived metrics for prompts and UI filters.
- `getLoaderIssues()` – surfaces any validation warnings produced while tolerating partial records.
- `resetHostsDatasetCache()` – clears the in-memory cache for tests.

### Normalization outputs

The normalization step (`src/server/normalize.ts`) precomputes prompt-friendly signals for each host so server components and future LLM actions avoid runtime aggregation:

- Risk scoring via `riskBadge`, produced by `getRiskBadge`, which deterministically selects the highest severity from vulnerability aggregates, CVSS-derived levels, and `threat_intelligence.risk_level` (falling back to `informational` when only labels exist).
- Protocol and port breakdowns (`serviceCountsByProtocol`, `openPorts`) to power quick filters.
- TLS insights (`tlsEnabledCount`, `hasCertificates`, `hasSelfSignedCertificate`).
- Vulnerability summaries including `maxSeverity`, `highestCvss`, and deduplicated `top` CVEs.
- Threat context (`securityLabels`, `malwareFamilies`, `detectedMalwareNames`, `threatActors`).
- Representative banners and software fingerprints for succinct summarization prompts.

Risk badges are ordered using a fixed priority (`vulnerability` → `threat_intel` → `vulnerability_cvss`) so ties resolve predictably, and the resulting `sources` array documents which signals contributed to the final label.

All server actions and parsers should route through these helpers to guarantee consistent validation.

## Summarization Actions

`src/server/actions/summarizeHost.ts` implements a server-only action that accepts a `NormalizedHost`, builds a schema-aware prompt, and executes provider calls with timeouts, retries, and structured error handling. Results return `{ highlights[], risks[], narrative, errorKind }`, ensuring callers can differentiate missing configuration, timeouts, or provider issues.

`src/server/actions/summarizeAll.ts` iterates through hosts with modest concurrency (default 3), yielding incremental results via an async iterator so UIs can stream batch summaries without blocking. Each item reuses `summarizeHost`, carries the originating host/index, and continues even when individual hosts fail.

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

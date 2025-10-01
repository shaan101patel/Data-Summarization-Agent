Overview

- Build a full‑stack app that loads the provided Censys hosts dataset, enables simple interactive exploration, and generates concise AI‑assisted summaries of host data
- Deliver within a constrained timebox with emphasis on functional correctness, prompt engineering quality, code quality, documentation, and extensibility per evaluation criteria
- Provide a minimal but usable UI to operate the agent end‑to‑end, demonstrating how a user would view records and request summaries

Tech Stack

- Use a single Next.js App Router project with TypeScript and server actions to keep LLM calls server‑side and satisfy full‑stack + AI integration requirements while protecting keys
- Use Zod (or equivalent) to encode dataset‑driven schemas for metadata, host, location, autonomous_system, services, DNS, TLS/certificates, malware/threat intelligence, and vulnerabilities with CVE/CVSS
- Prefer server‑first data loading and typed props to clients so parsing and summarization remain on the server, reducing client bundle and aligning with the full‑stack requirement

Coding Preferences

- Enable strict TypeScript, ESLint, Prettier, and pre‑commit hooks to improve code quality, readability, and maintainability in line with evaluation criteria
- Write schema‑aware rendering with safe defaults for missing/optional fields to preserve functional correctness across diverse host shapes
- Add concise tests and documentation that make setup, behavior, and tradeoffs clear per deliverables and testing expectations

Project Scope

- Load and parse the provided sample dataset of three hosts with fields including IP, geo, ASN, services (banners, software), vulnerabilities (CVE, severity, CVSS), DNS, TLS/certificates, malware signals, and risk levels
- Render a hosts list and per‑host details view, then integrate an LLM‑backed summarization action producing short risk‑focused outputs
- Ship a single deployable artifact serving both UI and server actions, with documentation on environment variables and run steps per deliverables

Data and Schema

- Treat the provided JSON as the canonical development corpus and model types from its observed fields and optionality to ensure deterministic behavior
- Include types for host, location, autonomous_system, services (port, protocol, banner, software), vulnerabilities (cve_id, severity, cvss_score), DNS, TLS/certificates (self_signed, issuer, SANs), and threat intelligence (malware families, labels, risk_level)
- Document field meanings and defaults so schema‑aware UI and prompts remain safe and interpretable to reviewers

Server Validation and Normalization

- Parse the dataset on the server with tolerant validation that logs issues yet allows partial records to render safely
- Precompute derived fields like max vulnerability severity, top CVEs by CVSS, per‑protocol/port counts, certificate presence/self‑signed, geo/ASN summaries, and threat/malware labels for efficient UI and prompts
- Expose normalized summaries to server components/props to reduce client parsing and improve initial render

Risk Indicators

- Map a concise per‑host risk badge by combining the maximum vulnerability severity with threat_intelligence.risk_level to support visual triage and filtering
- Keep the mapping deterministic and document how badge values like “critical” or “high” are selected from dataset signals
- Use non‑color‑only indicators alongside color to aid accessibility while communicating severity levels

Secret Management

- Store LLM provider keys in .env

Summarization Actions

- Implement a server‑only summarizeHost that accepts a typed Host/NormalizedHost and returns {highlights[], risks[], narrative} with timeouts, retries, and error classes for robust UX
- Add summarizeAll with limited concurrency and per‑item timeouts to keep the UI responsive during batch summarization
- Limit prompts to normalized inputs that capture key signals (CVE, CVSS, severity, banners, TLS/cert flags, malware labels) to control token size while preserving fidelity

Prompt Content and Guardrails

- Inject IP, geo/ASN text, protocol/port counts, representative banners, top CVEs with CVSS/severity, malware families/labels, and TLS/cert properties most indicative of risk
- Enforce token budgets, input truncation, explicit max tokens, retries with backoff, and clear classification of rate‑limit vs transient errors to guide deterministic retries
- Version prompt templates and document design choices to satisfy prompt engineering evaluation criteria

Accessibility and UI

- Provide a simple UI that demonstrates how a user would operate the agent, meeting the requirement for an interactive front end
- Use semantic HTML, keyboard navigation, visible focus, and non‑color severity indicators to improve accessibility
- Keep styling minimal and consistent so reviewers focus on functionality, correctness, and prompts

Hosts List

- Render a server‑side list with IP, country_code, risk badge, and service counts for instant interactions on the sample dataset
- Include quick filters for risk, protocols, and malware/threat labels derived from normalized fields
- Update filters client‑side without refetch while keeping dataset parsing on the server to align with the full‑stack approach

Host Details and Compare

- Show per‑host services, banners, software versions, vulnerabilities with CVE/CVSS, TLS/cert properties, malware signals, and threat intel indicators in a schema‑aware layout
- Add a Summarize button per host and an optional multi‑select compare using normalized metrics for consistency
- Use streaming or incremental updates for summary results to keep the UI responsive under timeouts and retries

Data Loading Strategy

- Keep list and detail routes as server components, passing typed props to minimal client components for filters and streamed summaries
- Avoid client‑side dataset parsing to reduce bundle size and improve first paint and correctness
- Cache interaction state and summary results client‑side while streaming results from server actions

Error Handling

- Render partial records safely with friendly empty states for missing sections like certificates or services
- Differentiate rate‑limit vs transient vs permanent summarization errors and expose clear retry affordances via non‑blocking toasts
- Log validation issues with actionable messages without blocking navigation or base rendering

Testing

- Add schema parsing tests using fixtures clipped from the dataset, including empty services, missing certificates, and mixed severity edge cases
- Create component tests for list, details, and summary panels covering loading, success, error, and empty states with mocked server actions
- Include integration tests for end‑to‑end flows: load list, filter by severity, open details, trigger summarize, and assert structured/narrative outputs with a mocked provider

Dev Scripts

- Provide scripts for dev, build, start, lint, type‑check, test, and preview, and wire pre‑commit to fast lint/type/test checks for consistent quality
- Ensure a fresh clone can install, run dev, and execute tests using only documented commands in the README
- Keep CI fast with a smoke build and essential checks to support reviewability

Deployment

- Deploy a single app that serves both server actions and client assets, configured via environment variables for model, timeouts, and retries
- Document environment variables and the production start command in the README to meet deliverables
- Confirm no secrets are present in client bundles by inspecting build output and network traffic before submission

Acceptance and Build Order

- Acceptance: all hosts load, validate, and render with correct nested fields and derived metrics; per‑host and batch summaries are concise and actionable; no secrets are exposed
- Build order: initialize repo; implement schema + loader; build list and details; add server actions for summarization; wire streaming and retries; write tests and docs; deploy single artifact
- Manual verification: cross‑check list fields, filters, details fidelity, risk badges, and summary quality against dataset signals and evaluation criteria

Copilot Quick‑Start Prompts

- Scaffold: “Create a Next.js App Router + TypeScript project with server actions; strict TS, ESLint, Prettier, Husky pre‑commit for lint/type/test; minimal home page”
- Schema: “Create schema/types for metadata, host, location, autonomous_system, services (banner, software, vulnerabilities with cve_id/severity/cvss_score), DNS, TLS certificate, malware/threat_intelligence with optionality from the sample dataset”
- Loader: “Add a server loader that reads the sample JSON at startup, validates with Zod, tolerates partial records, and returns typed hosts”
- Normalize: “Derive maxSeverity, topCVEs by CVSS, serviceCounts by protocol/port, cert presence/self‑signed, geo/ASN summaries, and malware/threat labels”
- Actions: “Add summarizeHost and summarizeAll server actions with token limits, retries, timeout, and error classes; summarizeHost returns {highlights, risks, narrative} from normalized inputs”
- UI: “Build Hosts List and Host Details with quick filters, skeleton loaders, streamed summaries, and retry affordances; keep dataset parsing server‑side”

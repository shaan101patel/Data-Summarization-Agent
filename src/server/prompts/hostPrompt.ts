import type { NormalizedHost } from "../normalize";

export const HOST_PROMPT_VERSION = "2025-10-01" as const;

export interface BuildHostPromptOptions {
  /**
   * Maximum number of tokens allowed by the downstream LLM. Used to derive a conservative
   * character budget for the prompt payload. Defaults to 512 tokens when omitted.
   */
  maxTokens?: number;
  /**
   * Explicit override for the character budget. If provided, this takes precedence over
   * `maxTokens`. Useful when the calling integration exposes its own accounting.
   */
  maxCharacters?: number;
  /**
   * Maximum number of representative banners to include (default 2).
   */
  maxBanners?: number;
  /**
   * Maximum number of CVEs to include (default 5).
   */
  maxCves?: number;
}

export interface HostPromptPayload {
  version: typeof HOST_PROMPT_VERSION;
  prompt: string;
  /**
   * Total characters included in the prompt for quick budget inspection.
   */
  characters: number;
  /**
   * Signals which fields were truncated so the UI can surface transparency to users.
   */
  truncated: {
    banners: boolean;
    cves: boolean;
    malwareFamilies: boolean;
    securityLabels: boolean;
  };
}

const DEFAULT_OPTIONS: Required<Omit<BuildHostPromptOptions, "maxCharacters">> = {
  maxTokens: 512,
  maxBanners: 2,
  maxCves: 5,
};

const TOKEN_TO_CHARACTER_RATIO = 4; // conservative heuristic to stay within model budgets
const MAX_SECTION_LENGTH = 350; // guardrail to avoid runaway sections even after truncation

export function buildHostPrompt(
  host: NormalizedHost,
  options: BuildHostPromptOptions = {},
): HostPromptPayload {
  const settings = { ...DEFAULT_OPTIONS, ...options };
  const maxCharacters = Math.min(
    options.maxCharacters ?? settings.maxTokens * TOKEN_TO_CHARACTER_RATIO,
    settings.maxTokens * TOKEN_TO_CHARACTER_RATIO,
  );

  const truncated = {
    banners: false,
    cves: false,
    malwareFamilies: false,
    securityLabels: false,
  };

  const lines: string[] = [];
  lines.push(`# Prompt Version ${HOST_PROMPT_VERSION}`);
  lines.push(`Host: ${host.ip}`);
  lines.push(`Location: ${host.geoSummary}`);
  lines.push(`Autonomous System: ${host.asnSummary}`);
  lines.push(`Risk Badge: ${host.riskBadge.label} (sources: ${host.riskBadge.sources.join(", ") || "n/a"})`);
  lines.push(
    `Services: ${host.serviceCount} total; per protocol ${formatKeyCounts(host.serviceCountsByProtocol)}`,
  );

  if (host.openPorts.length > 0) {
    lines.push(`Open Ports: ${host.openPorts.slice(0, 20).join(", ")}${
      host.openPorts.length > 20 ? " (truncated)" : ""
    }`);
  }

  const bannerLines = host.representativeBanners
    .slice(0, settings.maxBanners)
    .map((banner, index) => `Banner ${index + 1}: ${truncateText(banner, MAX_SECTION_LENGTH)}`);
  truncated.banners = host.representativeBanners.length > settings.maxBanners;
  lines.push(...bannerLines);

  if (host.vulnerabilities.total > 0) {
    const cves = host.vulnerabilities.top.slice(0, settings.maxCves);
    truncated.cves = host.vulnerabilities.top.length > settings.maxCves;
    lines.push(
      `Top CVEs (${cves.length}/${host.vulnerabilities.top.length}): ${cves
        .map((vuln) =>
          [
            vuln.cveId,
            vuln.severity,
            typeof vuln.cvssScore === "number" ? `${vuln.cvssScore.toFixed(1)}` : null,
            truncateText(vuln.description ?? "", 120),
          ]
            .filter(Boolean)
            .join(" | "),
        )
        .join("; ")}`,
    );
  } else {
    lines.push("Top CVEs: none observed");
  }

  if (host.threat.securityLabels.length > 0) {
    const labels = limitList(host.threat.securityLabels, 12);
    truncated.securityLabels = labels.truncated;
    lines.push(`Security Labels (${labels.values.length}): ${labels.values.join(", ")}${
      labels.truncated ? " (truncated)" : ""
    }`);
  }

  if (host.threat.malwareFamilies.length > 0) {
    const families = limitList(host.threat.malwareFamilies, 10);
    truncated.malwareFamilies = families.truncated;
    lines.push(`Malware Families (${families.values.length}): ${families.values.join(", ")}${
      families.truncated ? " (truncated)" : ""
    }`);
  }

  if (host.threat.detectedMalwareNames.length > 0) {
    const malware = limitList(host.threat.detectedMalwareNames, 10);
    lines.push(`Observed Malware: ${malware.values.join(", ")}${
      malware.truncated ? " (truncated)" : ""
    }`);
  }

  lines.push(
    `TLS Insight: ${host.tlsEnabledCount} services with TLS; certificates present: ${host.hasCertificates ? "yes" : "no"}; self-signed: ${host.hasSelfSignedCertificate ? "yes" : "no"}`,
  );

  const guidance = [
    "Deliver the most critical exploit or compromise scenarios first.",
    "Highlight remediation or mitigation steps informed by the observed services and CVEs.",
    "Call out data gaps or missing telemetry when risk cannot be confirmed.",
  ];
  lines.push("Guidance:");
  lines.push(...guidance.map((item, index) => `${index + 1}. ${item}`));

  const prompt = collapseToBudget(lines, maxCharacters);
  return {
    version: HOST_PROMPT_VERSION,
    prompt,
    characters: prompt.length,
    truncated,
  };
}

function collapseToBudget(lines: string[], maxCharacters: number): string {
  const trimmed = lines
    .map((line) => line.trim())
    .filter(Boolean);

  const result: string[] = [];
  let currentLength = 0;

  for (const line of trimmed) {
    const nextLength = currentLength + line.length + 1; // +1 for newline
    if (nextLength > maxCharacters) {
      result.push("[Content truncated to respect token budget]");
      break;
    }
    result.push(line);
    currentLength = nextLength;
  }

  return result.join("\n");
}

function truncateText(value: string, limit: number): string {
  if (value.length <= limit) {
    return value;
  }
  return `${value.slice(0, limit - 3)}...`;
}

function limitList(values: string[], max: number) {
  const trimmed = values.map((value) => value.trim()).filter(Boolean);
  return {
    values: trimmed.slice(0, max),
    truncated: trimmed.length > max,
  };
}

function formatKeyCounts(record: Record<string, number>): string {
  const entries = Object.entries(record)
    .filter(([, count]) => count > 0)
    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB));
  if (entries.length === 0) {
    return "none";
  }
  return entries
    .map(([key, count]) => `${key}:${count}`)
    .join(", ");
}

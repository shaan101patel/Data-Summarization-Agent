import { Host, HostsDataset, Service, Vulnerability } from "./schema";

export type SeverityLevel =
  | "critical"
  | "high"
  | "medium"
  | "low"
  | "informational"
  | "none"
  | "unknown";

export interface NormalizedVulnerabilitySummary {
  cveId: string;
  severity: SeverityLevel;
  cvssScore: number | null;
  description?: string;
}

export interface NormalizedVulnerabilityContext {
  total: number;
  uniqueCveCount: number;
  maxSeverity: SeverityLevel;
  highestCvss: number | null;
  top: NormalizedVulnerabilitySummary[];
}

export interface NormalizedThreatInfo {
  riskLevel: SeverityLevel | null;
  rawRiskLevel: string | null;
  securityLabels: string[];
  malwareFamilies: string[];
  detectedMalwareNames: string[];
  threatActors: string[];
}

export interface RiskBadge {
  level: SeverityLevel;
  label: string;
  description: string;
  sources: string[];
}

export interface NormalizedHost {
  host: Host;
  ip: string;
  geoSummary: string;
  asnSummary: string;
  serviceCount: number;
  serviceCountsByProtocol: Record<string, number>;
  openPorts: number[];
  tlsEnabledCount: number;
  hasCertificates: boolean;
  hasSelfSignedCertificate: boolean;
  representativeBanners: string[];
  softwareFingerprints: string[];
  vulnerabilities: NormalizedVulnerabilityContext;
  threat: NormalizedThreatInfo;
  riskBadge: RiskBadge;
}

const SEVERITY_ALIASES: Record<string, SeverityLevel> = {
  critical: "critical",
  high: "high",
  medium: "medium",
  moderate: "medium",
  low: "low",
  informational: "informational",
  info: "informational",
  none: "none",
  unknown: "unknown",
};

const SEVERITY_ORDER: SeverityLevel[] = [
  "none",
  "informational",
  "low",
  "medium",
  "high",
  "critical",
];

const SEVERITY_RANK: Record<SeverityLevel, number> = {
  none: 0,
  informational: 1,
  low: 2,
  medium: 3,
  high: 4,
  critical: 5,
  unknown: 0,
};

const MAX_BANNERS = 3;

export function normalizeHosts(dataset: HostsDataset): NormalizedHost[] {
  return dataset.hosts.map(normalizeHost);
}

export function normalizeHost(host: Host): NormalizedHost {
  const protocolCounts: Record<string, number> = {};
  const openPorts = new Set<number>();
  const banners: string[] = [];
  const bannerSet = new Set<string>();
  const softwareSet = new Set<string>();
  const vulnerabilityMap = new Map<string, NormalizedVulnerabilitySummary>();
  let totalVulnerabilities = 0;
  let highestCvss: number | null = null;
  let maxSeverity: SeverityLevel = "none";
  let tlsEnabledCount = 0;
  let hasCertificates = false;
  let hasSelfSignedCertificate = false;

  const serviceMalwareNames = new Set<string>();
  const serviceThreatActors = new Set<string>();

  for (const service of host.services) {
    incrementProtocolCount(protocolCounts, service);
    openPorts.add(service.port);

    collectBanner(service.banner, banners, bannerSet);
    collectSoftware(service, softwareSet);

    const serviceVulnerabilities = collectVulnerabilities(service, vulnerabilityMap);
    totalVulnerabilities += serviceVulnerabilities.total;
    highestCvss = pickHighestCvss(highestCvss, serviceVulnerabilities.highestCvss);
    maxSeverity = pickMaxSeverity(maxSeverity, serviceVulnerabilities.maxSeverity);

    if (service.tls_enabled) {
      tlsEnabledCount += 1;
    }
    if (service.certificate) {
      hasCertificates = true;
      if (service.certificate.self_signed) {
        hasSelfSignedCertificate = true;
      }
    }

    if (service.malware_detected) {
      if (service.malware_detected.name) {
        serviceMalwareNames.add(service.malware_detected.name);
      }
      if (service.malware_detected.threat_actors) {
        for (const actor of service.malware_detected.threat_actors) {
          if (actor) {
            serviceThreatActors.add(actor);
          }
        }
      }
    }
  }

  const threatInfo = normalizeThreatInfo(host, serviceMalwareNames, serviceThreatActors);
  const vulnerabilityContext: NormalizedVulnerabilityContext = {
    total: totalVulnerabilities,
    uniqueCveCount: vulnerabilityMap.size,
    maxSeverity,
    highestCvss,
    top: selectTopVulnerabilities(vulnerabilityMap),
  };

  const riskBadge = buildRiskBadge(vulnerabilityContext, threatInfo);

  return {
    host,
    ip: host.ip,
    geoSummary: summarizeGeo(host),
    asnSummary: summarizeAsn(host),
    serviceCount: host.services.length,
    serviceCountsByProtocol: sortObject(protocolCounts),
    openPorts: Array.from(openPorts).sort((a, b) => a - b),
    tlsEnabledCount,
    hasCertificates,
    hasSelfSignedCertificate,
    representativeBanners: banners.slice(0, MAX_BANNERS),
    softwareFingerprints: sortStrings(softwareSet),
    vulnerabilities: vulnerabilityContext,
    threat: threatInfo,
    riskBadge,
  };
}

function incrementProtocolCount(
  counts: Record<string, number>,
  service: Service,
): void {
  const protocol = (service.protocol ?? "unknown").toLowerCase();
  counts[protocol] = (counts[protocol] ?? 0) + 1;
}

function collectBanner(
  banner: Service["banner"],
  banners: string[],
  seen: Set<string>,
): void {
  const value = banner?.trim();
  if (!value || seen.has(value)) {
    return;
  }
  seen.add(value);
  banners.push(value);
}

function collectSoftware(service: Service, softwareSet: Set<string>): void {
  if (!service.software) {
    return;
  }
  for (const software of service.software) {
    const parts = [software.vendor, software.product, software.version]
      .filter((part): part is string => Boolean(part))
      .map((part) => part.trim())
      .filter(Boolean);
    if (parts.length === 0) {
      continue;
    }
    softwareSet.add(parts.join(" "));
  }
}

interface ServiceVulnerabilitySummary {
  total: number;
  highestCvss: number | null;
  maxSeverity: SeverityLevel;
}

function collectVulnerabilities(
  service: Service,
  target: Map<string, NormalizedVulnerabilitySummary>,
): ServiceVulnerabilitySummary {
  const vulnerabilities = service.vulnerabilities ?? [];
  let highestCvss: number | null = null;
  let maxSeverity: SeverityLevel = "none";

  for (const vuln of vulnerabilities) {
  const summary = normalizeVulnerability(vuln);
    maxSeverity = pickMaxSeverity(maxSeverity, summary.severity);
    highestCvss = pickHighestCvss(highestCvss, summary.cvssScore);

    const previous = target.get(summary.cveId);
    if (!previous) {
      target.set(summary.cveId, summary);
    } else {
      target.set(summary.cveId, pickBetterVulnerability(previous, summary));
    }
  }

  return {
    total: vulnerabilities.length,
    highestCvss,
    maxSeverity,
  };
}

function normalizeVulnerability(vuln: Vulnerability): NormalizedVulnerabilitySummary {
  const severity = normalizeSeverity(vuln.severity);
  const cvssScore =
    typeof vuln.cvss_score === "number" && Number.isFinite(vuln.cvss_score)
      ? vuln.cvss_score
      : null;

  return {
    cveId: vuln.cve_id,
    severity,
    cvssScore,
    description: vuln.description?.trim() || undefined,
  };
}

function normalizeSeverity(value: string | null | undefined): SeverityLevel {
  if (!value) {
    return "unknown";
  }

  const key = value.trim().toLowerCase();
  return SEVERITY_ALIASES[key] ?? "unknown";
}

function pickHighestCvss(current: number | null, incoming: number | null): number | null {
  if (incoming === null) {
    return current;
  }
  if (current === null) {
    return incoming;
  }
  return Math.max(current, incoming);
}

function pickMaxSeverity(a: SeverityLevel, b: SeverityLevel): SeverityLevel {
  return SEVERITY_RANK[b] > SEVERITY_RANK[a] ? b : a;
}

function pickBetterVulnerability(
  current: NormalizedVulnerabilitySummary,
  incoming: NormalizedVulnerabilitySummary,
): NormalizedVulnerabilitySummary {
  const currentCvss = current.cvssScore ?? -1;
  const incomingCvss = incoming.cvssScore ?? -1;
  if (incomingCvss > currentCvss) {
    return incoming;
  }
  if (incomingCvss < currentCvss) {
    return current;
  }

  return SEVERITY_RANK[incoming.severity] > SEVERITY_RANK[current.severity]
    ? incoming
    : current;
}

function selectTopVulnerabilities(
  map: Map<string, NormalizedVulnerabilitySummary>,
): NormalizedVulnerabilitySummary[] {
  return Array.from(map.values()).sort((a, b) => {
    const cvssA = a.cvssScore ?? -1;
    const cvssB = b.cvssScore ?? -1;
    if (cvssA !== cvssB) {
      return cvssB - cvssA;
    }
    const severityDiff = SEVERITY_RANK[b.severity] - SEVERITY_RANK[a.severity];
    if (severityDiff !== 0) {
      return severityDiff;
    }
    return a.cveId.localeCompare(b.cveId);
  });
}

function normalizeThreatInfo(
  host: Host,
  serviceMalwareNames: Set<string>,
  serviceThreatActors: Set<string>,
): NormalizedThreatInfo {
  const threat = host.threat_intelligence;
  const rawRiskLevel = threat?.risk_level ?? null;
  const riskSeverity = normalizeSeverity(rawRiskLevel);
  const riskLevel = riskSeverity === "unknown" ? null : riskSeverity;

  const securityLabels = sortStrings(new Set(threat?.security_labels ?? []));
  const malwareFamilies = sortStrings(new Set(threat?.malware_families ?? []));
  const detectedMalwareNames = sortStrings(serviceMalwareNames);
  const threatActors = sortStrings(serviceThreatActors);

  return {
    riskLevel,
    rawRiskLevel,
    securityLabels,
    malwareFamilies,
    detectedMalwareNames,
    threatActors,
  };
}

function buildRiskBadge(
  vulnerabilities: NormalizedVulnerabilityContext,
  threat: NormalizedThreatInfo,
): RiskBadge {
  let level: SeverityLevel = "none";
  const sources: string[] = [];
  const descriptionParts: string[] = [];

  if (vulnerabilities.maxSeverity !== "none" && vulnerabilities.maxSeverity !== "unknown") {
    level = vulnerabilities.maxSeverity;
    sources.push("vulnerability");
    descriptionParts.push(`Max vulnerability severity ${capitalise(level)}`);
  }

  if (threat.riskLevel && SEVERITY_RANK[threat.riskLevel] > SEVERITY_RANK[level]) {
    level = threat.riskLevel;
    sources.push("threat_intel");
    descriptionParts.push(`Threat intel risk ${capitalise(threat.riskLevel)}`);
  }

  if (
    level === "none" &&
    (threat.securityLabels.length > 0 ||
      threat.malwareFamilies.length > 0 ||
      threat.detectedMalwareNames.length > 0)
  ) {
    level = "informational";
    sources.push("threat_labels");
    descriptionParts.push("Threat labels present");
  }

  if (descriptionParts.length === 0) {
    descriptionParts.push("No elevated risk signals detected");
  }

  return {
    level,
    label: capitalise(level),
    description: descriptionParts.join("; "),
    sources,
  };
}

function summarizeGeo(host: Host): string {
  const parts: string[] = [];
  if (host.location.city) {
    parts.push(host.location.city);
  }
  if (host.location.country) {
    parts.push(host.location.country);
  }
  if (parts.length === 0) {
    parts.push(host.location.country_code);
  }
  return `${parts.join(", " )} (${host.location.country_code})`;
}

function summarizeAsn(host: Host): string {
  const asn = host.autonomous_system;
  const components = [`AS${asn.asn}`, asn.name];
  if (asn.country_code) {
    components.push(`(${asn.country_code})`);
  }
  return components.filter(Boolean).join(" ");
}

function sortObject(record: Record<string, number>): Record<string, number> {
  return Object.fromEntries(
    Object.entries(record)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => [key, value]),
  );
}

function sortStrings(values: Set<string>): string[] {
  return Array.from(values)
    .map((value) => value.trim())
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));
}

function capitalise(value: string): string {
  if (!value) {
    return "";
  }
  return value.charAt(0).toUpperCase() + value.slice(1);
}

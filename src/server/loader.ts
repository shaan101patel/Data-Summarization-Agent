import { readFile } from "node:fs/promises";
import path from "node:path";
import { ZodError } from "zod";

import {
  Host,
  HostSchema,
  HostsDataset,
  Metadata,
  MetadataSchema,
  ServiceSchema,
} from "./schema";
import { normalizeHosts, NormalizedHost } from "./normalize";

export interface HostValidationIssue {
  ip: string | null;
  issues: string[];
}

export const HOSTS_DATASET_PATH = path.join(
  process.cwd(),
  "SampleData",
  "hosts_dataset.json",
);

interface LoaderState {
  dataset: HostsDataset;
  normalized: NormalizedHost[];
  issues: HostValidationIssue[];
}

let loaderStatePromise: Promise<LoaderState> | null = null;

function formatZodIssues(error: ZodError): string[] {
  return error.issues.map((issue) => {
    const issuePath = issue.path.join(".");
    const location = issuePath ? ` at \`${issuePath}\`` : "";
    return `${issue.message}${location}`;
  });
}

function buildFallbackHost(raw: unknown, ip: string | null): Host {
  const partial = (raw as Partial<Host>) ?? {};

  const ipValue =
    typeof partial.ip === "string" ? partial.ip : ip ?? "unknown";

  const coordinates = partial.location?.coordinates;
  const latitudeValue = Number(coordinates?.latitude ?? Number.NaN);
  const longitudeValue = Number(coordinates?.longitude ?? Number.NaN);

  const services: Host["services"] = Array.isArray(partial.services)
    ? partial.services.flatMap((service: unknown, index: number) => {
        const result = ServiceSchema.safeParse(service);
        if (result.success) {
          return [result.data];
        }

        console.warn(
          `[dataset] Service dropped for host ${ipValue} (index ${index}): ${formatZodIssues(result.error).join(", ")}`,
        );
        return [];
      })
    : [];

  const asnValue = Number(partial.autonomous_system?.asn ?? Number.NaN);

  const securityLabels = Array.isArray(
    partial.threat_intelligence?.security_labels,
  )
    ? partial.threat_intelligence.security_labels.filter(
        (label: unknown): label is string => typeof label === "string",
      )
    : [];

  const malwareFamilies = Array.isArray(
    partial.threat_intelligence?.malware_families,
  )
    ? partial.threat_intelligence.malware_families.filter(
        (family: unknown): family is string => typeof family === "string",
      )
    : [];

  const riskLevel =
    typeof partial.threat_intelligence?.risk_level === "string"
      ? partial.threat_intelligence.risk_level
      : undefined;

  const hasThreatDetails =
    securityLabels.length > 0 ||
    malwareFamilies.length > 0 ||
    Boolean(riskLevel);

  return {
    ip: ipValue,
    location: {
      city: partial.location?.city,
      country: partial.location?.country,
      country_code: partial.location?.country_code ?? "ZZ",
      coordinates: {
        latitude: Number.isFinite(latitudeValue) ? latitudeValue : 0,
        longitude: Number.isFinite(longitudeValue) ? longitudeValue : 0,
      },
    },
    autonomous_system: {
      asn: Number.isFinite(asnValue) ? asnValue : -1,
      name: partial.autonomous_system?.name ?? "Unknown",
      country_code: partial.autonomous_system?.country_code,
    },
    dns: partial.dns,
    operating_system: partial.operating_system,
    services,
    threat_intelligence: hasThreatDetails
      ? {
          security_labels: securityLabels,
          malware_families:
            malwareFamilies.length > 0 ? malwareFamilies : undefined,
          risk_level: riskLevel,
        }
      : undefined,
  };
}

async function initialiseLoaderState(): Promise<LoaderState> {
  const rawContent = await readFile(HOSTS_DATASET_PATH, "utf-8");

  let rawJson: unknown;
  try {
    rawJson = JSON.parse(rawContent);
  } catch (error) {
    throw new Error(
      `[dataset] Could not parse JSON in hosts dataset: ${(error as Error).message}`,
    );
  }

  if (!rawJson || typeof rawJson !== "object") {
    throw new Error("[dataset] Parsed dataset is not an object");
  }

  const rawMetadata = (rawJson as { metadata?: unknown }).metadata;
  const metadataResult = MetadataSchema.safeParse(rawMetadata);
  if (!metadataResult.success) {
    throw new Error(
      `[dataset] Metadata validation failed: ${formatZodIssues(metadataResult.error).join(", ")}`,
    );
  }
  const metadata: Metadata = metadataResult.data;

  const rawHostsNode = (rawJson as { hosts?: unknown }).hosts;
  if (!Array.isArray(rawHostsNode)) {
    console.warn("[dataset] Dataset hosts list missing or invalid; defaulting to []");
  }
  const rawHosts = Array.isArray(rawHostsNode) ? rawHostsNode : [];

  const issues: HostValidationIssue[] = [];
  const hosts: Host[] = rawHosts.map((entry, index) => {
    const result = HostSchema.safeParse(entry);
    if (result.success) {
      return result.data;
    }

    const entryIp =
      typeof (entry as { ip?: unknown })?.ip === "string"
        ? (entry as { ip: string }).ip
        : null;
    const formattedIssues = formatZodIssues(result.error);
    console.warn(
      `[dataset] Host validation failed for ${entryIp ?? `index ${index}`}: ${formattedIssues.join(", ")}`,
    );
    issues.push({ ip: entryIp, issues: formattedIssues });
    return buildFallbackHost(entry, entryIp);
  });

  const dataset: HostsDataset = {
    metadata,
    hosts,
  };

  const normalized = normalizeHosts(dataset);

  return {
    dataset,
    normalized,
    issues,
  };
}

async function getLoaderState(): Promise<LoaderState> {
  if (!loaderStatePromise) {
    loaderStatePromise = initialiseLoaderState();
  }
  return loaderStatePromise;
}

export async function loadHostsDataset(): Promise<HostsDataset> {
  const state = await getLoaderState();
  return state.dataset;
}

export async function loadHosts(): Promise<Host[]> {
  const state = await getLoaderState();
  return state.dataset.hosts;
}

export async function loadNormalizedHosts(): Promise<NormalizedHost[]> {
  const state = await getLoaderState();
  return state.normalized;
}

export async function getLoaderIssues(): Promise<HostValidationIssue[]> {
  const state = await getLoaderState();
  return state.issues;
}

export function resetHostsDatasetCache(): void {
  loaderStatePromise = null;
}
import { z } from "zod";

/** Coordinates for a host's reported location (WGS84). */
export const CoordinatesSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
});
export type Coordinates = z.infer<typeof CoordinatesSchema>;

/** Geographic information derived from the dataset. */
export const LocationSchema = z.object({
  city: z.string().optional(),
  country: z.string().optional(),
  country_code: z.string(),
  coordinates: CoordinatesSchema,
});
export type Location = z.infer<typeof LocationSchema>;

/** Autonomous system metadata describing network ownership. */
export const AutonomousSystemSchema = z.object({
  asn: z.number(),
  name: z.string(),
  country_code: z.string().optional(),
});
export type AutonomousSystem = z.infer<typeof AutonomousSystemSchema>;

/** Software component discovered on a service banner. */
export const SoftwareSchema = z.object({
  product: z.string(),
  vendor: z.string().optional(),
  version: z.string().optional(),
});
export type Software = z.infer<typeof SoftwareSchema>;

/** Vulnerability entry reported for a service. */
export const VulnerabilitySchema = z.object({
  cve_id: z.string(),
  severity: z.string(),
  cvss_score: z.number().optional(),
  description: z.string().optional(),
});
export type Vulnerability = z.infer<typeof VulnerabilitySchema>;

/** Malware detection detail provided at the service level. */
export const MalwareDetectionSchema = z.object({
  name: z.string(),
  type: z.string().optional(),
  confidence: z.number().min(0).max(1).optional(),
  threat_actors: z.array(z.string()).optional(),
});
export type MalwareDetection = z.infer<typeof MalwareDetectionSchema>;

/** HTTP response details when provided for a service. */
export const ResponseDetailsSchema = z.object({
  status_code: z.number(),
  title: z.string().optional(),
  content_language: z.string().optional(),
});
export type ResponseDetails = z.infer<typeof ResponseDetailsSchema>;

/** TLS certificates observed for services marked as TLS-enabled. */
export const CertificateSchema = z.object({
  fingerprint_sha256: z.string(),
  subject: z.string().optional(),
  issuer: z.string().optional(),
  self_signed: z.boolean().optional(),
  subject_alt_names: z.array(z.string()).optional(),
});
export type Certificate = z.infer<typeof CertificateSchema>;

/** Service configuration discovered on a host. */
export const ServiceSchema = z.object({
  port: z.number(),
  protocol: z.string(),
  banner: z.string().optional(),
  software: z.array(SoftwareSchema).optional(),
  vulnerabilities: z.array(VulnerabilitySchema).optional(),
  malware_detected: MalwareDetectionSchema.optional(),
  authentication_required: z.boolean().optional(),
  tls_enabled: z.boolean().optional(),
  certificate: CertificateSchema.optional(),
  response_details: ResponseDetailsSchema.optional(),
  error_message: z.string().optional(),
  access_restricted: z.boolean().optional(),
});
export type Service = z.infer<typeof ServiceSchema>;

/** DNS hostname information if present for the host. */
export const DNSRecordSchema = z.object({
  hostname: z.string(),
});
export type DNSRecord = z.infer<typeof DNSRecordSchema>;

/** Operating system fingerprints when available. */
export const OperatingSystemSchema = z.object({
  vendor: z.string().optional(),
  product: z.string(),
  version: z.string().optional(),
});
export type OperatingSystem = z.infer<typeof OperatingSystemSchema>;

/** Threat intelligence annotations applied to the host. */
export const ThreatIntelligenceSchema = z.object({
  security_labels: z.array(z.string()).default([]),
  malware_families: z.array(z.string()).optional(),
  risk_level: z.string().optional(),
});
export type ThreatIntelligence = z.infer<typeof ThreatIntelligenceSchema>;

/** DNS, TLS, vulnerability, and malware signals aggregated per host. */
export const HostSchema = z.object({
  ip: z.string(),
  location: LocationSchema,
  autonomous_system: AutonomousSystemSchema,
  dns: DNSRecordSchema.optional(),
  operating_system: OperatingSystemSchema.optional(),
  services: z.array(ServiceSchema).default([]),
  threat_intelligence: ThreatIntelligenceSchema.optional(),
});
export type Host = z.infer<typeof HostSchema>;

/** Dataset-level metadata describing the corpus. */
export const MetadataSchema = z.object({
  description: z.string(),
  created_at: z.string(),
  data_sources: z.array(z.string()).default([]),
  hosts_count: z.number(),
  ips_analyzed: z.array(z.string()).default([]),
});
export type Metadata = z.infer<typeof MetadataSchema>;

/** Root dataset structure combining metadata and host entries. */
export const HostsDatasetSchema = z.object({
  metadata: MetadataSchema,
  hosts: z.array(HostSchema),
});
export type HostsDataset = z.infer<typeof HostsDatasetSchema>;

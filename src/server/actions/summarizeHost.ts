"use server";

import "server-only";

import { z } from "zod";

import { getServerEnv, type ServerEnv } from "../env";
import type { NormalizedHost } from "../normalize";
import { buildHostPrompt } from "../prompts/hostPrompt";

export type SummarizationErrorKind =
  | "none"
  | "missing-config"
  | "timeout"
  | "rate-limit"
  | "transient"
  | "provider"
  | "invalid-response"
  | "unknown";

export interface SummarizeHostResult {
  highlights: string[];
  risks: string[];
  narrative: string;
  errorKind: SummarizationErrorKind;
  errorMessage?: string;
  meta: {
    attempts: number;
    durationMs: number;
    usedFallback: boolean;
    provider: string;
    promptVersion: string;
    promptCharacters: number;
    maxTokens: number;
  };
}

const responseSchema = z.object({
  highlights: z.array(z.string()),
  risks: z.array(z.string()),
  narrative: z.string(),
});

type SummarizationPayload = z.infer<typeof responseSchema>;

class SummarizationError extends Error {
  readonly kind: Exclude<SummarizationErrorKind, "none">;
  readonly attempts: number;
  readonly retriable: boolean;
  readonly retryAfterMs?: number;

  constructor(
    message: string,
    kind: Exclude<SummarizationErrorKind, "none">,
    options: {
      cause?: unknown;
      attempts?: number;
      retriable?: boolean;
      retryAfterMs?: number;
    } = {},
  ) {
    super(message, { cause: options.cause });
    this.name = "SummarizationError";
    this.kind = kind;
    this.attempts = options.attempts ?? 1;
    this.retriable = options.retriable ?? false;
    this.retryAfterMs = options.retryAfterMs;
  }
}

export async function summarizeHost(
  normalizedHost: NormalizedHost,
): Promise<SummarizeHostResult> {
  const env = getServerEnv();
  const start = Date.now();
  const promptPayload = buildHostPrompt(normalizedHost, {
    maxTokens: env.MAX_TOKENS,
  });
  const fallback = buildFallbackSummary(normalizedHost);

  if (!env.LLM_API_KEY) {
    return {
      ...fallback,
      errorKind: "missing-config",
      errorMessage:
        "LLM_API_KEY is not configured. Add credentials in .env.local to enable live summaries.",
      meta: {
        attempts: 0,
        durationMs: 0,
        usedFallback: true,
        provider: env.LLM_PROVIDER,
        promptVersion: promptPayload.version,
        promptCharacters: promptPayload.characters,
        maxTokens: env.MAX_TOKENS,
      },
    };
  }

  try {
    const { payload, attempts, durationMs } = await executeWithRetries(
      async (attempt, signal) => {
        const raw = await performSummarization(
          normalizedHost,
          promptPayload.prompt,
          env,
          signal,
        );
        try {
          return responseSchema.parse(raw);
        } catch (error) {
          throw new SummarizationError(
            "Provider returned an invalid response payload.",
            "invalid-response",
            { cause: error, retriable: false, attempts: attempt },
          );
        }
      },
      env,
    );

    return {
      ...payload,
      errorKind: "none",
      meta: {
        attempts,
        durationMs,
        usedFallback: false,
        provider: env.LLM_PROVIDER,
        promptVersion: promptPayload.version,
        promptCharacters: promptPayload.characters,
        maxTokens: env.MAX_TOKENS,
      },
    };
  } catch (error) {
    const summarizationError = toSummarizationError(error);
    return {
      ...fallback,
      errorKind: summarizationError.kind,
      errorMessage: summarizationError.message,
      meta: {
        attempts: summarizationError.attempts,
        durationMs: Date.now() - start,
        usedFallback: true,
        provider: env.LLM_PROVIDER,
        promptVersion: promptPayload.version,
        promptCharacters: promptPayload.characters,
        maxTokens: env.MAX_TOKENS,
      },
    };
  }
}

async function executeWithRetries<T>(
  operation: (attempt: number, signal: AbortSignal) => Promise<T>,
  env: ServerEnv,
): Promise<{ payload: T; attempts: number; durationMs: number }> {
  const maxAttempts = Math.max(1, env.RETRIES + 1);
  const start = Date.now();
  let attempt = 0;
  let lastError: SummarizationError | null = null;

  while (attempt < maxAttempts) {
    attempt += 1;
    try {
      const payload = await withTimeout(env.TIMEOUT_MS, (signal) =>
        operation(attempt, signal),
      );
      return { payload, attempts: attempt, durationMs: Date.now() - start };
    } catch (error) {
      const summarizationError = toSummarizationError(error, attempt);
      lastError = summarizationError;
      if (!summarizationError.retriable || attempt >= maxAttempts) {
        throw summarizationError;
      }
      await delay(
        summarizationError.retryAfterMs !== undefined
          ? summarizationError.retryAfterMs
          : backoffDelay(attempt),
      );
    }
  }

  throw lastError ??
    new SummarizationError("Unknown summarization failure.", "unknown", {
      attempts: maxAttempts,
      retriable: false,
    });
}

async function withTimeout<T>(
  timeoutMs: number,
  task: (signal: AbortSignal) => Promise<T>,
): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await task(controller.signal);
  } catch (error) {
    if (controller.signal.aborted) {
      throw new SummarizationError(
        `Summarization exceeded timeout of ${timeoutMs}ms`,
        "timeout",
        { cause: error, retriable: true },
      );
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

async function performSummarization(
  normalizedHost: NormalizedHost,
  _prompt: string,
  _env: ServerEnv,
  signal: AbortSignal,
): Promise<SummarizationPayload> {
  signal.throwIfAborted();
  // TODO: replace this simulated response with a real provider integration.
  await delay(5);
  signal.throwIfAborted();
  return buildFallbackSummary(normalizedHost);
}

function toSummarizationError(
  error: unknown,
  attempts = 1,
): SummarizationError {
  if (error instanceof SummarizationError) {
    return new SummarizationError(error.message, error.kind, {
      cause: error.cause,
      attempts,
      retriable: error.retriable,
      retryAfterMs: error.retryAfterMs,
    });
  }

  const providerError = classifyProviderError(error);
  if (providerError) {
    return new SummarizationError(providerError.message, providerError.kind, {
      cause: error,
      attempts,
      retriable: providerError.retriable,
      retryAfterMs: providerError.retryAfterMs,
    });
  }

  if (error instanceof Error) {
    return new SummarizationError(error.message, "unknown", {
      cause: error,
      attempts,
      retriable: true,
    });
  }

  return new SummarizationError("Unexpected error thrown during summarization.", "unknown", {
    attempts,
    retriable: true,
  });
}

interface ProviderErrorClassification {
  kind: Exclude<SummarizationErrorKind, "none">;
  message: string;
  retriable: boolean;
  retryAfterMs?: number;
}

function classifyProviderError(error: unknown): ProviderErrorClassification | null {
  if (!error || typeof error !== "object") {
    return null;
  }

  const status = readNumber((error as Record<string, unknown>).status);
  const code = readString((error as Record<string, unknown>).code)?.toLowerCase();
  const message = readString((error as Record<string, unknown>).message) ?? "Provider error";
  const retryAfter = readNumber(
    (error as Record<string, unknown>).retryAfterMs ??
      extractRetryAfter((error as Record<string, unknown>).headers),
  );

  if (status === 429 || code?.includes("rate") || code?.includes("throttle")) {
    return {
      kind: "rate-limit",
      message,
      retriable: true,
      retryAfterMs: retryAfter,
    };
  }

  if (status && status >= 500) {
    return {
      kind: "transient",
      message,
      retriable: true,
      retryAfterMs: retryAfter,
    };
  }

  if (code === "etimedout") {
    return {
      kind: "timeout",
      message,
      retriable: true,
      retryAfterMs: retryAfter,
    };
  }

  if (status && status >= 400) {
    return {
      kind: "provider",
      message,
      retriable: false,
    };
  }

  return null;
}

function readNumber(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  }
  return undefined;
}

function readString(value: unknown): string | undefined {
  if (typeof value === "string" && value.trim().length > 0) {
    return value;
  }
  return undefined;
}

function extractRetryAfter(headers: unknown): number | undefined {
  if (!headers || typeof headers !== "object") {
    return undefined;
  }
  const headerValue = readString((headers as Record<string, unknown>)["retry-after"]);
  if (!headerValue) {
    return undefined;
  }
  const seconds = Number(headerValue);
  if (Number.isFinite(seconds)) {
    return seconds * 1000;
  }
  return undefined;
}

function buildFallbackSummary(host: NormalizedHost): SummarizationPayload {
  const highlights: string[] = [];
  highlights.push(`Risk badge ${host.riskBadge.label}`);
  highlights.push(
    `${host.serviceCount} services across ${Object.keys(host.serviceCountsByProtocol).length} protocols`,
  );
  if (host.vulnerabilities.top.length > 0) {
    const topVuln = host.vulnerabilities.top[0];
    highlights.push(`Top CVE ${topVuln.cveId} (${topVuln.severity}${
      topVuln.cvssScore ? ` ${topVuln.cvssScore.toFixed(1)}` : ""
    })`);
  }
  if (host.threat.securityLabels.length > 0) {
    highlights.push(`Security labels: ${host.threat.securityLabels.join(", ")}`);
  }

  const risks: string[] = [];
  if (host.vulnerabilities.total > 0) {
    risks.push(
      `${host.vulnerabilities.total} known vulnerabilities with max severity ${host.vulnerabilities.maxSeverity}`,
    );
  }
  if (host.threat.riskLevel) {
    risks.push(`Threat intel flags risk as ${host.threat.riskLevel}`);
  }
  if (host.threat.detectedMalwareNames.length > 0) {
    risks.push(`Malware detected: ${host.threat.detectedMalwareNames.join(", ")}`);
  }
  if (host.hasSelfSignedCertificate) {
    risks.push("Self-signed certificate detected on at least one service");
  }
  if (risks.length === 0) {
    risks.push("No heightened risk indicators beyond baseline exposure");
  }

  const narrativeParts: string[] = [];
  narrativeParts.push(
    `${host.ip} (${host.geoSummary}) is tracked as ${host.riskBadge.label.toLowerCase()} risk due to ${
      host.vulnerabilities.total > 0
        ? `${host.vulnerabilities.total} documented vulnerabilities`
        : "limited direct findings"
    }.`,
  );
  if (host.vulnerabilities.top.length > 0) {
    const vulnSnippets = host.vulnerabilities.top
      .slice(0, 2)
      .map((vuln) => `${vuln.cveId} (${vuln.severity}${vuln.cvssScore ? ` ${vuln.cvssScore.toFixed(1)}` : ""})`);
    narrativeParts.push(`Key exposures: ${vulnSnippets.join("; ")}.`);
  }
  if (host.threat.riskLevel || host.threat.securityLabels.length > 0) {
    const labels = host.threat.securityLabels.slice(0, 3).join(", ");
    const threatText = [host.threat.riskLevel, labels].filter(Boolean).join(" / ");
    narrativeParts.push(`Threat intel: ${threatText}.`);
  }
  if (host.threat.malwareFamilies.length > 0) {
    narrativeParts.push(`Known malware families: ${host.threat.malwareFamilies.join(", ")}.`);
  }
  if (host.tlsEnabledCount > 0) {
    narrativeParts.push(
      `${host.tlsEnabledCount} services present TLS certificates${
        host.hasSelfSignedCertificate ? ", including self-signed chains that require hardening." : "."
      }`,
    );
  }
  if (narrativeParts.length === 1) {
    narrativeParts.push("No additional critical findings were identified in the current snapshot.");
  }

  return {
    highlights,
    risks,
    narrative: narrativeParts.join(" ").replace(/\s+/g, " ").trim(),
  };
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function backoffDelay(attempt: number): number {
  const base = 100;
  return Math.min(1000, base * attempt);
}

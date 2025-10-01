import { z } from "zod";

const serverEnvSchema = z.object({
  LLM_PROVIDER: z.string().trim().min(1).default("openai"),
  LLM_API_KEY: z.string().trim().min(1).optional(),
  MODEL_NAME: z.string().trim().min(1).default("gpt-4o-mini"),
  TIMEOUT_MS: z.coerce.number().int().positive().default(15000),
  MAX_TOKENS: z.coerce.number().int().positive().default(512),
  RETRIES: z.coerce.number().int().min(0).default(2),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

let cachedEnv: ServerEnv | null = null;

export function getServerEnv(): ServerEnv {
  if (cachedEnv) {
    return cachedEnv;
  }

  const parsed = serverEnvSchema.parse({
    LLM_PROVIDER: normalizeString(process.env.LLM_PROVIDER),
    LLM_API_KEY: normalizeString(process.env.LLM_API_KEY),
    MODEL_NAME: normalizeString(process.env.MODEL_NAME),
    TIMEOUT_MS: normalizeString(process.env.TIMEOUT_MS),
    MAX_TOKENS: normalizeString(process.env.MAX_TOKENS),
    RETRIES: normalizeString(process.env.RETRIES),
  });

  cachedEnv = Object.freeze(parsed);
  return cachedEnv;
}

export function resetServerEnvCache(): void {
  cachedEnv = null;
}

function normalizeString(value: string | undefined | null): string | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

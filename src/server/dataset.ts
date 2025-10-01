"use server";

import { readFile } from "node:fs/promises";
import path from "node:path";

import { Host, HostsDataset, HostsDatasetSchema } from "./schema";

/** Absolute path to the canonical hosts dataset bundled with the repo. */
export const HOSTS_DATASET_PATH = path.join(
  process.cwd(),
  "SampleData",
  "hosts_dataset.json",
);

let cachedDataset: HostsDataset | null = null;

/**
 * Load and validate the bundled dataset.
 * The result is cached to avoid repeated disk I/O in server actions.
 */
export async function loadHostsDataset(): Promise<HostsDataset> {
  if (cachedDataset) {
    return cachedDataset;
  }

  const raw = await readFile(HOSTS_DATASET_PATH, "utf-8");
  const json = JSON.parse(raw);
  const dataset = HostsDatasetSchema.parse(json);
  cachedDataset = dataset;
  return dataset;
}

/** Clear the in-memory dataset cache (primarily for testing). */
export function resetHostsDatasetCache(): void {
  cachedDataset = null;
}

/** Convenience helper to read the list of hosts using the canonical loader. */
export async function loadHosts(): Promise<Host[]> {
  const dataset = await loadHostsDataset();
  return dataset.hosts;
}

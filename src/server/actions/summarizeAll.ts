"use server";

import "server-only";

import type { NormalizedHost } from "../normalize";

import { summarizeHost } from "./summarizeHost";

export interface SummarizeAllOptions {
  concurrency?: number;
  signal?: AbortSignal;
}

export interface SummarizeAllItemResult {
  index: number;
  host: NormalizedHost;
  result: Awaited<ReturnType<typeof summarizeHost>>;
}

export async function* summarizeAll(
  hosts: NormalizedHost[],
  options: SummarizeAllOptions = {},
): AsyncGenerator<SummarizeAllItemResult> {
  if (hosts.length === 0) {
    return;
  }

  const concurrency = Math.max(1, Math.min(options.concurrency ?? 3, hosts.length));
  const queue = hosts.map((host, index) => ({ host, index }));
  let cursor = 0;
  const inFlight: Array<{ index: number; promise: Promise<SummarizeAllItemResult> }> = [];

  const enqueueNext = () => {
    if (cursor >= queue.length) {
      return;
    }
    const job = queue[cursor++];
    const promise = runJob(job.index, job.host, options.signal);
    inFlight.push({ index: job.index, promise });
  };

  for (let i = 0; i < concurrency; i += 1) {
    enqueueNext();
  }

  while (inFlight.length > 0) {
    const wrapped = inFlight.map(({ promise, index }) =>
      promise.then((value) => ({ value, index })),
    );
    const { value, index } = await Promise.race(wrapped);
    const removeIndex = inFlight.findIndex((entry) => entry.index === index);
    if (removeIndex !== -1) {
      inFlight.splice(removeIndex, 1);
    }
    yield value;
    enqueueNext();
  }
}

async function runJob(
  index: number,
  host: NormalizedHost,
  signal?: AbortSignal,
): Promise<SummarizeAllItemResult> {
  if (signal?.aborted) {
    signal.throwIfAborted();
  }
  const result = await summarizeHost(host);
  return { index, host, result };
}

import { afterEach, describe, expect, it } from "vitest";

import { loadHosts, loadHostsDataset, resetHostsDatasetCache } from "../dataset";
import { HostSchema } from "../schema";

describe("hosts dataset loader", () => {
  afterEach(() => {
    resetHostsDatasetCache();
  });

  it("parses the canonical dataset and caches the result", async () => {
    const first = await loadHostsDataset();
    const second = await loadHostsDataset();

    expect(first.metadata.hosts_count).toBe(3);
    expect(first.hosts).toHaveLength(3);
    expect(second).toBe(first);
  });

  it("preserves optional and missing sections", async () => {
    const hosts = await loadHosts();
    const newYorkHost = hosts.find((host) => host.ip === "168.196.241.227");
    const shanghaiHost = hosts.find((host) => host.ip === "1.94.62.205");

    expect(newYorkHost?.dns).toBeUndefined();
    expect(newYorkHost?.services[0].vulnerabilities?.[0].severity).toBe("critical");

    const ftpService = shanghaiHost?.services.find((service) => service.port === 21);
    expect(ftpService?.tls_enabled).toBe(true);
    expect(ftpService?.certificate?.self_signed).toBe(true);
    expect(ftpService?.certificate?.subject).toContain("BT-PANEL");
  });

  it("normalises services to an empty array when omitted", () => {
    const minimalHost = HostSchema.parse({
      ip: "0.0.0.0",
      location: {
        country_code: "US",
        coordinates: { latitude: 0, longitude: 0 },
      },
      autonomous_system: {
        asn: 0,
        name: "Unknown",
      },
    });

    expect(minimalHost.services).toEqual([]);
  });
});

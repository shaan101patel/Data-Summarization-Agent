import { afterEach, describe, expect, it } from "vitest";

import {
  loadHosts,
  loadNormalizedHosts,
  resetHostsDatasetCache,
} from "../dataset";

describe("normalized host loader", () => {
  afterEach(() => {
    resetHostsDatasetCache();
  });

  it("returns normalized hosts with derived metrics", async () => {
    const normalized = await loadNormalizedHosts();
    expect(normalized).toHaveLength(3);

    const newYork = normalized.find((host) => host.ip === "168.196.241.227");
    expect(newYork?.vulnerabilities.maxSeverity).toBe("critical");
    expect(newYork?.vulnerabilities.uniqueCveCount).toBe(2);
    expect(newYork?.serviceCountsByProtocol.ssh).toBe(1);
    expect(newYork?.representativeBanners).toContain("SSH-2.0-OpenSSH_8.7");
    expect(newYork?.riskBadge.level).toBe("critical");

    const beijing = normalized.find((host) => host.ip === "1.92.135.168");
    expect(beijing?.serviceCount).toBe(3);
    expect(beijing?.serviceCountsByProtocol.http).toBe(2);
    expect(beijing?.openPorts).toEqual([22, 8074, 8082]);
    expect(beijing?.threat.malwareFamilies).toContain("Cobalt Strike");
    expect(beijing?.threat.detectedMalwareNames).toContain("Cobalt Strike");
    expect(beijing?.threat.threatActors).toEqual([
      "APT41",
      "Cobalt Group",
      "FIN7",
    ]);
    expect(beijing?.riskBadge.level).toBe("critical");

    const shanghai = normalized.find((host) => host.ip === "1.94.62.205");
    expect(shanghai?.serviceCount).toBe(7);
    expect(shanghai?.serviceCountsByProtocol.http).toBe(4);
    expect(shanghai?.tlsEnabledCount).toBe(2);
    expect(shanghai?.hasCertificates).toBe(true);
    expect(shanghai?.hasSelfSignedCertificate).toBe(true);
    expect(shanghai?.openPorts).toEqual([21, 22, 80, 888, 3306, 8011, 37035]);
    expect(shanghai?.vulnerabilities.uniqueCveCount).toBe(2);
    expect(shanghai?.riskBadge.level).toBe("critical");
  });

  it("exposes the raw hosts alongside normalized data", async () => {
    const [hosts, normalized] = await Promise.all([
      loadHosts(),
      loadNormalizedHosts(),
    ]);

    const original = hosts.find((host) => host.ip === "1.92.135.168");
    const normalizedEntry = normalized.find(
      (host) => host.ip === "1.92.135.168",
    );

    expect(normalizedEntry?.host).toBe(original);
  });
});

"use client";

import styled from "styled-components";

import { HostsList, type HostsListItem } from "@/components/hosts/HostsList";
import type { NormalizedHost, SeverityLevel } from "@/server/normalize";

const severityRank: SeverityLevel[] = [
  "critical",
  "high",
  "medium",
  "low",
  "informational",
  "none",
  "unknown",
];

function sortSeverity(values: Iterable<SeverityLevel>): SeverityLevel[] {
  const orderMap = new Map(severityRank.map((level, index) => [level, index]));
  return Array.from(new Set(values)).sort(
    (a, b) => (orderMap.get(a) ?? 99) - (orderMap.get(b) ?? 99),
  );
}

function buildProtocolOptions(hosts: NormalizedHost[]): string[] {
  const protocols = new Set<string>();
  for (const host of hosts) {
    for (const protocol of Object.keys(host.serviceCountsByProtocol)) {
      if (protocol.trim()) {
        protocols.add(protocol);
      }
    }
  }
  return Array.from(protocols).sort((a, b) => a.localeCompare(b));
}

function buildMalwareOptions(hosts: NormalizedHost[]): string[] {
  const indicators = new Set<string>();
  for (const host of hosts) {
    for (const family of host.threat.malwareFamilies) {
      indicators.add(family);
    }
    for (const name of host.threat.detectedMalwareNames) {
      indicators.add(name);
    }
  }
  return Array.from(indicators).sort((a, b) => a.localeCompare(b));
}

function mapHosts(hosts: NormalizedHost[]): HostsListItem[] {
  return hosts.map((host) => {
    const country = host.host.location.country ?? "Unknown";
    const malwareIndicators = Array.from(
      new Set([
        ...host.threat.malwareFamilies,
        ...host.threat.detectedMalwareNames,
      ]),
    );

    return {
      ip: host.ip,
      country,
      countryCode: host.host.location.country_code,
      risk: {
        level: host.riskBadge.level,
        label: host.riskBadge.label,
        description: host.riskBadge.description,
      },
      serviceCount: host.serviceCount,
      protocols: Object.keys(host.serviceCountsByProtocol),
      malwareIndicators,
    } satisfies HostsListItem;
  });
}

interface PageContentProps {
  hosts: NormalizedHost[];
}

export const PageContent = styled.main`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(6)};
  padding: ${({ theme }) => theme.spacing(6)};
  background: ${({ theme }) => theme.colors.page};
`;

export const Intro = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(6)};
`;

export const PageEyebrow = styled.p`
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.8rem;
  font-weight: 600;
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const PageTitle = styled.h1`
  margin: ${({ theme }) => theme.spacing(2)} 0;
  font-size: clamp(2rem, 3vw, 2.6rem);
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const PageSubtitle = styled.p`
  margin: 0;
  max-width: 42ch;
  font-size: 1.1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const LeadMetrics = styled.dl`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: ${({ theme }) => theme.spacing(3)};
  margin: 0;
`;

export const Metric = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
  padding: ${({ theme }) => theme.spacing(3)};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  min-width: 0;
`;

export const MetricLabel = styled.dt`
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
`;

export const MetricValue = styled.dd`
  margin: 0;
  font-size: clamp(1.6rem, 4vw, 2.1rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export function HostsPage({ hosts }: PageContentProps) {
  const severityOptions = sortSeverity(hosts.map((host) => host.riskBadge.level));
  const protocolOptions = buildProtocolOptions(hosts);
  const malwareOptions = buildMalwareOptions(hosts);
  const hostItems = mapHosts(hosts);

  return (
    <PageContent>
      <Intro>
        <div>
          <PageEyebrow>Hosts overview</PageEyebrow>
          <PageTitle>Censys hostile surface snapshot</PageTitle>
          <PageSubtitle>
            Explore the sample dataset, triage higher-risk assets, and prepare targeted summaries
            without leaving the dashboard.
          </PageSubtitle>
        </div>
        <LeadMetrics>
          <Metric>
            <MetricLabel>Total hosts</MetricLabel>
            <MetricValue>{hosts.length}</MetricValue>
          </Metric>
          <Metric>
            <MetricLabel>Regions observed</MetricLabel>
            <MetricValue>
              {Array.from(
                new Set(hosts.map((host) => host.host.location.country_code)),
              ).length}
            </MetricValue>
          </Metric>
          <Metric>
            <MetricLabel>Critical/high risk</MetricLabel>
            <MetricValue>
              {
                hosts.filter((host) =>
                  ["critical", "high"].includes(host.riskBadge.level),
                ).length
              }
            </MetricValue>
          </Metric>
        </LeadMetrics>
      </Intro>

      <HostsList
        hosts={hostItems}
        severityOptions={severityOptions}
        protocolOptions={protocolOptions}
        malwareOptions={malwareOptions}
      />
    </PageContent>
  );
}

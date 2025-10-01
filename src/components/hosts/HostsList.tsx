"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import styled, { type DefaultTheme } from "styled-components";

import type { SeverityLevel } from "@/server/normalize";

export interface HostsListItem {
  ip: string;
  country: string;
  countryCode: string;
  risk: {
    level: SeverityLevel;
    label: string;
    description: string;
  };
  serviceCount: number;
  protocols: string[];
  malwareIndicators: string[];
}

export interface HostsListProps {
  hosts: HostsListItem[];
  severityOptions: SeverityLevel[];
  protocolOptions: string[];
  malwareOptions: string[];
}

const ALL = "all" as const;

type SeverityFilterValue = typeof ALL | SeverityLevel;

type FilterButtonProps = {
  $active: boolean;
};

type SeverityBadgeProps = {
  $level: SeverityLevel;
};

export function HostsList({
  hosts,
  severityOptions,
  protocolOptions,
  malwareOptions,
}: HostsListProps) {
  const [severityFilter, setSeverityFilter] = useState<SeverityFilterValue>(ALL);
  const [protocolFilters, setProtocolFilters] = useState<string[]>([]);
  const [malwareFilters, setMalwareFilters] = useState<string[]>([]);

  const toggleSeverity = (value: SeverityFilterValue) => {
    setSeverityFilter((current) => (current === value ? ALL : value));
  };

  const toggleProtocol = (value: string) => {
    setProtocolFilters((current) =>
      current.includes(value)
        ? current.filter((entry) => entry !== value)
        : [...current, value],
    );
  };

  const toggleMalware = (value: string) => {
    setMalwareFilters((current) =>
      current.includes(value)
        ? current.filter((entry) => entry !== value)
        : [...current, value],
    );
  };

  const filteredHosts = useMemo(() => {
    return hosts.filter((host) => {
      const matchesSeverity =
        severityFilter === ALL || host.risk.level === severityFilter;

      if (!matchesSeverity) {
        return false;
      }

      const matchesProtocol =
        protocolFilters.length === 0 ||
        protocolFilters.some((protocol) => host.protocols.includes(protocol));

      if (!matchesProtocol) {
        return false;
      }

      const matchesMalware =
        malwareFilters.length === 0 ||
        malwareFilters.some((indicator) =>
          host.malwareIndicators.includes(indicator),
        );

      return matchesMalware;
    });
  }, [hosts, severityFilter, protocolFilters, malwareFilters]);

  return (
    <Section aria-label="Hosts overview">
      <Filters>
        <FilterGroup role="group" aria-label="Filter by risk severity">
          <FilterLabel>Risk</FilterLabel>
          <FilterButton
            type="button"
            $active={severityFilter === ALL}
            onClick={() => toggleSeverity(ALL)}
          >
            All
          </FilterButton>
          {severityOptions.map((option) => (
            <FilterButton
              key={option}
              type="button"
              $active={severityFilter === option}
              onClick={() => toggleSeverity(option)}
            >
              {formatSeverity(option)}
            </FilterButton>
          ))}
        </FilterGroup>

        <FilterGroup role="group" aria-label="Filter by protocol">
          <FilterLabel>Protocols</FilterLabel>
          {protocolOptions.map((protocol) => (
            <FilterButton
              key={protocol}
              type="button"
              $active={protocolFilters.includes(protocol)}
              onClick={() => toggleProtocol(protocol)}
            >
              {protocol.toUpperCase()}
            </FilterButton>
          ))}
        </FilterGroup>

        <FilterGroup role="group" aria-label="Filter by malware indicator">
          <FilterLabel>Malware</FilterLabel>
          {malwareOptions.map((indicator) => (
            <FilterButton
              key={indicator}
              type="button"
              $active={malwareFilters.includes(indicator)}
              onClick={() => toggleMalware(indicator)}
            >
              {indicator}
            </FilterButton>
          ))}
        </FilterGroup>
      </Filters>

      <Summary>
        Showing <strong>{filteredHosts.length}</strong> of {hosts.length} hosts
      </Summary>

      <HostsListGrid as="ul">
        {filteredHosts.map((host) => (
          <HostItem key={host.ip}>
            <HostCard href={`/hosts/${encodeURIComponent(host.ip)}`}>
              <HostHeader>
                <div>
                  <HostIp>{host.ip}</HostIp>
                  <HostLocation>
                    {host.country} · {host.countryCode}
                  </HostLocation>
                </div>
                <SeverityBadge $level={host.risk.level}>
                  <span aria-hidden="true" />
                  <span>{host.risk.label}</span>
                </SeverityBadge>
              </HostHeader>

              <HostMeta>
                <MetaItem>
                  <MetaLabel>Services</MetaLabel>
                  <MetaValue>{host.serviceCount}</MetaValue>
                </MetaItem>
                <MetaItem>
                  <MetaLabel>Protocols</MetaLabel>
                  <PillRow>
                    {host.protocols.length === 0 ? (
                      <Pill aria-label="No protocols">None</Pill>
                    ) : (
                      host.protocols.map((protocol) => (
                        <Pill key={protocol}>{protocol.toUpperCase()}</Pill>
                      ))
                    )}
                  </PillRow>
                </MetaItem>
                <MetaItem>
                  <MetaLabel>Malware</MetaLabel>
                  <PillRow>
                    {host.malwareIndicators.length === 0 ? (
                      <Pill aria-label="No malware detected">None</Pill>
                    ) : (
                      host.malwareIndicators.map((indicator) => (
                        <Pill key={indicator}>{indicator}</Pill>
                      ))
                    )}
                  </PillRow>
                </MetaItem>
              </HostMeta>

              <HostDescription>{host.risk.description}</HostDescription>
            </HostCard>
          </HostItem>
        ))}
      </HostsListGrid>
    </Section>
  );
}

function formatSeverity(value: SeverityLevel): string {
  if (value === "informational") {
    return "Info";
  }
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function severityColor(level: SeverityLevel, theme: DefaultTheme) {
  switch (level) {
    case "critical":
      return theme.colors.danger;
    case "high":
      return theme.colors.warning;
    case "medium":
      return theme.colors.accent;
    case "low":
      return theme.colors.success;
    case "informational":
      return theme.colors.accentContrast;
    default:
      return theme.colors.textMuted;
  }
}

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(6)};
`;

const Filters = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
  padding: ${({ theme }) => theme.spacing(5)};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.sm};
`;

const FilterGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const FilterLabel = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-right: ${({ theme }) => theme.spacing(1)};
`;

const FilterButton = styled.button<FilterButtonProps>`
  border: 1px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.accent : theme.colors.border};
  background:
    ${({ theme, $active }) =>
      $active ? theme.colors.accent : theme.colors.surfaceMuted};
  color:
    ${({ theme, $active }) =>
      $active ? theme.colors.accentContrast : theme.colors.textSecondary};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: ${({ theme }) => theme.spacing(2.5)}
    ${({ theme }) => theme.spacing(3.5)};
  font-size: 0.9rem;
  cursor: pointer;
  transition: border-color 0.2s ease, background 0.2s ease, color 0.2s ease;

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }

  &:hover {
    background:
      ${({ theme, $active }) =>
        $active ? theme.colors.accent : theme.colors.surface};
    border-color: ${({ theme }) => theme.colors.accent};
    color:
      ${({ theme, $active }) =>
        $active ? theme.colors.accentContrast : theme.colors.accent};
  }
`;

const Summary = styled.p`
  margin: 0;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const HostsListGrid = styled.ul`
  display: grid;
  gap: ${({ theme }) => theme.spacing(4)};
`;

const HostItem = styled.li`
  list-style: none;
`;

const HostCard = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
  padding: ${({ theme }) => theme.spacing(4)};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s ease, box-shadow 0.2s ease,
    transform 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: ${({ theme }) => theme.shadow.md};
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: none;
    border-color: ${({ theme }) => theme.colors.focus};
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.25);
  }
`;

const HostHeader = styled.header`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(3)};
  flex-wrap: wrap;
`;

const HostIp = styled.h3`
  font-size: 1.2rem;
  margin: 0;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const HostLocation = styled.p`
  margin: ${({ theme }) => theme.spacing(1)} 0 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.95rem;
`;

const SeverityBadge = styled.span<SeverityBadgeProps>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  font-weight: 600;
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid
    ${({ theme, $level }) => severityColor($level, theme)};
  color: ${({ theme, $level }) => severityColor($level, theme)};
  background: ${({ theme, $level }) =>
    `color-mix(in srgb, ${severityColor($level, theme)} 14%, transparent)`};

  span[aria-hidden="true"] {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 999px;
    background: currentColor;
  }
`;

const HostMeta = styled.dl`
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: ${({ theme }) => theme.spacing(3)};
`;

const MetaItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`;

const MetaLabel = styled.dt`
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const MetaValue = styled.dd`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const PillRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(1.5)};
`;

const Pill = styled.span`
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(1.5)}
    ${({ theme }) => theme.spacing(2.5)};
  font-size: 0.8rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.surfaceMuted};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const HostDescription = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
`;

import styled from "styled-components";

export interface MetricCardProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
  accent?: "default" | "gold" | "blue";
}

/**
 * Generic dashboard metric card tailored to the Censys dashboard layout.
 */
export function MetricCard({ label, value, icon, accent = "default" }: MetricCardProps) {
  return (
    <Card accent={accent}>
      <div>
        <Label>{label}</Label>
        <Value>{value}</Value>
      </div>
      {icon ? <IconSlot>{icon}</IconSlot> : null}
    </Card>
  );
}

const Card = styled.article<{ accent: MetricCardProps["accent"] }>`
  position: relative;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.spacing(4)} ${({ theme }) => theme.spacing(5)};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(4)};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  min-height: 128px;

  ${({ accent, theme }) =>
    accent === "gold"
      ? `border-color: ${theme.colors.gold};`
      : accent === "blue"
        ? `border-color: ${theme.colors.accentSoft};`
        : ""}
`;

const Label = styled.p`
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const Value = styled.h3`
  font-size: 1.9rem;
  margin: 0;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const IconSlot = styled.span`
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.surfaceMuted};
  color: ${({ theme }) => theme.colors.accentContrast};
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

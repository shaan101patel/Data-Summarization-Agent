import { ArrowRightIcon } from "@heroicons/react/24/solid";
import styled from "styled-components";

export interface QueryTileProps {
  title: string;
  description: string;
  category: string;
  accent?: "gold" | "blue" | "teal";
}

/**
 * QueryTile surfaces curated discovery actions. Mimics the hero cards on the Censys dashboard.
 */
export function QueryTile({ title, description, category, accent = "blue" }: QueryTileProps) {
  return (
    <Tile accent={accent}>
      <Header>
        <Category>{category}</Category>
        <ArrowRightIcon width={18} />
      </Header>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Tile>
  );
}

const Tile = styled.article<{ accent: QueryTileProps["accent"] }>`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing(5)};
  display: grid;
  gap: ${({ theme }) => theme.spacing(3)};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;

  ${({ accent, theme }) =>
    accent === "gold"
      ? `border-color: ${theme.colors.gold};`
      : accent === "teal"
        ? `border-color: ${theme.colors.success};`
        : `border-color: ${theme.colors.accentSoft};`}

  &:hover,
  &:focus-visible {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadow.md};
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Category = styled.span`
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
`;

const Title = styled.h3`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.95rem;
  margin: 0;
`;

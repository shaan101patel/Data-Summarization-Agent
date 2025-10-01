import { HomeModernIcon, Squares2X2Icon, DocumentTextIcon, LightBulbIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import styled from "styled-components";

/**
 * Primary navigation sidebar used throughout the dashboard. It collapses to an icon-only rail on
 * smaller screens while preserving accessible labels for screen readers.
 */
export function Sidebar() {
  const links = [
    { href: "#", label: "Home", icon: HomeModernIcon },
    { href: "#queries", label: "Queries", icon: Squares2X2Icon },
    { href: "#definitions", label: "Data Definitions", icon: DocumentTextIcon },
    { href: "#learn", label: "Learning", icon: LightBulbIcon },
  ];

  return (
    <Wrapper aria-label="Primary">
      <Brand>
        <BrandMark aria-hidden>◎</BrandMark>
        <BrandCopy>
          <span>Censys</span>
          <strong>Summaries</strong>
        </BrandCopy>
      </Brand>
      <Nav>
        {links.map(({ href, label, icon: Icon }) => (
          <NavLink key={href} href={href} aria-label={label}>
            <Icon width={22} />
            <span>{label}</span>
          </NavLink>
        ))}
      </Nav>
    </Wrapper>
  );
}

const Wrapper = styled.aside`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(6)};
  width: 240px;
  background: ${({ theme }) => theme.colors.sidebarBg};
  border-right: 1px solid ${({ theme }) => theme.colors.sidebarBorder};
  padding: ${({ theme }) => theme.spacing(6)} ${({ theme }) => theme.spacing(4)};
  position: sticky;
  top: 0;
  height: 100vh;

  @media (max-width: 960px) {
    width: 76px;
    padding-inline: ${({ theme }) => theme.spacing(3)};
  }
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
  font-weight: 600;
  letter-spacing: 0.03em;
`;

const BrandMark = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.accentSoft};
  color: ${({ theme }) => theme.colors.accentContrast};
  font-size: 1.4rem;
`;

const BrandCopy = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.1;
  color: ${({ theme }) => theme.colors.textPrimary};

  span {
    font-size: 0.85rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  @media (max-width: 960px) {
    display: none;
  }
`;

const Nav = styled.nav`
  display: grid;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: ${({ theme }) => theme.spacing(3)};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
  transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;

  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.colors.accentSoft};
    color: ${({ theme }) => theme.colors.accentContrast};
    transform: translateY(-1px);
  }

  svg {
    flex-shrink: 0;
  }

  span {
    white-space: nowrap;
  }

  @media (max-width: 960px) {
    justify-content: center;

    span {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  }
`;

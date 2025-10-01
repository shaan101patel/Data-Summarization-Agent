"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";
import styled from "styled-components";

import censysLogo from "@/assets/censysLogo.png";

type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { label: "Hosts", href: "/" },
];

export function AppShell({ children }: PropsWithChildren) {
  const pathname = usePathname();

  return (
    <Shell>
      <Sidebar>
        <Brand href="/">
          <Logo>
            <Image src={censysLogo} alt="Censys" fill priority />
          </Logo>
          <BrandMeta>
            <BrandName>Censys Agent</BrandName>
            <BrandTagline>Surface awareness</BrandTagline>
          </BrandMeta>
        </Brand>
        <Nav aria-label="Primary">
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/" || pathname.startsWith("/hosts")
                : pathname === item.href;
            return (
              <NavItemLink
                key={item.href}
                href={item.href}
                $active={active}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </NavItemLink>
            );
          })}
        </Nav>
        <SidebarFooter>
          <SidebarBadge>Beta</SidebarBadge>
          <SidebarNote>
            Summaries are generated with constrained LLM context. Validate before
            acting.
          </SidebarNote>
        </SidebarFooter>
      </Sidebar>
      <Main>
        <TopBar>
          <TopGroup>
            <TopTitle>Exposure intelligence</TopTitle>
            <TopSubtitle>
              Explore normalized host telemetry, triage risk, and request guided summaries.
            </TopSubtitle>
          </TopGroup>
          <TopActions>
            <DocsLink
              href="https://docs.censys.io/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Platform docs
            </DocsLink>
          </TopActions>
        </TopBar>
        <Content id="main">{children}</Content>
      </Main>
    </Shell>
  );
}

const Shell = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.page};
`;

const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  width: 16.5rem;
  padding: ${({ theme }) => theme.spacing(8)} ${({ theme }) => theme.spacing(6)};
  gap: ${({ theme }) => theme.spacing(8)};
  background: ${({ theme }) => theme.colors.sidebarBg};
  color: ${({ theme }) => theme.colors.sidebarText};
  border-right: 1px solid ${({ theme }) => theme.colors.sidebarBorder};
`;

const Brand = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(4)};
  color: inherit;
  text-decoration: none;
`;

const Logo = styled.span`
  position: relative;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: ${({ theme }) => theme.radius.lg};
  overflow: hidden;
  background: rgba(255, 255, 255, 0.08);
`;

const BrandMeta = styled.span`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`;

const BrandName = styled.span`
  font-weight: 600;
  font-size: 1.05rem;
  color: ${({ theme }) => theme.colors.sidebarText};
`;

const BrandTagline = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.sidebarMuted};
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const Nav = styled.nav`
  display: grid;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const NavItemLink = styled(Link)<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
  padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(4)};
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.accentSoft : theme.colors.sidebarText};
  background: ${({ $active }) =>
    $active ? "rgba(37, 99, 235, 0.16)" : "transparent"};
  font-weight: 500;
  transition: background 0.2s ease, transform 0.2s ease, color 0.2s ease;

  &:hover,
  &:focus-visible {
    background: rgba(37, 99, 235, 0.22);
    color: ${({ theme }) => theme.colors.accentSoft};
    transform: translateX(2px);
  }
`;

const SidebarFooter = styled.footer`
  margin-top: auto;
  display: grid;
  gap: ${({ theme }) => theme.spacing(3)};
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.sidebarMuted};
`;

const SidebarBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.radius.md};
  background: rgba(15, 23, 42, 0.45);
  color: ${({ theme }) => theme.colors.sidebarText};
  font-size: 0.7rem;
  width: max-content;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

const SidebarNote = styled.p`
  margin: 0;
  line-height: 1.5;
`;

const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const TopBar = styled.header`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(4)};
  padding: ${({ theme }) => theme.spacing(6)} ${({ theme }) => theme.spacing(8)};
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadow.sm};
`;

const TopGroup = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1.5)};
`;

const TopTitle = styled.h1`
  margin: 0;
  font-size: clamp(1.4rem, 2.4vw, 1.75rem);
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: 600;
`;

const TopSubtitle = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 48ch;
  font-size: 0.95rem;
`;

const TopActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
`;

const DocsLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(2.5)} ${({ theme }) => theme.spacing(4)};
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
  font-size: 0.95rem;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease,
    transform 0.2s ease;

  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.colors.accent};
    border-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accentContrast};
    transform: translateY(-1px);
  }
`;

const Content = styled.main`
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: ${({ theme }) => theme.spacing(6)} ${({ theme }) => theme.spacing(8)}
    ${({ theme }) => theme.spacing(8)};
  overflow-y: auto;
`;

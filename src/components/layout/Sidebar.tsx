"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";

import censysLogo from "@/assets/censysLogo.png";

export function Sidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasDataset = searchParams.get("dataset") !== null;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEnhancementsOpen, setIsEnhancementsOpen] = useState(false);

  const isUploadPage = pathname === "/";
  const isHostsPage = pathname.startsWith("/hosts");
  const isEnhancementsPage = pathname.startsWith("/enhancements");

  return (
    <SidebarWrapper
      $expanded={isExpanded}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <Brand href="/" $expanded={isExpanded}>
        <Logo>
          <Image src={censysLogo} alt="Censys" fill priority />
        </Logo>
        <BrandMeta $expanded={isExpanded}>
          <BrandName>Censys Agent</BrandName>
          <BrandTagline>Surface awareness</BrandTagline>
        </BrandMeta>
      </Brand>

      <Nav>
        <NavList>
          <NavItem>
            <NavLink
              href="/"
              $active={isUploadPage}
              $expanded={isExpanded}
              aria-current={isUploadPage ? "page" : undefined}
              title="Upload"
            >
              <IconWrapper aria-hidden="true">↑</IconWrapper>
              <LinkText $expanded={isExpanded}>Upload</LinkText>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              href={hasDataset ? `/hosts?dataset=${searchParams.get("dataset")}` : "/hosts"}
              $active={isHostsPage}
              $expanded={isExpanded}
              aria-current={isHostsPage ? "page" : undefined}
              title="Hosts"
            >
              <IconWrapper aria-hidden="true">⊞</IconWrapper>
              <LinkText $expanded={isExpanded}>Hosts</LinkText>
            </NavLink>
          </NavItem>

          <NavItem>
            <EnhancementsToggle
              onClick={() => setIsEnhancementsOpen(!isEnhancementsOpen)}
              $expanded={isExpanded}
              $active={isEnhancementsPage}
              title="Future Enhancements"
            >
              <IconWrapper aria-hidden="true">✨</IconWrapper>
              <LinkText $expanded={isExpanded}>Future Enhancements</LinkText>
              <ChevronIcon $expanded={isExpanded} $open={isEnhancementsOpen}>
                {isExpanded && (isEnhancementsOpen ? "▼" : "▶")}
              </ChevronIcon>
            </EnhancementsToggle>

            {isEnhancementsOpen && (
              <SubMenu $expanded={isExpanded}>
                <SubMenuItem>
                  <SubNavLink
                    href="/enhancements/ai-capabilities"
                    $active={pathname === "/enhancements/ai-capabilities"}
                    $expanded={isExpanded}
                    title="Advanced AI Capabilities"
                  >
                    <SubLinkText $expanded={isExpanded}>AI Capabilities</SubLinkText>
                  </SubNavLink>
                </SubMenuItem>
                <SubMenuItem>
                  <SubNavLink
                    href="/enhancements/censys-integration"
                    $active={pathname === "/enhancements/censys-integration"}
                    $expanded={isExpanded}
                    title="Real-Time Censys API Integration"
                  >
                    <SubLinkText $expanded={isExpanded}>Censys Integration</SubLinkText>
                  </SubNavLink>
                </SubMenuItem>
                <SubMenuItem>
                  <SubNavLink
                    href="/enhancements/database-persistence"
                    $active={pathname === "/enhancements/database-persistence"}
                    $expanded={isExpanded}
                    title="Database & Persistence"
                  >
                    <SubLinkText $expanded={isExpanded}>Database & Persistence</SubLinkText>
                  </SubNavLink>
                </SubMenuItem>
              </SubMenu>
            )}
          </NavItem>
        </NavList>
      </Nav>

      <BackToTopButton
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        $expanded={isExpanded}
        aria-label="Back to top"
        title="Back to top"
      >
        <IconWrapper aria-hidden="true">↑</IconWrapper>
        <LinkText $expanded={isExpanded}>Back to Top</LinkText>
      </BackToTopButton>
    </SidebarWrapper>
  );
}

const SidebarWrapper = styled.aside<{ $expanded: boolean }>`
  width: ${({ $expanded }) => ($expanded ? "240px" : "80px")};
  min-height: 100vh;
  height: 100%;
  background: ${({ theme }) => theme.colors.primary};
  border-right: 1px solid ${({ theme }) => theme.colors.primaryDark};
  padding: ${({ theme }) => theme.spacing(6)} ${({ theme }) => theme.spacing(3)};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  overflow-y: auto;
  transition: width 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(8)};
  z-index: 100;
`;

const Brand = styled(Link)<{ $expanded: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ $expanded }) => ($expanded ? "flex-start" : "center")};
  gap: ${({ theme, $expanded }) => ($expanded ? theme.spacing(3) : "0")};
  color: inherit;
  text-decoration: none;
  padding-bottom: ${({ theme }) => theme.spacing(4)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.primaryDark};
`;

const Logo = styled.span`
  position: relative;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: ${({ theme }) => theme.radius.lg};
  overflow: hidden;
  background: rgba(255, 255, 255, 0.1);
  flex-shrink: 0;
`;

const BrandMeta = styled.span<{ $expanded: boolean }>`
  display: ${({ $expanded }) => ($expanded ? "flex" : "none")};
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
  overflow: hidden;
  white-space: nowrap;
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
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const NavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const NavItem = styled.li`
  margin: 0;
`;

const NavLink = styled(Link)<{ $active: boolean; $expanded: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ $expanded }) => ($expanded ? "flex-start" : "center")};
  gap: ${({ theme, $expanded }) => ($expanded ? theme.spacing(3) : "0")};
  padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(4)};
  border-radius: ${({ theme }) => theme.radius.md};
  text-decoration: none;
  color: ${({ theme }) => theme.colors.sidebarText};
  font-weight: 500;
  transition: background 0.2s ease, color 0.2s ease, transform 0.1s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    color: ${({ theme }) => theme.colors.sidebarText};
    transform: translateX(2px);
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.sidebarText};
    outline-offset: 2px;
  }

  ${({ $active, theme }) =>
    $active &&
    `
    background: ${theme.colors.primaryDark};
    color: ${theme.colors.sidebarText};
    font-weight: 600;

    &:hover {
      background: ${theme.colors.primaryDark};
      color: ${theme.colors.sidebarText};
    }
  `}
`;

const IconWrapper = styled.span`
  font-size: 1.5rem;
  line-height: 1;
  flex-shrink: 0;
  color: #f59e0b;
  font-weight: 700;
`;

const LinkText = styled.span<{ $expanded: boolean }>`
  font-size: 1rem;
  display: ${({ $expanded }) => ($expanded ? "inline" : "none")};
  overflow: hidden;
  white-space: nowrap;
`;

const BackToTopButton = styled.button<{ $expanded: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ $expanded }) => ($expanded ? "flex-start" : "center")};
  gap: ${({ theme, $expanded }) => ($expanded ? theme.spacing(3) : "0")};
  padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(4)};
  border-radius: ${({ theme }) => theme.radius.md};
  text-decoration: none;
  color: ${({ theme }) => theme.colors.sidebarText};
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.primaryDark};
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, transform 0.1s ease, border-color 0.2s ease;
  margin-top: auto;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    border-color: ${({ theme }) => theme.colors.sidebarText};
    color: ${({ theme }) => theme.colors.sidebarText};
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.sidebarText};
    outline-offset: 2px;
  }
`;

const EnhancementsToggle = styled.button<{ $expanded: boolean; $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ $expanded }) => ($expanded ? "flex-start" : "center")};
  gap: ${({ theme, $expanded }) => ($expanded ? theme.spacing(3) : "0")};
  padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(4)};
  border-radius: ${({ theme }) => theme.radius.md};
  text-decoration: none;
  color: ${({ theme }) => theme.colors.sidebarText};
  font-weight: 500;
  transition: background 0.2s ease, color 0.2s ease, transform 0.1s ease;
  background: transparent;
  border: none;
  width: 100%;
  cursor: pointer;
  position: relative;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    color: ${({ theme }) => theme.colors.sidebarText};
    transform: translateX(2px);
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.sidebarText};
    outline-offset: 2px;
  }

  ${({ $active, theme }) =>
    $active &&
    `
    background: ${theme.colors.primaryDark};
    color: ${theme.colors.sidebarText};
    font-weight: 600;
  `}
`;

const ChevronIcon = styled.span<{ $expanded: boolean; $open: boolean }>`
  margin-left: auto;
  font-size: 0.75rem;
  color: #f59e0b;
  display: ${({ $expanded }) => ($expanded ? "inline" : "none")};
  transition: transform 0.2s ease;
`;

const SubMenu = styled.ul<{ $expanded: boolean }>`
  list-style: none;
  margin: ${({ theme }) => theme.spacing(2)} 0 0 0;
  padding: 0;
  display: ${({ $expanded }) => ($expanded ? "flex" : "none")};
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
  padding-left: ${({ theme, $expanded }) => ($expanded ? theme.spacing(6) : "0")};
`;

const SubMenuItem = styled.li`
  margin: 0;
`;

const SubNavLink = styled(Link)<{ $active: boolean; $expanded: boolean }>`
  display: ${({ $expanded }) => ($expanded ? "flex" : "none")};
  align-items: center;
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.radius.sm};
  text-decoration: none;
  color: ${({ theme }) => theme.colors.sidebarMuted};
  font-weight: 500;
  font-size: 0.9rem;
  transition: background 0.2s ease, color 0.2s ease, transform 0.1s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    color: ${({ theme }) => theme.colors.sidebarText};
    transform: translateX(2px);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.sidebarText};
    outline-offset: 2px;
  }

  ${({ $active, theme }) =>
    $active &&
    `
    background: ${theme.colors.primaryDark};
    color: ${theme.colors.sidebarText};
    font-weight: 600;

    &::before {
      content: "→";
      margin-right: ${theme.spacing(2)};
      color: #f59e0b;
    }
  `}
`;

const SubLinkText = styled.span<{ $expanded: boolean }>`
  font-size: 0.9rem;
  display: ${({ $expanded }) => ($expanded ? "inline" : "none")};
  overflow: hidden;
  white-space: nowrap;
`;


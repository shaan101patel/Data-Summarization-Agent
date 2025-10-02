"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import styled from "styled-components";

export function Sidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasDataset = searchParams.get("dataset") !== null;

  const isUploadPage = pathname === "/";
  const isHostsPage = pathname.startsWith("/hosts");

  return (
    <SidebarWrapper>
      <Nav>
        <NavList>
          <NavItem>
            <NavLink
              href="/"
              data-active={isUploadPage}
              aria-current={isUploadPage ? "page" : undefined}
            >
              <IconWrapper aria-hidden="true">📤</IconWrapper>
              <LinkText>Upload</LinkText>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              href={hasDataset ? `/hosts?dataset=${searchParams.get("dataset")}` : "/hosts"}
              data-active={isHostsPage}
              aria-current={isHostsPage ? "page" : undefined}
            >
              <IconWrapper aria-hidden="true">🖥️</IconWrapper>
              <LinkText>Hosts</LinkText>
            </NavLink>
          </NavItem>
        </NavList>
      </Nav>
    </SidebarWrapper>
  );
}

const SidebarWrapper = styled.aside`
  width: 240px;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.surface};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing(6)} ${({ theme }) => theme.spacing(3)};
  position: sticky;
  top: 0;
  align-self: flex-start;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
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

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
  padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(4)};
  border-radius: ${({ theme }) => theme.radius.md};
  text-decoration: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
  transition: background 0.2s ease, color 0.2s ease, transform 0.1s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceMuted};
    color: ${({ theme }) => theme.colors.textPrimary};
    transform: translateX(2px);
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }

  &[data-active="true"] {
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accentContrast};
    font-weight: 600;

    &:hover {
      background: ${({ theme }) => theme.colors.accent};
      color: ${({ theme }) => theme.colors.accentContrast};
    }
  }
`;

const IconWrapper = styled.span`
  font-size: 1.5rem;
  line-height: 1;
`;

const LinkText = styled.span`
  font-size: 1rem;
`;

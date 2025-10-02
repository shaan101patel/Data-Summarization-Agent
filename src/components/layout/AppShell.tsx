"use client";

import Link from "next/link";
import Image from "next/image";
import { PropsWithChildren } from "react";
import styled from "styled-components";

import censysLogo from "@/assets/censysLogo.png";
import { Sidebar } from "./Sidebar";

export function AppShell({ children }: PropsWithChildren) {
  return (
    <Shell>
      <Sidebar />
      <Main>
        <TopBar>
          <Brand href="/">
            <Logo>
              <Image src={censysLogo} alt="Censys" fill priority />
            </Logo>
            <BrandMeta>
              <BrandName>Censys Agent</BrandName>
              <BrandTagline>Surface awareness</BrandTagline>
            </BrandMeta>
          </Brand>
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
  background: rgba(37, 99, 235, 0.08);
`;

const BrandMeta = styled.span`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`;

const BrandName = styled.span`
  font-weight: 600;
  font-size: 1.05rem;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const BrandTagline = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  letter-spacing: 0.08em;
  text-transform: uppercase;
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
  flex-wrap: wrap;
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

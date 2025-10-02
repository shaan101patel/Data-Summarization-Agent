"use client";

import { PropsWithChildren } from "react";
import styled from "styled-components";

import { Sidebar } from "./Sidebar";

export function AppShell({ children }: PropsWithChildren) {
  return (
    <Shell>
      <Sidebar />
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
              href="https://docs.censys.com/docs/platform-datasets"
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
  margin-left: 80px;
`;

const TopBar = styled.header`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(4)};
  padding: ${({ theme }) => theme.spacing(5)} ${({ theme }) => theme.spacing(8)};
  background: #3d6375;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primaryDark};
  box-shadow: ${({ theme }) => theme.shadow.sm};
`;

const TopGroup = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1.5)};
`;

const TopTitle = styled.h1`
  margin: 0;
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  color: ${({ theme }) => theme.colors.sidebarText};
  font-weight: 600;
`;

const TopSubtitle = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.sidebarMuted};
  max-width: 48ch;
  font-size: 0.85rem;
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
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(3.5)};
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.sidebarText};
  background: transparent;
  color: ${({ theme }) => theme.colors.sidebarText};
  font-weight: 500;
  font-size: 0.85rem;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease,
    transform 0.2s ease;

  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.colors.primaryDark};
    border-color: ${({ theme }) => theme.colors.primaryDark};
    color: ${({ theme }) => theme.colors.sidebarText};
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

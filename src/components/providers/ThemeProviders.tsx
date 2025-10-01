"use client";

import type { PropsWithChildren } from "react";
import { ThemeProvider } from "styled-components";

import { GlobalStyles } from "@/styles/globalStyles";
import { theme } from "@/styles/theme";

export function ThemeProviders({ children }: PropsWithChildren) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
}

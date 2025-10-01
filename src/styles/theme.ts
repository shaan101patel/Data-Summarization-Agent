export type SpacingScale = (multiplier?: number) => string;

export interface AppTheme {
  colors: {
    page: string;
    surface: string;
    surfaceMuted: string;
    border: string;
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    accent: string;
    accentSoft: string;
    accentContrast: string;
    gold: string;
    success: string;
    warning: string;
    danger: string;
    focus: string;
    sidebarBg: string;
    sidebarBorder: string;
  };
  fonts: {
    body: string;
  };
  spacing: SpacingScale;
  radius: {
    sm: string;
    md: string;
    lg: string;
  };
  shadow: {
    sm: string;
    md: string;
  };
}

/**
 * Centralised color and spacing tokens inspired by the Censys dashboard palette.
 * Extend this theme as the design system evolves.
 */
export const theme: AppTheme = {
  colors: {
    page: "#f5f7fb",
    surface: "#ffffff",
    surfaceMuted: "#f0f4f8",
    border: "#dde3ed",
    textPrimary: "#1f2933",
    textSecondary: "#4b5563",
    textMuted: "#6b7280",
    accent: "#1f6feb",
    accentSoft: "#d6e4ff",
    accentContrast: "#0b3c91",
    gold: "#f7b500",
    success: "#0f766e",
    warning: "#f59e0b",
    danger: "#c2410c",
    focus: "#f59e0b",
    sidebarBg: "#ffffff",
    sidebarBorder: "#e2e8f0",
  },
  fonts: {
    body: "var(--font-geist-sans, 'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif)",
  },
  spacing: (multiplier = 1) => `${0.25 * multiplier}rem`,
  radius: {
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1.25rem",
  },
  shadow: {
    sm: "0 1px 3px rgba(15, 23, 42, 0.08)",
    md: "0 12px 32px rgba(15, 23, 42, 0.12)",
  },
};

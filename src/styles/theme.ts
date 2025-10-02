export type SpacingScale = (multiplier?: number) => string;

export interface AppTheme {
  colors: {
    page: string;
    surface: string;
    surfaceMuted: string;
    border: string;
    text: string;
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    textLight: string;
    primary: string;
    primaryDark: string;
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
    sidebarText: string;
    sidebarMuted: string;
  };
  fonts: {
    body: string;
  };
  spacing: SpacingScale;
  radius: {
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  shadow: {
    sm: string;
    md: string;
    lg: string;
  };
}

/**
 * Centralised color and spacing tokens inspired by the Censys dashboard palette.
 * Extend this theme as the design system evolves.
 */
export const theme: AppTheme = {
  colors: {
    page: "#f8fafc",
    surface: "#ffffff",
    surfaceMuted: "#f1f5f9",
    border: "#e5e7eb",
    text: "#1f2937",
    textPrimary: "#1f2937",
    textSecondary: "#374151",
    textMuted: "#6b7280",
    textLight: "#6b7280",
    primary: "#2c4f5e",
    primaryDark: "#1e3a45",
    accent: "#2c4f5e",
    accentSoft: "#dbeafe",
    accentContrast: "#ffffff",
    gold: "#f59e0b",
    success: "#15803d",
    warning: "#f59e0b",
    danger: "#dc2626",
    focus: "#2c4f5e",
    sidebarBg: "#2c4f5e",
    sidebarBorder: "#1e3a45",
    sidebarText: "#ffffff",
    sidebarMuted: "#a8c5d1",
  },
  fonts: {
    body: "var(--font-geist-sans, 'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif)",
  },
  spacing: (multiplier = 1) => `${0.25 * multiplier}rem`,
  radius: {
    sm: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    full: "9999px",
  },
  shadow: {
    sm: "0 1px 3px rgba(15, 23, 42, 0.1)",
    md: "0 4px 6px rgba(15, 23, 42, 0.1)",
    lg: "0 10px 15px rgba(15, 23, 42, 0.15)",
  },
};

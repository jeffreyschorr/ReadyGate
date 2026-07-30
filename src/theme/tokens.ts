import type { ThemeName } from "@/config/theme";
import { activeTheme } from "@/config/theme";

type ColorTokens = {
  background: string;
  surface: string;
  foreground: string;
  heading: string;
  muted: string;
  border: string;
  accent: string;
  accentForeground: string;
  accentSubtle: string;
  accentMuted: string;
  success: string;
  successSubtle: string;
  warning: string;
  warningSubtle: string;
  danger: string;
  dangerSubtle: string;
  info: string;
  infoSubtle: string;
};

const palettes: Record<ThemeName, ColorTokens> = {
  sage: {
    background: "#f9f7f2",
    surface: "#ffffff",
    foreground: "#1c1b1d",
    heading: "#1a1a1a",
    muted: "#6b6560",
    border: "#e6e1d6",
    accent: "#5f8a4f",
    accentForeground: "#ffffff",
    accentSubtle: "#edf3e8",
    accentMuted: "#7fa86e",
    success: "#4a7a56",
    successSubtle: "#e8f2eb",
    warning: "#9a7a2e",
    warningSubtle: "#f5f0e3",
    danger: "#9b4a4a",
    dangerSubtle: "#f5ecec",
    info: "#4a8494",
    infoSubtle: "#e7f1f4",
  },
  virgin: {
    background: "#fafafa",
    surface: "#ffffff",
    foreground: "#1c1b1d",
    heading: "#2d054e",
    muted: "#646464",
    border: "#e8e8e8",
    accent: "#e10a0a",
    accentForeground: "#ffffff",
    accentSubtle: "#fde8e8",
    accentMuted: "#f96666",
    success: "#4a7a56",
    successSubtle: "#e8f2eb",
    warning: "#9a7a2e",
    warningSubtle: "#f5f0e3",
    danger: "#ba0e0e",
    dangerSubtle: "#fce6e6",
    info: "#5a7a8a",
    infoSubtle: "#e8eef2",
  },
  slate: {
    background: "#faf9f7",
    surface: "#ffffff",
    foreground: "#1c1b1d",
    heading: "#1a1a1a",
    muted: "#646464",
    border: "#e5e3df",
    accent: "#3d5a73",
    accentForeground: "#ffffff",
    accentSubtle: "#eef2f5",
    accentMuted: "#5a7388",
    success: "#2f6b4f",
    successSubtle: "#e8f2ec",
    warning: "#8a6d1d",
    warningSubtle: "#f5f0e3",
    danger: "#9b3d3d",
    dangerSubtle: "#f5ecec",
    info: "#3d5a73",
    infoSubtle: "#eef2f5",
  },
};

export function getThemeColors(theme: ThemeName = "virgin"): ColorTokens {
  return palettes[theme];
}

export const tokens = {
  color: getThemeColors(activeTheme),
  radius: {
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
  },
  shadow: {
    sm: "0 1px 2px 0 rgb(26 26 26 / 0.04)",
    md: "0 4px 12px 0 rgb(26 26 26 / 0.06)",
  },
  spacing: {
    section: "6rem",
    content: "1.5rem",
    stack: "1rem",
    stackLg: "1.5rem",
  },
} as const;

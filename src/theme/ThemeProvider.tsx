"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { readyGateTheme } from "@/theme/theme";

type ThemeProviderProps = {
  children: React.ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <AppRouterCacheProvider>
      <MuiThemeProvider theme={readyGateTheme}>
        <CssBaseline enableColorScheme={false} />
        <div id="app-root" className="min-h-screen min-w-0 overflow-x-hidden">
          {children}
        </div>
        <div id="fixed-ui-root" />
      </MuiThemeProvider>
    </AppRouterCacheProvider>
  );
}

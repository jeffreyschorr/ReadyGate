import { createTheme } from "@mui/material/styles";

import { fontFamily } from "@/lib/fonts";
import { tokens } from "@/theme/tokens";

export const readyGateTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: tokens.color.accent,
      contrastText: tokens.color.accentForeground,
    },
    background: {
      default: tokens.color.background,
      paper: tokens.color.surface,
    },
    text: {
      primary: tokens.color.foreground,
      secondary: tokens.color.muted,
    },
    divider: tokens.color.border,
    success: {
      main: tokens.color.success,
      contrastText: tokens.color.accentForeground,
    },
    warning: {
      main: tokens.color.warning,
      contrastText: tokens.color.foreground,
    },
    error: {
      main: tokens.color.danger,
      contrastText: tokens.color.accentForeground,
    },
    info: {
      main: tokens.color.info,
      contrastText: tokens.color.accentForeground,
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily,
    h1: { fontSize: "1.875rem", fontWeight: 700, lineHeight: 1.25, letterSpacing: "-0.02em" },
    h2: { fontSize: "1.5rem", fontWeight: 600, lineHeight: 1.3 },
    h3: { fontSize: "1.25rem", fontWeight: 600, lineHeight: 1.35 },
    h4: { fontSize: "1rem", fontWeight: 600, lineHeight: 1.4 },
    body1: { fontSize: "1rem", fontWeight: 400, lineHeight: 1.65 },
    body2: { fontSize: "0.875rem", fontWeight: 400, lineHeight: 1.6 },
    subtitle1: { fontSize: "1rem", fontWeight: 500, lineHeight: 1.5 },
    subtitle2: { fontSize: "0.875rem", fontWeight: 500, lineHeight: 1.5 },
    caption: { fontSize: "0.75rem", fontWeight: 500, lineHeight: 1.5 },
    overline: {
      fontSize: "0.75rem",
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
    },
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: tokens.radius.md,
          boxShadow: "none",
          "&:focus-visible": {
            outline: `2px solid ${tokens.color.accent}`,
            outlineOffset: 2,
          },
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          border: `1px solid ${tokens.color.border}`,
          borderRadius: tokens.radius.lg,
          boxShadow: tokens.shadow.sm,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: tokens.radius.md,
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: tokens.color.accent,
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          minHeight: 44,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: tokens.radius.md,
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: tokens.color.surface,
          borderTop: `1px solid ${tokens.color.border}`,
          width: "100%",
          height: 56,
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          minWidth: 0,
          maxWidth: "none",
          flex: "1 1 0",
          paddingLeft: 4,
          paddingRight: 4,
        },
        label: {
          fontSize: "0.6875rem",
          lineHeight: 1.2,
          "&.Mui-selected": {
            fontSize: "0.6875rem",
          },
        },
      },
    },
  },
});

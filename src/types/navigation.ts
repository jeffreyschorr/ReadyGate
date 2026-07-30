import type { SvgIconComponent } from "@mui/icons-material";

export type NavItem = {
  label: string;
  href: string;
  icon?: SvgIconComponent;
  labelKey?: "today" | "settings" | "profile";
  /** Desktop nav: show icon only (with accessible label). */
  iconOnly?: boolean;
};

export type SettingsNavItem = {
  label: string;
  href: string;
  description: string;
};

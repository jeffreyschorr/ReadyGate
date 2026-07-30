import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import FlightOutlinedIcon from "@mui/icons-material/FlightOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import RouteOutlinedIcon from "@mui/icons-material/RouteOutlined";
import SettingsIcon from "@mui/icons-material/Settings";

import type { NavItem, SettingsNavItem } from "@/types/navigation";

export const desktopNavItems: NavItem[] = [
  { label: "Today", href: "/home", labelKey: "today" },
  { label: "Journey", href: "/journey", icon: RouteOutlinedIcon },
  { label: "Flight", href: "/flight", icon: FlightOutlinedIcon },
  { label: "Destination", href: "/destination", icon: PlaceOutlinedIcon },
  {
    label: "Updates",
    href: "/notifications",
    icon: NotificationsIcon,
    iconOnly: true,
  },
  {
    label: "Settings",
    href: "/settings/preferences",
    icon: SettingsIcon,
    labelKey: "settings",
    iconOnly: true,
  },
];

export const mobileNavItems: NavItem[] = [
  { label: "Today", href: "/home", icon: CalendarTodayOutlinedIcon, labelKey: "today" },
  { label: "Journey", href: "/journey", icon: RouteOutlinedIcon },
  { label: "Flight", href: "/flight", icon: FlightOutlinedIcon },
  { label: "Destination", href: "/destination", icon: PlaceOutlinedIcon },
];

export const settingsNavItems: SettingsNavItem[] = [
  {
    label: "Traveller preferences",
    href: "/settings/preferences",
    description: "Language, units, and display.",
  },
  {
    label: "Account",
    href: "/settings/account",
    description: "Profile and sign-in.",
  },
  {
    label: "Notifications settings",
    href: "/settings/notifications",
    description: "Choose which trip alerts you receive.",
  },
];

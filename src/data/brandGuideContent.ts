import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import FlightOutlinedIcon from "@mui/icons-material/FlightOutlined";
import HotelOutlinedIcon from "@mui/icons-material/HotelOutlined";
import LuggageOutlinedIcon from "@mui/icons-material/LuggageOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import type { SvgIconComponent } from "@mui/icons-material";

import { defaultJourneyDisplay } from "@/lib/journey-display";
import type {
  CountdownContent,
  JourneyHealthItem,
  NextActionContent,
  UpdateItem,
} from "@/types/journey";

export const brandGuideMeta = {
  title: "ReadyGate Brand Guide",
  description:
    "Visual and interaction rules for travel screens. Calm tone, clear hierarchy.",
  version: "Version 1.1",
  date: "July 2026",
} as const;

export const brandIdea = {
  statement:
    "Tell travellers what is happening, what to do next, and why it matters.",
  principles: [
    "Cut the noise",
    "Next step first",
    "Explain when it helps",
    "Plain language",
    "Details on demand",
  ],
} as const;

export const logoUsageRules = [
  "Keep clear space around the mark",
  "Do not stretch or distort",
  "Do not add shadows",
  "Do not recolour individual letters",
  "Do not place on visually noisy backgrounds",
] as const;

export const typographySpecimens = [
  {
    role: "Display",
    sample: "ReadyGate",
    className: "text-4xl font-bold tracking-tight text-page-title",
    weight: "700",
    size: "2.25rem (36px)",
  },
  {
    role: "Page title",
    sample: "Your Journey",
    className: "text-2xl font-bold tracking-tight text-page-title md:text-3xl",
    weight: "700",
    size: "1.5–1.875rem (24–30px)",
  },
  {
    role: "Section heading",
    sample: "Flight Summary",
    className: "text-base font-semibold text-section-heading",
    weight: "600",
    size: "1rem (16px)",
  },
  {
    role: "Card heading",
    sample: "Next Action",
    className: "text-base font-semibold text-card-heading",
    weight: "600",
    size: "1rem (16px)",
  },
  {
    role: "Body",
    sample:
      `On time. Boarding at ${defaultJourneyDisplay.boardingTime}.`,
    className: "text-base font-normal text-body",
    weight: "400",
    size: "1rem (16px)",
  },
  {
    role: "Label",
    sample: "Boarding group",
    className: "text-xs font-medium uppercase tracking-wide text-label",
    weight: "500",
    size: "0.75rem (12px)",
  },
  {
    role: "Metadata",
    sample: "Updated 2 minutes ago",
    className: "text-sm font-medium text-label text-muted",
    weight: "500",
    size: "0.875rem (14px)",
  },
  {
    role: "Button",
    sample: "Start demo",
    className: "text-base font-semibold",
    weight: "600",
    size: "1rem (16px)",
  },
] as const;

export const typographyGuidance = [
  "Prefer sentence case",
  "Avoid excessive uppercase",
  "Keep line lengths readable",
  "Use bold weight sparingly",
  "Use generous line height for body text",
] as const;

export const colorTokens = [
  {
    name: "Heading",
    hex: "#2d054e",
    token: "--color-heading",
    usage: "Page titles, section headings, card headings",
  },
  {
    name: "Primary text",
    hex: "#1c1b1d",
    token: "--color-foreground",
    usage: "Headings, primary content, key values",
  },
  {
    name: "Secondary text",
    hex: "#646464",
    token: "--color-muted",
    usage: "Supporting copy, metadata, de-emphasised labels",
  },
  {
    name: "Background",
    hex: "#fafafa",
    token: "--color-background",
    usage: "Application canvas and page background",
  },
  {
    name: "Surface",
    hex: "#ffffff",
    token: "--color-surface",
    usage: "Cards, panels, navigation surfaces",
  },
  {
    name: "Border",
    hex: "#e8e8e8",
    token: "--color-border",
    usage: "Dividers, card outlines, input borders",
  },
  {
    name: "Brand accent",
    hex: "#e10a0a",
    token: "--color-accent",
    usage: "Primary actions, active navigation, emphasis",
  },
  {
    name: "Accent subtle",
    hex: "#fde8e8",
    token: "--color-accent-subtle",
    usage: "Header wash, highlighted card backgrounds, soft brand emphasis",
  },
  {
    name: "Accent muted",
    hex: "#f96666",
    token: "--color-accent-muted",
    usage: "Secondary emphasis, decorative accents",
  },
  {
    name: "Success",
    hex: "#4a7a56",
    token: "--color-success",
    usage: "Relaxed journey pulse, positive status, confirmed readiness",
  },
  {
    name: "Warning",
    hex: "#9a7a2e",
    token: "--color-warning",
    usage: "Attentive journey pulse, attention without alarm, worth reviewing",
  },
  {
    name: "Critical",
    hex: "#ba0e0e",
    token: "--color-danger",
    usage: "Action needed journey pulse, issues requiring immediate attention",
  },
  {
    name: "Info",
    hex: "#5a7a8a",
    token: "--color-info",
    usage: "Informational updates and neutral guidance",
  },
  {
    name: "Success subtle",
    hex: "#e8f2eb",
    token: "--color-success-subtle",
    usage: "Relaxed journey pulse, positive status badge backgrounds",
  },
  {
    name: "Warning subtle",
    hex: "#f5f0e3",
    token: "--color-warning-subtle",
    usage: "Attentive journey pulse, attention badge backgrounds",
  },
  {
    name: "Critical subtle",
    hex: "#fce6e6",
    token: "--color-danger-subtle",
    usage: "Action needed journey pulse, urgent badge backgrounds",
  },
  {
    name: "Info subtle",
    hex: "#e8eef2",
    token: "--color-info-subtle",
    usage: "Informational badge backgrounds",
  },
  {
    name: "Inactive",
    hex: "#e8e8e8",
    token: "--color-border",
    usage: "Pending states, inactive timeline steps",
  },
] as const;

export const pulseStates = [
  {
    label: "Relax",
    variant: "success" as const,
    meaning: "Nothing to do right now. Journey is on track.",
    when: "Planning, in flight, after security, trip complete.",
  },
  {
    label: "Heads up",
    variant: "warning" as const,
    meaning: "Worth a look when you can. No immediate action required.",
    when: "Day before travel, at airport, arrival.",
  },
  {
    label: "Action needed",
    variant: "danger" as const,
    meaning: "Do this next. Time-sensitive step in the journey.",
    when: "Check-in open, leaving home, boarding.",
  },
] as const;

export const pulseGuidance = [
  "Use journey pulse badges at the top of Today screens",
  "Pair colour with the status label. Never rely on colour alone.",
  "Reserve action needed for genuine next steps",
  "Keep attentive for watch-and-prepare moments, not alarms",
] as const;

export const colorGuidance = [
  "Maintain readable contrast",
  "Do not communicate status using colour alone",
  "Pair colour with iconography and text",
  "Avoid overly saturated status colours",
] as const;

export const spacingTokens = [
  { name: "Page margin", value: "1.5rem (24px)", detail: "px-6 on mobile" },
  { name: "Page margin (large)", value: "2rem (32px)", detail: "lg:px-8 on desktop" },
  { name: "Max content width", value: "64rem (1024px)", detail: "max-w-5xl container" },
  { name: "Section spacing", value: "1.5–2rem", detail: "py-content / md:py-8" },
  { name: "Card padding", value: "1.5rem (24px)", detail: "CardContent p-6" },
  { name: "Stack gap", value: "1rem (16px)", detail: "--spacing-stack" },
  { name: "Stack gap (large)", value: "1.5rem (24px)", detail: "--spacing-stack-lg" },
  { name: "Grid gap", value: "1–2rem", detail: "gap-4 to gap-8 in layouts" },
] as const;

export const spacingScale = [
  { label: "4", size: "0.25rem" },
  { label: "8", size: "0.5rem" },
  { label: "12", size: "0.75rem" },
  { label: "16", size: "1rem" },
  { label: "24", size: "1.5rem" },
  { label: "32", size: "2rem" },
  { label: "48", size: "3rem" },
] as const;

export const layoutGuidance = [
  "Use whitespace to separate sections",
  "Prioritise one clear action per section",
  "Avoid dense dashboard layouts",
  "Keep related information visually grouped",
  "Use two-column layouts only when hierarchy remains clear",
] as const;

export const componentExamples = [
  {
    name: "Primary button",
    note: "Use for the single most important action on a screen.",
  },
  {
    name: "Secondary button",
    note: "Use for supporting actions that should remain visible but subordinate.",
  },
  {
    name: "Status badge",
    note: "Tinted background, coloured border, and dot. Pair with a text label.",
  },
  {
    name: "Information card",
    note: "Keep content focused on one subject.",
  },
  {
    name: "Next Action card",
    note: "Lead with what the traveller should do next, then explain why.",
  },
  {
    name: "Journey milestone",
    note: "Show progress through the day with expandable detail on demand.",
  },
  {
    name: "Update card",
    note: "Title, short message, and timestamp.",
  },
  {
    name: "Countdown",
    note: "Use when a deadline actually matters.",
  },
  {
    name: "Journey Health item",
    note: "Status colour plus a text label.",
  },
  {
    name: "Empty state",
    note: "Use calm language when there is nothing new to show.",
  },
] as const;

export const iconExamples: { label: string; icon: SvgIconComponent }[] = [
  { label: "Plane", icon: FlightOutlinedIcon },
  { label: "Clock", icon: AccessTimeOutlinedIcon },
  { label: "Map pin", icon: PlaceOutlinedIcon },
  { label: "Check", icon: CheckOutlinedIcon },
  { label: "Alert", icon: WarningAmberOutlinedIcon },
  { label: "Luggage", icon: LuggageOutlinedIcon },
  { label: "Hotel", icon: HotelOutlinedIcon },
  { label: "Arrow right", icon: ArrowForwardOutlinedIcon },
];

export const iconGuidance = [
  "Use simple outline icons with consistent visual weight",
  "Icons should support text rather than replace it",
  "Avoid decorative icon usage",
  "Keep icon sizes consistent by context: 16px inline, 20px in cards, 24px in navigation",
  "The current implementation uses Material UI Outlined icons aligned with Lucide-style principles",
] as const;

export const voiceTone = {
  qualities: ["Calm", "Clear", "Human", "Direct", "Reassuring"],
  avoidPrefer: [
    {
      avoid: "Flight On Time",
      prefer: "On time.",
    },
    {
      avoid: "Proceed to security immediately.",
      prefer: "Security is your next step. Allow around 10 minutes.",
    },
    {
      avoid: "No updates available.",
      prefer: "Nothing new.",
    },
  ],
  rules: [
    "Lead with what matters",
    "Tell the traveller what to do next",
    "Explain the reason when useful",
    "Avoid operational jargon",
    "Avoid unnecessary urgency",
    "Keep sentences concise",
    "Never sound robotic",
  ],
} as const;

export const motionPrinciples = [
  "Motion marks state changes",
  "Use short transitions, approximately 200–300ms",
  "Prefer subtle fade and vertical movement",
  "Avoid decorative or distracting animation",
  "Respect prefers-reduced-motion",
  "Stage changes should feel clear and quick",
  "Never delay access to important information",
] as const;

export const accessibilityGuidance = [
  "Keyboard navigation across all interactive elements",
  "Visible focus states on buttons, links, and controls",
  "Semantic HTML for headings, landmarks, and lists",
  "ARIA labels where visual context is insufficient",
  "Reduced motion support via prefers-reduced-motion",
  "Readable contrast for text and status indicators",
  "Responsive typography that scales with viewport",
  "Status communicated through text and icon, not colour alone",
  "Minimum 44px touch targets for primary controls",
] as const;

export const productPrinciples = [
  "One question per screen.",
  "Next action first.",
  "Urgency only when it's real.",
  "Fewer words beat more data.",
  "Show detail when someone asks.",
  "Accessibility from the start.",
] as const;

export const brandGuideDemoContent = {
  nextAction: {
    title: "Baggage drop, then security",
    timing: "Allow around 10 minutes",
    explanation:
      `Drop your checked bag, then head to security. ${defaultJourneyDisplay.gateLabel} · boarding at ${defaultJourneyDisplay.boardingTime}.`,
    actionLabel: "View journey",
    href: "/journey",
  } satisfies NextActionContent,
  countdown: {
    label: "Boarding begins in",
    display: "1 hour 30 minutes",
  } satisfies CountdownContent,
  healthItems: [
    {
      id: "documents",
      label: "Travel documents",
      status: "ready",
      detail: "Photo ID ready",
    },
    {
      id: "flight",
      label: "Flight",
      status: "ready",
      detail: "On time",
    },
  ] satisfies JourneyHealthItem[],
  update: {
    id: "brand-guide-gate",
    category: "flight",
    importance: "important",
    icon: "gate",
    title: "Gate assigned",
    message: `Now departing from ${defaultJourneyDisplay.gateLabel}.`,
    relativeTime: "2 minutes ago",
  } satisfies UpdateItem,
  emptyState: {
    title: "Nothing new",
    description: "No updates since your last visit.",
  },
} as const;

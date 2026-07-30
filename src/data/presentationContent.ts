import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import type { SvgIconComponent } from "@mui/icons-material";

export const presentationPrinciples: {
  title: string;
  icon: SvgIconComponent;
}[] = [
  { title: "Cut the noise", icon: ShieldOutlinedIcon },
  { title: "Lead with the next step", icon: ArrowForwardOutlinedIcon },
  { title: "Say why when it helps", icon: LightbulbOutlinedIcon },
];

export const prototypeHighlights = [
  "Screen content changes by trip stage",
  "Replay the full day",
  "Updates tied to this flight",
  "Keyboard and screen reader support",
  "Shared component library",
  "Mobile and desktop layouts",
] as const;

export const engineeringDecisions = [
  {
    title: "Next.js App Router",
    detail: "File-based routing. Presentation and app routes stay separate.",
  },
  {
    title: "TypeScript + stage config",
    detail: "One config layer drives copy and what appears on each screen.",
  },
  {
    title: "MUI + Tailwind v4",
    detail: "Accessible components with shared spacing, colour, and type tokens.",
  },
  {
    title: "Framer Motion",
    detail: "Short page and stage transitions. Respects reduced motion.",
  },
  {
    title: "Component-driven UI",
    detail: "Shared cards, health indicators, and countdowns across pages.",
  },
  {
    title: "Mock data layer",
    detail: "Fixed simulated journey for demos. No live ops feeds.",
  },
] as const;

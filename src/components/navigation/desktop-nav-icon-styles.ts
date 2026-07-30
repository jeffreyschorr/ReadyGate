import { cn } from "@/lib/utils";

export const desktopNavIconSize = 20;

export function desktopNavIconClassName(active: boolean, compact = false) {
  return cn(
    "inline-flex items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    compact ? "h-9 w-9" : "h-10 w-10",
    active
      ? "bg-accent-subtle text-accent"
      : "text-muted hover:bg-background hover:text-accent/80",
  );
}

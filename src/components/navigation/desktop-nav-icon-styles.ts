import { cn } from "@/lib/utils";

export const desktopNavIconSize = 22;

export function desktopNavIconClassName(active: boolean) {
  return cn(
    "inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    active
      ? "bg-accent-subtle text-accent"
      : "text-muted hover:bg-background hover:text-accent/80",
  );
}

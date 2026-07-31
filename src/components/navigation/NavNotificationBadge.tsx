type NavNotificationBadgeProps = {
  count: number;
  /** Compact corner pill for small mobile bottom-nav icons. */
  size?: "default" | "compact";
};

export function NavNotificationBadge({
  count,
  size = "default",
}: NavNotificationBadgeProps) {
  if (count <= 0) {
    return null;
  }

  const label = count > 9 ? "9+" : String(count);
  const compact = size === "compact";

  return (
    <span
      aria-hidden="true"
      className={
        compact
          ? "pointer-events-none absolute -top-1 -right-1.5 flex h-3.5 min-w-[14px] items-center justify-center rounded-full bg-accent px-0.5 text-[8px] font-bold leading-none text-accent-foreground ring-1 ring-surface"
          : "pointer-events-none absolute top-1 right-1 flex h-[14px] min-w-[14px] items-center justify-center rounded-full bg-accent px-0.5 text-[9px] font-bold leading-none text-accent-foreground ring-1 ring-surface"
      }
    >
      {label}
    </span>
  );
}

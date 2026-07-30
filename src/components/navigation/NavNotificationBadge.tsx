type NavNotificationBadgeProps = {
  count: number;
};

export function NavNotificationBadge({ count }: NavNotificationBadgeProps) {
  if (count <= 0) {
    return null;
  }

  const label = count > 9 ? "9+" : String(count);

  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute top-1 right-1 flex h-[14px] min-w-[14px] items-center justify-center rounded-full bg-accent px-0.5 text-[9px] font-bold leading-none text-accent-foreground ring-1 ring-surface"
    >
      {label}
    </span>
  );
}

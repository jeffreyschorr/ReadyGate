import { cn } from "@/lib/utils";

export type StatusBadgeVariant =
  | "success"
  | "warning"
  | "danger"
  | "neutral"
  | "info";

type StatusBadgeProps = {
  label: string;
  variant?: StatusBadgeVariant;
  showDot?: boolean;
  className?: string;
};

const variantStyles: Record<
  StatusBadgeVariant,
  { badge: string; dot?: string }
> = {
  success: {
    badge: "border-success/35 bg-success-subtle text-success",
    dot: "bg-success",
  },
  warning: {
    badge: "border-warning/40 bg-warning-subtle text-warning",
    dot: "bg-warning",
  },
  danger: {
    badge: "border-danger/35 bg-danger-subtle text-danger",
    dot: "bg-danger",
  },
  info: {
    badge: "border-info/35 bg-info-subtle text-info",
    dot: "bg-info",
  },
  neutral: {
    badge: "border-border bg-surface text-muted",
  },
};

export function StatusBadge({
  variant = "neutral",
  label,
  showDot = true,
  className,
}: StatusBadgeProps) {
  const styles = variantStyles[variant];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-xs font-medium leading-none",
        styles.badge,
        className,
      )}
    >
      {showDot && styles.dot ? (
        <span
          className={cn("h-1.5 w-1.5 shrink-0 rounded-full", styles.dot)}
          aria-hidden="true"
        />
      ) : null}
      {label}
    </span>
  );
}

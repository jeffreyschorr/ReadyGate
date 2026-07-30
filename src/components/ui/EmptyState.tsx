import { cn } from "@/lib/utils";
import { typography } from "@/lib/typography";

type EmptyStateProps = {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
  prominent?: boolean;
};

export function EmptyState({
  title,
  description,
  icon,
  className,
  prominent = false,
}: EmptyStateProps) {
  if (prominent) {
    return (
      <section
        aria-label={title}
        className={cn(
          "flex flex-col items-center px-4 py-16 text-center",
          className,
        )}
        role="status"
      >
        {icon ? <div aria-hidden="true">{icon}</div> : null}
        <p className={cn(typography.label, "mt-6 text-lg text-foreground")}>{title}</p>
        <p className={cn(typography.body, "mt-2 max-w-sm text-muted")}>{description}</p>
      </section>
    );
  }

  return (
    <div
      className={cn(
        "rounded-xl border border-border/60 bg-surface/60 px-6 py-12 text-center",
        className,
      )}
      role="status"
    >
      {icon ? <div className="mb-4 flex justify-center" aria-hidden="true">{icon}</div> : null}
      <h2 className={cn(typography.cardHeading, "text-card-heading")}>
        {title}
      </h2>
      <p className={cn(typography.bodySm, "mx-auto mt-2 max-w-md text-muted")}>
        {description}
      </p>
    </div>
  );
}

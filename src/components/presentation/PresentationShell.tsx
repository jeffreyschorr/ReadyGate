import { cn } from "@/lib/utils";

type PresentationShellProps = {
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  compact?: boolean;
};

export function PresentationShell({
  children,
  footer,
  className,
  compact = false,
}: PresentationShellProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div
        className={cn(
          "mx-auto flex min-h-screen w-full max-w-3xl flex-col px-6 py-12 sm:px-8 sm:py-16 lg:px-10",
          className,
        )}
      >
        <div
          className={cn(
            "flex flex-1 flex-col",
            compact ? "justify-center py-10 sm:py-12" : "justify-center",
          )}
        >
          {children}
        </div>
        {footer}
      </div>
    </div>
  );
}

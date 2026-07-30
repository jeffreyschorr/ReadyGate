import { cn } from "@/lib/utils";

type SurfacePanelProps = {
  children: React.ReactNode;
  className?: string;
};

export function SurfacePanel({ children, className }: SurfacePanelProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-surface px-5 py-6 shadow-sm md:px-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
};

export function SectionHeading({ children, className, id }: SectionHeadingProps) {
  return (
    <h2
      id={id}
      className={cn(typography.cardHeading, "text-card-heading", className)}
    >
      {children}
    </h2>
  );
}

type SubsectionHeadingProps = {
  children: React.ReactNode;
  className?: string;
};

export function SubsectionHeading({ children, className }: SubsectionHeadingProps) {
  return (
    <h2
      className={cn(typography.cardHeadingSm, "text-muted", className)}
    >
      {children}
    </h2>
  );
}

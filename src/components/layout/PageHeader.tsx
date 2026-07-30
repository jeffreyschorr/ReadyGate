import { cn } from "@/lib/utils";
import { typography } from "@/lib/typography";

type PageHeaderProps = {
  title: string;
  description: string;
  className?: string;
};

export function PageHeader({ title, description, className }: PageHeaderProps) {
  return (
    <header className={cn("mb-8 max-w-2xl", className)}>
      <h1 className={cn(typography.pageTitle, "text-page-title")}>
        {title}
      </h1>
      <p className={cn(typography.body, "mt-3 text-muted")}>{description}</p>
    </header>
  );
}

import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

type BrandGuideSectionProps = {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
};

export function BrandGuideSection({
  id,
  title,
  children,
  className,
}: BrandGuideSectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn("scroll-mt-8 border-t border-border pt-12 first:border-t-0 first:pt-0", className)}
    >
      <h2
        id={`${id}-heading`}
        className={cn(typography.sectionHeading, "text-section-heading")}
      >
        {title}
      </h2>
      <div className="mt-8 space-y-8">{children}</div>
    </section>
  );
}

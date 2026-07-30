import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

type BulletedTipsCardProps = {
  title: string;
  items: string[];
  className?: string;
};

export function BulletedTipsCard({
  title,
  items,
  className,
}: BulletedTipsCardProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <Card className={cn("border-border/60 bg-background/50", className)}>
      <SectionHeading>{title}</SectionHeading>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm leading-relaxed text-muted">
            <span aria-hidden="true" className="text-muted/60">
              ·
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

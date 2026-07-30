"use client";

import { useId } from "react";
import Switch from "@mui/material/Switch";

import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

type PreferenceSectionProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export function PreferenceSection({
  title,
  description,
  children,
}: PreferenceSectionProps) {
  return (
    <Card>
      <SectionHeading>{title}</SectionHeading>
      {description ? (
        <p className={cn(typography.bodySm, "mt-1 text-muted")}>{description}</p>
      ) : null}
      <div className="mt-5 space-y-4">{children}</div>
    </Card>
  );
}

type PreferenceSwitchProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
};

export function PreferenceSwitch({
  label,
  checked,
  onChange,
  disabled = false,
}: PreferenceSwitchProps) {
  const id = useId();

  return (
    <div className="flex min-h-11 items-center justify-between gap-4">
      <label
        htmlFor={id}
        className={cn(
          typography.body,
          disabled ? "text-muted" : "text-foreground",
        )}
      >
        {label}
      </label>
      <Switch
        id={id}
        checked={checked}
        disabled={disabled}
        onChange={(_, value) => onChange(value)}
        className="!my-0 shrink-0"
      />
    </div>
  );
}

type DetailRowProps = {
  label: string;
  value: string;
};

export function DetailRow({ label, value }: DetailRowProps) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-border/50 py-3 last:border-b-0">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="text-sm font-medium text-foreground">{value}</dd>
    </div>
  );
}

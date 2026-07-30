"use client";

import Tab from "@mui/material/Tab";
import MuiTabs from "@mui/material/Tabs";
import type { TabsProps as MuiTabsProps } from "@mui/material/Tabs";

import { cn } from "@/lib/utils";

export type TabItem = {
  label: string;
  value: string;
};

type TabsProps = Omit<MuiTabsProps, "onChange"> & {
  items: TabItem[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export function Tabs({ items, value, onChange, className, ...props }: TabsProps) {
  return (
    <MuiTabs
      value={value}
      onChange={(_, nextValue) => onChange(nextValue)}
      className={cn("min-h-11 border-b border-border", className)}
      aria-label="Tabs"
      {...props}
    >
      {items.map((item) => (
        <Tab key={item.value} label={item.label} value={item.value} />
      ))}
    </MuiTabs>
  );
}

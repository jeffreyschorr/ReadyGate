"use client";

import { cn } from "@/lib/utils";

type StageTransitionProps = {
  stageKey: string;
  children: React.ReactNode;
  className?: string;
};

export function StageTransition({
  stageKey,
  children,
  className,
}: StageTransitionProps) {
  return (
    <div key={stageKey} className={cn("min-w-0 w-full max-w-full", className)}>
      {children}
    </div>
  );
}

type StageStaggerProps = {
  children: React.ReactNode;
  className?: string;
};

export function StageStagger({ children, className }: StageStaggerProps) {
  return <div className={cn("min-w-0 w-full max-w-full", className)}>{children}</div>;
}

type StageStaggerItemProps = {
  children: React.ReactNode;
  className?: string;
};

export function StageStaggerItem({ children, className }: StageStaggerItemProps) {
  return (
    <div className={cn("min-w-0 w-full max-w-full", className)}>{children}</div>
  );
}

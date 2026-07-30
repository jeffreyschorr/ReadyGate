"use client";

type PageTransitionProps = {
  children: React.ReactNode;
};

/** Wrapper without route transition motion (transforms broke fixed mobile UI). */
export function PageTransition({ children }: PageTransitionProps) {
  return <div className="min-w-0 w-full max-w-full">{children}</div>;
}

"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Prevent browser scroll restoration and keep route loads anchored to the top. */
export function ScrollRestoration() {
  const pathname = usePathname();

  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

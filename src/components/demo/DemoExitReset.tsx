"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { clearStoredDemoStage } from "@/lib/demo-reset";
import { isAppRoute } from "@/lib/demo-routes";

/** Clear any persisted demo stage when the user leaves the interactive app. */
export function DemoExitReset() {
  const pathname = usePathname();

  useEffect(() => {
    if (!isAppRoute(pathname)) {
      clearStoredDemoStage();
    }
  }, [pathname]);

  return null;
}

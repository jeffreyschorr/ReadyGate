"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type FixedUiRootProps = {
  children: React.ReactNode;
};

/** Portal target for viewport-fixed UI (mobile nav, demo controls). */
export function FixedUiRoot({ children }: FixedUiRootProps) {
  const [root, setRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setRoot(document.getElementById("fixed-ui-root"));
  }, []);

  if (!root) {
    return null;
  }

  return createPortal(children, root);
}

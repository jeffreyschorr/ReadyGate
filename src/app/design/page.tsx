import type { Metadata } from "next";

import { DesignView } from "@/components/design/DesignView";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Design",
  description:
    "ReadyGate components, tokens, and interaction patterns used in the concept demo.",
  path: "/design",
});

export default function DesignPage() {
  return <DesignView />;
}

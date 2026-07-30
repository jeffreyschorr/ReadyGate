import type { Metadata } from "next";

import { BrandGuideView } from "@/components/brand/BrandGuideView";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Brand Guide",
  description:
    "ReadyGate visual identity, typography, colour, and interaction principles.",
  path: "/brand",
});

export default function BrandGuidePage() {
  return <BrandGuideView />;
}

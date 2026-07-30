import type { Metadata } from "next";

import { EngineeringView } from "@/components/presentation/EngineeringView";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Engineering Decisions",
  description: "Technical foundations behind the ReadyGate concept demo.",
  path: "/engineering",
});

export default function EngineeringPage() {
  return <EngineeringView />;
}

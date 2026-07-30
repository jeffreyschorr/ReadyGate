import type { Metadata } from "next";

import { JourneyView } from "@/components/journey/JourneyView";

export const metadata: Metadata = {
  title: "Journey",
  description: "Full trip timeline, milestones, and what's ahead.",
};

export default function JourneyPage() {
  return <JourneyView />;
}

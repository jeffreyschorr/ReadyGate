import type { Metadata } from "next";

import { DestinationView } from "@/components/destination/DestinationView";

export const metadata: Metadata = {
  title: "Destination",
  description: "Arrival, transport, and hotel.",
};

export default function DestinationPage() {
  return <DestinationView />;
}

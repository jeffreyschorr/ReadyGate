import type { Metadata } from "next";

import { FlightView } from "@/components/flight/FlightView";

export const metadata: Metadata = {
  title: "Flight",
  description: "Flight details, boarding pass, and what to do next.",
};

export default function FlightPage() {
  return <FlightView />;
}

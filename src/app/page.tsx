import type { Metadata } from "next";

import { LandingPage } from "@/components/landing/LandingPage";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  path: "/",
});

export default function HomePage() {
  return <LandingPage />;
}

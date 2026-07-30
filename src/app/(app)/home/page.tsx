import type { Metadata } from "next";

import { HomeView } from "@/components/home/HomeView";

export const metadata: Metadata = {
  title: "Today",
  description: "What you need right now, as your trip progresses.",
};

export default function HomePage() {
  return <HomeView />;
}

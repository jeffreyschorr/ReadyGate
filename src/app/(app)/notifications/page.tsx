import type { Metadata } from "next";

import { UpdatesView } from "@/components/updates/UpdatesView";

export const metadata: Metadata = {
  title: "Updates",
  description: "Trip changes that matter.",
};

export default function NotificationsPage() {
  return <UpdatesView />;
}

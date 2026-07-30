import { AppLayout } from "@/components/layout/AppLayout";
import { AppProviders } from "@/components/providers/AppProviders";

export default function AppGroupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppProviders>
      <AppLayout>{children}</AppLayout>
    </AppProviders>
  );
}

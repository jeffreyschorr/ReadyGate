import { DemoExitReset } from "@/components/demo/DemoExitReset";
import { TravellerPreferencesProvider } from "@/context/TravellerPreferencesContext";
import { plusJakartaSans } from "@/lib/fonts";
import { rootMetadata } from "@/lib/metadata";
import { ThemeProvider } from "@/theme/ThemeProvider";
import "./globals.css";

export const metadata = rootMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <body
        className={`${plusJakartaSans.className} bg-background font-sans text-foreground antialiased`}
      >
        <TravellerPreferencesProvider>
          <DemoExitReset />
          <ThemeProvider>{children}</ThemeProvider>
        </TravellerPreferencesProvider>
      </body>
    </html>
  );
}

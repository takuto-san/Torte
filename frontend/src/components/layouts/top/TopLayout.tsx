import { Geist, Geist_Mono } from "next/font/google";
import { StoreProvider } from "@/lib/stores/StoreProvider";
import { QueryProvider } from "@/lib/stores/QueryProvider";
import { MswProvider } from "@/lib/mocks/MswProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function TopLayoutWrapper({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <MswProvider>
          <QueryProvider>
            <StoreProvider>
              {children}
            </StoreProvider>
          </QueryProvider>
        </MswProvider>
      </body>
    </html>
  );
}
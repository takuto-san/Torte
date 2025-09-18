// default settings for layout
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Providers
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

export const metadata: Metadata = {
  title: "Torte | 食事管理アプリ",
  description: "食事記録を楽に継続するためのアプリです",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <MswProvider>
          <StoreProvider>
            <QueryProvider>
              {children}
            </QueryProvider>
          </StoreProvider>
        </MswProvider>
      </body>
    </html>
  );
}
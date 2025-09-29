import { geistSans, geistMono } from "@/utils/font";
import { StoreProvider } from "@/lib/stores/StoreProvider";
import { QueryProvider } from "@/lib/stores/QueryProvider";
import { MswProvider } from "@/lib/mocks/MswProvider";

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
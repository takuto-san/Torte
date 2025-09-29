import { Suspense, type ReactNode } from "react";
import { MswClientProvider } from "./MswClientProvider";

if (process.env.NEXT_RUNTIME === "nodejs") {
  const { server } = await import("./settings/server");
  server.listen({ onUnhandledRequest: "bypass" });
}

// 使用するProviderコンポーネント
export const MswProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Suspense fallback={null}>
      <MswClientProvider>{children}</MswClientProvider>
    </Suspense>
  );
};

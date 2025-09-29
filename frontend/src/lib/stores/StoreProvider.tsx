"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "./store";
import { getTodayDate } from "@/utils/date";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>(undefined);
  if (!storeRef.current) {
    storeRef.current = makeStore({
      date: { selectedDate: getTodayDate() },
    });
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}

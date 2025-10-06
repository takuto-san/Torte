"use client";

import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/lib/stores/store";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export const useSubmitSelected = () => {
  const selectedIds = useSelector((s: RootState) => s.selectedFood?.ids ?? []);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // submit: 選択されたIDをサーバーに送信する
  const submit = useCallback(async () => {
    if (!selectedIds || selectedIds.length === 0) return;

    setLoading(true);
    setError(null);
    try {
      const endpoint = `${API_BASE_URL}/food/submit`;
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedIds }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`submit failed: ${res.status} ${text}`);
      }

      return;
    } catch (err: any) {
      setError(err instanceof Error ? err : new Error(String(err)));
      throw err;
    } finally {
      setLoading(false);
    }
  }, [selectedIds]);

  return { submit, loading, error, selectedCount: selectedIds.length, selectedIds };
};
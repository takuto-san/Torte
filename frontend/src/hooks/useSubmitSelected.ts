"use client";

import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/lib/stores/store";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

type UseSubmitSelectedResult = {
  submit: () => Promise<void>;
  loading: boolean;
  error: Error | null;
  selectedCount: number;
  selectedIds: number[];
};

export const useSubmitSelected = (): UseSubmitSelectedResult => {
  const selectedIds = useSelector((s: RootState) => s.selectedFood?.ids ?? []);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // submit: 選択されたIDをサーバーに送信する
  // Todo: 記録した日付とカテゴリも送信する
  const submit = useCallback(async (): Promise<void> => {
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
    } catch (e: unknown) {
      const err =
        e instanceof Error ? e : new Error(String(e ?? "Unknown error"));
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [selectedIds]);

  return {
    submit,
    loading,
    error,
    selectedCount: selectedIds.length,
    selectedIds,
  };
};

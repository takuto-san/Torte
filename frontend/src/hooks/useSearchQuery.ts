"use client";

import { RootState } from "@/lib/stores/store";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import type { Food } from "@/types/foodTypes";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

const tabTypeMap: Record<number, string> = {
  0: "select",
  1: "history",
  2: "search",
};

export const useSearchQuery = () => {
  const selectedTabId = useSelector((state: RootState) => state.tab.currentTab);
  const selectedCategory = useSelector(
    (state: RootState) => state.mealCategory.selectedCategory,
  );
  const searchValue = useSelector((state: RootState) => state.search.value);
  const selectedIds = useSelector((state: RootState) => state.selectedFood?.ids ?? []);

  const tabName = tabTypeMap[selectedTabId];

  const queryKey =
    selectedTabId === 0
      ? [tabName, ...selectedIds.map((id) => String(id))]
      : [tabName, String(searchValue ?? ""), String(selectedCategory ?? "")];

  return useQuery<Food[], Error>({
    queryKey,
    queryFn: async () => {
      switch (selectedTabId) {
        // SELECT
        case 0: {
          if (!selectedIds || selectedIds.length === 0) return [];

          const idsParam = selectedIds.map((id) => encodeURIComponent(String(id))).join(",");
          const endpoint = `${API_BASE_URL}/food/search?tab=select&ids=${idsParam}`;

          const res = await fetch(endpoint);
          if (!res.ok) throw new Error("API error");
          const body = await res.json();
          return (body.results ?? []) as Food[];
        }

        // HISTORY
        case 1: {
          let endpoint = `${API_BASE_URL}/food/search?tab=history`;
          if (selectedCategory) endpoint += `&category=${encodeURIComponent(selectedCategory)}`;
          if (searchValue) endpoint += `&q=${encodeURIComponent(searchValue)}`;

          const res = await fetch(endpoint);
          if (!res.ok) throw new Error("API error");
          const body = await res.json();
          return (body.results ?? []) as Food[];
        }

        case 2: {
          let endpoint = `${API_BASE_URL}/food/search?tab=search`;
          if (selectedCategory) endpoint += `&category=${encodeURIComponent(selectedCategory)}`;
          if (searchValue) endpoint += `&q=${encodeURIComponent(searchValue)}`;

          const res = await fetch(endpoint);
          if (!res.ok) throw new Error("API error");
          const body = await res.json();
          return (body.results ?? []) as Food[];
        }

        default:
          return [];
      }
    },
    enabled: selectedTabId === 2 ? !!searchValue : true,
  });
};
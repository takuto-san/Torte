import { RootState } from "@/lib/stores/store";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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

  const tabName = tabTypeMap[selectedTabId];
  const queryKey = [tabName, searchValue, selectedCategory];

  return useQuery({
    queryKey,
    queryFn: async () => {
      let endpoint = `${API_BASE_URL}/food/search?tab=${tabName}`;
      if (searchValue) endpoint += `&q=${encodeURIComponent(searchValue)}`;
      if (selectedCategory)
        endpoint += `&category=${encodeURIComponent(selectedCategory)}`;

      const res = await fetch(endpoint);
      if (!res.ok) throw new Error("API error");
      return res.json();
    },
    enabled: !!searchValue,
  });
};

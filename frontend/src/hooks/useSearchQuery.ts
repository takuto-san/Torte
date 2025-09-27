import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/stores/store';
import type { SearchParams } from '@/types/searchTypes';

const tabTypeMap: Record<number, string> = {
  0: 'select',
  1: 'history',
  2: 'search',
};

export const useSearchQuery = (params: SearchParams) => {
  const selectedTabId = useSelector((state: RootState) => state.tab.currentTab);
  const tabName = tabTypeMap[selectedTabId];

  return useQuery({
    queryKey: [tabName, params.query, params.category],
    queryFn: async () => {
      let endpoint = `/foods?tab=${tabName}`;
      if (params.query) endpoint += `&q=${encodeURIComponent(params.query)}`;
      if (params.category) endpoint += `&category=${encodeURIComponent(params.category)}`;

      const res = await fetch(endpoint);
      if (!res.ok) throw new Error('API error');
      return res.json();
    },
    enabled: !!params.query,
  });
};
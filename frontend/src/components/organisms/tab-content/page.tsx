import React from "react";
import { useSelector } from "react-redux";
import type { TabsContentProps } from "@/types/propsTypes";
import { useSearchQuery } from "@/hooks/useSearchQuery"; // フックのパスは適宜修正してください

export const TabContent: React.FC<TabsContentProps & { searchQuery: string }> = ({ id, searchQuery }) => {
  const selectedCategory = useSelector(
    (state: any) => state.mealCategory.selectedCategory
  );

  const { data, isLoading, error } = useSearchQuery({
    tab: id,
    query: searchQuery,
    category: selectedCategory,
  });

  return (
    <div className="flex-1 overflow-y-auto">
      <div>
        現在選択されているタブのID: {id}
      </div>
      {isLoading && <div>検索中...</div>}
      {error && <div>エラーが発生しました</div>}

      {searchQuery === "" ? (
        <div className="flex items-center justify-center h-32 text-muted-foreground">
          検索ワードを入力してください
        </div>
      ) : !isLoading && data?.length === 0 ? (
        <div className="flex items-center justify-center h-32 text-muted-foreground">
          "{searchQuery}" の検索結果はありません
        </div>
      ) : (
        <ul>
          {data?.map((food: any) => (
            <li key={food.id} className="p-2 border-b">
              <div className="font-bold">{food.name}</div>
              {food.category && <div className="text-sm text-gray-500">カテゴリ: {food.category}</div>}
              {food.calories && <div className="text-sm text-gray-500">カロリー: {food.calories}</div>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
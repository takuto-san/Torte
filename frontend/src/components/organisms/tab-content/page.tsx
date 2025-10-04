import { useSearchQuery } from "@/hooks/useSearchQuery";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/stores/store";
import type { Food } from "@/types/foodTypes";

export const TabContent: React.FC = () => {
  const { data, isLoading, error } = useSearchQuery();

  const foodList: Food[] = Array.isArray(data)
    ? data
    : Array.isArray((data as any)?.results)
    ? (data as any).results
    : Array.isArray((data as any)?.data)
    ? (data as any).data
    : [];

  const inputText = useSelector((state: RootState) => state.search.value);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mb-2">
        {isLoading && <div>検索中...</div>}
        {error && <div>エラーが発生しました</div>}
        {!isLoading && foodList.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-muted-foreground">
            検索結果はありません
          </div>
        ) : (
          <ul>
            {foodList.map((food: Food) => (
              <li key={food.id} className="p-2 border-b">
                <div className="font-bold">{food.name}</div>
                {(food.recordedCategories ?? []).length > 0 && (
                  <div className="text-sm text-gray-500">
                    カテゴリ: {(food.recordedCategories ?? []).join(", ")}
                  </div>
                )}
                <div className="text-sm text-gray-500">
                  カロリー: {food.nutrition?.calories ?? "-"}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
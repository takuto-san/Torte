import { useSearchQuery } from "@/hooks/useSearchQuery";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/stores/store";

export const TabContent: React.FC = () => {
  const { data, isLoading, error } = useSearchQuery();
  const foodList = Array.isArray(data) ? data : data?.data ?? [];
  const inputText = useSelector((state: RootState) => state.search.value);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mb-2 text-sm text-gray-500">
        検索ワード: {inputText ?? <span className="text-gray-400">未入力</span>}
      </div>

      {isLoading && <div>検索中...</div>}
      {error && <div>エラーが発生しました</div>}
      {!isLoading && foodList.length === 0 ? (
        <div className="flex items-center justify-center h-32 text-muted-foreground">
          検索結果はありません
        </div>
      ) : (
        <ul>
          {foodList.map((food: any) => (
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
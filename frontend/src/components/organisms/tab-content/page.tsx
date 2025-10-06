import { useSearchQuery } from "@/hooks/useSearchQuery";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/stores/store";
import type { Food } from "@/types/foodTypes";
import { AddCircleButton } from "@/components/atoms/add-circle-button/page";
import { isPlainObject, isFoodArray } from "@/utils/validation";


const normalizeToFoodList = (input: unknown): Food[] => {
  if (isFoodArray(input)) return input;

  if (isPlainObject(input)) {
    const results = input.results as unknown;
    if (isFoodArray(results)) return results;

    const data = input.data as unknown;
    if (isFoodArray(data)) return data;
  }

  return [];
};

export const TabContent: React.FC = () => {
  const { data, isLoading, error } = useSearchQuery();

  const foodList: Food[] = normalizeToFoodList(data);

  const inputText = useSelector((state: RootState) => state.search.value);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mb-2">
        {isLoading || error || (!isLoading && foodList.length === 0) ? (
          <div className="flex min-h-[40vh] items-center justify-center text-gray-500">
            {isLoading ? (
              <>
                <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-transparent" />
                検索中...
              </>
            ) : error ? (
              <>エラーが発生しました</>
            ) : (
              <>検索結果はありません</>
            )}
          </div>
        ) : (
          <ul>
            {foodList.map((food) => (
              <li key={food.id} className="px-4 py-3 border-b last:border-b-0">
                <div className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="font-bold truncate" title={food.name}>
                      {food.name}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 text-right whitespace-nowrap tabular-nums shrink-0">
                    {food.nutrition?.calories ?? "-"} kcal
                  </div>
                  <div className="ml-1 shrink-0">
                    <AddCircleButton id={food.id} aria-label={`${food.name} を追加`} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
import { HttpResponse, delay, http } from "msw";
import { dummyFoods } from '@/utils/dummy';

export const getFoodControllerSearchFoodsMockHandler = (
  overrideResponse?: null | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<null> | null)
) => {
  return http.get("*/food/search", async (info) => {
    await delay(1000);

    // グローバルなURLコンストラクタを使う（import不要）
    const urlObj = new URL(info.request.url);

    const q = urlObj.searchParams.get("q")?.toLowerCase() ?? "";
    const category = urlObj.searchParams.get("category")?.toLowerCase() ?? "";

    let results = dummyFoods;

    // 検索クエリ対応（nameのみ）
    if (q) {
      results = results.filter(food =>
        food.name.toLowerCase().includes(q)
      );
    }
    // カテゴリ対応（recordedCategoriesのみ）
    if (category) {
      results = results.filter(food =>
        food.recordedCategories.map(cat => cat.toLowerCase()).includes(category)
      );
    }

    if (typeof overrideResponse === "function") {
      const custom = await overrideResponse(info);
      if (custom) return custom;
    }

    return HttpResponse.json({ results }, { status: 200 });
  });
};

export const getFoodMock = () => [getFoodControllerSearchFoodsMockHandler()];
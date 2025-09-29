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
    const tab = urlObj.searchParams.get("tab") ?? "";

    // console.log("Request URL:", info.request.url);
    // console.log("Search Query:", q);
    // console.log("Category Filter:", category);
    // console.log("Tab:", tab);

    let results = dummyFoods;

    if (q) {
      results = results.filter(food =>
        food.name.toLowerCase().includes(q) ||
        food.cuisine.toLowerCase().includes(q)
      );
    }
    if (category) {
      results = results.filter(food =>
        food.recordedCategories.map(cat => cat.toLowerCase()).includes(category)
        || (food.dietaryTags?.map(tag => tag.toLowerCase()).includes(category))
      );
    }
    if (tab === "history") {
      results = results.filter(food => food.isRecorded);
    } else if (tab === "select") {
      results = results.filter(food => !food.isRecorded);
    }

    if (typeof overrideResponse === "function") {
      const custom = await overrideResponse(info);
      if (custom) return custom;
    }

    return HttpResponse.json({ results }, { status: 200 });
  });
};

export const getFoodMock = () => [getFoodControllerSearchFoodsMockHandler()];
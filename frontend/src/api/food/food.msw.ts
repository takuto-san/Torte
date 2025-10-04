import { HttpResponse, delay, http } from "msw";
import { dummyFoods } from "@/utils/dummy";

const toLowerString = (value: unknown): string => String(value).toLowerCase();

export const getFoodControllerSearchFoodsMockHandler = (
  overrideResponse?:
    | null
    | ((
        info: Parameters<Parameters<typeof http.get>[1]>[0],
      ) => Promise<null> | null),
) => {
  return http.get("*/food/search", async (info) => {
    await delay(1000);

    const urlObj = new URL(info.request.url);

    const tab = urlObj.searchParams.get("tab")?.toLowerCase() ?? "";
    const category = urlObj.searchParams.get("category")?.toLowerCase() ?? "";
    const q = urlObj.searchParams.get("q")?.toLowerCase().trim() ?? "";

    let results = dummyFoods;

    if (category && tab === "history") {
      results = results.filter((food) => {
        const categories = (Array.isArray(food.recordedCategories)
          ? food.recordedCategories
          : []
        ).map((cat: unknown) => toLowerString(cat));
        return categories.includes(category);
      });
    }

    if (q) {
      results = results.filter((food) =>
        String(food.name ?? "").toLowerCase().startsWith(q),
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
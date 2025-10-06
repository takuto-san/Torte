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
    const idsParam = urlObj.searchParams.get("ids") ?? "";

    let results = dummyFoods;
    let handledSelectWithIds = false;

    switch (tab) {
      case "select": {
        if (idsParam.trim() !== "") {
          const ids: number[] = idsParam
            .split(",")
            .map(s => Number(s.trim()))
            .filter(n => Number.isFinite(n));

          const findById = (id: number | string) =>
            dummyFoods.find((f) => String(f.id) === String(id));

          const filtered = ids
            .map((id) => findById(id))
            .filter((f): f is typeof dummyFoods[number] => f !== undefined);

          results = filtered;
          handledSelectWithIds = true;
        }
        break;
      }

      case "history": {
        if (category) {
          results = results.filter((food) => {
            const categories = (Array.isArray(food.recordedCategories)
              ? food.recordedCategories
              : []
            ).map((cat: unknown) => toLowerString(cat));
            return categories.includes(category);
          });
        }
        break;
      }

      case "search":
      default: {
        break;
      }
    }

    if (!handledSelectWithIds && q) {
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
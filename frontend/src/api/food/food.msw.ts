import { HttpResponse, delay, http } from "msw";
import { dummyFoods } from "@/utils/dummy"; 

export const getFoodControllerSearchFoodsMockHandler = (
  overrideResponse?:
    | null
    | ((
        info: Parameters<Parameters<typeof http.get>[1]>[0],
      ) => Promise<typeof dummyFoods> | null),
) => {
  return http.get("*/food/search", async (info) => {
    await delay(1000);
    // クエリパラメータ取得例（?q=xxx）
    const url = new URL(info.request.url);
    const q = url.searchParams.get("q")?.toLowerCase() ?? "";

    // 検索語でフィルタ
    const result = q
      ? dummyFoods.filter(food =>
          food.name.toLowerCase().includes(q)
        )
      : dummyFoods;

    if (typeof overrideResponse === "function") {
      const custom = await overrideResponse(info);
      if (custom !== null) {
        return new HttpResponse(custom, { status: 200 });
      }
    }
    return new HttpResponse(result, { status: 200 });
  });
};
export const getFoodMock = () => [getFoodControllerSearchFoodsMockHandler()];
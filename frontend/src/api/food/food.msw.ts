import { HttpResponse, delay, http } from "msw";
import { dummyFoods } from "@/utils/dummy";

const toLowerString = (value: unknown): string => String(value).toLowerCase();

type HandlerInfo = Parameters<Parameters<typeof http.get>[1]>[0];

// GET /food/search
export const getFoodControllerSearchFoodsMockHandler = (
  overrideResponse?:
    | null
    | ((
        info: HandlerInfo,
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
            .map((s) => Number(s.trim()))
            .filter((n): n is number => Number.isFinite(n));

          const findById = (id: number | string): typeof dummyFoods[number] | undefined =>
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

// POST /food/submit
export const postFoodControllerSubmitMockHandler = (
  overrideResponse?: null | ((info: HandlerInfo) => Promise<null> | null),
) => {
  return http.post("*/food/submit", async (info) => {
    await delay(500);

    let body: unknown;
    try {
      body = await info.request.json();
    } catch (_e) {
      return HttpResponse.json({ message: "invalid json" }, { status: 400 });
    }

    // ボディの安全なパース
    const parsed = (body && typeof body === "object") ? (body as { ids?: unknown }) : { ids: undefined };
    const rawIds = Array.isArray(parsed.ids) ? parsed.ids : [];
    const ids = rawIds
      .map((v: unknown) => Number(v))
      .filter((n): n is number => Number.isFinite(n));

    if (!ids || ids.length === 0) {
      return HttpResponse.json(
        { message: "ids is required" },
        { status: 400 },
      );
    }

    const existingIds = new Set(dummyFoods.map((f) => Number(f.id)));
    const invalidIds = ids.filter((id) => !existingIds.has(Number(id)));

    if (typeof overrideResponse === "function") {
      const custom = await overrideResponse(info);
      if (custom) return custom;
    }

    if (invalidIds.length > 0) {
      return HttpResponse.json(
        { message: "some ids are invalid", invalidIds },
        { status: 400 },
      );
    }

    return HttpResponse.json({ success: true }, { status: 200 });
  });
};

export const getFoodMock = () => [
  getFoodControllerSearchFoodsMockHandler(),
  postFoodControllerSubmitMockHandler(),
];
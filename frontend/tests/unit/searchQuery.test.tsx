import { describe, it, expect, beforeAll, afterAll, afterEach } from "vitest";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { makeStore, RootState } from "@/lib/stores/store"; // <- 関数と型のみimport
import searchReducer, { setSearchValue } from "@/stores/input/searchSlice";
import { dummyFoods } from "@/utils/dummy";

// テスト用storeを生成
const store = makeStore();

const server = setupServer(
  http.get("*/food/search", async ({ request }) => {
    const url = new URL(request.url);
    const q = url.searchParams.get("q")?.toLowerCase() ?? "";
    const result = q
      ? dummyFoods.filter((food) => food.name.toLowerCase().includes(q))
      : dummyFoods;
    return HttpResponse.json(result, { status: 200 });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Redux値でAPIリクエストしダミーデータ取得", () => {
  it("setSearchValueで値変更しfetchできる", async () => {
    // 入力状態管理のテスト
    store.dispatch(setSearchValue("curry"));
    const searchValue = store.getState().search.value;
    expect(searchValue).toBe("curry");

    // mswサーバーにリクエスト
    const res = await fetch(`/food/search?q=${encodeURIComponent(searchValue)}`);
    const foods = await res.json();

    // レスポンス確認
    expect(Array.isArray(foods)).toBe(true);
    expect(foods.length).toBeGreaterThan(0);
    expect(foods.some((f: { name: string }) => f.name.toLowerCase().includes("curry"))).toBe(true);
  });
});
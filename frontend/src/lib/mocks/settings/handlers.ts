import { getAuthMock } from "@/api/auth/auth.msw";
import { getFoodMock } from "@/api/food/food.msw";
import type { RequestHandler } from "msw";

// Orval で生成されたモックハンドラーをここに記述
const orvalHandlers = [...getAuthMock(), ...getFoodMock()];

// Orval とは別で定義したモックハンドラーを追加する場合はここに記述
const originalHandlers: RequestHandler[] = [];

// モックハンドラを結合（originalHandlersを前にすることで、orvalHandlers を上書きするようにしておく）
export const handlers: RequestHandler[] = [
  ...originalHandlers,
  ...orvalHandlers,
];

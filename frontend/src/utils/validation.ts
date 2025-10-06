import { Food } from "@/types/foodTypes";

export const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null;

export const isFood = (v: unknown): v is Food => {
  if (!isPlainObject(v)) return false;
  const id = v.id as unknown;
  const name = v.name as unknown;
  const idOk =
    typeof id === "string" ||
    typeof id === "number"; 
  const nameOk = typeof name === "string";
  return idOk && nameOk;
};

export const isFoodArray = (v: unknown): v is Food[] =>
  Array.isArray(v) && v.every(isFood);
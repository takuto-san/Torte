import { DateObj, Weekday } from "@/types/dateTypes";

export const weekDaysJa = ["日", "月", "火", "水", "木", "金", "土"];

export const weekDays: Weekday[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export function getCurrentTime(): { hour: number; minute: number } {
  const now = new Date();
  return {
    hour: now.getHours(),
    minute: now.getMinutes(),
  };
}

export function getTodayDate(): { year: number; month: number; day: number } {
  const today = new Date();
  return {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate(),
  };
}

export function getWeekdayJa(date?: DateObj): string {
  const d = date ? new Date(date.year, date.month - 1, date.day) : new Date();
  return weekDaysJa[d.getDay()];
}

export const getTodayWeekday = (): Weekday => {
  const weekday = new Date().toLocaleDateString("en-US", { weekday: "long" }) as Weekday;
  if (weekDays.includes(weekday)) {
    return weekday;
  }
  throw new Error("Invalid weekday");
};

export const getWeekday = (dateStr: string): Weekday => {
  const date = new Date(dateStr);
  const weekday = date.toLocaleDateString("en-US", { weekday: "long" }) as Weekday;
  if (weekDays.includes(weekday)) {
    return weekday;
  }
  throw new Error("Invalid weekday");
};

export const getWeekdayFromDate = (dateString: string): Weekday => {
  const date = new Date(dateString);
  const weekday = date.toLocaleDateString("en-US", { weekday: "long" }) as Weekday;
  if (weekDays.includes(weekday)) {
    return weekday;
  }
  throw new Error("Invalid weekday");
};
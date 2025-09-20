import { DateObj } from "@/types/dateTypes";

export const weekDaysJa = ["日", "月", "火", "水", "木", "金", "土"];

export const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

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

export const getTodayWeekday = () =>
  new Date().toLocaleDateString("en-US", { weekday: "long" });

export const getWeekday = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { weekday: "long" });
};

export const getWeekdayFromDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { weekday: "long" });
};
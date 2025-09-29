export type DateObj = {
  year: number;
  month: number;
  day: number;
};

export type DateState = {
  selectedDate: DateObj | undefined;
};

export type Weekday =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

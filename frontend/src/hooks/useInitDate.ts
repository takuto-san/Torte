"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDate } from "@/stores/utils/dateSlice";
import { getTodayDate } from "@/utils/date";
import { RootState } from "@/lib/stores/store";

export const useInitDate = () => {
  const dispatch = useDispatch();
  const selectedDate = useSelector((state: RootState) => state.date.selectedDate);

  useEffect(() => {
    if (!selectedDate) {
      dispatch(setDate(getTodayDate()));
    }
  }, [dispatch, selectedDate]);
};
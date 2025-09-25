"use client"
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setLoading, unsetLoading } from "@/lib/stores/loading/loadingSlice";

export function useLoading() {
  const dispatch = useDispatch();

  const loadingOn = useCallback(() => {
    // フラグをtrueに
    dispatch(setLoading());
  }, [dispatch]);

  const loadingOff = useCallback(() => {
    // フラグをfalseに
    dispatch(unsetLoading());
  }, [dispatch]);

  return { loadingOn, loadingOff };
}
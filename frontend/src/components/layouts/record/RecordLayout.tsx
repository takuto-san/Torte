"use client";

import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/lib/stores/store";
import { SubmitSelectedButton } from "@/components/atoms/submit-selected-button/page";

export const RecordLayoutWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const selectedTab = useSelector((s: RootState) => s.tab.currentTab);

  return (
    <>
      {children}

      {selectedTab === 0 && <SubmitSelectedButton />}
    </>
  );
};

export default RecordLayoutWrapper;

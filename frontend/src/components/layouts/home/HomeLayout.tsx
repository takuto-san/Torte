"use client";
import React from "react";
import { LinkButton } from "@/components/atoms/link-button/page";

export const HomeLayoutWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div>
      {children}
      <LinkButton
        href="/record"
        variant="contained"
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          backgroundColor: "#239e50ff",
          fontSize: 18,
          padding: "15px 24px",
          borderRadius: "20px",
          boxShadow: 2,
          "&:hover": {
            backgroundColor: "#05aa42ff",
          },
        }}
      >
        記録する
      </LinkButton>
    </div>
  );
};

"use client";
import React from "react";
import Link from "next/link";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import Avatar from "@mui/material/Avatar";

export const Header: React.FC = () => {
  // Todo: ユーザー情報をAPIから取得する
  const userIconUrl = "https://avatars.githubusercontent.com/u/3369400?v=4";

  return (
    <header className="bg-white shadow-sm w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 text-xl font-bold">
          <Link href="/home" className="flex items-center gap-2">
            <RestaurantIcon className="text-emerald-600 w-7 h-7" />
            <span>Torte</span>
          </Link>
        </div>
        <Link
          href="/profile"
          className="flex items-center gap-1 font-medium transition duration-300"
        >
          <Avatar
            alt="ユーザーアイコン"
            src={userIconUrl}
            sx={{ width: 32, height: 32 }}
          />
        </Link>
      </div>
    </header>
  );
};

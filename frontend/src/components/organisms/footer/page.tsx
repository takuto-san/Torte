"use client";
import React from "react";
import RestaurantIcon from "@mui/icons-material/Restaurant";

export const Footer: React.FC = () => (
  <footer className="bg-gray-900 text-white py-10">
    <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
      <div className="flex items-center gap-2 text-lg font-semibold">
        <RestaurantIcon className="h-6 w-6" /> Torte
      </div>
      <div className="text-sm text-gray-400">
        © 2025 Torte. All rights reserved.
      </div>
    </div>
  </footer>
);

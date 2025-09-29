"use client";
import React from "react";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import Link from "next/link";

const HeroSection: React.FC = () => (
  <header className="bg-white shadow-sm fixed w-full z-50">
    <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
      <div className="flex items-center gap-2 text-xl font-bold">
        <RestaurantIcon className="text-emerald-600 w-7 h-7" />
        <span>Torte</span>
      </div>
      <Link
        href="/auth"
        className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition duration-300"
      >
        Get Started
      </Link>
    </div>
  </header>
);

export default HeroSection;

"use client";
import React from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import GroupsIcon from "@mui/icons-material/Groups";
import ShieldIcon from "@mui/icons-material/Shield";
import { motion } from "framer-motion";

export type Feature = {
  Icon: React.ElementType;
  title: string;
  description: string;
  bg: string;
  iconColor: string;
};

export const features: Feature[] = [
  {
    Icon: CalendarMonthIcon,
    title: "Smart Meal Planning",
    description:
      "Create weekly meal plans with drag-and-drop simplicity. Personalized suggestions included.",
    bg: "from-emerald-50 to-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    Icon: TrendingUpIcon,
    title: "Nutrition Tracking",
    description:
      "Track daily intake with nutritional breakdowns — calories, macros, and more.",
    bg: "from-blue-50 to-blue-100",
    iconColor: "text-blue-600",
  },
  {
    Icon: TrackChangesIcon,
    title: "Goal Achievement",
    description:
      "Set and reach your health targets with personalized goals and real-time progress.",
    bg: "from-orange-50 to-orange-100",
    iconColor: "text-orange-600",
  },
  {
    Icon: RestaurantMenuIcon,
    title: "Recipe Database",
    description:
      "Access 15K+ recipes filtered by dietary preferences with full nutrition info.",
    bg: "from-purple-50 to-purple-100",
    iconColor: "text-purple-600",
  },
  {
    Icon: GroupsIcon,
    title: "Community Support",
    description:
      "Join a community of users, share your journey, and stay motivated.",
    bg: "from-pink-50 to-pink-100",
    iconColor: "text-pink-600",
  },
  {
    Icon: ShieldIcon,
    title: "Secure & Private",
    description:
      "Your data is protected with enterprise-grade security and full privacy control.",
    bg: "from-indigo-50 to-indigo-100",
    iconColor: "text-indigo-600",
  },
];

export const FeaturesSection: React.FC = () => (
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-center mb-12"
      >
        Everything You Need for Better Nutrition
      </motion.h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {features.map(({ Icon, title, description, bg, iconColor }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-8 rounded-xl shadow-md bg-gradient-to-br ${bg} hover:shadow-xl transition`}
          >
            <Icon className={`h-10 w-10 mb-4 ${iconColor}`} />
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
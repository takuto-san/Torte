"use client";

import React from "react";
import { motion } from "framer-motion";

export type StatItem = {
  stat: string;
  label: string;
};

export const stats: StatItem[] = [
  { stat: "50K+", label: "Happy Users" },
  { stat: "2M+", label: "Meals Planned" },
  { stat: "15K+", label: "Recipes Available" },
];

export const StatsSection: React.FC = () => (
  <section className="py-20 bg-gradient-to-r from-emerald-600 to-blue-600 text-white">
    <div className="max-w-6xl mx-auto grid md:grid-cols-3 text-center gap-10">
      {stats.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: i * 0.2,
            duration: 0.9,
            ease: "easeOut",
          }}
        >
          <div className="text-4xl font-bold mb-2">{item.stat}</div>
          <div className="text-emerald-100">{item.label}</div>
        </motion.div>
      ))}
    </div>
  </section>
);

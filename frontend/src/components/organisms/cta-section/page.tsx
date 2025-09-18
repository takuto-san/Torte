"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export const CtaSection: React.FC = () => (
  <section className="py-20 bg-white text-center">
    <motion.h2
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="text-3xl font-bold mb-4"
    >
      Ready to Transform Your Nutrition?
    </motion.h2>
    <p className="text-xl text-gray-600 mb-8">
      Join thousands who’ve already improved their health with MealMaster.
    </p>
    <Link href="/home" className="bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-emerald-700 transition transform hover:scale-105">
      Start Free Trial
    </Link>
  </section>
);
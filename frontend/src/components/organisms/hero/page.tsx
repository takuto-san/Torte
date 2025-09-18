'use client';
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const Hero: React.FC = () => (
  <section className="pt-32 pb-20 text-center px-4">
    <motion.h1
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-5xl sm:text-6xl font-bold leading-tight mb-6"
    >
      Master Your <span className="text-emerald-600">Nutrition</span>,<br />
      <span className="text-blue-600">Transform Your Life</span>
    </motion.h1>
    <motion.p
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.8 }}
      className="text-xl text-gray-600 max-w-2xl mx-auto mb-8"
    >
      Plan meals, track your macros, and achieve your health goals with
      MealMaster — the all-in-one nutrition platform.
    </motion.p>
    <motion.div
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="flex flex-col sm:flex-row gap-4 justify-center"
    >
      <Link 
        href="/record"
        className="bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-emerald-700 transition transform hover:scale-105 inline-block"
      >
        Start Your Journey
      </Link>
    </motion.div>
  </section>
);

export default Hero;
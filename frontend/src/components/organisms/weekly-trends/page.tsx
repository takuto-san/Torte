import React from "react";
import type { WeeklyTrendsProps } from '@/types/propsTypes';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const WeeklyTrends: React.FC<WeeklyTrendsProps> = ({ weeklyChartData }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Weekly Trends
      </h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={weeklyChartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="calories" fill="#10B981" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
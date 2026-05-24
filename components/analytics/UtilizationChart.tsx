"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const DATA = [
  { day: "Mon", calcs: 64, alerts: 8 },
  { day: "Tue", calcs: 92, alerts: 14 },
  { day: "Wed", calcs: 81, alerts: 11 },
  { day: "Thu", calcs: 110, alerts: 19 },
  { day: "Fri", calcs: 132, alerts: 21 },
  { day: "Sat", calcs: 68, alerts: 6 },
  { day: "Sun", calcs: 51, alerts: 4 },
];

export function UtilizationChart() {
  return (
    <div className="w-full h-72">
      <ResponsiveContainer>
        <AreaChart data={DATA}>
          <defs>
            <linearGradient id="gradC" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#cb0c9f" stopOpacity={0.6} />
              <stop offset="100%" stopColor="#cb0c9f" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradA" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ea0606" stopOpacity={0.5} />
              <stop offset="100%" stopColor="#ea0606" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
          <XAxis dataKey="day" stroke="#8392ab" fontSize={12} />
          <YAxis stroke="#8392ab" fontSize={12} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="calcs"
            stroke="#cb0c9f"
            strokeWidth={2}
            fill="url(#gradC)"
            name="Calculations"
          />
          <Area
            type="monotone"
            dataKey="alerts"
            stroke="#ea0606"
            strokeWidth={2}
            fill="url(#gradA)"
            name="Alerts"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

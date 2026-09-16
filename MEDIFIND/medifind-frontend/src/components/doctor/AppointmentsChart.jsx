import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
} from "recharts";

const data = [
  { day: "Mon", appointments: 12 },
  { day: "Tue", appointments: 20 },
  { day: "Wed", appointments: 20 },
  { day: "Thu", appointments: 32 },
  { day: "Fri", appointments: 16 },
  { day: "Sat", appointments: 22 },
  { day: "Sun", appointments: 11 },
];

export default function AppointmentsChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-slate-100 bg-white p-6 shadow-lg"
    >
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-800">
            Weekly Appointments Overview
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Appointment activity this week
          </p>
        </div>

        <select
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 outline-none focus:border-[#14B8A6]"
          defaultValue="week"
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>

      {/* Chart */}
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 5,
            }}
          >
            <defs>
              <linearGradient
                id="appointmentGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#14B8A6"
                  stopOpacity={0.3}
                />

                <stop
                  offset="100%"
                  stopColor="#14B8A6"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E2E8F0"
            />

            <XAxis
              dataKey="day"
              tick={{
                fontSize: 12,
                fill: "#64748B",
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{
                fontSize: 12,
                fill: "#64748B",
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #E2E8F0",
                boxShadow:
                  "0 10px 25px rgba(15,23,42,0.08)",
              }}
            />

            <Area
              type="monotone"
              dataKey="appointments"
              stroke="none"
              fill="url(#appointmentGradient)"
            />

            <Line
              type="monotone"
              dataKey="appointments"
              stroke="#0891B2"
              strokeWidth={3}
              dot={{
                r: 4,
                fill: "#0891B2",
                strokeWidth: 2,
                stroke: "#FFFFFF",
              }}
              activeDot={{
                r: 7,
                fill: "#14B8A6",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
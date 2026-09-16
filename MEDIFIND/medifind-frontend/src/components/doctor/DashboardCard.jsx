import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function DashboardCard({
  title,
  value,
  icon: Icon,
  color = "bg-blue-600",
  trend = "up",
  change = "",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -8,
        scale: 1.03,
      }}
      transition={{
        duration: 0.35,
      }}
      className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-6 shadow-card"
    >
      {/* LEFT SIDE */}
      <div>
        <p className="text-sm font-medium text-slate-500">
          {title}
        </p>

        {/* NUMBER */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.2,
          }}
          className="mt-3 text-4xl font-bold text-slate-800"
        >
          {value}
        </motion.h2>

        {/* TREND */}
        <div
          className={`mt-3 flex items-center gap-1 text-sm ${
            trend === "up"
              ? "text-emerald-600"
              : "text-red-500"
          }`}
        >
          {trend === "up" ? (
            <TrendingUp size={16} />
          ) : (
            <TrendingDown size={16} />
          )}

          <span>{change}</span>
        </div>
      </div>

      {/* RIGHT ICON */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: 1,
          scale: 1,
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 0.6,
          delay: 0.2,
        }}
        className={`${color} flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-lg`}
      >
        {Icon ? <Icon size={30} strokeWidth={2} /> : null}
      </motion.div>
    </motion.div>
  );
}
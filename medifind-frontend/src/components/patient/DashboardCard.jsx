import React from "react";
import { motion } from "framer-motion";

export default function DashboardCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = "text-[#14B8A6]",
  iconBg = "bg-teal-50",
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      whileHover={{
        y: -5,
        transition: {
          duration: 0.2,
        },
      }}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-lg"
    >
      <div className="flex items-start justify-between">

        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h3 className="mt-2 text-3xl font-bold text-[#0F172A]">
            {value}
          </h3>

          <p className="mt-1 text-xs text-slate-400">
            {subtitle}
          </p>
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}
        >
          <Icon size={23} />
        </div>

      </div>
    </motion.div>
  );
}
import React from "react";
import { motion } from "framer-motion";
import {
  Bell,
  CalendarDays,
  FileText,
  CheckCircle2,
} from "lucide-react";

const notifications = [
  {
    title: "Appointment confirmed",
    message: "Dr. Priya Sharma • Today 5:30 PM",
    icon: CalendarDays,
  },
  {
    title: "Medical record uploaded",
    message: "Your latest report is available",
    icon: FileText,
  },
  {
    title: "Appointment reminder",
    message: "Your consultation starts soon",
    icon: Bell,
  },
];

export default function NotificationPanel() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="flex items-center justify-between border-b border-slate-100 p-5">

        <div>
          <h2 className="font-bold text-slate-800">
            Notifications
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            Latest updates
          </p>
        </div>

        <CheckCircle2
          size={20}
          className="text-[#14B8A6]"
        />

      </div>

      <div className="divide-y divide-slate-100">

        {notifications.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              initial={{
                opacity: 0,
                x: 15,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: index * 0.1,
              }}
              className="flex gap-3 p-4 hover:bg-slate-50"
            >

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-[#14B8A6]">
                <Icon size={18} />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-700">
                  {item.title}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {item.message}
                </p>
              </div>

            </motion.div>
          );
        })}

      </div>
    </div>
  );
}
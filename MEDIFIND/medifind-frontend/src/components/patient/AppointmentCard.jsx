import React from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock,
  Video,
  MapPin,
  CheckCircle2,
} from "lucide-react";

export default function AppointmentCard({
  doctor = "Dr. Priya Sharma",
  specialty = "Cardiologist",
  date = "Today",
  time = "5:30 PM",
  location = "MediFind Clinic",
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
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-50 text-[#14B8A6]">
            <span className="text-xl font-bold">
              {doctor
                .split(" ")
                .slice(1, 3)
                .map((x) => x[0])
                .join("")}
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-800">
                {doctor}
              </h3>

              <CheckCircle2
                size={16}
                className="text-[#14B8A6]"
              />
            </div>

            <p className="text-sm text-slate-500">
              {specialty}
            </p>

            <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-400">

              <span className="flex items-center gap-1">
                <CalendarDays size={13} />
                {date}
              </span>

              <span className="flex items-center gap-1">
                <Clock size={13} />
                {time}
              </span>

              <span className="flex items-center gap-1">
                <MapPin size={13} />
                {location}
              </span>

            </div>
          </div>
        </div>

        <div className="flex gap-2">

          <button className="flex items-center gap-2 rounded-xl bg-[#14B8A6] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-600">
            <Video size={17} />
            Join Call
          </button>

          <button className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">
            Details
          </button>

        </div>

      </div>
    </motion.div>
  );
}
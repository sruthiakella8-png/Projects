import React from "react";
import { useNavigate } from "react-router-dom";
import { CalendarDays } from "lucide-react";

const upcoming = [
  {
    date: "Tomorrow, 25 May",
    time: "09:00 AM – 10:00 AM",
    patient: "Rohan Mehta",
  },
  {
    date: "Tomorrow, 25 May",
    time: "11:30 AM – 12:30 PM",
    patient: "Anjali Desai",
  },
  {
    date: "26 May, Monday",
    time: "02:00 PM – 03:00 PM",
    patient: "Sunil Patil",
  },
];

export default function UpcomingAppointments() {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">

      <h2 className="mb-5 text-lg font-bold text-slate-900">
        Upcoming Appointments
      </h2>

      <div className="space-y-1">

        {upcoming.map((item, index) => (
          <div
            key={index}
            className="flex gap-4 border-b border-slate-100 py-4 last:border-0"
          >

            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-teal-50 text-[#14B8A6]">
              <CalendarDays size={19} />
            </div>

            <div>

              <p className="font-semibold text-slate-800">
                {item.date}
              </p>

              <p className="text-xs text-slate-500">
                {item.time}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                • {item.patient}
              </p>

            </div>

          </div>
        ))}

      </div>

      <button
        type="button"
        onClick={() => navigate("/doctor/appointments")}
        className="mt-5 w-full text-center font-semibold text-[#2563EB] hover:underline"
      >
        View All Appointments →
      </button>

    </div>
  );
}
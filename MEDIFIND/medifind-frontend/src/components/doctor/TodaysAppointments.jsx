import React from "react";
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";

const appointments = [
  {
    time: "10:00 AM",
    patient: "Ramesh Kumar",
    problem: "Fever",
    status: "Confirmed",
  },
  {
    time: "11:00 AM",
    patient: "Priya Nair",
    problem: "PCOD",
    status: "Pending",
  },
  {
    time: "12:00 PM",
    patient: "Arun Verma",
    problem: "Diabetes",
    status: "Confirmed",
  },
  {
    time: "02:00 PM",
    patient: "Sneha Reddy",
    problem: "Thyroid",
    status: "Pending",
  },
  {
    time: "04:00 PM",
    patient: "Vikram Singh",
    problem: "Back Pain",
    status: "Confirmed",
  },
];

export default function TodaysAppointments() {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-card">

      {/* HEADER */}

      <div className="mb-5 flex items-center justify-between">

        <h2 className="text-lg font-bold text-slate-900">
          Today's Appointments
        </h2>

        <button
          type="button"
          onClick={() => navigate("/doctor/appointments")}
          className="font-semibold text-[#2563EB] hover:underline"
        >
          View All
        </button>

      </div>

      {/* TABLE HEADER */}

      <div className="grid grid-cols-4 border-b border-slate-100 pb-3 text-xs font-medium text-slate-400">

        <span>Time</span>
        <span>Patient</span>
        <span>Problem</span>
        <span>Status</span>

      </div>

      {/* APPOINTMENTS */}

      <div>

        {appointments.map((appointment) => (
          <div
            key={`${appointment.time}-${appointment.patient}`}
            className="grid grid-cols-4 items-center border-b border-slate-100 py-4 text-sm last:border-b-0"
          >

            <span className="text-slate-600">
              {appointment.time}
            </span>

            <span className="font-medium text-slate-800">
              {appointment.patient}
            </span>

            <span className="text-slate-500">
              {appointment.problem}
            </span>

            <span>
              <span
                className={`
                  inline-flex
                  rounded-full
                  px-3
                  py-1
                  text-xs
                  font-medium
                  ${
                    appointment.status === "Confirmed"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-orange-50 text-orange-500"
                  }
                `}
              >
                {appointment.status}
              </span>
            </span>

          </div>
        ))}

      </div>

    </div>
  );
}
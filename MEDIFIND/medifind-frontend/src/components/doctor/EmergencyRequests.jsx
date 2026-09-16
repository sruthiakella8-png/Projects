import React from "react";
import { useNavigate } from "react-router-dom";
import { Siren } from "lucide-react";

const emergencies = [
  {
    title: "Severe Abdominal Pain",
    patient: "Gayatri R.",
    priority: "High",
  },
  {
    title: "Breathing Difficulty",
    patient: "Mahesh T.",
    priority: "High",
  },
  {
    title: "Heavy Bleeding",
    patient: "Neha S.",
    priority: "Medium",
  },
];

export default function EmergencyRequests() {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">

      <div className="mb-5 flex items-center justify-between">

        <h2 className="text-lg font-bold text-slate-900">
          Emergency Requests
        </h2>

        <button
          type="button"
          onClick={() => navigate("/doctor/emergency")}
          className="font-semibold text-[#2563EB] hover:underline"
        >
          View All
        </button>

      </div>

      <div className="space-y-5">

        {emergencies.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3"
          >

            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-50 text-red-500">
              <Siren size={19} />
            </div>

            <div className="min-w-0 flex-1">

              <p className="truncate font-semibold text-slate-800">
                {item.title}
              </p>

              <p className="text-xs text-slate-400">
                Patient: {item.patient}
              </p>

            </div>

            <span
              className={`
                rounded-full
                px-3
                py-1
                text-xs
                font-medium
                ${
                  item.priority === "High"
                    ? "bg-red-50 text-red-500"
                    : "bg-orange-50 text-orange-500"
                }
              `}
            >
              {item.priority}
            </span>

          </div>
        ))}

      </div>

    </div>
  );
}
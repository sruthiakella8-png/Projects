import React from "react";
import { useNavigate } from "react-router-dom";

import {
  FilePlus2,
  UserPlus,
  CalendarCheck,
  FileText,
} from "lucide-react";

export default function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "New Prescription",
      icon: FilePlus2,
      path: "/doctor/prescriptions",
      bg: "bg-emerald-50",
      color: "text-[#14B8A6]",
    },
    {
      title: "Add Patient",
      icon: UserPlus,
      path: "/doctor/patients",
      bg: "bg-blue-50",
      color: "text-[#2563EB]",
    },
    {
      title: "Check Availability",
      icon: CalendarCheck,
      path: "/doctor/schedule",
      bg: "bg-emerald-50",
      color: "text-[#14B8A6]",
    },
    {
      title: "Medical Reports",
      icon: FileText,
      path: "/doctor/medical-records",
      bg: "bg-indigo-50",
      color: "text-indigo-500",
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">

      <h2 className="mb-5 text-lg font-bold text-slate-900">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-4">

        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              type="button"
              onClick={() => navigate(action.path)}
              className="
                group
                rounded-xl
                border
                border-slate-100
                p-5
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-lg
              "
            >

              <div
                className={`
                  mx-auto
                  mb-3
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-xl
                  ${action.bg}
                  ${action.color}
                  transition
                  duration-300
                  group-hover:scale-110
                `}
              >
                <Icon size={24} />
              </div>

              <p className="text-sm font-semibold text-slate-700">
                {action.title}
              </p>

            </button>
          );
        })}

      </div>

    </div>
  );
}
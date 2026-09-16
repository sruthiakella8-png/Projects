import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Stethoscope,
  Building2,
  FlaskConical,
  Pill,
} from "lucide-react";

const actions = [
  {
    title: "Find Doctor",
    description: "Nearby doctors",
    path: "/patient/doctors",
    icon: Stethoscope,
    color: "from-teal-500 to-emerald-500",
  },
  {
    title: "Hospitals",
    description: "Nearby hospitals",
    path: "/patient/hospitals",
    icon: Building2,
    color: "from-cyan-500 to-blue-500",
  },
  {
    title: "Diagnostics",
    description: "Labs near you",
    path: "/patient/diagnostics",
    icon: FlaskConical,
    color: "from-violet-500 to-purple-500",
  },
  {
    title: "Pharmacies",
    description: "Medicines nearby",
    path: "/patient/pharmacies",
    icon: Pill,
    color: "from-orange-500 to-amber-500",
  },
];

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

      {actions.map((action, index) => {
        const Icon = action.icon;

        return (
          <motion.button
            key={action.title}
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.08,
            }}
            whileHover={{
              y: -5,
            }}
            onClick={() => navigate(action.path)}
            className="group rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:shadow-lg"
          >
            <div
              className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${action.color} text-white`}
            >
              <Icon size={23} />
            </div>

            <h3 className="font-bold text-slate-800">
              {action.title}
            </h3>

            <p className="mt-1 text-xs text-slate-400">
              {action.description}
            </p>

            <p className="mt-3 text-xs font-semibold text-[#0891B2]">
              Explore →
            </p>
          </motion.button>
        );
      })}
    </div>
  );
}
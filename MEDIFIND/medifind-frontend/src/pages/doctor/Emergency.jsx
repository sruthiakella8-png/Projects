import React from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Phone,
  Clock,
  User,
  MapPin,
  CheckCircle,
} from "lucide-react";

const emergencyCases = [
  {
    id: 1,
    patient: "Gayatri R.",
    problem: "Severe Abdominal Pain",
    priority: "High",
    time: "10 minutes ago",
    location: "Emergency Room",
  },
  {
    id: 2,
    patient: "Mahesh T.",
    problem: "Breathing Difficulty",
    priority: "High",
    time: "25 minutes ago",
    location: "Emergency Room",
  },
  {
    id: 3,
    patient: "Neha S.",
    problem: "Heavy Bleeding",
    priority: "Medium",
    time: "40 minutes ago",
    location: "General Ward",
  },
];

export default function Emergency() {
  return (
    <div className="space-y-6">

      {/* ==========================================
          HEADER
      =========================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
      >
        <h1 className="text-3xl font-bold text-slate-800">
          Emergency Cases
        </h1>

        <p className="mt-1 text-slate-500">
          Monitor and manage emergency patient requests.
        </p>
      </motion.div>

      {/* ==========================================
          SUMMARY
      =========================================== */}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

        <div className="rounded-2xl bg-white p-6 shadow-md">
          <div className="flex items-center gap-4">

            <div className="rounded-xl bg-red-100 p-3">
              <AlertTriangle
                className="text-red-600"
                size={25}
              />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Total Emergencies
              </p>

              <h2 className="text-3xl font-bold text-slate-800">
                6
              </h2>
            </div>

          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-md">
          <div className="flex items-center gap-4">

            <div className="rounded-xl bg-orange-100 p-3">
              <Clock
                className="text-orange-600"
                size={25}
              />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Waiting
              </p>

              <h2 className="text-3xl font-bold text-slate-800">
                3
              </h2>
            </div>

          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-md">
          <div className="flex items-center gap-4">

            <div className="rounded-xl bg-emerald-100 p-3">
              <CheckCircle
                className="text-emerald-600"
                size={25}
              />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Resolved
              </p>

              <h2 className="text-3xl font-bold text-slate-800">
                12
              </h2>
            </div>

          </div>
        </div>

      </div>

      {/* ==========================================
          EMERGENCY LIST
      =========================================== */}

      <div className="overflow-hidden rounded-2xl bg-white shadow-md">

        <div className="border-b p-6">
          <h2 className="text-xl font-bold text-slate-800">
            Active Emergency Requests
          </h2>
        </div>

        <div className="divide-y">

          {emergencyCases.map((item, index) => (

            <motion.div
              key={item.id}
              initial={{
                opacity: 0,
                x: -20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: index * 0.1,
              }}
              className="flex flex-col gap-4 p-6 transition hover:bg-slate-50 md:flex-row md:items-center md:justify-between"
            >

              <div className="flex items-center gap-4">

                <div className="rounded-full bg-red-100 p-3">
                  <AlertTriangle
                    className="text-red-600"
                    size={22}
                  />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-800">
                    {item.problem}
                  </h3>

                  <div className="mt-1 flex flex-wrap gap-4 text-sm text-slate-500">

                    <span className="flex items-center gap-1">
                      <User size={15} />
                      {item.patient}
                    </span>

                    <span className="flex items-center gap-1">
                      <Clock size={15} />
                      {item.time}
                    </span>

                    <span className="flex items-center gap-1">
                      <MapPin size={15} />
                      {item.location}
                    </span>

                  </div>
                </div>

              </div>

              <div className="flex items-center gap-3">

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    item.priority === "High"
                      ? "bg-red-100 text-red-600"
                      : "bg-orange-100 text-orange-600"
                  }`}
                >
                  {item.priority}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    alert(`Calling ${item.patient}`)
                  }
                  className="rounded-xl bg-blue-600 p-3 text-white transition hover:bg-blue-700"
                  title="Call patient"
                >
                  <Phone size={18} />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    alert(
                      `${item.patient}'s emergency case accepted`
                    )
                  }
                  className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                  Accept
                </button>

              </div>

            </motion.div>

          ))}

        </div>
      </div>

    </div>
  );
}
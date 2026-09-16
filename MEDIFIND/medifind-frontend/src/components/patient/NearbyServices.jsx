import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Navigation,
  Stethoscope,
  Building2,
  FlaskConical,
  Pill,
} from "lucide-react";

const services = [
  {
    title: "Doctors",
    count: "12 nearby",
    distance: "1.2 km",
    icon: Stethoscope,
    path: "/patient/doctors",
  },
  {
    title: "Hospitals",
    count: "5 nearby",
    distance: "2.4 km",
    icon: Building2,
    path: "/patient/hospitals",
  },
  {
    title: "Diagnostics",
    count: "8 nearby",
    distance: "0.8 km",
    icon: FlaskConical,
    path: "/patient/diagnostics",
  },
  {
    title: "Pharmacies",
    count: "10 nearby",
    distance: "0.5 km",
    icon: Pill,
    path: "/patient/pharmacies",
  },
];

export default function NearbyServices() {
  const navigate = useNavigate();

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="mb-5 flex items-center justify-between">

        <div>
          <h2 className="font-bold text-slate-800">
            Healthcare Near You
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            Based on your current GPS location
          </p>
        </div>

        <button className="flex items-center gap-1 rounded-lg bg-teal-50 px-3 py-2 text-xs font-semibold text-[#0891B2]">
          <Navigation size={14} />
          GPS Active
        </button>

      </div>

      {/* Map placeholder */}
      <div className="relative mb-5 h-56 overflow-hidden rounded-2xl bg-gradient-to-br from-teal-50 via-cyan-50 to-slate-100">

        {/* grid */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)",
            backgroundSize: "35px 35px",
          }}
        />

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">

          <motion.div
            animate={{
              scale: [1, 1.15, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
            }}
            className="absolute -inset-4 rounded-full bg-teal-400/20"
          />

          <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#14B8A6] text-white shadow-xl">
            <MapPin size={25} />
          </div>

        </div>

        <div className="absolute left-[20%] top-[25%] text-[#0891B2]">
          <Stethoscope size={25} />
        </div>

        <div className="absolute right-[20%] top-[30%] text-blue-600">
          <Building2 size={25} />
        </div>

        <div className="absolute bottom-[25%] left-[25%] text-violet-600">
          <FlaskConical size={25} />
        </div>

        <div className="absolute bottom-[20%] right-[28%] text-orange-500">
          <Pill size={25} />
        </div>

        <div className="absolute bottom-3 left-3 rounded-lg bg-white/90 px-3 py-2 text-xs shadow">
          <MapPin
            size={13}
            className="mr-1 inline text-[#14B8A6]"
          />
          Current Location
        </div>

      </div>

      {/* Services */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">

        {services.map((service, index) => {
          const Icon = service.icon;

          return (
            <motion.button
              key={service.title}
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.1,
              }}
              onClick={() => navigate(service.path)}
              whileHover={{
                scale: 1.02,
              }}
              className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-left hover:border-teal-200 hover:bg-teal-50"
            >
              <Icon
                size={22}
                className="mb-3 text-[#14B8A6]"
              />

              <p className="text-sm font-bold text-slate-700">
                {service.title}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                {service.count}
              </p>

              <p className="mt-1 text-xs font-semibold text-[#0891B2]">
                {service.distance}
              </p>
            </motion.button>
          );
        })}

      </div>
    </section>
  );
}
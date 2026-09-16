import React, { useEffect, useState } from "react";
import { getPatientDashboard } from "../../api/authAPI";
import { motion } from "framer-motion";
import {
  CalendarDays,
  FileText,
  ClipboardList,
  Video,
  MapPin,
  HeartPulse,
} from "lucide-react";

import DashboardCard from "../../components/patient/DashboardCard";
import AppointmentCard from "../../components/patient/AppointmentCard";
import QuickActions from "../../components/patient/QuickActions";
import NearbyServices from "../../components/patient/NearbyServices";
import NotificationPanel from "../../components/patient/NotificationPanel";

const stats = [
  {
    title: "Upcoming Appointments",
    value: "2",
    subtitle: "Scheduled appointments",
    icon: CalendarDays,
    iconBg: "bg-teal-50",
    iconColor: "text-[#14B8A6]",
  },
  {
    title: "Medical Records",
    value: "8",
    subtitle: "Documents available",
    icon: FileText,
    iconBg: "bg-cyan-50",
    iconColor: "text-[#0891B2]",
  },
  {
    title: "Prescriptions",
    value: "3",
    subtitle: "Active prescriptions",
    icon: ClipboardList,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-500",
  },
  {
    title: "Consultations",
    value: "12",
    subtitle: "Completed consultations",
    icon: Video,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
  },
];

export default function PatientDashboard() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
  const fetchUserProfile = async () => {
    try {
      const response = await getPatientDashboard();

      console.log("RESPONSE DATA:", response.data);

      const user = response.data;

      const profile = response.data?.profile;

if (profile?.full_name) {
  setUserName(profile.full_name);
} else {
  console.error("Patient name is missing from dashboard response");
}

    } catch (error) {
      console.error("Dashboard API error:", error);
      console.error("Error response:", error.response);
      console.error("Error response data:", error.response?.data);
    }
  };

  fetchUserProfile();
}, []);

  return (
    <div className="mx-auto max-w-[1600px]">
      {/* Emergency */}
      <motion.section
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="mb-6 flex flex-col gap-4 rounded-2xl bg-gradient-to-r from-red-500 to-rose-600 p-5 text-white sm:flex-row sm:items-center sm:justify-between"
      >

        <div className="flex items-center gap-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
            <HeartPulse size={25} />
          </div>

          <div>
            <h3 className="font-bold">
              Emergency Assistance
            </h3>

            <p className="mt-1 text-sm text-red-100">
              Need immediate medical assistance?
            </p>
          </div>

        </div>

        <button className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-red-600 hover:bg-red-50">
          Emergency SOS
        </button>

      </motion.section>


      {/* Welcome */}
      <motion.section
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="relative mb-6 overflow-hidden rounded-2xl bg-gradient-to-r from-[#0F172A] via-[#123B46] to-[#0891B2] p-6 text-white shadow-xl sm:p-8"
      >

        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-teal-400/10 blur-3xl" />

        <div className="relative max-w-3xl">

          <div className="mb-3 flex items-center gap-2 text-teal-200">
            <MapPin size={17} />
            <span className="text-sm">
              GPS-powered healthcare
            </span>
          </div>

          <h1 className="text-2xl font-bold sm:text-3xl">
  Good Evening, {userName || "User"} 👋
</h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
            Find nearby doctors, hospitals, diagnostics and
            pharmacies. Check doctor availability and book your
            appointment easily.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">

            <button className="rounded-xl bg-[#14B8A6] px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-teal-500">
              Find Nearby Doctor
            </button>

            <button className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/20">
              View Appointments
            </button>

          </div>

        </div>
      </motion.section>

      {/* Stats */}
      <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.08,
            }}
          >
            <DashboardCard {...stat} />
          </motion.div>
        ))}

      </section>

      {/* Nearby services */}
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.25,
        }}
      >
        <NearbyServices />
      </motion.div>

      {/* Quick Actions */}
      <section className="mt-6">

        <div className="mb-4">
          <h2 className="text-xl font-bold text-slate-800">
            Quick Services
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Find healthcare services near your location
          </p>
        </div>

        <QuickActions />

      </section>

      {/* Appointment + notifications */}
      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">

        <section className="xl:col-span-2">

          <div className="mb-4 flex items-center justify-between">

            <div>
              <h2 className="text-xl font-bold text-slate-800">
                Next Appointment
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Your upcoming consultation
              </p>
            </div>

          </div>

          <AppointmentCard />

        </section>

        <NotificationPanel />

      </div>
    </div>
  );
}
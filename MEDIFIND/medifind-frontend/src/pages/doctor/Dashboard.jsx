import React from "react";
import { useOutletContext, useNavigate } from "react-router-dom";

import {
  Calendar,
  Users,
  HeartPulse,
  Clock3,
  ArrowRight,
} from "lucide-react";

import { motion } from "framer-motion";

import DashboardCard from "../../components/doctor/DashboardCard";
import AppointmentsChart from "../../components/doctor/AppointmentsChart";
import TodaysAppointments from "../../components/doctor/TodaysAppointments";
import UpcomingAppointments from "../../components/doctor/UpcomingAppointments";
import EmergencyRequests from "../../components/doctor/EmergencyRequests";
import QuickActions from "../../components/doctor/QuickActions";

export default function Dashboard() {

  const { doctor } = useOutletContext();

  const navigate = useNavigate();
  
  const storedDoctor = JSON.parse(localStorage.getItem("doctor") || "{}");

  const doctorName =
    doctor?.name ||
    doctor?.full_name ||
    doctor?.username ||
    " ";


  const specialization =
    doctor?.specialization ||
    storedDoctor.specialization ||
    storedDoctor.speciality ||
    storedDoctor.specialty ||
    " ";

  return (
    <div className="min-h-full">

      {/* =====================================================
          GREETING
      ===================================================== */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 flex items-center justify-between"
      >

        <div>

          <h1 className="text-3xl font-bold text-slate-900">
            Good Morning, {doctorName.startsWith("Dr.") ? doctorName : `Dr. ${doctorName}`} 👋
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Here's what's happening in your practice today.
          </p>

          <p className="mt-1 text-sm font-medium text-[#14B8A6]">
            {specialization}
          </p>

        </div>

        <div className="hidden rounded-xl border border-slate-200 bg-white px-5 py-3 shadow-sm md:block">

          <p className="text-sm font-medium text-slate-500">
            Today
          </p>

          <p className="font-semibold text-slate-800">
            {new Date().toLocaleDateString("en-IN", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>

        </div>

      </motion.div>

      {/* =====================================================
          STATISTICS
      ===================================================== */}

      <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        <DashboardCard
          title="Today's Appointments"
          value={18}
          icon={Calendar}
          color="bg-blue-600"
          trend="up"
          change="12% from yesterday"
        />

        <DashboardCard
          title="Total Patients"
          value={324}
          icon={Users}
          color="bg-teal-500"
          trend="up"
          change="8% this month"
        />

        <DashboardCard
          title="Emergency Cases"
          value={6}
          icon={HeartPulse}
          color="bg-red-500"
          trend="down"
          change="2% from yesterday"
        />

        <DashboardCard
          title="Available Hours"
          value={8}
          icon={Clock3}
          color="bg-indigo-500"
          trend="up"
          change="4% this week"
        />

      </div>

      {/* =====================================================
          CHART + TODAY APPOINTMENTS
      ===================================================== */}

      <div className="mb-6 grid grid-cols-1 gap-5 xl:grid-cols-3">

        <div className="xl:col-span-2">
          <AppointmentsChart />
        </div>

        <TodaysAppointments
          onViewAll={() => navigate("/doctor/appointments")}
        />

      </div>

      {/* =====================================================
          BOTTOM SECTION
      ===================================================== */}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">

        <UpcomingAppointments
          onViewAll={() => navigate("/doctor/appointments")}
        />

        <EmergencyRequests
          onViewAll={() => navigate("/doctor/emergency")}
        />

        <QuickActions
          onNewPrescription={() =>
            navigate("/doctor/prescriptions")
          }

          onAddPatient={() =>
            navigate("/doctor/patients")
          }

          onAvailability={() =>
            navigate("/doctor/schedule")
          }

          onMedicalReports={() =>
            navigate("/doctor/reports")
          }
        />

      </div>

    </div>
  );
}
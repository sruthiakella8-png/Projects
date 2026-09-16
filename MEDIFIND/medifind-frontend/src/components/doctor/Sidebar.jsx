import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo-gradient.svg";

import {
  Home,
  Calendar,
  Users,
  Bell,
  Clock,
  FileText,
  BarChart2,
  MessageSquare,
  Settings,
  LogOut,
  BadgeCheck,
  UserCircle,
  ShieldAlert,
} from "lucide-react";

import { clearTokens } from "../../utils/tokenService";

const NAV_ITEMS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/doctor/dashboard",
    icon: Home,
  },
  {
    key: "appointments",
    label: "Appointments",
    path: "/doctor/appointments",
    icon: Calendar,
  },
  {
    key: "patients",
    label: "Patients",
    path: "/doctor/patients",
    icon: Users,
  },
  {
    key: "emergency",
    label: "Emergency Cases",
    path: "/doctor/emergency",
    icon: Bell,
  },
  {
    key: "availability",
    label: "Availability",
    path: "/doctor/schedule",
    icon: Clock,
  },
  {
    key: "prescriptions",
    label: "Prescriptions",
    path: "/doctor/prescriptions",
    icon: FileText,
  },
  {
    key: "reports",
    label: "Reports",
    path: "/doctor/reports",
    icon: BarChart2,
  },
  {
    key: "messages",
    label: "Messages",
    path: "/doctor/notifications",
    icon: MessageSquare,
  },
  {
    key: "profile",
    label: "Profile",
    path: "/doctor/profile",
    icon: UserCircle,
  },
  {
    key: "settings",
    label: "Settings",
    path: "/doctor/settings",
    icon: Settings,
  },
];

export default function DoctorSidebar({
  doctor = {},
}) {
  const navigate = useNavigate();
  const location = useLocation();
  
  const storedDoctor = JSON.parse(localStorage.getItem("doctor") || "{}");

  const doctorName =
   doctor?.name ||
   storedDoctor.name ||
   storedDoctor.full_name ||
   storedDoctor.username ||
   " ";

  const specialization =
  doctor?.specialization ||
  storedDoctor.specialization ||
  storedDoctor.speciality ||
  storedDoctor.specialty ||
  " ";

  const doctorId =
   doctor?.id ||
   storedDoctor.id ||
   storedDoctor.doctor_id ||
   "";

  const avatarUrl =
    doctor?.avatarUrl ||
    storedDoctor.avatarUrl ||
    storedDoctor.profile_image ||
    "";

const isVerified =
  doctor?.is_verified ??
  storedDoctor.is_verified ??
  false;
  const handleLogout = () => {
    clearTokens();

    localStorage.removeItem("doctor");

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <aside className="flex h-screen w-72 flex-shrink-0 flex-col bg-slate-800 text-white shadow-xl">

      {/* ================================================= */}
      {/* BRAND */}
      {/* ================================================= */}

      <div className="flex-shrink-0 px-5 py-5">

        <div className="flex items-center gap-3">

          {/* GPS LOGO */}
          <div className="h-12 w-12 rounded-xl overflow-hidden shadow-lg">
              <img
                src={logo}
                alt="MediFind"
                className="h-full w-full object-contain"
              />
        </div>
          <div>
            <h1 className="text-xl font-bold">
              <span className="text-[#2563EB]">
                Medi
              </span>
              <span className="text-[#14B8A6]">
                Find
              </span>
            </h1>

            <p className="text-xs text-slate-400">
              Doctor Portal
            </p>
          </div>

        </div>

      </div>


      {/* ================================================= */}
      {/* NAVIGATION */}
      {/* ================================================= */}

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-3">

        {NAV_ITEMS.map((item) => {

          const Icon = item.icon;

          const isActive =
            location.pathname === item.path ||
            (
              item.key !== "dashboard" &&
              location.pathname.startsWith(item.path)
            );

          return (
            <button
              key={item.key}
              type="button"
              onClick={() => navigate(item.path)}
              className={`group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-[#2563EB] to-[#14B8A6] text-white shadow-lg"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >

              <Icon
                size={20}
                className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
              />

              <span>
                {item.label}
              </span>

            </button>
          );
        })}

      </nav>


      {/* ================================================= */}
      {/* DOCTOR PROFILE + LOGOUT */}
      {/* ================================================= */}

      <div className="flex-shrink-0 border-t border-white/10 bg-slate-800 px-4 py-4">

        {/* PROFILE */}

        <button
          type="button"
          onClick={() => navigate("/doctor/profile")}
          className="group flex w-full items-center gap-3 rounded-xl p-2 text-left transition hover:bg-white/5"
        >

          {/* REAL IMAGE IF AVAILABLE */}
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={doctorName}
              className="h-12 w-12 rounded-full border-2 border-[#14B8A6] object-cover"
            />
          ) : (
            /* INITIAL AVATAR */
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#14B8A6] bg-gradient-to-br from-[#2563EB] to-[#14B8A6] text-lg font-bold">
              {doctorName
                .replace("Dr. ", "")
                .charAt(0)
                .toUpperCase()}
            </div>
          )}

          <div className="min-w-0 flex-1">

            <p className="truncate text-sm font-bold text-white">
              {doctorName && !doctorName.startsWith("Dr.")
                ? `Dr. ${doctorName}`
               : doctorName}
            </p>

            <p className="truncate text-xs text-slate-400">
              {specialization}
            </p>

            <p className="text-[10px] text-slate-500">
             {doctorId}
            </p>

          </div>

          <UserCircle
            size={18}
            className="text-slate-500 transition group-hover:text-white"
          />

        </button>


        {/* Verification Status */}

      <div className="mt-2 flex justify-center">

        {isVerified ? (

          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold text-emerald-400">

           <BadgeCheck size={12} />

            Verified

          </span>

        ) : (

        <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-[10px] font-semibold text-amber-400">

         <ShieldAlert size={12} />

          Pending Approval

        </span>

        )}

      </div>

        {/* LOGOUT */}

        <button
          type="button"
          onClick={handleLogout}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-slate-300 transition-all duration-300 hover:border-red-400/30 hover:bg-red-500/10 hover:text-red-400"
        >

          <LogOut size={17} />

          <span>
            Logout
          </span>

        </button>

      </div>

    </aside>
  );
}
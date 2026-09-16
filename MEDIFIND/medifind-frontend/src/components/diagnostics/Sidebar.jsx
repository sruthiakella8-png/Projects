import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Home,
  FlaskConical,
  ShoppingCart,
  Users,
  FileText,
  MessageSquare,
  BadgeCheck,
  UserCircle,
  Settings,
  LogOut,
} from "lucide-react";

import { clearTokens } from "../../utils/tokenService";

const NAV_ITEMS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/diagnostics/dashboard",
    icon: Home,
  },
  {
    key: "tests",
    label: "Tests",
    path: "/diagnostics/tests",
    icon: FlaskConical,
  },
  {
    key: "orders",
    label: "Orders",
    path: "/diagnostics/orders",
    icon: ShoppingCart,
  },
  {
    key: "patients",
    label: "Patients",
    path: "/diagnostics/patients",
    icon: Users,
  },
  {
    key: "reports",
    label: "Reports",
    path: "/diagnostics/reports",
    icon: FileText,
  },
  {
    key: "messages",
    label: "Messages",
    path: "/diagnostics/messages",
    icon: MessageSquare,
  },
  {
    key: "verification",
    label: "Verification",
    path: "/diagnostics/verification",
    icon: BadgeCheck,
  },
  {
    key: "profile",
    label: "Profile",
    path: "/diagnostics/profile",
    icon: UserCircle,
  },
  {
    key: "settings",
    label: "Settings",
    path: "/diagnostics/settings",
    icon: Settings,
  },
];

export default function DiagnosticSidebar({
  diagnostic = {},
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const diagnosticName =
    diagnostic?.name ||
    diagnostic?.center_name ||
    localStorage.getItem("diagnostic_name") ||
    "Diagnostic Center";

  const diagnosticId =
    diagnostic?.id ||
    localStorage.getItem("diagnostic_id") ||
    "DIAG0001";

  const avatarUrl =
    diagnostic?.avatarUrl ||
    localStorage.getItem("diagnostic_avatar");

  const verificationStatus =
    diagnostic?.verification_status ||
    localStorage.getItem("diagnostic_verification_status") ||
    "Pending";

  const handleLogout = () => {
    clearTokens();

    localStorage.removeItem("diagnostic_name");
    localStorage.removeItem("diagnostic_id");
    localStorage.removeItem("diagnostic_avatar");
    localStorage.removeItem("diagnostic_verification_status");

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <aside className="flex h-screen w-72 flex-shrink-0 flex-col bg-[#0F172A] text-white shadow-xl">

      {/* ================================================= */}
      {/* BRAND */}
      {/* ================================================= */}

      <div className="flex-shrink-0 px-5 py-5">

        <div className="flex items-center gap-3">

          {/* LOGO */}

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#2563EB] to-[#14B8A6] shadow-lg">

            <span className="text-2xl">
              📍
            </span>

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
              Diagnostics Portal
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
      {/* DIAGNOSTIC PROFILE + LOGOUT */}
      {/* ================================================= */}

      <div className="flex-shrink-0 border-t border-white/10 bg-[#0F172A] px-4 py-4">

        {/* PROFILE */}

        <button
          type="button"
          onClick={() => navigate("/diagnostics/profile")}
          className="group flex w-full items-center gap-3 rounded-xl p-2 text-left transition hover:bg-white/5"
        >

          {/* REAL IMAGE IF AVAILABLE */}

          {avatarUrl ? (

            <img
              src={avatarUrl}
              alt={diagnosticName}
              className="h-12 w-12 rounded-full border-2 border-[#14B8A6] object-cover"
            />

          ) : (

            /* INITIAL AVATAR */

            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#14B8A6] bg-gradient-to-br from-[#2563EB] to-[#14B8A6] text-lg font-bold">

              {diagnosticName
                .charAt(0)
                .toUpperCase()}

            </div>

          )}

          <div className="min-w-0 flex-1">

            <p className="truncate text-sm font-bold text-white">
              {diagnosticName}
            </p>

            <p className="truncate text-xs text-slate-400">
              Diagnostic Center
            </p>

            <p className="text-[10px] text-slate-500">
              {diagnosticId}
            </p>

          </div>

          <UserCircle
            size={18}
            className="text-slate-500 transition group-hover:text-white"
          />

        </button>


        {/* VERIFICATION STATUS */}

        <div className="mt-2 flex justify-center">

          <span
            className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-medium ${
              verificationStatus.toLowerCase() === "verified"
                ? "bg-emerald-500/10 text-emerald-400"
                : verificationStatus.toLowerCase() === "rejected"
                ? "bg-red-500/10 text-red-400"
                : "bg-amber-500/10 text-amber-400"
            }`}
          >

            <BadgeCheck size={12} />

            {verificationStatus}

          </span>

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
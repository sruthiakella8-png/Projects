import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  Home,
  Stethoscope,
  Building2,
  FlaskConical,
  Pill,
  CalendarDays,
  FileText,
  ClipboardList,
  MessageSquare,
  Bell,
  HeartPulse,
  User,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

const mainItems = [
  {
    name: "Dashboard",
    path: "/patient/dashboard",
    icon: Home,
  },
  {
    name: "Find Doctor",
    path: "/patient/doctors",
    icon: Stethoscope,
  },
  {
    name: "Diagnostics",
    path: "/patient/diagnostics",
    icon: FlaskConical,
  },
  {
    name: "Pharmacies",
    path: "/patient/pharmacies",
    icon: Pill,
  },
  {
    name: "Appointments",
    path: "/patient/appointments",
    icon: CalendarDays,
  },
  {
    name: "Medical Records",
    path: "/patient/records",
    icon: FileText,
  },
  {
    name: "Prescriptions",
    path: "/patient/prescriptions",
    icon: ClipboardList,
  },
  {
    name: "Messages",
    path: "/patient/messages",
    icon: MessageSquare,
  },
  {
    name: "Notifications",
    path: "/patient/notifications",
    icon: Bell,
  },
];

const bottomItems = [
  {
    name: "Emergency",
    path: "/patient/emergency",
    icon: HeartPulse,
  },
  {
    name: "Profile",
    path: "/patient/profile",
    icon: User,
  },
  {
    name: "Settings",
    path: "/patient/settings",
    icon: Settings,
  },
];

export default function Sidebar({
  collapsed = false,
  setCollapsed,
  mobile = false,
  onClose,
}) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <motion.aside
      animate={{
        width: mobile ? 280 : collapsed ? 82 : 260,
      }}
      transition={{
        duration: 0.3,
      }}

      className="fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-slate-200 bg-white shadow-xl"
      className="fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-slate-200 bg-slate-800 shadow-xl"
      className="fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-slate-200 bg-slate-800 shadow-xl"
    >

      {/* Logo */}
      <div className="flex h-20 items-center border-b border-slate-100 px-4">

        <div className="flex items-center gap-3">

          {/* GPS LOGO */}
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#14B8A6] to-[#0891B2] text-white shadow-lg shadow-teal-100">
            <MapPin size={25} strokeWidth={2.5} />
          </div>

          {(!collapsed || mobile) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h1 className="text-xl font-bold text-white">
                Medi<span className="text-[#14B8A6]">Find</span>
              </h1>

              <p className="text-[10px] font-semibold uppercase tracking-wider text-white">
                Patient Portal
              </p>
            </motion.div>
          )}
        </div>

        {mobile && (
          <button
            onClick={onClose}
            className="ml-auto rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Collapse button */}
      {!mobile && setCollapsed && (
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-24 flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-slate-500 text-slate-500 shadow-sm hover:text-[#14B8A6]"
        >
          {collapsed ? (
            <ChevronRight size={15} />
          ) : (
            <ChevronLeft size={15} />
          )}
        </button>
      )}

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-5">

        {/* Find nearby label */}
        {(!collapsed || mobile) && (
          <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-white">
            Healthcare
          </p>
        )}

        <nav className="space-y-1">

          {mainItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={mobile ? onClose : undefined}
                title={collapsed ? item.name : ""}
                className={({ isActive }) =>
                  `group relative flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-teal-50 to-cyan-50 text-[#0891B2]"
                      : "text-white hover:bg-slate-50 hover:text-[#0891B2]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span className="absolute left-0 h-6 w-1 rounded-r-full bg-[#14B8A6]" />
                    )}

                    <Icon
                      size={20}
                      className="shrink-0"
                    />

                    {(!collapsed || mobile) && (
                      <span>{item.name}</span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="my-4 border-t border-slate-100" />

        {(!collapsed || mobile) && (
          <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-white">
            Account
          </p>
        )}

        <nav className="space-y-1">

          {bottomItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={mobile ? onClose : undefined}
                title={collapsed ? item.name : ""}
                className={({ isActive }) =>
  `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
    isActive
      ? "bg-teal-50 text-[#0891B2]"
      : item.name === "Emergency"
      ? "text-red-500 hover:bg-red-50"
      : "text-slate-200 hover:bg-slate-50 hover:text-[#0891B2]"
  }`
}
              >
                <Icon size={20} />

                {(!collapsed || mobile) && (
                  <span>{item.name}</span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <div className="border-t border-slate-100 p-3">

        <button
          onClick={logout}
          title={collapsed ? "Logout" : ""}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-red-500 transition hover:bg-red-50"
        >
          <LogOut size={20} />

          {(!collapsed || mobile) && (
            <span>Logout</span>
          )}
        </button>

      </div>
    </motion.aside>
  );
}
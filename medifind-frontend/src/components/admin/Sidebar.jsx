import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  Hospital,
  Activity,
  Pill,
  CalendarDays,
  Siren,
  BarChart3,
  Bell,
  Settings,
  LogOut,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Sidebar = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: Users,
    },
    {
      name: "Doctors",
      path: "/admin/doctors",
      icon: Stethoscope,
    },
    {
      name: "Hospitals",
      path: "/admin/hospitals",
      icon: Hospital,
    },
    {
      name: "Diagnostics",
      path: "/admin/diagnostics",
      icon: Activity,
    },
    {
      name: "Pharmacies",
      path: "/admin/pharmacies",
      icon: Pill,
    },
    {
      name: "Appointments",
      path: "/admin/appointments",
      icon: CalendarDays,
    },
    {
      name: "Emergency",
      path: "/admin/emergency",
      icon: Siren,
    },
    {
      name: "Reports",
      path: "/admin/reports",
      icon: BarChart3,
    },
    {
      name: "Notifications",
      path: "/admin/notifications",
      icon: Bell,
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: Settings,
    },
  ];

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    localStorage.removeItem("token");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("user");

    navigate("/login", { replace: true });
  };

  return (
    <aside
      className={`
        fixed
        left-0
        top-0
        z-40
        h-screen
        bg-slate-900
        text-white
        shadow-xl
        flex
        flex-col
        transition-all
        duration-300
        ${collapsed ? "w-20" : "w-72"}
      `}
    >
      {/* LOGO */}

      <div
        className={`
          h-20
          flex
          items-center
          border-b
          border-slate-700
          ${collapsed ? "justify-center" : "justify-between px-5"}
        `}
      >
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center">
            <MapPin size={25} />
          </div>

          {!collapsed && (
            <div>
              <h1 className="text-xl font-bold">
                MEDIFIND
              </h1>

              <p className="text-xs text-slate-400">
                Admin Panel
              </p>
            </div>
          )}
        </div>

        {!collapsed && (
          <button
            type="button"
            onClick={() => setCollapsed(true)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <ChevronLeft size={20} />
          </button>
        )}
      </div>

      {/* EXPAND BUTTON */}

      {collapsed && (
        <button
          type="button"
          onClick={() => setCollapsed(false)}
          className="absolute -right-3 top-24 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center"
        >
          <ChevronRight size={16} />
        </button>
      )}

      {/* NAVIGATION */}

      <nav className="flex-1 overflow-y-auto px-3 py-5">
        {!collapsed && (
          <p className="px-3 mb-3 text-xs font-semibold text-slate-500 uppercase">
            Main Menu
          </p>
        )}

        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                title={collapsed ? item.name : ""}
                className={({ isActive }) =>
                  `
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  transition
                  ${
                    collapsed
                      ? "justify-center px-3 py-3.5"
                      : "px-3 py-3"
                  }
                  ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }
                  `
                }
              >
                <Icon size={20} />

                {!collapsed && (
                  <span className="text-sm font-medium">
                    {item.name}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* ADMIN PROFILE */}

      {!collapsed && (
        <div className="px-3 pb-3">
          <div className="border-t border-slate-700 pt-4">
            <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-slate-800">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">
                A
              </div>

              <div>
                <p className="text-sm font-semibold">
                  MEDIFIND Admin
                </p>

                <p className="text-xs text-slate-400">
                  Administrator
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LOGOUT */}

      <div className="p-3 border-t border-slate-700">
        <button
          type="button"
          onClick={handleLogout}
          title={collapsed ? "Logout" : ""}
          className={`
            w-full
            flex
            items-center
            gap-3
            rounded-xl
            text-slate-300
            hover:text-red-400
            hover:bg-slate-800
            ${
              collapsed
                ? "justify-center px-3 py-3.5"
                : "px-3 py-3"
            }
          `}
        >
          <LogOut size={20} />

          {!collapsed && (
            <span className="text-sm font-medium">
              Logout
            </span>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
import React from "react";
import {
  Search,
  Bell,
  User,
  ChevronDown,
  Menu,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();

  const handleNotifications = () => {
    navigate("/admin/notifications");
  };

  const handleProfile = () => {
    navigate("/admin/settings");
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm">
      <div className="h-20 px-6 flex items-center justify-between gap-5">

        {/* =================================================
            LEFT SIDE
        ================================================= */}

        <div className="flex items-center gap-4">

          {/* Mobile Menu */}

          <button
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 text-slate-600"
            type="button"
          >
            <Menu size={22} />
          </button>

          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Admin Dashboard
            </h2>

            <p className="hidden sm:block text-sm text-slate-500">
              Manage your MEDIFIND platform
            </p>
          </div>

        </div>

        {/* =================================================
            RIGHT SIDE
        ================================================= */}

        <div className="flex items-center gap-3">

          {/* Search */}

          <div className="hidden md:flex items-center relative">

            <Search
              size={18}
              className="absolute left-3 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search..."
              className="w-56 lg:w-72 pl-10 pr-4 py-2.5 bg-slate-100 border border-transparent rounded-xl outline-none text-sm focus:bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition"
            />

          </div>

          {/* Notifications */}

          <button
            type="button"
            onClick={handleNotifications}
            className="relative p-2.5 rounded-xl text-slate-600 hover:bg-slate-100 transition"
            title="Notifications"
          >

            <Bell size={21} />

            {/* Notification Badge */}

            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full" />

          </button>

          {/* Divider */}

          <div className="hidden sm:block w-px h-8 bg-slate-200" />

          {/* Admin Profile */}

          <button
            type="button"
            onClick={handleProfile}
            className="flex items-center gap-3 p-1.5 pr-2 rounded-xl hover:bg-slate-100 transition"
          >

            {/* Avatar */}

            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
              A
            </div>

            {/* Name */}

            <div className="hidden sm:block text-left">

              <p className="text-sm font-semibold text-slate-700">
                MEDIFIND Admin
              </p>

              <p className="text-xs text-slate-400">
                Administrator
              </p>

            </div>

            <ChevronDown
              size={17}
              className="hidden sm:block text-slate-400"
            />

          </button>

        </div>

      </div>
    </header>
  );
};

export default Topbar;
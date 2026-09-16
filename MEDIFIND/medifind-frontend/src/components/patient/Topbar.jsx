import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  Search,
  Bell,
  MapPin,
  ChevronDown,
} from "lucide-react";
import { getPatientDashboard } from "../../api/authAPI";

export default function Topbar({ onMenuClick }) {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  useEffect(() => {
  const fetchUserProfile = async () => {
    try {
      const response = await getPatientDashboard();
      setUserName(response.data?.profile?.full_name || "");
    } catch (error) {
      console.error("Topbar user API error:", error);
      console.error("STATUS:", error.response?.status);
      console.error("DATA:", error.response?.data);
    }
  };

  fetchUserProfile();
}, []);


  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-gradient-to-r from-teal-200 via-cyan-200 to-sky-200 px-4 shadow-sm backdrop-blur-md sm:px-6 lg:px-8">

      {/* Mobile */}
      <button
        onClick={onMenuClick}
        className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
      >
        <Menu size={22} />
      </button>

      {/* Search */}
      <div className="hidden max-w-xl flex-1 md:flex">
        <div className="relative w-full">

          <Search
            size={19}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search doctors, hospitals, diagnostics..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#14B8A6] focus:bg-white focus:ring-4 focus:ring-teal-50"
          />

        </div>
      </div>

      {/* Right */}
      <div className="ml-auto flex items-center gap-2 sm:gap-4">

        {/* GPS */}
        <button
          onClick={() => navigate("/patient/doctors")}
          className="hidden items-center gap-2 rounded-xl bg-teal-50 px-3 py-2 text-left sm:flex"
        >
          <MapPin
            size={18}
            className="text-[#14B8A6]"
          />

          <div>
            <p className="text-[10px] font-medium uppercase text-slate-400">
              GPS Location
            </p>

            <p className="text-xs font-semibold text-slate-700">
              Current Location
            </p>
          </div>
        </button>

        {/* Notification */}
        <button
          onClick={() => navigate("/patient/notifications")}
          className="relative rounded-xl p-2.5 text-slate-500 hover:bg-teal-50 hover:text-[#14B8A6]"
        >
          <Bell size={21} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        {/* Profile */}
        <button
          onClick={() => navigate("/patient/profile")}
          className="flex items-center gap-2 rounded-xl p-1.5 hover:bg-slate-50"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-teal-100 to-cyan-100 font-bold text-[#0891B2]">
            {userName ? userName.charAt(0).toUpperCase() : "U"}
          </div>

          <div className="hidden text-left md:block">
            <p className="text-sm font-semibold text-slate-700">
              {userName || "Patient"}
            </p>

            <p className="text-xs text-slate-400">
              Patient
            </p>
          </div>

          <ChevronDown
            size={15}
            className="hidden text-slate-400 md:block"
          />
        </button>

      </div>
    </header>
  );
}
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, IdCard } from "lucide-react";
import { getPatientDashboard } from "../../api/authAPI";
export default function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Patient",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getPatientDashboard();
const patient = response.data?.profile;

setProfile((prev) => ({
  ...prev,
  name: patient?.full_name || "Patient",
  email: patient?.email || "Not provided",
  phone: patient?.phone || "Not provided",
  role: patient?.role?.toLowerCase().trim() === "user"
  ? "Patient"
  : patient?.role || "Patient",
}));
      } catch (error) {
        console.error("Dashboard API error:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const initial = profile.name ? profile.name.charAt(0).toUpperCase() : "U";

  return (
    <div className="mx-auto max-w-[1400px]">

      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-slate-800">My Profile</h1>
        <p className="mt-1 text-sm text-slate-400">
          Manage your personal information
        </p>
      </motion.div>

      {/* Profile card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl border border-slate-200 bg-white shadow-sm"
      >

        {/* Card header */}
        <div className="flex items-center gap-4 border-b border-slate-100 p-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-500">
            <User size={27} />
          </div>
          <div>
            <h2 className="font-bold text-slate-800">My Profile</h2>
            <p className="mt-1 text-sm text-slate-400">
              GPS-powered MediFind services
            </p>
          </div>
        </div>

        <div className="p-6">

          {/* Avatar + name/role */}
          <div className="mb-8 flex flex-col items-center gap-5 sm:flex-row">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-teal-100 text-3xl font-bold text-teal-600">
              {initial}
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-bold text-slate-800">
                {profile.name}
              </h3>
              <p className="mt-1 text-slate-500">{profile.role}</p>
            </div>
          </div>

          {/* Read-only fields */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <ReadOnlyField
              label="Full Name"
              value={profile.name}
              icon={User}
            />
            <ReadOnlyField
              label="Email Address"
              value={profile.email}
              icon={Mail}
            />
            <ReadOnlyField
              label="Phone Number"
              value={profile.phone}
              icon={Phone}
            />
            <ReadOnlyField
              label="Role"
              value={profile.role}
              icon={IdCard}
            />
          </div>

        </div>

      </motion.div>

    </div>
  );
}

// =========================================================
// READ-ONLY FIELD
// =========================================================

const ReadOnlyField = ({ label, value, icon: Icon }) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-500">
        {Icon && <Icon size={16} className="flex-shrink-0 text-slate-400" />}
        <span>{value}</span>
      </div>
    </div>
  );
};
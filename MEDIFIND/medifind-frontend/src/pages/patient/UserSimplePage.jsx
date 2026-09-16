import React from "react";
import { motion } from "framer-motion";
import {
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
  Video,
  MapPin,
  Star,
} from "lucide-react";

const pageData = {
  hospitals: {
    title: "Nearby Hospitals",
    subtitle: "Find hospitals near your GPS location",
    icon: Building2,
    color: "text-blue-500",
    bg: "bg-blue-50",
    items: [
      "Apollo Hospital",
      "MediCare Hospital",
      "City Care Hospital",
    ],
  },

  diagnostics: {
    title: "Nearby Diagnostics",
    subtitle: "Find diagnostic and laboratory centers",
    icon: FlaskConical,
    color: "text-violet-500",
    bg: "bg-violet-50",
    items: [
      "MediCare Diagnostics",
      "HealthLab Diagnostics",
      "Apollo Diagnostics",
    ],
  },

  pharmacies: {
    title: "Nearby Pharmacies",
    subtitle: "Find pharmacies near your location",
    icon: Pill,
    color: "text-orange-500",
    bg: "bg-orange-50",
    items: [
      "HealthPlus Pharmacy",
      "MediCare Pharmacy",
      "Apollo Pharmacy",
    ],
  },

  appointments: {
    title: "My Appointments",
    subtitle: "Manage your upcoming and previous appointments",
    icon: CalendarDays,
    color: "text-teal-500",
    bg: "bg-teal-50",
    items: [
      "Dr. Priya Sharma • Today 5:30 PM",
      "Dr. Rahul Kumar • 12 Aug 4:00 PM",
      "Dr. Ananya Rao • 18 Aug 11:00 AM",
    ],
  },

  records: {
    title: "Medical Records",
    subtitle: "Access your medical documents and consultation records",
    icon: FileText,
    color: "text-cyan-500",
    bg: "bg-cyan-50",
    items: [
      "Blood Test Report",
      "General Consultation",
      "Medical History",
    ],
  },

  prescriptions: {
    title: "Prescriptions",
    subtitle: "View your active and previous prescriptions",
    icon: ClipboardList,
    color: "text-purple-500",
    bg: "bg-purple-50",
    items: [
      "Prescription • Dr. Priya Sharma",
      "Prescription • Dr. Rahul Kumar",
      "Prescription • Dr. Ananya Rao",
    ],
  },

  messages: {
    title: "Messages",
    subtitle: "Communicate with your healthcare providers",
    icon: MessageSquare,
    color: "text-teal-500",
    bg: "bg-teal-50",
    items: [
      "Dr. Priya Sharma",
      "MediCare Hospital",
      "HealthLab Diagnostics",
    ],
  },

  notifications: {
    title: "Notifications",
    subtitle: "Stay updated with your healthcare activities",
    icon: Bell,
    color: "text-amber-500",
    bg: "bg-amber-50",
    items: [
      "Appointment confirmed",
      "Medical record uploaded",
      "Appointment reminder",
    ],
  },

  emergency: {
    title: "Emergency SOS",
    subtitle: "Get immediate access to nearby emergency services",
    icon: HeartPulse,
    color: "text-red-500",
    bg: "bg-red-50",
    items: [
      "Nearby Emergency Hospitals",
      "Emergency Contact",
      "Emergency Services",
    ],
  },

  settings: {
    title: "Settings",
    subtitle: "Manage your MediFind preferences",
    icon: Settings,
    color: "text-slate-500",
    bg: "bg-slate-100",
    items: [
      "Account Settings",
      "Notification Settings",
      "Privacy Settings",
    ],
  },
};

export default function UserSimplePage({ type }) {
  const data = pageData[type];

  if (!data) {
    return null;
  }

  const Icon = data.icon;

  return (
    <div className="mx-auto max-w-[1400px]">

      <motion.div
        initial={{
          opacity: 0,
          y: -15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-slate-800">
          {data.title}
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          {data.subtitle}
        </p>
      </motion.div>

      {/* Header card */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.98,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >

        <div className="flex items-center gap-4">

          <div
            className={`flex h-14 w-14 items-center justify-center rounded-2xl ${data.bg} ${data.color}`}
          >
            <Icon size={27} />
          </div>

          <div>
            <h2 className="font-bold text-slate-800">
              {data.title}
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              GPS-powered MediFind services
            </p>
          </div>

        </div>

      </motion.div>

      {/* Items */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

        {data.items.map((item, index) => (
          <motion.div
            key={item}
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
            whileHover={{
              y: -4,
            }}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-lg"
          >

            <div className="flex items-center gap-4">

              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${data.bg} ${data.color}`}
              >
                <Icon size={20} />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-slate-700">
                  {item}
                </h3>

                <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
                  <MapPin size={12} />
                  Nearby
                </div>
              </div>

            </div>

            <button className="mt-5 w-full rounded-xl bg-slate-50 py-2.5 text-sm font-semibold text-[#0891B2] hover:bg-teal-50">
              View Details →
            </button>

          </motion.div>
        ))}

      </div>

    </div>
  );
}
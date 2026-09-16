import React from "react";
import {
  Users,
  Stethoscope,
  Building2,
  CalendarCheck,
  FlaskConical,
  Pill,
  Siren,
  TrendingUp,
  AlertTriangle,
  UserPlus,
  Hospital,
  Activity,
  ArrowRight,
  Calendar,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const Dashboard = () => {
  // =========================================================
  // ADMIN STATISTICS
  // =========================================================

  const stats = [
    {
      title: "Total Users",
      value: 1250,
      change: "+12.5%",
      icon: Users,
      bg: "bg-blue-500",
      lightBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Total Doctors",
      value: 320,
      change: "+8.2%",
      icon: Stethoscope,
      bg: "bg-teal-500",
      lightBg: "bg-teal-50",
      iconColor: "text-teal-600",
    },
    {
      title: "Hospitals",
      value: 48,
      change: "+5.4%",
      icon: Building2,
      bg: "bg-indigo-500",
      lightBg: "bg-indigo-50",
      iconColor: "text-indigo-600",
    },
    {
      title: "Appointments",
      value: 960,
      change: "+14.8%",
      icon: CalendarCheck,
      bg: "bg-purple-500",
      lightBg: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      title: "Diagnostics",
      value: 65,
      change: "+6.7%",
      icon: FlaskConical,
      bg: "bg-cyan-500",
      lightBg: "bg-cyan-50",
      iconColor: "text-cyan-600",
    },
    {
      title: "Pharmacies",
      value: 92,
      change: "+9.3%",
      icon: Pill,
      bg: "bg-green-500",
      lightBg: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "Emergency",
      value: 12,
      change: "3 Active",
      icon: Siren,
      bg: "bg-red-500",
      lightBg: "bg-red-50",
      iconColor: "text-red-600",
    },
  ];

  // =========================================================
  // APPOINTMENT CHART DATA
  // =========================================================

  const appointmentData = [
    {
      day: "Mon",
      appointments: 110,
    },
    {
      day: "Tue",
      appointments: 145,
    },
    {
      day: "Wed",
      appointments: 125,
    },
    {
      day: "Thu",
      appointments: 180,
    },
    {
      day: "Fri",
      appointments: 155,
    },
    {
      day: "Sat",
      appointments: 210,
    },
    {
      day: "Sun",
      appointments: 175,
    },
  ];

  // =========================================================
  // RECENT ACTIVITIES
  // =========================================================

  const recentActivities = [
    {
      id: 1,
      title: "New doctor registered",
      description: "Dr. Priya Sharma joined MEDIFIND",
      time: "10 minutes ago",
      icon: UserPlus,
      bg: "bg-blue-100",
      color: "text-blue-600",
    },
    {
      id: 2,
      title: "Hospital registration",
      description: "City Care Hospital submitted a request",
      time: "25 minutes ago",
      icon: Hospital,
      bg: "bg-teal-100",
      color: "text-teal-600",
    },
    {
      id: 3,
      title: "New appointment",
      description: "Appointment booked with Dr. Raj Kumar",
      time: "40 minutes ago",
      icon: Calendar,
      bg: "bg-purple-100",
      color: "text-purple-600",
    },
    {
      id: 4,
      title: "Emergency request",
      description: "Emergency request received from Hyderabad",
      time: "1 hour ago",
      icon: Siren,
      bg: "bg-red-100",
      color: "text-red-600",
    },
    {
      id: 5,
      title: "Diagnostic center added",
      description: "Apollo Diagnostics added a new branch",
      time: "2 hours ago",
      icon: Activity,
      bg: "bg-cyan-100",
      color: "text-cyan-600",
    },
  ];

  // =========================================================
  // PENDING APPROVALS
  // =========================================================

  const pendingApprovals = [
    {
      id: 1,
      name: "Dr. Anjali Reddy",
      type: "Doctor Registration",
      icon: Stethoscope,
      bg: "bg-teal-100",
      color: "text-teal-600",
    },
    {
      id: 2,
      name: "City Care Hospital",
      type: "Hospital Registration",
      icon: Building2,
      bg: "bg-blue-100",
      color: "text-blue-600",
    },
    {
      id: 3,
      name: "HealthPlus Diagnostics",
      type: "Diagnostic Center",
      icon: FlaskConical,
      bg: "bg-cyan-100",
      color: "text-cyan-600",
    },
    {
      id: 4,
      name: "Wellness Pharmacy",
      type: "Pharmacy Registration",
      icon: Pill,
      bg: "bg-green-100",
      color: "text-green-600",
    },
  ];

  // =========================================================
  // QUICK ACTION NAVIGATION
  // =========================================================

  const goToPage = (path) => {
    window.location.href = path;
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
            Admin Dashboard
          </h1>

          <p className="text-slate-500 mt-1">
            Monitor and manage the MEDIFIND healthcare platform.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-xl border border-slate-200 shadow-sm">

          <div className="p-2 bg-blue-100 rounded-lg">
            <Calendar
              size={20}
              className="text-blue-600"
            />
          </div>

          <div>
            <p className="text-xs text-slate-400">
              Today
            </p>

            <p className="text-sm font-semibold text-slate-700">
              11 August 2026
            </p>
          </div>

        </div>

      </div>

      {/* =====================================================
          COLORFUL STATISTICS CARDS
      ===================================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >

              {/* Top Color Strip */}
              <div className={`h-1.5 ${stat.bg}`} />

              <div className="p-6">

                <div className="flex items-start justify-between">

                  {/* Card Content */}
                  <div>

                    <p className="text-sm font-medium text-slate-500">
                      {stat.title}
                    </p>

                    <h2 className="text-3xl font-bold text-slate-800 mt-2">
                      {stat.value.toLocaleString()}
                    </h2>

                    <div className="flex items-center gap-2 mt-3">

                      {stat.title === "Emergency" ? (
                        <AlertTriangle
                          size={16}
                          className="text-red-500"
                        />
                      ) : (
                        <TrendingUp
                          size={16}
                          className="text-green-500"
                        />
                      )}

                      <span
                        className={`text-sm font-semibold ${
                          stat.title === "Emergency"
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {stat.change}
                      </span>

                      <span className="text-xs text-slate-400">
                        this month
                      </span>

                    </div>

                  </div>

                  {/* Card Icon */}
                  <div
                    className={`w-14 h-14 rounded-2xl ${stat.lightBg} flex items-center justify-center`}
                  >
                    <Icon
                      size={27}
                      className={stat.iconColor}
                    />
                  </div>

                </div>

                {/* Progress Indicator */}

                <div className="mt-5">

                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">

                    <div
                      className={`h-full ${stat.bg} rounded-full`}
                      style={{
                        width:
                          stat.title === "Emergency"
                            ? "30%"
                            : stat.title === "Hospitals"
                            ? "55%"
                            : stat.title === "Diagnostics"
                            ? "65%"
                            : stat.title === "Pharmacies"
                            ? "75%"
                            : stat.title === "Appointments"
                            ? "90%"
                            : "85%",
                      }}
                    />

                  </div>

                </div>

              </div>

            </div>
          );
        })}

      </div>

      {/* =====================================================
          APPOINTMENT CHART + TODAY SUMMARY
      ===================================================== */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">

        {/* Appointment Chart */}

        <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-6 border-b border-slate-100">

            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                Appointment Overview
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Appointments during the current week
              </p>
            </div>

            <div className="flex items-center gap-2">

              <span className="w-3 h-3 bg-blue-600 rounded-full" />

              <span className="text-sm text-slate-500">
                Appointments
              </span>

            </div>

          </div>

          <div className="p-6">

            <ResponsiveContainer
              width="100%"
              height={300}
            >

              <AreaChart data={appointmentData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E2E8F0"
                />

                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#64748B",
                    fontSize: 12,
                  }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#64748B",
                    fontSize: 12,
                  }}
                />

                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #E2E8F0",
                    boxShadow:
                      "0 4px 12px rgba(0,0,0,0.08)",
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="appointments"
                  stroke="#2563EB"
                  fill="#DBEAFE"
                  strokeWidth={3}
                />

              </AreaChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* Today's Summary */}

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">

          <div className="p-6 border-b border-slate-100">

            <h2 className="text-lg font-semibold text-slate-800">
              Today's Summary
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Platform activity
            </p>

          </div>

          <div className="p-6 space-y-5">

            {/* Appointments */}

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="p-3 bg-blue-100 rounded-xl">
                  <CalendarCheck
                    size={20}
                    className="text-blue-600"
                  />
                </div>

                <div>
                  <p className="font-medium text-slate-700">
                    Appointments
                  </p>

                  <p className="text-xs text-slate-400">
                    Scheduled today
                  </p>
                </div>

              </div>

              <span className="text-xl font-bold text-slate-800">
                86
              </span>

            </div>

            {/* Doctors Online */}

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="p-3 bg-teal-100 rounded-xl">
                  <Stethoscope
                    size={20}
                    className="text-teal-600"
                  />
                </div>

                <div>
                  <p className="font-medium text-slate-700">
                    Doctors Online
                  </p>

                  <p className="text-xs text-slate-400">
                    Currently available
                  </p>
                </div>

              </div>

              <span className="text-xl font-bold text-slate-800">
                74
              </span>

            </div>

            {/* New Users */}

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="p-3 bg-purple-100 rounded-xl">
                  <UserPlus
                    size={20}
                    className="text-purple-600"
                  />
                </div>

                <div>
                  <p className="font-medium text-slate-700">
                    New Users
                  </p>

                  <p className="text-xs text-slate-400">
                    Registered today
                  </p>
                </div>

              </div>

              <span className="text-xl font-bold text-slate-800">
                32
              </span>

            </div>

            {/* Emergency */}

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="p-3 bg-red-100 rounded-xl">
                  <Siren
                    size={20}
                    className="text-red-600"
                  />
                </div>

                <div>
                  <p className="font-medium text-slate-700">
                    Emergency
                  </p>

                  <p className="text-xs text-slate-400">
                    Active requests
                  </p>
                </div>

              </div>

              <span className="text-xl font-bold text-red-600">
                3
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          RECENT ACTIVITY + PENDING APPROVALS
      ===================================================== */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">

        {/* Recent Activity */}

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">

          <div className="flex items-center justify-between p-6 border-b border-slate-100">

            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                Recent Activity
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Latest platform activities
              </p>
            </div>

            <button
              onClick={() =>
                goToPage("/admin/notifications")
              }
              className="text-blue-600 text-sm font-medium flex items-center gap-1 hover:text-blue-700"
            >
              View All
              <ArrowRight size={16} />
            </button>

          </div>

          <div className="p-6 space-y-5">

            {recentActivities.map((activity) => {

              const Icon = activity.icon;

              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-4"
                >

                  <div
                    className={`p-3 rounded-xl ${activity.bg}`}
                  >
                    <Icon
                      size={19}
                      className={activity.color}
                    />
                  </div>

                  <div className="flex-1">

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">

                      <p className="font-medium text-slate-700">
                        {activity.title}
                      </p>

                      <span className="text-xs text-slate-400">
                        {activity.time}
                      </span>

                    </div>

                    <p className="text-sm text-slate-500 mt-1">
                      {activity.description}
                    </p>

                  </div>

                </div>
              );
            })}

          </div>

        </div>

        {/* Pending Approvals */}

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">

          <div className="flex items-center justify-between p-6 border-b border-slate-100">

            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                Pending Approvals
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Items requiring admin attention
              </p>
            </div>

            <span className="bg-yellow-100 text-yellow-700 text-xs font-semibold px-3 py-1 rounded-full">
              4 Pending
            </span>

          </div>

          <div className="p-6 space-y-4">

            {pendingApprovals.map((approval) => {

              const Icon = approval.icon;

              return (
                <div
                  key={approval.id}
                  className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition"
                >

                  <div
                    className={`p-3 rounded-xl ${approval.bg}`}
                  >
                    <Icon
                      size={20}
                      className={approval.color}
                    />
                  </div>

                  <div className="flex-1">

                    <p className="font-medium text-slate-700">
                      {approval.name}
                    </p>

                    <p className="text-sm text-slate-500">
                      {approval.type}
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      alert(
                        `Reviewing: ${approval.name}`
                      )
                    }
                    className="px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition"
                  >
                    Review
                  </button>

                </div>
              );
            })}

          </div>

        </div>

      </div>

      {/* =====================================================
          QUICK ACTIONS
      ===================================================== */}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">

        <div className="p-6 border-b border-slate-100">

          <h2 className="text-lg font-semibold text-slate-800">
            Quick Actions
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Frequently used admin actions
          </p>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6">

          {/* Doctors */}

          <button
            onClick={() =>
              goToPage("/admin/doctors")
            }
            className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-teal-300 hover:bg-teal-50 transition text-left"
          >

            <div className="p-3 bg-teal-100 rounded-xl">
              <Stethoscope
                size={20}
                className="text-teal-600"
              />
            </div>

            <div>
              <p className="font-semibold text-slate-700">
                Manage Doctors
              </p>

              <p className="text-xs text-slate-400">
                View doctors
              </p>
            </div>

          </button>

          {/* Hospitals */}

          <button
            onClick={() =>
              goToPage("/admin/hospitals")
            }
            className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition text-left"
          >

            <div className="p-3 bg-blue-100 rounded-xl">
              <Building2
                size={20}
                className="text-blue-600"
              />
            </div>

            <div>
              <p className="font-semibold text-slate-700">
                Manage Hospitals
              </p>

              <p className="text-xs text-slate-400">
                View hospitals
              </p>
            </div>

          </button>

          {/* Emergency */}

          <button
            onClick={() =>
              goToPage("/admin/emergency")
            }
            className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-red-300 hover:bg-red-50 transition text-left"
          >

            <div className="p-3 bg-red-100 rounded-xl">
              <Siren
                size={20}
                className="text-red-600"
              />
            </div>

            <div>
              <p className="font-semibold text-slate-700">
                Emergency
              </p>

              <p className="text-xs text-slate-400">
                View emergencies
              </p>
            </div>

          </button>

          {/* Notifications */}

          <button
            onClick={() =>
              goToPage("/admin/notifications")
            }
            className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-purple-300 hover:bg-purple-50 transition text-left"
          >

            <div className="p-3 bg-purple-100 rounded-xl">
              <Activity
                size={20}
                className="text-purple-600"
              />
            </div>

            <div>
              <p className="font-semibold text-slate-700">
                Notifications
              </p>

              <p className="text-xs text-slate-400">
                Send notifications
              </p>
            </div>

          </button>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;
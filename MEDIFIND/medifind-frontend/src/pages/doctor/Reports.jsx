import React from "react";
import {
  BarChart3,
  Calendar,
  Users,
  HeartPulse,
  Clock,
  Download,
  TrendingUp,
  Activity,
} from "lucide-react";

export default function Reports() {
  const reports = [
    {
      title: "Total Appointments",
      value: "248",
      change: "+12.5%",
      icon: Calendar,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Total Patients",
      value: "324",
      change: "+8.2%",
      icon: Users,
      iconBg: "bg-teal-100",
      iconColor: "text-teal-600",
    },
    {
      title: "Emergency Cases",
      value: "26",
      change: "-4.1%",
      icon: HeartPulse,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },
    {
      title: "Available Hours",
      value: "168",
      change: "+6.4%",
      icon: Clock,
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
    },
  ];

  const monthlyData = [
    { month: "Jan", appointments: 42 },
    { month: "Feb", appointments: 55 },
    { month: "Mar", appointments: 48 },
    { month: "Apr", appointments: 68 },
    { month: "May", appointments: 72 },
    { month: "Jun", appointments: 84 },
  ];

  const maxValue = Math.max(
    ...monthlyData.map((item) => item.appointments)
  );

  const downloadReport = () => {
    alert("Report download will be connected to the backend later.");
  };

  return (
    <div className="min-h-full bg-slate-50 p-6 dark:bg-slate-950">

      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-blue-100 p-3 text-blue-600 dark:bg-blue-500/10">
            <BarChart3 size={26} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Reports & Analytics
            </h1>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              View your practice performance and statistics
            </p>
          </div>

        </div>

        <button
          type="button"
          onClick={downloadReport}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
        >
          <Download size={18} />
          Download Report
        </button>

      </div>

      {/* Statistics */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {reports.map((report) => {
          const Icon = report.icon;

          return (
            <div
              key={report.title}
              className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {report.title}
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                    {report.value}
                  </h2>

                  <div className="mt-2 flex items-center gap-1 text-sm text-emerald-600">
                    <TrendingUp size={15} />
                    {report.change}
                  </div>
                </div>

                <div
                  className={`rounded-xl p-3 ${report.iconBg} ${report.iconColor}`}
                >
                  <Icon size={22} />
                </div>

              </div>
            </div>
          );
        })}

      </div>

      {/* Main Reports */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* Chart */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm xl:col-span-2 dark:border-slate-800 dark:bg-slate-900">

          <div className="mb-6 flex items-center justify-between">

            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Appointment Overview
              </h2>

              <p className="text-sm text-slate-500">
                Monthly appointment statistics
              </p>
            </div>

            <Activity className="text-blue-600" size={22} />

          </div>

          {/* Simple Bar Chart */}
          <div className="flex h-72 items-end justify-between gap-4 border-b border-slate-200 px-3 dark:border-slate-700">

            {monthlyData.map((item) => {
              const height =
                (item.appointments / maxValue) * 100;

              return (
                <div
                  key={item.month}
                  className="flex h-full flex-1 flex-col items-center justify-end"
                >

                  <span className="mb-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                    {item.appointments}
                  </span>

                  <div
                    className="w-full max-w-12 rounded-t-lg bg-gradient-to-t from-blue-600 to-teal-400 transition-all duration-500 hover:opacity-80"
                    style={{
                      height: `${height}%`,
                    }}
                  />

                  <span className="mt-3 text-xs text-slate-500">
                    {item.month}
                  </span>

                </div>
              );
            })}

          </div>
        </div>

        {/* Performance */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">

          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Practice Performance
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            This month's performance
          </p>

          <div className="mt-6 space-y-6">

            {/* Patient Satisfaction */}
            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-300">
                  Patient Satisfaction
                </span>

                <span className="font-semibold text-slate-900 dark:text-white">
                  92%
                </span>
              </div>

              <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                  className="h-2 rounded-full bg-teal-500"
                  style={{ width: "92%" }}
                />
              </div>
            </div>

            {/* Appointment Completion */}
            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-300">
                  Appointment Completion
                </span>

                <span className="font-semibold text-slate-900 dark:text-white">
                  88%
                </span>
              </div>

              <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                  className="h-2 rounded-full bg-blue-600"
                  style={{ width: "88%" }}
                />
              </div>
            </div>

            {/* Response Rate */}
            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-300">
                  Emergency Response
                </span>

                <span className="font-semibold text-slate-900 dark:text-white">
                  95%
                </span>
              </div>

              <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                  className="h-2 rounded-full bg-red-500"
                  style={{ width: "95%" }}
                />
              </div>
            </div>

          </div>

          {/* Summary */}
          <div className="mt-8 rounded-xl bg-slate-50 p-4 dark:bg-slate-800">

            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              Overall Performance
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
              Your practice performance is improving compared with
              the previous month.
            </p>

          </div>

        </div>

      </div>

      {/* Recent Activity */}
      <div className="mt-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">

        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Recent Report Summary
        </h2>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">

          <div className="rounded-xl bg-blue-50 p-4 dark:bg-blue-500/10">
            <p className="text-sm text-blue-600">
              Most Active Day
            </p>

            <p className="mt-1 font-bold text-slate-900 dark:text-white">
              Monday
            </p>
          </div>

          <div className="rounded-xl bg-teal-50 p-4 dark:bg-teal-500/10">
            <p className="text-sm text-teal-600">
              Most Common Service
            </p>

            <p className="mt-1 font-bold text-slate-900 dark:text-white">
              General Consultation
            </p>
          </div>

          <div className="rounded-xl bg-red-50 p-4 dark:bg-red-500/10">
            <p className="text-sm text-red-600">
              Emergency Response
            </p>

            <p className="mt-1 font-bold text-slate-900 dark:text-white">
              8 Minutes
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
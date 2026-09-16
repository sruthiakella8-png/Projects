import React, { useState } from "react";
import {
  BarChart3,
  Users,
  Stethoscope,
  Building2,
  CalendarDays,
  Ambulance,
  TrendingUp,
  TrendingDown,
  Download,
  FileText,
  Activity,
} from "lucide-react";

const Reports = () => {
  const [period, setPeriod] = useState("This Month");

  const monthlyData = [
    { month: "Jan", users: 320, appointments: 180 },
    { month: "Feb", users: 410, appointments: 230 },
    { month: "Mar", users: 480, appointments: 280 },
    { month: "Apr", users: 560, appointments: 320 },
    { month: "May", users: 690, appointments: 390 },
    { month: "Jun", users: 780, appointments: 450 },
    { month: "Jul", users: 920, appointments: 520 },
    { month: "Aug", users: 1050, appointments: 610 },
  ];

  const reports = [
    {
      title: "Total Users",
      value: "1,250",
      change: "+12.5%",
      positive: true,
      icon: Users,
      bg: "bg-blue-100",
      color: "text-blue-600",
    },
    {
      title: "Registered Doctors",
      value: "248",
      change: "+8.2%",
      positive: true,
      icon: Stethoscope,
      bg: "bg-teal-100",
      color: "text-teal-600",
    },
    {
      title: "Hospitals",
      value: "86",
      change: "+5.4%",
      positive: true,
      icon: Building2,
      bg: "bg-purple-100",
      color: "text-purple-600",
    },
    {
      title: "Appointments",
      value: "610",
      change: "+15.8%",
      positive: true,
      icon: CalendarDays,
      bg: "bg-orange-100",
      color: "text-orange-600",
    },
    {
      title: "Emergency Cases",
      value: "42",
      change: "-4.3%",
      positive: true,
      icon: Ambulance,
      bg: "bg-red-100",
      color: "text-red-600",
    },
    {
      title: "Active Users",
      value: "984",
      change: "+10.1%",
      positive: true,
      icon: Activity,
      bg: "bg-green-100",
      color: "text-green-600",
    },
  ];

  const handleDownload = () => {
    alert("Report download will be connected to the backend.");
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

        <div className="flex items-center gap-3">

          <div className="p-3 bg-blue-100 rounded-xl">
            <BarChart3
              size={28}
              className="text-blue-600"
            />
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
              Reports & Analytics
            </h1>

            <p className="text-slate-500 mt-1">
              Monitor MEDIFIND platform performance
            </p>
          </div>

        </div>

        <div className="flex items-center gap-3">

          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>This Week</option>
            <option>This Month</option>
            <option>Last 3 Months</option>
            <option>This Year</option>
          </select>

          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition"
          >
            <Download size={18} />
            Export
          </button>

        </div>

      </div>

      {/* =====================================================
          REPORT CARDS
      ===================================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-8">

        {reports.map((report) => {
          const Icon = report.icon;

          return (
            <div
              key={report.title}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition"
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-slate-500">
                    {report.title}
                  </p>

                  <h2 className="text-3xl font-bold text-slate-800 mt-2">
                    {report.value}
                  </h2>

                  <div className="flex items-center gap-1 mt-3">

                    {report.positive ? (
                      <TrendingUp
                        size={15}
                        className="text-green-500"
                      />
                    ) : (
                      <TrendingDown
                        size={15}
                        className="text-red-500"
                      />
                    )}

                    <span className="text-sm font-medium text-green-600">
                      {report.change}
                    </span>

                    <span className="text-xs text-slate-400">
                      vs last period
                    </span>

                  </div>

                </div>

                <div
                  className={`p-4 rounded-xl ${report.bg}`}
                >
                  <Icon
                    size={26}
                    className={report.color}
                  />
                </div>

              </div>

            </div>
          );
        })}

      </div>

      {/* =====================================================
          MONTHLY ACTIVITY
      ===================================================== */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">

        {/* Activity Chart */}

        <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-7">

            <div>
              <h2 className="text-lg font-bold text-slate-800">
                Monthly Activity
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Users and appointments overview
              </p>
            </div>

            <div className="flex items-center gap-4 text-sm">

              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500" />
                Users
              </div>

              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-teal-500" />
                Appointments
              </div>

            </div>

          </div>

          <div className="h-72 flex items-end gap-3 md:gap-5">

            {monthlyData.map((item) => {

              const maxValue = 1100;

              const usersHeight =
                (item.users / maxValue) * 100;

              const appointmentsHeight =
                (item.appointments / maxValue) * 100;

              return (
                <div
                  key={item.month}
                  className="flex-1 h-full flex flex-col justify-end"
                >

                  <div className="flex items-end justify-center gap-1 h-full">

                    <div
                      className="w-1/2 max-w-8 bg-blue-500 rounded-t-md hover:bg-blue-600 transition"
                      style={{
                        height: `${usersHeight}%`,
                      }}
                      title={`Users: ${item.users}`}
                    />

                    <div
                      className="w-1/2 max-w-8 bg-teal-500 rounded-t-md hover:bg-teal-600 transition"
                      style={{
                        height: `${appointmentsHeight}%`,
                      }}
                      title={`Appointments: ${item.appointments}`}
                    />

                  </div>

                  <p className="text-xs text-slate-500 text-center mt-3">
                    {item.month}
                  </p>

                </div>
              );
            })}

          </div>

        </div>

        {/* Platform Summary */}

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

          <div className="flex items-center gap-3 mb-6">

            <div className="p-3 bg-teal-100 rounded-xl">
              <Activity
                size={22}
                className="text-teal-600"
              />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-800">
                Platform Summary
              </h2>

              <p className="text-sm text-slate-500">
                Current platform statistics
              </p>
            </div>

          </div>

          <div className="space-y-5">

            <SummaryItem
              label="Doctors available"
              value="198"
              total="248"
              percentage={80}
            />

            <SummaryItem
              label="Hospitals active"
              value="72"
              total="86"
              percentage={84}
            />

            <SummaryItem
              label="Appointments completed"
              value="480"
              total="610"
              percentage={79}
            />

            <SummaryItem
              label="Active users"
              value="984"
              total="1,250"
              percentage={79}
            />

          </div>

        </div>

      </div>

      {/* =====================================================
          SERVICE OVERVIEW
      ===================================================== */}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8">

        <div className="flex items-center justify-between mb-6">

          <div>

            <h2 className="text-lg font-bold text-slate-800">
              MEDIFIND Service Overview
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Performance across major services
            </p>

          </div>

          <FileText
            size={22}
            className="text-slate-400"
          />

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

          <ServiceCard
            title="Find Doctor"
            value="1,248"
            label="Doctor searches"
            icon={Stethoscope}
            bg="bg-blue-100"
            color="text-blue-600"
          />

          <ServiceCard
            title="Hospitals"
            value="864"
            label="Hospital searches"
            icon={Building2}
            bg="bg-purple-100"
            color="text-purple-600"
          />

          <ServiceCard
            title="Diagnostics"
            value="526"
            label="Diagnostic bookings"
            icon={Activity}
            bg="bg-teal-100"
            color="text-teal-600"
          />

          <ServiceCard
            title="Pharmacies"
            value="438"
            label="Pharmacy searches"
            icon={FileText}
            bg="bg-orange-100"
            color="text-orange-600"
          />

        </div>

      </div>

      {/* =====================================================
          RECENT REPORTS
      ===================================================== */}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

        <div className="p-6 border-b border-slate-100">

          <h2 className="text-lg font-bold text-slate-800">
            Recent Reports
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Recently generated administrative reports
          </p>

        </div>

        <div className="divide-y divide-slate-100">

          <ReportRow
            title="Monthly User Activity Report"
            date="10 Aug 2026"
            type="User Analytics"
          />

          <ReportRow
            title="Doctor Registration Report"
            date="09 Aug 2026"
            type="Doctor Analytics"
          />

          <ReportRow
            title="Hospital Performance Report"
            date="08 Aug 2026"
            type="Hospital Analytics"
          />

          <ReportRow
            title="Appointment Summary Report"
            date="07 Aug 2026"
            type="Appointment Analytics"
          />

        </div>

      </div>

    </div>
  );
};

// =========================================================
// SUMMARY ITEM
// =========================================================

const SummaryItem = ({
  label,
  value,
  total,
  percentage,
}) => {
  return (
    <div>

      <div className="flex justify-between mb-2">

        <span className="text-sm text-slate-600">
          {label}
        </span>

        <span className="text-sm font-semibold text-slate-700">
          {value}/{total}
        </span>

      </div>

      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">

        <div
          className="h-full bg-teal-500 rounded-full"
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

      <p className="text-xs text-slate-400 mt-1">
        {percentage}% completed
      </p>

    </div>
  );
};

// =========================================================
// SERVICE CARD
// =========================================================

const ServiceCard = ({
  title,
  value,
  label,
  icon: Icon,
  bg,
  color,
}) => {
  return (
    <div className="p-5 bg-slate-50 rounded-xl border border-slate-100">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm font-semibold text-slate-700">
            {title}
          </p>

          <h3 className="text-2xl font-bold text-slate-800 mt-2">
            {value}
          </h3>

          <p className="text-xs text-slate-400 mt-1">
            {label}
          </p>

        </div>

        <div className={`p-3 rounded-xl ${bg}`}>
          <Icon
            size={22}
            className={color}
          />
        </div>

      </div>

    </div>
  );
};

// =========================================================
// REPORT ROW
// =========================================================

const ReportRow = ({
  title,
  date,
  type,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-5 hover:bg-slate-50 transition">

      <div className="flex items-center gap-4">

        <div className="p-3 bg-blue-50 rounded-xl">
          <FileText
            size={20}
            className="text-blue-600"
          />
        </div>

        <div>

          <p className="font-semibold text-slate-700">
            {title}
          </p>

          <p className="text-sm text-slate-400 mt-1">
            {type}
          </p>

        </div>

      </div>

      <div className="text-sm text-slate-500">
        {date}
      </div>

    </div>
  );
};

export default Reports;
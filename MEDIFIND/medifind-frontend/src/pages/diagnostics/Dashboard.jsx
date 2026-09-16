import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  TestTube,
  ShoppingCart,
  FileCheck,
  Users,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

import axiosInstance from "../../api/axiosInstance";

// =====================================================
// DASHBOARD STAT CARD
// =====================================================

function DashboardCard({
  title,
  value,
  description,
  icon: Icon,
  iconBg,
  trend,
  trendType,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        transition
        hover:-translate-y-1
        hover:shadow-md
      "
    >
      <div className="flex items-start justify-between">

        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-800">
            {value}
          </h2>
        </div>

        <div
          className={`
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            ${iconBg}
            text-white
          `}
        >
          <Icon size={21} />
        </div>

      </div>

      <div className="mt-4 flex items-center gap-2">

        {trendType === "up" ? (
          <ArrowUpRight
            size={15}
            className="text-emerald-500"
          />
        ) : (
          <ArrowDownRight
            size={15}
            className="text-red-500"
          />
        )}

        <span
          className={`text-xs font-medium ${
            trendType === "up"
              ? "text-emerald-500"
              : "text-red-500"
          }`}
        >
          {trend}
        </span>

        <span className="text-xs text-slate-400">
          {description}
        </span>

      </div>
    </motion.div>
  );
}

// =====================================================
// DASHBOARD
// =====================================================

export default function DiagnosticsDashboard() {

  // ===================================================
  // DIAGNOSTIC CENTER
  // ===================================================

 const [diagnostic, setDiagnostic] = useState({
  name: "Diagnostic Center",
  username: "User",
  type: "Diagnostics Center",
});

  // ===================================================
  // TOTAL TESTS
  // ===================================================

  const [totalTests, setTotalTests] = useState(0);

  // ===================================================
  // LOADING
  // ===================================================

  const [loadingTests, setLoadingTests] = useState(true);

  // ===================================================
  // LOAD DIAGNOSTIC CENTER
  // ===================================================

  useEffect(() => {
    loadDiagnostic();
    loadTests();
  }, []);

  // ===================================================
  // LOAD DIAGNOSTIC DATA
  // ===================================================

  const loadDiagnostic = () => {
    try {

      const storedDiagnostic =
  localStorage.getItem("diagnostics");

      if (storedDiagnostic) {

        const parsedDiagnostic =
          JSON.parse(storedDiagnostic);

        setDiagnostic({
          name:
            parsedDiagnostic?.name ||
            parsedDiagnostic?.center_name ||
            parsedDiagnostic?.centerName ||
            parsedDiagnostic?.username ||
            "Diagnostic Center",

          username:
    parsedDiagnostic?.username ||
    localStorage.getItem("diagnostics_username") ||
    localStorage.getItem("username") ||
    "User",

          type:
            parsedDiagnostic?.type ||
            parsedDiagnostic?.center_type ||
            parsedDiagnostic?.centerType ||
            "Diagnostics Center",
        });

      } else {

        setDiagnostic({
          name:
            localStorage.getItem(
              "diagnostic_name"
            ) ||
            localStorage.getItem("username") ||
            "Diagnostic Center",

          username:
    localStorage.getItem("diagnostics_username") ||
    localStorage.getItem("username") ||
    "User",

          type:
            localStorage.getItem(
              "diagnostic_type"
            ) ||
            "Diagnostics Center",
        });

      }

    } catch (error) {

      console.error(
        "Unable to load diagnostic information:",
        error
      );

    }
  };

  // ===================================================
  // LOAD TESTS
  // ===================================================

  const loadTests = async () => {

    try {

      setLoadingTests(true);

      /*
       * IMPORTANT:
       * Replace this endpoint with the exact
       * Diagnostic Tests endpoint already used
       * in your Tests CRUD page if necessary.
       */

      const response = await axiosInstance.get(
  "/diagnostics/dashboard/tests/"
);

      const tests =
        Array.isArray(response.data)
          ? response.data
          : response.data?.results || [];

      setTotalTests(tests.length);

    } catch (error) {

      console.error(
        "Unable to load diagnostic tests:",
        error
      );

      /*
       * Keep dashboard functional even if
       * the endpoint is not available yet.
       */

      setTotalTests(0);

    } finally {

      setLoadingTests(false);

    }
  };

  // ===================================================
  // CURRENT DATE
  // ===================================================

  const today = new Date();

  const formattedDate =
    today.toLocaleDateString(
      "en-US",
      {
        weekday: "long",
        month: "long",
        day: "2-digit",
        year: "numeric",
      }
    );

  // ===================================================
  // GREETING
  // ===================================================

  const currentHour =
    today.getHours();

  let greeting = "Good Morning";

  if (
    currentHour >= 12 &&
    currentHour < 17
  ) {
    greeting = "Good Afternoon";
  } else if (
    currentHour >= 17
  ) {
    greeting = "Good Evening";
  }

  // ===================================================
  // DASHBOARD
  // ===================================================

  return (
    <div className="space-y-6">

      {/* =================================================
          HEADER
      ================================================= */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="
          flex
          flex-col
          justify-between
          gap-4
          md:flex-row
          md:items-center
        "
      >

        {/* WELCOME */}

        <div>

          <h1 className="text-2xl font-bold text-slate-800">
  {greeting},{" "}
  {diagnostic.username} 👋
</h1>

          <p className="mt-2 text-sm text-slate-500">
            Here's what's happening at your
            diagnostic center today.
          </p>

          <p className="mt-1 text-xs font-medium text-teal-600">
  {diagnostic.name}
</p>

          <p className="mt-1 text-xs font-medium text-teal-600">
            {diagnostic.type}
          </p>

        </div>

        {/* DATE */}

        <div
          className="
            rounded-xl
            border
            border-slate-200
            bg-white
            px-5
            py-3
            text-sm
            text-slate-600
            shadow-sm
          "
        >
          {formattedDate}
        </div>

      </motion.div>


      {/* =================================================
          DASHBOARD CARDS
      ================================================= */}

      <div
        className="
          grid
          grid-cols-1
          gap-5
          sm:grid-cols-2
          xl:grid-cols-4
        "
      >

        {/* TOTAL TESTS */}

        <DashboardCard
          title="Total Tests"
          value={
            loadingTests
              ? "..."
              : totalTests
          }
          description="available tests"
          icon={TestTube}
          iconBg="bg-blue-600"
          trend="Active"
          trendType="up"
        />


        {/* PENDING ORDERS */}

        <DashboardCard
          title="Pending Orders"
          value="--"
          description="awaiting processing"
          icon={ShoppingCart}
          iconBg="bg-teal-500"
          trend="Pending"
          trendType="up"
        />


        {/* REPORTS */}

        <DashboardCard
          title="Reports Pending"
          value="--"
          description="awaiting completion"
          icon={FileCheck}
          iconBg="bg-indigo-500"
          trend="Pending"
          trendType="up"
        />


        {/* PATIENTS */}

        <DashboardCard
          title="Total Patients"
          value="--"
          description="registered patients"
          icon={Users}
          iconBg="bg-purple-500"
          trend="Active"
          trendType="up"
        />

      </div>


      {/* =================================================
          RECENT ORDERS + REPORT STATUS
      ================================================= */}

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-5">

        {/* RECENT ORDERS */}

        <div
          className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-5
            shadow-sm
            xl:col-span-3
          "
        >

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-lg font-bold text-slate-800">
                Recent Orders
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Latest diagnostic test orders
              </p>

            </div>

            <button
              type="button"
              className="
                text-sm
                font-medium
                text-blue-600
                hover:text-blue-700
              "
            >
              View All
            </button>

          </div>

          <div className="mt-5">

            <div
              className="
                flex
                min-h-[180px]
                items-center
                justify-center
                rounded-xl
                border
                border-dashed
                border-slate-200
                bg-slate-50
              "
            >

              <p className="text-sm text-slate-400">
                No orders available yet.
              </p>

            </div>

          </div>

        </div>


        {/* REPORT STATUS */}

        <div
          className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-5
            shadow-sm
            xl:col-span-2
          "
        >

          <h2 className="text-lg font-bold text-slate-800">
            Report Status
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Overview of diagnostic reports
          </p>


          <div className="mt-5 space-y-4">

            {/* PENDING */}

            <div
              className="
                flex
                items-center
                justify-between
                rounded-xl
                bg-amber-50
                px-4
                py-3
              "
            >

              <div className="flex items-center gap-3">

                <div className="h-2.5 w-2.5 rounded-full bg-amber-500" />

                <span className="text-sm font-medium text-slate-700">
                  Pending
                </span>

              </div>

              <span className="text-sm font-bold text-slate-800">
                --
              </span>

            </div>


            {/* PROCESSING */}

            <div
              className="
                flex
                items-center
                justify-between
                rounded-xl
                bg-blue-50
                px-4
                py-3
              "
            >

              <div className="flex items-center gap-3">

                <div className="h-2.5 w-2.5 rounded-full bg-blue-500" />

                <span className="text-sm font-medium text-slate-700">
                  Processing
                </span>

              </div>

              <span className="text-sm font-bold text-slate-800">
                --
              </span>

            </div>


            {/* COMPLETED */}

            <div
              className="
                flex
                items-center
                justify-between
                rounded-xl
                bg-emerald-50
                px-4
                py-3
              "
            >

              <div className="flex items-center gap-3">

                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />

                <span className="text-sm font-medium text-slate-700">
                  Completed
                </span>

              </div>

              <span className="text-sm font-bold text-slate-800">
                --
              </span>

            </div>

          </div>

        </div>

      </div>


      {/* =================================================
          QUICK ACTIONS
      ================================================= */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-5
          shadow-sm
        "
      >

        <h2 className="text-lg font-bold text-slate-800">
          Quick Actions
        </h2>

        <p className="mt-1 text-xs text-slate-500">
          Frequently used diagnostic center actions
        </p>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">

          <button
            type="button"
            className="
              rounded-xl
              bg-blue-50
              px-4
              py-3
              text-sm
              font-semibold
              text-blue-600
              transition
              hover:bg-blue-100
            "
          >
            Add Test
          </button>

          <button
            type="button"
            className="
              rounded-xl
              bg-teal-50
              px-4
              py-3
              text-sm
              font-semibold
              text-teal-600
              transition
              hover:bg-teal-100
            "
          >
            View Orders
          </button>

          <button
            type="button"
            className="
              rounded-xl
              bg-indigo-50
              px-4
              py-3
              text-sm
              font-semibold
              text-indigo-600
              transition
              hover:bg-indigo-100
            "
          >
            Upload Report
          </button>

        </div>

      </motion.div>

    </div>
  );
}
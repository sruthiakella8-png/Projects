import React from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

import Sidebar from "../components/diagnostics/Sidebar";
import Topbar from "../components/diagnostics/Topbar";

export default function DiagnosticsLayout() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">

      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <aside className="fixed left-0 top-0 z-40 h-screen w-72">

        <motion.div
          initial={{ x: -280 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
          className="h-full"
        >
          <Sidebar />
        </motion.div>

      </aside>


      {/* =====================================================
          RIGHT SIDE
      ====================================================== */}

      <div className="ml-72 flex min-h-screen flex-col">

        {/* ===================================================
            TOPBAR
        ==================================================== */}

        <motion.header
          initial={{ y: -80 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="sticky top-0 z-30"
        >
          <Topbar />
        </motion.header>


        {/* ===================================================
            PAGE CONTENT
        ==================================================== */}

        <main className="flex-1 p-6">

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Outlet />
          </motion.div>

        </main>

      </div>

    </div>
  );
}
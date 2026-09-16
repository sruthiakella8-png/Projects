import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/admin/Sidebar";
import Topbar from "../components/admin/Topbar";

const AdminLayout = () => {
  const [collapsed, setCollapsed] =
    useState(false);

  return (
    <div className="min-h-screen bg-slate-100">

      {/* =================================================
          SIDEBAR
      ================================================= */}

      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <div
        className={`
          min-h-screen
          transition-all
          duration-300
          ${
            collapsed
              ? "ml-20"
              : "ml-72"
          }
        `}
      >

        {/* TOPBAR */}

        <Topbar />

        {/* PAGE CONTENT */}

        <main className="p-0">

          <Outlet />

        </main>

      </div>

    </div>
  );
};

export default AdminLayout;
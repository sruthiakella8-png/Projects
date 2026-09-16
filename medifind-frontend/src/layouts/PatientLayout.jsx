import React from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/patient/Sidebar";
import Topbar from "../components/patient/Topbar";

export default function PatientLayout() {

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Sidebar */}

      <Sidebar />


      {/* Main Area */}

      <div className="ml-64">

        {/* Topbar */}

        <Topbar />


        {/* Page Content */}

        <main className="p-6">

          <Outlet />

        </main>

      </div>

    </div>
  );
}
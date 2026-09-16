import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import DiagnosticsLayout from "../layouts/DiagnosticsLayout";
import Dashboard from "../pages/diagnostics/Dashboard";
import Tests from "../pages/diagnostics/Tests";
import Profile from "../pages/diagnostics/Profile";
import Verification from "../pages/diagnostics/Verification";

function DiagnosticsPage({ title }) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800">
        {title}
      </h1>

      <p className="mt-2 text-slate-500">
        {title} page coming soon.
      </p>
    </div>
  );
}

export default function DiagnosticsRoutes() {
  return (
    <Routes>
      <Route element={<DiagnosticsLayout />}>

        {/* Dashboard */}
        <Route
  path="dashboard"
  element={<Dashboard />}
/>

        {/* Tests */}
        <Route
  path="tests"
  element={<Tests />}
/>

        {/* Orders */}
        <Route
          path="orders"
          element={
            <DiagnosticsPage title="Diagnostic Orders" />
          }
        />

        {/* Patients */}
        <Route
          path="patients"
          element={
            <DiagnosticsPage title="Patients" />
          }
        />

        {/* Reports */}
        <Route
          path="reports"
          element={
            <DiagnosticsPage title="Diagnostic Reports" />
          }
        />

        {/* Messages */}
        <Route
          path="messages"
          element={
            <DiagnosticsPage title="Messages" />
          }
        />

        {/* Verification */}
        <Route
  path="verification"
  element={<Verification />}
/>

        {/* Profile */}
        <Route
  path="profile"
  element={<Profile />}
/>

        {/* Settings */}
        <Route
          path="settings"
          element={
            <DiagnosticsPage title="Settings" />
          }
        />

        {/* Default */}
        <Route
          index
          element={
            <Navigate
              to="dashboard"
              replace
            />
          }
        />

      </Route>
    </Routes>
  );
}
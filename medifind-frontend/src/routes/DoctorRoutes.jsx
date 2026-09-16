import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import DoctorLayout from "../layouts/DoctorLayout";

import Dashboard from "../pages/doctor/Dashboard";
import Appointments from "../pages/doctor/Appointments";
import Patients from "../pages/doctor/Patients";
import Prescriptions from "../pages/doctor/Prescriptions";
import MedicalRecords from "../pages/doctor/MedicalRecords";
import Schedule from "../pages/doctor/Schedule";
import Notifications from "../pages/doctor/Notifications";
import Profile from "../pages/doctor/Profile";
import Settings from "../pages/doctor/Settings";
import Emergency from "../pages/doctor/Emergency";
import Reports from "../pages/doctor/Reports";

export default function DoctorRoutes() {
  return (
    <Routes>
      <Route element={<DoctorLayout />}>

        {/* Dashboard */}
        <Route
          path="dashboard"
          element={<Dashboard />}
        />

        {/* Appointments */}
        <Route
          path="appointments"
          element={<Appointments />}
        />

        {/* Patients */}
        <Route
          path="patients"
          element={<Patients />}
        />

        {/* Emergency */}
        <Route
          path="emergency"
          element={<Emergency />}
        />

        {/* Availability */}
        <Route
          path="schedule"
          element={<Schedule />}
        />

        {/* Prescriptions */}
        <Route
          path="prescriptions"
          element={<Prescriptions />}
        />

        {/* Reports */}
        <Route
          path="reports"
          element={<Reports />}
        />

        {/* Notifications / Messages */}
        <Route
          path="notifications"
          element={<Notifications />}
        />

        {/* Medical Records */}
        <Route
          path="medical-records"
          element={<MedicalRecords />}
        />

        {/* Profile */}
        <Route
          path="profile"
          element={<Profile />}
        />

        {/* Settings */}
        <Route
          path="settings"
          element={<Settings />}
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
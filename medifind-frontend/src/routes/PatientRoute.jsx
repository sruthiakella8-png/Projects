import React from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { jwtDecode } from "jwt-decode";

import PatientLayout from "../layouts/PatientLayout";

// =====================================================
// PATIENT PAGES
// =====================================================

import PatientDashboard from "../pages/patient/PatientDashboard";
import FindDoctor from "../pages/patient/FindDoctor";
import Diagnostics from "../pages/patient/Diagnostics";
import DiagnosticDetails from "../pages/patient/DiagnosticDetails";
import Pharmacies from "../pages/patient/Pharmacies";
import Appointments from "../pages/patient/Appointments";
import MedicalRecords from "../pages/patient/MedicalRecords";
import Prescriptions from "../pages/patient/Prescriptions";
import Messages from "../pages/patient/Messages";
import Notifications from "../pages/patient/Notifications";
import Emergency from "../pages/patient/Emergency";
import Profile from "../pages/patient/Profile";
import Settings from "../pages/patient/Settings";

// =====================================================
// TOKEN SERVICE
// =====================================================

import { getAccessToken } from "../utils/tokenService";

// =====================================================
// PATIENT ROUTE
// =====================================================

export default function PatientRoute() {
  const token = getAccessToken();

  // ===================================================
  // NO TOKEN
  // ===================================================

  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // ===================================================
  // DECODE JWT
  // ===================================================

  let decodedToken = {};

  try {
    decodedToken = jwtDecode(token);
  } catch (error) {
    console.error(
      "PATIENT JWT ERROR:",
      error
    );

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("role");
    localStorage.removeItem("accountType");

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // ===================================================
  // GET ROLE
  // ===================================================

  const role = (
    decodedToken?.role ||
    decodedToken?.user_role ||
    decodedToken?.userType ||
    decodedToken?.user_type ||
    decodedToken?.account_type ||
    decodedToken?.accountType ||
    ""
  )
    .toString()
    .trim()
    .toLowerCase();

  console.log("PATIENT ROLE:", role);

  // ===================================================
  // ONLY PATIENT CAN ACCESS
  // ===================================================

  if (
    role !== "patient" &&
    role !== "user"
  ) {
    switch (role) {
      case "admin":
        return (
          <Navigate
            to="/admin/dashboard"
            replace
          />
        );

      case "doctor":
        return (
          <Navigate
            to="/doctor/dashboard"
            replace
          />
        );


      case "diagnostics":
      case "diagnostic":
        return (
          <Navigate
            to="/diagnostics-dashboard"
            replace
          />
        );

      case "pharmacy":
        return (
          <Navigate
            to="/pharmacy-dashboard"
            replace
          />
        );

      default:
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("role");
        localStorage.removeItem("accountType");

        return (
          <Navigate
            to="/login"
            replace
          />
        );
    }
  }

  // ===================================================
  // PATIENT ROUTES
  // ===================================================

  return (
    <Routes>

      <Route
        element={
          <PatientLayout />
        }
      >

        {/* /patient → /patient/dashboard */}

        <Route
          index
          element={
            <Navigate
              to="dashboard"
              replace
            />
          }
        />

        {/* =================================================
            DASHBOARD
        ================================================= */}

        <Route
          path="dashboard"
          element={
            <PatientDashboard />
          }
        />

        {/* =================================================
            HEALTHCARE
        ================================================= */}

        <Route
          path="doctors"
          element={
            <FindDoctor />
          }
        />
        
        <Route
          path="diagnostics"
          element={
            <Diagnostics />
          }
        />

        <Route
          path="pharmacies"
          element={
            <Pharmacies />
          }
        />

        {/* =================================================
            APPOINTMENTS
        ================================================= */}

        <Route
          path="appointments"
          element={
            <Appointments />
          }
        />

        {/* =================================================
            MEDICAL
        ================================================= */}

        <Route
          path="records"
          element={
            <MedicalRecords />
          }
        />

        <Route
          path="prescriptions"
          element={
            <Prescriptions />
          }
        />

        {/* =================================================
            COMMUNICATION
        ================================================= */}

        <Route
          path="messages"
          element={
            <Messages />
          }
        />

        <Route
          path="notifications"
          element={
            <Notifications />
          }
        />

        {/* =================================================
            EMERGENCY
        ================================================= */}

        <Route
          path="emergency"
          element={
            <Emergency />
          }
        />

        {/* =================================================
            PATIENT PROFILE
        ================================================= */}

        <Route
          path="profile"
          element={
            <Profile />
          }
        />

        {/* =================================================
            PATIENT SETTINGS
        ================================================= */}

        <Route
          path="settings"
          element={
            <Settings />
          }
        />

        {/* =================================================
            UNKNOWN PATIENT PAGE
        ================================================= */}

        <Route
          path="*"
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
import React from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";

// Admin Pages
import Dashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import Doctors from "../pages/admin/Doctors";
import Hospitals from "../pages/admin/Hospitals";
import Diagnostics from "../pages/admin/Diagnostics";
import Pharmacies from "../pages/admin/Pharmacies";
import Appointments from "../pages/admin/Appointments";
import Emergency from "../pages/admin/Emergency";
import Reports from "../pages/admin/Reports";
import Notifications from "../pages/admin/Notifications";
import Settings from "../pages/admin/Settings";
import AdminLogin from "../pages/admin/AdminLogin";
const AdminRoutes = () => {
  return (
    <Routes>

      <Route
  path="login"
  element={<AdminLogin />}
/>

        {/* =================================================
            ADMIN LAYOUT
        ================================================= */}

        <Route
          element={<AdminLayout />}
        >

          {/* Dashboard */}

          <Route
            index
            element={
              <Navigate
                to="dashboard"
                replace
              />
            }
          />

          <Route
            path="dashboard"
            element={<Dashboard />}
          />

          {/* Users */}

          <Route
            path="users"
            element={<Users />}
          />

          {/* Doctors */}

          <Route
            path="doctors"
            element={<Doctors />}
          />

          {/* Hospitals */}

          <Route
            path="hospitals"
            element={<Hospitals />}
          />

          {/* Diagnostics */}

          <Route
            path="diagnostics"
            element={<Diagnostics />}
          />

          {/* Pharmacies */}

          <Route
            path="pharmacies"
            element={<Pharmacies />}
          />

          {/* Appointments */}

          <Route
            path="appointments"
            element={<Appointments />}
          />

          {/* Emergency */}

          <Route
            path="emergency"
            element={<Emergency />}
          />

          {/* Reports */}

          <Route
            path="reports"
            element={<Reports />}
          />

          {/* Notifications */}

          <Route
            path="notifications"
            element={<Notifications />}
          />

          {/* Settings */}

          <Route
            path="settings"
            element={<Settings />}
          />

          {/* Unknown Admin Page */}

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
};

export default AdminRoutes;
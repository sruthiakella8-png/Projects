
import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useNavigate,
} from "react-router-dom";

import { jwtDecode } from "jwt-decode";

// =====================================================
// COMMON COMPONENTS
// =====================================================

import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

// =====================================================
// AUTH COMPONENTS
// =====================================================

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";

// =====================================================
// PUBLIC PAGES
// =====================================================

import Home from "./pages/Home";
import About from "./pages/About";
import Features from "./pages/Features";
import Help from "./pages/Help";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

// =====================================================
// USER ROUTES
// =====================================================

import PatientRoute from "./routes/PatientRoute";

// =====================================================
// ADMIN / OTHER ROUTES
// =====================================================

import AdminRoutes from "./routes/AdminRoutes";
import DiagnosticsRoutes from "./routes/DiagnosticsRoutes";
import DoctorRoutes from "./routes/DoctorRoutes";

// =====================================================
// API
// =====================================================

import axiosInstance from "./api/axiosInstance";

import {
  registerUser,
  registerDiagnostics,
  forgotPassword,
  resetPassword,
} from "./api/authAPI";


// =====================================================
// PUBLIC LAYOUT
// =====================================================

function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white">

      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />

    </div>
  );
}


// =====================================================
// AUTH LAYOUT
// =====================================================

function AuthLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Outlet />
    </div>
  );
}


// =====================================================
// COMING SOON PAGE
// =====================================================

function ComingSoonPage({
  title,
  description,
}) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-slate-50">

      <div className="text-center">

        <div
          className="
            mx-auto
            mb-6
            flex
            h-20
            w-20
            items-center
            justify-center
            rounded-3xl
            bg-gradient-to-br
            from-blue-600
            to-teal-500
            text-white
            shadow-xl
          "
        >
          <span className="text-3xl font-bold">
            MF
          </span>
        </div>

        <h1 className="text-4xl font-bold text-slate-800">
          {title}
        </h1>

        <p className="mt-3 text-slate-500">
          {description}
        </p>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="
            mt-7
            rounded-xl
            bg-gradient-to-r
            from-blue-600
            to-teal-500
            px-7
            py-3
            font-semibold
            text-white
            shadow-lg
            transition
            hover:scale-105
            hover:shadow-xl
          "
        >
          Go Home
        </button>

      </div>

    </div>
  );
}


// =====================================================
// 404 PAGE
// =====================================================

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-slate-50">

      <div className="text-center">

        <div className="text-8xl font-extrabold text-slate-800">
          404
        </div>

        <h1 className="mt-4 text-3xl font-bold text-slate-700">
          Page Not Found
        </h1>

        <p className="mt-3 text-slate-500">
          The page you are looking for does not exist.
        </p>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="
            mt-7
            rounded-xl
            bg-gradient-to-r
            from-blue-600
            to-teal-500
            px-7
            py-3
            font-semibold
            text-white
            shadow-lg
            transition
            hover:scale-105
            hover:shadow-xl
          "
        >
          Back to Home
        </button>

      </div>

    </div>
  );
}


// =====================================================
// ROLE NORMALIZER
// =====================================================

function normalizeRole(value) {

  if (!value) {
    return "";
  }

  const role = String(value)
    .trim()
    .toLowerCase();

  switch (role) {

    case "admin":
      return "admin";

    case "doctor":
    case "dr":
      return "doctor";

    case "diagnostic":
    case "diagnostics":
    case "lab":
    case "laboratory":
      return "diagnostics";

    case "pharmacy":
    case "pharmacist":
      return "pharmacy";

    case "hospital":
      return "hospital";

    case "patient":
    case "user":
      return "patient";

    default:
      return "";
  }
}


// =====================================================
// CLEAR AUTHENTICATION DATA
// =====================================================

function clearAuthenticationData() {

  localStorage.removeItem(
    "access_token"
  );

  localStorage.removeItem(
    "refresh_token"
  );

  localStorage.removeItem(
    "accountType"
  );

  localStorage.removeItem(
    "role"
  );

  localStorage.removeItem(
    "user_role"
  );

  localStorage.removeItem(
    "userType"
  );

  localStorage.removeItem(
    "user_type"
  );

  localStorage.removeItem(
    "username"
  );

  localStorage.removeItem(
    "doctor"
  );

  localStorage.removeItem(
    "doctor_name"
  );

  localStorage.removeItem(
    "doctor_specialization"
  );

  localStorage.removeItem(
    "doctor_avatar"
  );
}


// =====================================================
// SAVE AUTHENTICATION DATA
// =====================================================

function saveAuthenticationData({
  accessToken,
  refreshToken,
  role,
}) {

  localStorage.setItem(
    "access_token",
    accessToken
  );

  if (refreshToken) {

    localStorage.setItem(
      "refresh_token",
      refreshToken
    );
  }

  if (role) {

    localStorage.setItem(
      "role",
      role
    );

    localStorage.setItem(
      "accountType",
      role
    );
  }
}


// =====================================================
// MAIN APP ROUTES
// =====================================================

function AppRoutes() {

  const navigate = useNavigate();


  // ===================================================
  // REGISTER
  // ===================================================

  const handleRegister = async (
    formData
  ) => {

    try {

      console.log(
        "================================"
      );

      console.log(
        "REGISTER STARTED"
      );

      console.log(
        "REGISTER DATA:",
        formData
      );

      console.log(
        "================================"
      );


      const role = String(
        formData?.role ||
        formData?.user_type ||
        formData?.account_type ||
        ""
      )
        .trim()
        .toLowerCase();


      console.log(
        "REGISTER ROLE:",
        role
      );


      // =================================================
      // DIAGNOSTICS REGISTRATION
      // =================================================

      if (
        role === "diagnostics" ||
        role === "diagnostic" ||
        role === "diagnostic_center" ||
        role === "diagnostic-center"
      ) {

        console.log(
          "REGISTERING DIAGNOSTICS CENTER"
        );

        await registerDiagnostics(
          formData
        );

      }

      // =================================================
      // NORMAL REGISTRATION
      // =================================================

      else {

        console.log(
          "REGISTERING NORMAL USER"
        );

        await registerUser(
          formData
        );
      }


      alert(
        "Registration successful! Please login."
      );


      navigate(
        "/login",
        {
          replace: true,
        }
      );

    }

    catch (error) {

      console.error(
        "REGISTRATION ERROR:",
        error
      );

      console.error(
        "BACKEND RESPONSE:",
        error?.response?.data
      );


      const message =
        error?.response?.data?.detail ||
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Registration failed. Please try again.";


      throw new Error(
        message
      );
    }
  };


  // ===================================================
  // LOGIN
  // ===================================================

  const handleLogin = async (
    loginData
  ) => {

    try {

      console.log(
        "================================"
      );

      console.log(
        "LOGIN STARTED"
      );

      console.log(
        "LOGIN DATA:",
        loginData
      );

      console.log(
        "================================"
      );


      // =================================================
      // GET SELECTED ACCOUNT TYPE
      // =================================================

      const selectedAccountType =
        normalizeRole(
          loginData?.accountType ||
          loginData?.role ||
          loginData?.userType ||
          loginData?.user_type
        );


      console.log(
        "SELECTED ACCOUNT TYPE:",
        selectedAccountType
      );


      // =================================================
      // CLEAR OLD AUTH DATA
      // =================================================

      clearAuthenticationData();


      // =================================================
      // LOGIN REQUEST
      // =================================================

      const response =
        await axiosInstance.post(
          "/auth/token/",
          {
            username:
              loginData?.username,

            password:
              loginData?.password,
          }
        );


      console.log(
        "LOGIN RESPONSE:",
        response.data
      );


      // =================================================
      // GET TOKENS
      // =================================================

      const accessToken =
        response?.data?.access;

      const refreshToken =
        response?.data?.refresh;


      if (!accessToken) {

        throw new Error(
          "Access token was not returned by the server."
        );
      }


      // =================================================
      // DECODE JWT
      // =================================================

      let decodedToken = {};


      try {

        decodedToken =
          jwtDecode(
            accessToken
          );

        console.log(
          "DECODED JWT:",
          decodedToken
        );

      }

      catch (decodeError) {

        console.error(
          "JWT DECODE ERROR:",
          decodeError
        );

        throw new Error(
          "Invalid access token received from server."
        );
      }


      // =================================================
      // GET ROLE FROM JWT
      // =================================================

      const jwtRole =
        normalizeRole(
          decodedToken?.role ||
          decodedToken?.user_role ||
          decodedToken?.userType ||
          decodedToken?.user_type ||
          decodedToken?.account_type ||
          decodedToken?.accountType
        );


      // =================================================
      // GET ROLE FROM BACKEND RESPONSE
      // =================================================

      const backendRole =
        normalizeRole(
          response?.data?.role ||
          response?.data?.user_role ||
          response?.data?.userType ||
          response?.data?.user_type ||
          response?.data?.account_type ||
          response?.data?.accountType
        );


      // =================================================
      // DETERMINE FINAL ROLE
      // =================================================

      const finalRole =
        jwtRole ||
        backendRole ||
        selectedAccountType;


      console.log(
        "JWT ROLE:",
        jwtRole
      );

      console.log(
        "BACKEND ROLE:",
        backendRole
      );

      console.log(
        "SELECTED ROLE:",
        selectedAccountType
      );

      console.log(
        "FINAL ROLE:",
        finalRole
      );


      // =================================================
      // VALIDATE ROLE
      // =================================================

      if (!finalRole) {

        clearAuthenticationData();

        throw new Error(
          "User role was not returned by the server. Please check your Django login API."
        );
      }


      // =================================================
      // CHECK ACCOUNT TYPE MISMATCH
      // =================================================

      const serverRole =
        jwtRole ||
        backendRole;


      if (
        selectedAccountType &&
        serverRole &&
        selectedAccountType !== serverRole
      ) {

        console.error(
          "ACCOUNT TYPE MISMATCH:",
          {
            selectedAccountType,
            serverRole,
          }
        );


        clearAuthenticationData();


        throw new Error(
          `This username belongs to a ${serverRole} account. Please select ${serverRole} and login again.`
        );
      }


      // =================================================
      // SAVE AUTHENTICATION
      // =================================================

      saveAuthenticationData({
        accessToken,
        refreshToken,
        role: finalRole,
      });


      // =================================================
      // SAVE USERNAME
      // =================================================

      localStorage.setItem(
        "username",
        loginData?.username || ""
      );


      // =================================================
      // SAVE DOCTOR INFORMATION
      // =================================================

      if (
        finalRole === "doctor"
      ) {

        const doctorData = {

          username:
            loginData?.username || "",

          name:
            response?.data?.name ||
            response?.data?.full_name ||
            response?.data?.username ||
            loginData?.username ||
            "",

          full_name:
            response?.data?.full_name ||
            response?.data?.name ||
            response?.data?.username ||
            loginData?.username ||
            "",

          specialization:
            response?.data?.specialization ||
            "Medical Specialist",

          email:
            response?.data?.email ||
            "",

          phone:
            response?.data?.phone ||
            "",

          profile_image:
            response?.data?.profile_image ||
            response?.data?.avatar ||
            response?.data?.avatarUrl ||
            "",

          avatarUrl:
            response?.data?.profile_image ||
            response?.data?.avatar ||
            response?.data?.avatarUrl ||
            "",
        };


        localStorage.setItem(
          "doctor",
          JSON.stringify(
            doctorData
          )
        );


        localStorage.setItem(
          "doctor_name",
          doctorData.name
        );


        localStorage.setItem(
          "doctor_specialization",
          doctorData.specialization
        );


        if (
          doctorData.profile_image
        ) {

          localStorage.setItem(
            "doctor_avatar",
            doctorData.profile_image
          );
        }
      }


      // =================================================
      // FINAL REDIRECTION
      // =================================================

      switch (finalRole) {

        // ===============================================
        // ADMIN
        // ===============================================

        case "admin":

          console.log(
            "REDIRECT → ADMIN"
          );

          navigate(
            "/admin/dashboard",
            {
              replace: true,
            }
          );

          break;


        // ===============================================
        // DOCTOR
        // ===============================================

        case "doctor":

          console.log(
            "REDIRECT → DOCTOR"
          );

          navigate(
            "/doctor/dashboard",
            {
              replace: true,
            }
          );

          break;


        // ===============================================
        // HOSPITAL
        // ===============================================

        case "hospital":

          console.log(
            "REDIRECT → HOSPITAL"
          );

          navigate(
            "/hospital-dashboard",
            {
              replace: true,
            }
          );

          break;


        // ===============================================
        // DIAGNOSTICS
        // ===============================================

        case "diagnostics":

          console.log(
            "REDIRECT → DIAGNOSTICS"
          );

          navigate(
            "/diagnostics/dashboard",
            {
              replace: true,
            }
          );

          break;


        // ===============================================
        // PHARMACY
        // ===============================================

        case "pharmacy":

          console.log(
            "REDIRECT → PHARMACY"
          );

          navigate(
            "/pharmacy-dashboard",
            {
              replace: true,
            }
          );

          break;


        // ===============================================
        // PATIENT
        // ===============================================

        case "patient":

          console.log(
            "REDIRECT → PATIENT"
          );

          navigate(
            "/patient/dashboard",
            {
              replace: true,
            }
          );

          break;


        // ===============================================
        // UNKNOWN
        // ===============================================

        default:

          clearAuthenticationData();

          throw new Error(
            `Unknown user role: ${finalRole}`
          );
      }

    }

    catch (error) {

      console.error(
        "================================"
      );

      console.error(
        "LOGIN ERROR:",
        error
      );

      console.error(
        "BACKEND RESPONSE:",
        error?.response?.data
      );

      console.error(
        "STATUS:",
        error?.response?.status
      );

      console.error(
        "================================"
      );


      const message =
        error?.response?.data?.detail ||
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Login failed. Please check your username and password.";


      throw new Error(
        message
      );
    }
  };


  // ===================================================
  // FORGOT PASSWORD
  // ===================================================

  const handleForgotPassword = async (
    email
  ) => {

    try {

      console.log(
        "FORGOT PASSWORD:",
        email
      );


      await forgotPassword(
        email
      );


      alert(
        "Password reset link has been sent to your email."
      );

    }

    catch (error) {

      console.error(
        "FORGOT PASSWORD ERROR:",
        error
      );


      const message =
        error?.response?.data?.detail ||
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Unable to send reset link.";


      alert(
        message
      );
    }
  };


  // ===================================================
  // RESET PASSWORD
  // ===================================================

  const handleResetPassword = async (
    uid,
    token,
    password
  ) => {

    try {

      console.log(
        "RESET PASSWORD REQUEST"
      );


      await resetPassword(
        uid,
        token,
        password
      );


      alert(
        "Password reset successful!"
      );


      navigate(
        "/login",
        {
          replace: true,
        }
      );

    }

    catch (error) {

      console.error(
        "RESET PASSWORD ERROR:",
        error
      );


      const message =
        error?.response?.data?.detail ||
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Password reset failed.";


      alert(
        message
      );
    }
  };


  // ===================================================
  // ROUTES
  // ===================================================

  return (

    <Routes>

      {/* =================================================
          PUBLIC WEBSITE
      ================================================= */}

      <Route
        element={
          <PublicLayout />
        }
      >

        <Route
          path="/"
          element={
            <Home />
          }
        />

        <Route
          path="/about"
          element={
            <About />
          }
        />

        <Route
          path="/features"
          element={
            <Features />
          }
        />

        <Route
          path="/help"
          element={
            <Help />
          }
        />

        <Route
          path="/contact"
          element={
            <Contact />
          }
        />

        <Route
          path="/privacy"
          element={
            <Privacy />
          }
        />

        <Route
          path="/terms"
          element={
            <Terms />
          }
        />

      </Route>


      {/* =================================================
          AUTHENTICATION
      ================================================= */}

      <Route
        element={
          <AuthLayout />
        }
      >

        <Route
          path="/login"
          element={
            <Login
              onLogin={handleLogin}
            />
          }
        />

        <Route
          path="/register"
          element={
            <Register
              onRegister={handleRegister}
            />
          }
        />

        <Route
          path="/forgot-password"
          element={
            <ForgotPassword
              onForgotPassword={
                handleForgotPassword
              }
            />
          }
        />

        <Route
          path="/reset-password/:uid/:token"
          element={
            <ResetPassword
              onResetPassword={
                handleResetPassword
              }
            />
          }
        />

        <Route
          path="/reset-password"
          element={
            <ResetPassword
              onResetPassword={
                handleResetPassword
              }
            />
          }
        />

      </Route>


      {/* =================================================
          PATIENT / USER PORTAL
      ================================================= */}

      <Route
        path="/patient/*"
        element={
          <PatientRoute />
        }
      />


      {/* =================================================
          ADMIN PORTAL
      ================================================= */}

      <Route
        path="/admin/*"
        element={
          <AdminRoutes />
        }
      />


      {/* =================================================
          DOCTOR PORTAL
      ================================================= */}

      <Route
        path="/doctor/*"
        element={
          <DoctorRoutes />
        }
      />


      {/* =================================================
          HOSPITAL DASHBOARD
      ================================================= */}

      <Route
        path="/hospital-dashboard"
        element={
          <ComingSoonPage
            title="Hospital Dashboard"
            description="Hospital portal coming soon."
          />
        }
      />


      {/* =================================================
          DIAGNOSTICS PORTAL
      ================================================= */}

      <Route
        path="/diagnostics/*"
        element={
          <DiagnosticsRoutes />
        }
      />


      {/* =================================================
          DIAGNOSTICS FALLBACK
      ================================================= */}

      <Route
        path="/diagnostics-dashboard"
        element={
          <ComingSoonPage
            title="Diagnostics Dashboard"
            description="Diagnostics portal coming soon."
          />
        }
      />


      {/* =================================================
          PHARMACY DASHBOARD
      ================================================= */}

      <Route
        path="/pharmacy-dashboard"
        element={
          <ComingSoonPage
            title="Pharmacy Dashboard"
            description="Pharmacy portal coming soon."
          />
        }
      />


      {/* =================================================
          404
      ================================================= */}

      <Route
        path="*"
        element={
          <NotFound />
        }
      />

    </Routes>
  );
}


// =====================================================
// MAIN APP
// =====================================================

function App() {

  return (

    <BrowserRouter>

      <AppRoutes />

    </BrowserRouter>
  );
}


export default App;

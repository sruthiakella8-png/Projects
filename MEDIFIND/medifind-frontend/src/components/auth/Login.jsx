import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-hot-toast";

import {
  MapPin,
  UserRound,
  Stethoscope,
  FlaskConical,
  Pill,
  LockKeyhole,
  Eye,
  EyeOff,
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

// =========================================================
// ACCOUNT TYPES
// =========================================================

const ACCOUNT_TYPES = [
  {
    value: "patient",
    label: "Patient",
    icon: UserRound,
  },
  {
    value: "doctor",
    label: "Doctor",
    icon: Stethoscope,
  },
  {
    value: "diagnostics",
    label: "Diagnostics",
    icon: FlaskConical,
  },
  {
    value: "pharmacy",
    label: "Pharmacy",
    icon: Pill,
  },
];

// =========================================================
// DASHBOARD ROUTES
// =========================================================

const DASHBOARD_ROUTES = {
  patient: "/patient/dashboard",
  user: "/patient/dashboard",
  doctor: "/doctor/dashboard",
  hospital: "/hospital-dashboard",
  diagnostics: "/diagnostics/dashboard",
  pharmacy: "/pharmacy/dashboard",
  admin: "/admin/dashboard",
};

// =========================================================
// ROLE NORMALIZER
// =========================================================

const normalizeRole = (role) => {
  if (!role) {
    return "";
  }

  const value = String(role).trim().toLowerCase();

  switch (value) {
    case "user":
    case "patient":
      return "patient";

    case "doctor":
    case "dr":
      return "doctor";

    case "hospital":
      return "hospital";

    case "diagnostic":
    case "diagnostics":
    case "lab":
    case "laboratory":
      return "diagnostics";

    case "pharmacy":
    case "pharmacist":
      return "pharmacy";

    case "admin":
      return "admin";

    default:
      return "";
  }
};

// =========================================================
// ROLE LABEL
// =========================================================

const getRoleLabel = (role) => {
  switch (normalizeRole(role)) {
    case "patient":
      return "Patient";

    case "doctor":
      return "Doctor";

    case "hospital":
      return "Hospital";

    case "diagnostics":
      return "Diagnostics";

    case "pharmacy":
      return "Pharmacy";

    case "admin":
      return "Admin";

    default:
      return role || "Unknown";
  }
};

// =========================================================
// CLEAR LOGIN STORAGE
// =========================================================

const clearLoginStorage = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");

  localStorage.removeItem("accountType");
  localStorage.removeItem("role");

  localStorage.removeItem("user");
  localStorage.removeItem("login_user");
  localStorage.removeItem("username");
  localStorage.removeItem("email");

  // Doctor
  localStorage.removeItem("doctor");
  localStorage.removeItem("doctor_id");
  localStorage.removeItem("doctor_name");
  localStorage.removeItem("doctor_specialization");
  localStorage.removeItem("doctor_avatar");

  // Diagnostics
  localStorage.removeItem("diagnostics");
  localStorage.removeItem("diagnostics_id");
  localStorage.removeItem("diagnostics_name");
  localStorage.removeItem("diagnostics_email");
};

// =========================================================
// GPS LOGO
// =========================================================

function GPSLogo({ size = 56 }) {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        width: size,
        height: size,
      }}
    >
      <MapPin
        size={size}
        strokeWidth={2.5}
        className="text-white"
        fill="rgba(255,255,255,0.08)"
      />

      <span
        className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 font-black text-white"
        style={{
          fontSize: size * 0.32,
        }}
      >
        +
      </span>
    </div>
  );
}

// =========================================================
// LOGIN COMPONENT
// =========================================================

export default function Login() {
  const navigate = useNavigate();

  // =======================================================
  // STATE
  // =======================================================

  const [accountType, setAccountType] = useState("patient");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =======================================================
  // FORM CHANGE
  // =======================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  // =======================================================
  // ACCOUNT TYPE CHANGE
  // =======================================================

  const handleAccountTypeChange = (type) => {
    if (loading) {
      return;
    }

    setAccountType(type);
    setError("");
    setSuccess("");
  };

  // =======================================================
  // VALIDATE FORM
  // =======================================================

  const validateForm = () => {
    if (!formData.username.trim()) {
      return "Please enter your username.";
    }

    if (!formData.password) {
      return "Please enter your password.";
    }

    return "";
  };

  // =======================================================
  // SAVE COMMON USER DATA
  // =======================================================

  const saveCommonUserData = ({
    responseData,
    decodedToken,
    username,
    role,
  }) => {
    const userData = {
      username:
        responseData?.username ||
        decodedToken?.username ||
        username,

      email:
        responseData?.email ||
        decodedToken?.email ||
        "",

      role,

      is_verified:
        responseData?.is_verified ??
        decodedToken?.is_verified ??
        true,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    localStorage.setItem(
      "login_user",
      JSON.stringify(responseData)
    );

    localStorage.setItem(
      "username",
      userData.username
    );

    if (userData.email) {
      localStorage.setItem(
        "email",
        userData.email
      );
    }
  };

  // =======================================================
  // SAVE DOCTOR DATA
  // =======================================================

  const saveDoctorData = ({
    responseData,
    decodedToken,
    username,
  }) => {
    const doctorName =
      responseData?.name ||
      responseData?.full_name ||
      responseData?.fullName ||
      decodedToken?.name ||
      decodedToken?.full_name ||
      decodedToken?.fullName ||
      username;

    const specialization =
      responseData?.specialization ||
      responseData?.speciality ||
      responseData?.specialty ||
      decodedToken?.specialization ||
      decodedToken?.speciality ||
      "Medical Specialist";

    const doctorId =
      responseData?.doctor_id ||
      responseData?.doctorId ||
      responseData?.registration_no ||
      responseData?.registrationNumber ||
      decodedToken?.doctor_id ||
      decodedToken?.doctorId ||
      decodedToken?.registration_no ||
      decodedToken?.registrationNumber ||
      decodedToken?.user_id ||
      decodedToken?.userId ||
      "";

    const avatarUrl =
      responseData?.avatar ||
      responseData?.avatarUrl ||
      responseData?.profile_image ||
      responseData?.profileImage ||
      "";

    const doctorData = {
      id: doctorId,

      doctor_id:
        responseData?.doctor_id ||
        decodedToken?.doctor_id ||
        null,

      name: doctorName,

      username,

      specialization,

      avatarUrl,

      email:
        responseData?.email ||
        decodedToken?.email ||
        "",

      phone:
        responseData?.phone ||
        decodedToken?.phone ||
        "",

      verification_status:
        responseData?.verification_status ||
        "pending",
    };

    localStorage.setItem(
      "doctor",
      JSON.stringify(doctorData)
    );

    localStorage.setItem(
      "doctor_id",
      String(doctorId || "")
    );

    localStorage.setItem(
      "doctor_name",
      doctorName
    );

    localStorage.setItem(
      "doctor_specialization",
      specialization
    );

    if (avatarUrl) {
      localStorage.setItem(
        "doctor_avatar",
        avatarUrl
      );
    }

    console.log("SAVED DOCTOR:", doctorData);
  };

  // =======================================================
  // SAVE DIAGNOSTICS DATA
  // =======================================================

  const saveDiagnosticsData = ({
  responseData,
  username,
}) => {
  const diagnosticsToStore = {
    name: responseData?.username || username,
    center_name: responseData?.username || username,
    username: responseData?.username || username,
    email: responseData?.email || "",
    user_id: responseData?.user_id ?? null,
    role: responseData?.role || "diagnostics",
  };

  localStorage.setItem(
    "diagnostics",
    JSON.stringify(diagnosticsToStore)
  );

  console.log(
    "SAVED DIAGNOSTICS:",
    diagnosticsToStore
  );
};
  // =======================================================
  // LOGIN SUBMIT
  // =======================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    // -----------------------------------------------------
    // VALIDATION
    // -----------------------------------------------------

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      toast.error(validationError);
      return;
    }

    const cleanUsername = formData.username.trim();

    setLoading(true);

    console.log("=================================");
    console.log("LOGIN STARTED");
    console.log("SELECTED ACCOUNT:", accountType);
    console.log("USERNAME:", cleanUsername);
    console.log("=================================");

    try {
      // -----------------------------------------------------
      // CLEAR PREVIOUS LOGIN DATA
      // -----------------------------------------------------

      clearLoginStorage();

      // -----------------------------------------------------
      // LOGIN REQUEST
      // -----------------------------------------------------

     let response = await axios.post(
  "http://127.0.0.1:8000/api/auth/token/",
  {
    username: cleanUsername,
    password: formData.password,
  },
  {
    headers: {
      "Content-Type": "application/json",
    },
  }
);

      // -----------------------------------------------------
      // LOGIN RESPONSE
      // -----------------------------------------------------

      console.log("LOGIN RESPONSE:", response.data);

      // -----------------------------------------------------
      // GET TOKENS
      // -----------------------------------------------------

      const accessToken = response?.data?.access;
      const refreshToken = response?.data?.refresh;

      if (!accessToken) {
        throw new Error(
          "Access token was not returned by the server."
        );
      }

      // -----------------------------------------------------
      // DECODE JWT
      // -----------------------------------------------------

      let decodedToken = {};

      try {
        decodedToken = jwtDecode(accessToken);

        console.log(
          "DECODED JWT:",
          decodedToken
        );
      } catch (decodeError) {
        console.error(
          "JWT DECODE ERROR:",
          decodeError
        );

        throw new Error(
          "Invalid authentication token received."
        );
      }

      // -----------------------------------------------------
      // GET ROLE FROM RESPONSE
      // -----------------------------------------------------

      const responseRole =
        response?.data?.role ||
        response?.data?.user_role ||
        response?.data?.user_type ||
        response?.data?.userType ||
        response?.data?.account_type ||
        response?.data?.accountType;

      // -----------------------------------------------------
      // GET ROLE FROM JWT
      // -----------------------------------------------------

      const jwtRole =
        decodedToken?.role ||
        decodedToken?.user_role ||
        decodedToken?.user_type ||
        decodedToken?.userType ||
        decodedToken?.account_type ||
        decodedToken?.accountType;

      // -----------------------------------------------------
      // NORMALIZE ROLES
      // -----------------------------------------------------

      const backendRole =
        normalizeRole(responseRole);

      const decodedRole =
        normalizeRole(jwtRole);

      const selectedRole =
        normalizeRole(accountType);

      // -----------------------------------------------------
      // DETERMINE FINAL ROLE
      // -----------------------------------------------------

      const returnedRole =
        backendRole ||
        decodedRole ||
        selectedRole;

      console.log(
        "RESPONSE ROLE:",
        backendRole
      );

      console.log(
        "JWT ROLE:",
        decodedRole
      );

      console.log(
        "SELECTED ROLE:",
        selectedRole
      );

      console.log(
        "FINAL ROLE:",
        returnedRole
      );

      // -----------------------------------------------------
      // ROLE MUST EXIST
      // -----------------------------------------------------

      if (!returnedRole) {
        clearLoginStorage();

        throw new Error(
          "Your account role could not be determined. Please contact support."
        );
      }

      // -----------------------------------------------------
      // ACCOUNT TYPE SECURITY CHECK
      // -----------------------------------------------------

      if (
        returnedRole !== "admin" &&
        selectedRole !== returnedRole
      ) {
        console.error(
          "ACCOUNT TYPE MISMATCH:",
          {
            selectedAccountType: selectedRole,
            actualAccountRole: returnedRole,
          }
        );

        clearLoginStorage();

        const selectedAccountName =
          getRoleLabel(selectedRole);

        const actualAccountName =
          getRoleLabel(returnedRole);

        const mismatchMessage =
          `These credentials belong to a ${actualAccountName} account, ` +
          `not a ${selectedAccountName} account. ` +
          `Please select ${actualAccountName} and try again.`;

        setError(mismatchMessage);

        toast.error(mismatchMessage);

        setLoading(false);

        return;
      }

      // -----------------------------------------------------
      // SAVE TOKENS
      // -----------------------------------------------------

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

      // -----------------------------------------------------
      // SAVE ROLE
      // -----------------------------------------------------

      localStorage.setItem(
        "role",
        returnedRole
      );

      localStorage.setItem(
        "accountType",
        returnedRole
      );

      // -----------------------------------------------------
      // SAVE COMMON USER DATA
      // -----------------------------------------------------

      saveCommonUserData({
        responseData: response.data,
        decodedToken,
        username: cleanUsername,
        role: returnedRole,
      });

      // -----------------------------------------------------
      // SAVE DOCTOR DATA
      // -----------------------------------------------------

      if (returnedRole === "doctor") {
        saveDoctorData({
          responseData: response.data,
          decodedToken,
          username: cleanUsername,
        });
      }

      // -----------------------------------------------------
      // SAVE DIAGNOSTICS DATA
      // -----------------------------------------------------

      if (returnedRole === "diagnostics") {
        saveDiagnosticsData({
          responseData: response.data,
          decodedToken,
          username: cleanUsername,
        });
      }

      // -----------------------------------------------------
      // SUCCESS
      // -----------------------------------------------------

      setSuccess(
        "Login successful. Redirecting..."
      );

      toast.success("Login successful!");

      // -----------------------------------------------------
      // GET DASHBOARD
      // -----------------------------------------------------

      const dashboard =
        DASHBOARD_ROUTES[returnedRole];

      if (!dashboard) {
        throw new Error(
          `No dashboard configured for role: ${returnedRole}`
        );
      }

      console.log(
        "REDIRECTING TO:",
        dashboard
      );

      // -----------------------------------------------------
      // REDIRECT
      // -----------------------------------------------------

      setTimeout(() => {
        navigate(dashboard, {
          replace: true,
        });
      }, 500);

    } catch (loginError) {
      console.error(
        "================================="
      );

      console.error(
        "LOGIN ERROR:",
        loginError
      );

      console.error(
        "BACKEND RESPONSE:",
        loginError?.response?.data
      );

      console.error(
        "STATUS:",
        loginError?.response?.status
      );

      console.error(
        "================================="
      );

      clearLoginStorage();

      // -----------------------------------------------------
      // BACKEND RESPONSE ERROR
      // -----------------------------------------------------

      if (loginError?.response) {
        const status =
          loginError.response.status;

        const backendData =
          loginError.response.data;

        let message =
          "Login failed. Please try again.";

        // 401
        if (status === 401) {
          message =
            backendData?.detail ||
            "Invalid username or password.";
        }

        // 400
        else if (status === 400) {
          message =
            backendData?.detail ||
            backendData?.message ||
            backendData?.non_field_errors?.[0] ||
            backendData?.username?.[0] ||
            backendData?.password?.[0] ||
            "Invalid login details.";
        }

        // 403
        else if (status === 403) {
          message =
            backendData?.detail ||
            "You are not authorized to login.";
        }

        // 404
        else if (status === 404) {
          message =
            "Login API was not found. Check that /api/auth/token/ exists in Django.";
        }

        // 500+
        else if (status >= 500) {
          message =
            "Django server error. Please check the backend console.";
        }

        else {
          message =
            backendData?.detail ||
            backendData?.message ||
            "Login failed. Please try again.";
        }

        setError(message);
        toast.error(message);
      }

      // -----------------------------------------------------
      // SERVER CONNECTION ERROR
      // -----------------------------------------------------

      else if (loginError?.request) {
        const message =
          "Cannot connect to Django. Please make sure the backend is running on port 8000.";

        setError(message);

        toast.error(
          "Cannot connect to Django."
        );
      }

      // -----------------------------------------------------
      // GENERAL ERROR
      // -----------------------------------------------------

      else {
        const message =
          loginError?.message ||
          "Something went wrong. Please try again.";

        setError(message);

        toast.error(message);
      }
    } finally {
      setLoading(false);
    }
  };

  // =======================================================
  // JSX
  // =======================================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">

      {/* HEADER */}

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">

          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#2563EB] to-[#14B8A6] shadow-sm">
              <MapPin
                size={23}
                className="text-white"
              />
            </div>

            <div>
              <h1 className="text-xl font-bold leading-none">
                <span className="text-blue-600">
                  Medi
                </span>

                <span className="text-teal-500">
                  Find
                </span>
              </h1>

              <p className="mt-1 text-xs text-slate-400">
                Healthcare made simpler
              </p>
            </div>
          </Link>

          <div className="hidden text-sm text-slate-500 sm:block">
            Don't have an account?

            <Link
              to="/register"
              className="ml-2 font-bold text-blue-600 transition hover:text-teal-500"
            >
              Create Account
            </Link>
          </div>
        </div>
      </header>

      {/* MAIN */}

      <main className="px-4 py-8 sm:py-12">
        <div className="mx-auto max-w-5xl">

          {/* TITLE */}

          <div className="mb-8 text-center">

            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
              <ShieldCheck size={27} />
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Your Healthcare,

              <span className="block bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                Your Way
              </span>
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500 sm:text-base">
              Sign in to connect with trusted
              healthcare services and
              professionals.
            </p>
          </div>

          {/* LOGIN CARD */}

          <div className="grid overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.12)] lg:grid-cols-[0.85fr_1.15fr]">

            {/* LEFT PANEL */}

            <div className="hidden bg-gradient-to-br from-[#2563EB] via-[#1598C5] to-[#14B8A6] p-10 text-white lg:block">

              <div className="flex h-full flex-col justify-between">

                <div>

                  <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                    <GPSLogo size={38} />
                  </div>

                  <h3 className="text-3xl font-extrabold leading-tight">
                    Healthcare
                    <br />
                    connected to you.
                  </h3>

                  <p className="mt-5 max-w-sm text-sm leading-6 text-white/85">
                    Access doctors, hospitals,
                    diagnostic services and
                    healthcare solutions from
                    one place.
                  </p>

                </div>

                <div className="mt-10 space-y-4">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                      <ShieldCheck size={20} />
                    </div>

                    <div>
                      <p className="font-semibold">
                        Secure Login
                      </p>

                      <p className="text-sm text-blue-100">
                        Your account is protected
                      </p>
                    </div>

                  </div>

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                      <MapPin size={20} />
                    </div>

                    <div>
                      <p className="font-semibold">
                        Find Healthcare
                      </p>

                      <p className="text-sm text-blue-100">
                        Connect with providers
                      </p>
                    </div>

                  </div>

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                      <Stethoscope size={20} />
                    </div>

                    <div>
                      <p className="font-semibold">
                        Trusted Professionals
                      </p>

                      <p className="text-sm text-blue-100">
                        Healthcare when you need it
                      </p>
                    </div>

                  </div>

                </div>

              </div>
            </div>

            {/* RIGHT PANEL */}

            <div className="p-6 sm:p-8 lg:p-10">

              <div className="mb-7">

                <p className="text-sm font-bold uppercase tracking-wide text-blue-600">
                  MEDIFIND ACCOUNT
                </p>

                <h3 className="mt-1 text-2xl font-extrabold text-slate-900">
                  Login to your account
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Select your account type below.
                </p>

              </div>

              {/* ACCOUNT TYPES */}

              <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-4">

                {ACCOUNT_TYPES.map((account) => {
                  const Icon = account.icon;

                  const selected =
                    accountType === account.value;

                  return (
                    <button
                      key={account.value}
                      type="button"
                      onClick={() =>
                        handleAccountTypeChange(
                          account.value
                        )
                      }
                      disabled={loading}
                      aria-pressed={selected}
                      className={`
                        flex min-h-[78px]
                        flex-col items-center
                        justify-center
                        gap-2 rounded-xl
                        border-2 p-3
                        transition-all duration-200
                        disabled:cursor-not-allowed
                        disabled:opacity-60

                        ${
                          selected
                            ? "border-blue-600 bg-blue-50 text-blue-600 shadow-sm"
                            : "border-slate-200 bg-white text-slate-500 hover:border-blue-300 hover:bg-blue-50/50"
                        }
                      `}
                    >
                      <Icon
                        size={21}
                        strokeWidth={1.8}
                      />

                      <span className="text-xs font-semibold">
                        {account.label}
                      </span>
                    </button>
                  );
                })}

              </div>

              {/* ERROR */}

              {error && (
                <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">

                  <AlertCircle
                    size={19}
                    className="mt-0.5 shrink-0"
                  />

                  <div>

                    <p className="font-semibold">
                      Login failed
                    </p>

                    <p className="mt-1 leading-5">
                      {error}
                    </p>

                  </div>

                </div>
              )}

              {/* SUCCESS */}

              {success && (
                <div className="mb-5 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">

                  <CheckCircle2 size={19} />

                  <p>{success}</p>

                </div>
              )}

              {/* LOGIN FORM */}

              <form
                onSubmit={handleSubmit}
                noValidate
                className="space-y-5"
              >

                {/* USERNAME */}

                <div>

                  <label
                    htmlFor="username"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Username
                  </label>

                  <div className="relative">

                    <UserRound
                      size={19}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="username"
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Enter your username"
                      autoComplete="username"
                      disabled={loading}
                      className="
                        h-12 w-full rounded-xl
                        border border-slate-300
                        bg-white
                        pl-11 pr-4
                        text-sm text-slate-800
                        outline-none
                        transition
                        placeholder:text-slate-400
                        focus:border-blue-500
                        focus:ring-4
                        focus:ring-blue-100
                        disabled:cursor-not-allowed
                        disabled:bg-slate-100
                      "
                    />

                  </div>

                </div>

                {/* PASSWORD */}

                <div>

                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Password
                  </label>

                  <div className="relative">

                    <LockKeyhole
                      size={19}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      disabled={loading}
                      className="
                        h-12 w-full rounded-xl
                        border border-slate-300
                        bg-white
                        pl-11 pr-12
                        text-sm text-slate-800
                        outline-none
                        transition
                        placeholder:text-slate-400
                        focus:border-blue-500
                        focus:ring-4
                        focus:ring-blue-100
                        disabled:cursor-not-allowed
                        disabled:bg-slate-100
                      "
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          (previous) => !previous
                        )
                      }
                      disabled={loading}
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                      className="
                        absolute right-4
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                        transition
                        hover:text-blue-600
                        disabled:cursor-not-allowed
                      "
                    >
                      {showPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>

                  </div>

                </div>

                {/* FORGOT PASSWORD */}

                <div className="flex justify-end">

                  <Link
                    to="/forgot-password"
                    className="text-sm font-semibold text-blue-600 transition hover:text-teal-500 hover:underline"
                  >
                    Forgot Password?
                  </Link>

                </div>

                {/* LOGIN BUTTON */}

                <button
                  type="submit"
                  disabled={loading}
                  className="
                    flex h-12 w-full
                    items-center justify-center
                    gap-2 rounded-xl
                    bg-gradient-to-r
                    from-[#2563EB]
                    to-[#14B8A6]
                    text-sm font-bold
                    text-white
                    shadow-lg
                    shadow-blue-200
                    transition-all
                    hover:-translate-y-0.5
                    hover:shadow-xl
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >

                  {loading ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                      Signing in...
                    </>
                  ) : (
                    <>
                      Login to MediFind

                      <ArrowRight size={19} />
                    </>
                  )}

                </button>

              </form>

              {/* REGISTER */}

              <div className="mt-7 border-t border-slate-100 pt-6 text-center">

                <p className="text-sm text-slate-500">

                  Don't have a MediFind account?

                  <Link
                    to="/register"
                    className="ml-2 font-bold text-blue-600 transition hover:text-teal-500"
                  >
                    Create Account
                  </Link>

                </p>

              </div>

            </div>
          </div>

          {/* FOOTER */}

          <p className="mt-6 text-center text-xs text-slate-400">
            ©️ {new Date().getFullYear()} MediFind.
            Healthcare made simpler.
          </p>

        </div>
      </main>
    </div>
  );
}
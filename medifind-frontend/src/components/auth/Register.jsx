import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  User,
  Stethoscope,
  FlaskConical,
  Pill,
  Mail,
  Phone,
  LockKeyhole,
  Eye,
  EyeOff,
  FileText,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  MapPin,
  AlertCircle,
} from "lucide-react";

/* =========================================================
   ACCOUNT TYPES
========================================================= */

const ACCOUNT_TYPES = [
  {
    value: "user",
    label: "Patient",
    icon: User,
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

/* =========================================================
   PROFESSIONAL ACCOUNT CHECK
========================================================= */

const isProfessionalAccount = (role) => {
  return [
    "doctor",
    "hospital",
    "diagnostics",
    "pharmacy",
  ].includes(role);
};

const PROFESSIONAL_ROLES = [
  "doctor",
  "diagnostics",
  "pharmacy",
];

/* =========================================================
   REGISTER COMPONENT
========================================================= */

export default function Register({
  onRegister,
  handleRegister,
}) {
  const navigate = useNavigate();

  /*
   * Supports both:
   *
   * <Register onRegister={handleRegister} />
   *
   * and
   *
   * <Register handleRegister={handleRegister} />
   */

  const registerFunction =
    onRegister || handleRegister;

  /* =======================================================
     FORM STATE
  ======================================================= */

  const [formData, setFormData] = useState({
    role: "user",

    username: "",
    email: "",
    phone: "",

    registrationNo: "",
    licenceNo: "",

    password: "",
    confirmPassword: "",
  });

  /* =======================================================
     PASSWORD VISIBILITY
  ======================================================= */

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  /* =======================================================
     UI STATE
  ======================================================= */

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  /* =======================================================
     INPUT CHANGE
  ======================================================= */

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) {
      setError("");
    }

    if (success) {
      setSuccess("");
    }
  };

  /* =======================================================
     ACCOUNT TYPE CHANGE
  ======================================================= */

  const handleAccountTypeChange = (role) => {
    setFormData((previous) => ({
      ...previous,

      role,

      registrationNo:
        role === "user"
          ? ""
          : previous.registrationNo,

      licenceNo:
        role === "user"
          ? ""
          : previous.licenceNo,
    }));

    setError("");
    setSuccess("");
  };

  /* =======================================================
     VALIDATION
  ======================================================= */

  const validateForm = () => {
    const {
      role,
      username,
      email,
      phone,
      registrationNo,
      licenceNo,
      password,
      confirmPassword,
    } = formData;

    /* -----------------------------------------------
       Username
    ------------------------------------------------ */

    if (!username.trim()) {
      return "Please enter your username.";
    }

    const usernameRegex =
      /^[a-zA-Z0-9@.+_-]+$/;

    if (!usernameRegex.test(username.trim())) {
      return (
        "Username can contain only letters, numbers, " +
        "and @/./+/-/_ characters."
      );
    }

    /* -----------------------------------------------
       Email
    ------------------------------------------------ */

    if (!email.trim()) {
      return "Please enter your email address.";
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      return "Please enter a valid email address.";
    }

    /* -----------------------------------------------
       Phone
    ------------------------------------------------ */

    if (!phone.trim()) {
      return "Please enter your phone number.";
    }

    const phoneRegex =
      /^[0-9]{10}$/;

    if (!phoneRegex.test(phone.trim())) {
      return "Phone number must contain exactly 10 digits.";
    }

    /* -----------------------------------------------
       Professional fields
    ------------------------------------------------ */

    if (isProfessionalAccount(role)) {
      if (!registrationNo.trim()) {
        return "Registration number is required.";
      }

      if (!licenceNo.trim()) {
        return "Licence number is required.";
      }
    }

    /* -----------------------------------------------
       Password
    ------------------------------------------------ */

    if (!password) {
      return "Please enter a password.";
    }

    if (password.length < 8) {
      return "Password must contain at least 8 characters.";
    }

    /* -----------------------------------------------
       Confirm Password
    ------------------------------------------------ */

    if (!confirmPassword) {
      return "Please confirm your password.";
    }

    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }

    return null;
  };

  /* =======================================================
     SUBMIT
  ======================================================= */

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    /* -----------------------------------------------
       Validate
    ------------------------------------------------ */

    const validationError =
      validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    /* -----------------------------------------------
       Check registration function
    ------------------------------------------------ */

    if (
      !registerFunction &&
      formData.role !== "pharmacy" &&
      formData.role !== "diagnostics"
    ) {
      setError(
        "Registration function is not connected to App.jsx."
      );

      console.error(
        "Register.jsx: onRegister / handleRegister is missing."
      );

      return;
    }

    try {
      setLoading(true);

      /* =================================================
         BACKEND DATA
      ================================================= */

      const data = {
        username:
          formData.username.trim(),

        email:
          formData.email.trim().toLowerCase(),

        phone:
          formData.phone.trim(),

        password:
          formData.password,

        role:
          formData.role,
      };

      /* =================================================
         DOCTOR
      ================================================= */

      if (formData.role === "doctor") {
        data.registration_no =
          formData.registrationNo.trim();

        data.licence_no =
          formData.licenceNo.trim();
      }

      /* =================================================
         DIAGNOSTICS
      ================================================= */

      if (formData.role === "diagnostics") {
        data.phone_number =
          formData.phone.trim();

        data.license_number =
          formData.licenceNo.trim();
      }

      /* =================================================
         PHARMACY
      ================================================= */

      if (formData.role === "pharmacy") {
        data.registration_no =
          formData.registrationNo.trim();

        data.licence_no =
          formData.licenceNo.trim();
      }

      console.log(
        "================================="
      );

      console.log(
        "REGISTER SUBMIT"
      );

      console.log(
        "ACCOUNT TYPE:",
        formData.role
      );

      console.log(
        "REGISTER DATA:",
        {
          ...data,
          password: "********",
        }
      );

      /* =================================================
         API
      ================================================= */

      if (formData.role === "pharmacy") {
        /*
         * Pharmacy has its own registration endpoint.
         */

        await axios.post(
          "http://127.0.0.1:8000/api/pharmacy/register/",
          {
            username:
              formData.username.trim(),

            password:
              formData.password,

            pharmacy_name:
              formData.username.trim(),

            registration_number:
              formData.registrationNo.trim(),

            phone:
              formData.phone.trim(),

            email:
              formData.email.trim().toLowerCase(),

            address: "",
            city: "",
            state: "",
            pincode: "",
          }
        );
      } else if (formData.role === "diagnostics") {
        /*
         * Diagnostics has its own registration endpoint.
         */

        await axios.post(
          "http://127.0.0.1:8000/api/diagnostics/register/",
          {
            username:
              formData.username.trim(),

            email:
              formData.email.trim().toLowerCase(),

            password:
              formData.password,

            phone_number:
              formData.phone.trim(),

            license_number:
              formData.licenceNo.trim(),

            address:
              "Road No. 12, Banjara Hills",

            city:
              "Hyderabad",
          }
        );
      } else {
        /*
         * Patient / Doctor registration.
         */

        await registerFunction(data);
      }

      console.log(
        "REGISTRATION SUCCESS"
      );

      console.log(
        "================================="
      );

      /* =================================================
         SUCCESS
      ================================================= */

      setSuccess(
        "Account created successfully. Redirecting to login..."
      );

      /* =================================================
         CLEAR PASSWORDS
      ================================================= */

      setFormData((previous) => ({
        ...previous,
        password: "",
        confirmPassword: "",
      }));

      /* =================================================
         REDIRECT
      ================================================= */

      setTimeout(() => {
        navigate("/login");
      }, 1200);

    } catch (err) {
      console.error(
        "REGISTRATION ERROR:",
        err
      );

      console.error(
        "BACKEND RESPONSE:",
        err?.response?.data
      );

      console.error(
        "STATUS:",
        err?.response?.status
      );

      /* =================================================
         EXTRACT BACKEND ERROR
      ================================================= */

      let message =
        "Registration failed. Please try again.";

      if (err?.response?.data) {
        const backendError =
          err.response.data;

        if (
          typeof backendError === "string"
        ) {
          message =
            backendError;

        } else if (
          backendError.detail
        ) {
          message =
            backendError.detail;

        } else {
          const firstError =
            Object.values(
              backendError
            )[0];

          if (
            Array.isArray(firstError)
          ) {
            message =
              firstError[0];

          } else if (
            typeof firstError === "string"
          ) {
            message =
              firstError;
          } else if (
            typeof firstError === "object"
          ) {
            message =
              JSON.stringify(
                firstError
              );
          }
        }
      }

      setError(message);

    } finally {
      setLoading(false);
    }
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">

      {/* =================================================
          TOP HEADING
      ================================================= */}

      <div className="mx-auto mb-8 max-w-6xl text-center">

        <h1 className="text-4xl font-extrabold tracking-tight text-slate-950">

          Create Your{" "}

          <span className="text-blue-600">
            MediFind
          </span>{" "}

          Account

        </h1>

        <p className="mt-3 text-lg text-slate-500">

          Join MediFind and connect with trusted
          healthcare services.

        </p>

      </div>

      {/* =================================================
          MAIN CARD
      ================================================= */}

      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-2xl lg:grid-cols-[40%_60%]">

        {/* =================================================
            LEFT SIDE
        ================================================= */}

        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-500 p-10 text-white">

          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/10" />

          <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-white/10" />

          <div className="relative z-10">

            {/* GPS LOGO */}

            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 shadow-lg backdrop-blur">

              <MapPin
                size={38}
                strokeWidth={2.5}
                className="text-white"
              />

            </div>

            <h2 className="max-w-md text-5xl font-extrabold leading-tight">

              Healthcare
              <br />

              connected to you.

            </h2>

            <p className="mt-6 max-w-md text-lg leading-8 text-white/90">

              Create your secure MediFind account
              and connect with trusted healthcare
              services.

            </p>

            {/* FEATURES */}

            <div className="mt-10 space-y-5">

              <Feature
                icon={ShieldCheck}
                text="Secure account registration"
              />

              <Feature
                icon={FileText}
                text="Professional verification"
              />

              <Feature
                icon={CheckCircle2}
                text="Admin-approved healthcare providers"
              />

            </div>

          </div>

        </div>

        {/* =================================================
            RIGHT SIDE
        ================================================= */}

        <div className="p-8 sm:p-10">

          {/* ACCOUNT TYPE */}

          <div className="mb-7">

            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-600">

              MediFind Account

            </p>

            <h2 className="text-3xl font-extrabold text-slate-950">

              Create your account

            </h2>

            <p className="mt-2 text-slate-500">

              Select your account type below.

            </p>

          </div>

          {/* ACCOUNT TYPE CARDS */}

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

            {ACCOUNT_TYPES.map(
              ({
                value,
                label,
                icon: Icon,
              }) => {

                const selected =
                  formData.role === value;

                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() =>
                      handleAccountTypeChange(
                        value
                      )
                    }
                    className={`
                      flex min-h-[82px]
                      flex-col items-center
                      justify-center gap-2
                      rounded-xl border-2
                      px-2 py-3
                      transition-all duration-200
                      ${
                        selected
                          ? "border-blue-600 bg-blue-50 text-blue-600 shadow-md"
                          : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:bg-slate-50"
                      }
                    `}
                  >

                    <Icon
                      size={23}
                      strokeWidth={1.8}
                    />

                    <span className="text-xs font-semibold">

                      {label}

                    </span>

                  </button>
                );
              }
            )}

          </div>

          {/* PROFESSIONAL NOTICE */}

          {isProfessionalAccount(
            formData.role
          ) && (

            <div className="mt-6 flex gap-3 rounded-2xl border border-blue-200 bg-blue-50 p-4">

              <FileText
                size={24}
                className="mt-0.5 shrink-0 text-blue-600"
              />

              <div>

                <h3 className="font-bold text-blue-900">

                  Professional verification required

                </h3>

                <p className="mt-1 text-sm leading-6 text-blue-700">

                  Registration and licence details are
                  required. After login, you can complete
                  your professional profile and upload
                  verification documents for admin approval.

                </p>

              </div>

            </div>

          )}

          {/* ERROR */}

          {error && (

            <div className="mt-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">

              <AlertCircle
                size={20}
                className="mt-0.5 shrink-0"
              />

              <p className="text-sm font-medium">

                {error}

              </p>

            </div>

          )}

          {/* SUCCESS */}

          {success && (

            <div className="mt-5 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-green-700">

              <CheckCircle2
                size={20}
                className="mt-0.5 shrink-0"
              />

              <p className="text-sm font-medium">

                {success}

              </p>

            </div>

          )}

          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-5"
          >

            {/* USERNAME */}

            <FormField
              label="Username"
              icon={User}
            >

              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username"
                autoComplete="username"
                className={inputClass}
              />

            </FormField>

            {/* EMAIL */}

            <FormField
              label="Email Address"
              icon={Mail}
            >

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                autoComplete="email"
                className={inputClass}
              />

            </FormField>

            {/* PHONE */}

            <FormField
              label="Phone Number"
              icon={Phone}
            >

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter 10-digit phone number"
                maxLength={10}
                inputMode="numeric"
                autoComplete="tel"
                className={inputClass}
              />

            </FormField>

            {/* PROFESSIONAL FIELDS */}

            {isProfessionalAccount(
              formData.role
            ) && (

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                {/* REGISTRATION */}

                <FormField
                  label="Registration No."
                  icon={FileText}
                >

                  <input
                    type="text"
                    name="registrationNo"
                    value={
                      formData.registrationNo
                    }
                    onChange={handleChange}
                    placeholder="e.g. REG2026001"
                    autoComplete="off"
                    className={inputClass}
                  />

                </FormField>

                {/* LICENCE */}

                <FormField
                  label="Licence No."
                  icon={FileText}
                >

                  <input
                    type="text"
                    name="licenceNo"
                    value={
                      formData.licenceNo
                    }
                    onChange={handleChange}
                    placeholder="e.g. LIC2026001"
                    autoComplete="off"
                    className={inputClass}
                  />

                </FormField>

              </div>

            )}

            {/* PASSWORD */}

            <FormField
              label="Password"
              icon={LockKeyhole}
            >

              <div className="relative">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  autoComplete="new-password"
                  className={`${inputClass} pr-12 password-input`}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (previous) =>
                        !previous
                    )
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                >

                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}

                </button>

              </div>

            </FormField>

            {/* CONFIRM PASSWORD */}

            <FormField
              label="Confirm Password"
              icon={LockKeyhole}
            >

              <div className="relative">

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  value={
                    formData.confirmPassword
                  }
                  onChange={handleChange}
                  placeholder="Confirm password"
                  autoComplete="new-password"
                  className={`${inputClass} pr-12 password-input`}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      (previous) =>
                        !previous
                    )
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                  className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                >

                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}

                </button>

              </div>

            </FormField>

            {/* SUBMIT */}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-4 font-bold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
            >

              {loading ? (

                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />

                  Creating Account...
                </>

              ) : (

                <>
                  Create Account

                  <ArrowRight size={19} />
                </>

              )}

            </button>

            {/* LOGIN */}

            <p className="pt-2 text-center text-sm text-slate-500">

              Already have an account?{" "}

              <button
                type="button"
                onClick={() =>
                  navigate("/login")
                }
                className="font-bold text-blue-600 hover:text-blue-700"
              >

                Login here

              </button>

            </p>

          </form>

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   FORM FIELD
========================================================= */

function FormField({
  label,
  icon: Icon,
  children,
}) {
  return (
    <div>

      <label className="mb-2 block text-sm font-semibold text-slate-800">

        {label}

      </label>

      <div className="relative">

        <div className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400">

          <Icon size={19} />

        </div>

        <div className="pl-0">

          {React.cloneElement(
            children,
            {
              className: `${
                children.props.className || ""
              } pl-12`,
            }
          )}

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   FEATURE
========================================================= */

function Feature({
  icon: Icon,
  text,
}) {
  return (
    <div className="flex items-center gap-4">

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/20 backdrop-blur">

        <Icon
          size={22}
          className="text-white"
        />

      </div>

      <span className="font-semibold">

        {text}

      </span>

    </div>
  );
}

/* =========================================================
   INPUT STYLE
========================================================= */

const inputClass = `
  w-full
  rounded-xl
  border
  border-slate-300
  bg-white
  px-4
  py-3.5
  text-slate-900
  outline-none
  transition
  placeholder:text-slate-400
  focus:border-blue-500
  focus:ring-4
  focus:ring-blue-500/10
`;

/* =========================================================
   REMOVE BROWSER PASSWORD EYE
========================================================= */

if (
  typeof document !== "undefined" &&
  !document.getElementById(
    "medifind-password-style"
  )
) {
  const passwordStyle =
    document.createElement("style");

  passwordStyle.id =
    "medifind-password-style";

  passwordStyle.innerHTML = `
    input[type="password"]::-ms-reveal,
    input[type="password"]::-ms-clear {
      display: none;
    }

    input[type="password"]::-webkit-credentials-auto-fill-button {
      visibility: hidden;
      display: none !important;
      pointer-events: none;
      position: absolute;
      right: 0;
    }

    input[type="password"]::-webkit-textfield-decoration-container {
      visibility: hidden;
    }
  `;

  document.head.appendChild(
    passwordStyle
  );
}


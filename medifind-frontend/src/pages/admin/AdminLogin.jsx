
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Mail, Lock, AlertCircle } from "lucide-react";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/admin/login/",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      console.log("ADMIN LOGIN RESPONSE:", response.data);

      // Store the admin JWT
      localStorage.setItem(
        "access_token",
        response.data.access
      );

      localStorage.setItem(
        "refresh_token",
        response.data.refresh
      );

      // Store basic admin information
      localStorage.setItem(
        "admin",
        JSON.stringify(response.data.admin)
      );

      // Optional but useful for identifying the current account
      localStorage.setItem("accountType", "admin");
      localStorage.setItem("role", "admin");

      // Go directly to the admin dashboard
      navigate("/admin/dashboard");

    } catch (err) {
      console.error("ADMIN LOGIN ERROR:", err);
      console.error("BACKEND RESPONSE:", err.response?.data);

      setError(
        err.response?.data?.error ||
        err.response?.data?.detail ||
        "Invalid admin credentials. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md">

        {/* HEADER */}

        <div className="text-center mb-8">

          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
            <ShieldCheck
              size={32}
              className="text-blue-600"
            />
          </div>

          <h1 className="text-3xl font-bold text-slate-800">
            Admin Login
          </h1>

          <p className="text-slate-500 mt-2">
            Sign in to manage the MEDIFIND platform
          </p>

        </div>

        {/* LOGIN CARD */}

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">

          {/* ERROR */}

          {error && (
            <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">

              <AlertCircle
                size={18}
                className="mt-0.5 flex-shrink-0"
              />

              <span>{error}</span>

            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* EMAIL */}

            <div>

              <label className="block text-sm font-medium text-slate-700 mb-2">
                Admin Email
              </label>

              <div className="relative">

                <Mail
                  size={19}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter admin email"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />

              </div>

            </div>

            {/* PASSWORD */}

            <div>

              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>

              <div className="relative">

                <Lock
                  size={19}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter admin password"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />

              </div>

            </div>

            {/* LOGIN BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In as Admin"}
            </button>

          </form>

        </div>

        {/* NOTE */}

        <p className="text-center text-xs text-slate-400 mt-5">
          Authorized MEDIFIND administrators only
        </p>

      </div>

    </div>
  );
};

export default AdminLogin;

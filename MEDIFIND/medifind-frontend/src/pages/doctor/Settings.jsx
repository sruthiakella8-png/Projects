import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  User,
  Bell,
  Lock,
  ShieldCheck,
  Globe,
  Moon,
  Sun,
  Save,
} from "lucide-react";

export default function Settings() {

  const [activeTab, setActiveTab] = useState("general");

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("doctor_theme") === "dark"
  );

  const [language, setLanguage] = useState(
    localStorage.getItem("doctor_language") || "English"
  );

  const [timezone, setTimezone] = useState(
    localStorage.getItem("doctor_timezone") ||
    "Asia/Kolkata"
  );


  /* ========================================= */
  /* APPLY THEME */
  /* ========================================= */

  useEffect(() => {

    const root = document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("doctor_theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("doctor_theme", "light");
    }

  }, [darkMode]);


  const handleSave = () => {

    localStorage.setItem(
      "doctor_language",
      language
    );

    localStorage.setItem(
      "doctor_timezone",
      timezone
    );

    alert("Settings saved successfully!");
  };


  const tabs = [
    {
      key: "general",
      label: "General",
      icon: User,
    },
    {
      key: "notifications",
      label: "Notifications",
      icon: Bell,
    },
    {
      key: "security",
      label: "Security",
      icon: Lock,
    },
    {
      key: "privacy",
      label: "Privacy",
      icon: ShieldCheck,
    },
  ];


  return (
    <div className="min-h-full bg-[#F8FAFC] p-6 dark:bg-slate-950">

      {/* HEADER */}

      <div className="mb-6">

        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Settings
        </h1>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Manage your account, notifications and security settings.
        </p>

      </div>


      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">

        {/* LEFT TABS */}

        <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-card dark:border-slate-800 dark:bg-slate-900">

          {tabs.map((tab) => {

            const Icon = tab.icon;

            return (
              <button
                key={tab.key}
                type="button"
                onClick={() =>
                  setActiveTab(tab.key)
                }
                className={`mb-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  activeTab === tab.key
                    ? "bg-[#2563EB] text-white"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >

                <Icon size={18} />

                {tab.label}

              </button>
            );
          })}

        </div>


        {/* RIGHT CONTENT */}

        <motion.div
          key={activeTab}
          initial={{
            opacity: 0,
            x: 20,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          className="lg:col-span-3"
        >

          {/* ================= GENERAL ================= */}

          {activeTab === "general" && (
            <div className="rounded-2xl border border-slate-200 bg-white shadow-card dark:border-slate-800 dark:bg-slate-900">

              <div className="border-b border-slate-100 p-6 dark:border-slate-800">

                <div className="flex items-center gap-4">

                  <div className="rounded-xl bg-blue-100 p-3 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                    <Globe size={25} />
                  </div>

                  <div>

                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                      General Settings
                    </h2>

                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Manage your basic application preferences.
                    </p>

                  </div>

                </div>

              </div>


              <div className="space-y-6 p-6">

                {/* LANGUAGE */}

                <div>

                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Language
                  </label>

                  <select
                    value={language}
                    onChange={(e) =>
                      setLanguage(e.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-[#2563EB] dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  >

                    <option>English</option>
                    <option>Telugu</option>
                    <option>Hindi</option>

                  </select>

                </div>


                {/* TIMEZONE */}

                <div>

                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Timezone
                  </label>

                  <select
                    value={timezone}
                    onChange={(e) =>
                      setTimezone(e.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-[#2563EB] dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  >

                    <option value="Asia/Kolkata">
                      India Standard Time (IST)
                    </option>

                    <option value="UTC">
                      UTC
                    </option>

                    <option value="Asia/Dubai">
                      Gulf Standard Time (GST)
                    </option>

                    <option value="Asia/Singapore">
                      Singapore Standard Time
                    </option>

                  </select>

                </div>


                {/* THEME */}

                <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">

                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                      <div className="rounded-lg bg-slate-100 p-2 dark:bg-slate-800">

                        {darkMode ? (
                          <Moon size={20} />
                        ) : (
                          <Sun size={20} />
                        )}

                      </div>

                      <div>

                        <p className="font-semibold text-slate-900 dark:text-white">
                          Appearance
                        </p>

                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Choose light or dark theme
                        </p>

                      </div>

                    </div>


                    {/* TOGGLE */}

                    <button
                      type="button"
                      onClick={() =>
                        setDarkMode(!darkMode)
                      }
                      className={`relative h-7 w-14 rounded-full transition ${
                        darkMode
                          ? "bg-[#2563EB]"
                          : "bg-slate-300"
                      }`}
                    >

                      <span
                        className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
                          darkMode
                            ? "left-8"
                            : "left-1"
                        }`}
                      />

                    </button>

                  </div>

                  <p className="mt-3 text-xs font-medium text-slate-500 dark:text-slate-400">
                    Current theme:{" "}
                    {darkMode
                      ? "Dark"
                      : "Light"}
                  </p>

                </div>

              </div>


              {/* SAVE */}

              <div className="flex justify-end border-t border-slate-100 p-6 dark:border-slate-800">

                <button
                  type="button"
                  onClick={handleSave}
                  className="flex items-center gap-2 rounded-xl bg-[#2563EB] px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-blue-700"
                >

                  <Save size={18} />

                  Save Changes

                </button>

              </div>

            </div>
          )}


          {/* ================= NOTIFICATIONS ================= */}

          {activeTab === "notifications" && (
            <div className="rounded-2xl bg-white p-8 shadow-card dark:bg-slate-900">

              <Bell className="mb-4 text-[#2563EB]" size={30} />

              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Notification Settings
              </h2>

              <p className="mt-2 text-slate-500 dark:text-slate-400">
                Manage appointment and emergency notifications.
              </p>

            </div>
          )}


          {/* ================= SECURITY ================= */}

          {activeTab === "security" && (
            <div className="rounded-2xl bg-white p-8 shadow-card dark:bg-slate-900">

              <Lock
                className="mb-4 text-[#2563EB]"
                size={30}
              />

              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Security
              </h2>

              <p className="mt-2 text-slate-500 dark:text-slate-400">
                Manage your password and account security.
              </p>

            </div>
          )}


          {/* ================= PRIVACY ================= */}

          {activeTab === "privacy" && (
            <div className="rounded-2xl bg-white p-8 shadow-card dark:bg-slate-900">

              <ShieldCheck
                className="mb-4 text-[#2563EB]"
                size={30}
              />

              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Privacy
              </h2>

              <p className="mt-2 text-slate-500 dark:text-slate-400">
                Manage your privacy and data preferences.
              </p>

            </div>
          )}

        </motion.div>

      </div>

    </div>
  );
}
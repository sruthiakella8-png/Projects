import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Sidebar from "../components/doctor/Sidebar";
import Topbar from "../components/doctor/Topbar";

export default function DoctorLayout() {
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState({
    name: "Doctor",
    specialization: "Medical Specialist",
    id: "",
    avatarUrl: "",
  });

  // =====================================================
  // LOAD LOGGED-IN DOCTOR
  // =====================================================

  useEffect(() => {
    try {
      const savedDoctor = localStorage.getItem("doctor");

      console.log("DOCTOR FROM LOCAL STORAGE:", savedDoctor);

      if (savedDoctor) {
        const parsedDoctor = JSON.parse(savedDoctor);

        console.log("PARSED DOCTOR:", parsedDoctor);

        setDoctor({
          name:
            parsedDoctor.name ||
            parsedDoctor.full_name ||
            parsedDoctor.username ||
            "Doctor",

          specialization:
            parsedDoctor.specialization ||
            parsedDoctor.specialisation ||
            parsedDoctor.specialty ||
            "Medical Specialist",

          id:
            parsedDoctor.id ||
            parsedDoctor.doctor_id ||
            parsedDoctor.registration_number ||
            "",

          avatarUrl:
            parsedDoctor.avatarUrl ||
            parsedDoctor.profile_image ||
            parsedDoctor.profileImage ||
            parsedDoctor.image ||
            "",
        });
      }
    } catch (error) {
      console.error("DOCTOR LOAD ERROR:", error);
    }
  }, []);

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    localStorage.removeItem("doctor");
    localStorage.removeItem("doctor_name");
    localStorage.removeItem("doctor_specialization");

    localStorage.removeItem("accountType");

    navigate("/login", { replace: true });
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">

      {/* =================================================
          SIDEBAR
      ================================================= */}

      <motion.aside
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className="z-30 h-screen w-72 shrink-0"
      >
        <Sidebar
          doctor={doctor}
          onLogout={handleLogout}
        />
      </motion.aside>

      {/* =================================================
          RIGHT SIDE
      ================================================= */}

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">

        {/* =================================================
            TOPBAR
        ================================================= */}

        <motion.header
          initial={{ y: -80 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.4 }}
          className="z-20 shrink-0 bg-white shadow-sm"
        >
          <Topbar
            doctor={doctor}
          />
        </motion.header>

        {/* =================================================
            PAGE CONTENT
        ================================================= */}

        <main className="flex-1 overflow-y-auto">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="min-h-full p-6"
          >

            <Outlet
              context={{
                doctor,
                setDoctor,
              }}
            />

          </motion.div>

        </main>

      </div>
    </div>
  );
}
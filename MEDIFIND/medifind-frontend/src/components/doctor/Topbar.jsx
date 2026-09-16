import React, { useEffect, useState } from "react";

import {
  Bell,
  MessageSquare,
  ChevronDown,
  Search,
} from "lucide-react";

export default function DoctorTopbar() {
  // =====================================================
  // DOCTOR STATE
  // =====================================================

  const [doctor, setDoctor] = useState({
    name: "Doctor",
    specialization: "Medical Specialist",
    avatarUrl: "",
  });

  // =====================================================
  // LOAD LOGGED-IN DOCTOR
  // =====================================================

  useEffect(() => {
    loadDoctor();
  }, []);

  // =====================================================
  // LOAD DOCTOR DATA
  // =====================================================

  const loadDoctor = () => {
    try {
      let doctorData = {
        name: "Doctor",
        specialization: "Medical Specialist",
        avatarUrl: "",
      };

      // -------------------------------------------------
      // 1. GET DOCTOR OBJECT
      // -------------------------------------------------

      const storedDoctor =
        localStorage.getItem("doctor");

      if (storedDoctor) {
        try {
          const parsedDoctor =
            JSON.parse(storedDoctor);

          doctorData = {
            name:
              parsedDoctor?.name ||
              parsedDoctor?.full_name ||
              parsedDoctor?.fullName ||
              parsedDoctor?.username ||
              "Doctor",

            specialization:
              parsedDoctor?.specialization ||
              parsedDoctor?.speciality ||
              parsedDoctor?.specialty ||
              "Medical Specialist",

            avatarUrl:
              parsedDoctor?.avatarUrl ||
              parsedDoctor?.avatar ||
              parsedDoctor?.profile_image ||
              parsedDoctor?.profileImage ||
              parsedDoctor?.image ||
              "",
          };
        } catch (error) {
          console.error(
            "Invalid doctor data in localStorage:",
            error
          );
        }
      }

      // -------------------------------------------------
      // 2. FALLBACK TO INDIVIDUAL STORAGE VALUES
      // -------------------------------------------------

      const storedName =
        localStorage.getItem("doctor_name");

      const storedUsername =
        localStorage.getItem("username");

      const storedSpecialization =
        localStorage.getItem(
          "doctor_specialization"
        );

      const storedAvatar =
        localStorage.getItem(
          "doctor_avatar"
        );

      // -------------------------------------------------
      // 3. BUILD FINAL DOCTOR DATA
      // -------------------------------------------------

      doctorData = {
        name:
          doctorData.name !== "Doctor"
            ? doctorData.name
            : storedName ||
              storedUsername ||
              "Doctor",

        specialization:
          doctorData.specialization !==
          "Medical Specialist"
            ? doctorData.specialization
            : storedSpecialization ||
              "Medical Specialist",

        avatarUrl:
          doctorData.avatarUrl ||
          storedAvatar ||
          "",
      };

      // -------------------------------------------------
      // 4. SAVE TO STATE
      // -------------------------------------------------

      setDoctor(doctorData);

      console.log(
        "Doctor loaded in Topbar:",
        doctorData
      );

    } catch (error) {
      console.error(
        "Unable to load doctor profile:",
        error
      );
    }
  };

  // =====================================================
  // GET INITIALS
  // =====================================================

  const getInitials = (name) => {
    if (!name) {
      return "DR";
    }

    const words = name
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    if (words.length === 1) {
      return words[0]
        .substring(0, 2)
        .toUpperCase();
    }

    return (
      words[0].charAt(0) +
      words[words.length - 1].charAt(0)
    ).toUpperCase();
  };

  // =====================================================
  // IMAGE ERROR HANDLER
  // =====================================================

  const handleImageError = (event) => {
    console.error(
      "Doctor profile image could not be loaded."
    );

    // Hide broken image
    event.currentTarget.style.display = "none";
  };

  // =====================================================
  // PROFILE IMAGE
  // =====================================================

  const hasProfileImage =
    doctor.avatarUrl &&
    doctor.avatarUrl.trim() !== "";

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <header
      className="
        h-20
        bg-white
        border-b
        border-slate-200
        px-6
        flex
        items-center
        justify-between
      "
    >

      {/* =================================================
          SEARCH
      ================================================= */}

      <div className="relative w-full max-w-md">

        <Search
          size={19}
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-slate-400
          "
        />

        <input
          type="text"
          placeholder="Search patients, appointments..."
          className="
            w-full
            h-12
            pl-11
            pr-4
            rounded-xl
            border
            border-slate-200
            bg-slate-50
            text-sm
            outline-none
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-100
          "
        />

      </div>

      {/* =================================================
          RIGHT SIDE
      ================================================= */}

      <div className="flex items-center gap-5">

        {/* =================================================
            NOTIFICATION
        ================================================= */}

        <button
          type="button"
          className="
            relative
            text-slate-500
            hover:text-blue-600
            transition
          "
        >

          <Bell size={21} />

          <span
            className="
              absolute
              -right-1
              -top-1
              h-2.5
              w-2.5
              rounded-full
              bg-red-500
            "
          />

        </button>

        {/* =================================================
            MESSAGES
        ================================================= */}

        <button
          type="button"
          className="
            text-slate-500
            hover:text-blue-600
            transition
          "
        >
          <MessageSquare size={21} />
        </button>

        {/* =================================================
            DOCTOR PROFILE
        ================================================= */}

        <button
          type="button"
          className="
            flex
            items-center
            gap-3
          "
        >

          {/* =================================================
              PROFILE IMAGE / INITIALS
          ================================================= */}

          <div
            className="
              h-10
              w-10
              rounded-full
              overflow-hidden
              border-2
              border-teal-400
              bg-gradient-to-br
              from-blue-600
              to-teal-500
              flex
              items-center
              justify-center
              text-white
              font-bold
              text-sm
              flex-shrink-0
            "
          >

            {hasProfileImage ? (
              <img
                src={doctor.avatarUrl}
                alt={doctor.name}
                className="
                  h-full
                  w-full
                  object-cover
                "
                onError={handleImageError}
              />
            ) : (
              <span>
                {getInitials(doctor.name)}
              </span>
            )}

          </div>

          {/* =================================================
              DOCTOR INFORMATION
          ================================================= */}

          <div
            className="
              hidden
              sm:block
              text-left
            "
          >

          <p className="text-sm font-semibold text-slate-800 ">
             {doctor.name && !doctor.name.startsWith("Dr.")
              ? `Dr. ${doctor.name}`
              : doctor.name}
            </p>

            <p className="text-xs text-slate-500 ">
             {doctor.specialization}
           </p>

          </div>

          {/* =================================================
              DROPDOWN ICON
          ================================================= */}

          <ChevronDown
            size={16}
            className="text-slate-400"
          />

        </button>

      </div>

    </header>
  );
}
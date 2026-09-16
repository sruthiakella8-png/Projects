import React, { useEffect, useState } from "react";

import {
  Bell,
  MessageSquare,
  ChevronDown,
  Search,
} from "lucide-react";

export default function DiagnosticsTopbar() {
  // =====================================================
  // DIAGNOSTICS CENTER STATE
  // =====================================================

  const [diagnostic, setDiagnostic] = useState({
    name: "Diagnostic Center",
    type: "Diagnostics Center",
    avatarUrl: "",
  });

  // =====================================================
  // LOAD LOGGED-IN DIAGNOSTIC CENTER
  // =====================================================

  useEffect(() => {
    loadDiagnostic();
  }, []);

  // =====================================================
  // LOAD DIAGNOSTIC DATA
  // =====================================================

  const loadDiagnostic = () => {
    try {
      let diagnosticData = {
        name: "Diagnostic Center",
        type: "Diagnostics Center",
        avatarUrl: "",
      };

      // -------------------------------------------------
      // 1. GET DIAGNOSTIC OBJECT
      // -------------------------------------------------

      const storedDiagnostic =
        localStorage.getItem("diagnostic");

      if (storedDiagnostic) {
        try {
          const parsedDiagnostic =
            JSON.parse(storedDiagnostic);

          diagnosticData = {
            name:
              parsedDiagnostic?.name ||
              parsedDiagnostic?.center_name ||
              parsedDiagnostic?.centerName ||
              parsedDiagnostic?.full_name ||
              parsedDiagnostic?.username ||
              "Diagnostic Center",

            type:
              parsedDiagnostic?.type ||
              parsedDiagnostic?.center_type ||
              parsedDiagnostic?.centerType ||
              "Diagnostics Center",

            avatarUrl:
              parsedDiagnostic?.avatarUrl ||
              parsedDiagnostic?.avatar ||
              parsedDiagnostic?.profile_image ||
              parsedDiagnostic?.profileImage ||
              parsedDiagnostic?.image ||
              "",
          };
        } catch (error) {
          console.error(
            "Invalid diagnostic data in localStorage:",
            error
          );
        }
      }

      // -------------------------------------------------
      // 2. FALLBACK TO INDIVIDUAL STORAGE VALUES
      // -------------------------------------------------

      const storedName =
        localStorage.getItem("diagnostic_name");

      const storedUsername =
        localStorage.getItem("username");

      const storedType =
        localStorage.getItem(
          "diagnostic_type"
        );

      const storedAvatar =
        localStorage.getItem(
          "diagnostic_avatar"
        );

      // -------------------------------------------------
      // 3. BUILD FINAL DIAGNOSTIC DATA
      // -------------------------------------------------

      diagnosticData = {
        name:
          diagnosticData.name !==
          "Diagnostic Center"
            ? diagnosticData.name
            : storedName ||
              storedUsername ||
              "Diagnostic Center",

        type:
          diagnosticData.type !==
          "Diagnostics Center"
            ? diagnosticData.type
            : storedType ||
              "Diagnostics Center",

        avatarUrl:
          diagnosticData.avatarUrl ||
          storedAvatar ||
          "",
      };

      // -------------------------------------------------
      // 4. SAVE TO STATE
      // -------------------------------------------------

      setDiagnostic(diagnosticData);

      console.log(
        "Diagnostic center loaded in Topbar:",
        diagnosticData
      );

    } catch (error) {
      console.error(
        "Unable to load diagnostic center profile:",
        error
      );
    }
  };

  // =====================================================
  // GET INITIALS
  // =====================================================

  const getInitials = (name) => {
    if (!name) {
      return "DC";
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
      "Diagnostic center profile image could not be loaded."
    );

    event.currentTarget.style.display = "none";
  };

  // =====================================================
  // PROFILE IMAGE
  // =====================================================

  const hasProfileImage =
    diagnostic.avatarUrl &&
    diagnostic.avatarUrl.trim() !== "";

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
          placeholder="Search patients, tests, orders..."
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
            DIAGNOSTIC CENTER PROFILE
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
                src={diagnostic.avatarUrl}
                alt={diagnostic.name}
                className="
                  h-full
                  w-full
                  object-cover
                "
                onError={handleImageError}
              />
            ) : (
              <span>
                {getInitials(diagnostic.name)}
              </span>
            )}

          </div>

          {/* =================================================
              DIAGNOSTIC CENTER INFORMATION
          ================================================= */}

          <div
            className="
              hidden
              sm:block
              text-left
            "
          >

            <p
              className="
                text-sm
                font-semibold
                text-slate-800
              "
            >
              {diagnostic.name}
            </p>

            <p
              className="
                text-xs
                text-slate-500
              "
            >
              {diagnostic.type}
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
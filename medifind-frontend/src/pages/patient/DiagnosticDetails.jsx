import React, { useEffect, useState } from "react";
import {
  MapPin,
  Star,
  Clock,
  Phone,
  Mail,
  TestTube,
  IndianRupee,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getDiagnosticCenterDetails } from "../../api/diagnosticsAPI";

export default function DiagnosticDetails({ id, onClose }) {

  const [center, setCenter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // FETCH DETAILS
  // =====================================================

  useEffect(() => {

    const fetchDetails = async () => {

      try {

        setLoading(true);
        setError("");
        setCenter(null);

        console.log(
          "FETCHING DIAGNOSTIC DETAILS FOR ID:",
          id
        );

        const response =
          await getDiagnosticCenterDetails(id);

        console.log(
          "DIAGNOSTIC CENTER DETAILS RESPONSE:",
          response.data
        );

        setCenter(response.data);

      } catch (error) {

        console.error(
          "DIAGNOSTIC CENTER DETAILS ERROR:",
          error
        );

        console.error(
          "BACKEND RESPONSE:",
          error?.response?.data
        );

        setError(
          error?.response?.data?.detail ||
          error?.response?.data?.message ||
          "Unable to load diagnostic center details."
        );

      } finally {

        setLoading(false);

      }

    };

    if (id) {
      fetchDetails();
    }

  }, [id]);

  // =====================================================
  // ESCAPE KEY
  // =====================================================

  useEffect(() => {

    const handleEscape = (event) => {

      if (event.key === "Escape") {
        onClose();
      }

    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };

  }, [onClose]);

  // =====================================================
  // PREVENT BACKGROUND SCROLL
  // =====================================================

  useEffect(() => {

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };

  }, []);

  // =====================================================
  // MODAL
  // =====================================================

  return (
    <AnimatePresence>

      <motion.div
        className="
          fixed
          inset-0
          z-50
          flex
          items-center
          justify-center
          bg-blue-950/45
          px-4
          py-6
          backdrop-blur-[2px]
        "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      >

        {/* =================================================
            MODAL CARD
        ================================================= */}

        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Diagnostic center details"
          className="
            relative
            flex
            max-h-[90vh]
            w-full
            max-w-4xl
            flex-col
            overflow-hidden
            rounded-2xl
            border
            border-blue-100
            bg-white
            shadow-2xl
          "
          initial={{
            opacity: 0,
            scale: 0.94,
            y: 20,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.96,
            y: 10,
          }}
          transition={{
            duration: 0.28,
            ease: [0.22, 1, 0.36, 1],
          }}
          onClick={(event) =>
            event.stopPropagation()
          }
        >

          {/* =================================================
              CLOSE BUTTON
          ================================================= */}

          <motion.button
            type="button"
            onClick={onClose}
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            className="
              absolute
              right-5
              top-5
              z-10
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              border
              border-blue-100
              bg-white
              text-slate-500
              shadow-sm
              transition-colors
              hover:bg-blue-50
              hover:text-blue-700
            "
            aria-label="Close details"
          >
            <X size={18} />
          </motion.button>

          {/* =================================================
              SCROLLABLE CONTENT
          ================================================= */}

          <div className="overflow-y-auto">

            {/* =================================================
                LOADING
            ================================================= */}

            {loading && (
              <div className="flex min-h-[400px] items-center justify-center">

                <div className="text-center">

                  <motion.div
                    className="
                      mx-auto
                      h-8
                      w-8
                      rounded-full
                      border-2
                      border-blue-100
                      border-t-blue-600
                    "
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  <p className="mt-4 text-sm text-slate-500">
                    Loading diagnostic center details...
                  </p>

                </div>

              </div>
            )}

            {/* =================================================
                ERROR
            ================================================= */}

            {!loading && error && (
              <div className="p-8">

                <div
                  className="
                    rounded-2xl
                    border
                    border-red-200
                    bg-red-50
                    p-6
                  "
                >
                  <p className="text-sm font-medium text-red-600">
                    {error}
                  </p>
                </div>

              </div>
            )}

            {/* =================================================
                DETAILS
            ================================================= */}

            {!loading && !error && center && (
              <div className="space-y-5 p-6">

                {/* =================================================
                    CENTER HEADER
                ================================================= */}

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className="
                    rounded-2xl
                    border
                    border-blue-100
                    bg-gradient-to-br
                    from-blue-50
                    to-teal-50
                    p-6
                  "
                >

                  <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">

                    {/* CENTER INFORMATION */}

                    <div className="flex items-start gap-4">

                      <motion.div
                        initial={{
                          scale: 0.8,
                          opacity: 0,
                        }}
                        animate={{
                          scale: 1,
                          opacity: 1,
                        }}
                        transition={{
                          duration: 0.3,
                          delay: 0.05,
                        }}
                        className="
                          flex
                          h-14
                          w-14
                          shrink-0
                          items-center
                          justify-center
                          rounded-2xl
                          bg-white
                          text-blue-600
                          shadow-sm
                        "
                      >
                        <TestTube size={26} />
                      </motion.div>

                      <div>

                        <div className="flex flex-wrap items-center gap-2 pr-10">

                          <h2 className="text-xl font-bold text-blue-900">
                            {center.center_name}
                          </h2>

                          {center.certification_type && (
                            <span
                              className="
                                rounded-md
                                bg-teal-100
                                px-2
                                py-1
                                text-[10px]
                                font-semibold
                                uppercase
                                text-teal-700
                              "
                            >
                              {center.certification_type}
                            </span>
                          )}

                        </div>

                        <div className="mt-2 flex items-start gap-2 text-sm text-slate-600">

                          <MapPin
                            size={16}
                            className="mt-0.5 shrink-0 text-blue-500"
                          />

                          <span>
                            {center.address}, {center.city}
                          </span>

                        </div>

                        <div className="mt-3 flex flex-wrap items-center gap-4">

                          <div className="flex items-center gap-1">

                            <Star
                              size={17}
                              className="fill-current text-amber-400"
                            />

                            <span className="font-semibold text-slate-700">
                              {center.rating || "N/A"}
                            </span>

                            {center.reviews_count !== undefined && (
                              <span className="text-xs text-slate-400">
                                ({center.reviews_count} reviews)
                              </span>
                            )}

                          </div>

                          <div className="flex items-center gap-1 text-sm text-teal-700">

                            <Clock size={16} />

                            {center.reports_time || "N/A"}

                          </div>

                        </div>

                      </div>

                    </div>

                    {/* AVAILABILITY */}

                    <span
                      className={`
                        inline-flex
                        w-fit
                        rounded-full
                        px-3
                        py-1.5
                        text-xs
                        font-semibold
                        ${
                          center.availability === "available"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-slate-100 text-slate-500"
                        }
                      `}
                    >
                      {center.availability === "available"
                        ? "Available"
                        : center.availability}
                    </span>

                  </div>

                </motion.div>

                {/* =================================================
                    CONTACT / SERVICES
                ================================================= */}

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                  {/* CONTACT */}

                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 12,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.3,
                      delay: 0.08,
                    }}
                    className="
                      rounded-2xl
                      border
                      border-blue-100
                      bg-white
                      p-6
                      shadow-sm
                    "
                  >

                    <h3 className="text-lg font-semibold text-blue-900">
                      Contact Information
                    </h3>

                    <div className="mt-5 space-y-4">

                      {center.phone_number && (
                        <div className="flex items-center gap-3">

                          <div className="rounded-lg bg-blue-50 p-2">
                            <Phone
                              size={17}
                              className="text-blue-600"
                            />
                          </div>

                          <span className="text-sm text-slate-600">
                            {center.phone_number}
                          </span>

                        </div>
                      )}

                      {center.email && (
                        <div className="flex items-center gap-3">

                          <div className="rounded-lg bg-teal-50 p-2">
                            <Mail
                              size={17}
                              className="text-teal-600"
                            />
                          </div>

                          <span className="break-all text-sm text-slate-600">
                            {center.email}
                          </span>

                        </div>
                      )}

                      {!center.phone_number &&
                        !center.email && (
                          <p className="text-sm text-slate-500">
                            No contact information available.
                          </p>
                        )}

                    </div>

                  </motion.div>

                  {/* SERVICES */}

                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 12,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.3,
                      delay: 0.12,
                    }}
                    className="
                      rounded-2xl
                      border
                      border-teal-100
                      bg-white
                      p-6
                      shadow-sm
                    "
                  >

                    <h3 className="text-lg font-semibold text-teal-800">
                      Services
                    </h3>

                    <div className="mt-5 space-y-4 text-sm text-slate-600">

                      <div className="flex items-center justify-between">

                        <span className="font-medium">
                          Home Collection
                        </span>

                        <span
                          className={
                            center.home_collection
                              ? "font-semibold text-emerald-600"
                              : "text-slate-400"
                          }
                        >
                          {center.home_collection
                            ? "Available"
                            : "Not Available"}
                        </span>

                      </div>

                      <div className="flex items-center justify-between">

                        <span className="font-medium">
                          Open 24 Hours
                        </span>

                        <span
                          className={
                            center.open_24_hours
                              ? "font-semibold text-emerald-600"
                              : "text-slate-400"
                          }
                        >
                          {center.open_24_hours
                            ? "Yes"
                            : "No"}
                        </span>

                      </div>

                      <div className="flex items-center justify-between">

                        <span className="font-medium">
                          Total Tests
                        </span>

                        <span className="font-semibold text-blue-800">
                          {center.total_tests ?? 0}
                        </span>

                      </div>

                    </div>

                  </motion.div>

                </div>

                {/* =================================================
                    TESTS
                ================================================= */}

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 12,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.3,
                    delay: 0.16,
                  }}
                  className="
                    rounded-2xl
                    border
                    border-blue-100
                    bg-white
                    shadow-sm
                  "
                >

                  <div className="border-b border-blue-100 px-6 py-5">

                    <h3 className="text-lg font-semibold text-blue-900">
                      Available Tests
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Tests offered by{" "}
                      {center.center_name}.
                    </p>

                  </div>

                  {center.tests?.length > 0 ? (

                    <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2">

                      {center.tests.map((test, index) => (

                        <motion.div
                          key={test.id}
                          initial={{
                            opacity: 0,
                            y: 10,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          transition={{
                            duration: 0.25,
                            delay: 0.2 + index * 0.05,
                          }}
                          whileHover={{
                            y: -2,
                          }}
                          className="
                            rounded-xl
                            border
                            border-blue-100
                            bg-blue-50/50
                            p-5
                            transition-shadow
                            hover:border-teal-200
                            hover:bg-teal-50/40
                            hover:shadow-sm
                          "
                        >

                          <div className="flex items-start justify-between gap-4">

                            <div>

                              <h4 className="font-semibold text-blue-900">
                                {test.name}
                              </h4>

                              <p className="mt-2 text-sm leading-6 text-slate-500">
                                {test.description ||
                                  "No description available."}
                              </p>

                            </div>

                            <div className="rounded-lg bg-white p-2 shadow-sm">

                              <TestTube
                                size={19}
                                className="shrink-0 text-teal-500"
                              />

                            </div>

                          </div>

                          <div
                            className="
                              mt-4
                              flex
                              flex-wrap
                              items-center
                              justify-between
                              gap-3
                              border-t
                              border-blue-100
                              pt-4
                            "
                          >

                            <div className="flex items-center gap-1 font-semibold text-blue-800">

                              <IndianRupee size={15} />

                              {test.price}

                            </div>

                            <div className="flex items-center gap-1 text-xs text-teal-700">

                              <Clock size={14} />

                              {test.report_time || "N/A"}

                            </div>

                          </div>

                        </motion.div>

                      ))}

                    </div>

                  ) : (

                    <div className="p-10 text-center">

                      <TestTube
                        size={28}
                        className="mx-auto text-blue-200"
                      />

                      <p className="mt-3 text-sm text-slate-500">
                        No tests are currently available.
                      </p>

                    </div>

                  )}

                </motion.div>

              </div>
            )}

          </div>

        </motion.div>

      </motion.div>

    </AnimatePresence>
  );
}
import React, { useEffect, useState } from "react";
import {
  Search,
  MapPin,
  Star,
  Clock,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { getDiagnosticCenters } from "../../api/diagnosticsAPI";
import DiagnosticDetails from "./DiagnosticDetails";

export default function Diagnostics() {
  const [centers, setCenters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Selected diagnostic center
  const [selectedCenterId, setSelectedCenterId] = useState(null);

  useEffect(() => {
    const fetchDiagnosticCenters = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getDiagnosticCenters();

        console.log(
          "DIAGNOSTIC CENTERS RESPONSE:",
          response.data
        );

        setCenters(response.data);
      } catch (error) {
        console.error(
          "DIAGNOSTIC CENTERS ERROR:",
          error
        );

        console.error(
          "BACKEND RESPONSE:",
          error?.response?.data
        );

        setError(
          error?.response?.data?.detail ||
          error?.response?.data?.message ||
          "Unable to load diagnostic centers."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDiagnosticCenters();
  }, []);

  // =====================================================
  // SEARCH
  // =====================================================

  const filteredCenters = centers.filter((center) => {
    const search = searchTerm.toLowerCase();

    return (
      center.center_name?.toLowerCase().includes(search) ||
      center.city?.toLowerCase().includes(search) ||
      center.address?.toLowerCase().includes(search)
    );
  });

  // =====================================================
  // OPEN DETAILS
  // =====================================================

  const handleViewDetails = (centerId) => {
    setSelectedCenterId(centerId);
  };

  // =====================================================
  // CLOSE DETAILS
  // =====================================================

  const handleCloseDetails = () => {
    setSelectedCenterId(null);
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-slate-500">
          Loading diagnostic centers...
        </p>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <p className="text-sm font-medium text-red-600">
          {error}
        </p>
      </div>
    );
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <>
      <div className="space-y-6">

        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <h1 className="text-2xl font-bold text-blue-900">
            Diagnostic Centers
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Find trusted diagnostic centers and laboratory
            services near you.
          </p>
        </motion.div>

        {/* =================================================
            SEARCH
        ================================================= */}

        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
        >
          <Search
            size={20}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-blue-400
            "
          />

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search diagnostic centers by name, city or location..."
            className="
              w-full
              rounded-xl
              border
              border-blue-100
              bg-white
              py-3.5
              pl-12
              pr-4
              text-sm
              text-slate-700
              outline-none
              transition-all
              duration-200
              focus:border-blue-400
              focus:ring-2
              focus:ring-blue-100
            "
          />
        </motion.div>

        {/* =================================================
            RESULTS COUNT
        ================================================= */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.1 }}
        >
          <h2 className="text-lg font-semibold text-blue-900">
            Available Diagnostic Centers
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {filteredCenters.length} center
            {filteredCenters.length !== 1 ? "s" : ""} found
          </p>
        </motion.div>

        {/* =================================================
            TABLE
        ================================================= */}

        {filteredCenters.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="
              rounded-2xl
              border
              border-blue-100
              bg-white
              p-10
              text-center
            "
          >
            <p className="text-sm text-slate-500">
              No diagnostic centers found.
            </p>
          </motion.div>
        ) : (
          <motion.div
            className="
              overflow-hidden
              rounded-2xl
              border
              border-blue-100
              bg-white
              shadow-sm
            "
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >

            <div className="overflow-x-auto">

              <table className="w-full min-w-[900px]">

                {/* TABLE HEADER */}

                <thead className="border-b border-blue-100 bg-blue-50">

                  <tr>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-blue-700">
                      Diagnostic Center
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-blue-700">
                      Location
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-blue-700">
                      Rating
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-blue-700">
                      Reports
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-blue-700">
                      Tests
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-blue-700">
                      Action
                    </th>

                  </tr>

                </thead>

                {/* TABLE BODY */}

                <tbody className="divide-y divide-blue-50">

                  {filteredCenters.map((center, index) => (

                    <motion.tr
                      key={center.id}
                      initial={{
                        opacity: 0,
                        y: 5,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.25,
                        delay: index * 0.04,
                      }}
                      className="
                        group
                        transition-colors
                        duration-200
                        hover:bg-blue-50/60
                      "
                    >

                      {/* CENTER */}

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-3">

                          <motion.div
                            whileHover={{
                              scale: 1.05,
                            }}
                            transition={{
                              duration: 0.2,
                            }}
                            className="
                              flex
                              h-11
                              w-11
                              shrink-0
                              items-center
                              justify-center
                              rounded-xl
                              bg-blue-50
                              text-blue-600
                            "
                          >
                            <MapPin size={21} />
                          </motion.div>

                          <div>

                            <div className="flex items-center gap-2">

                              <h3 className="font-semibold text-blue-900">
                                {center.center_name}
                              </h3>

                              {center.certification_type && (
                                <span
                                  className="
                                    rounded-md
                                    bg-teal-50
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

                            <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">

                              <span
                                className={
                                  center.availability === "available"
                                    ? "font-medium text-emerald-600"
                                    : "text-slate-500"
                                }
                              >
                                {center.availability === "available"
                                  ? "Available"
                                  : center.availability}
                              </span>

                              {center.open_24_hours && (
                                <>
                                  <span>•</span>
                                  <span className="text-teal-600">
                                    Open 24 hours
                                  </span>
                                </>
                              )}

                            </div>

                          </div>

                        </div>

                      </td>

                      {/* LOCATION */}

                      <td className="px-6 py-5">

                        <div className="max-w-[220px]">

                          <p className="font-medium text-slate-700">
                            {center.city}
                          </p>

                          <p className="mt-1 truncate text-xs text-slate-500">
                            {center.address}
                          </p>

                        </div>

                      </td>

                      {/* RATING */}

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-1">

                          <Star
                            size={16}
                            className="fill-current text-amber-400"
                          />

                          <span className="font-semibold text-slate-700">
                            {center.rating || "N/A"}
                          </span>

                        </div>

                        {center.reviews_count !== undefined && (
                          <p className="mt-1 text-xs text-slate-400">
                            {center.reviews_count.toLocaleString()}{" "}
                            reviews
                          </p>
                        )}

                      </td>

                      {/* REPORT TIME */}

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-2 text-sm text-teal-700">

                          <Clock size={16} />

                          <span>
                            {center.reports_time || "N/A"}
                          </span>

                        </div>

                      </td>

                      {/* TEST COUNT */}

                      <td className="px-6 py-5">

                        <span className="font-medium text-blue-800">
                          {center.total_tests ?? 0}
                        </span>

                        <span className="ml-1 text-xs text-slate-500">
                          tests
                        </span>

                      </td>

                      {/* ACTION */}

                      <td className="px-6 py-5 text-right">

                        <motion.button
                          type="button"
                          onClick={() =>
                            handleViewDetails(center.id)
                          }
                          whileHover={{
                            scale: 1.02,
                          }}
                          whileTap={{
                            scale: 0.97,
                          }}
                          className="
                            inline-flex
                            items-center
                            gap-1.5
                            rounded-lg
                            border
                            border-blue-200
                            px-3
                            py-2
                            text-sm
                            font-medium
                            text-blue-700
                            transition-colors
                            duration-200
                            hover:border-blue-300
                            hover:bg-blue-50
                          "
                        >
                          View Details

                          <ChevronRight
                            size={16}
                            className="
                              transition-transform
                              duration-200
                              group-hover:translate-x-0.5
                            "
                          />

                        </motion.button>

                      </td>

                    </motion.tr>

                  ))}

                </tbody>

              </table>

            </div>

          </motion.div>
        )}

      </div>

      {/* =================================================
          DETAILS MODAL
      ================================================= */}

      {selectedCenterId && (
        <DiagnosticDetails
          id={selectedCenterId}
          onClose={handleCloseDetails}
        />
      )}

    </>
  );
}
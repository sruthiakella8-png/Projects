import { useEffect, useState } from "react";
import axios from "axios";

import {
  Search,
  MapPin,
  Star,
  CalendarDays,
  Video,
  LoaderCircle,
  RefreshCw,
} from "lucide-react";

const API_URL = "http://127.0.0.1:8000/api";

const FindDoctor = () => {

  const [doctors, setDoctors] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // =====================================================
  // GET DOCTORS
  // =====================================================

  const fetchDoctors = async () => {

    try {

      setError("");

      const token = localStorage.getItem("access_token");

      if (!token) {
        setError("Please login to view doctors.");
        setLoading(false);
        return;
      }

      const response = await axios.get(
        `${API_URL}/doctors/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "DOCTORS FROM BACKEND:",
        response.data
      );

      setDoctors(response.data);

    } catch (error) {

      console.error(
        "DOCTOR LOAD ERROR:",
        error
      );

      if (error.response?.status === 401) {

        setError(
          "Your session has expired. Please login again."
        );

      } else {

        setError(
          "Unable to load doctors."
        );
      }

    } finally {

      setLoading(false);

    }
  };


  // =====================================================
  // LOAD DOCTORS
  // =====================================================

  useEffect(() => {

    fetchDoctors();

    // Refresh automatically every 10 seconds
    const interval = setInterval(() => {

      fetchDoctors();

    }, 10000);

    return () => clearInterval(interval);

  }, []);


  // =====================================================
  // SEARCH
  // =====================================================

  const filteredDoctors = doctors.filter((doctor) => {

    const value = search.toLowerCase();

    return (

      doctor.full_name
        ?.toLowerCase()
        .includes(value)

      ||

      doctor.specialization
        ?.toLowerCase()
        .includes(value)

      ||

      doctor.hospital_name
        ?.toLowerCase()
        .includes(value)

    );

  });


  // =====================================================
  // BOOK
  // =====================================================

  const handleBookAppointment = (doctor) => {

    console.log(
      "BOOK DOCTOR:",
      doctor
    );

    // Later navigate to appointment page
    // navigate(`/patient/appointments/book/${doctor.id}`);

  };


  // =====================================================
  // VIDEO
  // =====================================================

  const handleVideoCall = (doctor) => {

    console.log(
      "VIDEO CONSULTATION:",
      doctor
    );

  };


  return (

    <div className="min-h-screen bg-slate-50 p-6">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="mb-6">

        <h1 className="text-3xl font-bold text-slate-900">
          Find Doctor
        </h1>

        <p className="mt-1 text-slate-500">
          Search and book appointments with verified doctors
          near you.
        </p>

      </div>


      {/* =================================================
          SEARCH AREA
      ================================================= */}

      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="flex flex-col gap-4 lg:flex-row">

          <div className="relative flex-1">

            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search doctor, specialization or hospital..."
              className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
            />

          </div>


          <button
            onClick={fetchDoctors}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#14B8A6] px-6 py-3 font-semibold text-white transition hover:opacity-90"
          >

            <RefreshCw size={18} />

            Refresh

          </button>

        </div>

      </div>


      {/* =================================================
          LOCATION
      ================================================= */}

      <div className="mb-5 flex items-center gap-3 rounded-2xl border border-teal-100 bg-teal-50 p-4">

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-teal-600 shadow-sm">

          <MapPin size={20} />

        </div>

        <div>

          <p className="text-sm text-slate-500">
            Current location
          </p>

          <p className="font-semibold text-slate-800">
            GPS Location Active
          </p>

        </div>

      </div>


      {/* =================================================
          DOCTOR TABLE
      ================================================= */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* TABLE HEADER */}

        <div className="flex items-center justify-between border-b border-slate-200 p-5">

          <div>

            <h2 className="text-xl font-bold text-slate-900">
              Doctors Near You
            </h2>

            <p className="mt-1 text-sm text-slate-500">

              {filteredDoctors.length} doctor
              {filteredDoctors.length !== 1 ? "s" : ""}
              {" "}found

            </p>

          </div>

        </div>


        {/* =================================================
            LOADING
        ================================================= */}

        {loading && (

          <div className="flex items-center justify-center py-20">

            <div className="flex items-center gap-3 text-teal-600">

              <LoaderCircle
                size={28}
                className="animate-spin"
              />

              <span className="font-medium">
                Loading doctors...
              </span>

            </div>

          </div>

        )}


        {/* =================================================
            ERROR
        ================================================= */}

        {!loading && error && (

          <div className="p-10 text-center">

            <p className="mb-4 text-red-500">
              {error}
            </p>

            <button
              onClick={fetchDoctors}
              className="rounded-lg bg-teal-600 px-5 py-2 text-white"
            >
              Try Again
            </button>

          </div>

        )}


        {/* =================================================
            EMPTY
        ================================================= */}

        {!loading &&
          !error &&
          filteredDoctors.length === 0 && (

            <div className="p-16 text-center">

              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">

                <Search
                  size={28}
                  className="text-slate-400"
                />

              </div>

              <h3 className="text-lg font-semibold text-slate-800">
                No doctors found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Registered verified doctors will appear here.
              </p>

            </div>

          )}


        {/* =================================================
            TABLE
        ================================================= */}

        {!loading &&
          !error &&
          filteredDoctors.length > 0 && (

            <div className="overflow-x-auto">

              <table className="w-full min-w-[1000px]">

                <thead>

                  <tr className="bg-gradient-to-r from-[#0F9FA8] to-[#14B8A6] text-left text-sm text-white">

                    <th className="px-5 py-4">
                      Doctor
                    </th>

                    <th className="px-5 py-4">
                      Specialization
                    </th>

                    <th className="px-5 py-4">
                      Hospital
                    </th>

                    <th className="px-5 py-4">
                      Experience
                    </th>

                    <th className="px-5 py-4">
                      Availability
                    </th>

                    <th className="px-5 py-4">
                      Fee
                    </th>

                    <th className="px-5 py-4">
                      Action
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {filteredDoctors.map((doctor) => (

                    <tr
                      key={doctor.id}
                      className="border-b border-slate-100 transition hover:bg-slate-50"
                    >

                      {/* DOCTOR */}

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-3">

                          {doctor.profile_image ? (

                            <img
                              src={
                                doctor.profile_image.startsWith("http")
                                  ? doctor.profile_image
                                  : `http://127.0.0.1:8000${doctor.profile_image}`
                              }
                              alt={doctor.full_name}
                              className="h-12 w-12 rounded-full object-cover"
                            />

                          ) : (

                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-50 font-bold text-teal-600">

                              {doctor.full_name
                                ?.split(" ")
                                .map((name) => name[0])
                                .slice(0, 2)
                                .join("")
                                .toUpperCase()}

                            </div>

                          )}


                          <div>

                            <p className="font-semibold text-slate-900">
                              {doctor.full_name}
                            </p>

                            <div className="mt-1 flex items-center gap-1 text-sm text-amber-500">

                              <Star
                                size={15}
                                fill="currentColor"
                              />

                              <span>
                                Verified Doctor
                              </span>

                            </div>

                          </div>

                        </div>

                      </td>


                      {/* SPECIALIZATION */}

                      <td className="px-5 py-4">

                        <span className="font-medium text-slate-700">

                          {doctor.specialization ||
                            "Not specified"}

                        </span>

                      </td>


                      {/* HOSPITAL */}

                      <td className="px-5 py-4">

                        <div>

                          <p className="font-medium text-slate-800">

                            {doctor.hospital_name ||
                              "Independent"}

                          </p>

                          {doctor.hospital_location && (

                            <p className="mt-1 text-sm text-slate-500">

                              {doctor.hospital_location}

                            </p>

                          )}

                        </div>

                      </td>


                      {/* EXPERIENCE */}

                      <td className="px-5 py-4">

                        <span className="text-slate-700">

                          {doctor.experience || 0} Years

                        </span>

                      </td>


                      {/* AVAILABILITY */}

                      <td className="px-5 py-4">

                        {doctor.is_available ? (

                          <div className="flex items-center gap-2">

                            <span className="h-2.5 w-2.5 rounded-full bg-green-500" />

                            <span className="font-medium text-green-600">
                              Available
                            </span>

                          </div>

                        ) : (

                          <div className="flex items-center gap-2">

                            <span className="h-2.5 w-2.5 rounded-full bg-red-500" />

                            <span className="font-medium text-red-500">
                              Busy
                            </span>

                          </div>

                        )}

                      </td>


                      {/* FEE */}

                      <td className="px-5 py-4">

                        <span className="font-semibold text-slate-800">

                          ₹{doctor.consultation_fee || 0}

                        </span>

                      </td>


                      {/* ACTION */}

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-2">

                          <button
                            onClick={() =>
                              handleBookAppointment(doctor)
                            }
                            className="flex items-center gap-2 rounded-lg bg-teal-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-600"
                          >

                            <CalendarDays size={16} />

                            Book

                          </button>


                          <button
                            onClick={() =>
                              handleVideoCall(doctor)
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-teal-400 hover:text-teal-600"
                            title="Video consultation"
                          >

                            <Video size={17} />

                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

      </div>

    </div>

  );

};

export default FindDoctor;
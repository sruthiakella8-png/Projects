import React, { useState } from "react";
import {
  Search,
  Filter,
  Stethoscope,
  Eye,
  CheckCircle,
  XCircle,
  Trash2,
  UserPlus,
  Phone,
  Mail,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Doctors = () => {
  // =====================================================
  // DOCTOR DATA
  // =====================================================

  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: "Dr. Priya Sharma",
      specialization: "Gynecologist",
      email: "priya.sharma@medifind.com",
      phone: "+91 9876543210",
      location: "Hyderabad",
      experience: "10 Years",
      status: "Active",
      verification: "Approved",
    },
    {
      id: 2,
      name: "Dr. Rahul Kumar",
      specialization: "Cardiologist",
      email: "rahul.kumar@medifind.com",
      phone: "+91 9876543211",
      location: "Bangalore",
      experience: "12 Years",
      status: "Active",
      verification: "Approved",
    },
    {
      id: 3,
      name: "Dr. Ananya Reddy",
      specialization: "Dermatologist",
      email: "ananya.reddy@medifind.com",
      phone: "+91 9876543212",
      location: "Chennai",
      experience: "7 Years",
      status: "Pending",
      verification: "Pending",
    },
    {
      id: 4,
      name: "Dr. Arjun Rao",
      specialization: "Neurologist",
      email: "arjun.rao@medifind.com",
      phone: "+91 9876543213",
      location: "Mumbai",
      experience: "15 Years",
      status: "Active",
      verification: "Approved",
    },
    {
      id: 5,
      name: "Dr. Sneha Patel",
      specialization: "Pediatrician",
      email: "sneha.patel@medifind.com",
      phone: "+91 9876543214",
      location: "Pune",
      experience: "8 Years",
      status: "Inactive",
      verification: "Approved",
    },
  ]);

  // =====================================================
  // STATES
  // =====================================================

  const [search, setSearch] = useState("");

  const [specialization, setSpecialization] =
    useState("All");

  const [status, setStatus] =
    useState("All");

  const [selectedDoctor, setSelectedDoctor] =
    useState(null);

  // =====================================================
  // FILTER DOCTORS
  // =====================================================

  const filteredDoctors = doctors.filter((doctor) => {

    const matchesSearch =
      doctor.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      doctor.specialization
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      doctor.location
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesSpecialization =
      specialization === "All" ||
      doctor.specialization === specialization;

    const matchesStatus =
      status === "All" ||
      doctor.status === status;

    return (
      matchesSearch &&
      matchesSpecialization &&
      matchesStatus
    );
  });

  // =====================================================
  // APPROVE DOCTOR
  // =====================================================

  const approveDoctor = (id) => {
    setDoctors((prev) =>
      prev.map((doctor) =>
        doctor.id === id
          ? {
              ...doctor,
              verification: "Approved",
              status: "Active",
            }
          : doctor
      )
    );
  };

  // =====================================================
  // REJECT DOCTOR
  // =====================================================

  const rejectDoctor = (id) => {
    setDoctors((prev) =>
      prev.map((doctor) =>
        doctor.id === id
          ? {
              ...doctor,
              verification: "Rejected",
              status: "Inactive",
            }
          : doctor
      )
    );
  };

  // =====================================================
  // TOGGLE STATUS
  // =====================================================

  const toggleStatus = (id) => {
    setDoctors((prev) =>
      prev.map((doctor) =>
        doctor.id === id
          ? {
              ...doctor,
              status:
                doctor.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : doctor
      )
    );
  };

  // =====================================================
  // DELETE DOCTOR
  // =====================================================

  const deleteDoctor = (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this doctor?"
    );

    if (!confirmDelete) return;

    setDoctors((prev) =>
      prev.filter(
        (doctor) => doctor.id !== id
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

        <div className="flex items-center gap-3">

          <div className="p-3 bg-blue-100 rounded-xl">
            <Stethoscope
              size={28}
              className="text-blue-600"
            />
          </div>

          <div>

            <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
              Doctors
            </h1>

            <p className="text-slate-500 mt-1">
              Manage registered doctors and verification
            </p>

          </div>

        </div>

        <button
          type="button"
          className="flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition"
        >
          <UserPlus size={19} />
          Add Doctor
        </button>

      </div>

      {/* =================================================
          STAT CARDS
      ================================================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

        <StatCard
          title="Total Doctors"
          value={doctors.length}
          icon={Stethoscope}
          bg="bg-blue-100"
          color="text-blue-600"
        />

        <StatCard
          title="Active Doctors"
          value={
            doctors.filter(
              (doctor) =>
                doctor.status === "Active"
            ).length
          }
          icon={CheckCircle}
          bg="bg-green-100"
          color="text-green-600"
        />

        <StatCard
          title="Pending Approval"
          value={
            doctors.filter(
              (doctor) =>
                doctor.verification ===
                "Pending"
            ).length
          }
          icon={Filter}
          bg="bg-orange-100"
          color="text-orange-600"
        />

        <StatCard
          title="Inactive Doctors"
          value={
            doctors.filter(
              (doctor) =>
                doctor.status === "Inactive"
            ).length
          }
          icon={XCircle}
          bg="bg-red-100"
          color="text-red-600"
        />

      </div>

      {/* =================================================
          FILTERS
      ================================================= */}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-6">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Search */}

          <div className="relative">

            <Search
              size={19}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search doctor..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* Specialization */}

          <select
            value={specialization}
            onChange={(e) =>
              setSpecialization(e.target.value)
            }
            className="px-4 py-3 border border-slate-200 rounded-xl bg-white outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">
              All Specializations
            </option>
            <option value="Gynecologist">
              Gynecologist
            </option>
            <option value="Cardiologist">
              Cardiologist
            </option>
            <option value="Dermatologist">
              Dermatologist
            </option>
            <option value="Neurologist">
              Neurologist
            </option>
            <option value="Pediatrician">
              Pediatrician
            </option>
          </select>

          {/* Status */}

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="px-4 py-3 border border-slate-200 rounded-xl bg-white outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">
              All Status
            </option>
            <option value="Active">
              Active
            </option>
            <option value="Inactive">
              Inactive
            </option>
            <option value="Pending">
              Pending
            </option>
          </select>

        </div>

      </div>

      {/* =================================================
          DOCTORS TABLE
      ================================================= */}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

        {/* Table Header */}

        <div className="p-5 border-b border-slate-100">

          <h2 className="font-bold text-slate-800">
            Registered Doctors
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            {filteredDoctors.length} doctors found
          </p>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-50">

              <tr>

                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Doctor
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Specialization
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Location
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Status
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Verification
                </th>

                <th className="text-right px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-slate-100">

              {filteredDoctors.map(
                (doctor) => (

                  <tr
                    key={doctor.id}
                    className="hover:bg-slate-50 transition"
                  >

                    {/* Doctor */}

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-3">

                        <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                          {doctor.name
                            .replace("Dr. ", "")
                            .charAt(0)}
                        </div>

                        <div>

                          <p className="font-semibold text-slate-700">
                            {doctor.name}
                          </p>

                          <p className="text-xs text-slate-400">
                            {doctor.email}
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* Specialization */}

                    <td className="px-6 py-5">

                      <span className="text-sm text-slate-600">
                        {doctor.specialization}
                      </span>

                    </td>

                    {/* Location */}

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-2 text-sm text-slate-600">

                        <MapPin
                          size={15}
                          className="text-slate-400"
                        />

                        {doctor.location}

                      </div>

                    </td>

                    {/* Status */}

                    <td className="px-6 py-5">

                      <button
                        onClick={() =>
                          toggleStatus(
                            doctor.id
                          )
                        }
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                          doctor.status ===
                          "Active"
                            ? "bg-green-100 text-green-700"
                            : doctor.status ===
                              "Pending"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {doctor.status}
                      </button>

                    </td>

                    {/* Verification */}

                    <td className="px-6 py-5">

                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                          doctor.verification ===
                          "Approved"
                            ? "bg-green-100 text-green-700"
                            : doctor.verification ===
                              "Pending"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {doctor.verification}
                      </span>

                    </td>

                    {/* Actions */}

                    <td className="px-6 py-5">

                      <div className="flex justify-end items-center gap-2">

                        {/* View */}

                        <button
                          onClick={() =>
                            setSelectedDoctor(
                              doctor
                            )
                          }
                          className="p-2 rounded-lg text-blue-600 hover:bg-blue-50"
                          title="View"
                        >
                          <Eye size={18} />
                        </button>

                        {/* Approve */}

                        {doctor.verification ===
                          "Pending" && (
                          <button
                            onClick={() =>
                              approveDoctor(
                                doctor.id
                              )
                            }
                            className="p-2 rounded-lg text-green-600 hover:bg-green-50"
                            title="Approve"
                          >
                            <CheckCircle
                              size={18}
                            />
                          </button>
                        )}

                        {/* Reject */}

                        {doctor.verification ===
                          "Pending" && (
                          <button
                            onClick={() =>
                              rejectDoctor(
                                doctor.id
                              )
                            }
                            className="p-2 rounded-lg text-orange-600 hover:bg-orange-50"
                            title="Reject"
                          >
                            <XCircle
                              size={18}
                            />
                          </button>
                        )}

                        {/* Delete */}

                        <button
                          onClick={() =>
                            deleteDoctor(
                              doctor.id
                            )
                          }
                          className="p-2 rounded-lg text-red-600 hover:bg-red-50"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>

                      </div>

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

          {/* Empty State */}

          {filteredDoctors.length ===
            0 && (
            <div className="py-16 text-center">

              <Stethoscope
                size={45}
                className="mx-auto text-slate-300"
              />

              <h3 className="mt-4 font-semibold text-slate-700">
                No doctors found
              </h3>

              <p className="text-sm text-slate-400 mt-1">
                Try changing your search or filters.
              </p>

            </div>
          )}

        </div>

        {/* =================================================
            PAGINATION
        ================================================= */}

        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">

          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-700">
              {filteredDoctors.length}
            </span>{" "}
            doctors
          </p>

          <div className="flex items-center gap-2">

            <button className="p-2 border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50">
              <ChevronLeft size={18} />
            </button>

            <button className="w-9 h-9 rounded-lg bg-blue-600 text-white text-sm font-semibold">
              1
            </button>

            <button className="p-2 border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50">
              <ChevronRight size={18} />
            </button>

          </div>

        </div>

      </div>

      {/* =================================================
          DOCTOR DETAILS MODAL
      ================================================= */}

      {selectedDoctor && (

        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-5">

          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl">

            {/* Modal Header */}

            <div className="p-6 border-b border-slate-100 flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
                  {selectedDoctor.name
                    .replace("Dr. ", "")
                    .charAt(0)}
                </div>

                <div>

                  <h2 className="font-bold text-slate-800">
                    {selectedDoctor.name}
                  </h2>

                  <p className="text-sm text-slate-500">
                    {selectedDoctor.specialization}
                  </p>

                </div>

              </div>

              <button
                onClick={() =>
                  setSelectedDoctor(null)
                }
                className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg"
              >
                <XCircle size={22} />
              </button>

            </div>

            {/* Modal Body */}

            <div className="p-6 space-y-5">

              <DetailRow
                icon={Mail}
                label="Email"
                value={selectedDoctor.email}
              />

              <DetailRow
                icon={Phone}
                label="Phone"
                value={selectedDoctor.phone}
              />

              <DetailRow
                icon={MapPin}
                label="Location"
                value={selectedDoctor.location}
              />

              <DetailRow
                icon={Stethoscope}
                label="Experience"
                value={selectedDoctor.experience}
              />

              <div className="flex justify-between items-center pt-3">

                <span className="text-sm text-slate-500">
                  Verification
                </span>

                <span className="px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                  {selectedDoctor.verification}
                </span>

              </div>

            </div>

            {/* Modal Footer */}

            <div className="p-6 border-t border-slate-100 flex justify-end">

              <button
                onClick={() =>
                  setSelectedDoctor(null)
                }
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium"
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

// =========================================================
// STAT CARD
// =========================================================

const StatCard = ({
  title,
  value,
  icon: Icon,
  bg,
  color,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="text-3xl font-bold text-slate-800 mt-2">
            {value}
          </h2>

        </div>

        <div className={`p-3 rounded-xl ${bg}`}>
          <Icon
            size={24}
            className={color}
          />
        </div>

      </div>

    </div>
  );
};

// =========================================================
// DETAIL ROW
// =========================================================

const DetailRow = ({
  icon: Icon,
  label,
  value,
}) => {
  return (
    <div className="flex items-center gap-4">

      <div className="p-3 bg-slate-100 rounded-xl">
        <Icon
          size={19}
          className="text-slate-600"
        />
      </div>

      <div>

        <p className="text-xs text-slate-400">
          {label}
        </p>

        <p className="text-sm font-medium text-slate-700 mt-1">
          {value}
        </p>

      </div>

    </div>
  );
};

export default Doctors;
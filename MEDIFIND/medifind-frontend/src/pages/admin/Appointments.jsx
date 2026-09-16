import React, { useMemo, useState } from "react";
import {
  Search,
  Filter,
  Eye,
  Trash2,
  Calendar,
  Clock,
  User,
  Stethoscope,
  Building2,
  Phone,
  X,
  CheckCircle,
  XCircle,
  AlertCircle,
  CalendarDays,
} from "lucide-react";

const Appointments = () => {
  // =========================================================
  // SAMPLE APPOINTMENT DATA
  // =========================================================

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patient: "Rahul Sharma",
      patientPhone: "+91 9876543210",
      doctor: "Dr. Priya Sharma",
      specialization: "Gynecologist",
      hospital: "Apollo Hospitals",
      date: "12 Aug 2026",
      time: "10:00 AM",
      type: "Consultation",
      status: "Confirmed",
    },
    {
      id: 2,
      patient: "Ananya Reddy",
      patientPhone: "+91 9123456780",
      doctor: "Dr. Rahul Reddy",
      specialization: "Cardiologist",
      hospital: "Care Hospitals",
      date: "12 Aug 2026",
      time: "11:30 AM",
      type: "Consultation",
      status: "Confirmed",
    },
    {
      id: 3,
      patient: "Arjun Kumar",
      patientPhone: "+91 9988776655",
      doctor: "Dr. Anjali Kumar",
      specialization: "Dermatologist",
      hospital: "KIMS Hospitals",
      date: "12 Aug 2026",
      time: "01:00 PM",
      type: "Follow-up",
      status: "Pending",
    },
    {
      id: 4,
      patient: "Sneha Rao",
      patientPhone: "+91 9012345678",
      doctor: "Dr. Arjun Rao",
      specialization: "Orthopedic",
      hospital: "Yashoda Hospitals",
      date: "13 Aug 2026",
      time: "09:30 AM",
      type: "Consultation",
      status: "Confirmed",
    },
    {
      id: 5,
      patient: "Vikram Singh",
      patientPhone: "+91 9345678901",
      doctor: "Dr. Vikram Singh",
      specialization: "Neurologist",
      hospital: "Max Super Speciality Hospital",
      date: "13 Aug 2026",
      time: "02:30 PM",
      type: "Consultation",
      status: "Cancelled",
    },
    {
      id: 6,
      patient: "Meena Devi",
      patientPhone: "+91 9234567890",
      doctor: "Dr. Meena Nair",
      specialization: "ENT Specialist",
      hospital: "Aster Medcity",
      date: "14 Aug 2026",
      time: "10:30 AM",
      type: "Follow-up",
      status: "Pending",
    },
    {
      id: 7,
      patient: "Rohit Verma",
      patientPhone: "+91 9456789012",
      doctor: "Dr. Kiran Verma",
      specialization: "General Physician",
      hospital: "Manipal Hospital",
      date: "14 Aug 2026",
      time: "12:00 PM",
      type: "Consultation",
      status: "Completed",
    },
    {
      id: 8,
      patient: "Divya Nair",
      patientPhone: "+91 9567890123",
      doctor: "Dr. Sneha Patel",
      specialization: "Pediatrician",
      hospital: "Fortis Hospital",
      date: "15 Aug 2026",
      time: "04:00 PM",
      type: "Consultation",
      status: "Confirmed",
    },
    {
      id: 9,
      patient: "Kiran Reddy",
      patientPhone: "+91 9678901234",
      doctor: "Dr. Priya Sharma",
      specialization: "Gynecologist",
      hospital: "Apollo Hospitals",
      date: "15 Aug 2026",
      time: "05:30 PM",
      type: "Follow-up",
      status: "Pending",
    },
    {
      id: 10,
      patient: "Pooja Patel",
      patientPhone: "+91 9789012345",
      doctor: "Dr. Rahul Reddy",
      specialization: "Cardiologist",
      hospital: "Care Hospitals",
      date: "16 Aug 2026",
      time: "10:00 AM",
      type: "Emergency",
      status: "Confirmed",
    },
  ]);

  // =========================================================
  // STATES
  // =========================================================

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  const [selectedAppointment, setSelectedAppointment] =
    useState(null);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [appointmentToDelete, setAppointmentToDelete] =
    useState(null);

  // =========================================================
  // FILTER APPOINTMENTS
  // =========================================================

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        appointment.patient
          .toLowerCase()
          .includes(searchText) ||
        appointment.doctor
          .toLowerCase()
          .includes(searchText) ||
        appointment.hospital
          .toLowerCase()
          .includes(searchText) ||
        appointment.specialization
          .toLowerCase()
          .includes(searchText);

      const matchesStatus =
        statusFilter === "All" ||
        appointment.status === statusFilter;

      const matchesType =
        typeFilter === "All" ||
        appointment.type === typeFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesType
      );
    });
  }, [
    appointments,
    search,
    statusFilter,
    typeFilter,
  ]);

  // =========================================================
  // COUNTS
  // =========================================================

  const totalAppointments = appointments.length;

  const confirmedAppointments =
    appointments.filter(
      (appointment) =>
        appointment.status === "Confirmed"
    ).length;

  const pendingAppointments =
    appointments.filter(
      (appointment) =>
        appointment.status === "Pending"
    ).length;

  const completedAppointments =
    appointments.filter(
      (appointment) =>
        appointment.status === "Completed"
    ).length;

  const cancelledAppointments =
    appointments.filter(
      (appointment) =>
        appointment.status === "Cancelled"
    ).length;

  // =========================================================
  // UPDATE STATUS
  // =========================================================

  const updateStatus = (id, newStatus) => {
    setAppointments((currentAppointments) =>
      currentAppointments.map((appointment) =>
        appointment.id === id
          ? {
              ...appointment,
              status: newStatus,
            }
          : appointment
      )
    );
  };

  // =========================================================
  // DELETE APPOINTMENT
  // =========================================================

  const confirmDelete = () => {
    if (!appointmentToDelete) return;

    setAppointments((currentAppointments) =>
      currentAppointments.filter(
        (appointment) =>
          appointment.id !==
          appointmentToDelete.id
      )
    );

    setAppointmentToDelete(null);
    setShowDeleteModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

        <div className="flex items-center gap-3">

          <div className="p-3 bg-blue-100 rounded-xl">
            <CalendarDays
              size={28}
              className="text-blue-600"
            />
          </div>

          <div>

            <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
              Appointments
            </h1>

            <p className="text-slate-500 mt-1">
              Monitor and manage all MEDIFIND appointments
            </p>

          </div>

        </div>

      </div>

      {/* =====================================================
          STAT CARDS
      ===================================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5 mb-8">

        <StatCard
          title="Total"
          value={totalAppointments}
          icon={CalendarDays}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
        />

        <StatCard
          title="Confirmed"
          value={confirmedAppointments}
          icon={CheckCircle}
          iconBg="bg-green-100"
          iconColor="text-green-600"
        />

        <StatCard
          title="Pending"
          value={pendingAppointments}
          icon={Clock}
          iconBg="bg-orange-100"
          iconColor="text-orange-600"
        />

        <StatCard
          title="Completed"
          value={completedAppointments}
          icon={CheckCircle}
          iconBg="bg-teal-100"
          iconColor="text-teal-600"
        />

        <StatCard
          title="Cancelled"
          value={cancelledAppointments}
          icon={XCircle}
          iconBg="bg-red-100"
          iconColor="text-red-600"
        />

      </div>

      {/* =====================================================
          SEARCH + FILTERS
      ===================================================== */}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-6">

        <div className="flex flex-col xl:flex-row gap-4">

          {/* Search */}

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
              placeholder="Search patient, doctor or hospital..."
              className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* Status */}

          <div className="relative">

            <Filter
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="appearance-none w-full xl:w-48 pl-11 pr-8 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >

              <option value="All">
                All Status
              </option>

              <option value="Confirmed">
                Confirmed
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="Completed">
                Completed
              </option>

              <option value="Cancelled">
                Cancelled
              </option>

            </select>

          </div>

          {/* Type */}

          <div className="relative">

            <Calendar
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select
              value={typeFilter}
              onChange={(e) =>
                setTypeFilter(e.target.value)
              }
              className="appearance-none w-full xl:w-48 pl-11 pr-8 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >

              <option value="All">
                All Types
              </option>

              <option value="Consultation">
                Consultation
              </option>

              <option value="Follow-up">
                Follow-up
              </option>

              <option value="Emergency">
                Emergency
              </option>

            </select>

          </div>

        </div>

      </div>

      {/* =====================================================
          APPOINTMENT TABLE
      ===================================================== */}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

        <div className="p-6 border-b border-slate-100">

          <h2 className="text-lg font-semibold text-slate-800">
            All Appointments
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            {filteredAppointments.length} appointments found
          </p>

        </div>

        {/* ===================================================
            DESKTOP TABLE
        =================================================== */}

        <div className="hidden xl:block overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-50">

              <tr>

                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Patient
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Doctor
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Hospital
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Date & Time
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Type
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Status
                </th>

                <th className="text-right px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-slate-100">

              {filteredAppointments.map(
                (appointment) => (

                  <tr
                    key={appointment.id}
                    className="hover:bg-slate-50 transition"
                  >

                    {/* Patient */}

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">

                          {appointment.patient
                            .charAt(0)}

                        </div>

                        <div>

                          <p className="font-semibold text-slate-700">
                            {appointment.patient}
                          </p>

                          <p className="text-sm text-slate-400">
                            {appointment.patientPhone}
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* Doctor */}

                    <td className="px-6 py-5">

                      <p className="text-sm font-semibold text-slate-700">
                        {appointment.doctor}
                      </p>

                      <p className="text-xs text-blue-500 mt-1">
                        {appointment.specialization}
                      </p>

                    </td>

                    {/* Hospital */}

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-2">

                        <Building2
                          size={16}
                          className="text-teal-500"
                        />

                        <span className="text-sm text-slate-700">
                          {appointment.hospital}
                        </span>

                      </div>

                    </td>

                    {/* Date */}

                    <td className="px-6 py-5">

                      <div>

                        <div className="flex items-center gap-2">

                          <Calendar
                            size={15}
                            className="text-blue-500"
                          />

                          <span className="text-sm font-medium text-slate-700">
                            {appointment.date}
                          </span>

                        </div>

                        <div className="flex items-center gap-2 mt-1">

                          <Clock
                            size={15}
                            className="text-slate-400"
                          />

                          <span className="text-xs text-slate-500">
                            {appointment.time}
                          </span>

                        </div>

                      </div>

                    </td>

                    {/* Type */}

                    <td className="px-6 py-5">

                      <TypeBadge
                        type={appointment.type}
                      />

                    </td>

                    {/* Status */}

                    <td className="px-6 py-5">

                      <StatusBadge
                        status={
                          appointment.status
                        }
                      />

                    </td>

                    {/* Actions */}

                    <td className="px-6 py-5">

                      <div className="flex items-center justify-end gap-2">

                        {/* View */}

                        <button
                          onClick={() =>
                            setSelectedAppointment(
                              appointment
                            )
                          }
                          title="View Appointment"
                          className="p-2.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition"
                        >
                          <Eye size={17} />
                        </button>

                        {/* Confirm */}

                        {appointment.status ===
                          "Pending" && (

                          <button
                            onClick={() =>
                              updateStatus(
                                appointment.id,
                                "Confirmed"
                              )
                            }
                            title="Confirm Appointment"
                            className="p-2.5 text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition"
                          >
                            <CheckCircle
                              size={17}
                            />
                          </button>

                        )}

                        {/* Cancel */}

                        {(appointment.status ===
                          "Pending" ||
                          appointment.status ===
                            "Confirmed") && (

                          <button
                            onClick={() =>
                              updateStatus(
                                appointment.id,
                                "Cancelled"
                              )
                            }
                            title="Cancel Appointment"
                            className="p-2.5 text-orange-600 bg-orange-50 hover:bg-orange-100 rounded-lg transition"
                          >
                            <XCircle size={17} />
                          </button>

                        )}

                        {/* Delete */}

                        <button
                          onClick={() => {
                            setAppointmentToDelete(
                              appointment
                            );
                            setShowDeleteModal(
                              true
                            );
                          }}
                          title="Delete Appointment"
                          className="p-2.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition"
                        >
                          <Trash2 size={17} />
                        </button>

                      </div>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

        {/* ===================================================
            MOBILE / TABLET CARDS
        =================================================== */}

        <div className="xl:hidden divide-y divide-slate-100">

          {filteredAppointments.map(
            (appointment) => (

              <div
                key={appointment.id}
                className="p-5"
              >

                <div className="flex items-start justify-between gap-4">

                  <div className="flex items-center gap-3">

                    <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">

                      {appointment.patient.charAt(
                        0
                      )}

                    </div>

                    <div>

                      <h3 className="font-semibold text-slate-700">
                        {appointment.patient}
                      </h3>

                      <p className="text-sm text-blue-500">
                        {appointment.doctor}
                      </p>

                    </div>

                  </div>

                  <StatusBadge
                    status={appointment.status}
                  />

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">

                  <InfoItem
                    icon={Stethoscope}
                    label="Specialization"
                    value={
                      appointment.specialization
                    }
                  />

                  <InfoItem
                    icon={Building2}
                    label="Hospital"
                    value={
                      appointment.hospital
                    }
                  />

                  <InfoItem
                    icon={Calendar}
                    label="Date"
                    value={
                      appointment.date
                    }
                  />

                  <InfoItem
                    icon={Clock}
                    label="Time"
                    value={
                      appointment.time
                    }
                  />

                  <InfoItem
                    icon={Phone}
                    label="Patient Phone"
                    value={
                      appointment.patientPhone
                    }
                  />

                  <InfoItem
                    icon={Calendar}
                    label="Type"
                    value={
                      appointment.type
                    }
                  />

                </div>

                <div className="flex gap-2 mt-5">

                  <button
                    onClick={() =>
                      setSelectedAppointment(
                        appointment
                      )
                    }
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg text-sm font-medium"
                  >
                    <Eye size={16} />
                    View
                  </button>

                  {appointment.status ===
                  "Pending" && (

                    <button
                      onClick={() =>
                        updateStatus(
                          appointment.id,
                          "Confirmed"
                        )
                      }
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 text-green-600 bg-green-50 hover:bg-green-100 rounded-lg text-sm font-medium"
                    >
                      <CheckCircle size={16} />
                      Confirm
                    </button>

                  )}

                  {(appointment.status ===
                    "Pending" ||
                    appointment.status ===
                      "Confirmed") && (

                    <button
                      onClick={() =>
                        updateStatus(
                          appointment.id,
                          "Cancelled"
                        )
                      }
                      className="flex items-center justify-center px-3 py-2.5 text-orange-600 bg-orange-50 hover:bg-orange-100 rounded-lg"
                    >
                      <XCircle size={16} />
                    </button>

                  )}

                  <button
                    onClick={() => {
                      setAppointmentToDelete(
                        appointment
                      );
                      setShowDeleteModal(
                        true
                      );
                    }}
                    className="flex items-center justify-center px-3 py-2.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg"
                  >
                    <Trash2 size={16} />
                  </button>

                </div>

              </div>

            )
          )}

        </div>

        {/* No Results */}

        {filteredAppointments.length ===
          0 && (

          <div className="p-12 text-center">

            <CalendarDays
              size={45}
              className="mx-auto text-slate-300"
            />

            <h3 className="text-lg font-semibold text-slate-700 mt-4">
              No appointments found
            </h3>

            <p className="text-sm text-slate-400 mt-1">
              Try changing your search or filters.
            </p>

          </div>

        )}

      </div>

      {/* =====================================================
          VIEW APPOINTMENT MODAL
      ===================================================== */}

      {selectedAppointment && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden">

            {/* Header */}

            <div className="flex items-center justify-between p-6 border-b border-slate-100">

              <div>

                <h2 className="text-xl font-bold text-slate-800">
                  Appointment Details
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Appointment #{selectedAppointment.id}
                </p>

              </div>

              <button
                onClick={() =>
                  setSelectedAppointment(
                    null
                  )
                }
                className="p-2 hover:bg-slate-100 rounded-lg"
              >
                <X size={20} />
              </button>

            </div>

            {/* Body */}

            <div className="p-6">

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-7">

                <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">

                  <CalendarDays size={34} />

                </div>

                <div className="text-center sm:text-left">

                  <h3 className="text-xl font-bold text-slate-800">
                    {selectedAppointment.patient}
                  </h3>

                  <p className="text-blue-600 font-medium mt-1">
                    {selectedAppointment.type}
                  </p>

                  <div className="mt-2">

                    <StatusBadge
                      status={
                        selectedAppointment.status
                      }
                    />

                  </div>

                </div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <DetailItem
                  icon={User}
                  label="Patient"
                  value={
                    selectedAppointment.patient
                  }
                />

                <DetailItem
                  icon={Phone}
                  label="Patient Phone"
                  value={
                    selectedAppointment.patientPhone
                  }
                />

                <DetailItem
                  icon={Stethoscope}
                  label="Doctor"
                  value={
                    selectedAppointment.doctor
                  }
                />

                <DetailItem
                  icon={Stethoscope}
                  label="Specialization"
                  value={
                    selectedAppointment.specialization
                  }
                />

                <DetailItem
                  icon={Building2}
                  label="Hospital"
                  value={
                    selectedAppointment.hospital
                  }
                />

                <DetailItem
                  icon={Calendar}
                  label="Date"
                  value={
                    selectedAppointment.date
                  }
                />

                <DetailItem
                  icon={Clock}
                  label="Time"
                  value={
                    selectedAppointment.time
                  }
                />

                <DetailItem
                  icon={Calendar}
                  label="Appointment Type"
                  value={
                    selectedAppointment.type
                  }
                />

              </div>

            </div>

            {/* Footer */}

            <div className="p-6 border-t border-slate-100 flex flex-wrap justify-end gap-3">

              {selectedAppointment.status ===
                "Pending" && (

                <button
                  onClick={() => {
                    updateStatus(
                      selectedAppointment.id,
                      "Confirmed"
                    );

                    setSelectedAppointment(
                      null
                    );
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium"
                >
                  <CheckCircle size={17} />
                  Confirm
                </button>

              )}

              {(selectedAppointment.status ===
                "Pending" ||
                selectedAppointment.status ===
                  "Confirmed") && (

                <button
                  onClick={() => {
                    updateStatus(
                      selectedAppointment.id,
                      "Cancelled"
                    );

                    setSelectedAppointment(
                      null
                    );
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-medium"
                >
                  <XCircle size={17} />
                  Cancel
                </button>

              )}

              <button
                onClick={() =>
                  setSelectedAppointment(
                    null
                  )
                }
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium"
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

      {/* =====================================================
          DELETE MODAL
      ===================================================== */}

      {showDeleteModal &&
        appointmentToDelete && (

          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">

              <div className="flex items-center gap-4">

                <div className="p-3 bg-red-100 rounded-xl">

                  <Trash2
                    size={24}
                    className="text-red-600"
                  />

                </div>

                <div>

                  <h2 className="text-lg font-bold text-slate-800">
                    Delete Appointment?
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    This action cannot be undone.
                  </p>

                </div>

              </div>

              <div className="mt-5 p-4 bg-slate-50 rounded-xl">

                <p className="font-semibold text-slate-700">
                  {appointmentToDelete.patient}
                </p>

                <p className="text-sm text-slate-500 mt-1">
                  {appointmentToDelete.doctor}
                </p>

                <p className="text-sm text-slate-500 mt-1">
                  {appointmentToDelete.date} •{" "}
                  {appointmentToDelete.time}
                </p>

              </div>

              <div className="flex justify-end gap-3 mt-6">

                <button
                  onClick={() => {
                    setShowDeleteModal(
                      false
                    );
                    setAppointmentToDelete(
                      null
                    );
                  }}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium"
                >
                  Cancel
                </button>

                <button
                  onClick={confirmDelete}
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium"
                >
                  Delete Appointment
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
  iconBg,
  iconColor,
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

        <div className={`p-3 rounded-xl ${iconBg}`}>

          <Icon
            size={25}
            className={iconColor}
          />

        </div>

      </div>

    </div>
  );
};

// =========================================================
// STATUS BADGE
// =========================================================

const StatusBadge = ({ status }) => {
  const styles = {
    Confirmed: "bg-green-100 text-green-700",
    Pending: "bg-orange-100 text-orange-700",
    Completed: "bg-teal-100 text-teal-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  const dots = {
    Confirmed: "bg-green-500",
    Pending: "bg-orange-500",
    Completed: "bg-teal-500",
    Cancelled: "bg-red-500",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${
        styles[status]
      }`}
    >
      <span
        className={`w-2 h-2 rounded-full ${dots[status]}`}
      />

      {status}
    </span>
  );
};

// =========================================================
// TYPE BADGE
// =========================================================

const TypeBadge = ({ type }) => {
  const styles = {
    Consultation:
      "bg-blue-100 text-blue-700",
    "Follow-up":
      "bg-purple-100 text-purple-700",
    Emergency:
      "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
        styles[type]
      }`}
    >
      {type}
    </span>
  );
};

// =========================================================
// INFO ITEM
// =========================================================

const InfoItem = ({
  icon: Icon,
  label,
  value,
}) => {
  return (
    <div className="flex items-center gap-3">

      <Icon
        size={16}
        className="text-slate-400"
      />

      <div>

        <p className="text-xs text-slate-400">
          {label}
        </p>

        <p className="text-sm text-slate-700 font-medium">
          {value}
        </p>

      </div>

    </div>
  );
};

// =========================================================
// DETAIL ITEM
// =========================================================

const DetailItem = ({
  icon: Icon,
  label,
  value,
}) => {
  return (
    <div className="p-4 bg-slate-50 rounded-xl">

      <div className="flex items-center gap-2 mb-1">

        <Icon
          size={16}
          className="text-blue-500"
        />

        <span className="text-xs text-slate-400">
          {label}
        </span>

      </div>

      <p className="text-sm font-medium text-slate-700">
        {value}
      </p>

    </div>
  );
};

export default Appointments;
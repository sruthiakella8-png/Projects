import React, { useState } from "react";
import {
  Search,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  Siren,
  MapPin,
  Phone,
  User,
  Ambulance,
} from "lucide-react";

const Emergency = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [requests, setRequests] = useState([
    {
      id: 1,
      patient: "Rahul Kumar",
      age: 42,
      location: "Banjara Hills, Hyderabad",
      emergencyType: "Accident",
      phone: "9876543210",
      time: "10:15 AM",
      status: "Active",
    },
    {
      id: 2,
      patient: "Anitha Reddy",
      age: 58,
      location: "Madhapur, Hyderabad",
      emergencyType: "Chest Pain",
      phone: "9876543211",
      time: "10:30 AM",
      status: "Active",
    },
    {
      id: 3,
      patient: "Suresh Rao",
      age: 35,
      location: "Gachibowli, Hyderabad",
      emergencyType: "Injury",
      phone: "9876543212",
      time: "09:45 AM",
      status: "Resolved",
    },
    {
      id: 4,
      patient: "Priya Sharma",
      age: 29,
      location: "Kukatpally, Hyderabad",
      emergencyType: "Breathing Problem",
      phone: "9876543213",
      time: "11:00 AM",
      status: "Pending",
    },
  ]);

  // Search
  const filteredRequests = requests.filter(
    (request) =>
      request.patient
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      request.location
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      request.emergencyType
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      request.status
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  // Statistics
  const activeCount = requests.filter(
    (request) => request.status === "Active"
  ).length;

  const pendingCount = requests.filter(
    (request) => request.status === "Pending"
  ).length;

  const resolvedCount = requests.filter(
    (request) => request.status === "Resolved"
  ).length;

  // Mark as resolved
  const handleResolve = (id) => {
    setRequests((prev) =>
      prev.map((request) =>
        request.id === id
          ? { ...request, status: "Resolved" }
          : request
      )
    );
  };

  // Mark as active
  const handleActivate = (id) => {
    setRequests((prev) =>
      prev.map((request) =>
        request.id === id
          ? { ...request, status: "Active" }
          : request
      )
    );
  };

  // Status styling
  const getStatusStyle = (status) => {
    if (status === "Active") {
      return "bg-red-100 text-red-700";
    }

    if (status === "Pending") {
      return "bg-yellow-100 text-yellow-700";
    }

    return "bg-green-100 text-green-700";
  };

  return (
    <div className="p-6 md:p-8 bg-slate-100 min-h-screen">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

        <div>
          <div className="flex items-center gap-3">

            <div className="p-3 bg-red-100 rounded-xl">
              <Siren
                size={28}
                className="text-red-600"
              />
            </div>

            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                Emergency Requests
              </h1>

              <p className="text-slate-500 mt-1">
                Monitor and manage emergency requests
              </p>
            </div>

          </div>
        </div>

        {/* Emergency status */}
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 px-4 py-3 rounded-xl">

          <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>

          <span className="text-red-700 font-semibold">
            {activeCount} Active Emergencies
          </span>

        </div>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

        {/* Total */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-500">
                Total Requests
              </p>

              <h2 className="text-3xl font-bold text-slate-800 mt-2">
                {requests.length}
              </h2>
            </div>

            <div className="p-3 bg-blue-100 rounded-xl">
              <Siren
                size={24}
                className="text-blue-600"
              />
            </div>

          </div>

        </div>

        {/* Active */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-500">
                Active
              </p>

              <h2 className="text-3xl font-bold text-red-600 mt-2">
                {activeCount}
              </h2>
            </div>

            <div className="p-3 bg-red-100 rounded-xl">
              <Siren
                size={24}
                className="text-red-600"
              />
            </div>

          </div>

        </div>

        {/* Pending */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-500">
                Pending
              </p>

              <h2 className="text-3xl font-bold text-yellow-600 mt-2">
                {pendingCount}
              </h2>
            </div>

            <div className="p-3 bg-yellow-100 rounded-xl">
              <Clock
                size={24}
                className="text-yellow-600"
              />
            </div>

          </div>

        </div>

        {/* Resolved */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-500">
                Resolved
              </p>

              <h2 className="text-3xl font-bold text-green-600 mt-2">
                {resolvedCount}
              </h2>
            </div>

            <div className="p-3 bg-green-100 rounded-xl">
              <CheckCircle
                size={24}
                className="text-green-600"
              />
            </div>

          </div>

        </div>

      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 mb-6">

        <div className="relative max-w-md">

          <Search
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search emergency requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

        </div>

      </div>

      {/* Emergency Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

        {/* Table Header */}
        <div className="px-6 py-5 border-b border-slate-200">

          <h2 className="text-lg font-semibold text-slate-800">
            Emergency Requests
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Monitor emergency requests and their current status
          </p>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-50">

              <tr>

                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                  Patient
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                  Emergency
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                  Location
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                  Phone
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                  Time
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                  Status
                </th>

                <th className="text-center px-6 py-4 text-sm font-semibold text-slate-600">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-slate-100">

              {filteredRequests.length > 0 ? (

                filteredRequests.map((request) => (

                  <tr
                    key={request.id}
                    className="hover:bg-slate-50 transition"
                  >

                    {/* Patient */}
                    <td className="px-6 py-4">

                      <div className="flex items-center gap-3">

                        <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center">

                          <User
                            size={21}
                            className="text-blue-600"
                          />

                        </div>

                        <div>

                          <p className="font-semibold text-slate-800">
                            {request.patient}
                          </p>

                          <p className="text-xs text-slate-400">
                            Age: {request.age} • ER-{request.id}
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* Emergency Type */}
                    <td className="px-6 py-4">

                      <div className="flex items-center gap-2">

                        <Siren
                          size={18}
                          className="text-red-500"
                        />

                        <span className="font-medium text-slate-700">
                          {request.emergencyType}
                        </span>

                      </div>

                    </td>

                    {/* Location */}
                    <td className="px-6 py-4">

                      <div className="flex items-center gap-2 text-slate-600">

                        <MapPin
                          size={17}
                          className="text-teal-600"
                        />

                        <span>
                          {request.location}
                        </span>

                      </div>

                    </td>

                    {/* Phone */}
                    <td className="px-6 py-4">

                      <div className="flex items-center gap-2 text-slate-600">

                        <Phone
                          size={16}
                          className="text-blue-500"
                        />

                        {request.phone}

                      </div>

                    </td>

                    {/* Time */}
                    <td className="px-6 py-4 text-slate-600">
                      {request.time}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">

                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                          request.status
                        )}`}
                      >
                        {request.status}
                      </span>

                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">

                      <div className="flex items-center justify-center gap-2">

                        {/* View */}
                        <button
                          title="View Emergency"
                          onClick={() =>
                            alert(
                              `Emergency Request\n\nPatient: ${request.patient}\nEmergency: ${request.emergencyType}\nLocation: ${request.location}`
                            )
                          }
                          className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition"
                        >
                          <Eye size={18} />
                        </button>

                        {/* Resolve */}
                        {request.status !== "Resolved" && (
                          <button
                            title="Mark as Resolved"
                            onClick={() =>
                              handleResolve(request.id)
                            }
                            className="p-2 rounded-lg text-green-600 hover:bg-green-50 transition"
                          >
                            <CheckCircle size={18} />
                          </button>
                        )}

                        {/* Activate */}
                        {request.status === "Resolved" && (
                          <button
                            title="Reactivate"
                            onClick={() =>
                              handleActivate(request.id)
                            }
                            className="p-2 rounded-lg text-orange-600 hover:bg-orange-50 transition"
                          >
                            <Clock size={18} />
                          </button>
                        )}

                        {/* Call */}
                        <button
                          title="Call Patient"
                          onClick={() =>
                            window.open(
                              `tel:${request.phone}`
                            )
                          }
                          className="p-2 rounded-lg text-teal-600 hover:bg-teal-50 transition"
                        >
                          <Phone size={18} />
                        </button>

                        {/* Ambulance */}
                        {request.status !== "Resolved" && (
                          <button
                            title="Dispatch Ambulance"
                            onClick={() =>
                              alert(
                                `Ambulance dispatch requested for ${request.patient}.`
                              )
                            }
                            className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition"
                          >
                            <Ambulance size={18} />
                          </button>
                        )}

                      </div>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="7"
                    className="px-6 py-12 text-center"
                  >

                    <div className="flex flex-col items-center">

                      <Siren
                        size={42}
                        className="text-slate-300 mb-3"
                      />

                      <p className="text-slate-500 font-medium">
                        No emergency requests found
                      </p>

                      <p className="text-sm text-slate-400 mt-1">
                        Try changing your search.
                      </p>

                    </div>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default Emergency;
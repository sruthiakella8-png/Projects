import React, { useMemo, useState } from "react";
import {
  Search,
  Filter,
  Eye,
  Trash2,
  Ban,
  CheckCircle,
  Plus,
  Building2,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Users,
  X,
} from "lucide-react";

const Hospitals = () => {
  // =========================================================
  // SAMPLE HOSPITAL DATA
  // =========================================================

  const [hospitals, setHospitals] = useState([
    {
      id: 1,
      name: "Apollo Hospitals",
      email: "info@apollohospitals.com",
      phone: "+91 040 2360 7777",
      location: "Hyderabad",
      address: "Jubilee Hills, Hyderabad",
      doctors: 125,
      beds: 450,
      registered: "10 Aug 2026",
      status: "Active",
    },
    {
      id: 2,
      name: "Care Hospitals",
      email: "info@carehospitals.com",
      phone: "+91 040 6165 6565",
      location: "Hyderabad",
      address: "Banjara Hills, Hyderabad",
      doctors: 98,
      beds: 350,
      registered: "09 Aug 2026",
      status: "Active",
    },
    {
      id: 3,
      name: "KIMS Hospitals",
      email: "info@kimshospitals.com",
      phone: "+91 040 4488 5000",
      location: "Secunderabad",
      address: "Minister Road, Secunderabad",
      doctors: 110,
      beds: 400,
      registered: "08 Aug 2026",
      status: "Pending",
    },
    {
      id: 4,
      name: "Yashoda Hospitals",
      email: "info@yashodahospitals.com",
      phone: "+91 040 4567 4567",
      location: "Hyderabad",
      address: "Somajiguda, Hyderabad",
      doctors: 135,
      beds: 500,
      registered: "07 Aug 2026",
      status: "Active",
    },
    {
      id: 5,
      name: "Fortis Hospital",
      email: "info@fortishealthcare.com",
      phone: "+91 022 6799 4444",
      location: "Mumbai",
      address: "Mulund West, Mumbai",
      doctors: 90,
      beds: 300,
      registered: "06 Aug 2026",
      status: "Active",
    },
    {
      id: 6,
      name: "Manipal Hospital",
      email: "info@manipalhospitals.com",
      phone: "+91 080 2502 4444",
      location: "Bangalore",
      address: "Old Airport Road, Bangalore",
      doctors: 120,
      beds: 450,
      registered: "05 Aug 2026",
      status: "Inactive",
    },
    {
      id: 7,
      name: "Max Super Speciality Hospital",
      email: "info@maxhealthcare.com",
      phone: "+91 011 4055 4055",
      location: "Delhi",
      address: "Saket, New Delhi",
      doctors: 150,
      beds: 550,
      registered: "04 Aug 2026",
      status: "Active",
    },
    {
      id: 8,
      name: "Aster Medcity",
      email: "info@asterhospitals.com",
      phone: "+91 0484 6699 999",
      location: "Kochi",
      address: "South Chittoor, Kochi",
      doctors: 105,
      beds: 350,
      registered: "03 Aug 2026",
      status: "Pending",
    },
  ]);

  // =========================================================
  // STATES
  // =========================================================

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [cityFilter, setCityFilter] = useState("All");

  const [selectedHospital, setSelectedHospital] =
    useState(null);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [hospitalToDelete, setHospitalToDelete] =
    useState(null);

  // =========================================================
  // FILTER HOSPITALS
  // =========================================================

  const filteredHospitals = useMemo(() => {
    return hospitals.filter((hospital) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        hospital.name.toLowerCase().includes(searchText) ||
        hospital.email.toLowerCase().includes(searchText) ||
        hospital.location.toLowerCase().includes(searchText) ||
        hospital.address.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All" ||
        hospital.status === statusFilter;

      const matchesCity =
        cityFilter === "All" ||
        hospital.location === cityFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCity
      );
    });
  }, [
    hospitals,
    search,
    statusFilter,
    cityFilter,
  ]);

  // =========================================================
  // HOSPITAL COUNTS
  // =========================================================

  const totalHospitals = hospitals.length;

  const activeHospitals = hospitals.filter(
    (hospital) => hospital.status === "Active"
  ).length;

  const pendingHospitals = hospitals.filter(
    (hospital) => hospital.status === "Pending"
  ).length;

  const inactiveHospitals = hospitals.filter(
    (hospital) => hospital.status === "Inactive"
  ).length;

  // =========================================================
  // CITY LIST
  // =========================================================

  const cities = [
    ...new Set(
      hospitals.map((hospital) => hospital.location)
    ),
  ];

  // =========================================================
  // APPROVE HOSPITAL
  // =========================================================

  const approveHospital = (id) => {
    setHospitals((currentHospitals) =>
      currentHospitals.map((hospital) =>
        hospital.id === id
          ? {
              ...hospital,
              status: "Active",
            }
          : hospital
      )
    );
  };

  // =========================================================
  // BLOCK / ACTIVATE HOSPITAL
  // =========================================================

  const toggleHospitalStatus = (id) => {
    setHospitals((currentHospitals) =>
      currentHospitals.map((hospital) => {
        if (hospital.id !== id) {
          return hospital;
        }

        return {
          ...hospital,
          status:
            hospital.status === "Inactive"
              ? "Active"
              : "Inactive",
        };
      })
    );
  };

  // =========================================================
  // DELETE HOSPITAL
  // =========================================================

  const confirmDelete = () => {
    if (!hospitalToDelete) return;

    setHospitals((currentHospitals) =>
      currentHospitals.filter(
        (hospital) =>
          hospital.id !== hospitalToDelete.id
      )
    );

    setHospitalToDelete(null);
    setShowDeleteModal(false);
  };

  // =========================================================
  // AVATAR COLORS
  // =========================================================

  const getAvatarColor = (name) => {
    const colors = [
      "bg-blue-100 text-blue-600",
      "bg-teal-100 text-teal-600",
      "bg-purple-100 text-purple-600",
      "bg-cyan-100 text-cyan-600",
      "bg-indigo-100 text-indigo-600",
      "bg-green-100 text-green-600",
    ];

    return colors[name.length % colors.length];
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

        <div className="flex items-center gap-3">

          <div className="p-3 bg-teal-100 rounded-xl">
            <Building2
              size={28}
              className="text-teal-600"
            />
          </div>

          <div>

            <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
              Hospitals
            </h1>

            <p className="text-slate-500 mt-1">
              Manage hospitals registered on MEDIFIND
            </p>

          </div>

        </div>

        <button
          onClick={() =>
            alert(
              "Add hospital functionality will be connected to the backend."
            )
          }
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium transition"
        >
          <Plus size={19} />
          Add Hospital
        </button>

      </div>

      {/* =====================================================
          STAT CARDS
      ===================================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

        <StatCard
          title="Total Hospitals"
          value={totalHospitals}
          icon={Building2}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
        />

        <StatCard
          title="Active"
          value={activeHospitals}
          icon={CheckCircle}
          iconBg="bg-green-100"
          iconColor="text-green-600"
        />

        <StatCard
          title="Pending"
          value={pendingHospitals}
          icon={Calendar}
          iconBg="bg-orange-100"
          iconColor="text-orange-600"
        />

        <StatCard
          title="Inactive"
          value={inactiveHospitals}
          icon={Ban}
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
              placeholder="Search hospital, city or email..."
              className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* City Filter */}

          <div className="relative">

            <MapPin
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select
              value={cityFilter}
              onChange={(e) =>
                setCityFilter(e.target.value)
              }
              className="appearance-none w-full xl:w-48 pl-11 pr-8 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >

              <option value="All">
                All Cities
              </option>

              {cities.map((city) => (
                <option
                  key={city}
                  value={city}
                >
                  {city}
                </option>
              ))}

            </select>

          </div>

          {/* Status Filter */}

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
                All Hospitals
              </option>

              <option value="Active">
                Active
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="Inactive">
                Inactive
              </option>

            </select>

          </div>

        </div>

      </div>

      {/* =====================================================
          HOSPITAL TABLE
      ===================================================== */}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

        <div className="p-6 border-b border-slate-100">

          <h2 className="text-lg font-semibold text-slate-800">
            Registered Hospitals
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            {filteredHospitals.length} hospitals found
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
                  Hospital
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Contact
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Location
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Doctors
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Beds
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

              {filteredHospitals.map((hospital) => (

                <tr
                  key={hospital.id}
                  className="hover:bg-slate-50 transition"
                >

                  {/* Hospital */}

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-3">

                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold ${getAvatarColor(
                          hospital.name
                        )}`}
                      >
                        <Building2 size={21} />
                      </div>

                      <div>

                        <p className="font-semibold text-slate-700">
                          {hospital.name}
                        </p>

                        <p className="text-sm text-slate-400">
                          Hospital #{hospital.id}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* Contact */}

                  <td className="px-6 py-5">

                    <p className="text-sm text-slate-700">
                      {hospital.email}
                    </p>

                    <p className="text-sm text-slate-400 mt-1">
                      {hospital.phone}
                    </p>

                  </td>

                  {/* Location */}

                  <td className="px-6 py-5">

                    <div className="flex items-start gap-2">

                      <MapPin
                        size={16}
                        className="text-teal-500 mt-0.5"
                      />

                      <div>

                        <p className="text-sm font-medium text-slate-700">
                          {hospital.location}
                        </p>

                        <p className="text-xs text-slate-400 mt-1">
                          {hospital.address}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* Doctors */}

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-2">

                      <Users
                        size={16}
                        className="text-blue-500"
                      />

                      <span className="text-sm text-slate-700">
                        {hospital.doctors}
                      </span>

                    </div>

                  </td>

                  {/* Beds */}

                  <td className="px-6 py-5">

                    <span className="text-sm text-slate-700">
                      {hospital.beds}
                    </span>

                  </td>

                  {/* Status */}

                  <td className="px-6 py-5">

                    <StatusBadge
                      status={hospital.status}
                    />

                  </td>

                  {/* Actions */}

                  <td className="px-6 py-5">

                    <div className="flex items-center justify-end gap-2">

                      {/* View */}

                      <button
                        onClick={() =>
                          setSelectedHospital(
                            hospital
                          )
                        }
                        title="View Hospital"
                        className="p-2.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition"
                      >
                        <Eye size={17} />
                      </button>

                      {/* Approve */}

                      {hospital.status ===
                        "Pending" && (

                        <button
                          onClick={() =>
                            approveHospital(
                              hospital.id
                            )
                          }
                          title="Approve Hospital"
                          className="p-2.5 text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition"
                        >
                          <CheckCircle size={17} />
                        </button>

                      )}

                      {/* Activate / Deactivate */}

                      {hospital.status !==
                        "Pending" && (

                        <button
                          onClick={() =>
                            toggleHospitalStatus(
                              hospital.id
                            )
                          }
                          title={
                            hospital.status ===
                            "Inactive"
                              ? "Activate Hospital"
                              : "Deactivate Hospital"
                          }
                          className={`p-2.5 rounded-lg transition ${
                            hospital.status ===
                            "Inactive"
                              ? "text-green-600 bg-green-50 hover:bg-green-100"
                              : "text-orange-600 bg-orange-50 hover:bg-orange-100"
                          }`}
                        >

                          {hospital.status ===
                          "Inactive" ? (
                            <CheckCircle
                              size={17}
                            />
                          ) : (
                            <Ban size={17} />
                          )}

                        </button>

                      )}

                      {/* Delete */}

                      <button
                        onClick={() => {
                          setHospitalToDelete(
                            hospital
                          );
                          setShowDeleteModal(
                            true
                          );
                        }}
                        title="Delete Hospital"
                        className="p-2.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition"
                      >
                        <Trash2 size={17} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* ===================================================
            MOBILE / TABLET CARDS
        =================================================== */}

        <div className="xl:hidden divide-y divide-slate-100">

          {filteredHospitals.map((hospital) => (

            <div
              key={hospital.id}
              className="p-5"
            >

              <div className="flex items-start justify-between gap-4">

                <div className="flex items-center gap-3">

                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${getAvatarColor(
                      hospital.name
                    )}`}
                  >
                    <Building2 size={22} />
                  </div>

                  <div>

                    <h3 className="font-semibold text-slate-700">
                      {hospital.name}
                    </h3>

                    <p className="text-sm text-slate-400">
                      {hospital.location}
                    </p>

                  </div>

                </div>

                <StatusBadge
                  status={hospital.status}
                />

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">

                <InfoItem
                  icon={Mail}
                  label="Email"
                  value={hospital.email}
                />

                <InfoItem
                  icon={Phone}
                  label="Phone"
                  value={hospital.phone}
                />

                <InfoItem
                  icon={MapPin}
                  label="Address"
                  value={hospital.address}
                />

                <InfoItem
                  icon={Users}
                  label="Doctors"
                  value={hospital.doctors}
                />

                <InfoItem
                  icon={Building2}
                  label="Beds"
                  value={hospital.beds}
                />

                <InfoItem
                  icon={Calendar}
                  label="Registered"
                  value={hospital.registered}
                />

              </div>

              <div className="flex gap-2 mt-5">

                <button
                  onClick={() =>
                    setSelectedHospital(
                      hospital
                    )
                  }
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg text-sm font-medium"
                >
                  <Eye size={16} />
                  View
                </button>

                {hospital.status ===
                "Pending" ? (

                  <button
                    onClick={() =>
                      approveHospital(
                        hospital.id
                      )
                    }
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 text-green-600 bg-green-50 hover:bg-green-100 rounded-lg text-sm font-medium"
                  >
                    <CheckCircle size={16} />
                    Approve
                  </button>

                ) : (

                  <button
                    onClick={() =>
                      toggleHospitalStatus(
                        hospital.id
                      )
                    }
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 text-orange-600 bg-orange-50 hover:bg-orange-100 rounded-lg text-sm font-medium"
                  >

                    {hospital.status ===
                    "Inactive" ? (
                      <>
                        <CheckCircle
                          size={16}
                        />
                        Activate
                      </>
                    ) : (
                      <>
                        <Ban size={16} />
                        Deactivate
                      </>
                    )}

                  </button>

                )}

                <button
                  onClick={() => {
                    setHospitalToDelete(
                      hospital
                    );
                    setShowDeleteModal(
                      true
                    );
                  }}
                  className="px-3 py-2.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg"
                >
                  <Trash2 size={16} />
                </button>

              </div>

            </div>

          ))}

        </div>

        {/* No Results */}

        {filteredHospitals.length === 0 && (

          <div className="p-12 text-center">

            <Building2
              size={45}
              className="mx-auto text-slate-300"
            />

            <h3 className="text-lg font-semibold text-slate-700 mt-4">
              No hospitals found
            </h3>

            <p className="text-sm text-slate-400 mt-1">
              Try changing your search or filters.
            </p>

          </div>

        )}

      </div>

      {/* =====================================================
          VIEW HOSPITAL MODAL
      ===================================================== */}

      {selectedHospital && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden">

            {/* Modal Header */}

            <div className="flex items-center justify-between p-6 border-b border-slate-100">

              <div>

                <h2 className="text-xl font-bold text-slate-800">
                  Hospital Details
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Complete hospital information
                </p>

              </div>

              <button
                onClick={() =>
                  setSelectedHospital(null)
                }
                className="p-2 hover:bg-slate-100 rounded-lg"
              >
                <X size={20} />
              </button>

            </div>

            {/* Modal Body */}

            <div className="p-6">

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-7">

                <div
                  className={`w-20 h-20 rounded-2xl flex items-center justify-center ${getAvatarColor(
                    selectedHospital.name
                  )}`}
                >
                  <Building2 size={34} />
                </div>

                <div className="text-center sm:text-left">

                  <h3 className="text-xl font-bold text-slate-800">
                    {selectedHospital.name}
                  </h3>

                  <div className="flex items-center justify-center sm:justify-start gap-2 mt-2 text-slate-500">

                    <MapPin size={16} />

                    <span className="text-sm">
                      {selectedHospital.location}
                    </span>

                  </div>

                  <div className="mt-2">

                    <StatusBadge
                      status={
                        selectedHospital.status
                      }
                    />

                  </div>

                </div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <DetailItem
                  icon={Mail}
                  label="Email"
                  value={
                    selectedHospital.email
                  }
                />

                <DetailItem
                  icon={Phone}
                  label="Phone"
                  value={
                    selectedHospital.phone
                  }
                />

                <DetailItem
                  icon={MapPin}
                  label="Address"
                  value={
                    selectedHospital.address
                  }
                />

                <DetailItem
                  icon={Users}
                  label="Doctors"
                  value={
                    selectedHospital.doctors
                  }
                />

                <DetailItem
                  icon={Building2}
                  label="Total Beds"
                  value={
                    selectedHospital.beds
                  }
                />

                <DetailItem
                  icon={Calendar}
                  label="Registered"
                  value={
                    selectedHospital.registered
                  }
                />

              </div>

            </div>

            {/* Modal Footer */}

            <div className="p-6 border-t border-slate-100 flex flex-wrap justify-end gap-3">

              {selectedHospital.status ===
                "Pending" && (

                <button
                  onClick={() => {
                    approveHospital(
                      selectedHospital.id
                    );

                    setSelectedHospital(
                      null
                    );
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium"
                >
                  <CheckCircle size={17} />
                  Approve Hospital
                </button>

              )}

              <button
                onClick={() =>
                  setSelectedHospital(null)
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
        hospitalToDelete && (

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
                    Delete Hospital?
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    This action cannot be undone.
                  </p>

                </div>

              </div>

              <div className="mt-5 p-4 bg-slate-50 rounded-xl">

                <p className="font-semibold text-slate-700">
                  {hospitalToDelete.name}
                </p>

                <p className="text-sm text-slate-500 mt-1">
                  {hospitalToDelete.location}
                </p>

              </div>

              <div className="flex justify-end gap-3 mt-6">

                <button
                  onClick={() => {
                    setShowDeleteModal(
                      false
                    );
                    setHospitalToDelete(
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
                  Delete Hospital
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
    Active: "bg-green-100 text-green-700",
    Pending: "bg-orange-100 text-orange-700",
    Inactive: "bg-red-100 text-red-700",
  };

  const dots = {
    Active: "bg-green-500",
    Pending: "bg-orange-500",
    Inactive: "bg-red-500",
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

export default Hospitals;
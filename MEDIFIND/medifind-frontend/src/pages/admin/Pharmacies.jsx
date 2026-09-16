import React, { useState } from "react";
import {
  Pill,
  Search,
  Eye,
  CheckCircle,
  XCircle,
  Trash2,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

const Pharmacies = () => {
  const [pharmacies, setPharmacies] = useState([
    {
      id: 1,
      name: "MedPlus Pharmacy",
      location: "Hyderabad",
      phone: "+91 9876543210",
      email: "medplus@example.com",
      status: "Active",
      verification: "Approved",
    },
    {
      id: 2,
      name: "Apollo Pharmacy",
      location: "Bangalore",
      phone: "+91 9876543211",
      email: "apollo@example.com",
      status: "Active",
      verification: "Approved",
    },
    {
      id: 3,
      name: "HealthCare Pharmacy",
      location: "Chennai",
      phone: "+91 9876543212",
      email: "healthcare@example.com",
      status: "Pending",
      verification: "Pending",
    },
  ]);

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const filteredPharmacies = pharmacies.filter(
    (item) =>
      `${item.name} ${item.location}`
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const approvePharmacy = (id) => {
    setPharmacies((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              verification: "Approved",
              status: "Active",
            }
          : item
      )
    );
  };

  const rejectPharmacy = (id) => {
    setPharmacies((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              verification: "Rejected",
              status: "Inactive",
            }
          : item
      )
    );
  };

  const deletePharmacy = (id) => {
    if (!window.confirm("Delete this pharmacy?")) {
      return;
    }

    setPharmacies((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8">

      {/* HEADER */}

      <div className="mb-8">

        <div className="flex items-center gap-3">

          <div className="p-3 bg-purple-100 rounded-xl">
            <Pill
              size={28}
              className="text-purple-600"
            />
          </div>

          <div>

            <h1 className="text-3xl font-bold text-slate-800">
              Pharmacies
            </h1>

            <p className="text-slate-500 mt-1">
              Manage pharmacies registered with MEDIFIND
            </p>

          </div>

        </div>

      </div>

      {/* STAT CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

        <div className="bg-white rounded-2xl p-5 border shadow-sm">
          <p className="text-sm text-slate-500">
            Total Pharmacies
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {pharmacies.length}
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-5 border shadow-sm">
          <p className="text-sm text-slate-500">
            Active
          </p>

          <h2 className="text-3xl font-bold text-green-600 mt-2">
            {
              pharmacies.filter(
                (item) =>
                  item.status === "Active"
              ).length
            }
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-5 border shadow-sm">
          <p className="text-sm text-slate-500">
            Pending Approval
          </p>

          <h2 className="text-3xl font-bold text-orange-500 mt-2">
            {
              pharmacies.filter(
                (item) =>
                  item.verification === "Pending"
              ).length
            }
          </h2>
        </div>

      </div>

      {/* SEARCH */}

      <div className="bg-white rounded-2xl p-5 border shadow-sm mb-6">

        <div className="relative max-w-md">

          <Search
            size={19}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search pharmacies..."
            className="w-full pl-10 pr-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

      </div>

      {/* TABLE */}

      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">

        <div className="p-5 border-b">

          <h2 className="font-bold text-slate-800">
            Registered Pharmacies
          </h2>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-50">

              <tr>

                <th className="text-left px-6 py-4 text-xs uppercase text-slate-500">
                  Pharmacy
                </th>

                <th className="text-left px-6 py-4 text-xs uppercase text-slate-500">
                  Location
                </th>

                <th className="text-left px-6 py-4 text-xs uppercase text-slate-500">
                  Status
                </th>

                <th className="text-left px-6 py-4 text-xs uppercase text-slate-500">
                  Verification
                </th>

                <th className="text-right px-6 py-4 text-xs uppercase text-slate-500">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody className="divide-y">

              {filteredPharmacies.map(
                (item) => (

                  <tr
                    key={item.id}
                    className="hover:bg-slate-50"
                  >

                    <td className="px-6 py-5">

                      <p className="font-semibold text-slate-700">
                        {item.name}
                      </p>

                      <p className="text-xs text-slate-400">
                        {item.email}
                      </p>

                    </td>

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-2">
                        <MapPin size={15} />
                        {item.location}
                      </div>

                    </td>

                    <td className="px-6 py-5">

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          item.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.status}
                      </span>

                    </td>

                    <td className="px-6 py-5">

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          item.verification ===
                          "Approved"
                            ? "bg-green-100 text-green-700"
                            : item.verification ===
                              "Pending"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.verification}
                      </span>

                    </td>

                    <td className="px-6 py-5">

                      <div className="flex justify-end gap-2">

                        <button
                          onClick={() =>
                            setSelected(item)
                          }
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                          title="View"
                        >
                          <Eye size={18} />
                        </button>

                        {item.verification ===
                          "Pending" && (
                          <>
                            <button
                              onClick={() =>
                                approvePharmacy(
                                  item.id
                                )
                              }
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                              title="Approve"
                            >
                              <CheckCircle size={18} />
                            </button>

                            <button
                              onClick={() =>
                                rejectPharmacy(
                                  item.id
                                )
                              }
                              className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg"
                              title="Reject"
                            >
                              <XCircle size={18} />
                            </button>
                          </>
                        )}

                        <button
                          onClick={() =>
                            deletePharmacy(
                              item.id
                            )
                          }
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
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

        </div>

      </div>

      {/* DETAILS MODAL */}

      {selected && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-5">

          <div className="bg-white rounded-2xl w-full max-w-md">

            <div className="p-6 border-b flex items-center justify-between">

              <h2 className="text-xl font-bold">
                Pharmacy Details
              </h2>

              <button
                onClick={() =>
                  setSelected(null)
                }
              >
                <XCircle />
              </button>

            </div>

            <div className="p-6 space-y-4">

              <h3 className="text-lg font-bold">
                {selected.name}
              </h3>

              <p className="flex gap-2 text-slate-600">
                <MapPin size={18} />
                {selected.location}
              </p>

              <p className="flex gap-2 text-slate-600">
                <Phone size={18} />
                {selected.phone}
              </p>

              <p className="flex gap-2 text-slate-600">
                <Mail size={18} />
                {selected.email}
              </p>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default Pharmacies;
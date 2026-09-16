import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import {
  Activity,
  Search,
  Eye,
  CheckCircle,
  XCircle,
  Trash2,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

const Diagnostics = () => {
  const [diagnostics, setDiagnostics] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const [actionLoading, setActionLoading] = useState(null);

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const filteredDiagnostics = diagnostics.filter((item) =>
  `${item.center_name} ${item.city}`
    .toLowerCase()
    .includes(search.toLowerCase())
);

const pendingCount = diagnostics.filter(
  (item) => item.verification_status === "pending"
).length;

const approvedCount = diagnostics.filter(
  (item) => item.verification_status === "verified"
).length;

const rejectedCount = diagnostics.filter(
  (item) => item.verification_status === "rejected"
).length;

  const fetchDiagnostics = async () => {
  try {
    setLoading(true);
    setError("");

    const token = localStorage.getItem("access_token");

    if (!token) {
      setError("Admin authentication token not found. Please login again.");
      return;
    }

    const response = await axiosInstance.get(
  "/diagnostics/admin/list/?status=all"
);

    console.log("ADMIN DIAGNOSTICS:", response.data);

    setDiagnostics(response.data);

  } catch (err) {
    console.error("FETCH DIAGNOSTICS ERROR:", err);
    console.error("BACKEND RESPONSE:", err.response?.data);

    if (err.response?.status === 401) {
      setError("Your admin session has expired. Please login again.");
    } else if (err.response?.status === 403) {
      setError("You do not have permission to access the admin diagnostics list.");
    } else {
      setError(
        err.response?.data?.detail ||
        "Failed to load diagnostic centers."
      );
    }

  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchDiagnostics();
}, []);

  const approveDiagnostic = async (id) => {
  try {
    setActionLoading(id);
    setError("");

    const token = localStorage.getItem("access_token");

    if (!token) {
      setError("Admin authentication token not found. Please login again.");
      return;
    }

    await axiosInstance.patch(
  `/diagnostics/${id}/verify/`,
  {
    verification_status: "verified",
  }
);

    // Immediately update UI
    setDiagnostics((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              verification_status: "verified",
              rejection_reason: null,
            }
          : item
      )
    );

    // Also update selected modal if open
    setSelected((prev) =>
      prev?.id === id
        ? {
            ...prev,
            verification_status: "verified",
            rejection_reason: null,
          }
        : prev
    );

  } catch (err) {
    console.error("APPROVE DIAGNOSTIC ERROR:", err);
    console.error("BACKEND RESPONSE:", err.response?.data);

    setError(
      err.response?.data?.detail ||
      err.response?.data?.error ||
      "Failed to approve diagnostic center."
    );

  } finally {
    setActionLoading(null);
  }
};

  const rejectDiagnostic = async (id) => {
  const reason = window.prompt(
    "Please enter the reason for rejecting this diagnostic center:"
  );

  if (!reason || !reason.trim()) {
    return;
  }

  try {
    setActionLoading(id);
    setError("");

    const token = localStorage.getItem("access_token");

    if (!token) {
      setError("Admin authentication token not found. Please login again.");
      return;
    }

    const trimmedReason = reason.trim();

    await axiosInstance.patch(
  `/diagnostics/${id}/verify/`,
  {
    verification_status: "rejected",
    rejection_reason: reason.trim(),
  }
);

    // Immediately update UI
    setDiagnostics((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              verification_status: "rejected",
              rejection_reason: trimmedReason,
            }
          : item
      )
    );

    // Update modal too
    setSelected((prev) =>
      prev?.id === id
        ? {
            ...prev,
            verification_status: "rejected",
            rejection_reason: trimmedReason,
          }
        : prev
    );

  } catch (err) {
    console.error("REJECT DIAGNOSTIC ERROR:", err);
    console.error("BACKEND RESPONSE:", err.response?.data);

    setError(
      err.response?.data?.detail ||
      err.response?.data?.error ||
      "Failed to reject diagnostic center."
    );

  } finally {
    setActionLoading(null);
  }
};

  const deleteDiagnostic = async (id) => {
  if (!window.confirm("Delete this diagnostic center permanently?")) {
    return;
  }

  try {
    setActionLoading(id);
    setError("");

    const token = localStorage.getItem("access_token");

    if (!token) {
      setError("Admin authentication token not found. Please login again.");
      return;
    }

    await axiosInstance.delete(
  `/diagnostics/${id}/delete/`
);

    console.log(`Diagnostic center ${id} deleted successfully.`);

    // Remove the deleted center from the table
    setDiagnostics((prev) =>
      prev.filter((item) => item.id !== id)
    );

    // Close modal if the deleted center was being viewed
    if (selected?.id === id) {
      setSelected(null);
    }

  } catch (err) {
    console.error("DELETE DIAGNOSTIC ERROR:", err);
    console.error("BACKEND RESPONSE:", err.response?.data);

    if (err.response?.status === 401) {
      setError("Your admin session has expired. Please login again.");
    } else if (err.response?.status === 403) {
      setError("You do not have permission to delete diagnostic centers.");
    } else if (err.response?.status === 404) {
      setError("Diagnostic center was not found.");
    } else {
      setError(
        err.response?.data?.detail ||
        err.response?.data?.error ||
        "Failed to delete diagnostic center."
      );
    }

  } finally {
    setActionLoading(null);
  }
};

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8">

      {/* HEADER */}

      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-teal-100 rounded-xl">
            <Activity
              size={28}
              className="text-teal-600"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Diagnostics
            </h1>

            <p className="text-slate-500 mt-1">
              Manage diagnostic centers and laboratory services
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

  <div className="bg-white rounded-2xl p-5 shadow-sm border">
    <p className="text-sm text-slate-500">
      Pending Diagnostics
    </p>

    <h2 className="text-3xl font-bold text-orange-500 mt-2">
      {pendingCount}
    </h2>
  </div>

  <div className="bg-white rounded-2xl p-5 shadow-sm border">
  <p className="text-sm text-slate-500">
    Approved Diagnostics
  </p>

  <h2 className="text-3xl font-bold text-blue-600 mt-2">
    {approvedCount}
  </h2>
</div>

  <div className="bg-white rounded-2xl p-5 shadow-sm border">
    <p className="text-sm text-slate-500">
      Rejected Diagnostics
    </p>

    <h2 className="text-xl font-bold text-slate-700 mt-3">
{rejectedCount}
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
            placeholder="Search diagnostics..."
            className="w-full pl-10 pr-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

      </div>

      {error && (
  <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
    {error}
  </div>
)}

{loading ? (
  <div className="bg-white rounded-2xl border shadow-sm p-10 text-center">
    <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />

    <p className="mt-4 text-sm text-slate-500">
      Loading diagnostic centers...
    </p>
  </div>
) : (
  <div>
    {/* TABLE */}

    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">

      <div className="p-5 border-b">
        <h2 className="font-bold text-slate-800">
          Diagnostic Centers
        </h2>
      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-50">
            <tr>

              <th className="text-left px-6 py-4 text-xs uppercase text-slate-500">
                Center
              </th>

              <th className="text-left px-6 py-4 text-xs uppercase text-slate-500">
                Location
              </th>

              <th className="text-left px-6 py-4 text-xs uppercase text-slate-500">
                Tests
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

            {filteredDiagnostics.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-slate-50"
              >

                {/* CENTER */}

                <td className="px-6 py-5">
                  <div className="font-semibold text-slate-700">
                    {item.center_name}
                  </div>

                  <div className="text-xs text-slate-400">
                    {item.email}
                  </div>
                </td>


                {/* LOCATION */}

                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <MapPin size={15} />
                    {item.city}
                  </div>
                </td>


                {/* TESTS */}

                <td className="px-6 py-5">
  <span className="font-semibold text-slate-700">
    {item.test_count ?? 0}
  </span>
</td>


                {/* STATUS */}

                <td className="px-6 py-5">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.verification_status === "verified"
                        ? "bg-green-100 text-green-700"
                        : item.verification_status === "pending"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.verification_status === "verified"
                      ? "Active"
                      : item.verification_status === "pending"
                      ? "Pending"
                      : "Inactive"}
                  </span>
                </td>


                {/* VERIFICATION */}

                <td className="px-6 py-5">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.verification_status === "verified"
                        ? "bg-green-100 text-green-700"
                        : item.verification_status === "pending"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.verification_status === "verified"
                      ? "Approved"
                      : item.verification_status === "pending"
                      ? "Pending"
                      : "Rejected"}
                  </span>
                </td>


                {/* ACTIONS */}

                <td className="px-6 py-5">
                  <div className="flex justify-end gap-2">

                    {/* VIEW */}

                    <button
                      onClick={() => setSelected(item)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      title="View"
                    >
                      <Eye size={18} />
                    </button>


                    {/* APPROVE / REJECT */}

                    {item.verification_status === "pending" && (
                      <>
                        <button
                          onClick={() =>
                            approveDiagnostic(item.id)
                          }
                          disabled={actionLoading === item.id}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg disabled:opacity-50"
                          title="Approve"
                        >
                          <CheckCircle size={18} />
                        </button>

                        <button
                          onClick={() =>
                            rejectDiagnostic(item.id)
                          }
                          disabled={actionLoading === item.id}
                          className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg disabled:opacity-50"
                          title="Reject"
                        >
                          <XCircle size={18} />
                        </button>
                      </>
                    )}


                    {/* DELETE */}

                    <button
  onClick={() => deleteDiagnostic(item.id)}
  disabled={actionLoading === item.id}
  className="p-2 text-red-600 hover:bg-red-50 rounded-lg disabled:opacity-50"
  title="Delete"
>
  <Trash2 size={18} />
</button>

                  </div>
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  </div>
)}
      {/* MODAL */}

      {selected && (
  <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-5">

    <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">

      {/* HEADER */}

      <div className="p-6 border-b flex items-center justify-between sticky top-0 bg-white z-10">

        <div>
          <h2 className="text-xl font-bold text-slate-800">
            Diagnostic Center Review
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Review profile information and verification documents
          </p>
        </div>

        <button
          onClick={() => setSelected(null)}
          className="text-slate-400 hover:text-slate-700"
        >
          <XCircle size={24} />
        </button>

      </div>


      <div className="p-6 space-y-6">

        {/* =================================================
            PROFILE INFORMATION
        ================================================= */}

        <div>

          <h3 className="text-base font-semibold text-slate-800 mb-4">
            Basic Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <p className="text-xs text-slate-400">
                Center Name
              </p>

              <p className="font-medium text-slate-700">
                {selected.center_name || "Not provided"}
              </p>
            </div>


            <div>
              <p className="text-xs text-slate-400">
                Diagnostician Name
              </p>

              <p className="font-medium text-slate-700">
                {selected.diagnostician_name || "Not provided"}
              </p>
            </div>


            <div>
              <p className="text-xs text-slate-400">
                Email
              </p>

              <p className="font-medium text-slate-700">
                {selected.email || "Not provided"}
              </p>
            </div>


            <div>
              <p className="text-xs text-slate-400">
                Phone Number
              </p>

              <p className="font-medium text-slate-700">
                {selected.phone_number || "Not provided"}
              </p>
            </div>


            <div>
              <p className="text-xs text-slate-400">
                License Number
              </p>

              <p className="font-medium text-slate-700">
                {selected.license_number || "Not provided"}
              </p>
            </div>


            <div>
              <p className="text-xs text-slate-400">
                Registration Number
              </p>

              <p className="font-medium text-slate-700">
                {selected.registration_number || "Not provided"}
              </p>
            </div>


            <div>
              <p className="text-xs text-slate-400">
                Certification
              </p>

              <p className="font-medium uppercase text-slate-700">
                {selected.certification_type || "Not provided"}
              </p>
            </div>


            <div>
              <p className="text-xs text-slate-400">
                Verification Status
              </p>

              <span
                className={`inline-flex mt-1 px-3 py-1 rounded-full text-xs font-semibold ${
                  selected.verification_status === "verified"
                    ? "bg-green-100 text-green-700"
                    : selected.verification_status === "pending"
                    ? "bg-orange-100 text-orange-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {selected.verification_status === "verified"
                  ? "Approved"
                  : selected.verification_status === "pending"
                  ? "Pending"
                  : "Rejected"}
              </span>
            </div>

          </div>


          {/* ADDRESS */}

          <div className="mt-4">

            <p className="text-xs text-slate-400">
              Address
            </p>

            <p className="font-medium text-slate-700">
              {selected.address || "Not provided"}
              {selected.city && `, ${selected.city}`}
              {selected.state && `, ${selected.state}`}
              {selected.pincode && ` - ${selected.pincode}`}
            </p>

          </div>

        </div>


        {/* =================================================
            DOCUMENTS
        ================================================= */}

        <div>

          <h3 className="text-base font-semibold text-slate-800 mb-4">
            Verification Documents
          </h3>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


            {/* GOVERNMENT ID */}

            <div className="border rounded-xl p-4">

              <p className="font-semibold text-slate-700">
                Government ID
              </p>

              {selected.government_id ? (

                <a
                  href={`http://127.0.0.1:8000${selected.government_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-3 text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  <Eye size={16} />
                  View Document
                </a>

              ) : (

                <p className="mt-3 text-sm text-red-500">
                  Not uploaded
                </p>

              )}

            </div>


            {/* REGISTRATION DOCUMENT */}

            <div className="border rounded-xl p-4">

              <p className="font-semibold text-slate-700">
                Registration / License
              </p>

              {selected.registration_document ? (

                <a
                  href={`http://127.0.0.1:8000${selected.registration_document}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-3 text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  <Eye size={16} />
                  View Document
                </a>

              ) : (

                <p className="mt-3 text-sm text-red-500">
                  Not uploaded
                </p>

              )}

            </div>


            {/* CERTIFICATION */}

            <div className="border rounded-xl p-4">

              <p className="font-semibold text-slate-700">
                NABL / ISO Certification
              </p>

              {selected.certification_document ? (

                <a
                  href={`http://127.0.0.1:8000${selected.certification_document}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-3 text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  <Eye size={16} />
                  View Document
                </a>

              ) : (

                <p className="mt-3 text-sm text-red-500">
                  Not uploaded
                </p>

              )}

            </div>


            {/* PROFILE PHOTO */}

            <div className="border rounded-xl p-4">

              <p className="font-semibold text-slate-700">
                Profile Photo
              </p>

              {selected.profile_photo ? (

                <div className="mt-3">

                  <img
                    src={`http://127.0.0.1:8000${selected.profile_photo}`}
                    alt="Diagnostic center profile"
                    className="h-32 w-32 rounded-xl object-cover border"
                  />

                  <a
                    href={`http://127.0.0.1:8000${selected.profile_photo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-3 text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    <Eye size={16} />
                    Open Full Image
                  </a>

                </div>

              ) : (

                <p className="mt-3 text-sm text-red-500">
                  Not uploaded
                </p>

              )}

            </div>

          </div>

        </div>


        {/* =================================================
            REJECTION REASON
        ================================================= */}

        {selected.verification_status === "rejected" &&
          selected.rejection_reason && (

            <div className="rounded-xl border border-red-200 bg-red-50 p-4">

              <p className="text-xs font-semibold uppercase tracking-wide text-red-600">
                Rejection Reason
              </p>

              <p className="mt-2 text-sm text-red-700">
                {selected.rejection_reason}
              </p>

            </div>

          )}


        {/* =================================================
            ACTIONS
        ================================================= */}

        {selected.verification_status === "pending" && (

          <div className="border-t pt-5 flex flex-col sm:flex-row justify-end gap-3">

            <button
              onClick={() => {
                rejectDiagnostic(selected.id);
                setSelected(null);
              }}
              disabled={actionLoading === selected.id}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-red-200 text-red-600 font-medium hover:bg-red-50 disabled:opacity-50"
            >
              <XCircle size={17} />
              Reject
            </button>


            <button
              onClick={() => {
                approveDiagnostic(selected.id);
                setSelected(null);
              }}
              disabled={actionLoading === selected.id}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 disabled:opacity-50"
            >
              <CheckCircle size={17} />
              Approve
            </button>

          </div>

        )}

      </div>

    </div>

  </div>
)}
    </div>
  );
};

export default Diagnostics;
import {
  Search,
  Plus,
  FileText,
  User,
  Calendar,
  Pill,
  Eye,
} from "lucide-react";
import { useState } from "react";

const prescriptionsData = [
  {
    id: 1,
    patient: "Rahul Kumar",
    patientId: "P001",
    date: "August 09, 2026",
    diagnosis: "Diabetes",
    medicines: [
      {
        name: "Metformin",
        dosage: "500 mg",
        frequency: "Twice daily",
        duration: "30 days",
      },
      {
        name: "Glimepiride",
        dosage: "2 mg",
        frequency: "Once daily",
        duration: "30 days",
      },
    ],
    status: "Active",
  },
  {
    id: 2,
    patient: "Ananya Sharma",
    patientId: "P002",
    date: "August 08, 2026",
    diagnosis: "Hypertension",
    medicines: [
      {
        name: "Amlodipine",
        dosage: "5 mg",
        frequency: "Once daily",
        duration: "30 days",
      },
    ],
    status: "Active",
  },
  {
    id: 3,
    patient: "Arjun Reddy",
    patientId: "P003",
    date: "August 06, 2026",
    diagnosis: "Heart Disease",
    medicines: [
      {
        name: "Aspirin",
        dosage: "75 mg",
        frequency: "Once daily",
        duration: "15 days",
      },
      {
        name: "Atorvastatin",
        dosage: "20 mg",
        frequency: "Once daily",
        duration: "30 days",
      },
    ],
    status: "Active",
  },
  {
    id: 4,
    patient: "Sneha Patel",
    patientId: "P004",
    date: "July 30, 2026",
    diagnosis: "Migraine",
    medicines: [
      {
        name: "Sumatriptan",
        dosage: "50 mg",
        frequency: "As needed",
        duration: "15 days",
      },
    ],
    status: "Completed",
  },
];

export default function Prescriptions() {
  const [search, setSearch] = useState("");

  const filteredPrescriptions = prescriptionsData.filter((prescription) => {
    const searchText = search.toLowerCase();

    return (
      prescription.patient.toLowerCase().includes(searchText) ||
      prescription.patientId.toLowerCase().includes(searchText) ||
      prescription.diagnosis.toLowerCase().includes(searchText)
    );
  });

  const activeCount = prescriptionsData.filter(
    (prescription) => prescription.status === "Active"
  ).length;

  const completedCount = prescriptionsData.filter(
    (prescription) => prescription.status === "Completed"
  ).length;

  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Prescriptions
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Create and manage prescriptions for your patients.
          </p>
        </div>

        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          <Plus size={18} />
          New Prescription
        </button>

      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

        {/* Total */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">

            <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
              <FileText size={24} />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Total Prescriptions
              </p>

              <h2 className="text-2xl font-bold text-slate-800">
                {prescriptionsData.length}
              </h2>
            </div>

          </div>
        </div>

        {/* Active */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">

            <div className="rounded-lg bg-green-100 p-3 text-green-600">
              <Pill size={24} />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Active
              </p>

              <h2 className="text-2xl font-bold text-slate-800">
                {activeCount}
              </h2>
            </div>

          </div>
        </div>

        {/* Completed */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">

            <div className="rounded-lg bg-slate-100 p-3 text-slate-600">
              <FileText size={24} />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Completed
              </p>

              <h2 className="text-2xl font-bold text-slate-800">
                {completedCount}
              </h2>
            </div>

          </div>
        </div>

      </div>

      {/* Search */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

        <div className="relative">

          <Search
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by patient name, patient ID or diagnosis..."
            className="w-full rounded-lg border border-slate-300 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

        </div>

      </div>

      {/* Prescription List */}
      <div className="space-y-4">

        {filteredPrescriptions.map((prescription) => (

          <div
            key={prescription.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
          >

            {/* Top Section */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              {/* Patient */}
              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <User size={22} />
                </div>

                <div>
                  <h2 className="font-semibold text-slate-800">
                    {prescription.patient}
                  </h2>

                  <p className="text-sm text-slate-500">
                    Patient ID: {prescription.patientId}
                  </p>
                </div>

              </div>

              {/* Date */}
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Calendar size={17} />
                {prescription.date}
              </div>

              {/* Status */}
              <span
                className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                  prescription.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {prescription.status}
              </span>

            </div>

            {/* Diagnosis */}
            <div className="mt-5 rounded-lg bg-slate-50 p-4">

              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Diagnosis
              </p>

              <p className="mt-1 font-semibold text-slate-700">
                {prescription.diagnosis}
              </p>

            </div>

            {/* Medicines */}
            <div className="mt-5">

              <div className="mb-3 flex items-center gap-2">
                <Pill size={18} className="text-blue-600" />

                <h3 className="font-semibold text-slate-800">
                  Medicines
                </h3>
              </div>

              <div className="overflow-x-auto">

                <table className="w-full min-w-[600px]">

                  <thead>
                    <tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wide text-slate-400">

                      <th className="px-3 py-3 font-medium">
                        Medicine
                      </th>

                      <th className="px-3 py-3 font-medium">
                        Dosage
                      </th>

                      <th className="px-3 py-3 font-medium">
                        Frequency
                      </th>

                      <th className="px-3 py-3 font-medium">
                        Duration
                      </th>

                    </tr>
                  </thead>

                  <tbody>

                    {prescription.medicines.map((medicine, index) => (

                      <tr
                        key={index}
                        className="border-b border-slate-100 last:border-0"
                      >

                        <td className="px-3 py-3 text-sm font-medium text-slate-700">
                          {medicine.name}
                        </td>

                        <td className="px-3 py-3 text-sm text-slate-500">
                          {medicine.dosage}
                        </td>

                        <td className="px-3 py-3 text-sm text-slate-500">
                          {medicine.frequency}
                        </td>

                        <td className="px-3 py-3 text-sm text-slate-500">
                          {medicine.duration}
                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </div>

            {/* Actions */}
            <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">

              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              >
                <Eye size={17} />
                View Prescription
              </button>

              <button
                type="button"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                Edit
              </button>

            </div>

          </div>

        ))}

      </div>

      {/* No Results */}
      {filteredPrescriptions.length === 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">

          <FileText
            size={45}
            className="mx-auto text-slate-300"
          />

          <h3 className="mt-3 font-semibold text-slate-700">
            No prescriptions found
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Try searching with a different patient or diagnosis.
          </p>

        </div>
      )}

    </div>
  );
}

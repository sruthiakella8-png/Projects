
import { Search, User, Phone, Mail, Calendar } from "lucide-react";
import { useState } from "react";

const patientsData = [
  {
    id: 1,
    name: "Rahul Kumar",
    age: 32,
    gender: "Male",
    phone: "+91 98765 43210",
    email: "rahul.kumar@gmail.com",
    lastVisit: "August 05, 2026",
    condition: "Diabetes",
  },
  {
    id: 2,
    name: "Ananya Sharma",
    age: 28,
    gender: "Female",
    phone: "+91 98765 12345",
    email: "ananya.sharma@gmail.com",
    lastVisit: "August 04, 2026",
    condition: "Hypertension",
  },
  {
    id: 3,
    name: "Arjun Reddy",
    age: 45,
    gender: "Male",
    phone: "+91 91234 56789",
    email: "arjun.reddy@gmail.com",
    lastVisit: "August 02, 2026",
    condition: "Heart Disease",
  },
  {
    id: 4,
    name: "Sneha Patel",
    age: 35,
    gender: "Female",
    phone: "+91 99887 66554",
    email: "sneha.patel@gmail.com",
    lastVisit: "July 30, 2026",
    condition: "Migraine",
  },
  {
    id: 5,
    name: "Vikram Singh",
    age: 40,
    gender: "Male",
    phone: "+91 98765 77889",
    email: "vikram.singh@gmail.com",
    lastVisit: "July 28, 2026",
    condition: "Asthma",
  },
];

export default function Patients() {
  const [search, setSearch] = useState("");

  const filteredPatients = patientsData.filter((patient) => {
    const searchText = search.toLowerCase();

    return (
      patient.name.toLowerCase().includes(searchText) ||
      patient.email.toLowerCase().includes(searchText) ||
      patient.condition.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Patients
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          View and manage your patients.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

        {/* Total Patients */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">

            <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
              <User size={24} />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Total Patients
              </p>

              <h2 className="text-2xl font-bold text-slate-800">
                {patientsData.length}
              </h2>
            </div>

          </div>
        </div>

        {/* Male Patients */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">

            <div className="rounded-lg bg-green-100 p-3 text-green-600">
              <User size={24} />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Male Patients
              </p>

              <h2 className="text-2xl font-bold text-slate-800">
                {patientsData.filter(
                  (patient) => patient.gender === "Male"
                ).length}
              </h2>
            </div>

          </div>
        </div>

        {/* Female Patients */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">

            <div className="rounded-lg bg-pink-100 p-3 text-pink-600">
              <User size={24} />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Female Patients
              </p>

              <h2 className="text-2xl font-bold text-slate-800">
                {patientsData.filter(
                  (patient) => patient.gender === "Female"
                ).length}
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
            placeholder="Search patients by name, email or condition..."
            className="w-full rounded-lg border border-slate-300 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

        </div>

      </div>

      {/* Patients Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 p-5">
          <h2 className="text-lg font-semibold text-slate-800">
            Patient List
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {filteredPatients.length} patient
            {filteredPatients.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-x-auto md:block">

          <table className="w-full">

            <thead className="bg-slate-50">

              <tr className="text-left text-sm text-slate-500">

                <th className="px-6 py-4 font-medium">
                  Patient
                </th>

                <th className="px-6 py-4 font-medium">
                  Age / Gender
                </th>

                <th className="px-6 py-4 font-medium">
                  Contact
                </th>

                <th className="px-6 py-4 font-medium">
                  Last Visit
                </th>

                <th className="px-6 py-4 font-medium">
                  Condition
                </th>

                <th className="px-6 py-4 font-medium">
                  Action
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-slate-100">

              {filteredPatients.map((patient) => (

                <tr
                  key={patient.id}
                  className="transition hover:bg-slate-50"
                >

                  {/* Patient */}
                  <td className="px-6 py-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        <User size={18} />
                      </div>

                      <div>
                        <p className="font-semibold text-slate-800">
                          {patient.name}
                        </p>

                        <p className="text-xs text-slate-500">
                          Patient ID: #{patient.id}
                        </p>
                      </div>

                    </div>

                  </td>

                  {/* Age / Gender */}
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {patient.age} years / {patient.gender}
                  </td>

                  {/* Contact */}
                  <td className="px-6 py-4">

                    <div className="space-y-1 text-sm text-slate-500">

                      <div className="flex items-center gap-2">
                        <Phone size={14} />
                        {patient.phone}
                      </div>

                      <div className="flex items-center gap-2">
                        <Mail size={14} />
                        {patient.email}
                      </div>

                    </div>

                  </td>

                  {/* Last Visit */}
                  <td className="px-6 py-4">

                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Calendar size={16} />
                      {patient.lastVisit}
                    </div>

                  </td>

                  {/* Condition */}
                  <td className="px-6 py-4">

                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                      {patient.condition}
                    </span>

                  </td>

                  {/* Action */}
                  <td className="px-6 py-4">

                    <button
                      type="button"
                      className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                    >
                      View
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* Mobile Cards */}
        <div className="divide-y divide-slate-100 md:hidden">

          {filteredPatients.map((patient) => (

            <div
              key={patient.id}
              className="space-y-4 p-5"
            >

              {/* Patient */}
              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <User size={20} />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-800">
                    {patient.name}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {patient.age} years • {patient.gender}
                  </p>
                </div>

              </div>

              {/* Contact */}
              <div className="space-y-2 text-sm text-slate-500">

                <div className="flex items-center gap-2">
                  <Phone size={16} />
                  {patient.phone}
                </div>

                <div className="flex items-center gap-2">
                  <Mail size={16} />
                  {patient.email}
                </div>

                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  Last visit: {patient.lastVisit}
                </div>

              </div>

              {/* Condition */}
              <div>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                  {patient.condition}
                </span>
              </div>

              {/* Action */}
              <button
                type="button"
                className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                View Patient
              </button>

            </div>

          ))}

        </div>

        {/* No Results */}
        {filteredPatients.length === 0 && (
          <div className="p-10 text-center">

            <User
              size={40}
              className="mx-auto text-slate-300"
            />

            <h3 className="mt-3 font-semibold text-slate-700">
              No patients found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Try searching with a different name or condition.
            </p>

          </div>
        )}

      </div>

    </div>
  );
}


import { Calendar, Clock, User } from "lucide-react";

const appointments = [
  {
    id: 1,
    patient: "Rahul Kumar",
    time: "09:00 AM",
    date: "August 09, 2026",
    type: "General Consultation",
    status: "Confirmed",
  },
  {
    id: 2,
    patient: "Ananya Sharma",
    time: "10:30 AM",
    date: "August 09, 2026",
    type: "Follow-up",
    status: "Pending",
  },
  {
    id: 3,
    patient: "Arjun Reddy",
    time: "12:00 PM",
    date: "August 09, 2026",
    type: "General Consultation",
    status: "Confirmed",
  },
  {
    id: 4,
    patient: "Sneha Patel",
    time: "02:30 PM",
    date: "August 09, 2026",
    type: "Follow-up",
    status: "Cancelled",
  },
];

export default function Appointments() {
  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Appointments
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your appointments and patient consultations.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
              <Calendar size={22} />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Total Appointments
              </p>

              <h2 className="text-2xl font-bold text-slate-800">
                4
              </h2>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-green-100 p-3 text-green-600">
              <Clock size={22} />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Confirmed
              </p>

              <h2 className="text-2xl font-bold text-slate-800">
                2
              </h2>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-orange-100 p-3 text-orange-600">
              <User size={22} />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Pending
              </p>

              <h2 className="text-2xl font-bold text-slate-800">
                1
              </h2>
            </div>
          </div>
        </div>

      </div>

      {/* Appointment List */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 p-5">
          <h2 className="text-lg font-semibold text-slate-800">
            Appointment List
          </h2>
        </div>

        <div className="divide-y divide-slate-100">

          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex flex-col gap-4 p-5 transition hover:bg-slate-50 md:flex-row md:items-center md:justify-between"
            >

              {/* Patient */}
              <div className="flex items-center gap-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <User size={20} />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-800">
                    {appointment.patient}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {appointment.type}
                  </p>
                </div>

              </div>

              {/* Date & Time */}
              <div className="text-sm text-slate-600">
                <p className="font-medium">
                  {appointment.date}
                </p>

                <p className="text-slate-500">
                  {appointment.time}
                </p>
              </div>

              {/* Status */}
              <div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    appointment.status === "Confirmed"
                      ? "bg-green-100 text-green-700"
                      : appointment.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {appointment.status}
                </span>
              </div>

              {/* Action */}
              <button
                type="button"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                View Details
              </button>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}



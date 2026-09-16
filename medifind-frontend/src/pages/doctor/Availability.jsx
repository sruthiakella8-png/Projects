
import {
  CalendarDays,
  Clock,
  Save,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";

const initialAvailability = {
  Monday: {
    available: true,
    startTime: "09:00",
    endTime: "17:00",
  },
  Tuesday: {
    available: true,
    startTime: "09:00",
    endTime: "17:00",
  },
  Wednesday: {
    available: true,
    startTime: "09:00",
    endTime: "17:00",
  },
  Thursday: {
    available: true,
    startTime: "09:00",
    endTime: "17:00",
  },
  Friday: {
    available: true,
    startTime: "09:00",
    endTime: "17:00",
  },
  Saturday: {
    available: true,
    startTime: "09:00",
    endTime: "13:00",
  },
  Sunday: {
    available: false,
    startTime: "09:00",
    endTime: "13:00",
  },
};

export default function Availability() {
  const [availability, setAvailability] = useState(
    initialAvailability
  );

  const [appointmentDuration, setAppointmentDuration] =
    useState("30");

  const [saved, setSaved] = useState(false);

  const updateDay = (day, field, value) => {
    setAvailability((previous) => ({
      ...previous,
      [day]: {
        ...previous[day],
        [field]: value,
      },
    }));

    setSaved(false);
  };

  const saveAvailability = () => {
    console.log("Doctor Availability:", availability);

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-3">

          <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
            <CalendarDays size={24} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Availability
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage your working days and consultation hours.
            </p>
          </div>

        </div>

        <button
          type="button"
          onClick={saveAvailability}
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <Save size={18} />
          Save Availability
        </button>

      </div>

      {/* Success Message */}
      {saved && (
        <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-700">
          <CheckCircle size={20} />
          Availability saved successfully.
        </div>
      )}

      {/* Weekly Availability */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 p-6">

          <div className="flex items-center gap-3">

            <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
              <Clock size={22} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                Weekly Availability
              </h2>

              <p className="text-sm text-slate-500">
                Set the hours when patients can book appointments.
              </p>
            </div>

          </div>

        </div>

        <div className="divide-y divide-slate-100">

          {Object.keys(availability).map((day) => {

            const dayData = availability[day];

            return (
              <div
                key={day}
                className="p-5"
              >

                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                  {/* Day + Toggle */}
                  <div className="flex items-center gap-4 lg:w-1/4">

                    <input
                      type="checkbox"
                      checked={dayData.available}
                      onChange={(e) =>
                        updateDay(
                          day,
                          "available",
                          e.target.checked
                        )
                      }
                      className="h-5 w-5 accent-blue-600"
                    />

                    <div>
                      <h3 className="font-semibold text-slate-800">
                        {day}
                      </h3>

                      <p
                        className={`text-xs ${
                          dayData.available
                            ? "text-green-600"
                            : "text-slate-400"
                        }`}
                      >
                        {dayData.available
                          ? "Available"
                          : "Unavailable"}
                      </p>
                    </div>

                  </div>

                  {/* Working Hours */}
                  {dayData.available ? (
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

                      <div>
                        <label className="mb-1 block text-xs text-slate-400">
                          Start Time
                        </label>

                        <input
                          type="time"
                          value={dayData.startTime}
                          onChange={(e) =>
                            updateDay(
                              day,
                              "startTime",
                              e.target.value
                            )
                          }
                          className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                      </div>

                      <span className="hidden text-slate-400 sm:block">
                        to
                      </span>

                      <div>
                        <label className="mb-1 block text-xs text-slate-400">
                          End Time
                        </label>

                        <input
                          type="time"
                          value={dayData.endTime}
                          onChange={(e) =>
                            updateDay(
                              day,
                              "endTime",
                              e.target.value
                            )
                          }
                          className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                      </div>

                    </div>
                  ) : (
                    <div className="text-sm text-slate-400 lg:w-1/2">
                      Not available for appointments
                    </div>
                  )}

                </div>

              </div>
            );
          })}

        </div>

      </div>

      {/* Appointment Settings */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 p-6">

          <h2 className="text-lg font-semibold text-slate-800">
            Appointment Settings
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Configure how long each patient consultation should take.
          </p>

        </div>

        <div className="space-y-5 p-6">

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Appointment Duration
            </label>

            <select
              value={appointmentDuration}
              onChange={(e) =>
                setAppointmentDuration(e.target.value)
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:w-72"
            >
              <option value="15">
                15 minutes
              </option>

              <option value="30">
                30 minutes
              </option>

              <option value="45">
                45 minutes
              </option>

              <option value="60">
                60 minutes
              </option>
            </select>

          </div>

          <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-700">
            Patients will be able to book appointments based on
            your available days, working hours and appointment
            duration.
          </div>

        </div>

      </div>

      {/* Weekly Summary */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <h2 className="text-lg font-semibold text-slate-800">
          Availability Summary
        </h2>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">

          <div className="rounded-xl bg-slate-50 p-4">

            <p className="text-sm text-slate-500">
              Available Days
            </p>

            <p className="mt-1 text-2xl font-bold text-slate-800">
              {
                Object.values(availability).filter(
                  (day) => day.available
                ).length
              }
            </p>

          </div>

          <div className="rounded-xl bg-slate-50 p-4">

            <p className="text-sm text-slate-500">
              Unavailable Days
            </p>

            <p className="mt-1 text-2xl font-bold text-slate-800">
              {
                Object.values(availability).filter(
                  (day) => !day.available
                ).length
              }
            </p>

          </div>

          <div className="rounded-xl bg-slate-50 p-4">

            <p className="text-sm text-slate-500">
              Consultation Duration
            </p>

            <p className="mt-1 text-2xl font-bold text-slate-800">
              {appointmentDuration} min
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}


import React from "react";

const FEATURES = [
  {
    title: "Find Nearby Doctors",
    desc: "Search doctors by specialization and location, and check real-time availability.",
  },
  {
    title: "Diagnostics Centers",
    desc: "Locate diagnostics centers near you and view the tests they offer.",
  },
  {
    title: "Pharmacy Search",
    desc: "Find pharmacies nearby and check medicine availability before you go.",
  },
  {
    title: "Appointment Booking",
    desc: "Book, reschedule, or cancel appointments in a few taps, with instant notifications.",
  },
  {
    title: "GPS-Based Search",
    desc: "Integrated maps show you the closest healthcare options based on your live location.",
  },
  {
    title: "Emergency Support",
    desc: "Quickly locate emergency healthcare services when every minute counts.",
  },
];

export default function Features() {
  return (
   <div className="bg-white">
    {/* Hero */}
    <div className="bg-blue-500">
      <section className="max-w-5xl mx-auto px-6 py-24 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Features
        </h1>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Everything you need to find and manage your healthcare, built into
          one platform.
        </p>
      </section>
    </div>

      <section className="max-w-6xl mx-auto px-6 py-10 pb-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-gray-200 p-6 hover:border-blue-200 hover:shadow-md transition-all"
            >
              <div className="h-10 w-10 rounded-lg bg-blue-200 text-blue-600 flex items-center justify-center font-semibold mb-4">
                {f.title.charAt(0)}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {f.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div> 
  );
}
import React from "react";

export default function About() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-blue-600 text-white">
        <div className="max-w-5xl mx-auto px-6 py-24 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            About MediFind
          </h1>
          <p className="text-blue-100 max-w-2xl mx-auto text-lg">
            Connecting patients with doctors, diagnostics centers, and
            pharmacies — all in one place.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-5xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed">
              MediFind was built to remove the friction between people and
              the healthcare they need. Whether it's finding a nearby
              specialist, booking a diagnostic test, or locating a pharmacy
              that has your prescription in stock, we bring it together in
              a single, simple platform.
            </p>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-8">
            <ul className="space-y-4">
              {[
                "Verified doctors, diagnostics centers, and pharmacies",
                "Real-time location-based search",
                "Simple appointment booking and tracking",
                "Support for emergencies when it matters most",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-blue-600 shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-14">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            What We Stand For
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Trust",
                desc: "Every provider on MediFind is verified before they can list their services.",
              },
              {
                title: "Accessibility",
                desc: "Healthcare should be easy to find, regardless of where you are.",
              },
              {
                title: "Speed",
                desc: "From search to appointment, we keep the process fast and simple.",
              },
            ].map((v) => (
              <div
                key={v.title}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <h3 className="text-lg font-semibold text-blue-600 mb-2">
                  {v.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
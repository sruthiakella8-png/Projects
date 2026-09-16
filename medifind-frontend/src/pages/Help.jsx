
import React, { useState } from "react";
import { Link } from "react-router-dom";

const FAQS = [
  {
    q: "How do I book an appointment with a doctor?",
    a: "Search for a doctor by specialization or location, open their profile, and select an available time slot to book instantly.",
  },
  {
    q: "How do I register as a doctor, diagnostics center, or pharmacy?",
    a: "Go to the registration page and choose your provider type. You'll be asked to upload verification documents before your profile goes live.",
  },
  {
    q: "How does location-based search work?",
    a: "MediFind uses your device's location (with your permission) to show doctors, diagnostics centers, and pharmacies closest to you on the map.",
  },
  {
    q: "I forgot my password. What do I do?",
    a: "Click 'Forgot Password' on the login page and follow the instructions sent to your registered email to reset it.",
  },
  {
    q: "How do I contact support?",
    a: "Visit the Contact page and send us a message — our support team typically responds within 24 hours.",
  },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-100 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left bg-white hover:bg-blue-50 transition-colors"
      >
        <span className="font-medium text-gray-900">{q}</span>
        <span
          className={`text-blue-600 text-xl leading-none transition-transform ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>
      {open && (
        <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">
          {a}
        </div>
      )}
    </div>
  );
}

export default function Help() {
  return (
    <div className="bg-white">
      <section className="bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-6 py-24 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Help Center
          </h1>
          <p className="text-blue-100">
            Answers to common questions about using MediFind.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-14">
        <div className="space-y-3">
          {FAQS.map((f) => (
            <FaqItem key={f.q} q={f.q} a={f.a} />
          ))}
        </div>

        <div className="mt-12 text-center bg-gray-50 rounded-xl p-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Still need help?
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            Our support team is happy to help with anything not covered here.
          </p>
        
            <Link
              to="/contact"
              className="inline-block bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
            Contact Support
          </Link>
        </div>
      </section>
    </div>
  );
}
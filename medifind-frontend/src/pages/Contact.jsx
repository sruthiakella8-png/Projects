import React, { useState } from "react";
import Button from "../components/common/Button";
import InputField from "../components/common/InputField";
import ErrorMessage from "../components/common/ErrorMessage";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.message) {
      setError("Please fill in all fields.");
      return;
    }

    // TODO: replace with actual API call to backend
    console.log("Contact form submitted:", form);
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-blue-500 text-white">
        <div className="max-w-5xl mx-auto px-6 py-24 text-center">
          <h1 className="text-3xl md:text-4xl font-bold  text-gray-900 mb-4">
            Contact Us
          </h1>
          <p className="text-gray-700 max-w-xl mx-auto">
            Have a question or need help? Send us a message and we'll get
            back to you.
          </p>  
        </div>
      </section>
      
        <div className="grid md:grid-cols-5 gap-10 max-w-4xl mx-auto  px-6 py-10">
          {/* Form */}
          <div className="md:col-span-3 bg-blue-200 border border-gray-200 rounded-xl p-8 shadow-sm">
            {submitted ? (
              <div className="text-center py-10">
                <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-4 text-2xl">
                  ✓
                </div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Message sent
                </h2>
                <p className="text-gray-600 text-sm">
                  Thanks for reaching out — we'll respond within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && <ErrorMessage message={error} />}

                <InputField
                  label="Name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                />

                <InputField
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="How can we help?"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
 
                <button type="Send Message"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Send Message
               </button>
              
              </form>
            )}
          </div>

          {/* Contact info */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
              <p className="text-gray-600 text-sm">support@medifind.com</p>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
              <p className="text-gray-600 text-sm">+91 00000 00000</p>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-1">
                Support Hours
              </h3>
              <p className="text-gray-600 text-sm">
                Mon–Sat, 9:00 AM – 7:00 PM
              </p>
            </div>
          </div>
        </div>
    </div>
  );
}
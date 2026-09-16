import React from "react";

export default function AuthBackground({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden">

      {/* Blue glow */}
      <div
        className="
          absolute
          -top-40
          -left-40
          w-[450px]
          h-[450px]
          rounded-full
          bg-blue-200/30
          blur-3xl
          pointer-events-none
        "
      />

      {/* Teal glow */}
      <div
        className="
          absolute
          -bottom-40
          -right-40
          w-[450px]
          h-[450px]
          rounded-full
          bg-teal-200/30
          blur-3xl
          pointer-events-none
        "
      />

      {/* Small decorative circles */}
      <div
        className="
          absolute
          top-32
          right-[10%]
          w-4
          h-4
          rounded-full
          bg-blue-400/20
          pointer-events-none
        "
      />

      <div
        className="
          absolute
          bottom-32
          left-[8%]
          w-6
          h-6
          rounded-full
          bg-teal-400/20
          pointer-events-none
        "
      />

      {/* Content */}
      <div className="relative z-10 min-h-screen">
        {children}
      </div>

    </div>
  );
}
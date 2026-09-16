import React from "react";

export default function AuthInput({
  label,
  name,
  value,
  onChange,
  placeholder,
  icon,
  type = "text",
  required = true,
}) {
  return (
    <div className="w-full">

      <label
        htmlFor={name}
        className="
          block
          text-sm
          font-semibold
          text-slate-700
          mb-2
        "
      >
        {label}
      </label>

      <div className="relative group">

        {/* Icon */}
        {icon && (
          <div
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-slate-400
              group-focus-within:text-blue-600
              transition-colors
              duration-200
            "
          >
            {icon}
          </div>
        )}

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          autoComplete="off"
          className={`
            w-full
            h-12
            rounded-xl
            border
            border-slate-200
            bg-white
            text-slate-800
            outline-none
            transition-all
            duration-200
            placeholder:text-slate-400
            focus:border-blue-500
            focus:ring-4
            focus:ring-blue-500/10
            hover:border-slate-300
            ${icon ? "pl-11 pr-4" : "px-4"}
          `}
        />

      </div>

    </div>
  );
}
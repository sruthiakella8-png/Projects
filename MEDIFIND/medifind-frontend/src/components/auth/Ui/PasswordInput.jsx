import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  LockKeyhole,
} from "lucide-react";

export default function PasswordInput({
  label = "Password",
  name = "password",
  value,
  onChange,
  placeholder = "Enter password",
}) {

  const [showPassword, setShowPassword] = useState(false);

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

        {/* Lock icon */}
        <LockKeyhole
          size={18}
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-slate-400
            group-focus-within:text-blue-600
            transition-colors
          "
        />

        <input
          id={name}
          name={name}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
          className="
            w-full
            h-12
            pl-11
            pr-12
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
          "
        />

        {/* Eye button */}
        <button
          type="button"
          onClick={() =>
            setShowPassword((previous) => !previous)
          }
          className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            text-slate-400
            hover:text-blue-600
            transition
          "
          aria-label={
            showPassword
              ? "Hide password"
              : "Show password"
          }
        >
          {showPassword ? (
            <EyeOff size={19} />
          ) : (
            <Eye size={19} />
          )}
        </button>

      </div>

    </div>
  );
}
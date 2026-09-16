import React from "react";
import {
  Upload,
  CheckCircle2,
  FileText,
} from "lucide-react";

export default function FileUploadBox({
  title,
  description,
  file,
  onChange,
  required = true,
}) {
  return (
    <label className="block cursor-pointer">

      <div
        className={`
          flex
          items-center
          gap-4
          p-4
          rounded-2xl
          border-2
          border-dashed
          transition-all
          duration-200

          ${
            file
              ? "border-teal-400 bg-teal-50"
              : "border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50/40"
          }
        `}
      >

        {/* Icon */}
        <div
          className={`
            w-12
            h-12
            rounded-xl
            flex
            items-center
            justify-center
            flex-shrink-0

            ${
              file
                ? "bg-teal-100 text-teal-600"
                : "bg-blue-50 text-blue-600"
            }
          `}
        >

          {file ? (
            <CheckCircle2 size={22} />
          ) : (
            <FileText size={22} />
          )}

        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">

          <h3 className="font-semibold text-slate-800 truncate">
            {file ? file.name : title}

            {required && !file && (
              <span className="text-red-500 ml-1">
                *
              </span>
            )}
          </h3>

          <p className="text-xs text-slate-500 mt-1">
            {file
              ? "Document selected successfully"
              : description}
          </p>

        </div>

        {/* Upload */}
        {!file && (
          <div
            className="
              flex
              items-center
              gap-1.5
              text-sm
              font-bold
              text-blue-600
              flex-shrink-0
            "
          >
            <Upload size={16} />
            Upload
          </div>
        )}

      </div>

      <input
        type="file"
        className="hidden"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={onChange}
      />

    </label>
  );
}
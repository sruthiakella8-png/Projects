
import React, { useEffect, useState } from "react";
import {
  CheckCircle,
  Clock,
  XCircle,
  Upload,
  FileText,
  ShieldCheck,
  AlertCircle,
  RefreshCw,
  X,
  ExternalLink,
} from "lucide-react";

import {
  getDiagnosticsProfile,
  uploadDiagnosticsDocuments,
  submitDiagnosticsVerification,
} from "../../api/diagnosticsAPI";

const API_BASE_URL = "http://127.0.0.1:8000";

const getDocumentUrl = (documentUrl) => {
  if (!documentUrl) return null;

  if (
    documentUrl.startsWith("http://") ||
    documentUrl.startsWith("https://")
  ) {
    return documentUrl;
  }

  return `${API_BASE_URL}${documentUrl}`;
};

export default function Verification() {
  const [profile, setProfile] = useState(null);

  const [governmentId, setGovernmentId] = useState(null);
  const [registrationDocument, setRegistrationDocument] = useState(null);
  const [certificationDocument, setCertificationDocument] = useState(null);

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [previewDocument, setPreviewDocument] = useState(null);

  // =====================================================
  // LOAD PROFILE
  // =====================================================

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getDiagnosticsProfile();

      setProfile(response.data);
    } catch (err) {
      console.error("Failed to load diagnostics profile:", err);

      setError(
        err.response?.data?.detail ||
          "Unable to load verification information."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  loadProfile();
}, []);

useEffect(() => {
  const handleEscape = (event) => {
    if (event.key === "Escape") {
      setPreviewDocument(null);
    }
  };

  document.addEventListener("keydown", handleEscape);

  return () => {
    document.removeEventListener("keydown", handleEscape);
  };
}, []);

  // =====================================================
  // VERIFICATION STATUS
  // =====================================================

  const verificationStatus =
    profile?.verification_status || "pending";

  const statusConfig = {
    pending: {
      label: "Pending Verification",
      description:
        "Your verification request is waiting for admin review.",
      icon: Clock,
    },

    verified: {
      label: "Verified",
      description:
        "Your diagnostic center has been verified successfully.",
      icon: CheckCircle,
    },

    rejected: {
      label: "Verification Rejected",
      description:
        "Your verification request was rejected. Please review the reason and resubmit.",
      icon: XCircle,
    },
  };

  const currentStatus =
    statusConfig[verificationStatus] || statusConfig.pending;

  const StatusIcon = currentStatus.icon;

  // =====================================================
  // PROFILE COMPLETENESS
  // =====================================================

  const requiredProfileFields = [
    {
      label: "Center Name",
      value: profile?.center_name,
    },
    {
      label: "Phone Number",
      value: profile?.phone_number,
    },
    {
      label: "Address",
      value: profile?.address,
    },
    {
      label: "City",
      value: profile?.city,
    },
    {
      label: "State",
      value: profile?.state,
    },
    {
      label: "Pincode",
      value: profile?.pincode,
    },
    {
      label: "License Number",
      value: profile?.license_number,
    },
    {
      label: "Registration Number",
      value: profile?.registration_number,
    },
    {
      label: "Profile Photo",
      value: profile?.profile_photo,
    },
  ];

  const completedProfileFields =
    requiredProfileFields.filter(
      (field) =>
        field.value !== null &&
        field.value !== undefined &&
        String(field.value).trim() !== ""
    ).length;

  const profilePercentage = Math.round(
    (completedProfileFields / requiredProfileFields.length) * 100
  );

  // =====================================================
  // DOCUMENT FIELDS
  // =====================================================

  const documentFields = [
    {
      key: "government_id",
      label: "Government ID",
      description:
        "Upload a valid government-issued identification document.",
      file: governmentId,
      setFile: setGovernmentId,
      existing: profile?.government_id,
    },

    {
      key: "registration_document",
      label: "Registration / License Document",
      description:
        "Upload your diagnostic center registration or license certificate.",
      file: registrationDocument,
      setFile: setRegistrationDocument,
      existing: profile?.registration_document,
    },

    {
      key: "certification_document",
      label: "Certification Document",
      description:
        "Upload your NABL, ISO, or applicable certification document.",
      file: certificationDocument,
      setFile: setCertificationDocument,
      existing: profile?.certification_document,
    },
  ];

  const uploadedDocumentCount = documentFields.filter(
    (document) => document.file || document.existing
  ).length;

  const hasAllDocuments =
    uploadedDocumentCount === documentFields.length;

  // =====================================================
  // HANDLE FILE CHANGE
  // =====================================================

  const handleFileChange = (setter, event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");
    setMessage("");

    setter(file);
  };

  // =====================================================
// DOCUMENT PREVIEW
// =====================================================

const handlePreview = (document) => {
  if (!document.existing) return;

  setPreviewDocument({
    name: document.label,
    url: getDocumentUrl(document.existing),
  });
};

  // =====================================================
  // UPLOAD DOCUMENTS
  // =====================================================

  const handleUpload = async () => {
    if (
      !governmentId &&
      !registrationDocument &&
      !certificationDocument
    ) {
      setError("Please select at least one document.");
      return;
    }

    try {
      setUploading(true);
      setError("");
      setMessage("");

      const formData = new FormData();

      if (governmentId) {
        formData.append("government_id", governmentId);
      }

      if (registrationDocument) {
        formData.append(
          "registration_document",
          registrationDocument
        );
      }

      if (certificationDocument) {
        formData.append(
          "certification_document",
          certificationDocument
        );
      }

      const response =
        await uploadDiagnosticsDocuments(formData);

      setProfile(response.data);

      setGovernmentId(null);
      setRegistrationDocument(null);
      setCertificationDocument(null);

      setMessage("Documents uploaded successfully.");
    } catch (err) {
      console.error("Document upload failed:", err);

      setError(
        err.response?.data?.detail ||
          "Failed to upload documents."
      );
    } finally {
      setUploading(false);
    }
  };

  // =====================================================
  // SUBMIT VERIFICATION
  // =====================================================

  const handleSubmitVerification = async () => {
    setError("");
    setMessage("");

    if (profilePercentage < 100) {
      setError(
        "Please complete all required profile information before submitting."
      );
      return;
    }

    if (!hasAllDocuments) {
      setError(
        "Please upload all required verification documents before submitting."
      );
      return;
    }

    try {
      setSubmitting(true);

      const response =
        await submitDiagnosticsVerification();

      setMessage(
        response.data?.message ||
          "Verification request submitted successfully."
      );

      await loadProfile();
    } catch (err) {
      console.error(
        "Verification submission failed:",
        err
      );

      const backendError = err.response?.data;

      if (backendError?.missing_fields) {
        setError(
          `Missing information: ${backendError.missing_fields.join(
            ", "
          )}`
        );
      } else {
        setError(
          backendError?.detail ||
            backendError?.message ||
            "Failed to submit verification request."
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="flex items-center gap-3 text-slate-500">
          <RefreshCw
            size={20}
            className="animate-spin"
          />

          <span>
            Loading verification details...
          </span>
        </div>
      </div>
    );
  }

  // =====================================================
  // ERROR WITHOUT PROFILE
  // =====================================================

  if (!profile) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <div className="flex items-center gap-3">
          <AlertCircle
            className="text-red-600"
            size={22}
          />

          <p className="font-medium text-red-700">
            {error || "Unable to load profile."}
          </p>
        </div>

        <button
          onClick={loadProfile}
          className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Try Again
        </button>
      </div>
    );
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="mx-auto w-full max-w-7xl space-y-7">

      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="border-b border-slate-100 pb-5">

        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-800">
              Verification
            </h1>

            <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-500">
              Complete your profile and submit the required documents
              for diagnostic center verification.
            </p>
          </div>

          {/* Header status */}

          <div
            className={`
              inline-flex
              w-fit
              items-center
              gap-2
              rounded-full
              px-3
              py-1.5
              text-xs
              font-semibold
              ${
                verificationStatus === "verified"
                  ? "bg-emerald-50 text-emerald-700"
                  : verificationStatus === "rejected"
                  ? "bg-red-50 text-red-700"
                  : "bg-amber-50 text-amber-700"
              }
            `}
          >
            <span
              className={`
                h-2
                w-2
                rounded-full
                ${
                  verificationStatus === "verified"
                    ? "bg-emerald-500"
                    : verificationStatus === "rejected"
                    ? "bg-red-500"
                    : "bg-amber-500"
                }
              `}
            />

            {verificationStatus === "verified"
              ? "Verified"
              : verificationStatus === "rejected"
              ? "Action Required"
              : "Under Review"}
          </div>

        </div>
      </div>

      {/* =================================================
          VERIFICATION STATUS
      ================================================= */}

      <div
        className={`
          relative
          overflow-hidden
          rounded-2xl
          border
          p-6
          shadow-sm
          transition-all
          duration-300
          ${
            verificationStatus === "verified"
              ? "border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-teal-50"
              : verificationStatus === "rejected"
              ? "border-red-200 bg-gradient-to-br from-red-50 via-white to-rose-50"
              : "border-amber-200 bg-gradient-to-br from-amber-50 via-white to-yellow-50"
          }
        `}
      >

        {/* Decorative glow */}

        <div
          className={`
            pointer-events-none
            absolute
            -right-10
            -top-10
            h-32
            w-32
            rounded-full
            blur-3xl
            ${
              verificationStatus === "verified"
                ? "bg-emerald-200/50"
                : verificationStatus === "rejected"
                ? "bg-red-200/50"
                : "bg-amber-200/50"
            }
          `}
        />

        <div className="relative flex items-start justify-between gap-5">

          {/* STATUS INFORMATION */}

          <div className="flex items-start gap-4">

            <div
              className={`
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-xl
                ${
                  verificationStatus === "verified"
                    ? "bg-emerald-100 text-emerald-600"
                    : verificationStatus === "rejected"
                    ? "bg-red-100 text-red-600"
                    : "bg-amber-100 text-amber-600"
                }
              `}
            >
              <StatusIcon
                size={25}
                className={
                  verificationStatus === "verified"
                    ? "animate-pulse"
                    : ""
                }
              />
            </div>

            <div>

              <div className="flex flex-wrap items-center gap-2">

                <h2
                  className={`
                    text-lg
                    font-semibold
                    ${
                      verificationStatus === "verified"
                        ? "text-emerald-800"
                        : verificationStatus === "rejected"
                        ? "text-red-800"
                        : "text-amber-800"
                    }
                  `}
                >
                  {currentStatus.label}
                </h2>

                <span
                  className={`
                    inline-flex
                    items-center
                    rounded-full
                    px-2.5
                    py-1
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-wide
                    ${
                      verificationStatus === "verified"
                        ? "bg-emerald-100 text-emerald-700"
                        : verificationStatus === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-amber-100 text-amber-700"
                    }
                  `}
                >
                  {verificationStatus === "verified"
                    ? "Verified"
                    : verificationStatus === "rejected"
                    ? "Action Required"
                    : "Under Review"}
                </span>

              </div>

              <p
                className={`
                  mt-2
                  max-w-2xl
                  text-sm
                  leading-6
                  ${
                    verificationStatus === "verified"
                      ? "text-emerald-700/80"
                      : verificationStatus === "rejected"
                      ? "text-red-700/80"
                      : "text-amber-700/80"
                  }
                `}
              >
                {currentStatus.description}
              </p>

            </div>
          </div>

          {/* VERIFIED ICON */}

          {verificationStatus === "verified" && (
            <div
              className="
                hidden
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-emerald-100
                text-emerald-600
                sm:flex
              "
            >
              <ShieldCheck size={23} />
            </div>
          )}

        </div>

        {/* REJECTION REASON */}

        {verificationStatus === "rejected" &&
          profile.rejection_reason && (
            <div
              className="
                relative
                mt-5
                rounded-xl
                border
                border-red-200
                bg-white/80
                p-4
              "
            >
              <div className="flex items-start gap-3">

                <div
                  className="
                    mt-0.5
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-red-100
                    text-red-600
                  "
                >
                  <AlertCircle size={17} />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-red-600">
                    Rejection Reason
                  </p>

                  <p className="mt-1 text-sm leading-6 text-red-700">
                    {profile.rejection_reason}
                  </p>
                </div>

              </div>
            </div>
          )}

      </div>

      {/* =================================================
          SUCCESS / ERROR MESSAGE
      ================================================= */}

      {message && (
        <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
          <CheckCircle size={19} />
          <span>{message}</span>
        </div>
      )}

      {error && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle
            size={19}
            className="mt-0.5 shrink-0"
          />

          <span>{error}</span>
        </div>
      )}

      {/* =================================================
          PROFILE COMPLETENESS
      ================================================= */}

      <div
        className={`
          rounded-2xl
          border
          p-6
          shadow-sm
          transition-all
          duration-500
          ${
            profilePercentage === 100
              ? "border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-teal-50"
              : "border-slate-200 bg-white"
          }
        `}
      >

        {/* HEADER */}

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-start gap-4">

            <div
              className={`
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                transition-all
                duration-500
                ${
                  profilePercentage === 100
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-sky-50 text-sky-600"
                }
              `}
            >
              {profilePercentage === 100 ? (
                <CheckCircle
                  size={23}
                  className="animate-pulse"
                />
              ) : (
                <ShieldCheck size={22} />
              )}
            </div>

            <div>

              <div className="flex flex-wrap items-center gap-2">

                <h2 className="text-base font-semibold text-slate-800">
                  Profile Completeness
                </h2>

                {profilePercentage === 100 && (
                  <span
                    className="
                      inline-flex
                      items-center
                      gap-1
                      rounded-full
                      bg-emerald-100
                      px-2.5
                      py-1
                      text-xs
                      font-semibold
                      text-emerald-700
                    "
                  >
                    <CheckCircle size={12} />
                    Complete
                  </span>
                )}

              </div>

              <p className="mt-1 text-sm text-slate-500">
                {profilePercentage === 100
                  ? "All required profile information has been completed."
                  : "Complete the required information before submitting for verification."}
              </p>

            </div>
          </div>

          {/* PERCENTAGE */}

          <div className="sm:text-right">

            <div
              className={`
                text-3xl
                font-bold
                tracking-tight
                transition-colors
                duration-500
                ${
                  profilePercentage === 100
                    ? "text-emerald-600"
                    : "text-slate-800"
                }
              `}
            >
              {profilePercentage}%
            </div>

            <p className="mt-0.5 text-xs text-slate-400">
              {completedProfileFields} of{" "}
              {requiredProfileFields.length} completed
            </p>

          </div>
        </div>

        {/* PROGRESS BAR */}

        <div className="mt-6">

          <div className="h-3 overflow-hidden rounded-full bg-slate-100">

            <div
              className={`
                h-full
                rounded-full
                transition-all
                duration-700
                ease-out
                ${
                  profilePercentage === 100
                    ? "bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400"
                    : "bg-gradient-to-r from-sky-500 to-blue-500"
                }
              `}
              style={{
                width: `${profilePercentage}%`,
              }}
            />

          </div>

          <div className="mt-2 flex items-center justify-between">

            <span className="text-xs text-slate-400">
              0%
            </span>

            <span
              className={`
                text-xs
                font-medium
                ${
                  profilePercentage === 100
                    ? "text-emerald-600"
                    : "text-slate-400"
                }
              `}
            >
              {profilePercentage === 100
                ? "Ready for verification"
                : "Keep going"}
            </span>

            <span className="text-xs text-slate-400">
              100%
            </span>

          </div>
        </div>

        {/* COMPLETE MESSAGE */}

        {profilePercentage === 100 && (
          <div
            className="
              mt-5
              flex
              items-center
              gap-3
              rounded-xl
              border
              border-emerald-200
              bg-emerald-50
              px-4
              py-3
            "
          >
            <div
              className="
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-emerald-100
                text-emerald-600
              "
            >
              <CheckCircle size={17} />
            </div>

            <div>
              <p className="text-sm font-semibold text-emerald-700">
                Your profile is complete
              </p>

              <p className="mt-0.5 text-xs text-emerald-600">
                You can now submit your diagnostic center for verification.
              </p>
            </div>
          </div>
        )}

        {/* REQUIREMENT LIST */}

        <div className="mt-5 grid gap-3 sm:grid-cols-2">

          {requiredProfileFields.map((field) => {

            const completed =
              field.value !== null &&
              field.value !== undefined &&
              String(field.value).trim() !== "";

            return (
              <div
                key={field.label}
                className={`
                  group
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  border
                  px-4
                  py-3
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  ${
                    completed
                      ? "border-emerald-100 bg-emerald-50/70 hover:border-emerald-200 hover:bg-emerald-50"
                      : "border-amber-100 bg-amber-50/60 hover:border-amber-200 hover:bg-amber-50"
                  }
                `}
              >

                <div
                  className={`
                    flex
                    h-7
                    w-7
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    ${
                      completed
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-amber-100 text-amber-600"
                    }
                  `}
                >
                  {completed ? (
                    <CheckCircle size={16} />
                  ) : (
                    <AlertCircle size={16} />
                  )}
                </div>

                <div className="min-w-0 flex-1">

                  <p
                    className={`
                      text-sm
                      font-medium
                      ${
                        completed
                          ? "text-slate-700"
                          : "text-amber-700"
                      }
                    `}
                  >
                    {field.label}
                  </p>

                  <p
                    className={`
                      mt-0.5
                      text-xs
                      ${
                        completed
                          ? "text-emerald-600"
                          : "text-amber-600"
                      }
                    `}
                  >
                    {completed ? "Completed" : "Required"}
                  </p>

                </div>

                <div>
                  {completed ? (
                    <CheckCircle
                      size={17}
                      className="text-emerald-500 transition-transform duration-300 group-hover:scale-110"
                    />
                  ) : (
                    <span
                      className="
                        rounded-full
                        bg-amber-100
                        px-2
                        py-1
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-wide
                        text-amber-700
                      "
                    >
                      Missing
                    </span>
                  )}
                </div>

              </div>
            );
          })}

        </div>
      </div>

      {/* =================================================
          VERIFICATION DOCUMENTS
      ================================================= */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        {/* SECTION HEADER */}

        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

          <div>

            <div className="flex items-center gap-2">

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                <FileText size={19} />
              </div>

              <h2 className="text-base font-semibold text-slate-800">
                Verification Documents
              </h2>

            </div>

            <p className="mt-2 max-w-2xl text-sm text-slate-500">
              Upload the documents required to verify your diagnostic center.
              Make sure all documents are valid and clearly readable.
            </p>

          </div>

          {/* DOCUMENT COUNT */}

          <div
            className={`
              inline-flex
              w-fit
              items-center
              gap-1.5
              rounded-full
              px-3
              py-1.5
              text-xs
              font-semibold
              ${
                hasAllDocuments
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-amber-50 text-amber-700"
              }
            `}
          >
            {hasAllDocuments ? (
              <CheckCircle size={14} />
            ) : (
              <AlertCircle size={14} />
            )}

            {uploadedDocumentCount} of {documentFields.length} uploaded
          </div>

        </div>

        {/* DOCUMENT CARDS */}

        <div className="grid gap-5 lg:grid-cols-3">

          {documentFields.map((document) => {

            console.log(document.label, document.existing);

            const hasExisting = Boolean(document.existing);
            const hasNewFile = Boolean(document.file);

            return (
              <div
                key={document.key}
                className="
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-5
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:border-sky-200
                  hover:shadow-md
                "
              >

                {/* CARD HEADER */}

                <div className="flex items-start justify-between gap-3">

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      bg-sky-50
                      text-sky-600
                    "
                  >
                    <FileText size={20} />
                  </div>

                  {/* STATUS */}

                  {(hasExisting || hasNewFile) && (
                    <span
                      className={`
                        inline-flex
                        items-center
                        gap-1.5
                        rounded-full
                        px-2.5
                        py-1
                        text-[11px]
                        font-semibold
                        ${
                          hasNewFile
                            ? "bg-sky-50 text-sky-700"
                            : "bg-emerald-50 text-emerald-700"
                        }
                      `}
                    >
                      {hasNewFile ? (
                        <>
                          <Upload size={12} />
                          New file selected
                        </>
                      ) : (
                        <>
                          <CheckCircle size={13} />
                          Uploaded
                        </>
                      )}
                    </span>
                  )}

                </div>

                {/* TITLE */}

                <h3 className="mt-4 text-sm font-semibold text-slate-800">
                  {document.label}
                </h3>

                <p className="mt-1 min-h-[40px] text-xs leading-5 text-slate-500">
                  {document.description}
                </p>

                {/* FILE STATUS */}

                {hasNewFile ? (

                  <div
                    className="
                      mt-4
                      rounded-xl
                      border
                      border-sky-100
                      bg-sky-50
                      p-3
                    "
                  >

                    <div className="flex items-center gap-2">

                      <FileText
                        size={16}
                        className="shrink-0 text-sky-600"
                      />

                      <p className="min-w-0 flex-1 truncate text-xs font-medium text-sky-700">
                        {document.file.name}
                      </p>

                    </div>

                    <p className="mt-1 text-[11px] text-sky-600">
                      Ready to upload
                    </p>

                  </div>

                ) : hasExisting ? (

                  <div
                    className="
                      mt-4
                      rounded-xl
                      border
                      border-emerald-100
                      bg-emerald-50
                      p-3
                    "
                  >

                    <div className="flex items-center gap-2">

                      <CheckCircle
                        size={16}
                        className="shrink-0 text-emerald-600"
                      />

                      <p className="text-xs font-semibold text-emerald-700">
                        Document uploaded
                      </p>

                    </div>

                    <p className="mt-1 text-[11px] text-emerald-600">
                      Your document is currently stored in your profile.
                    </p>

                  </div>

                ) : (

                  <div
                    className="
                      mt-4
                      rounded-xl
                      border
                      border-dashed
                      border-slate-200
                      bg-slate-50
                      p-3
                    "
                  >

                    <div className="flex items-center gap-2">

                      <AlertCircle
                        size={16}
                        className="shrink-0 text-slate-400"
                      />

                      <p className="text-xs font-medium text-slate-500">
                        No document uploaded
                      </p>

                    </div>

                    <p className="mt-1 text-[11px] text-slate-400">
                      Upload this document to continue.
                    </p>

                  </div>
                )}

                {/* ACTIONS */}

                <div className="mt-4 flex gap-2">

                  {/* VIEW DOCUMENT */}

                  {hasExisting && !hasNewFile && (
  <button
    type="button"
    onClick={() => handlePreview(document)}
    className="
      inline-flex
      flex-1
      items-center
      justify-center
      gap-2
      rounded-lg
      border
      border-slate-200
      bg-white
      px-3
      py-2.5
      text-xs
      font-semibold
      text-slate-700
      transition
      hover:border-sky-300
      hover:bg-sky-50
      hover:text-sky-700
    "
  >
    <FileText size={15} />
    View Document
  </button>
)}

                  {/* REPLACE / CHOOSE */}

                  <label
                    className={`
                      inline-flex
                      cursor-pointer
                      items-center
                      justify-center
                      gap-2
                      rounded-lg
                      px-3
                      py-2.5
                      text-xs
                      font-semibold
                      transition
                      ${
                        hasExisting && !hasNewFile
                          ? "flex-1 border border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"
                          : "w-full border border-sky-200 bg-sky-50 text-sky-700 hover:bg-sky-100"
                      }
                    `}
                  >

                    {hasExisting ? (
                      <RefreshCw size={15} />
                    ) : (
                      <Upload size={15} />
                    )}

                    {hasExisting
                      ? "Replace Document"
                      : "Choose File"}

                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(event) =>
                        handleFileChange(
                          document.setFile,
                          event
                        )
                      }
                    />

                  </label>

                </div>

                {/* FILE TYPE HINT */}

                <p className="mt-2 text-center text-[10px] text-slate-400">
                  Accepted formats: PDF, JPG, JPEG, PNG
                </p>

              </div>
            );
          })}

        </div>

        {/* UPLOAD AREA */}

        <div
          className="
            mt-6
            flex
            flex-col
            gap-4
            border-t
            border-slate-100
            pt-5
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >

          <div>

            <p className="text-xs font-medium text-slate-600">
              {hasAllDocuments
                ? "All required documents are uploaded."
                : "Upload all required documents before verification."}
            </p>

            <p className="mt-1 text-[11px] text-slate-400">
              You can replace an uploaded document at any time before verification.
            </p>

          </div>

          <button
            onClick={handleUpload}
            disabled={
              uploading ||
              (
                !governmentId &&
                !registrationDocument &&
                !certificationDocument
              )
            }
            className="
              inline-flex
              shrink-0
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-slate-900
              px-5
              py-2.5
              text-sm
              font-semibold
              text-white
              shadow-sm
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:bg-slate-800
              hover:shadow-md
              disabled:cursor-not-allowed
              disabled:opacity-40
              disabled:hover:translate-y-0
            "
          >

            {uploading ? (
              <>
                <RefreshCw
                  size={17}
                  className="animate-spin"
                />
                Uploading...
              </>
            ) : (
              <>
                <Upload size={17} />
                Upload Documents
              </>
            )}

          </button>

        </div>

      </div>

      {/* =================================================
          SUBMISSION
      ================================================= */}

      <div
        className={`
          relative
          overflow-hidden
          rounded-2xl
          border
          p-6
          shadow-sm
          transition-all
          duration-300
          ${
            verificationStatus === "verified"
              ? "border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-teal-50"
              : "border-slate-200 bg-slate-900"
          }
        `}
      >

        {/* VERIFIED DECORATION */}

        {verificationStatus === "verified" && (
          <div
            className="
              pointer-events-none
              absolute
              -right-10
              -top-10
              h-32
              w-32
              rounded-full
              bg-emerald-100/60
              blur-2xl
            "
          />
        )}

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          {/* LEFT SIDE */}

          <div className="flex items-start gap-4">

            <div
              className={`
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-xl
                ${
                  verificationStatus === "verified"
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-sky-500/10 text-sky-400"
                }
              `}
            >

              {verificationStatus === "verified" ? (
                <CheckCircle
                  size={25}
                  className="animate-pulse"
                />
              ) : (
                <ShieldCheck size={24} />
              )}

            </div>

            <div>

              <div className="flex flex-wrap items-center gap-2">

                <h2
                  className={`
                    text-lg
                    font-semibold
                    ${
                      verificationStatus === "verified"
                        ? "text-slate-800"
                        : "text-white"
                    }
                  `}
                >
                  {verificationStatus === "verified"
                    ? "Verification Complete"
                    : "Ready for Verification?"}
                </h2>

                {verificationStatus === "verified" && (
                  <span
                    className="
                      inline-flex
                      items-center
                      gap-1.5
                      rounded-full
                      bg-emerald-100
                      px-3
                      py-1
                      text-xs
                      font-semibold
                      text-emerald-700
                    "
                  >
                    <CheckCircle size={13} />
                    Verified
                  </span>
                )}

              </div>

              <p
                className={`
                  mt-1
                  max-w-xl
                  text-sm
                  ${
                    verificationStatus === "verified"
                      ? "text-slate-500"
                      : "text-slate-400"
                  }
                `}
              >
                {verificationStatus === "verified"
                  ? "Your diagnostic center has successfully completed the verification process."
                  : "Once submitted, an administrator will review your profile and uploaded documents."}
              </p>

              {/* REQUIREMENT STATUS */}

              {verificationStatus !== "verified" && (
                <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">

                  {/* PROFILE */}

                  <div className="flex items-center gap-2">

                    {profilePercentage === 100 ? (
                      <CheckCircle
                        size={15}
                        className="text-emerald-400"
                      />
                    ) : (
                      <XCircle
                        size={15}
                        className="text-amber-400"
                      />
                    )}

                    <span
                      className={`
                        text-xs
                        ${
                          profilePercentage === 100
                            ? "text-emerald-400"
                            : "text-amber-400"
                        }
                      `}
                    >
                      Profile {profilePercentage}% complete
                    </span>

                  </div>

                  {/* DOCUMENTS */}

                  <div className="flex items-center gap-2">

                    {hasAllDocuments ? (
                      <CheckCircle
                        size={15}
                        className="text-emerald-400"
                      />
                    ) : (
                      <XCircle
                        size={15}
                        className="text-amber-400"
                      />
                    )}

                    <span
                      className={`
                        text-xs
                        ${
                          hasAllDocuments
                            ? "text-emerald-400"
                            : "text-amber-400"
                        }
                      `}
                    >
                      Documents{" "}
                      {hasAllDocuments
                        ? "complete"
                        : "incomplete"}
                    </span>

                  </div>

                </div>
              )}

            </div>
          </div>

          {/* ACTION AREA */}

          <div className="shrink-0">

            {verificationStatus === "verified" ? (

              <div
                className="
                  inline-flex
                  min-w-[170px]
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-emerald-200
                  bg-white
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  text-emerald-700
                  shadow-sm
                "
              >

                <div
                  className="
                    flex
                    h-6
                    w-6
                    items-center
                    justify-center
                    rounded-full
                    bg-emerald-100
                  "
                >
                  <CheckCircle size={15} />
                </div>

                Verification Complete

              </div>

            ) : (

              <button
                onClick={handleSubmitVerification}
                disabled={
                  submitting ||
                  profilePercentage < 100 ||
                  !hasAllDocuments
                }
                className={`
                  inline-flex
                  min-w-[210px]
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  transition-all
                  duration-300
                  ${
                    submitting
                      ? "cursor-not-allowed bg-sky-400 text-white"
                      : profilePercentage === 100 &&
                        hasAllDocuments
                      ? "bg-sky-500 text-white shadow-md hover:-translate-y-0.5 hover:bg-sky-400 hover:shadow-lg"
                      : "cursor-not-allowed bg-slate-700 text-slate-500"
                  }
                `}
              >

                {submitting ? (
                  <>
                    <RefreshCw
                      size={17}
                      className="animate-spin"
                    />
                    Submitting...
                  </>
                ) : (
                  <>
                    <ShieldCheck size={18} />
                    Submit for Verification
                  </>
                )}

              </button>

            )}

          </div>

        </div>

        {/* INCOMPLETE REQUIREMENTS */}

        {verificationStatus !== "verified" &&
          (profilePercentage < 100 ||
            !hasAllDocuments) && (

            <div
              className="
                relative
                mt-6
                border-t
                border-slate-700
                pt-4
              "
            >

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">

                <span className="text-xs font-medium text-slate-400">
                  Before submitting:
                </span>

                {profilePercentage < 100 && (
                  <div className="flex items-center gap-2">

                    <AlertCircle
                      size={14}
                      className="text-amber-400"
                    />

                    <span className="text-xs text-amber-400">
                      Complete your profile
                    </span>

                  </div>
                )}

                {!hasAllDocuments && (
                  <div className="flex items-center gap-2">

                    <AlertCircle
                      size={14}
                      className="text-amber-400"
                    />

                    <span className="text-xs text-amber-400">
                      Upload all required documents
                    </span>

                  </div>
                )}

              </div>

            </div>
          )}

      </div>

      {/* =================================================
    DOCUMENT PREVIEW MODAL
================================================= */}

{previewDocument && (
  <div
    className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      bg-slate-900/70
      p-4
      backdrop-blur-sm
    "
    onClick={() => setPreviewDocument(null)}
  >
    <div
      className="
        relative
        flex
        max-h-[90vh]
        w-full
        max-w-5xl
        flex-col
        overflow-hidden
        rounded-2xl
        bg-white
        shadow-2xl
      "
      onClick={(event) => event.stopPropagation()}
    >

      {/* =================================================
          MODAL HEADER
      ================================================= */}

      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-slate-200
          px-5
          py-4
        "
      >

        <div className="flex min-w-0 items-center gap-3">

          <div
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-lg
              bg-sky-50
              text-sky-600
            "
          >
            <FileText size={18} />
          </div>

          <div className="min-w-0">

            <h2 className="truncate text-sm font-semibold text-slate-800">
              {previewDocument.name}
            </h2>

            <p className="mt-0.5 text-xs text-slate-400">
              Document Preview
            </p>

          </div>

        </div>


        {/* CLOSE BUTTON */}

        <button
          type="button"
          onClick={() => setPreviewDocument(null)}
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-lg
            text-slate-400
            transition
            hover:bg-slate-100
            hover:text-slate-700
          "
          aria-label="Close document preview"
        >
          <X size={20} />
        </button>

      </div>


      {/* =================================================
          DOCUMENT CONTENT
      ================================================= */}

      <div
        className="
          min-h-[400px]
          flex-1
          overflow-auto
          bg-slate-100
          p-4
        "
      >

        {previewDocument.url.toLowerCase().match(
          /\.(jpg|jpeg|png|webp)(\?.*)?$/
        ) ? (

          /* IMAGE PREVIEW */

          <div className="flex min-h-[400px] items-center justify-center">

            <img
              src={previewDocument.url}
              alt={previewDocument.name}
              className="
                max-h-[70vh]
                max-w-full
                rounded-lg
                object-contain
                shadow-md
              "
            />

          </div>

        ) : (

          /* PDF PREVIEW */

          <iframe
            src={previewDocument.url}
            title={previewDocument.name}
            className="
              h-[70vh]
              min-h-[400px]
              w-full
              rounded-lg
              border
              border-slate-200
              bg-white
            "
          />

        )}

      </div>


      {/* =================================================
          MODAL FOOTER
      ================================================= */}

      <div
        className="
          flex
          flex-col
          gap-3
          border-t
          border-slate-200
          bg-white
          px-5
          py-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >

        <p className="text-xs text-slate-400">
          Review the document carefully before submitting for verification.
        </p>

        <a
          href={previewDocument.url}
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-lg
            border
            border-slate-200
            bg-white
            px-4
            py-2.5
            text-xs
            font-semibold
            text-slate-700
            transition
            hover:border-sky-300
            hover:bg-sky-50
            hover:text-sky-700
          "
        >
          <ExternalLink size={14} />
          Open in New Tab
        </a>

      </div>

    </div>
  </div>
)}

    </div>
  );
}
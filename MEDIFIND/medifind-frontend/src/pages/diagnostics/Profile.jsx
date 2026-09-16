
import React, { useEffect, useState } from "react";

import {
  Building2,
  User,
  Mail,
  Phone,
  FileText,
  MapPin,
  Globe2,
  Clock3,
  BarChart3,
  ShieldCheck,
  Activity,
  Camera,
  Info,
  ClipboardCheck,
  X,
  Save,
  Pencil,
} from "lucide-react";
import {
  getDiagnosticsProfile,
  updateDiagnosticsProfile,
  updateDiagnosticsProfilePhoto,
} from "../../api/diagnosticsAPI";

// =====================================================
// REUSABLE INPUT FIELD
// =====================================================

const InputField = ({
  label,
  name,
  type = "text",
  disabled = false,
  value,
  onChange,
  editing,
  icon: Icon,
}) => {
  return (
    <div className="group">
      <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
        {Icon && (
          <Icon
            size={16}
            strokeWidth={1.8}
            className="text-slate-400 transition-colors duration-200 group-focus-within:text-blue-500"
          />
        )}

        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value ?? ""}
        onChange={onChange}
        disabled={!editing || disabled}
        className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all duration-200 ${
          editing && !disabled
            ? "border-slate-200 bg-white text-slate-800 shadow-sm hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
            : "border-slate-200 bg-slate-50/80 text-slate-500"
        } ${
          disabled
            ? "cursor-not-allowed"
            : ""
        }`}
      />
    </div>
  );
};

const SectionIcon = ({ icon: Icon }) => {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-teal-50 text-blue-600">
      <Icon size={20} strokeWidth={1.8} />
    </div>
  );
};
// =====================================================
// PROFILE COMPONENT
// =====================================================

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({});

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [availabilitySaving, setAvailabilitySaving] =
    useState(false);

  const [photoPreview, setPhotoPreview] = useState("");
  const [photoSaving, setPhotoSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [editing, setEditing] = useState(false);

  const isVerified =
    profile?.verification_status === "verified";

  // =====================================================
  // LOAD PROFILE
  // =====================================================

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getDiagnosticsProfile();

      setProfile(response.data);
      setFormData(response.data);

      if (response.data.profile_photo) {
        setPhotoPreview(
          response.data.profile_photo
        );
      } else {
        setPhotoPreview("");
      }
    } catch (err) {
      console.error(
        "Failed to load diagnostics profile:",
        err
      );

      setError(
        err.response?.data?.detail ||
          "Unable to load your profile."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  // =====================================================
  // SAVE PROFILE
  // =====================================================

  const handleSave = async () => {
    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const data = {
        center_name:
          formData.center_name,

        phone_number:
          formData.phone_number,

        diagnostician_name:
          formData.diagnostician_name,

        registration_number:
          formData.registration_number || null,

        certification_type:
          formData.certification_type,

        address:
          formData.address,

        city:
          formData.city,

        state:
          formData.state,

        pincode:
          formData.pincode,

        latitude:
          formData.latitude === "" ||
          formData.latitude === null
            ? null
            : formData.latitude,

        longitude:
          formData.longitude === "" ||
          formData.longitude === null
            ? null
            : formData.longitude,

        reports_time:
          formData.reports_time,

        home_collection:
          formData.home_collection,

        open_24_hours:
          formData.open_24_hours,

        about:
          formData.about,

        why_choose_us:
          formData.why_choose_us || [],
      };

      const response =
        await updateDiagnosticsProfile(data);

      setProfile(response.data);
      setFormData(response.data);

      setSuccess(
        "Profile updated successfully."
      );

      setEditing(false);
    } catch (err) {
      console.error(
        "Failed to update profile:",
        err
      );

      setError(
        err.response?.data?.detail ||
          "Unable to update your profile."
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // PROFILE PHOTO UPLOAD
  // =====================================================

  const handlePhotoChange = async (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    // ---------------------------------------------------
    // Validate file type
    // ---------------------------------------------------

    if (!file.type.startsWith("image/")) {
      setError(
        "Please select a valid image file."
      );
      return;
    }

    // ---------------------------------------------------
    // Validate file size
    // ---------------------------------------------------

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      setError(
        "Profile photo must be smaller than 5 MB."
      );
      return;
    }

    try {
      setPhotoSaving(true);
      setError("");
      setSuccess("");

      // -------------------------------------------------
      // Preview immediately
      // -------------------------------------------------

      const previewUrl =
        URL.createObjectURL(file);

      setPhotoPreview(previewUrl);

      // -------------------------------------------------
      // Prepare multipart request
      // -------------------------------------------------

      const data = new FormData();

      data.append(
        "profile_photo",
        file
      );

      // -------------------------------------------------
      // Upload
      // -------------------------------------------------

      const response =
        await updateDiagnosticsProfilePhoto(
          data
        );

      // -------------------------------------------------
      // Update profile state
      // -------------------------------------------------

      setProfile(response.data);
      setFormData(response.data);

      if (response.data.profile_photo) {
        setPhotoPreview(
          response.data.profile_photo
        );

        localStorage.setItem(
          "diagnostic_avatar",
          response.data.profile_photo
        );
      }

      setSuccess(
        "Profile photo updated successfully."
      );
    } catch (err) {
      console.error(
        "Failed to upload profile photo:",
        err
      );

      setError(
        err.response?.data?.detail ||
          err.response?.data?.profile_photo?.[0] ||
          "Unable to upload profile photo."
      );

      // Reload the actual saved profile
      await loadProfile();
    } finally {
      setPhotoSaving(false);

      // Reset file input
      e.target.value = "";
    }
  };

  // =====================================================
  // TOGGLE AVAILABILITY
  // =====================================================

  const handleAvailabilityToggle = async () => {
    if (!isVerified) {
      setError(
        "Availability can only be changed after your diagnostic center is verified."
      );

      return;
    }

    try {
      setAvailabilitySaving(true);
      setError("");
      setSuccess("");

      const newAvailability =
        profile.availability === "available"
          ? "unavailable"
          : "available";

      const response =
        await updateDiagnosticsProfile({
          availability:
            newAvailability,
        });

      setProfile(response.data);

      setFormData((prev) => ({
        ...prev,
        availability:
          response.data.availability,
      }));

      setSuccess(
        response.data.availability ===
          "available"
          ? "Diagnostic center is now available."
          : "Diagnostic center is now unavailable."
      );
    } catch (err) {
      console.error(
        "Failed to update availability:",
        err
      );

      setError(
        err.response?.data?.detail ||
          "Unable to update availability."
      );
    } finally {
      setAvailabilitySaving(false);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-slate-500">
          Loading profile...
        </p>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (!profile) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <p className="text-red-600">
          {error ||
            "Profile could not be loaded."}
        </p>
      </div>
    );
  }

  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <div className="space-y-6">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm">

  {/* Decorative background */}
  <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-blue-50/70 blur-3xl" />

  <div className="pointer-events-none absolute -bottom-8 right-24 h-24 w-24 rounded-full bg-teal-50/60 blur-3xl" />

  {/* Header content */}
  <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

    {/* Title */}
    <div className="flex items-center gap-4">

      {/* Section icon */}
      <SectionIcon icon={Building2} />

      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-800">
          Diagnostic Profile
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your diagnostic center information.
        </p>
      </div>

    </div>

    {/* Actions */}
    <div className="flex gap-3">

      {!editing ? (
        <button
          onClick={() => {
            setEditing(true);
            setSuccess("");
            setError("");
          }}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md"
        >
          <Pencil size={17} strokeWidth={1.8} />
          Edit Profile
        </button>
      ) : (
        <>
          <button
            onClick={() => {
              setFormData(profile);
              setEditing(false);
              setError("");
              setSuccess("");
            }}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-slate-50"
          >
            <X size={17} strokeWidth={1.8} />
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save size={17} strokeWidth={1.8} />

            {saving ? "Saving..." : "Save Changes"}
          </button>
        </>
      )}

    </div>

  </div>

</div>

      {/* =================================================
          SUCCESS
      ================================================= */}

      {success && (
        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {success}
        </div>
      )}

      {/* =================================================
          ERROR
      ================================================= */}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* =================================================
          STATUS / AVAILABILITY / PROFILE PHOTO
      ================================================= */}

      <div className="grid gap-6 lg:grid-cols-3">

        {/* =================================================
            VERIFICATION STATUS
        ================================================= */}

        <div className="rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">

          <div className="flex items-start justify-between">

            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                Verification Status
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Current verification state
              </p>
            </div>

            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                profile.verification_status ===
                "verified"
                  ? "bg-green-100"
                  : profile.verification_status ===
                    "rejected"
                  ? "bg-red-100"
                  : "bg-yellow-100"
              }`}
            >
              {profile.verification_status === "verified" ? (
  <ShieldCheck
    size={21}
    strokeWidth={2}
  />
) : profile.verification_status === "rejected" ? (
  <X
    size={21}
    strokeWidth={2}
  />
) : (
  <Clock3
    size={21}
    strokeWidth={2}
  />
)}
            </div>

          </div>

          <div className="mt-6">

            <span
              className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                profile.verification_status ===
                "verified"
                  ? "bg-green-100 text-green-700"
                  : profile.verification_status ===
                    "rejected"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {profile.verification_status
                ?.charAt(0)
                .toUpperCase() +
                profile.verification_status?.slice(
                  1
                )}
            </span>

            {profile.verification_status ===
              "verified" && (
              <p className="mt-3 text-sm text-green-600">
                Your diagnostic center has
                been verified.
              </p>
            )}

            {profile.verification_status ===
              "pending" && (
              <p className="mt-3 text-sm text-yellow-600">
                Your verification is currently
                under review.
              </p>
            )}

            {profile.verification_status ===
              "rejected" &&
              profile.rejection_reason && (
                <div className="mt-3 rounded-lg bg-red-50 p-3">

                  <p className="text-xs font-semibold text-red-700">
                    Rejection Reason
                  </p>

                  <p className="mt-1 text-sm text-red-600">
                    {profile.rejection_reason}
                  </p>

                </div>
              )}

          </div>

        </div>

        {/* =================================================
            CENTER AVAILABILITY
        ================================================= */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">

          <div className="flex h-full flex-col justify-between">

            <div>

              <div className="flex items-start gap-3">

                <div
                  className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ${
                    !isVerified
                      ? "bg-amber-50"
                      : profile.availability ===
                        "available"
                      ? "bg-emerald-50"
                      : "bg-red-50"
                  }`}
                >

                  <span
                    className={`h-3 w-3 rounded-full ${
                      !isVerified
                        ? "bg-amber-500"
                        : profile.availability ===
                          "available"
                        ? "bg-emerald-500"
                        : "bg-red-500"
                    } ${
                      isVerified &&
                      profile.availability ===
                        "available"
                        ? "animate-pulse"
                        : ""
                    }`}
                  />

                </div>

                <div>

                  <h2 className="text-lg font-semibold text-slate-800">
                    Center Availability
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Control whether your center
                    is available to patients.
                  </p>

                </div>

              </div>

              <div className="mt-5">

                <span
                  className={`text-sm font-semibold ${
                    !isVerified
                      ? "text-amber-600"
                      : profile.availability ===
                        "available"
                      ? "text-emerald-600"
                      : "text-red-600"
                  }`}
                >
                  {!isVerified
                    ? "🔒 Unavailable until verification"
                    : profile.availability ===
                      "available"
                    ? "Available to patients"
                    : "Currently unavailable"}
                </span>

              </div>

            </div>

            {/* TOGGLE */}

            <div className="mt-6 flex items-center justify-between">

              <span className="text-xs text-slate-400">
                {isVerified
                  ? "Update availability"
                  : "Verification required"}
              </span>

              <button
                type="button"
                onClick={
                  handleAvailabilityToggle
                }
                disabled={
                  !isVerified ||
                  availabilitySaving
                }
                className={`relative h-7 w-12 rounded-full transition-all duration-300 ${
                  profile?.availability ===
                  "available"
                    ? "bg-emerald-500"
                    : "bg-slate-300"
                } ${
                  !isVerified
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer hover:scale-105"
                }`}
              >

                <span
                  className={`absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow transition-transform duration-300 ${
                    profile?.availability ===
                    "available"
                      ? "translate-x-5"
                      : "translate-x-0"
                  }`}
                />

              </button>

            </div>

          </div>

        </div>

        {/* =================================================
            PROFILE PHOTO
        ================================================= */}

        <div className="rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">

          <div className="flex h-full flex-col items-center justify-center text-center">

            {/* PHOTO */}

            <div className="relative">

              <div
                className="
                  flex
                  h-28
                  w-28
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-full
                  border-4
                  border-teal-100
                  bg-gradient-to-br
                  from-blue-600
                  to-teal-500
                  text-3xl
                  font-bold
                  text-white
                  shadow-md
                  transition-transform
                  duration-300
                  hover:scale-105
                "
              >

                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Diagnostic center profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span>
                    {(
                      profile.center_name ||
                      "DC"
                    )
                      .split(" ")
                      .slice(0, 2)
                      .map((word) =>
                        word.charAt(0)
                      )
                      .join("")
                      .toUpperCase()}
                  </span>
                )}

              </div>

              {/* UPLOAD LOADING */}

              {photoSaving && (
                <div
                  className="
                    absolute
                    inset-0
                    flex
                    items-center
                    justify-center
                    rounded-full
                    bg-black/40
                  "
                >
                  <div
                    className="
                      h-7
                      w-7
                      animate-spin
                      rounded-full
                      border-2
                      border-white
                      border-t-transparent
                    "
                  />
                </div>
              )}

            </div>

            {/* PHOTO INFORMATION */}

            <h2 className="mt-4 text-lg font-semibold text-slate-800">
              Profile Photo
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Authorized representative
            </p>

            <p className="mt-1 text-xs text-slate-400">
              JPG, JPEG, PNG · Maximum 5 MB
            </p>

            {/* UPLOAD BUTTON */}

            <label
              className={`mt-4 inline-flex cursor-pointer items-center rounded-lg px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 ${
                photoSaving
                  ? "cursor-not-allowed bg-slate-400"
                  : "bg-blue-600 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md"
              }`}
            >

              {photoSaving
                ? "Uploading..."
                : profile.profile_photo
                ? "Change Photo"
                : "Upload Photo"}

              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                onChange={
                  handlePhotoChange
                }
                disabled={photoSaving}
                className="hidden"
              />

            </label>

          </div>

        </div>

      </div>

      {/* =================================================
          BASIC INFORMATION + REGISTRATION
      ================================================= */}

      <div className="grid gap-6 lg:grid-cols-2">

        {/* =================================================
            BASIC INFORMATION
        ================================================= */}

        <div className="rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">

          <div className="mb-6 flex items-center gap-3">
  <SectionIcon icon={User} />

  <div>
    <h2 className="text-lg font-semibold text-slate-800">
      Basic Information
    </h2>

    <p className="mt-0.5 text-xs text-slate-400">
      Your diagnostic center's basic details
    </p>
  </div>
</div>

          <div className="grid gap-5 md:grid-cols-2">

            <InputField
  label="Diagnostic Center Name"
  name="center_name"
  value={formData.center_name}
  onChange={handleChange}
  editing={editing}
  icon={Building2}
/>

<InputField
  label="Username"
  name="username"
  value={formData.username}
  onChange={handleChange}
  editing={editing}
  disabled
  icon={User}
/>

<InputField
  label="Email"
  name="email"
  value={formData.email}
  onChange={handleChange}
  editing={editing}
  disabled
  icon={Mail}
/>

<InputField
  label="Phone Number"
  name="phone_number"
  value={formData.phone_number}
  onChange={handleChange}
  editing={editing}
  icon={Phone}
/>

<InputField
  label="Authorized Person"
  name="diagnostician_name"
  value={formData.diagnostician_name}
  onChange={handleChange}
  editing={editing}
  icon={User}
/>

<InputField
  label="License Number"
  name="license_number"
  value={formData.license_number}
  onChange={handleChange}
  editing={editing}
  disabled
  icon={FileText}
/>
          </div>

        </div>

        {/* =================================================
            REGISTRATION & CERTIFICATION
        ================================================= */}

        <div className="rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">

          <div className="mb-6 flex items-center gap-3">
  <SectionIcon icon={ClipboardCheck} />

  <div>
    <h2 className="text-lg font-semibold text-slate-800">
      Registration & Certification
    </h2>

    <p className="mt-0.5 text-xs text-slate-400">
      Registration and certification details
    </p>
  </div>
</div>

          <div className="grid gap-5">

            <InputField
              label="Registration Number"
              name="registration_number"
              value={
                formData.registration_number
              }
              onChange={handleChange}
              editing={editing}
            />

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-700">
                Certification Type
              </label>

              <select
                name="certification_type"
                value={
                  formData.certification_type ||
                  ""
                }
                onChange={handleChange}
                disabled={!editing}
                className={`w-full rounded-lg border px-4 py-2.5 outline-none transition ${
                  editing
                    ? "border-slate-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    : "border-slate-200 bg-slate-50 text-slate-500"
                }`}
              >

                <option value="nabl">
                  NABL Certified
                </option>

                <option value="iso">
                  ISO Certified
                </option>

                <option value="other">
                  Other
                </option>

              </select>

            </div>

          </div>

        </div>

      </div>

      {/* =================================================
          ADDRESS
      ================================================= */}

      <div className="rounded-2xl bg-white p-6 shadow-sm">

        <div className="mb-6 flex items-center gap-3">
  <SectionIcon icon={MapPin} />

  <div>
    <h2 className="text-lg font-semibold text-slate-800">
      Address
    </h2>

    <p className="mt-0.5 text-xs text-slate-400">
      Location and contact information
    </p>
  </div>
</div>

        <div className="grid gap-5 md:grid-cols-2">

          {/* FULL WIDTH ADDRESS */}

          <div className="md:col-span-2">

            <InputField
  label="Address"
  name="address"
  value={formData.address}
  onChange={handleChange}
  editing={editing}
  icon={MapPin}
/>
          </div>


<InputField
  label="City"
  name="city"
  value={formData.city}
  onChange={handleChange}
  editing={editing}
  icon={MapPin}
/>

<InputField
  label="State"
  name="state"
  value={formData.state}
  onChange={handleChange}
  editing={editing}
  icon={MapPin}
/>

<InputField
  label="Pincode"
  name="pincode"
  value={formData.pincode}
  onChange={handleChange}
  editing={editing}
  icon={MapPin}
/>

<InputField
  label="Latitude"
  name="latitude"
  type="number"
  value={formData.latitude}
  onChange={handleChange}
  editing={editing}
  icon={Globe2}
/>

<InputField
  label="Longitude"
  name="longitude"
  type="number"
  value={formData.longitude}
  onChange={handleChange}
  editing={editing}
  icon={Globe2}
/>
        </div>

      </div>

      {/* =================================================
          CENTER INFORMATION
      ================================================= */}

      <div className="rounded-2xl bg-white p-6 shadow-sm">

        <div className="mb-6 flex items-center gap-3">
  <SectionIcon icon={Info} />

  <div>
    <h2 className="text-lg font-semibold text-slate-800">
      Center Information
    </h2>

    <p className="mt-0.5 text-xs text-slate-400">
      Services and operational information
    </p>
  </div>
</div>

        <div className="grid gap-5 md:grid-cols-2">

          <InputField
  label="Report Time"
  name="reports_time"
  value={formData.reports_time}
  onChange={handleChange}
  editing={editing}
  icon={Clock3}
/>

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              About
            </label>

            <textarea
              name="about"
              value={
                formData.about || ""
              }
              onChange={handleChange}
              disabled={!editing}
              rows="4"
              className={`w-full rounded-lg border px-4 py-2.5 text-slate-700 outline-none transition ${
                editing
                  ? "border-slate-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  : "border-slate-200 bg-slate-50 text-slate-500"
              }`}
            />

          </div>

        </div>

        <div className="mt-6 flex flex-col gap-4 md:flex-row">

          <label className="flex items-center gap-3 text-sm text-slate-700">

            <input
              type="checkbox"
              name="home_collection"
              checked={
                formData.home_collection ||
                false
              }
              onChange={handleChange}
              disabled={!editing}
              className="h-4 w-4"
            />

            Home Collection Available

          </label>

          <label className="flex items-center gap-3 text-sm text-slate-700">

            <input
              type="checkbox"
              name="open_24_hours"
              checked={
                formData.open_24_hours ||
                false
              }
              onChange={handleChange}
              disabled={!editing}
              className="h-4 w-4"
            />

            Open 24 Hours

          </label>

        </div>

      </div>

      {/* =================================================
          ACCOUNT INFORMATION
      ================================================= */}

      <div className="rounded-2xl bg-white p-6 shadow-sm">

        <div className="mb-6 flex items-center gap-3">
  <SectionIcon icon={BarChart3} />

  <div>
    <h2 className="text-lg font-semibold text-slate-800">
      Account Information
    </h2>

    <p className="mt-0.5 text-xs text-slate-400">
      Your account statistics and status
    </p>
  </div>
</div>

        <div className="grid gap-5 md:grid-cols-2">

          <InputField
            label="Total Tests"
            name="test_count"
            value={formData.test_count}
            onChange={handleChange}
            editing={editing}
            disabled
          />

          <InputField
            label="Rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            editing={editing}
            disabled
          />

          <InputField
            label="Reviews"
            name="reviews_count"
            value={
              formData.reviews_count
            }
            onChange={handleChange}
            editing={editing}
            disabled
          />

          <InputField
            label="Account Status"
            name="is_active"
            value={formData.is_active}
            onChange={handleChange}
            editing={editing}
            disabled
          />

        </div>

      </div>

    </div>
  );
}

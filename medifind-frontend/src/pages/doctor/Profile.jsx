import { useEffect, useState } from "react";
import axios from "axios";

import {
  UserRound,
  Stethoscope,
  GraduationCap,
  BriefcaseMedical,
  Hospital,
  MapPin,
  IndianRupee,
  Phone,
  Languages,
  Camera,
  Save,
  LoaderCircle,
  CheckCircle2,
  AlertCircle,
  Power,
  FileText,
  ShieldCheck,
  Upload,
  Eye,
} from "lucide-react";

const API_URL = "http://127.0.0.1:8000/api";
const BACKEND_URL = "http://127.0.0.1:8000";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_DOCUMENT_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png",
];

const Profile = () => {
  // =====================================================
  // FORM DATA
  // =====================================================

  const [formData, setFormData] = useState({
    full_name: "",
    registration_number: "",
    license_number: "",
    issuing_authority: "",
    specialization: "",
    experience: "",
    location: "",
    address: "",
    qualification: "",
    hospital_name: "",
    hospital_location: "",
    phone: "",
    consultation_fee: "",
    languages: "",
    is_available: false,
  });

  // =====================================================
  // NEW DOCUMENTS
  // =====================================================

  const [documents, setDocuments] = useState({
    registration_certificate: null,
    professional_license: null,
    qualification_certificate: null,
    government_id: null,
    additional_document: null,
  });

  // =====================================================
  // EXISTING DOCUMENTS
  // =====================================================

  const [existingDocuments, setExistingDocuments] = useState({
    registration_certificate: "",
    professional_license: "",
    qualification_certificate: "",
    government_id: "",
    additional_document: "",
  });

  // =====================================================
  // PROFILE IMAGE
  // =====================================================

  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  // =====================================================
  // STATES
  // =====================================================

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [verificationStatus, setVerificationStatus] =
    useState("PENDING");

  // =====================================================
  // TOKEN
  // =====================================================

  const getToken = () => {
    return localStorage.getItem("access_token");
  };

  // =====================================================
  // FILE URL
  // =====================================================

  const getFileUrl = (file) => {
    if (!file) {
      return "";
    }

    if (typeof file !== "string") {
      return "";
    }

    if (file.startsWith("http://") || file.startsWith("https://")) {
      return file;
    }

    if (file.startsWith("/")) {
      return `${BACKEND_URL}${file}`;
    }

    return `${BACKEND_URL}/${file}`;
  };

  // =====================================================
  // LOAD PROFILE
  // =====================================================

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const token = getToken();

      if (!token) {
        setError("Please login again.");
        return;
      }

      const response = await axios.get(
        `${API_URL}/doctors/profile/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("DOCTOR PROFILE:", response.data);

      const doctor = response.data;

      // ===================================================
      // FORM DATA
      // ===================================================

      setFormData({
        full_name: doctor.full_name || "",

        registration_number:
          doctor.registration_number || "",

        license_number:
          doctor.license_number || "",

        issuing_authority:
          doctor.issuing_authority || "",

        specialization:
          doctor.specialization || "",

        experience:
          doctor.experience ?? "",

        location:
          doctor.location || "",

        address:
          doctor.address || "",

        qualification:
          doctor.qualification || "",

        hospital_name:
          doctor.hospital_name || "",

        hospital_location:
          doctor.hospital_location || "",

        phone:
          doctor.phone || "",

        consultation_fee:
          doctor.consultation_fee ?? "",

        languages:
          doctor.languages || "",

        is_available:
          doctor.is_available ?? false,
      });

      // ===================================================
      // VERIFICATION STATUS
      // ===================================================

      setVerificationStatus(
        doctor.verification_status || "PENDING"
      );

      // ===================================================
      // PROFILE IMAGE
      // ===================================================

      if (doctor.profile_image) {
        setPreviewImage(
          getFileUrl(doctor.profile_image)
        );
      } else {
        setPreviewImage("");
      }

      // ===================================================
      // EXISTING DOCUMENTS
      // ===================================================

      setExistingDocuments({
        registration_certificate:
          getFileUrl(
            doctor.registration_certificate
          ),

        professional_license:
          getFileUrl(
            doctor.professional_license
          ),

        qualification_certificate:
          getFileUrl(
            doctor.qualification_certificate
          ),

        government_id:
          getFileUrl(
            doctor.government_id
          ),

        additional_document:
          getFileUrl(
            doctor.additional_document
          ),
      });
    } catch (err) {
      console.error(
        "PROFILE LOAD ERROR:",
        err.response?.data || err
      );

      if (err.response?.status === 401) {
        setError(
          "Your session has expired. Please login again."
        );
      } else if (err.response?.status === 404) {
        setError("Doctor profile not found.");
      } else {
        setError(
          err.response?.data?.detail ||
            "Unable to load your profile."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    loadProfile();
  }, []);

  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  // =====================================================
  // PROFILE IMAGE CHANGE
  // =====================================================

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError(
        "Please select a valid JPG, JPEG or PNG image."
      );
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError(
        "Profile image must be less than 5 MB."
      );
      return;
    }

    setProfileImage(file);

    const objectUrl = URL.createObjectURL(file);

    setPreviewImage(objectUrl);

    setError("");
    setSuccess("");
  };

  // =====================================================
  // DOCUMENT CHANGE
  // =====================================================

  const handleDocumentChange = (field, file) => {
    if (!file) {
      return;
    }

    // File type
    if (!ALLOWED_DOCUMENT_TYPES.includes(file.type)) {
      setError(
        "Documents must be PDF, JPG, JPEG or PNG files."
      );
      return;
    }

    // File size
    if (file.size > MAX_FILE_SIZE) {
      setError(
        "Each document must be less than 5 MB."
      );
      return;
    }

    setDocuments((previous) => ({
      ...previous,
      [field]: file,
    }));

    setError("");
    setSuccess("");
  };

  // =====================================================
  // AVAILABILITY
  // =====================================================

  const toggleAvailability = () => {
    setFormData((previous) => ({
      ...previous,
      is_available: !previous.is_available,
    }));

    setSuccess("");
    setError("");
  };

  // =====================================================
  // REQUIRED FIELD VALIDATION
  // =====================================================

  const validateRequiredFields = () => {
    const requiredFields = {
      registration_number: "Registration Number",
      license_number: "License Number",
      issuing_authority: "Issuing Authority",
      specialization: "Specialization",
      experience: "Experience",
      location: "Location",
      address: "Address",
    };

    const missingFields = [];

    Object.entries(requiredFields).forEach(
      ([field, label]) => {
        const value = formData[field];

        if (
          value === undefined ||
          value === null ||
          String(value).trim() === ""
        ) {
          missingFields.push(label);
        }
      }
    );

    if (missingFields.length > 0) {
      setError(
        `Please complete: ${missingFields.join(", ")}`
      );

      return false;
    }

    return true;
  };

  // =====================================================
  // REQUIRED DOCUMENT VALIDATION
  // =====================================================

  const validateDocuments = () => {
    const requiredDocuments = {
      registration_certificate:
        "Registration Certificate",

      professional_license:
        "Professional License",

      qualification_certificate:
        "Qualification Certificate",

      government_id:
        "Government ID",
    };

    const missingDocuments = [];

    Object.entries(requiredDocuments).forEach(
      ([field, label]) => {
        const newFile = documents[field];

        const oldFile =
          existingDocuments[field];

        if (!newFile && !oldFile) {
          missingDocuments.push(label);
        }
      }
    );

    if (missingDocuments.length > 0) {
      setError(
        `Please upload: ${missingDocuments.join(", ")}`
      );

      return false;
    }

    return true;
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess("");
    setError("");

    // -----------------------------------------------------
    // Validate professional information
    // -----------------------------------------------------

    if (!validateRequiredFields()) {
      return;
    }

    // -----------------------------------------------------
    // Validate documents
    // -----------------------------------------------------

    if (!validateDocuments()) {
      return;
    }

    try {
      setSaving(true);

      const token = getToken();

      if (!token) {
        setError("Please login again.");
        return;
      }

      const data = new FormData();

      // ===================================================
      // BASIC INFORMATION
      // ===================================================

      data.append(
        "full_name",
        formData.full_name
      );

      data.append(
        "qualification",
        formData.qualification
      );

      // ===================================================
      // PROFESSIONAL INFORMATION
      // ===================================================

      data.append(
        "registration_number",
        formData.registration_number
      );

      data.append(
        "license_number",
        formData.license_number
      );

      data.append(
        "issuing_authority",
        formData.issuing_authority
      );

      data.append(
        "specialization",
        formData.specialization
      );

      data.append(
        "experience",
        formData.experience
      );

      data.append(
        "location",
        formData.location
      );

      data.append(
        "address",
        formData.address
      );

      // ===================================================
      // HOSPITAL
      // ===================================================

      data.append(
        "hospital_name",
        formData.hospital_name
      );

      data.append(
        "hospital_location",
        formData.hospital_location
      );

      // ===================================================
      // CONTACT
      // ===================================================

      data.append(
        "phone",
        formData.phone
      );

      data.append(
        "consultation_fee",
        formData.consultation_fee
      );

      data.append(
        "languages",
        formData.languages
      );

      // ===================================================
      // AVAILABILITY
      // ===================================================

      data.append(
        "is_available",
        String(formData.is_available)
      );

      // ===================================================
      // PROFILE IMAGE
      // ===================================================

      if (profileImage) {
        data.append(
          "profile_image",
          profileImage
        );
      }

      // ===================================================
      // DOCUMENTS
      // ===================================================

      Object.entries(documents).forEach(
        ([field, file]) => {
          if (file) {
            data.append(field, file);
          }
        }
      );

      // ===================================================
      // DEBUG FORM DATA
      // ===================================================

      console.log(
        "========== PROFILE FORM DATA =========="
      );

      for (const [key, value] of data.entries()) {
        console.log(
          key,
          value instanceof File
            ? value.name
            : value
        );
      }

      console.log(
        "========================================"
      );

      // ===================================================
      // API REQUEST
      // ===================================================

      const response = await axios.put(
        `${API_URL}/doctors/profile/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "PROFILE UPDATED:",
        response.data
      );

      // ===================================================
      // SUCCESS
      // ===================================================

      setSuccess(
        "Profile and verification documents submitted successfully."
      );

      setVerificationStatus(
        response.data?.verification_status ||
          "PENDING"
      );

      // ===================================================
      // UPDATE PROFILE IMAGE
      // ===================================================

      if (response.data?.profile_image) {
        setPreviewImage(
          getFileUrl(
            response.data.profile_image
          )
        );
      }

      // ===================================================
      // UPDATE EXISTING DOCUMENTS
      // ===================================================

      setExistingDocuments({
        registration_certificate:
          getFileUrl(
            response.data
              ?.registration_certificate
          ),

        professional_license:
          getFileUrl(
            response.data
              ?.professional_license
          ),

        qualification_certificate:
          getFileUrl(
            response.data
              ?.qualification_certificate
          ),

        government_id:
          getFileUrl(
            response.data
              ?.government_id
          ),

        additional_document:
          getFileUrl(
            response.data
              ?.additional_document
          ),
      });

      // ===================================================
      // CLEAR NEW FILES
      // ===================================================

      setDocuments({
        registration_certificate: null,
        professional_license: null,
        qualification_certificate: null,
        government_id: null,
        additional_document: null,
      });

      setProfileImage(null);

      // ===================================================
      // CLEAR SUCCESS MESSAGE
      // ===================================================

      setTimeout(() => {
        setSuccess("");
      }, 5000);
    } catch (err) {
      console.error(
        "PROFILE UPDATE ERROR:",
        err.response?.data || err
      );

      // ===================================================
      // 401
      // ===================================================

      if (err.response?.status === 401) {
        setError(
          "Your session has expired. Please login again."
        );

        return;
      }

      // ===================================================
      // BACKEND VALIDATION
      // ===================================================

      if (err.response?.data) {
        const backendError =
          err.response.data;

        if (backendError.missing_fields) {
          setError(
            `Missing: ${backendError.missing_fields.join(
              ", "
            )}`
          );

          return;
        }

        if (backendError.detail) {
          setError(backendError.detail);
          return;
        }

        if (
          typeof backendError === "object"
        ) {
          const messages = [];

          Object.entries(
            backendError
          ).forEach(
            ([field, errors]) => {
              if (Array.isArray(errors)) {
                messages.push(
                  `${field}: ${errors.join(", ")}`
                );
              } else {
                messages.push(
                  `${field}: ${errors}`
                );
              }
            }
          );

          setError(
            messages.join(" | ") ||
              "Please check the submitted information."
          );

          return;
        }
      }

      setError(
        "Unable to update your profile."
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="flex items-center gap-3 text-teal-600">
          <LoaderCircle
            size={28}
            className="animate-spin"
          />

          <span className="font-medium">
            Loading profile...
          </span>
        </div>
      </div>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#2563EB] to-[#14B8A6] shadow-lg">
              <Stethoscope
                size={24}
                className="text-white"
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Doctor Profile
              </h1>

              <p className="mt-1 text-slate-500">
                Manage your professional information,
                documents and availability.
              </p>
            </div>
          </div>
        </div>

        {/* =================================================
            SUCCESS
        ================================================= */}

        {success && (
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-green-700">
            <CheckCircle2 size={20} />

            <span className="font-medium">
              {success}
            </span>
          </div>
        )}

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            <AlertCircle
              size={20}
              className="mt-0.5 shrink-0"
            />

            <span className="break-words">
              {error}
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* =================================================
              PROFILE PHOTO + AVAILABILITY
          ================================================= */}

          <div className="mb-6 grid gap-6 lg:grid-cols-3">

            {/* PROFILE PHOTO */}

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <h2 className="mb-5 text-lg font-bold text-slate-900">
                Profile Photo
              </h2>

              <div className="flex flex-col items-center">

                <div className="relative">

                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Doctor profile"
                      className="h-32 w-32 rounded-full border-4 border-teal-100 object-cover shadow-sm"
                    />
                  ) : (
                    <div className="flex h-32 w-32 items-center justify-center rounded-full bg-teal-50 text-teal-600">
                      <UserRound size={55} />
                    </div>
                  )}

                  <label
                    htmlFor="profile_image"
                    className="absolute bottom-1 right-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-teal-500 text-white shadow-lg transition hover:bg-teal-600"
                  >
                    <Camera size={18} />
                  </label>

                  <input
                    id="profile_image"
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>

                <p className="mt-4 text-center text-sm text-slate-500">
                  Upload a professional profile photo
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  JPG, JPEG or PNG • Max 5 MB
                </p>
              </div>
            </div>

            {/* AVAILABILITY */}

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">

              <div className="mb-5 flex items-center justify-between">

                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Availability
                  </h2>

                  <p className="text-sm text-slate-500">
                    Control whether patients can see you
                    as available.
                  </p>
                </div>

                <div
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    verificationStatus === "APPROVED"
                      ? "bg-green-100 text-green-700"
                      : verificationStatus === "REJECTED"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {verificationStatus}
                </div>
              </div>

              <div
                className={`flex items-center justify-between rounded-xl border p-4 ${
                  formData.is_available
                    ? "border-green-200 bg-green-50"
                    : "border-slate-200 bg-slate-50"
                }`}
              >

                <div className="flex items-center gap-3">

                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      formData.is_available
                        ? "bg-green-100 text-green-600"
                        : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    <Power size={19} />
                  </div>

                  <div>
                    <p className="font-semibold text-slate-900">
                      {formData.is_available
                        ? "Available"
                        : "Busy"}
                    </p>

                    <p className="text-xs text-slate-500">
                      {formData.is_available
                        ? "Patients can see you as available."
                        : "Patients will see you as busy."}
                    </p>
                  </div>

                </div>

                <button
                  type="button"
                  onClick={toggleAvailability}
                  aria-label="Toggle availability"
                  className={`relative h-6 w-11 rounded-full transition ${
                    formData.is_available
                      ? "bg-green-500"
                      : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${
                      formData.is_available
                        ? "left-6"
                        : "left-1"
                    }`}
                  />
                </button>

              </div>

              <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-4">
                <div className="flex gap-3">
                  <ShieldCheck
                    size={20}
                    className="shrink-0 text-blue-600"
                  />

                  <div>
                    <p className="font-semibold text-blue-900">
                      Verification status
                    </p>

                    <p className="mt-1 text-sm text-blue-700">
                      Your profile must be approved before
                      patients can fully access your professional
                      information.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              PROFESSIONAL INFORMATION
          ================================================= */}

          <Section
            icon={<Stethoscope size={20} />}
            title="Professional Information"
            description="Required professional details"
          >
            <div className="grid gap-5 md:grid-cols-2">

              <InputField
                icon={<FileText size={19} />}
                label="Registration Number"
                name="registration_number"
                value={formData.registration_number}
                onChange={handleChange}
                required
              />

              <InputField
                icon={<ShieldCheck size={19} />}
                label="License Number"
                name="license_number"
                value={formData.license_number}
                onChange={handleChange}
                required
              />

              <InputField
                icon={<ShieldCheck size={19} />}
                label="Issuing Authority"
                name="issuing_authority"
                value={formData.issuing_authority}
                onChange={handleChange}
                required
              />

              <InputField
                icon={<Stethoscope size={19} />}
                label="Specialization"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                required
              />

              <InputField
                icon={<BriefcaseMedical size={19} />}
                label="Experience (Years)"
                name="experience"
                type="number"
                min="0"
                value={formData.experience}
                onChange={handleChange}
                required
              />

              <InputField
                icon={<MapPin size={19} />}
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />

              <div className="md:col-span-2">
                <TextAreaField
                  icon={<MapPin size={19} />}
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>
          </Section>

          {/* =================================================
              BASIC INFORMATION
          ================================================= */}

          <Section
            icon={<UserRound size={20} />}
            title="Basic Information"
            description="General doctor information"
          >
            <div className="grid gap-5 md:grid-cols-2">

              <InputField
                icon={<UserRound size={19} />}
                label="Full Name"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
              />

              <InputField
                icon={<GraduationCap size={19} />}
                label="Qualification"
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
              />

            </div>
          </Section>

          {/* =================================================
              HOSPITAL INFORMATION
          ================================================= */}

          <Section
            icon={<Hospital size={20} />}
            title="Hospital Information"
            description="Current practice information"
          >
            <div className="grid gap-5 md:grid-cols-2">

              <InputField
                icon={<Hospital size={19} />}
                label="Hospital"
                name="hospital_name"
                value={formData.hospital_name}
                onChange={handleChange}
              />

              <InputField
                icon={<MapPin size={19} />}
                label="Hospital Location"
                name="hospital_location"
                value={formData.hospital_location}
                onChange={handleChange}
              />

            </div>
          </Section>

          {/* =================================================
              CONTACT
          ================================================= */}

          <Section
            icon={<Phone size={20} />}
            title="Contact & Consultation"
            description="Contact and consultation details"
          >
            <div className="grid gap-5 md:grid-cols-3">

              <InputField
                icon={<Phone size={19} />}
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />

              <InputField
                icon={<IndianRupee size={19} />}
                label="Consultation Fee"
                name="consultation_fee"
                type="number"
                min="0"
                value={formData.consultation_fee}
                onChange={handleChange}
              />

              <InputField
                icon={<Languages size={19} />}
                label="Languages"
                name="languages"
                value={formData.languages}
                onChange={handleChange}
                placeholder="English, Telugu, Hindi"
              />

            </div>
          </Section>

          {/* =================================================
              VERIFICATION DOCUMENTS
          ================================================= */}

          <Section
            icon={<ShieldCheck size={20} />}
            title="Verification Documents"
            description="Four documents are required for doctor verification"
          >

            <div className="mb-5 rounded-xl border border-blue-200 bg-blue-50 p-4">
              <div className="flex gap-3">

                <ShieldCheck
                  size={21}
                  className="mt-0.5 shrink-0 text-blue-600"
                />

                <div>
                  <p className="font-semibold text-blue-900">
                    Document verification
                  </p>

                  <p className="mt-1 text-sm leading-6 text-blue-700">
                    Please upload all four required documents.
                    The additional document is optional and can
                    be used for any other supporting certificate.
                  </p>

                  <p className="mt-2 text-xs font-semibold text-blue-800">
                    Accepted: PDF, JPG, JPEG, PNG • Maximum 5 MB
                    per file
                  </p>
                </div>

              </div>
            </div>

            <div className="space-y-4">

              <DocumentField
                label="Registration Certificate"
                field="registration_certificate"
                existingFile={
                  existingDocuments.registration_certificate
                }
                selectedFile={
                  documents.registration_certificate
                }
                onChange={handleDocumentChange}
                required
              />

              <DocumentField
                label="Professional License"
                field="professional_license"
                existingFile={
                  existingDocuments.professional_license
                }
                selectedFile={
                  documents.professional_license
                }
                onChange={handleDocumentChange}
                required
              />

              <DocumentField
                label="Qualification Certificate"
                field="qualification_certificate"
                existingFile={
                  existingDocuments.qualification_certificate
                }
                selectedFile={
                  documents.qualification_certificate
                }
                onChange={handleDocumentChange}
                required
              />

              <DocumentField
                label="Government ID"
                field="government_id"
                existingFile={
                  existingDocuments.government_id
                }
                selectedFile={
                  documents.government_id
                }
                onChange={handleDocumentChange}
                required
              />

              <DocumentField
                label="Additional Medical Document"
                field="additional_document"
                existingFile={
                  existingDocuments.additional_document
                }
                selectedFile={
                  documents.additional_document
                }
                onChange={handleDocumentChange}
              />

            </div>
          </Section>

          {/* =================================================
              SAVE
          ================================================= */}

          <div className="mb-10 flex justify-end">

            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#14B8A6] px-7 py-3 font-semibold text-white shadow-lg transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >

              {saving ? (
                <>
                  <LoaderCircle
                    size={19}
                    className="animate-spin"
                  />

                  Uploading & Saving...
                </>
              ) : (
                <>
                  <Save size={19} />

                  Save & Submit for Verification
                </>
              )}

            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

// =====================================================
// SECTION
// =====================================================

const Section = ({
  icon,
  title,
  description,
  children,
}) => {
  return (
    <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
          {icon}
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-900">
            {title}
          </h2>

          <p className="text-sm text-slate-500">
            {description}
          </p>
        </div>

      </div>

      {children}
    </div>
  );
};

// =====================================================
// INPUT FIELD
// =====================================================

const InputField = ({
  icon,
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
  required = false,
  min,
}) => {
  return (
    <div>

      <label className="mb-2 block text-sm font-semibold text-slate-700">

        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}

      </label>

      <div className="relative">

        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </div>

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          min={min}
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-slate-800 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
        />

      </div>
    </div>
  );
};

// =====================================================
// TEXTAREA
// =====================================================

const TextAreaField = ({
  icon,
  label,
  name,
  value,
  onChange,
  placeholder = "",
  required = false,
}) => {
  return (
    <div>

      <label className="mb-2 block text-sm font-semibold text-slate-700">

        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}

      </label>

      <div className="relative">

        <div className="absolute left-3 top-4 text-slate-400">
          {icon}
        </div>

        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={4}
          className="w-full resize-none rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-slate-800 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
        />

      </div>
    </div>
  );
};

// =====================================================
// DOCUMENT FIELD
// =====================================================

const DocumentField = ({
  label,
  field,
  existingFile,
  selectedFile,
  onChange,
  required = false,
}) => {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 md:flex-row md:items-center md:justify-between">

      {/* LEFT */}

      <div className="flex min-w-0 items-center gap-3">

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <FileText size={20} />
        </div>

        <div className="min-w-0">

          <p className="font-semibold text-slate-800">

            {label}

            {required && (
              <span className="ml-1 text-red-500">
                *
              </span>
            )}

          </p>

          {selectedFile ? (
            <p className="mt-1 truncate text-xs font-medium text-blue-600">
              New file: {selectedFile.name}
            </p>
          ) : existingFile ? (
            <p className="mt-1 flex items-center gap-1 text-xs font-medium text-green-600">
              <CheckCircle2 size={14} />
              Document uploaded
            </p>
          ) : (
            <p className="mt-1 text-xs font-medium text-red-500">
              Document not uploaded
            </p>
          )}

        </div>
      </div>

      {/* RIGHT */}

      <div className="flex shrink-0 items-center gap-2">

        {existingFile && (
          <a
            href={existingFile}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            <Eye size={16} />

            View
          </a>
        )}

        <label className="flex cursor-pointer items-center gap-2 rounded-lg bg-teal-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-teal-600">

          <Upload size={16} />

          {existingFile
            ? "Replace"
            : "Upload"}

          <input
            type="file"
            className="hidden"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) =>
              onChange(
                field,
                e.target.files?.[0]
              )
            }
          />

        </label>

      </div>
    </div>
  );
};

export default Profile;
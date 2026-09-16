
import axiosInstance from "./axiosInstance";

// =====================================================
// PATIENT DIAGNOSTIC CENTERS
// =====================================================

// Get all verified + active diagnostic centers
export const getDiagnosticCenters = () =>
  axiosInstance.get("/diagnostics/patient/");

// Get details of one diagnostic center
export const getDiagnosticCenterDetails = (id) =>
  axiosInstance.get(`/diagnostics/patient/${id}/`);


// =====================================================
// DIAGNOSTICS CENTER - PROFILE
// =====================================================

export const getDiagnosticsProfile = () =>
  axiosInstance.get("/diagnostics/profile/");

export const updateDiagnosticsProfile = (data) =>
  axiosInstance.patch("/diagnostics/profile/", data);

export const updateDiagnosticsProfilePhoto = (formData) =>
  axiosInstance.patch(
    "/diagnostics/profile/",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );


// =====================================================
// DIAGNOSTICS CENTER - VERIFICATION
// =====================================================

// Upload verification documents
export const uploadDiagnosticsDocuments = (formData) =>
  axiosInstance.patch(
    "/diagnostics/profile/documents/",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

// Submit profile + documents for admin verification
export const submitDiagnosticsVerification = () =>
  axiosInstance.post(
    "/diagnostics/profile/submit-verification/",
    {}
  );
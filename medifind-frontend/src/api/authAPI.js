import axiosInstance from "./axiosInstance";

export const registerUser = (data) =>
  axiosInstance.post("/register/", data);

export const registerDiagnostics = (data) =>
  axiosInstance.post("/diagnostics/register/", data);

export const loginUser = (data) =>
  axiosInstance.post("/auth/token/", data);

export const forgotPassword = (email) =>
  axiosInstance.post("/forgot-password/", { email });

export const resetPassword = (uid, token, password) =>
  axiosInstance.post(
    `/reset-password/${uid}/${token}/`,
    { password }
  );

export const logoutUser = (refreshToken) =>
  axiosInstance.post(
    "/auth/logout/",
    { refresh: refreshToken }
  );

export const getPatientDashboard = () =>
  axiosInstance.get("/patient/dashboard/");
import axiosInstance from "../api/axiosInstance";

export async function getPatientDashboard() {
  const response = await axiosInstance.get("/patient/dashboard/");

  return response.data;
}
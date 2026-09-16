import axiosInstance from "../api/axiosInstance";

const BASE = "/pharmacy";

// ---------- PROFILE ----------
export const getPharmacyProfile = () =>
  axiosInstance.get(`${BASE}/profile/`);

export const updatePharmacyProfile = (data) =>
  axiosInstance.patch(`${BASE}/profile/`, data);

// ---------- MEDICINES (CRUD) ----------
export const getMedicines = (search = "") =>
  axiosInstance.get(`${BASE}/medicines/`, {
    params: search ? { search } : {},
  });

export const addMedicine = (formData) =>
  axiosInstance.post(`${BASE}/medicines/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updateMedicine = (id, formData) =>
  axiosInstance.patch(`${BASE}/medicines/${id}/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteMedicine = (id) =>
  axiosInstance.delete(`${BASE}/medicines/${id}/`);

// ---------- DOCUMENTS ----------
export const getDocuments = () =>
  axiosInstance.get(`${BASE}/documents/`);

export const deleteDocument = (id) =>
  axiosInstance.delete(`${BASE}/documents/${id}/`);

// ---------- DOCUMENTS (extra calls) ----------
export const uploadDocument = (formData) =>
  axiosInstance.post(`${BASE}/documents/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// getDocuments and deleteDocument already exist above — no change needed

// ---------- CONVERSATIONS (Pharmacy inbox) ----------
export const getPharmacyConversations = () =>
  axiosInstance.get(`${BASE}/messages/inbox/`);

export const getConversationMessages = (conversationId) =>
  axiosInstance.get(`${BASE}/messages/inbox/${conversationId}/`);

export const sendPharmacyReply = (conversationId, formData) =>
  axiosInstance.post(`${BASE}/messages/inbox/${conversationId}/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const markMessageRead = (messageId) =>
  axiosInstance.patch(`${BASE}/messages/${messageId}/read/`);
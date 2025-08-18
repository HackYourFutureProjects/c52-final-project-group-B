import apiRequest from "./index.js";

export const createUser = async (userData) => {
  return apiRequest("/users", "POST", userData);
};

export const getUserById = async () => {
  return apiRequest(`/users/me`, "GET", null, true);
};

export const updateCurrentUser = async (body) => {
  return apiRequest(`/users/me`, "PUT", body, true);
};

export const submitUserProgress = async (body) => {
  return apiRequest(`/user-progress/submit`, "POST", body, true);
};

export const getUserProgress = async (deckId) => {
  return apiRequest(`/user-progress/${deckId}`, "GET", null, true);
};

export const loginUser = async (body) => {
  return apiRequest(`/users/login`, "POST", body);
};

export const refreshAccessToken = async (refreshToken) => {
  return apiRequest(`/users/refresh-token`, "POST", { refreshToken });
};

export const requestPasswordReset = async (email) => {
  return apiRequest(`/users/forget-password`, "POST", email);
};

export const verifyResetToken = async (token) => {
  return apiRequest(
    `/users/reset-password/verify?token=${encodeURIComponent(token)}`,
    "GET"
  );
};

export const resetPassword = async (body) => {
  return apiRequest(`/users/reset-password`, "POST", body);
};

export const deactivateUser = async (userId) => {
  return apiRequest(`/users/deactivate`, "DELETE", { userId }, true);
};

export const activateUser = async (userId) => {
  return apiRequest(`/users/activate`, "PUT", { userId }, true);
};

export const sendProblemReport = async (reportData) => {
  return apiRequest(`/users/report-problem`, "POST", reportData, true);
};

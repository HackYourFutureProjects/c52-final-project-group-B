import apiRequest from "./index.js";

export const createUser = async (userData) => {
  return apiRequest("/users", "POST", userData);
};

export const getUserById = async (userId) => {
  return apiRequest(`/users/${userId}`);
};

export const updateUser = async (userId, body) => {
  return apiRequest(`/users/${userId}`, "PUT", body);
};

export const submitUserProgress = async (body) => {
  return apiRequest(`/user-progress/submit`, "POST", body, true); // true = requires authentication
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

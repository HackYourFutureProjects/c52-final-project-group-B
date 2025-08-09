import apiRequest from "./index.js";

export const createUser = async (userData) => {
  return apiRequest("/users", "POST", userData);
};

export const submitUserProgress = (body) => {
  return apiRequest(`/user-progress/submit`, "POST", body, true); // true = requires authentication
};

export const loginUser = async (body) => {
  return apiRequest(`/users/login`, "POST", body);
};

export const refreshAccessToken = async (refreshToken) => {
  return apiRequest(`/users/refresh-token`, "POST", { refreshToken });
};

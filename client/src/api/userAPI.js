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
  return apiRequest(`/user-progress/submit`, "POST", body);
};

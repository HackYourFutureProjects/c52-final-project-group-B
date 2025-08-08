import apiRequest from "./index.js";

export const createUser = async (userData) => {
  return apiRequest("/users", "POST", userData);
};

export const submitUserProgress = async (body) => {
  return apiRequest(`/user-progress/submit`, "POST", body);
};

export const loginUser = async (body) => {
  return apiRequest(`/users/login`, "POST", body);
};

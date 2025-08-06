import apiRequest from "./index.js";

export const createUser = async (userData) => {
  return apiRequest("/users", "POST", userData);
};

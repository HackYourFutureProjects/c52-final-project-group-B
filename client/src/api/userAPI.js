import apiRequest from "./index.js";

export const submitUserProgress = async (body) => {
  try {
    const res = await apiRequest(`/submit`, "POST", body);
    return res;
  } catch (e) {
    console.error(e);
  }
};

import apiRequest from "./index.js";

export const sendContactUsForm = async (formData) => {
  return apiRequest(`/general/contact-us`, "POST", formData);
};

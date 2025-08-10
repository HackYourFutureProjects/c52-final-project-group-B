import { refreshAccessToken } from "@/api/userAPI";

const apiRequest = async (
  endpoint,
  method = "GET",
  body = null,
  requiresAuth = false
) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));

    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (requiresAuth && user?.accessToken) {
      options.headers.Authorization = `Bearer ${user.accessToken}`;
    }

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`/api${endpoint}`, options);

    // if token is expired, refresh it and retry the request
    if (response.status === 401) {
      const newTokens = await refreshAccessToken(user?.refreshToken);

      if (newTokens) {
        localStorage.setItem("user", JSON.stringify(newTokens));
        options.headers.Authorization = `Bearer ${newTokens.accessToken}`;

        const res = await fetch(`/api${endpoint}`, options);

        return await res.json();
      }
      throw new Error("Session expired, please log in again.");
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Something went wrong");
    }

    return await response.json();
  } catch (e) {
    console.error("API Error:", e.message);
    throw e;
  }
};

export default apiRequest;

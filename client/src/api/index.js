// const BASE_URL =
//   import. .VITE_BACKEND_URL || "http://localhost:3000/api";

const apiRequest = async (endpoint, method = "GET", body = null) => {
  try {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`/api${endpoint}`, options);

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

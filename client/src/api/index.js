import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api";

const apiRequest = async (endpoint, method = "get", body = null) => {
  try {
    const res = await axios({
      method,
      data: body,
      url: `${BASE_URL}${endpoint}`,
      headers: {
        "Content-Type": "application/json",
        //...authorization token is coming
      },
    });
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export default apiRequest;

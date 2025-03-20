import axios from "axios";
const path = "http://localhost:8000";

const apiClient = axios.create({
  baseURL: path,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.log("Authentication error,check user is logided ");
      sessionStorage.clear();
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default apiClient;

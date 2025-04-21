import axios from "axios";
import { toast } from "react-hot-toast";

// Get API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL;

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: `${API_URL}/api/v1`,
});

// Add request interceptor to check token expiry
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      // Check if token is expired
      const decodedToken = parseJwt(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        logoutUser(); // Auto logout if token expired
        toast.error("Session expired. Please log in again.");
        throw new Error("Token expired");
      }

      config.headers["Authorization"] = token; // Attach token to headers
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Parse JWT to get expiry details
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

// Logout user when token expires
const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login"; // Redirect to login page
};

export default axiosInstance;

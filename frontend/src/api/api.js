import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "https://fruit-bounty-dmzs.onrender.com/api" 
});

// Response interceptor to handle session expiration
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear localStorage and redirect to login
      const message = error.response?.data?.message || "";
      if (message.includes("Session expired") || message.includes("expired") || message.includes("invalid")) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        window.location.href = "/admin/login";
      }
    }
    return Promise.reject(error);
  }
);

// const API = axios.create({
//   baseURL: ""
// });

//  APIs
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const getAllFruits = () => API.get("/fruits");
export const getSingleFruit = (id) => API.get(`/fruits/${id}`);

export default API;
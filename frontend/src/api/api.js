import axios from "axios";

// base URL (local + production)
const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

//  APIs
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);

export default API;
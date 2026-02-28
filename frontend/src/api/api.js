import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "https://fruit-bounty-dmzs.onrender.com/api" 
});

// const API = axios.create({
//   baseURL: ""
// });

//  APIs
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const getAllFruits = () => API.get("/fruits");
export const getSingleFruit = (id) => API.get(`/fruits/${id}`);

export default API;
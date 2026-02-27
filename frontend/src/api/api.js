import axios from "axios";

// const API = axios.create({
//   baseURL: "https://fruit-bounty-dmzs.onrender.com/api"
// });

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

//  APIs
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);

export default API;
import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import App from "./App.jsx";
import "./index.css";
import { CartProvider } from "./context/CartContext";
import AppErrorBoundary from "./components/AppErrorBoundary.jsx";

// Global axios interceptor to handle session expiration
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const message = error.response?.data?.message || "";
      if (
        message.includes("Session expired") ||
        message.includes("expired") ||
        message.includes("invalid") ||
        message.includes("not found")
      ) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        // Only redirect if not already on login page
        if (!window.location.pathname.includes("/login") && 
            !window.location.pathname.includes("/admin/login")) {
          window.location.href = "/admin/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppErrorBoundary>
      <CartProvider>
        <App />
      </CartProvider>
    </AppErrorBoundary>
  </React.StrictMode>
);

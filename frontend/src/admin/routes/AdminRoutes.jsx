import { Routes, Route } from "react-router-dom";
import AdminLayout from "../components/layout/AdminLayout";
import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import Orders from "../pages/Orders";
import Customers from "../pages/Customers";
import Payments from "../pages/Payments";
import Settings from "../pages/Settings";
import CustomizeBowl from "../pages/CustomizeBowl";
import Subscriptions from "../pages/Subscriptions";
import { Settings as SettingsIcon } from "lucide-react";
import Deliveries from "../pages/Deliveries";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children}) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  if (role !== "admin") {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="products" element={
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        } />
        <Route path="orders" element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        } />
        <Route path="customizebowl" element={
          <ProtectedRoute>
            <CustomizeBowl />
          </ProtectedRoute>
        } />
        <Route path="deliveries" element={
          <ProtectedRoute>
            <Deliveries />
          </ProtectedRoute>
        } />
        <Route path="customers" element={
          <ProtectedRoute>
            <Customers />
          </ProtectedRoute>
        } />
        <Route path="payments" element={
          <ProtectedRoute>
            <Payments />
          </ProtectedRoute>
        } />
        <Route path="settings" element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        } />
        <Route path="subscription" element={
          <ProtectedRoute>
            <Subscriptions />
          </ProtectedRoute>
        } />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;

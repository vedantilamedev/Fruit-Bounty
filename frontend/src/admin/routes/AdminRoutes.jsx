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
        <Route path="products" element={<Products />} />
        <Route path="orders" element={<Orders />} />
        <Route path="customizebowl" element={<CustomizeBowl />} />
        <Route path="deliveries" element={<Deliveries />} />
        <Route path="customers" element={<Customers />} />
        <Route path="payments" element={<Payments />} />
        <Route path="settings" element={<Settings />} />
        <Route path="subscription" element={<Subscriptions />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;

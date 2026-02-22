import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Menu, X } from "lucide-react";

const pageTitles = {
  "/admin": "Dashboard",
  "/admin/dashboard": "Dashboard",
  "/admin/orders": "Orders",
  "/admin/customers": "Customers",
  "/admin/products": "Products",
  "/admin/deliveries": "Deliveries",
  "/admin/payments": "Payments",
  "/admin/subscriptions": "Subscriptions",
  "/admin/settings": "Settings",
  "/admin/customize-bowl": "Customize Bowl",
};

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const getTitle = () => {
    return pageTitles[location.pathname] || "";
  };

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-[260px] min-h-screen sticky top-0 bg-white border-r">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setIsOpen(false)} />
          <div className="relative w-[260px] h-full bg-white shadow-lg">
            <Sidebar onLinkClick={() => setIsOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto min-h-screen">
        {/* Mobile Header with Hamburger and Title in same line */}
        <div className="md:hidden flex items-center gap-3 px-4 py-3 bg-white border-b sticky top-0 z-40">
          <button onClick={() => setIsOpen(true)} className="p-2 rounded-md bg-gray-100 border hover:bg-gray-200 flex-shrink-0">
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-bold text-gray-800 truncate">{getTitle()}</h1>
        </div>

        <div className="p-4 md:p-6 pt-0 md:pt-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;

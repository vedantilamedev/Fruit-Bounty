import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Menu } from "lucide-react";

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-[260px] min-h-screen sticky top-0 bg-white border-r">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsOpen(false)}
          />

          {/* Sidebar Drawer */}
          <div className="relative w-[260px] h-full bg-white shadow-lg">
            <Sidebar onLinkClick={() => setIsOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 overflow-y-auto min-h-screen">

        {/* Mobile Hamburger */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 rounded-md bg-white shadow border"
          >
            <Menu size={24} />
          </button>
        </div>

        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

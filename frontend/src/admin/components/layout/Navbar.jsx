import { X, Menu } from "lucide-react";
import { useLocation } from "react-router-dom";

const Navbar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const path = location.pathname;

  let pageName = path.split("/").pop();

  // 🔥 FIX: If route is /admin → show Dashboard
  if (pageName === "admin" || pageName === "") {
    pageName = "Admin Dashboard";
  }

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6">

      {/* Left */}
      <div className="flex items-center gap-3">

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 rounded-md hover:bg-gray-100 transition"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        <h2 className="text-lg font-semibold text-gray-800 capitalize">
          {pageName}
        </h2>
      </div>

      {/* Right */}
      <div className="hidden sm:block text-sm text-gray-500">
        {today}
      </div>

    </header>
  );
};

export default Navbar;

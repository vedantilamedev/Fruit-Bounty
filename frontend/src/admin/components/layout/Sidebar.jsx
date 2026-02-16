import {
  LayoutGrid,
  Package,
  ShoppingCart,
  Users,
  CreditCard,
  Settings,
  Package2,
  PackagePlus,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { label: "Dashboard", icon: LayoutGrid, path: "/admin" },
    { label: "Products", icon: Package, path: "/admin/products" },
    { label: "CustomizeBowl", icon: Package2, path: "/admin/customizebowl" },
    { label: "Deliveries", icon: PackagePlus, path: "/admin/deliveries" },
    { label: "Orders", icon: ShoppingCart, path: "/admin/orders" },
    { label: "Customers", icon: Users, path: "/admin/customers" },
    { label: "Payments", icon: CreditCard, path: "/admin/payments" },
    { label: "Settings", icon: Settings, path: "/admin/settings" },
  ];

  const handleLogout = () => {
    // TODO: Add your logout logic here
    console.log("Logout clicked");
    navigate("/login"); // Redirect to login page
  };

  return (
    <aside className="w-[260px] h-screen bg-[#427A43] text-white flex flex-col justify-between">

      {/* Top: Logo + Menu */}
      <div>
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-white/20">
          <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
            <Package size={20} />
          </div>
          <span className="text-lg font-semibold tracking-wide">FruitAdmin</span>
        </div>

        {/* Menu */}
        <div className="flex-1 px-4 py-6 space-y-1">
          {menuItems.map((item, i) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link key={i} to={item.path}>
                <div
                  className={`flex items-center gap-4 px-4 py-3 rounded-lg text-[15px] transition-all
                    ${isActive
                      ? "bg-white text-[#427A43] font-semibold shadow"
                      : "text-white/90 hover:bg-white/15"
                    }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom: Buttons + Copyright */}
      <div className="px-6 py-4 border-t border-white/20 flex flex-col gap-2">
        <Link to="/">
          <button className="w-full px-3 py-2 rounded-lg bg-white text-[#427A43] font-semibold hover:bg-white/90 transition">
            Go to Home
          </button>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full px-3 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition"
        >
          Logout
        </button>

        {/* Copyright */}
        <p className="mt-4 text-xs text-white/60 text-center">
          © Graphura India Pvt. Ltd.<br />All rights reserved
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;

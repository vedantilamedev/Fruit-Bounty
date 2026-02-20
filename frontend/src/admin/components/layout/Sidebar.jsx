import { Public, Subscriptions } from "@mui/icons-material";
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

const Sidebar = ({ onLinkClick }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { label: "Dashboard", icon: LayoutGrid, path: "/admin" },
    { label: "Products", icon: Package, path: "/admin/products" },
    { label: "CustomizeBowl", icon: Package2, path: "/admin/customizebowl" },
    { label: "Subscription", icon: Subscriptions, path: "/admin/subscription" },
    { label: "Deliveries", icon: PackagePlus, path: "/admin/deliveries" },
    { label: "Orders", icon: ShoppingCart, path: "/admin/orders" },
    { label: "Customers", icon: Users, path: "/admin/customers" },
    { label: "Payments", icon: CreditCard, path: "/admin/payments" },
    { label: "Settings", icon: Settings, path: "/admin/settings" },
  ];

  const handleLogout = () => {
    console.log("Logout clicked");
    navigate("/login");
  };

  return (
    <aside className="fixed left-0 top-0 w-[260px] h-screen bg-[#427A43] text-white flex flex-col justify-between z-50">

      {/* Top: Logo + Menu */}
      <div>
        {/* Logo */}
        <div className="flex items-center justify-center px-6 py-3 border-b border-white/20">
          <img
            src="/images/footerlogo.png"
            alt="Logo"
            className="w-28 object-contain"
          />
        </div>

        {/* Menu */}
        <div className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {menuItems.map((item, i) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={i}
                to={item.path}
                onClick={() => {
                  if (onLinkClick) onLinkClick();
                }}
              >
                <div
                  className={`flex items-center gap-4 px-4 py-3 rounded-lg text-[15px] transition-all
                    ${
                      isActive
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

      {/* Bottom */}
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

        <p className="mt-4 text-xs text-white/60 text-center">
          © Graphura India Pvt. Ltd.
          <br />
          All rights reserved
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;

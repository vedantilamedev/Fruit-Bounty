import { ShoppingBag, ShoppingCart, User, LogIn } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const token = localStorage.getItem("token");
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const [show, setShow] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [authOpen, setAuthOpen] = useState(false);
  const authDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (authDropdownRef.current && !authDropdownRef.current.contains(event.target)) {
        setAuthOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll && currentScroll > 100) {
        setShow(false);
        setAuthOpen(false);
      } else {
        setShow(true);
      }
      setLastScroll(currentScroll);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return (
    <header className={`hidden lg:block sticky top-0 z-40 transition-transform duration-300 ${show ? "translate-y-0" : "-translate-y-full"}`}>
      {/* Darker Gradient: No shadow, no border */}
      <nav className="w-full bg-gradient-to-r from-[#5a8c4f] via-[#4d8a43] to-[#8eb58a]">
        {/* Restored max-w-6xl and px-6 for original side padding */}
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">

          {/* LEFT: Logo & Nav Links */}
          <div className="flex items-center gap-10">
            <Link to="/">
              <img src="/images/footerlogo.png" alt="Logo" className="h-8 object-contain cursor-pointer" />
            </Link>

            <div className="flex gap-8 text-white font-medium">
              <div className="relative py-1">
                <Link
                  to="/"
                  className="transition-colors duration-200 hover:text-[#C9C27A]"
                  style={{ color: location.pathname === "/" ? "#C9C27A" : "white" }}
                >
                  Home
                </Link>
                {location.pathname === "/" && (
                  <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#C9C27A] rounded-full"></div>
                )}
              </div>

              <div className="relative py-1">
                <Link
                  to="/customize"
                  className="transition-colors duration-200 hover:text-[#C9C27A]"
                  style={{ color: location.pathname === "/customize" ? "#C9C27A" : "white" }}
                >
                  Customize your bowl
                </Link>
                {location.pathname === "/customize" && (
                  <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#C9C27A] rounded-full"></div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: Action Icons */}
          <div className="flex items-center gap-3">
            <Link to="/shop">
              <button className="w-10 h-10 bg-green-900 rounded-full flex items-center justify-center transition-colors duration-300 hover:bg-[#C9C27A] group">
                <ShoppingBag size={18} className="text-white group-hover:text-green-900 transition-colors" />
              </button>
            </Link>

            <Link to="/cart">
              <button className="w-10 h-10 bg-green-900 rounded-full flex items-center justify-center transition-colors duration-300 hover:bg-[#C9C27A] group relative">
                <ShoppingCart size={18} className="text-white group-hover:text-green-900 transition-colors" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                    {cart.length}
                  </span>
                )}
              </button>
            </Link>

            <div className="relative" ref={authDropdownRef}>
              <button
                onClick={() => setAuthOpen(!authOpen)}
                className="w-10 h-10 bg-green-900 rounded-full flex items-center justify-center transition-colors duration-300 hover:bg-[#C9C27A] group focus:outline-none"
              >
                <User size={18} className="text-white group-hover:text-green-900 transition-colors" />
              </button>

              {authOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl overflow-hidden z-50">
                  {!token ? (
                    <div className="p-2">
                      <Link to="/login" onClick={() => setAuthOpen(false)} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-[#C9C27A]/10 rounded-lg transition">
                        <LogIn size={16} className="text-[#C9C27A]" /> Register / Login
                      </Link>
                    </div>
                  ) : (
                    <div className="p-2 space-y-1">
                      <button onClick={() => { navigate("/dashboard"); setAuthOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-[#C9C27A]/10 rounded-lg transition">
                        <User size={16} className="text-[#C9C27A]" /> Dashboard
                      </button>
                      <button onClick={() => { localStorage.removeItem("token"); window.location.href = "/"; }} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-lg transition">
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>

  );
}

export default Navbar;
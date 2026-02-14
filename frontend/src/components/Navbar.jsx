import { ShoppingBag, User, LogIn, UserPlus } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [show, setShow] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [authOpen, setAuthOpen] = useState(false);
  const authDropdownRef = useRef(null);

  // Close dropdown when clicked outside
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
        setShow(false); // scrolling down
        setAuthOpen(false); // Close dropdown on scroll
      } else {
        setShow(true); // scrolling up
      }

      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return (
    <header className={`hidden lg:block sticky top-0 z-40 transition-transform duration-300 ${show ? "translate-y-0" : "-translate-y-full"}`}>
      <nav className="w-full bg-white shadow-md border-b border-green-100">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
          {/* LEFT */}
          <div className="flex items-center gap-10">
            <Link to="/">
              <img src="/images/footerlogo.png" alt="Fruits Bounty" className="h-8 object-contain cursor-pointer" />
            </Link>
            <div className="flex gap-8 text-gray-700 font-medium">
              <Link to="/" className="hover:text-green-700 transition cursor-pointer">Home</Link>
              <a className="hover:text-green-700 transition cursor-pointer">Customize Bowl</a>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center hover:bg-green-800 transition">
              <ShoppingBag size={18} color="white" />
            </button>

            {/* Profile Dropdown */}
            <div className="relative" ref={authDropdownRef}>
              <button onClick={() => setAuthOpen(!authOpen)} className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center hover:bg-green-800 transition focus:outline-none">
                <User size={18} color="white" />
              </button>

              {authOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-2xl border border-green-50 overflow-hidden z-50" data-aos="fade-down" data-aos-duration="300">
                  <div className="p-2">
                    <Link to="/login" onClick={() => setAuthOpen(false)} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-green-50 rounded-xl transition group">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-700 group-hover:bg-green-700 group-hover:text-white transition">
                        <LogIn size={16} />
                      </div>
                      <span className="font-semibold text-gray-700">Login</span>
                    </Link>

                    <Link to="/register" onClick={() => setAuthOpen(false)} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-green-50 rounded-xl transition group">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-700 group-hover:bg-green-700 group-hover:text-white transition">
                        <UserPlus size={16} />
                      </div>
                      <span className="font-semibold text-gray-700">Sign Up</span>
                    </Link>
                  </div>

                  <div className="border-t border-gray-100 p-2">
                    <Link to="/dashboard" onClick={() => setAuthOpen(false)} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-green-700 bg-green-50 rounded-xl hover:bg-green-100 transition">
                      <User size={16} />
                      Dashboard (Demo)
                    </Link>
                  </div>
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

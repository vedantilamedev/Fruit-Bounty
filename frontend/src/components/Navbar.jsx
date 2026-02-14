import { ShoppingBag, User } from "lucide-react";
import { useState, useEffect } from "react";

function Navbar() {
  const [show, setShow] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll && currentScroll > 100) {
        setShow(false); // scrolling down
      } else {
        setShow(true); // scrolling up
      }

      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return (
    <header
      className={`hidden lg:block sticky top-0 z-40 transition-transform duration-300 ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="w-full bg-white shadow-md border-b border-green-100">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
          {/* LEFT */}
          <div className="flex items-center gap-10">
            <img
              src="/images/footerlogo.png"
              alt="Fruits Bounty"
              className="h-8 object-contain"
            />

            <div className="flex gap-8 text-gray-700 font-medium">
              <a className="hover:text-green-700 transition cursor-pointer">
                Home
              </a>

              <a className="hover:text-green-700 transition cursor-pointer">
                Customize Bowl
              </a>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center hover:bg-green-800 transition">
              <ShoppingBag size={18} color="white" />
            </button>

            <button className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center hover:bg-green-800 transition">
              <User size={18} color="white" />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;

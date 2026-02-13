import { ShoppingBag, User } from "lucide-react";

function Navbar() {
  return (
    <div className="w-full flex justify-center mt-6">
      {/* Navbar Container */}
      <nav
        className="
        w-[95%] max-w-7xl
        bg-gradient-to-r from-green-300 to-green-500
        rounded-2xl
        px-8 py-4
        flex items-center justify-between
        shadow-lg
      "
      >
        {/* LEFT */}
        <div className="flex items-center gap-10">
          {/* Logo */}
          <div className="w-12 h-12 bg-green-700 rounded-full"></div>

          {/* Links */}
          <div className="flex gap-8 text-white font-medium">
            <a className="relative">
              Home
              <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-green-900"></span>
            </a>

            <a className="hover:opacity-80 cursor-pointer">
              Customize your bowl
            </a>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          <div
            className="
            w-12 h-12
            bg-green-700
            rounded-full
            flex items-center justify-center
            cursor-pointer
            hover:scale-110 transition
          "
          >
            <ShoppingBag color="white" size={20} />
          </div>

          <div
            className="
            w-12 h-12
            bg-green-700
            rounded-full
            flex items-center justify-center
            cursor-pointer
            hover:scale-110 transition
          "
          >
            <User color="white" size={20} />
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;

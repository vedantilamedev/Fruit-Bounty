import { Home, Salad, ShoppingBag, User } from "lucide-react";
import { Link } from "react-router-dom";

function MobileNavbar() {
  return (
    <div
      className="
        md:hidden
        fixed bottom-4 left-1/2 -translate-x-1/2
        w-[92%]
        bg-white/90 backdrop-blur-lg
        border border-green-100
        rounded-2xl
        shadow-2xl
        flex justify-around items-center
        py-3
        z-50
      "
    >
      <Link to="/" className="flex flex-col items-center text-gray-500 hover:text-green-700 transition active:text-green-800">
        <Home size={22} />
        <span className="text-xs mt-1">Home</span>
      </Link>

      <Link to="/customize" className="flex flex-col items-center text-gray-500 hover:text-green-700 transition active:text-green-800">
        <Salad size={22} />
        <span className="text-xs mt-1">Bowl</span>
      </Link>

      <Link to="/cart-page" className="flex flex-col items-center text-gray-500 hover:text-green-700 transition active:text-green-800">
        <ShoppingBag size={22} />
        <span className="text-xs mt-1">Cart</span>
      </Link>

      <Link to="/user-dashboard" className="flex flex-col items-center text-gray-500 hover:text-green-700 transition active:text-green-800">
        <User size={22} />
        <span className="text-xs mt-1">Profile</span>
      </Link>
    </div >
  );
}

export default MobileNavbar;

import { Home, Salad, Store, ShoppingCart, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function MobileNavbar() {
  const { cart } = useCart();

  // Define a consistent class for the hover/active scaling effects
  const linkStyles = "flex flex-col items-center text-gray-500 hover:text-green-700 transition-all duration-300 hover:scale-110 active:scale-95";

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
      {/* HOME */}
      <Link to="/" className={linkStyles}>
        <Home size={22} />
        <span className="text-[10px] mt-1">Home</span>
      </Link>

      {/* CUSTOMIZE BOWL */}
      <Link to="/customize" className={linkStyles}>
        <Salad size={22} />
        <span className="text-[10px] mt-1">Bowl</span>
      </Link>

      {/* SHOP - Path updated to /shop and icon to Store */}
      <Link to="/shop" className={linkStyles}>
        <Store size={22} />
        <span className="text-[10px] mt-1">Shop</span>
      </Link>

      {/* CART - Path updated to /cart */}
      <Link to="/cart" className={linkStyles}>
        <div className="relative">
          <ShoppingCart size={22} />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[8px] px-1.5 py-0.5 rounded-full font-bold">
              {cart.length}
            </span>
          )}
        </div>
        <span className="text-[10px] mt-1">Cart</span>
      </Link>

      {/* PROFILE/DASHBOARD - Path updated to /dashboard */}
      <Link to="/dashboard" className={linkStyles}>
        <User size={22} />
        <span className="text-[10px] mt-1">Profile</span>
      </Link>
    </div >
  );
}

export default MobileNavbar;
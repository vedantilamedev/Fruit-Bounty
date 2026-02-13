import { Home, Salad, ShoppingBag, User } from "lucide-react";

function MobileNavbar() {
  return (
    <div
      className="
        md:hidden
        fixed bottom-4 left-1/2 -translate-x-1/2
        w-[92%]
        bg-gradient-to-r from-green-300 to-green-500
        rounded-2xl
        shadow-2xl
        flex justify-around items-center
        py-4
        z-50
      "
    >
      {/* Home */}
      <button className="flex flex-col items-center text-white">
        <Home size={22} />
        <span className="text-xs mt-1">Home</span>
      </button>

      {/* Bowl */}
      <button className="flex flex-col items-center text-white/90">
        <Salad size={22} />
        <span className="text-xs mt-1">Bowl</span>
      </button>

      {/* Cart */}
      <button className="flex flex-col items-center text-white/90">
        <ShoppingBag size={22} />
        <span className="text-xs mt-1">Cart</span>
      </button>

      {/* Profile */}
      <button className="flex flex-col items-center text-white/90">
        <User size={22} />
        <span className="text-xs mt-1">Profile</span>
      </button>
    </div>
  );
}

export default MobileNavbar;

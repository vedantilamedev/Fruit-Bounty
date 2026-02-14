import { Home, Salad, ShoppingBag, User } from "lucide-react";

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
      <button className="flex flex-col items-center text-green-700">
        <Home size={22} />
        <span className="text-xs mt-1">Home</span>
      </button>

      <button className="flex flex-col items-center text-gray-500 hover:text-green-700 transition">
        <Salad size={22} />
        <span className="text-xs mt-1">Bowl</span>
      </button>

      <button className="flex flex-col items-center text-gray-500 hover:text-green-700 transition">
        <ShoppingBag size={22} />
        <span className="text-xs mt-1">Cart</span>
      </button>

      <button className="flex flex-col items-center text-gray-500 hover:text-green-700 transition">
        <User size={22} />
        <span className="text-xs mt-1">Profile</span>
      </button>
    </div>
  );
}

export default MobileNavbar;

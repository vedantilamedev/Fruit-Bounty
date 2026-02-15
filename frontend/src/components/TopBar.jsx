import { MapPin } from "lucide-react";

function TopBar({ onOpen }) {
  return (
    <div className="w-full bg-green-700 text-white text-sm relative z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-2">
        {/* Delivery Policy Message */}
        <p className="opacity-95">
          Orders placed today will be delivered tomorrow.
          <span className="ml-2 font-medium">
            Same-day delivery is not available.
          </span>
        </p>

        {/* Location Button */}
        <button
          onClick={onOpen}
          className="flex items-center gap-2 hover:opacity-80 transition"
        >
          <MapPin size={16} />
          <span className="font-medium">Select your location</span>
        </button>
      </div>
    </div>
  );
}

export default TopBar;

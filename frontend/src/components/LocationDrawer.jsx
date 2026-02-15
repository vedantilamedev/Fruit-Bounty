import { X, MapPin, Navigation } from "lucide-react";
import { useEffect } from "react";

function LocationDrawer({ open, onClose }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-all duration-300 z-50 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-full sm:w-[420px] bg-white z-[60]
        transform transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 h-full flex flex-col">
          {/* HEADER */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition"
            >
              <X size={20} />
            </button>

            <h2 className="text-lg font-semibold text-gray-800">
              Select Delivery Area
            </h2>

            <div className="w-8" />
          </div>

          {/* SEARCH */}
          <div className="relative mb-6">
            <MapPin
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search apartment, street or pincode"
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none transition"
            />
          </div>

          <div className="h-px bg-gray-200 mb-6" />

          {/* CURRENT LOCATION */}
          <button className="flex items-center gap-3 p-3 rounded-xl hover:bg-green-50 transition group">
            <div className="bg-green-100 p-2 rounded-full group-hover:bg-green-200 transition">
              <Navigation size={16} className="text-green-700" />
            </div>

            <div className="text-left">
              <p className="text-green-700 font-medium">
                Use my current location
              </p>
              <p className="text-xs text-gray-500">
                Automatically detect your address
              </p>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}

export default LocationDrawer;

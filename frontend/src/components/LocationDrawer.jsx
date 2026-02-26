import { X, MapPin, Navigation, CheckCircle, AlertCircle, Loader } from "lucide-react";
import { useEffect, useState } from "react";

const serviceablePincodes = ["110001", "110002", "110003", "110004", "110005"];

function LocationDrawer({ open, onClose }) {
  const [status, setStatus] = useState("idle");
  const [locationData, setLocationData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  // Reset on close
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    if (!open) {
      setStatus("idle");
      setLocationData(null);
      setErrorMsg("");
      setSearchQuery("");
      setSearchResult(null);
    }
  }, [open]);

  // --- IP AUTO-DETECT on drawer open ---
  useEffect(() => {
    if (!open) return;

    const detectByIP = async () => {
      try {
        const res = await fetch("https://ipinfo.io/json?token=f3b128b2daef45");
        const data = await res.json();

        if (data.postal) {
          const pincode = data.postal.replace(/\s/g, "");
          setSearchQuery(pincode);
          setSearchResult(serviceablePincodes.includes(pincode) ? "serviceable" : "not_serviceable");
        }
      } catch (err) {
        // silently fail
      }
    };

    detectByIP();
  }, [open]);

  // --- SEARCH HANDLER ---
  const handleSearchChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setSearchQuery(value);
    setSearchResult(null);

    if (value.length === 6) {
      setSearchResult(serviceablePincodes.includes(value) ? "serviceable" : "not_serviceable");
    }
  };

  const handleSearchConfirm = () => {
    localStorage.setItem("userPincode", searchQuery);
    window.dispatchEvent(new CustomEvent("pincodeUpdated")); // ✅ FIXED
    onClose();
  };

  // --- GPS HANDLER ---
  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      setStatus("error");
      setErrorMsg("Geolocation is not supported by your browser.");
      return;
    }

    setStatus("locating");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        setStatus("geocoding");
        const { latitude, longitude } = position.coords;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
            { headers: { "Accept-Language": "en" } }
          );
          const data = await res.json();

          const pincode = data.address?.postcode?.replace(/\s/g, "") || null;
          const displayAddress =
            [
              data.address?.road,
              data.address?.suburb,
              data.address?.city || data.address?.town || data.address?.village,
              data.address?.state,
            ]
              .filter(Boolean)
              .join(", ") || data.display_name;

          if (!pincode) {
            setStatus("error");
            setErrorMsg("Could not determine your pincode. Please search manually.");
            return;
          }

          setLocationData({ pincode, displayAddress });

          if (serviceablePincodes.includes(pincode)) {
            localStorage.setItem("userPincode", pincode);
            window.dispatchEvent(new CustomEvent("pincodeUpdated")); // ✅ FIXED
            setStatus("success");
          } else {
            setStatus("not_serviceable");
          }
        } catch (err) {
          setStatus("error");
          setErrorMsg("Failed to fetch address. Please check your internet connection.");
        }
      },
      (err) => {
        setStatus("error");
        if (err.code === 1) {
          setErrorMsg("Location access denied. Please allow location permission in your browser settings.");
        } else if (err.code === 2) {
          setErrorMsg("Location unavailable. Please search manually.");
        } else {
          setErrorMsg("Request timed out. Please try again.");
        }
      },
      { timeout: 10000 }
    );
  };

  const handleReset = () => {
    setStatus("idle");
    setLocationData(null);
    setErrorMsg("");
  };

  const isLoading = status === "locating" || status === "geocoding";

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
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition">
              <X size={20} />
            </button>
            <h2 className="text-lg font-semibold text-gray-800">Select Delivery Area</h2>
            <div className="w-8" />
          </div>

          {/* SEARCH INPUT */}
          <div className="relative mb-3">
            <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              inputMode="numeric"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Enter your 6-digit pincode"
              className={`w-full pl-12 pr-4 py-3 rounded-xl border outline-none transition focus:ring-2 ${
                searchResult === "serviceable"
                  ? "border-green-500 focus:ring-green-500 bg-green-50"
                  : searchResult === "not_serviceable"
                  ? "border-red-400 focus:ring-red-400 bg-red-50"
                  : "border-gray-300 focus:ring-green-600 focus:border-green-600"
              }`}
            />
          </div>

          {/* SEARCH FEEDBACK */}
          {searchResult === "serviceable" && (
            <div className="flex flex-col gap-2 mb-4">
              <div className="flex items-center gap-2 px-1">
                <CheckCircle size={15} className="text-green-600" />
                <p className="text-sm text-green-700 font-medium">
                  Delivery available for {searchQuery}!
                </p>
              </div>
              <button
                onClick={handleSearchConfirm}
                className="w-full py-3 rounded-xl bg-[#3d693d] text-white font-semibold hover:bg-[#2f5230] transition"
              >
                Deliver here
              </button>
            </div>
          )}

          {searchResult === "not_serviceable" && (
            <div className="flex items-center gap-2 px-1 mb-4">
              <AlertCircle size={15} className="text-red-500" />
              <p className="text-sm text-red-500">We don't deliver to {searchQuery} yet.</p>
            </div>
          )}

          <div className="h-px bg-gray-200 mb-6" />

          {/* CURRENT LOCATION BUTTON */}
          {status === "idle" && (
            <button
              onClick={handleCurrentLocation}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-green-50 transition group"
            >
              <div className="bg-green-100 p-2 rounded-full group-hover:bg-green-200 transition">
                <Navigation size={16} className="text-green-700" />
              </div>
              <div className="text-left">
                <p className="text-green-700 font-medium">Use my current location</p>
                <p className="text-xs text-gray-500">Automatically detect your address</p>
              </div>
            </button>
          )}

          {/* LOADING */}
          {isLoading && (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50">
              <div className="bg-green-100 p-2 rounded-full">
                <Loader size={16} className="text-green-700 animate-spin" />
              </div>
              <div>
                <p className="text-green-700 font-medium">
                  {status === "locating" ? "Getting your location…" : "Finding your address…"}
                </p>
                <p className="text-xs text-gray-500">This may take a few seconds</p>
              </div>
            </div>
          )}

          {/* GPS SUCCESS */}
          {status === "success" && locationData && (
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-green-50 border border-green-200">
                <CheckCircle size={20} className="text-green-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-green-700 font-semibold">Delivery available! 🎉</p>
                  <p className="text-sm text-gray-600 mt-1">{locationData.displayAddress}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Pincode: {locationData.pincode}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-[#3d693d] text-white font-semibold hover:bg-[#2f5230] transition"
              >
                Confirm Location
              </button>
              <button onClick={handleReset} className="text-sm text-gray-400 hover:text-gray-600 transition text-center">
                Choose a different location
              </button>
            </div>
          )}

          {/* GPS NOT SERVICEABLE */}
          {status === "not_serviceable" && locationData && (
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
                <AlertCircle size={20} className="text-amber-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-amber-700 font-semibold">Not serviceable yet</p>
                  <p className="text-sm text-gray-600 mt-1">{locationData.displayAddress}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Pincode: {locationData.pincode}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    We don't deliver to this area yet. Try searching a nearby pincode.
                  </p>
                </div>
              </div>
              <button
                onClick={handleReset}
                className="w-full py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition"
              >
                Search Another Location
              </button>
            </div>
          )}

          {/* ERROR */}
          {status === "error" && (
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200">
                <AlertCircle size={20} className="text-red-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-red-600 font-semibold">Location error</p>
                  <p className="text-sm text-gray-600 mt-1">{errorMsg}</p>
                </div>
              </div>
              <button
                onClick={handleReset}
                className="w-full py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition"
              >
                Try Again
              </button>
            </div>
          )}

        </div>
      </div>
    </>
  );
}

export default LocationDrawer;

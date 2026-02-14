import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

function TopBar() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const locations = [
    { name: "Jaipur", available: true },
    { name: "Delhi", available: false },
    { name: "Mumbai", available: false },
  ];

  // close dropdown when clicked outside
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="w-full bg-green-700 text-white text-sm relative z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-2">
        <p>
          We currently deliver only in{" "}
          <span className="font-semibold">Jaipur</span>
        </p>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-1 hover:opacity-80 transition"
          >
            Location <ChevronDown size={16} />
          </button>

          {open && (
            <div className="absolute right-0 mt-3 w-44 bg-white text-gray-700 rounded-xl shadow-xl overflow-hidden">
              {locations.map((loc, i) => (
                <div
                  key={i}
                  className={`px-4 py-3 text-sm ${
                    loc.available
                      ? "hover:bg-green-50 cursor-pointer"
                      : "text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {loc.name}
                  {!loc.available && (
                    <span className="text-xs ml-2">(Soon)</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TopBar;

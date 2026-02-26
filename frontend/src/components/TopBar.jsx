import { MapPin } from "lucide-react";
import { useState, useEffect } from "react";

function TopBar({ onOpen }) {
  const [displayText, setDisplayText] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  
  const fullText = "Orders placed today will be delivered tomorrow. Same-day delivery is not available.";
  const serviceablePincodes = ["110001", "110002", "110003", "110004", "110005"];

  useEffect(() => {
    const checkLocation = () => {
      const savedPincode = localStorage.getItem("userPincode");
      if (savedPincode && serviceablePincodes.includes(savedPincode)) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    checkLocation();
    window.addEventListener("storage", checkLocation);
    window.addEventListener("pincodeUpdated", checkLocation); // ✅ NEW
    return () => {
      window.removeEventListener("storage", checkLocation);
      window.removeEventListener("pincodeUpdated", checkLocation); // ✅ NEW
    };
  }, []);

  useEffect(() => {
    if (displayText.length < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayText(fullText.slice(0, displayText.length + 1));
      }, 70);
      return () => clearTimeout(timer);
    } else {
      const restartTimer = setTimeout(() => {
        setDisplayText("");
      }, 3000);
      return () => clearTimeout(restartTimer);
    }
  }, [displayText]);

  if (!isVisible) return null;

  return (
    <div className="w-full bg-[#3d693d] text-white sticky top-0 z-[60]">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 md:px-6 py-2.5">

        <p className="font-bold tracking-wide flex items-center text-[10px] sm:text-xs md:text-sm flex-1 mr-4">
          <span className="text-white leading-tight">{displayText}</span>
          <span className="ml-1 w-[2px] h-3 md:h-4 bg-[#C9C27A] animate-pulse shrink-0"></span>
        </p>

        <button
          onClick={onOpen}
          className="flex items-center gap-2 transition-all duration-300 hover:text-[#C9C27A] group shrink-0"
          aria-label="Select Location"
        >
          <div className="p-1.5 sm:p-0 bg-[#C9C27A]/10 sm:bg-transparent rounded-full">
            <MapPin size={18} className="text-[#C9C27A] group-hover:scale-110 transition-transform" />
          </div>
          <span className="hidden sm:inline font-bold border-b-2 border-transparent group-hover:border-[#C9C27A] text-sm">
            Select Location
          </span>
        </button>
      </div>
    </div>
  );
}

export default TopBar;

import { useEffect } from "react";
import { Link } from "react-router-dom";

const FruitNotFound404 = () => {
  // Reset scroll to top and lock body scroll to hide external scrollbars
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[9999] w-full h-screen bg-[#f8f9fa] flex flex-col items-center justify-center overflow-hidden"
      style={{
        backgroundImage: "url('/images/main-background.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Semi-transparent overlay to keep the focus on the card */}
      <div className="absolute inset-0 bg-white/20 pointer-events-none" />

      <div className="relative z-10 w-full max-w-[500px] px-6 flex flex-col items-center">
        
        {/* Image Card - Sized to ensure it fits mobile screens without scrolling */}
        <div className="w-full rounded-2xl border border-[#E8E4D9] bg-white/95 p-2 sm:p-4 shadow-2xl">
          <img
            src="/images/404-error.webp" 
            alt="404 error"
            className="w-full h-auto max-h-[40vh] sm:max-h-[50vh] rounded-xl object-contain mx-auto"
          />
        </div>

        {/* Action Button - Placed directly under the card */}
        <Link
          to="/"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-[#3C7E44] px-10 py-4 text-sm sm:text-lg font-bold text-white hover:bg-[#326938] active:scale-95 transition-all shadow-lg hover:shadow-[#3C7E44]/40"
        >
          Back to Fresh Starts
        </Link>
      </div>
    </div>
  );
};

export default FruitNotFound404;
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound404 = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#2D4F1E] flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#3C7E44] via-[#2D4F1E] to-[#1F3816] opacity-80"></div>
        <div className="absolute top-20 right-20 w-72 h-72 bg-[#4A9F5B] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div
          className="absolute bottom-20 left-20 w-72 h-72 bg-[#5AB56C] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* 404 Large Text */}
        <div className="mb-8">
          <h1 className="text-[150px] sm:text-[200px] lg:text-[250px] font-black text-white leading-none tracking-tighter">
            404
          </h1>
        </div>

        {/* Error Message */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
          Page Not Found
        </h2>

        <p className="text-lg sm:text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
          The page you are looking for doesn't exist or has been moved. Let's
          get you back on track!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#2D4F1E] rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
          >
            <Home size={22} />
            Go to Homepage
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-3 px-8 py-4 bg-transparent text-white border-2 border-white rounded-full font-bold text-lg hover:bg-white hover:text-[#2D4F1E] transition-all"
          >
            <ArrowLeft size={22} />
            Go Back
          </button>
        </div>

        {/* Additional Help Link */}
        <div className="mt-16">
          <p className="text-white/70 text-sm mb-3">Need assistance?</p>
          <Link
            to="/contactus"
            className="text-white font-semibold underline hover:text-white/80 transition"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound404;

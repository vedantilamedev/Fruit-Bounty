import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full h-[70vh] md:h-screen overflow-hidden bg-white">
      {/* 1. VIDEO LAYER */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          src="/videos/WA_1771952770188.mp4"
        />
      </div>

      {/* 2. BUTTON LAYER */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto">
        
        {/* DESKTOP BUTTON: Positioned specifically to overlap the video's prompt */}
        {/* Adjust 'top' and 'left' percentages if the video prompt is in a different spot */}
        <button
          onClick={() => navigate("/shop")}
          className="
            hidden md:block absolute
            top-[57%] left-[2%]
            px-12 py-4 
            bg-[#165c30] text-white 
            rounded-full text-lg 
            font-black uppercase tracking-widest 
            shadow-[0_20px_50px_rgba(22,92,48,0.4)]
            hover:bg-[#0d3d1f] hover:scale-105 
            active:scale-95 transition-all duration-300 
            border-2 border-[#c6b27a]/30
            animate-fade-in-delayed
          "
        >
          Taste Now →
        </button>

        {/* MOBILE BUTTON: Centered at the very bottom of the Hero section */}
        <div className="md:hidden absolute bottom-8 left-0 w-full flex justify-center">
          <button
            onClick={() => navigate("/shop")}
            className="
              px-10 py-3.5
              bg-[#165c30] text-white 
              rounded-full text-sm
              font-black uppercase tracking-widest 
              shadow-2xl active:scale-95 transition-all
              border-2 border-[#c6b27a]/40
            "
          >
            Taste Now →
          </button>
        </div>
      </div>

      {/* CUSTOM ANIMATION & STYLES */}
      <style>{`
        @keyframes fadeInDelayed {
          0% { opacity: 0; transform: translateY(10px); }
          70% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-delayed {
          /* This delay (e.g., 2s) ensures the button appears when the video prompt shows up */
          animation: fadeInDelayed 2.5s ease-out forwards;
        }
      `}</style>

      {/* 3. BLEND LAYER */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;
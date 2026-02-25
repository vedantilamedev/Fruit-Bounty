import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    /* CONTAINER LOGIC: 
       - Mobile: 'relative' allows the height to be defined by the video's natural aspect ratio.
       - Desktop: 'md:h-screen' maintains the fullscreen look.
    */
    <section className="relative w-full md:h-screen overflow-hidden bg-white">
      
      {/* 1. VIDEO LAYER */}
      <div className="relative md:absolute md:inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          /* Mobile: 'h-auto' ensures the video is fully visible without cropping.
             Desktop: 'object-cover' ensures it fills the monitor.
          */
          className="w-full h-auto md:h-full md:object-cover block"
          src="/videos/WA_1772006941269.mp4"
        />
      </div>

      {/* 2. BUTTON LAYER (Unified Positioning) */}
      <div className="absolute inset-0 z-10 w-full h-full max-w-7xl mx-auto pointer-events-none">
        
        {/* DESKTOP BUTTON */}
        <button
          onClick={() => navigate("/shop")}
          className="
            hidden md:block absolute pointer-events-auto
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

        {/* MOBILE BUTTON: Shrunk and matched to the desktop 'spot' */}
        <button
          onClick={() => navigate("/shop")}
          className="
            md:hidden absolute pointer-events-auto
            top-[57%] left-[4%]
            px-5 py-2
            bg-[#165c30] text-white 
            rounded-full text-[10px]
            font-black uppercase tracking-widest 
            shadow-lg active:scale-95 transition-all
            border border-[#c6b27a]/40
            animate-fade-in-delayed
          "
        >
          Taste Now →
        </button>
      </div>

      {/* CUSTOM ANIMATION */}
      <style>{`
        @keyframes fadeInDelayed {
          0% { opacity: 0; transform: translateY(10px); }
          70% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-delayed {
          animation: fadeInDelayed 2.5s ease-out forwards;
        }
      `}</style>

      {/* 3. BLEND LAYER - Removed on mobile to ensure zero extra space */}
      <div className="hidden md:block absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;
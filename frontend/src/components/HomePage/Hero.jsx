import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full relative overflow-hidden">
      {/* ================= DESKTOP ================= */}
      <div className="hidden lg:block relative w-full min-h-[calc(100vh-120px)]">
        {/* LEFT SIDE BACKGROUND */}
        <div className="absolute left-0 top-0 w-1/2 h-full bg-[#f7f5ef]" />

        {/* RIGHT GREEN SIDE */}
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-br from-[#3e7b3f] to-[#2f6131]" />

        {/* LEFT TEXT */}
        {/* LEFT TEXT - PREMIUM VERSION */}
        <div className="absolute left-0 top-0 w-1/2 h-full flex items-center pl-28">
          <div className="relative">
            {/* Accent Vertical Line */}
            <div className="absolute -left-6 top-2 w-[3px] h-40 bg-gradient-to-b from-[#c6b27a] to-transparent rounded-full opacity-70" />

            {/* Small Tagline */}
            <p className="text-sm tracking-[6px] text-gray-500 uppercase mb-6 font-['Poppins']">
              Fresh • Organic • Healthy
            </p>

            {/* YOUR */}
            <h1
              className="text-[96px] font-black leading-none tracking-tight 
      bg-gradient-to-r from-[#c6b27a] via-[#e0cf9c] to-[#b7a261] 
      bg-clip-text text-transparent 
      font-['Playfair_Display']
      drop-shadow-[0_8px_25px_rgba(0,0,0,0.15)]"
            >
              YOUR
            </h1>

            {/* Daily Dose */}
            <h2
              className="text-[60px] italic mt-2 
      bg-gradient-to-r from-[#c6b27a] to-[#b7a261]
      bg-clip-text text-transparent
      font-['Playfair_Display']"
            >
              Daily Dose
            </h2>

            {/* OF FRESHNESS */}
            <h3
              className="text-[44px] font-semibold mt-6 tracking-[4px] 
      text-[#9c8a55] font-['Poppins']"
            >
              OF FRESHNESS
            </h3>

            {/* CTA */}
            <button
              onClick={() => navigate("/shop")}
              className="mt-12 px-12 py-4 
      bg-gradient-to-r from-green-700 to-green-900 
      text-white rounded-full text-lg font-medium 
      shadow-[0_15px_30px_rgba(0,0,0,0.25)] 
      hover:scale-105 hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)]
      active:scale-95
      transition-all duration-300 ease-out"
            >
              Taste Now →
            </button>
          </div>
        </div>

        {/* CIRCLES */}
        <div className="absolute left-1/2 top-1/2 w-[700px] h-[700px] border border-white/20 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute left-1/2 top-1/2 w-[480px] h-[480px] border border-white/20 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        {/* HERO IMAGE */}
        <img
          src="/images/hero.png"
          alt="Hero"
          className="absolute left-1/2 top-1/2 w-[500px] -translate-x-1/2 -translate-y-1/2 drop-shadow-2xl animateHero"
        />

        {/* FLOATING SALADS */}
        <div className="absolute right-0 top-0 w-1/2 h-full">
          <img
            src="/images/salad1.png"
            className="absolute w-[190px] top-[8%] left-[28%] 
            float 
            transition-all duration-300 ease-out 
            hover:scale-110 
            hover:-translate-y-2 
            hover:rotate-2 
            hover:drop-shadow-2xl 
            cursor-pointer"
          />

          <img
            src="/images/salad2.png"
            className="absolute w-[190px] top-[32%] left-[42%] 
            float 
            transition-all duration-300 ease-out 
            hover:scale-110 
            hover:-translate-y-2 
            hover:-rotate-2 
            hover:drop-shadow-2xl 
            cursor-pointer"
          />

          <img
            src="/images/salad3.png"
            className="absolute w-[190px] top-[55%] left-[35%] 
            float 
            transition-all duration-300 ease-out 
            hover:scale-110 
            hover:-translate-y-2 
            hover:rotate-1 
            hover:drop-shadow-2xl 
            cursor-pointer"
          />

          <img
            src="/images/salad4.png"
            className="absolute w-[190px] top-[75%] left-[20%] 
            float 
            transition-all duration-300 ease-out 
            hover:scale-110 
            hover:-translate-y-2 
            hover:-rotate-1 
            hover:drop-shadow-2xl 
            cursor-pointer"
          />
        </div>
      </div>

      {/* ================= MOBILE ================= */}
      <div className="lg:hidden relative bg-[#efefef] flex flex-col items-center text-center px-5 pt-4 pb-16 overflow-hidden">
        <div className="absolute w-[420px] h-[420px] border border-gray-300 rounded-full opacity-30 top-[-120px]" />

        <img
          src="/images/hero.png"
          alt="Hero"
          className="w-[280px] mb-6 drop-shadow-2xl animate-[heroPop_.7s_ease]"
        />

        <h1 className="text-[40px] font-black text-[#b7aa6a] leading-none font-['Playfair_Display']">
          YOUR
        </h1>

        <h2 className="text-[28px] italic text-[#b7aa6a] font-['Playfair_Display']">
          Daily Dose
        </h2>

        <h3 className="text-[20px] font-semibold text-[#b7aa6a] mb-6 font-['Poppins']">
          OF FRESHNESS
        </h3>

        <button
          onClick={() => navigate("/shop")}
          className="bg-[#165c30] text-white px-8 py-3 rounded-full shadow-lg 
          hover:scale-105 transition-all duration-300"
        >
          Taste Now
        </button>
      </div>

      <style>{`
        @keyframes heroEnter {
          from {
            transform: translate(-50%, -50%) scale(.85);
            opacity: 0;
          }
          to {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
        }

        .animateHero {
          animation: heroEnter .9s ease forwards;
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
          100% { transform: translateY(0px); }
        }

        .float {
          animation: float 5s ease-in-out infinite;
        }

        @keyframes heroPop {
          from {
            opacity: 0;
            transform: scale(.85);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;

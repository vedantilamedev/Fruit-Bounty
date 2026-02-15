import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full relative overflow-hidden">
      {/* ================= DESKTOP ================= */}
      {/* HEIGHT thoda increase kiya */}
      <div className="hidden lg:block relative w-full min-h-[calc(100vh-120px)]">
        {/* LEFT SIDE BACKGROUND */}
        <div className="absolute left-0 top-0 w-1/2 h-full bg-[#f7f5ef]" />

        {/* RIGHT GREEN SIDE */}
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-br from-[#3e7b3f] to-[#2f6131]" />

        {/* LEFT TEXT */}
        <div className="absolute left-0 top-0 w-1/2 h-full flex items-center pl-24">
          <div>
            <h1 className="text-[88px] font-black text-[#b7a261] leading-none">
              YOUR
            </h1>

            <h2 className="text-[52px] italic text-[#b7a261] mt-2">
              Daily Dose
            </h2>

            <h3 className="text-[40px] font-bold text-[#b7a261] mt-4">
              OF FRESHNESS
            </h3>

            <button
              onClick={() => navigate("/shop")}
              className="mt-10 px-10 py-4 bg-green-800 text-white rounded-full text-lg shadow-lg hover:scale-105 transition"
            >
              Taste Now
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
          className="absolute left-1/2 top-1/2 w-[480px] -translate-x-1/2 -translate-y-1/2 drop-shadow-2xl animateHero"
        />

        {/* FLOATING SALADS */}

        <div className="absolute right-0 top-0 w-1/2 h-full pointer-events-none">
          <img
            src="/images/salad1.png"
            className="absolute w-[190px] top-[8%] left-[28%] float"
          />

          <img
            src="/images/salad2.png"
            className="absolute w-[190px] top-[32%] left-[42%] float"
          />

          <img
            src="/images/salad3.png"
            className="absolute w-[190px] top-[55%] left-[35%] float"
          />

          <img
            src="/images/salad4.png"
            className="absolute w-[190px] top-[75%] left-[20%] float"
          />
        </div>
      </div>

      {/* ================= MOBILE ================= */}
      <div className="lg:hidden relative bg-[#efefef] flex flex-col items-center text-center px-5 pt-4 pb-16 overflow-hidden">
        <div className="absolute w-[420px] h-[420px] border border-gray-300 rounded-full opacity-30 top-[-120px]" />

        <img
          src="/images/hero.png"
          alt="Hero"
          className="w-[270px] mb-6 drop-shadow-2xl animate-[heroPop_.7s_ease]"
        />

        <h1 className="text-[38px] font-black text-[#b7aa6a] leading-none">
          YOUR
        </h1>

        <h2 className="text-[28px] italic text-[#b7aa6a] font-serif">
          Daily Dose
        </h2>

        <h3 className="text-[18px] font-extrabold text-[#b7aa6a] mb-6">
          OF FRESHNESS
        </h3>

        <button
          onClick={() => navigate("/shop")}
          className="bg-[#165c30] text-white px-8 py-3 rounded-full shadow-lg"
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

import React from "react";

const Hero = () => {
  return (
    <section className="w-full px-4 lg:px-6">
      {/* ================= DESKTOP ================= */}
      <div className="hidden lg:block relative mx-auto w-[92%] max-w-6xl h-[620px] bg-white rounded-[32px] overflow-hidden shadow-2xl">
        {/* LEFT TEXT */}
        <div className="absolute left-0 top-0 w-1/2 h-full flex items-center pl-20">
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

            <button className="mt-10 px-10 py-4 bg-green-800 text-white rounded-full text-lg shadow-lg hover:scale-105 transition">
              Taste Now
            </button>
          </div>
        </div>

        {/* GREEN SIDE */}
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-br from-[#3e7b3f] to-[#2f6131] rounded-r-[32px]" />

        {/* CIRCLES */}
        <div className="absolute left-1/2 top-1/2 w-[700px] h-[700px] border border-white/20 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        <div className="absolute left-1/2 top-1/2 w-[480px] h-[480px] border border-white/20 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        {/* HERO IMAGE */}
        <img
          src="/images/hero.png"
          alt="Hero"
          className="absolute left-1/2 top-1/2 w-[480px] -translate-x-1/2 -translate-y-1/2 drop-shadow-2xl animateHero"
        />

        {/* SALADS */}
        <img
          src="/images/salad1.png"
          alt="Salad 1"
          className="absolute w-[210px] top-[50px] right-[240px] float"
        />

        <img
          src="/images/salad2.png"
          alt="Salad 2"
          className="absolute w-[210px] top-[180px] right-[80px] float"
        />

        <img
          src="/images/salad3.png"
          alt="Salad 3"
          className="absolute w-[210px] bottom-[180px] right-[110px] float"
        />

        <img
          src="/images/salad4.png"
          alt="Salad 4"
          className="absolute w-[210px] bottom-[50px] right-[260px] float"
        />
      </div>

      {/* ================= MOBILE ================= */}
      <div className="lg:hidden relative bg-[#efefef] rounded-[28px] flex flex-col items-center text-center px-5 pt-10 pb-16 overflow-hidden shadow-xl">
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

        <button className="bg-[#165c30] text-white px-8 py-3 rounded-full shadow-lg">
          Taste Now
        </button>
      </div>

      {/* ================= ANIMATIONS ================= */}
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

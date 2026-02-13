import React from "react";

const Hero = () => {
  return (
    <section className="w-full px-4 lg:px-6 mt-4 lg:mt-8">
      {/* ================= DESKTOP ================= */}
      <div className="hidden lg:block relative mx-auto w-full max-w-[1400px] h-[620px] bg-white rounded-[40px] overflow-hidden shadow-xl">
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
        <div className="absolute right-0 top-0 w-1/2 h-full bg-[#3e7b3f] rounded-r-[40px]" />

        {/* CENTER CIRCLES (MIDDLE OF HERO) */}
        <div className="absolute left-1/2 top-1/2 w-[720px] h-[720px] border border-white/25 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        <div className="absolute left-1/2 top-1/2 w-[520px] h-[520px] border border-white/20 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        {/* HERO IMAGE */}
        <img
          src="/images/hero.png"
          className="absolute left-1/2 top-1/2 w-[500px] -translate-x-1/2 -translate-y-1/2 drop-shadow-2xl animateHero"
        />

        {/* SALADS — positioned around circle */}

        <img
          src="/images/salad1.png"
          className="absolute w-[230px] top-[40px] right-[260px] float"
        />

        <img
          src="/images/salad2.png"
          className="absolute w-[230px] top-[170px] right-[90px] float"
        />

        <img
          src="/images/salad3.png"
          className="absolute w-[230px] bottom-[170px] right-[130px] float"
        />

        <img
          src="/images/salad4.png"
          className="absolute w-[230px] bottom-[40px] right-[280px] float"
        />
      </div>

      {/* ================= MOBILE ================= */}

      <div className="lg:hidden relative bg-[#efefef] rounded-[30px] flex flex-col items-center text-center px-5 pt-10 pb-16 overflow-hidden">
        {/* subtle circle */}
        <div className="absolute w-[420px] h-[420px] border border-gray-300 rounded-full opacity-40 top-[-120px]" />

        {/* HERO IMAGE */}
        <img
          src="/images/hero.png"
          className="w-[270px] mb-6 drop-shadow-2xl animate-[heroPop_.7s_ease]"
        />

        {/* TEXT */}
        <h1 className="text-[38px] font-black text-[#b7aa6a] leading-none">
          YOUR
        </h1>

        <h2 className="text-[28px] italic text-[#b7aa6a] font-serif">
          Daily Dose
        </h2>

        <h3 className="text-[18px] font-extrabold text-[#b7aa6a] mb-6">
          OF FRESHNESS
        </h3>

        {/* CTA */}
        <button className="bg-[#165c30] text-white px-8 py-3 rounded-full shadow-lg">
          Taste Now
        </button>
      </div>

      {/* ================= ANIMATIONS ================= */}

      <style>{`

        @keyframes heroEnter {
          from{
            transform:translate(-50%,-50%) scale(.85);
            opacity:0;
          }
          to{
            transform:translate(-50%,-50%) scale(1);
            opacity:1;
          }
        }

        .animateHero{
          animation:heroEnter .9s ease forwards;
        }

        @keyframes float {
          0%{ transform:translateY(0px); }
          50%{ transform:translateY(-12px); }
          100%{ transform:translateY(0px); }
        }

        .float{
          animation: float 5s ease-in-out infinite;
        }

        @keyframes heroPop{
          from{
            opacity:0;
            transform:scale(.85);
          }
          to{
            opacity:1;
            transform:scale(1);
          }
        }

      `}</style>
    </section>
  );
};

export default Hero;

import React from "react";
import { useNavigate } from "react-router-dom";
import { FaLeaf, FaTruck, FaAppleAlt } from "react-icons/fa";

const Hero = () => {
  const navigate = useNavigate();

  const sideBowls = [
    { id: 1, img: "/images/salad1.png", top: "12%", left: "55%", delay: "0s" },
    { id: 2, img: "/images/salad2.png", top: "32%", left: "68%", delay: "0.5s" },
    { id: 3, img: "/images/salad3.png", top: "58%", left: "68%", delay: "1s" },
    { id: 4, img: "/images/salad4.png", top: "78%", left: "55%", delay: "1.5s" },
  ];

  return (
    <section className="relative w-full min-h-fit lg:min-h-screen overflow-hidden flex flex-col items-center justify-start lg:justify-center">

      {/* DESKTOP BACKGROUND */}
      <div
        className="hidden lg:block absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-bg.PNG')" }}
      />

      {/* MOBILE BACKGROUND */}
      <div className="lg:hidden absolute inset-0 z-0 bg-[#fdfbf4]" />

      {/* MAIN CENTER BOWL (Desktop Only) */}
      <img
        src="/images/hero.png"
        alt="Main Featured Bowl"
        className="absolute z-20 left-1/2 top-1/2 w-[520px] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_35px_50px_rgba(0,0,0,0.5)] animateHero pointer-events-none hidden lg:block"
      />

      {/* CONTENT WRAPPER */}
      <div className="relative z-30 w-full max-w-7xl flex flex-col lg:flex-row items-center h-full px-6 lg:px-20">

        {/* LEFT SECTION: Desktop CTA */}
        <div className="hidden lg:flex w-1/2 flex-col items-start h-full">
          <div className="absolute top-[58%] flex flex-col items-center text-center">
            <button
              onClick={() => navigate("/shop")}
              className="px-14 py-4 bg-[#165c30] text-white rounded-full text-lg font-black uppercase tracking-widest shadow-lg hover:bg-[#0d3d1f] hover:scale-110 transition-all duration-300 border-2 border-[#c6b27a]/30"
            >
              Taste Now →
            </button>

            <div className="flex gap-6 mt-8 animate-fade-in">
              {[
                { icon: <FaLeaf />, label: "Organic" },
                { icon: <FaAppleAlt />, label: "Fresh" },
                { icon: <FaTruck />, label: "Fast" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center group">
                  <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-[#165c30] text-xl border-2 border-[#c6b27a] transition-transform group-hover:scale-110">
                    {item.icon}
                  </div>
                  <span className="text-[10px] mt-2 font-bold text-[#165c30] uppercase">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="w-full lg:w-1/2 relative flex flex-col items-center justify-center min-h-fit lg:min-h-screen">

          {/* DESKTOP SIDE BOWLS */}
          <div className="hidden lg:block absolute inset-0">
            {sideBowls.map((bowl) => (
              <div
                key={bowl.id}
                className="absolute cursor-pointer z-30 transition-all duration-500 hover:scale-110 hover:rotate-6 group"
                style={{
                  top: bowl.top,
                  left: bowl.left,
                  animation: `float 5s ease-in-out infinite`,
                  animationDelay: bowl.delay,
                }}
              >
                <img
                  src={bowl.img}
                  alt="Side Bowl"
                  className="w-48 xl:w-56 drop-shadow-xl group-hover:drop-shadow-[0_20px_30px_rgba(0,0,0,0.4)]"
                />
              </div>
            ))}
          </div>

          {/* MOBILE CONTENT */}
          <div className="lg:hidden flex flex-col items-center w-full max-w-[500px] gap-4 mt-6 pb-4">
            <div className="w-full px-4">
              <img
                src="/images/mobile-hero.png"
                alt="Healthy Lifestyle Collage"
                className="w-full rounded-2xl shadow-2xl animate-fade-in border-4 border-white"
              />
            </div>

            <button
              onClick={() => navigate("/shop")}
              className="w-[80%] max-w-[280px] py-3 bg-[#165c30] text-white rounded-full text-sm font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all border-2 border-[#c6b27a]/40"
            >
              Taste Now →
            </button>
          </div>
        </div>
      </div>

      {/* ANIMATIONS */}
      <style>{`
        @keyframes heroEnter {
          from { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
          to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animateHero { animation: heroEnter 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
      `}</style>
    </section>
  );
};

export default Hero;
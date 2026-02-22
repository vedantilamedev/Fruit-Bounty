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
    <section className="relative w-full overflow-hidden flex flex-col items-center justify-start -mt-4">

      {/* DESKTOP BACKGROUND */}
      <div
        className="hidden lg:block absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-bg.PNG')" }}
      />

      {/* MOBILE BACKGROUND */}
      <div className="lg:hidden absolute inset-0 z-0 bg-[#fdfbf4]" />

      {/* MAIN DESKTOP BOWL */}
      <img
        src="/images/hero.png"
        alt="Main Featured Bowl"
        className="absolute z-20 left-1/2 top-1/2 w-[520px] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_35px_50px_rgba(0,0,0,0.5)] animateHero pointer-events-none hidden lg:block"
      />

      {/* CONTENT WRAPPER */}
      <div className="relative z-30 w-full max-w-7xl flex flex-col lg:flex-row items-center h-full px-6 lg:px-20">

        {/* LEFT DESKTOP CTA */}
        <div className="hidden lg:flex w-1/2 flex-col items-start h-full">
          <div className="absolute top-[58%]">
            <button
              onClick={() => navigate("/shop")}
              className="px-14 py-4 bg-[#165c30] text-white rounded-full text-lg font-black uppercase tracking-widest shadow-lg hover:bg-[#0d3d1f] hover:scale-110 transition-all duration-300 border-2 border-[#c6b27a]/30"
             >
              Taste Now →
            </button>

            <div className="flex gap-6 mt-10 animate-fade-in">
              {[
                { icon: <FaLeaf />, label: "Organic" },
                { icon: <FaAppleAlt />, label: "Fresh" },
                { icon: <FaTruck />, label: "Fast" }
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
        <div className="w-full lg:w-1/2 relative flex flex-col items-center justify-center min-h-[500px] lg:min-h-screen">

          {/* DESKTOP FLOATING BOWLS */}
          <div className="hidden lg:block absolute inset-0">
            {sideBowls.map((bowl) => (
              <div
                key={bowl.id}
                className="absolute cursor-pointer z-30 transition-all duration-500 hover:scale-110 hover:rotate-6 group"
                style={{
                  top: bowl.top,
                  left: bowl.left,
                  animation: `float 5s ease-in-out infinite`,
                  animationDelay: bowl.delay
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

         {/* MOBILE HERO (NO CARD, NO GAP) */}
      <div className="lg:hidden relative w-full overflow-visible h-[55vh] flex justify-center -mt-6">
        <div className="relative w-full">

          {/* Mint */}
          <img
            src="/images/hero-mint.png"
            alt="mint"
            className="absolute top-[9%] left-[5%] w-[95px] rotate-7 animate-float z-0 drop-shadow-[0_25px_35px_rgba(0,0,0,0.35)]"
          />

          {/* Walnut */}
          <img
            src="/images/hero-walnut.png"
            alt="Walnut"
            className="absolute top-[84%] left-[75%] w-[90px] rotate-10 animate-float z-0 drop-shadow-[0_30px_40px_rgba(0,0,0,0.4)]"
          />
           <img
                      src="/images/hero.kiwi.png"
                      alt="kiwi"
                      className="absolute top-[50%] left-[90%] w-[60px] rotate-10 animate-float z-0 drop-shadow-[0_30px_40px_rgba(0,0,0,0.4)]"
                    />

{/*           Pista */}
          <img
            src="/images/hero-pista.png"
            alt="Pista"
            className="absolute top-[75%] left-[6%] w-[75px] rotate-10 animate-float z-0 drop-shadow-[0_35px_45px_rgba(0,0,0,0.6)]"
          />


          {/* Strawberry */}
          <img
            src="/images/hero-staw.png"
            alt="strawberry"
            className="absolute top-[16%] left-[70%] w-[80px] rotate-10 animate-float z-0 drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
          />

          {/* MAIN SALAD */}
          <img
            src="/images/home-salad.png"
            alt="Fruit Salad Hero"
            className="w-[79%] mx-auto object-cover -translate-y-16 animate-float z-10 drop-shadow-[0_40px_60px_rgba(0,0,0,0.70)]"
          />

             {/* FLOATING CTA */}
             <button
               onClick={() => navigate("/shop")}
               className="absolute left-2/4 -bottom-1 -translate-x-1/2 bg-yellow-400 text-white font-black uppercase tracking-wide px-6 py-3 rounded-full shadow-xl flex items-center gap-2 active:scale-95 transition-all"
             >
               <span className="w-7 h-7 rounded-full bg-white text-yellow-500 flex items-center justify-center text-sm">
                 →
               </span>
               Taste Now
             </button>

           </div>
         </div>

        </div>
      </div>

      {/* ANIMATIONS */}
      <style>{`

        @keyframes heroEnter {
          from { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
          to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
    @keyframes floatImage {
      0%, 100% { transform: translateY(-16px); }
      50% { transform: translateY(-26px); }
    }
    .animate-float {
      animation: floatImage 2s ease-in-out infinite;
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
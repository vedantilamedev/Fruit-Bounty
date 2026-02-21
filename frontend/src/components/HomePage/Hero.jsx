import React from "react";
import { useNavigate } from "react-router-dom";
import { FaLeaf, FaTruck, FaAppleAlt } from "react-icons/fa";

const Hero = () => {
  const navigate = useNavigate();

  // The four perimeter bowls following the background arc
  const sideBowls = [
    { id: 1, img: "/images/salad1.png", top: "12%", left: "55%", delay: "0s" },
    { id: 2, img: "/images/salad2.png", top: "32%", left: "68%", delay: "0.5s" },
    { id: 3, img: "/images/salad3.png", top: "58%", left: "68%", delay: "1s" },
    { id: 4, img: "/images/salad4.png", top: "78%", left: "55%", delay: "1.5s" },
  ];

  return (
    <section className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center">
      
      {/* DESKTOP BACKGROUND: Original Image */}
      <div 
        className="hidden lg:block absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-bg.PNG')" }}
      />

      {/* MOBILE BACKGROUND: Golden Gradient */}
      <div className="lg:hidden absolute inset-0 z-0 bg-gradient-to-b from-[#f7f5ef] via-[#e0cf9c] to-[#b7a261]" />

      {/* MAIN CENTER BOWL (Restored from original code) */}
      <img
        src="/images/hero.png"
        alt="Main Featured Bowl"
        className="absolute z-20 left-1/2 top-1/2 w-[350px] md:w-[450px] lg:w-[520px] 
        -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_35px_50px_rgba(0,0,0,0.5)] 
        animateHero pointer-events-none hidden lg:block"
      />

      {/* CONTENT WRAPPER */}
      <div className="relative z-30 w-full max-w-7xl flex flex-col lg:flex-row items-center h-full px-6 lg:px-20">
        
        {/* LEFT SECTION: ACTION & ICONS */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start space-y-8 lg:space-y-0 h-full">
          
          {/* CTA BUTTON: Aligned with 3rd bowl level */}
          <div className="lg:absolute lg:top-[58%] order-1">
            <button
              onClick={() => navigate("/shop")}
              className="px-14 py-4 bg-[#165c30] text-white rounded-full text-lg font-black uppercase tracking-widest
              shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:bg-[#0d3d1f] hover:scale-110 
              transition-all duration-300 ease-in-out active:scale-95 border-2 border-[#c6b27a]/30"
            >
              Taste Now →
            </button>

            {/* ICONS: Now placed directly BELOW the button */}
            <div className="flex gap-6 mt-10 animate-fade-in justify-center lg:justify-start">
              {[
                { icon: <FaLeaf />, label: "Organic" },
                { icon: <FaAppleAlt />, label: "Fresh" },
                { icon: <FaTruck />, label: "Fast" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center group">
                  <div className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-[#165c30] text-xl border-2 border-[#c6b27a] transition-transform group-hover:scale-110">
                    {item.icon}
                  </div>
                  <span className="text-[10px] mt-2 font-bold text-[#165c30] uppercase tracking-tighter">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SECTION: SIDE BOWLS */}
        <div className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-screen order-2">
          
          {/* DESKTOP: Arc Layout */}
          <div className="hidden lg:block absolute inset-0">
            {sideBowls.map((bowl) => (
              <div
                key={bowl.id}
                className="absolute cursor-pointer group"
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
                  className="w-48 xl:w-56 drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                />
              </div>
            ))}
          </div>

          {/* MOBILE: Floating Grid (for responsiveness) */}
          <div className="lg:hidden grid grid-cols-2 gap-6 p-6 mt-10">
            {sideBowls.map((bowl) => (
              <div key={bowl.id} className="animate-float" style={{ animationDelay: bowl.delay }}>
                <img src={bowl.img} alt="Bowl" className="w-full drop-shadow-xl" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes heroEnter {
          from { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
          to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animateHero {
          animation: heroEnter 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fade-in 1.2s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Hero;
import { useEffect, useRef, useState } from "react";
import { Sprout, HeartPulse, Salad, Leaf, ShieldCheck, Zap } from "lucide-react";

function WhatIsFruitSalad() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const features = [
    { pos: "lg:top-[-10%] lg:left-[10%]", orbit: "orbit-1", icon: <Sprout size={20} />, title: "100% Natural", desc: "Preservative-free fruits." },
    { pos: "lg:top-[25%] lg:left-[-5%]", orbit: "orbit-2", icon: <HeartPulse size={20} />, title: "Vitamin Rich", desc: "Essential antioxidants." },
    { pos: "lg:bottom-[5%] lg:left-[8%]", orbit: "orbit-3", icon: <ShieldCheck size={20} />, title: "Pure Nutrition", desc: "No artificial sugars." },
    { pos: "lg:top-[-5%] lg:right-[10%]", orbit: "orbit-4", icon: <Leaf size={20} />, title: "Freshly Prepared", desc: "Cut and mixed daily." },
    { pos: "lg:top-[30%] lg:right-[-5%]", orbit: "orbit-5", icon: <Zap size={20} />, title: "Daily Energy", desc: "Supports immunity." },
    { pos: "lg:bottom-[10%] lg:right-[10%]", orbit: "orbit-6", icon: <Salad size={20} />, title: "Peak Taste", desc: "Peak flavor delivery." },
  ];

  return (
    /* Reduced bottom padding: changed from py-12 md:py-24 to pt-12 pb-6 md:pt-24 md:pb-12 */
    <section ref={sectionRef} className="relative pt-12 pb-6 md:pt-24 md:pb-12 px-4 overflow-hidden bg-[#FBF8F2]">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: `url('/images/main-background.webp')`, backgroundSize: '400px' }}></div>

      <div className={`relative z-10 text-center max-w-2xl mx-auto mb-10 md:mb-20 transition-all duration-1000 ${visible ? "opacity-100" : "opacity-0"}`}>
        <h2 className="text-3xl md:text-6xl font-black text-gray-900 tracking-tight">Why is it so Delicious?</h2>
        <div className="w-16 h-1 bg-[#2D5A27] mx-auto mt-3 rounded-full"></div>
      </div>

      {/* Reduced min-height from 450px/600px to 350px/500px to tighten the layout */}
      <div className="relative z-10 max-w-5xl mx-auto min-h-[350px] md:min-h-[500px] flex items-center justify-center">
        
        {/* Center Image - Heartbeat */}
        <div className={`relative z-10 transition-all duration-1000 ${visible ? "scale-100 opacity-100" : "scale-75 opacity-0"}`}>
          <div className="absolute inset-0 bg-[#C9C27A]/20 blur-[50px] md:blur-[120px] rounded-full scale-110 animate-pulse"></div>
          
          <div className="relative w-44 h-44 md:w-80 md:h-80 lg:w-[480px] lg:h-[480px] flex items-center justify-center animate-heartbeat">
            <img 
              src="/images/—Pngtree—mixed-fruits.webp" 
              alt="Fresh Salad" 
              className="w-full h-full object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.1)]" 
            />
          </div>
        </div>

        {/* Features: Orbiting on Mobile | Floating on Desktop */}
        {features.map((item, i) => (
          <div 
            key={i} 
            className={`
              absolute ${item.pos} 
              flex flex-col items-center 
              transition-all duration-1000 
              ${visible ? "opacity-100" : "opacity-0"}
              ${item.orbit}
            `}
          >
            <div 
              className="
                bg-white/50 backdrop-blur-lg rounded-full lg:rounded-[2.5rem] shadow-xl border border-white/80
                p-2.5 lg:p-5
                hover:shadow-[0_15px_30px_rgba(201,194,122,0.4)] 
                hover:border-[#C9C27A] hover:-translate-y-2 
                transition-all duration-500 cursor-pointer
                lg:animate-float group relative z-20
              "
              style={{ animationDelay: `${i * 0.5}s` }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#C9C27A] flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform">
                  <div className="scale-75 md:scale-100">{item.icon}</div>
                </div>
                
                {/* Text only visible on Desktop */}
                <div className="hidden lg:block">
                  <span className="text-[11px] font-black text-gray-900 uppercase tracking-widest block">{item.title}</span>
                  <p className="text-gray-500 text-[10px] font-semibold leading-tight max-w-[140px]">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        /* Mobile Circular Orbit with Radius (140px) */
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(140px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(140px) rotate(-360deg); }
        }

        .animate-heartbeat { animation: heartbeat 4s ease-in-out infinite; }
        .lg\\:animate-float { animation: float 5s ease-in-out infinite; }

        @media (max-width: 1023px) {
          .orbit-1 { animation: orbit 18s linear infinite; animation-delay: 0s; }
          .orbit-2 { animation: orbit 18s linear infinite; animation-delay: -3s; }
          .orbit-3 { animation: orbit 18s linear infinite; animation-delay: -6s; }
          .orbit-4 { animation: orbit 18s linear infinite; animation-delay: -9s; }
          .orbit-5 { animation: orbit 18s linear infinite; animation-delay: -12s; }
          .orbit-6 { animation: orbit 18s linear infinite; animation-delay: -15s; }
        }
      `}</style>
    </section>
  );
}

export default WhatIsFruitSalad;
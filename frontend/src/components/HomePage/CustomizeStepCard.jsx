import { useEffect, useRef, useState } from "react";
import { Apple, Sprout, ShoppingBasket } from "lucide-react";

function CustomizeStepCard({ step, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  // Strictly enforced unique icons based on step number
  // Using Number() to ensure comparison works even if stepNo is a string
  const getIcon = (stepNo) => {
    const iconProps = { 
      size: 32, 
      strokeWidth: 2, 
      className: "text-white" 
    };
    
    const num = Number(stepNo);

    if (num === 1) return <Apple {...iconProps} />;
    if (num === 2) return <Sprout {...iconProps} />;
    if (num === 3) return <ShoppingBasket {...iconProps} />;
    
    return <Apple {...iconProps} />; // Fallback
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ 
        fontFamily: "'Roboto', sans-serif",
        transitionDelay: visible ? `${index * 150}ms` : "0ms" 
      }}
      className={`
        relative w-full max-w-[320px] transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
      `}
    >
      {/* Transparent Glass Card with Soft Golden Border */}
      <div className="
        relative flex flex-col items-center text-center
        bg-white/5 backdrop-blur-sm rounded-[32px] p-10
        border border-[#C9C27A]/40 shadow-sm
        hover:shadow-[0_20px_50px_rgba(201,194,122,0.2)] 
        hover:bg-white/20 hover:border-[#C9C27A] hover:-translate-y-3 
        transition-all duration-500
        group overflow-hidden h-full
      ">
        
        {/* 1. ICON: Golden Background / White Cut-out */}
        <div className="relative mb-6 flex items-center justify-center">
          <div className="
            w-20 h-20 rounded-2xl flex items-center justify-center 
            bg-[#C9C27A] shadow-[0_10px_25px_rgba(201,194,122,0.4)]
            group-hover:scale-110 transition-transform duration-500
          ">
            {getIcon(step.stepNo)}
          </div>
        </div>

        {/* 2. STEP INDICATOR: Soft Green Pill with Black Text */}
        <div className="mb-4">
          <span className="
            text-[11px] font-black text-black uppercase tracking-widest 
            bg-[#e8f5e9] px-4 py-1.5 rounded-full inline-block
          ">
            Step {step.stepNo}
          </span>
        </div>

        {/* 3. TEXT CONTENT: Black Heading & Description */}
        <h3 className="text-2xl font-black text-black leading-tight mb-4">
          {step.title}
        </h3>

        <p className="text-black text-sm font-medium leading-relaxed max-w-[240px]">
          {step.desc}
        </p>

        {/* Decorative Golden Light Flare */}
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#C9C27A]/10 blur-[60px] pointer-events-none" />
      </div>
    </div>
  );
}

export default CustomizeStepCard;
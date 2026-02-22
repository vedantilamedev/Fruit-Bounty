import { useEffect, useRef, useState } from "react";

function FruitCard({ fruit }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

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
      className={`relative w-[220px] h-[280px] flex items-end mx-4 transition-opacity duration-700 ${
        visible ? "opacity-100" : "opacity-100" 
      }`}
    >
      {/* CARD BODY */}
      <div className="relative w-full h-[180px] bg-[#B7B06A] rounded-3xl border-[3px] border-[#5D6330] shadow-2xl overflow-hidden flex flex-col justify-end p-5">
        
        {/* LEFT VERTICAL STRIP */}
        <div className="absolute left-0 top-0 bottom-0 w-[45px] bg-[#9EA364] flex flex-col items-center justify-center gap-1.5 z-10">
          {"FRUITS".split("").map((char, i) => (
            <span key={i} className="text-[#0B2414] font-black text-[24px] leading-none">
              {char}
            </span>
          ))}
        </div>

        {/* TEXT CONTENT */}
        <div className="ml-[38px] mb-2 relative z-40">
          <h3 className="text-white text-[22px] font-[900] tracking-tighter leading-none 
            drop-shadow-[0_4px_6px_rgba(0,0,0,0.9)]">
            {fruit.name}
          </h3>
          <p className="text-white/95 text-[10px] font-bold uppercase tracking-tight mt-1 italic drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
            {fruit.desc}
          </p>
        </div>
      </div>

      {/* PLATE IMAGE */}
      <div className="absolute top-[25px] -right-16 w-[230px] z-30 pointer-events-none">
        <img
          src={fruit.image}
          alt={fruit.name}
          className="w-full h-auto drop-shadow-[0_25px_35px_rgba(0,0,0,0.6)]"
        />
      </div>
    </div>
  );
}

export default FruitCard;
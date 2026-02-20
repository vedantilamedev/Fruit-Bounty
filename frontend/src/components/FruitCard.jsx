import { useEffect, useRef, useState } from "react";

function FruitCard({ fruit }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.25 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative w-[220px] h-[210px] transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      {/* CARD */}
      <div className="absolute bottom-0 w-full h-[170px] bg-[#B7B06A] rounded-2xl border-[2.5px] border-green-800 shadow-lg overflow-hidden">
        {/* LEFT STRIP */}
        <div className="absolute left-0 top-0 bottom-0 w-[50px] bg-gradient-to-b from-[#A6A05F] to-[#C3BD7A] flex items-center justify-center">
          <span className="rotate-[-90deg] text-green-900 font-extrabold tracking-[4px] text-[14px]">
            FRUITS
          </span>
        </div>

        {/* TEXT — BOTTOM LEFT CORNER */}
        <div className="absolute left-[70px] bottom-[18px]">
          <h3 className="text-white text-[18px] font-bold leading-none">
            {fruit.name}
          </h3>
          <p className="text-white/95 text-[13px] mt-2">{fruit.desc}</p>
        </div>
      </div>

      {/* IMAGE */}
      <img
        src={fruit.image}
        alt={fruit.name}
        className="
          absolute
          -top-[60px]
          left-1/2
          -translate-x-1/4
          w-[240px]
          drop-shadow-2xl
        "
      />
    </div>
  );
}

export default FruitCard;

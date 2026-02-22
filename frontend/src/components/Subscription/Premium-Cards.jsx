import { useEffect, useRef, useState } from "react";

function PremiumCard({ product }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  // Define a high-quality relevant image for the Exotic Mango Bowl
  const mangoBowlImage = "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&q=80&w=800";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Determine which image to show
  const displayImage = product.title === "Exotic Mango Bowl" 
    ? mangoBowlImage 
    : product.image;

  return (
    <div className="py-2 px-2 snap-center">
      <div
        ref={ref}
        className={`
          relative 
          w-[240px] md:w-[260px] 
          min-h-[380px] 
          rounded-[24px] 
          bg-white
          border-[3px] 
          shadow-md hover:shadow-[0_15px_40px_rgba(201,194,122,0.25)]
          hover:-translate-y-1
          transition-all duration-500 ease-out
          flex flex-col overflow-hidden group
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
        `}
      >
        <div className="p-5 flex flex-col flex-grow items-center">
          {/* 1. HEADER */}
          <div className="text-center mt-1 mb-3">
            <span className="text-[8px] font-bold text-[#C9C27A] uppercase tracking-widest mb-1 block">
              {product.category || "Premium Choice"}
            </span>
            <h3 className="text-lg font-black text-gray-900 leading-tight">
              {product.title}
            </h3>
          </div>

          {/* 2. SQUARE IMAGE CONTAINER */}
          <div className="w-full aspect-square max-h-36 flex items-center justify-center bg-gray-50 rounded-xl overflow-hidden mb-4 border border-gray-100 shadow-inner">
            <img
              src={displayImage}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>

          {/* 3. SPECS */}
          <div className="w-full space-y-2.5 px-1">
            {[
              { label: "Weight", value: product.weight },
              { label: "Fruits", value: product.fruits },
              { label: "Calories", value: product.calories }
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between items-center border-b border-gray-100 pb-1">
                <span className="text-[9px] font-bold text-gray-400 uppercase">{item.label}</span>
                <span className="text-[10px] font-black text-gray-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PremiumCard;
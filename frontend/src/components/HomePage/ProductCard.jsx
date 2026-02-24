import { useEffect, useRef, useState } from "react";

function ProductCard({ product }) {
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
    /* Removed extra horizontal padding to ensure parent gap controls spacing exactly */
    <div className="pt-6 pb-4 snap-center"> 
      <div
        ref={ref}
        className={`
          relative 
          /* UPDATED: Further reduced width for a tighter fit */
          w-[275px] md:w-[315px] 
          /* UPDATED: Reduced min-height to stay proportional to the new width */
          min-h-[540px] md:min-h-[580px] 
          rounded-[24px] 
          bg-white
          border-[3px] border-[#C9C27A] 
          shadow-lg hover:shadow-[0_20px_50px_rgba(201,194,122,0.3)]
          hover:-translate-y-2
          transition-all duration-500 ease-out
          flex flex-col overflow-hidden group
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        `}
      >
        <div className="p-5 flex flex-col flex-grow items-center">
          {/* 1. HEADER */}
          <div className="text-center mt-2 mb-4">
            <span className="text-[10px] font-bold text-[#C9C27A] uppercase tracking-widest mb-1 block">
              {product.category || "Fresh & Healthy"}
            </span>
            <h3 className="text-xl md:text-2xl font-black text-gray-900 leading-tight">
              {product.title}
            </h3>
          </div>

          {/* 2. SQUARE IMAGE CONTAINER */}
          <div className="w-full aspect-square max-h-44 flex items-center justify-center bg-gray-50 rounded-xl overflow-hidden mb-5 border border-gray-100 shadow-inner">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>

          {/* 3. SPECS */}
          <div className="w-full space-y-2.5 px-1 mb-5">
            {[
              { label: "Weight", value: product.weight },
              { label: "Fruits", value: product.fruits },
              { label: "Calories", value: product.calories }
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between items-center border-b border-gray-100 pb-1.5">
                <span className="text-[9px] font-bold text-gray-400 uppercase">{item.label}</span>
                <span className="text-[10px] font-black text-gray-900">{item.value}</span>
              </div>
            ))}
          </div>

          {/* 4. PRICE & ACTION */}
          <div className="w-full text-center mt-auto">
            <div className="text-2xl md:text-3xl font-black text-[#C9C27A] mb-3">
              ₹{product.price}
            </div>
            <button className="w-full bg-gradient-to-r from-green-700 to-green-900 hover:from-green-800 hover:to-green-950 text-white py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-green-900/10">
              Order Now
            </button>
          </div>
        </div>

        {/* 5. FIXED BOTTOM BAR */}
        <div className="bg-gradient-to-r from-green-800 to-green-950 py-2 px-4 text-center">
          <p className="text-[8px] text-white font-medium">
            Orders placed today will be delivered <span className="font-bold text-[#C9C27A]">tomorrow.</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
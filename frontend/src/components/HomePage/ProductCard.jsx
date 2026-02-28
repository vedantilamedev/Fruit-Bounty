import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();
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

  const handleOrderNow = () => {
    navigate("/shop");
  };

  return (
    <div className="pt-6 pb-4 snap-center">
      <div
        ref={ref}
        className={`
          relative 
          w-[275px] md:w-[315px] 
          h-fit 
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
        <div className="p-5 flex flex-col items-center">
          {/* HEADER - Streamlined */}
          <div className="text-center mt-2 mb-4">
            <h3 className="text-xl md:text-2xl font-black text-gray-900 leading-tight">
              {product.title}
            </h3>
          </div>

          {/* IMAGE - Centered with consistent spacing */}
          <div className="w-full aspect-square max-h-48 flex items-center justify-center bg-gray-50 rounded-xl overflow-hidden mb-6 border border-gray-100 shadow-inner">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>

          {/* SPECS - Clean and focused on Weight/Fruits */}
          <div className="w-full space-y-3 px-1 mb-2">
            {[
              { label: "Weight", value: product.weight },
              { label: "Fruits", value: product.fruits }
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between items-center border-b border-gray-100 pb-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">{item.label}</span>
                <span className="text-[11px] font-black text-gray-900">{item.value}</span>
              </div>
            ))}
          </div>

          {/* PRICE + CTA */}
          <div className="w-full text-center pt-6">
            <div className="text-3xl md:text-4xl font-black text-[#C9C27A] mb-4">
              ₹{product.price}
            </div>
            <button
              onClick={handleOrderNow}
              className="w-full bg-gradient-to-r from-green-700 to-green-900 hover:from-green-800 hover:to-green-950 text-white py-4 rounded-xl font-bold text-[11px] uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-green-900/10"
            >
              Order Now
            </button>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="bg-gradient-to-r from-green-800 to-green-950 py-2.5 px-4 text-center">
          <p className="text-[9px] text-white font-medium">
            Orders placed today will be delivered{" "}
            <span className="font-bold text-[#C9C27A]">tomorrow.</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
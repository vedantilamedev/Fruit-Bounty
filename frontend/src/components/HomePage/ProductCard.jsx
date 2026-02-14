import { useEffect, useRef, useState } from "react";

function ProductCard({ product, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        } else {
          setVisible(false); // 🔥 scroll up pe phir se animate karega
        }
      },
      { threshold: 0.25 },
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`w-full max-w-[420px]
      rounded-[28px]
      border border-green-800
      bg-[#F6F1E7]
      px-8 py-8
      shadow-sm
      hover:shadow-xl
      transition-all duration-700
      flex flex-col items-center
      
      ${
        visible
          ? index === 0
            ? "opacity-100 translate-x-0"
            : index === 1
              ? "opacity-100 translate-y-0"
              : "opacity-100 translate-x-0"
          : index === 0
            ? "opacity-0 -translate-x-24"
            : index === 1
              ? "opacity-0 -translate-y-24"
              : "opacity-0 translate-x-24"
      }
      `}
    >
      {/* Tag */}
      <span className="text-xs font-semibold bg-green-700 text-white px-4 py-1 rounded-full mb-3">
        {product.tag}
      </span>

      {/* Title */}
      <h3 className="text-2xl font-bold text-gray-800">{product.title}</h3>

      {/* Image */}
      <img
        src={product.image}
        alt={product.title}
        className="w-48 h-48 object-contain my-6 drop-shadow-xl"
      />

      {/* Info */}
      <div className="w-full space-y-2 text-gray-700 text-sm">
        <div className="flex justify-between">
          <span>Weight</span>
          <span className="font-semibold">{product.weight}</span>
        </div>

        <div className="flex justify-between">
          <span>Fruits</span>
          <span className="font-semibold">{product.fruits}</span>
        </div>

        <div className="flex justify-between">
          <span>Calories</span>
          <span className="font-semibold">{product.calories}</span>
        </div>
      </div>

      <p className="text-sm text-gray-500 mt-4 text-center">
        {product.description}
      </p>

      <div className="w-full h-[1px] bg-green-800/30 my-5"></div>

      <div className="text-3xl font-bold text-green-900">₹{product.price}</div>

      <button className="w-full mt-4 bg-green-800 hover:bg-green-900 text-white py-3 rounded-full font-semibold transition">
        Order Now
      </button>
    </div>
  );
}

export default ProductCard;

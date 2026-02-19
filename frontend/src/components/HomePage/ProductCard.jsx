import { useEffect, useRef, useState } from "react";

function ProductCard({ product }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const getImageSize = () => {
    if (product.title.includes("Small")) return "w-36";
    if (product.title.includes("Medium")) return "w-44";
    return "w-52";
  };

  return (
    <div
      ref={ref}
      className={`
        relative w-full max-w-[380px]
        rounded-[32px]
        bg-white/80 backdrop-blur-md
        border border-green-100
        shadow-[0_10px_40px_rgba(0,0,0,0.06)]
        hover:shadow-[0_20px_60px_rgba(0,0,0,0.10)]
        hover:-translate-y-3
        transition-all duration-500
        p-8
        flex flex-col justify-between
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
    >
      {/* TOP SECTION */}
      <div>
        {/* Tag */}
        <div className="flex justify-center mb-4">
          <span className="text-xs tracking-wide font-semibold bg-green-100 text-green-700 px-4 py-1 rounded-full">
            {product.tag}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-semibold text-gray-800 text-center">
          {product.title}
        </h3>

        {/* Image */}
        <div className="flex justify-center">
          <img
            src={product.image}
            alt={product.title}
            className={`${getImageSize()} my-7 transition-transform duration-500 hover:scale-105 drop-shadow-2xl`}
          />
        </div>

        {/* Nutrition Section */}
        <div className="space-y-3 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Weight</span>
            <span className="font-medium text-gray-800">{product.weight}</span>
          </div>

          <div className="flex justify-between">
            <span>Fruits</span>
            <span className="font-medium text-gray-800">{product.fruits}</span>
          </div>

          <div className="flex justify-between">
            <span>Calories</span>
            <span className="font-medium text-gray-800">
              {product.calories}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Protein</span>
            <span className="font-medium text-green-700">
              {product.protein}
            </span>
          </div>
        </div>

        {/* Rating Pill */}
        <div className="mt-6 flex justify-center">
          <div className="bg-yellow-100 text-yellow-700 text-xs px-4 py-1 rounded-full font-semibold shadow-sm">
            ★ {product.rating || "4.8"}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500 text-center mt-5 leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* BOTTOM SECTION */}
      <div className="mt-8">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-green-200 to-transparent mb-6"></div>

        <div className="text-3xl font-bold text-green-800 text-center tracking-tight">
          ₹{product.price}
        </div>

        <button className="w-full mt-5 bg-gradient-to-r from-green-700 to-green-800 hover:from-green-800 hover:to-green-900 text-white py-3 rounded-full font-semibold transition duration-300 shadow-md hover:shadow-lg">
          Order Now
        </button>
      </div>
    </div>
  );
}

export default ProductCard;

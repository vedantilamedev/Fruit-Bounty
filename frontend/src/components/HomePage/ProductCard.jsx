import { useEffect, useRef, useState } from "react";

function ProductCard({ product, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.25 },
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  // 🔥 Dynamic Image Size Based On Bowl
  const getImageSize = () => {
    if (product.title.includes("Small")) return "w-40";
    if (product.title.includes("Medium")) return "w-52";
    return "w-64";
  };

  return (
    <div
      ref={ref}
      className={`
      relative w-full max-w-[420px]
      rounded-[32px]
      border border-green-800/20
      bg-white
      px-8 py-10
      shadow-md
      transition-all duration-700
      flex flex-col items-center
      group
      hover:-translate-y-4
      hover:shadow-2xl
      ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}
      `}
    >
      {/* ⭐ Most Popular Badge */}
      {product.tag === "MOST POPULAR" && (
        <div className="absolute -top-4 bg-gradient-to-r from-green-700 to-green-900 text-white px-6 py-1 text-xs font-semibold rounded-full shadow-lg">
          ⭐ Most Popular
        </div>
      )}

      {/* Tag */}
      <span className="text-xs font-semibold bg-green-100 text-green-800 px-4 py-1 rounded-full mb-4">
        {product.tag}
      </span>

      {/* Title */}
      <h3 className="text-2xl font-bold text-gray-800 text-center">
        {product.title}
      </h3>

      {/* Image */}
      <img
        src={product.image}
        alt={product.title}
        className={`
          ${getImageSize()}
          my-8
          transition-all duration-500
          group-hover:scale-110
          drop-shadow-2xl
        `}
      />

      {/* Product Info */}
      <div className="w-full space-y-3 text-gray-700 text-sm">
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

        <div className="flex justify-between">
          <span>Delivery</span>
          <span className="font-semibold text-green-700">25–30 mins</span>
        </div>

        <div className="flex justify-between">
          <span>Rating</span>
          <span className="font-semibold text-yellow-500">★ 4.8</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-500 mt-5 text-center leading-relaxed">
        {product.description}
      </p>

      {/* Divider */}
      <div className="w-full h-[1px] bg-green-800/20 my-6"></div>

      {/* Price */}
      <div className="text-3xl font-bold text-green-900">₹{product.price}</div>

      {/* Button */}
      <button className="w-full mt-5 bg-gradient-to-r from-green-700 to-green-900 hover:from-green-800 hover:to-green-950 text-white py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 active:scale-95">
        Order Now
      </button>
    </div>
  );
}

export default ProductCard;

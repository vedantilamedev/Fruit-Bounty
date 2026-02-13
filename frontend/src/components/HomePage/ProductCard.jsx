function ProductCard({ product }) {
  return (
    <div
      className="
      w-full max-w-[360px]
      rounded-[28px]
      border border-green-800
      bg-[#F6F1E7]
      px-7 py-8
      shadow-sm
      hover:shadow-xl
      transition duration-300
      flex flex-col items-center
    "
    >
      {/* Tag */}
      <span className="text-xs font-semibold bg-green-700 text-white px-4 py-1 rounded-full mb-3">
        {product.tag}
      </span>

      {/* Title */}
      <h3 className="text-2xl font-bold text-gray-800">{product.title}</h3>

      {/* IMAGE — Perfect Size */}
      <img
        src={product.image}
        alt={product.title}
        className="
          w-44
          h-44
          object-contain
          my-5
          drop-shadow-xl
        "
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

      {/* Description */}
      <p className="text-sm text-gray-500 mt-4 text-center">
        {product.description}
      </p>

      {/* Divider */}
      <div className="w-full h-[1px] bg-green-800/30 my-5"></div>

      {/* Price */}
      <div className="text-3xl font-bold text-green-900">₹{product.price}</div>

      {/* Button */}
      <button
        className="
        w-full
        mt-4
        bg-green-800
        hover:bg-green-900
        text-white
        py-3
        rounded-full
        font-semibold
      "
      >
        Order Now
      </button>
    </div>
  );
}

export default ProductCard;

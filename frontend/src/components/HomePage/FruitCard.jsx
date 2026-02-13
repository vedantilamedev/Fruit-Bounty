function FruitCard({ fruit }) {
  return (
    <div className="relative w-[220px] h-[170px]">
      {/* Card */}
      <div
        className="
        absolute bottom-0
        w-full h-[125px]
        bg-[#B7B06A]
        rounded-2xl
        border-2 border-green-800
        overflow-hidden
      "
      >
        {/* Left Strip */}
        <div
          className="
          absolute left-0 top-0 bottom-0
          w-11
          flex items-center justify-center
          bg-gradient-to-b from-[#A6A05F] to-[#C3BD7A]
        "
        >
          <span
            className="
            rotate-[-90deg]
            text-green-800
            font-extrabold
            tracking-[4px]
            text-xs
          "
          >
            FRUITS
          </span>
        </div>

        {/* Text */}
        <div className="ml-12 mt-8">
          <h3 className="text-white text-base font-bold leading-none">
            {fruit.name}
          </h3>

          <p className="text-white/90 text-[11px] mt-1">{fruit.desc}</p>
        </div>
      </div>

      {/* Image */}
      <img
        src={fruit.image}
        alt={fruit.name}
        className="
          absolute
          -top-14
          left-1/2
          -translate-x-1/2
          w-32
          drop-shadow-2xl
          pointer-events-none
        "
      />
    </div>
  );
}

export default FruitCard;

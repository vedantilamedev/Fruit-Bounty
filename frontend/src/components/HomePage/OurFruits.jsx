import FruitCard from "./FruitCard";

function OurFruits() {
  const fruits = [
    {
      name: "Strawberries",
      desc: "Sweet & Juicy",
      image: "/images/strawberries.png",
    },
    {
      name: "Pineapple",
      desc: "Tropical Twist",
      image: "/images/pinapple.png",
    },
    {
      name: "Grapes",
      desc: "Crisp & Sweet",
      image: "/images/grapes.png",
    },
    {
      name: "Watermelon",
      desc: "Hydrating & Fresh",
      image: "/images/watermelon.png",
    },
    {
      name: "Kiwi",
      desc: "Tangy Boost",
      image: "/images/kiwi.png",
    },
    {
      name: "Mango",
      desc: "Seasonal Delight",
      image: "/images/mango.png",
    },
  ];

  return (
    <section className="py-20 bg-[#FBF8F2] overflow-hidden">
      {/* ================= Heading ================= */}
      <div className="text-center max-w-3xl mx-auto mb-14 px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 font-['Playfair_Display']">
          Our Fruits
        </h2>

        <div className="w-20 h-[3px] bg-green-700 mx-auto my-5 rounded-full"></div>

        <p className="text-gray-600 text-lg leading-relaxed">
          We carefully select farm-fresh seasonal fruits to ensure premium
          quality, rich flavor, and maximum nutrition in every bowl.
        </p>
      </div>

      {/* ================= Auto Scroll ================= */}
      <div className="relative w-full overflow-hidden group">
        <div className="flex gap-16 animate-scroll group-hover:[animation-play-state:paused] w-max px-6">
          {/* Duplicate for smooth infinite loop */}
          {[...fruits, ...fruits].map((fruit, index) => (
            <FruitCard key={index} fruit={fruit} />
          ))}
        </div>
      </div>

      {/* Scroll Animation */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-scroll {
          animation: scroll 25s linear infinite;
        }
      `}</style>
    </section>
  );
}

export default OurFruits;

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
    <section className="relative py-8 md:py-12 overflow-hidden bg-[#FBF8F2]">
      {/* 1. BACKGROUND IMAGE LAYER - Consistent with SaladSection.jsx */}
      <div 
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        style={{ 
          backgroundImage: `url('/public/images/main-background.PNG')`,
          backgroundSize: '400px',
          backgroundRepeat: 'repeat'
        }}
      ></div>

      {/* 2. HEADING - Specific font styles and reduced margin */}
      <div className="relative z-10 text-center mb-8 md:mb-12 max-w-2xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
          Our Fruits
        </h2>

        <div className="w-16 h-1 bg-[#2D5A27] mx-auto mt-3 mb-6 rounded-full"></div>

        <p className="text-gray-600 text-sm md:text-base font-medium leading-relaxed">
          We carefully select farm-fresh seasonal fruits to ensure premium
          quality, rich flavor, and maximum nutrition in every bowl.
        </p>
      </div>

      {/* 3. AUTO SCROLL CONTENT */}
      <div className="relative z-10 w-full overflow-hidden group">
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
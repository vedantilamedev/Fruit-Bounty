import FruitCard from "./FruitCard";
import { getAllFruits } from "../../api/api";
import { useState, useEffect } from "react";

function OurFruits() {
  const [fruits, setFruits] = useState([]);

  useEffect(() => {
    const fetchFruits = async () => {
      try {
        const response = await getAllFruits();
        if (response.data.success) {
          // Filter only non-bowl items and map to required format
          const fruitItems = response.data.data
            .filter(item => !item.isBowl && item.available)
            .map(item => ({
              name: item.name,
              desc: item.description || "Fresh & Healthy",
              image: item.image || `/images/${item.name.toLowerCase()}.webp`
            }));
          
          // If no fruits from API, use fallback
          if (fruitItems.length > 0) {
            setFruits(fruitItems);
          } else {
            setFruits([
              { name: "Strawberries", desc: "Sweet & Juicy", image: "/images/strawberries.webp" },
              { name: "Pineapple", desc: "Tropical Twist", image: "/images/pinapple.webp" },
              { name: "Grapes", desc: "Crisp & Sweet", image: "/images/grapes.webp" },
              { name: "Watermelon", desc: "Hydrating & Fresh", image: "/images/watermelon.webp" },
              { name: "Kiwi", desc: "Tangy Boost", image: "/images/kiwi.webp" },
              { name: "Mango", desc: "Seasonal Delight", image: "/images/mango.webp" },
            ]);
          }
        }
      } catch (err) {
        console.error("Error fetching fruits:", err);
        // Fallback to default
        setFruits([
          { name: "Strawberries", desc: "Sweet & Juicy", image: "/images/strawberries.webp" },
          { name: "Pineapple", desc: "Tropical Twist", image: "/images/pinapple.webp" },
          { name: "Grapes", desc: "Crisp & Sweet", image: "/images/grapes.webp" },
          { name: "Watermelon", desc: "Hydrating & Fresh", image: "/images/watermelon.webp" },
          { name: "Kiwi", desc: "Tangy Boost", image: "/images/kiwi.webp" },
          { name: "Mango", desc: "Seasonal Delight", image: "/images/mango.webp" },
        ]);
      }
    };

    fetchFruits();
  }, []);

  // Fallback fruits if empty
  const displayFruits = fruits.length > 0 ? fruits : [
    { name: "Strawberries", desc: "Sweet & Juicy", image: "/images/strawberries.webp" },
    { name: "Pineapple", desc: "Tropical Twist", image: "/images/pinapple.webp" },
    { name: "Grapes", desc: "Crisp & Sweet", image: "/images/grapes.webp" },
    { name: "Watermelon", desc: "Hydrating & Fresh", image: "/images/watermelon.webp" },
    { name: "Kiwi", desc: "Tangy Boost", image: "/images/kiwi.webp" },
    { name: "Mango", desc: "Seasonal Delight", image: "/images/mango.webp" },
  ];

  return (
    <section className="relative py-20 overflow-hidden bg-[#FBF8F2]">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-30 pointer-events-none"
        style={{ 
          backgroundImage: `url('/images/main-background.webp')`,
          backgroundSize: '400px'
        }}
      ></div>

      {/* Heading and Description */}
      <div className="relative z-10 text-center mb-8 max-w-2xl mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-[900] text-gray-900 tracking-tighter ">
          Our Fruits
        </h2>
        <div className="w-20 h-1.5 bg-[#2D5A27] mx-auto mt-4 mb-4 rounded-full"></div>
        
        <p className="text-gray-600 text-sm md:text-base font-medium leading-tight max-w-md mx-auto">
          We carefully select the finest seasonal fruits to ensure every bowl 
          is packed with natural sweetness and vibrant health.
        </p>
      </div>

      {/* INFINITE SCROLL CONTAINER */}
      <div className="relative z-10 w-full overflow-hidden pt-4">
        {/* The 'w-max' and tripling the array creates the seamless loop */}
        <div className="flex animate-infinite-scroll w-max">
          {[...displayFruits, ...displayFruits, ...displayFruits].map((fruit, index) => (
            <div key={index} className="flex-shrink-0">
              <FruitCard fruit={fruit} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes infinite-scroll {
          from { transform: translateX(0); }
          /* Reset exactly at 1/3rd because we tripled the array */
          to { transform: translateX(-33.3333%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 30s linear infinite;
          display: flex;
        }
        /* Optional: Keeps it smooth when the tab is out of focus */
        .animate-infinite-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

export default OurFruits;
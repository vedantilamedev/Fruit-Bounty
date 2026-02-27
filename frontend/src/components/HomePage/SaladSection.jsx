import ProductCard from "./ProductCard";
import { getAllFruits } from "../../api/api";
import { useState, useEffect } from "react";

function SaladSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllFruits();
        if (response.data.success) {
          // Filter only bowls and map to the expected format
          const bowls = response.data.data
            .filter(item => item.isBowl && item.available)
            .map((item, index) => ({
              id: item._id || index + 1,
              title: item.name,
              category: item.type || "Fresh & Healthy",
              weight: item.description?.split('|')[0]?.trim() || "400g",
              fruits: item.ingredients?.length ? `${item.ingredients.length} Types` : "5 Types",
              calories: item.description?.split('|')[1]?.trim() || "200 kcal",
              price: item.price,
              image: item.image || item.images?.[0] || "/images/smallBowl.webp",
              badge: item.salesCount > 10 ? "BESTSELLER" : null,
            }));
          setProducts(bowls);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
        // Fallback to default bowls if API fails
        setProducts([
          {
            id: 1,
            title: "Small Bowl",
            category: "STARTER",
            weight: "250g",
            fruits: "5 Types",
            calories: "120 kcal",
            price: 199,
            image: "/images/smallBowl.webp",
          },
          {
            id: 2,
            title: "Medium Bowl",
            category: "MOST POPULAR",
            weight: "400g",
            fruits: "7 Types",
            calories: "190 kcal",
            price: 299,
            image: "/images/mediumBowl.webp",
            badge: "BESTSELLER",
          },
          {
            id: 3,
            title: "Large Bowl",
            category: "FAMILY SIZE",
            weight: "900g",
            fruits: "9 Types",
            calories: "280 kcal",
            price: 449,
            image: "/images/largeBowl.webp",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="relative py-10 md:py-16 overflow-hidden bg-[#FBF8F2]">
      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `url('/images/main-background.webp')`,
          backgroundSize: "400px",
          backgroundRepeat: "repeat",
        }}
      ></div>

      {/* HEADING */}
      <div className="relative z-10 text-center mb-6 md:mb-12 max-w-2xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
          Our Salad Bowls
        </h2>
        <div className="w-12 h-1 bg-[#2D5A27] mx-auto mt-2 mb-3 rounded-full"></div>
        <p className="text-gray-500 text-xs md:text-base font-medium">
          Choose your perfect size and enjoy fresh goodness
        </p>
      </div>

      {/* CARDS WRAPPER */}
      <div className="relative z-10">
        {/* CARDS CONTAINER */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 md:gap-8 px-4 pb-4 hide-scrollbar md:grid md:grid-cols-3 md:px-10 lg:px-20 max-w-7xl mx-auto">
          {products.map((product) => (
            <div
              key={product.id}
              className="snap-center flex-shrink-0 first:ml-2 last:mr-2 md:ml-0 md:mr-0"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* SWIPE INDICATOR - Now positioned relative to the card container */}
        <div className="flex items-center justify-center gap-1.5 mt-2 text-[10px] font-bold uppercase tracking-widest text-[#2D5A27] md:hidden animate-pulse">
          <span>Swipe for more</span>
          <span className="text-lg">→</span>
        </div>

        {/* RIGHT FADE SHADOW (MOBILE ONLY) */}
        <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-[#FBF8F2] via-[#FBF8F2]/20 to-transparent pointer-events-none md:hidden"></div>
      </div>

      {/* HIDE SCROLLBAR STYLE */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}

export default SaladSection;
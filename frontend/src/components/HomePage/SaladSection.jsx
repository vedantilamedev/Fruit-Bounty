import ProductCard from "./ProductCard";

function SaladSection() {
  const products = [
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
  ];

  return (
    <section className="relative py-12 md:py-16 overflow-hidden bg-[#FBF8F2]">

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
      <div className="relative z-10 text-center mb-8 md:mb-12 max-w-2xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
          Our Salad Bowls
        </h2>
        <div className="w-16 h-1 bg-[#2D5A27] mx-auto mt-3 mb-4 rounded-full"></div>
        <p className="text-gray-500 text-sm md:text-base font-medium">
          Choose your perfect size and enjoy fresh goodness
        </p>
      </div>

      {/* CARDS CONTAINER */}
      <div className="relative z-10 flex overflow-x-auto snap-x snap-mandatory gap-4 md:gap-8 px-4 pb-10 hide-scrollbar md:grid md:grid-cols-3 md:px-10 lg:px-20 max-w-7xl mx-auto">
        {products.map((product) => (
          <div
            key={product.id}
            className="snap-center flex-shrink-0 first:ml-4 last:mr-4 md:ml-0 md:mr-0"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* RIGHT FADE SHADOW (MOBILE ONLY) */}
      <div className="absolute right-0 top-[55%] -translate-y-1/2 w-20 h-[65%] bg-gradient-to-l from-[#FBF8F2] to-transparent pointer-events-none md:hidden"></div>

      {/* SWIPE INDICATOR */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs text-gray-500 md:hidden animate-pulse">
        <span>Swipe</span>
        <span>→</span>
      </div>

      {/* HIDE SCROLLBAR */}
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
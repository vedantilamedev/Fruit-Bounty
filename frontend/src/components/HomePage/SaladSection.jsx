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
      price: 6.99,
      image: "/images/smallBowl.png",
    },
    {
      id: 2,
      title: "Medium Bowl",
      category: "MOST POPULAR",
      weight: "400g",
      fruits: "7 Types",
      calories: "190 kcal",
      price: 9.99,
      image: "/images/mediumBowl.png",
      badge: "BESTSELLER"
    },
    {
      id: 3,
      title: "Large Bowl",
      category: "FAMILY SIZE",
      weight: "900g",
      fruits: "9 Types",
      calories: "280 kcal",
      price: 13.99,
      image: "/images/largeBowl.png",
    },
  ];

  return (
    <section className="relative py-12 md:py-16 overflow-hidden">
      {/* 1. BACKGROUND IMAGE LAYER */}
      <div 
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        style={{ 
          backgroundImage: `url('/public/images/main-background.png')`,
          backgroundSize: '400px',
          backgroundRepeat: 'repeat'
        }}
      ></div>

      {/* 2. HEADING - Reduced Margin */}
      <div className="relative z-10 text-center mb-8 md:mb-12 max-w-2xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
          Our Salad Bowls
        </h2>
        <div className="w-16 h-1 bg-[#2D5A27] mx-auto mt-3 mb-4 rounded-full"></div>
        <p className="text-gray-500 text-sm md:text-base font-medium">
          Choose your perfect size and enjoy fresh goodness
        </p>
      </div>

      {/* 3. CARDS CONTAINER - Enhanced Mobile View */}
      <div className="relative z-10 flex overflow-x-auto snap-x snap-mandatory gap-2 md:gap-8 px-4 pb-10 hide-scrollbar md:grid md:grid-cols-3 md:px-10 lg:px-20 max-w-7xl mx-auto">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="snap-center flex-shrink-0 first:ml-4 last:mr-4 md:ml-0 md:mr-0"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* CSS for scrollbar and background texture */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        section {
            background-color: #FBF8F2; /* Base cream color */
        }
      `}</style>
    </section>
  );
}

export default SaladSection;
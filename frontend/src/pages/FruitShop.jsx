import { useCart } from "../context/CartContext";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Leaf,
  HeartPulse,
  Hand,
  Recycle,
  ShoppingBag,
  Check,
  Gem,
  Building2,
  Crown,
  Sparkles,
} from "lucide-react";

const products = [
  {
    id: 1,
    title: "Small Bowl",
    weight: "250g",
    price: 199,
    rating: 4.7,
    calories: "320 kcal",
    protein: "12g Protein",
    ingredients: ["Apple", "Banana", "Granola", "Honey"],
    toppings: ["Chia Seeds", "Almonds", "Pumpkin Seeds"],
    description: "Perfect for a light and healthy snack.",
    image: "/images/smallBowl.webp",
  },
  {
    id: 2,
    title: "Medium Bowl",
    weight: "400g",
    price: 299,
    rating: 4.9,
    calories: "480 kcal",
    protein: "18g Protein",
    ingredients: ["Strawberry", "Blueberry", "Chia", "Almond"],
    toppings: ["Coconut Flakes", "Dark Chocolate", "Peanut Butter"],
    description: "Balanced nutrition with great taste.",
    image: "/images/mediumBowl.webp",
  },
  {
    id: 3,
    title: "Large Bowl",
    weight: "900g",
    price: 449,
    rating: 5.0,
    calories: "720 kcal",
    protein: "25g Protein",
    ingredients: ["Mixed Fruits", "Seeds", "Nuts", "Honey"],
    toppings: ["Cashews", "Walnuts", "Honey Drizzle"],
    description: "Ideal for sharing with friends and family.",
    image: "/images/largeBowl.webp",
  },
  {
    id: 4,
    title: "Protein Power Bowl",
    weight: "500g",
    price: 349,
    rating: 4.8,
    calories: "550 kcal",
    protein: "28g Protein",
    ingredients: ["Banana", "Oats", "Peanut Butter", "Dates"],
    toppings: ["Whey Protein", "Flax Seeds", "Choco Chips"],
    description: "High protein bowl for gym lovers.",
    image: "/images/proteinBowl.webp",
  },
  {
    id: 5,
    title: "Berry Blast Bowl",
    weight: "350g",
    price: 279,
    rating: 4.6,
    calories: "410 kcal",
    protein: "14g Protein",
    ingredients: ["Strawberry", "Raspberry", "Blueberry"],
    toppings: ["Mint Leaves", "Honey", "Granola"],
    description: "Loaded with antioxidants and freshness.",
    image: "/images/berryBowl.webp",
  },
  {
    id: 6,
    title: "Tropical Delight",
    weight: "450g",
    price: 329,
    rating: 4.9,
    calories: "500 kcal",
    protein: "16g Protein",
    ingredients: ["Mango", "Pineapple", "Coconut"],
    toppings: ["Coconut Chips", "Chia Seeds", "Cashew Crumble"],
    description: "A tropical escape in every bite.",
    image: "/images/tropicalBowl.webp",
  },
  {
    id: 7,
    title: "Green Detox Bowl",
    weight: "300g",
    price: 259,
    rating: 4.5,
    calories: "350 kcal",
    protein: "13g Protein",
    ingredients: ["Spinach", "Kiwi", "Apple", "Mint"],
    toppings: ["Sunflower Seeds", "Honey", "Granola"],
    description: "Clean and refreshing detox bowl.",
    image: "/images/greenBowl.webp",
  },
  {
    id: 8,
    title: "Chocolate Crunch Bowl",
    weight: "420g",
    price: 319,
    rating: 4.8,
    calories: "530 kcal",
    protein: "20g Protein",
    ingredients: ["Banana", "Cocoa", "Oats"],
    toppings: ["Dark Chocolate", "Almond Butter", "Choco Chips"],
    description: "For chocolate lovers with healthy twist.",
    image: "/images/chocoBowl.webp",
  },
  {
    id: 9,
    title: "Classic Yogurt Bowl",
    weight: "300g",
    price: 229,
    rating: 4.4,
    calories: "340 kcal",
    protein: "15g Protein",
    ingredients: ["Greek Yogurt", "Honey", "Granola"],
    toppings: ["Strawberry", "Blueberry", "Pumpkin Seeds"],
    description: "Simple, creamy and delicious.",
    image: "/images/yogurtBowl.webp",
  },
  {
    id: 10,
    title: "Nutty Delight Bowl",
    weight: "380g",
    price: 309,
    rating: 4.7,
    calories: "490 kcal",
    protein: "19g Protein",
    ingredients: ["Banana", "Peanut Butter", "Dates"],
    toppings: ["Walnuts", "Almonds", "Chia Seeds"],
    description: "Crunchy and protein rich bowl.",
    image: "/images/nuttyBowl.webp",
  },
  {
    id: 11,
    title: "Summer Special Bowl",
    weight: "360g",
    price: 289,
    rating: 4.6,
    calories: "420 kcal",
    protein: "14g Protein",
    ingredients: ["Watermelon", "Mango", "Mint"],
    toppings: ["Coconut Flakes", "Honey", "Chia Seeds"],
    description: "Refreshing summer fruit combo.",
    image: "/images/summerBowl.webp",
  },
  {
    id: 12,
    title: "Energy Boost Bowl",
    weight: "480g",
    price: 359,
    rating: 4.9,
    calories: "600 kcal",
    protein: "22g Protein",
    ingredients: ["Oats", "Banana", "Dates", "Almond Milk"],
    toppings: ["Peanut Butter", "Cashews", "Dark Chocolate"],
    description: "Power packed bowl for busy days.",
    image: "/images/energyBowl.webp",
  },
];

function FreshnessCard({ icon, title, desc }) {
  return (
    <div className="bg-[#ecfdf3] rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-[#c9b26d] mb-5">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-500 leading-relaxed">{desc}</p>
    </div>
  );
}

function FruitShop() {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [selectedBowls, setSelectedBowls] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const toastTimeoutRef = useRef(null);
  const itemsPerPage = 6;

  // SCROLL TO TOP ON LOAD
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  const toggleSelection = (product) => {
    const exists = selectedBowls.find((item) => item.id === product.id);
    if (exists) {
      setSelectedBowls(selectedBowls.filter((item) => item.id !== product.id));
    } else {
      setSelectedBowls([...selectedBowls, product]);
    }
  };

  const totalSelectedPrice = selectedBowls.reduce((sum, item) => sum + item.price, 0);
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = products.slice(startIndex, startIndex + itemsPerPage);

  const showToast = (message, type = "success") => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToast({ show: true, message, type });
    toastTimeoutRef.current = setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 2200);
  };

  const handleBulkAddToCart = () => {
    if (selectedBowls.length === 0) {
      showToast("Please select at least one bowl first.", "error");
      return;
    }
    selectedBowls.forEach((item) => addToCart({ ...item, quantity: 1 }));
    showToast(`${selectedBowls.length} items added to your cart.`);
    setSelectedBowls([]);
    navigate("/cart");
  };

  return (
    <section className="relative pt-0 pb-4 md:pt-2 md:pb-8 px-4 sm:px-5 md:px-16 lg:px-24 overflow-hidden">
      <div
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: "url('/images/main-background.webp')",
          backgroundSize: "400px",
          backgroundRepeat: "repeat",
        }}
      ></div>

      <section className="relative z-10 py-2 md:py-6 overflow-hidden">
        <div className="relative max-w-7xl mx-auto rounded-[1.8rem] md:rounded-[2.5rem] border border-[#d8d2a0] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.18)]">
          <div className="absolute inset-0 bg-gradient-to-r from-[#184f2f] via-[#1f6b37] to-[#b7862c]"></div>
          <div className="absolute -top-24 -left-16 w-72 h-72 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-24 -right-16 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl"></div>

          <div className="relative z-10 grid lg:grid-cols-[1.1fr_0.9fr] gap-4 md:gap-6 items-center px-4 sm:px-6 py-6 md:px-10 md:py-10 lg:px-14">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
              className="text-center lg:text-left"
            >
              <div className="flex flex-wrap justify-center lg:justify-start gap-2.5 mb-4">
                <span className="bg-white/20 text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.22em] flex items-center gap-2">
                  <Leaf size={12} /> Farm Fresh Daily
                </span>
                <span className="bg-white/20 text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.22em] flex items-center gap-2">
                  <Sparkles size={12} /> Chef Curated
                </span>
                <span className="bg-white/20 text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.22em] flex items-center gap-2">
                  <Check size={12} /> Premium Quality
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight max-w-3xl mx-auto lg:mx-0">
                Pick Your <span className="text-[#C9C27A]">Perfect Bowl</span>
              </h1>
              <p className="text-white/90 text-sm md:text-lg mt-3 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Discover handcrafted fruit bowls made with seasonal ingredients, balanced nutrition, and flavors you will love every day.
              </p>

              <div className="mt-4 md:mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-3 max-w-3xl mx-auto lg:mx-0">
                {[
                  { label: "Bowl Variants", value: `${products.length}+` },
                  { label: "Avg. Rating", value: "4.8" },
                  { label: "No Preservatives", value: "100%" },
                  { label: "Delivery", value: "Same Day" },
                ].map((item) => (
                  <div key={item.label} className="bg-white/15 rounded-2xl px-3 py-4 border border-white/20">
                    <p className="text-xl md:text-2xl font-black text-white">{item.value}</p>
                    <p className="text-[11px] uppercase tracking-wider text-white/80 font-bold">{item.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="w-full max-w-[220px] sm:max-w-sm md:max-w-md mx-auto flex justify-center"
            >
              <div className="relative">
                <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-[#ffe6a9] text-[#1b4f2f] px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] uppercase tracking-wider font-black shadow-lg z-20 whitespace-nowrap">
                  Signature Bowl
                </div>
                <div className="rounded-[2rem] bg-white/15 border border-white/20 p-4 md:p-5">
                  <img
                    src="/images/hero.webp"
                    alt="Featured Bowl"
                    className="w-full h-[170px] sm:h-[220px] md:h-[260px] object-contain mx-auto drop-shadow-[0_20px_35px_rgba(0,0,0,0.35)]"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mt-1 md:mt-2 mb-5 md:mb-7 text-center">
        <div className="inline-flex items-center gap-2 bg-[#f2f8f2] border border-green-100 text-green-800 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
          <Sparkles size={12} />
          Explore Collection
        </div>
        <h2 className="mt-4 text-2xl md:text-4xl font-black text-gray-900 tracking-tight">
          Choose Your Bowl
        </h2>
        <p className="mt-2 text-sm md:text-base text-gray-500">
          Freshly curated bowls starting below
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-green-700 to-[#C9C27A] rounded-full mx-auto mt-4"></div>
      </section>

      <section className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10">
        {paginatedProducts.map((product) => {
          const isSelected = selectedBowls.some((item) => item.id === product.id);
          return (
            <motion.div
              key={product.id}
              whileHover={{ y: -8 }}
              onClick={() => toggleSelection(product)}
              className={`group relative rounded-[22px] md:rounded-[28px] p-4 md:p-5 cursor-pointer border-2 transition-all duration-300 flex flex-col overflow-hidden ${
                isSelected
                  ? "border-green-700 bg-white shadow-[0_18px_45px_rgba(22,101,52,0.28)]"
                  : "border-[#d8d2a0] bg-white shadow-lg hover:shadow-[0_20px_48px_rgba(201,194,122,0.28)]"
              }`}
            >
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-[#eef9f0] via-[#fff9ef] to-[#eef9f0] pointer-events-none"></div>
              <div className="relative bg-gradient-to-br from-[#f8fff8] to-[#fff6e7] border border-[#ede8c4] rounded-2xl h-44 sm:h-48 md:h-52 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-32 sm:w-36 md:w-40 object-contain transition-transform duration-500 group-hover:scale-105"
                />
                {product.rating >= 4.9 && (
                  <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                    Best Seller
                  </div>
                )}
                <div
                  className={`absolute top-3 right-3 w-8 h-8 rounded-full border flex items-center justify-center ${
                    isSelected
                      ? "bg-green-600 border-green-600 text-white"
                      : "bg-white/90 border-gray-300 text-transparent"
                  }`}
                >
                  <Check className="w-4 h-4" />
                </div>
              </div>

                <div className="mt-4 md:mt-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start gap-3">
                  <h3 className="text-lg sm:text-xl font-black text-gray-900 leading-tight">{product.title}</h3>
                  <span className="text-green-700 text-sm font-bold">{product.weight}</span>
                </div>

                <p className="text-gray-500 text-sm mt-2 leading-relaxed">{product.description}</p>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="rounded-xl bg-[#f3f9f3] px-3 py-2 border border-green-100">
                    <p className="text-[10px] uppercase tracking-wider text-gray-500">Calories</p>
                    <p className="text-sm font-semibold text-gray-800">{product.calories}</p>
                  </div>
                  <div className="rounded-xl bg-[#f3f9f3] px-3 py-2 border border-green-100">
                    <p className="text-[10px] uppercase tracking-wider text-gray-500">Protein</p>
                    <p className="text-sm font-semibold text-gray-800">{product.protein}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {product.ingredients.slice(0, 4).map((item, i) => (
                    <span
                      key={i}
                      className="bg-green-100/80 text-green-900 text-xs px-3 py-1 rounded-full border border-green-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {product.toppings.slice(0, 2).map((topping, i) => (
                    <span key={i} className="text-[11px] text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">
                      + {topping}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-auto pt-5 gap-3">
                  <span className="text-xl sm:text-2xl font-black text-[#2d5a27]">Rs. {product.price}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart({ ...product, quantity: 1 });
                      showToast(`${product.title} added to cart.`);
                      navigate("/cart");
                    }}
                    className="w-full sm:w-auto bg-gradient-to-r from-green-700 to-green-900 hover:from-green-800 hover:to-green-950 text-white px-5 h-11 rounded-xl flex items-center justify-center shadow-lg transition font-bold text-sm"
                  >
                    Add
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </section>

      {totalPages > 1 && (
        <div className="relative z-10 mt-12 flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-xl border border-[#d8d2a0] bg-white text-sm font-bold text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:border-green-400"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-10 h-10 rounded-xl text-sm font-black border transition-all ${
                currentPage === page
                  ? "bg-green-800 text-white border-green-800"
                  : "bg-white text-gray-700 border-[#d8d2a0] hover:border-green-400"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-xl border border-[#d8d2a0] bg-white text-sm font-bold text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:border-green-400"
          >
            Next
          </button>
        </div>
      )}

      {/* FRESHNESS PROMISE */}
      <section className="w-full bg-[#fff7f7] py-12 md:py-16 px-4 mt-20 md:mt-32 rounded-3xl relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 relative inline-block">
            Our Freshness Promise
            <span className="absolute left-0 -bottom-2 w-full h-[3px] bg-green-600 rounded-full"></span>
          </h2>
          <p className="mt-5 text-base md:text-lg">Quality you can taste in every bite</p>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <FreshnessCard icon={<Leaf size={26} className="text-white" />} title="100% Fresh" desc="Sourced daily from local farms" />
            <FreshnessCard icon={<HeartPulse size={26} className="text-white" />} title="No Added Sugar" desc="Natural sweetness only" />
            <FreshnessCard icon={<Hand size={26} className="text-white" />} title="Hygienic Prep" desc="Prepared in clean kitchen" />
            <FreshnessCard icon={<Recycle size={26} className="text-white" />} title="Eco Packaging" desc="100% biodegradable materials" />
          </div>
        </div>
      </section>

      {/* SUBSCRIPTION OFFER */}
      <section className="relative z-10 mt-20 md:mt-32 py-5 px-4 bg-[#FBF8F2] overflow-hidden rounded-[2.2rem]">
        <div
          className="absolute inset-0 z-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage: "url('/images/main-background.webp')",
            backgroundSize: "400px",
            backgroundRepeat: "repeat",
          }}
        ></div>

        <div className="relative z-10 text-center mb-14 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight uppercase">
            Subscription Model
          </h2>
          <div className="w-24 h-2 bg-[#C9C27A] mx-auto mt-4 mb-6"></div>
          <p className="text-gray-700 text-lg font-bold leading-relaxed px-2">
            Premium plans designed for convenience, savings, and consistent nutrition.
          </p>
        </div>

        <div className="relative z-20 max-w-6xl mx-auto flex flex-col md:flex-row items-stretch justify-center gap-8">
          {[
            {
              id: "individual",
              title: "Individual Plan",
              category: "Personal Wellness",
              icon: <Gem size={32} />,
              type: "white",
              description: "Perfect for daily health enthusiasts seeking consistent nutrition.",
              features: ["Personalized fruit selection", "Daily or weekly delivery", "Flexible plans", "Cancel anytime"],
            },
            {
              id: "corporate",
              title: "Corporate Plan",
              category: "Business Vitality",
              icon: <Building2 size={32} />,
              type: "green",
              description: "Ideal for offices looking to boost workplace productivity and health.",
              features: ["Individual Benifits Included", "Bulk ordering discounts", "Office pantry delivery", "Account manager"],
              premium: true,
            },
          ].map((plan) => {
            const isGreen = plan.type === "green";

            return (
              <div
                key={plan.id}
                className={`group relative w-full max-w-[420px] rounded-[32px] border-[3px] border-[#C9C27A] transition-all duration-500 overflow-hidden
                ${isGreen ? "bg-[#2D5A27] text-white shadow-2xl" : "bg-white text-gray-900 shadow-lg"}
                hover:-translate-y-4 hover:shadow-[0_20px_50px_rgba(201,194,122,0.4)]`}
              >
                {plan.premium && (
                  <div className="absolute top-0 right-0 overflow-hidden w-40 h-40 z-20">
                    <div className="absolute top-8 -right-10 w-48 py-2 bg-gradient-to-r from-[#C9C27A] via-yellow-400 to-[#C9C27A] text-[#2D5A27] text-center font-black text-[12px] uppercase tracking-widest shadow-xl transform rotate-45 border-y-2 border-white/30">
                      <div className="flex items-center justify-center gap-1">
                        <Crown size={14} /> Premium
                      </div>
                    </div>
                  </div>
                )}

                <div className="p-10 h-full flex flex-col">
                  <div className="flex justify-between items-start mb-8">
                    <div className={`p-5 rounded-2xl shadow-lg ${isGreen ? "bg-white text-[#2D5A27]" : "bg-[#FBF8F2] text-[#C9C27A]"}`}>
                      {plan.icon}
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] mt-2 ${isGreen ? "text-[#C9C27A]" : "text-gray-400"}`}>
                      {plan.category}
                    </span>
                  </div>

                  <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter">{plan.title}</h3>
                  <p className={`text-sm font-bold mb-8 leading-relaxed ${isGreen ? "text-green-100" : "text-gray-500"}`}>
                    {plan.description}
                  </p>

                  <div className="space-y-4 mb-2 flex-grow">
                    {plan.features.map((feature, i) => (
                      <div key={i} className={`flex items-center gap-3 border-b pb-2 ${isGreen ? "border-white/10" : "border-gray-100"}`}>
                        <Check size={18} className={isGreen ? "text-[#C9C27A]" : "text-[#2D5A27]"} strokeWidth={4} />
                        <span className="text-sm font-black uppercase tracking-tight">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="relative z-30 flex justify-center mt-16">
          <button
            onClick={() => navigate("/subscription")}
            className="group relative px-12 sm:px-16 py-5 sm:py-6 bg-[#1a3a4a] rounded-full overflow-hidden shadow-2xl hover:shadow-[0_20px_50px_rgba(26,58,74,0.4)] transition-all duration-500 hover:-translate-y-2"
          >
            <div className="absolute inset-0 bg-[#255169] translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            <span className="relative flex items-center gap-3 text-white font-black text-lg sm:text-xl uppercase">
              Explore All Plans <Sparkles size={22} className="text-[#C9C27A]" />
            </span>
          </button>
        </div>
      </section>

      {/* FLOATING ORDER BAR */}
      <AnimatePresence>
        {selectedBowls.length > 0 && (
          <motion.div
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            className="fixed bottom-24 md:bottom-6 left-0 right-0 px-3 sm:px-4 flex justify-center z-50"
          >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden border border-gray-100">
              <div className="h-1 bg-gray-100">
                <div
                  className="h-full bg-green-600 transition-all duration-300"
                  style={{ width: `${Math.min((selectedBowls.length / 5) * 100, 100)}%` }}
                ></div>
              </div>
              <div className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="bg-green-100 p-2 rounded-xl">
                    <ShoppingBag className="w-5 h-5 text-green-700" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-600 truncate">
                      {selectedBowls.length} {selectedBowls.length === 1 ? "item" : "items"} selected
                    </p>
                    <p className="text-xs text-gray-500 truncate mt-0.5">
                      {selectedBowls.map((item) => item.title).join(", ")}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      {selectedBowls.slice(0, 3).map((item) => (
                        <img
                          key={item.id}
                          src={item.image}
                          alt={item.title}
                          className="w-6 h-6 rounded-full object-cover border-2 border-white"
                        />
                      ))}
                      {selectedBowls.length > 3 && (
                        <span className="text-xs text-gray-500 ml-1">+{selectedBowls.length - 3}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-4">
                  <div className="text-left sm:text-right">
                    <p className="text-xs text-gray-500">Total</p>
                    <p className="text-lg sm:text-xl font-black text-gray-900">Rs. {totalSelectedPrice}</p>
                  </div>
                  <button
                    onClick={handleBulkAddToCart}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold transition shadow-lg hover:shadow-xl flex items-center gap-2 text-sm sm:text-base"
                  >
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {toast.show && (
        <div
          className={`fixed top-20 lg:top-[130px] left-3 right-3 sm:left-auto sm:right-6 sm:max-w-sm z-50 px-4 py-3 rounded-xl shadow-2xl border ${
            toast.type === "error"
              ? "bg-red-900 text-white border-red-700"
              : "bg-green-900 text-white border-green-700"
          }`}
        >
          <p className="text-xs md:text-sm font-bold">{toast.message}</p>
        </div>
      )}
    </section>
  );
}

export default FruitShop;
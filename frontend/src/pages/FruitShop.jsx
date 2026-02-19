import { useCart } from "../context/CartContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const products = [
  {
    id: 1,
    title: "Small Bowl",
    tag: "STARTER",
    weight: "250g",
    price: 199,
    description: "Perfect for a light and healthy snack.",
    image: "/images/smallBowl.png",
  },
  {
    id: 2,
    title: "Medium Bowl",
    tag: "MOST POPULAR",
    weight: "400g",
    price: 299,
    description: "Balanced nutrition with great taste.",
    image: "/images/mediumBowl.png",
  },
  {
    id: 3,
    title: "Large Bowl",
    tag: "FAMILY SIZE",
    weight: "900g",
    price: 449,
    description: "Ideal for sharing with friends and family.",
    image: "/images/largeBowl.png",
  },
];

function FruitShop() {
  const { addToCart } = useCart();
  const [selectedBowls, setSelectedBowls] = useState([]);

  // Handle selecting/deselecting multiple items
  const toggleSelection = (product) => {
    const isAlreadySelected = selectedBowls.find((item) => item.id === product.id);
    if (isAlreadySelected) {
      setSelectedBowls(selectedBowls.filter((item) => item.id !== product.id));
    } else {
      setSelectedBowls([...selectedBowls, product]);
    }
  };

  const totalSelectedPrice = selectedBowls.reduce((sum, item) => sum + item.price, 0);

  const handleBulkAddToCart = () => {
    selectedBowls.forEach((item) => addToCart({ ...item, quantity: 1 }));
    alert(`${selectedBowls.length} items added to your cart! 🥗`);
    setSelectedBowls([]);
  };

  return (
    <div className="bg-[#FBF8F2] min-h-screen pb-32 relative overflow-hidden font-sans">
      
      {/* 🎨 Background Distributions (Themed Shapes) */}
      <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-green-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-5%] w-80 h-80 bg-orange-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-[40%] left-[10%] w-20 h-20 bg-green-200/30 rounded-full blur-xl pointer-events-none" />

      {/* 🟢 Main Container: Aligned with Navbar.jsx */}
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        <header className="py-20 text-center">
          <motion.span 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="text-green-700 font-bold tracking-widest uppercase text-sm"
          >
            Freshly Prepared
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-black text-gray-900 mt-2"
          >
            Choose Your <span className="text-orange-500">Bowls</span>
          </motion.h1>
          
          <div className="flex items-center justify-center gap-4 mt-6 mb-12">
            <div className="h-[2px] w-12 bg-green-700" />
            <img src="/images/rice.png" alt="rice" className="w-6 h-6 animate-pulse" />
            <div className="h-[2px] w-12 bg-green-700" />
          </div>
        </header>

        {/* 🥗 Bowls Grid */}
        <section className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => {
            const isSelected = selectedBowls.some((item) => item.id === product.id);

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => toggleSelection(product)}
                className={`group cursor-pointer rounded-[2.5rem] p-4 transition-all duration-500 border-2 ${
                  isSelected 
                  ? "border-green-600 bg-white shadow-2xl ring-8 ring-green-50" 
                  : "border-transparent bg-white shadow-xl hover:shadow-2xl"
                }`}
              >
                {/* Image Section */}
                <div className={`relative rounded-[2rem] overflow-hidden flex items-center justify-center h-56 transition-colors duration-500 ${isSelected ? "bg-green-50" : "bg-orange-50/50"}`}>
                   <img src={product.image} alt={product.title} className="w-48 h-48 object-contain transition-transform duration-500 group-hover:scale-110" />
                   
                   {/* Selection Badge */}
                   <div className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all ${isSelected ? "bg-green-600 scale-100" : "bg-gray-200 scale-0"}`}>
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                   </div>
                </div>

                {/* Content */}
                <div className="px-4 py-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-2xl font-black text-gray-800">{product.title}</h3>
                    <span className="text-sm font-bold text-green-700">{product.weight}</span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed mb-8">{product.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-gray-900">₹{product.price}</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart({ ...product, quantity: 1 });
                        alert(`${product.title} added!`);
                      }}
                      className="bg-green-700 hover:bg-green-800 text-white w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-lg"
                    >
                      <span className="text-2xl">+</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </section>

        {/* 🛒 Floating Order Bar (Themed) */}
        <AnimatePresence>
          {selectedBowls.length > 0 && (
            <motion.div 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="fixed bottom-10 left-0 right-0 px-6 z-50 flex justify-center"
            >
              <div className="bg-green-800 text-white px-8 py-5 rounded-[2rem] shadow-[0_20px_50px_rgba(21,94,117,0.3)] flex justify-between items-center w-full max-w-4xl border border-white/20 backdrop-blur-md">
                <div className="flex gap-4 items-center">
                  <div className="bg-white/20 px-4 py-2 rounded-xl">
                    <span className="font-black text-xl">{selectedBowls.length}</span>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-tighter text-green-200">Total Selection</p>
                    <p className="text-lg font-bold leading-tight">Proceed with Items</p>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                   <div className="text-right">
                     <p className="text-[10px] uppercase font-bold text-green-200">Subtotal</p>
                     <p className="text-2xl font-black">₹{totalSelectedPrice}</p>
                   </div>
                   <button 
                    onClick={handleBulkAddToCart}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-xl"
                   >
                     Order Now
                   </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default FruitShop;
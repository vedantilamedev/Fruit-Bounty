import { useNavigate } from "react-router-dom";
import CustomizeStepCard from "./CustomizeStepCard";
import { Apple, Sparkles, Package } from "lucide-react";

function CustomizeBowl() {
  const navigate = useNavigate();

  const steps = [
    {
      stepNo: "01",
      title: "Choose Fruits",
      desc: "Handpick from 20+ seasonal, freshly sourced fruits packed with nutrients and natural sweetness.",
      icon: <Apple size={28} />,
    },
    {
      stepNo: "02",
      title: "Add Toppings",
      desc: "Enhance your bowl with premium toppings like nuts, honey, yogurt, seeds & crunchy granola.",
      icon: <Sparkles size={28} />,
    },
    {
      stepNo: "03",
      title: "Pick Size",
      desc: "Select the perfect portion — Small, Medium, Large or Family pack for sharing.",
      icon: <Package size={28} />,
    },
  ];

  return (
    <section className="relative py-8 md:py-12 px-6 md:px-16 lg:px-24 overflow-hidden bg-[#FBF8F2]">
      {/* 1. BACKGROUND IMAGE LAYER */}
      <div 
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        style={{ 
          backgroundImage: `url('/public/images/main-background.PNG')`,
          backgroundSize: '400px',
          backgroundRepeat: 'repeat'
        }}
      ></div>

      {/* 2. HEADING SECTION */}
      <div className="relative z-10 text-center mb-8 md:mb-12 max-w-2xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
          Customize Your Bowl
        </h2>
        <div className="w-16 h-1 bg-[#2D5A27] mx-auto mt-3 mb-6 rounded-full"></div>
        
        <div className="space-y-4">
          <p className="text-gray-700 text-lg md:text-xl font-bold leading-tight">
            Build your perfect fruit bowl exactly the way you like it.
          </p>
          <p className="text-gray-500 text-sm md:text-base font-medium leading-relaxed max-w-xl mx-auto">
            Experience the ultimate flexibility in healthy eating. At Fruit's Bounty, we believe your 
            nutrition should be as unique as your palate. Hand-select your favorite seasonal fruits, 
            premium toppings, and the perfect portion size.
          </p>
        </div>
      </div>

      {/* 3. STEPS GRID - Centered Alignment */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 max-w-6xl mx-auto justify-items-center items-stretch">
        {steps.map((step, index) => (
          <div key={index} className="w-full flex justify-center">
            <CustomizeStepCard step={step} index={index} />
          </div>
        ))}
      </div>

      {/* 4. CTA - Centered Alignment */}
      <div className="relative z-10 flex justify-center mt-12">
        <button
          onClick={() => navigate("/customize")}
          className="bg-gradient-to-r from-green-700 to-green-900
          hover:from-green-800 hover:to-green-950
          text-white px-14 py-4 rounded-full font-bold text-lg
          shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
        >
          Build Your Bowl →
        </button>
      </div>

      <style>{`
        section {
            background-color: #FBF8F2;
        }
      `}</style>
    </section>
  );
}

export default CustomizeBowl;
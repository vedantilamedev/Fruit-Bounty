import { useEffect, useRef, useState } from "react";
import { 
  Gem, 
  Building2, 
  Check, 
  Sparkles, 
  Crown 
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Subscription() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const plans = [
    {
      id: "individual",
      title: "Individual Plan",
      category: "Personal Wellness",
      icon: <Gem size={32} />,
      type: "white",
      description: "Perfect for daily health enthusiasts seeking consistent nutrition.",
      features: ["Personalized fruit selection", "Daily or weekly delivery", "Flexible plans", "Cancel anytime"]
    },
    {
      id: "corporate",
      title: "Corporate Plan",
      category: "Business Vitality",
      icon: <Building2 size={32} />,
      type: "green",
      description: "Ideal for offices looking to boost workplace productivity and health.",
      features: ["Individual Benifits Included","Bulk ordering discounts", "Office pantry delivery", "Account manager"],
      premium: true
    }
  ];

  return (
    <section ref={sectionRef} className="relative py-24 px-4 bg-[#FBF8F2] overflow-hidden">
      {/* 1. ORIGINAL BRANDED BACKGROUND */}
      <div 
        className="absolute inset-0 z-0 opacity-30 pointer-events-none"
        style={{ 
          backgroundImage: `url('/public/images/main-background.webp')`,
          backgroundSize: '400px',
          backgroundRepeat: 'repeat'
        }}
      ></div>

      {/* 2. SIMPLE BOLD HEADING */}
      <div className={`relative z-10 text-center mb-16 max-w-3xl mx-auto transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}`}>
        <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight uppercase">
          Subscription Model
        </h2>
        <div className="w-24 h-2 bg-[#C9C27A] mx-auto mt-4 mb-6"></div>
        <p className="text-gray-700 text-lg font-bold leading-relaxed px-6">
          Premium plans designed for convenience, savings, and consistent nutrition.
        </p>
      </div>

      {/* 3. PREMIUM CARD LAYOUT (No internal buttons) */}
      <div className="relative z-20 max-w-6xl mx-auto flex flex-col md:flex-row items-stretch justify-center gap-8">
        {plans.map((plan, index) => {
          const isGreen = plan.type === "green";
          
          return (
            <div 
              key={plan.id}
              className={`group relative w-full max-w-[420px] rounded-[32px] border-[3px] border-[#C9C27A] transition-all duration-500 overflow-hidden
                ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}
                ${isGreen ? "bg-[#2D5A27] text-white shadow-2xl" : "bg-white text-gray-900 shadow-lg"}
                hover:-translate-y-4 hover:shadow-[0_20px_50px_rgba(201,194,122,0.4)]`}
            >
              {/* PREMIUM GOLDEN RIBBON */}
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
                {/* CATEGORY & ICON */}
                <div className="flex justify-between items-start mb-8">
                  <div className={`p-5 rounded-2xl shadow-lg ${isGreen ? "bg-white text-[#2D5A27]" : "bg-[#FBF8F2] text-[#C9C27A]"}`}>
                    {plan.icon}
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-[0.2em] mt-2 ${isGreen ? "text-[#C9C27A]" : "text-gray-400"}`}>
                    {plan.category}
                  </span>
                </div>

                {/* NON-ITALIC BOLD HEADING */}
                <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter">
                  {plan.title}
                </h3>
                
                <p className={`text-sm font-bold mb-8 leading-relaxed ${isGreen ? "text-green-100" : "text-gray-500"}`}>
                  {plan.description}
                </p>

                {/* FEATURES - Specs style */}
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

      {/* 4. REFINED BLUE UPGRADE BUTTON */}
      <div className="relative z-30 flex justify-center mt-16">
        <button
          onClick={() => navigate("/subscription")}
          className="group relative px-16 py-6 bg-[#1a3a4a] rounded-full overflow-hidden shadow-2xl hover:shadow-[0_20px_50px_rgba(26,58,74,0.4)] transition-all duration-500 hover:-translate-y-2"
        >
          {/* ADJACENT SHADE (Teal/Blue-Green) HOVER */}
          <div className="absolute inset-0 bg-[#255169] translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          <span className="relative flex items-center gap-3 text-white font-black text-xl uppercase">
            Explore  All  Plans <Sparkles size={24} className="text-[#C9C27A]" />
          </span>
        </button>
      </div>
    </section>
  );
}

export default Subscription;
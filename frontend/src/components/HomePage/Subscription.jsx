import { useEffect, useRef, useState } from "react";
import { User, Users, Check, Sparkles } from "lucide-react";
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

  return (
    <section
      ref={sectionRef}
      className="relative py-8 md:py-12 bg-[#FBF8F2] overflow-hidden"
    >
      {/* 1. BACKGROUND IMAGE LAYER - Matches SaladSection.jsx logic */}
      <div 
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        style={{ 
          backgroundImage: `url('/public/images/main-background.PNG')`,
          backgroundSize: '400px',
          backgroundRepeat: 'repeat'
        }}
      ></div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* ================= Heading ================= */}
        <div
          className={`transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
        >
          {/* Requested professional font style */}
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
            Subscription Model
          </h2>

          <div className="w-16 h-1 bg-[#2D5A27] mx-auto mt-3 mb-6 rounded-full"></div>

          <p className="text-gray-600 text-sm md:text-base font-medium leading-relaxed max-w-3xl mx-auto">
            Enjoy fresh fruit bowls delivered to you on a regular schedule. Our
            subscription plans are designed to provide convenience, savings, and
            consistent nutrition — whether for personal wellness or corporate
            team benefits.
          </p>
        </div>

        {/* ================= Unified Subscription Card ================= */}
        <div 
          className={`mt-12 max-w-5xl mx-auto transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {/* Main Container Card */}
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl bg-white border border-green-100">
            {/* Inner Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-50/80 via-emerald-50/50 to-green-50/80"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-green-200/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-200/20 rounded-full blur-3xl"></div>

            {/* Content Grid */}
            <div className="relative grid md:grid-cols-2 gap-0">
              
              {/* ========== INDIVIDUAL PLAN ========== */}
              <div className="group p-10 md:p-12 flex flex-col transition-all duration-500 hover:bg-white/50">
                <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <User className="w-8 h-8 text-white" strokeWidth={2.5} />
                </div>

                <h3 className="text-3xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  Individual Plan
                  <Sparkles className="w-6 h-6 text-amber-500" />
                </h3>

                <p className="text-gray-600 text-base leading-relaxed mb-6 text-left">
                  Perfect for daily health enthusiasts who want consistent fresh nutrition delivered to their doorstep.
                </p>

                <ul className="space-y-3 mb-8 flex-1">
                  {[
                    "Personalized fruit selection",
                    "Daily or weekly delivery",
                    "Flexible subscription plans",
                    "Cancel anytime"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                        <Check className="w-3 h-3 text-green-600" strokeWidth={3} />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => navigate("/subscription", { state: { plan: "individual" } })}
                  className="w-full bg-gradient-to-r from-green-700 to-green-900 hover:from-green-800 hover:to-green-950 text-white font-bold py-4 rounded-xl shadow-lg transition-all duration-300"
                >
                  Choose Individual Plan
                </button>
              </div>

              {/* ========== VERTICAL DIVIDER ========== */}
              <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[80%] w-px">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-300 to-transparent"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-8 h-8 bg-white border-2 border-green-300 rounded-full flex items-center justify-center shadow-md">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Mobile Horizontal Divider */}
              <div className="md:hidden h-px bg-gradient-to-r from-transparent via-green-300 to-transparent my-4 mx-10"></div>

              {/* ========== CORPORATE PLAN ========== */}
              <div className="group p-10 md:p-12 flex flex-col transition-all duration-500 hover:bg-white/50">
                <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-white" strokeWidth={2.5} />
                </div>

                <h3 className="text-3xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  Corporate Plan
                  <Sparkles className="w-6 h-6 text-amber-500" />
                </h3>

                <p className="text-gray-600 text-base leading-relaxed mb-6 text-left">
                  Ideal for offices and teams looking to promote healthy habits and boost workplace productivity.
                </p>

                <ul className="space-y-3 mb-8 flex-1">
                  {[
                    "Bulk ordering discounts",
                    "Office pantry delivery",
                    "Team wellness tracking",
                    "Dedicated account manager"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                        <Check className="w-3 h-3 text-green-600" strokeWidth={3} />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => navigate("/subscription", { state: { plan: "corporate" } })}
                  className="w-full bg-gradient-to-r from-green-700 to-green-900 hover:from-green-800 hover:to-green-950 text-white font-bold py-4 rounded-xl shadow-lg transition-all duration-300"
                >
                  Choose Corporate Plan
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Subscription;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation
import { User, Users, Check, ArrowRight, CalendarDays, Utensils } from "lucide-react";

function Subscription() {
  const navigate = useNavigate(); // Initialize navigation
  const [selectedPlan, setSelectedPlan] = useState('personal');
  const [days, setDays] = useState(30);
  const [isCustom, setIsCustom] = useState(false);
  const [animate, setAnimate] = useState(false);

  // Auto-scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const steps = [7, 14, 21, 30, 60, 90, 180, 365];
  const stepLabels = ["7D", "2W", "3W", "1M", "2M", "3M", "6M", "1Y"];

  const planData = {
    personal: {
      id: "personal",
      title: "Individual Wellness",
      tagline: "Single User • Bespoke",
      description: "A clinical approach to daily nutrition. Hand-picked selections interlocked with your personal health goals.",
      image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=1000",
      benefits: ["Micro-nutrient matching", "Morning delivery", "Farm transparency"],
      pricePerDay: 49
    },
    corporate: {
      id: "corporate",
      title: "Corporate Group",
      tagline: "3+ Persons • Shared Address",
      description: "Designed for teams. We deliver premium fruit bowls to 3 or more people at a single address with fully customizable daily meals.",
      image: "/images/custom-bowl.webp",
      benefits: ["Group Bowl Service (3+)", "Everyday Custom Meals", "Single Address Logistics", "Team Wellness Reports"],
      pricePerDay: 249
    }
  };

  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 400);
    return () => clearTimeout(timer);
  }, [selectedPlan]);

  const handleSliderChange = (e) => {
    setIsCustom(false);
    setDays(steps[e.target.value]);
  };

  const handleCustomDays = (val) => {
    const num = parseInt(val);
    if (num >= 7) {
      setDays(num);
      setIsCustom(true);
    }
  };

  // NAVIGATION FUNCTION
  const handleProceed = () => {
    navigate("/PlanCustomization", { 
      state: { 
        plan: activePlan.id, 
        duration: days,
        priceTotal: activePlan.pricePerDay * days 
      } 
    });
  };

  const activePlan = planData[selectedPlan];

  return (
    <section className="relative min-h-screen py-10 md:py-16 bg-[#faf9f6] text-gray-900 overflow-hidden">
      
      {/* BACKGROUND PATTERN */}
      <div 
        className="absolute inset-0 opacity-[0.6] pointer-events-none"
        style={{
          backgroundImage: `url('/images/main-background.webp')`,
          backgroundSize: '400px',
          backgroundRepeat: 'repeat',
          backgroundAttachment: 'fixed'
        }}
      ></div>

      <div className="relative max-w-6xl mx-auto px-6">
        
        {/* ================= REFINED HEADING ================= */}
        <div className="text-center mb-10 md:mb-14">
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight uppercase">
                Subscription <span className="text-[#C9C27A]">Models</span>
            </h1>
            <p className="text-gray-500 font-bold text-[10px] md:text-xs max-w-lg mx-auto uppercase tracking-[0.2em] mt-3 leading-relaxed">
                Select your plan and customize your journey.
            </p>
        </div>

        {/* ================= MAIN DYNAMIC CARD ================= */}
        <div className={`
          relative w-full max-w-4xl mx-auto bg-white rounded-[32px] md:rounded-[40px] overflow-hidden 
          border-[3px] border-[#C9C27A] shadow-2xl flex flex-col lg:flex-row min-h-[480px]
          transition-all duration-500
          ${animate ? "scale-[0.98] opacity-90" : "scale-100 opacity-100"}
        `}>
          
          {/* IMAGE SIDE */}
          <div className="lg:w-[38%] relative bg-gray-100 min-h-[200px] lg:min-h-full">
             <img src={activePlan.image} alt="Plan" className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
             <div className="absolute bottom-6 left-6 text-white">
                <div className="flex items-center gap-2 mb-1">
                   <Utensils size={12} className="text-[#C9C27A]" />
                   <p className="text-[#C9C27A] font-black text-[9px] uppercase tracking-widest">{activePlan.tagline}</p>
                </div>
                <h3 className="text-xl md:text-2xl font-black uppercase  leading-none">{activePlan.title}</h3>
             </div>
          </div>

          {/* CONTENT SIDE */}
          <div className="lg:w-[62%] p-6 md:p-10 bg-white flex flex-col justify-center">
            <h2 className="text-xl font-black text-gray-900 mb-4 uppercase tracking-tighter">
                Plan <span className="text-[#C9C27A]">Core Features</span>
            </h2>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {activePlan.benefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-2 bg-[#faf9f6] px-3 py-2 rounded-xl border border-gray-100 shadow-sm">
                  <div className="w-4 h-4 rounded-full bg-green-800 flex items-center justify-center flex-shrink-0">
                    <Check className="w-2.5 h-2.5 text-[#C9C27A]" strokeWidth={5} />
                  </div>
                  <span className="text-[9px] font-black text-gray-700 uppercase tracking-tight">{benefit}</span>
                </div>
              ))}
            </div>

            {/* DURATION PANEL */}
            <div className="bg-[#faf9f6] p-5 md:p-7 rounded-[24px] border border-gray-100">
               <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
                  <div className="flex items-center gap-2 text-green-950">
                    <CalendarDays size={16} className="text-[#C9C27A]" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Delivery Duration</span>
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <input 
                      type="number" min="7" placeholder="Custom Days"
                      onChange={(e) => handleCustomDays(e.target.value)}
                      className="flex-1 sm:w-24 bg-white border border-gray-200 rounded-lg px-2 py-2 text-xs font-bold text-center focus:border-[#C9C27A] outline-none shadow-inner"
                    />
                    <div className="bg-green-900 text-[#C9C27A] px-4 py-2 rounded-lg text-xs font-black shadow-md">
                        {days} Days
                    </div>
                  </div>
               </div>

               <div className="px-1">
                 <input 
                    type="range" min="0" max="7" step="1"
                    value={isCustom ? 0 : steps.indexOf(days) === -1 ? 0 : steps.indexOf(days)}
                    onChange={handleSliderChange}
                    className="w-full h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-green-800 transition-all hover:accent-[#C9C27A]"
                 />
                 <div className="flex justify-between mt-3">
                    {stepLabels.map((l, i) => (
                      <span key={i} className={`text-[8px] font-black ${steps[i] === days && !isCustom ? 'text-green-800' : 'text-gray-400'}`}>{l}</span>
                    ))}
                 </div>
               </div>

               <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-center sm:text-left">
                    <p className="text-[8px] font-black text-gray-400 uppercase mb-0.5 tracking-widest">Total Premium Value</p>
                    <p className="text-2xl font-black text-green-950 ">₹{(activePlan.pricePerDay * days).toLocaleString()}</p>
                  </div>
                  <button 
                    onClick={handleProceed}
                    className="w-full sm:w-auto bg-green-900 text-white px-8 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all active:scale-95 shadow-lg flex items-center justify-center gap-2"
                  >
                    Customize Meal <ArrowRight className="w-4 h-4" />
                  </button>
               </div>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM TOGGLE CARDS ================= */}
        <div className="grid grid-cols-2 gap-3 md:gap-5 mt-8 max-w-xl mx-auto">
          <button 
            onClick={() => {setSelectedPlan('personal'); setIsCustom(false); setDays(30);}}
            className={`p-4 md:p-5 rounded-[24px] border-2 flex flex-col md:flex-row items-center gap-3 transition-all
            ${selectedPlan === 'personal' ? 'bg-white border-[#C9C27A] shadow-xl -translate-y-1' : 'bg-white/40 border-transparent hover:bg-white/60'}`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selectedPlan === 'personal' ? 'bg-green-900 text-[#C9C27A]' : 'bg-gray-200 text-gray-400'}`}>
              <User size={18} />
            </div>
            <div className="text-center md:text-left">
              <h4 className="font-black text-gray-900 text-[10px] md:text-xs uppercase">Individual</h4>
              <p className="text-[8px] font-bold text-[#C9C27A] uppercase tracking-tighter">Single User</p>
            </div>
          </button>

          <button 
            onClick={() => {setSelectedPlan('corporate'); setIsCustom(false); setDays(30);}}
            className={`p-4 md:p-5 rounded-[24px] border-2 flex flex-col md:flex-row items-center gap-3 transition-all
            ${selectedPlan === 'corporate' ? 'bg-white border-[#C9C27A] shadow-xl -translate-y-1' : 'bg-white/40 border-transparent hover:bg-white/60'}`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selectedPlan === 'corporate' ? 'bg-green-900 text-[#C9C27A]' : 'bg-gray-200 text-gray-400'}`}>
              <Users size={18} />
            </div>
            <div className="text-center md:text-left">
              <h4 className="font-black text-gray-900 text-[10px] md:text-xs uppercase">Corporate</h4>
              <p className="text-[8px] font-bold text-[#C9C27A] uppercase tracking-tighter">3+ Persons</p>
            </div>
          </button>
        </div>

      </div>
    </section>
  );
}

export default Subscription;

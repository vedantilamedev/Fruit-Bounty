import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Quote } from "lucide-react";

function Testimonials() {
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8; 
      const scrollTo = direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const testimonials = [
    { name: "Vaishnavi Sharma", review: "The Pink Palace Bowl is divine! Fresh fruits with a royal Jaipur essence. It's the perfect start to my busy mornings.", initials: "VS", type: "green", rating: 5 },
    { name: "Garvit Jain", review: "Best fruit salads in the city! Always fresh, beautifully presented, and delivered right to my doorstep with a smile.", initials: "GJ", type: "white", rating: 4},
    { name: "Vrucha Mehta", review: "Love the customization options! I can create exactly what I want every time. The variety of toppings is truly unmatched.", initials: "VM", type: "green", rating: 4},
    { name: "Ritika Agarwal", review: "The subscription plan makes healthy eating so convenient. Highly recommended for professionals in the city!", initials: "RA", type: "white", rating: 4 },
    { name: "Kunal Singh", review: "Freshness and quality are unmatched. Every bowl feels premium and worth every penny. I've tried many, this is the best.", initials: "KS", type: "green", rating: 5 }
  ];

  return (
<section ref={sectionRef} className="relative pt-10 pb-24 md:pb-32 px-4 overflow-hidden">      {/* 1. MAIN BACKGROUND IMAGE INTEGRATION */}
      <div 
        className="absolute inset-0 z-0 opacity-85 pointer-events-none" 
        style={{ 
            backgroundImage: `url('/public/images/main-background.webp')`, 
            backgroundSize: '400px',
            backgroundRepeat: 'repeat'
        }}
      ></div>
      {/* Subtle overlay to ensure readability */}
      <div className="absolute inset-0 z-0 bg-[#FBF8F2]/60 pointer-events-none"></div>

      {/* Decorative Bunting String */}
      <div className="absolute top-[45%] md:top-[40%] left-0 w-full h-[1px] border-t border-dashed border-[#C9C27A]/60 z-0"></div>

      {/* NATURAL TORN PAPER SVG DEFINITIONS */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="natural-paper-1" clipPathUnits="objectBoundingBox">
            <path d="M0.02,0.02 Q0.1,0.08 0.18,0.01 T0.35,0.05 T0.55,0.01 T0.75,0.06 T0.98,0.02 V0.97 Q0.9,0.92 0.8,0.98 T0.6,0.95 T0.4,1 T0.2,0.94 T0,0.98 Z" />
          </clipPath>
          <clipPath id="natural-paper-2" clipPathUnits="objectBoundingBox">
            <path d="M0,0.05 Q0.15,0.01 0.3,0.04 T0.5,0.01 T0.7,0.05 T0.9,0.01 T1,0.06 V0.94 Q0.85,1 0.7,0.96 T0.5,0.99 T0.3,0.95 T0.1,1 T0,0.95 Z" />
          </clipPath>
          <clipPath id="natural-paper-3" clipPathUnits="objectBoundingBox">
            <path d="M0.03,0.01 Q0.2,0.06 0.4,0.02 T0.6,0.05 T0.8,0.01 T0.97,0.04 V0.98 Q0.8,0.93 0.6,0.97 T0.4,0.93 T0.2,0.98 T0.01,0.94 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className={`relative z-10 text-center mb-8 md:mb-12 max-w-3xl mx-auto transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}`}>
        <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight px-4 ">
          Testimonials
        </h2>
        <div className="w-16 h-1 bg-[#C9C27A] mx-auto mt-4 mb-6"></div>
        <p className="text-gray-700 text-lg md:text-xl font-bold leading-relaxed max-w-2xl mx-auto px-6">
          From sunrise bowls to sunset treats, hear how we're bringing the garden's 
          freshest flavors to doorsteps across the city.
        </p>
      </div>

      <div className="relative z-20 max-w-[1400px] mx-auto">
        
        {/* TOP NAVIGATION BUTTONS */}
        <div className="flex justify-between items-center px-6 mb-4 md:absolute md:top-0 md:w-full md:px-10 md:z-50">
           <button 
             onClick={() => scroll("left")} 
             className="p-3 rounded-full bg-white shadow-lg text-gray-800 hover:bg-[#C9C27A] hover:text-white transition-all border border-gray-100"
             aria-label="Scroll Left"
           >
            <ChevronLeft size={20} />
          </button>
          <button 
             onClick={() => scroll("right")} 
             className="p-3 rounded-full bg-white shadow-lg text-gray-800 hover:bg-[#C9C27A] hover:text-white transition-all border border-gray-100"
             aria-label="Scroll Right"
           >
            <ChevronRight size={20} />
          </button>
        </div>

        <div 
          ref={scrollRef} 
          className="flex -space-x-12 md:-space-x-16 overflow-x-auto no-scrollbar py-16 px-8 md:px-20" 
          style={{ scrollSnapType: "x mandatory", scrollBehavior: "smooth" }}
        >
          {testimonials.map((item, index) => {
            const isGreen = item.type === "green";
            const isExpanded = expandedIndex === index;
            const ripId = `natural-paper-${(index % 3) + 1}`;

            return (
              <div 
                key={index} 
                className={`group min-w-[290px] sm:min-w-[340px] md:min-w-[400px] relative transition-all duration-700 ease-out scroll-snap-align-center
                  ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}
                  ${isExpanded ? 'z-50' : 'z-10 hover:z-30'}
                  hanging-pendant-animation`}
                style={{ 
                    height: isExpanded ? '520px' : '440px', 
                    animationDelay: `${index * 0.2}s`,
                    transformOrigin: 'top center' 
                }}
              >
                {/* Connection Detail */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
                    <div className="w-[2px] h-10 bg-[#C9C27A]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#C9C27A] border-2 border-white shadow-md"></div>
                </div>

                <div className="w-full h-full filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.15)] group-hover:drop-shadow-[0_25px_35px_rgba(0,0,0,0.25)] transition-all duration-500">
                  <div className="w-full h-full p-[1.5px] bg-gray-200/50" style={{ clipPath: `url(#${ripId})` }}>
                    <div 
                      className={`w-full h-full flex flex-col items-center justify-center px-10 md:px-14 py-12 text-center transition-all duration-300 ${isGreen ? "bg-[#2D5A27] text-white" : "bg-white text-[#2D5A27]"}`}
                      style={{ clipPath: `url(#${ripId})` }}
                    >
                      <Quote className={`mb-4 opacity-15 ${isGreen ? "text-white" : "text-gray-400"}`} size={36} />

                      <div className="w-14 h-14 rounded-full border-2 border-[#C9C27A] bg-white/10 flex items-center justify-center font-black text-inherit mb-4 shadow-sm">
                        {item.initials}
                      </div>

                      <div className="flex gap-1 mb-3 text-[#C9C27A]">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-xl">{i < item.rating ? "★" : "☆"}</span>
                        ))}
                      </div>

                      <div className="max-w-[240px]">
                        <p className={`text-[11px] font-black tracking-[0.2em] mb-3 uppercase opacity-70`}>
                          {item.name}
                        </p>
                        
                        <div className={`transition-all duration-500 overflow-hidden ${isExpanded ? 'max-h-[250px]' : 'max-h-[90px]'}`}>
                          <p className="text-base md:text-lg font-bold leading-snug">
                            "{item.review}"
                          </p>
                        </div>

                        {item.review.length > 60 && (
                          <button 
                            onClick={(e) => { e.stopPropagation(); setExpandedIndex(isExpanded ? null : index); }}
                            className="mt-6 p-2 rounded-full border-2 border-[#C9C27A]/40 hover:bg-[#C9C27A] hover:text-white transition-all transform hover:scale-110"
                          >
                            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .scroll-snap-align-center { scroll-snap-align: center; }
        
        @keyframes pendulum {
          0% { transform: rotate(1.5deg); }
          50% { transform: rotate(-1.5deg); }
          100% { transform: rotate(1.5deg); }
        }
        
        .hanging-pendant-animation {
          animation: pendulum 5s ease-in-out infinite;
        }
        
        .group:hover {
          animation-play-state: paused;
        }

        @media (max-width: 768px) {
          .hanging-pendant-animation {
             animation: none;
          }
        }
      `}</style>
    </section>
  );
}

export default Testimonials;
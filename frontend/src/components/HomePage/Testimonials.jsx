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
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const testimonials = [
    { name: "Vaishnavi Sharma", review: "The Pink Palace Bowl is divine! Fresh fruits with a royal Jaipur essence. It's the perfect start to my busy mornings.", initials: "VS", type: "green", rating: 5 },
    { name: "Garvit Jain", review: "Best fruit salads in the city! Always fresh, beautifully presented, and delivered right to my doorstep with a smile.", initials: "GJ", type: "white", rating: 3},
    { name: "Vrucha Mehta", review: "Love the customization options! I can create exactly what I want every time. The variety of toppings is truly unmatched.", initials: "VM", type: "green", rating: 4},
    { name: "Ritika Agarwal", review: "The subscription plan makes healthy eating so convenient. Highly recommended for professionals in the city!", initials: "RA", type: "white", rating: 4 },
    { name: "Kunal Singh", review: "Freshness and quality are unmatched. Every bowl feels premium and worth every penny. I've tried many, this is the best.", initials: "KS", type: "green", rating: 5 }
  ];

  return (
    <section ref={sectionRef} className="relative py-24 px-4 bg-[#FBF8F2] overflow-hidden">
      {/* 1. BRANDED BACKGROUND LAYER */}
      <div 
        className="absolute inset-0 z-0 opacity-30 pointer-events-none"
        style={{ 
          backgroundImage: `url('/public/images/main-background.PNG')`,
          backgroundSize: '400px',
          backgroundRepeat: 'repeat'
        }}
      ></div>

      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="smoothOctagon" clipPathUnits="objectBoundingBox">
            <path d="M0.3,0 L0.7,0 L1,0.3 L1,0.7 L0.7,1 L0.3,1 L0,0.7 L0,0.3 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className={`relative z-10 text-center mb-20 max-w-3xl mx-auto transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}`}>
        <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight">
          What our customers say
        </h2>
        <div className="w-20 h-1.5 bg-[#C9C27A] mx-auto mt-4 mb-6 rounded-full"></div>
        <p className="text-gray-600 text-lg font-medium leading-relaxed px-6">
          Discover why health enthusiasts trust us for their daily dose of freshness. 
          Real stories from our community members.
        </p>
      </div>

      <div className="relative z-20 max-w-[1400px] mx-auto">
        <button onClick={() => scroll("left")} className="absolute -left-2 top-1/2 -translate-y-1/2 z-40 p-4 rounded-full bg-white shadow-xl text-gray-900 hover:text-[#C9C27A] transition-all border border-gray-100 hidden md:block">
          <ChevronLeft size={24} />
        </button>
        <button onClick={() => scroll("right")} className="absolute -right-2 top-1/2 -translate-y-1/2 z-40 p-4 rounded-full bg-white shadow-xl text-gray-900 hover:text-[#C9C27A] transition-all border border-gray-100 hidden md:block">
          <ChevronRight size={24} />
        </button>

        <div 
          ref={scrollRef} 
          className="flex -space-x-3 md:-space-x-6 overflow-x-auto no-scrollbar py-24 px-10" 
          style={{ scrollSnapType: "x mandatory" }}
        >
          {testimonials.map((item, index) => {
            const isGreen = item.type === "green";
            const isExpanded = expandedIndex === index;
            const isLongText = item.review.length > 70;
            
            return (
              <div 
                key={index} 
                className={`group min-w-[310px] md:min-w-[400px] relative transition-all duration-500 ease-out scroll-snap-align-center
                  ${visible ? "opacity-100 scale-100" : "opacity-0 scale-90"}
                  ${isExpanded ? 'z-50 !translate-y-[-30px] !rotate-0' : 'z-10 hover:z-30 hover:!translate-y-[-30px] hover:!rotate-0'}
                  card-wave-animation`}
                style={{ 
                    transitionDelay: `${index * 80}ms`,
                    height: isExpanded ? '540px' : '440px',
                    animationDelay: `${index * 0.4}s` 
                }}
              >
                <div className="w-full h-full filter drop-shadow-lg group-hover:drop-shadow-[0_20px_50px_rgba(201,194,122,0.4)] transition-all duration-300">
                  <div className="w-full h-full p-[3px] bg-[#C9C27A]" style={{ clipPath: "url(#smoothOctagon)" }}>
                    <div 
                      className={`w-full h-full flex flex-col items-center justify-center px-12 text-center transition-all duration-300 ${isGreen ? "bg-[#2D5A27] text-white" : "bg-white text-[#2D5A27]"}`}
                      style={{ clipPath: "url(#smoothOctagon)" }}
                    >
                      <Quote className={`mb-4 opacity-20 ${isGreen ? "text-[#C9C27A]" : "text-gray-300"}`} size={40} />

                      <div className="w-16 h-16 rounded-full border-2 border-[#C9C27A] bg-gray-50 flex items-center justify-center font-black text-[#2D5A27] mb-4 shadow-inner transform group-hover:scale-110 transition-transform">
                        {item.initials}
                      </div>

                      {/* UPDATED DYNAMIC RATINGS */}
                      <div className="flex gap-1 mb-3 text-[#C9C27A]">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-xl">
                            {i < item.rating ? "★" : "☆"}
                          </span>
                        ))}
                      </div>

                      <div className="max-w-[220px] md:max-w-[260px] relative">
                        <p className={`text-[11px] font-bold tracking-widest mb-2 ${isGreen ? "text-[#C9C27A]" : "text-gray-400"}`}>
                          {item.name.toUpperCase()}
                        </p>
                        
                        <div className={`transition-all duration-500 overflow-hidden ${isExpanded ? 'max-h-[300px]' : 'max-h-[66px]'}`}>
                          <p className="text-[14px] md:text-[16px] font-medium leading-snug italic">
                            "{item.review}"
                          </p>
                        </div>

                        {isLongText && (
                          <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                setExpandedIndex(isExpanded ? null : index);
                            }}
                            className={`mt-4 p-2 rounded-full border border-[#C9C27A]/40 transition-all duration-300 hover:bg-[#C9C27A] hover:text-white`}
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
        @keyframes wave {
          0%, 100% { transform: translateY(0) rotate(1.5deg); }
          50% { transform: translateY(-12px) rotate(-1.5deg); }
        }
        .card-wave-animation { animation: wave 5s ease-in-out infinite; }
        .group:hover { animation: none !important; }
      `}</style>
    </section>
  );
}

export default Testimonials;
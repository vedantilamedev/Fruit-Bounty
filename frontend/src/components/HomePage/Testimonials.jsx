import { useEffect, useRef, useState } from "react";

function Testimonials() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const testimonials = [
    {
      name: "Vaishnavi Sharma",
      city: "Jaipur",
      review:
        "The Pink Palace Bowl is absolutely divine! Fresh fruits with a royal Jaipur essence.",
      initials: "VS",
    },
    {
      name: "Garvit Jain",
      city: "Jaipur",
      review:
        "Best fruit salads in the city! Always fresh, beautifully presented, and delivered on time.",
      initials: "GJ",
    },
    {
      name: "Vrucha Mehta",
      city: "Jaipur",
      review:
        "Love the customization options! I can create exactly what I want every single time.",
      initials: "VM",
    },
    {
      name: "Ritika Agarwal",
      city: "Udaipur",
      review:
        "The subscription plan makes healthy eating so convenient. Highly recommended!",
      initials: "RA",
    },
    {
      name: "Kunal Singh",
      city: "Delhi",
      review: "Freshness and quality are unmatched. Every bowl feels premium.",
      initials: "KS",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-8 md:py-12 px-6 md:px-16 lg:px-24 bg-[#FBF8F2] overflow-hidden"
    >
      {/* 1. BACKGROUND IMAGE LAYER - Reference from SaladSection.jsx */}
      <div 
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        style={{ 
          backgroundImage: `url('/public/images/main-background.PNG')`,
          backgroundSize: '400px',
          backgroundRepeat: 'repeat'
        }}
      ></div>

      {/* 2. HEADING SECTION - Shortened spacing and bold font style */}
      <div
        className={`relative z-10 text-center mb-10 md:mb-14 max-w-2xl mx-auto transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
        }`}
      >
        <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
          What Our Customers Say
        </h2>

        <div className="w-16 h-1 bg-[#2D5A27] mx-auto mt-3 mb-6 rounded-full"></div>

        <p className="text-gray-600 text-sm md:text-base font-medium leading-relaxed">
          Our customers love the freshness, customization, and premium quality
          we deliver. Here’s what fruit lovers across different cities have to
          say.
        </p>
      </div>

      {/* 3. AUTO SCROLL WRAPPER */}
      <div className="relative z-10 overflow-hidden group">
        <div className="flex gap-10 animate-scroll group-hover:[animation-play-state:paused] w-max">
          {[...testimonials, ...testimonials].map((item, index) => (
            <div
              key={index}
              className="min-w-[300px] max-w-[320px] rounded-3xl border border-green-200 bg-white p-8 shadow-md transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:scale-105"
            >
              {/* Stars */}
              <div className="flex text-yellow-400 mb-4">
                {Array(5)
                  .fill()
                  .map((_, i) => (
                    <span key={i}>★</span>
                  ))}
              </div>

              {/* Review */}
              <p className="text-gray-600 italic leading-relaxed mb-6">
                "{item.review}"
              </p>

              {/* Profile */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-600 to-green-800 text-white flex items-center justify-center font-bold">
                  {item.initials}
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800">{item.name}</h4>
                  <p className="text-sm text-gray-500">{item.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Animation */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </section>
  );
}

export default Testimonials;
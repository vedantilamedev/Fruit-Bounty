import { useEffect, useRef, useState } from "react";

function Subscription() {
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

  return (
    <section
      ref={sectionRef}
      className="relative py-20 bg-[#f7f5f0] overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-6 text-center">
        {/* ================= Heading ================= */}
        <div
          className={`transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 font-['Playfair_Display']">
            Subscription Model
          </h2>

          <div className="w-20 h-1 bg-gradient-to-r from-green-600 to-emerald-500 mx-auto mt-4 mb-6 rounded"></div>

          <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
            Enjoy fresh fruit bowls delivered to you on a regular schedule. Our
            subscription plans are designed to provide convenience, savings, and
            consistent nutrition — whether for personal wellness or corporate
            team benefits.
          </p>
        </div>

        {/* ================= Cards ================= */}
        <div className="flex flex-col md:flex-row justify-center gap-12 mt-16">
          {/* Individual Plan */}
          <div
            className={`group relative w-[320px] h-[420px] rounded-3xl overflow-hidden shadow-xl mx-auto
            transition-all duration-700 hover:-translate-y-4 hover:shadow-2xl
            ${
              visible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
          >
            {/* Background Image */}
            <img
              src="/images/subscriptionbg.png"
              alt="Individual"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-green-600/70 to-green-800/80 group-hover:from-green-700/80 group-hover:to-green-900/90 transition-all duration-500"></div>

            {/* Content */}
            <div className="relative h-full flex flex-col items-center justify-end pb-12 text-white">
              <h3 className="text-2xl font-bold mb-4">Individual Plan</h3>
              <p className="text-sm px-6 mb-6 text-white/90 text-center">
                Perfect for daily health enthusiasts who want consistent fresh
                nutrition delivered to their doorstep.
              </p>

              <button
                className="bg-white text-gray-800 font-semibold px-10 py-3 rounded-xl shadow-lg
                hover:scale-105 active:scale-95 transition duration-300"
              >
                Choose Plan
              </button>
            </div>
          </div>

          {/* Corporate Plan */}
          <div
            className={`group relative w-[320px] h-[420px] rounded-3xl overflow-hidden shadow-xl mx-auto
            transition-all duration-700 hover:-translate-y-4 hover:shadow-2xl
            ${
              visible
                ? "opacity-100 translate-x-0 delay-200"
                : "opacity-0 translate-x-12"
            }`}
          >
            {/* Background Image */}
            <img
              src="/images/subscriptionbg.png"
              alt="Corporate"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-green-600/70 to-green-800/80 group-hover:from-green-700/80 group-hover:to-green-900/90 transition-all duration-500"></div>

            {/* Content */}
            <div className="relative h-full flex flex-col items-center justify-end pb-12 text-white">
              <h3 className="text-2xl font-bold mb-4">Corporate Plan</h3>
              <p className="text-sm px-6 mb-6 text-white/90 text-center">
                Ideal for offices and teams looking to promote healthy habits
                and boost workplace productivity.
              </p>

              <button
                className="bg-white text-gray-800 font-semibold px-10 py-3 rounded-xl shadow-lg
                hover:scale-105 active:scale-95 transition duration-300"
              >
                Choose Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Subscription;

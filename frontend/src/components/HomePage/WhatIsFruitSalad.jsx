import { useEffect, useRef, useState } from "react";
import { Sprout, HeartPulse, Salad } from "lucide-react";

function WhatIsFruitSalad() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const cards = [
    {
      icon: <Sprout size={30} strokeWidth={2.2} />,
      title: "100% Natural",
      desc1:
        "Made using only fresh, preservative-free fruits sourced from trusted farms.",
      desc2:
        "No artificial colors or added sugars — just pure, clean nutrition.",
    },
    {
      icon: <HeartPulse size={30} strokeWidth={2.2} />,
      title: "Vitamin Rich",
      desc1:
        "Packed with essential vitamins, fiber and antioxidants for overall wellness.",
      desc2: "Supports immunity, digestion and natural daily energy levels.",
    },
    {
      icon: <Salad size={30} strokeWidth={2.2} />,
      title: "Freshly Prepared",
      desc1: "Cut and mixed daily to maintain maximum freshness and flavor.",
      desc2: "Delivered fresh so you experience peak taste every time.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-20 px-6 md:px-16 lg:px-24 bg-[#FBF8F2] overflow-hidden"
    >
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(circle_at_20%_30%,rgba(34,197,94,0.08),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(16,185,129,0.08),transparent_40%)]"></div>

      {/* ================= Heading ================= */}
      <div
        className={`relative text-center max-w-3xl mx-auto mb-16 transition-all duration-700
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}`}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 font-['Playfair_Display']">
          What is Fruit Salad?
        </h2>

        <div className="w-20 h-[3px] bg-gradient-to-r from-green-600 to-emerald-500 mx-auto my-6 rounded-full"></div>

        <p className="text-gray-600 leading-relaxed text-lg">
          Fruit salad is a refreshing blend of freshly cut seasonal fruits,
          carefully selected to provide a perfect balance of flavor, texture,
          and nutrition.
        </p>
      </div>

      {/* ================= Cards ================= */}
      <div className="relative grid gap-10 md:gap-12 items-stretch md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`relative rounded-3xl p-[1px]
            bg-gradient-to-br from-green-400/40 via-emerald-300/40 to-green-600/40
            transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]
            ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
            style={{
              transitionDelay: visible ? `${index * 200}ms` : "0ms",
            }}
          >
            {/* Inner Card */}
            <div className="bg-white rounded-3xl p-8 shadow-md hover:-translate-y-3 hover:shadow-2xl transition-all duration-500 flex flex-col h-full group">
              {/* Icon */}
              <div className="relative mb-6 flex justify-center">
                <div className="absolute w-20 h-20 rounded-full bg-green-300 blur-xl opacity-30 group-hover:opacity-50 transition"></div>

                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-green-700 relative z-10 group-hover:scale-110 transition duration-300">
                  {card.icon}
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                {card.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed text-center">
                {card.desc1}
              </p>

              <p className="text-gray-500 text-sm mt-3 text-center">
                {card.desc2}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhatIsFruitSalad;

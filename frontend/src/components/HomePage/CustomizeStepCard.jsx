import { useEffect, useRef, useState } from "react";

function CustomizeStepCard({ step, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.25 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`
        relative rounded-3xl p-[1px]
        bg-gradient-to-br from-green-400/40 via-emerald-300/40 to-green-600/40
        transition-all duration-700
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
      `}
      style={{
        transitionDelay: visible ? `${index * 150}ms` : "0ms",
      }}
    >
      {/* Inner Card */}
      <div className="bg-white rounded-3xl p-8 shadow-md hover:-translate-y-3 hover:shadow-2xl transition-all duration-500 flex flex-col h-full text-center group">
        {/* Icon with Premium Glow */}
        <div className="relative mx-auto mb-6">
          <div className="absolute w-20 h-20 rounded-full bg-green-200 blur-xl opacity-40 group-hover:opacity-70 transition"></div>
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-green-700 relative z-10 group-hover:scale-110 transition duration-300">
            {step.icon}
          </div>
        </div>

        {/* Step Number */}
        <span className="text-xs font-semibold bg-green-700 text-white px-4 py-1 rounded-full mx-auto">
          Step {step.stepNo}
        </span>

        {/* Title */}
        <h3 className="mt-4 text-xl font-bold text-gray-800">{step.title}</h3>

        {/* Description */}
        <p className="mt-3 text-gray-500 text-sm leading-relaxed">
          {step.desc}
        </p>
      </div>
    </div>
  );
}

export default CustomizeStepCard;

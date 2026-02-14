import { useEffect, useRef, useState } from "react";

function CustomizeStepCard({ step, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.25 },
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  const getHiddenState = () => {
    if (index === 0) return "opacity-0 -translate-x-20";
    if (index === 1) return "opacity-0 -translate-y-20";
    if (index === 2) return "opacity-0 translate-x-20";
    return "";
  };

  return (
    <div
      ref={ref}
      className={`
        flex flex-col items-center text-center max-w-[260px]
        transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]
        ${visible ? "opacity-100 translate-x-0 translate-y-0" : getHiddenState()}
      `}
    >
      {/* Icon Circle */}
      <div
        className="
          w-24 h-24
          rounded-full
          bg-[#B7B06A]
          flex items-center justify-center
          shadow-md
        "
      >
        <img
          src={step.image}
          alt={step.title}
          className="w-10 h-10 object-contain"
        />
      </div>

      {/* Step Badge */}
      <span
        className="
          mt-4
          text-xs
          bg-green-100
          text-green-700
          px-3 py-1
          rounded-full
          font-semibold
        "
      >
        {step.stepNo}
      </span>

      {/* Title */}
      <h3 className="mt-3 text-xl font-bold text-gray-800">{step.title}</h3>

      {/* Description */}
      <p className="mt-2 text-gray-500 text-sm leading-relaxed">{step.desc}</p>
    </div>
  );
}

export default CustomizeStepCard;

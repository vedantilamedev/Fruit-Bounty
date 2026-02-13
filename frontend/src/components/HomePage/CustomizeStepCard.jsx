function CustomizeStepCard({ step }) {
  return (
    <div className="flex flex-col items-center text-center max-w-[260px]">
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

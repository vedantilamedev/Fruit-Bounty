import CustomizeStepCard from "./CustomizeStepCard";

function CustomizeBowl() {
  const steps = [
    {
      stepNo: "Step 1",
      title: "Choose Fruits",
      desc: "Select from 20+ fresh seasonal fruits",
      image: "/images/step1.png",
    },
    {
      stepNo: "Step 2",
      title: "Add Toppings",
      desc: "Nuts, honey, yogurt, granola & more",
      image: "/images/step2.png",
    },
    {
      stepNo: "Step 3",
      title: "Pick Size",
      desc: "Small, Medium, Large or Family pack",
      image: "/images/step3.png",
    },
  ];

  return (
    <section className="py-24 px-6 md:px-16 lg:px-24 bg-[#FBF8F2]">
      {/* Heading */}
      <div className="text-center mb-20">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Customize Your Bowl
        </h2>

        <p className="text-gray-500 mt-3">
          Create your perfect fruit salad in 3 easy steps
        </p>
      </div>

      {/* Steps */}
      <div
        className="
        grid
        gap-14
        place-items-center
        sm:grid-cols-1
        md:grid-cols-3
      "
      >
        {steps.map((step, index) => (
          <CustomizeStepCard key={index} step={step} />
        ))}
      </div>

      {/* CTA */}
      <div className="flex justify-center mt-20">
        <button
          className="
          bg-green-700
          hover:bg-green-800
          text-white
          px-12 py-4
          rounded-full
          font-semibold
          text-lg
          shadow-lg
          hover:scale-105
          transition
        "
        >
          Build Your Bowl
        </button>
      </div>
    </section>
  );
}

export default CustomizeBowl;

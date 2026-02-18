import { useNavigate } from "react-router-dom";
import CustomizeStepCard from "./CustomizeStepCard";
import { Apple, Sparkles, Package } from "lucide-react";

function CustomizeBowl() {
  const navigate = useNavigate();

  const steps = [
    {
      stepNo: "01",
      title: "Choose Fruits",
      desc: "Handpick from 20+ seasonal, freshly sourced fruits packed with nutrients and natural sweetness.",
      icon: <Apple size={28} />,
    },
    {
      stepNo: "02",
      title: "Add Toppings",
      desc: "Enhance your bowl with premium toppings like nuts, honey, yogurt, seeds & crunchy granola.",
      icon: <Sparkles size={28} />,
    },
    {
      stepNo: "03",
      title: "Pick Size",
      desc: "Select the perfect portion — Small, Medium, Large or Family pack for sharing.",
      icon: <Package size={28} />,
    },
  ];

  return (
    <section className="relative py-16 md:py-20 px-6 md:px-16 lg:px-24 bg-[#FBF8F2] overflow-hidden">
      {/* Soft Background Texture */}
      <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(circle_at_20%_30%,rgba(34,197,94,0.08),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(16,185,129,0.08),transparent_40%)]"></div>

      {/* Heading */}
      <div className="relative text-center mb-16 max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 font-['Playfair_Display']">
          Customize Your Bowl
        </h2>

        <p className="text-gray-500 mt-6 text-lg leading-relaxed">
          Build your perfect fruit bowl exactly the way you like it. From
          selecting farm-fresh fruits to choosing delicious toppings and the
          right portion size — enjoy a fully personalized healthy experience.
        </p>

        <div className="w-24 h-[3px] bg-gradient-to-r from-green-600 to-emerald-500 mx-auto mt-8 rounded-full"></div>
      </div>

      {/* Steps Grid */}
      <div className="relative grid gap-10 md:gap-12 items-stretch md:grid-cols-3">
        {steps.map((step, index) => (
          <CustomizeStepCard key={index} step={step} index={index} />
        ))}
      </div>

      {/* CTA */}
      <div className="relative flex justify-center mt-16">
        <button
          onClick={() => navigate("/customize")}
          className="bg-gradient-to-r from-green-700 to-green-900
          hover:from-green-800 hover:to-green-950
          text-white px-14 py-4 rounded-full font-semibold text-lg
          shadow-xl hover:scale-105 active:scale-95 transition duration-300"
        >
          Build Your Bowl →
        </button>
      </div>
    </section>
  );
}

export default CustomizeBowl;

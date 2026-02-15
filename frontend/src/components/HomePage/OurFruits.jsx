import FruitCard from "./FruitCard";

function OurFruits() {
  const fruits = [
    {
      name: "Strawberries",
      desc: "Sweet & Juicy",
      image: "/images/strawberries.png",
    },
    {
      name: "Pineapple",
      desc: "Tropical Twist",
      image: "/images/pinapple.png",
    },
    {
      name: "Grapes",
      desc: "Crisp & Sweet",
      image: "/images/grapes.png",
    },
    {
      name: "Watermelon",
      desc: "Hydrating",
      image: "/images/watermelon.png",
    },
  ];

  return (
    <section className="py-16 bg-[#FBF8F2]">
      {/* Heading */}
      <div className="text-center mb-14">
        <h2 className="text-3xl font-bold text-gray-800">Our Fruits</h2>

        <div className="w-20 h-[3px] bg-green-700 mx-auto my-3 rounded-full"></div>

        <p className="text-gray-600 text-base">
          Carefully selected seasonal fruits in every bowl
        </p>
      </div>

      {/* Grid */}
      <div
        className="
    max-w-[1100px]
    mx-auto
    px-4
    grid
    grid-cols-4
    gap-x-14
    justify-items-center
  "
      >
        {fruits.map((fruit, index) => (
          <FruitCard key={index} fruit={fruit} />
        ))}
      </div>
    </section>
  );
}

export default OurFruits;

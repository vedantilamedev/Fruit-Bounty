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
    <section className="py-20 bg-[#FBF8F2]">
      {/* Heading */}
      <div className="text-center mb-20">
        <h2 className="text-4xl font-bold text-gray-800">Our Fruits</h2>

        <div className="w-24 h-1 bg-green-700 mx-auto my-4 rounded-full"></div>

        <p className="text-gray-600 text-lg">
          Carefully selected seasonal fruits in every bowl
        </p>
      </div>

      {/* GRID CONTAINER */}
      <div
        className="
          max-w-[1240px]
          mx-auto
          px-6
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-x-14
          gap-y-24
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

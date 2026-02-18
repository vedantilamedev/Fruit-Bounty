import ProductCard from "./ProductCard";

function SaladSection() {
  const products = [
    {
      id: 1,
      title: "Small Bowl",
      tag: "STARTER",
      weight: "250g",
      fruits: "5 Types",
      calories: "120 kcal",
      price: 199,
      description: "Perfect for a light and healthy snack.",
      image: "/images/smallBowl.png",
    },
    {
      id: 2,
      title: "Medium Bowl",
      tag: "MOST POPULAR",
      weight: "400g",
      fruits: "7 Types",
      calories: "190 kcal",
      price: 299,
      description: "Balanced nutrition with great taste.",
      image: "/images/mediumBowl.png",
    },
    {
      id: 3,
      title: "Large Bowl",
      tag: "FAMILY SIZE",
      weight: "900g",
      fruits: "9 Types",
      calories: "280 kcal",
      price: 449,
      description: "Ideal for sharing with friends and family.",
      image: "/images/largeBowl.png",
    },
  ];

  return (
    <section className="py-24 px-6 md:px-14 lg:px-24 bg-[#FBF8F2]">
      {/* Heading */}
      {/* Heading */}
      <div className="text-center mb-20 max-w-2xl mx-auto">
        <h2 className="text-5xl font-bold text-gray-800 font-['Playfair_Display']">
          Our Salad Bowls
        </h2>

        <p className="text-gray-500 mt-5 text-lg leading-relaxed">
          Crafted with handpicked fresh fruits and premium ingredients. Choose
          the perfect portion size that fits your appetite — from a light
          starter to a wholesome family feast.
        </p>

        <div className="w-20 h-[3px] bg-green-800 mx-auto mt-6 rounded-full"></div>
      </div>

      {/* Cards */}
      <div className="grid gap-12 place-items-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </section>
  );
}

export default SaladSection;

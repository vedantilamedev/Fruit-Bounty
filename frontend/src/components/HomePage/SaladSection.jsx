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
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-800">Our Salad Bowls</h2>
        <p className="text-gray-500 mt-3">
          Choose your perfect size and enjoy fresh goodness
        </p>
      </div>

      <div
        className="
        grid
        gap-12
        place-items-center
        sm:grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
      "
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default SaladSection;

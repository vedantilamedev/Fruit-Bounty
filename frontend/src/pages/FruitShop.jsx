import { useCart } from "../context/CartContext";
import { useState } from "react";
import ProductCard from "../components/HomePage/ProductCard";

// 🥗 Bowl Sizes
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

// 🧩 CATEGORY DATA
const categories = [
  {
    title: "🍎 Add Fruits",
    showImage: true,
    items: [
      { id: 1, name: "Orange", price: 20, image: "/images/oranges.png" },
      { id: 2, name: "Pineapple", price: 15, image: "/images/pinapple.png" },
      { id: 3, name: "Kiwi", price: 30, image: "/images/kiwi.png" },
      { id: 4, name: "Watermelon", price: 40, image: "/images/watermelon.png" },
      { id: 5, name: "Mango", price: 25, image: "/images/mango.png" },
      { id: 6, name: "Strawberries", price: 35, image: "/images/strawberries.png" },
    ],
  },

  // ✅ Only One Image Item in Nuts
  {
    title: "🥜 Nuts",
    showImage: true,
    items: [
      {
        id: 7,
        name: "Premium Nuts Mix",
        price: 60,
        image: "/images/dryfruits.png",
      },
    ],
  },

  // ✅ Only Honey Image
  {
    title: "🍯 Sweet Add-ons",
    showImage: true,
    items: [
      {
        id: 8,
        name: "Organic Honey",
        price: 25,
        image: "public/images/honey.png",
      },
    ],
  },

  // ✅ Only Dark Chocolate
  {
    title: "🍫 Chocolate",
    showImage: true,
    items: [
      {
        id: 9,
        name: "Dark Chocolate Syrup ",
        price: 35,
        image: "public/images/darkchocolate.png",
      },
    ],
  },

  // ✅ Healthy Crunch Single
  {
    title: "🌾 Healthy Crunch",
    showImage: true,
    items: [
      {
        id: 10,
        name: "Granola Crunch",
        price: 40,
        image: "/images/crunch.png",
      },
    ],
  },
];


function FruitShop() {
  const { addToCart } = useCart();
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [selectedBowl, setSelectedBowl] = useState(null);

  const toggleTopping = (item) => {
    const exists = selectedToppings.find((t) => t.id === item.id);
    if (exists) {
      setSelectedToppings(selectedToppings.filter((t) => t.id !== item.id));
    } else {
      setSelectedToppings([...selectedToppings, item]);
    }
  };

  const totalPrice =
    (selectedBowl?.price || 0) +
    selectedToppings.reduce((sum, t) => sum + t.price, 0);

  return (
    <div className="bg-[#FBF8F2] min-h-screen">


      {/* 🥗 Bowl Sizes */}
      <section className="py-24 px-6 md:px-14 lg:px-24 text-center">
        <h2 className="text-4xl font-bold text-gray-800">Choose Bowl Size</h2>
        {/* 🌿 Decorative Divider */}
        {/* 🌿 Small Decorative Divider */}
        <div className="flex items-center justify-center gap-3 mt-3 mb-10">

          {/* Left Zigzag */}
          <svg className="flex-1 h-3 max-w-[120px]" viewBox="0 0 200 20" preserveAspectRatio="none">
            <path
              d="M0 10 Q5 0 10 10 T20 10 T30 10 T40 10 T50 10 T60 10 T70 10 T80 10 T90 10 T100 10 T110 10 T120 10 T130 10 T140 10 T150 10 T160 10 T170 10 T180 10 T190 10 T200 10"
              stroke="#444"
              fill="transparent"
              strokeWidth="1.5"
            />
          </svg>

          {/* Small Leaf */}
          <img
            src="public/images/rice.png"
            alt="rice"
            className="w-5 h-5 object-contain"
          />

          {/* Right Zigzag */}
          <svg className="flex-1 h-3 max-w-[120px]" viewBox="0 0 200 20" preserveAspectRatio="none">
            <path
              d="M0 10 Q5 0 10 10 T20 10 T30 10 T40 10 T50 10 T60 10 T70 10 T80 10 T90 10 T100 10 T110 10 T120 10 T130 10 T140 10 T150 10 T160 10 T170 10 T180 10 T190 10 T200 10"
              stroke="#444"
              fill="transparent"
              strokeWidth="1.5"
            />
          </svg>

        </div>


        {/*         <p className="text-gray-500 mt-3 mb-12"> */}
        {/*           Pick your base bowl and customize toppings */}
        {/*         </p> */}

        <div className="grid gap-3 place-items-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">


          {products.map((product) => {
            const isSelected = selectedBowl?.id === product.id;

            return (
              <div
                key={product.id}
                onClick={() => setSelectedBowl(product)}
                className={`cursor-pointer w-72 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border ${isSelected
                    ? "border-green-500 ring-2 ring-green-200"
                    : "border-gray-200"
                  } bg-white`}
              >
                {/* Image Section */}
                <div className="relative bg-orange-50 p-4 flex justify-center items-center">
                  {/* Rating Badge */}
                  <div className="absolute top-3 left-3 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1">
                    ⭐ {product.rating || 4.8}
                  </div>

                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-72 h-32 object-contain"
                  />
                </div>

                {/* Content Section */}
                <div className="p-4 text-left">
                  <h3 className="text-lg font-bold text-gray-800">
                    {product.title}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.weight}
                  </p>

                  {/* Price + Add Button */}
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-bold text-gray-800">
                      ₹{product.price}
                    </span>

                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-400 text-white text-lg hover:bg-orange-500 transition">
                      +
                    </button>
                  </div>
                </div>
              </div>

            );
          })}
        </div>
      </section>


      {/* 🧩 CATEGORY SECTIONS */}
      <section className="px-6 md:px-16 lg:px-24 pb-20">
        {categories
          .filter(
            (category) =>
              ![
                "🥜 Nuts",
                "🍯 Sweet Add-ons",
                "🍫 Chocolate",
                "🌾 Healthy Crunch",
              ].includes(category.title)
          )
          .map((category) => (

            <div key={category.title} className="mb-14">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">{category.title}</h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">



                {category.items.map((item) => {
                  const isSelected = selectedToppings.find((t) => t.id === item.id);

                  if (category.showImage) {
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleTopping(item)}
                        className="cursor-pointer text-center"
                      >
                        {/* Big Image */}
                        <div className="relative inline-block">
                          <img
                            src={item.image}
                            alt={item.name}
                            className={`w-48 h-48 object-contain mx-auto transition duration-300 ${isSelected ? "scale-110" : "hover:scale-105"
                              }`}
                          />

                          {/* ✅ Right Tick When Selected */}
                          {isSelected && (
                            <div className="absolute top-2 right-2 bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md">
                              ✓
                            </div>
                          )}
                        </div>


                        {/* Name */}
                        <p className="mt-2 font-semibold text-gray-800">
                          {item.name}
                        </p>

                        {/* Price */}
                        <p className="text-green-700 font-bold">
                          ₹{item.price}
                        </p>
                      </div>
                    );
                  }


                  // Default pill buttons for other categories
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleTopping(item)}
                      className={`px-4 py-2 rounded-full border transition font-semibold ${isSelected
                          ? "bg-green-600 text-white"
                          : "bg-white text-gray-800 border-gray-300 hover:bg-green-50"
                        }`}
                    >
                      {item.name} (+₹{item.price})
                    </button>
                  );
                })}
              </div>

            </div>
          ))}

        {/* 🔥 4 ITEMS IN SAME ROW */}
        <div className="mb-14">
          <h2 className="text-2xl font-bold mb-8 text-gray-800">
            Add Extras
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {categories
              .filter((cat) =>
                [
                  "🥜 Nuts",
                  "🍯 Sweet Add-ons",
                  "🍫 Chocolate",
                  "🌾 Healthy Crunch",
                ].includes(cat.title)
              )
              .flatMap((category) => category.items)
              .map((item) => {
                const isSelected = selectedToppings.find(
                  (t) => t.id === item.id
                );

                return (
                  <div
                    key={item.id}
                    onClick={() => toggleTopping(item)}
                    className="cursor-pointer text-center"
                  >
                    <div className="relative inline-block">
                      <img
                        src={item.image}
                        alt={item.name}
                        className={`w-40 h-40 object-contain mx-auto transition duration-300 ${isSelected ? "scale-110" : "hover:scale-105"
                          }`}
                      />

                      {isSelected && (
                        <div className="absolute top-2 right-2 bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md">
                          ✓
                        </div>
                      )}
                    </div>

                    <p className="mt-2 font-semibold text-gray-800">
                      {item.name}
                    </p>

                    <p className="text-green-700 font-bold">
                      ₹{item.price}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
        {/* SUMMARY */}
        <div className="mt-10 bg-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="text-lg font-semibold">
              Selected Bowl: {selectedBowl?.title || "None"}
            </h3>
            <h3 className="text-lg font-semibold">
              Selected Toppings: {selectedToppings.length} items
            </h3>
            <p className="text-gray-500 text-sm">
              {selectedToppings.map((t) => t.name).join(", ") || "None"}
            </p>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-2xl font-bold text-green-700">₹{totalPrice}</span>

            <button
              disabled={!selectedBowl}
              onClick={() => {
                addToCart({
                  id: Date.now(),
                  name: selectedBowl.title || "Custom Bowl",
                  bowl: selectedBowl,
                  toppings: selectedToppings,
                  price: totalPrice,
                  quantity: 1,
                });
                alert("Custom bowl added 🥗");
                setSelectedBowl(null);
                setSelectedToppings([]);
              }}
              className={`px-6 py-3 rounded-full font-semibold transition ${selectedBowl
                  ? "bg-green-700 text-white hover:bg-green-800"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FruitShop;

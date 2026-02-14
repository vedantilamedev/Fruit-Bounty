import { useCart } from "../context/CartContext";

const fruitsData = [
  {
    id: 1,
    name: "Grapes",
    price: 120,
    image: "/images/grapes.png",
    available: true,
  },
  {
    id: 2,
    name: "Pineapple",
    price: 60,
    image: "/images/pinapple.png",
    available: true,
  },
  {
    id: 3,
    name: "Watermelon",
    price: 150,
    image: "/images/watermelon.png",
    available: false,
  },
  {
    id: 4,
    name: "Strawberries",
    price: 80,
    image: "/images/strawberries.png",
    available: true,
  },
];

function FruitShop() {
  const { addToCart } = useCart();

  const handleAdd = (fruit) => {
    addToCart({ ...fruit, quantity: 1 });
    alert(`${fruit.name} added to cart 🛒`);
  };

  return (
    <div className="px-6 md:px-16 lg:px-24 py-10 bg-[#FBF8F2] min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
        Fresh Fruits 🍓
      </h1>

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {fruitsData.map((fruit) => (
          <div
            key={fruit.id}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
          >
            <img
              src={fruit.image}
              alt={fruit.name}
              className="w-full h-56 object-contain mb-4"
            />

            <h2 className="text-lg font-semibold text-gray-800">
              {fruit.name}
            </h2>

            <p className="text-green-700 font-bold mt-1">
              ₹{fruit.price} / kg
            </p>

            <p
              className={`text-sm mt-1 ${
                fruit.available ? "text-green-600" : "text-red-500"
              }`}
            >
              {fruit.available ? "In Stock" : "Out of Stock"}
            </p>

            <button
              disabled={!fruit.available}
              onClick={() => handleAdd(fruit)}
              className={`mt-4 w-full py-2 rounded-full font-semibold transition
                ${
                  fruit.available
                    ? "bg-green-700 text-white hover:bg-green-800"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }
              `}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FruitShop;

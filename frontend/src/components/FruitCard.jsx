import { useCart } from "../context/CartContext";

const FruitCard = ({ fruit }) => {
  const { addToCart } = useCart();

  return (
    <div className="border p-4 rounded">
      <h2 className="font-bold">{fruit.name}</h2>
      <p>₹{fruit.price}</p>
      <button
        onClick={() => addToCart(fruit)}
        className="bg-green-600 text-white px-2 py-1 mt-2"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default FruitCard;

import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { total } = useCart();
  const navigate = useNavigate();

  const today = new Date();
  const delivery = new Date();
  delivery.setDate(today.getDate() + 1);

  return (
    <div className="p-6">
      <h1>Checkout</h1>
      <p>Total: ₹{total}</p>
      <p>Delivery: {delivery.toDateString()}</p>

      <button
        onClick={() => navigate("/order-success")}
        className="bg-green-600 text-white px-4 py-2 mt-3"
      >
        Pay Now
      </button>
    </div>
  );
};

export default Checkout;

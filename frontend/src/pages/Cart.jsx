import { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { Trash2, Plus, Minus, ShoppingBag, ReceiptText, ChevronRight, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function CartPage() {
  const { cart, removeFromCart, updateQty, total } = useCart();
  const navigate = useNavigate();

  // Ensure page scrolls to top on load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  // Price Logic
  const deliveryFee = cart.length > 0 ? 40 : 0;
  const platformFee = cart.length > 0 ? 5 : 0;
  const grandTotal = total + deliveryFee + platformFee;

  /** * FIXED LOGIC: 
   * We use item.id (or item._id) to match your Context's expectations.
   * If your context uses Index, replace 'item.id' with 'index' below.
   */
  const handleIncrease = (item) => {
    const targetId = item.id || item._id; // Ensure we get the right identifier
    updateQty(targetId, (item.quantity || 1) + 1);
  };

  const handleDecrease = (item) => {
    const targetId = item.id || item._id;
    if (item.quantity > 1) {
      updateQty(targetId, item.quantity - 1);
    } else {
      removeFromCart(targetId);
    }
  };

  return (
    <div className="bg-[#FBF8F2] min-h-screen pb-24 font-sans">
      {/* Centered Heading */}
      <div className="py-12 text-center px-6">
        <h1 className="text-3xl font-extrabold text-gray-800 flex items-center justify-center gap-2">
          Review Your Bowl <Sparkles className="text-yellow-500" size={24} />
        </h1>
        <p className="text-gray-500 mt-2 font-medium italic">"Health is wealth, start with a bowl."</p>
      </div>

      <div className="max-w-2xl mx-auto px-4 md:px-0 space-y-6">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
            <ShoppingBag size={64} className="text-gray-200 mb-4" />
            <h2 className="text-xl font-bold text-gray-800">Your cart is empty</h2>
            <Link to="/shop" className="mt-6 bg-green-700 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-800 transition-all">
              Go to Menu
            </Link>
          </div>
        ) : (
          <>
            {/* Items List */}
            <div className="space-y-4">
              {cart.map((item, index) => (
                <div 
                  key={item.id || index} 
                  className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm border border-gray-50 hover:border-green-100 transition-all group"
                >
                  {/* Image */}
                  <div className="w-20 h-20 rounded-xl bg-gray-50 overflow-hidden flex-shrink-0 border border-gray-100">
                    <img 
                      src={item.image || "/images/placeholder-bowl.png"} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-800 text-base md:text-lg truncate">{item.name}</h3>
                    <p className="text-green-700 font-extrabold">₹{item.price}</p>
                  </div>

                  {/* FIXED: Functional Stepper */}
                  <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-200">
                    <button 
                      type="button"
                      onClick={() => handleDecrease(item)}
                      className="w-9 h-9 flex items-center justify-center bg-white rounded-lg text-gray-600 hover:text-red-500 shadow-sm active:scale-90 transition-all"
                    >
                      {item.quantity > 1 ? <Minus size={18} /> : <Trash2 size={18} />}
                    </button>
                    
                    <span className="w-10 text-center font-bold text-gray-800 text-sm">
                      {item.quantity || 1}
                    </span>

                    <button 
                      type="button"
                      onClick={() => handleIncrease(item)}
                      className="w-9 h-9 flex items-center justify-center bg-white rounded-lg text-green-700 shadow-sm active:scale-90 transition-all"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bill Details */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
              <div className="flex items-center gap-2 text-gray-800 border-b border-gray-50 pb-3">
                <ReceiptText size={20} className="text-green-600" />
                <h2 className="font-bold">Order Summary</h2>
              </div>
              
              <div className="space-y-3 text-sm font-medium">
                <div className="flex justify-between text-gray-500">
                  <span>Item Total</span>
                  <span className="text-gray-800">₹{total}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Delivery Fee</span>
                  <span className="text-gray-800">₹{deliveryFee}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Platform Fee</span>
                  <span className="text-gray-800">₹{platformFee}</span>
                </div>
              </div>
              
              <div className="pt-4 border-t-2 border-dashed border-gray-100 flex justify-between items-center">
                <span className="font-black text-gray-900 text-xl uppercase tracking-tight">Grand Total</span>
                <span className="font-black text-green-700 text-2xl">₹{grandTotal}</span>
              </div>
            </div>

            {/* STATIC Place Order Button (No Overlapping) */}
            <div className="pt-6 pb-12 px-2 md:px-0">
              <button 
                onClick={() => navigate("/checkout")}
                className="w-full bg-green-700 text-white flex justify-between items-center p-5 rounded-[1.5rem] shadow-xl hover:bg-green-800 hover:scale-[1.01] active:scale-95 transition-all duration-300 group"
              >
                <div className="text-left">
                  <p className="text-[10px] uppercase font-black tracking-widest opacity-70">Proceed to</p>
                  <p className="text-xl font-bold">Checkout</p>
                </div>
                <div className="flex items-center gap-2 font-bold text-lg bg-white/20 px-4 py-2 rounded-xl">
                  ₹{grandTotal} <ChevronRight size={22} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartPage;
import { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { Trash2, Plus, Minus, ShoppingBag, ReceiptText, ChevronRight, Sparkles, Calendar, Utensils, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function CartPage() {
  const { cart, removeFromCart, updateQty, total } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const deliveryFee = cart.length > 0 ? 40 : 0;
  const platformFee = cart.length > 0 ? 5 : 0;
  const grandTotal = total + deliveryFee + platformFee;

  const handleIncrease = (item) => {
    const targetId = item.id || item._id;
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
    <div className="min-h-screen font-sans bg-[#faf9f6] text-gray-900 relative selection:bg-[#C9C27A]/30">
      {/* Background Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.6] pointer-events-none"
        style={{
          backgroundImage: `url('/images/main-background.PNG')`,
          backgroundSize: '400px',
          backgroundRepeat: 'repeat',
          backgroundAttachment: 'fixed'
        }}
      ></div>

      <div className="relative z-10">
        <div className="py-12 text-center px-6">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase leading-none">
            Review Your <span className="text-[#C9C27A]">Order</span> <Sparkles className="inline text-[#C9C27A]" size={32} />
          </h1>
          <p className="text-gray-500 mt-3 font-black uppercase tracking-widest text-[10px]">"Health is wealth, start with a bowl."</p>
        </div>

        <div className="max-w-2xl mx-auto px-4 md:px-0 space-y-6 pb-20">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2rem] shadow-2xl border-[3px] border-[#C9C27A]">
              <ShoppingBag size={64} className="text-[#C9C27A] mb-4 opacity-20" />
              <h2 className="text-xl font-black text-gray-800 uppercase tracking-tight">Your cart is empty</h2>
              <Link to="/shop" className="mt-6 bg-green-900 text-white px-8 py-3 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-green-800 transition-all">
                Go to Menu
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {cart.map((item, index) => (
                  <div 
                    key={item.id || index} 
                    className="bg-white rounded-[2rem] p-5 md:p-6 shadow-xl border-[3px] border-[#C9C27A] hover:border-green-800 transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      {/* Item Image */}
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-[#faf9f6] overflow-hidden flex-shrink-0 border border-gray-100">
                        <img 
                          src={item.image || "/images/placeholder-bowl.png"} 
                          alt={item.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        />
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-black text-gray-900 text-lg md:text-xl uppercase tracking-tighter leading-tight truncate">
                          {item.name}
                        </h3>
                        <p className="text-green-800 font-black text-lg">₹{item.price}</p>
                        
                        <div className="mt-3 space-y-2">
                          {/* 1. PLAN DETAILS: If item has 'meals' (from PlanCustomization) */}
                          {item.meals && (
                            <div className="bg-[#faf9f6] p-3 rounded-xl border border-gray-100">
                              <p className="text-[9px] font-black text-[#C9C27A] uppercase tracking-widest flex items-center gap-1 mb-2">
                                <Calendar size={10}/> 7-Day Meal Cycle
                              </p>
                              <div className="flex flex-wrap gap-1.5">
                                {Object.keys(item.meals).map((dayIndex) => (
                                  <div key={dayIndex} className="flex items-center gap-1 bg-white border border-gray-200 px-2 py-1 rounded-lg">
                                    <span className="text-[8px] font-black text-green-800">D{parseInt(dayIndex) + 1}</span>
                                    <span className="text-[8px] font-bold text-gray-500 truncate max-w-[60px]">
                                      {item.meals[dayIndex].base}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* 2. BOWL DETAILS: If item has fruits/toppings/size (from Customizer) */}
                          {(item.fruits?.length > 0 || item.toppings?.length > 0) && (
                            <div className="space-y-1">
                                {item.size && (
                                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Size: <span className="text-gray-900">{item.size}</span></p>
                                )}
                                <div className="flex flex-wrap gap-1">
                                    {item.fruits?.map(f => (
                                        <span key={f} className="text-[8px] font-bold bg-green-50 text-green-700 px-2 py-0.5 rounded-full uppercase border border-green-100">{f}</span>
                                    ))}
                                    {item.toppings?.map(t => (
                                        <span key={t} className="text-[8px] font-bold bg-[#C9C27A]/10 text-[#C9C27A] px-2 py-0.5 rounded-full uppercase border border-[#C9C27A]/20">{t}</span>
                                    ))}
                                </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex flex-col items-center bg-[#faf9f6] rounded-2xl p-1 border border-gray-100">
                        <button onClick={() => handleIncrease(item)} className="w-8 h-8 flex items-center justify-center bg-white rounded-xl text-green-800 shadow-sm border border-gray-100"><Plus size={16} /></button>
                        <span className="py-2 text-center font-black text-gray-900 text-sm">{item.quantity || 1}</span>
                        <button onClick={() => handleDecrease(item)} className="w-8 h-8 flex items-center justify-center bg-white rounded-xl text-gray-400 hover:text-red-500 shadow-sm border border-gray-100">
                          {item.quantity > 1 ? <Minus size={16} /> : <Trash2 size={16} />}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="bg-green-900 rounded-[2.5rem] p-8 shadow-2xl border-[3px] border-[#C9C27A] space-y-4 text-white">
                <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                  <ReceiptText size={20} className="text-[#C9C27A]" />
                  <h2 className="font-black uppercase tracking-widest text-sm">Order Summary</h2>
                </div>
                <div className="space-y-3 text-xs font-bold uppercase tracking-widest">
                  <div className="flex justify-between text-white/60"><span>Item Total</span><span className="text-white">₹{total}</span></div>
                  <div className="flex justify-between text-white/60"><span>Delivery</span><span className="text-white">₹{deliveryFee}</span></div>
                  <div className="flex justify-between text-white/60"><span>Platform Fee</span><span className="text-white">₹{platformFee}</span></div>
                </div>
                <div className="pt-6 border-t-2 border-dashed border-white/20 flex justify-between items-center">
                  <span className="font-black text-[#C9C27A] text-xl uppercase tracking-tighter">Grand Total</span>
                  <span className="font-black text-white text-3xl tracking-tighter">₹{grandTotal}</span>
                </div>
              </div>

              <button onClick={() => navigate("/checkout")} className="w-full bg-[#C9C27A] text-green-950 flex justify-between items-center p-6 rounded-[2rem] shadow-xl hover:scale-[1.02] active:scale-95 transition-all group">
                <div className="text-left">
                  <p className="text-[10px] uppercase font-black tracking-[0.2em] opacity-70">Confirm & Pay</p>
                  <p className="text-2xl font-black uppercase tracking-tighter">Checkout</p>
                </div>
                <div className="flex items-center gap-2 font-black text-xl bg-green-950/10 px-5 py-3 rounded-2xl">
                  ₹{grandTotal} <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartPage;
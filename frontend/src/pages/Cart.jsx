import { useEffect } from "react";
import { useCart } from "../context/CartContext";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ReceiptText,
  ChevronRight,
  Sparkles,
  ArrowLeft,
  ShieldCheck,
  Calendar,
} from "lucide-react";
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
    if ((item.quantity || 1) <= 1) return;
    updateQty(targetId, (item.quantity || 1) - 1);
  };

  const formatPrice = (value) => `Rs. ${value}`;
  const getDescriptionParts = (description) => {
    if (!description) return [];
    return description
      .split("|")
      .map((part) => part.trim())
      .filter(Boolean);
  };

  const getSizeFromName = (name) => {
    if (!name) return null;
    const match = name.match(/\((.*?)\)/);
    return match?.[1] || null;
  };

  return (
    <div className="min-h-screen font-sans bg-[#faf9f6] text-gray-900 relative selection:bg-[#C9C27A]/30">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.6]"
          style={{
            backgroundImage: "url('/images/main-background.webp')",
            backgroundSize: "400px",
            backgroundRepeat: "repeat",
            backgroundAttachment: "fixed",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#f3f8f2]/65 via-transparent to-[#faf9f6]"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 pb-16">
        <div className="pt-10 md:pt-12 pb-8">
          <div className="flex justify-start">
            <Link
              to="/shop"
              className="inline-flex w-fit items-center gap-2 leading-none text-[10px] font-black uppercase tracking-[0.18em] text-gray-400 hover:text-[#C9C27A] transition-colors"
            >
              <ArrowLeft size={16} />
              Continue Shopping
            </Link>
          </div>

          <div className="text-center mt-7">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase leading-none">
              Review Your <span className="text-[#C9C27A]">Cart</span>{" "}
              <Sparkles className="inline text-[#C9C27A]" size={30} />
            </h1>
            <p className="text-gray-500 mt-3 font-black uppercase tracking-widest text-[10px]">
              {cart.length} Item{cart.length !== 1 ? "s" : ""} Ready For Checkout
            </p>
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="max-w-3xl mx-auto flex flex-col items-center justify-center py-16 md:py-20 bg-white rounded-[2rem] shadow-2xl border-[3px] border-[#C9C27A]">
            <ShoppingBag size={62} className="text-[#C9C27A] mb-4 opacity-25" />
            <h2 className="text-xl md:text-2xl font-black text-gray-800 uppercase tracking-tight">
              Your Cart Is Empty
            </h2>
            <p className="text-gray-500 mt-2 text-sm">Add fresh items to continue.</p>
            <Link
              to="/shop"
              className="mt-7 bg-green-900 text-white px-8 py-3 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-green-800 transition-all"
            >
              Go To Menu
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 items-start gap-6 md:gap-8 lg:h-[calc(100vh-190px)] lg:overflow-hidden">
            <section className="lg:col-span-7 space-y-4 lg:h-full lg:overflow-y-auto lg:pr-2">
              {cart.map((item, index) => {
                const quantity = item.quantity || 1;
                const lineTotal = item.price * quantity;
                const details = getDescriptionParts(item.description);
                const bowlSize = item.size || getSizeFromName(item.name);
                const itemDisplayName = item.name || item.title || "Selected Item";

                return (
                  <article
                    key={item.id || item._id || index}
                    className="bg-white rounded-[2rem] p-5 md:p-6 shadow-xl border-[3px] border-[#C9C27A] hover:border-green-800 transition-all"
                  >
                    <div className="flex items-start gap-4 md:gap-5">
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-[#faf9f6] overflow-hidden border border-gray-100 flex-shrink-0">
                        <img
                          src={item.image || "/images/custom.webp"}
                          alt={itemDisplayName}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <h3 className="font-black text-gray-900 text-lg md:text-xl uppercase tracking-tight leading-tight truncate">
                              {itemDisplayName}
                            </h3>
                            <p className="text-green-800 font-black text-base md:text-lg">
                              {formatPrice(item.price)}
                            </p>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id || item._id)}
                            className="w-9 h-9 rounded-xl border border-red-100 text-red-500 hover:bg-red-50 flex items-center justify-center"
                            aria-label={`Remove ${itemDisplayName}`}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        <div className="mt-3 space-y-2.5">
                          {bowlSize && (
                            <div className="inline-flex items-center bg-[#f3f8f2] text-green-900 border border-green-100 px-2.5 py-1 rounded-full">
                              <p className="text-[9px] font-black uppercase tracking-widest">
                                Bowl Size: {bowlSize}
                              </p>
                            </div>
                          )}

                          {item.meals && (
                            <div className="bg-[#faf9f6] p-3 rounded-xl border border-gray-100">
                              <p className="text-[9px] font-black text-[#C9C27A] uppercase tracking-widest flex items-center gap-1 mb-2">
                                <Calendar size={10} />
                                7-Day Meal Cycle
                              </p>
                              <div className="flex flex-wrap gap-1.5">
                                {Object.keys(item.meals).map((dayIndex) => (
                                  <div
                                    key={dayIndex}
                                    className="flex items-center gap-1 bg-white border border-gray-200 px-2 py-1 rounded-lg"
                                  >
                                    <span className="text-[8px] font-black text-green-800">
                                      D{parseInt(dayIndex, 10) + 1}
                                    </span>
                                    <span className="text-[8px] font-bold text-gray-500 truncate max-w-[80px]">
                                      {item.meals[dayIndex].base}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {details.length > 0 && (
                            <div className="bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5 space-y-1.5">
                              {details.map((part, partIndex) => (
                                <p
                                  key={partIndex}
                                  className="text-[11px] font-medium text-gray-600 leading-relaxed"
                                >
                                  {part}
                                </p>
                              ))}
                            </div>
                          )}

                          {(item.calories || item.protein) && (
                            <div className="flex flex-wrap gap-2">
                              {item.calories && (
                                <span className="text-[10px] font-black bg-[#eef6ff] text-[#2c5f91] px-2.5 py-1 rounded-full border border-[#d7e8f9] uppercase tracking-wide">
                                  {item.calories}
                                </span>
                              )}
                              {item.protein && (
                                <span className="text-[10px] font-black bg-[#f0faee] text-green-800 px-2.5 py-1 rounded-full border border-green-100 uppercase tracking-wide">
                                  {item.protein}
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="mt-4 flex items-center justify-between gap-3 flex-wrap pt-1">
                          <div className="flex items-center bg-[#faf9f6] rounded-xl p-1 border border-gray-100">
                            <button
                              onClick={() => handleDecrease(item)}
                              className="w-8 h-8 rounded-lg bg-white border border-gray-100 text-gray-600 hover:text-red-500 flex items-center justify-center"
                              aria-label={`Decrease ${itemDisplayName}`}
                            >
                              <Minus size={15} />
                            </button>
                            <span className="w-10 text-center font-black text-sm">{quantity}</span>
                            <button
                              onClick={() => handleIncrease(item)}
                              className="w-8 h-8 rounded-lg bg-white border border-gray-100 text-green-800 flex items-center justify-center"
                              aria-label={`Increase ${itemDisplayName}`}
                            >
                              <Plus size={15} />
                            </button>
                          </div>

                          <div className="text-right ml-auto">
                            <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">
                              Line Total
                            </p>
                            <p className="font-black text-green-900 text-lg md:text-xl">
                              {formatPrice(lineTotal)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </section>

            {/* RIGHT SIDE - STICKY ORDER SUMMARY */}
            <aside className="lg:col-span-5 lg:h-full">
              <div className="h-fit">
                <div className="bg-green-950 rounded-[2.5rem] p-7 md:p-8 shadow-2xl border-[3px] border-[#C9C27A] h-fit">
                  <div className="flex items-center gap-2 pb-5 border-b border-white/10">
                    <ReceiptText size={19} className="text-[#C9C27A]" />
                    <h2 className="text-white font-black uppercase tracking-widest text-sm">
                      Order Summary
                    </h2>
                  </div>

                <div className="mt-5 space-y-3 text-[11px] font-black uppercase tracking-widest">
                  <div className="flex justify-between text-white/60">
                    <span>Item Total</span>
                    <span className="text-white">{formatPrice(total)}</span>
                  </div>
                    <div className="flex justify-between text-white/60">
                      <span>Delivery</span>
                      <span className="text-white">{formatPrice(deliveryFee)}</span>
                    </div>
                    <div className="flex justify-between text-white/60">
                      <span>Platform Fee</span>
                      <span className="text-white">{formatPrice(platformFee)}</span>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t-2 border-dashed border-white/20 flex justify-between items-center">
                    <span className="font-black text-[#C9C27A] text-lg uppercase tracking-tight">
                      Grand Total
                    </span>
                    <span className="font-black text-white text-3xl tracking-tight">
                      {formatPrice(grandTotal)}
                    </span>
                  </div>

                  <button
                    onClick={() => navigate("/checkout")}
                    className="mt-6 w-full bg-[#C9C27A] text-green-950 flex justify-between items-center p-5 rounded-[1.6rem] shadow-xl hover:scale-[1.01] active:scale-95 transition-all group"
                  >
                    <div className="text-left">
                      <p className="text-[9px] uppercase font-black tracking-[0.2em] opacity-70">
                        Confirm & Pay
                      </p>
                      <p className="text-lg md:text-xl font-black uppercase tracking-tight">
                        Checkout
                      </p>
                    </div>
                    <ChevronRight
                      size={22}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>

                  <div className="mt-5 rounded-xl bg-white/5 border border-white/10 p-3 flex items-start gap-2">
                    <ShieldCheck size={16} className="text-[#C9C27A] mt-0.5" />
                    <p className="text-[10px] font-bold text-white/75 uppercase tracking-wide leading-relaxed">
                      Secure checkout and fresh delivery scheduling.
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;

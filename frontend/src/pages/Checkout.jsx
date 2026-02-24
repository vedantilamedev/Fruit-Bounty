import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import API from "../api/api";
import { 
  ShieldCheck, 
  MapPin, 
  CreditCard, 
  ChevronRight,
  ArrowLeft, 
  Calendar, 
  Truck,
  Sparkles
} from "lucide-react";

const Checkout = () => {
  const { cart, total } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const today = new Date();
  const deliveryDate = new Date();
  deliveryDate.setDate(today.getDate() + 1);
  const [address, setAddress] = useState({
    fullName: "",
    house: "",
    landmark: "",
    nearbyAddress: "",
    pincode: "",
    contact: "",
  });
  const [isPaying, setIsPaying] = useState(false);
  const inputClassName =
    "w-full rounded-xl border-2 border-[#e8e2be] bg-[#fffdf7] px-4 py-3 text-sm font-semibold text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#C9C27A] focus:ring-2 focus:ring-[#C9C27A]/20 transition-all";

  // Consistency with Cart pricing
  const deliveryFee = cart.length > 0 ? 40 : 0;
  const platformFee = cart.length > 0 ? 5 : 0;
  const grandTotal = total + deliveryFee + platformFee;

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.id = "razorpay-sdk";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };
  const handlePayment = async () => {
    if (isPaying) return;
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    if (!address.fullName || !address.house || !address.pincode || !address.contact) {
      alert("Please fill delivery address");
      return;
    }
    if (!/^\d{6}$/.test(address.pincode.trim())) {
      alert("Please enter a valid 6 digit pincode.");
      return;
    }
    if (!/^\d{10}$/.test(address.contact.trim())) {
      alert("Please enter a valid 10 digit contact number.");
      return;
    }

    setIsPaying(true);

    const loaded = await loadRazorpay();
    if (!loaded) {
      alert("Razorpay SDK failed to load");
      setIsPaying(false);
      return;
    }

    try {
      const orderRes = await API.post("/payment/create-order", { amount: grandTotal });
      const order = orderRes?.data;

      if (!order?.id || !order?.amount) {
        alert("Unable to initialize payment. Please try again.");
        setIsPaying(false);
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Fruit Bounty",
        description: "Fresh Fruits Order",
        order_id: order.id,
        prefill: {
          name: address.fullName,
          contact: address.contact,
        },
        handler: async function (response) {
          try {
            const verifyRes = await API.post("/payment/verify", {
              ...response,
              cartItems: cart,
              totalAmount: grandTotal,
              deliveryAddress: address,
            });
            const data = verifyRes?.data;

            if (data?.success) {
              localStorage.removeItem("cart");
              const orderPayload = data.order || {
                createdAt: new Date().toISOString(),
                totalAmount: grandTotal,
                deliveryAddress: address,
                cartItems: cart,
              };
              navigate("/order-success", { state: { order: orderPayload } });
            } else {
              alert("Payment verification failed");
            }
          } catch (err) {
            alert(err?.response?.data?.error || "Payment verification failed");
          } finally {
            setIsPaying(false);
          }
        },
        modal: {
          ondismiss: () => setIsPaying(false),
        },
        theme: { color: "#C9C27A" },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.on("payment.failed", () => {
        alert("Payment failed. Please try again.");
        setIsPaying(false);
      });
      paymentObject.open();
    } catch (err) {
      alert(err?.response?.data?.error || "Unable to start payment. Please try again.");
      setIsPaying(false);
    }
  };

  return (
    <div className="min-h-screen font-sans bg-[#faf9f6] text-gray-900 relative selection:bg-[#C9C27A]/30">
      {/* Signature Background Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.6] pointer-events-none"
        style={{
          backgroundImage: `url('/images/main-background.webp')`,
          backgroundSize: '400px',
          backgroundRepeat: 'repeat',
          backgroundAttachment: 'fixed'
        }}
      ></div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 pt-10 pb-2 md:py-10 relative z-10">
        {/* Header */}
        <button 
          onClick={() => navigate("/cart")} 
          className="mb-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#C9C27A] transition-colors"
        >
          <ArrowLeft size={16}/> Back to Cart
        </button>

        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase leading-none">
                Final <span className="text-[#C9C27A]">Checkout</span> <Sparkles className="inline text-[#C9C27A]" size={32} />
            </h1>
            <p className="text-gray-500 mt-3 font-black uppercase tracking-widest text-[10px]">Secure Gateway • Fresh Delivery</p>
        </div>

        <div className="grid lg:grid-cols-12 items-start gap-6 md:gap-8">
          {/* Left Column: Forms */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8 lg:max-h-[calc(100vh-190px)] lg:overflow-y-auto lg:pr-2">
            {/* Delivery Address Section */}
            <div className="bg-white rounded-[2rem] p-6 md:p-7 shadow-xl border-[3px] border-[#C9C27A]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#C9C27A]/10 rounded-xl flex items-center justify-center text-[#C9C27A]">
                  <MapPin size={20} />
                </div>
                <h2 className="font-black uppercase tracking-widest text-sm">Delivery Address</h2>
              </div>
              
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter full name"
                      value={address.fullName}
                      onChange={(e) =>
                        setAddress({ ...address, fullName: e.target.value })
                      }
                      className={inputClassName}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">
                      Flat / House No. / Building
                    </label>
                    <input
                      type="text"
                      placeholder="Flat, house no., building name"
                      value={address.house}
                      onChange={(e) =>
                        setAddress({ ...address, house: e.target.value })
                      }
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">
                      Landmark
                    </label>
                    <input
                      type="text"
                      placeholder="Near temple, mall, etc."
                      value={address.landmark}
                      onChange={(e) =>
                        setAddress({ ...address, landmark: e.target.value })
                      }
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">
                      Nearby Address
                    </label>
                    <input
                      type="text"
                      placeholder="Street / Area / Locality"
                      value={address.nearbyAddress}
                      onChange={(e) =>
                        setAddress({ ...address, nearbyAddress: e.target.value })
                      }
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">
                      Pincode
                    </label>
                    <input
                      type="text"
                      placeholder="Enter pincode"
                      value={address.pincode}
                      onChange={(e) =>
                        setAddress({ ...address, pincode: e.target.value })
                      }
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">
                      Contact Number
                    </label>
                    <input
                      type="text"
                      placeholder="Enter mobile number"
                      value={address.contact}
                      onChange={(e) =>
                        setAddress({ ...address, contact: e.target.value })
                      }
                      className={inputClassName}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Schedule Section */}
            <div className="bg-white rounded-[2rem] p-6 md:p-7 shadow-xl border-[3px] border-[#C9C27A]">
               <div className="flex items-center gap-3 mb-6">
                  <Truck size={20} className="text-green-800" />
                  <h2 className="font-black uppercase tracking-widest text-sm text-gray-800">Delivery Estimate</h2>
               </div>
               <div className="flex items-center justify-between bg-[#faf9f6] p-4 rounded-2xl border-2 border-dashed border-gray-200">
                  <div className="flex items-center gap-3">
                    <Calendar className="text-[#C9C27A]" size={20} />
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Expected Arrival</p>
                      <p className="text-sm font-black text-green-950 uppercase">{deliveryDate.toDateString()}</p>
                    </div>
                  </div>
                  <span className="bg-green-100 text-green-800 text-[8px] font-black px-3 py-1 rounded-full uppercase">Standard</span>
               </div>
            </div>
          </div>

          {/* Right Column: Payment Summary */}
          <div className="lg:col-span-5 lg:self-start">
            <div className="bg-green-950 rounded-[2rem] p-6 md:p-7 shadow-2xl border-[3px] border-[#C9C27A] h-fit">
                <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/10">
                  <ShieldCheck size={24} className="text-[#C9C27A]" />
                  <h2 className="text-white font-black uppercase tracking-widest text-sm">Payment Summary</h2>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-white/50 text-[10px] font-black uppercase tracking-widest">
                    <span>Subtotal</span>
                    <span className="text-white">₹{total}</span>
                  </div>
                  <div className="flex justify-between text-white/50 text-[10px] font-black uppercase tracking-widest">
                    <span>Shipping</span>
                    <span className="text-white">₹{deliveryFee}</span>
                  </div>
                  <div className="flex justify-between text-white/50 text-[10px] font-black uppercase tracking-widest">
                    <span>Platform Fee</span>
                    <span className="text-white">₹{platformFee}</span>
                  </div>
                  <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                    <span className="text-[#C9C27A] font-black text-lg uppercase tracking-tighter">Total Amount</span>
                    <span className="text-white text-3xl font-black tracking-tighter">₹{grandTotal}</span>
                  </div>
                </div>

                {/* Payment Options (Visual Only) */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col items-center gap-2 cursor-pointer hover:bg-white/10 transition-all border-[#C9C27A]/40 ring-1 ring-[#C9C27A]/40">
                    <CreditCard size={18} className="text-[#C9C27A]" />
                    <span className="text-[8px] font-black text-white uppercase tracking-widest">Online Pay</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col items-center gap-2 cursor-pointer hover:bg-white/10 transition-all opacity-40">
                    <Truck size={18} className="text-white" />
                    <span className="text-[8px] font-black text-white uppercase tracking-widest">COD Unavailable</span>
                  </div>
                </div>

                <button 
                  onClick={handlePayment}
                  disabled={isPaying}
                  className="w-full bg-[#C9C27A] text-green-950 flex justify-between items-center p-6 rounded-[2rem] shadow-xl hover:scale-[1.02] active:scale-95 transition-all group disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <div className="text-left">
                    <p className="text-[9px] uppercase font-black tracking-[0.2em] opacity-70">Secure Payment</p>
                    <p className="text-xl font-black uppercase tracking-tighter leading-tight">
                      {isPaying ? "Processing..." : `Pay Rs. ${grandTotal}`}
                    </p>
                  </div>
                  <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-center mt-6 text-[8px] font-black text-white/30 uppercase tracking-[0.3em]">
                  SSL Encrypted Checkout
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;



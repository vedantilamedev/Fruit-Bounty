import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
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

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const today = new Date();
  const deliveryDate = new Date();
  deliveryDate.setDate(today.getDate() + 1);

  const [address, setAddress] = useState({
    fullName: "",
    house: "",
    pincode: "",
    contact: "",
  });

  // Fees
  const deliveryFee = cart.length > 0 ? 40 : 0;
  const platformFee = cart.length > 0 ? 5 : 0;
  const grandTotal = total + deliveryFee + platformFee;

  // Load Razorpay SDK dynamically
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    // ✅ 1. Validate address (Compulsory fields)
    if (!address.fullName.trim() || !address.house.trim() || !address.pincode.trim() || !address.contact.trim()) {
      alert("Please fill all delivery address fields to proceed.");
      return;
    }

    // ✅ Validate Pincode length (Optional: added for better UX, e.g., 6 digits)
    if (address.pincode.length !== 6) {
      alert("Please enter a valid 6-digit Pincode.");
      return;
    }

    // ✅ Validate Contact length (Optional: added for better UX, e.g., 10 digits)
    if (address.contact.length !== 10) {
      alert("Please enter a valid 10-digit Mobile Number.");
      return;
    }

    // ✅ Load Razorpay SDK
    const loaded = await loadRazorpay();
    if (!loaded) {
      alert("Razorpay SDK failed to load");
      return;
    }

    try {
      // 1️⃣ Create order on backend
      // const orderRes = await fetch("https://fruit-bounty-dmzs.onrender.com/api/payment/create-order", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ amount: grandTotal }),
      // });
      const orderRes = await fetch("http://localhost:5000/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: grandTotal }),
      });
      const order = await orderRes.json();

      // 2️⃣ Razorpay payment options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Fruit Bounty",
        description: "Fresh Fruits Order",
        order_id: order.id,

        handler: async function (response) {
          const token = localStorage.getItem("token");
          console.log("Token:", token);

          // 3️⃣ Verify payment on backend
          const verifyRes = await fetch("http://localhost:5000/api/payment/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              ...response,
              cartItems: cart,
              totalAmount: grandTotal,
              deliveryAddress: address,
            }),
          });

          const data = await verifyRes.json();

          if (data.success) {
            localStorage.removeItem("cart"); // Clear cart
            navigate("/order-success", { state: { order: data.order } });
          } else {
            alert("Payment verification failed");
          }
        },

        theme: { color: "#C9C27A" },
      };

      // 4️⃣ Open Razorpay popup
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error(err);
      alert("Payment initiation failed");
    }
  };

  // Input styling constant
  const inputStyle = "w-full p-4 rounded-xl border-2 border-gray-100 focus:border-[#C9C27A] focus:ring-1 focus:ring-[#C9C27A] outline-none text-sm font-medium tracking-tight bg-white text-gray-900 placeholder:text-gray-400";

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

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-10 relative z-10">
        {/* Header */}
        <button
          onClick={() => navigate("/cart")}
          className="mb-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#C9C27A] transition-colors"
        >
          <ArrowLeft size={16} /> Back to Cart
        </button>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase leading-none">
            Final <span className="text-[#C9C27A]">Checkout</span> <Sparkles className="inline text-[#C9C27A]" size={32} />
          </h1>
          <p className="text-gray-500 mt-3 font-black uppercase tracking-widest text-[10px]">Secure Gateway • Fresh Delivery</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Column: Forms */}
          <div className="lg:col-span-7 space-y-6">
            {/* Delivery Address Section */}
            <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-xl border-[3px] border-[#C9C27A]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#C9C27A]/10 rounded-xl flex items-center justify-center text-[#C9C27A]">
                  <MapPin size={20} />
                </div>
                <h2 className="font-black uppercase tracking-widest text-sm">Delivery Address</h2>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="FULL NAME"
                  value={address.fullName}
                  onChange={(e) =>
                    setAddress({ ...address, fullName: e.target.value })
                  }
                  className={inputStyle}
                  required
                />
                <input
                  type="text"
                  placeholder="FLAT / HOUSE NO. / BUILDING"
                  value={address.house}
                  onChange={(e) =>
                    setAddress({ ...address, house: e.target.value })
                  }
                  className={inputStyle}
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="PINCODE"
                    value={address.pincode}
                    maxLength="6"
                    onChange={(e) =>
                      // ✅ Regex to allow only numbers
                      setAddress({ ...address, pincode: e.target.value.replace(/[^0-9]/g, '') })
                    }
                    className={inputStyle}
                    required
                  />
                  <input
                    type="text"
                    placeholder="CONTACT NO."
                    value={address.contact}
                    maxLength="10"
                    onChange={(e) =>
                      // ✅ Regex to allow only numbers
                      setAddress({ ...address, contact: e.target.value.replace(/[^0-9]/g, '') })
                    }
                    className={inputStyle}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Delivery Schedule Section */}
            <div className="bg-white rounded-[2rem] p-6 shadow-xl border-[3px] border-gray-100">
              <div className="flex items-center gap-3 mb-4">
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
          <div className="lg:col-span-5">
            <div className="bg-green-950 rounded-[2.5rem] p-8 shadow-2xl border-[3px] border-[#C9C27A] sticky top-10">
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
                className="w-full bg-[#C9C27A] text-green-950 flex justify-between items-center p-6 rounded-[2rem] shadow-xl hover:scale-[1.02] active:scale-95 transition-all group"
              >
                <div className="text-left">
                  <p className="text-[9px] uppercase font-black tracking-[0.2em] opacity-70">Secure Payment</p>
                  <p className="text-xl font-black uppercase tracking-tighter leading-tight">Pay ₹{grandTotal}</p>
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
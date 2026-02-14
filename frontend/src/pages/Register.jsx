import { useState } from "react";
import { User, Mail, Phone, Lock, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

function Register() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div 
        className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-green-100 p-8"
        data-aos="zoom-in"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
          <p className="text-gray-500 mt-2">Join Fruits Bounty for fresh deliveries</p>
        </div>

        <form className="space-y-5">
          {/* Name Field */}
          <div className="relative">
            <User className="absolute left-3 top-3 text-green-700" size={20} />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-700 focus:border-transparent outline-none transition"
              required
            />
          </div>

          {/* Email Field */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-green-700" size={20} />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-700 focus:border-transparent outline-none transition"
              required
            />
          </div>

          {/* Phone Field */}
          <div className="relative">
            <Phone className="absolute left-3 top-3 text-green-700" size={20} />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-700 focus:border-transparent outline-none transition"
              required
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-green-700" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full pl-11 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-700 focus:border-transparent outline-none transition"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-green-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button className="w-full bg-green-700 text-white font-semibold py-3 rounded-xl hover:bg-green-800 transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-green-100">
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-green-700 font-bold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
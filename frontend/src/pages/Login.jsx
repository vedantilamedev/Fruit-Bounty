import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div 
        className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-green-100 p-8"
        data-aos="fade-up"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-500 mt-2">Log in to manage your fruit bowls</p>
        </div>

        <form className="space-y-5">
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-green-700" size={20} />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-700 focus:border-transparent outline-none transition"
              required
            />
          </div>

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
              className="absolute right-3 top-3 text-gray-400"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="text-right">
            <Link to="/forgot-password" size={16} className="text-sm text-green-700 hover:underline font-medium">
              Forgot Password?
            </Link>
          </div>

          <button className="w-full bg-green-700 text-white font-semibold py-3 rounded-xl hover:bg-green-800 transition-all transform hover:scale-[1.02] shadow-lg shadow-green-100">
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 mt-8">
          Don't have an account?{" "}
          <Link to="/register" className="text-green-700 font-bold hover:underline">
            Register Now
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
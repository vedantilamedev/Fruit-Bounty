import React, { useState } from 'react';
import { Visibility, VisibilityOff, ArrowLeft } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1: Phone, 2: OTP, 3: New Password
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleNextStep = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handleFinish = (e) => {
    e.preventDefault();
    alert("Password reset successful!");
    navigate('/login');
  };

  // Common input styling to match checkout page
  const inputClass = "w-full p-4 rounded-xl border-2 border-gray-100 focus:border-[#C9C27A] focus:ring-1 focus:ring-[#C9C27A] outline-none text-sm font-medium tracking-tight";
  const buttonClass = "w-full bg-green-950 text-white font-black uppercase tracking-widest text-sm p-4 rounded-xl shadow-lg hover:bg-green-900 transition-all flex items-center justify-center gap-2 mt-6";

  return (
    <div className="min-h-screen font-sans bg-[#faf9f6] text-gray-900 relative selection:bg-[#C9C27A]/30 flex items-center justify-center p-4">
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

      {/* Main Card */}
      <div className="w-full max-w-lg bg-white rounded-[2rem] p-8 md:p-10 shadow-2xl border-[3px] border-[#C9C27A] relative z-10">
        
        {/* Back Button */}
        <button
          onClick={() => step === 1 ? navigate('/login') : setStep(step - 1)}
          className="mb-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#C9C27A] transition-colors"
        >
          <ArrowLeft size={16} /> Back
        </button>

        {step === 1 && (
          <form onSubmit={handleNextStep}>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase leading-none mb-3">
              Forgot <span className="text-[#C9C27A]">Password?</span>
            </h1>
            <p className="text-gray-500 font-medium text-sm mb-8 tracking-tight">
              Enter your registered mobile number to receive an OTP.
            </p>
            
            <div className="space-y-4">
              <label className="font-black uppercase tracking-widest text-[10px] text-gray-500">Mobile Number</label>
              <input 
                type="tel" 
                placeholder="9876543210" 
                required 
                className={inputClass}
                value={phone} 
                onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
              />
              <button type="submit" className={buttonClass}>Send OTP</button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleNextStep}>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase leading-none mb-3">
              Verify <span className="text-[#C9C27A]">OTP</span>
            </h1>
            <p className="text-gray-500 font-medium text-sm mb-8 tracking-tight">
              We've sent a code to <span className='font-bold text-gray-800'>+91 {phone}</span>
            </p>
            
            <div className="space-y-4">
              <label className="font-black uppercase tracking-widest text-[10px] text-gray-500">Enter 6-digit OTP</label>
              <input 
                type="text" 
                maxLength="6" 
                required 
                className={`${inputClass} text-center tracking-[10px] text-2xl font-black`}
                value={otp} 
                onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder='------'
              />
              <button type="submit" className={buttonClass}>Verify & Proceed</button>
              
              <p className="text-center mt-6 text-sm text-gray-500">
                Didn't receive code? <span className="text-[#C9C27A] font-black cursor-pointer hover:underline">Resend</span>
              </p>
            </div>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleFinish}>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase leading-none mb-3">
              New <span className="text-[#C9C27A]">Password</span>
            </h1>
            <p className="text-gray-500 font-medium text-sm mb-8 tracking-tight">
              Create a strong password for your account.
            </p>
            
            <div className="space-y-4">
              <label className="font-black uppercase tracking-widest text-[10px] text-gray-500">New Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  required 
                  className={inputClass}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='********'
                />
                <div 
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-[#C9C27A]" 
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                </div>
              </div>
              <button type="submit" className={buttonClass}>Reset Password</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
import React, { useState } from 'react';
import { Visibility, VisibilityOff, ArrowBack } from '@mui/icons-material';
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

  const styles = {
    pageWrapper: {
      height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center',
      backgroundColor: '#2D5A27', fontFamily: "'Poppins', sans-serif", position: 'fixed', top: 0, left: 0, zIndex: 9999,
    },
    card: {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      padding: '40px',
      width: '100%',
      maxWidth: '450px',
      borderRadius: '12px',
      color: 'white',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.1)'
    },
    input: {
      width: '100%', padding: '15px', borderRadius: '4px', border: 'none',
      marginTop: '10px', backgroundColor: '#FFF', color: '#333', fontSize: '1rem',
    },
    btn: {
      width: '100%', padding: '15px', borderRadius: '4px', border: 'none',
      backgroundColor: '#4CAF50', color: '#FFF', fontWeight: '700', cursor: 'pointer',
      marginTop: '20px', fontSize: '1.1rem'
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.card}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', cursor: 'pointer' }} onClick={() => step === 1 ? navigate('/login') : setStep(step - 1)}>
          <ArrowBack /> <span style={{ marginLeft: '10px' }}>Back</span>
        </div>

        {step === 1 && (
          <form onSubmit={handleNextStep}>
            <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>Forgot Password?</h2>
            <p style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '20px' }}>Enter your registered mobile number to receive an OTP.</p>
            <label>Mobile Number</label>
            <input 
              type="tel" 
              placeholder="9876543210" 
              required 
              style={styles.input} 
              value={phone} 
              onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
            />
            <button type="submit" style={styles.btn}>Send OTP</button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleNextStep}>
            <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>Verify OTP</h2>
            <p style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '20px' }}>We've sent a code to +91 {phone}</p>
            <label>Enter 6-digit OTP</label>
            <input 
              type="text" 
              maxLength="6" 
              required 
              style={{...styles.input, textAlign: 'center', letterSpacing: '10px', fontSize: '1.5rem'}} 
              value={otp} 
              onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
            />
            <button type="submit" style={styles.btn}>Verify & Proceed</button>
            <p style={{ textAlign: 'center', marginTop: '15px', fontSize: '0.8rem' }}>
              Didn't receive code? <span style={{ color: '#4CAF50', cursor: 'pointer' }}>Resend</span>
            </p>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleFinish}>
            <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>New Password</h2>
            <p style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '20px' }}>Create a strong password for your account.</p>
            <div style={{ position: 'relative' }}>
              <label>New Password</label>
              <input 
                type={showPassword ? 'text' : 'password'} 
                required 
                style={styles.input} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div style={{ position: 'absolute', right: '15px', bottom: '12px', color: '#2D5A27', cursor: 'pointer' }} onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </div>
            </div>
            <button type="submit" style={styles.btn}>Reset Password</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
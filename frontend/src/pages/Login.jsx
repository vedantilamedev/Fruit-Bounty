import React, { useState, useEffect } from 'react';
import { Google, Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from 'react-router-dom'; // Added Link import

const LoginRegister = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(false);
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, [isRegistering]);

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
  };

  const handleNumericInput = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
  };

  const styles = {
    pageWrapper: {
      height: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#2D5A27',
      fontFamily: "'Poppins', sans-serif",
      overflow: 'hidden',
      position: 'fixed', 
      top: 0,
      left: 0,
      zIndex: 9999, 
    },
    mainBox: {
      position: 'relative',
      width: '100vw',
      height: '100vh',
      backgroundColor: '#2D5A27',
      borderRadius: '0px', 
      display: 'flex',
      boxShadow: 'none',
      overflow: 'hidden',
    },
    overlaySection: {
      position: 'absolute',
      top: 0,
      left: isRegistering ? '50%' : '0%',
      width: '50%',
      height: '100%',
      backgroundImage: "url('/images/login-illustration.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      zIndex: 10,
      transition: 'all 0.8s cubic-bezier(0.65, 0, 0.35, 1)',
      display: 'flex',
      flexDirection: 'column',
      padding: '40px',
    },
    topHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      width: '100%',
    },
    formSide: {
      width: '50%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center', 
      color: '#FFFFFF',
      transition: 'opacity 0.5s ease, transform 0.5s ease',
      opacity: animate ? 1 : 0,
      transform: animate ? 'scale(1)' : 'scale(0.98)',
      overflowY: 'auto', 
      overflowX: 'hidden',
      paddingBottom: '20px', 
    },
    input: {
      width: '100%',
      padding: '15px',
      borderRadius: '0px',
      border: 'none',
      marginTop: '8px',
      backgroundColor: '#FFF',
      color: '#333',
      fontSize: '1rem',
    },
    primaryBtn: {
      width: '100%',
      padding: '18px',
      borderRadius: '0px',
      border: 'none',
      backgroundColor: '#4CAF50',
      color: '#FFF',
      fontWeight: '700',
      cursor: 'pointer',
      marginTop: '25px',
      fontSize: '1.1rem',
      transition: 'all 0.3s ease',
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <style>{`
        body, html { 
            margin: 0 !important; 
            padding: 0 !important; 
            overflow: hidden !important; 
            width: 100%;
            height: 100%;
        }
        .form-column { display: flex !important; }
        @media (max-width: 900px) {
          .sliding-overlay { display: none !important; }
          .form-column { width: 100% !important; padding: 40px 10% !important; }
          .signup-col { display: ${isRegistering ? 'flex' : 'none'} !important; }
          .login-col { display: ${!isRegistering ? 'flex' : 'none'} !important; }
        }
        .primary-btn:hover { filter: brightness(1.1); transform: translateY(-2px); }
        .form-column::-webkit-scrollbar { width: 6px; }
        .form-column::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); }
      `}</style>

      <div style={styles.mainBox}>
        <div className="sliding-overlay" style={styles.overlaySection}>
          <div style={styles.topHeader}>
            <img src="/images/footerlogo.png" alt="Logo" style={{ height: '50px' }} />
            <div style={{ background: 'rgba(255,255,255,0.95)', padding: '15px 20px', borderRadius: '0px', textAlign: 'right', backdropFilter: 'blur(10px)' }}>
              <h3 style={{ color: '#2D5A27', margin: 0, fontSize: '1.2rem' }}>{isRegistering ? 'Fresh Starts' : 'Welcome Back'}</h3>
              <p style={{ color: '#666', fontSize: '0.85rem', margin: '5px 0 0 0' }}>Best fruit bowls in the city.</p>
            </div>
          </div>
        </div>

        {/* LEFT FORM (Signup) */}
        <div className="form-column signup-col" style={{...styles.formSide, visibility: isRegistering ? 'visible' : 'hidden', padding: '0 10%'}}>
          <h1 style={{ fontSize: '3rem', marginBottom: '30px', paddingTop: '40px' }}>Sign Up</h1>
          <div style={{ marginBottom: '15px' }}><label>Full Name</label><input type="text" placeholder="John Doe" style={styles.input} /></div>
          <div style={{ marginBottom: '15px' }}><label>Email</label><input type="email" placeholder="john@example.com" style={styles.input} /></div>
          <div style={{ marginBottom: '15px' }}><label>Phone</label><input type="tel" onInput={handleNumericInput} placeholder="1234567890" style={styles.input} /></div>
          <div style={{ marginBottom: '15px', position: 'relative' }}>
            <label>Password</label>
            <input type={showPassword ? 'text' : 'password'} style={styles.input} />
            <div style={{ position: 'absolute', right: '15px', bottom: '12px', color: '#2D5A27', cursor: 'pointer' }} onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </div>
          </div>
          <button className="primary-btn" style={styles.primaryBtn}>Create Account</button>
          <p style={{ textAlign: 'center', fontSize: '1rem', marginTop: '25px' }}>
            Already a member? <span onClick={toggleMode} style={{ color: '#4CAF50', cursor: 'pointer', fontWeight: 'bold', textDecoration: 'underline' }}>Login</span>
          </p>
        </div>

        {/* RIGHT FORM (Login) */}
        <div className="form-column login-col" style={{...styles.formSide, visibility: !isRegistering ? 'visible' : 'hidden', padding: '0 10%'}}>
          <h1 style={{ fontSize: '3rem', marginBottom: '30px' }}>Login</h1>
          <div style={{ marginBottom: '20px' }}>
            <label>Mobile Number</label>
            <input type="tel" onInput={handleNumericInput} placeholder="9876543210" style={styles.input} />
          </div>
          <div style={{ marginBottom: '20px', position: 'relative' }}>
            <label>Password</label>
            <input type={showPassword ? 'text' : 'password'} style={styles.input} />
            <div style={{ position: 'absolute', right: '15px', bottom: '12px', color: '#2D5A27', cursor: 'pointer' }} onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </div>
          </div>
          <button className="primary-btn" style={styles.primaryBtn}>Sign In</button>
          <button className="primary-btn" style={{ width: '100%', padding: '15px', marginTop: '20px', backgroundColor: '#FFF', color: '#2D5A27', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <Google style={{ color: '#EA4335' }} /> Continue with Google
          </button>
          
          <p style={{ textAlign: 'center', marginTop: '20px' }}>
            {/* Updated to use Link */}
            <Link to="/forgot-password" style={{ color: '#4CAF50', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '500', textDecoration: 'none' }}>Forget password?</Link>
          </p>

          <p style={{ textAlign: 'center', fontSize: '1rem', marginTop: '10px' }}>
            Don't have an account? <span onClick={toggleMode} style={{ color: '#4CAF50', cursor: 'pointer', fontWeight: 'bold', textDecoration: 'underline' }}>Register</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
import React, { useState, useEffect } from 'react';
import { Google, Visibility, VisibilityOff } from '@mui/icons-material';

const LoginRegister = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(false);
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, [isRegistering]);

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    setIsAdmin(false);
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
      backgroundColor: '#f0f2f5',
      fontFamily: "'Poppins', sans-serif",
      overflow: 'hidden',
    },
    mainBox: {
      position: 'relative',
      width: '100%',
      maxWidth: '1200px',
      height: '90vh',
      backgroundColor: '#2D5A27',
      borderRadius: '0px', // Straight sharp edges
      display: 'flex',
      boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
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
      padding: '30px',
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
      color: '#FFFFFF',
      transition: 'opacity 0.5s ease, transform 0.5s ease',
      opacity: animate ? 1 : 0,
      transform: animate ? 'scale(1)' : 'scale(0.95)',
      overflowY: 'auto', 
      overflowX: 'hidden',
    },
    roleBtn: (active) => ({
      flex: 1,
      padding: '10px',
      borderRadius: '0px', // Straight edges
      border: 'none',
      cursor: 'pointer',
      fontWeight: '600',
      backgroundColor: active ? '#4CAF50' : 'rgba(255,255,255,0.1)',
      color: '#FFF',
      transition: '0.3s',
    }),
    input: {
      width: '100%',
      padding: '12px 15px',
      borderRadius: '0px', // Straight edges
      border: 'none',
      marginTop: '5px',
      backgroundColor: '#FFF',
      color: '#333',
    },
    primaryBtn: {
      width: '100%',
      padding: '15px',
      borderRadius: '0px', // Straight edges
      border: 'none',
      backgroundColor: isAdmin ? '#FF9800' : '#4CAF50',
      color: '#FFF',
      fontWeight: '700',
      cursor: 'pointer',
      marginTop: '20px',
      transition: 'all 0.3s ease',
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <style>{`
        /* Desktop Default */
        .form-column {
          display: flex !important;
        }

        /* Mobile Specific Fix */
        @media (max-width: 900px) {
          .sliding-overlay { 
            display: none !important; 
          }
          
          .form-column { 
            width: 100% !important; 
            padding: 40px 8% !important;
          }

          .signup-col {
            display: ${isRegistering ? 'flex' : 'none'} !important;
          }
          .login-col {
            display: ${!isRegistering ? 'flex' : 'none'} !important;
          }
        }

        /* Hover Effects */
        .primary-btn:hover {
          filter: brightness(1.1);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }

        /* Scrollbar styling */
        .form-column::-webkit-scrollbar { width: 6px; }
        .form-column::-webkit-scrollbar-track { background: transparent; }
        .form-column::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 0px; }
      `}</style>

      <div style={styles.mainBox}>
        
        {/* SLIDING IMAGE OVERLAY */}
        <div className="sliding-overlay" style={styles.overlaySection}>
          <div style={styles.topHeader}>
            <img src="/images/footerlogo.png" alt="Logo" style={{ height: '45px' }} />
            <div style={{
              background: 'rgba(255,255,255,0.9)',
              padding: '10px 15px',
              borderRadius: '0px', // Straight edges
              textAlign: 'right',
              backdropFilter: 'blur(5px)'
            }}>
              <h4 style={{ color: '#2D5A27', margin: 0 }}>{isRegistering ? 'Fresh Starts' : 'Welcome Back'}</h4>
              <p style={{ color: '#666', fontSize: '0.7rem', margin: 0 }}>Best fruit bowls in the city.</p>
            </div>
          </div>
        </div>

        {/* LEFT FORM (Signup) */}
        <div className="form-column signup-col" style={{...styles.formSide, visibility: isRegistering ? 'visible' : 'hidden', padding: '40px 5%'}}>
          <h1 style={{ fontSize: '2rem' }}>Sign Up</h1>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <button style={styles.roleBtn(!isAdmin)} onClick={() => setIsAdmin(false)}>User</button>
            <button style={styles.roleBtn(isAdmin)} onClick={() => setIsAdmin(true)}>Admin</button>
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <label style={{ fontSize: '0.8rem' }}>Full Name</label>
            <input type="text" placeholder="John Doe" style={styles.input} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ fontSize: '0.8rem' }}>Email</label>
            <input type="email" placeholder="john@example.com" style={styles.input} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ fontSize: '0.8rem' }}>Phone</label>
            <input type="tel" onInput={handleNumericInput} placeholder="1234567890" style={styles.input} />
          </div>
          <div style={{ marginBottom: '10px', position: 'relative' }}>
            <label style={{ fontSize: '0.8rem' }}>Password</label>
            <input type={showPassword ? 'text' : 'password'} style={styles.input} />
            <div style={{ position: 'absolute', right: '10px', bottom: '8px', color: '#2D5A27', cursor: 'pointer' }} onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
            </div>
          </div>

          {isAdmin && (
            <div style={{ marginBottom: '10px' }}>
              <label style={{ fontSize: '0.8rem', color: '#FF9800' }}>Secret Key</label>
              <input type="password" style={{...styles.input, border: '2px solid #FF9800'}} />
            </div>
          )}

          <button className="primary-btn" style={styles.primaryBtn}>Create Account</button>
          <p style={{ textAlign: 'center', fontSize: '0.9rem', marginTop: '15px' }}>
            Already a member? <span onClick={toggleMode} style={{ color: '#4CAF50', cursor: 'pointer', fontWeight: 'bold' }}>Login</span>
          </p>
        </div>

        {/* RIGHT FORM (Login) */}
        <div className="form-column login-col" style={{...styles.formSide, visibility: !isRegistering ? 'visible' : 'hidden', padding: '40px 5%'}}>
          <h1 style={{ fontSize: '2rem' }}>Login</h1>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <button style={styles.roleBtn(!isAdmin)} onClick={() => setIsAdmin(false)}>User</button>
            <button style={styles.roleBtn(isAdmin)} onClick={() => setIsAdmin(true)}>Admin</button>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontSize: '0.8rem' }}>Mobile Number</label>
            <input type="tel" onInput={handleNumericInput} placeholder="9876543210" style={styles.input} />
          </div>
          <div style={{ marginBottom: '15px', position: 'relative' }}>
            <label style={{ fontSize: '0.8rem' }}>Password</label>
            <input type={showPassword ? 'text' : 'password'} style={styles.input} />
            <div style={{ position: 'absolute', right: '10px', bottom: '8px', color: '#2D5A27', cursor: 'pointer' }} onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
            </div>
          </div>

          {isAdmin && (
            <div style={{ marginBottom: '15px' }}>
              <label style={{ fontSize: '0.8rem', color: '#FF9800' }}>Secret Key</label>
              <input type="password" style={{...styles.input, border: '2px solid #FF9800'}} />
            </div>
          )}

          <button className="primary-btn" style={styles.primaryBtn}>Sign In</button>
          
          {!isAdmin && (
            <button className="primary-btn" style={{ 
              width: '100%', padding: '12px', marginTop: '15px', borderRadius: '0px', border: 'none', 
              backgroundColor: '#FFF', color: '#2D5A27', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', cursor: 'pointer'
            }}>
              <Google style={{ color: '#EA4335' }} /> Google
            </button>
          )}

          <p style={{ textAlign: 'center', fontSize: '0.9rem', marginTop: '20px' }}>
            Don't have an account? <span onClick={toggleMode} style={{ color: '#4CAF50', cursor: 'pointer', fontWeight: 'bold' }}>Register</span>
          </p>
        </div>

      </div>
    </div>
  );
};

export default LoginRegister;
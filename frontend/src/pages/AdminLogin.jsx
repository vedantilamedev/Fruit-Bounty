import React, { useState, useEffect } from 'react';
import { Visibility, VisibilityOff, Security } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const AdminLogin = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, [isRegistering]);

  const toggleMode = () => {
    setAnimate(false);
    setIsRegistering(!isRegistering);
  };

  const styles = {
    pageWrapper: {
      height: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FDFBF7',
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
      display: 'flex',
      overflow: 'hidden',
    },
    overlaySection: {
      position: 'absolute',
      top: 0,
      left: isRegistering ? '50%' : '0%',
      width: '50%',
      height: '100%',
      backgroundColor: '#2D4F1E',
      zIndex: 10,
      transition: 'all 0.8s cubic-bezier(0.65, 0, 0.35, 1)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px',
      color: '#FFFFFF',
      textAlign: 'center',
    },
    formSide: {
      width: '50%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: '#FDFBF7',
      color: '#2D4F1E',
      padding: '0 8%',
      transition: 'opacity 0.5s ease, transform 0.5s ease',
      opacity: animate ? 1 : 0,
      transform: animate ? 'scale(1)' : 'scale(0.95)',
    },
    inputGroup: {
      marginBottom: '15px',
      position: 'relative',
      width: '100%',
    },
    input: {
      width: '100%',
      padding: '12px 15px',
      borderRadius: '8px',
      border: '1.5px solid #E0E0E0',
      marginTop: '5px',
      fontSize: '1rem',
      outline: 'none',
      boxSizing: 'border-box',
    },
    primaryBtn: {
      width: '100%',
      padding: '14px',
      borderRadius: '8px',
      border: 'none',
      backgroundColor: '#2D4F1E',
      color: '#FFF',
      fontWeight: '700',
      cursor: 'pointer',
      marginTop: '15px',
      fontSize: '1rem',
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <style>{`
        @media (max-width: 850px) {
          .sliding-overlay { display: none !important; }
          .form-column { 
            width: 100% !important; 
            background-color: #2D4F1E !important; 
            color: #FFFFFF !important;
            padding: 40px 10% !important;
          }
          .signup-col { display: ${isRegistering ? 'flex' : 'none'} !important; }
          .login-col { display: ${!isRegistering ? 'flex' : 'none'} !important; }
          input { background-color: #FFFFFF !important; color: #333 !important; }
          label { color: #FFFFFF !important; }
          .toggle-link { color: #88C070 !important; }
          .forget-link { color: #88C070 !important; }
        }
      `}</style>

      <div style={styles.mainBox}>
        {/* SLIDING OVERLAY (HIDDEN ON MOBILE) */}
        <div className="sliding-overlay" style={styles.overlaySection}>
          <Security style={{ fontSize: '70px', marginBottom: '20px' }} />
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800' }}>
            {isRegistering ? 'Secure Access' : 'Admin Portal'}
          </h2>
          <p style={{ marginTop: '10px', opacity: 0.8 }}>
            {isRegistering ? 'Request administrative credentials' : 'Welcome back to Fruit Bounty HQ'}
          </p>
        </div>

        {/* REGISTRATION FORM */}
        <div className="form-column signup-col" style={{ ...styles.formSide, visibility: isRegistering ? 'visible' : 'hidden' }}>
          <h1 style={{ marginBottom: '5px' }}>Register Admin</h1>
          <p style={{ color: '#666', marginBottom: '25px' }}>Create your management account.</p>
          
          <div style={styles.inputGroup}><label>Full Name</label><input type="text" placeholder="Admin Name" style={styles.input} /></div>
          
          <div style={styles.inputGroup}>
            <label>Secret Admin Key</label>
            <input type="password" placeholder="Enter provided key" style={{ ...styles.input, border: '1.5px solid #4CAF50' }} />
          </div>
          
          <div style={styles.inputGroup}>
            <label>Password</label>
            <input type={showPassword ? 'text' : 'password'} style={styles.input} />
            <div style={{ position: 'absolute', right: '12px', bottom: '10px', cursor: 'pointer', display: 'flex' }} onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
            </div>
          </div>
          
          <button style={styles.primaryBtn}>Request Access</button>
          
          <p style={{ textAlign: 'center', marginTop: '20px' }}>
            Already Admin? <span className="toggle-link" onClick={toggleMode} style={{ color: '#2D4F1E', cursor: 'pointer', fontWeight: 'bold' }}>Login</span>
          </p>
        </div>

        {/* LOGIN FORM */}
        <div className="form-column login-col" style={{ ...styles.formSide, visibility: !isRegistering ? 'visible' : 'hidden' }}>
          <h1 style={{ marginBottom: '5px' }}>Admin Login</h1>
          <p style={{ color: '#666', marginBottom: '25px' }}>Enter your credentials to continue.</p>
          
          <div style={styles.inputGroup}><label>Admin ID</label><input type="text" placeholder="admin@fruitbounty.com" style={styles.input} /></div>
          
          <div style={styles.inputGroup}>
            <label>Password</label>
            <input type={showPassword ? 'text' : 'password'} style={styles.input} />
            <div style={{ position: 'absolute', right: '12px', bottom: '10px', cursor: 'pointer', display: 'flex' }} onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
            </div>
          </div>

          <div style={{ textAlign: 'right', marginBottom: '15px' }}>
            <Link to="/forgot-password" size="small" className="forget-link" style={{ color: '#2D4F1E', fontSize: '0.8rem', textDecoration: 'none', fontWeight: '600' }}>Forget password?</Link>
          </div>

          <button style={styles.primaryBtn}>Secure Sign In</button>
          
          <p style={{ textAlign: 'center', marginTop: '20px' }}>
            New Admin? <span className="toggle-link" onClick={toggleMode} style={{ color: '#2D4F1E', cursor: 'pointer', fontWeight: 'bold' }}>Register Here</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
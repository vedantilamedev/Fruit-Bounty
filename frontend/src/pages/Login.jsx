import { registerUser, loginUser } from "../api/api";
import React, { useState, useEffect } from 'react';
import { Google, Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, ShieldCheck, Lock } from "lucide-react";

const LoginRegister = () => {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, [isRegistering]);

  const toggleMode = () => {
    setAnimate(false);
    setIsRegistering(!isRegistering);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  // RESTORED ORIGINAL REGISTER LOGIC
  const handleRegister = async () => {
    try {
      console.log("Sending register:", formData);
      const res = await registerUser(formData);
      console.log("Register response:", res.data);
      alert("User registered successfully 🎉");
      setIsRegistering(false);
    } catch (err) {
      console.error("Register error:", err);
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  // RESTORED ORIGINAL LOGIN LOGIC
  const handleLogin = async () => {
    try {
      console.log("Sending login:", loginData);
      const res = await loginUser(loginData);
      console.log("Login response:", res.data);
      localStorage.setItem("token", res.data.token);
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Login error:", err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  // RESTORED NUMERIC INPUT HANDLER
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
      backgroundColor: '#faf9f6', // Cart Page background
      fontFamily: "'Poppins', sans-serif",
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 9999,
    },
    bgOverlay: {
      position: 'absolute',
      inset: 0,
      backgroundImage: "url('/images/main-background.webp')", // Cart texture
      backgroundSize: "400px",
      opacity: 0.6,
      zIndex: 0
    },
    mainBox: {
      position: 'relative',
      width: '100vw',
      height: '100vh',
      display: 'flex',
      overflow: 'hidden',
      zIndex: 1
    },
    overlaySection: {
      position: 'absolute',
      top: 0,
      left: isRegistering ? '50%' : '0%',
      width: '50%',
      height: '100%',
      backgroundImage: "url('/images/login-illustration.webp')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      zIndex: 20,
      transition: 'all 0.8s cubic-bezier(0.65, 0, 0.35, 1)',
      display: 'flex',
      flexDirection: 'column',
      padding: '40px',
    },
    formSide: {
      width: '50%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      transition: 'opacity 0.5s ease, transform 0.5s ease',
      opacity: animate ? 1 : 0,
      transform: animate ? 'scale(1)' : 'scale(0.98)',
      overflowY: 'auto',
      padding: '0 8%',
    },
    card: {
      backgroundColor: 'white',
      padding: '40px',
      borderRadius: '2rem',
      border: '3px solid #C9C27A', // Cart border color
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    },
    label: {
      fontSize: '10px',
      fontWeight: '900',
      textTransform: 'uppercase',
      letterSpacing: '0.15em',
      color: '#9ca3af',
      marginBottom: '8px',
      display: 'block'
    },
    input: {
      width: '100%',
      padding: '14px 15px',
      borderRadius: '1rem',
      border: '1px solid #e5e7eb',
      backgroundColor: '#faf9f6',
      fontSize: '0.9rem',
      fontWeight: '600',
      outline: 'none',
    },
    passwordWrapper: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      borderRadius: '1rem',
      backgroundColor: '#faf9f6',
      border: '1px solid #e5e7eb',
      overflow: 'hidden'
    },
    pretextDots: {
      position: 'absolute',
      left: '45px',
      fontSize: '1.2rem',
      letterSpacing: '2px',
      color: '#d1d5db',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      zIndex: 1
    },
    primaryBtn: {
      width: '100%',
      padding: '16px',
      borderRadius: '1.2rem',
      border: 'none',
      backgroundColor: '#14532d', // Cart green
      color: '#FFF',
      fontWeight: '900',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      cursor: 'pointer',
      marginTop: '25px',
      transition: 'all 0.3s ease',
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.bgOverlay}></div>
      <style>{`
        .back-btn-mobile { display: none; }
        @media (max-width: 900px) {
          .sliding-overlay { display: none !important; }
          .form-column { width: 100% !important; padding: 20px !important; }
          .back-btn-mobile { 
             display: flex !important; 
             position: absolute; top: 25px; left: 20px; 
             z-index: 100; align-items: center; gap: 8px;
             font-size: 10px; font-weight: 900; color: #9ca3af; text-transform: uppercase;
          }
          .signup-col { display: ${isRegistering ? 'flex' : 'none'} !important; }
          .login-col { display: ${!isRegistering ? 'flex' : 'none'} !important; }
        }
        .primary-btn:hover { filter: brightness(1.1); transform: translateY(-1px); }
      `}</style>

      {/* Mobile Back Option */}
      <div className="back-btn-mobile" onClick={() => navigate(-1)}>
        <ArrowLeft size={16} /> Back
      </div>

      {/* Top Right Logo */}
      <img 
        src="/images/footerlogo.webp" 
        alt="Logo" 
        style={{ position: 'absolute', top: '25px', right: '25px', height: '40px', zIndex: 100 }} 
      />

      <div style={styles.mainBox}>
        <div className="sliding-overlay" style={styles.overlaySection}>
          <div style={{ background: 'rgba(255,255,255,0.9)', padding: '20px', borderRadius: '1.5rem', border: '3px solid #C9C27A', width: 'fit-content' }}>
            <h3 style={{ color: '#14532d', margin: 0, fontSize: '1.1rem', fontWeight: 900, textTransform: 'uppercase' }}>
              {isRegistering ? 'Fresh Starts' : 'Welcome Back'}
            </h3>
            <p style={{ color: '#666', fontSize: '0.7rem', margin: '4px 0 0 0', fontWeight: 700, textTransform: 'uppercase' }}>Best fruit bowls in the city.</p>
          </div>
        </div>

        {/* LEFT FORM (Signup) */}
        <div className="form-column signup-col" style={{ ...styles.formSide, visibility: isRegistering ? "visible" : "hidden" }}>
          <div style={styles.card}>
            <h1 style={{ fontSize: '2rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '20px' }}>
              Sign Up <Sparkles className="inline text-[#C9C27A]" size={24} />
            </h1>

            <div style={{ marginBottom: '15px' }}>
              <label style={styles.label}>Full Name</label>
              <input type="text" placeholder="John Doe" style={styles.input} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={styles.label}>Email Address</label>
              <input type="email" placeholder="john@example.com" style={styles.input} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label style={styles.label}>Phone</label>
              <input type="tel" onInput={handleNumericInput} placeholder="1234567890" style={styles.input} />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={styles.label}>Password</label>
              <div style={styles.passwordWrapper}>
                <Lock size={16} style={{ marginLeft: '15px', color: '#9ca3af', zIndex: 2 }} />
                {!formData.password && <div style={styles.pretextDots}>••••••••••••</div>}
                <input
                  type={showPassword ? "text" : "password"}
                  style={{ ...styles.input, backgroundColor: 'transparent', border: 'none', position: 'relative', zIndex: 2 }}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <div style={{ paddingRight: '15px', color: '#14532d', cursor: 'pointer', zIndex: 3 }} onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                </div>
              </div>
            </div>

            <button className="primary-btn" style={styles.primaryBtn} onClick={handleRegister}>Create Account</button>
            <p style={{ textAlign: "center", fontSize: "0.8rem", marginTop: "20px", fontWeight: 700 }}>
              Member? <span onClick={toggleMode} style={{ color: "#C9C27A", cursor: "pointer", textDecoration: "underline" }}>Login</span>
            </p>
          </div>
        </div>

        {/* RIGHT FORM (Login) */}
        <div className="form-column login-col" style={{ ...styles.formSide, visibility: !isRegistering ? 'visible' : 'hidden' }}>
          <div style={styles.card}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '20px' }}>
              Login <ShieldCheck className="inline text-[#C9C27A]" size={28} />
            </h1>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={styles.label}>Email</label>
              <input type="email" placeholder="Enter email" style={styles.input} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={styles.label}>Password</label>
              <div style={styles.passwordWrapper}>
                <Lock size={16} style={{ marginLeft: '15px', color: '#9ca3af', zIndex: 2 }} />
                {!loginData.password && <div style={styles.pretextDots}>••••••••••••</div>}
                <input
                  type={showPassword ? 'text' : 'password'}
                  style={{ ...styles.input, backgroundColor: 'transparent', border: 'none', position: 'relative', zIndex: 2 }}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                />
                <div style={{ paddingRight: '15px', color: '#14532d', cursor: 'pointer', zIndex: 3 }} onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                </div>
              </div>
            </div>

            <button className="primary-btn" style={styles.primaryBtn} onClick={handleLogin}>Sign In</button>
            
            {/* Restored Original Google Button Logic */}
            <button className="primary-btn" style={{ width: '100%', padding: '15px', borderRadius: '1rem', marginTop: '15px', border: '1px solid #e5e7eb', backgroundColor: '#FFF', color: '#14532d', fontWeight: '900', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', cursor: 'pointer', textTransform: 'uppercase', fontSize: '0.75rem' }}>
              <Google style={{ color: '#EA4335' }} /> Continue with Google
            </button>

            <div style={{ textAlign: 'center', marginTop: '15px' }}>
              <Link to="/forgot-password" style={{ color: '#9ca3af', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', textDecoration: 'none' }}>Forget password?</Link>
            </div>

            <p style={{ textAlign: 'center', fontSize: '0.8rem', marginTop: '15px', fontWeight: 700 }}>
              New? <span onClick={toggleMode} style={{ color: '#C9C27A', cursor: 'pointer', textDecoration: 'underline' }}>Register</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
import { registerUser, loginUser } from "../api/api";
import React, { useState, useEffect } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
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

  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleRegister = async () => {
    try {
      const res = await registerUser(formData);
      alert("User registered successfully 🎉");
      setIsRegistering(false);
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  const handleLogin = async () => {
    try {
      const res = await loginUser(loginData);
      localStorage.setItem("token", res.data.token);
      alert("Successfully logged in! Redirecting...");
      navigate("/", { replace: true });
    } catch (err) {
      if (err.response?.status === 401) {
        alert("Invalid credentials. Please check your email and password.");
      } else {
        alert(err.response?.data?.message || "Login failed");
      }
    }
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
      backgroundColor: '#faf9f6',
      fontFamily: "'Poppins', sans-serif",
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 9999,
      overflow: 'hidden'
    },
    bgOverlay: {
      position: 'absolute',
      inset: 0,
      backgroundImage: "url('/images/main-background.webp')",
      backgroundSize: "400px",
      opacity: 0.6,
      zIndex: 0
    },
    mainBox: {
      position: 'relative',
      width: '100%',
      height: '100%',
      display: 'flex',
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
      alignItems: 'center',
      padding: '20px 20px 40px 20px', 
      overflowY: 'auto',
      transition: 'opacity 0.5s ease',
      zIndex: 5,
    },
    headerRow: {
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr', // Layout: [Arrow] [Logo] [Empty Space]
        alignItems: 'center',
        width: '100%',
        maxWidth: '520px',
        marginBottom: '20px',
        marginTop: '10px'
    },
    smallBackBtn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '35px',
        height: '35px',
        borderRadius: '50%',
        backgroundColor: '#FFF',
        border: '1px solid #e5e7eb',
        color: '#14532d',
        cursor: 'pointer',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        transition: 'all 0.2s ease',
    },
    outsideLogo: {
      height: '50px',
      display: 'block',
      filter: 'drop-shadow(0px 4px 4px rgba(0,0,0,0.1))'
    },
    card: {
      backgroundColor: 'white',
      padding: '40px',
      width: '100%',
      maxWidth: '520px',
      borderRadius: '2rem',
      border: '3px solid #C9C27A',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      margin: '0 auto' 
    },
    cardHeading: {
      fontSize: '2rem',
      fontWeight: 900,
      textTransform: 'uppercase',
      marginBottom: '25px',
      textAlign: 'left'
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
      backgroundColor: '#14532d',
      color: '#FFF',
      fontWeight: '900',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      cursor: 'pointer',
      marginTop: '25px',
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.bgOverlay}></div>
      <style>{`
        .form-column::-webkit-scrollbar { width: 0px; background: transparent; }
        .back-btn-hover:hover { background-color: #14532d !important; color: #FFF !important; transform: translateX(-2px); }
        
        @media (max-width: 900px) {
          .sliding-overlay { display: none !important; }
          .form-column { width: 100% !important; padding: 15px !important; }
          .signup-col { display: ${isRegistering ? 'flex' : 'none'} !important; }
          .login-col { display: ${!isRegistering ? 'flex' : 'none'} !important; }
          .card-responsive { padding: 30px 20px !important; border-radius: 1.5rem !important; }
          .header-row-responsive { max-width: 100% !important; }
        }

        /* Full Responsiveness for every size */
        @media (min-height: 850px) {
            .form-column { justify-content: center !important; }
        }
      `}</style>

      <div style={styles.mainBox}>
        {/* Sliding Image Background */}
        <div className="sliding-overlay" style={styles.overlaySection}>
          <div style={{ background: 'rgba(255,255,255,0.9)', padding: '20px', borderRadius: '1.5rem', border: '3px solid #C9C27A', width: 'fit-content' }}>
            <h3 style={{ color: '#14532d', margin: 0, fontSize: '1.1rem', fontWeight: 900, textTransform: 'uppercase' }}>
              {isRegistering ? 'Fresh Starts' : 'Welcome Back'}
            </h3>
          </div>
        </div>

        {/* SIGNUP FORM */}
        <div className="form-column signup-col" style={{ 
          ...styles.formSide, 
          visibility: isRegistering ? "visible" : "hidden",
          opacity: isRegistering ? 1 : 0 
        }}>
          <div className="header-row-responsive" style={styles.headerRow}>
              <button 
                className="back-btn-hover" 
                style={styles.smallBackBtn}
                onClick={() => navigate("/")}
                title="Back to Home"
              >
                <ArrowLeft size={18} />
              </button>
              <img src="/images/footerlogo.webp" alt="Logo" style={styles.outsideLogo} />
              <div></div> {/* Spacer for grid alignment */}
          </div>

          <div className="card-responsive" style={styles.card}>
            <h1 style={styles.cardHeading}>Sign Up <Sparkles className="inline text-[#C9C27A]" size={24} /></h1>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={styles.label}>Full Name</label>
              <input type="text" placeholder="Full Name" style={styles.input} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={styles.label}>Phone</label>
              <input type="tel" onInput={handleNumericInput} placeholder="1234567890" style={styles.input} />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={styles.label}>Email Address</label>
              <input type="email" placeholder="name@email.com" style={styles.input} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={styles.label}>Password</label>
              <div style={styles.passwordWrapper}>
                <Lock size={16} style={{ marginLeft: '15px', color: '#9ca3af', zIndex: 2 }} />
                {!formData.password && <div style={styles.pretextDots}>••••••••••••</div>}
                <input type={showPassword ? "text" : "password"} style={{ ...styles.input, backgroundColor: 'transparent', border: 'none', position: 'relative', zIndex: 2 }} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                <div style={{ paddingRight: '15px', color: '#14532d', cursor: 'pointer', zIndex: 3 }} onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                </div>
              </div>
            </div>

            <button style={styles.primaryBtn} onClick={handleRegister}>Create Account</button>
            <p style={{ textAlign: "center", fontSize: "0.8rem", marginTop: "20px", fontWeight: 700 }}>
              Member? <span onClick={toggleMode} style={{ color: "#C9C27A", cursor: "pointer", textDecoration: "underline" }}>Login</span>
            </p>
          </div>
        </div>

        {/* LOGIN FORM */}
        <div className="form-column login-col" style={{ 
          ...styles.formSide, 
          visibility: !isRegistering ? 'visible' : 'hidden',
          opacity: !isRegistering ? 1 : 0 
        }}>
          <div className="header-row-responsive" style={styles.headerRow}>
              <button 
                className="back-btn-hover" 
                style={styles.smallBackBtn}
                onClick={() => navigate("/")}
                title="Back to Home"
              >
                <ArrowLeft size={18} />
              </button>
              <img src="/images/footerlogo.webp" alt="Logo" style={styles.outsideLogo} />
              <div></div> {/* Spacer for grid alignment */}
          </div>

          <div className="card-responsive" style={styles.card}>
            <h1 style={styles.cardHeading}>Login <ShieldCheck className="inline text-[#C9C27A]" size={28} /></h1>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={styles.label}>Email</label>
              <input type="email" placeholder="Enter email" style={styles.input} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={styles.label}>Password</label>
              <div style={styles.passwordWrapper}>
                <Lock size={16} style={{ marginLeft: '15px', color: '#9ca3af', zIndex: 2 }} />
                {!loginData.password && <div style={styles.pretextDots}>••••••••••••</div>}
                <input type={showPassword ? 'text' : 'password'} style={{ ...styles.input, backgroundColor: 'transparent', border: 'none', position: 'relative', zIndex: 2 }} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
                <div style={{ paddingRight: '15px', color: '#14532d', cursor: 'pointer', zIndex: 3 }} onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                </div>
              </div>
            </div>

            <button style={styles.primaryBtn} onClick={handleLogin}>Sign In</button>
            
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
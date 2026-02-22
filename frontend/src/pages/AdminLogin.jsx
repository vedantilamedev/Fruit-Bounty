import React, { useState, useEffect } from "react";
import { Visibility, VisibilityOff, Security } from "@mui/icons-material";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const styles = {
    pageWrapper: {
      minHeight: "100vh",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background:
        "radial-gradient(circle at 20% 10%, #ffffff 0%, #F2ECDD 42%, #EAF1E7 100%)",
      fontFamily: "'Poppins', sans-serif",
      padding: "24px",
      boxSizing: "border-box",
      position: "relative",
      overflow: "hidden",
    },
    mainBox: {
      position: "relative",
      width: "min(1100px, 100%)",
      minHeight: "min(720px, calc(100vh - 48px))",
      display: "flex",
      overflow: "hidden",
      backgroundColor: "rgba(255,255,255,0.72)",
      borderRadius: "24px",
      border: "1px solid #E7E1D4",
      boxShadow: "0 26px 64px rgba(28, 43, 21, 0.16)",
      backdropFilter: "blur(8px)",
    },
    overlaySection: {
      position: "absolute",
      top: 0,
      left: isRegistering ? "50%" : "0%",
      width: "50%",
      height: "100%",
      background: "linear-gradient(165deg, #2D4F1E 0%, #3C7E44 100%)",
      zIndex: 10,
      transition: "all 0.8s cubic-bezier(0.65, 0, 0.35, 1)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "44px",
      color: "#FFFFFF",
      textAlign: "center",
    },
    formSide: {
      width: "50%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      backgroundColor: "#FAF8F3",
      color: "#2D4F1E",
      padding: "32px clamp(20px, 4vw, 48px)",
      transition: "opacity 0.5s ease, transform 0.5s ease",
      opacity: animate ? 1 : 0,
      transform: animate ? "scale(1)" : "scale(0.95)",
      boxSizing: "border-box",
    },
    inputGroup: {
      marginBottom: "14px",
      position: "relative",
      width: "100%",
    },
    input: {
      width: "100%",
      padding: "13px 14px",
      borderRadius: "10px",
      border: "1.5px solid #DED8CB",
      marginTop: "6px",
      fontSize: "0.96rem",
      outline: "none",
      boxSizing: "border-box",
      backgroundColor: "#FFFFFF",
      transition: "border-color .2s ease, box-shadow .2s ease",
    },
    primaryBtn: {
      width: "100%",
      padding: "14px",
      borderRadius: "10px",
      border: "none",
      background: "linear-gradient(135deg, #2F5321 0%, #3C7E44 100%)",
      color: "#FFF",
      fontWeight: "700",
      cursor: "pointer",
      marginTop: "10px",
      fontSize: "0.97rem",
      letterSpacing: "0.01em",
      boxShadow: "0 8px 18px rgba(45, 79, 30, 0.24)",
      transition: "transform .2s ease, box-shadow .2s ease",
    },
  };
  const handleRegister = () => {
    console.log("Register Data:", registerData);

    if (
      !registerData.name ||
      !registerData.email ||
      !registerData.secretKey ||
      !registerData.password
    ) {
      alert("Please fill all fields");
      return;
    }

    // API call here
    axios.post("/api/admin/register", registerData);

    alert("Request Sent Successfully!");
  };

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    secretKey: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/login",
        loginData,
      );

      if (res.data.role !== "admin") {
        alert("Access denied. Not an admin.");
        return;
      }

      localStorage.setItem("token", res.data.token);
      alert("Admin Login Successful");

      // redirect to admin dashboard
      navigate("/admin/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div
        style={{
          position: "absolute",
          width: 250,
          height: 250,
          borderRadius: "50%",
          top: -90,
          left: -80,
          background:
            "radial-gradient(circle, rgba(60,126,68,0.2), rgba(60,126,68,0))",
          pointerEvents: "none",
          filter: "blur(8px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 220,
          height: 220,
          borderRadius: "50%",
          bottom: -70,
          right: -70,
          background:
            "radial-gradient(circle, rgba(183,162,97,0.24), rgba(183,162,97,0))",
          pointerEvents: "none",
          filter: "blur(8px)",
        }}
      />

      <style>{`
        .auth-shell { isolation: isolate; }
        .admin-panel {
          background: rgba(255,255,255,0.88);
          border: 1px solid #E8E2D6;
          border-radius: 16px;
          padding: 22px;
          box-shadow: 0 12px 30px rgba(32, 49, 23, 0.1);
          backdrop-filter: blur(8px);
          position: relative;
          overflow: hidden;
        }
        .admin-panel::after {
          content: '';
          position: absolute;
          width: 150px;
          height: 150px;
          right: -68px;
          top: -68px;
          border-radius: 999px;
          background: radial-gradient(circle, rgba(183,162,97,.2), transparent 70%);
          pointer-events: none;
        }
        .admin-title {
          margin: 0 0 6px 0;
          font-size: clamp(1.65rem, 2vw, 1.95rem);
          font-weight: 800;
          color: #1E3520;
          letter-spacing: -0.02em;
        }
        .admin-subtitle {
          margin: 0 0 20px 0;
          color: #6A7468;
          font-size: 0.93rem;
        }
        .admin-label {
          font-size: .78rem;
          color: #3A5B39;
          letter-spacing: .04em;
          text-transform: uppercase;
          font-weight: 700;
        }
        .admin-input:focus {
          border-color: #3C7E44 !important;
          box-shadow: 0 0 0 3px rgba(60,126,68,.14);
        }
        .admin-input::placeholder { color: #98A195; }
        .admin-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 12px 22px rgba(45, 79, 30, 0.30);
        }
        .admin-btn:active {
          transform: scale(0.995);
        }
        .admin-helper {
          text-align: center;
          margin-top: 18px;
          font-size: .92rem;
          color: #5D675A;
        }
        .overlay-icon {
          width: 82px;
          height: 82px;
          border-radius: 20px;
          background: rgba(255,255,255,0.16);
          border: 1px solid rgba(255,255,255,0.22);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 18px;
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.08);
        }
        .overlay-title {
          font-size: 2.15rem;
          font-weight: 800;
          line-height: 1.2;
          margin: 0;
        }
        .overlay-subtitle {
          margin-top: 10px;
          opacity: .9;
          font-size: .95rem;
          max-width: 320px;
          line-height: 1.6;
        }
        .overlay-chip {
          margin-top: 18px;
          padding: 6px 12px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.24);
          background: rgba(255,255,255,0.14);
          font-size: .72rem;
          font-weight: 700;
          letter-spacing: .04em;
          text-transform: uppercase;
        }
        @media (max-width: 850px) {
          .sliding-overlay { display: none !important; }
          .form-column { 
            width: 100% !important; 
            background-color: #FAF8F3 !important; 
            color: #1E3520 !important;
            padding: 22px 16px !important;
          }
          .auth-shell {
            min-height: auto !important;
            border-radius: 18px !important;
          }
          .admin-panel {
            border-radius: 14px !important;
            padding: 18px !important;
            box-shadow: 0 8px 20px rgba(32,49,23,.07) !important;
          }
          .signup-col { display: ${isRegistering ? "flex" : "none"} !important; }
          .login-col { display: ${!isRegistering ? "flex" : "none"} !important; }
          .toggle-link { color: #3C7E44 !important; }
          .forget-link { color: #3C7E44 !important; }
        }
        @media (max-width: 480px) {
          .auth-shell { border-radius: 14px !important; }
          .admin-title { font-size: 1.45rem !important; }
        }
      `}</style>

      <div className="auth-shell" style={styles.mainBox}>
        {/* SLIDING OVERLAY (HIDDEN ON MOBILE) */}
        <div className="sliding-overlay" style={styles.overlaySection}>
          <div className="overlay-icon">
            <Security style={{ fontSize: "44px" }} />
          </div>
          <h2 className="overlay-title">
            {isRegistering ? "Secure Access" : "Admin Portal"}
          </h2>
          <p className="overlay-subtitle">
            {isRegistering
              ? "Request administrative credentials"
              : "Welcome back to Fruit Bounty HQ"}
          </p>
          <div className="overlay-chip">Fruit Bounty Admin</div>
        </div>

        {/* REGISTRATION FORM */}
        <div
          className="form-column signup-col admin-panel"
          style={{
            ...styles.formSide,
            visibility: isRegistering ? "visible" : "hidden",
          }}
        >
          <h1 className="admin-title">Register Admin</h1>
          <p className="admin-subtitle">Create your management account.</p>

          <div style={styles.inputGroup}>
            <label className="admin-label">Full Name</label>
            <input
              className="admin-input"
              type="text"
              placeholder="Admin Name"
              style={styles.input}
              value={registerData.name}
              onChange={(e) =>
                setRegisterData({ ...registerData, name: e.target.value })
              }
            />
          </div>

          <div style={styles.inputGroup}>
            <label className="admin-label">Email</label>
            <input
              className="admin-input"
              type="email"
              placeholder="admin@fruitbounty.com"
              style={styles.input}
              value={registerData.email}
              onChange={(e) =>
                setRegisterData({ ...registerData, email: e.target.value })
              }
            />
          </div>

          <div style={styles.inputGroup}>
            <label className="admin-label">Secret Admin Key</label>
            <input
              className="admin-input"
              type="password"
              placeholder="Enter provided key"
              style={styles.input}
              value={registerData.secretKey}
              onChange={(e) =>
                setRegisterData({ ...registerData, secretKey: e.target.value })
              }
            />
          </div>

          <div style={styles.inputGroup}>
            <label className="admin-label">Password</label>
            <input
              className="admin-input"
              type={showPassword ? "text" : "password"}
              style={styles.input}
              value={registerData.password}
              onChange={(e) =>
                setRegisterData({ ...registerData, password: e.target.value })
              }
            />
            <div
              style={{
                position: "absolute",
                right: "12px",
                bottom: "11px",
                cursor: "pointer",
                color: "#6D756A",
                display: "flex",
                alignItems: "center",
              }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <VisibilityOff fontSize="small" />
              ) : (
                <Visibility fontSize="small" />
              )}
            </div>
          </div>

          <button
            className="admin-btn"
            style={styles.primaryBtn}
            onClick={handleRegister}
          >
            Request Access
          </button>

          <p className="admin-helper">
            Already Admin?{" "}
            <span
              className="toggle-link"
              onClick={toggleMode}
              style={{
                color: "#2D4F1E",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Login
            </span>
          </p>
        </div>

        {/* LOGIN FORM */}
        <form
          className="form-column login-col admin-panel"
          onSubmit={handleLogin}
          style={{
            ...styles.formSide,
            visibility: !isRegistering ? "visible" : "hidden",
          }}
        >
          <h1 className="admin-title">Admin Login</h1>
          <p className="admin-subtitle">Enter your credentials to continue.</p>

          <div style={styles.inputGroup}>
            <label className="admin-label">Admin ID</label>
            <input
              className="admin-input"
              type="text"
              placeholder="admin@fruitbounty.com"
              style={styles.input}
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
            />
          </div>

          <div style={styles.inputGroup}>
            <label className="admin-label">Password</label>
            <input
              className="admin-input"
              type={showPassword ? "text" : "password"}
              style={styles.input}
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />
            <div
              style={{
                position: "absolute",
                right: "12px",
                bottom: "11px",
                cursor: "pointer",
                color: "#6D756A",
                display: "flex",
                alignItems: "center",
              }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <VisibilityOff fontSize="small" />
              ) : (
                <Visibility fontSize="small" />
              )}
            </div>
          </div>

          <div style={{ textAlign: "right", marginBottom: "15px" }}>
            <Link
              to="/forgot-password"
              size="small"
              className="forget-link"
              style={{
                color: "#2D4F1E",
                fontSize: "0.82rem",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              Forget password?
            </Link>
          </div>

          <button className="admin-btn" type="submit" style={styles.primaryBtn}>
            Secure Sign In
          </button>

          <p className="admin-helper">
            New Admin?{" "}
            <span
              className="toggle-link"
              onClick={toggleMode}
              style={{
                color: "#2D4F1E",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Register Here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

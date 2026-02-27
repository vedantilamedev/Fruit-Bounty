import React, { useState } from "react";
import { Visibility, VisibilityOff, Security } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || "https://fruit-bounty-dmzs.onrender.com/api";

const AdminLogin = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

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

  const handleRegister = async () => {
    if (
      !registerData.name ||
      !registerData.email ||
      !registerData.secretKey ||
      !registerData.password
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/admin/register`, registerData);
      alert("Request sent successfully");
      setIsRegistering(false);
    } catch (error) {
      alert(error.response?.data?.message || "Registration request failed");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      console.log(loginData);
      const res = await axios.post(
        `${BASE_URL}/admin/login`,
        loginData,
      );

      if (res.data.admin.role !== "admin") {
        alert("Access denied. Not an admin.");
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.admin.role);
      
      alert("Admin login successful");
      navigate("/admin/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f6ef] relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: "url('/images/main-background.webp')",
          backgroundSize: "420px",
          backgroundRepeat: "repeat",
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#edf6eb]/80 via-transparent to-[#f8f6ef]"></div>

      <style>{`
        .admin-auth-shell {
          position: relative;
          z-index: 10;
          min-height: 100vh;
          display: grid;
          place-items: center;
          padding: 24px;
        }
        .admin-auth-card {
          width: min(1100px, 100%);
          min-height: min(720px, calc(100vh - 48px));
          background: rgba(255, 255, 255, 0.82);
          border: 1px solid #e9e2cf;
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 28px 70px rgba(28, 43, 21, 0.16);
          backdrop-filter: blur(8px);
          display: grid;
          grid-template-columns: 0.95fr 1.05fr;
        }
        .admin-left {
          background: linear-gradient(155deg, #143d26 0%, #1c5b32 45%, #2a6f3c 72%, #b79654 150%);
          padding: 38px 34px;
          color: #fff;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
        }
        .admin-left::before {
          content: "";
          position: absolute;
          width: 250px;
          height: 250px;
          top: -110px;
          right: -70px;
          border-radius: 999px;
          background: radial-gradient(circle, rgba(255,255,255,.22), rgba(255,255,255,0));
        }
        .admin-left::after {
          content: "";
          position: absolute;
          width: 220px;
          height: 220px;
          bottom: -100px;
          left: -70px;
          border-radius: 999px;
          background: radial-gradient(circle, rgba(255,255,255,.18), rgba(255,255,255,0));
        }
        .admin-pattern {
          position: absolute;
          inset: 0;
          opacity: .14;
          background-image: linear-gradient(rgba(255,255,255,.22) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.22) 1px, transparent 1px);
          background-size: 22px 22px;
          pointer-events: none;
        }
        .admin-ring {
          position: absolute;
          width: 320px;
          height: 320px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,.22);
          right: -150px;
          bottom: -130px;
          pointer-events: none;
        }
        .admin-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 900;
          letter-spacing: .08em;
          text-transform: uppercase;
          font-size: .86rem;
          color: #f6e7bc;
        }
        .admin-title {
          margin-top: 20px;
          font-size: clamp(2rem, 3.4vw, 2.8rem);
          line-height: 1.15;
          font-weight: 900;
          letter-spacing: -0.02em;
        }
        .admin-copy {
          margin-top: 14px;
          opacity: .92;
          max-width: 34ch;
          font-size: .94rem;
          line-height: 1.6;
        }
        .admin-highlight {
          margin-top: 18px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 1px solid rgba(255,255,255,.28);
          background: rgba(255,255,255,.14);
          border-radius: 999px;
          padding: 8px 13px;
          font-size: .72rem;
          text-transform: uppercase;
          font-weight: 800;
          letter-spacing: .08em;
          width: fit-content;
        }
        .admin-points {
          margin-top: 20px;
          display: grid;
          gap: 11px;
        }
        .admin-point {
          background: linear-gradient(135deg, rgba(255,255,255,.16), rgba(255,255,255,.08));
          border: 1px solid rgba(255,255,255,.24);
          border-radius: 13px;
          padding: 11px 12px;
          font-size: .75rem;
          font-weight: 800;
          letter-spacing: .05em;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .admin-point-dot {
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background: #f6e7bc;
          box-shadow: 0 0 0 4px rgba(246,231,188,.18);
          flex-shrink: 0;
        }
        .admin-stats {
          margin-top: 20px;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 8px;
        }
        .admin-stat {
          border: 1px solid rgba(255,255,255,.2);
          background: rgba(255,255,255,.1);
          border-radius: 11px;
          padding: 10px 8px;
          text-align: center;
        }
        .admin-stat b {
          display: block;
          font-size: .95rem;
          color: #f6e7bc;
          letter-spacing: .02em;
        }
        .admin-stat span {
          font-size: .62rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: .08em;
          opacity: .9;
        }
        .admin-left-footer {
          margin-top: 22px;
          font-size: .72rem;
          font-weight: 700;
          opacity: .86;
          letter-spacing: .1em;
          text-transform: uppercase;
        }
        .admin-right {
          padding: clamp(20px, 4vw, 42px);
          display: flex;
          align-items: center;
          justify-content: center;
          background: #faf8f2;
        }
        .admin-form-wrap {
          width: min(460px, 100%);
          background: #fff;
          border: 1px solid #ece4d0;
          border-radius: 18px;
          box-shadow: 0 12px 32px rgba(34, 50, 25, 0.08);
          padding: clamp(18px, 2.6vw, 28px);
        }
        .admin-tabs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          background: #f6f2e7;
          border: 1px solid #eadfbe;
          border-radius: 12px;
          padding: 5px;
          margin-bottom: 18px;
        }
        .admin-tab-btn {
          height: 38px;
          border: 0;
          border-radius: 9px;
          font-size: .74rem;
          font-weight: 900;
          letter-spacing: .08em;
          text-transform: uppercase;
          cursor: pointer;
          background: transparent;
          color: #6f7a68;
          transition: all .18s ease;
        }
        .admin-tab-btn.active {
          background: linear-gradient(135deg, #2e5725, #3d7b42);
          color: #fff;
          box-shadow: 0 8px 16px rgba(46, 87, 37, 0.22);
        }
        .admin-heading {
          margin: 0;
          font-size: clamp(1.4rem, 2vw, 1.8rem);
          font-weight: 900;
          color: #1f3521;
          letter-spacing: -0.02em;
        }
        .admin-sub {
          margin: 6px 0 18px;
          color: #6c7766;
          font-size: .92rem;
        }
        .admin-group { margin-bottom: 13px; }
        .admin-label {
          display: block;
          font-size: .72rem;
          color: #4b5f49;
          letter-spacing: .07em;
          text-transform: uppercase;
          font-weight: 800;
          margin-bottom: 6px;
        }
        .admin-input-wrap { position: relative; }
        .admin-input {
          width: 100%;
          height: 45px;
          border-radius: 11px;
          border: 1.5px solid #ddd6c5;
          padding: 0 13px;
          font-size: .94rem;
          color: #1f2a1f;
          background: #fff;
          outline: none;
          transition: border-color .2s ease, box-shadow .2s ease;
          box-sizing: border-box;
        }
        .admin-input::placeholder { color: #9aa498; }
        .admin-input:focus {
          border-color: #3c7e44;
          box-shadow: 0 0 0 3px rgba(60,126,68,.14);
        }
        .admin-eye-btn {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          border: 0;
          background: transparent;
          color: #6f7a68;
          cursor: pointer;
          display: grid;
          place-items: center;
          width: 28px;
          height: 28px;
          border-radius: 7px;
        }
        .admin-eye-btn:hover { background: #f4f7f2; }
        .admin-forgot {
          display: inline-block;
          font-size: .82rem;
          color: #2f5f2a;
          font-weight: 700;
          text-decoration: none;
        }
        .admin-forgot:hover { color: #23481f; }
        .admin-submit {
          width: 100%;
          height: 46px;
          border: 0;
          border-radius: 11px;
          background: linear-gradient(135deg, #2e5725, #3d7b42);
          color: #fff;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: .08em;
          cursor: pointer;
          margin-top: 10px;
          box-shadow: 0 10px 22px rgba(46, 87, 37, 0.26);
          transition: transform .18s ease, box-shadow .18s ease;
        }
        .admin-submit:hover {
          transform: translateY(-1px);
          box-shadow: 0 14px 24px rgba(46, 87, 37, 0.31);
        }
        .admin-submit:active { transform: scale(.995); }
        .admin-mini {
          margin-top: 14px;
          text-align: center;
          color: #6c7766;
          font-size: .88rem;
        }
        .admin-mini button {
          border: 0;
          background: transparent;
          color: #2f5f2a;
          font-weight: 800;
          cursor: pointer;
          padding: 0;
        }
        @media (max-width: 950px) {
          .admin-auth-card {
            grid-template-columns: 1fr;
            min-height: auto;
            border-radius: 20px;
          }
          .admin-right { order: 1; }
          .admin-left { display: none; }
          .admin-left {
            padding: 26px 20px;
            min-height: 220px;
          }
          .admin-stats { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          .admin-right {
            padding: 16px;
          }
          .admin-form-wrap {
            border-radius: 14px;
          }
        }
      `}</style>

      <div className="admin-auth-shell">
        <div className="admin-auth-card">
          <section className="admin-left">
            <div className="admin-pattern"></div>
            <div className="admin-ring"></div>
            <div>
              <div className="admin-brand">
                <Security fontSize="small" />
                Fruit Bounty Admin
              </div>
              <h1 className="admin-title">
                {isRegistering ? "Request Admin Access" : "Secure Admin Login"}
              </h1>
              <p className="admin-copy">
                Manage inventory, orders, deliveries, and analytics from one
                protected control panel.
              </p>

              <div className="admin-highlight">Internal Ops Console</div>

              <div className="admin-points">
                <div className="admin-point">
                  <span className="admin-point-dot"></span>
                  Role-based access control
                </div>
                <div className="admin-point">
                  <span className="admin-point-dot"></span>
                  Encrypted authentication
                </div>
                <div className="admin-point">
                  <span className="admin-point-dot"></span>
                  Live operations dashboard
                </div>
              </div>

              <div className="admin-stats">
                <div className="admin-stat">
                  <b>24x7</b>
                  <span>Monitoring</span>
                </div>
                <div className="admin-stat">
                  <b>SSL</b>
                  <span>Secure Login</span>
                </div>
                <div className="admin-stat">
                  <b>1 Panel</b>
                  <span>All Control</span>
                </div>
              </div>
            </div>
            <div className="admin-left-footer">Authorized Personnel Only</div>
          </section>

          <section className="admin-right">
            <div className="admin-form-wrap">
              <div className="admin-tabs">
                <button
                  type="button"
                  className={`admin-tab-btn ${!isRegistering ? "active" : ""}`}
                  onClick={() => setIsRegistering(false)}
                >
                  Login
                </button>
                <button
                  type="button"
                  className={`admin-tab-btn ${isRegistering ? "active" : ""}`}
                  onClick={() => setIsRegistering(true)}
                >
                  Register
                </button>
              </div>

              {isRegistering ? (
                <>
                  <h2 className="admin-heading">Register Admin</h2>
                  <p className="admin-sub">Create your management account.</p>

                  <div className="admin-group">
                    <label className="admin-label">Full Name</label>
                    <input
                      className="admin-input"
                      type="text"
                      placeholder="Admin name"
                      value={registerData.name}
                      onChange={(e) =>
                        setRegisterData({ ...registerData, name: e.target.value })
                      }
                    />
                  </div>

                  <div className="admin-group">
                    <label className="admin-label">Email</label>
                    <input
                      className="admin-input"
                      type="email"
                      placeholder="admin@fruitbounty.com"
                      value={registerData.email}
                      onChange={(e) =>
                        setRegisterData({ ...registerData, email: e.target.value })
                      }
                    />
                  </div>

                  <div className="admin-group">
                    <label className="admin-label">Secret Admin Key</label>
                    <input
                      className="admin-input"
                      type="password"
                      placeholder="Enter provided key"
                      value={registerData.secretKey}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          secretKey: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="admin-group">
                    <label className="admin-label">Password</label>
                    <div className="admin-input-wrap">
                      <input
                        className="admin-input"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create secure password"
                        value={registerData.password}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            password: e.target.value,
                          })
                        }
                      />
                      <button
                        type="button"
                        className="admin-eye-btn"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label="Toggle password visibility"
                      >
                        {showPassword ? (
                          <VisibilityOff fontSize="small" />
                        ) : (
                          <Visibility fontSize="small" />
                        )}
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="admin-submit"
                    onClick={handleRegister}
                  >
                    Request Access
                  </button>

                  <p className="admin-mini">
                    Already admin?{" "}
                    <button type="button" onClick={() => setIsRegistering(false)}>
                      Sign in
                    </button>
                  </p>
                </>
              ) : (
                <form onSubmit={handleLogin}>
                  <h2 className="admin-heading">Admin Login</h2>
                  <p className="admin-sub">
                    Enter your credentials to continue.
                  </p>

                  <div className="admin-group">
                    <label className="admin-label">Admin Email</label>
                    <input
                      className="admin-input"
                      type="email"
                      placeholder="admin@fruitbounty.com"
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({ ...loginData, email: e.target.value })
                      }
                    />
                  </div>

                  <div className="admin-group">
                    <label className="admin-label">Password</label>
                    <div className="admin-input-wrap">
                      <input
                        className="admin-input"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={loginData.password}
                        onChange={(e) =>
                          setLoginData({ ...loginData, password: e.target.value })
                        }
                      />
                      <button
                        type="button"
                        className="admin-eye-btn"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label="Toggle password visibility"
                      >
                        {showPassword ? (
                          <VisibilityOff fontSize="small" />
                        ) : (
                          <Visibility fontSize="small" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <Link to="/forgot-password" className="admin-forgot">
                      Forgot password?
                    </Link>
                  </div>

                  <button type="submit" className="admin-submit">
                    Secure Sign In
                  </button>

                  <p className="admin-mini">
                    New admin?{" "}
                    <button type="button" onClick={() => setIsRegistering(true)}>
                      Register here
                    </button>
                  </p>
                </form>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import bgImage from "../../assets/page-bg.png";
import logo from "../../assets/coin.png";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import { useApp } from "../../context/AppContext";

const GRADIENT_BORDER = "linear-gradient(135deg,#FFF2A6 0%,#FFD96A 12%,#FFC83D 28%,#F5B300 45%,#D88A00 68%,#8A5200 100%)";
const CARD_BG = "#0A090A";

const GRADIENT_TEXT = {
  background: GRADIENT_BORDER,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  color: "transparent",
};

export default function Login() {
  const [step, setStep] = useState('login'); // 'login' | 'otp'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpTimer, setOtpTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const navigate = useNavigate();
  const { loadUserData, setUser } = useApp();

  // Popup State
  const [popup, setPopup] = useState({ show: false, type: '', message: '' });

  const showPopup = (type, message) => {
    setPopup({ show: true, type, message });
    setTimeout(() => setPopup({ show: false, type: '', message: '' }), 2800);
  };

  // OTP Timer
  useEffect(() => {
    let interval;
    if (step === 'otp' && otpTimer > 0) {
      interval = setInterval(() => setOtpTimer(prev => prev - 1), 1000);
    } else if (otpTimer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [step, otpTimer]);

  // ==================== API CALLS ====================

  const handleLogin = async () => {
    if (!email || !password) {
      showPopup('error', 'Please enter email and password');
      return;
    }

    setLoading(true);
    try {
      // Correct Endpoint
      await API.post('/auth/login', { email, password });
      
      setStep('otp');
      setOtpTimer(60);
      setCanResend(false);
      setOtp('');
      showPopup('success', 'OTP sent to your email');
    } catch (err) {
      showPopup('error', err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      showPopup("error", "Please enter valid 6-digit OTP");
      return;
    }

    setLoading(true);

    try {
      // Correct Endpoint
      const res = await API.post("/auth/verify-otp", { email, otp });

      if (!res.data.token) {
        throw new Error("No token received");
      }

      localStorage.setItem("token", res.data.token);
      API.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;

      if (res.data.user) {
        setUser(res.data.user);
      } else {
        await loadUserData();
      }

      showPopup("success", "Login Successful! Welcome back 🎉");

      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 1200);

    } catch (err) {
      console.error(err);
      showPopup(
        "error",
        err.response?.data?.message || err.message || "Invalid OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    try {
      await API.post('/auth/login', { email, password });
      setOtpTimer(60);
      setCanResend(false);
      setOtp('');
      showPopup('success', 'New OTP sent successfully');
    } catch (err) {
      showPopup('error', err.response?.data?.message || 'Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: "transparent" }}>
      {/* Background */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.35,
        }}
      />
      <div className="fixed inset-0 z-0 bg-black/50 pointer-events-none" />

      <div className="relative z-10 max-w-[430px] mx-auto min-h-screen flex flex-col justify-center px-6 pb-28">

        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ width: 56, height: 56, marginBottom: 12, margin: '0 auto' }}>
            <img src={logo} alt="Logo" />
          </div>
          <div style={{ ...GRADIENT_TEXT, fontSize: 32, fontWeight: 800 }}>Login</div>
        </div>

        <AnimatePresence mode="wait">
          {step === 'login' ? (
            <motion.div key="login" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              {/* Email */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#e8b84b', marginBottom: 8 }}>EMAIL / USERNAME</div>
                <div style={{ padding: "1px", borderRadius: 16, background: GRADIENT_BORDER }}>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    style={{
                      background: CARD_BG,
                      borderRadius: 14,
                      width: '100%',
                      padding: '16px 20px',
                      fontSize: 16,
                      color: '#f3e6c9',
                    }}
                  />
                </div>
              </div>

              {/* Password */}
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#e8b84b', marginBottom: 8 }}>PASSWORD</div>
                <div style={{ padding: "1px", borderRadius: 16, background: GRADIENT_BORDER }}>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      style={{
                        background: CARD_BG,
                        borderRadius: 14,
                        width: '100%',
                        padding: '16px 20px',
                        fontSize: 16,
                        color: '#f3e6c9',
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)' }}
                    >
                      {showPassword ? <EyeOff size={20} color="#e8b84b" /> : <Eye size={20} color="#e8b84b" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Remember Me + Forgot Password */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    style={{ accentColor: '#e8b84b' }}
                  />
                  <span style={{ fontSize: 13, color: '#c9b38a' }}>Remember me</span>
                </label>

                <button
                  type="button"
                  onClick={() => navigate("/reset")}
                  style={{
                    fontSize: 13,
                    color: "#e8b84b",
                    fontWeight: 600,
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Forgot Password?
                </button>
              </div>

              {/* Login Button */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleLogin}
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '18px',
                  background: GRADIENT_BORDER,
                  color: '#0a0704',
                  fontSize: 16,
                  fontWeight: 700,
                  border: 'none',
                  borderRadius: 16,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  opacity: loading ? 0.85 : 1,
                }}
              >
                {loading ? 'Logging in...' : 'Login'} <ArrowRight size={18} />
              </motion.button>

              {/* Sign Up Link */}
              <div style={{ textAlign: 'center', marginTop: 24 }}>
                <span style={{ color: '#e8b84b', fontSize: 14 }}>Want to create an account? </span>
                <button
                  onClick={() => navigate("/signup")}
                  style={{ color: "#e8b84b", fontWeight: 700, fontSize: 14 }}
                >
                  Sign Up
                </button>
              </div>
            </motion.div>
          ) : (
            /* OTP Step */
            <motion.div key="otp" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div style={{ textAlign: 'center', marginBottom: 32 }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>📧</div>
                <div style={{ fontSize: 18, fontWeight: 700 }}>Enter OTP</div>
                <div style={{ color: '#e8b84b', marginTop: 6 }}>We sent a 6-digit code to</div>
                <div style={{ color: '#e8b84b', fontWeight: 600 }}>{email}</div>
              </div>

              <div style={{ padding: "1px", borderRadius: 18, background: GRADIENT_BORDER, marginBottom: 20 }}>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                  placeholder="123456"
                  maxLength={6}
                  style={{
                    background: CARD_BG,
                    borderRadius: 16,
                    width: '100%',
                    padding: '20px',
                    fontSize: 28,
                    fontWeight: 700,
                    textAlign: 'center',
                    letterSpacing: '12px',
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
                <div style={{ fontSize: 13, color: '#e8b84b' }}>
                  Time left: <span style={{ color: otpTimer <= 10 ? '#ef4444' : '#e8b84b' }}>{otpTimer}s</span>
                </div>
                {canResend && (
                  <button 
                    onClick={handleResendOtp}
                    disabled={loading}
                    style={{ color: '#e8b84b', fontWeight: 700 }}
                  >
                    Resend OTP
                  </button>
                )}
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleVerifyOtp}
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '18px',
                  background: GRADIENT_BORDER,
                  color: '#0a0704',
                  fontSize: 16,
                  fontWeight: 700,
                  border: 'none',
                  borderRadius: 16,
                }}
              >
                {loading ? 'Verifying...' : 'Verify OTP & Login'}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Popup Message */}
        <AnimatePresence>
          {popup.show && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              style={{
                position: 'fixed',
                bottom: 80,
                left: '50%',
                transform: 'translateX(-50%)',
                background: popup.type === 'error' ? '#450a0a' : '#0f1a10',
                border: `1px solid ${popup.type === 'error' ? '#ef4444' : '#5fd66a'}`,
                borderRadius: 16,
                padding: '14px 24px',
                color: popup.type === 'error' ? '#fda4af' : '#5fd66a',
                fontWeight: 600,
                zIndex: 10000,
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                maxWidth: '90%',
              }}
            >
              {popup.type === 'success' ? '✅' : '⚠️'} {popup.message}
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{ height: 100 }} />
      </div>
    </div>
  );
}





// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Eye, EyeOff, ArrowRight } from 'lucide-react';
// import bgImage from "../../assets/page-bg.png";
// import logo from "../../assets/coin.png";
// import { useNavigate } from "react-router-dom";
// import API from "../../services/api";
// import { useApp } from "../../context/AppContext";

// const GRADIENT_BORDER = "linear-gradient(135deg,#FFF2A6 0%,#FFD96A 12%,#FFC83D 28%,#F5B300 45%,#D88A00 68%,#8A5200 100%)";
// const CARD_BG = "#0A090A";

// const GRADIENT_TEXT = {
//   background: GRADIENT_BORDER,
//   WebkitBackgroundClip: "text",
//   WebkitTextFillColor: "transparent",
//   backgroundClip: "text",
//   color: "transparent",
// };

// export default function Login({ onSwitchToSignup }) {
  
//   const [step, setStep] = useState('login'); // 'login' | 'otp'
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [otp, setOtp] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [otpTimer, setOtpTimer] = useState(60);
//   const [canResend, setCanResend] = useState(false);
  
//   const navigate = useNavigate();

  

//   // Popup State
//   const [popup, setPopup] = useState({ show: false, type: '', message: '' });

//   const showPopup = (type, message) => {
//     setPopup({ show: true, type, message });
//     setTimeout(() => setPopup({ show: false, type: '', message: '' }), 2800);
//   };

//   // OTP Timer
//   useEffect(() => {
//     let interval;
//     if (step === 'otp' && otpTimer > 0) {
//       interval = setInterval(() => setOtpTimer(prev => prev - 1), 1000);
//     } else if (otpTimer === 0) {
//       setCanResend(true);
//     }
//     return () => clearInterval(interval);
//   }, [step, otpTimer]);

//   // ==================== API CALLS ====================

//   const handleLogin = async () => {
//     if (!email || !password) {
//       showPopup('error', 'Please enter email and password');
//       return;
//     }

//     setLoading(true);
//     try {
//       await API.post('/login', { email, password });
      
//       setStep('otp');
//       setOtpTimer(60);
//       setCanResend(false);
//       setOtp('');
//       showPopup('success', 'OTP sent to your email');
//     } catch (err) {
//       showPopup('error', err.message || 'Failed to send OTP');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const { loadUserData, setUser } = useApp();

//   // const handleVerifyOtp = async () => {
//   //   if (otp.length !== 6) {
//   //     showPopup('error', 'Please enter valid 6-digit OTP');
//   //     return;
//   //   }

//   //   setLoading(true);
//   //   try {
//   //     const res = await API.post('/verify-otp', { email, otp });

//   //     // Save token
//   //     localStorage.setItem('token', res.data.token);
//   //     API.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;

//   //     await loadUserData();

//   //     showPopup('success', 'Login Successful! Welcome back 🎉');
      
//   //     setTimeout(async () => {
//   //       // We can get user from /auth/me or it will be populated by loadUserData
//   //       const userRes = await API.get('/auth/me');
//   //       if (userRes.data?.user?.role === 'admin') {
//   //         navigate('/admin');
//   //       } else {
//   //         navigate('/dashboard');
//   //       }
//   //     }, 1500);
//   //   } catch (err) {
//   //     showPopup('error', err.response?.data?.message || err.message || 'Invalid OTP');
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };
// //   const handleVerifyOtp = async () => {
// //   if (otp.length !== 6) {
// //     showPopup('error', 'Please enter valid 6-digit OTP');
// //     return;
// //   }

// //   setLoading(true);

// //   try {
// //     const res = await API.post('/verify-otp', { email, otp });

// //     if (!res.data.token) {
// //       throw new Error('No token received from server');
// //     }

// //     // Save token
// //     localStorage.setItem('token', res.data.token);
// //     API.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;

// //     // Load user data
// //     await loadUserData();

// //     showPopup('success', 'Login Successful! Welcome back 🎉');

// //     // Wait for context to update + small delay for UX
// //     setTimeout(() => {
// //       const currentUser = useApp().user;   // Get latest user from context

// //       if (currentUser?.role === 'admin') {
// //         navigate('/admin', { replace: true });
// //       } else {
// //         navigate('/dashboard', { replace: true });
// //       }
// //     }, 1300);

// //   } catch (err) {
// //     console.error("Login Error:", err);
// //     showPopup('error', 
// //       err.response?.data?.message || 
// //       err.message || 
// //       'Invalid OTP or server error'
// //     );
// //   } finally {
// //     setLoading(false);
// //   }
// // };

// const handleVerifyOtp = async () => {
//   if (otp.length !== 6) {
//     showPopup("error", "Please enter valid 6-digit OTP");
//     return;
//   }

//   setLoading(true);

//   try {
//     const res = await API.post("/verify-otp", {
//       email,
//       otp,
//     });

//     if (!res.data.token) {
//       throw new Error("No token received");
//     }

//     // Save token
//     localStorage.setItem("token", res.data.token);
//     API.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;

//     // Set user directly from response (no extra /me API call needed)
//     if (res.data.user) {
//       setUser(res.data.user);
//     } else {
//       // Fallback: try loading from /me in background
//       loadUserData().catch(() => {});
//     }

//     // Show success message
//     showPopup("success", "Login Successful! Welcome back 🎉");

//     // Navigate to dashboard
//     setTimeout(() => {
//       navigate("/dashboard", { replace: true });
//     }, 1000);

//   } catch (err) {
//     console.error(err);
//     showPopup(
//       "error",
//       err.response?.data?.message || err.message || "Invalid OTP"
//     );
//   } finally {
//     setLoading(false);
//   }
// };


// // const handleVerifyOtp = async () => {
// //   if (otp.length !== 6) {
// //     showPopup("error", "Please enter valid 6-digit OTP");
// //     return;
// //   }

// //   setLoading(true);

// //   try {
// //     const res = await API.post("/verify-otp", {
// //       email,
// //       otp,
// //     });

// //     localStorage.setItem("token", res.data.token);

// //     API.defaults.headers.common["Authorization"] =
// //       `Bearer ${res.data.token}`;

// //     await loadUserData();

// //     showPopup("success", "Login Successful!");

// //     navigate("/dashboard", {
// //       replace: true,
// //     });

// //   } catch (err) {
// //     console.log(err);

// //     showPopup(
// //       "error",
// //       err.response?.data?.message || "Invalid OTP"
// //     );
// //   } finally {
// //     setLoading(false);
// //   }
// // };

//   const handleResendOtp = async () => {
//     setLoading(true);
//     try {
//       await API.post('/login', { email, password }); // Resend OTP
//       setOtpTimer(60);
//       setCanResend(false);
//       setOtp('');
//       showPopup('success', 'New OTP sent successfully');
//     } catch (err) {
//       showPopup('error', err.message || 'Failed to resend OTP');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="relative min-h-screen overflow-x-hidden" style={{ background: "transparent" }}>
//       {/* Background */}
//       <div
//         className="fixed inset-0 z-0 pointer-events-none"
//         style={{
//           backgroundImage: `url(${bgImage})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//           opacity: 0.35,
//         }}
//       />
//       <div className="fixed inset-0 z-0 bg-black/50 pointer-events-none" />

//       <div className="relative z-10 max-w-[430px] mx-auto min-h-screen flex flex-col justify-center px-6 pb-28">

//         <div style={{ textAlign: 'center', marginBottom: 40 }}>
//           <div style={{ width: 56, height: 56, marginBottom: 12, margin: '0 auto' }}>
//             <img src={logo} alt="Logo" />
//           </div>
//           <div style={{ ...GRADIENT_TEXT, fontSize: 32, fontWeight: 800 }}>Login</div>
//         </div>

//         <AnimatePresence mode="wait">
//           {step === 'login' ? (
//             <motion.div key="login" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
//               {/* Email */}
//               <div style={{ marginBottom: 20 }}>
//                 <div style={{ fontSize: 12, fontWeight: 700, color: '#e8b84b', marginBottom: 8 }}>EMAIL / USERNAME</div>
//                 <div style={{ padding: "1px", borderRadius: 16, background: GRADIENT_BORDER }}>
//                   <input
//                     type="text"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="your@email.com"
//                     style={{
//                       background: CARD_BG,
//                       borderRadius: 14,
//                       width: '100%',
//                       padding: '16px 20px',
//                       fontSize: 16,
//                       color: '#f3e6c9',
//                     }}
//                   />
//                 </div>
//               </div>

//               {/* Password */}
//               <div style={{ marginBottom: 12 }}>
//                 <div style={{ fontSize: 12, fontWeight: 700, color: '#e8b84b', marginBottom: 8 }}>PASSWORD</div>
//                 <div style={{ padding: "1px", borderRadius: 16, background: GRADIENT_BORDER }}>
//                   <div style={{ position: 'relative' }}>
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       placeholder="••••••••"
//                       style={{
//                         background: CARD_BG,
//                         borderRadius: 14,
//                         width: '100%',
//                         padding: '16px 20px',
//                         fontSize: 16,
//                         color: '#f3e6c9',
//                       }}
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)' }}
//                     >
//                       {showPassword ? <EyeOff size={20} color="#e8b84b" /> : <Eye size={20} color="#e8b84b" />}
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* Remember Me + Forgot Password */}
//               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
//                 <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
//                   <input
//                     type="checkbox"
//                     checked={rememberMe}
//                     onChange={() => setRememberMe(!rememberMe)}
//                     style={{ accentColor: '#e8b84b' }}
//                   />
//                   <span style={{ fontSize: 13, color: '#c9b38a' }}>Remember me</span>
//                 </label>

//                 <button
//                   type="button"
//                   onClick={() => navigate("/reset")}
//                   style={{
//                     fontSize: 13,
//                     color: "#e8b84b",
//                     fontWeight: 600,
//                     background: "transparent",
//                     border: "none",
//                     cursor: "pointer",
//                   }}
//                 >
//                   Forgot Password?
//                 </button>
//               </div>

//               {/* Login Button */}
//               <motion.button
//                 whileTap={{ scale: 0.97 }}
//                 onClick={handleLogin}
//                 disabled={loading}
//                 style={{
//                   width: '100%',
//                   padding: '18px',
//                   background: GRADIENT_BORDER,
//                   color: '#0a0704',
//                   fontSize: 16,
//                   fontWeight: 700,
//                   border: 'none',
//                   borderRadius: 16,
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   gap: 8,
//                   opacity: loading ? 0.85 : 1,
//                 }}
//               >
//                 {loading ? 'Logging in...' : 'Login'} <ArrowRight size={18} />
//               </motion.button>

//               {/* Sign Up Link */}
//               <div style={{ textAlign: 'center', marginTop: 24 }}>
//                 <span style={{ color: '#e8b84b', fontSize: 14 }}>Want to create an account? </span>
//                 <button
//                   onClick={() => navigate("/signup")}
//                   style={{
//                     color: "#e8b84b",
//                     fontWeight: 700,
//                     fontSize: 14,
//                   }}
//                 >
//                   Sign Up
//                 </button>
//               </div>
//             </motion.div>
//           ) : (
//             /* OTP Step */
//             <motion.div key="otp" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
//               <div style={{ textAlign: 'center', marginBottom: 32 }}>
//                 <div style={{ fontSize: 48, marginBottom: 12 }}>📧</div>
//                 <div style={{ fontSize: 18, fontWeight: 700 }}>Enter OTP</div>
//                 <div style={{ color: '#e8b84b', marginTop: 6 }}>We sent a 6-digit code to</div>
//                 <div style={{ color: '#e8b84b', fontWeight: 600 }}>{email}</div>
//               </div>

//               <div style={{ padding: "1px", borderRadius: 18, background: GRADIENT_BORDER, marginBottom: 20 }}>
//                 <input
//                   type="text"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
//                   placeholder="123456"
//                   maxLength={6}
//                   style={{
//                     background: CARD_BG,
//                     borderRadius: 16,
//                     width: '100%',
//                     padding: '20px',
//                     fontSize: 28,
//                     fontWeight: 700,
//                     textAlign: 'center',
//                     letterSpacing: '12px',
//                   }}
//                 />
//               </div>

//               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
//                 <div style={{ fontSize: 13, color: '#e8b84b' }}>
//                   Time left: <span style={{ color: otpTimer <= 10 ? '#ef4444' : '#e8b84b' }}>{otpTimer}s</span>
//                 </div>
//                 {canResend && (
//                   <button 
//                     onClick={handleResendOtp}
//                     disabled={loading}
//                     style={{ color: '#e8b84b', fontWeight: 700 }}
//                   >
//                     Resend OTP
//                   </button>
//                 )}
//               </div>

//               <motion.button
//                 whileTap={{ scale: 0.97 }}
//                 onClick={handleVerifyOtp}
//                 disabled={loading}
//                 style={{
//                   width: '100%',
//                   padding: '18px',
//                   background: GRADIENT_BORDER,
//                   color: '#0a0704',
//                   fontSize: 16,
//                   fontWeight: 700,
//                   border: 'none',
//                   borderRadius: 16,
//                 }}
//               >
//                 {loading ? 'Verifying...' : 'Verify OTP & Login'}
//               </motion.button>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Popup Message */}
//         <AnimatePresence>
//           {popup.show && (
//             <motion.div
//               initial={{ opacity: 0, x: 50 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: 50 }}
//               style={{
//                 position: 'fixed',
//                 bottom: 80,
//                 left: '50%',
//                 transform: 'translateX(-50%)',
//                 background: popup.type === 'error' ? '#450a0a' : '#0f1a10',
//                 border: `1px solid ${popup.type === 'error' ? '#ef4444' : '#5fd66a'}`,
//                 borderRadius: 16,
//                 padding: '14px 24px',
//                 color: popup.type === 'error' ? '#fda4af' : '#5fd66a',
//                 fontWeight: 600,
//                 zIndex: 10000,
//                 boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: 10,
//                 maxWidth: '90%',
//               }}
//             >
//               {popup.type === 'success' ? '✅' : '⚠️'} {popup.message}
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <div style={{ height: 100 }} />
//       </div>
//     </div>
//   );
// }


// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Eye, EyeOff, ArrowRight, X } from 'lucide-react';
// import bgImage from "../../assets/page-bg.png";
// import logo from "../../assets/coin.png";
// import { useNavigate } from "react-router-dom";

// const GRADIENT_BORDER = "linear-gradient(135deg,#FFF2A6 0%,#FFD96A 12%,#FFC83D 28%,#F5B300 45%,#D88A00 68%,#8A5200 100%)";
// const CARD_BG = "#0A090A";

// const GRADIENT_TEXT = {
//   background: GRADIENT_BORDER,
//   WebkitBackgroundClip: "text",
//   WebkitTextFillColor: "transparent",
//   backgroundClip: "text",
//   color: "transparent",
// };

// export default function Login({ onSwitchToSignup }) {
//   const [step, setStep] = useState('login'); // 'login' | 'otp'
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [otp, setOtp] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [otpTimer, setOtpTimer] = useState(60);
//   const [canResend, setCanResend] = useState(false);
//   const navigate = useNavigate();

//   // Popup State
//   const [popup, setPopup] = useState({ show: false, type: '', message: '' });

//   const showPopup = (type, message) => {
//     setPopup({ show: true, type, message });
//     setTimeout(() => setPopup({ show: false, type: '', message: '' }), 2800);
//   };

//   // OTP Timer
//   useEffect(() => {
//     let interval;
//     if (step === 'otp' && otpTimer > 0) {
//       interval = setInterval(() => setOtpTimer(prev => prev - 1), 1000);
//     } else if (otpTimer === 0) {
//       setCanResend(true);
//     }
//     return () => clearInterval(interval);
//   }, [step, otpTimer]);

//   const handleLogin = () => {
//     if (!email || !password) {
//       showPopup('error', 'Please enter email and password');
//       return;
//     }
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//       setStep('otp');
//       setOtpTimer(60);
//       setCanResend(false);
//       setOtp('');
//       showPopup('success', 'OTP sent to your email');
//     }, 1200);
//   };

//   const handleVerifyOtp = () => {
//     if (otp.length !== 6) {
//       showPopup('error', 'Please enter valid 6-digit OTP');
//       return;
//     }
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//       showPopup('success', 'Login Successful! Welcome back 🎉');
//       setTimeout(() => {
//         window.location.href = '/dashboard'; // Redirect to dashboard after a short delay
//       }, 1500);
//     }, 1000);
//   };

//   const handleResendOtp = () => {
//     setOtpTimer(60);
//     setCanResend(false);
//     showPopup('success', 'New OTP sent successfully');
//   };

//   return (
//     <div className="relative min-h-screen overflow-x-hidden" style={{ background: "transparent" }}>
//       {/* Background */}
//       <div
//         className="fixed inset-0 z-0 pointer-events-none"
//         style={{
//           backgroundImage: `url(${bgImage})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//           opacity: 0.35,
//         }}
//       />
//       <div className="fixed inset-0 z-0 bg-black/50 pointer-events-none" />

//       <div className="relative z-10 max-w-[430px] mx-auto min-h-screen flex flex-col justify-center px-6 pb-28">

//         <div style={{ textAlign: 'center', marginBottom: 40 }}>
//           <div style={{ width: 56, height: 56, marginBottom: 12, margin: '0 auto' }}>
//             <img src={logo} alt="Logo" />
//           </div>
//           <div style={{ ...GRADIENT_TEXT, fontSize: 32, fontWeight: 800 }}>Login</div>
//           {/* <div style={{ color: '#e8b84b', fontSize: 14 }}>Crypto Mining Game</div> */}
//         </div>

//         <AnimatePresence mode="wait">
//           {step === 'login' ? (
//             <motion.div key="login" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
//               {/* Email */}
//               <div style={{ marginBottom: 20 }}>
//                 <div style={{ fontSize: 12, fontWeight: 700, color: '#e8b84b', marginBottom: 8 }}>EMAIL / USERNAME</div>
//                 <div style={{ padding: "1px", borderRadius: 16, background: GRADIENT_BORDER }}>
//                   <input
//                     type="text"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="your@email.com"
//                     style={{
//                       background: CARD_BG,
//                       borderRadius: 14,
//                       width: '100%',
//                       padding: '16px 20px',
//                       fontSize: 16,
//                       color: '#f3e6c9',
//                     }}
//                   />
//                 </div>
//               </div>

//               {/* Password */}
//               <div style={{ marginBottom: 12 }}>
//                 <div style={{ fontSize: 12, fontWeight: 700, color: '#e8b84b', marginBottom: 8 }}>PASSWORD</div>
//                 <div style={{ padding: "1px", borderRadius: 16, background: GRADIENT_BORDER }}>
//                   <div style={{ position: 'relative' }}>
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       placeholder="••••••••"
//                       style={{
//                         background: CARD_BG,
//                         borderRadius: 14,
//                         width: '100%',
//                         padding: '16px 20px',
//                         fontSize: 16,
//                         color: '#f3e6c9',
//                       }}
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)' }}
//                     >
//                       {showPassword ? <EyeOff size={20} color="#e8b84b" /> : <Eye size={20} color="#e8b84b" />}
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* Remember Me + Forgot Password */}
//               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
//                 <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
//                   <input
//                     type="checkbox"
//                     checked={rememberMe}
//                     onChange={() => setRememberMe(!rememberMe)}
//                     style={{ accentColor: '#e8b84b' }}
//                   />
//                   <span style={{ fontSize: 13, color: '#c9b38a' }}>Remember me</span>
//                 </label>

//                 <button
//   type="button"
//   onClick={() => navigate("/reset")}
//   style={{
//     fontSize: 13,
//     color: "#e8b84b",
//     fontWeight: 600,
//     background: "transparent",
//     border: "none",
//     cursor: "pointer",
//   }}
// >
//   Forgot Password?
// </button>
//               </div>

//               {/* Login Button */}
//               <motion.button
//                 whileTap={{ scale: 0.97 }}
//                 onClick={handleLogin}
//                 style={{
//                   width: '100%',
//                   padding: '18px',
//                   background: GRADIENT_BORDER,
//                   color: '#0a0704',
//                   fontSize: 16,
//                   fontWeight: 700,
//                   border: 'none',
//                   borderRadius: 16,
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   gap: 8,
//                 }}
//               >
//                 {loading ? 'Logging in...' : 'Login'} <ArrowRight size={18} />
//               </motion.button>

//               {/* Sign Up Link */}
//               <div style={{ textAlign: 'center', marginTop: 24 }}>
//                 <span style={{ color: '#e8b84b', fontSize: 14 }}>Want to create an account? </span>
//                 {/* <button onClick={onSwitchToSignup} style={{ color: '#e8b84b', fontWeight: 700, fontSize: 14 }}>
//                   Sign Up
//                 </button> */}
//                 <button
//   onClick={() => navigate("/signup")}
//   style={{
//     color: "#e8b84b",
//     fontWeight: 700,
//     fontSize: 14,
//   }}
// >
//   Sign Up
// </button>
//               </div>
//             </motion.div>
//           ) : (
//             /* OTP Step */
//             <motion.div key="otp" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
//               <div style={{ textAlign: 'center', marginBottom: 32 }}>
//                 <div style={{ fontSize: 48, marginBottom: 12 }}>📧</div>
//                 <div style={{ fontSize: 18, fontWeight: 700 }}>Enter OTP</div>
//                 <div style={{ color: '#e8b84b', marginTop: 6 }}>We sent a 6-digit code to</div>
//                 <div style={{ color: '#e8b84b', fontWeight: 600 }}>{email}</div>
//               </div>

//               <div style={{ padding: "1px", borderRadius: 18, background: GRADIENT_BORDER, marginBottom: 20 }}>
//                 <input
//                   type="text"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
//                   placeholder="123456"
//                   maxLength={6}
//                   style={{
//                     background: CARD_BG,
//                     borderRadius: 16,
//                     width: '100%',
//                     padding: '20px',
//                     fontSize: 28,
//                     fontWeight: 700,
//                     textAlign: 'center',
//                     letterSpacing: '12px',
//                   }}
//                 />
//               </div>

//               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
//                 <div style={{ fontSize: 13, color: '#e8b84b' }}>
//                   Time left: <span style={{ color: otpTimer <= 10 ? '#ef4444' : '#e8b84b' }}>{otpTimer}s</span>
//                 </div>
//                 {canResend && (
//                   <button onClick={handleResendOtp} style={{ color: '#e8b84b', fontWeight: 700 }}>
//                     Resend OTP
//                   </button>
//                 )}
//               </div>

//               <motion.button
//                 whileTap={{ scale: 0.97 }}
//                 onClick={handleVerifyOtp}
//                 style={{
//                   width: '100%',
//                   padding: '18px',
//                   background: GRADIENT_BORDER,
//                   color: '#0a0704',
//                   fontSize: 16,
//                   fontWeight: 700,
//                   border: 'none',
//                   borderRadius: 16,
//                 }}
//               >
//                 Verify OTP & Login
//               </motion.button>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Popup Message */}
//         <AnimatePresence>
//           {popup.show && (
//             <motion.div
//               initial={{ opacity: 0, x: 50 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: 50 }}
//               style={{
//                 position: 'fixed',
//                 bottom: 80,
//                 left: '50%',
//                 transform: 'translateX(-50%)',
//                 background: popup.type === 'error' ? '#450a0a' : '#0f1a10',
//                 border: `1px solid ${popup.type === 'error' ? '#ef4444' : '#5fd66a'}`,
//                 borderRadius: 16,
//                 padding: '14px 24px',
//                 color: popup.type === 'error' ? '#fda4af' : '#5fd66a',
//                 fontWeight: 600,
//                 zIndex: 10000,
//                 boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: 10,
//                 maxWidth: '90%',
//               }}
//             >
//               {popup.type === 'success' ? '✅' : '⚠️'} {popup.message}
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Bottom Spacer */}
//         <div style={{ height: 100 }} />

//       </div>
//     </div>
//   );
// }
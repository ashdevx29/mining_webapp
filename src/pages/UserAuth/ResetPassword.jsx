import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, ArrowRight, ArrowLeft } from 'lucide-react';
import bgImage from "../../assets/page-bg.png";
import logo from "../../assets/coin.png";
import { useNavigate } from "react-router-dom";

const GRADIENT_BORDER = "linear-gradient(135deg,#FFF2A6 0%,#FFD96A 12%,#FFC83D 28%,#F5B300 45%,#D88A00 68%,#8A5200 100%)";
const CARD_BG = "#0A090A";

const GRADIENT_TEXT = {
  background: GRADIENT_BORDER,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  color: "transparent",
};

export default function ResetPassword() {
  const [step, setStep] = useState('email'); // 'email' | 'otp' | 'reset'
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpTimer, setOtpTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [popup, setPopup] = useState({ show: false, type: '', message: '' });

  const navigate = useNavigate();

  const showPopup = (type, message) => {
    setPopup({ show: true, type, message });
    setTimeout(() => setPopup({ show: false, type: '', message: '' }), 3000);
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

  // Handle Send OTP
  const handleSendOtp = () => {
    if (!email) {
      showPopup('error', 'Please enter your email');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
      setOtpTimer(60);
      setCanResend(false);
      setOtp('');
      showPopup('success', 'OTP sent to your email');
    }, 1200);
  };

  // Handle Verify OTP
  const handleVerifyOtp = () => {
    if (otp.length !== 6) {
      showPopup('error', 'Please enter valid 6-digit OTP');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('reset');
      showPopup('success', 'OTP verified successfully');
    }, 1000);
  };

  // Handle Reset Password
  const handleResetPassword = () => {
    if (!newPassword || !confirmPassword) {
      showPopup('error', 'Please fill all fields');
      return;
    }
    if (newPassword.length < 6) {
      showPopup('error', 'Password must be at least 6 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      showPopup('error', 'Passwords do not match');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showPopup('success', 'Password changed successfully! 🎉');
      
      setTimeout(() => {
        navigate('/'); // Redirect to Login Page
      }, 1800);
    }, 1500);
  };

  const handleResendOtp = () => {
    setOtpTimer(60);
    setCanResend(false);
    showPopup('success', 'New OTP sent successfully');
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: "transparent" }}>
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none"
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
          <div style={{ ...GRADIENT_TEXT, fontSize: 32, fontWeight: 800 }}>
            Reset Password
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Email */}
          {step === 'email' && (
            <motion.div key="email" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#8a7550', marginBottom: 8 }}>EMAIL ADDRESS</div>
                <div style={{ padding: "1px", borderRadius: 16, background: GRADIENT_BORDER }}>
                  <input
                    type="email"
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

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleSendOtp}
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
                }}
              >
                {loading ? 'Sending OTP...' : 'Send OTP'} <ArrowRight size={18} />
              </motion.button>

              <div style={{ textAlign: 'center', marginTop: 24 }}>
                <button
                  onClick={() => navigate('/')}
                  style={{ color: '#8a7550', fontSize: 14, background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  ← Back to Login
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: OTP */}
          {step === 'otp' && (
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
                  <button onClick={handleResendOtp} style={{ color: '#e8b84b', fontWeight: 700 }}>
                    Resend OTP
                  </button>
                )}
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleVerifyOtp}
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
                Verify OTP
              </motion.button>
            </motion.div>
          )}

          {/* Step 3: New Password */}
          {step === 'reset' && (
            <motion.div key="reset" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#8a7550', marginBottom: 8 }}>NEW PASSWORD</div>
                <div style={{ padding: "1px", borderRadius: 16, background: GRADIENT_BORDER }}>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
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
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)' }}
                    >
                      {showNewPassword ? <EyeOff size={20} color="#8a7550" /> : <Eye size={20} color="#8a7550" />}
                    </button>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: 32 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#8a7550', marginBottom: 8 }}>CONFIRM PASSWORD</div>
                <div style={{ padding: "1px", borderRadius: 16, background: GRADIENT_BORDER }}>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
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
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)' }}
                    >
                      {showConfirmPassword ? <EyeOff size={20} color="#8a7550" /> : <Eye size={20} color="#8a7550" />}
                    </button>
                  </div>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleResetPassword}
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
                }}
              >
                {loading ? 'Updating Password...' : 'Change Password'} <ArrowRight size={18} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Popup */}
        <AnimatePresence>
          {popup.show && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              style={{
                position: 'fixed',
                top: 80,
                right: 20,
                background: popup.type === 'error' ? '#450a0a' : '#0f1a10',
                border: `1px solid ${popup.type === 'error' ? '#ef4444' : '#5fd66a'}`,
                borderRadius: 14,
                padding: '14px 20px',
                color: popup.type === 'error' ? '#fda4af' : '#5fd66a',
                fontWeight: 600,
                zIndex: 10000,
                boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
                maxWidth: '280px',
              }}
            >
              {popup.type === 'success' ? '✅' : '⚠️'} {popup.message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
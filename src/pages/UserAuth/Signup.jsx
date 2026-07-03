import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import bgImage from "../../assets/page-bg.png";
import logo from "../../assets/coin.png";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";   // ← API service

const GRADIENT_BORDER = "linear-gradient(135deg,#FFF2A6 0%,#FFD96A 12%,#FFC83D 28%,#F5B300 45%,#D88A00 68%,#8A5200 100%)";
const CARD_BG = "#0A090A";

const GRADIENT_TEXT = {
  background: GRADIENT_BORDER,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  color: "transparent",
};

export default function SignUp({ onSwitchToLogin }) {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ show: false, type: '', message: '' });
  const navigate = useNavigate();

  const showPopup = (type, message) => {
    setPopup({ show: true, type, message });
    setTimeout(() => setPopup({ show: false, type: '', message: '' }), 3000);
  };

  // ==================== API CALL ====================
  const handleSignUp = async () => {
    const { fullName, email, phone, password, confirmPassword } = form;

    if (!fullName || !email || !phone || !password || !confirmPassword) {
      showPopup('error', 'Please fill all fields');
      return;
    }
    if (password !== confirmPassword) {
      showPopup('error', 'Passwords do not match');
      return;
    }
    if (password.length < 6) {
      showPopup('error', 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await API.post('/signup', {
        fullName,
        email,
        phone,
        password
      });

      showPopup('success', `Account created! Login details sent to ${email}`);
      
      // Redirect to Login after success
      setTimeout(() => {
        navigate('/'); // ya onSwitchToLogin() use kar sakte ho
      }, 1800);
    } catch (err) {
      showPopup('error', err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  // Common Input Style
  const inputStyle = {
    background: CARD_BG,
    borderRadius: 14,
    width: '100%',
    padding: '16px 20px',
    fontSize: 16,
    color: '#f3e6c9',
    border: 'none',
    outline: 'none',
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
          <div style={{ ...GRADIENT_TEXT, fontSize: 32, fontWeight: 800 }}>Sign Up</div>
        </div>

        {/* Full Name */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#8a7550', marginBottom: 8 }}>FULL NAME</div>
          <div style={{ padding: "1px", borderRadius: 16, background: GRADIENT_BORDER }}>
            <input
              type="text"
              value={form.fullName}
              onChange={(e) => setForm(prev => ({ ...prev, fullName: e.target.value }))}
              placeholder="John Doe"
              style={inputStyle}
            />
          </div>
        </div>

        {/* Email */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#8a7550', marginBottom: 8 }}>EMAIL ADDRESS</div>
          <div style={{ padding: "1px", borderRadius: 16, background: GRADIENT_BORDER }}>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
              placeholder="your@email.com"
              style={inputStyle}
            />
          </div>
        </div>

        {/* Phone */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#8a7550', marginBottom: 8 }}>PHONE NUMBER</div>
          <div style={{ padding: "1px", borderRadius: 16, background: GRADIENT_BORDER }}>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="+91 98765 43210"
              style={inputStyle}
            />
          </div>
        </div>

        {/* Password */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#8a7550', marginBottom: 8 }}>PASSWORD</div>
          <div style={{ padding: "1px", borderRadius: 16, background: GRADIENT_BORDER }}>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => setForm(prev => ({ ...prev, password: e.target.value }))}
                placeholder="••••••••"
                style={inputStyle}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)' }}
              >
                {showPassword ? <EyeOff size={20} color="#8a7550" /> : <Eye size={20} color="#8a7550" />}
              </button>
            </div>
          </div>
        </div>

        {/* Confirm Password */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#8a7550', marginBottom: 8 }}>CONFIRM PASSWORD</div>
          <div style={{ padding: "1px", borderRadius: 16, background: GRADIENT_BORDER }}>
            <div style={{ position: 'relative' }}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={form.confirmPassword}
                onChange={(e) => setForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                placeholder="••••••••"
                style={inputStyle}
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
          onClick={handleSignUp}
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
          }}
        >
          {loading ? 'Creating Account...' : 'Create Account'} <ArrowRight size={18} />
        </motion.button>

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <span style={{ color: '#8a7550', fontSize: 14 }}>Already have an account? </span>
          <button
            type="button"
            onClick={() => navigate("/")}
            style={{
              color: "#e8b84b",
              fontWeight: 700,
              fontSize: 14,
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </div>

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

        <div style={{ height: 100 }} />
      </div>

      {/* === AUTOFILL FIX === */}
      <style jsx global>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 30px ${CARD_BG} inset !important;
          -webkit-text-fill-color: #f3e6c9 !important;
          background: ${CARD_BG} !important;
          transition: background-color 5000s ease-in-out 0s !important;
        }
      `}</style>
    </div>
  );
}











// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Eye, EyeOff, ArrowRight } from 'lucide-react';
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

// export default function SignUp({ onSwitchToLogin }) {
//   const [form, setForm] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     password: '',
//     confirmPassword: '',
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [popup, setPopup] = useState({ show: false, type: '', message: '' });
//   const navigate = useNavigate();

//   const showPopup = (type, message) => {
//     setPopup({ show: true, type, message });
//     setTimeout(() => setPopup({ show: false, type: '', message: '' }), 3000);
//   };

//   const handleSignUp = () => {
//     const { fullName, email, phone, password, confirmPassword } = form;

//     if (!fullName || !email || !phone || !password || !confirmPassword) {
//       showPopup('error', 'Please fill all fields');
//       return;
//     }
//     if (password !== confirmPassword) {
//       showPopup('error', 'Passwords do not match');
//       return;
//     }
//     if (password.length < 6) {
//       showPopup('error', 'Password must be at least 6 characters');
//       return;
//     }

//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//       showPopup('success', `Account created! Login details sent to ${email}`);
//       setTimeout(() => {
//         onSwitchToLogin();
//       }, 1800);
//     }, 1500);
//   };

//   // Common Input Style
//   const inputStyle = {
//     background: CARD_BG,
//     borderRadius: 14,
//     width: '100%',
//     padding: '16px 20px',
//     fontSize: 16,
//     color: '#f3e6c9',
//     border: 'none',
//     outline: 'none',
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
//           <div style={{ ...GRADIENT_TEXT, fontSize: 32, fontWeight: 800 }}>Sign Up</div>
//         </div>

//         {/* Full Name */}
//         <div style={{ marginBottom: 24 }}>
//           <div style={{ fontSize: 12, fontWeight: 700, color: '#8a7550', marginBottom: 8 }}>FULL NAME</div>
//           <div style={{ padding: "1px", borderRadius: 16, background: GRADIENT_BORDER }}>
//             <input
//               type="text"
//               value={form.fullName}
//               onChange={(e) => setForm(prev => ({ ...prev, fullName: e.target.value }))}
//               placeholder="John Doe"
//               style={inputStyle}
//             />
//           </div>
//         </div>

//         {/* Email */}
//         <div style={{ marginBottom: 24 }}>
//           <div style={{ fontSize: 12, fontWeight: 700, color: '#8a7550', marginBottom: 8 }}>EMAIL ADDRESS</div>
//           <div style={{ padding: "1px", borderRadius: 16, background: GRADIENT_BORDER }}>
//             <input
//               type="email"
//               value={form.email}
//               onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
//               placeholder="your@email.com"
//               style={inputStyle}
//             />
//           </div>
//         </div>

//         {/* Phone */}
//         <div style={{ marginBottom: 24 }}>
//           <div style={{ fontSize: 12, fontWeight: 700, color: '#8a7550', marginBottom: 8 }}>PHONE NUMBER</div>
//           <div style={{ padding: "1px", borderRadius: 16, background: GRADIENT_BORDER }}>
//             <input
//               type="tel"
//               value={form.phone}
//               onChange={(e) => setForm(prev => ({ ...prev, phone: e.target.value }))}
//               placeholder="+91 98765 43210"
//               style={inputStyle}
//             />
//           </div>
//         </div>

//         {/* Password */}
//         <div style={{ marginBottom: 20 }}>
//           <div style={{ fontSize: 12, fontWeight: 700, color: '#8a7550', marginBottom: 8 }}>PASSWORD</div>
//           <div style={{ padding: "1px", borderRadius: 16, background: GRADIENT_BORDER }}>
//             <div style={{ position: 'relative' }}>
//               <input
//                 type={showPassword ? "text" : "password"}
//                 value={form.password}
//                 onChange={(e) => setForm(prev => ({ ...prev, password: e.target.value }))}
//                 placeholder="••••••••"
//                 style={inputStyle}
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)' }}
//               >
//                 {showPassword ? <EyeOff size={20} color="#8a7550" /> : <Eye size={20} color="#8a7550" />}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Confirm Password */}
//         <div style={{ marginBottom: 32 }}>
//           <div style={{ fontSize: 12, fontWeight: 700, color: '#8a7550', marginBottom: 8 }}>CONFIRM PASSWORD</div>
//           <div style={{ padding: "1px", borderRadius: 16, background: GRADIENT_BORDER }}>
//             <div style={{ position: 'relative' }}>
//               <input
//                 type={showConfirmPassword ? "text" : "password"}
//                 value={form.confirmPassword}
//                 onChange={(e) => setForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
//                 placeholder="••••••••"
//                 style={inputStyle}
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)' }}
//               >
//                 {showConfirmPassword ? <EyeOff size={20} color="#8a7550" /> : <Eye size={20} color="#8a7550" />}
//               </button>
//             </div>
//           </div>
//         </div>

//         <motion.button
//           whileTap={{ scale: 0.97 }}
//           onClick={handleSignUp}
//           style={{
//             width: '100%',
//             padding: '18px',
//             background: GRADIENT_BORDER,
//             color: '#0a0704',
//             fontSize: 16,
//             fontWeight: 700,
//             border: 'none',
//             borderRadius: 16,
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             gap: 8,
//           }}
//         >
//           {loading ? 'Creating Account...' : 'Create Account'} <ArrowRight size={18} />
//         </motion.button>

//         <div style={{ textAlign: 'center', marginTop: 24 }}>
//           <span style={{ color: '#8a7550', fontSize: 14 }}>Already have an account? </span>
//          <button
//   type="button"
//   onClick={() => navigate("/")}
//   style={{
//     color: "#e8b84b",
//     fontWeight: 700,
//     fontSize: 14,
//     background: "transparent",
//     border: "none",
//     cursor: "pointer",
//   }}
// >
//   Login
// </button>
//         </div>

//         {/* Popup */}
//         <AnimatePresence>
//           {popup.show && (
//             <motion.div
//               initial={{ opacity: 0, x: 50 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: 50 }}
//               style={{
//                 position: 'fixed',
//                 top: 80,
//                 right: 20,
//                 background: popup.type === 'error' ? '#450a0a' : '#0f1a10',
//                 border: `1px solid ${popup.type === 'error' ? '#ef4444' : '#5fd66a'}`,
//                 borderRadius: 14,
//                 padding: '14px 20px',
//                 color: popup.type === 'error' ? '#fda4af' : '#5fd66a',
//                 fontWeight: 600,
//                 zIndex: 10000,
//                 boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
//                 maxWidth: '280px',
//               }}
//             >
//               {popup.type === 'success' ? '✅' : '⚠️'} {popup.message}
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <div style={{ height: 100 }} />
//       </div>

//       {/* === AUTOFILL FIX === */}
//       <style jsx global>{`
//         input:-webkit-autofill,
//         input:-webkit-autofill:hover,
//         input:-webkit-autofill:focus,
//         input:-webkit-autofill:active {
//           -webkit-box-shadow: 0 0 0 30px ${CARD_BG} inset !important;
//           -webkit-text-fill-color: #f3e6c9 !important;
//           background: ${CARD_BG} !important;
//           transition: background-color 5000s ease-in-out 0s !important;
//         }
//       `}</style>
//     </div>
//   );
// }







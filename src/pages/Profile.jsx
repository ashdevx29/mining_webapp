import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { formatNumber } from '../utils/helpers';
import { Copy, Check, Settings, Star, LogOut, Loader, X } from 'lucide-react';
import { copyToClipboard } from '../utils/helpers';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import bgImage from "../assets/page-bg.png";

const GRADIENT_BORDER = "linear-gradient(135deg,#FFF2A6 0%,#FFD96A 12%,#FFC83D 28%,#F5B300 45%,#D88A00 68%,#8A5200 100%)";
const CARD_BG = "#0A090A";

const GRADIENT_TEXT = {
  background: GRADIENT_BORDER,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  color: "transparent",
};

export default function Profile() {
  const { user, setUser } = useApp();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Fetch latest user data
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user || !user._id) {
        try {
          const res = await API.get('/auth/me');
          if (res.data.success && res.data.user) {
            setUser(res.data.user);
          }
        } catch (err) {
          console.error("Failed to fetch user profile:", err);
        }
      }
      setPageLoading(false);
    };

    fetchUserProfile();
  }, [user, setUser]);

  const safeUser = {
    fullName: user?.fullName || 'User',
    username: user?.username || user?.email?.split('@')[0] || 'user',
    referralCode: user?.referralCode || 'No Code',
    totalMined: user?.totalMined || 0,
    balance: user?.balance || 0,
    referrals: user?.totalReferrals || 0,
    achievements: user?.achievements || [],
    dailyStreak: user?.dailyStreak || 0,
    level: user?.level || 1,
    levelName: user?.levelName || 'Beginner',
    rank: user?.rank || '---',
    joinedAt: user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A',
  };

  const handleCopy = async () => {
    await copyToClipboard(safeUser.referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLogoutConfirm = async () => {
    setLoading(true);
    try {
      await API.post('/auth/logout');
    } catch (err) {
      console.log("Logout API failed");
    } finally {
      localStorage.removeItem('token');
      setUser(null);
      navigate('/');
    }
  };

  const STATS = [
    { label: 'Total Mined', value: formatNumber(safeUser.totalMined), icon: '⛏️' },
    { label: 'Balance', value: formatNumber(safeUser.balance), icon: '💰' },
    { label: 'Referrals', value: safeUser.referrals, icon: '👥' },
    { label: 'Achievements', value: safeUser.achievements.length, icon: '🏅' },
    { label: 'Streak', value: `${safeUser.dailyStreak}d`, icon: '🔥' },
    { label: 'Rank', value: `#${safeUser.rank}`, icon: '🏆' },
  ];

  if (pageLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', color: '#e8b84b' }}>
        <Loader size={32} className="animate-spin mx-auto mb-4" />
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: "transparent" }}>
      <div className="fixed inset-0 z-0 pointer-events-none" 
           style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover", opacity: 0.35 }} />
      <div className="fixed inset-0 z-0 bg-black/45 pointer-events-none" />

      <div className="relative z-10 max-w-[430px] mx-auto min-h-screen pb-28">

        {/* Header */}
        <div style={{ padding: '20px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ ...GRADIENT_TEXT, fontSize: 24, fontWeight: 700 }}>👤 Profile</div>
          <button 
            onClick={() => navigate('/settings')} 
            style={{ background: CARD_BG, border: '1px solid #e8b84b', width: 42, height: 42, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Settings size={18} color="#e8b84b" />
          </button>
        </div>

        {/* Avatar & Info */}
        <div style={{ padding: '24px 20px 20px', textAlign: 'center' }}>
          <motion.div
            animate={{ boxShadow: ['0 0 20px rgba(245,158,11,0.4)', '0 0 40px rgba(245,158,11,0.6)', '0 0 20px rgba(245,158,11,0.4)'] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ width: 100, height: 100, borderRadius: '50%', margin: '0 auto', background: GRADIENT_BORDER, padding: '5px' }}
          >
            <div style={{
              width: '100%', height: '100%', borderRadius: '50%', background: CARD_BG,
              display: 'flex', alignItems: 'center', justifyContent: 'center', 
              fontSize: 42, fontWeight: 900, color: '#f3e6c9'
            }}>
              {safeUser.fullName[0] || '?'}
            </div>
          </motion.div>

          <div style={{ fontSize: 22, fontWeight: 700, color: '#f3e6c9', marginTop: 16 }}>
            {safeUser.fullName}
          </div>
          <div style={{ fontSize: 14, color: '#e8b84b' }}>@{safeUser.username}</div>

          <div style={{ marginTop: 12, display: 'inline-flex', alignItems: 'center', gap: 8, background: CARD_BG, border: '1px solid #e8b84b', borderRadius: 999, padding: '6px 18px' }}>
            <Star size={18} color="#e8b84b" />
            <span style={{ fontWeight: 700, color: '#e8b84b' }}>Level {safeUser.level} • {safeUser.levelName}</span>
          </div>

          {/* Referral Code */}
          <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
            <div style={{ padding: '10px 20px', background: CARD_BG, border: '1px solid #e8b84b', borderRadius: 999, fontWeight: 700, letterSpacing: 1 }}>
              {safeUser.referralCode}
            </div>
            <motion.button whileTap={{ scale: 0.9 }} onClick={handleCopy} style={{ padding: '10px', background: CARD_BG, border: '1px solid #e8b84b', borderRadius: 12 }}>
              {copied ? <Check size={20} color="#e8b84b" /> : <Copy size={20} color="#e8b84b" />}
            </motion.button>
          </div>
        </div>

        {/* Stats */}
        <div style={{ padding: '0 20px 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {STATS.map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                style={{ padding: "1px", borderRadius: 18, background: GRADIENT_BORDER }}>
                <div style={{ background: CARD_BG, borderRadius: 16, padding: '14px 8px', textAlign: 'center' }}>
                  <div style={{ fontSize: 26 }}>{stat.icon}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: '#f4d99a', marginTop: 6 }}>{stat.value}</div>
                  <div style={{ fontSize: 10, color: '#e8b84b', marginTop: 4 }}>{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Logout Button */}
        <div style={{ padding: '0 20px 40px' }}>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowLogoutModal(true)}
            style={{
              width: '100%', padding: '16px', background: '#450a0a', color: '#ef4444',
              border: '1px solid #ef4444', borderRadius: 16, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10
            }}
          >
            <LogOut size={20} />
            Logout
          </motion.button>
        </div>

        <div style={{ height: 100 }} />
      </div>

      {/* Beautiful Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              style={{
                background: CARD_BG,
                borderRadius: 20,
                padding: '28px 24px',
                width: '90%',
                maxWidth: '340px',
                border: '1px solid #e8b84b',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: 42, marginBottom: 16 }}>🚪</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#f3e6c9', marginBottom: 8 }}>Logout?</div>
              <div style={{ color: '#e8b84b', fontSize: 14, marginBottom: 24 }}>
                Are you sure you want to logout from your account?
              </div>

              <div style={{ display: 'flex', gap: 12 }}>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowLogoutModal(false)}
                  style={{
                    flex: 1, padding: '14px', borderRadius: 14,
                    background: '#2a2a2a', color: '#ccc', fontWeight: 600
                  }}
                >
                  Cancel
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogoutConfirm}
                  disabled={loading}
                  style={{
                    flex: 1, padding: '14px', borderRadius: 14,
                    background: '#ef4444', color: 'white', fontWeight: 700
                  }}
                >
                  {loading ? 'Logging out...' : 'Yes, Logout'}
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}












// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { useApp } from '../context/AppContext';
// import { formatNumber } from '../utils/helpers';
// import { Copy, Check, Settings, Star, LogOut, Loader } from 'lucide-react';
// import { copyToClipboard } from '../utils/helpers';
// import { useNavigate } from 'react-router-dom';
// import API from '../services/api';
// import bgImage from "../assets/page-bg.png";

// const GRADIENT_BORDER = "linear-gradient(135deg,#FFF2A6 0%,#FFD96A 12%,#FFC83D 28%,#F5B300 45%,#D88A00 68%,#8A5200 100%)";
// const CARD_BG = "#0A090A";

// const GRADIENT_TEXT = {
//   background: GRADIENT_BORDER,
//   WebkitBackgroundClip: "text",
//   WebkitTextFillColor: "transparent",
//   backgroundClip: "text",
//   color: "transparent",
// };

// export default function Profile() {
//   const { user, setUser } = useApp();
//   const navigate = useNavigate();
//   const [copied, setCopied] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [pageLoading, setPageLoading] = useState(true);

//   // Fetch latest user data
//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       if (!user || !user._id) {
//         try {
//           const res = await API.get('/auth/me');
//           if (res.data.success && res.data.user) {
//             setUser(res.data.user);
//           }
//         } catch (err) {
//           console.error("Failed to fetch user profile:", err);
//         }
//       }
//       setPageLoading(false);
//     };

//     fetchUserProfile();
//   }, [user, setUser]);

//   // Safe User Data Mapping (According to your Signup Model)
//   const safeUser = {
//     fullName: user?.fullName || 'User',
//     username: user?.username || user?.email?.split('@')[0] || 'user',
//     referralCode: user?.referralCode || 'No Code',
//     totalMined: user?.totalMined || 0,
//     balance: user?.balance || 0,
//     referrals: user?.totalReferrals || 0,
//     achievements: user?.achievements || [],
//     dailyStreak: user?.dailyStreak || 0,
//     level: user?.level || 1,
//     levelName: user?.levelName || 'Beginner',
//     rank: user?.rank || '---',
//     joinedAt: user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A',
//   };

//   const handleCopy = async () => {
//     await copyToClipboard(safeUser.referralCode);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   const handleLogout = async () => {
//     if (!window.confirm("Are you sure you want to logout?")) return;

//     setLoading(true);
//     try {
//       await API.post('/auth/logout');
//     } catch (err) {
//       console.log("Logout API failed");
//     } finally {
//       localStorage.removeItem('token');
//       setUser(null);
//       navigate('/login');
//     }
//   };

//   const STATS = [
//     { label: 'Total Mined', value: formatNumber(safeUser.totalMined), icon: '⛏️' },
//     { label: 'Balance', value: formatNumber(safeUser.balance), icon: '💰' },
//     { label: 'Referrals', value: safeUser.referrals, icon: '👥' },
//     { label: 'Achievements', value: safeUser.achievements.length, icon: '🏅' },
//     { label: 'Streak', value: `${safeUser.dailyStreak}d`, icon: '🔥' },
//     { label: 'Rank', value: `#${safeUser.rank}`, icon: '🏆' },
//   ];

//   if (pageLoading) {
//     return (
//       <div style={{ textAlign: 'center', padding: '100px 20px', color: '#e8b84b' }}>
//         <Loader size={32} className="animate-spin mx-auto mb-4" />
//         Loading Profile...
//       </div>
//     );
//   }

//   return (
//     <div className="relative min-h-screen overflow-x-hidden" style={{ background: "transparent" }}>
//       <div className="fixed inset-0 z-0 pointer-events-none" 
//            style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover", opacity: 0.35 }} />
//       <div className="fixed inset-0 z-0 bg-black/45 pointer-events-none" />

//       <div className="relative z-10 max-w-[430px] mx-auto min-h-screen pb-28">

//         {/* Header */}
//         <div style={{ padding: '20px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//           <div style={{ ...GRADIENT_TEXT, fontSize: 24, fontWeight: 700 }}>👤 Profile</div>
//           <button 
//             onClick={() => navigate('/settings')} 
//             style={{ background: CARD_BG, border: '1px solid #e8b84b', width: 42, height: 42, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
//           >
//             <Settings size={18} color="#e8b84b" />
//           </button>
//         </div>

//         {/* Avatar & Info */}
//         <div style={{ padding: '24px 20px 20px', textAlign: 'center' }}>
//           <motion.div
//             animate={{ boxShadow: ['0 0 20px rgba(245,158,11,0.4)', '0 0 40px rgba(245,158,11,0.6)', '0 0 20px rgba(245,158,11,0.4)'] }}
//             transition={{ duration: 3, repeat: Infinity }}
//             style={{
//               width: 100, height: 100, borderRadius: '50%', margin: '0 auto',
//               background: GRADIENT_BORDER, padding: '5px'
//             }}
//           >
//             <div style={{
//               width: '100%', height: '100%', borderRadius: '50%', background: CARD_BG,
//               display: 'flex', alignItems: 'center', justifyContent: 'center', 
//               fontSize: 42, fontWeight: 900, color: '#f3e6c9'
//             }}>
//               {safeUser.fullName[0] || '?'}
//             </div>
//           </motion.div>

//           <div style={{ fontSize: 22, fontWeight: 700, color: '#f3e6c9', marginTop: 16 }}>
//             {safeUser.fullName}
//           </div>
//           <div style={{ fontSize: 14, color: '#e8b84b' }}>@{safeUser.username}</div>

//           {/* Level */}
//           <div style={{ marginTop: 12, display: 'inline-flex', alignItems: 'center', gap: 8, background: CARD_BG, border: '1px solid #e8b84b', borderRadius: 999, padding: '6px 18px' }}>
//             <Star size={18} color="#e8b84b" />
//             <span style={{ fontWeight: 700, color: '#e8b84b' }}>Level {safeUser.level} • {safeUser.levelName}</span>
//           </div>

//           {/* Referral Code */}
//           <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
//             <div style={{ 
//               padding: '10px 20px', 
//               background: CARD_BG, 
//               border: '1px solid #e8b84b', 
//               borderRadius: 999, 
//               fontWeight: 700, 
//               letterSpacing: 1 
//             }}>
//               {safeUser.referralCode}
//             </div>
//             <motion.button 
//               whileTap={{ scale: 0.9 }} 
//               onClick={handleCopy} 
//               style={{ padding: '10px', background: CARD_BG, border: '1px solid #e8b84b', borderRadius: 12 }}
//             >
//               {copied ? <Check size={20} color="#e8b84b" /> : <Copy size={20} color="#e8b84b" />}
//             </motion.button>
//           </div>
//         </div>

//         {/* Stats Grid */}
//         <div style={{ padding: '0 20px 20px' }}>
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
//             {STATS.map((stat, i) => (
//               <motion.div 
//                 key={i} 
//                 initial={{ opacity: 0, y: 20 }} 
//                 animate={{ opacity: 1, y: 0 }} 
//                 transition={{ delay: i * 0.05 }}
//                 style={{ padding: "1px", borderRadius: 18, background: GRADIENT_BORDER }}
//               >
//                 <div style={{ background: CARD_BG, borderRadius: 16, padding: '14px 8px', textAlign: 'center' }}>
//                   <div style={{ fontSize: 26 }}>{stat.icon}</div>
//                   <div style={{ fontSize: 18, fontWeight: 800, color: '#f4d99a', marginTop: 6 }}>{stat.value}</div>
//                   <div style={{ fontSize: 10, color: '#e8b84b', marginTop: 4 }}>{stat.label}</div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>

//         {/* Logout Button */}
//         <div style={{ padding: '0 20px 40px' }}>
//           <motion.button
//             whileTap={{ scale: 0.97 }}
//             onClick={handleLogout}
//             disabled={loading}
//             style={{
//               width: '100%', 
//               padding: '16px', 
//               background: '#450a0a', 
//               color: '#ef4444',
//               border: '1px solid #ef4444', 
//               borderRadius: 16, 
//               fontWeight: 700,
//               display: 'flex', 
//               alignItems: 'center', 
//               justifyContent: 'center', 
//               gap: 10
//             }}
//           >
//             <LogOut size={20} />
//             {loading ? 'Logging out...' : 'Logout'}
//           </motion.button>
//         </div>

//         <div style={{ height: 100 }} />
//       </div>
//     </div>
//   );
// }










// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { useApp } from '../context/AppContext';
// import { formatNumber } from '../utils/helpers';
// import { Copy, Check, Settings, Star, LogOut, Loader } from 'lucide-react';
// import { copyToClipboard } from '../utils/helpers';
// import { useNavigate } from 'react-router-dom';
// import API from '../services/api';
// import bgImage from "../assets/page-bg.png";

// const GRADIENT_BORDER = "linear-gradient(135deg,#FFF2A6 0%,#FFD96A 12%,#FFC83D 28%,#F5B300 45%,#D88A00 68%,#8A5200 100%)";
// const CARD_BG = "#0A090A";

// const GRADIENT_TEXT = {
//   background: GRADIENT_BORDER,
//   WebkitBackgroundClip: "text",
//   WebkitTextFillColor: "transparent",
//   backgroundClip: "text",
//   color: "transparent",
// };

// export default function Profile() {
//   const { user, setUser } = useApp();
//   const navigate = useNavigate();
//   const [copied, setCopied] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [pageLoading, setPageLoading] = useState(true);

//   // Fetch latest user data if not available
//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       if (!user || !user._id) {
//         try {
//           const res = await API.get('/auth/me'); // or /user/me
//           if (res.data.success) {
//             setUser(res.data.user);
//           }
//         } catch (err) {
//           console.error("Failed to fetch user profile:", err);
//         }
//       }
//       setPageLoading(false);
//     };

//     fetchUserProfile();
//   }, [user, setUser]);

//   const safeUser = {
//     firstName: user?.firstName || 'User',
//     lastName: user?.lastName || '',
//     username: user?.username || 'username',
//     referralCode: user?.referralCode || 'No Code',
//     totalMined: user?.totalMined || 0,
//     balance: user?.balance || 0,
//     referrals: user?.referrals || 0,
//     achievements: user?.achievements || [],
//     dailyStreak: user?.dailyStreak || 0,
//     level: user?.level || 1,
//     levelName: user?.levelName || 'Beginner',
//     rank: user?.rank || '---',
//     joinedAt: user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A',
//   };

//   const handleCopy = async () => {
//     await copyToClipboard(safeUser.referralCode);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   const handleLogout = async () => {
//     if (!window.confirm("Are you sure you want to logout?")) return;

//     setLoading(true);
//     try {
//       await API.post('/auth/logout');
//     } catch (err) {
//       console.log("Logout API failed, clearing locally");
//     } finally {
//       localStorage.removeItem('token');
//       setUser(null);
//       navigate('/login');
//     }
//   };

//   const STATS = [
//     { label: 'Total Mined', value: formatNumber(safeUser.totalMined), icon: '⛏️' },
//     { label: 'Balance', value: formatNumber(safeUser.balance), icon: '💰' },
//     { label: 'Referrals', value: safeUser.referrals, icon: '👥' },
//     { label: 'Achievements', value: safeUser.achievements.length, icon: '🏅' },
//     { label: 'Streak', value: `${safeUser.dailyStreak}d`, icon: '🔥' },
//     { label: 'Rank', value: `#${safeUser.rank}`, icon: '🏆' },
//   ];

//   if (pageLoading) {
//     return (
//       <div style={{ textAlign: 'center', padding: '100px 20px', color: '#e8b84b' }}>
//         <Loader size={32} className="animate-spin mx-auto mb-4" />
//         Loading Profile...
//       </div>
//     );
//   }

//   return (
//     <div className="relative min-h-screen overflow-x-hidden" style={{ background: "transparent" }}>
//       <div className="fixed inset-0 z-0 pointer-events-none" 
//            style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover", opacity: 0.35 }} />
//       <div className="fixed inset-0 z-0 bg-black/45 pointer-events-none" />

//       <div className="relative z-10 max-w-[430px] mx-auto min-h-screen pb-28">

//         {/* Header */}
//         <div style={{ padding: '20px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//           <div style={{ ...GRADIENT_TEXT, fontSize: 24, fontWeight: 700 }}>👤 Profile</div>
//           <button onClick={() => navigate('/settings')} style={{ background: CARD_BG, border: '1px solid #e8b84b', width: 42, height: 42, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//             <Settings size={18} color="#e8b84b" />
//           </button>
//         </div>

//         {/* Avatar & Info */}
//         <div style={{ padding: '24px 20px 20px', textAlign: 'center' }}>
//           <motion.div
//             animate={{ boxShadow: ['0 0 20px rgba(245,158,11,0.4)', '0 0 40px rgba(245,158,11,0.6)', '0 0 20px rgba(245,158,11,0.4)'] }}
//             transition={{ duration: 3, repeat: Infinity }}
//             style={{
//               width: 100, height: 100, borderRadius: '50%', margin: '0 auto',
//               background: GRADIENT_BORDER, padding: '5px'
//             }}
//           >
//             <div style={{
//               width: '100%', height: '100%', borderRadius: '50%', background: CARD_BG,
//               display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 42, fontWeight: 900
//             }}>
//               {safeUser.firstName[0]}{safeUser.lastName?.[0] || '?'}
//             </div>
//           </motion.div>

//           <div style={{ fontSize: 22, fontWeight: 700, color: '#f3e6c9', marginTop: 16 }}>
//             {safeUser.firstName} {safeUser.lastName}
//           </div>
//           <div style={{ fontSize: 14, color: '#e8b84b' }}>@{safeUser.username}</div>

//           {/* Level */}
//           <div style={{ marginTop: 12, display: 'inline-flex', alignItems: 'center', gap: 8, background: CARD_BG, border: '1px solid #e8b84b', borderRadius: 999, padding: '6px 18px' }}>
//             <Star size={18} color="#e8b84b" />
//             <span style={{ fontWeight: 700, color: '#e8b84b' }}>Level {safeUser.level} • {safeUser.levelName}</span>
//           </div>

//           {/* Referral Code */}
//           <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
//             <div style={{ padding: '10px 20px', background: CARD_BG, border: '1px solid #e8b84b', borderRadius: 999, fontWeight: 700, letterSpacing: 1 }}>
//               {safeUser.referralCode}
//             </div>
//             <motion.button whileTap={{ scale: 0.9 }} onClick={handleCopy} style={{ padding: '10px', background: CARD_BG, border: '1px solid #e8b84b', borderRadius: 12 }}>
//               {copied ? <Check size={20} color="#e8b84b" /> : <Copy size={20} color="#e8b84b" />}
//             </motion.button>
//           </div>
//         </div>

//         {/* Stats */}
//         <div style={{ padding: '0 20px 20px' }}>
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
//             {STATS.map((stat, i) => (
//               <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
//                 style={{ padding: "1px", borderRadius: 18, background: GRADIENT_BORDER }}>
//                 <div style={{ background: CARD_BG, borderRadius: 16, padding: '14px 8px', textAlign: 'center' }}>
//                   <div style={{ fontSize: 26 }}>{stat.icon}</div>
//                   <div style={{ fontSize: 18, fontWeight: 800, color: '#f4d99a', marginTop: 6 }}>{stat.value}</div>
//                   <div style={{ fontSize: 10, color: '#e8b84b', marginTop: 4 }}>{stat.label}</div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>

//         {/* Logout */}
//         <div style={{ padding: '0 20px 40px' }}>
//           <motion.button
//             whileTap={{ scale: 0.97 }}
//             onClick={handleLogout}
//             disabled={loading}
//             style={{
//               width: '100%', padding: '16px', background: '#450a0a', color: '#ef4444',
//               border: '1px solid #ef4444', borderRadius: 16, fontWeight: 700,
//               display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10
//             }}
//           >
//             <LogOut size={20} />
//             {loading ? 'Logging out...' : 'Logout'}
//           </motion.button>
//         </div>
//       </div>
//        <div style={{ height: 100 }} />
//     </div>
//   );
// }



// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { useApp } from '../context/AppContext';
// import { formatNumber } from '../utils/helpers';
// import { Edit3, Copy, Check, Settings, Trophy, Star, ExternalLink, LogOut } from 'lucide-react';
// import { copyToClipboard } from '../utils/helpers';
// import { useNavigate } from 'react-router-dom';
// import API from '../services/api';
// import bgImage from "../assets/page-bg.png";

// const GRADIENT_BORDER = "linear-gradient(135deg,#FFF2A6 0%,#FFD96A 12%,#FFC83D 28%,#F5B300 45%,#D88A00 68%,#8A5200 100%)";
// const CARD_BG = "#0A090A";

// const GRADIENT_TEXT = {
//   background: GRADIENT_BORDER,
//   WebkitBackgroundClip: "text",
//   WebkitTextFillColor: "transparent",
//   backgroundClip: "text",
//   color: "transparent",
// };

// export default function Profile() {
//   const { user, setUser } = useApp();
//   const navigate = useNavigate();
//   const [copied, setCopied] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // Safe fallback values
//   const safeUser = {
//     firstName: user?.firstName || 'User',
//     lastName: user?.lastName || '',
//     username: user?.username || 'username',
//     referralCode: user?.referralCode || 'XXXXXX',
//     totalMined: user?.totalMined || 0,
//     balance: user?.balance || 0,
//     referrals: user?.referrals || 0,
//     achievements: user?.achievements || [],
//     dailyStreak: user?.dailyStreak || 0,
//     level: user?.level || 1,
//     levelName: user?.levelName || 'Beginner',
//     rank: user?.rank || 0,
//     joinedAt: user?.joinedAt ? new Date(user.joinedAt).toLocaleDateString() : 'N/A',
//   };

//   const handleCopy = async () => {
//     await copyToClipboard(safeUser.referralCode);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   const handleLogout = async () => {
//     if (!window.confirm("Are you sure you want to logout?")) return;

//     setLoading(true);
//     try {
//       await API.post('/auth/logout'); // Optional: Call backend logout
//       localStorage.removeItem('token'); // Clear token
//       setUser(null);
//       navigate('/login');
//     } catch (err) {
//       console.error(err);
//       // Force logout even if API fails
//       localStorage.removeItem('token');
//       setUser(null);
//       navigate('/login');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const STATS = [
//     { label: 'Total Mined', value: formatNumber(safeUser.totalMined), icon: '⛏️' },
//     { label: 'Balance', value: formatNumber(safeUser.balance), icon: '💰' },
//     { label: 'Referrals', value: safeUser.referrals, icon: '👥' },
//     { label: 'Achievements', value: safeUser.achievements.length, icon: '🏅' },
//     { label: 'Streak', value: `${safeUser.dailyStreak}d`, icon: '🔥' },
//     { label: 'Rank', value: `#${safeUser.rank || '---'}`, icon: '🏆' },
//   ];

//   if (!user) {
//     return (
//       <div style={{ textAlign: 'center', padding: '100px 20px', color: '#e8b84b' }}>
//         Loading profile...
//       </div>
//     );
//   }

//   return (
//     <div className="relative min-h-screen overflow-x-hidden" style={{ background: "transparent" }}>
//       <div className="fixed inset-0 z-0 pointer-events-none" 
//            style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover", opacity: 0.35 }} />
//       <div className="fixed inset-0 z-0 bg-black/45 pointer-events-none" />

//       <div className="relative z-10 max-w-[430px] mx-auto min-h-screen pb-28">

//         {/* Header */}
//         <div style={{ padding: '20px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: 10, ...GRADIENT_TEXT, fontSize: 24, fontWeight: 700 }}>
//             👤 Profile
//           </div>
//           <button
//             onClick={() => navigate('/settings')}
//             style={{
//               background: CARD_BG, border: '1px solid #e8b84b',
//               width: 42, height: 42, borderRadius: 12,
//               display: 'flex', alignItems: 'center', justifyContent: 'center',
//             }}
//           >
//             <Settings size={18} color="#e8b84b" />
//           </button>
//         </div>

//         {/* Avatar & Info */}
//         <div style={{ padding: '24px 20px 20px', textAlign: 'center' }}>
//           <div style={{ position: 'relative', display: 'inline-block' }}>
//             <motion.div
//               animate={{ boxShadow: ['0 0 20px rgba(245,158,11,0.3)', '0 0 40px rgba(245,158,11,0.5)', '0 0 20px rgba(245,158,11,0.3)'] }}
//               transition={{ duration: 2.5, repeat: Infinity }}
//               style={{
//                 width: 92, height: 92, borderRadius: '50%',
//                 background: GRADIENT_BORDER,
//                 display: 'flex', alignItems: 'center', justifyContent: 'center',
//                 fontSize: 38, fontWeight: 900, color: '#fff', margin: '0 auto',
//                 padding: '4px',
//               }}
//             >
//               <div style={{
//                 width: '100%', height: '100%', borderRadius: '50%', background: CARD_BG,
//                 display: 'flex', alignItems: 'center', justifyContent: 'center',
//               }}>
//                 {safeUser.firstName[0]}{safeUser.lastName?.[0] || ''}
//               </div>
//             </motion.div>

//             <div style={{
//               position: 'absolute', bottom: 0, right: -4,
//               width: 32, height: 32, borderRadius: '50%',
//               background: GRADIENT_BORDER,
//               display: 'flex', alignItems: 'center', justifyContent: 'center',
//               fontSize: 16, border: `3px solid ${CARD_BG}`,
//             }}>
//               ⛏️
//             </div>
//           </div>

//           <div style={{ fontSize: 20, fontWeight: 700, color: '#f3e6c9', marginTop: 16 }}>
//             {safeUser.firstName} {safeUser.lastName}
//           </div>
//           <div style={{ fontSize: 13, color: '#e8b84b', marginTop: 2 }}>@{safeUser.username}</div>

//           {/* Level */}
//           <div style={{ display: 'flex', justifyContent: 'center', marginTop: 14 }}>
//             <div style={{
//               display: 'inline-flex', alignItems: 'center', gap: 8,
//               background: CARD_BG, border: '1px solid #e8b84b',
//               borderRadius: 99, padding: '8px 20px',
//             }}>
//               <Star size={16} color="#e8b84b" />
//               <span style={{ fontSize: 14, fontWeight: 700, color: '#e8b84b' }}>
//                 Level {safeUser.level} • {safeUser.levelName}
//               </span>
//             </div>
//           </div>

//           {/* Referral Code */}
//           <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center', marginTop: 16 }}>
//             <div style={{
//               fontSize: 14, letterSpacing: 2, fontWeight: 700, color: '#e8b84b',
//               background: CARD_BG, border: '1px solid #e8b84b',
//               borderRadius: 99, padding: '8px 20px',
//             }}>
//               {safeUser.referralCode}
//             </div>
//             <motion.button
//               whileTap={{ scale: 0.9 }}
//               onClick={handleCopy}
//               style={{
//                 background: CARD_BG, border: '1px solid #e8b84b',
//                 borderRadius: 99, padding: '10px 14px',
//                 display: 'flex', alignItems: 'center', gap: 6,
//                 color: '#e8b84b',
//               }}
//             >
//               {copied ? <Check size={16} /> : <Copy size={16} />}
//             </motion.button>
//           </div>
//         </div>

//         {/* Stats Grid */}
//         <div style={{ padding: '0 20px 20px' }}>
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
//             {STATS.map((s, i) => (
//               <motion.div
//                 key={s.label}
//                 initial={{ opacity: 0, scale: 0.85 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ delay: i * 0.06 }}
//                 style={{ padding: "1px", borderRadius: 18, background: GRADIENT_BORDER }}
//               >
//                 <div style={{
//                   background: CARD_BG,
//                   borderRadius: 16,
//                   padding: '16px 8px',
//                   textAlign: 'center',
//                 }}>
//                   <div style={{ fontSize: 24, marginBottom: 8 }}>{s.icon}</div>
//                   <div style={{ fontSize: 17, fontWeight: 800, color: '#f4d99a' }}>{s.value}</div>
//                   <div style={{ fontSize: 10, color: '#e8b84b', marginTop: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>
//                     {s.label}
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>

//         {/* Member Since */}
//         <div style={{ padding: '0 20px 20px' }}>
//           <div style={{ padding: "1px", borderRadius: 18, background: GRADIENT_BORDER }}>
//             <div style={{
//               background: CARD_BG,
//               borderRadius: 16,
//               padding: '18px 20px',
//               display: 'flex', alignItems: 'center', gap: 16,
//             }}>
//               <span style={{ fontSize: 28 }}>📅</span>
//               <div>
//                 <div style={{ fontSize: 14, fontWeight: 600, color: '#f3e6c9' }}>Member Since</div>
//                 <div style={{ fontSize: 13, color: '#e8b84b' }}>{safeUser.joinedAt}</div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Logout Button */}
//         <div style={{ padding: '0 20px 30px' }}>
//           <motion.button
//             whileTap={{ scale: 0.97 }}
//             onClick={handleLogout}
//             disabled={loading}
//             style={{
//               width: '100%',
//               padding: '16px',
//               background: '#ef444420',
//               border: '1px solid #ef4444',
//               color: '#ef4444',
//               fontSize: 16,
//               fontWeight: 700,
//               borderRadius: 16,
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               gap: 10,
//             }}
//           >
//             <LogOut size={20} />
//             {loading ? 'Logging out...' : 'Logout'}
//           </motion.button>
//         </div>

//         <div style={{ height: 100 }} />
//       </div>
//     </div>
//   );
// }
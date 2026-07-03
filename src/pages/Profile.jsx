import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { formatNumber } from '../utils/helpers';
import { Edit3, Copy, Check, Settings, Trophy, Star, ExternalLink } from 'lucide-react';
import { copyToClipboard } from '../utils/helpers';
import { useNavigate } from 'react-router-dom';
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
  const { user } = useApp();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await copyToClipboard(user.referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const STATS = [
    { label: 'Total Mined', value: formatNumber(user.totalMined), icon: '⛏️' },
    { label: 'Balance', value: formatNumber(user.balance), icon: '💰' },
    { label: 'Referrals', value: user.referrals, icon: '👥' },
    { label: 'Achievements', value: user.achievements?.length || 0, icon: '🏅' },
    { label: 'Streak', value: `${user.dailyStreak}d`, icon: '🔥' },
    { label: 'Rank', value: `#${user.rank}`, icon: '🏆' },
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: "transparent" }}>
      {/* Background Image */}
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

      {/* Dark Overlay */}
      <div className="fixed inset-0 z-0 bg-black/45 pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 max-w-[430px] mx-auto min-h-screen pb-28">

        {/* Header */}
        <div style={{ padding: '20px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, ...GRADIENT_TEXT, fontSize: 24, fontWeight: 700 }}>
            👤 Profile
          </div>
          <button
            onClick={() => navigate('/settings')}
            style={{
              background: CARD_BG, border: '1px solid #e8b84b',
              width: 42, height: 42, borderRadius: 12,
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            }}
          >
            <Settings size={18} color="#e8b84b" />
          </button>
        </div>

        {/* Avatar & Info */}
        <div style={{ padding: '24px 20px 20px', textAlign: 'center' }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <motion.div
              animate={{ boxShadow: ['0 0 20px rgba(245,158,11,0.3)', '0 0 40px rgba(245,158,11,0.5)', '0 0 20px rgba(245,158,11,0.3)'] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              style={{
                width: 92, height: 92, borderRadius: '50%',
                background: GRADIENT_BORDER,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 38, fontWeight: 900, color: '#fff', margin: '0 auto',
                padding: '4px',
              }}
            >
              <div style={{
                width: '100%', height: '100%', borderRadius: '50%', background: CARD_BG,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {user.firstName[0]}{user.lastName?.[0] || ''}
              </div>
            </motion.div>

            <div style={{
              position: 'absolute', bottom: 0, right: -4,
              width: 32, height: 32, borderRadius: '50%',
              background: GRADIENT_BORDER,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, border: `3px solid ${CARD_BG}`,
            }}>
              ⛏️
            </div>
          </div>

          <div style={{ fontSize: 20, fontWeight: 700, color: '#f3e6c9', marginTop: 16 }}>
            {user.firstName} {user.lastName}
          </div>
          <div style={{ fontSize: 13, color: '#e8b84b', marginTop: 2 }}>@{user.username}</div>

          {/* Level */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 14 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: CARD_BG, border: '1px solid #e8b84b',
              borderRadius: 99, padding: '8px 20px',
            }}>
              <Star size={16} color="#e8b84b" />
              <span style={{ fontSize: 14, fontWeight: 700, color: '#e8b84b' }}>
                Level {user.level} • {user.levelName}
              </span>
            </div>
          </div>

          {/* Referral Code */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center', marginTop: 16 }}>
            <div style={{
              fontSize: 14, letterSpacing: 2, fontWeight: 700, color: '#e8b84b',
              background: CARD_BG, border: '1px solid #e8b84b',
              borderRadius: 99, padding: '8px 20px',
            }}>
              {user.referralCode}
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleCopy}
              style={{
                background: CARD_BG, border: '1px solid #e8b84b',
                borderRadius: 99, padding: '10px 14px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 6,
                color: '#e8b84b',
              }}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </motion.button>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{ padding: '0 20px 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.06 }}
                style={{ padding: "1px", borderRadius: 18, background: GRADIENT_BORDER }}
              >
                <div style={{
                  background: CARD_BG,
                  borderRadius: 16,
                  padding: '16px 8px',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{s.icon}</div>
                  <div style={{ fontSize: 17, fontWeight: 800, color: '#f4d99a' }}>{s.value}</div>
                  <div style={{ fontSize: 10, color: '#e8b84b', marginTop: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                    {s.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Member Since */}
        <div style={{ padding: '0 20px 20px' }}>
          <div style={{ padding: "1px", borderRadius: 18, background: GRADIENT_BORDER }}>
            <div style={{
              background: CARD_BG,
              borderRadius: 16,
              padding: '18px 20px',
              display: 'flex', alignItems: 'center', gap: 16,
            }}>
              <span style={{ fontSize: 28 }}>📅</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#f3e6c9' }}>Member Since</div>
                <div style={{ fontSize: 13, color: '#e8b84b' }}>{user.joinedAt}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div style={{ padding: '0 20px 32px' }}>
          <div style={{ fontSize: 12, fontWeight: 700, ...GRADIENT_TEXT, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1.2 }}>
            Recent Badges
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            {['⛏️', '🔥', '👑'].map((badge, i) => (
              <div key={i} style={{
                width: 62, height: 62, borderRadius: 16, fontSize: 28,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: CARD_BG, border: '1px solid #e8b84b',
              }}>
                {badge}
              </div>
            ))}
            <div
              onClick={() => navigate('/achievements')}
              style={{
                flex: 1, height: 62, borderRadius: 16,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: CARD_BG, border: '1px solid #e8b84b',
                color: '#e8b84b', fontSize: 13, fontWeight: 700, cursor: 'pointer', gap: 6,
              }}
            >
              View All <ExternalLink size={14} />
            </div>
          </div>
        </div>

        {/* Bottom Spacer */}
        <div style={{ height: 60 }} />

      </div>
    </div>
  );
}



// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { useApp } from '../context/AppContext';
// import { formatNumber } from '../utils/helpers';
// import { Edit3, Copy, Check, Settings, Trophy, Star, ExternalLink } from 'lucide-react';
// import { copyToClipboard } from '../utils/helpers';
// import { useNavigate } from 'react-router-dom';

// export default function Profile() {
//   const { user } = useApp();
//   const navigate = useNavigate();
//   const [copied, setCopied] = useState(false);

//   const handleCopy = async () => {
//     await copyToClipboard(user.referralCode);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   const STATS = [
//     { label: 'Total Mined', value: formatNumber(user.totalMined), icon: '⛏️' },
//     { label: 'Balance', value: formatNumber(user.balance), icon: '💰' },
//     { label: 'Referrals', value: user.referrals, icon: '👥' },
//     { label: 'Achievements', value: user.achievements.length, icon: '🏅' },
//     { label: 'Streak', value: `${user.dailyStreak}d`, icon: '🔥' },
//     { label: 'Rank', value: `#${user.rank}`, icon: '🏆' },
//   ];

//   return (
//     <div className="page-content">
//       {/* Header */}
//       <div style={{ padding: '20px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//         <div style={{ fontSize: 20, fontWeight: 900 }}>👤 Profile</div>
//         <button
//           onClick={() => navigate('/settings')}
//           style={{
//             background: 'rgba(255,255,255,0.08)', border: 'none',
//             width: 38, height: 38, borderRadius: 11,
//             display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
//           }}
//         >
//           <Settings size={16} color="#9ca3af" />
//         </button>
//       </div>

//       {/* Avatar & Info */}
//       <div style={{ padding: '20px', textAlign: 'center' }}>
//         <div style={{ position: 'relative', display: 'inline-block' }}>
//           <motion.div
//             animate={{ boxShadow: ['0 0 20px rgba(245,158,11,0.2)', '0 0 40px rgba(245,158,11,0.4)', '0 0 20px rgba(245,158,11,0.2)'] }}
//             transition={{ duration: 2, repeat: Infinity }}
//             style={{
//               width: 88, height: 88, borderRadius: '50%',
//               background: 'linear-gradient(135deg, #f59e0b, #8b5cf6)',
//               display: 'flex', alignItems: 'center', justifyContent: 'center',
//               fontSize: 36, fontWeight: 900, color: '#fff', margin: '0 auto',
//               border: '3px solid rgba(245,158,11,0.4)',
//             }}
//           >
//             {user.firstName[0]}{user.lastName?.[0] || ''}
//           </motion.div>
//           <div style={{
//             position: 'absolute', bottom: 0, right: -4,
//             width: 28, height: 28, borderRadius: '50%',
//             background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
//             display: 'flex', alignItems: 'center', justifyContent: 'center',
//             fontSize: 14, border: '2px solid #0a0a0f',
//           }}>
//             ⛏️
//           </div>
//         </div>

//         <div style={{ fontSize: 20, fontWeight: 900, marginTop: 14 }}>
//           {user.firstName} {user.lastName}
//         </div>
//         <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>@{user.username}</div>

//         {/* Level badge */}
//         <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 12 }}>
//           <div style={{
//             display: 'inline-flex', alignItems: 'center', gap: 6,
//             background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)',
//             borderRadius: 99, padding: '6px 16px',
//           }}>
//             <Star size={14} color="#f59e0b" />
//             <span style={{ fontSize: 13, fontWeight: 800, color: '#fbbf24' }}>
//               Level {user.level} · {user.levelName}
//             </span>
//           </div>
//         </div>

//         {/* Referral Code */}
//         <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center', marginTop: 12 }}>
//           <div style={{
//             fontSize: 13, color: '#9ca3af', background: 'rgba(255,255,255,0.06)',
//             border: '1px solid rgba(255,255,255,0.1)', borderRadius: 99, padding: '6px 16px',
//             letterSpacing: 2, fontWeight: 700,
//           }}>
//             {user.referralCode}
//           </div>
//           <motion.button
//             whileTap={{ scale: 0.9 }}
//             onClick={handleCopy}
//             style={{
//               background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)',
//               borderRadius: 99, padding: '6px 12px', cursor: 'pointer',
//               display: 'flex', alignItems: 'center', gap: 4,
//               fontSize: 12, fontWeight: 700, color: '#fbbf24',
//             }}
//           >
//             {copied ? <Check size={12} /> : <Copy size={12} />}
//             {copied ? 'Copied!' : 'Copy'}
//           </motion.button>
//         </div>
//       </div>

//       {/* Stats Grid */}
//       <div style={{ padding: '0 20px 16px' }}>
//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
//           {STATS.map((s, i) => (
//             <motion.div
//               key={s.label}
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: i * 0.06 }}
//               style={{
//                 background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.06)',
//                 borderRadius: 16, padding: '14px 8px', textAlign: 'center',
//               }}
//             >
//               <div style={{ fontSize: 22, marginBottom: 4 }}>{s.icon}</div>
//               <div style={{ fontSize: 15, fontWeight: 900, color: '#fbbf24' }}>{s.value}</div>
//               <div style={{ fontSize: 9, color: '#6b7280', marginTop: 2, textTransform: 'uppercase', letterSpacing: 0.5 }}>{s.label}</div>
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       {/* Member Since */}
//       <div style={{ padding: '0 20px 16px' }}>
//         <div style={{
//           background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.06)',
//           borderRadius: 16, padding: '14px 16px',
//           display: 'flex', alignItems: 'center', gap: 12,
//         }}>
//           <span style={{ fontSize: 22 }}>📅</span>
//           <div>
//             <div style={{ fontSize: 13, fontWeight: 700 }}>Member Since</div>
//             <div style={{ fontSize: 12, color: '#9ca3af' }}>{user.joinedAt}</div>
//           </div>
//         </div>
//       </div>

//       {/* Achievements preview */}
//       <div style={{ padding: '0 20px 32px' }}>
//         <div style={{ fontSize: 13, fontWeight: 700, color: '#9ca3af', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.8 }}>
//           Recent Badges
//         </div>
//         <div style={{ display: 'flex', gap: 10 }}>
//           {['⛏️', '🔥', '👑'].map((badge, i) => (
//             <div key={i} style={{
//               width: 56, height: 56, borderRadius: 16, fontSize: 26,
//               display: 'flex', alignItems: 'center', justifyContent: 'center',
//               background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)',
//             }}>
//               {badge}
//             </div>
//           ))}
//           <div
//             onClick={() => navigate('/achievements')}
//             style={{
//               flex: 1, height: 56, borderRadius: 16, fontSize: 12, fontWeight: 700,
//               display: 'flex', alignItems: 'center', justifyContent: 'center',
//               background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
//               color: '#9ca3af', cursor: 'pointer', gap: 4,
//             }}
//           >
//             View all <ExternalLink size={11} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

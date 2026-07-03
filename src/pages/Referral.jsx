import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { formatNumber, copyToClipboard } from '../utils/helpers';
import { Copy, Check, Share2, Users, Rocket } from 'lucide-react';
import coinImg from '../assets/coin.png';
import bgImage from "../assets/page-bg.png";

const MOCK_REFERRALS = [
  { id: 1, name: 'John D.', joined: '2 days ago', earned: 150, active: true },
  { id: 2, name: 'Sarah M.', joined: '5 days ago', earned: 50, active: false },
  { id: 3, name: 'Mike R.', joined: '1 week ago', earned: 200, active: true },
  { id: 4, name: 'Anna K.', joined: '2 weeks ago', earned: 50, active: true },
  { id: 5, name: 'Tom L.', joined: '1 month ago', earned: 50, active: false },
];

const LEVELS = [
  { level: 1, label: 'Direct Referral', pct: '50 MINE + 10%' },
  { level: 2, label: 'Level 2 Referral', pct: '5% of mining' },
  { level: 3, label: 'Level 3 Referral', pct: '2% of mining' },
];

const GRADIENT_BORDER = "linear-gradient(135deg,#FFF2A6 0%,#FFD96A 12%,#FFC83D 28%,#F5B300 45%,#D88A00 68%,#8A5200 100%)";
const CARD_BG = "#0A090A";

const GRADIENT_TEXT = {
  background: GRADIENT_BORDER,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  color: "transparent",
};

export default function Referral() {
  const { user } = useApp();
  const [copied, setCopied] = useState(false);
  const refLink = `https://t.me/MineBot?start=${user.referralCode}`;

  const handleCopy = async () => {
    await copyToClipboard(refLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: 'Join MineBot!', text: 'Mine MINE coins with me!', url: refLink });
    }
  };

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
        <div style={{ padding: '32px 24px 0', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, ...GRADIENT_TEXT, fontSize: 22, fontWeight: 700 }}>
            <Users size={24} color="#e8b84b" /> Invite Friends
          </div>
          <div style={{ fontSize: 13, color: '#e8b84b', marginTop: 6 }}>
            Earn 50 MINE for each friend you invite!
          </div>
        </div>

        {/* Banner */}
        <div style={{ padding: '32px 24px 0' }}>
          <div style={{ padding: "1px", borderRadius: 28, background: GRADIENT_BORDER }}>
            <div style={{
              background: CARD_BG,
              borderRadius: 26,
              padding: '32px 24px',
              position: 'relative',
              overflow: 'hidden',
              textAlign: 'center',
            }}>
              <div style={{
                position: 'absolute', top: -40, right: -40, width: 150, height: 150,
                borderRadius: '50%', background: 'rgba(201,146,47,0.1)',
              }} />

              <div style={{
                width: 56, height: 56, borderRadius: '50%', margin: '0 auto 16px',
                background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Rocket size={28} color="#e8b84b" />
              </div>

              <div style={{ fontSize: 18, fontWeight: 700, ...GRADIENT_TEXT, marginBottom: 8 }}>Invite & Earn</div>
              <div style={{ color: '#e8b84b', fontSize: 13.5, marginBottom: 24, lineHeight: 1.6 }}>
                You earn <span style={{ color: '#e8b84b' }}>50 MINE</span> per referral +<br />
                <span style={{ color: '#5fd66a' }}>10% of their mining</span> forever!
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 26, fontWeight: 800, color: '#f4d99a' }}>{user.referrals}</div>
                  <div style={{ fontSize: 11, color: '#e8b84b', marginTop: 4 }}>FRIENDS INVITED</div>
                </div>
                <div style={{ width: 1, background: 'rgba(201,146,47,0.2)' }} />
                <div style={{ textAlign: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                    <img src={coinImg} alt="" style={{ width: 20, height: 20 }} />
                    <span style={{ fontSize: 26, fontWeight: 800, color: '#5fd66a' }}>
                      {formatNumber(user.referralEarnings)}
                    </span>
                  </div>
                  <div style={{ fontSize: 11, color: '#e8b84b', marginTop: 4 }}>TOTAL EARNED</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Referral Link */}
        <div style={{ padding: '24px 24px 0' }}>
          <div style={{ fontSize: 12, fontWeight: 700, ...GRADIENT_TEXT, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1.2 }}>
            Your Referral Link
          </div>
          <div style={{ padding: "1px", borderRadius: 18, background: GRADIENT_BORDER }}>
            <div style={{
              background: CARD_BG,
              borderRadius: 16,
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}>
              <div style={{ flex: 1, fontSize: 13, color: '#c9b38a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {refLink}
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleCopy}
                style={{
                  background: copied ? 'rgba(95,214,106,0.2)' : 'rgba(201,146,47,0.2)',
                  border: `1px solid ${copied ? '#5fd66a' : '#e8b84b'}`,
                  borderRadius: 10, padding: '10px 16px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 6,
                  color: copied ? '#5fd66a' : '#e8b84b',
                  fontWeight: 700, fontSize: 13,
                }}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Copied!' : 'Copy'}
              </motion.button>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleShare}
            style={{
              width: '100%', marginTop: 14,
              background: GRADIENT_BORDER,
              color: '#0a0704',
              fontWeight: 700, fontSize: 15,
              border: 'none', borderRadius: 16, padding: '16px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            <Share2 size={18} /> Share with Friends
          </motion.button>
        </div>

        {/* Referral Code */}
        <div style={{ padding: '24px 24px 0' }}>
          <div style={{ padding: "1px", borderRadius: 18, background: GRADIENT_BORDER }}>
            <div style={{
              background: CARD_BG,
              borderRadius: 16,
              padding: '20px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 12, color: '#e8b84b', marginBottom: 8 }}>Your Referral Code</div>
              <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: 6, color: '#e8b84b' }}>
                {user.referralCode}
              </div>
            </div>
          </div>
        </div>

        {/* Multi-level Rewards */}
        <div style={{ padding: '32px 24px 0' }}>
          <div style={{ fontSize: 12, fontWeight: 700, ...GRADIENT_TEXT, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1.2 }}>
            Multi-Level Rewards
          </div>
          <div style={{ padding: "1px", borderRadius: 20, background: GRADIENT_BORDER }}>
            <div style={{
              background: CARD_BG,
              borderRadius: 18,
              padding: '8px 20px',
            }}>
              {LEVELS.map((l, i) => (
                <div key={l.level} style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '18px 0',
                  borderBottom: i < LEVELS.length - 1 ? '1px solid rgba(58,42,18,0.6)' : 'none',
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 12,
                    background: 'rgba(201,146,47,0.15)', color: '#e8b84b',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 800,
                  }}>
                    L{l.level}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#f3e6c9' }}>{l.label}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <img src={coinImg} alt="" style={{ width: 16, height: 16 }} />
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#e8b84b' }}>{l.pct}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Referrals List */}
        <div style={{ padding: '24px 24px 40px' }}>
          <div style={{
            fontSize: 12, fontWeight: 700, ...GRADIENT_TEXT, marginBottom: 12,
            textTransform: 'uppercase', letterSpacing: 1.2,
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <Users size={14} /> Your Referrals ({MOCK_REFERRALS.length})
          </div>
          <div style={{ padding: "1px", borderRadius: 20, background: GRADIENT_BORDER }}>
            <div style={{
              background: CARD_BG,
              borderRadius: 18,
              padding: '8px 20px',
            }}>
              {MOCK_REFERRALS.map((r, i) => (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '18px 0',
                    borderBottom: i < MOCK_REFERRALS.length - 1 ? '1px solid rgba(58,42,18,0.6)' : 'none',
                  }}
                >
                  <div style={{
                    width: 42, height: 42, borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'linear-gradient(135deg, #2a1c0a, #120c04)',
                    color: '#e8b84b', fontSize: 16, fontWeight: 700,
                    border: '1px solid rgba(201,146,47,0.4)',
                  }}>
                    {r.name[0]}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#f3e6c9' }}>{r.name}</div>
                    <div style={{ fontSize: 12, color: '#e8b84b' }}>{r.joined}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end' }}>
                      <img src={coinImg} alt="" style={{ width: 14, height: 14 }} />
                      <span style={{ fontSize: 15, fontWeight: 700, color: '#e8b84b' }}>+{r.earned}</span>
                    </div>
                    <div style={{ fontSize: 11, color: r.active ? '#5fd66a' : '#e8b84b', marginTop: 4 }}>
                      {r.active ? '● Active' : '● Inactive'}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
         <div style={{ height: 60 }} />
      </div>
    </div>
  );
}











// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { useApp } from '../context/AppContext';
// import { formatNumber, copyToClipboard } from '../utils/helpers';
// import { Copy, Check, Share2, Users, Rocket } from 'lucide-react';
// import coinImg from '../assets/coin.png';

// const MOCK_REFERRALS = [
//   { id: 1, name: 'John D.', joined: '2 days ago', earned: 150, active: true },
//   { id: 2, name: 'Sarah M.', joined: '5 days ago', earned: 50, active: false },
//   { id: 3, name: 'Mike R.', joined: '1 week ago', earned: 200, active: true },
//   { id: 4, name: 'Anna K.', joined: '2 weeks ago', earned: 50, active: true },
//   { id: 5, name: 'Tom L.', joined: '1 month ago', earned: 50, active: false },
// ];

// const LEVELS = [
//   { level: 1, label: 'Direct Referral', pct: '50 MINE + 10%' },
//   { level: 2, label: 'Level 2 Referral', pct: '5% of mining' },
//   { level: 3, label: 'Level 3 Referral', pct: '2% of mining' },
// ];

// export default function Referral() {
//   const { user } = useApp();
//   const [copied, setCopied] = useState(false);
//   const refLink = `https://t.me/MineBot?start=${user.referralCode}`;

//   const handleCopy = async () => {
//     await copyToClipboard(refLink);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   const handleShare = () => {
//     if (navigator.share) {
//       navigator.share({ title: 'Join MineBot!', text: 'Mine MINE coins with me!', url: refLink });
//     }
//   };

//   return (
//     <div
//       className="page-content"
//       style={{
//         minHeight: '100vh',
//         background: '#0a0704',
//         backgroundImage:
//           'radial-gradient(circle at 15% 10%, rgba(201,146,47,0.08), transparent 40%), radial-gradient(circle at 85% 90%, rgba(201,146,47,0.06), transparent 40%)',
//       }}
//     >
//       {/* Header */}
//       <div style={{ padding: '32px 24px 0', textAlign: 'center' }}>
//         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 20, fontWeight: 700, color: '#f3e6c9' }}>
//           <Users size={20} color="#e8b84b" /> Invite Friends
//         </div>
//         <div style={{ fontSize: 13, color: '#e8b84b', marginTop: 6 }}>
//           Earn 50 MINE for each friend you invite!
//         </div>
//       </div>

//       {/* Banner */}
//       <div style={{ padding: '32px 24px 0' }}>
//         <div style={{
//           position: 'relative', overflow: 'hidden', textAlign: 'center',
//           background: 'linear-gradient(135deg, #1c1206 0%, #120c04 50%, #0a0704 100%)',
//           border: '1px solid rgba(201,146,47,0.4)',
//           borderRadius: 28, padding: '32px 24px',
//         }}>
//           <div style={{
//             position: 'absolute', top: -40, right: -40, width: 150, height: 150,
//             borderRadius: '50%', background: 'rgba(201,146,47,0.1)', pointerEvents: 'none',
//           }} />

//           <div style={{
//             width: 56, height: 56, borderRadius: '50%', margin: '0 auto 16px',
//             background: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center',
//             boxShadow: 'inset 0 0 0 1px rgba(201,146,47,0.3)',
//           }}>
//             <Rocket size={26} color="#e8b84b" />
//           </div>

//           <div style={{ fontSize: 17, fontWeight: 700, color: '#f3e6c9', marginBottom: 8 }}>Invite &amp; Earn</div>
//           <div style={{ color: '#e8b84b', fontSize: 13, marginBottom: 24, lineHeight: 1.6 }}>
//             You earn <b style={{ color: '#e8b84b' }}>50 MINE</b> per referral +<br />
//             <b style={{ color: '#5fd66a' }}>10% of their mining</b> forever!
//           </div>

//           {/* Stats row */}
//           <div style={{ display: 'flex', justifyContent: 'space-around' }}>
//             <div style={{ textAlign: 'center' }}>
//               <div style={{ fontSize: 24, fontWeight: 800, color: '#f4d99a' }}>{user.referrals}</div>
//               <div style={{ fontSize: 11, color: '#e8b84b', marginTop: 4 }}>Friends Invited</div>
//             </div>
//             <div style={{ width: 1, background: 'rgba(201,146,47,0.2)' }} />
//             <div style={{ textAlign: 'center' }}>
//               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
//                 <img src={coinImg} alt="" style={{ width: 18, height: 18, objectFit: 'contain' }} />
//                 <span style={{ fontSize: 24, fontWeight: 800, color: '#5fd66a' }}>
//                   {formatNumber(user.referralEarnings)}
//                 </span>
//               </div>
//               <div style={{ fontSize: 11, color: '#e8b84b', marginTop: 4 }}>Total Earned</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Referral Link */}
//       <div style={{ padding: '32px 24px 0' }}>
//         <div style={{ fontSize: 12, fontWeight: 700, color: '#c9922f', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1.2 }}>
//           Your Referral Link
//         </div>
//         <div style={{
//           background: 'linear-gradient(to bottom, #191008, #0d0904)',
//           border: '1px solid rgba(58,42,18,0.8)',
//           borderRadius: 16, padding: '16px',
//           display: 'flex', alignItems: 'center', gap: 10,
//         }}>
//           <div style={{ flex: 1, fontSize: 12, color: '#e8b84b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
//             {refLink}
//           </div>
//           <motion.button
//             whileTap={{ scale: 0.9 }}
//             onClick={handleCopy}
//             style={{
//               background: copied ? 'rgba(95,214,106,0.15)' : 'rgba(201,146,47,0.15)',
//               border: `1px solid ${copied ? 'rgba(95,214,106,0.4)' : 'rgba(201,146,47,0.35)'}`,
//               borderRadius: 10, padding: '8px 14px', cursor: 'pointer',
//               display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0,
//               fontSize: 12, fontWeight: 700, color: copied ? '#5fd66a' : '#e8b84b',
//             }}
//           >
//             {copied ? <Check size={14} /> : <Copy size={14} />}
//             {copied ? 'Copied!' : 'Copy'}
//           </motion.button>
//         </div>

//         {/* Share button */}
//         <motion.button
//           whileTap={{ scale: 0.97 }}
//           onClick={handleShare}
//           style={{
//             width: '100%', marginTop: 12,
//             background: 'linear-gradient(135deg, #a9762a, #e8b84b)',
//             color: '#1a1206', fontWeight: 700, fontSize: 15,
//             border: 'none', borderRadius: 14, padding: '16px',
//             cursor: 'pointer', display: 'flex', alignItems: 'center',
//             justifyContent: 'center', gap: 8,
//           }}
//         >
//           <Share2 size={18} /> Share with Friends
//         </motion.button>
//       </div>

//       {/* Referral Code */}
//       <div style={{ padding: '24px 24px 0' }}>
//         <div style={{
//           background: 'rgba(201,146,47,0.08)', border: '1px solid rgba(201,146,47,0.25)',
//           borderRadius: 16, padding: '18px', textAlign: 'center',
//         }}>
//           <div style={{ fontSize: 12, color: '#e8b84b', marginBottom: 8 }}>Your Referral Code</div>
//           <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: 4, color: '#e8b84b' }}>
//             {user.referralCode}
//           </div>
//         </div>
//       </div>

//       {/* Multi-level referral info */}
//       <div style={{ padding: '32px 24px 0' }}>
//         <div style={{ fontSize: 12, fontWeight: 700, color: '#c9922f', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1.2 }}>
//           Multi-Level Rewards
//         </div>
//         <div style={{
//           background: 'linear-gradient(to bottom, #191008, #0d0904)',
//           border: '1px solid rgba(58,42,18,0.8)', borderRadius: 16,
//           padding: '4px 18px',
//         }}>
//           {LEVELS.map((l, i) => (
//             <div key={l.level} style={{
//               display: 'flex', alignItems: 'center', gap: 12,
//               padding: '16px 0',
//               borderBottom: i < LEVELS.length - 1 ? '1px solid rgba(58,42,18,0.6)' : 'none',
//             }}>
//               <div style={{
//                 width: 32, height: 32, borderRadius: 10, fontSize: 12, fontWeight: 800,
//                 display: 'flex', alignItems: 'center', justifyContent: 'center',
//                 background: 'rgba(201,146,47,0.15)', color: '#e8b84b',
//                 boxShadow: 'inset 0 0 0 1px rgba(201,146,47,0.3)',
//               }}>
//                 L{l.level}
//               </div>
//               <div style={{ flex: 1 }}>
//                 <div style={{ fontSize: 13, fontWeight: 600, color: '#f3e6c9' }}>{l.label}</div>
//               </div>
//               <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
//                 <img src={coinImg} alt="" style={{ width: 14, height: 14, objectFit: 'contain' }} />
//                 <span style={{ fontSize: 13, fontWeight: 700, color: '#e8b84b' }}>{l.pct}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Referrals List */}
//       <div style={{ padding: '32px 24px 32px' }}>
//         <div style={{
//           fontSize: 12, fontWeight: 700, color: '#c9922f', marginBottom: 12,
//           textTransform: 'uppercase', letterSpacing: 1.2,
//           display: 'flex', alignItems: 'center', gap: 6,
//         }}>
//           <Users size={13} /> Your Referrals ({MOCK_REFERRALS.length})
//         </div>
//         <div style={{
//           background: 'linear-gradient(to bottom, #191008, #0d0904)',
//           border: '1px solid rgba(58,42,18,0.8)', borderRadius: 16,
//           padding: '4px 18px',
//         }}>
//           {MOCK_REFERRALS.map((r, i) => (
//             <motion.div
//               key={r.id}
//               initial={{ opacity: 0, x: -16 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: i * 0.06 }}
//               style={{
//                 display: 'flex', alignItems: 'center', gap: 12,
//                 padding: '16px 0',
//                 borderBottom: i < MOCK_REFERRALS.length - 1 ? '1px solid rgba(58,42,18,0.6)' : 'none',
//               }}
//             >
//               <div style={{
//                 width: 38, height: 38, borderRadius: '50%', fontSize: 15, fontWeight: 700,
//                 display: 'flex', alignItems: 'center', justifyContent: 'center',
//                 background: 'linear-gradient(135deg, #2a1c0a, #120c04)',
//                 color: '#e8b84b', border: '1px solid rgba(201,146,47,0.35)',
//               }}>
//                 {r.name[0]}
//               </div>
//               <div style={{ flex: 1 }}>
//                 <div style={{ fontSize: 13, fontWeight: 600, color: '#f3e6c9' }}>{r.name}</div>
//                 <div style={{ fontSize: 11, color: '#e8b84b', marginTop: 2 }}>{r.joined}</div>
//               </div>
//               <div style={{ textAlign: 'right' }}>
//                 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4 }}>
//                   <img src={coinImg} alt="" style={{ width: 12, height: 12, objectFit: 'contain' }} />
//                   <span style={{ fontSize: 13, fontWeight: 700, color: '#e8b84b' }}>+{r.earned}</span>
//                 </div>
//                 <div style={{
//                   fontSize: 10, fontWeight: 600, marginTop: 3,
//                   color: r.active ? '#5fd66a' : '#5c4d2e',
//                 }}>
//                   {r.active ? '● Active' : '● Inactive'}
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }






// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { useApp } from '../context/AppContext';
// import { formatNumber, copyToClipboard } from '../utils/helpers';
// import { Copy, Check, Share2, Users } from 'lucide-react';

// const MOCK_REFERRALS = [
//   { id: 1, name: 'John D.', joined: '2 days ago', earned: 150, active: true },
//   { id: 2, name: 'Sarah M.', joined: '5 days ago', earned: 50, active: false },
//   { id: 3, name: 'Mike R.', joined: '1 week ago', earned: 200, active: true },
//   { id: 4, name: 'Anna K.', joined: '2 weeks ago', earned: 50, active: true },
//   { id: 5, name: 'Tom L.', joined: '1 month ago', earned: 50, active: false },
// ];

// export default function Referral() {
//   const { user } = useApp();
//   const [copied, setCopied] = useState(false);
//   const refLink = `https://t.me/MineBot?start=${user.referralCode}`;

//   const handleCopy = async () => {
//     await copyToClipboard(refLink);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   const handleShare = () => {
//     if (navigator.share) {
//       navigator.share({ title: 'Join MineBot!', text: 'Mine MINE coins with me!', url: refLink });
//     }
//   };

//   return (
//     <div className="page-content">
//       {/* Header */}
//       <div style={{ padding: '20px 20px 0', textAlign: 'center' }}>
//         <div style={{ fontSize: 22, fontWeight: 900 }}>👥 Invite Friends</div>
//         <div style={{ fontSize: 13, color: '#6b7280', marginTop: 4 }}>
//           Earn 50 MINE for each friend you invite!
//         </div>
//       </div>

//       {/* Banner */}
//       <div style={{ padding: '16px 20px' }}>
//         <div style={{
//           background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
//           border: '1px solid rgba(245,158,11,0.25)',
//           borderRadius: 24, padding: '24px 20px', textAlign: 'center', overflow: 'hidden',
//           position: 'relative',
//         }}>
//           <div style={{
//             position: 'absolute', top: -30, right: -30, width: 120, height: 120,
//             borderRadius: '50%', background: 'rgba(245,158,11,0.06)',
//           }} />
//           <div style={{ fontSize: 48, marginBottom: 12 }}>🚀</div>
//           <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 4 }}>Invite &amp; Earn</div>
//           <div style={{ color: '#9ca3af', fontSize: 13, marginBottom: 16 }}>
//             You earn <b style={{ color: '#fbbf24' }}>50 MINE</b> per referral +<br/>
//             <b style={{ color: '#60a5fa' }}>10% of their mining</b> forever!
//           </div>

//           {/* Stats row */}
//           <div style={{ display: 'flex', justifyContent: 'space-around' }}>
//             <div style={{ textAlign: 'center' }}>
//               <div style={{ fontSize: 22, fontWeight: 900, color: '#fbbf24' }}>{user.referrals}</div>
//               <div style={{ fontSize: 11, color: '#6b7280' }}>Friends Invited</div>
//             </div>
//             <div style={{ width: 1, background: 'rgba(255,255,255,0.06)' }} />
//             <div style={{ textAlign: 'center' }}>
//               <div style={{ fontSize: 22, fontWeight: 900, color: '#10b981' }}>
//                 {formatNumber(user.referralEarnings)}
//               </div>
//               <div style={{ fontSize: 11, color: '#6b7280' }}>Total Earned</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Referral Link */}
//       <div style={{ padding: '0 20px 16px' }}>
//         <div style={{ fontSize: 13, fontWeight: 700, color: '#9ca3af', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.8 }}>
//           Your Referral Link
//         </div>
//         <div style={{
//           background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.08)',
//           borderRadius: 14, padding: '14px',
//           display: 'flex', alignItems: 'center', gap: 10,
//         }}>
//           <div style={{ flex: 1, fontSize: 12, color: '#9ca3af', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
//             {refLink}
//           </div>
//           <motion.button
//             whileTap={{ scale: 0.9 }}
//             onClick={handleCopy}
//             style={{
//               background: copied ? 'rgba(16,185,129,0.2)' : 'rgba(245,158,11,0.15)',
//               border: `1px solid ${copied ? 'rgba(16,185,129,0.4)' : 'rgba(245,158,11,0.3)'}`,
//               borderRadius: 10, padding: '8px 14px', cursor: 'pointer',
//               display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0,
//               fontSize: 12, fontWeight: 700, color: copied ? '#6ee7b7' : '#fbbf24',
//             }}
//           >
//             {copied ? <Check size={14} /> : <Copy size={14} />}
//             {copied ? 'Copied!' : 'Copy'}
//           </motion.button>
//         </div>

//         {/* Share button */}
//         <motion.button
//           whileTap={{ scale: 0.97 }}
//           onClick={handleShare}
//           style={{
//             width: '100%', marginTop: 10,
//             background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
//             color: '#fff', fontWeight: 700, fontSize: 15,
//             border: 'none', borderRadius: 14, padding: '14px',
//             cursor: 'pointer', display: 'flex', alignItems: 'center',
//             justifyContent: 'center', gap: 8,
//           }}
//         >
//           <Share2 size={18} /> Share with Friends
//         </motion.button>
//       </div>

//       {/* Referral Code */}
//       <div style={{ padding: '0 20px 16px' }}>
//         <div style={{
//           background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)',
//           borderRadius: 14, padding: '14px', textAlign: 'center',
//         }}>
//           <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 6 }}>Your Referral Code</div>
//           <div style={{ fontSize: 24, fontWeight: 900, letterSpacing: 4, color: '#fbbf24' }}>
//             {user.referralCode}
//           </div>
//         </div>
//       </div>

//       {/* Multi-level referral info */}
//       <div style={{ padding: '0 20px 16px' }}>
//         <div style={{ fontSize: 13, fontWeight: 700, color: '#9ca3af', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.8 }}>
//           Multi-Level Rewards
//         </div>
//         {[
//           { level: 1, label: 'Direct Referral', pct: '50 MINE + 10%', color: '#f59e0b' },
//           { level: 2, label: 'Level 2 Referral', pct: '5% of mining', color: '#8b5cf6' },
//           { level: 3, label: 'Level 3 Referral', pct: '2% of mining', color: '#3b82f6' },
//         ].map((l) => (
//           <div key={l.level} style={{
//             display: 'flex', alignItems: 'center', gap: 12,
//             padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.04)',
//           }}>
//             <div style={{
//               width: 32, height: 32, borderRadius: 10, fontSize: 13, fontWeight: 900,
//               display: 'flex', alignItems: 'center', justifyContent: 'center',
//               background: `${l.color}20`, color: l.color, border: `1px solid ${l.color}30`,
//             }}>
//               L{l.level}
//             </div>
//             <div style={{ flex: 1 }}>
//               <div style={{ fontSize: 13, fontWeight: 600 }}>{l.label}</div>
//             </div>
//             <div style={{ fontSize: 13, fontWeight: 800, color: l.color }}>{l.pct}</div>
//           </div>
//         ))}
//       </div>

//       {/* Referrals List */}
//       <div style={{ padding: '0 20px 32px' }}>
//         <div style={{ fontSize: 13, fontWeight: 700, color: '#9ca3af', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.8, display: 'flex', alignItems: 'center', gap: 6 }}>
//           <Users size={14} /> Your Referrals ({MOCK_REFERRALS.length})
//         </div>
//         {MOCK_REFERRALS.map((r, i) => (
//           <motion.div
//             key={r.id}
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: i * 0.06 }}
//             style={{
//               display: 'flex', alignItems: 'center', gap: 12,
//               padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.04)',
//             }}
//           >
//             <div style={{
//               width: 38, height: 38, borderRadius: '50%', fontSize: 15, fontWeight: 800,
//               display: 'flex', alignItems: 'center', justifyContent: 'center',
//               background: `hsl(${r.id * 60}, 60%, 30%)`,
//               color: `hsl(${r.id * 60}, 80%, 80%)`,
//             }}>
//               {r.name[0]}
//             </div>
//             <div style={{ flex: 1 }}>
//               <div style={{ fontSize: 13, fontWeight: 700 }}>{r.name}</div>
//               <div style={{ fontSize: 11, color: '#6b7280' }}>{r.joined}</div>
//             </div>
//             <div style={{ textAlign: 'right' }}>
//               <div style={{ fontSize: 13, fontWeight: 800, color: '#fbbf24' }}>+{r.earned}</div>
//               <div style={{
//                 fontSize: 10, fontWeight: 600,
//                 color: r.active ? '#6ee7b7' : '#4b5563',
//               }}>
//                 {r.active ? '● Active' : '● Inactive'}
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }

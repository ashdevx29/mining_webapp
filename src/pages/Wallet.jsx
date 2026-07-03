import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { formatNumber, truncateAddress, copyToClipboard } from '../utils/helpers';
import { Copy, Check, ArrowUpRight, ArrowDownLeft, Wallet as WalletIcon } from 'lucide-react';
// import { FaWallet } from 'react-icons/fa';   // ← Added this
import coinImg from '../assets/coin.png';
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

export default function Wallet() {
  const { user, setUser } = useApp();
  const [copied, setCopied] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const hasWallet = !!user.walletAddress;
  const mockAddress = '0x1A2b3C4d5E6f7A8b9C0d1E2f3A4b5C6d7E8f9A0';

  const handleConnect = () => {
    setConnecting(true);
    setTimeout(() => {
      setUser(prev => ({ ...prev, walletAddress: mockAddress }));
      setConnecting(false);
    }, 1500);
  };

  const handleCopy = async () => {
    await copyToClipboard(user.walletAddress || mockAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const MOCK_TXS = [
    { id: 1, type: 'mining', label: 'Mining Reward', amount: 200, time: '2h ago', sign: '+' },
    { id: 2, type: 'referral', label: 'Referral Bonus', amount: 50, time: '5h ago', sign: '+' },
    { id: 3, type: 'task', label: 'Task Reward', amount: 100, time: '1d ago', sign: '+' },
    { id: 4, type: 'spin', label: 'Lucky Spin', amount: 500, time: '2d ago', sign: '+' },
    { id: 5, type: 'withdraw', label: 'Withdrawal', amount: 1000, time: '3d ago', sign: '-' },
  ];

  const txIcons = { mining: '⛏️', referral: '👥', task: '📋', spin: '🎰', withdraw: '💸' };

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
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: 10, 
            ...GRADIENT_TEXT, 
            fontSize: 24, 
            fontWeight: 700 
          }}>
            {/* <FaWallet size={28} />  */}
            Wallet
          </div>
          <div style={{ fontSize: 13, color: '#e8b84b', marginTop: 6 }}>
            Your MINE balance and transaction history
          </div>
        </div>

        {/* Balance Card */}
        <div style={{ padding: '20px 24px 0' }}>
          <div style={{ padding: "1px", borderRadius: 28, background: GRADIENT_BORDER }}>
            <div style={{
              background: CARD_BG,
              borderRadius: 26,
              padding: '28px 24px',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: -60, right: -60, width: 180, height: 180,
                borderRadius: '50%', background: 'rgba(232,184,75,0.08)',
              }} />

              <div style={{ fontSize: 14, color: '#e8b84b', marginBottom: 8 }}>MINE Balance</div>
              <motion.div
                key={user.balance}
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                style={{
                  fontSize: 42, fontWeight: 900, letterSpacing: '-1px',
                  ...GRADIENT_TEXT,
                  marginBottom: 8,
                }}
              >
                {formatNumber(user.balance)}
              </motion.div>
              <div style={{ color: '#e8b84b', fontSize: 13, marginBottom: 24 }}>
                ≈ ${(user.balance * 0.001).toFixed(2)} USD
              </div>

              <div style={{ display: 'flex', gap: 12 }}>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  style={{
                    flex: 1, background: GRADIENT_BORDER, color: '#0a0704',
                    fontWeight: 700, border: 'none', borderRadius: 14,
                    padding: '14px', fontSize: 14, display: 'flex',
                    alignItems: 'center', justifyContent: 'center', gap: 6,
                  }}
                >
                  <ArrowUpRight size={18} /> Withdraw
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  style={{
                    flex: 1, background: 'rgba(255,255,255,0.08)', color: '#f3e6c9',
                    border: '1px solid rgba(232,184,75,0.3)', borderRadius: 14,
                    padding: '14px', fontSize: 14, display: 'flex',
                    alignItems: 'center', justifyContent: 'center', gap: 6,
                  }}
                >
                  <ArrowDownLeft size={18} /> History
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Wallet Address */}
        <div style={{ padding: '24px 24px 0' }}>
          <div style={{ fontSize: 12, fontWeight: 700, ...GRADIENT_TEXT, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1.2 }}>
            Connected Wallet
          </div>
          {hasWallet ? (
            <div style={{ padding: "1px", borderRadius: 18, background: GRADIENT_BORDER }}>
              <div style={{
                background: CARD_BG,
                borderRadius: 16,
                padding: '18px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <WalletIcon size={20} color="#e8b84b" />
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#e8b84b' }}>Wallet Connected</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ flex: 1, fontSize: 13, color: '#c9b38a', fontFamily: 'monospace', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {truncateAddress(user.walletAddress)}
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleCopy}
                    style={{
                      background: 'rgba(232,184,75,0.15)', border: '1px solid #e8b84b',
                      borderRadius: 10, padding: '8px 14px',
                      display: 'flex', alignItems: 'center', gap: 6,
                      color: '#e8b84b', fontWeight: 700,
                    }}
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? 'Copied!' : 'Copy'}
                  </motion.button>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ padding: "1px", borderRadius: 18, background: GRADIENT_BORDER }}>
              <div style={{
                background: CARD_BG,
                borderRadius: 16,
                padding: '28px 24px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 42, marginBottom: 12 }}>🔗</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#f3e6c9', marginBottom: 8 }}>Connect Wallet</div>
                <div style={{ fontSize: 13, color: '#e8b84b', marginBottom: 20 }}>
                  Connect MetaMask or Telegram Wallet to withdraw rewards
                </div>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleConnect}
                  style={{
                    width: '100%', padding: '16px', borderRadius: 14,
                    background: GRADIENT_BORDER, color: '#0a0704',
                    fontWeight: 700, fontSize: 15,
                  }}
                >
                  {connecting ? 'Connecting...' : 'Connect Wallet'}
                </motion.button>
              </div>
            </div>
          )}
        </div>

        {/* Mining Stats */}
        <div style={{ padding: '24px 24px 0' }}>
          <div style={{ fontSize: 12, fontWeight: 700, ...GRADIENT_TEXT, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1.2 }}>
            Mining Stats
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { label: 'Total Mined', value: formatNumber(user.totalMined), icon: '⛏️' },
              { label: 'Referral Earnings', value: formatNumber(user.referralEarnings), icon: '👥' },
              { label: 'Task Rewards', value: formatNumber(575), icon: '📋' },
              { label: 'Spin Winnings', value: formatNumber(500), icon: '🎰' },
            ].map((s, i) => (
              <div key={i} style={{ padding: "1px", borderRadius: 16, background: GRADIENT_BORDER }}>
                <div style={{
                  background: CARD_BG,
                  borderRadius: 14,
                  padding: '16px',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: 22, marginBottom: 8 }}>{s.icon}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: '#f4d99a' }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: '#e8b84b', marginTop: 4 }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div style={{ padding: '24px 24px 0' }}>
          <div style={{ fontSize: 12, fontWeight: 700, ...GRADIENT_TEXT, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1.2 }}>
            Recent Transactions
          </div>
          <div style={{ padding: "1px", borderRadius: 20, background: GRADIENT_BORDER }}>
            <div style={{ background: CARD_BG, borderRadius: 18, padding: '8px 20px' }}>
              {MOCK_TXS.map((tx, i) => (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '16px 0',
                    borderBottom: i < MOCK_TXS.length - 1 ? '1px solid rgba(58,42,18,0.6)' : 'none',
                  }}
                >
                  <div style={{
                    width: 42, height: 42, borderRadius: 12, fontSize: 20,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(232,184,75,0.1)',
                  }}>
                    {txIcons[tx.type]}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#f3e6c9' }}>{tx.label}</div>
                    <div style={{ fontSize: 12, color: '#e8b84b' }}>{tx.time}</div>
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: tx.sign === '+' ? '#5fd66a' : '#ef6a4c' }}>
                    {tx.sign}{formatNumber(tx.amount)}
                  </div>
                </motion.div>
              ))}
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
// import { formatNumber, truncateAddress, copyToClipboard } from '../utils/helpers';
// import { Copy, Check, ArrowUpRight, ArrowDownLeft, Wallet as WalletIcon } from 'lucide-react';

// export default function Wallet() {
//   const { user, setUser } = useApp();
//   const [copied, setCopied] = useState(false);
//   const [connecting, setConnecting] = useState(false);
//   const hasWallet = !!user.walletAddress;
//   const mockAddress = '0x1A2b3C4d5E6f7A8b9C0d1E2f3A4b5C6d7E8f9A0';

//   const handleConnect = () => {
//     setConnecting(true);
//     setTimeout(() => {
//       setUser(prev => ({ ...prev, walletAddress: mockAddress }));
//       setConnecting(false);
//     }, 1500);
//   };

//   const handleCopy = async () => {
//     await copyToClipboard(user.walletAddress || mockAddress);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   const MOCK_TXS = [
//     { id: 1, type: 'mining', label: 'Mining Reward', amount: 200, time: '2h ago', sign: '+' },
//     { id: 2, type: 'referral', label: 'Referral Bonus', amount: 50, time: '5h ago', sign: '+' },
//     { id: 3, type: 'task', label: 'Task Reward', amount: 100, time: '1d ago', sign: '+' },
//     { id: 4, type: 'spin', label: 'Lucky Spin', amount: 500, time: '2d ago', sign: '+' },
//     { id: 5, type: 'withdraw', label: 'Withdrawal', amount: 1000, time: '3d ago', sign: '-' },
//   ];

//   const txIcons = { mining: '⛏️', referral: '👥', task: '📋', spin: '🎰', withdraw: '💸' };

//   return (
//     <div className="page-content">
//       {/* Header */}
//       <div style={{ padding: '20px 20px 0', textAlign: 'center' }}>
//         <div style={{ fontSize: 22, fontWeight: 900 }}>💰 Wallet</div>
//         <div style={{ fontSize: 13, color: '#6b7280', marginTop: 4 }}>
//           Your MINE balance and transaction history
//         </div>
//       </div>

//       {/* Balance Card */}
//       <div style={{ padding: '16px 20px' }}>
//         <div style={{
//           background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
//           border: '1px solid rgba(245,158,11,0.25)',
//           borderRadius: 24, padding: '28px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden',
//         }}>
//           <div style={{
//             position: 'absolute', top: -50, right: -50, width: 150, height: 150,
//             borderRadius: '50%', background: 'rgba(245,158,11,0.06)',
//           }} />
//           <div style={{ fontSize: 14, color: '#9ca3af', marginBottom: 8 }}>💰 MINE Balance</div>
//           <motion.div
//             key={user.balance}
//             initial={{ scale: 1.05 }}
//             animate={{ scale: 1 }}
//             style={{
//               fontSize: 44, fontWeight: 900, letterSpacing: '-1px',
//               background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
//               WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
//               marginBottom: 6,
//             }}
//           >
//             {formatNumber(user.balance)}
//           </motion.div>
//           <div style={{ color: '#6b7280', fontSize: 13, marginBottom: 20 }}>
//             ≈ ${(user.balance * 0.001).toFixed(2)} USD (estimated)
//           </div>

//           {/* Action buttons */}
//           <div style={{ display: 'flex', gap: 10 }}>
//             <motion.button
//               whileTap={{ scale: 0.97 }}
//               onClick={() => {}}
//               style={{
//                 flex: 1, background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
//                 color: '#000', fontWeight: 800, border: 'none',
//                 borderRadius: 12, padding: '12px', cursor: 'pointer', fontSize: 13,
//                 display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
//               }}
//             >
//               <ArrowUpRight size={16} /> Withdraw
//             </motion.button>
//             <motion.button
//               whileTap={{ scale: 0.97 }}
//               style={{
//                 flex: 1, background: 'rgba(255,255,255,0.08)',
//                 color: '#fff', fontWeight: 700, border: '1px solid rgba(255,255,255,0.12)',
//                 borderRadius: 12, padding: '12px', cursor: 'pointer', fontSize: 13,
//                 display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
//               }}
//             >
//               <ArrowDownLeft size={16} /> History
//             </motion.button>
//           </div>
//         </div>
//       </div>

//       {/* Wallet Address */}
//       <div style={{ padding: '0 20px 16px' }}>
//         <div style={{ fontSize: 13, fontWeight: 700, color: '#9ca3af', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.8 }}>
//           Crypto Wallet
//         </div>
//         {hasWallet ? (
//           <div style={{
//             background: '#1a1a2e', border: '1px solid rgba(16,185,129,0.3)',
//             borderRadius: 16, padding: '16px',
//           }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
//               <WalletIcon size={18} color="#10b981" />
//               <span style={{ fontSize: 13, fontWeight: 700, color: '#6ee7b7' }}>Wallet Connected</span>
//             </div>
//             <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
//               <div style={{ flex: 1, fontSize: 12, color: '#9ca3af', fontFamily: 'monospace', overflow: 'hidden', textOverflow: 'ellipsis' }}>
//                 {truncateAddress(user.walletAddress)}
//               </div>
//               <motion.button
//                 whileTap={{ scale: 0.9 }}
//                 onClick={handleCopy}
//                 style={{
//                   background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)',
//                   borderRadius: 8, padding: '6px 12px', cursor: 'pointer',
//                   display: 'flex', alignItems: 'center', gap: 4,
//                   fontSize: 11, fontWeight: 700, color: '#6ee7b7',
//                 }}
//               >
//                 {copied ? <Check size={12} /> : <Copy size={12} />}
//                 {copied ? 'Copied!' : 'Copy'}
//               </motion.button>
//             </div>
//           </div>
//         ) : (
//           <div style={{
//             background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.06)',
//             borderRadius: 16, padding: '20px', textAlign: 'center',
//           }}>
//             <div style={{ fontSize: 36, marginBottom: 12 }}>🔗</div>
//             <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>Connect your wallet</div>
//             <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 16 }}>
//               Connect MetaMask or Telegram Wallet to withdraw
//             </div>
//             <motion.button
//               whileTap={{ scale: 0.97 }}
//               onClick={handleConnect}
//               className="btn-primary"
//               style={{ width: '100%' }}
//             >
//               {connecting ? '🔄 Connecting...' : '🔗 Connect Wallet'}
//             </motion.button>
//           </div>
//         )}
//       </div>

//       {/* Mining Stats */}
//       <div style={{ padding: '0 20px 16px' }}>
//         <div style={{ fontSize: 13, fontWeight: 700, color: '#9ca3af', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.8 }}>
//           Mining Stats
//         </div>
//         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
//           {[
//             { label: 'Total Mined', value: formatNumber(user.totalMined), icon: '⛏️', color: '#f59e0b' },
//             { label: 'Referral Earnings', value: formatNumber(user.referralEarnings), icon: '👥', color: '#10b981' },
//             { label: 'Task Rewards', value: formatNumber(575), icon: '📋', color: '#3b82f6' },
//             { label: 'Spin Winnings', value: formatNumber(500), icon: '🎰', color: '#8b5cf6' },
//           ].map((s) => (
//             <div key={s.label} style={{
//               background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.06)',
//               borderRadius: 14, padding: '14px',
//             }}>
//               <div style={{ fontSize: 20, marginBottom: 6 }}>{s.icon}</div>
//               <div style={{ fontSize: 16, fontWeight: 800, color: s.color }}>{s.value}</div>
//               <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>{s.label}</div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Recent Transactions */}
//       <div style={{ padding: '0 20px 32px' }}>
//         <div style={{ fontSize: 13, fontWeight: 700, color: '#9ca3af', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.8 }}>
//           Recent Transactions
//         </div>
//         {MOCK_TXS.map((tx, i) => (
//           <motion.div
//             key={tx.id}
//             initial={{ opacity: 0, x: -10 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: i * 0.05 }}
//             style={{
//               display: 'flex', alignItems: 'center', gap: 12,
//               padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.04)',
//             }}
//           >
//             <div style={{
//               width: 40, height: 40, borderRadius: 12, fontSize: 18,
//               display: 'flex', alignItems: 'center', justifyContent: 'center',
//               background: 'rgba(255,255,255,0.06)',
//             }}>
//               {txIcons[tx.type]}
//             </div>
//             <div style={{ flex: 1 }}>
//               <div style={{ fontSize: 13, fontWeight: 600 }}>{tx.label}</div>
//               <div style={{ fontSize: 11, color: '#6b7280' }}>{tx.time}</div>
//             </div>
//             <div style={{ fontSize: 14, fontWeight: 800, color: tx.sign === '+' ? '#10b981' : '#ef4444' }}>
//               {tx.sign}{formatNumber(tx.amount)}
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }



// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import {
//   FaWallet,
//   FaCoins,
//   FaLink,
//   FaCopy,
//   FaCheck,
//   FaArrowUp,
//   FaArrowDown,
// } from "react-icons/fa";
// import { useApp } from "../context/AppContext";
// import coinImg from "../assets/coin.png";

// export default function Wallet() {
//   const { user } = useApp();

//   return (
//     <div className="relative min-h-screen bg-[#050505] flex justify-center overflow-hidden">

//       {/* Mobile Container */}
//       <div className="relative w-full max-w-[430px] min-h-screen overflow-hidden">

//         {/* Background */}
//         <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#080808] to-black" />

//         {/* Gold Glow */}
//         <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[450px] h-[450px] rounded-full bg-yellow-500/10 blur-[120px]" />

//         {/* Bottom Glow */}
//         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[350px] h-[350px] rounded-full bg-yellow-500/10 blur-[100px]" />

//         {/* Animated Gold Rays */}
//         <div className="absolute inset-0 overflow-hidden">

//           {[...Array(18)].map((_, i) => (
//             <motion.div
//               key={i}
//               animate={{
//                 opacity: [0.15, 0.8, 0.15],
//                 scaleY: [0.8, 1.15, 0.8],
//               }}
//               transition={{
//                 duration: 3,
//                 repeat: Infinity,
//                 delay: i * 0.08,
//               }}
//               className="absolute top-0 w-[2px]"
//               style={{
//                 left: `${170 + i * 5}px`,
//                 height: "260px",
//                 background:
//                   "linear-gradient(to bottom,#FFD54A,transparent)",
//               }}
//             />
//           ))}

//         </div>

//         {/* Hexagon Pattern Left */}

//         <svg
//           className="absolute left-0 top-48 opacity-20"
//           width="170"
//           height="350"
//         >
//           <defs>
//             <pattern
//               id="hexLeft"
//               width="28"
//               height="24"
//               patternUnits="userSpaceOnUse"
//             >
//               <path
//                 d="M7 2L21 2L28 12L21 22L7 22L0 12Z"
//                 fill="none"
//                 stroke="#FFD54A"
//                 strokeWidth=".6"
//               />
//             </pattern>
//           </defs>

//           <rect
//             width="170"
//             height="350"
//             fill="url(#hexLeft)"
//           />

//         </svg>

//         {/* Hexagon Pattern Right */}

//         <svg
//           className="absolute right-0 top-[320px] opacity-20"
//           width="170"
//           height="350"
//         >
//           <defs>
//             <pattern
//               id="hexRight"
//               width="28"
//               height="24"
//               patternUnits="userSpaceOnUse"
//             >
//               <path
//                 d="M7 2L21 2L28 12L21 22L7 22L0 12Z"
//                 fill="none"
//                 stroke="#FFD54A"
//                 strokeWidth=".6"
//               />
//             </pattern>
//           </defs>

//           <rect
//             width="170"
//             height="350"
//             fill="url(#hexRight)"
//           />

//         </svg>

//         {/* Floating Particles */}

//         {[...Array(30)].map((_, i) => (
//           <motion.div
//             key={i}
//             animate={{
//               opacity: [0, 1, 0],
//               y: [-20, -250],
//             }}
//             transition={{
//               duration: 5 + Math.random() * 4,
//               repeat: Infinity,
//               delay: Math.random() * 5,
//             }}
//             className="absolute rounded-full bg-yellow-400"
//             style={{
//               width: Math.random() * 3 + 1,
//               height: Math.random() * 3 + 1,
//               left: `${Math.random() * 100}%`,
//               bottom: -20,
//             }}
//           />
//         ))}

//         {/* Content */}

//         <div className="relative z-20 px-5 pt-10 pb-10">

//           {/* ===== Header Next Part ===== */}
//           {/* ================= HEADER ================= */}

//           <div className="flex flex-col items-center">

//             <div className="flex items-center gap-2">

//               <FaCoins className="text-yellow-400 text-2xl drop-shadow-[0_0_12px_#FFD54A]" />

//               <h1
//                 className="text-4xl font-black tracking-tight
//       bg-gradient-to-b
//       from-[#FFF9D6]
//       via-[#FFD54A]
//       to-[#B77700]
//       bg-clip-text
//       text-transparent"
//                 style={{ fontFamily: "Orbitron,sans-serif" }}
//               >
//                 Wallet
//               </h1>

//             </div>

//             <p className="mt-2 text-sm text-zinc-400">
//               Your MINE balance and transaction history
//             </p>

//           </div>

//           {/* ================= BALANCE CARD ================= */}

//           <motion.div

//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: .6 }}

//             className="relative mt-8 overflow-hidden rounded-[30px]
//   border border-yellow-500/30
//   bg-[#090909]/95
//   backdrop-blur-xl"

//           >

//             {/* Shine */}

//             <motion.div

//               animate={{
//                 x: ["-150%", "170%"]
//               }}

//               transition={{
//                 duration: 3,
//                 repeat: Infinity,
//                 ease: "linear"
//               }}

//               className="absolute inset-y-0
//     w-20 rotate-12
//     bg-gradient-to-r
//     from-transparent
//     via-white/10
//     to-transparent"

//             />

//             {/* Glow */}

//             <div className="absolute -right-10 -top-10 w-56 h-56 rounded-full bg-yellow-500/10 blur-[80px]" />

//             {/* Top Border */}

//             <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />

//             <div className="relative p-6">

//               <div className="grid grid-cols-2 gap-4 items-center">

//                 {/* LEFT */}

//                 <div>

//                   <div className="flex items-center gap-2 text-yellow-400">

//                     <FaCoins />

//                     <span className="text-sm tracking-wide">
//                       MINE Balance
//                     </span>

//                   </div>

//                   <motion.h2

//                     key={user.balance}

//                     initial={{ scale: 1.1 }}

//                     animate={{ scale: 1 }}

//                     className="mt-5
//           text-6xl
//           font-black
//           leading-none
//           bg-gradient-to-b
//           from-[#FFF9D6]
//           via-[#FFD54A]
//           to-[#B77700]
//           bg-clip-text
//           text-transparent"

//                     style={{
//                       fontFamily: "Orbitron,sans-serif"
//                     }}

//                   >

//                     {user.balance}K

//                   </motion.h2>

//                   <p className="mt-5 text-zinc-400">

//                     ≈ $48.25 USD (estimated)

//                   </p>

//                 </div>

//                 {/* RIGHT */}

//                 <div className="relative flex justify-center">

//                   {/* HUD Rings */}

//                   <motion.div

//                     animate={{ rotate: 360 }}

//                     transition={{
//                       repeat: Infinity,
//                       duration: 20,
//                       ease: "linear"
//                     }}

//                     className="absolute
//           w-52
//           h-52
//           rounded-full
//           border
//           border-yellow-500/20"

//                   />

//                   <motion.div

//                     animate={{ rotate: -360 }}

//                     transition={{
//                       repeat: Infinity,
//                       duration: 14,
//                       ease: "linear"
//                     }}

//                     className="absolute
//           w-44
//           h-44
//           rounded-full
//           border
//           border-dashed
//           border-yellow-500/20"

//                   />

//                   {/* Coin */}

//                   <motion.img

//                     src={coinImg}

//                     animate={{
//                       y: [0, -8, 0],
//                       rotate: [-2, 2, -2]
//                     }}

//                     transition={{
//                       duration: 4,
//                       repeat: Infinity
//                     }}

//                     className="relative z-20
//           w-40
//           h-40
//           object-contain
//           drop-shadow-[0_0_35px_rgba(255,193,7,.9)]"

//                   />

//                 </div>

//               </div>

//               {/* Buttons */}

//               <div className="grid grid-cols-2 gap-4 mt-7">

//                 <button

//                   className="h-14 rounded-2xl
//         font-bold text-black
//         bg-gradient-to-r
//         from-[#A96E00]
//         via-[#FFD54A]
//         to-[#FFF3B0]
//         shadow-[0_0_25px_rgba(255,193,7,.25)]"

//                 >

//                   ↗ Withdraw

//                 </button>

//                 <button

//                   className="h-14 rounded-2xl
//         border border-yellow-500/20
//         bg-[#111111]
//         text-white
//         font-semibold"

//                 >

//                   ↙ History

//                 </button>

//               </div>

//             </div>

//           </motion.div>

//           {/* ===== Wallet Connect Card Part 3 ===== */}

//           {/* ================= CRYPTO WALLET ================= */}

//           <div className="mt-8">

//             {/* Section Title */}

//             <div className="flex items-center gap-3 mb-4">

//               <h3 className="text-yellow-400 font-bold tracking-[3px] uppercase">
//                 Crypto Wallet
//               </h3>

//               <div className="flex-1 h-px bg-gradient-to-r from-yellow-500/60 to-transparent" />

//             </div>

//             <motion.div
//               initial={{ opacity: 0, y: 25 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: .6 }}
//               className="relative overflow-hidden rounded-[28px]
//       border border-yellow-500/30
//       bg-[#090909]/95
//       backdrop-blur-xl"
//             >

//               {/* Glow */}
//               <div className="absolute -left-10 -top-10 w-40 h-40 rounded-full bg-yellow-500/10 blur-[70px]" />

//               {/* Hexagon Left */}
//               <svg
//                 className="absolute left-0 top-0 opacity-10"
//                 width="120"
//                 height="160"
//               >
//                 <defs>
//                   <pattern
//                     id="walletHex1"
//                     width="22"
//                     height="20"
//                     patternUnits="userSpaceOnUse"
//                   >
//                     <path
//                       d="M5 2L16 2L21 10L16 18L5 18L0 10Z"
//                       fill="none"
//                       stroke="#FFD54A"
//                       strokeWidth=".6"
//                     />
//                   </pattern>
//                 </defs>

//                 <rect
//                   width="120"
//                   height="160"
//                   fill="url(#walletHex1)"
//                 />

//               </svg>

//               {/* Hexagon Right */}

//               <svg
//                 className="absolute right-0 bottom-0 opacity-10"
//                 width="120"
//                 height="160"
//               >
//                 <defs>
//                   <pattern
//                     id="walletHex2"
//                     width="22"
//                     height="20"
//                     patternUnits="userSpaceOnUse"
//                   >
//                     <path
//                       d="M5 2L16 2L21 10L16 18L5 18L0 10Z"
//                       fill="none"
//                       stroke="#FFD54A"
//                       strokeWidth=".6"
//                     />
//                   </pattern>
//                 </defs>

//                 <rect
//                   width="120"
//                   height="160"
//                   fill="url(#walletHex2)"
//                 />

//               </svg>

//               <div className="relative p-7">

//                 {/* Icon */}

//                 <motion.div
//                   animate={{
//                     scale: [1, 1.08, 1],
//                     rotate: [-2, 2, -2],
//                   }}
//                   transition={{
//                     duration: 3,
//                     repeat: Infinity,
//                   }}
//                   className="mx-auto
//           w-20
//           h-20
//           rounded-full
//           border
//           border-yellow-500/40
//           flex
//           items-center
//           justify-center
//           bg-gradient-to-b
//           from-[#2a1b00]
//           to-[#090909]
//           shadow-[0_0_30px_rgba(255,193,7,.25)]"
//                 >

//                   <FaLink className="text-yellow-400 text-3xl" />

//                 </motion.div>

//                 {/* Title */}

//                 <h2 className="mt-6 text-center text-3xl font-bold text-white">

//                   {user.walletAddress
//                     ? "Wallet Connected"
//                     : "Connect your wallet"}

//                 </h2>

//                 {/* Subtitle */}

//                 <p className="mt-3 text-center text-zinc-400">

//                   {user.walletAddress
//                     ? "Your wallet is successfully linked."
//                     : "Connect MetaMask or Telegram Wallet to withdraw"}

//                 </p>

//                 {/* Connected */}

//                 {user.walletAddress ? (

//                   <>

//                     <div className="mt-6 rounded-2xl border border-yellow-500/20 bg-[#111111] p-4 flex items-center justify-between">

//                       <span className="font-mono text-yellow-300 text-sm">

//                         {truncateAddress(user.walletAddress)}

//                       </span>

//                       <button
//                         onClick={handleCopy}
//                         className="w-11 h-11 rounded-xl
//               bg-yellow-500/10
//               border border-yellow-500/20
//               flex items-center justify-center"
//                       >

//                         {copied ? (
//                           <FaCheck className="text-green-400" />
//                         ) : (
//                           <FaCopy className="text-yellow-400" />
//                         )}

//                       </button>

//                     </div>

//                   </>

//                 ) : (

//                   <button
//                     onClick={handleConnect}
//                     className="mt-7 w-full h-14 rounded-2xl
//           font-bold
//           text-black
//           bg-gradient-to-r
//           from-[#A96E00]
//           via-[#FFD54A]
//           to-[#FFF3B0]
//           shadow-[0_0_30px_rgba(255,193,7,.25)]"
//                   >

//                     {connecting
//                       ? "Connecting..."
//                       : "🔗 Connect Wallet"}

//                   </button>

//                 )}

//               </div>

//             </motion.div>

//           </div>

//           {/* ===== Mining Stats Part 4 ===== */}

//           {/* ================= MINING STATS ================= */}

//           <div className="mt-8">

//             <div className="flex items-center gap-3 mb-5">

//               <h3 className="text-yellow-400 font-bold tracking-[3px] uppercase">
//                 Mining Stats
//               </h3>

//               <div className="flex-1 h-px bg-gradient-to-r from-yellow-500/60 to-transparent" />

//             </div>

//             <div className="grid grid-cols-2 gap-4">

//               {[
//                 {
//                   title: "Total Mined",
//                   value: formatNumber(user.totalMined),
//                   icon: "⛏️",
//                   color: "from-yellow-500/20 to-yellow-700/10",
//                 },
//                 {
//                   title: "Referral",
//                   value: formatNumber(user.referralEarnings),
//                   icon: "👥",
//                   color: "from-green-500/20 to-green-700/10",
//                 },
//                 {
//                   title: "Tasks",
//                   value: "575",
//                   icon: "📋",
//                   color: "from-blue-500/20 to-blue-700/10",
//                 },
//                 {
//                   title: "Lucky Spin",
//                   value: "500",
//                   icon: "🎰",
//                   color: "from-purple-500/20 to-purple-700/10",
//                 },
//               ].map((item, index) => (

//                 <motion.div

//                   key={index}

//                   whileHover={{
//                     y: -3,
//                     scale: 1.02
//                   }}

//                   whileTap={{
//                     scale: .97
//                   }}

//                   className="
//         relative
//         overflow-hidden
//         rounded-[24px]
//         border
//         border-yellow-500/20
//         bg-[#111111]/95
//         backdrop-blur-xl
//         p-5"

//                 >

//                   {/* Glow */}

//                   <div className={`absolute inset-0 bg-gradient-to-br ${item.color}`} />

//                   {/* Shine */}

//                   <motion.div

//                     animate={{
//                       x: ["-120%", "180%"]
//                     }}

//                     transition={{
//                       repeat: Infinity,
//                       duration: 3,
//                       ease: "linear"
//                     }}

//                     className="
//           absolute
//           inset-y-0
//           w-14
//           rotate-12
//           bg-gradient-to-r
//           from-transparent
//           via-white/10
//           to-transparent"

//                   />

//                   {/* HUD Ring */}

//                   <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full border border-yellow-500/10" />

//                   <div className="relative">

//                     {/* Icon */}

//                     <div
//                       className="
//             w-14
//             h-14
//             rounded-2xl
//             bg-gradient-to-b
//             from-[#2A1C00]
//             to-[#0B0B0B]
//             border
//             border-yellow-500/30
//             flex
//             items-center
//             justify-center
//             text-3xl
//             shadow-[0_0_20px_rgba(255,193,7,.2)]"
//                     >

//                       {item.icon}

//                     </div>

//                     {/* Value */}

//                     <h2
//                       className="
//             mt-5
//             text-2xl
//             font-black
//             bg-gradient-to-b
//             from-[#FFF8CC]
//             via-[#FFD54A]
//             to-[#B77700]
//             bg-clip-text
//             text-transparent"
//                     >

//                       {item.value}

//                     </h2>

//                     {/* Label */}

//                     <p
//                       className="
//             mt-2
//             text-[12px]
//             uppercase
//             tracking-[2px]
//             text-zinc-400"
//                     >

//                       {item.title}

//                     </p>

//                   </div>

//                 </motion.div>

//               ))}

//             </div>

//           </div>

//           {/* ================= EARN MORE ================= */}

//           <motion.div

//             whileHover={{
//               scale: 1.01
//             }}

//             className="
//   relative
//   mt-8
//   overflow-hidden
//   rounded-[28px]
//   border
//   border-yellow-500/25
//   bg-gradient-to-r
//   from-[#161100]
//   via-[#241800]
//   to-[#161100]
//   p-6"

//           >

//             <div className="absolute -right-12 -top-12 w-44 h-44 rounded-full bg-yellow-500/10 blur-[90px]" />

//             <div className="relative flex items-center justify-between">

//               <div>

//                 <p className="uppercase tracking-[4px] text-yellow-400 text-xs">

//                   Boost Mining

//                 </p>

//                 <h2
//                   className="
//         mt-2
//         text-3xl
//         font-black
//         bg-gradient-to-b
//         from-[#FFF8CC]
//         via-[#FFD54A]
//         to-[#B77700]
//         bg-clip-text
//         text-transparent"
//                 >

//                   Earn Faster

//                 </h2>

//                 <p className="mt-3 text-zinc-300">

//                   Upgrade your miner and increase your hourly reward.

//                 </p>

//               </div>

//               <div className="text-6xl">

//                 ⚡

//               </div>

//             </div>

//             <button
//               className="
//     mt-6
//     h-14
//     w-full
//     rounded-2xl
//     bg-gradient-to-r
//     from-[#A96E00]
//     via-[#FFD54A]
//     to-[#FFF3B0]
//     font-bold
//     text-black"
//             >

//               Upgrade Miner

//             </button>

//           </motion.div>

//           {/* ===== Recent Transactions Part 5 ===== */}

//           {/* ================= RECENT TRANSACTIONS ================= */}

//           <div className="mt-8 pb-32">

//             <div className="flex items-center gap-3 mb-5">

//               <h3 className="text-yellow-400 font-bold tracking-[3px] uppercase">
//                 Recent Transactions
//               </h3>

//               <div className="flex-1 h-px bg-gradient-to-r from-yellow-500/60 to-transparent" />

//             </div>

//             {MOCK_TXS.map((tx, index) => (

//               <motion.div

//                 key={tx.id}

//                 initial={{ opacity: 0, x: -25 }}

//                 animate={{ opacity: 1, x: 0 }}

//                 transition={{
//                   delay: index * .08
//                 }}

//                 whileHover={{
//                   scale: 1.01
//                 }}

//                 className="
//       relative
//       overflow-hidden
//       rounded-[22px]
//       border
//       border-yellow-500/15
//       bg-[#101010]/90
//       backdrop-blur-xl
//       p-4
//       mb-4"

//               >

//                 {/* Glow */}

//                 <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 via-transparent to-transparent" />

//                 {/* Shine */}

//                 <motion.div

//                   animate={{
//                     x: ["-120%", "180%"]
//                   }}

//                   transition={{
//                     duration: 3,
//                     repeat: Infinity,
//                     ease: "linear"
//                   }}

//                   className="
//         absolute
//         inset-y-0
//         w-20
//         rotate-12
//         bg-gradient-to-r
//         from-transparent
//         via-white/10
//         to-transparent"

//                 />

//                 <div className="relative flex items-center">

//                   {/* Icon */}

//                   <div
//                     className="
//           w-14
//           h-14
//           rounded-2xl
//           bg-gradient-to-b
//           from-[#2A1C00]
//           to-[#090909]
//           border
//           border-yellow-500/20
//           flex
//           items-center
//           justify-center
//           text-2xl
//           shadow-[0_0_18px_rgba(255,193,7,.15)]"
//                   >

//                     {txIcons[tx.type]}

//                   </div>

//                   {/* Info */}

//                   <div className="ml-4 flex-1">

//                     <h3 className="font-bold text-white">

//                       {tx.label}

//                     </h3>

//                     <p className="text-zinc-500 text-sm mt-1">

//                       {tx.time}

//                     </p>

//                   </div>

//                   {/* Amount */}

//                   <div className="text-right">

//                     <h2
//                       className={`text-lg font-black ${tx.sign === "+"
//                           ? "text-green-400"
//                           : "text-red-400"
//                         }`}
//                     >

//                       {tx.sign}
//                       {formatNumber(tx.amount)}

//                     </h2>

//                     <div
//                       className={`
//             mt-2
//             px-3
//             py-1
//             rounded-full
//             text-[10px]
//             font-bold
//             inline-block
//             ${tx.sign === "+"
//                           ? "bg-green-500/10 text-green-400 border border-green-500/20"
//                           : "bg-red-500/10 text-red-400 border border-red-500/20"
//                         }
//           `}
//                     >

//                       {tx.sign === "+"
//                         ? "Completed"
//                         : "Withdraw"}

//                     </div>

//                   </div>

//                 </div>

//               </motion.div>

//             ))}

//           </div>

//           {/* ================= FINAL HUD EFFECT ================= */}

//           <div className="pointer-events-none absolute inset-0 overflow-hidden">

//             {/* Top Glow */}

//             <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[420px] h-[180px] bg-yellow-500/10 blur-[120px]" />

//             {/* Bottom Glow */}

//             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[380px] h-[180px] bg-yellow-500/10 blur-[100px]" />

//             {/* Left Glow */}

//             <div className="absolute left-0 top-1/3 w-20 h-64 bg-yellow-500/5 blur-[80px]" />

//             {/* Right Glow */}

//             <div className="absolute right-0 top-1/2 w-20 h-64 bg-yellow-500/5 blur-[80px]" />

//             {/* Rotating HUD Ring */}

//             <motion.div

//               animate={{
//                 rotate: 360
//               }}

//               transition={{
//                 repeat: Infinity,
//                 duration: 60,
//                 ease: "linear"
//               }}

//               className="
//     absolute
//     left-1/2
//     top-44
//     -translate-x-1/2
//     w-[520px]
//     h-[520px]
//     rounded-full
//     border
//     border-yellow-500/5"

//             />

//             {/* Second Ring */}

//             <motion.div

//               animate={{
//                 rotate: -360
//               }}

//               transition={{
//                 repeat: Infinity,
//                 duration: 40,
//                 ease: "linear"
//               }}

//               className="
//     absolute
//     left-1/2
//     top-52
//     -translate-x-1/2
//     w-[380px]
//     h-[380px]
//     rounded-full
//     border
//     border-dashed
//     border-yellow-500/10"

//             />

//           </div>


//         </div>

//       </div>

//     </div>
//   );
// }
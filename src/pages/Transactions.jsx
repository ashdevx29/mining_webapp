import React from 'react';
import { motion } from 'framer-motion';
import { formatNumber } from '../utils/helpers';
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

const MOCK_TXS = [
  { id: 1, type: 'mining', label: 'Mining Reward', amount: 200, time: '2h ago', sign: '+', status: 'completed' },
  { id: 2, type: 'referral', label: 'Referral Bonus', amount: 50, time: '5h ago', sign: '+', status: 'completed' },
  { id: 3, type: 'task', label: 'Task: Follow Twitter', amount: 100, time: '1d ago', sign: '+', status: 'completed' },
  { id: 4, type: 'spin', label: 'Lucky Spin Win', amount: 500, time: '2d ago', sign: '+', status: 'completed' },
  { id: 5, type: 'withdraw', label: 'Withdrawal to BSC', amount: 1000, time: '3d ago', sign: '-', status: 'completed' },
  { id: 6, type: 'mining', label: 'Mining Reward', amount: 200, time: '3d ago', sign: '+', status: 'completed' },
  { id: 7, type: 'checkin', label: 'Daily Check-in Day 5', amount: 300, time: '4d ago', sign: '+', status: 'completed' },
  { id: 8, type: 'withdraw', label: 'Withdrawal to ETH', amount: 500, time: '5d ago', sign: '-', status: 'pending' },
  { id: 9, type: 'referral', label: 'Referral Commission', amount: 120, time: '6d ago', sign: '+', status: 'completed' },
  { id: 10, type: 'mining', label: 'Mining Reward', amount: 200, time: '7d ago', sign: '+', status: 'completed' },
  { id: 11, type: 'task', label: 'Task: Join Telegram', amount: 200, time: '1w ago', sign: '+', status: 'completed' },
  { id: 12, type: 'checkin', label: 'Daily Check-in Day 4', amount: 200, time: '1w ago', sign: '+', status: 'completed' },
];

const TYPE_ICONS = { mining: '⛏️', referral: '👥', task: '📋', spin: '🎰', withdraw: '💸', checkin: '🔥' };
const TYPE_COLORS = { mining: '#e8b84b', referral: '#5fd66a', task: '#60a5fa', spin: '#c084fc', withdraw: '#ef4444', checkin: '#f43f5e' };

export default function Transactions() {
  const totalIn = MOCK_TXS.filter(t => t.sign === '+').reduce((s, t) => s + t.amount, 0);
  const totalOut = MOCK_TXS.filter(t => t.sign === '-').reduce((s, t) => s + t.amount, 0);

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
          <div style={{ ...GRADIENT_TEXT, fontSize: 24, fontWeight: 700 }}>📊 Transactions</div>
          <div style={{ fontSize: 13, color: '#e8b84b', marginTop: 6 }}>All your activity</div>
        </div>

        {/* Summary Cards */}
        <div style={{ padding: '20px 24px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ padding: "1px", borderRadius: 18, background: GRADIENT_BORDER }}>
              <div style={{
                background: CARD_BG,
                borderRadius: 16,
                padding: '18px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 12, color: '#e8b84b', textTransform: 'uppercase', letterSpacing: 0.8 }}>Total In</div>
                <div style={{ fontSize: 26, fontWeight: 800, color: '#5fd66a' }}>+{formatNumber(totalIn)}</div>
              </div>
            </div>

            <div style={{ padding: "1px", borderRadius: 18, background: GRADIENT_BORDER }}>
              <div style={{
                background: CARD_BG,
                borderRadius: 16,
                padding: '18px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 12, color: '#e8b84b', textTransform: 'uppercase', letterSpacing: 0.8 }}>Total Out</div>
                <div style={{ fontSize: 26, fontWeight: 800, color: '#ef4444' }}>-{formatNumber(totalOut)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Transactions List */}
        <div style={{ padding: '20px 24px 40px' }}>
          {MOCK_TXS.map((tx, i) => (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i, 8) * 0.04 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '14px 0',
                borderBottom: '1px solid rgba(58,42,18,0.6)',
              }}
            >
              <div style={{
                width: 46,
                height: 46,
                borderRadius: 14,
                fontSize: 22,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: `${TYPE_COLORS[tx.type]}15`,
                flexShrink: 0,
              }}>
                {TYPE_ICONS[tx.type]}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#f3e6c9' }}>{tx.label}</div>
                <div style={{ fontSize: 12, color: '#e8b84b', marginTop: 2 }}>
                  {tx.time}
                  {tx.status === 'pending' && (
                    <span style={{
                      marginLeft: 8,
                      fontSize: 10,
                      fontWeight: 700,
                      padding: '1px 6px',
                      borderRadius: 99,
                      background: 'rgba(245,158,11,0.15)',
                      color: '#e8b84b',
                    }}>PENDING</span>
                  )}
                </div>
              </div>
              <div style={{
                fontSize: 15,
                fontWeight: 800,
                color: tx.sign === '+' ? '#5fd66a' : '#ef4444',
              }}>
                {tx.sign}{formatNumber(tx.amount)}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Spacer */}
        <div style={{ height: 60 }} />

      </div>
    </div>
  );
}



// import React from 'react';
// import { motion } from 'framer-motion';
// import { formatNumber } from '../utils/helpers';

// const MOCK_TXS = [
//   { id: 1, type: 'mining', label: 'Mining Reward', amount: 200, time: '2h ago', sign: '+', status: 'completed' },
//   { id: 2, type: 'referral', label: 'Referral Bonus', amount: 50, time: '5h ago', sign: '+', status: 'completed' },
//   { id: 3, type: 'task', label: 'Task: Follow Twitter', amount: 100, time: '1d ago', sign: '+', status: 'completed' },
//   { id: 4, type: 'spin', label: 'Lucky Spin Win', amount: 500, time: '2d ago', sign: '+', status: 'completed' },
//   { id: 5, type: 'withdraw', label: 'Withdrawal to BSC', amount: 1000, time: '3d ago', sign: '-', status: 'completed' },
//   { id: 6, type: 'mining', label: 'Mining Reward', amount: 200, time: '3d ago', sign: '+', status: 'completed' },
//   { id: 7, type: 'checkin', label: 'Daily Check-in Day 5', amount: 300, time: '4d ago', sign: '+', status: 'completed' },
//   { id: 8, type: 'withdraw', label: 'Withdrawal to ETH', amount: 500, time: '5d ago', sign: '-', status: 'pending' },
//   { id: 9, type: 'referral', label: 'Referral Commission', amount: 120, time: '6d ago', sign: '+', status: 'completed' },
//   { id: 10, type: 'mining', label: 'Mining Reward', amount: 200, time: '7d ago', sign: '+', status: 'completed' },
//   { id: 11, type: 'task', label: 'Task: Join Telegram', amount: 200, time: '1w ago', sign: '+', status: 'completed' },
//   { id: 12, type: 'checkin', label: 'Daily Check-in Day 4', amount: 200, time: '1w ago', sign: '+', status: 'completed' },
// ];

// const TYPE_ICONS = { mining: '⛏️', referral: '👥', task: '📋', spin: '🎰', withdraw: '💸', checkin: '🔥' };
// const TYPE_COLORS = { mining: '#f59e0b', referral: '#10b981', task: '#3b82f6', spin: '#8b5cf6', withdraw: '#ef4444', checkin: '#f43f5e' };

// export default function Transactions() {
//   const totalIn = MOCK_TXS.filter(t => t.sign === '+').reduce((s, t) => s + t.amount, 0);
//   const totalOut = MOCK_TXS.filter(t => t.sign === '-').reduce((s, t) => s + t.amount, 0);

//   return (
//     <div className="page-content">
//       <div style={{ padding: '20px 20px 0', textAlign: 'center' }}>
//         <div style={{ fontSize: 22, fontWeight: 900 }}>📊 Transactions</div>
//         <div style={{ fontSize: 13, color: '#6b7280', marginTop: 4 }}>All your activity</div>
//       </div>

//       {/* Summary */}
//       <div style={{ padding: '16px 20px' }}>
//         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
//           <div style={{
//             background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)',
//             borderRadius: 16, padding: '16px', textAlign: 'center',
//           }}>
//             <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>Total In</div>
//             <div style={{ fontSize: 20, fontWeight: 900, color: '#10b981' }}>+{formatNumber(totalIn)}</div>
//           </div>
//           <div style={{
//             background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)',
//             borderRadius: 16, padding: '16px', textAlign: 'center',
//           }}>
//             <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>Total Out</div>
//             <div style={{ fontSize: 20, fontWeight: 900, color: '#ef4444' }}>-{formatNumber(totalOut)}</div>
//           </div>
//         </div>
//       </div>

//       {/* List */}
//       <div style={{ padding: '0 20px 32px' }}>
//         {MOCK_TXS.map((tx, i) => (
//           <motion.div
//             key={tx.id}
//             initial={{ opacity: 0, y: 8 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: Math.min(i, 8) * 0.04 }}
//             style={{
//               display: 'flex', alignItems: 'center', gap: 12,
//               padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.04)',
//             }}
//           >
//             <div style={{
//               width: 44, height: 44, borderRadius: 14, fontSize: 20,
//               display: 'flex', alignItems: 'center', justifyContent: 'center',
//               background: `${TYPE_COLORS[tx.type]}15`, flexShrink: 0,
//             }}>
//               {TYPE_ICONS[tx.type]}
//             </div>
//             <div style={{ flex: 1 }}>
//               <div style={{ fontSize: 13, fontWeight: 600 }}>{tx.label}</div>
//               <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 3 }}>
//                 <span style={{ fontSize: 11, color: '#6b7280' }}>{tx.time}</span>
//                 {tx.status === 'pending' && (
//                   <span style={{
//                     fontSize: 9, fontWeight: 700, padding: '1px 6px', borderRadius: 99,
//                     background: 'rgba(245,158,11,0.1)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.25)',
//                   }}>PENDING</span>
//                 )}
//               </div>
//             </div>
//             <div style={{
//               fontSize: 15, fontWeight: 800,
//               color: tx.sign === '+' ? '#10b981' : '#ef4444',
//             }}>
//               {tx.sign}{formatNumber(tx.amount)}
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }

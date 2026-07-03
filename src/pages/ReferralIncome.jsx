import React from 'react';
import { motion } from 'framer-motion';
import { formatNumber } from '../utils/helpers';
import { TrendingUp } from 'lucide-react';
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

const WEEKLY_DATA = [
  { day: 'Mon', amount: 120 },
  { day: 'Tue', amount: 80 },
  { day: 'Wed', amount: 200 },
  { day: 'Thu', amount: 60 },
  { day: 'Fri', amount: 340 },
  { day: 'Sat', amount: 180 },
  { day: 'Sun', amount: 250 },
];

const MAX_VAL = Math.max(...WEEKLY_DATA.map(d => d.amount));

const REFERRAL_INCOME = [
  { id: 1, from: 'John D.', type: 'Direct Bonus', amount: 50, time: '2h ago' },
  { id: 2, from: 'John D.', type: '10% Commission', amount: 18, time: '8h ago' },
  { id: 3, from: 'Sarah M.', type: '10% Commission', amount: 8, time: '1d ago' },
  { id: 4, from: 'Mike R.', type: '10% Commission', amount: 22, time: '2d ago' },
  { id: 5, from: 'Anna K.', type: 'Direct Bonus', amount: 50, time: '3d ago' },
  { id: 6, from: 'Mike R.', type: '10% Commission', amount: 20, time: '3d ago' },
  { id: 7, from: 'Tom L.', type: 'Direct Bonus', amount: 50, time: '1w ago' },
];

export default function ReferralIncome() {
  const totalThisWeek = WEEKLY_DATA.reduce((s, d) => s + d.amount, 0);

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
          <div style={{ ...GRADIENT_TEXT, fontSize: 24, fontWeight: 700 }}>💵 Referral Income</div>
          <div style={{ fontSize: 13, color: '#e8b84b', marginTop: 6 }}>
            Your passive earnings from referrals
          </div>
        </div>

        {/* Summary Cards */}
        <div style={{ padding: '20px 24px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <div style={{ padding: "1px", borderRadius: 18, background: GRADIENT_BORDER }}>
              <div style={{
                background: CARD_BG,
                borderRadius: 16,
                padding: '18px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 12, color: '#e8b84b', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 4 }}>Total Earned</div>
                <div style={{ fontSize: 26, fontWeight: 800, color: '#5fd66a' }}>4,600</div>
                <div style={{ fontSize: 11, color: '#e8b84b' }}>MINE</div>
              </div>
            </div>

            <div style={{ padding: "1px", borderRadius: 18, background: GRADIENT_BORDER }}>
              <div style={{
                background: CARD_BG,
                borderRadius: 16,
                padding: '18px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 12, color: '#e8b84b', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 4 }}>This Week</div>
                <div style={{ fontSize: 26, fontWeight: 800, ...GRADIENT_TEXT }}>{totalThisWeek}</div>
                <div style={{ fontSize: 11, color: '#e8b84b' }}>MINE</div>
              </div>
            </div>
          </div>

          {/* Active Referrals */}
          <div style={{ padding: "1px", borderRadius: 18, background: GRADIENT_BORDER }}>
            <div style={{
              background: CARD_BG,
              borderRadius: 16,
              padding: '16px 20px',
              display: 'flex', alignItems: 'center', gap: 14,
            }}>
              <TrendingUp size={24} color="#e8b84b" />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#f3e6c9' }}>Active Referrals: 3/23</div>
                <div style={{ fontSize: 12, color: '#e8b84b' }}>3 friends mined in the last 24 hours</div>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Earnings Chart */}
        <div style={{ padding: '24px 24px 0' }}>
          <div style={{ fontSize: 12, fontWeight: 700, ...GRADIENT_TEXT, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1.2 }}>
            Weekly Earnings
          </div>
          <div style={{ padding: "1px", borderRadius: 20, background: GRADIENT_BORDER }}>
            <div style={{
              background: CARD_BG,
              borderRadius: 18,
              padding: '20px 16px',
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 110, justifyContent: 'space-around' }}>
                {WEEKLY_DATA.map((d, i) => (
                  <div key={d.day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(d.amount / MAX_VAL) * 85}px` }}
                      transition={{ delay: i * 0.07, duration: 0.6 }}
                      style={{
                        width: '100%', borderRadius: '8px 8px 0 0',
                        background: 'linear-gradient(180deg, #e8b84b, #d97706)',
                        minHeight: 6,
                      }}
                    />
                    <div style={{ fontSize: 10, color: '#e8b84b', fontWeight: 600 }}>{d.day}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Income History */}
        <div style={{ padding: '24px 24px 40px' }}>
          <div style={{ fontSize: 12, fontWeight: 700, ...GRADIENT_TEXT, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1.2 }}>
            Income History
          </div>
          {REFERRAL_INCOME.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '14px 0', borderBottom: '1px solid rgba(58,42,18,0.6)',
              }}
            >
              <div style={{
                width: 42, height: 42, borderRadius: 12, fontSize: 17, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(16,185,129,0.15)', color: '#5fd66a', flexShrink: 0,
              }}>
                {item.from[0]}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#f3e6c9' }}>{item.from}</div>
                <div style={{ fontSize: 12, color: '#e8b84b' }}>{item.type} • {item.time}</div>
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#5fd66a' }}>
                +{item.amount}
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
// import { TrendingUp } from 'lucide-react';

// const WEEKLY_DATA = [
//   { day: 'Mon', amount: 120 },
//   { day: 'Tue', amount: 80 },
//   { day: 'Wed', amount: 200 },
//   { day: 'Thu', amount: 60 },
//   { day: 'Fri', amount: 340 },
//   { day: 'Sat', amount: 180 },
//   { day: 'Sun', amount: 250 },
// ];

// const MAX_VAL = Math.max(...WEEKLY_DATA.map(d => d.amount));

// const REFERRAL_INCOME = [
//   { id: 1, from: 'John D.', type: 'Direct Bonus', amount: 50, time: '2h ago' },
//   { id: 2, from: 'John D.', type: '10% Commission', amount: 18, time: '8h ago' },
//   { id: 3, from: 'Sarah M.', type: '10% Commission', amount: 8, time: '1d ago' },
//   { id: 4, from: 'Mike R.', type: '10% Commission', amount: 22, time: '2d ago' },
//   { id: 5, from: 'Anna K.', type: 'Direct Bonus', amount: 50, time: '3d ago' },
//   { id: 6, from: 'Mike R.', type: '10% Commission', amount: 20, time: '3d ago' },
//   { id: 7, from: 'Tom L.', type: 'Direct Bonus', amount: 50, time: '1w ago' },
// ];

// export default function ReferralIncome() {
//   const totalThisWeek = WEEKLY_DATA.reduce((s, d) => s + d.amount, 0);

//   return (
//     <div className="page-content">
//       <div style={{ padding: '20px 20px 0', textAlign: 'center' }}>
//         <div style={{ fontSize: 22, fontWeight: 900 }}>💵 Referral Income</div>
//         <div style={{ fontSize: 13, color: '#6b7280', marginTop: 4 }}>
//           Your passive earnings from referrals
//         </div>
//       </div>

//       {/* Summary cards */}
//       <div style={{ padding: '16px 20px' }}>
//         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
//           <div style={{
//             background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)',
//             borderRadius: 16, padding: '16px', textAlign: 'center',
//           }}>
//             <div style={{ fontSize: 11, color: '#6b7280', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>Total Earned</div>
//             <div style={{ fontSize: 22, fontWeight: 900, color: '#10b981' }}>4,600</div>
//             <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>MINE</div>
//           </div>
//           <div style={{
//             background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)',
//             borderRadius: 16, padding: '16px', textAlign: 'center',
//           }}>
//             <div style={{ fontSize: 11, color: '#6b7280', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>This Week</div>
//             <div style={{ fontSize: 22, fontWeight: 900, color: '#fbbf24' }}>{totalThisWeek}</div>
//             <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>MINE</div>
//           </div>
//         </div>
//         <div style={{
//           background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)',
//           borderRadius: 16, padding: '14px 16px',
//           display: 'flex', alignItems: 'center', gap: 10,
//         }}>
//           <TrendingUp size={20} color="#60a5fa" />
//           <div>
//             <div style={{ fontSize: 13, fontWeight: 700 }}>Active Referrals: 3/23</div>
//             <div style={{ fontSize: 11, color: '#9ca3af' }}>3 friends mined in the last 24 hours</div>
//           </div>
//         </div>
//       </div>

//       {/* Bar chart */}
//       <div style={{ padding: '0 20px 16px' }}>
//         <div style={{ fontSize: 13, fontWeight: 700, color: '#9ca3af', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.8 }}>
//           Weekly Earnings
//         </div>
//         <div style={{
//           background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.06)',
//           borderRadius: 16, padding: '16px',
//         }}>
//           <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 100, justifyContent: 'space-around' }}>
//             {WEEKLY_DATA.map((d, i) => (
//               <div key={d.day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
//                 <motion.div
//                   initial={{ height: 0 }}
//                   animate={{ height: `${(d.amount / MAX_VAL) * 80}px` }}
//                   transition={{ delay: i * 0.06, duration: 0.5, ease: 'easeOut' }}
//                   style={{
//                     width: '100%', borderRadius: '6px 6px 0 0',
//                     background: `linear-gradient(180deg, #f59e0b, #d97706)`,
//                     minHeight: 4,
//                   }}
//                 />
//                 <div style={{ fontSize: 9, color: '#6b7280', fontWeight: 600 }}>{d.day}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Income list */}
//       <div style={{ padding: '0 20px 32px' }}>
//         <div style={{ fontSize: 13, fontWeight: 700, color: '#9ca3af', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.8 }}>
//           Income History
//         </div>
//         {REFERRAL_INCOME.map((item, i) => (
//           <motion.div
//             key={item.id}
//             initial={{ opacity: 0, x: -10 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: i * 0.04 }}
//             style={{
//               display: 'flex', alignItems: 'center', gap: 12,
//               padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.04)',
//             }}
//           >
//             <div style={{
//               width: 40, height: 40, borderRadius: 12, fontSize: 16,
//               display: 'flex', alignItems: 'center', justifyContent: 'center',
//               background: 'rgba(16,185,129,0.1)', flexShrink: 0, fontWeight: 800,
//               color: '#10b981',
//             }}>
//               {item.from[0]}
//             </div>
//             <div style={{ flex: 1 }}>
//               <div style={{ fontSize: 13, fontWeight: 600 }}>{item.from}</div>
//               <div style={{ fontSize: 11, color: '#6b7280' }}>{item.type} · {item.time}</div>
//             </div>
//             <div style={{ fontSize: 14, fontWeight: 800, color: '#10b981' }}>
//               +{item.amount}
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }

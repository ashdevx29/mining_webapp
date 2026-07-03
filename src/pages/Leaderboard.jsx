import React from 'react';
import { motion } from 'framer-motion';
import { formatNumber } from '../utils/helpers';
import { Trophy, Zap, Crown } from 'lucide-react';
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

const TOP_MINERS = [
  { rank: 1, name: 'CryptoKing99', totalMined: 2500000, level: 12, badge: '👑' },
  { rank: 2, name: 'MineQueen', totalMined: 2100000, level: 11, badge: '🥈' },
  { rank: 3, name: 'BlockBoss', totalMined: 1850000, level: 10, badge: '🥉' },
  { rank: 4, name: 'HashMaster', totalMined: 1500000, level: 9, badge: '⚡' },
  { rank: 5, name: 'CoinLord', totalMined: 1200000, level: 9, badge: '💎' },
  { rank: 6, name: 'DiamondHands', totalMined: 980000, level: 8, badge: '🔥' },
  { rank: 7, name: 'MoonMiner', totalMined: 850000, level: 8, badge: '🌙' },
  { rank: 8, name: 'GoldRush', totalMined: 720000, level: 7, badge: '🏆' },
  { rank: 9, name: 'StakeBro', totalMined: 600000, level: 7, badge: '⭐' },
  { rank: 10, name: 'HashHero', totalMined: 500000, level: 6, badge: '🎯' },
  { rank: 142, name: 'Alex (You)', totalMined: 182500, level: 7, badge: '⛏️', isMe: true },
];

export default function Leaderboard() {
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
          <div style={{ ...GRADIENT_TEXT, fontSize: 24, fontWeight: 700 }}>🏆 Leaderboard</div>
          <div style={{ fontSize: 13, color: '#e8b84b', marginTop: 6 }}>
            Top miners this week
          </div>
        </div>

        {/* Top 3 Podium */}
        <div style={{ padding: '20px 24px 0' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 12 }}>
            {/* 2nd Place */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{ flex: 1, textAlign: 'center' }}
            >
              <div style={{ fontSize: 32, marginBottom: 8 }}>🥈</div>
              <div style={{
                width: 54, height: 54, borderRadius: '50%', margin: '0 auto 8px',
                background: 'linear-gradient(135deg, #9ca3af, #6b7280)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22, fontWeight: 800, color: '#fff',
                border: '3px solid rgba(156,163,175,0.5)',
              }}>
                {TOP_MINERS[1].name[0]}
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#9ca3af' }}>
                {TOP_MINERS[1].name}
              </div>
              <div style={{ fontSize: 11, color: '#e8b84b' }}>{formatNumber(TOP_MINERS[1].totalMined)}</div>
              <div style={{
                background: CARD_BG, border: '1px solid #9ca3af',
                borderRadius: '12px 12px 0 0', padding: '10px 0', marginTop: 10,
                height: 58, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, fontWeight: 900, color: '#9ca3af',
              }}>2</div>
            </motion.div>

            {/* 1st Place */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0 }}
              style={{ flex: 1, textAlign: 'center' }}
            >
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ fontSize: 40, marginBottom: 8 }}
              >👑</motion.div>
              <div style={{
                width: 68, height: 68, borderRadius: '50%', margin: '0 auto 8px',
                background: GRADIENT_BORDER,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 28, fontWeight: 900, color: '#000',
                border: '4px solid #e8b84b',
                boxShadow: '0 0 30px rgba(232,184,75,0.6)',
              }}>
                {TOP_MINERS[0].name[0]}
              </div>
              <div style={{ fontSize: 13, fontWeight: 800, ...GRADIENT_TEXT }}>
                {TOP_MINERS[0].name}
              </div>
              <div style={{ fontSize: 11, color: '#e8b84b' }}>{formatNumber(TOP_MINERS[0].totalMined)}</div>
              <div style={{
                background: CARD_BG, border: '1px solid #e8b84b',
                borderRadius: '12px 12px 0 0', padding: '12px 0', marginTop: 10,
                height: 88, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 26, fontWeight: 900, ...GRADIENT_TEXT,
              }}>1</div>
            </motion.div>

            {/* 3rd Place */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ flex: 1, textAlign: 'center' }}
            >
              <div style={{ fontSize: 32, marginBottom: 8 }}>🥉</div>
              <div style={{
                width: 54, height: 54, borderRadius: '50%', margin: '0 auto 8px',
                background: 'linear-gradient(135deg, #cd7c35, #a16207)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22, fontWeight: 800, color: '#fff',
                border: '3px solid rgba(205,124,53,0.5)',
              }}>
                {TOP_MINERS[2].name[0]}
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#cd7c35' }}>
                {TOP_MINERS[2].name}
              </div>
              <div style={{ fontSize: 11, color: '#e8b84b' }}>{formatNumber(TOP_MINERS[2].totalMined)}</div>
              <div style={{
                background: CARD_BG, border: '1px solid #cd7c35',
                borderRadius: '12px 12px 0 0', padding: '10px 0', marginTop: 10,
                height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, fontWeight: 900, color: '#cd7c35',
              }}>3</div>
            </motion.div>
          </div>
        </div>

        {/* My Rank */}
        <div style={{ padding: '20px 24px 0' }}>
          <div style={{ padding: "1px", borderRadius: 18, background: GRADIENT_BORDER }}>
            <div style={{
              background: CARD_BG,
              borderRadius: 16,
              padding: '16px 20px',
              display: 'flex', alignItems: 'center', gap: 14,
            }}>
              <Trophy size={24} color="#e8b84b" />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#f3e6c9' }}>Your Current Rank</div>
                <div style={{ fontSize: 12, color: '#e8b84b' }}>Keep mining to climb higher!</div>
              </div>
              <div style={{ fontSize: 26, fontWeight: 800, ...GRADIENT_TEXT }}>#142</div>
            </div>
          </div>
        </div>

        {/* Full Leaderboard List */}
        <div style={{ padding: '24px 24px 40px' }}>
          <div style={{ fontSize: 12, fontWeight: 700, ...GRADIENT_TEXT, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1.2 }}>
            Top Miners
          </div>
          {TOP_MINERS.map((miner, i) => (
            <React.Fragment key={miner.rank}>
              {i === 10 && (
                <div style={{ textAlign: 'center', padding: '12px 0', color: '#6b5730', fontSize: 14 }}>• • •</div>
              )}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: Math.min(i, 8) * 0.04 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '14px 16px', marginBottom: 10,
                  background: miner.isMe ? 'rgba(232,184,75,0.1)' : CARD_BG,
                  border: miner.isMe ? `1px solid #e8b84b` : '1px solid rgba(58,42,18,0.8)',
                  borderRadius: 16,
                }}
              >
                <div style={{ width: 32, textAlign: 'center', fontSize: 15, fontWeight: 800, color: miner.rank <= 3 ? '#e8b84b' : '#e8b84b' }}>
                  #{miner.rank}
                </div>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%', fontSize: 16, fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: miner.isMe ? 'rgba(232,184,75,0.25)' : 'rgba(232,184,75,0.1)',
                  color: miner.isMe ? '#e8b84b' : '#c9b38a',
                }}>
                  {miner.name[0]}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: miner.isMe ? '#e8b84b' : '#f3e6c9' }}>
                    {miner.name}
                  </div>
                  <div style={{ fontSize: 11, color: '#e8b84b' }}>Level {miner.level}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#e8b84b' }}>
                    {formatNumber(miner.totalMined)}
                  </div>
                  <div style={{ fontSize: 10, color: '#e8b84b' }}>MINE</div>
                </div>
                <span style={{ fontSize: 20 }}>{miner.badge}</span>
              </motion.div>
            </React.Fragment>
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
// import { Trophy, Zap, Crown } from 'lucide-react';

// const TOP_MINERS = [
//   { rank: 1, name: 'CryptoKing99', totalMined: 2500000, level: 12, badge: '👑' },
//   { rank: 2, name: 'MineQueen', totalMined: 2100000, level: 11, badge: '🥈' },
//   { rank: 3, name: 'BlockBoss', totalMined: 1850000, level: 10, badge: '🥉' },
//   { rank: 4, name: 'HashMaster', totalMined: 1500000, level: 9, badge: '⚡' },
//   { rank: 5, name: 'CoinLord', totalMined: 1200000, level: 9, badge: '💎' },
//   { rank: 6, name: 'DiamondHands', totalMined: 980000, level: 8, badge: '🔥' },
//   { rank: 7, name: 'MoonMiner', totalMined: 850000, level: 8, badge: '🌙' },
//   { rank: 8, name: 'GoldRush', totalMined: 720000, level: 7, badge: '🏆' },
//   { rank: 9, name: 'StakeBro', totalMined: 600000, level: 7, badge: '⭐' },
//   { rank: 10, name: 'HashHero', totalMined: 500000, level: 6, badge: '🎯' },
//   // ... you at 142
//   { rank: 142, name: 'Alex (You)', totalMined: 182500, level: 7, badge: '⛏️', isMe: true },
// ];

// export default function Leaderboard() {
//   return (
//     <div className="page-content">
//       {/* Header */}
//       <div style={{ padding: '20px 20px 0', textAlign: 'center' }}>
//         <div style={{ fontSize: 22, fontWeight: 900 }}>🏆 Leaderboard</div>
//         <div style={{ fontSize: 13, color: '#6b7280', marginTop: 4 }}>
//           Top miners this week
//         </div>
//       </div>

//       {/* Top 3 Podium */}
//       <div style={{ padding: '20px 20px 0' }}>
//         <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 10 }}>
//           {/* 2nd */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//             style={{ flex: 1, textAlign: 'center' }}
//           >
//             <div style={{ fontSize: 28, marginBottom: 6 }}>🥈</div>
//             <div style={{
//               width: 50, height: 50, borderRadius: '50%', margin: '0 auto 6px',
//               background: 'linear-gradient(135deg, #9ca3af, #6b7280)',
//               display: 'flex', alignItems: 'center', justifyContent: 'center',
//               fontSize: 20, fontWeight: 800, color: '#fff',
//               border: '2px solid rgba(156,163,175,0.4)',
//             }}>
//               {TOP_MINERS[1].name[0]}
//             </div>
//             <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 2, color: '#9ca3af' }}>
//               {TOP_MINERS[1].name.split(' ')[0]}
//             </div>
//             <div style={{ fontSize: 10, color: '#6b7280' }}>{formatNumber(TOP_MINERS[1].totalMined)}</div>
//             <div style={{
//               background: 'rgba(156,163,175,0.15)', border: '1px solid rgba(156,163,175,0.3)',
//               borderRadius: '10px 10px 0 0', padding: '10px 0', marginTop: 8,
//               height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center',
//               fontSize: 18, fontWeight: 900, color: '#9ca3af',
//             }}>2</div>
//           </motion.div>

//           {/* 1st */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0 }}
//             style={{ flex: 1, textAlign: 'center' }}
//           >
//             <motion.div
//               animate={{ scale: [1, 1.05, 1] }}
//               transition={{ duration: 2, repeat: Infinity }}
//               style={{ fontSize: 34, marginBottom: 6 }}
//             >👑</motion.div>
//             <div style={{
//               width: 60, height: 60, borderRadius: '50%', margin: '0 auto 6px',
//               background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
//               display: 'flex', alignItems: 'center', justifyContent: 'center',
//               fontSize: 24, fontWeight: 900, color: '#000',
//               border: '3px solid rgba(245,158,11,0.6)',
//               boxShadow: '0 0 30px rgba(245,158,11,0.3)',
//             }}>
//               {TOP_MINERS[0].name[0]}
//             </div>
//             <div style={{ fontSize: 12, fontWeight: 800, marginBottom: 2, color: '#fbbf24' }}>
//               {TOP_MINERS[0].name.split('9')[0]}
//             </div>
//             <div style={{ fontSize: 10, color: '#9ca3af' }}>{formatNumber(TOP_MINERS[0].totalMined)}</div>
//             <div style={{
//               background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)',
//               borderRadius: '10px 10px 0 0', padding: '10px 0', marginTop: 8,
//               height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center',
//               fontSize: 22, fontWeight: 900, color: '#fbbf24',
//               boxShadow: '0 0 20px rgba(245,158,11,0.1)',
//             }}>1</div>
//           </motion.div>

//           {/* 3rd */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             style={{ flex: 1, textAlign: 'center' }}
//           >
//             <div style={{ fontSize: 28, marginBottom: 6 }}>🥉</div>
//             <div style={{
//               width: 50, height: 50, borderRadius: '50%', margin: '0 auto 6px',
//               background: 'linear-gradient(135deg, #cd7c35, #a16207)',
//               display: 'flex', alignItems: 'center', justifyContent: 'center',
//               fontSize: 20, fontWeight: 800, color: '#fff',
//               border: '2px solid rgba(205,124,53,0.4)',
//             }}>
//               {TOP_MINERS[2].name[0]}
//             </div>
//             <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 2, color: '#cd7c35' }}>
//               {TOP_MINERS[2].name.split('B')[0]}B
//             </div>
//             <div style={{ fontSize: 10, color: '#6b7280' }}>{formatNumber(TOP_MINERS[2].totalMined)}</div>
//             <div style={{
//               background: 'rgba(205,124,53,0.15)', border: '1px solid rgba(205,124,53,0.3)',
//               borderRadius: '10px 10px 0 0', padding: '10px 0', marginTop: 8,
//               height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center',
//               fontSize: 18, fontWeight: 900, color: '#cd7c35',
//             }}>3</div>
//           </motion.div>
//         </div>
//       </div>

//       {/* My Rank Banner */}
//       <div style={{ padding: '16px 20px 0' }}>
//         <div style={{
//           background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)',
//           borderRadius: 14, padding: '14px 16px',
//           display: 'flex', alignItems: 'center', gap: 12,
//         }}>
//           <Trophy size={20} color="#f59e0b" />
//           <div style={{ flex: 1 }}>
//             <div style={{ fontSize: 13, fontWeight: 700 }}>Your Current Rank</div>
//             <div style={{ fontSize: 11, color: '#9ca3af' }}>Keep mining to climb up!</div>
//           </div>
//           <div style={{ fontSize: 22, fontWeight: 900, color: '#fbbf24' }}>#142</div>
//         </div>
//       </div>

//       {/* Full List */}
//       <div style={{ padding: '16px 20px 32px' }}>
//         <div style={{ fontSize: 13, fontWeight: 700, color: '#9ca3af', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.8 }}>
//           Top Miners
//         </div>
//         {TOP_MINERS.map((miner, i) => (
//           <React.Fragment key={miner.rank}>
//             {i === 10 && (
//               <div style={{ textAlign: 'center', padding: '8px 0', color: '#4b5563', fontSize: 13 }}>• • •</div>
//             )}
//             <motion.div
//               initial={{ opacity: 0, x: -10 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: Math.min(i, 5) * 0.05 }}
//               style={{
//                 display: 'flex', alignItems: 'center', gap: 12,
//                 padding: '12px 14px', marginBottom: 8, borderRadius: 14,
//                 background: miner.isMe ? 'rgba(245,158,11,0.08)' : '#1a1a2e',
//                 border: `1px solid ${miner.isMe ? 'rgba(245,158,11,0.3)' : 'rgba(255,255,255,0.05)'}`,
//               }}
//             >
//               <div style={{ width: 28, textAlign: 'center', fontSize: 14, fontWeight: 900,
//                 color: miner.rank <= 3 ? '#fbbf24' : '#6b7280' }}>
//                 {miner.rank}
//               </div>
//               <div style={{
//                 width: 36, height: 36, borderRadius: '50%', fontSize: 14, fontWeight: 800,
//                 display: 'flex', alignItems: 'center', justifyContent: 'center',
//                 background: miner.isMe ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.08)',
//                 color: miner.isMe ? '#fbbf24' : '#9ca3af', flexShrink: 0,
//               }}>
//                 {miner.name[0]}
//               </div>
//               <div style={{ flex: 1 }}>
//                 <div style={{ fontSize: 13, fontWeight: 700, color: miner.isMe ? '#fbbf24' : '#fff' }}>
//                   {miner.name}
//                 </div>
//                 <div style={{ fontSize: 11, color: '#6b7280' }}>Level {miner.level}</div>
//               </div>
//               <div style={{ textAlign: 'right' }}>
//                 <div style={{ fontSize: 13, fontWeight: 800, color: '#fbbf24' }}>
//                   {formatNumber(miner.totalMined)}
//                 </div>
//                 <div style={{ fontSize: 10, color: '#6b7280' }}>MINE</div>
//               </div>
//               <span style={{ fontSize: 18 }}>{miner.badge}</span>
//             </motion.div>
//           </React.Fragment>
//         ))}
//       </div>
//     </div>
//   );
// }

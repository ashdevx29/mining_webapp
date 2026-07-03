import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { formatNumber } from '../utils/helpers';
import bgImage from "../assets/page-bg.png";
import coin from "../assets/coin.png";

const GRADIENT_BORDER = "linear-gradient(135deg,#FFF2A6 0%,#FFD96A 12%,#FFC83D 28%,#F5B300 45%,#D88A00 68%,#8A5200 100%)";
const CARD_BG = "#0A090A";

const GRADIENT_TEXT = {
  background: GRADIENT_BORDER,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  color: "transparent",
};

const PRIZES = [
  { label: '50', value: 50, color: '#f59e0b', emoji: '🪙' },
  { label: '200', value: 200, color: '#3b82f6', emoji: '💎' },
  { label: '10', value: 10, color: '#6b7280', emoji: '🪙' },
  { label: '500', value: 500, color: '#8b5cf6', emoji: '🌟' },
  { label: 'MISS', value: 0, color: '#ef4444', emoji: '💨' },
  { label: '100', value: 100, color: '#10b981', emoji: '🪙' },
  { label: '1000', value: 1000, color: '#f43f5e', emoji: '🔥' },
  { label: '25', value: 25, color: '#6b7280', emoji: '🪙' },
];

const SEGMENT_ANGLE = 360 / PRIZES.length;

export default function LuckySpin() {
  const { user, setUser } = useApp();
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [spinsLeft, setSpinsLeft] = useState(3);
  const [lastPrize, setLastPrize] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const totalRotation = useRef(0);

  const handleSpin = () => {
    if (spinning || spinsLeft <= 0) return;

    setShowResult(false);
    setSpinning(true);
    setSpinsLeft(s => s - 1);

    const prizeIndex = Math.floor(Math.random() * PRIZES.length);
    const prize = PRIZES[prizeIndex];

    const baseSpins = 5 + Math.floor(Math.random() * 5);
    const targetAngle = 360 - (prizeIndex * SEGMENT_ANGLE + SEGMENT_ANGLE / 2);
    const newRotation = totalRotation.current + baseSpins * 360 + targetAngle - (totalRotation.current % 360);
    totalRotation.current = newRotation;

    setRotation(newRotation);

    setTimeout(() => {
      setSpinning(false);
      setLastPrize(prize);
      setShowResult(true);
      if (prize.value > 0) {
        setUser(prev => ({ ...prev, balance: prev.balance + prize.value }));
      }
    }, 4000);
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

      {/* Result Modal */}
      <AnimatePresence>
        {showResult && lastPrize && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)',
              zIndex: 9000, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
            onClick={() => setShowResult(false)}
          >
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
              style={{
                background: CARD_BG, border: `2px solid ${lastPrize.value > 0 ? '#e8b84b' : '#ef4444'}`,
                borderRadius: 24, padding: '36px 28px', textAlign: 'center',
                minWidth: 260, boxShadow: '0 0 60px rgba(245,158,11,0.3)',
              }}
            >
              <div style={{ fontSize: 64, marginBottom: 12 }}>
                {lastPrize.value > 0 ? '🎉' : '😞'}
              </div>
              <div style={{ fontSize: 20, fontWeight: 900, marginBottom: 8 }}>
                {lastPrize.value > 0 ? 'You Won!' : 'Better Luck!'}
              </div>
              {lastPrize.value > 0 && (
                <div style={{ fontSize: 36, fontWeight: 900, ...GRADIENT_TEXT }}>
                  +{formatNumber(lastPrize.value)} MINE
                </div>
              )}
              <div style={{ color: '#e8b84b', fontSize: 13, marginTop: 12 }}>Tap anywhere to continue</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10 max-w-[430px] mx-auto min-h-screen pb-28">

        {/* Header */}
        <div style={{ padding: '32px 24px 0', textAlign: 'center' }}>
          <div style={{ ...GRADIENT_TEXT, fontSize: 24, fontWeight: 700 }}>🎰 Lucky Spin</div>
          <div style={{ fontSize: 13, color: '#e8b84b', marginTop: 6 }}>
            Spin the wheel and win MINE coins!
          </div>
        </div>

        {/* Spins Left */}
        <div style={{ textAlign: 'center', padding: '12px 24px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: CARD_BG, border: '1px solid #e8b84b',
            borderRadius: 99, padding: '10px 24px',
          }}>
            <span style={{ fontSize: 18 }}>🎯</span>
            <span style={{ fontWeight: 700, ...GRADIENT_TEXT, fontSize: 15 }}>
              {spinsLeft} Free Spin{spinsLeft !== 1 ? 's' : ''} Left
            </span>
          </div>
        </div>

        {/* Wheel */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px 0', position: 'relative' }}>
          {/* Pointer */}
          <div style={{
            position: 'absolute', top: 12, zIndex: 10,
            width: 0, height: 0,
            borderLeft: '16px solid transparent', borderRight: '16px solid transparent',
            borderTop: '32px solid #e8b84b',
            filter: 'drop-shadow(0 4px 12px rgba(232,184,75,0.6))',
          }} />

          <motion.div
            animate={{ rotate: rotation }}
            transition={{ duration: spinning ? 4 : 0, ease: spinning ? [0.25, 0.46, 0.45, 0.94] : 'linear' }}
            style={{
              width: 280, height: 280, borderRadius: '50%',
              position: 'relative', overflow: 'hidden',
              border: '8px solid #e8b84b',
              boxShadow: '0 0 50px rgba(232,184,75,0.4)',
            }}
          >
            {PRIZES.map((prize, i) => {
              const angle = i * SEGMENT_ANGLE;
              const mid = angle + SEGMENT_ANGLE / 2;
              const rad = (mid * Math.PI) / 180;
              const r = 95;
              const tx = 140 + r * Math.sin(rad);
              const ty = 140 - r * Math.cos(rad);
              return (
                <React.Fragment key={i}>
                  <div style={{
                    position: 'absolute', width: '50%', height: '50%',
                    transformOrigin: '100% 100%',
                    background: i % 2 === 0 ? '#1a1206' : '#0f0c04',
                    transform: `rotate(${angle}deg)`,
                  }} />
                  <div style={{
                    position: 'absolute',
                    left: tx - 22, top: ty - 18, width: 44, height: 36,
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    fontSize: 11, fontWeight: 800, color: prize.color,
                    transform: `rotate(${mid}deg)`,
                    textAlign: 'center',
                  }}>
                    <span style={{ fontSize: 14 }}>{prize.emoji}</span>
                    <span>{prize.label}</span>
                  </div>
                </React.Fragment>
              );
            })}

            {/* Center */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 58, height: 58, borderRadius: '50%',
              background: GRADIENT_BORDER,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 24, zIndex: 5,
            }}>
              <img src={coin} alt="" />
            </div>
          </motion.div>
        </div>

        {/* Spin Button */}
        <div style={{ padding: '10px 24px 20px' }}>
          <motion.button
            whileTap={!spinning && spinsLeft > 0 ? { scale: 0.96 } : {}}
            onClick={handleSpin}
            style={{
              width: '100%', padding: '18px',
              background: GRADIENT_BORDER,
              color: '#0a0704',
              fontSize: 16, fontWeight: 700,
              border: 'none', borderRadius: 16,
              opacity: spinning || spinsLeft === 0 ? 0.6 : 1,
              cursor: spinning || spinsLeft === 0 ? 'not-allowed' : 'pointer',
            }}
          >
            {spinning ? '🌀 Spinning...' : spinsLeft > 0 ? '🎰 Spin Now!' : '❌ No Spins Left'}
          </motion.button>

          {spinsLeft === 0 && (
            <div style={{ textAlign: 'center', marginTop: 16, color: '#e8b84b', fontSize: 13 }}>
              Complete tasks to earn more spins
            </div>
          )}
        </div>

        {/* Prize List */}
        <div style={{ padding: '0 24px 32px' }}>
          <div style={{ fontSize: 12, fontWeight: 700, ...GRADIENT_TEXT, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1.2 }}>
            Possible Prizes
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {PRIZES.filter(p => p.value > 0).map((p) => (
              <div key={p.label} style={{
                background: CARD_BG, border: '1px solid #e8b84b',
                borderRadius: 14, padding: '12px 16px',
                display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <span style={{ fontSize: 22 }}>{p.emoji}</span>
                <span style={{ fontSize: 15, fontWeight: 700, color: p.color }}>
                  {formatNumber(p.value)} MINE
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Spacer */}
        <div style={{ height: 60 }} />

      </div>
    </div>
  );
}











// import React, { useState, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useApp } from '../context/AppContext';
// import { formatNumber } from '../utils/helpers';

// const PRIZES = [
//   { label: '50', value: 50, color: '#f59e0b', emoji: '🪙' },
//   { label: '200', value: 200, color: '#3b82f6', emoji: '💎' },
//   { label: '10', value: 10, color: '#6b7280', emoji: '🪙' },
//   { label: '500', value: 500, color: '#8b5cf6', emoji: '🌟' },
//   { label: 'MISS', value: 0, color: '#ef4444', emoji: '💨' },
//   { label: '100', value: 100, color: '#10b981', emoji: '🪙' },
//   { label: '1000', value: 1000, color: '#f43f5e', emoji: '🔥' },
//   { label: '25', value: 25, color: '#6b7280', emoji: '🪙' },
// ];

// const SEGMENT_ANGLE = 360 / PRIZES.length;

// export default function LuckySpin() {
//   const { user, setUser } = useApp();
//   const [rotation, setRotation] = useState(0);
//   const [spinning, setSpinning] = useState(false);
//   const [spinsLeft, setSpinsLeft] = useState(3);
//   const [lastPrize, setLastPrize] = useState(null);
//   const [showResult, setShowResult] = useState(false);
//   const totalRotation = useRef(0);

//   const handleSpin = () => {
//     if (spinning || spinsLeft <= 0) return;

//     setShowResult(false);
//     setSpinning(true);
//     setSpinsLeft(s => s - 1);

//     // Random prize (weighted towards smaller values)
//     const prizeIndex = Math.floor(Math.random() * PRIZES.length);
//     const prize = PRIZES[prizeIndex];

//     // Calculate rotation to land on prize
//     const baseSpins = 5 + Math.floor(Math.random() * 5); // 5-10 full rotations
//     const targetAngle = 360 - (prizeIndex * SEGMENT_ANGLE + SEGMENT_ANGLE / 2);
//     const newRotation = totalRotation.current + baseSpins * 360 + targetAngle - (totalRotation.current % 360);
//     totalRotation.current = newRotation;

//     setRotation(newRotation);

//     setTimeout(() => {
//       setSpinning(false);
//       setLastPrize(prize);
//       setShowResult(true);
//       if (prize.value > 0) {
//         setUser(prev => ({ ...prev, balance: prev.balance + prize.value }));
//       }
//     }, 4000);
//   };

//   return (
//     <div className="page-content">
//       {/* Result Modal */}
//       <AnimatePresence>
//         {showResult && lastPrize && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             style={{
//               position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)',
//               zIndex: 9000, display: 'flex', alignItems: 'center', justifyContent: 'center',
//             }}
//             onClick={() => setShowResult(false)}
//           >
//             <motion.div
//               initial={{ scale: 0, rotate: -20 }}
//               animate={{ scale: 1, rotate: 0 }}
//               exit={{ scale: 0 }}
//               transition={{ type: 'spring', stiffness: 200 }}
//               style={{
//                 background: '#12121a', border: '2px solid rgba(245,158,11,0.4)',
//                 borderRadius: 24, padding: '36px 28px', textAlign: 'center',
//                 minWidth: 260, boxShadow: '0 0 60px rgba(245,158,11,0.2)',
//               }}
//             >
//               <div style={{ fontSize: 64, marginBottom: 12 }}>
//                 {lastPrize.value > 0 ? '🎉' : '😞'}
//               </div>
//               <div style={{ fontSize: 20, fontWeight: 900, marginBottom: 8 }}>
//                 {lastPrize.value > 0 ? 'You Won!' : 'Better Luck!'}
//               </div>
//               {lastPrize.value > 0 && (
//                 <div style={{
//                   fontSize: 36, fontWeight: 900,
//                   background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
//                   WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
//                 }}>
//                   +{formatNumber(lastPrize.value)} MINE
//                 </div>
//               )}
//               <div style={{ color: '#6b7280', fontSize: 13, marginTop: 8 }}>Tap anywhere to continue</div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Header */}
//       <div style={{ padding: '20px 20px 0', textAlign: 'center' }}>
//         <div style={{ fontSize: 22, fontWeight: 900 }}>🎰 Lucky Spin</div>
//         <div style={{ fontSize: 13, color: '#6b7280', marginTop: 4 }}>
//           Spin the wheel and win MINE coins!
//         </div>
//       </div>

//       {/* Spins Left */}
//       <div style={{ textAlign: 'center', padding: '12px 20px' }}>
//         <div style={{
//           display: 'inline-flex', alignItems: 'center', gap: 8,
//           background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)',
//           borderRadius: 99, padding: '8px 20px',
//         }}>
//           <span style={{ fontSize: 16 }}>🎯</span>
//           <span style={{ fontWeight: 700, color: '#fbbf24', fontSize: 15 }}>
//             {spinsLeft} Free Spin{spinsLeft !== 1 ? 's' : ''} Left
//           </span>
//         </div>
//       </div>

//       {/* Wheel */}
//       <div style={{ display: 'flex', justifyContent: 'center', padding: '20px 0', position: 'relative' }}>
//         {/* Pointer */}
//         <div style={{
//           position: 'absolute', top: 8, zIndex: 10,
//           width: 0, height: 0,
//           borderLeft: '14px solid transparent', borderRight: '14px solid transparent',
//           borderTop: '28px solid #f59e0b',
//           filter: 'drop-shadow(0 4px 8px rgba(245,158,11,0.5))',
//         }} />

//         <motion.div
//           animate={{ rotate: rotation }}
//           transition={{ duration: spinning ? 4 : 0, ease: spinning ? [0.25, 0.46, 0.45, 0.94] : 'linear' }}
//           style={{
//             width: 280, height: 280, borderRadius: '50%',
//             position: 'relative', overflow: 'hidden',
//             border: '6px solid rgba(245,158,11,0.6)',
//             boxShadow: '0 0 40px rgba(245,158,11,0.2)',
//           }}
//         >
//           {PRIZES.map((prize, i) => {
//             const angle = i * SEGMENT_ANGLE;
//             const mid = angle + SEGMENT_ANGLE / 2;
//             const rad = (mid * Math.PI) / 180;
//             const r = 90;
//             const tx = 140 + r * Math.sin(rad);
//             const ty = 140 - r * Math.cos(rad);
//             return (
//               <React.Fragment key={i}>
//                 {/* Segment */}
//                 <div style={{
//                   position: 'absolute', width: '50%', height: '50%',
//                   transformOrigin: '100% 100%',
//                   background: i % 2 === 0 ? '#1a1a2e' : '#12121a',
//                   transform: `rotate(${angle}deg)`,
//                   borderRight: `1px solid rgba(245,158,11,0.2)`,
//                 }} />
//                 {/* Label */}
//                 <div style={{
//                   position: 'absolute',
//                   left: tx - 20, top: ty - 14, width: 40, height: 28,
//                   display: 'flex', flexDirection: 'column', alignItems: 'center',
//                   fontSize: 10, fontWeight: 800, color: prize.color,
//                   transform: `rotate(${mid}deg)`,
//                   textAlign: 'center',
//                 }}>
//                   <span style={{ fontSize: 12 }}>{prize.emoji}</span>
//                   <span style={{ fontSize: 9 }}>{prize.label}</span>
//                 </div>
//               </React.Fragment>
//             );
//           })}
//           {/* Center */}
//           <div style={{
//             position: 'absolute', top: '50%', left: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: 50, height: 50, borderRadius: '50%',
//             background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
//             display: 'flex', alignItems: 'center', justifyContent: 'center',
//             fontSize: 20, zIndex: 5,
//             boxShadow: '0 0 20px rgba(245,158,11,0.5)',
//           }}>
//             ⛏️
//           </div>
//         </motion.div>
//       </div>

//       {/* Spin Button */}
//       <div style={{ padding: '8px 24px 24px' }}>
//         <motion.button
//           whileTap={!spinning && spinsLeft > 0 ? { scale: 0.96 } : {}}
//           onClick={handleSpin}
//           className="btn-primary"
//           style={{
//             width: '100%', fontSize: 16,
//             opacity: spinning || spinsLeft === 0 ? 0.5 : 1,
//             cursor: spinning || spinsLeft === 0 ? 'not-allowed' : 'pointer',
//           }}
//         >
//           {spinning ? '🌀 Spinning...' : spinsLeft > 0 ? '🎰 Spin Now!' : '❌ No Spins Left'}
//         </motion.button>

//         {spinsLeft === 0 && (
//           <div style={{ textAlign: 'center', marginTop: 16, color: '#6b7280', fontSize: 13 }}>
//             Complete tasks to earn more spins
//           </div>
//         )}
//       </div>

//       {/* Prize List */}
//       <div style={{ padding: '0 20px 32px' }}>
//         <div style={{ fontSize: 13, fontWeight: 700, color: '#9ca3af', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.8 }}>
//           Prizes
//         </div>
//         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
//           {PRIZES.filter(p => p.value > 0).map((p) => (
//             <div key={p.label} style={{
//               background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.06)',
//               borderRadius: 12, padding: '10px 14px',
//               display: 'flex', alignItems: 'center', gap: 10,
//             }}>
//               <span style={{ fontSize: 20 }}>{p.emoji}</span>
//               <span style={{ fontSize: 14, fontWeight: 700, color: p.color }}>
//                 {formatNumber(p.value)} MINE
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

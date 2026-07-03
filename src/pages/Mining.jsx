import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { formatNumber, formatCountdown } from '../utils/helpers';
import { Zap, Pickaxe, Moon, Check } from 'lucide-react';
import coinImg from '../assets/coin.png';
import bgImage from "../assets/page-bg.png";

function CoinParticle({ x, y, onDone }) {
  return (
    <motion.img
      src={coinImg}
      alt=""
      initial={{ x, y, scale: 1, opacity: 1, rotate: 0 }}
      animate={{
        x: x + (Math.random() - 0.5) * 100,
        y: y - 80 - Math.random() * 60,
        scale: 0,
        opacity: 0,
        rotate: 180,
      }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      onAnimationComplete={onDone}
      style={{
        position: 'fixed', width: 22, height: 22, objectFit: 'contain',
        zIndex: 999, pointerEvents: 'none',
        filter: 'drop-shadow(0 0 6px rgba(245,180,60,0.7))',
      }}
    />
  );
}

const GRADIENT_BORDER = "linear-gradient(135deg,#FFF2A6 0%,#FFD96A 12%,#FFC83D 28%,#F5B300 45%,#D88A00 68%,#8A5200 100%)";
const CARD_BG = "#0A090A";

const GRADIENT_TEXT = {
  background: GRADIENT_BORDER,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  color: "transparent",
};

export default function Mining() {
  const { user, mining, startMining, setShowClaimModal } = useApp();
  const [tapCount, setTapCount] = useState(0);
  const [particles, setParticles] = useState([]);
  const [tapFlashes, setTapFlashes] = useState([]);
  const btnRef = useRef(null);
  let pid = useRef(0);

  const handleTap = (e) => {
    if (mining.canClaim) {
      setShowClaimModal(true);
      return;
    }
    if (!mining.isActive) return;

    setTapCount(c => c + 1);

    const rect = btnRef.current?.getBoundingClientRect();
    const x = e.clientX || (rect?.left + rect?.width / 2) || 200;
    const y = e.clientY || (rect?.top + rect?.height / 2) || 400;
    const id = ++pid.current;

    setParticles(prev => [...prev, { id, x, y }]);
    setTimeout(() => setParticles(prev => prev.filter(p => p.id !== id)), 900);

    const fid = id + 10000;
    setTapFlashes(prev => [...prev, { id: fid, x, y: y - 40 }]);
    setTimeout(() => setTapFlashes(prev => prev.filter(f => f.id !== fid)), 700);
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

      {/* Particles */}
      {particles.map(p => (
        <CoinParticle key={p.id} x={p.x} y={p.y} onDone={() => {}} />
      ))}
      {tapFlashes.map(f => (
        <motion.div
          key={f.id}
          initial={{ opacity: 1, y: f.y, x: f.x - 20 }}
          animate={{ opacity: 0, y: f.y - 40 }}
          transition={{ duration: 0.6 }}
          style={{
            position: 'fixed', zIndex: 998, fontSize: 14, fontWeight: 800,
            color: '#e8b84b', pointerEvents: 'none', whiteSpace: 'nowrap',
          }}
        >
          +1 MINE
        </motion.div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 max-w-[430px] mx-auto min-h-screen pb-28">

        {/* Header */}
        <div style={{ padding: '32px 24px 0', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, ...GRADIENT_TEXT, fontSize: 22, fontWeight: 700 }}>
            <Pickaxe size={24} color="#e8b84b" /> Mining
          </div>
          <div style={{ fontSize: 13, color: '#ffffff', marginTop: 6 }}>
            Tap to mine · Auto-earn while waiting
          </div>
        </div>

        {/* Balance Display */}
        <div style={{ textAlign: 'center', padding: '20px 24px 0' }}>
          <motion.div
            key={user.balance}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 400 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
          >
            <img src={coinImg} alt="" style={{ width: 28, height: 28, objectFit: 'contain', filter: 'drop-shadow(0 0 6px rgba(245,180,60,0.55))' }} />
            <span style={{ fontSize: 34, fontWeight: 800, letterSpacing: '-1px', color: '#e8b84b' }}>
              {formatNumber(user.balance)}
            </span>
            <span style={{ fontSize: 16, fontWeight: 700, ...GRADIENT_TEXT }}>MINE</span>
          </motion.div>
          <div style={{ color: '#e8b84b', fontSize: 13, marginTop: 6 }}>
            +{tapCount} this session
          </div>
        </div>

        {/* Mining Button */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '32px 0' }}>
          <div style={{ position: 'relative' }}>
            <AnimatePresence>
              {mining.isActive && (
                <>
                  <motion.div
                    animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.1, 0.35] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{
                      position: 'absolute', inset: -20, borderRadius: '50%',
                      border: '2px solid rgba(232,184,75,0.4)', pointerEvents: 'none',
                    }}
                  />
                  <motion.div
                    animate={{ scale: [1, 1.25, 1], opacity: [0.2, 0.05, 0.2] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
                    style={{
                      position: 'absolute', inset: -40, borderRadius: '50%',
                      border: '2px solid rgba(232,184,75,0.2)', pointerEvents: 'none',
                    }}
                  />
                </>
              )}
            </AnimatePresence>

            <motion.button
              ref={btnRef}
              whileTap={mining.isActive || mining.canClaim ? { scale: 0.92 } : {}}
              onClick={handleTap}
              style={{
                position: 'relative',
                width: 180, height: 180, borderRadius: '50%',
                border: `3px solid ${mining.canClaim ? '#5fd66a' : '#e8b84b'}`,
                background: CARD_BG,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: mining.isActive || mining.canClaim ? 'pointer' : 'default',
                boxShadow: mining.canClaim
                  ? '0 0 50px rgba(95,214,106,0.5)'
                  : '0 0 40px rgba(232,184,75,0.4)',
              }}
            >
              <img
                src={coinImg}
                alt="Mine coin"
                style={{
                  width: 128, height: 128, objectFit: 'contain',
                  filter: mining.canClaim
                    ? 'drop-shadow(0 0 22px rgba(95,214,106,0.7))'
                    : 'drop-shadow(0 0 25px rgba(232,184,75,0.6))',
                }}
              />

              {/* Status Badge */}
              <div style={{
                position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
                background: CARD_BG, border: `1px solid ${mining.canClaim ? '#5fd66a' : '#e8b84b'}`,
                borderRadius: 99, padding: '6px 14px', display: 'flex', alignItems: 'center', gap: 6,
              }}>
                {mining.canClaim ? <Check size={14} color="#5fd66a" /> : mining.isActive ? <Pickaxe size={14} color="#e8b84b" /> : <Moon size={14} color="#e8b84b" />}
                <span style={{ fontSize: 11, fontWeight: 800, color: mining.canClaim ? '#5fd66a' : '#e8b84b' }}>
                  {mining.canClaim ? 'CLAIM NOW' : mining.isActive ? 'MINING' : 'IDLE'}
                </span>
              </div>
            </motion.button>
          </div>
        </div>

        {/* Mining Progress Card */}
        <div style={{ padding: '0 24px 24px' }}>
          <div style={{ padding: "1px", borderRadius: 24, background: GRADIENT_BORDER }}>
            <div style={{
              background: CARD_BG,
              borderRadius: 22,
              padding: '24px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#ffb303' }}>Mining Progress</span>
                <span style={{ fontSize: 15, fontWeight: 800, ...GRADIENT_TEXT }}>
                  {Math.floor(mining.progress)}%
                </span>
              </div>

              <div style={{ height: 10, borderRadius: 99, background: '#ffffff',overflow: 'hidden', marginBottom: 20 }}>
                <motion.div
                  animate={{ width: `${mining.progress}%` }}
                  transition={{ duration: 0.5 }}
                  style={{
                    height: '100%', borderRadius: 99,
                    background: mining.canClaim
                      ? 'linear-gradient(90deg, #2c5c30, #5fd66a)'
                      : 'linear-gradient(90deg, #a9762a, #e8b84b)',
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 17, fontWeight: 800, color: '#f4d99a' }}>
                    {mining.isActive ? formatCountdown(mining.startTime, mining.duration) : '08:00:00'}
                  </div>
                  <div style={{ fontSize: 11, color: '#e8b84b', marginTop: 4 }}>TIME LEFT</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                    <img src={coinImg} alt="" style={{ width: 16, height: 16 }} />
                    <span style={{ fontSize: 17, fontWeight: 800, color: '#5fd66a' }}>{mining.reward}</span>
                  </div>
                  <div style={{ fontSize: 11, color: '#e8b84b', marginTop: 4 }}>REWARD</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 17, fontWeight: 800, color: '#e8b84b' }}>
                    {user.level * 25}/hr
                  </div>
                  <div style={{ fontSize: 11, color: '#e8b84b', marginTop: 4 }}>RATE</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div style={{ padding: '0 24px' }}>
          {!mining.isActive && !mining.canClaim ? (
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={startMining}
              style={{
                width: '100%', padding: '18px', borderRadius: 16,
                background: GRADIENT_BORDER, color: '#0a0704',
                fontSize: 16, fontWeight: 700, border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              }}
            >
              <Zap size={20} /> Start Mining (8 Hours)
            </motion.button>
          ) : mining.canClaim ? (
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowClaimModal(true)}
              style={{
                width: '100%', padding: '18px', borderRadius: 16,
                background: 'linear-gradient(135deg, #2c5c30, #5fd66a)',
                color: '#0a1c0c', fontSize: 16, fontWeight: 700,
                border: 'none', cursor: 'pointer',
                boxShadow: '0 0 30px rgba(95,214,106,0.5)',
              }}
            >
              Claim {mining.reward} MINE Now!
            </motion.button>
          ) : (
            <div style={{ textAlign: 'center', padding: '20px', background: CARD_BG, borderRadius: 16, border: '1px solid #3a2a12' }}>
              Mining in progress...
            </div>
          )}
        </div>

        {/* Bottom Spacer */}
        <div style={{ height: 100 }} />
      </div>
    </div>
  );
}








// import React, { useState, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useApp } from '../context/AppContext';
// import { formatNumber, formatCountdown } from '../utils/helpers';
// import { Zap, Pickaxe, Moon, Check } from 'lucide-react';
// import coinImg from '../assets/coin.png';

// function CoinParticle({ x, y, onDone }) {
//   return (
//     <motion.img
//       src={coinImg}
//       alt=""
//       initial={{ x, y, scale: 1, opacity: 1, rotate: 0 }}
//       animate={{
//         x: x + (Math.random() - 0.5) * 100,
//         y: y - 80 - Math.random() * 60,
//         scale: 0,
//         opacity: 0,
//         rotate: 180,
//       }}
//       transition={{ duration: 0.8, ease: 'easeOut' }}
//       onAnimationComplete={onDone}
//       style={{
//         position: 'fixed', width: 22, height: 22, objectFit: 'contain',
//         zIndex: 999, pointerEvents: 'none',
//         filter: 'drop-shadow(0 0 6px rgba(245,180,60,0.7))',
//       }}
//     />
//   );
// }

// export default function Mining() {
//   const { user, mining, startMining, setShowClaimModal } = useApp();
//   const [tapCount, setTapCount] = useState(0);
//   const [particles, setParticles] = useState([]);
//   const [tapFlashes, setTapFlashes] = useState([]);
//   const btnRef = useRef(null);
//   let pid = useRef(0);

//   const handleTap = (e) => {
//     if (mining.canClaim) {
//       setShowClaimModal(true);
//       return;
//     }
//     if (!mining.isActive) return;

//     setTapCount(c => c + 1);

//     const rect = btnRef.current?.getBoundingClientRect();
//     const x = e.clientX || (rect?.left + rect?.width / 2) || 200;
//     const y = e.clientY || (rect?.top + rect?.height / 2) || 400;
//     const id = ++pid.current;

//     setParticles(prev => [...prev, { id, x, y }]);
//     setTimeout(() => setParticles(prev => prev.filter(p => p.id !== id)), 900);

//     const fid = id + 10000;
//     setTapFlashes(prev => [...prev, { id: fid, x, y: y - 40 }]);
//     setTimeout(() => setTapFlashes(prev => prev.filter(f => f.id !== fid)), 700);
//   };

//   const remaining = mining.isActive ? mining.duration - (Date.now() - mining.startTime) : mining.duration;

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
//       {/* Particles */}
//       {particles.map(p => (
//         <CoinParticle key={p.id} x={p.x} y={p.y} onDone={() => {}} />
//       ))}
//       {tapFlashes.map(f => (
//         <motion.div
//           key={f.id}
//           initial={{ opacity: 1, y: f.y, x: f.x - 20 }}
//           animate={{ opacity: 0, y: f.y - 40 }}
//           transition={{ duration: 0.6 }}
//           style={{
//             position: 'fixed', zIndex: 998, fontSize: 14, fontWeight: 800,
//             color: '#e8b84b', pointerEvents: 'none', whiteSpace: 'nowrap',
//           }}
//         >
//           +1 MINE
//         </motion.div>
//       ))}

//       {/* Header */}
//       <div style={{ padding: '32px 24px 0', textAlign: 'center' }}>
//         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 20, fontWeight: 700, color: '#f3e6c9' }}>
//           <Pickaxe size={20} color="#e8b84b" /> Mining
//         </div>
//         <div style={{ fontSize: 13, color: '#e8b84b', marginTop: 6 }}>
//           Tap to mine · Auto-earn while waiting
//         </div>
//       </div>

//       {/* Balance display */}
//       <div style={{ textAlign: 'center', padding: '20px 24px 0' }}>
//         <motion.div
//           key={user.balance}
//           initial={{ scale: 1.1 }}
//           animate={{ scale: 1 }}
//           transition={{ type: 'spring', stiffness: 400 }}
//           style={{
//             display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
//           }}
//         >
//           <img src={coinImg} alt="" style={{ width: 28, height: 28, objectFit: 'contain', filter: 'drop-shadow(0 0 6px rgba(245,180,60,0.55))' }} />
//           <span style={{ fontSize: 34, fontWeight: 800, letterSpacing: '-1px', color: '#f5d99a' }}>
//             {formatNumber(user.balance)}
//           </span>
//           <span style={{ fontSize: 16, fontWeight: 700, color: '#c9922f' }}>MINE</span>
//         </motion.div>
//         <div style={{ color: '#e8b84b', fontSize: 13, marginTop: 6 }}>
//           +{tapCount} this session
//         </div>
//       </div>

//       {/* Mining Button */}
//       <div style={{ display: 'flex', justifyContent: 'center', padding: '32px 0' }}>
//         <div style={{ position: 'relative' }}>
//           {/* Outer glow rings */}
//           <AnimatePresence>
//             {mining.isActive && (
//               <>
//                 <motion.div
//                   animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.1, 0.35] }}
//                   transition={{ duration: 2, repeat: Infinity }}
//                   style={{
//                     position: 'absolute', inset: -20, borderRadius: '50%',
//                     border: '2px solid rgba(232,184,75,0.4)', pointerEvents: 'none',
//                   }}
//                 />
//                 <motion.div
//                   animate={{ scale: [1, 1.25, 1], opacity: [0.2, 0.05, 0.2] }}
//                   transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
//                   style={{
//                     position: 'absolute', inset: -40, borderRadius: '50%',
//                     border: '2px solid rgba(232,184,75,0.2)', pointerEvents: 'none',
//                   }}
//                 />
//               </>
//             )}
//             {mining.canClaim && (
//               <motion.div
//                 animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.15, 0.5] }}
//                 transition={{ duration: 1.4, repeat: Infinity }}
//                 style={{
//                   position: 'absolute', inset: -22, borderRadius: '50%',
//                   border: '2px solid rgba(95,214,106,0.5)', pointerEvents: 'none',
//                 }}
//               />
//             )}
//           </AnimatePresence>

//           <motion.button
//             ref={btnRef}
//             whileTap={mining.isActive || mining.canClaim ? { scale: 0.92 } : {}}
//             onClick={handleTap}
//             style={{
//               position: 'relative',
//               width: 180, height: 180, borderRadius: '50%',
//               border: `2px solid ${mining.canClaim ? 'rgba(95,214,106,0.6)' : 'rgba(201,146,47,0.5)'}`,
//               background: 'radial-gradient(circle at 35% 30%, #1c1206, #0a0704 75%)',
//               display: 'flex', alignItems: 'center', justifyContent: 'center',
//               cursor: mining.isActive || mining.canClaim ? 'pointer' : 'default',
//               opacity: !mining.isActive && !mining.canClaim ? 0.55 : 1,
//               boxShadow: mining.canClaim
//                 ? '0 0 50px rgba(95,214,106,0.35)'
//                 : mining.isActive
//                 ? '0 0 40px rgba(232,184,75,0.25)'
//                 : 'none',
//             }}
//           >
//             <img
//               src={coinImg}
//               alt="Mine coin"
//               style={{
//                 width: 128, height: 128, objectFit: 'contain',
//                 filter: mining.canClaim
//                   ? 'drop-shadow(0 0 22px rgba(95,214,106,0.55))'
//                   : 'drop-shadow(0 0 18px rgba(232,184,75,0.45))',
//               }}
//             />

//             {/* state badge */}
//             <div
//               style={{
//                 position: 'absolute', bottom: 6, left: '50%', transform: 'translateX(-50%)',
//                 display: 'flex', alignItems: 'center', gap: 4,
//                 background: mining.canClaim ? '#0f1a10' : '#140d05',
//                 border: `1px solid ${mining.canClaim ? '#2c5c30' : '#3a2a12'}`,
//                 borderRadius: 99, padding: '4px 12px',
//               }}
//             >
//               {mining.canClaim ? (
//                 <Check size={12} color="#5fd66a" />
//               ) : mining.isActive ? (
//                 <Pickaxe size={12} color="#e8b84b" />
//               ) : (
//                 <Moon size={12} color="#e8b84b" />
//               )}
//               <span
//                 style={{
//                   fontSize: 10, fontWeight: 800, letterSpacing: 0.5,
//                   color: mining.canClaim ? '#5fd66a' : mining.isActive ? '#e8b84b' : '#e8b84b',
//                 }}
//               >
//                 {mining.canClaim ? 'CLAIM!' : mining.isActive ? 'MINING' : 'IDLE'}
//               </span>
//             </div>
//           </motion.button>
//         </div>
//       </div>

//       {/* Timer / Progress */}
//       <div style={{ padding: '0 24px' }}>
//         <div style={{
//           background: 'linear-gradient(to bottom, #191008, #0d0904)',
//           border: '1px solid rgba(58,42,18,0.8)',
//           borderRadius: 20, padding: '24px',
//         }}>
//           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
//             <span style={{ fontSize: 13, color: '#e8b84b', fontWeight: 600 }}>Mining Progress</span>
//             <span style={{ fontSize: 13, fontWeight: 800, color: '#e8b84b' }}>
//               {Math.floor(mining.progress)}%
//             </span>
//           </div>

//           <div style={{
//             height: 8, borderRadius: 99, background: '#241708',
//             overflow: 'hidden', marginBottom: 20,
//           }}>
//             <motion.div
//               animate={{ width: `${mining.progress}%` }}
//               transition={{ duration: 0.5 }}
//               style={{
//                 height: '100%', borderRadius: 99,
//                 background: mining.canClaim
//                   ? 'linear-gradient(90deg, #2c5c30, #5fd66a)'
//                   : 'linear-gradient(90deg, #a9762a, #e8b84b)',
//               }}
//             />
//           </div>

//           <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//             <div style={{ textAlign: 'center' }}>
//               <div style={{ fontSize: 16, fontWeight: 800, color: '#f4d99a', fontVariantNumeric: 'tabular-nums' }}>
//                 {mining.isActive ? formatCountdown(mining.startTime, mining.duration) : '08:00:00'}
//               </div>
//               <div style={{ fontSize: 10.5, color: '#e8b84b', marginTop: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>Time Remaining</div>
//             </div>
//             <div style={{ textAlign: 'center' }}>
//               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
//                 <img src={coinImg} alt="" style={{ width: 14, height: 14, objectFit: 'contain' }} />
//                 <span style={{ fontSize: 16, fontWeight: 800, color: '#5fd66a' }}>{mining.reward}</span>
//               </div>
//               <div style={{ fontSize: 10.5, color: '#e8b84b', marginTop: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>Next Reward</div>
//             </div>
//             <div style={{ textAlign: 'center' }}>
//               <div style={{ fontSize: 16, fontWeight: 800, color: '#e8b84b' }}>
//                 {user.level * 25}/hr
//               </div>
//               <div style={{ fontSize: 10.5, color: '#e8b84b', marginTop: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>Mine Rate</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Start / Status button */}
//       <div style={{ padding: '24px 24px 0' }}>
//         {!mining.isActive && !mining.canClaim ? (
//           <motion.button
//             whileTap={{ scale: 0.97 }}
//             onClick={startMining}
//             style={{
//               width: '100%', fontSize: 15, fontWeight: 700,
//               background: 'linear-gradient(135deg, #a9762a, #e8b84b)',
//               color: '#1a1206', border: 'none',
//               borderRadius: 14, padding: '16px', cursor: 'pointer',
//               display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
//             }}
//           >
//             <Zap size={16} fill="#1a1206" /> Start Mining (8 Hours)
//           </motion.button>
//         ) : mining.canClaim ? (
//           <motion.button
//             whileTap={{ scale: 0.97 }}
//             animate={{
//               boxShadow: [
//                 '0 0 20px rgba(95,214,106,0.4)',
//                 '0 0 40px rgba(95,214,106,0.8)',
//                 '0 0 20px rgba(95,214,106,0.4)',
//               ],
//             }}
//             transition={{ duration: 1.5, repeat: Infinity }}
//             onClick={() => setShowClaimModal(true)}
//             style={{
//               width: '100%', background: 'linear-gradient(135deg, #2c5c30, #5fd66a)',
//               color: '#0a1c0c', fontWeight: 800, fontSize: 15, border: 'none',
//               borderRadius: 14, padding: 16, cursor: 'pointer',
//               display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
//             }}
//           >
//             <img src={coinImg} alt="" style={{ width: 18, height: 18, objectFit: 'contain' }} />
//             Claim {mining.reward} MINE Now!
//           </motion.button>
//         ) : (
//           <div style={{
//             textAlign: 'center', padding: '16px',
//             background: 'rgba(232,184,75,0.06)',
//             border: '1px solid rgba(232,184,75,0.2)', borderRadius: 14,
//           }}>
//             <div style={{ color: '#e8b84b', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
//               <Pickaxe size={14} color="#e8b84b" /> Mining in progress...
//             </div>
//             <div style={{ color: '#e8b84b', fontSize: 12, marginTop: 4 }}>Come back when the timer ends</div>
//           </div>
//         )}
//       </div>

//       {/* Upgrade hint */}
//       <div style={{ padding: '24px 24px 32px' }}>
//         <div style={{
//           background: 'linear-gradient(135deg, rgba(201,146,47,0.12), rgba(201,146,47,0.04))',
//           border: '1px solid rgba(201,146,47,0.25)',
//           borderRadius: 16, padding: '16px',
//           display: 'flex', alignItems: 'center', gap: 14,
//         }}>
//           <div style={{
//             width: 40, height: 40, borderRadius: 12, flexShrink: 0,
//             background: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center',
//           }}>
//             <Zap size={18} color="#e8b84b" />
//           </div>
//           <div>
//             <div style={{ fontSize: 13, fontWeight: 700, color: '#f3e6c9' }}>Boost your mining speed!</div>
//             <div style={{ fontSize: 12, color: '#e8b84b', marginTop: 3 }}>Complete tasks to level up and earn more per hour</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }








// import React, { useState, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useApp } from '../context/AppContext';
// import { formatNumber, formatCountdown } from '../utils/helpers';
// import { Zap } from 'lucide-react';

// function CoinParticle({ x, y, onDone }) {
//   return (
//     <motion.div
//       initial={{ x, y, scale: 1, opacity: 1 }}
//       animate={{ x: x + (Math.random() - 0.5) * 100, y: y - 80 - Math.random() * 60, scale: 0, opacity: 0 }}
//       transition={{ duration: 0.8, ease: 'easeOut' }}
//       onAnimationComplete={onDone}
//       style={{ position: 'fixed', fontSize: 18, zIndex: 999, pointerEvents: 'none' }}
//     >
//       🪙
//     </motion.div>
//   );
// }

// export default function Mining() {
//   const { user, mining, startMining, setShowClaimModal } = useApp();
//   const [tapCount, setTapCount] = useState(0);
//   const [particles, setParticles] = useState([]);
//   const [tapFlashes, setTapFlashes] = useState([]);
//   const btnRef = useRef(null);
//   let pid = useRef(0);

//   const handleTap = (e) => {
//     if (mining.canClaim) {
//       setShowClaimModal(true);
//       return;
//     }
//     if (!mining.isActive) return;

//     // Tap count
//     setTapCount(c => c + 1);

//     // Add coin particle
//     const rect = btnRef.current?.getBoundingClientRect();
//     const x = e.clientX || (rect?.left + rect?.width / 2) || 200;
//     const y = e.clientY || (rect?.top + rect?.height / 2) || 400;
//     const id = ++pid.current;

//     setParticles(prev => [...prev, { id, x, y }]);
//     setTimeout(() => setParticles(prev => prev.filter(p => p.id !== id)), 900);

//     // Tap flash
//     const fid = id + 10000;
//     setTapFlashes(prev => [...prev, { id: fid, x, y: y - 40 }]);
//     setTimeout(() => setTapFlashes(prev => prev.filter(f => f.id !== fid)), 700);
//   };

//   const remaining = mining.isActive ? mining.duration - (Date.now() - mining.startTime) : mining.duration;

//   return (
//     <div className="page-content">
//       {/* Particles */}
//       {particles.map(p => (
//         <CoinParticle key={p.id} x={p.x} y={p.y} onDone={() => {}} />
//       ))}
//       {tapFlashes.map(f => (
//         <motion.div
//           key={f.id}
//           initial={{ opacity: 1, y: f.y, x: f.x - 20 }}
//           animate={{ opacity: 0, y: f.y - 40 }}
//           transition={{ duration: 0.6 }}
//           style={{ position: 'fixed', zIndex: 998, fontSize: 14, fontWeight: 800,
//             color: '#fbbf24', pointerEvents: 'none', whiteSpace: 'nowrap' }}
//         >
//           +1 MINE
//         </motion.div>
//       ))}

//       {/* Header */}
//       <div style={{ padding: '20px 20px 0', textAlign: 'center' }}>
//         <div style={{ fontSize: 22, fontWeight: 900 }}>⛏️ Mining</div>
//         <div style={{ fontSize: 13, color: '#6b7280', marginTop: 4 }}>
//           Tap to mine · Auto-earn while waiting
//         </div>
//       </div>

//       {/* Balance display */}
//       <div style={{ textAlign: 'center', padding: '16px 20px' }}>
//         <motion.div
//           key={user.balance}
//           initial={{ scale: 1.1 }}
//           animate={{ scale: 1 }}
//           transition={{ type: 'spring', stiffness: 400 }}
//           style={{
//             fontSize: 36, fontWeight: 900, letterSpacing: '-1px',
//             background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
//             WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
//           }}
//         >
//           {formatNumber(user.balance)} MINE
//         </motion.div>
//         <div style={{ color: '#9ca3af', fontSize: 13, marginTop: 4 }}>
//           +{tapCount} this session
//         </div>
//       </div>

//       {/* Mining Button */}
//       <div style={{ display: 'flex', justifyContent: 'center', padding: '20px 0 24px' }}>
//         <div style={{ position: 'relative' }}>
//           {/* Outer glow rings */}
//           <AnimatePresence>
//             {mining.isActive && (
//               <>
//                 <motion.div
//                   animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.1, 0.3] }}
//                   transition={{ duration: 2, repeat: Infinity }}
//                   style={{
//                     position: 'absolute', inset: -20, borderRadius: '50%',
//                     border: '2px solid rgba(245,158,11,0.4)', pointerEvents: 'none',
//                   }}
//                 />
//                 <motion.div
//                   animate={{ scale: [1, 1.25, 1], opacity: [0.2, 0.05, 0.2] }}
//                   transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
//                   style={{
//                     position: 'absolute', inset: -40, borderRadius: '50%',
//                     border: '2px solid rgba(245,158,11,0.2)', pointerEvents: 'none',
//                   }}
//                 />
//               </>
//             )}
//           </AnimatePresence>

//           <motion.button
//             ref={btnRef}
//             className="mine-btn"
//             whileTap={mining.isActive ? { scale: 0.9 } : {}}
//             onClick={handleTap}
//             style={{
//               opacity: !mining.isActive && !mining.canClaim ? 0.5 : 1,
//               background: mining.canClaim
//                 ? 'radial-gradient(circle at 35% 35%, #34d399, #10b981, #059669)'
//                 : undefined,
//               boxShadow: mining.canClaim
//                 ? '0 0 50px rgba(16,185,129,0.5)' : undefined,
//             }}
//           >
//             <div style={{ textAlign: 'center' }}>
//               <div style={{ fontSize: 52 }}>
//                 {mining.canClaim ? '✅' : mining.isActive ? '⛏️' : '💤'}
//               </div>
//               <div style={{ fontSize: 11, fontWeight: 800, color: '#000', marginTop: 2, letterSpacing: 0.5 }}>
//                 {mining.canClaim ? 'CLAIM!' : mining.isActive ? 'MINING' : 'IDLE'}
//               </div>
//             </div>
//           </motion.button>
//         </div>
//       </div>

//       {/* Timer / Progress */}
//       <div style={{ padding: '0 24px 16px' }}>
//         <div style={{
//           background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.06)',
//           borderRadius: 20, padding: '20px',
//         }}>
//           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
//             <span style={{ fontSize: 13, color: '#9ca3af', fontWeight: 600 }}>Mining Progress</span>
//             <span style={{ fontSize: 13, fontWeight: 800, color: '#fbbf24' }}>
//               {Math.floor(mining.progress)}%
//             </span>
//           </div>

//           <div className="progress-bar" style={{ marginBottom: 16 }}>
//             <motion.div
//               className="progress-fill"
//               animate={{ width: `${mining.progress}%` }}
//               transition={{ duration: 0.5 }}
//               style={{ background: mining.canClaim ? 'linear-gradient(90deg, #10b981, #34d399)' : undefined }}
//             />
//           </div>

//           <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//             <div style={{ textAlign: 'center' }}>
//               <div style={{ fontSize: 16, fontWeight: 800, color: '#fbbf24', fontVariantNumeric: 'tabular-nums' }}>
//                 {mining.isActive ? formatCountdown(mining.startTime, mining.duration) : '08:00:00'}
//               </div>
//               <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>Time Remaining</div>
//             </div>
//             <div style={{ textAlign: 'center' }}>
//               <div style={{ fontSize: 16, fontWeight: 800, color: '#10b981' }}>
//                 {mining.reward} MINE
//               </div>
//               <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>Next Reward</div>
//             </div>
//             <div style={{ textAlign: 'center' }}>
//               <div style={{ fontSize: 16, fontWeight: 800, color: '#60a5fa' }}>
//                 {user.level * 25}/hr
//               </div>
//               <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>Mine Rate</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Start / Status button */}
//       <div style={{ padding: '0 24px 24px' }}>
//         {!mining.isActive && !mining.canClaim ? (
//           <motion.button
//             whileTap={{ scale: 0.97 }}
//             onClick={startMining}
//             className="btn-primary"
//             style={{ width: '100%', fontSize: 16 }}
//           >
//             ⚡ Start Mining (8 Hours)
//           </motion.button>
//         ) : mining.canClaim ? (
//           <motion.button
//             whileTap={{ scale: 0.97 }}
//             animate={{ boxShadow: ['0 0 20px rgba(16,185,129,0.4)', '0 0 40px rgba(16,185,129,0.8)', '0 0 20px rgba(16,185,129,0.4)'] }}
//             transition={{ duration: 1.5, repeat: Infinity }}
//             onClick={() => setShowClaimModal(true)}
//             style={{
//               width: '100%', background: 'linear-gradient(135deg, #10b981, #34d399)',
//               color: '#000', fontWeight: 800, fontSize: 16, border: 'none',
//               borderRadius: 14, padding: 16, cursor: 'pointer',
//             }}
//           >
//             🎉 Claim {mining.reward} MINE Now!
//           </motion.button>
//         ) : (
//           <div style={{ textAlign: 'center', padding: '14px', background: 'rgba(16,185,129,0.08)',
//             border: '1px solid rgba(16,185,129,0.2)', borderRadius: 14 }}>
//             <div style={{ color: '#6ee7b7', fontWeight: 700, fontSize: 14 }}>⛏️ Mining in progress...</div>
//             <div style={{ color: '#6b7280', fontSize: 12, marginTop: 4 }}>Come back when the timer ends</div>
//           </div>
//         )}
//       </div>

//       {/* Upgrade hint */}
//       <div style={{ padding: '0 24px 24px' }}>
//         <div style={{
//           background: 'linear-gradient(135deg, rgba(139,92,246,0.1), rgba(59,130,246,0.1))',
//           border: '1px solid rgba(139,92,246,0.2)',
//           borderRadius: 14, padding: '14px',
//           display: 'flex', alignItems: 'center', gap: 12,
//         }}>
//           <Zap size={20} color="#a78bfa" />
//           <div>
//             <div style={{ fontSize: 13, fontWeight: 700 }}>Boost your mining speed!</div>
//             <div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>Complete tasks to level up and earn more per hour</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

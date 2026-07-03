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

  const startMining = async () => {
  try {
    const res = await API.post('/mining/start');
    // Update context
  } catch (err) {
    alert(err.message);
  }
};

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






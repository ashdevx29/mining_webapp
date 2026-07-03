import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { formatNumber } from '../utils/helpers';

export default function ClaimModal() {
  const { mining, claimReward, showClaimModal, setShowClaimModal } = useApp();
  const [claimed, setClaimed] = useState(false);

  const handleClaim = () => {
    setClaimed(true);
    setTimeout(() => {
      claimReward();
      setClaimed(false);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {showClaimModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)',
            zIndex: 9000, display: 'flex', alignItems: 'flex-end',
            justifyContent: 'center',
          }}
          onClick={() => !claimed && setShowClaimModal(false)}
        >
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
            onClick={e => e.stopPropagation()}
            style={{
              width: '100%', maxWidth: 430,
              background: '#12121a',
              border: '1px solid rgba(245,158,11,0.25)',
              borderTopLeftRadius: 28, borderTopRightRadius: 28,
              padding: '32px 24px 48px',
              textAlign: 'center', position: 'relative', overflow: 'hidden',
            }}
          >
            {/* Gold glow top */}
            <div style={{
              position: 'absolute', top: -60, left: '50%', transform: 'translateX(-50%)',
              width: 200, height: 120,
              background: 'radial-gradient(circle, rgba(245,158,11,0.25) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            {/* Floating coins animation */}
            {!claimed && (
              <>
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -30 - Math.random() * 40],
                      x: [(Math.random() - 0.5) * 60, (Math.random() - 0.5) * 120],
                      opacity: [1, 0],
                      scale: [1, 0.5],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2, ease: 'easeOut' }}
                    style={{
                      position: 'absolute', top: '30%',
                      left: `${10 + i * 10}%`,
                      fontSize: 16, pointerEvents: 'none',
                    }}
                  >
                    🪙
                  </motion.div>
                ))}
              </>
            )}

            {/* Main content */}
            {!claimed ? (
              <>
                <motion.div
                  animate={{ scale: [1, 1.08, 1], rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{ fontSize: 72, marginBottom: 16 }}
                >
                  🎉
                </motion.div>
                <div style={{ fontSize: 24, fontWeight: 900, marginBottom: 8 }}>
                  Mining Complete!
                </div>
                <div style={{ color: '#9ca3af', fontSize: 14, marginBottom: 24 }}>
                  Your 8-hour mining session is done
                </div>
                <motion.div
                  animate={{ scale: [1, 1.04, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  style={{
                    fontSize: 42, fontWeight: 900,
                    background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    marginBottom: 8,
                  }}
                >
                  +{formatNumber(mining.reward)} MINE
                </motion.div>
                <div style={{ color: '#6b7280', fontSize: 13, marginBottom: 32 }}>
                  Ready to be claimed!
                </div>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleClaim}
                  className="btn-primary"
                  style={{ width: '100%', fontSize: 17, padding: '16px' }}
                >
                  🎁 Claim Reward
                </motion.button>
                <button
                  onClick={() => setShowClaimModal(false)}
                  style={{ background: 'none', border: 'none', color: '#6b7280',
                    fontSize: 14, marginTop: 16, cursor: 'pointer', width: '100%' }}
                >
                  Claim Later
                </button>
              </>
            ) : (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring' }}
              >
                <div style={{ fontSize: 80, marginBottom: 16 }}>✅</div>
                <div style={{ fontSize: 22, fontWeight: 900, marginBottom: 8 }}>Coins Claimed!</div>
                <div style={{
                  fontSize: 36, fontWeight: 900,
                  background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>
                  +{formatNumber(mining.reward)} MINE
                </div>
                <div style={{ color: '#6ee7b7', fontSize: 14, marginTop: 12 }}>Added to your balance</div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

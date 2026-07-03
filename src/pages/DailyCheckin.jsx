import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { formatNumber } from '../utils/helpers';
import { Check } from 'lucide-react';
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

const DAYS = [
  { day: 1, reward: 50 },
  { day: 2, reward: 100 },
  { day: 3, reward: 150 },
  { day: 4, reward: 200 },
  { day: 5, reward: 300, special: true },
  { day: 6, reward: 400 },
  { day: 7, reward: 1000, special: true },
];

export default function DailyCheckin() {
  const { user, setUser } = useApp();
  const [claimed, setClaimed] = useState(false);
  const [showAnim, setShowAnim] = useState(false);
  const streak = user.dailyStreak || 0;
  const todayClaimed = !!user.lastCheckin &&
    new Date(user.lastCheckin).toDateString() === new Date().toDateString();

  const handleClaim = () => {
    if (todayClaimed || claimed) return;
    setShowAnim(true);
    setTimeout(() => {
      const reward = DAYS[Math.min(streak, DAYS.length - 1)].reward;
      setUser(prev => ({
        ...prev,
        balance: prev.balance + reward,
        dailyStreak: prev.dailyStreak + 1,
        lastCheckin: new Date().toISOString(),
      }));
      setClaimed(true);
      setShowAnim(false);
    }, 1200);
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
          <div style={{ ...GRADIENT_TEXT, fontSize: 24, fontWeight: 700 }}>🔥 Daily Check-in</div>
          <div style={{ fontSize: 13, color: '#e8b84b', marginTop: 6 }}>
            Log in every day to earn bigger rewards
          </div>
        </div>

        {/* Streak Display */}
        <div style={{ padding: '20px 24px 0', textAlign: 'center' }}>
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 12,
              background: CARD_BG, border: '1px solid #e8b84b',
              borderRadius: 99, padding: '12px 28px',
            }}
          >
            <span style={{ fontSize: 32 }}>🔥</span>
            <div>
              <div style={{ fontSize: 26, fontWeight: 800, ...GRADIENT_TEXT }}>{streak} Day Streak</div>
              <div style={{ fontSize: 12, color: '#e8b84b' }}>Keep the fire going!</div>
            </div>
          </motion.div>
        </div>

        {/* Days Grid */}
        <div style={{ padding: '24px 24px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            {DAYS.map((d, i) => {
              const isPast = i < streak - 1;
              const isToday = i === streak - 1;
              const isFuture = i >= streak;
              return (
                <motion.div
                  key={d.day}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  style={{ padding: "1px", borderRadius: 18, background: GRADIENT_BORDER }}
                >
                  <div style={{
                    background: CARD_BG,
                    borderRadius: 16,
                    padding: '16px 8px',
                    textAlign: 'center',
                    position: 'relative',
                  }}>
                    {d.special && !isPast && (
                      <div style={{
                        position: 'absolute', top: -6, right: -4,
                        background: '#f43f5e', borderRadius: 99, fontSize: 10,
                        fontWeight: 800, padding: '2px 6px', color: '#fff',
                      }}>★</div>
                    )}

                    {isPast ? (
                      <div style={{ fontSize: 26, color: '#5fd66a' }}>✅</div>
                    ) : (
                      <div style={{ fontSize: 26 }}>{isToday ? '🎁' : '🔒'}</div>
                    )}

                    <div style={{ fontSize: 11, color: '#e8b84b', marginTop: 6, fontWeight: 600 }}>Day {d.day}</div>
                    <div style={{
                      fontSize: 13, fontWeight: 800, marginTop: 4,
                      color: isPast ? '#5fd66a' : isToday ? '#e8b84b' : '#6b5730',
                    }}>
                      {formatNumber(d.reward)}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Today's Reward */}
        <div style={{ padding: '0 24px 20px', marginTop: 20 }}>
          <div style={{ padding: "1px", borderRadius: 24, background: GRADIENT_BORDER }}>
            <div style={{
              background: CARD_BG,
              borderRadius: 22,
              padding: '24px',
              textAlign: 'center',
            }}>
              <div style={{ color: '#e8b84b', fontSize: 13, marginBottom: 8 }}>Today's Reward</div>
              <div style={{
                fontSize: 36, fontWeight: 900, ...GRADIENT_TEXT,
              }}>
                +{formatNumber(DAYS[Math.min(streak, DAYS.length - 1)].reward)} MINE
              </div>
              <div style={{ color: '#e8b84b', fontSize: 12, marginTop: 6 }}>Day {streak + 1} reward</div>
            </div>
          </div>
        </div>

        {/* Claim Button */}
        <div style={{ padding: '0 24px 20px' }}>
          <AnimatePresence>
            {showAnim && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                style={{ textAlign: 'center', padding: '20px', fontSize: 52 }}
              >
                🎉
              </motion.div>
            )}
          </AnimatePresence>

          {(todayClaimed || claimed) ? (
            <div style={{
              width: '100%', background: CARD_BG,
              border: '1px solid #5fd66a',
              borderRadius: 16, padding: '18px', textAlign: 'center',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            }}>
              <Check size={20} color="#5fd66a" />
              <span style={{ color: '#5fd66a', fontWeight: 700, fontSize: 15 }}>Already claimed today!</span>
            </div>
          ) : (
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={handleClaim}
              style={{
                width: '100%', padding: '18px',
                background: GRADIENT_BORDER,
                color: '#0a0704',
                fontSize: 16, fontWeight: 700,
                border: 'none', borderRadius: 16,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}
            >
              🎁 Claim Daily Reward
            </motion.button>
          )}
        </div>

        {/* Streak Benefits */}
        <div style={{ padding: '0 24px 32px' }}>
          <div style={{ fontSize: 12, fontWeight: 700, ...GRADIENT_TEXT, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1.2 }}>
            Streak Benefits
          </div>
          {[
            { streak: 3, benefit: '1.5x mining speed', icon: '⚡' },
            { streak: 5, benefit: 'Free Lucky Spin', icon: '🎰' },
            { streak: 7, benefit: '1000 MINE bonus', icon: '🏆' },
            { streak: 14, benefit: 'Premium membership', icon: '💎' },
          ].map((b) => (
            <div key={b.streak} style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '14px 0', borderBottom: '1px solid rgba(58,42,18,0.6)',
            }}>
              <span style={{ fontSize: 26 }}>{b.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#f3e6c9' }}>{b.benefit}</div>
                <div style={{ fontSize: 12, color: '#e8b84b' }}>At {b.streak} day streak</div>
              </div>
              {streak >= b.streak ? (
                <span style={{ color: '#5fd66a', fontSize: 18 }}>✅</span>
              ) : (
                <span style={{ color: '#6b5730', fontSize: 12, fontWeight: 700 }}>{b.streak}d</span>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Spacer */}
        <div style={{ height: 60 }} />

      </div>
    </div>
  );
}




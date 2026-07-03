import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
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

const ALL_ACHIEVEMENTS = [
  { id: 'first_mine', icon: '⛏️', title: 'First Mine', desc: 'Complete your first mining session', color: '#f59e0b', xp: 100 },
  { id: 'daily_streak_5', icon: '🔥', title: '5-Day Streak', desc: 'Check in 5 days in a row', color: '#ef4444', xp: 200 },
  { id: 'referral_king', icon: '👑', title: 'Referral King', desc: 'Invite 10+ friends', color: '#8b5cf6', xp: 500 },
  { id: 'big_earner', icon: '💎', title: 'Big Earner', desc: 'Mine 100,000 MINE total', color: '#3b82f6', xp: 300 },
  { id: 'spin_master', icon: '🎰', title: 'Spin Master', desc: 'Spin the wheel 50 times', color: '#10b981', xp: 250 },
  { id: 'task_master', icon: '📋', title: 'Task Master', desc: 'Complete 20 tasks', color: '#f43f5e', xp: 400 },
  { id: 'whale', icon: '🐋', title: 'Whale', desc: 'Hold 1,000,000 MINE', color: '#06b6d4', xp: 1000 },
  { id: 'early_bird', icon: '🌅', title: 'Early Bird', desc: 'Join in the first month', color: '#f59e0b', xp: 150 },
  { id: 'daily_streak_30', icon: '🏆', title: '30-Day Warrior', desc: 'Check in 30 days in a row', color: '#fbbf24', xp: 1000 },
  { id: 'top_100', icon: '⭐', title: 'Top 100', desc: 'Reach top 100 on leaderboard', color: '#a78bfa', xp: 500 },
  { id: 'socializer', icon: '🤝', title: 'Socializer', desc: 'Complete all social tasks', color: '#34d399', xp: 300 },
  { id: 'night_miner', icon: '🌙', title: 'Night Miner', desc: 'Mine between midnight and 4am', color: '#6b7280', xp: 100 },
];

export default function Achievements() {
  const { user } = useApp();
  const earned = user.achievements || [];
  const total = ALL_ACHIEVEMENTS.length;
  const earnedCount = earned.length;
  const totalXP = ALL_ACHIEVEMENTS.filter(a => earned.includes(a.id)).reduce((s, a) => s + a.xp, 0);

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
          <div style={{ ...GRADIENT_TEXT, fontSize: 24, fontWeight: 700 }}>🏅 Achievements</div>
          <div style={{ fontSize: 13, color: '#e8b84b', marginTop: 6 }}>
            Unlock badges by completing challenges
          </div>
        </div>

        {/* Stats Card */}
        <div style={{ padding: '24px 24px 0', }}>
          <div style={{ padding: "1px", borderRadius: 24, background: GRADIENT_BORDER }}>
            <div style={{
              background: CARD_BG,
              borderRadius: 22,
              padding: '24px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 20 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 28, fontWeight: 800, ...GRADIENT_TEXT }}>
                    {earnedCount}/{total}
                  </div>
                  <div style={{ fontSize: 11, color: '#e8b84b' }}>Unlocked</div>
                </div>
                <div style={{ width: 1, background: 'rgba(232,184,75,0.2)' }} />
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: '#a78bfa' }}>
                    {totalXP}
                  </div>
                  <div style={{ fontSize: 11, color: '#e8b84b' }}>Total XP</div>
                </div>
              </div>

              <div style={{ marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 12, color: '#e8b84b' }}>Progress</span>
                <span style={{ fontSize: 13, fontWeight: 700, ...GRADIENT_TEXT }}>
                  {Math.round((earnedCount / total) * 100)}%
                </span>
              </div>
              <div style={{ height: 8, borderRadius: 99, background: '#241708', overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(earnedCount / total) * 100}%` }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  style={{
                    height: '100%', borderRadius: 99,
                    background: 'linear-gradient(90deg, #e8b84b, #f5d99a)',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Achievements Grid */}
        <div style={{ padding: '0 20px 32px', marginTop: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {ALL_ACHIEVEMENTS.map((ach, i) => {
              const isEarned = earned.includes(ach.id);
              return (
                <motion.div
                  key={ach.id}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.04 }}
                  style={{ padding: "1px", borderRadius: 20, background: GRADIENT_BORDER }}
                >
                  <div style={{
                    background: CARD_BG,
                    borderRadius: 18,
                    padding: '20px 16px',
                    textAlign: 'center',
                    position: 'relative',
                    opacity: isEarned ? 1 : 0.65,
                  }}>
                    {isEarned && (
                      <div style={{
                        position: 'absolute', top: 12, right: 12,
                        background: '#10b981', color: '#fff',
                        width: 22, height: 22, borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 12,
                      }}>✓</div>
                    )}

                    <div style={{ fontSize: 42, marginBottom: 12, filter: isEarned ? 'none' : 'grayscale(1)' }}>
                      {ach.icon}
                    </div>

                    <div style={{ fontSize: 14, fontWeight: 700, color: isEarned ? '#f3e6c9' : '#e8b84b', marginBottom: 6 }}>
                      {ach.title}
                    </div>

                    <div style={{ fontSize: 11.5, color: '#e8b84b', lineHeight: 1.4, marginBottom: 12, minHeight: 44 }}>
                      {ach.desc}
                    </div>

                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: 5,
                      background: `${ach.color}15`, border: `1px solid ${ach.color}40`,
                      borderRadius: 99, padding: '4px 14px', fontSize: 11, fontWeight: 700,
                      color: isEarned ? ach.color : '#666',
                    }}>
                      {isEarned ? '⭐' : '🔒'} {ach.xp} XP
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom Spacer */}
        <div style={{ height: 60 }} />

      </div>
    </div>
  );
}


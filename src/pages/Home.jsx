import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { formatNumber } from '../utils/helpers';
import { Zap, Bell, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import coinImg from '../assets/coin.png';
import bgImage from "../assets/page-bg.png";

const QUICK_STATS = [
  { label: 'Total Mined', key: 'totalMined' },
  { label: 'Referrals', key: 'totalReferrals' },
  { label: 'Balance', key: 'balance' },
];

const QUICK_ACTIONS = [
  // { label: 'Lucky Spin', desc: '3 free spins!', route: '/spin' },
  // { label: 'Tasks', desc: 'Earn more coins', route: '/tasks' },
  { label: 'Invite Friends', desc: '+1 USDT per referral', route: '/referral' },
  // { label: 'Leaderboard', desc: 'View top miners', route: '/leaderboard' },
];

const NEWS_ITEMS = [
  { 
    id: 1, 
    badge: 'REFERRAL',
    title: '👥 Referral Bonus Activated',
    desc: 'Add a referral & get 1 USDT extra mining starting from next day!',
    highlight: true
  },
  { 
    id: 2, 
    badge: 'HOT', 
    title: '💎 Diamond miners get 2x rewards', 
    desc: 'Reach Diamond level this week for bonus rewards.' 
  },
  { 
    id: 3, 
    badge: 'EVENT', 
    title: '🏆 Weekly Tournament started!', 
    desc: 'Top 10 miners share 50,000 MINE prize pool.' 
  },
];
const BADGE_COLORS = {
  NEW: { bg: '#3a2c0d', text: '#e8b84b' },
  HOT: { bg: '#3a140f', text: '#ef6a4c' },
  EVENT: { bg: '#122f24', text: '#4fd18a' },
};

const GRADIENT_BORDER = "linear-gradient(135deg,#FFF2A6 0%,#FFD96A 12%,#FFC83D 28%,#F5B300 45%,#D88A00 68%,#8A5200 100%)";
const CARD_BG = "#0A090A";

const GRADIENT_TEXT = {
  background: GRADIENT_BORDER,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  color: "transparent",
};

export default function Home() {
  const { user, mining, unreadCount, loading } = useApp();
  const navigate = useNavigate();
  const isMiningActive = mining?.isActive ?? false;

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#0a0704', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 60, height: 60, margin: '0 auto 16px', border: '3px solid #e8b84b', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
          <div style={{ color: '#e8b84b', fontWeight: 600 }}>Loading...</div>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }


  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{ background: "transparent" }}
    >
      {/* Background */}
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
        <div style={{ padding: '8px 8px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 60,
              height: 60,
              padding: 2,
              borderRadius: "50%",
              background: GRADIENT_BORDER,
            }}>
              <div style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                background: CARD_BG,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                fontWeight: 800,
                color: "#ffffff",
              }}>
                {user?.fullName?.[0] || 'U'}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 600, color: '#f3e6c9' }}>Hey, {user?.fullName || 'Miner'}! 👋</div>
              <div style={{ fontSize: 13, color: '#e8b84b', marginTop: 2 }}>{user?.email}</div>
            </div>
          </div>

          <button
            onClick={() => navigate('/notifications')}
            style={{
              position: 'relative', background: CARD_BG, border: '1px solid #e8b84b',
              width: 48, height: 48, borderRadius: '20%', display: 'flex',
              alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            }}
          >
            <Bell size={24} color="#e8b84b" strokeWidth={2} />
            {unreadCount > 0 && (
              <span style={{
                position: 'absolute', top: 12, right: 12, width: 8, height: 8,
                background: '#e8b84b', borderRadius: '50%',
              }} />
            )}
          </button>
        </div>

        {/* Balance Card */}
        <div style={{ padding: '20px 8px 0' }}>
          <div style={{ padding: "1px", borderRadius: 28, background: GRADIENT_BORDER, boxShadow: "0 0 20px rgba(245,179,0,.12)" }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: CARD_BG,
                borderRadius: 26,
                padding: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 16, fontWeight: 600, ...GRADIENT_TEXT }}>
                  Total Balance
                </div>
                <div style={{ marginTop: 8, display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <span style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-1px', color: '#f5d99a' }}>
                    {formatNumber(user?.balance || 0)}
                  </span>
                  <span style={{ fontSize: 15, fontWeight: 700, ...GRADIENT_TEXT }}>MINE</span>
                </div>
                <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    background: isMiningActive ? '#0f1a10' : '#161208',
                    border: `1px solid ${isMiningActive ? '#2c5c30' : '#db8f1d'}`,
                    borderRadius: 99, padding: '6px 10px',
                  }}>
                    <span style={{
                      width: 6, height: 6, borderRadius: '50%',
                      background: isMiningActive ? '#5fd66a' : '#e8b84b',
                      boxShadow: isMiningActive ? '0 0 8px #5fd66a' : 'none',
                    }} />
                    <span style={{ fontSize: 10, fontWeight: 600, color: isMiningActive ? '#5fd66a' : '#e8b84b' }}>
                      {isMiningActive ? 'Mining Live' : 'Mining Idle'}
                    </span>
                  </div>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 5,
                    background: '#161208', border: '1px solid #db8f1d',
                    borderRadius: 99, padding: '6px 10px',
                  }}>
                    <Zap size={12} color="#e8b84b" fill="#e8b84b" />
                    <span style={{ fontSize: 10, fontWeight: 600, color: '#e8b84b' }}>
                      1 USDT /hr
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ position: 'relative', flexShrink: 0 }}>
                <div style={{
                  position: 'absolute', inset: 0, zIndex: -1, filter: 'blur(24px)',
                  background: 'radial-gradient(circle, rgba(232,184,75,0.35), transparent 70%)',
                }} />
                <img src={coinImg} alt="Mine coin" style={{
                  width: 128, height: 128, objectFit: 'contain',
                  filter: 'drop-shadow(0 0 20px rgba(232,184,75,0.4))',
                }} />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Quick Stats */}
        <div style={{ padding: '20px 8px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <span style={{ color: '#c9922f' }}>•</span>
            <span style={{ fontSize: 10, fontWeight: 700, ...GRADIENT_TEXT, letterSpacing: 1.5, textTransform: 'uppercase' }}>
              Quick Stats
            </span>
            <span style={{ flex: 1, height: 1, background: 'linear-gradient(to right, #4a3a18, transparent)' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
            {QUICK_STATS.map((stat, i) => (
              <motion.div
                key={stat.key}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.06 }}
                style={{ padding: "1px", borderRadius: 18, background: GRADIENT_BORDER }}
              >
                <div style={{
                  background: CARD_BG,
                  borderRadius: 16,
                  padding: '14px 5px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 6,
                }}>
                  <img src={coinImg} alt="" style={{ width: 30, height: 30, objectFit: 'contain', filter: 'drop-shadow(0 0 6px rgba(245,180,60,0.55))' }} />
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#ffffff' }}>
                    {stat.prefix || ''}{formatNumber(user?.[stat.key] ?? 0)}{stat.suffix || ''}
                  </div>
                  <div style={{ fontSize: 9, fontWeight: 700, color: '#e8b84b', textTransform: 'uppercase', letterSpacing: 0.8, textAlign: 'center' }}>
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ padding: '20px 8px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <span style={{ color: '#c9922f' }}>•</span>
            <span style={{ fontSize: 12, fontWeight: 700, ...GRADIENT_TEXT, letterSpacing: 1.5, textTransform: 'uppercase' }}>
              Quick Actions
            </span>
            <span style={{ flex: 1, height: 1, background: 'linear-gradient(to right, #4a3a18, transparent)' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {QUICK_ACTIONS.map((item) => (
              <motion.button
                key={item.route}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate(item.route)}
                style={{ padding: "1px", borderRadius: 18, background: GRADIENT_BORDER }}
              >
                <div style={{
                  background: CARD_BG,
                  borderRadius: 16,
                  padding: '12px 8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  textAlign: 'left',
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(0,0,0,0.4)', boxShadow: 'inset 0 0 0 1px #e8b84b',
                  }}>
                    <img src={coinImg} alt="" style={{ width: 24, height: 24, objectFit: 'contain', filter: 'drop-shadow(0 0 6px rgba(245,180,60,0.55))' }} />
                  </div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#ffffff' }}>{item.label}</div>
                    <div style={{ fontSize: 10, color: '#e8b84b', marginTop: 1 }}>{item.desc}</div>
                  </div>
                  <ChevronRight size={18} color="#e8b84b" style={{ flexShrink: 0 }} />
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* News / Announcements */}
        <div style={{ padding: '20px 8px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <span style={{ fontSize: 16 }}>📣</span>
            <span style={{ fontSize: 12, fontWeight: 700, ...GRADIENT_TEXT, letterSpacing: 1.5, textTransform: 'uppercase' }}>
              Announcements
            </span>
            <span style={{ flex: 1, height: 1, background: 'linear-gradient(to right, #4a3a18, transparent)' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {NEWS_ITEMS.map((item, i) => {
              const colors = BADGE_COLORS[item.badge] || BADGE_COLORS.NEW;
              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  style={{ padding: "1px", borderRadius: 18, background: GRADIENT_BORDER }}
                >
                  <div style={{
                    background: CARD_BG,
                    borderRadius: 16,
                    padding: '20px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: 12,
                    textAlign: 'left',
                    cursor: 'pointer',
                  }}>
                    <div style={{ flex: 1 }}>
                      <span style={{
                        display: 'inline-block', marginBottom: 10,
                        fontSize: 10, fontWeight: 700, letterSpacing: 0.5,
                        padding: '3px 10px', borderRadius: 99,
                        background: colors.bg, color: colors.text,
                      }}>
                        {item.badge}
                      </span>
                      <div style={{ fontSize: 15, fontWeight: 600, color: '#ffffff' }}>{item.title}</div>
                      <div style={{ fontSize: 13, color: '#e8b84b', marginTop: 6, lineHeight: 1.5 }}>{item.desc}</div>
                    </div>
                    <ChevronRight size={18} color="#e8b84b" style={{ flexShrink: 0, marginTop: 4 }} />
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
        <div style={{ height: 100 }} /> {/* Spacer for bottom nav */}

      </div>
    </div>
  );
}







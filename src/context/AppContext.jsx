import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext(null);

export const useApp = () => useContext(AppContext);

// Mock user data
const MOCK_USER = {
  id: '123456789',
  telegramId: '123456789',
  username: 'cryptominer',
  firstName: 'Alex',
  lastName: 'Miner',
  avatar: null,
  balance: 48250,
  totalMined: 182500,
  level: 7,
  levelName: 'Gold Miner',
  rank: 142,
  referralCode: 'ALEX2024',
  referrals: 23,
  referralEarnings: 4600,
  dailyStreak: 5,
  lastCheckin: null,
  achievements: ['first_mine', 'referral_king', 'daily_streak_5'],
  walletAddress: '',
  joinedAt: '2024-01-15',
};

const MOCK_MINING_STATE = {
  isActive: false,
  startTime: null,
  endTime: null,
  duration: 8 * 60 * 60 * 1000, // 8 hours in ms
  reward: 200,
  progress: 0,
  canClaim: false,
  miningRate: 25, // coins per hour
};

export function AppProvider({ children }) {
  const [user, setUser] = useState(MOCK_USER);
  const [mining, setMining] = useState(MOCK_MINING_STATE);
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'reward', title: 'Mining Complete!', message: 'You earned 200 MINE coins.', time: '2m ago', read: false },
    { id: 2, type: 'referral', title: 'New Referral!', message: 'John joined using your link. +50 MINE!', time: '1h ago', read: false },
    { id: 3, type: 'task', title: 'Task Completed', message: 'Follow on Twitter — +100 MINE credited.', time: '3h ago', read: true },
    { id: 4, type: 'system', title: 'Daily Bonus Available', message: "Don't forget your daily check-in!", time: '5h ago', read: true },
  ]);
  const [showClaimModal, setShowClaimModal] = useState(false);

  // Mining tick
  useEffect(() => {
    if (!mining.isActive) return;
    const interval = setInterval(() => {
      setMining(prev => {
        const elapsed = Date.now() - prev.startTime;
        const progress = Math.min((elapsed / prev.duration) * 100, 100);
        const canClaim = progress >= 100;
        return { ...prev, progress, canClaim };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [mining.isActive]);

  const startMining = () => {
    setMining(prev => ({
      ...prev,
      isActive: true,
      startTime: Date.now(),
      progress: 0,
      canClaim: false,
    }));
  };

  const claimReward = () => {
    setUser(prev => ({
      ...prev,
      balance: prev.balance + mining.reward,
      totalMined: prev.totalMined + mining.reward,
    }));
    setMining(prev => ({
      ...prev,
      isActive: false,
      startTime: null,
      progress: 0,
      canClaim: false,
    }));
    setShowClaimModal(false);
  };

  const markNotificationRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AppContext.Provider value={{
      user, setUser,
      mining, setMining,
      startMining, claimReward,
      notifications, markNotificationRead, unreadCount,
      showClaimModal, setShowClaimModal,
    }}>
      {children}
    </AppContext.Provider>
  );
}

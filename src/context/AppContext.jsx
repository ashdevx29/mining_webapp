
// // src/context/AppContext.jsx
// import { createContext, useContext, useState, useEffect } from 'react';
// import API from '../services/api';

// const AppContext = createContext();

// export const useApp = () => useContext(AppContext);

// export const AppProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [mining, setMining] = useState({
//     isActive: false,
//     canClaim: false,
//     progress: 0,
//     earnedSoFar: 0,
//     totalReward: 0,
//     startTime: null,
//     duration: 8 * 60 * 60 * 1000,
//     reward: 0,
//   });
//   const [showClaimModal, setShowClaimModal] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [unreadCount, setUnreadCount] = useState(0);

//   const loadUserData = async () => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       setUser(null);
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await API.get('/auth/me');
//       if (res.data.success) {
//         setUser(res.data.user);
//         await loadMiningStatus();
//       }
//     } catch (err) {
//       console.error(err);
//       if (err.response?.status === 401) localStorage.removeItem('token');
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadMiningStatus = async () => {
//     try {
//       const res = await API.get('/mining/status');
//       if (res.data.session) {
//         const s = res.data.session;
//         setMining({
//           isActive: true,
//           canClaim: s.canClaim,
//           progress: s.progress,
//           earnedSoFar: s.earnedSoFar || 0,
//           totalReward: s.totalReward || 1,
//           startTime: s.startTime,
//           duration: s.duration,
//           reward: s.totalReward || s.reward,
//         });
//       } else {
//         setMining({ isActive: false, canClaim: false, earnedSoFar: 0, progress: 0 });
//       }
//     } catch (err) {
//       console.error("Mining status error:", err);
//     }
//   };

//   useEffect(() => {
//     if (user) {
//       loadMiningStatus();
//       const interval = setInterval(loadMiningStatus, 30000);
//       return () => clearInterval(interval);
//     }
//   }, [user]);

//   useEffect(() => {
//     loadUserData();
//   }, []);

//   return (
//     <AppContext.Provider value={{
//       user, setUser,
//       mining, setMining,
//       showClaimModal, setShowClaimModal,
//       loadUserData, loadMiningStatus,
//       loading, unreadCount, setUnreadCount
//     }}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// src/context/AppContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [mining, setMining] = useState({
    isActive: false,
    canClaim: false,
    progress: 0,
    earnedSoFar: 0,
    totalReward: 0,
    startTime: null,
    duration: 8 * 60 * 60 * 1000,
    reward: 0,
  });
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  const loadUserData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await API.get('/auth/me');
      if (res.data.success) {
        setUser(res.data.user);
        await loadMiningStatus();
        await loadUnreadCount();        // ← Added
      }
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const loadMiningStatus = async () => {
    try {
      const res = await API.get('/mining/status');
      if (res.data.session) {
        const s = res.data.session;
        setMining({
          isActive: true,
          canClaim: s.canClaim,
          progress: s.progress,
          earnedSoFar: s.earnedSoFar || 0,
          totalReward: s.totalReward || 1,
          startTime: s.startTime,
          duration: s.duration,
          reward: s.totalReward || s.reward,
        });
      } else {
        setMining({ isActive: false, canClaim: false, earnedSoFar: 0, progress: 0 });
      }
    } catch (err) {
      console.error("Mining status error:", err);
    }
  };

  // ✅ New: Load Unread Notifications Count
  const loadUnreadCount = async () => {
    if (!user) return;
    try {
      const res = await API.get('/notifications');
      setUnreadCount(res.data.unreadCount || 0);
    } catch (err) {
      console.error("Failed to load unread notifications:", err);
    }
  };

  // Auto refresh mining & notifications
  useEffect(() => {
    if (user) {
      loadMiningStatus();
      loadUnreadCount();                    // ← Added

      const interval = setInterval(() => {
        loadMiningStatus();
        loadUnreadCount();
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [user]);

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <AppContext.Provider value={{
      user, 
      setUser,
      mining, 
      setMining,
      showClaimModal, 
      setShowClaimModal,
      loadUserData, 
      loadMiningStatus,
      loadUnreadCount,          // ← Exported (optional)
      loading, 
      unreadCount, 
      setUnreadCount
    }}>
      {children}
    </AppContext.Provider>
  );
};

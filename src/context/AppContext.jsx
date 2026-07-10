// src/context/AppContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUserData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    // Always ensure header is set before calling /me
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    setLoading(true);
    try {
      const res = await API.get('/me');
      // Check if the response indicates success
      if (res.data?.success === false) {
        // Token is invalid — clear it
        localStorage.removeItem('token');
        delete API.defaults.headers.common['Authorization'];
        setUser(null);
      } else {
        setUser(res.data.user || res.data);
      }
    } catch (err) {
      console.error("Error loading user data:", err);
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        delete API.defaults.headers.common['Authorization'];
      }
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      loadUserData();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AppContext.Provider value={{ user, setUser, loadUserData, loading }}>
      {children}
    </AppContext.Provider>
  );
};







// import React, { createContext, useContext, useState, useEffect } from 'react';
// import API from '../services/api';
// import { useNavigate } from 'react-router-dom';

// const AppContext = createContext(null);

// export const useApp = () => useContext(AppContext);

// export function AppProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [mining, setMining] = useState({
//     isActive: false,
//     startTime: null,
//     endTime: null,
//     duration: 8 * 60 * 60 * 1000,
//     reward: 0,
//     progress: 0,
//     canClaim: false,
//     miningRate: 25,
//   });
//   const [notifications, setNotifications] = useState([
//     { id: 1, type: 'reward', title: 'Mining Complete!', message: 'You earned 200 MINE coins.', time: '2m ago', read: false },
//     { id: 2, type: 'referral', title: 'New Referral!', message: 'John joined using your link. +50 MINE!', time: '1h ago', read: false },
//     { id: 3, type: 'task', title: 'Task Completed', message: 'Follow on Twitter — +100 MINE credited.', time: '3h ago', read: true },
//     { id: 4, type: 'system', title: 'Daily Bonus Available', message: "Don't forget your daily check-in!", time: '5h ago', read: true },
//   ]);
//   const [showClaimModal, setShowClaimModal] = useState(false);

//   const [loadingInitial, setLoadingInitial] = useState(true);

//   // Load user data
//   const loadUserData = async () => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       setLoadingInitial(false);
//       return;
//     }


//     try {
//       // Setup API auth header
//       API.defaults.headers.common['Authorization'] = `Bearer ${token}`;

//       const resUser = await API.get('/auth/me');
//       if (resUser.data.success) {
//         setUser(resUser.data.user);
//       }

//       const resMining = await API.get('/mining/status');
//       if (resMining.data.success && resMining.data.session) {
//         const session = resMining.data.session;
//         const start = new Date(session.startTime).getTime();
//         const end = new Date(session.endTime).getTime();
//         const dur = end - start;
//         setMining(prev => ({
//           ...prev,
//           isActive: true,
//           startTime: start,
//           endTime: end,
//           duration: dur,
//           reward: session.reward,
//         }));
//       }
//       } catch (err) {
//     console.error("Error loading user data:", err);
//     // Clear invalid token
//     if (err.response?.status === 401) {
//       localStorage.removeItem('token');
//       delete API.defaults.headers.common['Authorization'];
//       setUser(null);
//     }
//   } finally {
//     setLoadingInitial(false);
//   }
//     // } catch (err) {
//     //   console.error("Error loading user data:", err);
//     //   // Optional: Handle token expiry
//     // } finally {
//     //   setLoadingInitial(false);
//     // }
//   };

//   useEffect(() => {
//     loadUserData();
//   }, []);

//   // Mining tick
//   useEffect(() => {
//     if (!mining.isActive || !mining.startTime) return;
//     const interval = setInterval(() => {
//       setMining(prev => {
//         const elapsed = Date.now() - prev.startTime;
//         const progress = Math.min((elapsed / prev.duration) * 100, 100);
//         const canClaim = progress >= 100;
//         return { ...prev, progress, canClaim };
//       });
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [mining.isActive, mining.startTime]);

//   const startMining = async () => {
//     try {
//       const res = await API.post('/mining/start');
//       if (res.data.success) {
//         const session = res.data.session;
//         const start = new Date(session.startTime).getTime();
//         const end = new Date(session.endTime).getTime();
        
//         setMining(prev => ({
//           ...prev,
//           isActive: true,
//           startTime: start,
//           endTime: end,
//           duration: end - start,
//           reward: session.reward,
//           progress: 0,
//           canClaim: false,
//         }));
//       }
//     } catch (err) {
//       alert(err.response?.data?.message || err.message);
//     }
//   };

//   const claimReward = async () => {
//     try {
//       const res = await API.post('/mining/claim');
//       if (res.data.success) {
//         setUser(prev => ({
//           ...prev,
//           balance: prev.balance + res.data.reward,
//           totalMined: prev.totalMined + res.data.reward,
//         }));
//         setMining(prev => ({
//           ...prev,
//           isActive: false,
//           startTime: null,
//           endTime: null,
//           progress: 0,
//           canClaim: false,
//         }));
//         setShowClaimModal(false);
//       }
//     } catch (err) {
//       alert(err.response?.data?.message || err.message);
//     }
//   };

//   const markNotificationRead = (id) => {
//     setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
//   };

//   const unreadCount = notifications.filter(n => !n.read).length;

//   return (
//     <AppContext.Provider value={{
//       user, setUser, loadUserData, loadingInitial,
//       mining, setMining,
//       startMining, claimReward,
//       notifications, markNotificationRead, unreadCount,
//       showClaimModal, setShowClaimModal,
//     }}>
//       {children}
//     </AppContext.Provider>
//   );
// }

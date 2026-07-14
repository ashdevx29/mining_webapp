// import React from 'react';
// import { motion } from 'framer-motion';
// import { useApp } from '../context/AppContext';
// import { Bell, Coins, Users, CheckSquare, Info } from 'lucide-react';
// import bgImage from "../assets/page-bg.png";

// const GRADIENT_BORDER = "linear-gradient(135deg,#FFF2A6 0%,#FFD96A 12%,#FFC83D 28%,#F5B300 45%,#D88A00 68%,#8A5200 100%)";
// const CARD_BG = "#0A090A";

// const GRADIENT_TEXT = {
//   background: GRADIENT_BORDER,
//   WebkitBackgroundClip: "text",
//   WebkitTextFillColor: "transparent",
//   backgroundClip: "text",
//   color: "transparent",
// };

// const TYPE_ICONS = {
//   reward: '⛏️',
//   referral: '👥',
//   task: '📋',
//   system: '📢',
// };
// const TYPE_COLORS = {
//   reward: '#e8b84b',
//   referral: '#5fd66a',
//   task: '#60a5fa',
//   system: '#c084fc',
// };

// export default function Notifications() {
//   const { notifications, markNotificationRead } = useApp();

//   return (
//     <div className="relative min-h-screen overflow-x-hidden" style={{ background: "transparent" }}>
//       {/* Background Image */}
//       <div
//         className="fixed inset-0 z-0 pointer-events-none"
//         style={{
//           backgroundImage: `url(${bgImage})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//           opacity: 0.35,
//         }}
//       />

//       {/* Dark Overlay */}
//       <div className="fixed inset-0 z-0 bg-black/45 pointer-events-none" />

//       {/* Main Content */}
//       <div className="relative z-10 max-w-[430px] mx-auto min-h-screen pb-28">

//         {/* Header */}
//         <div style={{ padding: '32px 24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//           <div>
//             <div style={{ ...GRADIENT_TEXT, fontSize: 24, fontWeight: 700 }}>🔔 Notifications</div>
//             <div style={{ fontSize: 13, color: '#e8b84b', marginTop: 4 }}>
//               {notifications.filter(n => !n.read).length} unread
//             </div>
//           </div>
//         </div>

//         {/* Notifications List */}
//         <div style={{ padding: '20px 24px 40px', display: 'flex', flexDirection: 'column', gap: 12 }}>
//           {notifications.map((n, i) => (
//             <motion.div
//               key={n.id}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: i * 0.04 }}
//               onClick={() => markNotificationRead(n.id)}
//               style={{
//                 padding: "1px",
//                 borderRadius: 18,
//                 background: GRADIENT_BORDER,
//                 cursor: 'pointer',
//               }}
//             >
//               <div style={{
//                 background: CARD_BG,
//                 borderRadius: 16,
//                 padding: '16px',
//                 display: 'flex',
//                 alignItems: 'flex-start',
//                 gap: 14,
//               }}>
//                 <div style={{
//                   width: 44, height: 44, borderRadius: 12, fontSize: 22,
//                   display: 'flex', alignItems: 'center', justifyContent: 'center',
//                   background: `${TYPE_COLORS[n.type]}15`, flexShrink: 0,
//                 }}>
//                   {TYPE_ICONS[n.type]}
//                 </div>
//                 <div style={{ flex: 1 }}>
//                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//                     <div style={{ fontSize: 14, fontWeight: 600, color: '#f3e6c9' }}>{n.title}</div>
//                     <div style={{ fontSize: 10, color: '#e8b84b', whiteSpace: 'nowrap' }}>{n.time}</div>
//                   </div>
//                   <div style={{ fontSize: 13, color: '#c9b38a', marginTop: 4, lineHeight: 1.5 }}>
//                     {n.message}
//                   </div>
//                 </div>
//                 {!n.read && (
//                   <div style={{
//                     width: 9, height: 9, borderRadius: '50%',
//                     background: TYPE_COLORS[n.type], marginTop: 6, flexShrink: 0,
//                   }} />
//                 )}
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Bottom Spacer */}
//         <div style={{ height: 100 }} />

//       </div>
//     </div>
//   );
// }




import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { Bell } from 'lucide-react';
import API from '../services/api';
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

const TYPE_ICONS = {
  reward: '⛏️',
  referral: '👥',
  task: '📋',
  system: '📢',
  hot: '🔥',
  event: '🏆',
};

const TYPE_COLORS = {
  reward: '#e8b84b',
  referral: '#5fd66a',
  task: '#60a5fa',
  system: '#c084fc',
  hot: '#ef4444',
  event: '#22c55e',
};

export default function Notifications() {
  const { unreadCount, setUnreadCount } = useApp();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch notifications from API
  const fetchNotifications = async () => {
    try {
      const res = await API.get('/notifications');
      setNotifications(res.data.notifications || []);
      setUnreadCount(res.data.unreadCount || 0);
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  // Mark single notification as read
  const markNotificationRead = async (id) => {
    try {
      await API.put(`/notifications/${id}/read`);
      
      // Update UI locally
      setNotifications(prev =>
        prev.map(notif =>
          notif._id === id ? { ...notif, read: true } : notif
        )
      );
      
      // Refresh unread count
      const res = await API.get('/notifications');
      setUnreadCount(res.data.unreadCount || 0);
    } catch (err) {
      console.error("Failed to mark as read:", err);
    }
  };

  // Mark all as read
  const markAllAsRead = async () => {
    try {
      await API.put('/notifications/read-all');
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error("Failed to mark all as read:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0a0704' }}>
        <div className="text-[#e8b84b]">Loading notifications...</div>
      </div>
    );
  }

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
        <div style={{ padding: '32px 24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ ...GRADIENT_TEXT, fontSize: 24, fontWeight: 700 }}>🔔 Notifications</div>
            <div style={{ fontSize: 13, color: '#e8b84b', marginTop: 4 }}>
              {unreadCount} unread
            </div>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              style={{
                fontSize: 13,
                color: '#e8b84b',
                textDecoration: 'underline',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Mark all read
            </button>
          )}
        </div>

        {/* Notifications List */}
        <div style={{ padding: '20px 24px 40px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {notifications.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#c9b38a' }}>
              <Bell size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
              <p>No notifications yet</p>
            </div>
          ) : (
            notifications.map((n, i) => (
              <motion.div
                key={n._id || i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => markNotificationRead(n._id)}
                style={{
                  padding: "1px",
                  borderRadius: 18,
                  background: GRADIENT_BORDER,
                  cursor: 'pointer',
                }}
              >
                <div style={{
                  background: CARD_BG,
                  borderRadius: 16,
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 14,
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12, fontSize: 22,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: `${TYPE_COLORS[n.badge?.toLowerCase()] || TYPE_COLORS.system}15`,
                    flexShrink: 0,
                  }}>
                    {TYPE_ICONS[n.badge?.toLowerCase()] || '📢'}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#f3e6c9' }}>
                        {n.title}
                      </div>
                      <div style={{ fontSize: 10, color: '#e8b84b', whiteSpace: 'nowrap' }}>
                        {new Date(n.createdAt).toLocaleDateString('en-IN', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </div>
                    <div style={{ fontSize: 13, color: '#c9b38a', marginTop: 4, lineHeight: 1.5 }}>
                      {n.desc}
                    </div>
                  </div>

                  {!n.read && (
                    <div style={{
                      width: 9, height: 9, borderRadius: '50%',
                      background: TYPE_COLORS[n.badge?.toLowerCase()] || '#e8b84b',
                      marginTop: 6,
                      flexShrink: 0,
                    }} />
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Bottom Spacer */}
        <div style={{ height: 100 }} />
      </div>
    </div>
  );
}
import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { Bell, Coins, Users, CheckSquare, Info } from 'lucide-react';
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
};
const TYPE_COLORS = {
  reward: '#e8b84b',
  referral: '#5fd66a',
  task: '#60a5fa',
  system: '#c084fc',
};

export default function Notifications() {
  const { notifications, markNotificationRead } = useApp();

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
              {notifications.filter(n => !n.read).length} unread
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div style={{ padding: '20px 24px 40px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {notifications.map((n, i) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => markNotificationRead(n.id)}
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
                  background: `${TYPE_COLORS[n.type]}15`, flexShrink: 0,
                }}>
                  {TYPE_ICONS[n.type]}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#f3e6c9' }}>{n.title}</div>
                    <div style={{ fontSize: 10, color: '#e8b84b', whiteSpace: 'nowrap' }}>{n.time}</div>
                  </div>
                  <div style={{ fontSize: 13, color: '#c9b38a', marginTop: 4, lineHeight: 1.5 }}>
                    {n.message}
                  </div>
                </div>
                {!n.read && (
                  <div style={{
                    width: 9, height: 9, borderRadius: '50%',
                    background: TYPE_COLORS[n.type], marginTop: 6, flexShrink: 0,
                  }} />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Spacer */}
        <div style={{ height: 60 }} />

      </div>
    </div>
  );
}



// import React from 'react';
// import { motion } from 'framer-motion';
// import { useApp } from '../context/AppContext';
// // import { markNotificationRead } from '../context/AppContext';
// import { Bell, Coins, Users, CheckSquare, Info } from 'lucide-react';

// const TYPE_ICONS = {
//   reward: '⛏️',
//   referral: '👥',
//   task: '📋',
//   system: '📢',
// };
// const TYPE_COLORS = {
//   reward: '#f59e0b',
//   referral: '#10b981',
//   task: '#3b82f6',
//   system: '#8b5cf6',
// };

// export default function Notifications() {
//   const { notifications, markNotificationRead } = useApp();

//   return (
//     <div className="page-content">
//       <div style={{ padding: '20px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//         <div>
//           <div style={{ fontSize: 22, fontWeight: 900 }}>🔔 Notifications</div>
//           <div style={{ fontSize: 13, color: '#6b7280', marginTop: 2 }}>
//             {notifications.filter(n => !n.read).length} unread
//           </div>
//         </div>
//       </div>

//       <div style={{ padding: '16px 20px 32px', display: 'flex', flexDirection: 'column', gap: 10 }}>
//         {notifications.map((n, i) => (
//           <motion.div
//             key={n.id}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: i * 0.06 }}
//             onClick={() => markNotificationRead(n.id)}
//             style={{
//               background: n.read ? '#1a1a2e' : `${TYPE_COLORS[n.type]}08`,
//               border: `1px solid ${n.read ? 'rgba(255,255,255,0.05)' : `${TYPE_COLORS[n.type]}30`}`,
//               borderRadius: 16, padding: '14px 16px',
//               display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer',
//             }}
//           >
//             <div style={{
//               width: 42, height: 42, borderRadius: 13, fontSize: 20,
//               display: 'flex', alignItems: 'center', justifyContent: 'center',
//               background: `${TYPE_COLORS[n.type]}15`, flexShrink: 0,
//             }}>
//               {TYPE_ICONS[n.type]}
//             </div>
//             <div style={{ flex: 1 }}>
//               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
//                 <div style={{ fontSize: 13, fontWeight: 700 }}>{n.title}</div>
//                 <div style={{ fontSize: 10, color: '#6b7280' }}>{n.time}</div>
//               </div>
//               <div style={{ fontSize: 12, color: '#9ca3af' }}>{n.message}</div>
//             </div>
//             {!n.read && (
//               <div style={{
//                 width: 8, height: 8, borderRadius: '50%',
//                 background: TYPE_COLORS[n.type], flexShrink: 0, marginTop: 4,
//               }} />
//             )}
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }

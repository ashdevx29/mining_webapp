import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Bell, Moon, Globe, Shield, Vibrate, Volume2 } from 'lucide-react';
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

function Toggle({ value, onChange }) {
  return (
    <motion.div
      onClick={() => onChange(!value)}
      style={{
        width: 44, height: 26, borderRadius: 99,
        background: value ? '#e8b84b' : 'rgba(255,255,255,0.12)',
        position: 'relative', cursor: 'pointer',
        border: `1px solid ${value ? '#e8b84b' : 'rgba(232,184,75,0.3)'}`,
      }}
    >
      <motion.div
        animate={{ x: value ? 20 : 2 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        style={{
          position: 'absolute', top: 3, width: 18, height: 18, borderRadius: '50%',
          background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
        }}
      />
    </motion.div>
  );
}

function SettingRow({ icon, label, desc, action, value, onToggle }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14,
      padding: '16px 0', borderBottom: '1px solid rgba(58,42,18,0.6)',
    }}>
      <div style={{
        width: 42, height: 42, borderRadius: 12,
        background: 'rgba(232,184,75,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#f3e6c9' }}>{label}</div>
        {desc && <div style={{ fontSize: 12, color: '#e8b84b', marginTop: 1 }}>{desc}</div>}
      </div>
      {action === 'toggle' ? (
        <Toggle value={value} onChange={onToggle} />
      ) : (
        <ChevronRight size={18} color="#e8b84b" />
      )}
    </div>
  );
}

export default function SettingsScreen() {
  const [settings, setSettings] = useState({
    notifications: true,
    sound: false,
    vibration: true,
    darkMode: true,
    twoFactor: false,
    autoMine: true,
  });

  const toggle = (key) => setSettings(prev => ({ ...prev, [key]: !prev[key] }));

  const SECTIONS = [
    {
      title: 'Notifications',
      items: [
        { key: 'notifications', icon: <Bell size={18} color="#e8b84b" />, label: 'Push Notifications', desc: 'Get alerts for rewards & tasks', action: 'toggle' },
        { key: 'sound', icon: <Volume2 size={18} color="#3b82f6" />, label: 'Sound Effects', desc: 'Play sounds on actions', action: 'toggle' },
        { key: 'vibration', icon: <Vibrate size={18} color="#10b981" />, label: 'Vibration', desc: 'Haptic feedback on tap', action: 'toggle' },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { key: 'darkMode', icon: <Moon size={18} color="#8b5cf6" />, label: 'Dark Mode', desc: 'Always on for best experience', action: 'toggle' },
        { key: 'autoMine', icon: <span style={{ fontSize: 18 }}>⛏️</span>, label: 'Auto-Mine Reminder', desc: 'Alert when mining is done', action: 'toggle' },
        { key: 'language', icon: <Globe size={18} color="#f43f5e" />, label: 'Language', desc: 'English', action: 'arrow' },
      ],
    },
    {
      title: 'Security',
      items: [
        { key: 'twoFactor', icon: <Shield size={18} color="#10b981" />, label: 'Two-Factor Auth', desc: 'Extra layer of security', action: 'toggle' },
        { key: 'changePin', icon: <span style={{ fontSize: 18 }}>🔑</span>, label: 'Change PIN', desc: 'Update your security PIN', action: 'arrow' },
        { key: 'sessions', icon: <span style={{ fontSize: 18 }}>📱</span>, label: 'Active Sessions', desc: 'Manage logged-in devices', action: 'arrow' },
      ],
    },
    {
      title: 'About',
      items: [
        { key: 'version', icon: <span style={{ fontSize: 18 }}>ℹ️</span>, label: 'App Version', desc: 'v1.0.0', action: 'arrow' },
        { key: 'terms', icon: <span style={{ fontSize: 18 }}>📄</span>, label: 'Terms of Service', action: 'arrow' },
        { key: 'privacy', icon: <span style={{ fontSize: 18 }}>🔒</span>, label: 'Privacy Policy', action: 'arrow' },
      ],
    },
  ];

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
        <div style={{ padding: '32px 24px 0' }}>
          <div style={{ ...GRADIENT_TEXT, fontSize: 24, fontWeight: 700 }}>⚙️ Settings</div>
          <div style={{ fontSize: 13, color: '#e8b84b', marginTop: 6 }}>Manage your preferences</div>
        </div>

        {SECTIONS.map((section) => (
          <div key={section.title} style={{ padding: '0 24px 20px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, ...GRADIENT_TEXT, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 12 }}>
              {section.title}
            </div>
            <div style={{ padding: "1px", borderRadius: 20, background: GRADIENT_BORDER }}>
              <div style={{
                background: CARD_BG,
                borderRadius: 18,
                padding: '0 20px',
              }}>
                {section.items.map((item, index) => (
                  <SettingRow
                    key={item.key}
                    icon={item.icon}
                    label={item.label}
                    desc={item.desc}
                    action={item.action}
                    value={settings[item.key]}
                    onToggle={() => toggle(item.key)}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Logout */}
        <div style={{ padding: '20px 24px 40px' }}>
          <motion.button
            whileTap={{ scale: 0.97 }}
            style={{
              width: '100%', background: 'rgba(239,68,68,0.15)',
              border: '1px solid rgba(239,68,68,0.4)',
              borderRadius: 16, padding: '16px', cursor: 'pointer',
              color: '#ef4444', fontWeight: 700, fontSize: 15,
            }}
          >
            🚪 Log Out
          </motion.button>
        </div>

        {/* Bottom Spacer */}
        <div style={{ height: 60 }} />

      </div>
    </div>
  );
}





// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { ChevronRight, Bell, Moon, Globe, Shield, Vibrate, Volume2 } from 'lucide-react';

// function Toggle({ value, onChange }) {
//   return (
//     <motion.div
//       onClick={() => onChange(!value)}
//       style={{
//         width: 44, height: 26, borderRadius: 99,
//         background: value ? '#f59e0b' : 'rgba(255,255,255,0.12)',
//         position: 'relative', cursor: 'pointer',
//         border: `1px solid ${value ? 'rgba(245,158,11,0.5)' : 'rgba(255,255,255,0.08)'}`,
//         transition: 'background 0.2s',
//       }}
//     >
//       <motion.div
//         animate={{ x: value ? 20 : 2 }}
//         transition={{ type: 'spring', stiffness: 400, damping: 20 }}
//         style={{
//           position: 'absolute', top: 3, width: 18, height: 18, borderRadius: '50%',
//           background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
//         }}
//       />
//     </motion.div>
//   );
// }

// function SettingRow({ icon, label, desc, action, value, onToggle }) {
//   return (
//     <div style={{
//       display: 'flex', alignItems: 'center', gap: 14,
//       padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.04)',
//     }}>
//       <div style={{
//         width: 40, height: 40, borderRadius: 12,
//         background: 'rgba(255,255,255,0.06)',
//         display: 'flex', alignItems: 'center', justifyContent: 'center',
//         flexShrink: 0,
//       }}>
//         {icon}
//       </div>
//       <div style={{ flex: 1 }}>
//         <div style={{ fontSize: 14, fontWeight: 600 }}>{label}</div>
//         {desc && <div style={{ fontSize: 11, color: '#6b7280', marginTop: 1 }}>{desc}</div>}
//       </div>
//       {action === 'toggle' ? (
//         <Toggle value={value} onChange={onToggle} />
//       ) : (
//         <ChevronRight size={16} color="#4b5563" />
//       )}
//     </div>
//   );
// }

// export default function SettingsScreen() {
//   const [settings, setSettings] = useState({
//     notifications: true,
//     sound: false,
//     vibration: true,
//     darkMode: true,
//     twoFactor: false,
//     autoMine: true,
//   });

//   const toggle = (key) => setSettings(prev => ({ ...prev, [key]: !prev[key] }));

//   const SECTIONS = [
//     {
//       title: 'Notifications',
//       items: [
//         { key: 'notifications', icon: <Bell size={18} color="#f59e0b" />, label: 'Push Notifications', desc: 'Get alerts for rewards & tasks', action: 'toggle' },
//         { key: 'sound', icon: <Volume2 size={18} color="#3b82f6" />, label: 'Sound Effects', desc: 'Play sounds on actions', action: 'toggle' },
//         { key: 'vibration', icon: <Vibrate size={18} color="#10b981" />, label: 'Vibration', desc: 'Haptic feedback on tap', action: 'toggle' },
//       ],
//     },
//     {
//       title: 'Preferences',
//       items: [
//         { key: 'darkMode', icon: <Moon size={18} color="#8b5cf6" />, label: 'Dark Mode', desc: 'Always on for best experience', action: 'toggle' },
//         { key: 'autoMine', icon: <span style={{ fontSize: 18 }}>⛏️</span>, label: 'Auto-Mine Reminder', desc: 'Alert when mining is done', action: 'toggle' },
//         { key: 'language', icon: <Globe size={18} color="#f43f5e" />, label: 'Language', desc: 'English', action: 'arrow' },
//       ],
//     },
//     {
//       title: 'Security',
//       items: [
//         { key: 'twoFactor', icon: <Shield size={18} color="#10b981" />, label: 'Two-Factor Auth', desc: 'Extra layer of security', action: 'toggle' },
//         { key: 'changePin', icon: <span style={{ fontSize: 18 }}>🔑</span>, label: 'Change PIN', desc: 'Update your security PIN', action: 'arrow' },
//         { key: 'sessions', icon: <span style={{ fontSize: 18 }}>📱</span>, label: 'Active Sessions', desc: 'Manage logged-in devices', action: 'arrow' },
//       ],
//     },
//     {
//       title: 'About',
//       items: [
//         { key: 'version', icon: <span style={{ fontSize: 18 }}>ℹ️</span>, label: 'App Version', desc: 'v1.0.0', action: 'arrow' },
//         { key: 'terms', icon: <span style={{ fontSize: 18 }}>📄</span>, label: 'Terms of Service', action: 'arrow' },
//         { key: 'privacy', icon: <span style={{ fontSize: 18 }}>🔒</span>, label: 'Privacy Policy', action: 'arrow' },
//       ],
//     },
//   ];

//   return (
//     <div className="page-content">
//       <div style={{ padding: '20px 20px 0' }}>
//         <div style={{ fontSize: 22, fontWeight: 900 }}>⚙️ Settings</div>
//         <div style={{ fontSize: 13, color: '#6b7280', marginTop: 4 }}>Manage your preferences</div>
//       </div>

//       {SECTIONS.map((section) => (
//         <div key={section.title} style={{ padding: '16px 20px 0' }}>
//           <div style={{ fontSize: 12, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 }}>
//             {section.title}
//           </div>
//           <div style={{
//             background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.06)',
//             borderRadius: 16, padding: '0 16px',
//           }}>
//             {section.items.map((item) => (
//               <SettingRow
//                 key={item.key}
//                 icon={item.icon}
//                 label={item.label}
//                 desc={item.desc}
//                 action={item.action}
//                 value={settings[item.key]}
//                 onToggle={() => toggle(item.key)}
//               />
//             ))}
//           </div>
//         </div>
//       ))}

//       {/* Logout */}
//       <div style={{ padding: '20px 20px 32px' }}>
//         <motion.button
//           whileTap={{ scale: 0.97 }}
//           style={{
//             width: '100%', background: 'rgba(239,68,68,0.1)',
//             border: '1px solid rgba(239,68,68,0.25)',
//             borderRadius: 14, padding: '14px', cursor: 'pointer',
//             color: '#ef4444', fontWeight: 700, fontSize: 15,
//           }}
//         >
//           🚪 Log Out
//         </motion.button>
//       </div>
//     </div>
//   );
// }


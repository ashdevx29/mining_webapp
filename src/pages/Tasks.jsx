import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { formatNumber } from '../utils/helpers';
import { ExternalLink, Check } from 'lucide-react';
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

const TASKS = [
  { id: 1, category: 'Social', icon: '🐦', title: 'Follow on Twitter', desc: 'Follow @MineBot on Twitter', reward: 100, link: 'https://twitter.com', completed: false },
  { id: 2, category: 'Social', icon: '💬', title: 'Join Telegram Channel', desc: 'Join our official channel', reward: 200, link: 'https://t.me', completed: true },
  { id: 3, category: 'Social', icon: '▶️', title: 'Subscribe on YouTube', desc: 'Subscribe to MineBot channel', reward: 150, link: 'https://youtube.com', completed: false },
  { id: 4, category: 'Partner', icon: '🤝', title: 'Try Partner App', desc: 'Install and open the partner app', reward: 500, link: '#', completed: false },
  { id: 5, category: 'Partner', icon: '🌐', title: 'Visit Partner Website', desc: 'Check out our sponsor', reward: 75, link: '#', completed: true },
  { id: 6, category: 'In-App', icon: '👥', title: 'Invite 5 Friends', desc: 'Get 5 people to join', reward: 1000, link: null, progress: 2, total: 5, completed: false },
  { id: 7, category: 'In-App', icon: '⛏️', title: 'Mine 10 Times', desc: 'Complete 10 mining sessions', reward: 300, link: null, progress: 7, total: 10, completed: false },
  { id: 8, category: 'In-App', icon: '🔥', title: '7-Day Streak', desc: 'Check in 7 days in a row', reward: 500, link: null, progress: 5, total: 7, completed: false },
];

const CATEGORIES = ['All', 'Social', 'Partner', 'In-App'];

export default function Tasks() {
  const { setUser } = useApp();
  const [filter, setFilter] = useState('All');
  const [tasks, setTasks] = useState(TASKS);
  const [claiming, setClaiming] = useState(null);

  const filtered = filter === 'All' ? tasks : tasks.filter(t => t.category === filter);
  const totalEarned = tasks.filter(t => t.completed).reduce((s, t) => s + t.reward, 0);

  const handleClaim = (task) => {
    if (task.completed || (task.progress !== undefined && task.progress < task.total)) return;
    setClaiming(task.id);
    setTimeout(() => {
      setTasks(prev => prev.map(t => t.id === task.id ? { ...t, completed: true } : t));
      setUser(prev => ({ ...prev, balance: prev.balance + task.reward }));
      setClaiming(null);
    }, 800);
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
          <div style={{ ...GRADIENT_TEXT, fontSize: 24, fontWeight: 700 }}>📋 Tasks</div>
          <div style={{ fontSize: 13, color: '#e8b84b', marginTop: 6 }}>
            Complete tasks to earn MINE coins
          </div>
        </div>

        {/* Stats */}
        <div style={{ padding: '20px 24px 0' }}>
          <div style={{ padding: "1px", borderRadius: 20, background: GRADIENT_BORDER }}>
            <div style={{
              background: CARD_BG,
              borderRadius: 18,
              padding: '20px',
              display: 'flex',
              justifyContent: 'space-around',
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: '#5fd66a' }}>
                  {tasks.filter(t => t.completed).length}/{tasks.length}
                </div>
                <div style={{ fontSize: 11, color: '#e8b84b' }}>Completed</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: '#e8b84b' }}>
                  {formatNumber(totalEarned)}
                </div>
                <div style={{ fontSize: 11, color: '#e8b84b' }}>Earned</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: '#60a5fa' }}>
                  {formatNumber(tasks.filter(t => !t.completed).reduce((s, t) => s + t.reward, 0))}
                </div>
                <div style={{ fontSize: 11, color: '#e8b84b' }}>Available</div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div style={{ padding: '0 24px 16px', display: 'flex', gap: 8, overflowX: 'auto', marginTop: 20  }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                padding: '8px 18px',
                borderRadius: 99,
                fontSize: 12.5,
                fontWeight: 700,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                border: 'none',
                background: filter === cat ? '#e8b84b' : CARD_BG,
                color: filter === cat ? '#0a0704' : '#c9b38a',
                border: filter === cat ? 'none' : '1px solid #e8b84b',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Task List */}
        <div style={{ padding: '0 24px 40px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.map((task, i) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              style={{ padding: "1px", borderRadius: 18, background: GRADIENT_BORDER }}
            >
              <div style={{
                background: CARD_BG,
                borderRadius: 16,
                padding: '16px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 14, fontSize: 24,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: task.completed ? 'rgba(16,185,129,0.15)' : 'rgba(232,184,75,0.1)',
                    flexShrink: 0,
                  }}>
                    {task.completed ? '✅' : task.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#f3e6c9' }}>{task.title}</div>
                    <div style={{ fontSize: 12, color: '#e8b84b' }}>{task.desc}</div>
                    {task.progress !== undefined && !task.completed && (
                      <div style={{ marginTop: 8 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                          <span style={{ fontSize: 11, color: '#e8b84b' }}>{task.progress}/{task.total}</span>
                          <span style={{ fontSize: 11, color: '#e8b84b' }}>{Math.round((task.progress / task.total) * 100)}%</span>
                        </div>
                        <div style={{ height: 5, background: '#241708', borderRadius: 99, overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${(task.progress / task.total) * 100}%`, background: '#e8b84b', borderRadius: 99 }} />
                        </div>
                      </div>
                    )}
                  </div>
                  <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#e8b84b' }}>+{formatNumber(task.reward)}</div>
                    {task.completed ? (
                      <div style={{ color: '#5fd66a', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Check size={14} /> Done
                      </div>
                    ) : task.link ? (
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleClaim(task)}
                        style={{
                          background: claiming === task.id ? '#e8b84b' : 'transparent',
                          border: '1px solid #e8b84b',
                          color: claiming === task.id ? '#0a0704' : '#e8b84b',
                          borderRadius: 8,
                          padding: '6px 14px',
                          fontSize: 12,
                          fontWeight: 700,
                        }}
                      >
                        Go
                      </motion.button>
                    ) : task.progress >= task.total ? (
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleClaim(task)}
                        style={{
                          background: GRADIENT_BORDER,
                          color: '#0a0704',
                          border: 'none',
                          borderRadius: 8,
                          padding: '6px 14px',
                          fontSize: 12,
                          fontWeight: 700,
                        }}
                      >
                        Claim
                      </motion.button>
                    ) : (
                      <div style={{ fontSize: 12, color: '#e8b84b' }}>{task.progress}/{task.total}</div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Spacer */}
        <div style={{ height: 100 }} />

      </div>
    </div>
  );
}





// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { useApp } from '../context/AppContext';
// import { formatNumber } from '../utils/helpers';
// import { ExternalLink, Check } from 'lucide-react';

// const TASKS = [
//   {
//     id: 1, category: 'Social', icon: '🐦',
//     title: 'Follow on Twitter', desc: 'Follow @MineBot on Twitter',
//     reward: 100, link: 'https://twitter.com', completed: false,
//   },
//   {
//     id: 2, category: 'Social', icon: '💬',
//     title: 'Join Telegram Channel', desc: 'Join our official channel',
//     reward: 200, link: 'https://t.me', completed: true,
//   },
//   {
//     id: 3, category: 'Social', icon: '▶️',
//     title: 'Subscribe on YouTube', desc: 'Subscribe to MineBot channel',
//     reward: 150, link: 'https://youtube.com', completed: false,
//   },
//   {
//     id: 4, category: 'Partner', icon: '🤝',
//     title: 'Try Partner App', desc: 'Install and open the partner app',
//     reward: 500, link: '#', completed: false,
//   },
//   {
//     id: 5, category: 'Partner', icon: '🌐',
//     title: 'Visit Partner Website', desc: 'Check out our sponsor',
//     reward: 75, link: '#', completed: true,
//   },
//   {
//     id: 6, category: 'In-App', icon: '👥',
//     title: 'Invite 5 Friends', desc: 'Get 5 people to join',
//     reward: 1000, link: null, progress: 2, total: 5, completed: false,
//   },
//   {
//     id: 7, category: 'In-App', icon: '⛏️',
//     title: 'Mine 10 Times', desc: 'Complete 10 mining sessions',
//     reward: 300, link: null, progress: 7, total: 10, completed: false,
//   },
//   {
//     id: 8, category: 'In-App', icon: '🔥',
//     title: '7-Day Streak', desc: 'Check in 7 days in a row',
//     reward: 500, link: null, progress: 5, total: 7, completed: false,
//   },
// ];

// const CATEGORIES = ['All', 'Social', 'Partner', 'In-App'];

// export default function Tasks() {
//   const { setUser } = useApp();
//   const [filter, setFilter] = useState('All');
//   const [tasks, setTasks] = useState(TASKS);
//   const [claiming, setClaiming] = useState(null);

//   const filtered = filter === 'All' ? tasks : tasks.filter(t => t.category === filter);
//   const totalEarned = tasks.filter(t => t.completed).reduce((s, t) => s + t.reward, 0);

//   const handleClaim = (task) => {
//     if (task.completed || task.progress !== undefined && task.progress < task.total) return;
//     setClaiming(task.id);
//     setTimeout(() => {
//       setTasks(prev => prev.map(t => t.id === task.id ? { ...t, completed: true } : t));
//       setUser(prev => ({ ...prev, balance: prev.balance + task.reward }));
//       setClaiming(null);
//     }, 800);
//   };

//   return (
//     <div className="page-content">
//       {/* Header */}
//       <div style={{ padding: '20px 20px 0', textAlign: 'center' }}>
//         <div style={{ fontSize: 22, fontWeight: 900 }}>📋 Tasks</div>
//         <div style={{ fontSize: 13, color: '#6b7280', marginTop: 4 }}>
//           Complete tasks to earn MINE coins
//         </div>
//       </div>

//       {/* Stats */}
//       <div style={{ padding: '16px 20px' }}>
//         <div style={{
//           background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
//           border: '1px solid rgba(245,158,11,0.2)',
//           borderRadius: 20, padding: '16px 20px',
//           display: 'flex', justifyContent: 'space-around',
//         }}>
//           <div style={{ textAlign: 'center' }}>
//             <div style={{ fontSize: 20, fontWeight: 900, color: '#fbbf24' }}>
//               {tasks.filter(t => t.completed).length}/{tasks.length}
//             </div>
//             <div style={{ fontSize: 11, color: '#6b7280' }}>Completed</div>
//           </div>
//           <div style={{ width: 1, background: 'rgba(255,255,255,0.06)' }} />
//           <div style={{ textAlign: 'center' }}>
//             <div style={{ fontSize: 20, fontWeight: 900, color: '#10b981' }}>
//               {formatNumber(totalEarned)}
//             </div>
//             <div style={{ fontSize: 11, color: '#6b7280' }}>Earned</div>
//           </div>
//           <div style={{ width: 1, background: 'rgba(255,255,255,0.06)' }} />
//           <div style={{ textAlign: 'center' }}>
//             <div style={{ fontSize: 20, fontWeight: 900, color: '#60a5fa' }}>
//               {formatNumber(tasks.filter(t => !t.completed).reduce((s, t) => s + t.reward, 0))}
//             </div>
//             <div style={{ fontSize: 11, color: '#6b7280' }}>Available</div>
//           </div>
//         </div>
//       </div>

//       {/* Category Filter */}
//       <div style={{ padding: '0 20px 16px', display: 'flex', gap: 8, overflowX: 'auto' }}>
//         {CATEGORIES.map(cat => (
//           <button
//             key={cat}
//             onClick={() => setFilter(cat)}
//             style={{
//               padding: '7px 16px', borderRadius: 99, fontSize: 12, fontWeight: 700,
//               cursor: 'pointer', whiteSpace: 'nowrap', border: 'none',
//               background: filter === cat ? '#f59e0b' : 'rgba(255,255,255,0.08)',
//               color: filter === cat ? '#000' : '#9ca3af',
//               transition: 'all 0.2s',
//             }}
//           >
//             {cat}
//           </button>
//         ))}
//       </div>

//       {/* Task List */}
//       <div style={{ padding: '0 20px 32px', display: 'flex', flexDirection: 'column', gap: 10 }}>
//         {filtered.map((task, i) => (
//           <motion.div
//             key={task.id}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: i * 0.05 }}
//             style={{
//               background: task.completed ? 'rgba(16,185,129,0.06)' : '#1a1a2e',
//               border: `1px solid ${task.completed ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.06)'}`,
//               borderRadius: 16, padding: '14px 16px',
//             }}
//           >
//             <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
//               <div style={{
//                 width: 46, height: 46, borderRadius: 14, fontSize: 22,
//                 display: 'flex', alignItems: 'center', justifyContent: 'center',
//                 background: task.completed ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.06)',
//                 flexShrink: 0,
//               }}>
//                 {task.completed ? '✅' : task.icon}
//               </div>
//               <div style={{ flex: 1, minWidth: 0 }}>
//                 <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{task.title}</div>
//                 <div style={{ fontSize: 11, color: '#6b7280' }}>{task.desc}</div>
//                 {task.progress !== undefined && !task.completed && (
//                   <div style={{ marginTop: 6 }}>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
//                       <span style={{ fontSize: 10, color: '#6b7280' }}>{task.progress}/{task.total}</span>
//                       <span style={{ fontSize: 10, color: '#fbbf24', fontWeight: 700 }}>
//                         {Math.round((task.progress / task.total) * 100)}%
//                       </span>
//                     </div>
//                     <div className="progress-bar" style={{ height: 5 }}>
//                       <div className="progress-fill" style={{ width: `${(task.progress / task.total) * 100}%` }} />
//                     </div>
//                   </div>
//                 )}
//               </div>
//               <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, flexShrink: 0 }}>
//                 <div style={{ fontSize: 12, fontWeight: 800, color: '#fbbf24' }}>
//                   +{formatNumber(task.reward)}
//                 </div>
//                 {task.completed ? (
//                   <div style={{
//                     background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)',
//                     borderRadius: 8, padding: '4px 10px',
//                     fontSize: 11, fontWeight: 700, color: '#6ee7b7',
//                     display: 'flex', alignItems: 'center', gap: 4,
//                   }}>
//                     <Check size={10} /> Done
//                   </div>
//                 ) : task.link ? (
//                   <motion.button
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() => handleClaim(task)}
//                     style={{
//                       background: claiming === task.id ? 'rgba(245,158,11,0.5)' : 'rgba(245,158,11,0.15)',
//                       border: '1px solid rgba(245,158,11,0.4)',
//                       borderRadius: 8, padding: '5px 12px', cursor: 'pointer',
//                       fontSize: 11, fontWeight: 700, color: '#fbbf24',
//                       display: 'flex', alignItems: 'center', gap: 4,
//                     }}
//                   >
//                     <ExternalLink size={10} /> Go
//                   </motion.button>
//                 ) : task.progress >= task.total ? (
//                   <motion.button
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() => handleClaim(task)}
//                     style={{
//                       background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
//                       border: 'none', borderRadius: 8, padding: '5px 12px',
//                       cursor: 'pointer', fontSize: 11, fontWeight: 800, color: '#000',
//                     }}
//                   >
//                     Claim
//                   </motion.button>
//                 ) : (
//                   <div style={{
//                     background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
//                     borderRadius: 8, padding: '5px 10px',
//                     fontSize: 11, color: '#4b5563', fontWeight: 600,
//                   }}>
//                     {task.progress}/{task.total}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }

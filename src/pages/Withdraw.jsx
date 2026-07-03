import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { formatNumber } from '../utils/helpers';
import { AlertCircle, CheckCircle, Clock, ExternalLink } from 'lucide-react';
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

const MOCK_WITHDRAWALS = [
  { id: 1, amount: 1000, address: '0x1A2b...9A0', status: 'completed', date: '2024-01-10', txHash: '0xabc...' },
  { id: 2, amount: 500, address: '0x1A2b...9A0', status: 'pending', date: '2024-01-14', txHash: null },
  { id: 3, amount: 2000, address: '0x1A2b...9A0', status: 'completed', date: '2024-01-08', txHash: '0xdef...' },
];

const MIN_WITHDRAW = 500;

export default function Withdraw() {
  const { user } = useApp();
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState(user.walletAddress || '');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [tab, setTab] = useState('withdraw');

  const handleSubmit = () => {
    if (!amount || Number(amount) < MIN_WITHDRAW || !address) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2500);
    }, 1500);
  };

  const statusColor = { completed: '#5fd66a', pending: '#e8b84b', failed: '#ef4444' };
  const statusIcon = { completed: CheckCircle, pending: Clock, failed: AlertCircle };

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
          <div style={{ ...GRADIENT_TEXT, fontSize: 24, fontWeight: 700 }}>💸 Withdraw</div>
          <div style={{ fontSize: 13, color: '#e8b84b', marginTop: 6 }}>
            Convert your MINE coins to crypto
          </div>
        </div>

        {/* Balance Card */}
        <div style={{ padding: '20px 24px 0' }}>
          <div style={{ padding: "1px", borderRadius: 24, background: GRADIENT_BORDER }}>
            <div style={{
              background: CARD_BG,
              borderRadius: 22,
              padding: '24px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 13, color: '#e8b84b', marginBottom: 6 }}>Available Balance</div>
              <div style={{ fontSize: 36, fontWeight: 900, ...GRADIENT_TEXT }}>
                {formatNumber(user.balance)} MINE
              </div>
              <div style={{ color: '#e8b84b', fontSize: 12, marginTop: 6 }}>
                Min withdrawal: {MIN_WITHDRAW} MINE
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ padding: '0 24px 12px', display: 'flex', gap: 12, marginTop: 24 }}>
          {['withdraw', 'history'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: 14,
                fontSize: 13.5,
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                background: tab === t ? '#e8b84b' : CARD_BG,
                color: tab === t ? '#0a0704' : '#c9b38a',
              }}
            >
              {t === 'withdraw' ? '📤 Withdraw' : '📜 History'}
            </button>
          ))}
        </div>

        {tab === 'withdraw' ? (
          <div style={{ padding: '0 24px 40px' }}>
            {/* Amount Input */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#e8b84b', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.8 }}>
                Amount (MINE)
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  type="number"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  style={{
                    width: '100%',
                    background: CARD_BG,
                    border: '1px solid #e8b84b',
                    borderRadius: 16,
                    padding: '18px 20px',
                    fontSize: 18,
                    fontWeight: 700,
                    color: '#f3e6c9',
                  }}
                />
                <button
                  onClick={() => setAmount(String(user.balance))}
                  style={{
                    position: 'absolute',
                    right: 12,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: '#e8b84b',
                    color: '#0a0704',
                    borderRadius: 8,
                    padding: '6px 12px',
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  MAX
                </button>
              </div>
              {amount && Number(amount) < MIN_WITHDRAW && (
                <div style={{ color: '#ef4444', fontSize: 12, marginTop: 6 }}>
                  Minimum withdrawal is {MIN_WITHDRAW} MINE
                </div>
              )}
            </div>

            {/* Address Input */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#e8b84b', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.8 }}>
                Wallet Address (BSC / ETH)
              </div>
              <input
                type="text"
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder="0x..."
                style={{
                  width: '100%',
                  background: CARD_BG,
                  border: '1px solid #e8b84b',
                  borderRadius: 16,
                  padding: '18px 20px',
                  fontSize: 14,
                  color: '#f3e6c9',
                }}
              />
            </div>

            {/* Fee Info */}
            <div style={{ padding: "1px", borderRadius: 18, background: GRADIENT_BORDER, marginBottom: 20 }}>
              <div style={{
                background: CARD_BG,
                borderRadius: 16,
                padding: '16px 20px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 13, color: '#e8b84b' }}>Amount</span>
                  <span style={{ fontSize: 13, fontWeight: 700 }}>{amount ? formatNumber(Number(amount)) : 0} MINE</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 13, color: '#e8b84b' }}>Fee (5%)</span>
                  <span style={{ fontSize: 13, color: '#ef4444' }}>-{amount ? Math.floor(Number(amount) * 0.05) : 0} MINE</span>
                </div>
                <div style={{ height: 1, background: '#3a2a12', margin: '8px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 13, fontWeight: 700 }}>You Receive</span>
                  <span style={{ fontSize: 14, fontWeight: 800, color: '#5fd66a' }}>
                    {amount ? formatNumber(Math.floor(Number(amount) * 0.95)) : 0} MINE
                  </span>
                </div>
              </div>
            </div>

            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{
                    background: '#0f1a10',
                    border: '1px solid #5fd66a',
                    borderRadius: 14,
                    padding: '16px',
                    marginBottom: 16,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <CheckCircle size={20} color="#5fd66a" />
                  <span style={{ color: '#5fd66a', fontWeight: 700 }}>Withdrawal submitted successfully!</span>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleSubmit}
              style={{
                width: '100%',
                padding: '18px',
                background: GRADIENT_BORDER,
                color: '#0a0704',
                fontSize: 16,
                fontWeight: 700,
                border: 'none',
                borderRadius: 16,
                opacity: (!amount || Number(amount) < MIN_WITHDRAW || !address) ? 0.6 : 1,
              }}
            >
              {submitting ? 'Submitting Withdrawal...' : '📤 Submit Withdrawal'}
            </motion.button>
          </div>
        ) : (
          <div style={{ padding: '20px 24px 40px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, ...GRADIENT_TEXT, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1.2 }}>
              Withdrawal History
            </div>
            {MOCK_WITHDRAWALS.map((w, i) => {
              const Icon = statusIcon[w.status];
              return (
                <motion.div
                  key={w.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  style={{
                    padding: "1px",
                    borderRadius: 18,
                    background: GRADIENT_BORDER,
                    marginBottom: 12,
                  }}
                >
                  <div style={{
                    background: CARD_BG,
                    borderRadius: 16,
                    padding: '18px',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ fontSize: 18, fontWeight: 800, color: '#f3e6c9' }}>
                          {formatNumber(w.amount)} MINE
                        </div>
                        <div style={{ fontSize: 12, color: '#e8b84b', marginTop: 4 }}>{w.address}</div>
                        <div style={{ fontSize: 11, color: '#e8b84b' }}>{w.date}</div>
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        background: `${statusColor[w.status]}15`,
                        border: `1px solid ${statusColor[w.status]}30`,
                        borderRadius: 99,
                        padding: '6px 14px',
                      }}>
                        <Icon size={16} color={statusColor[w.status]} />
                        <span style={{ fontSize: 12, fontWeight: 700, color: statusColor[w.status], textTransform: 'capitalize' }}>
                          {w.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Bottom Spacer */}
        <div style={{ height: 60 }} />

      </div>
    </div>
  );
}


// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useApp } from '../context/AppContext';
// import { formatNumber } from '../utils/helpers';
// import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

// const MOCK_WITHDRAWALS = [
//   { id: 1, amount: 1000, address: '0x1A2b...9A0', status: 'completed', date: '2024-01-10', txHash: '0xabc...' },
//   { id: 2, amount: 500, address: '0x1A2b...9A0', status: 'pending', date: '2024-01-14', txHash: null },
//   { id: 3, amount: 2000, address: '0x1A2b...9A0', status: 'completed', date: '2024-01-08', txHash: '0xdef...' },
// ];

// const MIN_WITHDRAW = 500;

// export default function Withdraw() {
//   const { user } = useApp();
//   const [amount, setAmount] = useState('');
//   const [address, setAddress] = useState(user.walletAddress || '');
//   const [submitting, setSubmitting] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [tab, setTab] = useState('withdraw');

//   const handleSubmit = () => {
//     if (!amount || Number(amount) < MIN_WITHDRAW || !address) return;
//     setSubmitting(true);
//     setTimeout(() => {
//       setSubmitting(false);
//       setSuccess(true);
//       setTimeout(() => setSuccess(false), 3000);
//     }, 1500);
//   };

//   const statusColor = { completed: '#10b981', pending: '#f59e0b', failed: '#ef4444' };
//   const statusIcon = { completed: CheckCircle, pending: Clock, failed: AlertCircle };

//   return (
//     <div className="page-content">
//       {/* Header */}
//       <div style={{ padding: '20px 20px 0', textAlign: 'center' }}>
//         <div style={{ fontSize: 22, fontWeight: 900 }}>💸 Withdraw</div>
//         <div style={{ fontSize: 13, color: '#6b7280', marginTop: 4 }}>
//           Convert your MINE coins to crypto
//         </div>
//       </div>

//       {/* Balance */}
//       <div style={{ padding: '16px 20px 0' }}>
//         <div style={{
//           background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)',
//           borderRadius: 16, padding: '16px', textAlign: 'center',
//         }}>
//           <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 4 }}>Available Balance</div>
//           <div style={{
//             fontSize: 28, fontWeight: 900,
//             background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
//             WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
//           }}>
//             {formatNumber(user.balance)} MINE
//           </div>
//           <div style={{ color: '#6b7280', fontSize: 12, marginTop: 4 }}>
//             Min withdrawal: {formatNumber(MIN_WITHDRAW)} MINE
//           </div>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div style={{ padding: '16px 20px 0', display: 'flex', gap: 8 }}>
//         {['withdraw', 'history'].map(t => (
//           <button
//             key={t}
//             onClick={() => setTab(t)}
//             style={{
//               flex: 1, padding: '10px', borderRadius: 12, fontSize: 13, fontWeight: 700,
//               border: 'none', cursor: 'pointer', textTransform: 'capitalize',
//               background: tab === t ? '#f59e0b' : 'rgba(255,255,255,0.08)',
//               color: tab === t ? '#000' : '#9ca3af', transition: 'all 0.2s',
//             }}
//           >
//             {t === 'withdraw' ? '📤 Withdraw' : '📜 History'}
//           </button>
//         ))}
//       </div>

//       {tab === 'withdraw' ? (
//         <div style={{ padding: '16px 20px 32px' }}>
//           {/* Amount */}
//           <div style={{ marginBottom: 14 }}>
//             <label style={{ fontSize: 12, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', marginBottom: 8 }}>
//               Amount (MINE)
//             </label>
//             <div style={{ position: 'relative' }}>
//               <input
//                 type="number"
//                 value={amount}
//                 onChange={e => setAmount(e.target.value)}
//                 placeholder="Enter amount"
//                 className="input-field"
//                 style={{ paddingRight: 80 }}
//               />
//               <button
//                 onClick={() => setAmount(String(user.balance))}
//                 style={{
//                   position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
//                   background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)',
//                   borderRadius: 8, padding: '4px 10px', color: '#fbbf24', fontSize: 11,
//                   fontWeight: 700, cursor: 'pointer',
//                 }}
//               >
//                 MAX
//               </button>
//             </div>
//             {amount && Number(amount) < MIN_WITHDRAW && (
//               <div style={{ color: '#ef4444', fontSize: 11, marginTop: 6 }}>
//                 Minimum withdrawal is {formatNumber(MIN_WITHDRAW)} MINE
//               </div>
//             )}
//           </div>

//           {/* Address */}
//           <div style={{ marginBottom: 14 }}>
//             <label style={{ fontSize: 12, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', marginBottom: 8 }}>
//               Wallet Address (BSC / ETH)
//             </label>
//             <input
//               type="text"
//               value={address}
//               onChange={e => setAddress(e.target.value)}
//               placeholder="0x..."
//               className="input-field"
//             />
//           </div>

//           {/* Network selector */}
//           <div style={{ marginBottom: 20 }}>
//             <label style={{ fontSize: 12, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', marginBottom: 8 }}>
//               Network
//             </label>
//             <div style={{ display: 'flex', gap: 8 }}>
//               {['BNB Smart Chain', 'Polygon', 'Ethereum'].map((net, i) => (
//                 <button
//                   key={net}
//                   style={{
//                     flex: 1, padding: '10px 4px', borderRadius: 12, fontSize: 10, fontWeight: 700,
//                     border: `1px solid ${i === 0 ? 'rgba(245,158,11,0.4)' : 'rgba(255,255,255,0.08)'}`,
//                     background: i === 0 ? 'rgba(245,158,11,0.1)' : 'rgba(255,255,255,0.04)',
//                     color: i === 0 ? '#fbbf24' : '#6b7280', cursor: 'pointer',
//                   }}
//                 >
//                   {net}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Fee info */}
//           <div style={{
//             background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)',
//             borderRadius: 12, padding: '12px', marginBottom: 20,
//           }}>
//             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
//               <span style={{ fontSize: 12, color: '#9ca3af' }}>Amount</span>
//               <span style={{ fontSize: 12, fontWeight: 700 }}>{amount ? formatNumber(Number(amount)) : '0'} MINE</span>
//             </div>
//             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
//               <span style={{ fontSize: 12, color: '#9ca3af' }}>Fee (5%)</span>
//               <span style={{ fontSize: 12, color: '#ef4444' }}>-{amount ? Math.floor(Number(amount) * 0.05) : 0} MINE</span>
//             </div>
//             <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '8px 0' }} />
//             <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//               <span style={{ fontSize: 12, fontWeight: 700 }}>You Receive</span>
//               <span style={{ fontSize: 12, fontWeight: 800, color: '#10b981' }}>
//                 {amount ? formatNumber(Math.floor(Number(amount) * 0.95)) : '0'} MINE
//               </span>
//             </div>
//           </div>

//           <AnimatePresence>
//             {success && (
//               <motion.div
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0 }}
//                 style={{
//                   background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)',
//                   borderRadius: 12, padding: '12px 16px', marginBottom: 12,
//                   display: 'flex', alignItems: 'center', gap: 8,
//                 }}
//               >
//                 <span style={{ fontSize: 18 }}>✅</span>
//                 <span style={{ color: '#6ee7b7', fontWeight: 700, fontSize: 14 }}>
//                   Withdrawal submitted! Processing in 24 hours.
//                 </span>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           <motion.button
//             whileTap={{ scale: 0.97 }}
//             onClick={handleSubmit}
//             className="btn-primary"
//             style={{
//               width: '100%', fontSize: 15,
//               opacity: (!amount || Number(amount) < MIN_WITHDRAW || !address) ? 0.5 : 1,
//             }}
//           >
//             {submitting ? '⏳ Submitting...' : '📤 Submit Withdrawal'}
//           </motion.button>
//         </div>
//       ) : (
//         <div style={{ padding: '16px 20px 32px' }}>
//           {MOCK_WITHDRAWALS.map((w, i) => {
//             const Icon = statusIcon[w.status];
//             return (
//               <motion.div
//                 key={w.id}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: i * 0.06 }}
//                 style={{
//                   background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.06)',
//                   borderRadius: 16, padding: '16px', marginBottom: 10,
//                 }}
//               >
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//                   <div>
//                     <div style={{ fontSize: 16, fontWeight: 800, color: '#fff', marginBottom: 4 }}>
//                       {formatNumber(w.amount)} MINE
//                     </div>
//                     <div style={{ fontSize: 11, color: '#6b7280' }}>{w.address} · {w.date}</div>
//                     {w.txHash && (
//                       <div style={{ fontSize: 11, color: '#60a5fa', marginTop: 4 }}>
//                         Tx: {w.txHash}
//                       </div>
//                     )}
//                   </div>
//                   <div style={{
//                     display: 'flex', alignItems: 'center', gap: 5,
//                     background: `${statusColor[w.status]}15`,
//                     border: `1px solid ${statusColor[w.status]}30`,
//                     borderRadius: 99, padding: '5px 10px',
//                   }}>
//                     <Icon size={12} color={statusColor[w.status]} />
//                     <span style={{ fontSize: 11, fontWeight: 700, color: statusColor[w.status], textTransform: 'capitalize' }}>
//                       {w.status}
//                     </span>
//                   </div>
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }

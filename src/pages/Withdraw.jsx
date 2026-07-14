import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { formatNumber } from '../utils/helpers';
import { AlertCircle, CheckCircle, Clock, Loader } from 'lucide-react';
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

const MIN_WITHDRAW = 1;

export default function Withdraw() {
  const { user, setUser } = useApp();

  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState(user?.walletAddress || '');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [tab, setTab] = useState('withdraw');
  
  const [withdrawals, setWithdrawals] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  // Fetch Withdrawal History
  useEffect(() => {
    if (tab === 'history') {
      fetchWithdrawals();
    }
  }, [tab]);

  const fetchWithdrawals = async () => {
    setLoadingHistory(true);
    try {
      const res = await API.get('/wallet/withdrawals');
      if (res.data.success) {
        setWithdrawals(res.data.withdrawals || []);
      }
    } catch (err) {
      console.error("Failed to fetch withdrawals:", err);
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleSubmit = async () => {
    if (!amount || Number(amount) < MIN_WITHDRAW || !address) {
      alert("Please fill all fields correctly");
      return;
    }

    setSubmitting(true);
    try {
      const res = await API.post('/wallet/withdraw', {
        amount: Number(amount),
        address: address.trim()
      });

      if (res.data.success) {
        setSuccess(true);
        setAmount('');
        
        if (setUser) {
          setUser(prev => ({ 
            ...prev, 
            balance: (prev.balance || 0) - Number(amount) 
          }));
        }

        setTimeout(() => setSuccess(false), 2500);
      }
    } catch (err) {
      const message = err.response?.data?.message || "Withdrawal request failed";
      alert(message);
    } finally {
      setSubmitting(false);
    }
  };

  const statusConfig = {
    completed: { color: '#5fd66a', icon: CheckCircle },
    pending: { color: '#e8b84b', icon: Clock },
    failed: { color: '#ef4444', icon: AlertCircle }
  };

  const receiveAmount = amount 
    ? (Number(amount) * 0.95).toFixed(2) 
    : "0.00";

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: "transparent" }}>
      
      {/* ✅ Home Page jaisa Exact Background */}
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

      {/* Dark Overlay - Same as Home */}
      <div className="fixed inset-0 z-0 bg-black/45 pointer-events-none" />

      <div className="relative z-10 max-w-[430px] mx-auto min-h-screen pb-28">

        {/* Header */}
        <div style={{ padding: '32px 24px 0', textAlign: 'center' }}>
          <div style={{ ...GRADIENT_TEXT, fontSize: 24, fontWeight: 700 }}>💸 Withdraw</div>
          <div style={{ fontSize: 13, color: '#e8b84b', marginTop: 6 }}>
            Convert MINE to USDT
          </div>
        </div>

        {/* Balance Card */}
        <div style={{ padding: '20px 24px 0' }}>
          <div style={{ padding: "1px", borderRadius: 24, background: GRADIENT_BORDER }}>
            <div style={{ background: CARD_BG, borderRadius: 22, padding: '24px', textAlign: 'center' }}>
              <div style={{ fontSize: 13, color: '#e8b84b', marginBottom: 6 }}>Available Balance</div>
              <div style={{ fontSize: 36, fontWeight: 900, ...GRADIENT_TEXT }}>
                {formatNumber(user?.balance || 0)} MINE
              </div>
              <div style={{ color: '#e8b84b', fontSize: 12, marginTop: 6 }}>
                Minimum Withdrawal: {MIN_WITHDRAW} MINE
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
                background: tab === t ? '#e8b84b' : CARD_BG,
                color: tab === t ? '#0a0704' : '#c9b38a',
              }}
            >
              {t === 'withdraw' ? '📤 Withdraw' : '📜 History'}
            </button>
          ))}
        </div>

        {/* Withdraw Tab */}
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
                  onChange={(e) => setAmount(e.target.value)}
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
                  onClick={() => setAmount(String(user?.balance || 0))}
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

            {/* Wallet Address */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#e8b84b', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.8 }}>
                USDT Wallet Address (BSC / ETH)
              </div>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="0x1234...abcd"
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

            {/* Fee Breakdown */}
            <div style={{ padding: "1px", borderRadius: 18, background: GRADIENT_BORDER, marginBottom: 24 }}>
              <div style={{ background: CARD_BG, borderRadius: 16, padding: '16px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ color: '#e8b84b' }}>Amount</span>
                  <span>{amount ? formatNumber(Number(amount)) : 0} MINE</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ color: '#e8b84b' }}>Fee (5%)</span>
                  <span style={{ color: '#ef4444' }}>
                    -{amount ? Math.floor(Number(amount) * 0.05) : 0} MINE
                  </span>
                </div>
                <hr style={{ borderColor: '#3a2a12', margin: '10px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                  <span>You Receive (USDT)</span>
                  <span style={{ color: '#5fd66a' }}>
                    {receiveAmount}
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
                  <span style={{ color: '#5fd66a', fontWeight: 700 }}>Withdrawal Submitted Successfully!</span>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleSubmit}
              disabled={submitting || !amount || Number(amount) < MIN_WITHDRAW || !address}
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
              {submitting ? (
                <Loader size={20} className="animate-spin mx-auto" />
              ) : (
                '📤 Submit Withdrawal'
              )}
            </motion.button>
          </div>
        ) : (
          /* History Tab */
          <div style={{ padding: '20px 24px 40px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, ...GRADIENT_TEXT, marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1.2 }}>
              Withdrawal History
            </div>

            {loadingHistory ? (
              <div style={{ textAlign: 'center', padding: '60px', color: '#e8b84b' }}>Loading history...</div>
            ) : withdrawals.length > 0 ? (
              withdrawals.map((w, i) => {
                const config = statusConfig[w.status] || statusConfig.pending;
                const Icon = config.icon;
                return (
                  <motion.div
                    key={w._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    style={{ padding: "1px", borderRadius: 18, background: GRADIENT_BORDER, marginBottom: 12 }}
                  >
                    <div style={{ background: CARD_BG, borderRadius: 16, padding: '18px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <div style={{ fontSize: 18, fontWeight: 800, color: '#f3e6c9' }}>
                            {formatNumber(w.amount)} MINE
                          </div>
                          <div style={{ fontSize: 12, color: '#e8b84b', marginTop: 4 }}>{w.address}</div>
                          <div style={{ fontSize: 11, color: '#c9b38a' }}>
                            {new Date(w.createdAt).toLocaleDateString()}
                          </div>
                        </div>

                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          padding: '6px 14px',
                          borderRadius: 999,
                          background: `${config.color}15`,
                          border: `1px solid ${config.color}30`
                        }}>
                          <Icon size={16} color={config.color} />
                          <span style={{ fontSize: 12, fontWeight: 700, color: config.color, textTransform: 'capitalize' }}>
                            {w.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div style={{ textAlign: 'center', padding: '80px 20px', color: '#6b5730' }}>
                No withdrawal history yet
              </div>
            )}
          </div>
        )}

        <div style={{ height: 100 }} />
      </div>
    </div>
  );
}

















// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useApp } from '../context/AppContext';
// import { formatNumber } from '../utils/helpers';
// import { AlertCircle, CheckCircle, Clock, Loader } from 'lucide-react';
// import API from '../services/api';
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

// const MIN_WITHDRAW = 1;

// export default function Withdraw() {
//   const { user, setUser } = useApp();

//   const [amount, setAmount] = useState('');
//   const [address, setAddress] = useState(user?.walletAddress || '');
//   const [submitting, setSubmitting] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [tab, setTab] = useState('withdraw');
  
//   const [withdrawals, setWithdrawals] = useState([]);
//   const [loadingHistory, setLoadingHistory] = useState(false);

//   // Fetch Withdrawal History
//   useEffect(() => {
//     if (tab === 'history') {
//       fetchWithdrawals();
//     }
//   }, [tab]);

//   const fetchWithdrawals = async () => {
//     setLoadingHistory(true);
//     try {
//       const res = await API.get('/wallet/withdrawals');
//       if (res.data.success) {
//         setWithdrawals(res.data.withdrawals || []);
//       }
//     } catch (err) {
//       console.error("Failed to fetch withdrawals:", err);
//     } finally {
//       setLoadingHistory(false);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!amount || Number(amount) < MIN_WITHDRAW || !address) {
//       alert("Please fill all fields correctly");
//       return;
//     }

//     setSubmitting(true);
//     try {
//       const res = await API.post('/wallet/withdraw', {
//         amount: Number(amount),
//         address: address.trim()
//       });

//       if (res.data.success) {
//         setSuccess(true);
//         setAmount('');
        
//         if (setUser) {
//           setUser(prev => ({ 
//             ...prev, 
//             balance: (prev.balance || 0) - Number(amount) 
//           }));
//         }

//         setTimeout(() => setSuccess(false), 2500);
//       }
//     } catch (err) {
//       const message = err.response?.data?.message || "Withdrawal request failed";
//       alert(message);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const statusConfig = {
//     completed: { color: '#5fd66a', icon: CheckCircle },
//     pending: { color: '#e8b84b', icon: Clock },
//     failed: { color: '#ef4444', icon: AlertCircle }
//   };

//   // Calculate Receive Amount with 2 decimal places
//   const receiveAmount = amount 
//     ? (Number(amount) * 0.95).toFixed(2) 
//     : "0.00";

//   return (
//     <div className="relative min-h-screen overflow-x-hidden" style={{ background: "transparent" }}>
//       <div className="fixed inset-0 z-0 pointer-events-none" 
//            style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover", opacity: 0.35 }} />
//       <div className="fixed inset-0 z-0 bg-black/45 pointer-events-none" />

//       <div className="relative z-10 max-w-[430px] mx-auto min-h-screen pb-28">

//         {/* Header */}
//         <div style={{ padding: '32px 24px 0', textAlign: 'center' }}>
//           <div style={{ ...GRADIENT_TEXT, fontSize: 24, fontWeight: 700 }}>💸 Withdraw</div>
//           <div style={{ fontSize: 13, color: '#e8b84b', marginTop: 6 }}>
//             Convert MINE to USDT
//           </div>
//         </div>

//         {/* Balance Card */}
//         <div style={{ padding: '20px 24px 0' }}>
//           <div style={{ padding: "1px", borderRadius: 24, background: GRADIENT_BORDER }}>
//             <div style={{ background: CARD_BG, borderRadius: 22, padding: '24px', textAlign: 'center' }}>
//               <div style={{ fontSize: 13, color: '#e8b84b', marginBottom: 6 }}>Available Balance</div>
//               <div style={{ fontSize: 36, fontWeight: 900, ...GRADIENT_TEXT }}>
//                 {formatNumber(user?.balance || 0)} MINE
//               </div>
//               <div style={{ color: '#e8b84b', fontSize: 12, marginTop: 6 }}>
//                 Minimum Withdrawal: {MIN_WITHDRAW} MINE
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div style={{ padding: '0 24px 12px', display: 'flex', gap: 12, marginTop: 24 }}>
//           {['withdraw', 'history'].map(t => (
//             <button
//               key={t}
//               onClick={() => setTab(t)}
//               style={{
//                 flex: 1,
//                 padding: '12px',
//                 borderRadius: 14,
//                 fontSize: 13.5,
//                 fontWeight: 700,
//                 border: 'none',
//                 background: tab === t ? '#e8b84b' : CARD_BG,
//                 color: tab === t ? '#0a0704' : '#c9b38a',
//               }}
//             >
//               {t === 'withdraw' ? '📤 Withdraw' : '📜 History'}
//             </button>
//           ))}
//         </div>

//         {/* Withdraw Tab */}
//         {tab === 'withdraw' ? (
//           <div style={{ padding: '0 24px 40px' }}>
//             {/* Amount Input */}
//             <div style={{ marginBottom: 16 }}>
//               <div style={{ fontSize: 12, fontWeight: 700, color: '#e8b84b', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.8 }}>
//                 Amount (MINE)
//               </div>
//               <div style={{ position: 'relative' }}>
//                 <input
//                   type="number"
//                   value={amount}
//                   onChange={(e) => setAmount(e.target.value)}
//                   placeholder="Enter amount"
//                   style={{
//                     width: '100%',
//                     background: CARD_BG,
//                     border: '1px solid #e8b84b',
//                     borderRadius: 16,
//                     padding: '18px 20px',
//                     fontSize: 18,
//                     fontWeight: 700,
//                     color: '#f3e6c9',
//                   }}
//                 />
//                 <button
//                   onClick={() => setAmount(String(user?.balance || 0))}
//                   style={{
//                     position: 'absolute',
//                     right: 12,
//                     top: '50%',
//                     transform: 'translateY(-50%)',
//                     background: '#e8b84b',
//                     color: '#0a0704',
//                     borderRadius: 8,
//                     padding: '6px 12px',
//                     fontSize: 12,
//                     fontWeight: 700,
//                   }}
//                 >
//                   MAX
//                 </button>
//               </div>
//               {amount && Number(amount) < MIN_WITHDRAW && (
//                 <div style={{ color: '#ef4444', fontSize: 12, marginTop: 6 }}>
//                   Minimum withdrawal is {MIN_WITHDRAW} MINE
//                 </div>
//               )}
//             </div>

//             {/* Wallet Address */}
//             <div style={{ marginBottom: 24 }}>
//               <div style={{ fontSize: 12, fontWeight: 700, color: '#e8b84b', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.8 }}>
//                 USDT Wallet Address (BSC / ETH)
//               </div>
//               <input
//                 type="text"
//                 value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//                 placeholder="0x1234...abcd"
//                 style={{
//                   width: '100%',
//                   background: CARD_BG,
//                   border: '1px solid #e8b84b',
//                   borderRadius: 16,
//                   padding: '18px 20px',
//                   fontSize: 14,
//                   color: '#f3e6c9',
//                 }}
//               />
//             </div>

//             {/* Fee Breakdown */}
//             <div style={{ padding: "1px", borderRadius: 18, background: GRADIENT_BORDER, marginBottom: 24 }}>
//               <div style={{ background: CARD_BG, borderRadius: 16, padding: '16px 20px' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
//                   <span style={{ color: '#e8b84b' }}>Amount</span>
//                   <span>{amount ? formatNumber(Number(amount)) : 0} MINE</span>
//                 </div>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
//                   <span style={{ color: '#e8b84b' }}>Fee (5%)</span>
//                   <span style={{ color: '#ef4444' }}>
//                     -{amount ? Math.floor(Number(amount) * 0.05) : 0} MINE
//                   </span>
//                 </div>
//                 <hr style={{ borderColor: '#3a2a12', margin: '10px 0' }} />
//                 <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
//                   <span>You Receive (USDT)</span>
//                   <span style={{ color: '#5fd66a' }}>
//                     {receiveAmount}   {/* ← Now shows 2 decimal places */}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <AnimatePresence>
//               {success && (
//                 <motion.div
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0 }}
//                   style={{
//                     background: '#0f1a10',
//                     border: '1px solid #5fd66a',
//                     borderRadius: 14,
//                     padding: '16px',
//                     marginBottom: 16,
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: 10,
//                   }}
//                 >
//                   <CheckCircle size={20} color="#5fd66a" />
//                   <span style={{ color: '#5fd66a', fontWeight: 700 }}>Withdrawal Submitted Successfully!</span>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             <motion.button
//               whileTap={{ scale: 0.97 }}
//               onClick={handleSubmit}
//               disabled={submitting || !amount || Number(amount) < MIN_WITHDRAW || !address}
//               style={{
//                 width: '100%',
//                 padding: '18px',
//                 background: GRADIENT_BORDER,
//                 color: '#0a0704',
//                 fontSize: 16,
//                 fontWeight: 700,
//                 border: 'none',
//                 borderRadius: 16,
//                 opacity: (!amount || Number(amount) < MIN_WITHDRAW || !address) ? 0.6 : 1,
//               }}
//             >
//               {submitting ? (
//                 <Loader size={20} className="animate-spin mx-auto" />
//               ) : (
//                 '📤 Submit Withdrawal'
//               )}
//             </motion.button>
//           </div>
//         ) : (
//           /* History Tab */
//           <div style={{ padding: '20px 24px 40px' }}>
//             <div style={{ fontSize: 12, fontWeight: 700, ...GRADIENT_TEXT, marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1.2 }}>
//               Withdrawal History
//             </div>

//             {loadingHistory ? (
//               <div style={{ textAlign: 'center', padding: '60px', color: '#e8b84b' }}>Loading history...</div>
//             ) : withdrawals.length > 0 ? (
//               withdrawals.map((w, i) => {
//                 const config = statusConfig[w.status] || statusConfig.pending;
//                 const Icon = config.icon;
//                 return (
//                   <motion.div
//                     key={w._id}
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: i * 0.05 }}
//                     style={{ padding: "1px", borderRadius: 18, background: GRADIENT_BORDER, marginBottom: 12 }}
//                   >
//                     <div style={{ background: CARD_BG, borderRadius: 16, padding: '18px' }}>
//                       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//                         <div>
//                           <div style={{ fontSize: 18, fontWeight: 800, color: '#f3e6c9' }}>
//                             {formatNumber(w.amount)} MINE
//                           </div>
//                           <div style={{ fontSize: 12, color: '#e8b84b', marginTop: 4 }}>{w.address}</div>
//                           <div style={{ fontSize: 11, color: '#c9b38a' }}>
//                             {new Date(w.createdAt).toLocaleDateString()}
//                           </div>
//                         </div>

//                         <div style={{
//                           display: 'flex',
//                           alignItems: 'center',
//                           gap: 6,
//                           padding: '6px 14px',
//                           borderRadius: 999,
//                           background: `${config.color}15`,
//                           border: `1px solid ${config.color}30`
//                         }}>
//                           <Icon size={16} color={config.color} />
//                           <span style={{ fontSize: 12, fontWeight: 700, color: config.color, textTransform: 'capitalize' }}>
//                             {w.status}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </motion.div>
//                 );
//               })
//             ) : (
//               <div style={{ textAlign: 'center', padding: '80px 20px', color: '#6b5730' }}>
//                 No withdrawal history yet
//               </div>
//             )}
//           </div>
//         )}

//         <div style={{ height: 100 }} />
//       </div>
//     </div>
//   );
// }


















// // import React, { useState, useEffect } from 'react';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { useApp } from '../context/AppContext';
// // import { formatNumber } from '../utils/helpers';
// // import { AlertCircle, CheckCircle, Clock, Loader } from 'lucide-react';
// // import API from '../services/api';
// // import bgImage from "../assets/page-bg.png";

// // const GRADIENT_BORDER = "linear-gradient(135deg,#FFF2A6 0%,#FFD96A 12%,#FFC83D 28%,#F5B300 45%,#D88A00 68%,#8A5200 100%)";
// // const CARD_BG = "#0A090A";

// // const GRADIENT_TEXT = {
// //   background: GRADIENT_BORDER,
// //   WebkitBackgroundClip: "text",
// //   WebkitTextFillColor: "transparent",
// //   backgroundClip: "text",
// //   color: "transparent",
// // };

// // const MIN_WITHDRAW = 1;

// // export default function Withdraw() {
// //   const { user, setUser } = useApp();

// //   const [amount, setAmount] = useState('');
// //   const [address, setAddress] = useState(user?.walletAddress || '');
// //   const [submitting, setSubmitting] = useState(false);
// //   const [success, setSuccess] = useState(false);
// //   const [tab, setTab] = useState('withdraw');
  
// //   const [withdrawals, setWithdrawals] = useState([]);
// //   const [loadingHistory, setLoadingHistory] = useState(false);

// //   // Fetch Withdrawal History when History tab is active
// //   useEffect(() => {
// //     if (tab === 'history') {
// //       fetchWithdrawals();
// //     }
// //   }, [tab]);

// //   const fetchWithdrawals = async () => {
// //     setLoadingHistory(true);
// //     try {
// //       const res = await API.get('/wallet/withdrawals');
// //       if (res.data.success) {
// //         setWithdrawals(res.data.withdrawals || []);
// //       }
// //     } catch (err) {
// //       console.error("Failed to fetch withdrawals:", err);
// //     } finally {
// //       setLoadingHistory(false);
// //     }
// //   };

// //   const handleSubmit = async () => {
// //     if (!amount || Number(amount) < MIN_WITHDRAW || !address) {
// //       alert("Please fill all fields correctly");
// //       return;
// //     }

// //     setSubmitting(true);
// //     try {
// //       const res = await API.post('/wallet/withdraw', {
// //         amount: Number(amount),
// //         address: address.trim()
// //       });

// //       if (res.data.success) {
// //         setSuccess(true);
// //         setAmount(''); // Clear amount after success
        
// //         // Update user balance in global state
// //         if (setUser) {
// //           setUser(prev => ({ 
// //             ...prev, 
// //             balance: (prev.balance || 0) - Number(amount) 
// //           }));
// //         }

// //         setTimeout(() => setSuccess(false), 2500);
// //       }
// //     } catch (err) {
// //       const message = err.response?.data?.message || "Withdrawal request failed";
// //       alert(message);
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   };

// //   const statusConfig = {
// //     completed: { color: '#5fd66a', icon: CheckCircle },
// //     pending: { color: '#e8b84b', icon: Clock },
// //     failed: { color: '#ef4444', icon: AlertCircle }
// //   };

// //   return (
// //     <div className="relative min-h-screen overflow-x-hidden" style={{ background: "transparent" }}>
// //       {/* Background */}
// //       <div className="fixed inset-0 z-0 pointer-events-none" 
// //            style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover", opacity: 0.35 }} />
// //       <div className="fixed inset-0 z-0 bg-black/45 pointer-events-none" />

// //       <div className="relative z-10 max-w-[430px] mx-auto min-h-screen pb-28">

// //         {/* Header */}
// //         <div style={{ padding: '32px 24px 0', textAlign: 'center' }}>
// //           <div style={{ ...GRADIENT_TEXT, fontSize: 24, fontWeight: 700 }}>💸 Withdraw</div>
// //           <div style={{ fontSize: 13, color: '#e8b84b', marginTop: 6 }}>
// //             Convert MINE to USDT
// //           </div>
// //         </div>

// //         {/* Balance Card */}
// //         <div style={{ padding: '20px 24px 0' }}>
// //           <div style={{ padding: "1px", borderRadius: 24, background: GRADIENT_BORDER }}>
// //             <div style={{ background: CARD_BG, borderRadius: 22, padding: '24px', textAlign: 'center' }}>
// //               <div style={{ fontSize: 13, color: '#e8b84b', marginBottom: 6 }}>Available Balance</div>
// //               <div style={{ fontSize: 36, fontWeight: 900, ...GRADIENT_TEXT }}>
// //                 {formatNumber(user?.balance || 0)} MINE
// //               </div>
// //               <div style={{ color: '#e8b84b', fontSize: 12, marginTop: 6 }}>
// //                 Minimum Withdrawal: {MIN_WITHDRAW} MINE
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Tabs */}
// //         <div style={{ padding: '0 24px 12px', display: 'flex', gap: 12, marginTop: 24 }}>
// //           {['withdraw', 'history'].map(t => (
// //             <button
// //               key={t}
// //               onClick={() => setTab(t)}
// //               style={{
// //                 flex: 1,
// //                 padding: '12px',
// //                 borderRadius: 14,
// //                 fontSize: 13.5,
// //                 fontWeight: 700,
// //                 border: 'none',
// //                 background: tab === t ? '#e8b84b' : CARD_BG,
// //                 color: tab === t ? '#0a0704' : '#c9b38a',
// //               }}
// //             >
// //               {t === 'withdraw' ? '📤 Withdraw' : '📜 History'}
// //             </button>
// //           ))}
// //         </div>

// //         {/* Withdraw Tab */}
// //         {tab === 'withdraw' ? (
// //           <div style={{ padding: '0 24px 40px' }}>
// //             {/* Amount Input */}
// //             <div style={{ marginBottom: 16 }}>
// //               <div style={{ fontSize: 12, fontWeight: 700, color: '#e8b84b', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.8 }}>
// //                 Amount (MINE)
// //               </div>
// //               <div style={{ position: 'relative' }}>
// //                 <input
// //                   type="number"
// //                   value={amount}
// //                   onChange={(e) => setAmount(e.target.value)}
// //                   placeholder="Enter amount"
// //                   style={{
// //                     width: '100%',
// //                     background: CARD_BG,
// //                     border: '1px solid #e8b84b',
// //                     borderRadius: 16,
// //                     padding: '18px 20px',
// //                     fontSize: 18,
// //                     fontWeight: 700,
// //                     color: '#f3e6c9',
// //                   }}
// //                 />
// //                 <button
// //                   onClick={() => setAmount(String(user?.balance || 0))}
// //                   style={{
// //                     position: 'absolute',
// //                     right: 12,
// //                     top: '50%',
// //                     transform: 'translateY(-50%)',
// //                     background: '#e8b84b',
// //                     color: '#0a0704',
// //                     borderRadius: 8,
// //                     padding: '6px 12px',
// //                     fontSize: 12,
// //                     fontWeight: 700,
// //                   }}
// //                 >
// //                   MAX
// //                 </button>
// //               </div>
// //               {amount && Number(amount) < MIN_WITHDRAW && (
// //                 <div style={{ color: '#ef4444', fontSize: 12, marginTop: 6 }}>
// //                   Minimum withdrawal is {MIN_WITHDRAW} MINE
// //                 </div>
// //               )}
// //             </div>

// //             {/* Wallet Address */}
// //             <div style={{ marginBottom: 24 }}>
// //               <div style={{ fontSize: 12, fontWeight: 700, color: '#e8b84b', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.8 }}>
// //                 USDT Wallet Address (BSC / ETH)
// //               </div>
// //               <input
// //                 type="text"
// //                 value={address}
// //                 onChange={(e) => setAddress(e.target.value)}
// //                 placeholder="0x1234...abcd"
// //                 style={{
// //                   width: '100%',
// //                   background: CARD_BG,
// //                   border: '1px solid #e8b84b',
// //                   borderRadius: 16,
// //                   padding: '18px 20px',
// //                   fontSize: 14,
// //                   color: '#f3e6c9',
// //                 }}
// //               />
// //             </div>

// //             {/* Fee Breakdown */}
// //             <div style={{ padding: "1px", borderRadius: 18, background: GRADIENT_BORDER, marginBottom: 24 }}>
// //               <div style={{ background: CARD_BG, borderRadius: 16, padding: '16px 20px' }}>
// //                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
// //                   <span style={{ color: '#e8b84b' }}>Amount</span>
// //                   <span>{amount ? formatNumber(Number(amount)) : 0} MINE</span>
// //                 </div>
// //                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
// //                   <span style={{ color: '#e8b84b' }}>Fee (5%)</span>
// //                   <span style={{ color: '#ef4444' }}>-{amount ? Math.floor(Number(amount) * 0.05) : 0} MINE</span>
// //                 </div>
// //                 <hr style={{ borderColor: '#3a2a12', margin: '10px 0' }} />
// //                 <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
// //                   <span>You Receive (USDT)</span>
// //                   <span style={{ color: '#5fd66a' }}>
// //                     {amount ? formatNumber(Math.floor(Number(amount) * 0.95)) : 0}
// //                   </span>
// //                 </div>
// //               </div>
// //             </div>

// //             <AnimatePresence>
// //               {success && (
// //                 <motion.div
// //                   initial={{ opacity: 0, y: -10 }}
// //                   animate={{ opacity: 1, y: 0 }}
// //                   exit={{ opacity: 0 }}
// //                   style={{
// //                     background: '#0f1a10',
// //                     border: '1px solid #5fd66a',
// //                     borderRadius: 14,
// //                     padding: '16px',
// //                     marginBottom: 16,
// //                     display: 'flex',
// //                     alignItems: 'center',
// //                     gap: 10,
// //                   }}
// //                 >
// //                   <CheckCircle size={20} color="#5fd66a" />
// //                   <span style={{ color: '#5fd66a', fontWeight: 700 }}>Withdrawal Submitted Successfully!</span>
// //                 </motion.div>
// //               )}
// //             </AnimatePresence>

// //             <motion.button
// //               whileTap={{ scale: 0.97 }}
// //               onClick={handleSubmit}
// //               disabled={submitting || !amount || Number(amount) < MIN_WITHDRAW || !address}
// //               style={{
// //                 width: '100%',
// //                 padding: '18px',
// //                 background: GRADIENT_BORDER,
// //                 color: '#0a0704',
// //                 fontSize: 16,
// //                 fontWeight: 700,
// //                 border: 'none',
// //                 borderRadius: 16,
// //                 opacity: (!amount || Number(amount) < MIN_WITHDRAW || !address) ? 0.6 : 1,
// //               }}
// //             >
// //               {submitting ? (
// //                 <Loader size={20} className="animate-spin mx-auto" />
// //               ) : (
// //                 '📤 Submit Withdrawal'
// //               )}
// //             </motion.button>
// //           </div>
// //         ) : (
// //           /* History Tab */
// //           <div style={{ padding: '20px 24px 40px' }}>
// //             <div style={{ fontSize: 12, fontWeight: 700, ...GRADIENT_TEXT, marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1.2 }}>
// //               Withdrawal History
// //             </div>

// //             {loadingHistory ? (
// //               <div style={{ textAlign: 'center', padding: '60px', color: '#e8b84b' }}>Loading history...</div>
// //             ) : withdrawals.length > 0 ? (
// //               withdrawals.map((w, i) => {
// //                 const config = statusConfig[w.status] || statusConfig.pending;
// //                 const Icon = config.icon;
// //                 return (
// //                   <motion.div
// //                     key={w._id}
// //                     initial={{ opacity: 0, y: 10 }}
// //                     animate={{ opacity: 1, y: 0 }}
// //                     transition={{ delay: i * 0.05 }}
// //                     style={{ padding: "1px", borderRadius: 18, background: GRADIENT_BORDER, marginBottom: 12 }}
// //                   >
// //                     <div style={{ background: CARD_BG, borderRadius: 16, padding: '18px' }}>
// //                       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
// //                         <div>
// //                           <div style={{ fontSize: 18, fontWeight: 800, color: '#f3e6c9' }}>
// //                             {formatNumber(w.amount)} MINE
// //                           </div>
// //                           <div style={{ fontSize: 12, color: '#e8b84b', marginTop: 4 }}>{w.address}</div>
// //                           <div style={{ fontSize: 11, color: '#c9b38a' }}>
// //                             {new Date(w.createdAt).toLocaleDateString()}
// //                           </div>
// //                         </div>

// //                         <div style={{
// //                           display: 'flex',
// //                           alignItems: 'center',
// //                           gap: 6,
// //                           padding: '6px 14px',
// //                           borderRadius: 999,
// //                           background: `${config.color}15`,
// //                           border: `1px solid ${config.color}30`
// //                         }}>
// //                           <Icon size={16} color={config.color} />
// //                           <span style={{ fontSize: 12, fontWeight: 700, color: config.color, textTransform: 'capitalize' }}>
// //                             {w.status}
// //                           </span>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </motion.div>
// //                 );
// //               })
// //             ) : (
// //               <div style={{ textAlign: 'center', padding: '80px 20px', color: '#6b5730' }}>
// //                 No withdrawal history yet
// //               </div>
// //             )}
// //           </div>
// //         )}

// //         <div style={{ height: 100 }} />
// //       </div>
// //     </div>
// //   );
// // }












// // import React, { useState } from 'react';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { useApp } from '../context/AppContext';
// // import { formatNumber } from '../utils/helpers';
// // import { AlertCircle, CheckCircle, Clock, ExternalLink } from 'lucide-react';
// // import bgImage from "../assets/page-bg.png";

// // const GRADIENT_BORDER = "linear-gradient(135deg,#FFF2A6 0%,#FFD96A 12%,#FFC83D 28%,#F5B300 45%,#D88A00 68%,#8A5200 100%)";
// // const CARD_BG = "#0A090A";

// // const GRADIENT_TEXT = {
// //   background: GRADIENT_BORDER,
// //   WebkitBackgroundClip: "text",
// //   WebkitTextFillColor: "transparent",
// //   backgroundClip: "text",
// //   color: "transparent",
// // };

// // const MOCK_WITHDRAWALS = [
// //   { id: 1, amount: 1000, address: '0x1A2b...9A0', status: 'completed', date: '2024-01-10', txHash: '0xabc...' },
// //   { id: 2, amount: 500, address: '0x1A2b...9A0', status: 'pending', date: '2024-01-14', txHash: null },
// //   { id: 3, amount: 2000, address: '0x1A2b...9A0', status: 'completed', date: '2024-01-08', txHash: '0xdef...' },
// // ];

// // const MIN_WITHDRAW = 500;

// // export default function Withdraw() {
// //   const { user } = useApp();
// //   const [amount, setAmount] = useState('');
// //   const [address, setAddress] = useState(user.walletAddress || '');
// //   const [submitting, setSubmitting] = useState(false);
// //   const [success, setSuccess] = useState(false);
// //   const [tab, setTab] = useState('withdraw');

// //   const handleSubmit = () => {
// //     if (!amount || Number(amount) < MIN_WITHDRAW || !address) return;
// //     setSubmitting(true);
// //     setTimeout(() => {
// //       setSubmitting(false);
// //       setSuccess(true);
// //       setTimeout(() => setSuccess(false), 2500);
// //     }, 1500);
// //   };

// //   const statusColor = { completed: '#5fd66a', pending: '#e8b84b', failed: '#ef4444' };
// //   const statusIcon = { completed: CheckCircle, pending: Clock, failed: AlertCircle };

// //   return (
// //     <div className="relative min-h-screen overflow-x-hidden" style={{ background: "transparent" }}>
// //       {/* Background Image */}
// //       <div
// //         className="fixed inset-0 z-0 pointer-events-none"
// //         style={{
// //           backgroundImage: `url(${bgImage})`,
// //           backgroundSize: "cover",
// //           backgroundPosition: "center",
// //           backgroundRepeat: "no-repeat",
// //           opacity: 0.35,
// //         }}
// //       />

// //       {/* Dark Overlay */}
// //       <div className="fixed inset-0 z-0 bg-black/45 pointer-events-none" />

// //       {/* Main Content */}
// //       <div className="relative z-10 max-w-[430px] mx-auto min-h-screen pb-28">

// //         {/* Header */}
// //         <div style={{ padding: '32px 24px 0', textAlign: 'center' }}>
// //           <div style={{ ...GRADIENT_TEXT, fontSize: 24, fontWeight: 700 }}>💸 Withdraw</div>
// //           <div style={{ fontSize: 13, color: '#e8b84b', marginTop: 6 }}>
// //             Convert your MINE coins to crypto
// //           </div>
// //         </div>

// //         {/* Balance Card */}
// //         <div style={{ padding: '20px 24px 0' }}>
// //           <div style={{ padding: "1px", borderRadius: 24, background: GRADIENT_BORDER }}>
// //             <div style={{
// //               background: CARD_BG,
// //               borderRadius: 22,
// //               padding: '24px',
// //               textAlign: 'center',
// //             }}>
// //               <div style={{ fontSize: 13, color: '#e8b84b', marginBottom: 6 }}>Available Balance</div>
// //               <div style={{ fontSize: 36, fontWeight: 900, ...GRADIENT_TEXT }}>
// //                 {formatNumber(user.balance)} MINE
// //               </div>
// //               <div style={{ color: '#e8b84b', fontSize: 12, marginTop: 6 }}>
// //                 Min withdrawal: {MIN_WITHDRAW} MINE
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Tabs */}
// //         <div style={{ padding: '0 24px 12px', display: 'flex', gap: 12, marginTop: 24 }}>
// //           {['withdraw', 'history'].map(t => (
// //             <button
// //               key={t}
// //               onClick={() => setTab(t)}
// //               style={{
// //                 flex: 1,
// //                 padding: '12px',
// //                 borderRadius: 14,
// //                 fontSize: 13.5,
// //                 fontWeight: 700,
// //                 border: 'none',
// //                 cursor: 'pointer',
// //                 background: tab === t ? '#e8b84b' : CARD_BG,
// //                 color: tab === t ? '#0a0704' : '#c9b38a',
// //               }}
// //             >
// //               {t === 'withdraw' ? '📤 Withdraw' : '📜 History'}
// //             </button>
// //           ))}
// //         </div>

// //         {tab === 'withdraw' ? (
// //           <div style={{ padding: '0 24px 40px' }}>
// //             {/* Amount Input */}
// //             <div style={{ marginBottom: 16 }}>
// //               <div style={{ fontSize: 12, fontWeight: 700, color: '#e8b84b', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.8 }}>
// //                 Amount (MINE)
// //               </div>
// //               <div style={{ position: 'relative' }}>
// //                 <input
// //                   type="number"
// //                   value={amount}
// //                   onChange={e => setAmount(e.target.value)}
// //                   placeholder="Enter amount"
// //                   style={{
// //                     width: '100%',
// //                     background: CARD_BG,
// //                     border: '1px solid #e8b84b',
// //                     borderRadius: 16,
// //                     padding: '18px 20px',
// //                     fontSize: 18,
// //                     fontWeight: 700,
// //                     color: '#f3e6c9',
// //                   }}
// //                 />
// //                 <button
// //                   onClick={() => setAmount(String(user.balance))}
// //                   style={{
// //                     position: 'absolute',
// //                     right: 12,
// //                     top: '50%',
// //                     transform: 'translateY(-50%)',
// //                     background: '#e8b84b',
// //                     color: '#0a0704',
// //                     borderRadius: 8,
// //                     padding: '6px 12px',
// //                     fontSize: 12,
// //                     fontWeight: 700,
// //                   }}
// //                 >
// //                   MAX
// //                 </button>
// //               </div>
// //               {amount && Number(amount) < MIN_WITHDRAW && (
// //                 <div style={{ color: '#ef4444', fontSize: 12, marginTop: 6 }}>
// //                   Minimum withdrawal is {MIN_WITHDRAW} MINE
// //                 </div>
// //               )}
// //             </div>

// //             {/* Address Input */}
// //             <div style={{ marginBottom: 20 }}>
// //               <div style={{ fontSize: 12, fontWeight: 700, color: '#e8b84b', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.8 }}>
// //                 Wallet Address (BSC / ETH)
// //               </div>
// //               <input
// //                 type="text"
// //                 value={address}
// //                 onChange={e => setAddress(e.target.value)}
// //                 placeholder="0x..."
// //                 style={{
// //                   width: '100%',
// //                   background: CARD_BG,
// //                   border: '1px solid #e8b84b',
// //                   borderRadius: 16,
// //                   padding: '18px 20px',
// //                   fontSize: 14,
// //                   color: '#f3e6c9',
// //                 }}
// //               />
// //             </div>

// //             {/* Fee Info */}
// //             <div style={{ padding: "1px", borderRadius: 18, background: GRADIENT_BORDER, marginBottom: 20 }}>
// //               <div style={{
// //                 background: CARD_BG,
// //                 borderRadius: 16,
// //                 padding: '16px 20px',
// //               }}>
// //                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
// //                   <span style={{ fontSize: 13, color: '#e8b84b' }}>Amount</span>
// //                   <span style={{ fontSize: 13, fontWeight: 700 }}>{amount ? formatNumber(Number(amount)) : 0} MINE</span>
// //                 </div>
// //                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
// //                   <span style={{ fontSize: 13, color: '#e8b84b' }}>Fee (5%)</span>
// //                   <span style={{ fontSize: 13, color: '#ef4444' }}>-{amount ? Math.floor(Number(amount) * 0.05) : 0} MINE</span>
// //                 </div>
// //                 <div style={{ height: 1, background: '#3a2a12', margin: '8px 0' }} />
// //                 <div style={{ display: 'flex', justifyContent: 'space-between' }}>
// //                   <span style={{ fontSize: 13, fontWeight: 700 }}>You Receive</span>
// //                   <span style={{ fontSize: 14, fontWeight: 800, color: '#5fd66a' }}>
// //                     {amount ? formatNumber(Math.floor(Number(amount) * 0.95)) : 0} MINE
// //                   </span>
// //                 </div>
// //               </div>
// //             </div>

// //             <AnimatePresence>
// //               {success && (
// //                 <motion.div
// //                   initial={{ opacity: 0, y: -10 }}
// //                   animate={{ opacity: 1, y: 0 }}
// //                   exit={{ opacity: 0 }}
// //                   style={{
// //                     background: '#0f1a10',
// //                     border: '1px solid #5fd66a',
// //                     borderRadius: 14,
// //                     padding: '16px',
// //                     marginBottom: 16,
// //                     display: 'flex',
// //                     alignItems: 'center',
// //                     gap: 10,
// //                   }}
// //                 >
// //                   <CheckCircle size={20} color="#5fd66a" />
// //                   <span style={{ color: '#5fd66a', fontWeight: 700 }}>Withdrawal submitted successfully!</span>
// //                 </motion.div>
// //               )}
// //             </AnimatePresence>

// //             <motion.button
// //               whileTap={{ scale: 0.97 }}
// //               onClick={handleSubmit}
// //               style={{
// //                 width: '100%',
// //                 padding: '18px',
// //                 background: GRADIENT_BORDER,
// //                 color: '#0a0704',
// //                 fontSize: 16,
// //                 fontWeight: 700,
// //                 border: 'none',
// //                 borderRadius: 16,
// //                 opacity: (!amount || Number(amount) < MIN_WITHDRAW || !address) ? 0.6 : 1,
// //               }}
// //             >
// //               {submitting ? 'Submitting Withdrawal...' : '📤 Submit Withdrawal'}
// //             </motion.button>
// //           </div>
// //         ) : (
// //           <div style={{ padding: '20px 24px 40px' }}>
// //             <div style={{ fontSize: 12, fontWeight: 700, ...GRADIENT_TEXT, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1.2 }}>
// //               Withdrawal History
// //             </div>
// //             {MOCK_WITHDRAWALS.map((w, i) => {
// //               const Icon = statusIcon[w.status];
// //               return (
// //                 <motion.div
// //                   key={w.id}
// //                   initial={{ opacity: 0, y: 10 }}
// //                   animate={{ opacity: 1, y: 0 }}
// //                   transition={{ delay: i * 0.06 }}
// //                   style={{
// //                     padding: "1px",
// //                     borderRadius: 18,
// //                     background: GRADIENT_BORDER,
// //                     marginBottom: 12,
// //                   }}
// //                 >
// //                   <div style={{
// //                     background: CARD_BG,
// //                     borderRadius: 16,
// //                     padding: '18px',
// //                   }}>
// //                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
// //                       <div>
// //                         <div style={{ fontSize: 18, fontWeight: 800, color: '#f3e6c9' }}>
// //                           {formatNumber(w.amount)} MINE
// //                         </div>
// //                         <div style={{ fontSize: 12, color: '#e8b84b', marginTop: 4 }}>{w.address}</div>
// //                         <div style={{ fontSize: 11, color: '#e8b84b' }}>{w.date}</div>
// //                       </div>
// //                       <div style={{
// //                         display: 'flex',
// //                         alignItems: 'center',
// //                         gap: 6,
// //                         background: `${statusColor[w.status]}15`,
// //                         border: `1px solid ${statusColor[w.status]}30`,
// //                         borderRadius: 99,
// //                         padding: '6px 14px',
// //                       }}>
// //                         <Icon size={16} color={statusColor[w.status]} />
// //                         <span style={{ fontSize: 12, fontWeight: 700, color: statusColor[w.status], textTransform: 'capitalize' }}>
// //                           {w.status}
// //                         </span>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </motion.div>
// //               );
// //             })}
// //           </div>
// //         )}

// //         {/* Bottom Spacer */}
// //         <div style={{ height: 100 }} />

// //       </div>
// //     </div>
// //   );
// // }


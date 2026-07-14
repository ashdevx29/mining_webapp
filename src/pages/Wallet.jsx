import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { formatNumber, truncateAddress, copyToClipboard } from '../utils/helpers';
import { Copy, Check, ArrowUpRight, ArrowDownLeft, Wallet as WalletIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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

export default function Wallet() {
  const { user } = useApp();   // setUser nahi chahiye ab
  const navigate = useNavigate();

  const [copied, setCopied] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [loadingTxs, setLoadingTxs] = useState(true);

  const hasWallet = !!user?.walletAddress;

  // Fetch Transactions from Backend
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await API.get('/wallet/transactions');
        if (res.data.success) {
          setTransactions(res.data.transactions || []);
        }
      } catch (err) {
        console.error("Failed to fetch transactions:", err);
        setTransactions([]);
      } finally {
        setLoadingTxs(false);
      }
    };
    if (user) fetchTransactions();
  }, [user]);

  const handleCopy = async () => {
    if (user?.walletAddress) {
      await copyToClipboard(user.walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: "transparent" }}>
      
      {/* Home Page jaisa Background */}
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

      <div className="fixed inset-0 z-0 bg-black/45 pointer-events-none" />

      <div className="relative z-10 max-w-[430px] mx-auto min-h-screen pb-28">

        {/* Header */}
        <div style={{ padding: '32px 24px 0', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, ...GRADIENT_TEXT, fontSize: 24, fontWeight: 700 }}>
            <WalletIcon size={28} /> Wallet
          </div>
          <div style={{ fontSize: 13, color: '#e8b84b', marginTop: 6 }}>
            Your MINE balance and transaction history
          </div>
        </div>

        {/* Balance Card */}
        <div style={{ padding: '20px 24px 0' }}>
          <div style={{ padding: "1px", borderRadius: 28, background: GRADIENT_BORDER }}>
            <div style={{ background: CARD_BG, borderRadius: 26, padding: '28px 24px', textAlign: 'center' }}>
              <div style={{ fontSize: 14, color: '#e8b84b', marginBottom: 8 }}>MINE Balance</div>
              <motion.div
                key={user?.balance || 0}
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                style={{ fontSize: 42, fontWeight: 900, ...GRADIENT_TEXT, marginBottom: 8 }}
              >
                {formatNumber(user?.balance || 0)}
              </motion.div>
              <div style={{ color: '#e8b84b', fontSize: 13, marginBottom: 24 }}>
                ≈ ${((user?.balance || 0) * 0.001).toFixed(2)} USD
              </div>

              <div style={{ display: 'flex', gap: 12 }}>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/withdraw')}
                  style={{
                    flex: 1,
                    background: GRADIENT_BORDER,
                    color: '#0a0704',
                    fontWeight: 700,
                    border: 'none',
                    borderRadius: 14,
                    padding: '14px 16px',
                    fontSize: 14,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <ArrowUpRight size={18} />
                  Withdraw
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/transactions')}
                  style={{
                    flex: 1,
                    background: 'rgba(255,255,255,0.08)',
                    color: '#f3e6c9',
                    border: '1px solid rgba(232,184,75,0.3)',
                    borderRadius: 14,
                    padding: '14px 16px',
                    fontSize: 14,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <ArrowDownLeft size={18} />
                  History
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Wallet Address - Only show if connected */}
        {hasWallet && (
          <div style={{ padding: '24px 24px 0' }}>
            <div style={{ fontSize: 12, fontWeight: 700, ...GRADIENT_TEXT, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1.2 }}>
              Connected Wallet
            </div>

            <div style={{ padding: "1px", borderRadius: 18, background: GRADIENT_BORDER }}>
              <div style={{ background: CARD_BG, borderRadius: 16, padding: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ flex: 1, fontSize: 13, color: '#c9b38a', fontFamily: 'monospace' }}>
                    {truncateAddress(user.walletAddress)}
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleCopy}
                    style={{
                      background: 'rgba(232,184,75,0.15)',
                      border: '1px solid #e8b84b',
                      borderRadius: 10,
                      padding: '8px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: 13,
                    }}
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? 'Copied!' : 'Copy'}
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mining Stats */}
        <div style={{ padding: '24px 24px 0' }}>
          <div style={{ fontSize: 12, fontWeight: 700, ...GRADIENT_TEXT, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1.2 }}>
            Mining Stats
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { label: 'Total Mined', value: formatNumber(user?.totalMined || 0), icon: '⛏️' },
              { label: 'Referrals', value: formatNumber(user?.totalReferrals || 0), icon: '👥' },
            ].map((s, i) => (
              <div key={i} style={{ padding: "1px", borderRadius: 16, background: GRADIENT_BORDER }}>
                <div style={{ background: CARD_BG, borderRadius: 14, padding: '16px', textAlign: 'center' }}>
                  <div style={{ fontSize: 22, marginBottom: 8 }}>{s.icon}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: '#f4d99a' }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: '#e8b84b', marginTop: 4 }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div style={{ padding: '24px 24px 0' }}>
          <div style={{ fontSize: 12, fontWeight: 700, ...GRADIENT_TEXT, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1.2 }}>
            Recent Transactions
          </div>
          <div style={{ padding: "1px", borderRadius: 20, background: GRADIENT_BORDER }}>
            <div style={{ background: CARD_BG, borderRadius: 18, padding: '8px 20px' }}>
              {loadingTxs ? (
                <div style={{ padding: '60px 20px', textAlign: 'center', color: '#e8b84b' }}>Loading transactions...</div>
              ) : transactions.length > 0 ? (
                transactions.map((tx, i) => (
                  <motion.div
                    key={tx._id || i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 14,
                      padding: '16px 0',
                      borderBottom: i < transactions.length - 1 ? '1px solid rgba(58,42,18,0.6)' : 'none',
                    }}
                  >
                    <div style={{ fontSize: 22 }}>{tx.type === 'credit' ? '⛏️' : '💸'}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#f3e6c9' }}>
                        {tx.description || tx.label || 'Transaction'}
                      </div>
                      <div style={{ fontSize: 12, color: '#e8b84b' }}>
                        {tx.createdAt ? new Date(tx.createdAt).toLocaleDateString() : 'Just now'}
                      </div>
                    </div>
                    <div style={{ 
                      fontSize: 15, 
                      fontWeight: 700, 
                      color: (tx.type === 'credit' || tx.sign === '+') ? '#5fd66a' : '#ef6a4c' 
                    }}>
                      {(tx.type === 'credit' || tx.sign === '+') ? '+' : ''}{formatNumber(tx.amount)}
                    </div>
                  </motion.div>
                ))
              ) : (
                <div style={{ padding: '60px 20px', textAlign: 'center', color: '#6b5730' }}>
                  No transactions yet
                </div>
              )}
            </div>
          </div>
        </div>

        <div style={{ height: 100 }} />
      </div>
    </div>
  );
}












// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { useApp } from '../context/AppContext';
// import { formatNumber, truncateAddress, copyToClipboard } from '../utils/helpers';
// import { Copy, Check, ArrowUpRight, ArrowDownLeft, Wallet as WalletIcon } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
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

// export default function Wallet() {
//   const { user, setUser } = useApp();
//   const navigate = useNavigate();

//   const [copied, setCopied] = useState(false);
//   const [connecting, setConnecting] = useState(false);
//   const [transactions, setTransactions] = useState([]);
//   const [loadingTxs, setLoadingTxs] = useState(true);

//   const hasWallet = !!user?.walletAddress;

//   // Fetch Transactions from Backend
//   useEffect(() => {
//     const fetchTransactions = async () => {
//       try {
//         const res = await API.get('/wallet/transactions'); // Agar API service import kiya hai to
//         if (res.data.success) {
//           setTransactions(res.data.transactions || []);
//         }
//       } catch (err) {
//         console.error("Failed to fetch transactions:", err);
//         setTransactions([]); // fallback
//       } finally {
//         setLoadingTxs(false);
//       }
//     };
//     if (user) fetchTransactions();
//   }, [user]);

//   const handleConnectWallet = async () => {
//     setConnecting(true);
//     try {
//       const res = await API.post('/wallet/connect', {
//         walletAddress: "0x1A2b3C4d5E6f7A8b9C0d1E2f3A4b5C6d7E8f9A0"
//       });
//       if (res.data.success) {
//         setUser(prev => ({ ...prev, walletAddress: res.data.walletAddress }));
//       }
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed to connect wallet");
//     } finally {
//       setConnecting(false);
//     }
//   };

//   const handleCopy = async () => {
//     if (user?.walletAddress) {
//       await copyToClipboard(user.walletAddress);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     }
//   };

//   return (
//     <div className="relative min-h-screen overflow-x-hidden" style={{ background: "transparent" }}>
      
//       {/* ✅ Home Page jaisa Exact Background */}
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

//       {/* Dark Overlay - Same as Home */}
//       <div className="fixed inset-0 z-0 bg-black/45 pointer-events-none" />

//       <div className="relative z-10 max-w-[430px] mx-auto min-h-screen pb-28">

//         {/* Header */}
//         <div style={{ padding: '32px 24px 0', textAlign: 'center' }}>
//           <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, ...GRADIENT_TEXT, fontSize: 24, fontWeight: 700 }}>
//             <WalletIcon size={28} /> Wallet
//           </div>
//           <div style={{ fontSize: 13, color: '#e8b84b', marginTop: 6 }}>
//             Your MINE balance and transaction history
//           </div>
//         </div>

//         {/* Balance Card */}
//         <div style={{ padding: '20px 24px 0' }}>
//           <div style={{ padding: "1px", borderRadius: 28, background: GRADIENT_BORDER }}>
//             <div style={{ background: CARD_BG, borderRadius: 26, padding: '28px 24px', textAlign: 'center' }}>
//               <div style={{ fontSize: 14, color: '#e8b84b', marginBottom: 8 }}>MINE Balance</div>
//               <motion.div
//                 key={user?.balance || 0}
//                 initial={{ scale: 1.05 }}
//                 animate={{ scale: 1 }}
//                 style={{ fontSize: 42, fontWeight: 900, ...GRADIENT_TEXT, marginBottom: 8 }}
//               >
//                 {formatNumber(user?.balance || 0)}
//               </motion.div>
//               <div style={{ color: '#e8b84b', fontSize: 13, marginBottom: 24 }}>
//                 ≈ ${((user?.balance || 0) * 0.001).toFixed(2)} USD
//               </div>

//               <div style={{ display: 'flex', gap: 12 }}>
//                 <motion.button
//                   whileTap={{ scale: 0.97 }}
//                   onClick={() => navigate('/withdraw')}
//                   style={{
//                     flex: 1,
//                     background: GRADIENT_BORDER,
//                     color: '#0a0704',
//                     fontWeight: 700,
//                     border: 'none',
//                     borderRadius: 14,
//                     padding: '14px 16px',
//                     fontSize: 14,
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     gap: '8px'
//                   }}
//                 >
//                   <ArrowUpRight size={18} />
//                   Withdraw
//                 </motion.button>

//                 <motion.button
//                   whileTap={{ scale: 0.97 }}
//                   onClick={() => navigate('/transactions')}
//                   style={{
//                     flex: 1,
//                     background: 'rgba(255,255,255,0.08)',
//                     color: '#f3e6c9',
//                     border: '1px solid rgba(232,184,75,0.3)',
//                     borderRadius: 14,
//                     padding: '14px 16px',
//                     fontSize: 14,
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     gap: '8px'
//                   }}
//                 >
//                   <ArrowDownLeft size={18} />
//                   History
//                 </motion.button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Wallet Address */}
//         <div style={{ padding: '24px 24px 0' }}>
//           <div style={{ fontSize: 12, fontWeight: 700, ...GRADIENT_TEXT, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1.2 }}>
//             Connected Wallet
//           </div>

//           {hasWallet ? (
//             <div style={{ padding: "1px", borderRadius: 18, background: GRADIENT_BORDER }}>
//               <div style={{ background: CARD_BG, borderRadius: 16, padding: '18px' }}>
//                 <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
//                   <div style={{ flex: 1, fontSize: 13, color: '#c9b38a', fontFamily: 'monospace' }}>
//                     {truncateAddress(user.walletAddress)}
//                   </div>
//                   <motion.button
//                     whileTap={{ scale: 0.9 }}
//                     onClick={handleCopy}
//                     style={{
//                       background: 'rgba(232,184,75,0.15)',
//                       border: '1px solid #e8b84b',
//                       borderRadius: 10,
//                       padding: '8px 14px',
//                       display: 'flex',
//                       alignItems: 'center',
//                       gap: '6px',
//                       fontSize: 13,
//                     }}
//                   >
//                     {copied ? <Check size={16} /> : <Copy size={16} />}
//                     {copied ? 'Copied!' : 'Copy'}
//                   </motion.button>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div style={{ padding: "1px", borderRadius: 18, background: GRADIENT_BORDER }}>
//               <div style={{ background: CARD_BG, borderRadius: 16, padding: '28px 24px', textAlign: 'center' }}>
//                 <div style={{ fontSize: 42, marginBottom: 12 }}>🔗</div>
//                 <div style={{ fontSize: 16, fontWeight: 700, color: '#f3e6c9', marginBottom: 8 }}>Connect Wallet</div>
//                 <div style={{ fontSize: 13, color: '#e8b84b', marginBottom: 20 }}>
//                   Connect MetaMask or Telegram Wallet to withdraw rewards
//                 </div>
//                 <motion.button
//                   whileTap={{ scale: 0.97 }}
//                   onClick={handleConnectWallet}
//                   style={{
//                     width: '100%', 
//                     padding: '16px', 
//                     borderRadius: 14,
//                     background: GRADIENT_BORDER, 
//                     color: '#0a0704',
//                     fontWeight: 700, 
//                     fontSize: 15,
//                   }}
//                 >
//                   {connecting ? 'Connecting...' : 'Connect Wallet'}
//                 </motion.button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Mining Stats */}
//         <div style={{ padding: '24px 24px 0' }}>
//           <div style={{ fontSize: 12, fontWeight: 700, ...GRADIENT_TEXT, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1.2 }}>
//             Mining Stats
//           </div>
//           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
//             {[
//               { label: 'Total Mined', value: formatNumber(user?.totalMined || 0), icon: '⛏️' },
//               { label: 'Referrals', value: formatNumber(user?.totalReferrals || 0), icon: '👥' },
//             ].map((s, i) => (
//               <div key={i} style={{ padding: "1px", borderRadius: 16, background: GRADIENT_BORDER }}>
//                 <div style={{ background: CARD_BG, borderRadius: 14, padding: '16px', textAlign: 'center' }}>
//                   <div style={{ fontSize: 22, marginBottom: 8 }}>{s.icon}</div>
//                   <div style={{ fontSize: 18, fontWeight: 800, color: '#f4d99a' }}>{s.value}</div>
//                   <div style={{ fontSize: 11, color: '#e8b84b', marginTop: 4 }}>{s.label}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Recent Transactions */}
//         <div style={{ padding: '24px 24px 0' }}>
//           <div style={{ fontSize: 12, fontWeight: 700, ...GRADIENT_TEXT, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1.2 }}>
//             Recent Transactions
//           </div>
//           <div style={{ padding: "1px", borderRadius: 20, background: GRADIENT_BORDER }}>
//             <div style={{ background: CARD_BG, borderRadius: 18, padding: '8px 20px' }}>
//               {loadingTxs ? (
//                 <div style={{ padding: '60px 20px', textAlign: 'center', color: '#e8b84b' }}>Loading transactions...</div>
//               ) : transactions.length > 0 ? (
//                 transactions.map((tx, i) => (
//                   <motion.div
//                     key={tx._id || i}
//                     initial={{ opacity: 0, x: -10 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: i * 0.05 }}
//                     style={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       gap: 14,
//                       padding: '16px 0',
//                       borderBottom: i < transactions.length - 1 ? '1px solid rgba(58,42,18,0.6)' : 'none',
//                     }}
//                   >
//                     <div style={{ fontSize: 22 }}>{tx.type === 'credit' ? '⛏️' : '💸'}</div>
//                     <div style={{ flex: 1 }}>
//                       <div style={{ fontSize: 14, fontWeight: 600, color: '#f3e6c9' }}>
//                         {tx.description || tx.label || 'Transaction'}
//                       </div>
//                       <div style={{ fontSize: 12, color: '#e8b84b' }}>
//                         {tx.createdAt ? new Date(tx.createdAt).toLocaleDateString() : 'Just now'}
//                       </div>
//                     </div>
//                     <div style={{ 
//                       fontSize: 15, 
//                       fontWeight: 700, 
//                       color: (tx.type === 'credit' || tx.sign === '+') ? '#5fd66a' : '#ef6a4c' 
//                     }}>
//                       {(tx.type === 'credit' || tx.sign === '+') ? '+' : ''}{formatNumber(tx.amount)}
//                     </div>
//                   </motion.div>
//                 ))
//               ) : (
//                 <div style={{ padding: '60px 20px', textAlign: 'center', color: '#6b5730' }}>
//                   No transactions yet
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         <div style={{ height: 100 }} />
//       </div>
//     </div>
//   );
// }









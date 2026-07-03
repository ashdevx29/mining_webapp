import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { formatNumber, truncateAddress, copyToClipboard } from '../utils/helpers';
import { Copy, Check, ArrowUpRight, ArrowDownLeft, Wallet as WalletIcon } from 'lucide-react';
// import { FaWallet } from 'react-icons/fa';   // ← Added this
import coinImg from '../assets/coin.png';
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
  const { user, setUser } = useApp();
  const [copied, setCopied] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const hasWallet = !!user.walletAddress;
  const mockAddress = '0x1A2b3C4d5E6f7A8b9C0d1E2f3A4b5C6d7E8f9A0';

  const handleConnect = () => {
    setConnecting(true);
    setTimeout(() => {
      setUser(prev => ({ ...prev, walletAddress: mockAddress }));
      setConnecting(false);
    }, 1500);
  };

  const handleCopy = async () => {
    await copyToClipboard(user.walletAddress || mockAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const MOCK_TXS = [
    { id: 1, type: 'mining', label: 'Mining Reward', amount: 200, time: '2h ago', sign: '+' },
    { id: 2, type: 'referral', label: 'Referral Bonus', amount: 50, time: '5h ago', sign: '+' },
    { id: 3, type: 'task', label: 'Task Reward', amount: 100, time: '1d ago', sign: '+' },
    { id: 4, type: 'spin', label: 'Lucky Spin', amount: 500, time: '2d ago', sign: '+' },
    { id: 5, type: 'withdraw', label: 'Withdrawal', amount: 1000, time: '3d ago', sign: '-' },
  ];

  const txIcons = { mining: '⛏️', referral: '👥', task: '📋', spin: '🎰', withdraw: '💸' };

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
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: 10, 
            ...GRADIENT_TEXT, 
            fontSize: 24, 
            fontWeight: 700 
          }}>
            {/* <FaWallet size={28} />  */}
            Wallet
          </div>
          <div style={{ fontSize: 13, color: '#e8b84b', marginTop: 6 }}>
            Your MINE balance and transaction history
          </div>
        </div>

        {/* Balance Card */}
        <div style={{ padding: '20px 24px 0' }}>
          <div style={{ padding: "1px", borderRadius: 28, background: GRADIENT_BORDER }}>
            <div style={{
              background: CARD_BG,
              borderRadius: 26,
              padding: '28px 24px',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: -60, right: -60, width: 180, height: 180,
                borderRadius: '50%', background: 'rgba(232,184,75,0.08)',
              }} />

              <div style={{ fontSize: 14, color: '#e8b84b', marginBottom: 8 }}>MINE Balance</div>
              <motion.div
                key={user.balance}
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                style={{
                  fontSize: 42, fontWeight: 900, letterSpacing: '-1px',
                  ...GRADIENT_TEXT,
                  marginBottom: 8,
                }}
              >
                {formatNumber(user.balance)}
              </motion.div>
              <div style={{ color: '#e8b84b', fontSize: 13, marginBottom: 24 }}>
                ≈ ${(user.balance * 0.001).toFixed(2)} USD
              </div>

              <div style={{ display: 'flex', gap: 12 }}>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  style={{
                    flex: 1, background: GRADIENT_BORDER, color: '#0a0704',
                    fontWeight: 700, border: 'none', borderRadius: 14,
                    padding: '14px', fontSize: 14, display: 'flex',
                    alignItems: 'center', justifyContent: 'center', gap: 6,
                  }}
                >
                  <ArrowUpRight size={18} /> Withdraw
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  style={{
                    flex: 1, background: 'rgba(255,255,255,0.08)', color: '#f3e6c9',
                    border: '1px solid rgba(232,184,75,0.3)', borderRadius: 14,
                    padding: '14px', fontSize: 14, display: 'flex',
                    alignItems: 'center', justifyContent: 'center', gap: 6,
                  }}
                >
                  <ArrowDownLeft size={18} /> History
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Wallet Address */}
        <div style={{ padding: '24px 24px 0' }}>
          <div style={{ fontSize: 12, fontWeight: 700, ...GRADIENT_TEXT, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1.2 }}>
            Connected Wallet
          </div>
          {hasWallet ? (
            <div style={{ padding: "1px", borderRadius: 18, background: GRADIENT_BORDER }}>
              <div style={{
                background: CARD_BG,
                borderRadius: 16,
                padding: '18px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <WalletIcon size={20} color="#e8b84b" />
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#e8b84b' }}>Wallet Connected</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ flex: 1, fontSize: 13, color: '#c9b38a', fontFamily: 'monospace', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {truncateAddress(user.walletAddress)}
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleCopy}
                    style={{
                      background: 'rgba(232,184,75,0.15)', border: '1px solid #e8b84b',
                      borderRadius: 10, padding: '8px 14px',
                      display: 'flex', alignItems: 'center', gap: 6,
                      color: '#e8b84b', fontWeight: 700,
                    }}
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? 'Copied!' : 'Copy'}
                  </motion.button>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ padding: "1px", borderRadius: 18, background: GRADIENT_BORDER }}>
              <div style={{
                background: CARD_BG,
                borderRadius: 16,
                padding: '28px 24px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 42, marginBottom: 12 }}>🔗</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#f3e6c9', marginBottom: 8 }}>Connect Wallet</div>
                <div style={{ fontSize: 13, color: '#e8b84b', marginBottom: 20 }}>
                  Connect MetaMask or Telegram Wallet to withdraw rewards
                </div>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleConnect}
                  style={{
                    width: '100%', padding: '16px', borderRadius: 14,
                    background: GRADIENT_BORDER, color: '#0a0704',
                    fontWeight: 700, fontSize: 15,
                  }}
                >
                  {connecting ? 'Connecting...' : 'Connect Wallet'}
                </motion.button>
              </div>
            </div>
          )}
        </div>

        {/* Mining Stats */}
        <div style={{ padding: '24px 24px 0' }}>
          <div style={{ fontSize: 12, fontWeight: 700, ...GRADIENT_TEXT, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1.2 }}>
            Mining Stats
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { label: 'Total Mined', value: formatNumber(user.totalMined), icon: '⛏️' },
              { label: 'Referral Earnings', value: formatNumber(user.referralEarnings), icon: '👥' },
              { label: 'Task Rewards', value: formatNumber(575), icon: '📋' },
              { label: 'Spin Winnings', value: formatNumber(500), icon: '🎰' },
            ].map((s, i) => (
              <div key={i} style={{ padding: "1px", borderRadius: 16, background: GRADIENT_BORDER }}>
                <div style={{
                  background: CARD_BG,
                  borderRadius: 14,
                  padding: '16px',
                  textAlign: 'center',
                }}>
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
              {MOCK_TXS.map((tx, i) => (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '16px 0',
                    borderBottom: i < MOCK_TXS.length - 1 ? '1px solid rgba(58,42,18,0.6)' : 'none',
                  }}
                >
                  <div style={{
                    width: 42, height: 42, borderRadius: 12, fontSize: 20,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(232,184,75,0.1)',
                  }}>
                    {txIcons[tx.type]}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#f3e6c9' }}>{tx.label}</div>
                    <div style={{ fontSize: 12, color: '#e8b84b' }}>{tx.time}</div>
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: tx.sign === '+' ? '#5fd66a' : '#ef6a4c' }}>
                    {tx.sign}{formatNumber(tx.amount)}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Spacer */}
        <div style={{ height: 60 }} />

      </div>
    </div>
  );
}


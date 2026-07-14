import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { formatNumber, copyToClipboard } from '../utils/helpers';
import { Copy, Check, Share2, Users } from 'lucide-react';
import coinImg from '../assets/coin.png';
import bgImage from "../assets/page-bg.png";
import API from '../services/api';

const GRADIENT_BORDER = "linear-gradient(135deg,#FFF2A6 0%,#FFD96A 12%,#FFC83D 28%,#F5B300 45%,#D88A00 68%,#8A5200 100%)";
const CARD_BG = "#0A090A";

const GRADIENT_TEXT = {
  background: GRADIENT_BORDER,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  color: "transparent",
};

export default function Referral() {
  const { user } = useApp();
  const [copied, setCopied] = useState(false);
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Referral Link
  const BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5173' 
    : (process.env.REACT_APP_FRONTEND_URL || 'https://mining-webapp-xi.vercel.app/');

  const refLink = `${BASE_URL}/signup?ref=${user?.referralCode || ''}`;

  // Fetch Referrals
  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const res = await API.get('/referral/stats');
        if (res.data.success) {
          setReferrals(res.data.referrals || []);
        }
      } catch (err) {
        console.error("Referral fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchReferrals();
  }, [user]);

  const handleCopy = async () => {
    await copyToClipboard(refLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ 
        title: 'Join MineBot!', 
        text: 'Mine MINE coins with me!', 
        url: refLink 
      });
    }
  };

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{ background: "transparent" }}
    >
      {/* Background Image - Same as Home Page */}
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

      {/* Dark Overlay - Same as Home Page */}
      <div className="fixed inset-0 z-0 bg-black/45 pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 max-w-[430px] mx-auto min-h-screen pb-28">

        {/* Header */}
        <div style={{ padding: '32px 24px 0', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, ...GRADIENT_TEXT, fontSize: 22, fontWeight: 700 }}>
            <Users size={24} color="#e8b84b" /> Invite Friends
          </div>
          <div style={{ fontSize: 13, color: '#e8b84b', marginTop: 6 }}>
            Earn 50 MINE for each friend you invite!
          </div>
        </div>

        {/* Banner */}
        <div style={{ padding: '32px 24px 0' }}>
          <div style={{ padding: "1px", borderRadius: 28, background: GRADIENT_BORDER }}>
            <div style={{ background: CARD_BG, borderRadius: 26, padding: '32px 24px', textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 700, ...GRADIENT_TEXT, marginBottom: 8 }}>Invite & Earn</div>
              <div style={{ color: '#e8b84b', fontSize: 13.5, marginBottom: 24, lineHeight: 1.6 }}>
                You earn <span style={{ color: '#e8b84b' }}>50 MINE</span> per referral +<br />
                <span style={{ color: '#5fd66a' }}>10% of their mining</span> forever!
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 26, fontWeight: 800, color: '#f4d99a' }}>{user?.totalReferrals || 0}</div>
                  <div style={{ fontSize: 11, color: '#e8b84b' }}>FRIENDS INVITED</div>
                </div>
                <div style={{ width: 1, background: 'rgba(201,146,47,0.2)' }} />
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 26, fontWeight: 800, color: '#5fd66a' }}>{user?.referralMiningBonus || 0}</div>
                  <div style={{ fontSize: 11, color: '#e8b84b' }}>EXTRA USDT / MINING</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Referral Link */}
        <div style={{ padding: '24px 24px 0' }}>
          <div style={{ fontSize: 12, fontWeight: 700, ...GRADIENT_TEXT, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1.2 }}>
            Your Referral Link
          </div>
          {/* <div style={{ padding: "1px", borderRadius: 18, background: GRADIENT_BORDER }}>
            <div style={{ background: CARD_BG, borderRadius: 16, padding: '16px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ flex: 1, fontSize: 13, color: '#c9b38a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {refLink}
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleCopy}
                style={{
                  background: copied ? 'rgba(95,214,106,0.2)' : 'rgba(201,146,47,0.2)',
                  border: `1px solid ${copied ? '#5fd66a' : '#e8b84b'}`,
                  borderRadius: 10,
                  padding: '10px 16px',
                }}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Copied!' : 'Copy'}
              </motion.button>
            </div>
          </div> */}
          <div style={{ padding: "1px", borderRadius: 18, background: GRADIENT_BORDER }}>
  <div style={{ 
    background: CARD_BG, 
    borderRadius: 16, 
    padding: '16px', 
    display: 'flex', 
    alignItems: 'center', 
    gap: 12 
  }}>
    
    <div style={{ 
      flex: 1, 
      fontSize: 13, 
      color: '#c9b38a', 
      overflow: 'hidden', 
      textOverflow: 'ellipsis', 
      whiteSpace: 'nowrap' 
    }}>
      {refLink}
    </div>

    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={handleCopy}
      style={{
        background: copied ? 'rgba(95,214,106,0.2)' : 'rgba(201,146,47,0.2)',
        border: `1px solid ${copied ? '#5fd66a' : '#e8b84b'}`,
        borderRadius: 10,
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '13px',
        fontWeight: '600',
        color: copied ? '#5fd66a' : '#e8b84b',
        whiteSpace: 'nowrap'
      }}
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
      {copied ? 'Copied!' : 'Copy'}
    </motion.button>
  </div>
</div>

          {/* <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleShare}
            style={{
              width: '100%',
              marginTop: 14,
              background: GRADIENT_BORDER,
              color: '#0a0704',
              fontWeight: 700,
              fontSize: 15,
              borderRadius: 16,
              padding: '16px',
            }}
          >
            <Share2 size={18} /> Share with Friends
          </motion.button> */}
          <motion.button
  whileTap={{ scale: 0.97 }}
  onClick={handleShare}
  style={{
    width: '100%',
    marginTop: 14,
    background: GRADIENT_BORDER,
    color: '#0a0704',
    fontWeight: 700,
    fontSize: 15,
    borderRadius: 16,
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',           // Space between icon and text
  }}
>
  <Share2 size={18} />
  Share with Friends
</motion.button>
        </div>

        {/* Referral Code */}
        <div style={{ padding: '24px 24px 0' }}>
          <div style={{ padding: "1px", borderRadius: 18, background: GRADIENT_BORDER }}>
            <div style={{ background: CARD_BG, borderRadius: 16, padding: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: 12, color: '#e8b84b', marginBottom: 8 }}>Your Referral Code</div>
              <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: 6, color: '#e8b84b' }}>
                {user?.referralCode || 'LOADING...'}
              </div>
            </div>
          </div>
        </div>

        {/* Referrals List */}
        <div style={{ padding: '24px 24px 40px' }}>
          <div style={{ fontSize: 12, fontWeight: 700, ...GRADIENT_TEXT, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1.2 }}>
            <Users size={14} /> Your Referrals ({referrals.length})
          </div>
          <div style={{ padding: "1px", borderRadius: 20, background: GRADIENT_BORDER }}>
            <div style={{ background: CARD_BG, borderRadius: 18, padding: '8px 20px' }}>
              {referrals.length > 0 ? referrals.map((r, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 14, 
                    padding: '18px 0', 
                    borderBottom: i < referrals.length - 1 ? '1px solid rgba(58,42,18,0.6)' : 'none' 
                  }}
                >
                  <div style={{ 
                    width: 42, 
                    height: 42, 
                    borderRadius: '50%', 
                    background: 'linear-gradient(135deg, #2a1c0a, #120c04)', 
                    color: '#e8b84b', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontSize: 16, 
                    fontWeight: 700 
                  }}>
                    {r.fullName?.[0] || 'U'}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#f3e6c9' }}>{r.fullName}</div>
                    <div style={{ fontSize: 12, color: '#e8b84b' }}>{new Date(r.createdAt).toLocaleDateString()}</div>
                  </div>
                </motion.div>
              )) : (
                <div style={{ padding: '60px 20px', textAlign: 'center', color: '#6b5730' }}>
                  No referrals yet. Share your link to start earning!
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


import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Mail, Send } from 'lucide-react';
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

export default function Support() {
  const [form, setForm] = useState({ subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = () => {
    if (!form.subject || !form.message) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setForm({ subject: '', message: '' });
    }, 1200);
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
          <div style={{ ...GRADIENT_TEXT, fontSize: 24, fontWeight: 700 }}>💬 Support</div>
          <div style={{ fontSize: 13, color: '#e8b84b', marginTop: 6 }}>
            We're here to help you
          </div>
        </div>

        {/* Contact Cards */}
        <div style={{ padding: '24px 24px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {[
              { icon: '📢', label: 'Telegram Channel', desc: '@MineBot', color: '#60a5fa', action: () => {} },
              { icon: '💬', label: 'Support Group', desc: '@MineBotSupport', color: '#4ade80', action: () => {} },
            ].map((c) => (
              <motion.div
                key={c.label}
                whileTap={{ scale: 0.97 }}
                onClick={c.action}
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
                  padding: '12px',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>{c.icon}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#f3e6c9', marginBottom: 4 }}>{c.label}</div>
                  <div style={{ fontSize: 13, color: c.color, fontWeight: 600 }}>{c.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Ticket Form */}
        <div style={{ padding: '0 24px 20px', marginTop: 24 }}>
          <div style={{ fontSize: 12, fontWeight: 700, ...GRADIENT_TEXT, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1.2 }}>
            Submit a Ticket
          </div>

          <AnimatePresence>
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  background: CARD_BG,
                  border: '1px solid #4ade80',
                  borderRadius: 18,
                  padding: '36px 24px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 52, marginBottom: 12 }}>✅</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#4ade80', marginBottom: 8 }}>Ticket Submitted!</div>
                <div style={{ fontSize: 13, color: '#e8b84b', lineHeight: 1.6 }}>
                  We'll respond within 24 hours via Telegram. Keep an eye on your notifications!
                </div>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSent(false)}
                  style={{
                    marginTop: 20,
                    background: 'rgba(74,222,128,0.15)',
                    border: '1px solid #4ade80',
                    borderRadius: 12,
                    padding: '12px 24px',
                    color: '#4ade80',
                    fontWeight: 700,
                    fontSize: 14,
                    cursor: 'pointer',
                  }}
                >
                  Submit Another Ticket
                </motion.button>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div style={{ padding: "1px", borderRadius: 18, background: GRADIENT_BORDER, marginBottom: 14 }}>
                  <select
                    value={form.subject}
                    onChange={e => setForm(prev => ({ ...prev, subject: e.target.value }))}
                    style={{
                      background: CARD_BG,
                      borderRadius: 16,
                      width: '100%',
                      padding: '16px 20px',
                      fontSize: 14,
                      color: '#f3e6c9',
                      border: 'none',
                      appearance: 'none',
                    }}
                  >
                    <option value="">Select a topic...</option>
                    <option value="mining">Mining Issue</option>
                    <option value="withdraw">Withdrawal Problem</option>
                    <option value="referral">Referral Issue</option>
                    <option value="account">Account Problem</option>
                    <option value="bug">Bug Report</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div style={{ padding: "1px", borderRadius: 18, background: GRADIENT_BORDER }}>
                  <textarea
                    value={form.message}
                    onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Describe your issue in detail..."
                    style={{
                      background: CARD_BG,
                      borderRadius: 16,
                      width: '100%',
                      padding: '16px 20px',
                      fontSize: 14,
                      color: '#f3e6c9',
                      border: 'none',
                      minHeight: 140,
                      resize: 'vertical',
                    }}
                  />
                </div>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSubmit}
                  style={{
                    width: '100%',
                    marginTop: 16,
                    padding: '18px',
                    background: GRADIENT_BORDER,
                    color: '#0a0704',
                    fontSize: 16,
                    fontWeight: 700,
                    border: 'none',
                    borderRadius: 16,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    opacity: !form.subject || !form.message ? 0.6 : 1,
                    cursor: !form.subject || !form.message ? 'not-allowed' : 'pointer',
                  }}
                >
                  <Send size={18} />
                  {sending ? 'Submitting Ticket...' : 'Submit Ticket'}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Response Time Info */}
        <div style={{ padding: '0 24px 40px' }}>
          <div style={{ padding: "1px", borderRadius: 18, background: GRADIENT_BORDER }}>
            <div style={{
              background: CARD_BG,
              borderRadius: 16,
              padding: '18px 20px',
              display: 'flex',
              gap: 14,
            }}>
              <span style={{ fontSize: 26 }}>⏰</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#f3e6c9' }}>Average Response Time</div>
                <div style={{ fontSize: 13, color: '#e8b84b', marginTop: 4 }}>
                  We typically respond within 2-24 hours during business days.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Spacer */}
        <div style={{ height: 100 }} />

      </div>
    </div>
  );
}








// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { MessageCircle, Mail, Send } from 'lucide-react';

// export default function Support() {
//   const [form, setForm] = useState({ subject: '', message: '' });
//   const [sent, setSent] = useState(false);
//   const [sending, setSending] = useState(false);

//   const handleSubmit = () => {
//     if (!form.subject || !form.message) return;
//     setSending(true);
//     setTimeout(() => {
//       setSending(false);
//       setSent(true);
//       setForm({ subject: '', message: '' });
//     }, 1200);
//   };

//   return (
//     <div className="page-content">
//       <div style={{ padding: '20px 20px 0', textAlign: 'center' }}>
//         <div style={{ fontSize: 22, fontWeight: 900 }}>💬 Support</div>
//         <div style={{ fontSize: 13, color: '#6b7280', marginTop: 4 }}>
//           We're here to help you
//         </div>
//       </div>

//       {/* Contact Cards */}
//       <div style={{ padding: '16px 20px' }}>
//         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
//           {[
//             { icon: '📢', label: 'Telegram Channel', desc: '@MineBot', color: '#3b82f6', action: () => {} },
//             { icon: '💬', label: 'Support Group', desc: '@MineBotSupport', color: '#10b981', action: () => {} },
//           ].map((c) => (
//             <motion.div
//               key={c.label}
//               whileTap={{ scale: 0.97 }}
//               onClick={c.action}
//               style={{
//                 background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.06)',
//                 borderRadius: 16, padding: '16px', textAlign: 'center', cursor: 'pointer',
//               }}
//             >
//               <div style={{ fontSize: 30, marginBottom: 8 }}>{c.icon}</div>
//               <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{c.label}</div>
//               <div style={{ fontSize: 11, color: c.color, fontWeight: 600 }}>{c.desc}</div>
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       {/* Ticket Form */}
//       <div style={{ padding: '0 20px 16px' }}>
//         <div style={{ fontSize: 13, fontWeight: 700, color: '#9ca3af', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.8 }}>
//           Submit a Ticket
//         </div>

//         <AnimatePresence>
//           {sent ? (
//             <motion.div
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0 }}
//               style={{
//                 background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)',
//                 borderRadius: 16, padding: '32px', textAlign: 'center',
//               }}
//             >
//               <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
//               <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 8 }}>Ticket Submitted!</div>
//               <div style={{ fontSize: 13, color: '#9ca3af', lineHeight: 1.5 }}>
//                 We'll respond within 24 hours via Telegram. Check your notifications!
//               </div>
//               <motion.button
//                 whileTap={{ scale: 0.97 }}
//                 onClick={() => setSent(false)}
//                 style={{ marginTop: 16, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 12, padding: '10px 20px', color: '#6ee7b7', fontWeight: 700, cursor: 'pointer', fontSize: 13 }}
//               >
//                 Submit Another
//               </motion.button>
//             </motion.div>
//           ) : (
//             <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
//               <div style={{ marginBottom: 12 }}>
//                 <select
//                   value={form.subject}
//                   onChange={e => setForm(prev => ({ ...prev, subject: e.target.value }))}
//                   className="input-field"
//                   style={{ appearance: 'none' }}
//                 >
//                   <option value="">Select a topic...</option>
//                   <option value="mining">Mining Issue</option>
//                   <option value="withdraw">Withdrawal Problem</option>
//                   <option value="referral">Referral Issue</option>
//                   <option value="account">Account Problem</option>
//                   <option value="bug">Bug Report</option>
//                   <option value="other">Other</option>
//                 </select>
//               </div>
//               <div style={{ marginBottom: 16 }}>
//                 <textarea
//                   value={form.message}
//                   onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
//                   placeholder="Describe your issue in detail..."
//                   className="input-field"
//                   rows={5}
//                   style={{ resize: 'none', lineHeight: 1.5 }}
//                 />
//               </div>
//               <motion.button
//                 whileTap={{ scale: 0.97 }}
//                 onClick={handleSubmit}
//                 className="btn-primary"
//                 style={{
//                   width: '100%',
//                   opacity: !form.subject || !form.message ? 0.5 : 1,
//                   display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
//                 }}
//               >
//                 <Send size={16} />
//                 {sending ? 'Submitting...' : 'Submit Ticket'}
//               </motion.button>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>

//       {/* Response Time */}
//       <div style={{ padding: '0 20px 32px' }}>
//         <div style={{
//           background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)',
//           borderRadius: 14, padding: '14px', display: 'flex', gap: 12,
//         }}>
//           <span style={{ fontSize: 20 }}>⏰</span>
//           <div>
//             <div style={{ fontSize: 13, fontWeight: 700 }}>Average Response Time</div>
//             <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>
//               We typically respond within 2-24 hours during business days.
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

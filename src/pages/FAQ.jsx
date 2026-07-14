import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
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

const FAQ_ITEMS = [
  { q: 'How does mining work?', a: 'Tap "Start Mining" and our servers begin accumulating MINE coins for you over an 8-hour session. Once done, you can claim your reward and start again.' },
  { q: 'How much can I earn per session?', a: 'Earnings depend on your level. Higher levels earn more per hour. A Level 7 user earns 175 MINE per 8-hour session. Boost your level by completing tasks!' },
  { q: 'How do referrals work?', a: 'Share your unique referral link. When someone joins, you earn 50 MINE instantly. Plus you earn 10% of their future mining rewards, forever!' },
  { q: 'When can I withdraw?', a: 'You can withdraw once you have at least 500 MINE. Withdrawals are processed within 24 hours and sent to your connected BNB/ETH wallet.' },
  { q: 'Is there an anti-cheat system?', a: 'Yes. Our server validates all mining sessions, tap times, and rewards. Suspicious activity may result in account suspension.' },
  { q: 'What is the Lucky Spin?', a: 'Every day you get 3 free spins. You can win up to 1000 MINE per spin. Complete tasks to earn bonus spins.' },
  { q: 'How do I level up?', a: 'Mine coins, complete tasks, and maintain daily streaks. Higher levels unlock faster mining speeds and bigger rewards.' },
  { q: 'Can I use multiple accounts?', a: 'No. Multiple accounts are strictly prohibited and will result in a permanent ban. One Telegram account = one MINE account.' },
  { q: 'What coins can I withdraw to?', a: 'Currently we support BNB Smart Chain (BEP-20), Polygon (MATIC), and Ethereum (ERC-20). More networks coming soon!' },
  { q: 'Is MINE a real cryptocurrency?', a: 'MINE is a utility token within our platform. It can be withdrawn to supported blockchains. Its value is determined by the market.' },
];

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div style={{ padding: "1px", borderRadius: 18, background: GRADIENT_BORDER, marginBottom: 12 }}>
      <div style={{ background: CARD_BG, borderRadius: 16, overflow: 'hidden' }}>
        <motion.button
          onClick={onToggle}
          whileTap={{ scale: 0.99 }}
          style={{
            width: '100%', background: 'none', border: 'none', cursor: 'pointer',
            padding: '18px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: 12, textAlign: 'left',
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 600, color: isOpen ? '#e8b84b' : '#f3e6c9', flex: 1 }}>
            {item.q}
          </span>
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={20} color={isOpen ? '#e8b84b' : '#e8b84b'} />
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div style={{ padding: '0 20px 20px', fontSize: 13.5, color: '#c9b38a', lineHeight: 1.6 }}>
                {item.a}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);

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
          <div style={{ ...GRADIENT_TEXT, fontSize: 24, fontWeight: 700 }}>❓ FAQ</div>
          <div style={{ fontSize: 13, color: '#e8b84b', marginTop: 6 }}>
            Frequently asked questions
          </div>
        </div>

        {/* FAQ List */}
        <div style={{ padding: '24px 24px 40px' }}>
          {FAQ_ITEMS.map((item, i) => (
            <FAQItem
              key={i}
              item={item}
              isOpen={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? null : i)}
            />
          ))}
        </div>

        {/* Bottom Spacer */}
        <div style={{ height: 100 }} />

      </div>
    </div>
  );
}










// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ChevronDown } from 'lucide-react';

// const FAQ_ITEMS = [
//   { q: 'How does mining work?', a: 'Tap "Start Mining" and our servers begin accumulating MINE coins for you over an 8-hour session. Once done, you can claim your reward and start again.' },
//   { q: 'How much can I earn per session?', a: 'Earnings depend on your level. Higher levels earn more per hour. A Level 7 user earns 175 MINE per 8-hour session. Boost your level by completing tasks!' },
//   { q: 'How do referrals work?', a: 'Share your unique referral link. When someone joins, you earn 50 MINE instantly. Plus you earn 10% of their future mining rewards, forever!' },
//   { q: 'When can I withdraw?', a: 'You can withdraw once you have at least 500 MINE. Withdrawals are processed within 24 hours and sent to your connected BNB/ETH wallet.' },
//   { q: 'Is there an anti-cheat system?', a: 'Yes. Our server validates all mining sessions, tap times, and rewards. Suspicious activity may result in account suspension.' },
//   { q: 'What is the Lucky Spin?', a: 'Every day you get 3 free spins. You can win up to 1000 MINE per spin. Complete tasks to earn bonus spins.' },
//   { q: 'How do I level up?', a: 'Mine coins, complete tasks, and maintain daily streaks. Higher levels unlock faster mining speeds and bigger rewards.' },
//   { q: 'Can I use multiple accounts?', a: 'No. Multiple accounts are strictly prohibited and will result in a permanent ban. One Telegram account = one MINE account.' },
//   { q: 'What coins can I withdraw to?', a: 'Currently we support BNB Smart Chain (BEP-20), Polygon (MATIC), and Ethereum (ERC-20). More networks coming soon!' },
//   { q: 'Is MINE a real cryptocurrency?', a: 'MINE is a utility token within our platform. It can be withdrawn to supported blockchains. Its value is determined by the market.' },
// ];

// function FAQItem({ item, isOpen, onToggle }) {
//   return (
//     <div style={{
//       background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.06)',
//       borderRadius: 14, overflow: 'hidden', marginBottom: 8,
//     }}>
//       <motion.button
//         onClick={onToggle}
//         whileTap={{ scale: 0.99 }}
//         style={{
//           width: '100%', background: 'none', border: 'none', cursor: 'pointer',
//           padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
//           gap: 12, textAlign: 'left',
//         }}
//       >
//         <span style={{ fontSize: 14, fontWeight: 600, color: isOpen ? '#fbbf24' : '#fff', flex: 1 }}>
//           {item.q}
//         </span>
//         <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
//           <ChevronDown size={18} color={isOpen ? '#f59e0b' : '#6b7280'} />
//         </motion.div>
//       </motion.button>

//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: 'auto', opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             transition={{ duration: 0.2 }}
//           >
//             <div style={{ padding: '0 16px 16px', fontSize: 13, color: '#9ca3af', lineHeight: 1.6 }}>
//               {item.a}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// export default function FAQ() {
//   const [openIdx, setOpenIdx] = useState(null);

//   return (
//     <div className="page-content">
//       <div style={{ padding: '20px 20px 0', textAlign: 'center' }}>
//         <div style={{ fontSize: 22, fontWeight: 900 }}>❓ FAQ</div>
//         <div style={{ fontSize: 13, color: '#6b7280', marginTop: 4 }}>
//           Frequently asked questions
//         </div>
//       </div>

//       <div style={{ padding: '16px 20px 32px' }}>
//         {FAQ_ITEMS.map((item, i) => (
//           <FAQItem
//             key={i}
//             item={item}
//             isOpen={openIdx === i}
//             onToggle={() => setOpenIdx(openIdx === i ? null : i)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

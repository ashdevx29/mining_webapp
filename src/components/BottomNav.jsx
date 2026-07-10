import React from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Pickaxe, Users, Wallet, User } from "lucide-react";
import { useApp } from "../context/AppContext";

const NAV_ITEMS = [
  { path: "/dashboard", icon: Home, label: "Home" },
  { path: "/mine", icon: Pickaxe, label: "Mine" },
  { path: "/referral", icon: Users, label: "Friends" },
  { path: "/wallet", icon: Wallet, label: "Wallet" },
  { path: "/profile", icon: User, label: "Profile" },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { mining } = useApp();

  if (["/splash", "/loading"].includes(location.pathname)) return null;

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-[430px] px-3">

      {/* Container */}

      <div className="relative h-[74px] rounded-[24px] overflow-hidden">

        {/* Outer Glow */}

        <div className="absolute inset-0 rounded-[24px] bg-yellow-500/10 blur-xl" />

        {/* Main Box */}

        <div className="relative h-full rounded-[24px] bg-[#090909]/95 border border-[#5f4715] backdrop-blur-xl overflow-hidden shadow-[0_0_40px_rgba(255,193,7,.08)]">

          {/* Top Gold Line */}

          <div className="absolute top-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-[#FFD54A] to-transparent" />

          {/* Bottom Line */}

          <div className="absolute bottom-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-[#3c2c07] to-transparent" />

          {/* Moving Shine */}

          <motion.div
            animate={{
              x: ["-120%", "180%"]
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "linear"
            }}
            className="absolute inset-y-0 w-20 rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          />

          {/* Gold Glow */}

          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-56 h-16 bg-yellow-500/10 blur-3xl" />

          {/* Navigation */}

          {/* ================= HUD Overlay ================= */}

          {/* Left Corner Glow */}
          <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-yellow-500/10 to-transparent pointer-events-none" />

          {/* Right Corner Glow */}
          <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-yellow-500/10 to-transparent pointer-events-none" />

          {/* Top Reflection */}
          <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-yellow-300/60 to-transparent" />

          {/* Bottom Reflection */}
          <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-yellow-900/60 to-transparent" />

          {/* Moving Gold Shine */}
          <motion.div
            animate={{
              x: ["-120%", "180%"],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-0 h-full w-20 rotate-12 bg-gradient-to-r from-transparent via-yellow-300/10 to-transparent"
          />

          {/* Left HUD */}
          <div className="absolute left-3 top-1/2 -translate-y-1/2">

            <div className="w-2 h-2 rounded-full bg-yellow-400/70 shadow-[0_0_8px_#FFD54A]" />

          </div>

          {/* Right HUD */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2">

            <div className="w-2 h-2 rounded-full bg-yellow-400/70 shadow-[0_0_8px_#FFD54A]" />

          </div>

          {/* Inner Shadow */}
          <div className="absolute inset-0 rounded-[24px] shadow-[inset_0_1px_0_rgba(255,255,255,.05),inset_0_-10px_20px_rgba(0,0,0,.35)] pointer-events-none" />

          {/* Noise Overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle,#ffffff 1px,transparent 1px)",
              backgroundSize: "8px 8px",
            }}
          />

          {/* Bottom Gold Glow */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-72 h-10 bg-yellow-500/15 blur-3xl pointer-events-none" />

          <div className="relative flex justify-around items-center h-full">

            {NAV_ITEMS.map((item) => {
              const active =
                location.pathname === item.path ||
                (item.path !== "/" && location.pathname.startsWith(item.path));

              const Icon = item.icon;

              return (
                <motion.button
                  key={item.path}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => navigate(item.path)}
                  className="relative flex flex-col items-center justify-center w-[64px] h-full select-none"
                >
                  {/* Active Glow */}
                  {active && (
                    <>
                      {/* Soft Glow */}
                      <motion.div
                        layoutId="activeGlow"
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 24,
                        }}
                        className="absolute top-[7px] w-[48px] h-[48px] rounded-full bg-yellow-500/20 blur-md"
                      />

                      {/* Gold Circle */}
                      <motion.div
                        layoutId="activeCircle"
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 24,
                        }}
                        className="absolute top-[7px] w-[48px] h-[48px] rounded-full
              border border-[#FFD54A]
              bg-gradient-to-b
              from-[#3b2b08]
              via-[#191300]
              to-[#0a0a0a]
              shadow-[0_0_18px_rgba(255,193,7,.55)]"
                      />

                      {/* Inner Ring */}
                      <div className="absolute top-[10px] w-[42px] h-[42px] rounded-full border border-yellow-300/20" />

                      {/* Active Dot */}
                      <motion.div
                        layoutId="activeDot"
                        className="absolute bottom-[4px] w-1.5 h-1.5 rounded-full bg-yellow-400 shadow-[0_0_8px_#FFD54A]"
                      />
                    </>
                  )}

                  {/* Mine Indicator */}
                  {item.path === "/mine" &&
  mining?.isActive &&
  !active && (
    <motion.div
      animate={{
        scale: [1, 1.8, 1],
        opacity: [1, 0, 1],
      }}
      transition={{
        duration: 1.4,
        repeat: Infinity,
      }}
      className="absolute top-2 right-3 w-2 h-2 rounded-full bg-green-400"
    />
)}
                  {/* {item.path === "/mine" &&
                    mining.isActive &&
                    !active && (
                      <motion.div
                        animate={{
                          scale: [1, 1.8, 1],
                          opacity: [1, 0, 1],
                        }}
                        transition={{
                          duration: 1.4,
                          repeat: Infinity,
                        }}
                        className="absolute top-2 right-3 w-2 h-2 rounded-full bg-green-400"
                      />
                    )} */}

                  {/* Icon */}
                  <motion.div
                    animate={{
                      y: active ? -2 : 0,
                      scale: active ? 1.08 : 1,
                    }}
                    transition={{ duration: 0.25 }}
                    className="relative z-20"
                  >
                    <Icon
                      size={20}
                      strokeWidth={active ? 2.5 : 2}
                      className={
                        active
                          ? "text-[#FFD54A] drop-shadow-[0_0_10px_rgba(255,212,74,.9)]"
                          : "text-[#ffffff] b-5"
                      }
                    />
                  </motion.div>

                  {/* Label */}
                  <span
                    className={`mt-[6px] text-[10px]  leading-none ${active
                        ? "text-[#ffffff] font-medium"
                        : "text-[#ffffff]"
                      }`}
                  >
                    {item.label}
                  </span>
                </motion.button>
              );
            })}

          </div>

        </div>

      </div>

    </div>
  );
}




// import React from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { Home, Pickaxe, Users, Wallet, User } from "lucide-react";
// import { motion } from "framer-motion";
// import { useApp } from "../context/AppContext";

// const NAV_ITEMS = [
//   { path: "/", icon: Home, label: "Home" },
//   { path: "/mine", icon: Pickaxe, label: "Mine" },
//   { path: "/referral", icon: Users, label: "Friends" },
//   { path: "/wallet", icon: Wallet, label: "Wallet" },
//   { path: "/profile", icon: User, label: "Profile" },
// ];

// export default function BottomNav() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { mining } = useApp();

//   if (["/splash", "/loading"].includes(location.pathname)) return null;

//   return (
//     <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-[430px] px-3">

//       <div className="relative h-[72px] rounded-[28px] border border-yellow-500/20 bg-[#090909]/95 backdrop-blur-xl shadow-[0_0_30px_rgba(255,193,7,.08)] overflow-hidden">

//         {/* Gold Top Line */}

//         <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />

//         {/* Glow */}

//         <div className="absolute left-1/2 top-0 -translate-x-1/2 w-60 h-20 bg-yellow-500/10 blur-3xl" />

//         <div className="flex h-full justify-around items-center">

//           {NAV_ITEMS.map((item) => {

//             const active =
//               location.pathname === item.path ||
//               (item.path !== "/" &&
//                 location.pathname.startsWith(item.path));

//             const Icon = item.icon;

//             return (
//               <motion.button
//                 key={item.path}
//                 whileTap={{ scale: .90 }}
//                 onClick={() => navigate(item.path)}
//                 className="relative flex flex-col items-center justify-center w-16 h-full"
//               >

//                 {active && (

//                   <motion.div
//                     layoutId="active"
//                     transition={{
//                       type: "spring",
//                       stiffness: 260,
//                       damping: 22
//                     }}
//                     className="absolute top-2 w-11 h-11 rounded-full border border-yellow-400/40 bg-yellow-500/10 shadow-[0_0_20px_rgba(255,193,7,.35)]"
//                   />

//                 )}

//                 {/* Mine Pulse */}

//                 {item.path === "/mine" &&
//                   mining.isActive &&
//                   !active && (

//                     <motion.div
//                       animate={{
//                         scale: [1, 1.8, 1],
//                         opacity: [1, 0, 1]
//                       }}
//                       transition={{
//                         duration: 1.3,
//                         repeat: Infinity
//                       }}
//                       className="absolute top-2 right-3 w-2 h-2 rounded-full bg-green-400"
//                     />

//                   )}

//                 <motion.div
//                   animate={{
//                     y: active ? -2 : 0,
//                     scale: active ? 1.08 : 1
//                   }}
//                   className="relative z-10"
//                 >

//                   <Icon
//                     size={20}
//                     strokeWidth={active ? 2.5 : 2}
//                     className={
//                       active
//                         ? "text-yellow-400 drop-shadow-[0_0_10px_rgba(255,193,7,.8)]"
//                         : "text-zinc-500"
//                     }
//                   />

//                 </motion.div>

//                 <span
//                   className={`mt-2 text-[10px] ${
//                     active
//                       ? "text-yellow-300"
//                       : "text-zinc-500"
//                   }`}
//                 >
//                   {item.label}
//                 </span>

//               </motion.button>
//             );

//           })}

//         </div>

//       </div>

//     </div>
//   );
// }


// import React from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { Home, Pickaxe, Users, Wallet, User } from 'lucide-react';
// import { motion } from 'framer-motion';
// import { useApp } from '../context/AppContext';

// const NAV_ITEMS = [
//   { path: '/', icon: Home, label: 'Home' },
//   { path: '/mine', icon: Pickaxe, label: 'Mine' },
//   { path: '/referral', icon: Users, label: 'Friends' },
//   { path: '/wallet', icon: Wallet, label: 'Wallet' },
//   { path: '/profile', icon: User, label: 'Profile' },
// ];

// export default function BottomNav() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { mining } = useApp();

//   // Don't show nav on some pages
//   const noNav = ['/splash', '/loading'].includes(location.pathname);
//   if (noNav) return null;

//   return (
//     <nav className="bottom-nav">
//       {NAV_ITEMS.map((item) => {
//         const active = location.pathname === item.path ||
//           (item.path !== '/' && location.pathname.startsWith(item.path));
//         const Icon = item.icon;

//         return (
//           <motion.div
//             key={item.path}
//             className={`nav-item ${active ? 'active' : ''}`}
//             onClick={() => navigate(item.path)}
//             whileTap={{ scale: 0.88 }}
//           >
//             <div style={{ position: 'relative' }}>
//               <Icon
//                 size={22}
//                 className="nav-icon"
//                 strokeWidth={active ? 2.5 : 1.8}
//               />
//               {/* Active indicator dot */}
//               {active && (
//                 <motion.div
//                   layoutId="nav-dot"
//                   style={{
//                     position: 'absolute', bottom: -6, left: '50%',
//                     transform: 'translateX(-50%)',
//                     width: 4, height: 4, borderRadius: '50%',
//                     background: '#f59e0b',
//                   }}
//                 />
//               )}
//               {/* Mining pulse on Mine tab */}
//               {item.path === '/mine' && mining.isActive && !active && (
//                 <motion.div
//                   animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
//                   transition={{ duration: 1.5, repeat: Infinity }}
//                   style={{
//                     position: 'absolute', top: -2, right: -2,
//                     width: 8, height: 8, borderRadius: '50%',
//                     background: '#10b981',
//                   }}
//                 />
//               )}
//             </div>
//             <span className="nav-label">{item.label}</span>
//           </motion.div>
//         );
//       })}
//     </nav>
//   );
// }

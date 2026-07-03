

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
// import { useEffect } from "react";
import coin from "../assets/coin.png";

export default function SplashScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
  let value = 0;

  const interval = setInterval(() => {
    value += 1;
    setProgress(value);

    if (value >= 100) {
      clearInterval(interval);

      setTimeout(() => {
        onDone?.();
      }, 300);
    }
  }, 30); // 100 x 30ms = 3000ms

  return () => clearInterval(interval);
}, [onDone]);
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     onDone?.();
  //   }, 3500);

  //   return () => clearTimeout(timer);
  // }, [onDone]);

  return (
    <div className="fixed inset-0 bg-[#030303] flex justify-center items-center overflow-hidden">

      {/* Mobile Screen */}
      <div className="relative w-full max-w-[430px] h-screen bg-black overflow-hidden">

        {/* ================= BACKGROUND ================= */}

        <div className="absolute inset-0">

          {/* Main Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#090909] to-black" />

          {/* Gold Glow */}
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[320px] h-[320px] rounded-full bg-yellow-500/10 blur-[120px]" />

          {/* SVG Hexagon */}
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.08]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="hex"
                width="48"
                height="42"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M12 2 L36 2 L48 21 L36 40 L12 40 L0 21 Z"
                  fill="none"
                  stroke="#FFD54A"
                  strokeWidth="1"
                />
              </pattern>
            </defs>

            <rect width="100%" height="100%" fill="url(#hex)" />
          </svg>

          {/* Golden Beams */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2">

            {[...Array(18)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  opacity: [.1, .7, .1],
                  scaleY: [.8, 1.2, .8]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * .08
                }}
                className="absolute rounded-full"
                style={{
                  left: `${(i - 9) * 10}px`,
                  width: i % 2 ? 2 : 1,
                  height: 340,
                  background:
                    "linear-gradient(to bottom,#FFD54A,transparent)"
                }}
              />
            ))}

          </div>

          {/* Floating Particles */}
          {[...Array(35)].map((_, i) => (

            <motion.div
              key={i}
              initial={{
                opacity: 0,
                y: 50
              }}
              animate={{
                opacity: [0, 1, 0],
                y: -700
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 4
              }}
              className="absolute rounded-full bg-yellow-400"
              style={{
                width: Math.random() * 4 + 2,
                height: Math.random() * 4 + 2,
                left: `${Math.random() * 100}%`,
                bottom: -20
              }}
            />

          ))}

        </div>

        {/* ================= ORBIT ================= */}

        <div className="absolute top-[120px] left-1/2 -translate-x-1/2">

          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 16,
              ease: "linear"
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full border border-yellow-500/30"
          />

          <motion.div
            animate={{ rotate: -360 }}
            transition={{
              repeat: Infinity,
              duration: 24,
              ease: "linear"
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-[330px] h-[330px] rounded-full border border-dashed border-yellow-500/20"
          />

          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 30,
              ease: "linear"
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full border border-yellow-400/10"
          />

        </div>

        {/* ===== Coin, Text & Loader (Part-2) ===== */}

        {/* ================= Coin ================= */}

<div className="absolute top-[140px] left-1/2 -translate-x-1/2 z-20">

  {/* Bottom Energy Ring */}
  <motion.div
    animate={{
      scale: [0.95, 1.08, 0.95],
      opacity: [0.4, 1, 0.4],
    }}
    transition={{
      duration: 2.5,
      repeat: Infinity,
    }}
    className="absolute left-1/2 top-[190px] -translate-x-1/2 w-[220px] h-[40px] rounded-full border border-yellow-400/40 blur-[1px]"
  />

  {/* Coin Glow */}
  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] rounded-full bg-yellow-500/20 blur-[80px]" />

  {/* Coin */}
  <motion.img
    src={coin}
    alt="coin"
    animate={{
      y: [0, -8, 0],
      rotate: [-2, 2, -2],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="relative w-[230px] h-[230px] object-contain drop-shadow-[0_0_35px_rgba(255,193,7,.8)]"
  />
</div>

{/* ================= TEXT ================= */}

<div className="absolute top-[390px] left-0 right-0 flex flex-col items-center z-20">

  <motion.h1
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4 }}
    className="
      text-[64px]
      leading-none
      font-black
      tracking-tight
      uppercase
      bg-gradient-to-b
      from-[#FFF7C5]
      via-[#FFD84D]
      to-[#B77700]
      bg-clip-text
      text-transparent
      drop-shadow-[0_0_18px_rgba(255,200,0,.35)]
    "
    style={{
      fontFamily: "'Orbitron', sans-serif",
      WebkitTextStroke: "1px rgba(255,215,0,.18)",
    }}
  >
    MINE BOT
  </motion.h1>

  {/* Subtitle */}

  <div className="flex items-center gap-3 mt-4">

    <div className="w-16 h-[2px] bg-gradient-to-r from-transparent to-yellow-400" />

    <span
      className="uppercase text-white/90 tracking-[8px] text-[15px]"
      style={{ fontFamily: "'Orbitron', sans-serif" }}
    >
      TAP
    </span>

    <span className="text-yellow-400 text-xl">•</span>

    <span
      className="uppercase text-white/90 tracking-[8px] text-[15px]"
      style={{ fontFamily: "'Orbitron', sans-serif" }}
    >
      MINE
    </span>

    <span className="text-yellow-400 text-xl">•</span>

    <span
      className="uppercase text-white/90 tracking-[8px] text-[15px]"
      style={{ fontFamily: "'Orbitron', sans-serif" }}
    >
      EARN
    </span>

    <div className="w-16 h-[2px] bg-gradient-to-l from-transparent to-yellow-400" />

  </div>

</div>

{/* ================= Loader ================= */}

{/* <div className="absolute bottom-[100px] left-0 right-0 px-10 z-20">

  <div
    className="text-center text-yellow-400 tracking-[10px] text-sm mb-6"
    style={{ fontFamily: "'Orbitron', sans-serif" }}
  >
    LOADING
  </div>

  <div className="relative h-5 rounded-full border border-yellow-500 overflow-hidden bg-[#111]">

    
    <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,#000_0px,#000_10px,#3b2b00_10px,#3b2b00_20px)]" />

  
   

    <motion.div
  animate={{
    width: `${progress}%`,
  }}
  transition={{
    ease: "linear",
    duration: 0.03,
  }}
  className="relative h-full rounded-full bg-gradient-to-r from-[#6e4200] via-[#ffbf00] to-[#fff1a8]"
>

      
      <motion.div
        animate={{
          x: [-80, 350],
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
        }}
        className="absolute top-0 h-full w-16 bg-white/70 blur-md"
      />

    </motion.div>

  </div>

  
  <div
  className="mt-5 text-center text-yellow-300 text-3xl font-bold tracking-[4px]"
  style={{ fontFamily: "'Orbitron', sans-serif" }}
>
  {progress}%
</div>

</div> */}


{/* ===================== Bottom Tech Frame ===================== */}

<div className="absolute bottom-0 left-0 w-full h-48 pointer-events-none z-10">

  {/* Glow */}
  <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-yellow-500/10 via-yellow-500/5 to-transparent" />

  {/* Top Border */}
  <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />

  {/* Left Corner */}
  <svg
    className="absolute bottom-0 left-0"
    width="120"
    height="120"
    viewBox="0 0 120 120"
    fill="none"
  >
    <path
      d="M0 120 L0 45 L45 0"
      stroke="#FFD54A"
      strokeWidth="2"
      opacity=".7"
    />
    <path
      d="M20 120 L20 60 L60 20"
      stroke="#FFD54A"
      strokeWidth="1"
      opacity=".4"
    />
  </svg>

  {/* Right Corner */}
  <svg
    className="absolute bottom-0 right-0"
    width="120"
    height="120"
    viewBox="0 0 120 120"
    fill="none"
  >
    <path
      d="M120 120 L120 45 L75 0"
      stroke="#FFD54A"
      strokeWidth="2"
      opacity=".7"
    />
    <path
      d="M100 120 L100 60 L60 20"
      stroke="#FFD54A"
      strokeWidth="1"
      opacity=".4"
    />
  </svg>

  {/* Center HUD */}
  <div className="absolute left-1/2 bottom-6 -translate-x-1/2 flex items-center gap-3">

    <div className="w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_10px_#FFD54A]" />

    <div className="w-14 h-px bg-yellow-500/50" />

    <motion.div
      animate={{
        rotate: 360
      }}
      transition={{
        repeat: Infinity,
        duration: 8,
        ease: "linear"
      }}
      className="relative w-10 h-10 rounded-full border border-yellow-400/60"
    >
      <div className="absolute inset-2 rounded-full border border-yellow-400/30" />

      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-full bg-yellow-500/20" />

      <div className="absolute top-1/2 left-0 -translate-y-1/2 h-px w-full bg-yellow-500/20" />
    </motion.div>

    <div className="w-14 h-px bg-yellow-500/50" />

    <div className="w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_10px_#FFD54A]" />

  </div>

</div>

{/* ===================== Animated Shine ===================== */}

<motion.div
  animate={{
    x: ["-120%", "140%"]
  }}
  transition={{
    repeat: Infinity,
    duration: 2.8,
    ease: "linear"
  }}
  className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-yellow-300/10 to-transparent rotate-12 blur-xl"
/>

{/* ===================== HUD Circles ===================== */}

<motion.div
  animate={{
    rotate: 360
  }}
  transition={{
    repeat: Infinity,
    duration: 40,
    ease: "linear"
  }}
  className="absolute top-10 left-5 w-24 h-24 rounded-full border border-yellow-500/10"
/>

<motion.div
  animate={{
    rotate: -360
  }}
  transition={{
    repeat: Infinity,
    duration: 45,
    ease: "linear"
  }}
  className="absolute top-28 right-5 w-20 h-20 rounded-full border border-yellow-500/10"
/>

<motion.div
  animate={{
    opacity: [.2, .8, .2]
  }}
  transition={{
    repeat: Infinity,
    duration: 2
  }}
  className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,193,7,.06),transparent_60%)]"
/>

      </div>

    </div>
  );
}



// import React from 'react';
// import { motion } from 'framer-motion';

// export default function SplashScreen({ onDone }) {
//   React.useEffect(() => {
//     const t = setTimeout(onDone, 2800);
//     return () => clearTimeout(t);
//   }, [onDone]);

//   return (
//     <div style={{
//       position: 'fixed', inset: 0, background: '#0a0a0f',
//       display: 'flex', flexDirection: 'column',
//       alignItems: 'center', justifyContent: 'center', zIndex: 9999,
//     }}>
//       {/* Radial glow background */}
//       <div style={{
//         position: 'absolute', width: 300, height: 300, borderRadius: '50%',
//         background: 'radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 70%)',
//         animation: 'pulse-glow 2s ease-in-out infinite',
//       }} />

//       {/* Orbiting ring */}
//       <motion.div
//         animate={{ rotate: 360 }}
//         transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
//         style={{
//           position: 'absolute', width: 200, height: 200, borderRadius: '50%',
//           border: '2px dashed rgba(245,158,11,0.25)',
//         }}
//       />
//       <motion.div
//         animate={{ rotate: -360 }}
//         transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
//         style={{
//           position: 'absolute', width: 250, height: 250, borderRadius: '50%',
//           border: '1px dashed rgba(59,130,246,0.2)',
//         }}
//       />

//       {/* Logo coin */}
//       <motion.div
//         initial={{ scale: 0, rotate: -180 }}
//         animate={{ scale: 1, rotate: 0 }}
//         transition={{ type: 'spring', stiffness: 200, damping: 15 }}
//         style={{
//           width: 110, height: 110, borderRadius: '50%',
//           background: 'radial-gradient(circle at 35% 35%, #fbbf24, #f59e0b, #d97706)',
//           display: 'flex', alignItems: 'center', justifyContent: 'center',
//           fontSize: 52, boxShadow: '0 0 60px rgba(245,158,11,0.5)',
//           border: '3px solid rgba(245,158,11,0.6)',
//         }}
//       >
//         ⛏️
//       </motion.div>

//       {/* App name */}
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.5, duration: 0.6 }}
//         style={{ marginTop: 28, textAlign: 'center' }}
//       >
//         <div style={{
//           fontSize: 32, fontWeight: 900, letterSpacing: '-0.5px',
//           background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
//           WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
//         }}>
//           MINE BOT
//         </div>
//         <div style={{ color: '#6b7280', fontSize: 13, marginTop: 6, letterSpacing: 2, textTransform: 'uppercase' }}>
//           Tap • Mine • Earn
//         </div>
//       </motion.div>

//       {/* Loading dots */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 1 }}
//         style={{ display: 'flex', gap: 8, marginTop: 48 }}
//       >
//         {[0, 1, 2].map(i => (
//           <motion.div
//             key={i}
//             animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
//             transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
//             style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b' }}
//           />
//         ))}
//       </motion.div>
//     </div>
//   );
// }


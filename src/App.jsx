import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AppProvider } from './context/AppContext';


// Screens
import SplashScreen from './pages/SplashScreen';
import LoadingScreen from './pages/LoadingScreen';
import Login from './pages/UserAuth/Login';
import SignUp from './pages/UserAuth/SignUp';
// import ResetPassword from './pages/UserAuth/ResetPassword';
import Home from './pages/Home';
import Mining from './pages/Mining';
import DailyCheckin from './pages/DailyCheckin';
import LuckySpin from './pages/LuckySpin';
import Tasks from './pages/Tasks';
import Referral from './pages/Referral';
import ReferralIncome from './pages/ReferralIncome';
import Wallet from './pages/Wallet';
import Withdraw from './pages/Withdraw';
import Transactions from './pages/Transactions';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import FAQ from './pages/FAQ';
import Support from './pages/Support';
import Leaderboard from './pages/Leaderboard';
import Achievements from './pages/Achievements';

// Components
import BottomNav from './components/BottomNav';
import ClaimModal from './components/ClaimModal';

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  enter: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        transition={{ duration: 0.18 }}
        style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
      >
        <Routes location={location}>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {/* <Route path="/reset" element={<ResetPassword />} /> */}
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/dashboard" element={<Home />} />
          <Route path="/mine" element={<Mining />} />
          <Route path="/checkin" element={<DailyCheckin />} />
          <Route path="/spin" element={<LuckySpin />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/referral" element={<Referral />} />
          <Route path="/referral-income" element={<ReferralIncome />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/support" element={<Support />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/achievements" element={<Achievements />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function AppShell() {
  const [phase, setPhase] = useState('splash'); // 'splash' | 'loading' | 'app'

  if (phase === 'splash') {
    return <SplashScreen onDone={() => setPhase('loading')} />;
  }
  if (phase === 'loading') {
    return <LoadingScreen onDone={() => setPhase('app')} />;
  }

  return (
    <div className="app-shell">
      <AnimatedRoutes />
      <BottomNav />
      <ClaimModal />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppShell />
      </AppProvider>
    </BrowserRouter>
  );
}

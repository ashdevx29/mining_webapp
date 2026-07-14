// Format large numbers: 48250 -> 48.2K
export const formatNumber = (num) => {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M';
  if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K';
  return num.toLocaleString();
};

// Format time from milliseconds
export const formatTime = (ms) => {
  if (ms <= 0) return '00:00:00';
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

// ✅ Improved Countdown Function
export const formatCountdown = (startTime, duration) => {
  if (!startTime || !duration) return "08:00:00";

  // Safe parsing of startTime (handles string, Date, or timestamp)
  const start = new Date(startTime).getTime();
  if (isNaN(start)) return "08:00:00";

  const elapsed = Date.now() - start;
  const remaining = Math.max(duration - elapsed, 0);

  return formatTime(remaining);
};

// Get level info
export const getLevelInfo = (level) => {
  const levels = [
    { name: 'Rookie', min: 0, max: 10000, color: '#9ca3af' },
    { name: 'Bronze', min: 10000, max: 25000, color: '#cd7c35' },
    { name: 'Silver', min: 25000, max: 50000, color: '#9ca3af' },
    { name: 'Gold', min: 50000, max: 100000, color: '#f59e0b' },
    { name: 'Platinum', min: 100000, max: 200000, color: '#60a5fa' },
    { name: 'Diamond', min: 200000, max: 500000, color: '#a78bfa' },
    { name: 'Legend', min: 500000, max: Infinity, color: '#f43f5e' },
  ];
  return levels[Math.min(level - 1, levels.length - 1)] || levels[0];
};

// Truncate wallet address
export const truncateAddress = (addr) => {
  if (!addr) return '';
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
};



// Copy to clipboard
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};

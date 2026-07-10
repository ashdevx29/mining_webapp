import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalUsers: 0, activeMiningSessions: 0, totalMined: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await API.get('/admin/stats');
      setStats(res.data.stats);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{ color: 'white', padding: 20 }}>Loading stats...</div>;

  return (
    <div style={{ padding: '20px', color: '#f3e6c9', minHeight: '100vh', background: '#0a090a' }}>
      <h2>Admin Dashboard</h2>
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
        <Card title="Total Users" value={stats.totalUsers} />
        <Card title="Active Mining Sessions" value={stats.activeMiningSessions} />
        <Card title="Total USDT Mined" value={stats.totalMined} />
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: '#1a191a',
        padding: '20px',
        borderRadius: '12px',
        flex: '1 1 200px',
        border: '1px solid #333'
      }}
    >
      <div style={{ fontSize: 14, color: '#8a7550', marginBottom: 8 }}>{title}</div>
      <div style={{ fontSize: 24, fontWeight: 'bold', color: '#FFC83D' }}>{value}</div>
    </motion.div>
  );
}

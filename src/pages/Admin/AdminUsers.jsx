import React, { useState, useEffect } from 'react';
import API from '../../services/api';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get('/admin/users');
      setUsers(res.data.users);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{ color: 'white', padding: 20 }}>Loading users...</div>;

  return (
    <div style={{ padding: '20px', color: '#f3e6c9', minHeight: '100vh', background: '#0a090a' }}>
      <h2>Users List</h2>
      <div style={{ overflowX: 'auto', marginTop: 20 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #333' }}>
              <th style={{ padding: 10 }}>Name</th>
              <th style={{ padding: 10 }}>Email</th>
              <th style={{ padding: 10 }}>Referral Code</th>
              <th style={{ padding: 10 }}>Balance (USDT)</th>
              <th style={{ padding: 10 }}>Role</th>
              <th style={{ padding: 10 }}>Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} style={{ borderBottom: '1px solid #222' }}>
                <td style={{ padding: 10 }}>{user.fullName}</td>
                <td style={{ padding: 10 }}>{user.email}</td>
                <td style={{ padding: 10 }}>{user.referralCode}</td>
                <td style={{ padding: 10, color: '#FFC83D' }}>{user.balance}</td>
                <td style={{ padding: 10 }}>{user.role}</td>
                <td style={{ padding: 10 }}>{new Date(user.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

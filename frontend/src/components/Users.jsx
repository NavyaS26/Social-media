import { useEffect, useState } from 'react';
import { getAllUsers, createUser } from '../api';

export default function Users({ currentUser, setCurrentUser }) {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ username: '', email: '', bio: '' });
  const [msg, setMsg] = useState('');

  useEffect(() => { getAllUsers().then(r => setUsers(r.data)); }, []);

  const submit = async () => {
    try {
      await createUser(form);
      setMsg('✅ User created!');
      setForm({ username: '', email: '', bio: '' });
      const r = await getAllUsers();
      setUsers(r.data);
    } catch (e) {
      setMsg('❌ ' + (e.response?.data?.detail || 'Error'));
    }
  };

  return (
    <div>
      <h2>Users</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div>
          <div className="card">
            <h3>Create User</h3>
            <div className="form">
              <input placeholder="Username" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} />
              <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              <input placeholder="Bio" value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} />
              <button className="btn btn-primary" onClick={submit}>Create</button>
              {msg && <p className={msg.startsWith('✅') ? 'success' : 'error'}>{msg}</p>}
            </div>
          </div>
        </div>

        <div>
          <div className="card">
            <h3>All Users {currentUser && <span className="muted"> — acting as @{currentUser.username}</span>}</h3>
            {users.map(u => (
              <div className="user-pill" key={u.user_id} style={{ cursor: 'pointer', border: currentUser?.user_id === u.user_id ? '1px solid #a855f7' : '1px solid transparent' }}
                onClick={() => setCurrentUser(u)}>
                <div className="avatar">{u.username[0].toUpperCase()}</div>
                <div>
                  <div style={{ fontWeight: 600 }}>@{u.username}</div>
                  <div className="muted">{u.bio}</div>
                </div>
                {currentUser?.user_id === u.user_id && <span className="score-badge" style={{ marginLeft: 'auto' }}>Active</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
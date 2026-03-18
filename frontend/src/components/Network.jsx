import { useState } from 'react';
import { followUser, unfollowUser, getNetworkStats, getAllUsers } from '../api';
import { useEffect } from 'react';

export default function Network({ currentUser }) {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [msg, setMsg] = useState('');

  useEffect(() => { getAllUsers().then(r => setUsers(r.data)); }, []);

  useEffect(() => {
    if (currentUser) {
      getNetworkStats(currentUser.user_id).then(r => setStats(r.data));
    }
  }, [currentUser]);

  const follow = async (followeeId) => {
    if (!currentUser) return setMsg('❌ Select a user first!');
    await followUser({ follower_id: currentUser.user_id, followee_id: followeeId });
    const r = await getNetworkStats(currentUser.user_id);
    setStats(r.data);
    setMsg('✅ Followed!');
  };

  const unfollow = async (followeeId) => {
    await unfollowUser({ follower_id: currentUser.user_id, followee_id: followeeId });
    const r = await getNetworkStats(currentUser.user_id);
    setStats(r.data);
    setMsg('✅ Unfollowed!');
  };

  const isFollowing = (uid) => stats?.following?.some(u => u.user_id === uid);

  return (
    <div>
      <h2>🌐 Network</h2>
      {!currentUser && <p className="error">⚠️ Select a user from the Users page first!</p>}
      {msg && <p className="success" style={{ marginBottom: 16 }}>{msg}</p>}

      {stats && (
        <div className="stats-row">
          <div className="stat-card"><div className="number">{stats.followers_count}</div><div className="label">Followers</div></div>
          <div className="stat-card"><div className="number">{stats.following_count}</div><div className="label">Following</div></div>
          <div className="stat-card"><div className="number">{stats.suggestions?.length}</div><div className="label">Suggestions</div></div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="card">
          <h3>All Users</h3>
          {users.filter(u => u.user_id !== currentUser?.user_id).map(u => (
            <div className="user-pill" key={u.user_id}>
              <div className="avatar">{u.username[0].toUpperCase()}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>@{u.username}</div>
              </div>
              {isFollowing(u.user_id)
                ? <button className="btn btn-secondary btn-sm" onClick={() => unfollow(u.user_id)}>Unfollow</button>
                : <button className="btn btn-primary btn-sm" onClick={() => follow(u.user_id)}>Follow</button>
              }
            </div>
          ))}
        </div>

        <div>
          <div className="card" style={{ marginBottom: 16 }}>
            <h3>💡 Suggested for you</h3>
            {stats?.suggestions?.length === 0 && <p className="muted">No suggestions yet. Follow more people!</p>}
            {stats?.suggestions?.map(u => (
              <div className="user-pill" key={u.user_id}>
                <div className="avatar">{u.username[0].toUpperCase()}</div>
                <div style={{ flex: 1 }}><div style={{ fontWeight: 600 }}>@{u.username}</div></div>
                <button className="btn btn-primary btn-sm" onClick={() => follow(u.user_id)}>Follow</button>
              </div>
            ))}
          </div>

          <div className="card">
            <h3>Your Followers</h3>
            {stats?.followers?.length === 0 && <p className="muted">No followers yet!</p>}
            {stats?.followers?.map(u => (
              <div className="user-pill" key={u.user_id}>
                <div className="avatar">{u.username[0].toUpperCase()}</div>
                <div style={{ fontWeight: 600 }}>@{u.username}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
import { useState } from 'react';
import { getUserSummary, getHashtagAnalytics } from '../api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function Analytics({ currentUser }) {
  const [summary, setSummary] = useState([]);
  const [hashtag, setHashtag] = useState('');
  const [hashtagData, setHashtagData] = useState(null);

  const loadSummary = async () => {
    if (!currentUser) return alert('Select a user first!');
    const r = await getUserSummary(currentUser.user_id);
    setSummary(r.data);
  };

  const loadHashtag = async () => {
    if (!hashtag) return;
    const r = await getHashtagAnalytics(hashtag);
    setHashtagData(r.data);
  };

  return (
    <div>
      <h2>📊 Analytics</h2>

      <div className="card" style={{ marginBottom: 24 }}>
        <h3>Your Post Performance {currentUser && `(@${currentUser.username})`}</h3>
        <button className="btn btn-primary" style={{ marginBottom: 16 }} onClick={loadSummary}>Load My Analytics</button>
        {summary.length > 0 && (
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={summary.map(p => ({ name: p.content.slice(0, 15) + '...', likes: p.likes, shares: p.shares, views: p.views }))}>
              <XAxis dataKey="name" stroke="#888" tick={{ fontSize: 11 }} />
              <YAxis stroke="#888" />
              <Tooltip contentStyle={{ background: '#1a1a1a', border: '1px solid #3a3a3a', borderRadius: 8 }} />
              <Bar dataKey="likes" fill="#a855f7" radius={[4, 4, 0, 0]} />
              <Bar dataKey="shares" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="views" fill="#22c55e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
        {summary.length === 0 && <p className="muted">Click the button to load your post analytics.</p>}
      </div>

      <div className="card">
        <h3>Hashtag Analytics</h3>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <input placeholder="Enter hashtag (without #)" value={hashtag} onChange={e => setHashtag(e.target.value)} />
          <button className="btn btn-primary" onClick={loadHashtag}>Search</button>
        </div>
        {hashtagData && (
          <div className="stats-row">
            <div className="stat-card"><div className="number">{hashtagData.total_posts}</div><div className="label">Posts</div></div>
            <div className="stat-card"><div className="number">{hashtagData.total_likes}</div><div className="label">Likes</div></div>
            <div className="stat-card"><div className="number">{hashtagData.total_shares}</div><div className="label">Shares</div></div>
            <div className="stat-card"><div className="number">{hashtagData.total_views}</div><div className="label">Views</div></div>
            <div className="stat-card"><div className="number">{hashtagData.trending_score}</div><div className="label">Score</div></div>
          </div>
        )}
      </div>
    </div>
  );
}
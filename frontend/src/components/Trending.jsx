import { useEffect, useState } from 'react';
import { getTrending } from '../api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function Trending() {
  const [posts, setPosts] = useState([]);

  useEffect(() => { getTrending().then(r => setPosts(r.data)); }, []);

  const chartData = posts.slice(0, 5).map(p => ({
    name: p.content.slice(0, 20) + '...',
    score: p.trending_score,
    likes: p.likes,
    shares: p.shares,
    views: p.views
  }));

  return (
    <div>
      <h2>🔥 Trending Posts</h2>

      {chartData.length > 0 && (
        <div className="card" style={{ marginBottom: 24 }}>
          <h3>Trending Score Chart</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" stroke="#888" tick={{ fontSize: 11 }} />
              <YAxis stroke="#888" />
              <Tooltip contentStyle={{ background: '#1a1a1a', border: '1px solid #3a3a3a', borderRadius: 8 }} />
              <Bar dataKey="score" radius={[6, 6, 0, 0]}>
                {chartData.map((_, i) => <Cell key={i} fill="#a855f7" />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {posts.length === 0 && <p className="muted">No trending posts yet. Add some engagement!</p>}
      {posts.map((p, i) => (
        <div className="card" key={p.post_id}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ color: '#a855f7', fontWeight: 700, marginRight: 10 }}>#{i + 1}</span>
              <span style={{ fontWeight: 600 }}>{p.content}</span>
              <div style={{ marginTop: 6 }}>{p.hashtags?.map(t => <span className="tag" key={t}>#{t}</span>)}</div>
            </div>
            <span className="score-badge">⚡ {p.trending_score}</span>
          </div>
          <div className="engage-row" style={{ borderTop: 'none', paddingTop: 0, marginTop: 10 }}>
            <span className="engage-btn">❤️ {p.likes}</span>
            <span className="engage-btn">🔁 {p.shares}</span>
            <span className="engage-btn">👁️ {p.views}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
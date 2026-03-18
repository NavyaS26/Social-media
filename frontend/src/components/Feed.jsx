import { useEffect, useState } from 'react';
import { getAllPosts, recordEngagement, getEngagementCounts, addComment } from '../api';

export default function Feed({ currentUser }) {
  const [posts, setPosts] = useState([]);
  const [counts, setCounts] = useState({});
  const [commenting, setCommenting] = useState(null);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    getAllPosts().then(res => {
      setPosts(res.data.reverse());
      res.data.forEach(p => {
        getEngagementCounts(p.post_id).then(r =>
          setCounts(prev => ({ ...prev, [p.post_id]: r.data }))
        );
      });
    });
  }, []);

  const engage = async (postId, type) => {
    if (!currentUser) return alert('Select a user first!');
    await recordEngagement(postId, { user_id: currentUser.user_id, action_type: type });
    const r = await getEngagementCounts(postId);
    setCounts(prev => ({ ...prev, [postId]: r.data }));
  };

  const submitComment = async (postId) => {
    if (!currentUser || !commentText) return;
    await addComment(postId, { user_id: currentUser.user_id, text: commentText });
    setCommenting(null);
    setCommentText('');
    const res = await getAllPosts();
    setPosts(res.data.reverse());
  };

  return (
    <div>
      <h2>Feed</h2>
      {posts.length === 0 && <p className="muted">No posts yet. Create one!</p>}
      {posts.map(post => (
        <div className="card" key={post.post_id}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ fontWeight: 600, marginBottom: 6 }}>{post.content}</p>
              <div>{post.hashtags.map(t => <span className="tag" key={t}>#{t}</span>)}</div>
            </div>
          </div>

          <div className="engage-row">
            <button className="engage-btn" onClick={() => engage(post.post_id, 'like')}>
              ❤️ {counts[post.post_id]?.likes ?? 0}
            </button>
            <button className="engage-btn" onClick={() => engage(post.post_id, 'share')}>
              🔁 {counts[post.post_id]?.shares ?? 0}
            </button>
            <button className="engage-btn" onClick={() => engage(post.post_id, 'view')}>
              👁️ {counts[post.post_id]?.views ?? 0}
            </button>
            <button className="engage-btn" onClick={() => setCommenting(post.post_id)}>
              💬 {post.comments?.length ?? 0}
            </button>
          </div>

          {post.comments?.length > 0 && (
            <div style={{ marginTop: 12 }}>
              {post.comments.map((c, i) => (
                <div key={i} className="user-pill" style={{ marginBottom: 4 }}>
                  <span className="muted">{c.text}</span>
                </div>
              ))}
            </div>
          )}

          {commenting === post.post_id && (
            <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
              <input
                placeholder="Write a comment..."
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                style={{ flex: 1 }}
              />
              <button className="btn btn-primary btn-sm" onClick={() => submitComment(post.post_id)}>Post</button>
              <button className="btn btn-secondary btn-sm" onClick={() => setCommenting(null)}>Cancel</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
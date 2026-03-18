import { useState } from 'react';
import { createPost } from '../api';

export default function CreatePost({ currentUser }) {
  const [form, setForm] = useState({ content: '', hashtags: '' });
  const [msg, setMsg] = useState('');

  const submit = async () => {
    if (!currentUser) return setMsg('❌ Select a user first from the Users page!');
    try {
      await createPost({
        user_id: currentUser.user_id,
        content: form.content,
        hashtags: form.hashtags.split(',').map(t => t.trim()).filter(Boolean)
      });
      setMsg('✅ Post created!');
      setForm({ content: '', hashtags: '' });
    } catch (e) {
      setMsg('❌ ' + (e.response?.data?.detail || 'Error'));
    }
  };

  return (
    <div>
      <h2>New Post</h2>
      <div className="card" style={{ maxWidth: 560 }}>
        {currentUser
          ? <p className="muted" style={{ marginBottom: 16 }}>Posting as <strong>@{currentUser.username}</strong></p>
          : <p className="error" style={{ marginBottom: 16 }}>⚠️ Go to Users page and click a user to select them first!</p>
        }
        <div className="form">
          <textarea
            placeholder="What's on your mind?"
            value={form.content}
            onChange={e => setForm({ ...form, content: e.target.value })}
          />
          <input
            placeholder="Hashtags (comma separated): tech, news, viral"
            value={form.hashtags}
            onChange={e => setForm({ ...form, hashtags: e.target.value })}
          />
          <button className="btn btn-primary" onClick={submit}>Post</button>
          {msg && <p className={msg.startsWith('✅') ? 'success' : 'error'}>{msg}</p>}
        </div>
      </div>
    </div>
  );
}
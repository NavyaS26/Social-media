export default function Sidebar({ active, setActive }) {
  const links = [
    { id: 'feed',      label: '🏠  Feed' },
    { id: 'users',     label: '👥  Users' },
    { id: 'create',    label: '✏️  New Post' },
    { id: 'trending',  label: '🔥  Trending' },
    { id: 'network',   label: '🌐  Network' },
    { id: 'analytics', label: '📊  Analytics' },
  ];

  return (
    <div className="sidebar">
      <h1>SocialDB</h1>
      {links.map(l => (
        <button
          key={l.id}
          className={active === l.id ? 'active' : ''}
          onClick={() => setActive(l.id)}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
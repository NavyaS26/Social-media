import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import Users from './components/Users';
import CreatePost from './components/CreatePost';
import Trending from './components/Trending';
import Network from './components/Network';
import Analytics from './components/Analytics';
import './index.css';

export default function App() {
  const [active, setActive] = useState('feed');
  const [currentUser, setCurrentUser] = useState(null);

  const pages = {
    feed:      <Feed currentUser={currentUser} />,
    users:     <Users currentUser={currentUser} setCurrentUser={setCurrentUser} />,
    create:    <CreatePost currentUser={currentUser} />,
    trending:  <Trending />,
    network:   <Network currentUser={currentUser} />,
    analytics: <Analytics currentUser={currentUser} />,
  };

  return (
    <div className="app">
      <Sidebar active={active} setActive={setActive} />
      <div className="main">
        {currentUser && (
          <div style={{ marginBottom: 20, padding: '8px 16px', background: '#1a1a1a', borderRadius: 10, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#a855f7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13 }}>
              {currentUser.username[0].toUpperCase()}
            </div>
            <span style={{ fontSize: 13 }}>Acting as <strong>@{currentUser.username}</strong></span>
          </div>
        )}
        {pages[active]}
      </div>
    </div>
  );
}
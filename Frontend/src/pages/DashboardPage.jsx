import React, { useEffect, useState } from 'react';
import './DashboardPage.css';
import { useNavigate } from 'react-router-dom';
import { Eye, Star, Bolt, CheckCircle, TrendingUp } from 'lucide-react';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('matches');
  const user = JSON.parse(localStorage.getItem('user')) || { name: 'Demo User' };

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  const suggestions = [
    {
      id: 1,
      name: 'Sarah Chen',
      location: 'San Francisco, CA',
      match: '95%',
      offer: ['UX Design'],
      want: ['Python'],
      rating: 4.9,
      responseRate: '95%',
      note: 'Perfect complement match',
      avatar: '',
    },
    {
      id: 2,
      name: 'Alex Rodriguez',
      location: 'New York, NY',
      match: '88%',
      offer: ['Spanish'],
      want: ['Photography'],
      rating: 4.8,
      responseRate: '87%',
      note: 'Language & Creative skills',
      avatar: '',
    },
    {
      id: 3,
      name: 'Maya Patel',
      location: 'Austin, TX',
      match: '82%',
      offer: ['React'],
      want: ['UI Design'],
      rating: 5.0,
      responseRate: '92%',
      note: 'Frontend Development focus',
      avatar: '',
    },
  ];

  return (
    <div className="dashboard-page">
      {/* Header */}
      <div className="dashboard-header">
        <h2>Welcome back, {user.name}! 👋</h2>
        <p>You have 3 new match suggestions and 2 pending requests.</p>
      </div>

      {/* Stats */}
      <div className="dashboard-stats">
        <div className="stat-box">
          <div>
            <div className="stat-box-title">Total Swaps</div>
            <div className="stat-box-value">12</div>
          </div>
          <TrendingUp size={20} color="#3b82f6" />
        </div>
        <div className="stat-box">
          <div>
            <div className="stat-box-title">Your Rating</div>
            <div className="stat-box-value">4.8 ⭐</div>
          </div>
          <Star size={20} color="#facc15" />
        </div>
        <div className="stat-box">
          <div>
            <div className="stat-box-title">Completion Rate</div>
            <div className="stat-box-value">94%</div>
          </div>
          <CheckCircle size={20} color="#10b981" />
        </div>
        <div className="stat-box">
          <div>
            <div className="stat-box-title">Skills Learned</div>
            <div className="stat-box-value">8</div>
          </div>
          <Bolt size={20} color="#a855f7" />
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={activeTab === 'matches' ? 'active' : ''}
          onClick={() => setActiveTab('matches')}
        >
          ⚡ Smart Matches
        </button>
        <button
          className={activeTab === 'requests' ? 'active' : ''}
          onClick={() => setActiveTab('requests')}
        >
          📨 Requests
        </button>
        <button
          className={activeTab === 'swaps' ? 'active' : ''}
          onClick={() => setActiveTab('swaps')}
        >
          👥 Active Swaps
        </button>
        <button
          className={activeTab === 'history' ? 'active' : ''}
          onClick={() => setActiveTab('history')}
        >
          📅 History
        </button>
      </div>

      {/* Suggestions Section */}
      {activeTab === 'matches' && (
        <div className="suggestion-section">
          <h3>
            🔍 Smart Match Suggestions <span className="badge">AI Powered</span>
          </h3>
          <p>These users have skills you want and want skills you have</p>

          {suggestions.map((u) => (
            <div className="suggestion-card" key={u.id}>
              <div className="card-left">
                <div className="card-header">
                  <div
                    className="avatar"
                    style={{
                      backgroundImage: u.avatar ? `url(${u.avatar})` : 'none',
                    }}
                  ></div>
                  <div>
                    <strong>{u.name}</strong>
                    <p>{u.location}</p>
                    <span className="match-score">{u.match} Match</span>
                  </div>
                </div>

                <div className="skill-section">
                  <div>
                    <strong>They offer:</strong>
                    <br />
                    {u.offer.map((skill, i) => (
                      <span key={i} className="skill-badge">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div>
                    <strong>They want:</strong>
                    <br />
                    {u.want.map((skill, i) => (
                      <span key={i} className="skill-badge green">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="rating-text">
                  ⭐ {u.rating} | ⚡ {u.responseRate} response rate
                </p>
                <p className="note">💡 {u.note}</p>
              </div>

              <div className="card-right">
                <button className="btn-primary">Request Swap</button>
                <button className="btn-outline">
                  <Eye size={14} /> View Profile
                </button>
                <button className="btn-text">♡ Save</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Requests Section */}
      {activeTab === 'requests' && (
        <div className="requests-section">
          <h3>Pending Requests</h3>
          <p>Users who want to swap skills with you</p>
          <div className="request-card">
            <div
              className="request-avatar"
              style={{
                backgroundImage: `url('https://randomuser.me/api/portraits/men/32.jpg')`,
              }}
            ></div>
            <div className="request-info">
              <div className="request-header">
                <span className="request-name">David Kim</span>
                <span className="request-time">2 hours ago</span>
              </div>
              <div className="request-skills">
                Offers: <b>Excel</b> &nbsp; Wants: <b>Python</b>
              </div>
              <div className="request-message">
                Hi! I'd love to learn Python from you. I can teach you advanced Excel and data visualization.
              </div>
              <div className="request-actions">
                <button className="request-accept">✔ Accept</button>
                <button className="request-decline">✖ Decline</button>
              </div>
            </div>
          </div>
          <div className="request-card">
            <div
              className="request-avatar"
              style={{
                backgroundImage: `url('https://randomuser.me/api/portraits/women/44.jpg')`,
              }}
            ></div>
            <div className="request-info">
              <div className="request-header">
                <span className="request-name">Emma Wilson</span>
                <span className="request-time">1 day ago</span>
              </div>
              <div className="request-skills">
                Offers: <b>Photography</b> &nbsp; Wants: <b>Web Development</b>
              </div>
              <div className="request-message">
                I'm a professional photographer looking to transition into tech. Would love to trade skills!
              </div>
              <div className="request-actions">
                <button className="request-accept">✔ Accept</button>
                <button className="request-decline">✖ Decline</button>
              </div>
            </div>
          </div>
        </div>
        
        
      )}

      {activeTab === 'swaps' && (
  <div className="swaps-section">
    <h3>Active Skill Swaps</h3>
    <p>Your ongoing learning exchanges</p>
    <div className="swap-card">
      <div className="swap-card-left">
        <div className="swap-avatar" style={{
          backgroundImage: `url('https://randomuser.me/api/portraits/men/45.jpg')`
        }}></div>
        <div>
          <div className="swap-name">James Thompson</div>
          <div className="swap-meta">
            Learning: <b>Guitar</b> &nbsp; Teaching: <b>Video Editing</b>
          </div>
          <div className="swap-progress-label">Progress</div>
          <div className="swap-progress-bar">
            <div className="swap-progress-fill" style={{width: '65%'}}></div>
          </div>
          <div className="swap-progress-text">65%</div>
          <div className="swap-next-session">
            Next session: <b>Tomorrow 7:00 PM</b>
          </div>
        </div>
      </div>
      <div className="swap-card-right">
        <button className="swap-chat-btn">💬 Chat</button>
        <button className="swap-schedule-btn">📅 Schedule</button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default DashboardPage;
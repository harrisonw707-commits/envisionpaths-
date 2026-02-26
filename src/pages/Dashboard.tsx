import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();

  const firstName = currentUser?.displayName?.split(' ')[0] || 'there';

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, {firstName}! 👋</h1>
        <p>Ready to accelerate your career today?</p>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🎤</div>
          <div className="stat-value">0</div>
          <div className="stat-label">Interviews Practiced</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📄</div>
          <div className="stat-value">0</div>
          <div className="stat-label">Resumes Reviewed</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-value">—</div>
          <div className="stat-label">Avg Interview Score</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🗺️</div>
          <div className="stat-value">0</div>
          <div className="stat-label">Career Paths Explored</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="dashboard-section">
        <h2>Quick Actions</h2>
        <div className="quick-actions-grid">
          <Link to="/interview-practice" className="action-card">
            <div className="action-icon">🎤</div>
            <h3>Practice Interview</h3>
            <p>Start an AI-powered mock interview session</p>
            <span className="action-link">Start Now →</span>
          </Link>
          <Link to="/career-paths" className="action-card">
            <div className="action-icon">🗺️</div>
            <h3>Explore Career Paths</h3>
            <p>Discover career paths that match your profile</p>
            <span className="action-link">Explore →</span>
          </Link>
          <Link to="/resume-review" className="action-card">
            <div className="action-icon">📄</div>
            <h3>Review Resume</h3>
            <p>Get AI feedback on your resume</p>
            <span className="action-link">Upload →</span>
          </Link>
          <Link to="/settings" className="action-card">
            <div className="action-icon">⚙️</div>
            <h3>Account Settings</h3>
            <p>Manage your profile and subscription</p>
            <span className="action-link">Manage →</span>
          </Link>
        </div>
      </div>

      {/* Profile Card */}
      <div className="dashboard-section">
        <h2>Your Profile</h2>
        <div className="profile-card">
          <div className="profile-avatar">
            {currentUser?.displayName?.charAt(0).toUpperCase() || '?'}
          </div>
          <div className="profile-info">
            <h3>{currentUser?.displayName || 'User'}</h3>
            <p>{currentUser?.email}</p>
            <span className="subscription-badge">Free Plan</span>
          </div>
          <Link to="/pricing" className="btn btn-primary">
            Upgrade Plan
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

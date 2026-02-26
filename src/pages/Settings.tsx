import React, { useState, FormEvent } from 'react';
import { useAuth } from '../context/AuthContext';
import { logoutUser } from '../services/authService';
import { useNavigate, Link } from 'react-router-dom';
import { handleApiError } from '../services/api';

const Settings: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [logoutError, setLogoutError] = useState('');
  const [activeTab, setActiveTab] = useState<'profile' | 'subscription' | 'account'>('profile');

  const handleLogout = async () => {
    setLogoutError('');
    try {
      await logoutUser();
      navigate('/');
    } catch (err) {
      setLogoutError(handleApiError(err));
    }
  };

  return (
    <div className="settings-page">
      <div className="page-header">
        <h1>⚙️ Account Settings</h1>
        <p>Manage your profile, subscription, and account preferences</p>
      </div>

      {logoutError && <div className="alert alert-error">{logoutError}</div>}

      <div className="settings-layout">
        {/* Sidebar */}
        <div className="settings-sidebar">
          <button
            className={`settings-tab ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            👤 Profile
          </button>
          <button
            className={`settings-tab ${activeTab === 'subscription' ? 'active' : ''}`}
            onClick={() => setActiveTab('subscription')}
          >
            💳 Subscription
          </button>
          <button
            className={`settings-tab ${activeTab === 'account' ? 'active' : ''}`}
            onClick={() => setActiveTab('account')}
          >
            🔐 Account
          </button>
        </div>

        {/* Content */}
        <div className="settings-content">
          {activeTab === 'profile' && (
            <div className="settings-section">
              <h2>Profile Information</h2>
              <div className="profile-display">
                <div className="profile-avatar large">
                  {currentUser?.displayName?.charAt(0).toUpperCase() || '?'}
                </div>
                <div className="profile-details">
                  <div className="detail-item">
                    <label>Full Name</label>
                    <p>{currentUser?.displayName || 'Not set'}</p>
                  </div>
                  <div className="detail-item">
                    <label>Email</label>
                    <p>{currentUser?.email || 'Not set'}</p>
                  </div>
                  <div className="detail-item">
                    <label>User ID</label>
                    <p className="user-id">{currentUser?.uid}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'subscription' && (
            <div className="settings-section">
              <h2>Subscription & Billing</h2>
              <div className="subscription-info">
                <div className="current-plan">
                  <div className="plan-badge">Free Plan</div>
                  <p>You are currently on the <strong>Free</strong> plan.</p>
                  <p>Upgrade to unlock unlimited interview practice, advanced AI coaching, and more.</p>
                </div>
                <div className="subscription-actions">
                  <Link to="/pricing" className="btn btn-primary">
                    Upgrade Plan
                  </Link>
                </div>
                <div className="plan-comparison">
                  <h3>What you're missing on Free:</h3>
                  <ul>
                    <li>❌ Unlimited interview practice (Free: 5/month)</li>
                    <li>❌ Advanced AI career coaching</li>
                    <li>❌ Unlimited resume reviews</li>
                    <li>❌ Live AI mock interviews</li>
                    <li>❌ LinkedIn profile optimization</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'account' && (
            <div className="settings-section">
              <h2>Account Security</h2>
              <div className="account-actions">
                <div className="action-item">
                  <div className="action-info">
                    <h3>Sign Out</h3>
                    <p>Sign out from your account on this device.</p>
                  </div>
                  <button className="btn btn-outline" onClick={handleLogout}>
                    Sign Out
                  </button>
                </div>
                <div className="action-item danger">
                  <div className="action-info">
                    <h3>Delete Account</h3>
                    <p>Permanently delete your account and all associated data.</p>
                  </div>
                  <button className="btn btn-danger" disabled>
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;

import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Accelerate Your Career with{' '}
            <span className="text-gradient">AI-Powered</span> Coaching
          </h1>
          <p className="hero-subtitle">
            EnvisionPaths uses advanced AI to help you ace interviews, discover
            career paths, and optimize your resume for success.
          </p>
          <div className="hero-cta">
            <Link to="/signup" className="btn btn-primary btn-large">
              Start Free Today
            </Link>
            <Link to="/pricing" className="btn btn-outline btn-large">
              View Plans
            </Link>
          </div>
          <p className="hero-note">No credit card required • Free plan available</p>
        </div>
        <div className="hero-image">
          <div className="hero-mockup">
            <div className="mockup-card">
              <span className="mockup-icon">🎯</span>
              <h4>Interview Score</h4>
              <div className="mockup-score">92/100</div>
              <p>Great answer! Strong use of STAR method.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="section-header">
          <h2>Everything You Need to Land Your Dream Job</h2>
          <p>Powered by Google Gemini AI for personalized, intelligent coaching</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎤</div>
            <h3>AI Interview Practice</h3>
            <p>
              Practice with AI-generated questions and receive instant, detailed
              feedback on your answers. Improve with every session.
            </p>
            <Link to="/signup" className="feature-link">
              Start Practicing →
            </Link>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🗺️</div>
            <h3>Career Path Discovery</h3>
            <p>
              Get personalized career recommendations based on your skills,
              interests, and experience level.
            </p>
            <Link to="/signup" className="feature-link">
              Explore Paths →
            </Link>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📄</div>
            <h3>Resume Analysis</h3>
            <p>
              Upload your resume and get AI-powered analysis with actionable
              improvements and ATS optimization tips.
            </p>
            <Link to="/signup" className="feature-link">
              Analyze Resume →
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="section-header">
          <h2>How It Works</h2>
          <p>Get started in minutes and see results immediately</p>
        </div>
        <div className="steps-grid">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Create Your Account</h3>
            <p>Sign up for free and set up your profile in under 2 minutes.</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Choose Your Focus</h3>
            <p>Select interview practice, career exploration, or resume review.</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Get AI Coaching</h3>
            <p>Receive personalized, detailed feedback powered by Google Gemini AI.</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Land Your Dream Job</h3>
            <p>Apply your improvements and succeed in your career journey.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Transform Your Career?</h2>
          <p>Join thousands of professionals who have accelerated their career with EnvisionPaths.</p>
          <Link to="/signup" className="btn btn-primary btn-large">
            Get Started for Free
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

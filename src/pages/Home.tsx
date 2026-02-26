import React from 'react';

const Home: React.FC = () => {
  return (
    <div>
      <header className="hero">
        <h1>Welcome to Our Website</h1>
        <p>Your journey starts here</p>
        <button>Get Started</button>
      </header>
      <section className="features">
        <h2>Features</h2>
        <div className="feature-grid">
          <div className="feature-item">
            <h3>Feature One</h3>
            <p>Description for feature one.</p>
          </div>
          <div className="feature-item">
            <h3>Feature Two</h3>
            <p>Description for feature two.</p>
          </div>
          <div className="feature-item">
            <h3>Feature Three</h3>
            <p>Description for feature three.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

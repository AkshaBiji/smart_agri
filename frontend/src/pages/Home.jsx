import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Users, ShoppingCart, TrendingUp } from 'lucide-react';

const Home = () => {
  return (
    <div className="home-container" style={{ textAlign: 'center', marginTop: '3rem' }}>
      <div className="hero section">
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
          Empowering Farmers with <br />
          <span className="gradient-text">Smart Intelligence & Direct Markets</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto 2.5rem' }}>
          Make better agricultural decisions based on weather and soil data. Connect directly with buyers to eliminate middlemen and maximize your profits.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '4rem' }}>
          <Link to="/advisor">
            <button className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
              <Sprout /> Get AI Crop Advice
            </button>
          </Link>
          <Link to="/market">
            <button className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
              <ShoppingCart /> Explore Market Connect
            </button>
          </Link>
        </div>
      </div>

      <div className="features grid grid-3" style={{ textAlign: 'left', marginTop: '4rem' }}>
        <div className="card glass-panel">
          <div style={{ background: 'rgba(46, 160, 67, 0.1)', padding: '1rem', borderRadius: '50%', width: 'fit-content', marginBottom: '1rem' }}>
            <TrendingUp color="#2ea043" size={32} />
          </div>
          <h3 style={{ marginBottom: '0.5rem' }}>AI Crop Predictor</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Get data-driven recommendations on what crops will yield the best results for your specific location, soil, and season.
          </p>
        </div>
        
        <div className="card glass-panel">
          <div style={{ background: 'rgba(46, 160, 67, 0.1)', padding: '1rem', borderRadius: '50%', width: 'fit-content', marginBottom: '1rem' }}>
            <ShoppingCart color="#2ea043" size={32} />
          </div>
          <h3 style={{ marginBottom: '0.5rem' }}>Direct Market Access</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            List your harvest directly to potential buyers, cutting out the middlemen and securing fair market prices.
          </p>
        </div>

        <div className="card glass-panel">
          <div style={{ background: 'rgba(46, 160, 67, 0.1)', padding: '1rem', borderRadius: '50%', width: 'fit-content', marginBottom: '1rem' }}>
            <Users color="#2ea043" size={32} />
          </div>
          <h3 style={{ marginBottom: '0.5rem' }}>Farmer Community</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Connect with experts and fellow farmers to ask questions, share knowledge, and solve daily agricultural challenges.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;

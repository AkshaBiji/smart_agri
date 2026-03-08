import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Landmark, CheckCircle2 } from 'lucide-react';

const GovernmentSchemes = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/schemes');
        setSchemes(res.data.schemes);
      } catch (error) {
        console.error('Error fetching schemes', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSchemes();
  }, []);

  return (
    <div>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', textAlign: 'center' }}>Government <span className="gradient-text">Agricultural Schemes</span></h2>
      <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '3rem' }}>Explore central and state-sponsored initiatives designed for your financial support and protection.</p>
      
      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem' }}>Loading schemes...</div>
      ) : (
        <div className="grid grid-2">
          {schemes.map(scheme => (
            <div key={scheme.id} className="card glass-panel" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ background: 'rgba(46, 160, 67, 0.15)', padding: '0.75rem', borderRadius: '50%' }}>
                  <Landmark color="#2ea043" size={24} />
                </div>
                <h3 style={{ margin: 0, fontSize: '1.3rem', color: '#fff' }}>{scheme.name}</h3>
              </div>
              
              <div style={{ flexGrow: 1, marginBottom: '1.5rem' }}>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: '1.6' }}>
                  {scheme.description}
                </p>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px', borderLeft: '3px solid var(--accent)' }}>
                  <strong style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Key Benefits:</strong>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                    <CheckCircle2 size={16} color="var(--success)" style={{ marginTop: '3px', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{scheme.benefits}</span>
                  </div>
                </div>
              </div>

              <button className="btn btn-secondary" style={{ width: '100%' }}>Apply / Learn More</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GovernmentSchemes;

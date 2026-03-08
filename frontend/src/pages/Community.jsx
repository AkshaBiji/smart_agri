import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, MessageSquarePlus, CornerDownRight } from 'lucide-react';

const Community = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    author: '',
    title: '',
    question: ''
  });

  useEffect(() => {
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/community');
      // Sort to show newest first
      setQueries(res.data.queries.sort((a,b) => new Date(b.date) - new Date(a.date)));
    } catch (error) {
      console.error('Error fetching community queries', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/community', formData);
      alert('Your question has been posted!');
      fetchQueries(); // refresh
      setFormData({ author: '', title: '', question: '' });
    } catch (error) {
      console.error('Error posting query', error);
      alert('Failed to post query.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', textAlign: 'center' }}>Farmer <span className="gradient-text">Community</span> Hub</h2>
      <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '3rem' }}>Ask questions, share advice, and connect with experienced agricultural professionals.</p>
      
      <div className="grid grid-2" style={{ gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 2fr)', alignItems: 'start' }}>
        
        {/* Post a Query Form */}
        <div className="card glass-panel" style={{ top: '2rem', position: 'sticky' }}>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MessageSquarePlus color="#2ea043" /> Stop Struggling. Ask!
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Your Name</label>
              <input type="text" name="author" className="form-control" value={formData.author} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Subject</label>
              <input type="text" name="title" className="form-control" value={formData.title} onChange={handleChange} placeholder="e.g. Tomato Leaf Curl" required />
            </div>
            <div className="form-group">
              <label className="form-label">Detailed Question</label>
              <textarea name="question" className="form-textarea" rows="4" value={formData.question} onChange={handleChange} placeholder="Describe the problem, crop stage, and symptoms..." required></textarea>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Post Question</button>
          </form>
        </div>

        {/* Existing Queries Feed */}
        <div className="query-feed">
          {loading ? (
            <p>Loading discussions...</p>
          ) : (
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              {queries.map(q => (
                <div key={q.id} className="card" style={{ padding: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                    <div>
                      <h3 style={{ margin: '0 0 0.5rem 0', color: '#fff', fontSize: '1.3rem' }}>{q.title}</h3>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Users size={14} /> {q.author} • {formatDate(q.date)}
                      </span>
                    </div>
                  </div>
                  
                  <p style={{ color: 'var(--text-primary)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                    {q.question}
                  </p>

                  <div className="answers-section" style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: 'var(--radius-sm)', borderLeft: '2px solid var(--border)' }}>
                    <h4 style={{ marginBottom: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      {q.answers.length} Answers
                    </h4>
                    
                    {q.answers.length > 0 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {q.answers.map((answer, index) => (
                           <div key={index} style={{ display: 'flex', gap: '0.75rem' }}>
                             <CornerDownRight size={18} color="var(--success)" style={{ marginTop: '4px', flexShrink: 0 }} />
                             <p style={{ margin: 0, color: 'var(--text-primary)', fontSize: '0.95rem' }}>{answer}</p>
                           </div>
                        ))}
                      </div>
                    ) : (
                      <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', margin: 0, fontSize: '0.9rem' }}>Be the first to answer this question.</p>
                    )}
                    
                    <button className="btn btn-secondary" style={{ marginTop: '1.5rem', fontSize: '0.85rem', padding: '0.5rem 1rem' }}>
                      Add Answer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Community;

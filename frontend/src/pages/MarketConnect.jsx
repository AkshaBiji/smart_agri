import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingCart, IndianRupee, MapPin } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MarketConnect = () => {
  const [listings, setListings] = useState([]);
  const [formData, setFormData] = useState({
    crop: '',
    quantity: '',
    expectedPrice: '',
    farmerName: '',
    location: '',
    contact: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/market');
      setListings(res.data.listings);
    } catch (error) {
      console.error('Error fetching market listings', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/market', formData);
      alert('Listing added successfully!');
      fetchListings(); // Refresh listings
      setFormData({
        crop: '',
        quantity: '',
        expectedPrice: '',
        farmerName: '',
        location: '',
        contact: ''
      });
    } catch (error) {
      console.error('Error adding market listing', error);
      alert('Failed to add listing. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Prepare chart data based on loaded listings.
  // Extract number from "₹2100/quintal" or similar expected prices carefully, simply by parsing integer.
  const chartData = {
    labels: listings.map(l => l.crop),
    datasets: [
      {
        label: 'Expected Price (₹)',
        data: listings.map(l => {
            const num = l.expectedPrice.replace(/[^0-9]/g, '');
            return parseInt(num) || 0;
        }),
        backgroundColor: 'rgba(46, 160, 67, 0.6)',
        borderColor: 'rgba(46, 160, 67, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Expected Market Prices (₹/quintal)', color: '#c9d1d9' },
    },
    scales: {
      y: { ticks: { color: '#8b949e' }, grid: { color: '#30363d' } },
      x: { ticks: { color: '#8b949e' }, grid: { color: '#30363d' } },
    }
  };

  return (
    <div>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', textAlign: 'center' }}>Market <span className="gradient-text">Connect</span></h2>
      <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '3rem' }}>Direct trade platform. No middlemen. Maximize your profits.</p>
      
      <div className="grid grid-2" style={{ alignItems: 'start' }}>
        <div className="card glass-panel" style={{ height: '100%' }}>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShoppingCart color="#2ea043" /> Add New Listing
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group grid grid-2" style={{ marginBottom: '1rem' }}>
              <div>
                <label className="form-label">Crop Name</label>
                <input type="text" name="crop" className="form-control" value={formData.crop} onChange={handleChange} placeholder="e.g. Wheat" required />
              </div>
              <div>
                <label className="form-label">Quantity</label>
                <input type="text" name="quantity" className="form-control" value={formData.quantity} onChange={handleChange} placeholder="e.g. 500 kg" required />
              </div>
            </div>
            
            <div className="form-group grid grid-2" style={{ marginBottom: '1rem' }}>
              <div>
                <label className="form-label">Expected Price</label>
                <input type="text" name="expectedPrice" className="form-control" value={formData.expectedPrice} onChange={handleChange} placeholder="e.g. ₹2100/quintal" required />
              </div>
              <div>
                <label className="form-label">Location</label>
                <input type="text" name="location" className="form-control" value={formData.location} onChange={handleChange} placeholder="e.g. Punjab" required />
              </div>
            </div>

            <div className="form-group grid grid-2" style={{ marginBottom: '1.5rem' }}>
              <div>
                <label className="form-label">Farmer Name</label>
                <input type="text" name="farmerName" className="form-control" value={formData.farmerName} onChange={handleChange} required />
              </div>
              <div>
                <label className="form-label">Contact Number</label>
                <input type="tel" name="contact" className="form-control" value={formData.contact} onChange={handleChange} required />
              </div>
            </div>
            
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
              {loading ? 'Adding...' : 'Post Listing to Market'}
            </button>
          </form>
        </div>

        <div className="market-listings">
          <div className="card" style={{ marginBottom: '1.5rem', background: 'rgba(13, 17, 23, 0.4)' }}>
           {listings.length > 0 ? <Bar options={chartOptions} data={chartData} /> : <p style={{textAlign: 'center', padding: '2rem'}}>Loading Market Insights...</p>}
          </div>

          <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Available Harvests</h3>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {listings.map(listing => (
              <div key={listing.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', background: 'rgba(22, 27, 34, 0.8)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--accent)' }}>{listing.crop} <span style={{fontSize: '0.8rem', color: 'var(--text-secondary)'}}>({listing.quantity})</span></h4>
                  <span style={{ display: 'flex', alignItems: 'center', color: '#fff', fontWeight: 'bold' }}>
                    <IndianRupee size={16} /> {listing.expectedPrice.replace('₹', '')}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    <span>By: <strong style={{color: 'var(--text-primary)'}}>{listing.farmerName}</strong></span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={14} /> {listing.location}
                    </span>
                </div>
                {/* Contact button */}
                <button className="btn btn-secondary" style={{ marginTop: '0.5rem', padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                  Contact: {listing.contact}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketConnect;

import React, { useState } from 'react';
import axios from 'axios';
import { CloudRain, Sun, ThermometerSun, Leaf, Sprout, MapPin } from 'lucide-react';

const CropAdvisor = () => {
  const [formData, setFormData] = useState({
    location: '',
    soilType: 'Alluvial',
    season: 'Kharif',
    weather: 'Sunny'
  });
  
  const [recommendations, setRecommendations] = useState(null);
  const [weatherAdvice, setWeatherAdvice] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Get Crop Recommendations
      const cropRes = await axios.post('http://localhost:5000/api/recommend-crop', formData);
      setRecommendations(cropRes.data.recommended);

      // Get Weather Advice based on selected weather
      const weatherRes = await axios.get(`http://localhost:5000/api/weather-advice?condition=${formData.weather}`);
      setWeatherAdvice(weatherRes.data.advice);
    } catch (error) {
      console.error('Error fetching advice', error);
      alert('Failed to get agricultural advice. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const autoDetectSoil = (locationName) => {
    const loc = locationName.toLowerCase();
    if (loc.includes('punjab') || loc.includes('haryana') || loc.includes('uttar pradesh') || loc.includes('bihar') || loc.includes('west bengal')) return 'Alluvial';
    if (loc.includes('maharashtra') || loc.includes('gujarat') || loc.includes('madhya pradesh') || loc.includes('karnataka')) return 'Black';
    if (loc.includes('kerala') || loc.includes('tamil nadu') || loc.includes('goa') || loc.includes('assam')) return 'Laterite';
    if (loc.includes('odisha') || loc.includes('chhattisgarh') || loc.includes('jharkhand') || loc.includes('telangana')) return 'Red';
    return null;
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
            
            const district = res.data.address.state_district || res.data.address.city_district || res.data.address.county || res.data.address.city || res.data.address.state || "Unknown District";
            const fullAddress = res.data.display_name || district;
            
            const detectedSoil = autoDetectSoil(fullAddress) || 'Alluvial';
            setFormData(prev => ({ ...prev, location: district, soilType: detectedSoil }));
          } catch (error) {
            console.error('Error fetching location details', error);
            alert('Could not determine location name.');
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          console.error('Geolocation error', error);
          alert('Could not get your location. Please check browser permissions.');
          setLoading(false);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'location') {
      const detectedSoil = autoDetectSoil(value);
      setFormData({ 
        ...formData, 
        [name]: value,
        ...(detectedSoil ? { soilType: detectedSoil } : {})
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <div>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', textAlign: 'center' }}>AI <span className="gradient-text">Crop Advisor</span></h2>
      <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '3rem' }}>Enter your farm details to get personalized hybrid & traditional crop recommendations.</p>
      
      <div className="grid grid-2" style={{ alignItems: 'start' }}>
        <div className="card glass-panel">
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Leaf color="#2ea043" /> Farm Parameters
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Location / Region
                <span style={{ fontSize: '0.8rem', color: 'var(--accent)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }} onClick={handleGetLocation}>
                  <MapPin size={14} /> Use Current
                </span>
              </label>
              <input type="text" name="location" className="form-control" value={formData.location} onChange={handleChange} placeholder="e.g. Punjab" required />
            </div>
            
            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Soil Type 
                <a href="/soil" style={{ fontSize: '0.8rem', color: 'var(--accent)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Don't know? Click here
                </a>
              </label>
              <select name="soilType" className="form-select" value={formData.soilType} onChange={handleChange}>
                <option value="Alluvial">Alluvial Soil (Rich in nutrients)</option>
                <option value="Black">Black Soil (High moisture retention)</option>
                <option value="Red">Red & Yellow Soil</option>
                <option value="Laterite">Laterite Soil</option>
              </select>
            </div>
            
            <div className="grid grid-2">
              <div className="form-group">
                <label className="form-label">Season</label>
                <select name="season" className="form-select" value={formData.season} onChange={handleChange}>
                  <option value="Kharif">Kharif (Monsoon)</option>
                  <option value="Rabi">Rabi (Winter)</option>
                  <option value="Zaid">Zaid (Summer)</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Current/Expected Weather</label>
                <select name="weather" className="form-select" value={formData.weather} onChange={handleChange}>
                  <option value="Sunny">Sunny / Hot</option>
                  <option value="Rainy">Rainy / Monsoon</option>
                  <option value="Cloudy">Cloudy / Humid</option>
                  <option value="Cold">Cold / Frost</option>
                </select>
              </div>
            </div>
            
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
              {loading ? 'Analyzing...' : 'Get AI Recommendation'}
            </button>
          </form>
        </div>

        <div className="results-container">
          {weatherAdvice && (
            <div className="card" style={{ marginBottom: '1.5rem', borderLeft: '4px solid var(--accent)' }}>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <CloudRain color="var(--accent)" size={20} /> Weather Advisory
              </h4>
              <p style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>{weatherAdvice}</p>
            </div>
          )}

          {recommendations && (
            <div className="recommendations">
              <h4 style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>Recommended Crops:</h4>
              <div className="grid">
                {recommendations.map(crop => (
                  <div key={crop.id} className="card" style={{ borderLeft: `4px solid ${crop.type === 'Hybrid' ? 'var(--accent)' : 'var(--success)'}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <h3 style={{ margin: 0 }}>{crop.name}</h3>
                      <span style={{ 
                        fontSize: '0.75rem', 
                        padding: '0.25rem 0.5rem', 
                        borderRadius: '12px', 
                        background: crop.type === 'Hybrid' ? 'rgba(47, 129, 247, 0.1)' : 'rgba(46, 160, 67, 0.1)',
                        color: crop.type === 'Hybrid' ? 'var(--accent)' : 'var(--success)',
                        fontWeight: 'bold'
                      }}>
                        {crop.type}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginTop: '0.75rem' }}>
                      <Sprout size={16} color="var(--text-secondary)" style={{ marginTop: '3px' }} />
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>{crop.tip}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!recommendations && !loading && (
             <div className="card glass-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', opacity: 0.6 }}>
               <ThermometerSun size={48} color="var(--text-secondary)" style={{ marginBottom: '1rem' }} />
               <p>Fill out the parameters to get custom AI insights.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CropAdvisor;

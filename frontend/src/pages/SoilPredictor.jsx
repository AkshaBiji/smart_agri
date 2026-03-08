import React, { useState } from 'react';
import axios from 'axios';
import { MapPin, Search, ThermometerSun, Loader2 } from 'lucide-react';

const autoDetectSoil = (locationName) => {
  if (!locationName) return null;
  const loc = locationName.toLowerCase();
  if (loc.includes('punjab') || loc.includes('haryana') || loc.includes('uttar pradesh') || loc.includes('bihar') || loc.includes('west bengal')) return 'Alluvial Soil (Rich in nutrients)';
  if (loc.includes('maharashtra') || loc.includes('gujarat') || loc.includes('madhya pradesh') || loc.includes('karnataka')) return 'Black Soil (High moisture retention)';
  if (loc.includes('kerala') || loc.includes('tamil nadu') || loc.includes('goa') || loc.includes('assam')) return 'Laterite Soil';
  if (loc.includes('odisha') || loc.includes('chhattisgarh') || loc.includes('jharkhand') || loc.includes('telangana')) return 'Red & Yellow Soil';
  return 'Mixed/Other Soil Type';
};

const SoilPredictor = () => {
  const [manualLocation, setManualLocation] = useState('');
  const [detectedLocation, setDetectedLocation] = useState('');
  const [soilResult, setSoilResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const analyzeSoil = (locName, fullContext = "") => {
    if (!locName.trim()) {
      setErrorMsg("Please enter a valid location.");
      return;
    }
    setErrorMsg('');
    setLoading(true);
    
    // Simulate API delay for realism
    setTimeout(() => {
      const contextToAnalyze = fullContext ? fullContext : locName;
      const result = autoDetectSoil(contextToAnalyze) || 'Alluvial Soil (Default Fallback)';
      setSoilResult({
        location: locName,
        type: result
      });
      setLoading(false);
    }, 600);
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    analyzeSoil(manualLocation);
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      setErrorMsg('');
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
            
            const district = res.data.address.state_district || res.data.address.city_district || res.data.address.county || res.data.address.city || res.data.address.state || "Unknown District";
            const fullAddress = res.data.display_name || district;

            setDetectedLocation(district);
            analyzeSoil(district, fullAddress);
          } catch (error) {
            console.error('Error fetching location details', error);
            setErrorMsg('Could not determine location name from coordinates.');
            setLoading(false);
          }
        },
        (error) => {
          console.error('Geolocation error', error);
          setErrorMsg('Could not get your location. Please ensure browser permissions are granted.');
          setLoading(false);
        }
      );
    } else {
      setErrorMsg("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', textAlign: 'center' }}>Soil <span className="gradient-text">Analysis</span></h2>
      <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '3rem' }}>Discover the primary soil composition of any region to optimize your farming strategy.</p>

      <div className="grid grid-2" style={{ alignItems: 'start' }}>
        
        {/* Left Side: Inputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className="card glass-panel" style={{ borderLeft: '4px solid var(--accent)' }}>
            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin color="var(--accent)" /> Use Current GPS Location
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Allow your browser to use your device's GPS or network location to instantly analyze the soil beneath you.
            </p>
            <button 
              className="btn btn-primary" 
              onClick={handleGetLocation} 
              disabled={loading}
              style={{ width: '100%', background: 'linear-gradient(135deg, var(--accent), #1f6feb)', boxShadow: '0 4px 12px rgba(47, 129, 247, 0.3)' }}
            >
              {loading && !manualLocation ? <Loader2 className="animate-spin" size={18} /> : <MapPin size={18} />}
              Analyze My Current Location
            </button>
            {detectedLocation && (
               <p style={{ color: 'var(--success)', fontSize: '0.85rem', marginTop: '1rem', textAlign: 'center' }}>
                 Detected: {detectedLocation}
               </p>
            )}
          </div>

          <div style={{ textAlign: 'center', color: 'var(--text-secondary)', fontWeight: 'bold' }}>— OR —</div>

          <div className="card glass-panel">
            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Search color="var(--success)" /> Manual Search
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
              Enter a specific state, region, or city to check its common soil type.
            </p>
            <form onSubmit={handleManualSubmit}>
              <div className="form-group">
                <input 
                  type="text" 
                  className="form-control" 
                  value={manualLocation} 
                  onChange={(e) => setManualLocation(e.target.value)} 
                  placeholder="e.g. Maharashtra, Punjab..." 
                />
              </div>
              <button type="submit" className="btn btn-secondary" style={{ width: '100%' }} disabled={loading}>
                {loading && manualLocation ? 'Searching...' : 'Search Region'}
              </button>
            </form>
          </div>
          
          {errorMsg && (
            <div style={{ padding: '1rem', background: 'rgba(248, 81, 73, 0.1)', color: '#ff7b72', borderRadius: 'var(--radius-sm)', border: '1px solid #ff7b72', fontSize: '0.9rem' }}>
              {errorMsg}
            </div>
          )}

        </div>

        {/* Right Side: Results */}
        <div className="results-container" style={{ height: '100%' }}>
          {soilResult ? (
            <div className="card glass-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column', border: '1px solid var(--success)' }}>
              <h3 style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1rem', marginBottom: '1.5rem', color: 'var(--success)' }}>
                Analysis Complete
              </h3>
              
              <div style={{ marginBottom: '2rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Region Scanned</span>
                <h4 style={{ fontSize: '1.4rem', color: '#fff', margin: '0.25rem 0 0 0' }}>{soilResult.location}</h4>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: 'var(--radius-sm)', flexGrow: 1 }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Predominant Soil Type</span>
                <h2 style={{ fontSize: '2rem', color: 'var(--accent)', margin: '0.5rem 0' }}>{soilResult.type}</h2>
                
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '1rem', lineHeight: '1.6' }}>
                  This soil type is generally suited for specific localized crops. You can carry this knowledge over to the <a href="/advisor" style={{ color: 'var(--success)', textDecoration: 'none' }}>Crop Advisor</a> to get precise planting recommendations.
                </p>
              </div>
            </div>
          ) : (
            <div className="card glass-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px', opacity: 0.6 }}>
               {loading ? (
                  <Loader2 className="animate-spin" size={48} color="var(--success)" style={{ marginBottom: '1rem' }} />
               ) : (
                  <ThermometerSun size={48} color="var(--text-secondary)" style={{ marginBottom: '1rem' }} />
               )}
               <p>{loading ? 'Analyzing topography...' : 'Awaiting location input...'}</p>
             </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default SoilPredictor;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CropAdvisor from './pages/CropAdvisor';
import MarketConnect from './pages/MarketConnect';
import GovernmentSchemes from './pages/GovernmentSchemes';
import Community from './pages/Community';
import SoilPredictor from './pages/SoilPredictor';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="page-wrapper container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/advisor" element={<CropAdvisor />} />
            <Route path="/market" element={<MarketConnect />} />
            <Route path="/schemes" element={<GovernmentSchemes />} />
            <Route path="/community" element={<Community />} />
            <Route path="/soil" element={<SoilPredictor />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

import { NavLink, Link } from 'react-router-dom';
import { Leaf, Sprout, ShoppingCart, Landmark, Users, MapPin } from 'lucide-react';
import '../index.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="brand">
          <Leaf className="text-success" color="#2ea043" />
          <span>Smart Agri</span> Connect
        </Link>
        <ul className="nav-links">
          <li>
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/advisor" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Sprout size={18} /> Advisor
            </NavLink>
          </li>
          <li>
            <NavLink to="/soil" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <MapPin size={18} /> Soil Check
            </NavLink>
          </li>
          <li>
            <NavLink to="/market" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <ShoppingCart size={18} /> Market
            </NavLink>
          </li>
          <li>
            <NavLink to="/schemes" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Landmark size={18} /> Schemes
            </NavLink>
          </li>
          <li>
            <NavLink to="/community" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Users size={18} /> Community
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

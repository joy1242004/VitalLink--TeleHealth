import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isAuthenticated, userType, onLogout }) => {
  if (!isAuthenticated) {
    return (
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/">VitalLink</Link>
        </div>
        <div className="navbar-links">
          <Link to="/login" className="nav-button">Login</Link>
        </div>
      </nav>
    );
  }
  
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">VitalLink</Link>
      </div>
      <div className="navbar-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/consultation">Consultations</Link>
        <Link to="/appointments">Appointments</Link>
        {userType === 'provider' && <Link to="/records">Patient Records</Link>}
        <Link to="/monitoring">Health Monitoring</Link>
        <Link to="/settings">Settings</Link>
        <button onClick={onLogout} className="logout-button">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
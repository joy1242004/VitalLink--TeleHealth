// App.js - Main Component
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import PatientRecords from './components/PatientRecords.jsx/PatientRecords';
import Dashboard from './components/Dashboard/Dashboard';
import Consultation from './components/Consultations/Consultation';
import Monitoring from './components/Monitoring/Monitoring';
import Appointments from './components/Appointments/Appointments';
import Settings from './components/Settings/Settings';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState(''); // 'patient' or 'provider'
  
  const handleLogin = (type) => {
    setIsAuthenticated(true);
    setUserType(type);
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserType('');
  };
  
  return (
    <Router>
      <div className="app-container">
        <Navbar isAuthenticated={isAuthenticated} userType={userType} onLogout={handleLogout} />
        <div className="main-content">
          <Routes>
            <Route path="/login" element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />
            } />
            <Route path="/dashboard" element={
              isAuthenticated ? <Dashboard userType={userType} /> : <Navigate to="/login" />
            } />
            <Route path="/consultation" element={
              isAuthenticated ? <Consultation userType={userType} /> : <Navigate to="/login" />
            } />
            <Route path="/records" element={
              isAuthenticated ? <PatientRecords userType={userType} /> : <Navigate to="/login" />
            } />
            <Route path="/monitoring" element={
              isAuthenticated ? <Monitoring userType={userType} /> : <Navigate to="/login" />
            } />
            <Route path="/appointments" element={
              isAuthenticated ? <Appointments userType={userType} /> : <Navigate to="/login" />
            } />
            <Route path="/settings" element={
              isAuthenticated ? <Settings userType={userType} /> : <Navigate to="/login" />
            } />
            <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
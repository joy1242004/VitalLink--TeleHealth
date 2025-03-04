import React, { useState } from 'react';
import './Login.css';
import logo from '../../assets/logo.png'

const Login = ({ onLogin }) => {
  const [activeTab, setActiveTab] = useState('patient');
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      console.log("Account created for:", email, "as", activeTab);
    } else {
      console.log("Logging in as:", email, "as", activeTab);
      onLogin(activeTab);
    }
  };

  return ( <div>
    <div className="logo-container">
    <img src={logo} alt="HealthConnect Logo" className="logo" />
  </div>
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Welcome to HealthConnect</h2>
          <p>Your comprehensive telehealth platform</p>
        </div>
        
        <div className="login-tabs">
          <button className={`tab-button ${activeTab === 'patient' ? 'active' : ''}`} onClick={() => setActiveTab('patient')}>
            Patient
          </button>
          <button className={`tab-button ${activeTab === 'provider' ? 'active' : ''}`} onClick={() => setActiveTab('provider')}>
            Healthcare Provider
          </button>
        </div>
        
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          
          {isSignup && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
          )}
          
          <button type="submit" className="login-button">
            {isSignup ? "Create Account" : `Login as ${activeTab === 'patient' ? 'Patient' : 'Healthcare Provider'}`}
          </button>
        </form>
        
        <div className="login-footer">
          {!isSignup ? (
            <>
              <a href="#">Forgot Password?</a>
              <a href="#" onClick={() => setIsSignup(true)}>Create Account</a>
            </>
          ) : (
            <a href="#" onClick={() => setIsSignup(false)}>Already have an account? Login</a>
          )}
        </div>
      </div>
    </div> </div>
  );
};

export default Login;

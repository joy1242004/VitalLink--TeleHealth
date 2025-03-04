import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = ({ userType }) => {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome back, {userType === 'patient' ? 'Mayank' : 'Dr. Smith'}</h1>
        <p>{today}</p>
      </div>
      
      <div className="dashboard-grid">
        {userType === 'patient' ? (
          <>
            <div className="dashboard-card upcoming-appointment">
              <h3>Upcoming Appointment</h3>
              <div className="appointment-details">
                <p className="appointment-date">March 5, 2025 - 2:00 PM</p>
                <p className="appointment-doctor">Dr. Smith - Cardiology</p>
                <Link to="/consultation" className="button-link">Join Consultation</Link>
              </div>
            </div>
            
            <div className="dashboard-card health-metrics">
              <h3>Health Metrics</h3>
              <div className="metrics-container">
                <div className="metric-item">
                  <span className="metric-value">120/80</span>
                  <span className="metric-label">Blood Pressure</span>
                </div>
                <div className="metric-item">
                  <span className="metric-value">72</span>
                  <span className="metric-label">Heart Rate</span>
                </div>
                <div className="metric-item">
                  <span className="metric-value">98.6°F</span>
                  <span className="metric-label">Temperature</span>
                </div>
              </div>
              <Link to="/monitoring" className="button-link">View All Metrics</Link>
            </div>
            
            <div className="dashboard-card medications">
              <h3>Medications</h3>
              <ul className="medication-list">
                <li>Lisinopril - 10mg - Once daily</li>
                <li>Atorvastatin - 20mg - Once daily</li>
                <li>Aspirin - 81mg - Once daily</li>
              </ul>
            </div>
            
            <div className="dashboard-card recent-messages">
              <h3>Recent Messages</h3>
              <div className="message-preview">
                <p className="message-sender">Dr. Smith</p>
                <p className="message-text">How are you feeling after our last appointment? Have you noticed any...</p>
                <p className="message-time">Yesterday</p>
              </div>
              <Link to="/messages" className="button-link">View All Messages</Link>
            </div>
          </>
        ) : (
          <>
            <div className="dashboard-card upcoming-appointments">
              <h3>Today's Appointments</h3>
              <div className="appointments-list">
                <div className="appointment-item">
                  <p className="appointment-time">10:00 AM</p>
                  <p className="appointment-patient">Sarah johnson - Follow-up</p>
                  <Link to="/consultation" className="button-link">Start Session</Link>
                </div>
                <div className="appointment-item">
                  <p className="appointment-time">2:00 PM</p>
                  <p className="appointment-patient">Mayank - Cardiology Check</p>
                  <Link to="/consultation" className="button-link">Start Session</Link>
                </div>
              </div>
              <Link to="/appointments" className="button-link">View All Appointments</Link>
            </div>
            
            <div className="dashboard-card patient-alerts">
              <h3>Patient Alerts</h3>
              <div className="alert-list">
                <div className="alert-item urgent">
                  <p className="alert-patient">Robert Williams</p>
                  <p className="alert-message">Abnormal blood pressure readings detected</p>
                  <Link to="/records" className="button-link">Review Data</Link>
                </div>
                <div className="alert-item">
                  <p className="alert-patient">Emily Davis</p>
                  <p className="alert-message">Missed medication for 2 days</p>
                  <Link to="/records" className="button-link">Send Reminder</Link>
                </div>
              </div>
            </div>
            
            <div className="dashboard-card recent-messages">
              <h3>Recent Messages</h3>
              <div className="message-preview">
                <p className="message-sender">Mayank </p>
                <p className="message-text">Thank you for the prescription. When should I expect to see...</p>
                <p className="message-time">2 hours ago</p>
              </div>
              <Link to="/messages" className="button-link">View All Messages</Link>
            </div>
            
            <div className="dashboard-card performance">
              <h3>Performance Metrics</h3>
              <div className="metrics-container">
                <div className="metric-item">
                  <span className="metric-value">15</span>
                  <span className="metric-label">Consultations this week</span>
                </div>
                <div className="metric-item">
                  <span className="metric-value">95%</span>
                  <span className="metric-label">Patient satisfaction</span>
                </div>
                <div className="metric-item">
                  <span className="metric-value">12 min</span>
                  <span className="metric-label">Avg. response time</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
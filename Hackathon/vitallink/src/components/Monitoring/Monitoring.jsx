// components/Monitoring.js
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Monitoring.css';

const Monitoring = ({ userType }) => {
  const [activeMetric, setActiveMetric] = useState('bloodPressure');
  const [timeRange, setTimeRange] = useState('1month');
  
  // Mock data
  const mockData = {
    bloodPressure: [
      { date: '2025-02-01', systolic: 125, diastolic: 85 },
      { date: '2025-02-05', systolic: 122, diastolic: 82 },
      { date: '2025-02-10', systolic: 120, diastolic: 80 },
      { date: '2025-02-15', systolic: 118, diastolic: 78 },
      { date: '2025-02-20', systolic: 121, diastolic: 81 },
      { date: '2025-02-25', systolic: 119, diastolic: 79 },
      { date: '2025-03-01', systolic: 120, diastolic: 80 },
    ],
    heartRate: [
      { date: '2025-02-01', value: 75 },
      { date: '2025-02-05', value: 72 },
      { date: '2025-02-10', value: 74 },
      { date: '2025-02-15', value: 70 },
      { date: '2025-02-20', value: 73 },
      { date: '2025-02-25', value: 71 },
      { date: '2025-03-01', value: 72 },
    ],
    glucose: [
      { date: '2025-02-01', value: 110 },
      { date: '2025-02-05', value: 105 },
      { date: '2025-02-10', value: 112 },
      { date: '2025-02-15', value: 108 },
      { date: '2025-02-20', value: 115 },
      { date: '2025-02-25', value: 107 },
      { date: '2025-03-01', value: 110 },
    ],
    weight: [
      { date: '2025-02-01', value: 180 },
      { date: '2025-02-05', value: 179 },
      { date: '2025-02-10', value: 178 },
      { date: '2025-02-15', value: 178 },
      { date: '2025-02-20', value: 177 },
      { date: '2025-02-25', value: 176 },
      { date: '2025-03-01', value: 176 },
    ],
  };
  
  const deviceInfo = [
    { 
      name: 'Smart Blood Pressure Monitor',
      status: 'Connected',
      lastSync: '2025-03-01 08:45 AM',
      batteryLevel: '85%'
    },
    { 
      name: 'Continuous Glucose Monitor',
      status: 'Connected',
      lastSync: '2025-03-01 09:30 AM',
      batteryLevel: '72%'
    },
    { 
      name: 'Smart Scale',
      status: 'Connected',
      lastSync: '2025-02-28 07:15 AM',
      batteryLevel: '90%'
    },
    { 
      name: 'Heart Rate Monitor',
      status: 'Connected',
      lastSync: '2025-03-01 06:20 AM',
      batteryLevel: '65%'
    }
  ];
  
  const getChartData = () => {
    return mockData[activeMetric];
  };
  
  const renderMetricChart = () => {
    if (activeMetric === 'bloodPressure') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={getChartData()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="systolic" stroke="#8884d8" name="Systolic" />
            <Line type="monotone" dataKey="diastolic" stroke="#82ca9d" name="Diastolic" />
          </LineChart>
        </ResponsiveContainer>
      );
    } else {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={getChartData()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#8884d8" 
              name={activeMetric === 'heartRate' ? 'Heart Rate (BPM)' : 
                    activeMetric === 'glucose' ? 'Blood Glucose (mg/dL)' : 
                    'Weight (lbs)'} 
            />
          </LineChart>
        </ResponsiveContainer>
      );
    }
  };
  
  const getMetricInfo = () => {
    switch(activeMetric) {
      case 'bloodPressure':
        return {
          title: 'Blood Pressure',
          description: 'Track your systolic and diastolic blood pressure over time',
          unit: 'mmHg',
          normalRange: '90/60 - 120/80 mmHg',
          latestReading: '120/80 mmHg',
          trend: 'Stable'
        };
      case 'heartRate':
        return {
          title: 'Heart Rate',
          description: 'Monitor your resting heart rate',
          unit: 'BPM',
          normalRange: '60-100 BPM',
          latestReading: '72 BPM',
          trend: 'Improving'
        };
      case 'glucose':
        return {
          title: 'Blood Glucose',
          description: 'Track your blood sugar levels',
          unit: 'mg/dL',
          normalRange: '70-140 mg/dL',
          latestReading: '110 mg/dL',
          trend: 'Stable'
        };
      case 'weight':
        return {
          title: 'Weight',
          description: 'Track changes in your body weight',
          unit: 'lbs',
          normalRange: 'Target: 170 lbs',
          latestReading: '176 lbs',
          trend: 'Decreasing'
        };
      default:
        return {
          title: '',
          description: '',
          unit: '',
          normalRange: '',
          latestReading: '',
          trend: ''
        };
    }
  };
  
  const metricInfo = getMetricInfo();
  
  return (
    <div className="monitoring-container">
      <div className="monitoring-header">
        <h1>Health Monitoring</h1>
        <div className="monitoring-controls">
          <div className="control-group">
            <label>Metric:</label>
            <select 
              value={activeMetric} 
              onChange={(e) => setActiveMetric(e.target.value)}
              className="metric-select"
            >
              <option value="bloodPressure">Blood Pressure</option>
              <option value="heartRate">Heart Rate</option>
              <option value="glucose">Blood Glucose</option>
              <option value="weight">Weight</option>
            </select>
          </div>
          <div className="control-group">
            <label>Time Range:</label>
            <select 
              value={timeRange} 
              onChange={(e) => setTimeRange(e.target.value)}
              className="time-select"
            >
              <option value="1week">Last Week</option>
              <option value="1month">Last Month</option>
              <option value="3months">Last 3 Months</option>
              <option value="6months">Last 6 Months</option>
              <option value="1year">Last Year</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="metric-details">
        <div className="metric-info">
          <h2>{metricInfo.title}</h2>
          <p>{metricInfo.description}</p>
          <div className="metric-stats">
            <div className="stat-item">
              <span className="stat-label">Normal Range:</span>
              <span className="stat-value">{metricInfo.normalRange}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Latest Reading:</span>
              <span className="stat-value">{metricInfo.latestReading}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Trend:</span>
              <span className="stat-value">{metricInfo.trend}</span>
            </div>
          </div>
        </div>
        
        <div className="metric-chart">
          {renderMetricChart()}
        </div>
      </div>
      
      <div className="monitoring-sections">
        <div className="section connected-devices">
          <h2>Connected Devices</h2>
          <div className="devices-list">
            {deviceInfo.map((device, index) => (
              <div key={index} className="device-card">
                <div className="device-header">
                  <h3>{device.name}</h3>
                  <span className={`device-status ${device.status.toLowerCase()}`}>
                    {device.status}
                  </span>
                </div>
                <div className="device-details">
                  <div className="device-info">
                    <span>Last Sync:</span>
                    <span>{device.lastSync}</span>
                  </div>
                  <div className="device-info">
                    <span>Battery:</span>
                    <span>{device.batteryLevel}</span>
                  </div>
                </div>
                <button className="device-button">Sync Now</button>
              </div>
            ))}
          </div>
          <button className="add-device-button">Add New Device</button>
        </div>
        
        <div className="section data-entry">
          <h2>Manual Data Entry</h2>
          <div className="data-entry-form">
            <div className="form-group">
              <label>Metric</label>
              <select className="form-select">
                <option>Blood Pressure</option>
                <option>Heart Rate</option>
                <option>Blood Glucose</option>
                <option>Weight</option>
                <option>Temperature</option>
                <option>Oxygen Saturation</option>
              </select>
            </div>
            <div className="form-group">
              <label>Value</label>
              <input type="text" className="form-input" placeholder="Enter value" />
            </div>
            <div className="form-group">
              <label>Date & Time</label>
              <input type="datetime-local" className="form-input" />
            </div>
            <div className="form-group">
              <label>Notes</label>
              <textarea className="form-textarea" placeholder="Add any additional notes"></textarea>
            </div>
            <button className="form-submit">Save Reading</button>
          </div>
        </div>
      </div>
      
      {userType === 'patient' && (
        <div className="section health-insights">
          <h2>Health Insights</h2>
          <div className="insights-list">
            <div className="insight-card">
              <h3>Improved Blood Pressure</h3>
              <p>Your blood pressure readings have shown improvement over the last 30 days.</p>
              <p className="insight-recommendation">Recommendation: Continue your current medication and exercise routine.</p>
            </div>
            <div className="insight-card">
              <h3>Weight Trend</h3>
              <p>You've lost 4 lbs over the past month, which aligns with your health goals.</p>
              <p className="insight-recommendation">Recommendation: Maintain your current diet and exercise routine.</p>
            </div>
          </div>
        </div>
      )}
      
      {userType === 'provider' && (
        <div className="section patient-monitoring">
          <h2>Patient Monitoring Alerts</h2>
          <div className="alerts-list">
            <div className="alert-card high">
              <div className="alert-header">
                <h3>John Doe - Blood Pressure Alert</h3>
                <span className="alert-timestamp">Today, 07:15 AM</span>
              </div>
              <p>Patient recorded blood pressure of 145/95 mmHg, which is above their target range.</p>
              <div className="alert-actions">
                <button className="alert-button">Contact Patient</button>
                <button className="alert-button">View Details</button>
              </div>
            </div>
            <div className="alert-card medium">
              <div className="alert-header">
                <h3>Sarah Johnson - Missed Readings</h3>
                <span className="alert-timestamp">Yesterday</span>
              </div>
              <p>Patient has not recorded blood glucose readings for 3 consecutive days.</p>
              <div className="alert-actions">
                <button className="alert-button">Send Reminder</button>
                <button className="alert-button">View Details</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Monitoring;
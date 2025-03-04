// components/PatientRecords.js
import React, { useState } from 'react';
import './PatientRecords.css';

const PatientRecords = ({ userType }) => {
  const [activePatient, setActivePatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock patient data
  const patients = [
    { 
      id: 1, 
      name: 'Kalpak K', 
      age: 21, 
      gender: 'Male',
      lastVisit: '2025-02-15',
      conditions: ['Hypertension', 'High Cholesterol'],
      medications: [
        { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily' },
        { name: 'Atorvastatin', dosage: '20mg', frequency: 'Once daily' },
        { name: 'Aspirin', dosage: '81mg', frequency: 'Once daily' }
      ],
      vitals: [
        { date: '2025-02-15', bp: '120/80', hr: 72, temp: 98.6 },
        { date: '2025-01-10', bp: '125/85', hr: 75, temp: 98.4 },
        { date: '2024-12-05', bp: '130/85', hr: 78, temp: 98.7 }
      ],
      notes: [
        { date: '2025-02-15', content: 'Patient reports improved energy levels. Blood pressure well controlled.' },
        { date: '2025-01-10', content: 'Adjustment to medication dosage. Patient to monitor blood pressure daily.' }
      ]
    },
    { 
      id: 2, 
      name: 'Megha M', 
      age: 35, 
      gender: 'Female',
      lastVisit: '2025-02-20',
      conditions: ['Asthma', 'Allergies'],
      medications: [
        { name: 'Albuterol', dosage: '90mcg', frequency: 'As needed' },
        { name: 'Loratadine', dosage: '10mg', frequency: 'Once daily' }
      ],
      vitals: [
        { date: '2025-02-20', bp: '118/75', hr: 68, temp: 98.2 },
        { date: '2025-01-15', bp: '120/78', hr: 70, temp: 98.6 }
      ],
      notes: [
        { date: '2025-02-20', content: 'Asthma well controlled. No exacerbations in the past 3 months.' }
      ]
    }
  ];
  
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const selectPatient = (patient) => {
    setActivePatient(patient);
    setActiveTab('overview');
  };
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  return (
    <div className="patient-records-container">
      <div className="records-sidebar">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="patient-search"
          />
        </div>
        <div className="patients-list">
          {filteredPatients.map(patient => (
            <div
              key={patient.id}
              className={`patient-item ${activePatient && activePatient.id === patient.id ? 'active' : ''}`}
              onClick={() => selectPatient(patient)}
            >
              <div className="patient-name">{patient.name}</div>
              <div className="patient-info">
                {patient.age} • {patient.gender} • Last visit: {patient.lastVisit}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="records-content">
        {activePatient ? (
          <>
            <div className="patient-header">
              <h2>{activePatient.name}</h2>
              <div className="patient-summary">
                {activePatient.age} years old • {activePatient.gender} • Last visit: {activePatient.lastVisit}
              </div>
              <div className="record-actions">
                <button className="action-button">Schedule Appointment</button>
                <button className="action-button">Send Message</button>
                <button className="action-button">Add Note</button>
              </div>
            </div>
            
            <div className="record-tabs">
              <button 
                className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => handleTabChange('overview')}
              >
                Overview
              </button>
              <button 
                className={`tab-button ${activeTab === 'vitals' ? 'active' : ''}`}
                onClick={() => handleTabChange('vitals')}
              >
                Vitals History
              </button>
              <button 
                className={`tab-button ${activeTab === 'medications' ? 'active' : ''}`}
                onClick={() => handleTabChange('medications')}
              >
                Medications
              </button>
              <button 
                className={`tab-button ${activeTab === 'notes' ? 'active' : ''}`}
                onClick={() => handleTabChange('notes')}
              >
                Notes
              </button>
            </div>
            
            <div className="tab-content">
              {activeTab === 'overview' && (
                <div className="overview-tab">
                  <div className="section">
                    <h3>Medical Conditions</h3>
                    <ul className="conditions-list">
                      {activePatient.conditions.map((condition, index) => (
                        <li key={index}>{condition}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="section">
                    <h3>Current Medications</h3>
                    <table className="medications-table">
                      <thead>
                        <tr>
                          <th>Medication</th>
                          <th>Dosage</th>
                          <th>Frequency</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activePatient.medications.map((med, index) => (
                          <tr key={index}>
                            <td>{med.name}</td>
                            <td>{med.dosage}</td>
                            <td>{med.frequency}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="section">
                    <h3>Latest Vitals</h3>
                    <div className="latest-vitals">
                      <div className="vital-card">
                        <span className="vital-value">{activePatient.vitals[0].bp}</span>
                        <span className="vital-label">Blood Pressure</span>
                      </div>
                      <div className="vital-card">
                        <span className="vital-value">{activePatient.vitals[0].hr}</span>
                        <span className="vital-label">Heart Rate</span>
                      </div>
                      <div className="vital-card">
                        <span className="vital-value">{activePatient.vitals[0].temp}°F</span>
                        <span className="vital-label">Temperature</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="section">
                    <h3>Recent Notes</h3>
                    {activePatient.notes.slice(0, 1).map((note, index) => (
                      <div key={index} className="note-item">
                        <div className="note-date">{note.date}</div>
                        <div className="note-content">{note.content}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab === 'vitals' && (
                <div className="vitals-tab">
                  <h3>Vitals History</h3>
                  <table className="vitals-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Blood Pressure</th>
                        <th>Heart Rate</th>
                        <th>Temperature</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activePatient.vitals.map((vital, index) => (
                        <tr key={index}>
                          <td>{vital.date}</td>
                          <td>{vital.bp}</td>
                          <td>{vital.hr} bpm</td>
                          <td>{vital.temp}°F</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              
              {activeTab === 'medications' && (
                <div className="medications-tab">
                  <h3>Current Medications</h3>
                  <table className="medications-table">
                    <thead>
                      <tr>
                        <th>Medication</th>
                        <th>Dosage</th>
                        <th>Frequency</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activePatient.medications.map((med, index) => (
                        <tr key={index}>
                          <td>{med.name}</td>
                          <td>{med.dosage}</td>
                          <td>{med.frequency}</td>
                          <td>
                            <button className="table-action">Renew</button>
                            <button className="table-action">Adjust</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  <div className="medication-actions">
                    <button className="action-button">Add Medication</button>
                    <button className="action-button">Print Prescription</button>
                  </div>
                </div>
              )}
              
              {activeTab === 'notes' && (
                <div className="notes-tab">
                  <h3>Clinical Notes</h3>
                  <div className="notes-list">
                    {activePatient.notes.map((note, index) => (
                      <div key={index} className="note-item">
                        <div className="note-date">{note.date}</div>
                        <div className="note-content">{note.content}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="add-note">
                    <h4>Add New Note</h4>
                    <textarea 
                      className="note-textarea"
                      placeholder="Enter clinical notes here..."
                      rows="4"
                    ></textarea>
                    <button className="action-button">Save Note</button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="no-patient-selected">
            <p>Select a patient to view their records</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientRecords;
// components/Appointments.js
import React, { useState } from 'react';
import './Appointments.css';

const Appointments = ({ userType }) => {
  const [view, setView] = useState('upcoming');
  const [showScheduler, setShowScheduler] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Mock appointment data
  const appointments = {
    upcoming: [
      {
        id: 1,
        date: '2025-03-05',
        time: '14:00',
        duration: '30 minutes',
        provider: 'Dr. Michael Smith',
        patient: 'John Doe',
        type: 'Follow-up',
        specialty: 'Cardiology',
        status: 'Confirmed'
      },
      {
        id: 2,
        date: '2025-03-12',
        time: '10:30',
        duration: '45 minutes',
        provider: 'Dr. Rebecca Chen',
        patient: 'John Doe',
        type: 'General Check-up',
        specialty: 'Internal Medicine',
        status: 'Confirmed'
      }
    ],
    past: [
      {
        id: 3,
        date: '2025-02-15',
        time: '11:00',
        duration: '30 minutes',
        provider: 'Dr. Michael Smith',
        patient: 'John Doe',
        type: 'Follow-up',
        specialty: 'Cardiology',
        status: 'Completed',
        notes: 'Discussed medication adjustments. Patient showing improvement.'
      },
      {
        id: 4,
        date: '2025-01-20',
        time: '09:15',
        duration: '60 minutes',
        provider: 'Dr. James Wilson',
        patient: 'John Doe',
        type: 'Annual Physical',
        specialty: 'Internal Medicine',
        status: 'Completed',
        notes: 'Comprehensive check-up performed. Blood tests ordered.'
      }
    ]
  };
  
  // Mock available time slots
  const availableTimeSlots = [
    { time: '09:00', available: true },
    { time: '09:30', available: true },
    { time: '10:00', available: false },
    { time: '10:30', available: true },
    { time: '11:00', available: true },
    { time: '11:30', available: false },
    { time: '13:00', available: true },
    { time: '13:30', available: true },
    { time: '14:00', available: false },
    { time: '14:30', available: true },
    { time: '15:00', available: true },
    { time: '15:30', available: true },
    { time: '16:00', available: true },
    { time: '16:30', available: false }
  ];
  
  // Mock provider data (for scheduling)
  const providers = [
    { id: 1, name: 'Dr. Michael Smith', specialty: 'Cardiology' },
    { id: 2, name: 'Dr. Rebecca Chen', specialty: 'Internal Medicine' },
    { id: 3, name: 'Dr. James Wilson', specialty: 'Internal Medicine' },
    { id: 4, name: 'Dr. Sarah Johnson', specialty: 'Endocrinology' },
    { id: 5, name: 'Dr. Robert Davis', specialty: 'Pulmonology' }
  ];
  
  // Format date for display
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Toggle appointment view
  const toggleView = (newView) => {
    setView(newView);
  };
  
  // Show appointment scheduler
  const openScheduler = () => {
    setShowScheduler(true);
  };
  
  // Close appointment scheduler
  const closeScheduler = () => {
    setShowScheduler(false);
  };
  
  // Navigate to previous month in calendar
  const prevMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setSelectedDate(newDate);
  };
  
  // Navigate to next month in calendar
  const nextMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setSelectedDate(newDate);
  };
  
  // Generate calendar for the selected month
  const generateCalendar = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    
    // Get first day of month and number of days in month
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const calendar = [];
    let dayCount = 1;
    
    // Create weeks
    for (let i = 0; i < 6; i++) {
      const week = [];
      
      // Create days in a week
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          // Empty cells before first day of month
          week.push(null);
        } else if (dayCount > daysInMonth) {
          // Empty cells after last day of month
          week.push(null);
        } else {
          // Valid day in month
          const currentDate = new Date(year, month, dayCount);
          const today = new Date();
          const isToday = currentDate.getDate() === today.getDate() && 
                          currentDate.getMonth() === today.getMonth() && 
                          currentDate.getFullYear() === today.getFullYear();
                          
          // Check if there's an appointment on this day
          const hasAppointment = appointments.upcoming.some(app => {
            const appDate = new Date(app.date);
            return appDate.getDate() === currentDate.getDate() && 
                   appDate.getMonth() === currentDate.getMonth() && 
                   appDate.getFullYear() === currentDate.getFullYear();
          });
          
          week.push({ 
            day: dayCount, 
            date: currentDate,
            isToday,
            hasAppointment
          });
          dayCount++;
        }
      }
      
      calendar.push(week);
      
      // Stop if we've already included all days
      if (dayCount > daysInMonth) {
        break;
      }
    }
    
    return calendar;
  };
  
  const calendar = generateCalendar();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                      'July', 'August', 'September', 'October', 'November', 'December'];
  
  return (
    <div className="appointments-container">
      <div className="appointments-header">
        <h1>Appointments</h1>
        <button className="schedule-button" onClick={openScheduler}>
          Schedule New Appointment
        </button>
      </div>
      
      <div className="appointments-view-toggle">
        <button 
          className={`view-button ${view === 'upcoming' ? 'active' : ''}`}
          onClick={() => toggleView('upcoming')}
        >
          Upcoming
        </button>
        <button 
          className={`view-button ${view === 'past' ? 'active' : ''}`}
          onClick={() => toggleView('past')}
        >
          Past
        </button>
      </div>
      
      <div className="appointments-content">
        <div className="appointments-calendar">
          <div className="calendar-header">
            <button className="calendar-nav" onClick={prevMonth}>&lt;</button>
            <h2>{monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}</h2>
            <button className="calendar-nav" onClick={nextMonth}>&gt;</button>
          </div>
          
          <div className="calendar-grid">
            <div className="calendar-weekdays">
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>
            
            <div className="calendar-days">
              {calendar.map((week, weekIndex) => (
                <div key={`week-${weekIndex}`} className="calendar-week">
                  {week.map((day, dayIndex) => (
                    <div 
                      key={`day-${weekIndex}-${dayIndex}`} 
                      className={`calendar-day ${day === null ? 'empty' : ''} ${day?.isToday ? 'today' : ''} ${day?.hasAppointment ? 'has-appointment' : ''}`}
                    >
                      {day !== null && day.day}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          
          <div className="calendar-legend">
            <div className="legend-item">
              <div className="legend-color today"></div>
              <span>Today</span>
            </div>
            <div className="legend-item">
              <div className="legend-color has-appointment"></div>
              <span>Appointment Scheduled</span>
            </div>
          </div>
        </div>
        
        <div className="appointments-list">
          <h2>{view === 'upcoming' ? 'Upcoming Appointments' : 'Past Appointments'}</h2>
          
          {appointments[view].length > 0 ? (
            <div className="appointments-cards">
              {appointments[view].map(appointment => (
                <div key={appointment.id} className="appointment-card">
                  <div className="appointment-date">
                    {formatDate(appointment.date)}
                  </div>
                  <div className="appointment-time">
                    {appointment.time} ({appointment.duration})
                  </div>
                  <div className="appointment-details">
                    <div className="detail-row">
                      <span className="detail-label">
                        {userType === 'patient' ? 'Provider:' : 'Patient:'}
                      </span>
                      <span className="detail-value">
                        {userType === 'patient' ? appointment.provider : appointment.patient}
                      </span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Type:</span>
                      <span className="detail-value">{appointment.type}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Specialty:</span>
                      <span className="detail-value">{appointment.specialty}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Status:</span>
                      <span className={`status-badge ${appointment.status.toLowerCase()}`}>
                        {appointment.status}
                      </span>
                    </div>
                  </div>
                  
                  {view === 'upcoming' && (
                    <div className="appointment-actions">
                      <button className="action-button primary">
                        {new Date(appointment.date + 'T' + appointment.time) <= new Date(new Date().getTime() + 15 * 60000) 
                          ? 'Join Now' 
                          : 'Reschedule'
                        }
                      </button>
                      <button className="action-button secondary">Cancel</button>
                    </div>
                  )}
                  
                  {view === 'past' && appointment.notes && (
                    <div className="appointment-notes">
                      <h4>Notes:</h4>
                      <p>{appointment.notes}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="no-appointments">
              <p>No {view} appointments found.</p>
            </div>
          )}
        </div>
      </div>
      
      {showScheduler && (
        <div className="appointment-scheduler-overlay">
          <div className="appointment-scheduler">
            <div className="scheduler-header">
              <h2>Schedule New Appointment</h2>
              <button className="close-scheduler" onClick={closeScheduler}>×</button>
            </div>
            
            <div className="scheduler-content">
              <div className="scheduler-form">
                <div className="form-group">
                  <label>Appointment Type</label>
                  <select className="form-control">
                    <option>Regular Check-up</option>
                    <option>Follow-up</option>
                    <option>Specialist Consultation</option>
                    <option>Urgent Care</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Healthcare Provider</label>
                  <select className="form-control">
                    {providers.map(provider => (
                      <option key={provider.id} value={provider.id}>
                        {provider.name} - {provider.specialty}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Select Date</label>
                  <input type="date" className="form-control" />
                </div>
                
                <div className="form-group">
                  <label>Available Time Slots</label>
                  <div className="time-slots">
                    {availableTimeSlots.map((slot, index) => (
                      <button 
                        key={index} 
                        className={`time-slot ${!slot.available ? 'unavailable' : ''}`}
                        disabled={!slot.available}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Reason for Visit</label>
                  <textarea 
                    className="form-control" 
                    placeholder="Please describe the reason for this appointment..."
                    rows="3"
                  ></textarea>
                </div>
                
                <div className="form-group">
                  <label>Preferred Contact Method</label>
                  <div className="contact-options">
                    <label className="radio-option">
                      <input type="radio" name="contact" value="email" checked />
                      Email
                    </label>
                    <label className="radio-option">
                      <input type="radio" name="contact" value="phone" />
                      Phone
                    </label>
                    <label className="radio-option">
                      <input type="radio" name="contact" value="sms" />
                      SMS
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="scheduler-summary">
                <h3>Appointment Summary</h3>
                <div className="summary-item">
                  <span>Provider:</span>
                  <span>Dr. Michael Smith - Cardiology</span>
                </div>
                <div className="summary-item">
                  <span>Date:</span>
                  <span>March 10, 2025</span>
                </div>
                <div className="summary-item">
                  <span>Time:</span>
                  <span>10:30 AM</span>
                </div>
                <div className="summary-item">
                  <span>Type:</span>
                  <span>Follow-up</span>
                </div>
                <div className="summary-item">
                  <span>Location:</span>
                  <span>Virtual (Video Consultation)</span>
                </div>
                
                <div className="appointment-info">
                  <p>You will receive a confirmation email with details and instructions for joining the virtual appointment.</p>
                  <p>You can cancel or reschedule this appointment up to 24 hours before the scheduled time.</p>
                </div>
                
                <button className="confirm-appointment-button">
                  Confirm Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
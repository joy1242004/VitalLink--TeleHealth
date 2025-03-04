import React, { useState } from 'react';
import './Consultation.css';

const Consultation = ({ userType }) => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'system', text: 'Welcome to your virtual consultation.' },
  ]);
  const [messageInput, setMessageInput] = useState('');

  // Add your call URL and API Key below:
  const callRoomUrl = 'https://vitallink.daily.co/OfHhJYn116MkHDRx8uoW'; // Replace with your call URL
  const apiKey = '43b22d0d343f3892c78719fb7427e5e4f4249255612d26fd3f60e50d4e174720'; // Replace with your API key

  // Start the call by embedding the iframe
  const startCall = () => {
    setIsCallActive(true);
  };

  // End the call and remove the iframe
  const endCall = () => {
    setIsCallActive(false);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    // Add user message
    const newMessage = {
      sender: userType,
      text: messageInput,
    };

    setChatMessages([...chatMessages, newMessage]);
    setMessageInput('');

    // Simulate response from other party
    setTimeout(() => {
      const responseMessage = {
        sender: userType === 'patient' ? 'provider' : 'patient',
        text: userType === 'patient'
          ? 'Thank you for your message. How have you been feeling since our last appointment?'
          : 'I\'ve been taking my medication regularly. The symptoms have improved.',
      };
      setChatMessages(prevMessages => [...prevMessages, responseMessage]);
    }, 1000);
  };

  return (
    <div className="consultation-container">
      <div className="consultation-header">
        <h1>Virtual Consultation</h1>
        {!isCallActive && (
          <div className="pre-call-info">
            <p>Meeting with: {userType === 'patient' ? 'Dr. Smith' : 'John Doe'}</p>
            <p>Scheduled for: March 5, 2025 - 2:00 PM</p>
            <button className="start-call-button" onClick={startCall}>Start Consultation</button>
          </div>
        )}
      </div>
      
      {isCallActive && (
        <div className="video-call-container">
          <div className="video-screens">
            <div className="main-video">
              {/* Embed iframe directly here with camera/microphone permission */}
              <iframe
                src={`${callRoomUrl}?apiKey=${apiKey}`}
                width="100%"
                height="100%"
                style={{ border: 'none' }}
                title="Video Consultation"
                allow="camera; microphone; autoplay"
              ></iframe>
            </div>
            <div className="self-video">
              {/* This would be the user's own video stream */}
              <div className="placeholder-video small">
                <span></span>
              </div>
            </div>
          </div>
          
          <div className="call-controls">
            <button className="control-button mic">
              <i className="icon-mic"></i>
            </button>
            <button className="control-button camera">
              <i className="icon-camera"></i>
            </button>
            <button className="control-button share">
              <i className="icon-screen-share"></i>
            </button>
            <button className="control-button chat" onClick={toggleChat}>
              <i className="icon-chat"></i>
            </button>
            <button className="control-button end-call" onClick={endCall}>
              End Call
            </button>
          </div>
          
          {isChatOpen && (
            <div className="chat-panel">
              <div className="chat-header">
                <h3>Chat</h3>
                <button className="close-chat" onClick={toggleChat}>×</button>
              </div>
              <div className="chat-messages">
                {chatMessages.map((message, index) => (
                  <div key={index} className={`message ${message.sender}`}>
                    <span className="message-text">{message.text}</span>
                  </div>
                ))}
              </div>
              <form className="chat-input" onSubmit={sendMessage}>
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                />
                <button type="submit">Send</button>
              </form>
            </div>
          )}
        </div>
      )}
      
      {!isCallActive && (
        <div className="consultation-features">
          <div className="feature-card">
            <h3>Pre-Consultation Questionnaire</h3>
            <p>Fill out important health information before your appointment</p>
            <button className="feature-button">Complete Questionnaire</button>
          </div>
          <div className="feature-card">
            <h3>Share Medical Records</h3>
            <p>Grant access to specific health records for this consultation</p>
            <button className="feature-button">Select Records</button>
          </div>
          <div className="feature-card">
            <h3>Test Connection</h3>
            <p>Verify your audio, video, and internet connection before the call</p>
            <button className="feature-button">Start Test</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Consultation;

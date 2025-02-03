import './App.css';
import Sidebar from './components/Sidebar';
import ChatBox from './components/ChatBox';
import message from './images/message.png';
import { Routes, Route } from 'react-router-dom';
import BlankPage from './components/BlankPage';
import React, { useState } from 'react';

function App() {
  const [messageSent, setMessageSent] = useState(false);

  const handleSendMessage = () => {
    setMessageSent(true); // Message sent, heading disappears
  };

  return (
    <div className="container">
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* Conditionally render the header */}
                <div className={`header heading ${messageSent ? 'hidden' : ''}`}>
                  <img src={message} alt="message" className="message-icon" />
                  How can I help with?
                </div>

                <ChatBox onSendMessage={handleSendMessage} messageSent={messageSent} />
              </>
            }
          />

          <Route path="/blank" element={<BlankPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

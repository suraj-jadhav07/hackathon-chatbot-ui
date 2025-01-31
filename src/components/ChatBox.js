import React, { useState } from "react";
import  '../styles/ChatBox.css';

const ChatBox = () => {
    const [message, setMessage] = useState("");

    const sendMessage = () => {
      if (message.trim()) {
        console.log("Sending message:", message);
        setMessage(""); // Clear input after sending
      }
    };
  return (
    <div className="chat-input">
    <input
      type="text"
      placeholder="Message ChatGPT"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
    />
    <button className="send-btn" onClick={sendMessage}>➤</button>
  </div>
  );
};

export default ChatBox;

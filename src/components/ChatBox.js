import React, { useState } from "react";
import "../styles/ChatBox.css";
import { Edit, Delete } from "@mui/icons-material"; // Import Material UI icons

const ChatBox = ({ onSendMessage, messageSent }) => {
  const [message, setMessage] = useState("");
  const [sentMessages, setSentMessages] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const sendMessage = () => {
    if (message.trim()) {
      if (editingIndex !== null) {
        // Edit message if we're in editing mode
        const updatedMessages = [...sentMessages];
        updatedMessages[editingIndex] = message;
        setSentMessages(updatedMessages);
        setEditingIndex(null); // Reset editing mode
      } else {
        // Add new message if not editing
        setSentMessages([...sentMessages, message]);
      }
      setMessage(""); // Clear input after sending
      onSendMessage(); // Call to update messageSent state in App.js
    }
  };

  const handleDeleteMessage = (index) => {
    const updatedMessages = sentMessages.filter((_, i) => i !== index);
    setSentMessages(updatedMessages);
  };

  const handleEditMessage = (index) => {
    setMessage(sentMessages[index]);
    setEditingIndex(index);
  };

  return (
    <div className="chat-box">
      <div className="chat-history">
        {sentMessages.map((msg, index) => (
          <div key={index} className="chat-message">
            {msg}
            <div className="message-actions">
              <span onClick={() => handleEditMessage(index)} className="edit-icon">
                <Edit fontSize="small" />
              </span>
              <span onClick={() => handleDeleteMessage(index)} className="delete-icon">
                <Delete fontSize="small" />
              </span>
            </div>
          </div>
        ))}
      </div>

      <div
        className="chat-input"
        style={{ marginTop: messageSent ? "25rem" : "20px" }} // Adjust margin-top based on messageSent
      >
        <input
          type="text"
          placeholder="Message ChatGPT"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="send-btn" onClick={sendMessage}>
          ➤
        </button>
      </div>
    </div>
  );
};

export default ChatBox;

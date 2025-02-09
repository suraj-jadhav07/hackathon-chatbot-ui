import React, { useState } from "react";
import "../styles/ChatBox.css";
import { Edit, Delete } from "@mui/icons-material";

const ChatBox = () => {
  const [chats, setChats] = useState({ "Chat 1": [] });
  const [activeChat, setActiveChat] = useState("Chat 1");
  const [message, setMessage] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [isEmailEnabled, setIsEmailEnabled] = useState(false); // Send Email button state

  const sendMessage = () => {
    if (message.trim()) {
      const userMessage = { text: message, sender: "user" };

      setChats((prevChats) => {
        const updatedChat = [...prevChats[activeChat], userMessage];
        return { ...prevChats, [activeChat]: updatedChat };
      });

      setTimeout(() => {
        const botResponse = { text: "Hello, how can I help you?", sender: "bot" };
        setChats((prevChats) => {
          const updatedChat = [...prevChats[activeChat], botResponse];
          return { ...prevChats, [activeChat]: updatedChat };
        });

        setIsEmailEnabled(true); // Enable "Send Email" when bot responds
      }, 500);

      setMessage("");
      setEditingIndex(null);
    }
  };

  const handleDeleteMessage = (index) => {
    setChats((prevChats) => ({
      ...prevChats,
      [activeChat]: prevChats[activeChat].filter((_, i) => i !== index),
    }));
  };

  const handleEditMessage = (index) => {
    setMessage(chats[activeChat][index].text);
    setEditingIndex(index);
  };

  return (
    <div className="chat-box-container">
      <div className="chat-box-wrapper">
        {chats[activeChat].length === 0 && (
          <div className="chat-placeholder">How can I help you?</div>
        )}

        <div className="chat-history">
          {chats[activeChat].map((msg, index) => (
            <div
              key={index}
              className={`chat-message-container ${msg.sender === "user" ? "user-align" : "bot-align"}`}
            >
              <div className={`chat-message ${msg.sender}`}>
                <p>{msg.text}</p>
                <div className="message-actions">
                  <span onClick={() => handleEditMessage(index)} className="edit-icon">
                    <Edit fontSize="small" />
                  </span>
                  <span onClick={() => handleDeleteMessage(index)} className="delete-icon">
                    <Delete fontSize="small" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input field */}
        <div className="chat-input-container">
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
        </div>

        {/* Buttons in a separate row */}
        <div className="chat-button-container">
          <button className="chat-box-submit-btn" onClick={sendMessage}>
            Send Message
          </button>
          <button className="chat-box-email-btn" disabled={!isEmailEnabled}>
            Send Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;

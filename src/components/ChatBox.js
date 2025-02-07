import React, { useState } from "react";
import "../styles/ChatBox.css";
import { Edit, Delete, Send  } from "@mui/icons-material";
import Sidebar from '../components/Sidebar';

const ChatBox = () => {
  const [chats, setChats] = useState({ "Chat 1": [] }); // Store multiple chats
  const [activeChat, setActiveChat] = useState("Chat 1"); // Track current chat
  const [message, setMessage] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  // Send message in the active chat
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
        }, 500); // Simulate bot response delay
  
        setMessage("");
        setEditingIndex(null);
      }
    }

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

  const handleNewChat = () => {
    const newChatName = `Chat ${Object.keys(chats).length + 1}`;
    setChats({ ...chats, [newChatName]: [] }); // Add new chat with empty messages
    setActiveChat(newChatName); // Switch to new chat
  };

  return (
    <>
      {/* Pass chat history and activeChat setter to Sidebar */}
      <Sidebar chats={Object.keys(chats)} activeChat={activeChat} setActiveChat={setActiveChat} handleNewChat={handleNewChat} />

      <div className="main-div">
        {chats[activeChat].length === 0 && (
        <div className="message-container">

          <span className="display-text">How can I help with?</span>
        </div>
        )}

        <div className="chat-box">
          <div className="chat-history">
            {chats[activeChat].map((msg, index) => (
               <div key={index} className={`chat-message-container ${msg.sender}`}>
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

          <div className="chat-input">
            <input
              type="text"
              placeholder="Message ChatBox"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className="send-btn" onClick={sendMessage}>
            <Send fontSize="medium" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBox;

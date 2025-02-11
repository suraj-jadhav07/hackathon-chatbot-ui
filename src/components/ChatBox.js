import React, { useState } from "react";
import "../styles/ChatBox.css";
import { Edit, Delete } from "@mui/icons-material";
import axios from "axios";
import { API_CONST } from "../core/constants";
import bot from "../images/chat-loader.webp"

const ChatBox = () => {
  const [chats, setChats] = useState({ "Chat 1": [] });
  const [activeChat, setActiveChat] = useState("Chat 1");
  const [message, setMessage] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [isEmailEnabled, setIsEmailEnabled] = useState(false); // Send Email button state
  const [examName, setExamName] = useState("");
  const [currentChat, setCurrentChat] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = () => {
    if (message.trim()) {
      setLoading(true);
      const userMessage = { text: message, sender: "user" };

      setChats((prevChats) => {
        const updatedChat = [...prevChats[activeChat], userMessage];
        return { ...prevChats, [activeChat]: updatedChat };
      });
      axios
        .post(API_CONST.ASK_QUESTIONS, {
          question: message
        })
        .then((response) => {

          const botResponse = { text: response.data.answer, sender: "bot" };
          setCurrentChat(response.data.answer);
          setLoading(false);
          setChats((prevChats) => {
            const updatedChat = [...prevChats[activeChat], botResponse];
            return { ...prevChats, [activeChat]: updatedChat };
          });
          setIsEmailEnabled(true); // Enable "Send Email" when bot responds
          setMessage("");
          setEditingIndex(null);
        })
        .catch((error) => {
          console.error("Questions generation failed", error.response?.data || error.message);
          setLoading(false);
        });
    }
  };

  const sendMail = () => {

const questionsArray = currentChat
  .split(/\d+\.\s*/) // Splits at numbers followed by ". "
  .filter(q => q.trim() !== "") // Removes empty entries

  if (!examName.trim()) {
    setError("Exam name is required.");
    return;
  }
    axios
      .post(API_CONST.CREATE_AND_ASSIGN_EXAM, {
        user_id: localStorage.getItem('userId'),
        title: examName, 
        questions: questionsArray,
      })
      .then((response) => {
        console.log("Email sent successfully:", response.data);
        setError(""); // Clear error if input is valid
        setShowModal(true);
        setExamName(""); 
      })
      .catch((error) => {
        console.error("Failed to send email:", error.response?.data || error.message);
      });
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
      <div className="chat-box-header">
        <h1>Arieo Iris Bot</h1>
        <p>Chat with me to create your exam</p>
      </div>
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
                <div key={index}>
                  {msg.text.split("\n").map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
                <div className="message-actions">
                  {msg.sender === "user" ? <>
                    <span onClick={() => handleEditMessage(index)} className="edit-icon">
                      <Edit fontSize="small" />
                    </span>
                    <span onClick={() => handleDeleteMessage(index)} className="delete-icon">
                      <Delete fontSize="small" />
                    </span></> : ""}
                </div>
              </div>
            </div>
          ))}
          {/* Loader Displayed While Waiting for Response */}
          {loading && (
                  <div className="chat-message-container bot-align">
                    <div className="chat-message bot">
                      <img src={bot} alt="Loading..." className="bot-loader" />
                    </div>
                  </div>
                )}
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

        {/* Show Exam Name Input When Send Email is Enabled */}
        {isEmailEnabled && (
          <div className="exam-input-container">
            <input
              type="text"
              placeholder="Enter Exam Name..."
              value={examName}
              onChange={(e) => setExamName(e.target.value)}
              className={`exam-input ${error ? "input-error" : ""}`} // Apply error class conditionally
            />
               {error && <p className="error-text">{error}</p>} {/* Error message on the next line */}
          </div>
        )}

        {/* Buttons in a separate row */}
        <div className="chat-button-container">
          <button className="chat-box-submit-btn" onClick={sendMessage}>
          {loading ? "Waiting..." : "Send Message"}
          </button>
          <button className="chat-box-email-btn" disabled={!isEmailEnabled} onClick={sendMail}>
            Send Email
          </button>

        </div>

           {/* Modal Dialog */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Email Sent Successfully! ✅</h3>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
      </div>
    </div>
    
  );
};

export default ChatBox;

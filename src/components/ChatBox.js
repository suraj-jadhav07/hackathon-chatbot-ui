import React, { useState } from "react";
import "../styles/ChatBox.css";
import { Edit, Delete, AttachFile } from "@mui/icons-material"; // Import Material UI icons

const ChatBox = ({ onSendMessage, messageSent }) => {
  const [message, setMessage] = useState("");
  const [sentMessages, setSentMessages] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [attachments, setAttachments] = useState([]);

  const sendMessage = () => {
    if (message.trim() || attachments.length) {
      const newMessage = { text: message, files: attachments };

      if (editingIndex !== null) {
        const updatedMessages = [...sentMessages];
        updatedMessages[editingIndex] = newMessage;
        setSentMessages(updatedMessages);
        setEditingIndex(null);
      } else {
        setSentMessages([...sentMessages, newMessage]);
      }
      setMessage("");
      setAttachments([]);
      onSendMessage();
    }
  };

  const handleDeleteMessage = (index) => {
    setSentMessages(sentMessages.filter((_, i) => i !== index));
  };

  const handleEditMessage = (index) => {
    setMessage(sentMessages[index].text);
    setAttachments(sentMessages[index].files);
    setEditingIndex(index);
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    console.log("Uploaded files:", files);
    setAttachments([...attachments, ...files]);
  };
  
  return (
    <div className="chat-box">
      <div className="chat-history">
        {sentMessages.map((msg, index) => (
          <div key={index} className="chat-message">
            <p>{msg.text}</p>
            <div className="attachments">
              {msg.files.map((file, i) => (
               <div key={i} className="file-preview">
               {file.type.startsWith("image/") ? (
                 <img src={URL.createObjectURL(file)} alt="attachment" className="image-preview" />
               ) : (
                 <a href={URL.createObjectURL(file)} target="_blank" rel="noopener noreferrer">
                   📎 {file.name}
                 </a>
               )}
             </div>
             
              ))}
            </div>
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

      <div className="chat-input" style={{ marginTop: messageSent ? "25rem" : "20px" }}>
        <input
          type="text"
          placeholder="Message ChatBox"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input
          type="file"
          multiple
          accept="image/*,.pdf,.doc,.docx"
          onChange={handleFileUpload}
          style={{ display: "none" }}
          id="file-upload"
        />
        <label htmlFor="file-upload" className="attach-btn">
          <AttachFile />
        </label>
        <button className="send-btn" onClick={sendMessage}>
          ➤
        </button>
      </div>
    </div>
  );
};

export default ChatBox;

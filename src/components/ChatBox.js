import React, { useState } from "react";
import "../styles/ChatBox.css";
import { Edit, Delete, AttachFile, Close, Send } from "@mui/icons-material";
import Sidebar from "../components/Sidebar";

const ChatBox = () => {
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
    }
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setAttachments([...attachments, ...files]);
  };

  const removeAttachment = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  return (
    <>
      <Sidebar />
      <div className="main-div">
        {/* Message Header */}
        <div className="message-container">
          <span className="display-text">How can I help with?</span>
        </div>

        {/* Chat Box */}
        <div className="chat-box">
          {/* Chat History */}
          <div className="chat-history">
            {sentMessages.map((msg, index) => (
              <div key={index} className="chat-message">
                <p>{msg.text}</p>

                {/* Attachments inside Sent Messages */}
      {msg.files.length > 0 && (
        <div className="sent-attachments">
          {msg.files.map((fileObj, i) => (
            <div key={i} className="sent-thumbnail">
              {fileObj.file.type.startsWith("image/") ? (
                <img src={fileObj.url} alt="attachment" className="sent-image" />
              ) : (
                <a href={fileObj.url} target="_blank" rel="noopener noreferrer">
                  📎 {fileObj.file.name}
                </a>
              )}
            </div>
          ))}
        </div>
      )}
                <div className="message-actions">
                  <span onClick={() => setEditingIndex(index)} className="edit-icon">
                    <Edit fontSize="small" />
                  </span>
                  <span onClick={() => setSentMessages(sentMessages.filter((_, i) => i !== index))} className="delete-icon">
                    <Delete fontSize="small" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input Box */}
          <div className="chat-input">
            <div className="input-container">
              {/* Attachments Preview */}
              {attachments.length > 0 && (
                <div className="attachment-preview">
                  {attachments.map((fileObj, index) => (
                    <div key={index} className="attachment-thumbnail">
                      {fileObj.file.type.startsWith("image/") ? (
                        <img
                          src={fileObj.url}
                          alt="preview"
                          className="preview-image"
                        />
                      ) : (
                        <span>{fileObj.file.name}</span>
                      )}
                      <Close
                        fontSize="small"
                        className="remove-attachment"
                        onClick={() => removeAttachment(index)}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Input Field */}
              <input
                type="text"
                placeholder="Message ChatBox"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              {/* File Upload */}
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

              {/* Send Button */}
              <button className="send-btn" onClick={sendMessage}>
                <Send fontSize="medium" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBox;

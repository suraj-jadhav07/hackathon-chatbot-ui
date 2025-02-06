import React, { useState } from "react";
import "../styles/ChatBox.css";
import { Edit, Delete, AttachFile } from "@mui/icons-material"; // Import Material UI icons
// import msg_icon from "../images/message.png"
import Sidebar from '../components/Sidebar';


const ChatBox = ({ onSendMessage, messageSent }) => {
  const [message, setMessage] = useState("");
  const [sentMessages, setSentMessages] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = { text: message};

      if (editingIndex !== null) {
        const updatedMessages = [...sentMessages];
        updatedMessages[editingIndex] = newMessage;
        setSentMessages(updatedMessages);
        setEditingIndex(null);
      } else {
        setSentMessages([...sentMessages, newMessage]);
      }
      setMessage("");
      // onSendMessage();
    }
  };

  const handleDeleteMessage = (index) => {
    setSentMessages(sentMessages.filter((_, i) => i !== index));
  };

  const handleEditMessage = (index) => {
    setMessage(sentMessages[index].text);
    setEditingIndex(index);
  };

//   <div className={`header heading ${messageSent ? 'hidden' : ''}`}>
//   <img src={message} alt="message" className="message-icon" />
//   How can I help with?
// </div>
// </div>
                      // <ChatBox onSendMessage={handleSendMessage} messageSent={messageSent} />

//   return (
//     <><div className="main-div">
//       {/* <div className="message-icon"><img src={msg_icon} alt="message" /></div> */}
//       <div className="display-text" img src={msg_icon} alt="message" />How can I help with?</div>

//     {/* </div> */}
//       <div className="chat-box">
//         <div className="chat-history">
//           {sentMessages.map((msg, index) => (
//             <div key={index} className="chat-message">
//               <p>{msg.text}</p>
//               <div className="attachments">
//                 {msg.files.map((file, i) => (
//                   <div key={i} className="file-preview">
//                     {file.type.startsWith("image/") ? (
//                       <img src={URL.createObjectURL(file)} alt="attachment" className="image-preview" />
//                     ) : (
//                       <a href={URL.createObjectURL(file)} target="_blank" rel="noopener noreferrer">
//                         📎 {file.name}
//                       </a>
//                     )}
//                   </div>

//                 ))}
//               </div>
//               <div className="message-actions">
//                 <span onClick={() => handleEditMessage(index)} className="edit-icon">
//                   <Edit fontSize="small" />
//                 </span>
//                 <span onClick={() => handleDeleteMessage(index)} className="delete-icon">
//                   <Delete fontSize="small" />
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="chat-input" style={{ marginTop: messageSent ? "25rem" : "20px" }}>
//           <input
//             type="text"
//             placeholder="Message ChatBox"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)} />
//           <input
//             type="file"
//             multiple
//             accept="image/*,.pdf,.doc,.docx"
//             onChange={handleFileUpload}
//             style={{ display: "none" }}
//             id="file-upload" />
//           <label htmlFor="file-upload" className="attach-btn">
//             <AttachFile />
//           </label>
//           <button className="send-btn" onClick={sendMessage}>
//             ➤
//           </button>
//         </div>
//       </div>
//       </>
//   );
// };

return (
  <>
        <Sidebar />

    <div className="main-div">
      {/* Message Container - Holds both the icon and text side by side */}
      <div className="message-container">
  {/* Message Icon */}
  {/* <img src={msg_icon} alt="message" className="message-icon" /> */}

  {/* Display Text */}
  <span className="display-text">How can I help with?</span>
</div>


      {/* Chat Box */}
      <div className="chat-box">
        <div className="chat-history">
          {sentMessages.map((msg, index) => (
            <div key={index} className="chat-message">
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
          ))}
        </div>

        {/* Chat Input */}
        <div className="chat-input">
          <input
            type="text"
            placeholder="Message ChatBox"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="send-btn" onClick={sendMessage}>
            ➤
          </button>
        </div>
      </div>
    </div>
  </>
);

}


export default ChatBox;

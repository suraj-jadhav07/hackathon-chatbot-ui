import React, { useState } from 'react';
import '../styles/Sidebar.css';
import hamburgerIcon from '../images/Hamburger.png';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [chats, setChats] = useState(["Chat 1", "Chat 2", "Chat 3"]); // Example chats

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleNewChat = () => {
    const newChatName = `Chat ${chats.length + 1}`;
    setChats([...chats, newChatName]); // Adds a new chat to the list
  };

  return (
    <div>
      {/* Hamburger Icon - Visible when sidebar is closed */}
      {!isOpen && (
        <img 
          src={hamburgerIcon} 
          alt="Open Sidebar" 
          className="hamburger-icon" 
          onClick={toggleSidebar} 
        />
      )}

      {/* Sidebar Menu */}
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        {/* Close Icon inside Sidebar */}
        <img 
          src={hamburgerIcon} 
          alt="Close Sidebar" 
          className="hamburger-icon sidebar-close-icon" 
          onClick={toggleSidebar} 
        />

        {/* Search Bar */}
        <input 
          type="text" 
          placeholder="🔍 Search chats..." 
          className="search-bar" 
          value={searchTerm} 
          onChange={handleSearch} 
        />

        {/* New Chat Button */}
        <button className="new-chat-btn" onClick={handleNewChat}>➕ New Chat</button>

        {/* Chat List */}
        <ul className="chat-list">
          {chats
            .filter(chat => chat.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((chat, index) => (
              <li key={index} className="chat-item">
                🗨️ {chat}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

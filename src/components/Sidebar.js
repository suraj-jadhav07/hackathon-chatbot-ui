import React, { useState, useEffect } from 'react';
import '../styles/Sidebar.css';
import hamburgerIcon from '../images/Hamburger.png';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuIcon from "@mui/icons-material/Menu";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { IconButton } from "@mui/material";
import { Chat, Add } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ chats, activeChat, setActiveChat, handleNewChat }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
 
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // If the user is logged out, clear sidebar state
    if (!isLoggedIn) {
      setIsOpen(false);
      localStorage.removeItem('sidebarState');  // Clear the sidebar state from localStorage
    } else {
      // If logged in, check localStorage for sidebar state
      const storedSidebarState = localStorage.getItem('sidebarState');
      if (storedSidebarState) {
        setIsOpen(JSON.parse(storedSidebarState));  // Parse and set state from localStorage
      }
    }
  }, [isLoggedIn]);

  const toggleSidebar = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    localStorage.setItem('sidebarState', JSON.stringify(newState));  // Save the new state in localStorage
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };



  const handleLogout = () => {
    console.log("User logged out");
    setIsLoggedIn(false);
    localStorage.removeItem('sidebarState');
    navigate('/');
  };

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-mode", !isDarkMode);
  };

  // If user is logged out, don't render the sidebar
  if (!isLoggedIn) return null;

  return (
    <div>
      {/* Hamburger Icon - Visible when sidebar is closed */}
      <div className={`hamburger-icon ${isDarkMode ? 'dark-mode' : ''}`}>
      {!isOpen && (
        <IconButton onClick={toggleSidebar}>
          <MenuIcon className={`hamburger-icon ${isDarkMode ? 'dark-mode' : ''}`} />
        </IconButton>
        
      )}
</div>
      {/* Sidebar Menu */}
      <div className={`sidebar ${isOpen ? 'open' : 'closed'} ${isDarkMode ? 'dark-mode' : ''}`}>
        {/* Close Icon inside Sidebar */}
        <IconButton onClick={toggleSidebar}>
          <ArrowBackIcon className="arrow-icon sidebar-close-icon" />
        </IconButton>
        {/* <img 
          src={hamburgerIcon} 
          alt="Close Sidebar" 
          className="hamburger-icon sidebar-close-icon" 
          onClick={toggleSidebar} 
        /> */}

        {/* Search Bar */}
        <input 
          type="text" 
          placeholder="Search chats..." 
          className={`search-bar ${isDarkMode ? 'dark-mode' : ''}`}
          value={searchTerm} 
          onChange={handleSearch} 
        />

        {/* New Chat Button */}
        <button className="mode-toggle-btn" onClick={handleNewChat}><Add fontSize="medium" className='addbutton' /> New Chat</button>

        {/* Chat List */}
        <ul className="chat-list">
          {chats
            .filter(chat => chat.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((chat, index) => (
              <li key={index} className={`chat-item ${chat === activeChat ? "active" : ""}`}
              onClick={() => setActiveChat(chat)}
              >
                 
                    <Chat fontSize="small" />
                  {chat}
              </li>
            ))}
        </ul>

        {/* Mode Toggle Button */}
        <button 
          className={`mode-toggle-btn ${isDarkMode ? 'dark-mode' : ''}`} 
          onClick={toggleMode}>
          {isDarkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </button>

        {/* Logout Button */}
        <button className={`logout-btn ${isDarkMode ? 'dark-mode' : ''}`} onClick={handleLogout}>
          <PowerSettingsNewIcon className="logout-icon" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

import React, { useState, useEffect } from 'react';
import '../styles/Sidebar.css';
import hamburgerIcon from '../images/Hamburger.png';
import MenuIcon from "@mui/icons-material/Menu";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'; // Updated Logout Icon
import { IconButton } from "@mui/material";
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [chats, setChats] = useState(["Chat 1", "Chat 2", "Chat 3"]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);  // New state to manage login status
  const navigate = useNavigate(); // Initialize navigate function

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

  const handleNewChat = () => {
    const newChatName = `Chat ${chats.length + 1}`;
    setChats([...chats, newChatName]);
  };

  const handleLogout = () => {
    console.log("User logged out");
    setIsLoggedIn(false);  // Update the login status to logged out
    localStorage.removeItem('sidebarState');  // Clear sidebar state from localStorage
    navigate('/blank');  // Redirect to blank page
  };

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-mode", !isDarkMode); // Toggle dark mode class on body
  };

  // If user is logged out, don't render the sidebar
  if (!isLoggedIn) return null;  // Return null so that Sidebar doesn't render when logged out

  return (
    <div>
      {/* Hamburger Icon - Visible when sidebar is closed */}
      {!isOpen && (
        <IconButton onClick={toggleSidebar}>
          <MenuIcon className="hamburger-icon" />
        </IconButton>
      )}

      {/* Sidebar Menu */}
      <div className={`sidebar ${isOpen ? 'open' : 'closed'} ${isDarkMode ? 'dark-mode' : ''}`}>
        {/* Close Icon inside Sidebar */}
        <IconButton onClick={toggleSidebar}>
          <MenuIcon className="hamburger-icon sidebar-close-icon" />
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
          className="search-bar" 
          value={searchTerm} 
          onChange={handleSearch} 
        />

        {/* New Chat Button */}
        <button className="mode-toggle-btn" onClick={handleNewChat}>➕ New Chat</button>

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

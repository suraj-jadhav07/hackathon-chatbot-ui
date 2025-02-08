import React from "react";
// import { FaSearch, FaUser } from "react-icons/fa";
import "../styles/Dashboard.css"; // Import the CSS file
import { FaTachometerAlt, FaTable, FaUserGraduate, FaFileAlt, FaUser, FaSignInAlt, FaUserPlus,FaSearch,FaHistory } from "react-icons/fa";


const Dashboard = () => {
  return (
    <div className="container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-title">Soft UI Dashboard</div>
        <div className="navbar-icons">
          {/* <div className="search-container">
            <input type="text" placeholder="Type here..." className="search-input" />
            <FaSearch className="search-icon" />
          </div> */}
          <FaUser className="user-icon" />
        </div>
      </nav>

      {/* Sidebar */}
      {/* Sidebar */}
<aside className="sidebar">
  <ul>
    <li className="active">
      <div className="icon-wrapper"><FaTachometerAlt /></div> Dashboard
    </li>
    {/* <li>
      <div className="icon-wrapper"><FaTable /></div> Tables
    </li> */}
    <li>
      <div className="icon-wrapper"><FaUserGraduate /></div> Student
    </li><li>
      <div className="icon-wrapper"><FaFileAlt /></div> Create Exam
    </li><li>
      <div className="icon-wrapper"><FaHistory /></div> Exam History
    </li>
    
    {/* <li>
      <div className="icon-wrapper"><FaUser /></div> Profile
    </li> */}
    <li>
      <div className="icon-wrapper"><FaUserPlus /></div> Sign Up
    </li>
    <li>
      <div className="icon-wrapper"><FaSignInAlt /></div> Log Out
    </li>
  
  </ul>


        {/* Help Card */}
      <div className="help-card">
        {/* <div className="icon-container">
          <FaStar />
        </div> */}
        <h3>Need help?</h3>
        <p>Please check our docs</p>
        <a href="src/images/Sample123.pdf" target="_blank" className="doc-button">DOCUMENTATION</a>
      </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <h1 className="main-title">Dashboard</h1>
        <div className="cards">
          <div className="card">
          <div className="icon-wrapper "><FaUserGraduate /></div> Student
            <p className="card-value">$53,000</p>
          </div>
          <div className="card">
          <div className="icon-wrapper"><FaFileAlt /></div> Create Exam
            {/* <p className="card-title">Create Exam</p> */}
            <p className="card-value">2,300</p>
          </div>
          <div className="card">
          <div className="icon-wrapper"><FaHistory /></div> Exam History
            <p className="card-value">+3,462</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

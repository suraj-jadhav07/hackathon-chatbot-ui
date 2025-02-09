import React from "react";
import { FaUserGraduate, FaBookOpen, FaTachometerAlt, FaSignOutAlt  } from "react-icons/fa";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "../styles/Layout.css";

const Layout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic here (e.g., clearing auth tokens, redirecting)
    console.log("User logged out");
    navigate("/"); // Redirect to login page
  };


  return (
    <div className="layout-container">
      {/* Sidebar */}
      <aside className="layout-sidebar">
        <h2 className="layout-logo">TutorBot</h2>
        <ul className="layout-menu">
          <li>
            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
              <FaTachometerAlt className="icon" /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/students" className={({ isActive }) => (isActive ? "active" : "")}>
              <FaUserGraduate className="icon" /> Student Management
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/ChatBox" className={({ isActive }) => (isActive ? "active" : "")}>
              <FaBookOpen className="icon" /> Create Exam
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/examHistory" className={({ isActive }) => (isActive ? "active" : "")}>
              <FaBookOpen className="icon" /> Exam History
            </NavLink>
          </li>
        </ul>

        {/* Logout Button */}
        <button className="logout-button" onClick={handleLogout}>
          <FaSignOutAlt className="icon" /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="layout-main-content">
        <Outlet /> {/* This will render the selected page */}
      </main>
    </div>
  );
};

export default Layout;

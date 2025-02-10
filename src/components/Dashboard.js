// import React from "react";
// // import { FaSearch, FaUser } from "react-icons/fa";
// import "../styles/Dashboard.css"; // Import the CSS file
// import { Link } from "react-router-dom";
// import { FaTachometerAlt, FaTable, FaUserGraduate, FaFileAlt, FaUser, FaSignInAlt, FaUserPlus,FaSearch,FaHistory } from "react-icons/fa";


// const Dashboard = () => {
//   return (
//     <div className="container">
//       {/* Navbar */}
//       <nav className="navbar">
//         <div className="navbar-title">Soft UI Dashboard</div>
//         <div className="navbar-icons">
//           {/* <div className="search-container">
//             <input type="text" placeholder="Type here..." className="search-input" />
//             <FaSearch className="search-icon" />
//           </div> */}
//           <FaUser className="user-icon" />
//         </div>
//       </nav>

//       {/* Sidebar */}
//       {/* Sidebar */}
// <aside className="sidebar">
//   <ul>
//     <li className="active">
//       <div className="icon-wrapper"><FaTachometerAlt /></div> Dashboard
//     </li>
//     {/* <li>
//       <div className="icon-wrapper"><FaTable /></div> Tables
//     </li> */}
//     <li>
//       <Link to="/studentManagement">
//       <div className="icon-wrapper"><FaUserGraduate /></div> Student
//       </Link>
//     </li>
//     <li>
//       <div className="icon-wrapper"><FaFileAlt /></div> Create Exam
//     </li>
//     <li>
//       <div className="icon-wrapper"><FaHistory /></div> Exam History
//     </li>

//     {/* <li>
//       <div className="icon-wrapper"><FaUser /></div> Profile
//     </li> */}
//     <li>
//       <div className="icon-wrapper"><FaUserPlus /></div> Sign Up
//     </li>
//     <li>
//       <div className="icon-wrapper"><FaSignInAlt /></div> Log Out
//     </li>

//   </ul>


//         {/* Help Card */}
//       <div className="help-card">
//         {/* <div className="icon-container">
//           <FaStar />
//         </div> */}
//         <h3>Need help?</h3>
//         <p>Please check our docs</p>
//         <a href="src/images/Sample123.pdf" target="_blank" className="doc-button">DOCUMENTATION</a>
//       </div>
//       </aside>

//       {/* Main Content */}
//       <main className="main-content-dashboard">
//         <h1 className="main-title">Dashboard</h1>
//         <div className="cards">
//           <div className="card">
//           <div className="icon-wrapper "><FaUserGraduate /></div> Student
//             <p className="card-value">$53,000</p>
//           </div>
//           <div className="card">
//           <div className="icon-wrapper"><FaFileAlt /></div> Create Exam
//             {/* <p className="card-title">Create Exam</p> */}
//             <p className="card-value">2,300</p>
//           </div>
//           <div className="card">
//           <div className="icon-wrapper"><FaHistory /></div> Exam History
//             <p className="card-value">+3,462</p>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;


import React from "react";
// import "./Dashboard.css";

import { FaUserGraduate, FaBookOpen, FaHistory } from "react-icons/fa";
import "../styles/Dashboard.css";

const Dashboard = () => {
  // Dummy data (Replace with API calls)
  const stats = {
    students: 120, // Number of students
    createdExams: 15, // Number of exams created
    examHistory: 50, // Exam history count
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>
      <p>Welcome Teacher</p>
      <div className="dashboard-stats">
        {/* Students Count Box */}
        <div className="stat-box">
          <FaUserGraduate className="stat-icon" />
          <div className="dashboard-card">
            <h3>{stats.students} Students</h3>
            <p>View and manage your student roaster</p>
          </div>
        </div>

        {/* Created Exams Box */}
        {/* <div className="stat-box">
          <FaBookOpen className="stat-icon" />
          <div className="dashboard-card">
            <h3>Create Exams</h3>
            <p>Design and publish new exams</p>
          </div>
        </div> */}

        {/* Exam History Box */}
        <div className="stat-box">
          <FaHistory className="stat-icon" />
          <div className="dashboard-card">
            <h3>{stats.examHistory} Exam History</h3>
            <p>Review past exam results and analytics</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


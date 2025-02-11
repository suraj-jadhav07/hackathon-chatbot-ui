


import React, { useEffect, useState } from "react";
import { FaUserGraduate, FaHistory } from "react-icons/fa";
import "../styles/Dashboard.css";
import axios from "axios";
import { API_CONST } from "../core/constants";

const Dashboard = () => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalExams, setTotalExams] = useState(0);

  useEffect(() => {
    getAllData();
  },[]);

  const getAllData = () => {
    const teacher_id= Number(localStorage.getItem('userId'));
    axios
    .get(`${API_CONST.GET_DASHBOARD}?teacher_id=${teacher_id}`)
    .then((response) => {
      console.log("get data:", response.data);
      if (response.data.length > 0) {
        setTotalStudents(response.data[0].total_students);
        setTotalExams(response.data[0].total_exams);
      }
    
    })
    .catch((error) => {
      console.error("get data failed:", error.response?.data || error.message);        
      
    })
  }



  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>
      <p>Welcome <b>{localStorage.getItem('userName')} !!!</b></p>
      <p>"Modern Teaching Management Platform"</p>
      <div className="dashboard-stats">
        {/* Students Count Box */}
        <div className="stat-box">
          <FaUserGraduate className="stat-icon" />
          <div className="dashboard-card">
            <h3>{totalStudents} {totalStudents.length > 1 ? 'Students':'Student'}</h3>
            <p>View and manage your student roaster</p>
          </div>
        </div>

        {/* Exam History Box */}
        <div className="stat-box">
          <FaHistory className="stat-icon" />
          <div className="dashboard-card">
            <h3>{totalExams} Exam History</h3>
            <p>Review past exam results and analytics</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


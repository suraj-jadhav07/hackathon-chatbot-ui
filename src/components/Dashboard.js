


import React, { useEffect, useState } from "react";
import { FaUserGraduate, FaHistory } from "react-icons/fa";
import "../styles/Dashboard.css";
import axios from "axios";
import { API_CONST } from "../core/constants";
import PageSpinner from "./PageSpinner";

const Dashboard = () => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalExams, setTotalExams] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllData();
  },[]);

  const getAllData = () => {
    setLoading(true);
    const teacher_id= Number(localStorage.getItem('userId'));
    const token = localStorage.getItem("token");
    axios
    .get(`${API_CONST.GET_DASHBOARD}?teacher_id=${teacher_id}`, {
      headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
      }
  })
    .then((response) => {
      console.log("get data:", response.data);
      if (response.data.length > 0) {
        setTotalStudents(response.data[0].total_students);
        setTotalExams(response.data[0].total_exams);
      }
      setLoading(false);
    })
    .catch((error) => {
      console.error("get data failed:", error.response?.data || error.message);      
      setLoading(false);
    })
  }



  return (
    <div className="dashboard-container">
      {loading ? (
        <PageSpinner />
      ) : (
        <>
          <h1 className="dashboard-title">Dashboard</h1>
          <p>Welcome <b>{localStorage.getItem('userName')}</b></p>
          <div className="dashboard-stats">
            {/* Students Count Box */}
            <div className="stat-box">
              <FaUserGraduate className="stat-icon" />
              <div className="dashboard-card">
                <h3>{totalStudents} {totalStudents > 1 ? 'Students' : 'Student'}</h3>
                <p>View and manage your student roster</p>
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
        </>
      )}
    </div>
  );
  
};

export default Dashboard;


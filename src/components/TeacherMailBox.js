
import React, { useEffect, useState } from "react";
import { FaEnvelope, FaCheckCircle } from "react-icons/fa";
import "../styles/TeacherMailBox.css"
import axios from "axios";
import { API_CONST } from "../core/constants";
import PageSpinner from "./PageSpinner";
import { useNavigate } from "react-router-dom";

const TeacherMailbox = () => {
  const [students, setStudents] = useState([]);
  const [showSpinner, setShowSpinner] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getAllStudents();
  }, []);

  const getAllStudents = () => {
    setShowSpinner(true);
    const teacher_id = Number(localStorage.getItem('userId'));
    const token = localStorage.getItem("token");
    axios
      .get(`${API_CONST.GET_ALL_STUDENTS}?teacher_id=${teacher_id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
      .then((response) => {
        console.log("get students data:", response.data);
        setStudents(response.data.submitted_students)
        setShowSpinner(false);
      })
      .catch((error) => {
        console.error("get data failed:", error.response?.data || error.message);
        setShowSpinner(false);
      })
  }

  const handlePreview = (studentId) => {
    console.log("Preview button clicked!",studentId);
    navigate(`/dashboard/preview/${studentId}`); // Navigating to preview page with studentId
    // Add your logic here (e.g., navigate, open a modal, etc.)
  };


  return (
    <div className="mailbox-container">
      {showSpinner ? (<PageSpinner />) : (
        <>
          <div className="mailbox-header">
            <h1 className="mailbox-title">Teacher Mailbox</h1>
            <p className="mailbox-subtitle">
              "Exam Answer Submission and Review System"
            </p>
          </div>
          <div className="mailbox-card">
            <div className="mail-header">
              <FaEnvelope className="mailbox-icon" />
              <span>Inbox</span>
            </div>
            <div className="mailbox-list">
              {students.map((student, index) => (
                <div key={index} className="mailbox-item">
                  <div className="mailbox-info">
                    <p className="mailbox-email">{student.email}</p>
                    <p className="mailbox-subject">{student.exam_title}</p>
                    <p className="mailbox-date">{student.submitted_date}</p>
                  </div>
                  <button className="mailbox-button" onClick={() => handlePreview(student.student_id)}>
                    <FaCheckCircle className="button-icon" />
                    Preview
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>)}
    </div>
  );
};

export default TeacherMailbox;


import React, { useEffect, useState } from "react";
import { FaEnvelope, FaCheckCircle } from "react-icons/fa";
import "../styles/TeacherMailBox.css"
import axios from "axios";
import { API_CONST } from "../core/constants";
import PageSpinner from "./PageSpinner";

const TeacherMailbox = () => {
  const [students, setStudents] = useState([]);
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    getAllStudents();
  }, []);

  const getAllStudents = () => {
    setShowSpinner(true);
    const teacher_id = Number(localStorage.getItem('userId'));
    axios
      .get(`${API_CONST.GET_ALL_STUDENTS}?teacher_id=${teacher_id}`)
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
                    <p className="mailbox-subject">{student.exam_id}</p>
                    <p className="mailbox-date">{student.submitted_date}</p>
                  </div>
                  <button className="mailbox-button">
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


import React from "react";
import { FaEnvelope, FaCheckCircle } from "react-icons/fa";
import "../styles/TeacherMailBox.css"

const TeacherMailbox = () => {
  const messages = [
    {
      email: "student1@example.com",
      subject: "Math Exam Response",
      date: "8/3/2024, 3:30:00 pm",
    },
    {
      email: "student2@example.com",
      subject: "Science Exam Response",
      date: "8/3/2024, 5:00:00 pm",
    },
  ];

  return (
    <div className="mailbox-container">
      <div className="mailbox-header">
      <h1 className="mailbox-title">Teacher Mailbox</h1>
        <p className="mailbox-subtitle">
          Review and check student exam responses
        </p>
        </div>
      <div className="mailbox-card">
        <div className="mail-header">
          <FaEnvelope className="mailbox-icon" />
          <span>Inbox</span>
        </div>

        <div className="mailbox-list">
          {messages.map((message, index) => (
            <div key={index} className="mailbox-item">
              <div className="mailbox-info">
                <p className="mailbox-email">{message.email}</p>
                <p className="mailbox-subject">{message.subject}</p>
                <p className="mailbox-date">{message.date}</p>
              </div>
              <button className="mailbox-button">
                <FaCheckCircle className="button-icon" />
                Preview
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherMailbox;

import React, { useState } from "react";
import "../styles/CreateExam.css";

const CreateExam = () => {
  const [examContent, setExamContent] = useState("");

  const handleSubmit = () => {
    alert("Exam Created: " + examContent);
  };

  return (
    <div className="create-exam-container">
      <h1>Create Exam</h1>
      <p>Design and publish new exams</p>
      <div className="exam-box">
        <textarea className="create-exam-textarea"
          value={examContent}
          onChange={(e) => setExamContent(e.target.value)}
          placeholder="Enter your exam questions and content here..."
        />
      </div>
      <button className="create-exam-submit-btn" onClick={handleSubmit}>
        Create & Send Exam
      </button>
    </div>
  );
};

export default CreateExam;

import { useState } from "react";
import "../styles/StudentExam.css";

export default function StudentExam() {
  const [answers, setAnswers] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
  });

  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear errors when user types
  };

  const validateForm = () => {
    let newErrors = {};
    Object.keys(answers).forEach((key) => {
      if (!answers[key].trim()) {
        newErrors[key] = "This field is required.";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowModal(true);
    }
  };

  return (
    <div className="student-exam-container">
      <h2 className="title">Student Exam</h2>
      <p className="subtitle">Please answer all questions carefully</p>
      <form onSubmit={handleSubmit}>
        {[
          { label: "What is the capital of France?", name: "q1" },
          { label: "Explain the process of photosynthesis.", name: "q2" },
          { label: "Solve the equation: 2x + 5 = 15", name: "q3" },
          { label: "What are the main themes in Shakespeare's Hamlet?", name: "q4" },
          { label: "Describe the water cycle.", name: "q5" },
        ].map((question, index) => (
          <div key={index} className="question-box">
            <label>
              {`Question ${index + 1}: ${question.label}`} <span className="required">*</span>
            </label>
            <textarea
              name={question.name}
              value={answers[question.name]}
              onChange={handleChange}
              className={errors[question.name] ? "error" : ""}
              placeholder="Type your answer here.."
            ></textarea>
            {errors[question.name] && <p className="error-text">{errors[question.name]}</p>}
          </div>
        ))}
        <button type="submit" className="submit-btn">
          Submit All Answers
        </button>
      </form>

      {/* Modal Dialog */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Form Submitted Successfully! ✅</h3>
            <p>Thank you for completing the exam.</p>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

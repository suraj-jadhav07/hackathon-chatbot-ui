import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_CONST } from "../core/constants";
import "../styles/StudentExam.css";
import { useParams } from "react-router-dom";
import PageSpinner from "./PageSpinner";

export default function StudentExam() {
  const [answers, setAnswers] = useState([]);

  const [questions, setQuestions] = useState([]);

  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const { examId, studentId } = useParams();
  // **Handle Input Change**
  const handleChange = (e, questionId) => {
    const updatedAnswers = answers.map((ans) =>
      ans.question_id === questionId ? { ...ans, answer_text: e.target.value } : ans
    );

    setAnswers(updatedAnswers);
    setErrors({ ...errors, [questionId]: "" }); // Clear error when user types
  };

  // **Validation Function**
  const validateForm = () => {
    let newErrors = {};
    answers.forEach((ans) => {
      if (!ans.answer_text.trim()) {
        newErrors[ans.question_id] = "This field is required.";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // **Handle Form Submit**
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true); // Start loading
      console.log("Final Answers:", answers);
      axios
        .post(API_CONST.SUBMIT_EXAM, {
          exam_id: examId,
          student_id: studentId,
          answers: answers
        })
        .then((response) => {
          console.log("answers submitted successfully", response.data);
          const initialAnswers = questions.map((q) => ({
            question_id: q.id,
            answer_text: "",
          }));
          setAnswers(initialAnswers);
          setShowModal(true);
          getAllQuestions();
          setLoading(false);
        })
        .catch((error) => {
          console.error("Questions submittion failed", error.response?.data || error.message);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    getAllQuestions();
  });

  const getAllQuestions = () => {
    console.log(examId, studentId);
    setShowSpinner(true);
    axios
      .get(`${API_CONST.GET_QUESTIONS}?exam_id=${examId}&student_id=${studentId}`)
      .then((response) => {
        console.log("GET_QUESTIONS:", response.data.questions);
        console.log(response.data.questions.question_text);
        setQuestions(response.data.questions);
        // Initialize answers dynamically
        // Initialize answers dynamically
        const initialAnswers = response.data.questions.map((q) => ({
          question_id: q.id,
          answer_text: "",
        }));
        setAnswers(initialAnswers);
        setShowSpinner(false);
      })
      .catch((error) => {
        console.error("Questions submittion failed", error.response?.data || error.message);
        setShowSpinner(false);
      })
  }

  return (
    <div className="student-exam-container">
      {showSpinner ? (<PageSpinner />) : (
        <>
          <h2 className="title">Student Exam</h2>
          <p className="subtitle">Please answer all questions carefully</p>
          <form onSubmit={handleSubmit}>
            {questions.map((question, index) => (
              <div key={question.id} className="question-box">
                <label>
                  {`Question ${index + 1}: ${question.question_text}`} <span className="required">*</span>
                </label>
                <textarea
                  name={question.id} // Unique name for each question
                  value={answers.find((ans) => ans.question_id === question.id)?.answer_text || ""}
                  onChange={(e) => handleChange(e, question.id)}
                  className={errors[question.id] ? "error" : ""}
                  placeholder="Type your answer here..."
                ></textarea>
                {errors[question.id] && <p className="error-text">{errors[question.id]}</p>}
              </div>
            ))}
            <button type="submit" className="submit-btn" disabled={loading} onClick={handleSubmit}>
              {loading ? "Submitting..." : "Submit All Answers"}
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
        </>
      )}

    </div>
  );
}

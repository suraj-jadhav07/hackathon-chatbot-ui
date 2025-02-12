import React, { useEffect, useState } from "react";
import "../styles/PreviewPage.css"
import axios from "axios";
import { API_CONST } from "../core/constants";
import { useParams } from "react-router-dom";

const PreviewPage = () => {
    const { studentId, examId } = useParams(); // Retrieve studentId from URL
    const [studentDetails, setStudentDetails] = useState({});
    const [submittedAnswers,setSubmittedAnswers]= useState([]);

 


    useEffect(() => {
        getStudentAnswers();
    }, []);

    const getStudentAnswers = () => {
        const token = localStorage.getItem("token");
        axios
            .get(`${API_CONST.GET_STUDENT_ANSWERS}?exam_id=${examId}&student_id=${studentId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            .then((response) => {
                console.log("get answers:", response.data);
                setStudentDetails(response.data.student_details);
                setSubmittedAnswers(response.data.submitted_answers);
               

            })
            .catch((error) => {
                console.error("get answers data failed:", error.response?.data || error.message);

            })
    }
  

    return (
        <div className="preview-container">
            <h2>Preview of Student's Exam</h2>

            <div className="student-details">
                
                    <div key={studentDetails.first_name} className="student-details-box">
                        <p>
                            <strong>Name:</strong> {studentDetails.first_name}
                        </p>
                        <p>
                            <strong>Email:</strong> {studentDetails.email}
                        </p>
                        <p>
                            <strong>Exam Name:</strong> {studentDetails.exam_title}
                        </p>
                    </div>
             
            </div>

            <div className="result-container">
                {submittedAnswers.map((q) => (
                    <div key={q.que} className="question-box">
                        <p>
                            <strong>Question:</strong> {q.question_text}
                        </p>
                        <p>
                            <strong>Student's answer:</strong> {q.answer_text}
                        </p>
                        <p className={q.marks_obtained === 0 ? "incorrect" : "correct"}>
                            <strong>Evaluation:</strong> {q.marks_obtained === 0 ? "incorrect" : "correct"}
                        </p>
                        <p>
                            <strong>Marks Obtained:</strong> {q.marks_obtained}
                        </p>
                        <hr />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PreviewPage;
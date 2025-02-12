
import React, { useEffect, useState } from "react";
import "../styles/ExamHistory.css";
import "../styles/Dashboard.css";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import { API_CONST } from "../core/constants";

const ExamHistory = () => {
    //   const [exam, setExam] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [totalExams, setTotalExams] = useState([]);
    const [selectedExam, setSelectedExam] = useState(null);

    const handleCardClick = (exam) => {
        console.log("Selected Exam:", exam); // Debugging log
        setSelectedExam(exam);
        setIsOpen(true);
    };
    

    useEffect(() => {
        getAllExams();
    }, []);

    const getAllExams = () => {
        const teacher_id = Number(localStorage.getItem('userId'));
        const token = localStorage.getItem("token");
        axios
            .get(`${API_CONST.GET_ALL_EXAMS}?teacher_id=${teacher_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            .then((response) => {
                console.log("get all exams:", response.data);
                setTotalExams(Array.isArray(response.data) ? response.data : [response.data]);

            })
            .catch((error) => {
                console.error("get exams data failed:", error.response?.data || error.message);

            })
    }

    return (

        <div className="history-container">
            <h1>Exam Records</h1>
            <p>
                "Historical Question Bank and Exam Records"
            </p>
            <div className="history-cards">


                {totalExams.map((exam, index) => (

                    <div key={index} className="history-box" onClick={() => handleCardClick(exam)}>

                        <h3>{`Exam ${index + 1}`}</h3>
                        <p>
                            <strong className="lable">Topic:</strong>
                            <span className="sub-label">{exam.title}</span>
                        </p>
                        <p>
                            <strong className="lable">Date:</strong>
                            <span className="sub-label">{exam.created_at}</span>
                        </p>
                    </div>
                ))}

            </div>


            {isOpen && selectedExam && (
    <div className="popup-overlay">
        <div className="popup-content">
            <FaTimes className="close-icon" onClick={() => setIsOpen(false)} />
            <h3>Exam Title</h3>
            <p>{selectedExam.title}</p>

            <h4>Questions:</h4>
            <ul>
                {selectedExam.questions.map((question) => (
                    <li key={question.question_id}>{question.question_text}</li>
                ))}
            </ul>
        </div>
    </div>
)}


        </div>
    );
}

export default ExamHistory;


import React, { useEffect, useState } from "react";
import "../styles/ExamHistory.css";
import "../styles/Dashboard.css";
import {FaTimes } from "react-icons/fa";

const ExamHistory = () => {
    //   const [exam, setExam] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const exam = {
        examId: 1,
        topic: "Photosynthesis",
        date: "2/9/2025",
    };

    const questions = [
        "What is the main purpose of photosynthesis?",
        "Which organelle is responsible for photosynthesis?",
        "What gas is absorbed during photosynthesis?",
        "What is the role of chlorophyll?",
        "How does light intensity affect photosynthesis?",
    ];
    //   useEffect(() => {
    //     // Simulated API Call
    //     fetch("https://api.example.com/exam-details") // Replace with actual API endpoint
    //       .then((response) => response.json())
    //       .then((data) => setExam(data))
    //       .catch((error) => console.error("Error fetching data:", error));
    //   }, []);

    return (

        <div className="history-container">
            <h1>Exam Records</h1>
            <p>
                Previous exam question list
            </p>
            <div className="history-cards">

                {/* {Card 1} */}

                <div className={`history-box ${isOpen ? "blurred" : ""}`} onClick={() => setIsOpen(true)}>
                    <div>
                        <h3>{"Exam 1"}</h3>
                        <p>
                            <strong className="lable">Topic:</strong>
                            <span className="sub-label">{exam.topic}</span>
                        </p>
                        <p>
                            <strong className="lable">Date:</strong>
                            <span className="sub-label">{exam.date}</span>
                        </p>
                    </div>
                </div>

                {/* {Card 2} */}

                <div className={`history-box ${isOpen ? "blurred" : ""}`} onClick={() => setIsOpen(true)}>
                    <div>
                        <h3>{"Exam 2"}</h3>
                        <p>
                            <strong className="lable">Topic:</strong>
                            <span className="sub-label">{exam.topic}</span>
                        </p>
                        <p>
                            <strong className="lable">Date:</strong>
                            <span className="sub-label">{exam.date}</span>
                        </p>
                    </div>
                </div>

                {/* {Card 3} */}

                <div className={`history-box ${isOpen ? "blurred" : ""}`} onClick={() => setIsOpen(true)}>
                    <div>
                        <h3>{"Exam 3"}</h3>
                        <p>
                            <strong className="lable">Topic:</strong>
                            <span className="sub-label">{exam.topic}</span>
                        </p>
                        <p>
                            <strong className="lable">Date:</strong>
                            <span className="sub-label">{exam.date}</span>
                        </p>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <FaTimes className="close-icon" onClick={() => setIsOpen(false)} />
                        <h3>Exam Questions</h3>
                        <ul>
                            {questions.map((question, index) => (
                                <li key={index}>{question}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ExamHistory;

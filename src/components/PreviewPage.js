import React from "react";
import "../styles/PreviewPage.css"

const PreviewPage = () => {

    const student = [
        {
            name: "Student",
            email: "student@gmail.com",
            topic: "Famous Historical Figures and Landmarks"
        }
    ]

    const questions = [
        { que: "Who discovered America?", answer: "Christopher Columbus discovered America in 1492.He was an explorer from Italy who sailed for Spain", evaluation: "Incorrect", marks: 0 },
        { que: "Who was Dr. B.R. Ambedkar?", answer: "Dr. B.R. Ambedkar was an Indian social reformer and politician.He played a key role in drafting the Indian Constitution.", evaluation: "Correct", marks: 1 },
        { que: "Who was the first man to walk on the moon?", answer: "Neil Armstrong was the first man to walk on the moon in 1969.He was an astronaut on the Apollo 11 mission.", evaluation: "Correct", marks: 1 },
        { que: "Who was the Father of India?", answer: "Mahatma Gandhi is known as the Father of India.He led India’s freedom movement using non-violence.", evaluation: "Incorrect", marks: 0 },
        { que: "What is the Great Wall of China?", answer: "The Great Wall of China is a long wall built for protection.It was built by Chinese emperors to stop invaders.", evaluation: "Correct", marks: 1 },
    ];

    return (
        <div className="preview-container">
            <h2>Preview of Student's Exam</h2>

            <div className="student-details">
                {student.map((s) => (
                    <div key={s.name} className="student-details-box">
                        <p>
                            <strong>Name:</strong> {s.name}
                        </p>
                        <p>
                            <strong>Email:</strong> {s.email}
                        </p>
                        <p>
                            <strong>Topic:</strong> {s.topic}
                        </p>
                    </div>
                ))}
            </div>

            <div className="result-container">
                {questions.map((q) => (
                    <div key={q.que} className="question-box">
                        <p>
                            <strong>Question:</strong> {q.que}
                        </p>
                        <p>
                            <strong>Student's answer:</strong> {q.answer}
                        </p>
                        <p className={q.evaluation === "Correct" ? "correct" : "incorrect"}>
                            <strong>Evaluation:</strong> {q.evaluation}
                        </p>
                        <p>
                            <strong>Marks Obtained:</strong> {q.marks}
                        </p>
                        <hr />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PreviewPage;
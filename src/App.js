import './App.css';
import ChatBox from './components/ChatBox';
import Dashboard from './components/Dashboard';
import { Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import OTP from "./components/Otp";
import StudentManagement from './components/StudentManagement';
import CreateExam from './components/CreateExam';
import Layout from './components/Layout';
import React from 'react';
import ExamHistory from './components/ExamHistory';
import StudentExam from './components/StudentExam';
import TeacherMailBox from './components/TeacherMailBox';
import PreviewPage from './components/PreviewPage';


function App() {
  // const [messageSent, setMessageSent] = useState(false);

  // const handleSendMessage = () => {
  //   setMessageSent(true);
  // };

  return (
    <div className="container">
      {/* <Sidebar /> */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/otp" element={<OTP />} />
          <Route path="/chatbox" element={<ChatBox />} />
          <Route path="/layout" element={<Layout />} />
          <Route path="/exam/:examId/student/:studentId" element={<StudentExam />} />


        {/* Protected Routes - Wrapped in Layout */}
        <Route path="/dashboard/*" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="students" element={<StudentManagement />} />
          <Route path="createExam" element={<CreateExam />} />
          <Route path="chatbox" element={<ChatBox />} />
          <Route path="examHistory" element={<ExamHistory />} />
          <Route path="mailbox" element={<TeacherMailBox />} />
          <Route path="preview/:examId/:studentId" element={<PreviewPage />} />


        </Route>

        </Routes>
      </main>
    </div>
  );
}

export default App;

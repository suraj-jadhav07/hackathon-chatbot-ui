import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     Hello world!
    //   </header>
    // </div>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;

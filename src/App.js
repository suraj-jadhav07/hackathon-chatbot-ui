import './App.css';
import Sidebar from './components/Sidebar';
import ChatBox from './components/ChatBox';

function App() {
  return (
    <div className="container">
      <Sidebar />
      <main className="main-content">
        <div className="header">What can I help with?</div>
        <ChatBox />
      </main>
    </div>
  );
}

export default App;

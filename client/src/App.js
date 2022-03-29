import logo from './logo.svg';
import './App.css';
import socketIO from "socket.io-client"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Login from './component/Login/Login';
import Chat from './component/Chat/Chat';
import Signup from './component/Signup/Signup';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>

          <Route path='/' element={<Login />}></Route>
          {/* <Route path="/chat" element={<Chat />}></Route> */}
          <Route path="/chats" element={<Chat />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import socketIO from "socket.io-client"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Login from './component/Login/Login';
import Chat from './component/Chat/Chat';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>

          <Route path='/' element={<Login />}></Route>
          {/* <Route path="/chat" element={<Chat />}></Route> */}
          <Route path="/group" element={<Chat />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

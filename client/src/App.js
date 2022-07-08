import logo from './logo.svg';
import './App.css';
import socketIO from "socket.io-client"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Login from './component/Login/Login';
import Chat from './component/Chat/Chat';
import Signup from './component/Signup/Signup';
import Profile from './component/Profile/Profile';
import UserProfile from "./component/UserProfile/UserProfile"
import AllChats from './component/Users/allChats/AllChats';
import AllUsers from './component/AllUsers/AllUsers';
import UserOnline from './component/OnlineUsers/UserOnline';
import NoChat from './component/NoChat/NoChat';
import ChatBox from './component/ChatBox/ChatBox';
function App() {

  return (
    <div className="App">
      <Router>
        <Routes>

          <Route path='/' element={<Login />}></Route>

          <Route path="chats" element={<Chat />} >

            <Route path="" element={<NoChat />} />
            <Route path="userprofile/:id" element={<UserProfile />} />
            <Route path=":id" element={<ChatBox />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="userprofile/:id" element={<UserProfile></UserProfile>} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;

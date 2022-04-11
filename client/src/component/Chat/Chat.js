import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import "./Chat.css"
import socketIO, { io } from "socket.io-client"
import Message from '../Message/Message'
import Users from '../Users/Users'
import jsLogo from "../../images/js-logo.jpg"
import javaLogo from "../../images/java-logo.jpg"
import pythonLogo from "../../images/python-logo.png"
import { useDispatch, useSelector } from 'react-redux'
import { CURRENT_CHAT, LAST_SEEN, SELECT_USER, SET_SOCKET_ID, UPDATE_CHATS, USER_ONLINE } from '../../store/descriptor/descriptors'
import ChatBox from '../ChatBox/ChatBox'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import NoChat from '../NoChat/NoChat'
const ENDPOINT = "http://localhost:4500/"

let socket
function Chat() {
    const user = useSelector(state => state.auth.currUser)
    const dispatch = useDispatch()
    // const [messages, setMessages] = useState([])
    const selectedUser = useSelector(state => state.main.selectedUser)
    const chats = useSelector(state => state.main.chats)
    const [usersOnline, setUsersOnline] = useState([])
    const selectUser = (id) => {

        let currentUser = usersOnline.find(userr => userr.id === id)
        if (currentUser == undefined) {
            currentUser = chats.find(userr => userr.id === id)
            currentUser["isOnline"] = false
        } else {
            currentUser["isOnline"] = true
        }

        socket.emit("userChat", { user: user, to: currentUser })
        dispatch({ type: SELECT_USER, payload: currentUser })
    }

    useEffect(() => {
        socket = socketIO(ENDPOINT, { transports: ["websocket"] })
        console.log(user);
        socket.emit("join", { userr: user })
        socket.on("welcome", (data) => {
            if (user == null) {
                alert(data.message);
                dispatch({ type: SET_SOCKET_ID, payload: data.user.socketId })
                console.log(data);
            }
        })
        socket.on("userJoined", ({ message, user, currentUsers }) => {
            alert("user has joined")
            console.log("currentUsers", currentUsers);
            setUsersOnline(currentUsers)
            dispatch({ type: USER_ONLINE, payload: currentUsers })
        })

        socket.on("getUserChat", ({ to, chat, lastSeen }) => {
            console.log("user chat last seen", lastSeen);
            dispatch({ type: CURRENT_CHAT, payload: chat })
            dispatch({ type: LAST_SEEN, payload: lastSeen })

        })

        socket.on("leave", (data) => {
            dispatch({ type: USER_ONLINE, payload: { users: data.users, user: data.user, lastSeen: data.lastSeen } })
            setUsersOnline(data.users)
            alert("user left")
            console.log("leave ");
        })

        socket.on("privateMessage", ({ from, message, to }) => {
            console.log("inside private message", from, to);
            dispatch({ type: UPDATE_CHATS, payload: { message, from, to, user } })

        })
        return () => {

            socket.emit("disconnect")
            socket.off()
        }
    }, [])
    // useEffect(() => {

    //     socket.on("privateMessage", ({ from, message, to }) => {
    //         console.log("inside private message", to, message);

    //         setMessages([...message])
    //     })
    //     return () => socket.off()

    // }, [messages])


    return (
        <div className='chatPage'>
            <div className='chatPageContainer'>
                {console.log(user)}
                <Users usersOnline={usersOnline} image={user.profile} name={user.username} id={user.id} socketId={user.socketId} selectUser={selectUser} />

                {
                    selectedUser == null ? <NoChat /> :
                        <ChatBox socket={socket} usersOnline={usersOnline} selectedUser={selectedUser} />
                }

                <div className='groupList'>
                    <div className='groupList__peope'>
                        <span className='groupList__people__heading'><PersonOutlinedIcon />People Online</span>
                        {
                            usersOnline.map(online => {
                                return (
                                    <>
                                        {online.id != user.id && <div className='groupList__people__online' onClick={() => {
                                            selectUser(online.id)
                                        }}>
                                            <img src={online.profile !== "" ? "http://localhost:4500/profile/dp/" + online.profile : ""} /><div>{online.username}</div>
                                        </div>}</>)
                            })}
                    </div>
                    <div className='groupList__groups'>
                        <div className='groupList__groups__heading'>
                            <span><i class="bi bi-people-fill"></i> Groups</span>
                        </div>
                        <div className="groupList__groups__group">
                            <img src={jsLogo} />  <span>Javascipt</span>
                        </div>
                        <div className="groupList__groups__group">
                            <img src={javaLogo} /><span> java</span></div>
                        <div className="groupList__groups__group">
                            <img src={pythonLogo} /> <span> Python</span>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Chat
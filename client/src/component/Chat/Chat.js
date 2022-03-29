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
import { CURRENT_CHAT, SELECT_USER, SET_SOCKET_ID, USER_ONLINE } from '../../store/descriptor/descriptors'
import ChatBox from '../ChatBox/ChatBox'

const ENDPOINT = "http://localhost:4500/"

let socket
function Chat() {
    const user = useSelector(state => state.auth.currUser)
    const dispatch = useDispatch()
    // const [messages, setMessages] = useState([])
    const selectedUser = useSelector(state => state.main.selectedUser)

    const [usersOnline, setUsersOnline] = useState([])
    const selectUser = (id) => {
        let currentUser = usersOnline.find(userr => userr.id === id)
        socket.emit("userChat", { user: user, to: currentUser })
        dispatch({ type: SELECT_USER, payload: currentUser })
    }

    useEffect(() => {
        socket = socketIO(ENDPOINT, { transports: ["websocket"] })
        console.log(user);

        socket.emit("join", { userr: user })

        socket.on("welcome", (data) => {
            alert(data.message);
            dispatch({ type: SET_SOCKET_ID, payload: data.user.socketId })
            console.log(data);
        })
        socket.on("userJoined", ({ message, user, currentUsers }) => {
            alert("user has joined")
            console.log("currentUsers", currentUsers);
            setUsersOnline(currentUsers)
            dispatch({ type: USER_ONLINE, payload: currentUsers })
        })

        socket.on("getUserChat", ({ to, chat }) => {
            console.log("user chat", chat);
            dispatch({ type: CURRENT_CHAT, payload: chat })

        })

        socket.on("leave", (data) => {
            dispatch({ type: USER_ONLINE, payload: data.users })
            setUsersOnline(data.users)
            alert("user left")
            console.log("leave ");
        })

        socket.on("privateMessage", ({ from, message, to }) => {
            console.log("inside private message", to, message);
            dispatch({ type: CURRENT_CHAT, payload: message })
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

                <Users usersOnline={usersOnline} name={user.username} id={user.id} socketId={user.socketId} selectUser={selectUser} />

                {
                    selectedUser == null ? <div>dd</div> :
                        <ChatBox socket={socket} selectedUser={selectedUser} />
                }

                <div className='groupList'>
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
                    <div className='groupList__peope'>

                    </div>
                </div>
            </div>
        </div >
    )
}

export default Chat
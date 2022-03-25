import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import "./Chat.css"
import socketIO, { io } from "socket.io-client"
import ReactScrollToBottom from "react-scroll-to-bottom"
import sendLogo from "../../images/send-logo.png"
import close from "../../images/close.png"
import Message from '../Message/Message'
import Users from '../Users/Users'
import jsLogo from "../../images/js-logo.jpg"
import javaLogo from "../../images/java-logo.jpg"
import pythonLogo from "../../images/python-logo.png"

const ENDPOINT = "http://localhost:4500/"

let socket
function Chat() {
    const [id, setId] = useState("")
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])

    const [usersOnline, setUsersOnline] = useState([])
    const [selectedUser, setSelectedUser] = useState("")
    // const send = () => {
    //     socket.emit("chatMessage", { message, id, room })
    //     setMessage("")
    // }
    const { username } = useLocation().state
    const selectUser = (id) => {
        console.log(id);
        let currentUser = usersOnline.find(userr => userr.id === id)
        console.log(currentUser);
        setSelectedUser(currentUser)
    }
    const sendPrivateMessage = () => {
        socket.emit("sendPrivateMessage", { content: message, to: selectedUser.id, id: id })
        console.log("send message");
    }
    // const selectRoom = () => {
    //     setSelectedUser("")
    //     socket.emit("joinRoom", { username: user, room: room })

    // }

    useEffect(() => {
        socket = socketIO(ENDPOINT, { transports: ["websocket"] })
        console.log(username);
        socket.emit("join", { username: username, room: "" })

        socket.on("welcome", ({ user, message }) => {
            alert(message);
            // setId(user["id"])
            setUser(user)
        })
        socket.on("userJoined", ({ message, user, currentUsers }) => {
            alert("user has joined")
            setId(socket["id"])
            console.log("currentUsers", currentUsers);
            setUsersOnline(currentUsers)
        })



        socket.on("leave", (data) => {
            setUsersOnline(data.users)
            alert("user left")
            console.log("leave ", username);
        })
        return () => {
            console.log(id);

            socket.emit("disconnect")

            socket.off()
        }
    }, [])
    useEffect(() => {

        socket.on("privateMessage", ({ from, message }) => {
            console.log("inside private message");

            setMessages([...messages, { user: from, message }])
        })

        return () => socket.off()

    }, [messages])
    return (
        <div className='chatPage'>
            <div className='chatPageContainer'>
                <Users usersOnline={usersOnline} name={username} id={id} selectUser={selectUser} />
                <div className='chatContainer'>
                    <div className='header'>
                        <h2>{selectedUser !== "" && selectedUser.username} </h2>
                        <a href="/"><img src={close} alt='' /></a>
                    </div>

                    <ReactScrollToBottom className='chatBox'>
                        {messages.map((item, index) => {
                            // alert(item.user);
                            console.log(item);
                            return (<Message user={item.user.id == id ? '' : item.user} message={item.message} classs={item.user.id == id ? "right" : "left"} />)
                        }
                        )}
                    </ReactScrollToBottom>
                    <div className='inputBox'>
                        <input onKeyDown={e => e.key == "Enter"} onChange={e => setMessage(e.target.value)} value={message} type="text" id="chatInput" />
                        <button id="sendBtn" onClick={sendPrivateMessage}> <img src={sendLogo} /> </button>
                    </div>
                </div>
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
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import "./Chat.css"
import socketIO from "socket.io-client"
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
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])
    const [usersOnline, setUsersOnline] = useState([])
    // const [userChat, selectUserChat] = useState("")
    // const [room, setRoom] = useState("")
    const send = () => {
        socket.emit("chatMessage", { message, id, room })
        setMessage("")
    }
    const { user, room } = useLocation().state
    const selectUser = (id) => {
        let currentUser = usersOnline.find(userr => userr.id === id)
        console.log("current user selectedd ", currentUser);
    }
    const selectRoom = () => {

    }
    useEffect(() => {
        socket = socketIO(ENDPOINT, { transports: ["websocket"] })
        console.log(user);
        socket.on("welcome", ({ user, message, currentUsers }) => {
            alert("connected")
            setId(socket["id"])
            setUsersOnline(currentUsers)
            console.log(currentUsers);
        })


        socket.emit("joinRoom", { username: user, room: room })
        socket.on("userJoined", ({ message, user, currentUsers }) => {
            console.log("currentUsers", currentUsers);
            setUsersOnline(currentUsers)
        })

        socket.on("leave", (data) => {
            setUsersOnline(data.users)
            console.log("leave ", user);
        })
        return () => {
            console.log(id);

            socket.emit("disconnect", { room: room })

            socket.off()
        }
    }, [])
    useEffect(() => {
        socket.on("sendMessage", ({ user, message }) => {
            let newMessages = messages.map(obj => obj)
            newMessages.push({ user, message })
            console.log(messages);
            setMessages(newMessages)
        })

        return () => socket.off()
    }, [messages])
    return (
        <div className='chatPage'>
            <div className='chatPageContainer'>

                <Users usersOnline={usersOnline} user={user} selectUser={selectUser} />

                <div className='chatContainer'>
                    <div className='header'>
                        <h2>{room} </h2>
                        <a href="/"><img src={close} alt='' /></a>
                    </div>

                    <ReactScrollToBottom className='chatBox'>
                        {messages.map((item, index) => {
                            console.log(item);
                            return (<Message user={item.user.id == id ? '' : item.user} message={item.message} classs={item.user.id == id ? "right" : "left"} />)
                        }
                        )}
                    </ReactScrollToBottom>
                    <div className='inputBox'>
                        <input onKeyDown={e => e.key == "Enter" && send()} onChange={e => setMessage(e.target.value)} value={message} type="text" id="chatInput" />
                        <button id="sendBtn" onClick={send}> <img src={sendLogo} /> </button>
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
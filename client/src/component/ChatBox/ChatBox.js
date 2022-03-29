import React, { useEffect, useState } from 'react'
import close from "../../images/close.png"
import ReactScrollToBottom from "react-scroll-to-bottom"
import sendLogo from "../../images/send-logo.png"
import Message from '../Message/Message'
import { useSelector } from 'react-redux'

function ChatBox({ socket, selectedUser }) {
    const user = useSelector(state => state.auth.currUser)
    const messages = useSelector(state => state.main.currentChat)

    const [message, setMessage] = useState("")
    console.log("inside chatbox");
    const sendPrivateMessage = () => {
        console.log(selectedUser);
        socket.emit("sendPrivateMessage", { userid: user.id, content: message, to: selectedUser, from: user })
        console.log("send message");
        setMessage("")
    }

    return (
        <div className='chatContainer'>
            <div className='header'>
                <h2>{selectedUser.username} </h2>
                <a href="/"><img src={close} alt='' /></a>
            </div>
            <ReactScrollToBottom className='chatBox'>
                {console.log(messages)}
                {messages.map((item, index) => {
                    { console.log(item) }
                    return (<Message username={item.id == user.id ? '' : item.username} message={item.content} classs={item.id == user.id ? "right" : "left"} time={item.time} />)
                }
                )}
            </ReactScrollToBottom>
            <div className='inputBox'>
                <input onKeyDown={e => e.key == "Enter"} onChange={e => setMessage(e.target.value)} value={message} type="text" id="chatInput" />
                <button id="sendBtn" onClick={sendPrivateMessage}> <img src={sendLogo} /> </button>
            </div>


        </div>
    )
}

export default ChatBox
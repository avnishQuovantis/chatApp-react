import React, { useEffect, useState } from 'react'
import close from "../../images/close.png"
import ReactScrollToBottom from "react-scroll-to-bottom"
import sendLogo from "../../images/send-logo.png"
import Message from '../Message/Message'
import { useSelector } from 'react-redux'
import "./Chatbox.css"
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import CloseIcon from '@mui/icons-material/Close';
function ChatBox({ socket, selectedUser }) {
    const user = useSelector(state => state.auth.currUser)
    const messages = useSelector(state => state.main.currentChat)
    const [message, setMessage] = useState("")

    const [image, setImage] = useState(null)
    const sendPrivateMessage = () => {
        console.log(selectedUser);
        if (image == null) {

            socket.emit("sendPrivateMessage", { content: message, to: selectedUser, type: "text", from: user })
            console.log("send message");
            setMessage("")
        } else {
            console.log(image);
            socket.emit("sendImagePrivate", { content: image, to: selectedUser, type: "image", from: user, mimetype: image.type })
            setImage(null)
        }
    }

    return (
        <div className='chatContainer'>
            <div className='header'>
                <img className='chatContainerImage' src={`http://localhost:4500/profile/dp/${selectedUser.profile}`} />
                <h2>{selectedUser.username} </h2>
            </div>
            <ReactScrollToBottom className='chatBox'>
                {console.log(messages)}
                {
                    image == null ? messages.map((item, index) => {
                        { console.log(item) }
                        return (<Message type={item.type}
                            username={item.id == user.id ? '' : item.username}
                            message={item.content} classs={item.id == user.id ? "right" : "left"}
                            time={item.time}
                        />)
                    }
                    ) :
                        <div className='previewImageContainer' >
                            <span onClick={() => {
                                setImage(null)
                                setMessage("")
                            }}>
                                <CloseIcon />
                            </span>

                            <img src={URL.createObjectURL(image)} />
                        </div>

                }
            </ReactScrollToBottom>
            <div className='inputBox'>
                <input onKeyDown={e => e.key == "Enter"} onChange={e => setMessage(e.target.value)} value={message} type="text" id="chatInput" />

                <div class="imageInput-container">
                    <input type="file" id="imageInput" class="imageInput" accept='image/*'
                        onChange={e => {
                            let imagefile = e.target.files[0]
                            console.log(imagefile);
                            setImage(imagefile)
                            setMessage(imagefile.name)
                        }} />
                    <label for="imageInput" className='imageLabel'><i class="bi bi-image-fill"></i></label>
                </div>
                <button id="sendBtn" onClick={sendPrivateMessage}>

                    <SendOutlinedIcon />
                </button>
            </div>
        </div>
    )
}

export default ChatBox
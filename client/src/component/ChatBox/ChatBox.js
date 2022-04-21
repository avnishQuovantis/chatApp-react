import React, { useEffect, useRef, useState } from 'react'
import close from "../../images/close.png"
import ReactScrollToBottom from "react-scroll-to-bottom"
import sendLogo from "../../images/send-logo.png"
import Message from '../Message/Message'
import { useSelector } from 'react-redux'
import "./Chatbox.css"
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom'
import Selfie from '../selfie/Selfie'

function ChatBox() {
    const user = useSelector(state => state.auth.currUser)
    const messages = useSelector(state => state.main.currentChat)
    const socket = useSelector(state => state.auth.socket)
    const [clickImage, setClickImage] = useState(false)
    const [message, setMessage] = useState("")
    const selectedUser = useSelector(state => state.main.selectedUser)
    const usersOnline = useSelector(state => state.main.userOnline)
    const photoRef = useRef(null)
    let isOnline = usersOnline.find(obj => obj.id == selectedUser.id)
    const [image, setImage] = useState(null)
    const sendPrivateMessage = () => {
        console.log(selectedUser);
        if (image == null) {

            socket.emit("sendPrivateMessage", { content: message, to: selectedUser, type: "text", from: user })
            console.log("send message");
            setMessage("")
        } else {
            console.log(image);
            if (image.type.includes("image")) {
                socket.emit("sendImagePrivate", { content: image, to: selectedUser, type: "image", from: user, name: image.name, mimetype: image.type })
            } else {
                let mimetype = image.name.split(".")
                console.log("mime type of file", mimetype);
                socket.emit("sendImagePrivate", { content: image, to: selectedUser, type: "file", from: user, name: image.name, mimetype: mimetype[1] })
            }
            setImage(null)
            setMessage("")
        }
    }

    return (
        <div className='chatContainer'>
            <Link to={{ pathname: `/chats/userprofile/${selectedUser.id}` }}><div className='chatHeader' >
                <img className='chatContainerImage' src={`http://localhost:4500/profile/dp/${selectedUser.profile}`} />
                <div className='chatHeader__text'>
                    <div><h5>{selectedUser.username} </h5><span className={`onlineStatus ${isOnline !== undefined && 'online'}`}></span></div>
                    <div>{isOnline === undefined ? selectedUser["seen"] : "online"}</div>

                </div>
            </div>
            </Link>
            {
                clickImage ? <Selfie selectedUser={selectedUser} setClickImage={setClickImage} socket={socket} photoRef={photoRef} /> :
                    image != null ?
                        <div className='previewImageContainer' >
                            <span onClick={() => {
                                setImage(null)
                                setMessage("")
                            }}>
                                <CloseIcon />
                            </span>
                            <img src={URL.createObjectURL(image)} />
                            <button className="sendImageBtn" onClick={sendPrivateMessage}>
                                <SendOutlinedIcon />
                            </button>
                        </div> :
                        <>
                            <ReactScrollToBottom className='chatBox'>

                                {
                                    messages.map((item, index) => {
                                        return (<Message type={item.type}
                                            username={item.id == user.id ? '' : item.username}
                                            message={item.content} classs={item.id == user.id ? "right" : "left"}
                                            time={item.time}
                                        />)
                                    })


                                }

                            </ReactScrollToBottom>
                            <div className='inputBox'>
                                <input onKeyDown={e => e.key == "Enter"} onChange={e => setMessage(e.target.value)} value={message} type="text" id="chatInput" />

                                <div class="fileInput-container">
                                    <input type="file" id="fileInput" class="fileInput" accept='application/pdf,application/vnd.ms-excel,.docx,.doc'
                                        onChange={e => {
                                            let imagefile = e.target.files[0]
                                            console.log(imagefile);
                                            setImage(imagefile)
                                            setMessage(imagefile.name)
                                        }} />
                                    <label for="fileInput" className='fileLabel'><i class="bi bi-paperclip"></i></label>
                                </div>
                                <div class="imageInput-container" >
                                    <input type="file" id="imageInput" class="imageInput" accept='image/*'
                                        onChange={e => {
                                            let imagefile = e.target.files[0]
                                            console.log(imagefile);
                                            setImage(imagefile)
                                            setMessage(imagefile.name)
                                        }} />
                                    <label for="imageInput" className='imageLabel'><i class="bi bi-image-fill"></i></label>
                                </div>

                                <button className='btn' onClick={() => { setClickImage(true) }}> <i class="bi bi-camera"></i> </button>


                                <button id="sendBtn" onClick={sendPrivateMessage}>

                                    <SendOutlinedIcon />
                                </button>
                            </div>
                        </>
            }
        </div>

    )
}

export default ChatBox
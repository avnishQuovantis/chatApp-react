import React, { useEffect, useState } from 'react'
import "./Login.css"
import logo from "../../images/logo.png";
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { CHATS, LOGIN } from '../../store/descriptor/descriptors';
function Join() {
    const [password, settPassword] = useState('')
    const [email, setEmail] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSend = async () => {
        // navigate("/group", { state: { username: name } })
        let obj = await axios.post("http://localhost:4500/login", { email, password })
        let user = obj.data.user
        console.log("inside handle");
        console.log(obj);
        if (user) {
            let userData = { id: user._id, profile: user.profile, seen: user.seen, status: user.status, username: user.username, name: user.name, email: user.email, token: user.token }

            dispatch({ type: LOGIN, payload: userData })
            dispatch({ type: CHATS, payload: user.chats })
            navigate("/chats")
        } else {
            alert("user doenexist")
        }
    }

    return (
        <div className='LoginPage'>
            <div className='LoginContainer'>
                <div className='LoginContainer__left'>
                    <img src='https://www.tutorialspoint.com/communication_technologies/images/mobile_communication_protocols.jpg' />
                </div>
                <div className='LoginContainer__right'>
                    <img src={logo} />
                    <h1>Chat</h1>
                    <input className="loginInput" onChange={e => setEmail(e.target.value)} value={email} placeholder="Enter your email" />
                    <input className="loginInput" onChange={e => settPassword(e.target.value)} value={password} type="password" placeholder='Enter Your Password' />
                    <button onClick={handleSend} className="loginbtn">Login in</button>
                    <hr></hr>
                    <button className="btn btn-outline-danger" onClick={() => navigate("signup")}>signup</button>

                </div>
            </div>

        </div>
    )
}

export default Join

import React, { useState } from 'react'
import "./Login.css"
import logo from "../../images/logo.png";
import { Link, useNavigate } from "react-router-dom"

function Join() {
    const [group, setGroup] = useState("Volvo")
    const [name, setName] = useState("")

    const navigate = useNavigate()

    const handleSend = () => {
        navigate("/group", { state: { user: name } })
    }
    return (
        <div className='LoginPage'>
            <div className='LoginContainer'>
                <img src={logo} />
                <h1>Chat</h1>
                <input id="loginInput" onChange={e => setName(e.target.value)} value={name} placeholder="Enter your name" />
                {/* <select name="cars" id="loginSelect" onChange={e => setGroup(e.target.value)}>
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                </select> */}
                <button onClick={handleSend} class="loginbtn">Login in</button>
            </div>
        </div>
    )
}

export default Join

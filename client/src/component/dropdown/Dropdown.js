import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./dropdown.css"
function Dropdown() {
    const [show, setShow] = useState(false)
    return (
        <div class="dropdown">
            <button onClick={() => setShow(show => !show)} class="dropbtn"><i class="bi bi-three-dots-vertical"></i></button>
            <div id="myDropdown" class={`dropdown-content ${show ? "show" : ""}`}>
                <Link to="/profile" >Profile</Link>
                <a href="/" >logout</a>

            </div>
        </div>
    )
}

export default Dropdown
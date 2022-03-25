import React from 'react'
import "./Message.css"
const Message = ({ user, message, classs, index }) => {
    console.log(message);
    if (user == '') {
        return (
            <div className={`messageBox ${classs}`}>{`you:${message}`}</div>
        )
    }
    else {
        return (
            <div className={`messageBox ${classs}`}>
                {`${user.username}:${message}`}
            </div >
        )
    }
}

export default Message
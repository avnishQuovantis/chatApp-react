import React from 'react'
import "./Message.css"
const Message = ({ username, message, classs, index, time }) => {
    console.log(message);
    if (username == '') {
        return (
            <div className={`messageBox ${classs}`}>{`you:${message}`} <span >{time}</span></div>
        )
    }
    else {
        return (
            <div className={`messageBox ${classs}`}>
                {`${username}:${message}`} <span>{time}</span>
            </div >
        )
    }
}

export default Message
import React, { useState } from 'react'
import "./Message.css"
import { saveAs } from "file-saver"
const Message = ({ username, message, classs, item, index, time, type, profile }) => {
    console.log(message);

    const [open, setOpen] = useState(false)
    if (open) {
        return (
            <div className='imageContainer open' onClick={() => { setOpen(false) }}>
                <img src={`http://localhost:4500/posts/images/${message}`} />
            </div>
        )
    }
    else if (type != 'text') {
        if (type == "image") {
            return (
                <div className={`messageBox ${classs} messageBoxImage`}>
                    {classs == 'left' && <img src={`http://localhost:4500/profile/dp/${profile}`} width="2rem" height="2rem" />}

                    <div className='messageBoxName bold'>
                        {`${username == '' ? 'you' : username}:`}
                    </div>
                    <img src={`http://localhost:4500/posts/images/${message}`}
                        // onClick={() => {saveAs(`http://localhost:4500/posts/images/${message}`)}}
                        onClick={() => { setOpen(true) }}
                    />
                    <span>{time}</span>
                </div>
            )

        }
        else {
            return (
                <div className={`messageBox ${classs} `}  >
                    {classs == 'left' && <img src={`http://localhost:4500/profile/dp/${profile}`} width="2rem" height="2rem" />}

                    <div className='bold messageBoxName'>{`${username == '' ? 'you' : username}:`}</div>

                    <a href={`http://localhost:4500/posts/images/${message}`} ><i class="bi bi-file-earmark"></i>{message.split("__")[1].split("---")[1]}</a>
                    <span >{time}</span>
                </div>
            )
        }
    } else {
        return (
            <div className={`messageBox ${classs}`} >
                {classs == 'left' && <img src={`http://localhost:4500/profile/dp/${profile}`} width="2rem" height="2rem" />}
                <div className='bold messageBoxName'>{`${username == '' ? 'you' : username}:`}</div>
                <div>{message}</div>
                <span >{time}</span>
            </div>
        )

    }
    // }
    // else {
    //     return (
    //         <div className={`messageBox ${classs}`}>
    //             {`${username}:${message}`} <span>{time}</span>
    //         </div >
    //     )
    // }
}

export default Message
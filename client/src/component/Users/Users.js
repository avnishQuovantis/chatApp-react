import React from 'react'
import "./Users.css"
import { useSelector } from "react-redux"
function Users({ usersOnline, image, selectUser, name, id, socketId }) {

    const chats = useSelector(state => state.main.chats)
    return (
        <div className='userList'>
            <div className='userList__heading'>
                <img src={image ? "http://localhost:4500/profile/dp/" + image : ""} className='userList__heading__left' />

                <div className='userList__heading__right'>
                    {name}
                </div>
            </div>
            <input type="text" className='userList__search' placeholder='&#128269; Search friends' />
            {
                chats.map((chat, index) => {
                    return (
                        <>
                            {console.log("userOnline", chat)}
                            {id != chat.id && <div className="userList__user" key={index} onClick={() => selectUser(chat.id)} >

                                <img src={`http://localhost:4500/profile/dp/${chat.profile}`} />
                                <div className='userList__user__right'>
                                    <div >
                                        <h5 className='bold'>{chat.username}   </h5>
                                        <span className='messageTime'>{chat["messages"][chat["messages"].length - 1]["time"]}</span>
                                    </div>
                                    <div >
                                        <div>{chat["messages"][chat["messages"].length - 1]["type"] == "text" ?
                                            chat["messages"][chat["messages"].length - 1]['content'].substring(0, 10) : "File"}</div>
                                        <span> <i class="bi bi-circle"></i></span>
                                    </div>
                                </div>


                            </div>
                            }
                        </>
                    )
                })
            }
        </div>
    )
}

export default Users
import React from 'react'
import { useSelector } from 'react-redux'
import useSelect from '../../useSelect'

export default function AllChats() {
    const chats = useSelector(state => state.main.chats)
    const { selectUser } = useSelect()
    const id = useSelector(state => state.auth.currUser.id)
    return (
        chats.map((chat, index) => {
            console.log("inside chats", chat)
            return (
                <>
                    {
                        id != chat.id && <div className="userList__user" key={index} onClick={() => selectUser(chat.id)} >

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
    )

}

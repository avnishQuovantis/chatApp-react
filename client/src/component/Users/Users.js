import React, { useEffect, useState } from 'react'
import "./Users.css"
import { useSelector } from "react-redux"
import Dropdown from '../dropdown/Dropdown'
import axios from "axios"
function Users({ usersOnline, image, selectUser, name, id, socketId }) {

    const { chats, allUsers } = useSelector(state => state.main)
    const [searchUsers, setSearchUsers] = useState(null)
    const [searchValue, setSearchValue] = useState("")

    const search = () => {
        console.log("inside search");
        if (searchValue == "")
            return
        let arr = []
        let obj = allUsers.filter(ob => {
            console.log("inside search ", ob);
            if (ob._id != id && (ob.name.includes(searchValue) || ob.username.includes(searchValue))) {

                return ob
            }
        })
        console.log("search users ", obj);
        setSearchUsers(obj)
    }

    useEffect(() => {
        if (searchValue == "") {
            setSearchUsers(null)
        }
    }, [searchValue])
    return (
        <div className='userList'>
            <div className='userList__heading'>
                <img src={image ? "http://localhost:4500/profile/dp/" + image : ""} className='userList__heading__left' />

                <div className='userList__heading__right'>
                    {name}
                </div>
                <Dropdown />
            </div>
            <div class="input-group mb-3 userList__search">
                <input
                    type="text"
                    value={searchValue}
                    aria-describedby="button-addon2"
                    onChange={(e) => { setSearchValue(e.target.value) }} className='form-control '
                    placeholder='&#128269; Search friends' se />
                <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={search}><i class="bi bi-search"></i></button>
            </div>

            {
                searchUsers != null ?
                    searchUsers.map(users => {

                        return (
                            <>
                                {users.id != id && <div className="userList__user" onClick={() => selectUser(users._id)} >

                                    <img src={`http://localhost:4500/profile/dp/${users.profile}`} />
                                    <div className='userList__user__right'>
                                        <div >
                                            <h5 className='bold'>{users.username}   </h5>
                                        </div>

                                    </div>

                                </div>}
                            </>
                        )
                    }) :

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
            }
        </div>
    )
}

export default Users
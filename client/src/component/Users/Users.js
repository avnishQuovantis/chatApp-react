import React, { useEffect, useState } from 'react'
import "./Users.css"
import { useSelector } from "react-redux"
import Dropdown from '../dropdown/Dropdown'
import useSelect from "../useSelect"
import AllChats from './allChats/AllChats'
import { useNavigate } from 'react-router-dom'
import UsersList from './UserList/UsersList'
function Users({ usersOnline, image, name, id, socketId, urlPath }) {

    const { chats, allUsers } = useSelector(state => state.main)
    const [searchUsers, setSearchUsers] = useState(null)
    const [searchValue, setSearchValue] = useState("")
    const { selectUser } = useSelect()
    const navigate = useNavigate()
    const [toggleClass, setToggleClass] = useState(0)
    const search = () => {
        console.log("inside search");
        if (searchValue == "")
            return
        let arr = []
        let obj = allUsers.filter(ob => {
            console.log("inside search ", ob);
            if (ob._id != id && (ob.name.toLowerCase().includes(searchValue) || ob.username.toLowerCase().includes(searchValue))) {

                return ob
            }
        })
        console.log("search users ", obj);
        setSearchUsers(obj)
    }
    console.log("path location here ", urlPath);
    useEffect(() => {
        if (searchValue == "") {
            setSearchUsers(null)
        }
    }, [searchValue])
    const tabClick = (tab) => {
        // if (tab == 0) {
        //     navigate("/chats")

        // }
        // else if (tab == 1) {
        //     navigate("/chats/allusers")
        // } else {
        //     navigate("/chats/online")
        // }
        setToggleClass(tab)
    }
    return (
        <div className={urlPath ? 'userList fullScreen' : 'userList'}>
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
                    <UsersList userArray={searchUsers} />
                    : <>
                        <div className="userList__tabs">
                            <button className={` ${toggleClass == 0 && 'tabHighlight'}`} onClick={() => tabClick(0)} >
                                chats
                            </button>
                            <button className={` ${toggleClass == 1 && 'tabHighlight'}`} onClick={() => tabClick(1)}>
                                all
                            </button>
                            <button className={` ${toggleClass == 2 && 'tabHighlight'}`} onClick={() => tabClick(2)} >
                                online
                            </button>
                        </div>
                        {toggleClass == 0 ? <AllChats /> : toggleClass == 1 ? <UsersList userArray={allUsers} /> : <UsersList userArray={usersOnline} />}
                    </>

            }
        </div>
    )
}

export default Users
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux"
import useSelect from '../../useSelect'

function UsersList({ userArray }) {
    const { selectUser } = useSelect()
    const id = useSelector(state => state.auth.currUser.id)
    const navigate = useNavigate()
    return (

        <div className='userList__userContainer'>
            {userArray.map(user => {
                return (
                    id != user.id && <div className='userList__userContainer__user' onClick={() => {
                        selectUser(user.id); navigate("/chats/" + user.id)
                    }}>
                        <img src={user.profile !== "" ? "http://localhost:4500/profile/dp/" + user.profile : ""} /><div>{user.username}</div>
                    </div>)
            })}
        </div>
    )
}

export default UsersList
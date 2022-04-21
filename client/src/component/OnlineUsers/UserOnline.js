import React from 'react'
import { useSelector } from 'react-redux'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
function UserOnline({ selectUser, user, usersOnline }) {

    return (
        <div className='groupList__peope'>
            <span className='groupList__people__heading'><PersonOutlinedIcon />People Online</span>
            {
                usersOnline.map(online => {
                    return (
                        <>
                            {online.id != user.id && <div className='groupList__people__online' onClick={() => {
                                selectUser(online.id)
                            }}>
                                <img src={online.profile !== "" ? "http://localhost:4500/profile/dp/" + online.profile : ""} /><div>{online.username}</div>
                            </div>}</>)
                })}
        </div>
    )
}

export default UserOnline
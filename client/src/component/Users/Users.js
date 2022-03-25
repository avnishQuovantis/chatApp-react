import React from 'react'
import "./Users.css"
import userLogo from "../../images/user-logo.png"

function Users({ usersOnline, selectUser, name, id }) {
    console.log(usersOnline)
    return (
        <div className='userList'>
            <div className='userList__heading'>
                <div className='userList__heading__left'>
                    <img src={userLogo} />
                </div>

                <div className='userList__heading__right'>
                    {name}
                </div>
            </div>
            <input type="text" className='userList__search' placeholder='&#128269; Search friends' />
            {
                usersOnline.map((userOnline, index) => {
                    return (
                        <>
                            {id != userOnline.id && <div className="userList__user" key={userOnline.id} onClick={() => selectUser(userOnline.id)} >
                                <div className='userList__user__top'>
                                    <span className='userList__user__top-name'>{userOnline.username}   </span>
                                    <i class="bi bi-circle"></i>
                                </div>
                                {/* <div className='userList__user__bottom'>
                            <span>{}</span>
                        </div> */}
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
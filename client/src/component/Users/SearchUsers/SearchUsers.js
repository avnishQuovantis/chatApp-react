import React from 'react'

export default function SearchUsers({ searchUsers, id, selectUser }) {
    return (
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
        })
    )
}

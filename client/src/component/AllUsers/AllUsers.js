import React from 'react'
import { useSelector } from 'react-redux'
import useSelect from '../useSelect'

function AllUsers() {
    const user = useSelector(state => state.auth.currUser)
    const { selectUser } = useSelect()
    const allUsers = useSelector(state => state.main.allUsers)
    return (
        <div className='groupList__groups'>
            <div className='groupList__groups__heading'>
                <span><i class="bi bi-people-fill"></i> All people</span>
            </div>
            <div className='groupList__groups__list'>
                {
                    allUsers.map(userr => {
                        console.log(allUsers)
                        return (
                            userr.id != user.id
                            && <div className="groupList__groups__group" onClick={() => selectUser(userr.id)}>
                                <img src={userr.profile != "" && `http://localhost:4500/profile/dp/${userr.profile}`} />  <span>{userr.name}</span>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default AllUsers
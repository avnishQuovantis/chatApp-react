import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import "./Profile.css"
function Profile() {
    const userProfile = useSelector(state => state.auth.currUser)
    const navigate = useNavigate()
    return (
        <div className='profileContainer'>
            <div className='profile'>
                <button className='btn backBtn' onClick={() => navigate(-1)} > <i class="bi bi-chevron-left"></i></button>
                <img className='profile__pic' src={`http://localhost:4500/profile/dp/${userProfile.profile}`} />
                <div className=' profile__details'>
                    <h4>{userProfile.name}</h4>
                    <div ><span><i class="bi bi-tag"></i> </span>{userProfile.status}</div>
                    <table>
                        <tr>
                            <th ><span className="bold brown-text"><i class="bi bi-person-circle"></i> username </span></th>
                            <td>{userProfile.username}</td>
                        </tr>
                        <tr>
                            <th><span className="bold blue-text"><i class="bi bi-envelope"></i> email </span></th>
                            <td>{userProfile.email}</td>
                        </tr>
                    </table>

                </div>
            </div>
        </div>
    )
}

export default Profile
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import UsersList from '../Users/UserList/UsersList'
import useSelect from '../useSelect'

function AllUsers() {
    // const user = useSelector(state => state.auth.currUser)
    // const { selectUser } = useSelect()
    // const navigate = useNavigate()
    const allUsers = useSelector(state => state.main.allUsers)
    return (


        <UsersList userArray={allUsers} />
    )
}

export default AllUsers
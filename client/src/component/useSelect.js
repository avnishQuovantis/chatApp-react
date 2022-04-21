import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SELECT_USER } from '../store/descriptor/descriptors'

function useSelect() {
    const socket = useSelector(state => state.auth.socket)
    const usersOnline = useSelector(state => state.main.userOnline)
    const allUsers = useSelector(state => state.main.allUsers)
    const user = useSelector(state => state.auth.currUser)
    const dispatch = useDispatch()
    const selectUser = (id) => {
        // console.log("user online ", usersOnline);
        let currentUser = usersOnline.find(userr => userr.id === id)
        if (currentUser == undefined) {
            currentUser = allUsers.find(userr => userr.id === id)
        }
        socket.emit("userChat", { user: user, to: currentUser })
        dispatch({ type: SELECT_USER, payload: currentUser })
    }
    return { selectUser }

}

export default useSelect
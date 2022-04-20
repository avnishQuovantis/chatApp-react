import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SELECT_USER } from '../store/descriptor/descriptors'

function useSelect() {
    const socket = useSelector(state => state.auth.socket)
    const usersOnline = useSelector(state => state.main.userOnline)
    const chats = useSelector(state => state.main.chats)
    const user = useSelector(state => state.auth.currUser)
    const dispatch = useDispatch()
    const selectUser = (id) => {
        let currentUser = usersOnline.find(userr => userr.id === id)
        if (currentUser == undefined) {
            currentUser = chats.find(userr => userr.id === id)
            currentUser["isOnline"] = false
        } else {
            currentUser["isOnline"] = true
        }

        socket.emit("userChat", { user: user, to: currentUser })
        dispatch({ type: SELECT_USER, payload: currentUser })
    }
    return selectUser

}

export default useSelect
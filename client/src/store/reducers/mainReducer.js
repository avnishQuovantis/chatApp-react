import { USER_ONLINE, CHATS, SELECT_USER, CURRENT_CHAT, LAST_SEEN, UPDATE_CHATS } from "../descriptor/descriptors"
import authReducer from "./authReducer"
let initialState = {
    userOnline: [],
    chats: [],
    selectedUser: null,
    currentChat: [],
}

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_USER:
            console.log(action.payload);
            return {
                ...state,
                selectedUser: action.payload
            }
        case USER_ONLINE:
            console.log(action.payload);
            let obj1 = null
            if (state.selectedUser != null) {
                obj1 = { ...state.selectedUser, seen: action.payload.lastSeen }
            } else {
                obj1 = null
            }
            return {
                ...state,
                userOnline: action.payload.users,
                selectedUser: obj1
            }

        case CHATS:
            console.log(action.payload);
            return {
                ...state,
                chats: action.payload
            }
        case CURRENT_CHAT:
            console.log(action.payload);
            let obj = [...state.currentChat]
            console.log(action.payload);

            obj = (action.payload == undefined || action.payload == [] || action.payload["messages"] == undefined) ? [] : action.payload["messages"]
            console.log("inside CurrentChat if", obj);
            return {
                ...state,
                currentChat: obj,
            }


        case LAST_SEEN:
            let newSelectedUser = { ...state.selectedUser, seen: action.payload }
            return {
                ...state,
                selectedUser: newSelectedUser
            }
        case UPDATE_CHATS:
            const { message, from, to, user } = action.payload
            let newChats = []
            console.log(from);

            console.log("newChats is ", newChats);
            let obj2 = [...state.currentChat]
            console.log(to, from);
            if (state.selectedUser.id == from.id || user.id == from.id) {
                obj2 = message["messages"]
                console.log(obj2);
            }

            return {
                ...state,
                currentChat: obj2,

            }
        default: return state
    }
}
export default mainReducer
import { USER_ONLINE, CHATS, SELECT_USER, CURRENT_CHAT } from "../descriptor/descriptors"

let initialState = {
    userOnline: [],
    chats: [],
    selectedUser: null,
    currentChat: []
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
            return {
                ...state,
                userOnline: action.payload
            }

        case CHATS:
            console.log(action.payload);
            return {
                ...state,
                chats: action.payload
            }
        case CURRENT_CHAT:
            console.log(action.payload);
            let obj = (action.payload == undefined || action.payload == [] || action.payload["messages"] == undefined) ? [] : action.payload["messages"]
            console.log(obj);
            return {
                ...state,
                currentChat: obj
            }
        default: return state
    }
}
export default mainReducer
import { USER_ONLINE, CHATS, SELECT_USER, CURRENT_CHAT, LAST_SEEN, UPDATE_CHATS, SET_ALLUSERS, UPDATE_CHATS_SENDER, UPDATE_CHATS__RECIEVER } from "../descriptor/descriptors"
import authReducer from "./authReducer"
let initialState = {
    userOnline: [],
    chats: [],
    selectedUser: null,
    currentChat: [],
    allUsers: []
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
            // for(let i=0;i<state.allUsers.length;i++){}
            return {
                ...state,
                userOnline: action.payload,

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
            console.log("current chat before if else", action.payload);
            if (action.payload == undefined || action.payload == [] || action.payload["messages"] == undefined) {
                console.log("inside CurrentChat if", obj);
                obj = []
            } else {
                console.log("inside CurrentChat else");
                obj = action.payload["messages"]
            }
            // obj = (action.payload == undefined || action.payload == [] || action.payload["messages"] == undefined) ? [] : action.payload["messages"]
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

        case UPDATE_CHATS_SENDER:
            let senderMessage = action.payload.message
            let senderTo = action.payload.to
            console.log('sender message', action.payload);

            let newChatsSender = action.payload.chats
            let obj1 = [...state.currentChat]

            if (state.selectedUser != null && state.selectedUser.id == senderTo.id) {
                obj1 = senderMessage["messages"]
            }
            console.log("chats of sender", newChatsSender, "currentChat ", obj1);
            return {
                ...state,
                chats: newChatsSender,
                currentChat: obj1
            }
        case UPDATE_CHATS__RECIEVER:
            let recieverMessage = action.payload.message
            let recieverFrom = action.payload.from
            console.log('reciever message', action.payload);
            let newChatsReciever = action.payload.chats
            let obj2 = [...state.currentChat]


            if (state.selectedUser != null && state.selectedUser.id == recieverFrom.id) {
                obj2 = recieverMessage["messages"]
            }
            console.log("chats of reciver", newChatsReciever, "currentChat ", obj2);

            return {
                ...state,
                chats: newChatsReciever,
                currentChat: obj2
            }
        // case UPDATE_CHATS:
        //     const { message, from, to, user } = action.payload
        //     let newChats = []
        //     console.log('from', from, 'to ', to, "message ", message, 'user ', user);

        //     console.log("newChats is ", message);
        //     let obj2 = [...state.currentChat]
        //     if (state.chats.length == 0) {
        //         newChats.push(message)
        //     }
        //     for (let i = 0; i < state.chats.length; i++) {
        //         if (from != null && state.chats[i].id == from.id) {
        //             let obj = from.id != user.id ? { username: from.name, id: from.id, messages: message['messages'], profile: from.profile } : message
        //             console.log('inside update chat if from ==user ', obj)
        //             newChats.push(obj)
        //         } else if (to != null && state.chats[i].id == to.id) {
        //             let obj = to.id != user.id ? { username: to.name, id: to.id, messages: message['messages'], profile: to.profile } : message
        //             console.log('inside update chat if to ==user ', obj)

        //             newChats.push(obj)
        //         }
        //         else {
        //             newChats.push(state.chats[i])
        //         }
        //     }

        //     console.log("new messages after update is ", newChats);
        //     if (state.selectedUser != null && state.selectedUser.id == from.id || user.id == from.id) {
        //         obj2 = message["messages"]
        //     }

        //     return {
        //         ...state,
        //         chats: newChats,
        //         currentChat: obj2
        //     }
        case SET_ALLUSERS:
            return {
                ...state,
                allUsers: action.payload
            }
        default: return state
    }
}
export default mainReducer
import { LOGIN, SIGN_UP, SIGN_OUT, GET_USER, EDIT_USER, LOADING, SET_SOCKET_ID } from "../descriptor/descriptors";

let initialState = {
    loading: true,
    currUser: null,
    error: false,
    socketId: ""
};

const authReducer = (state = initialState, action) => {
    console.log(state.currUser);
    console.log(state.data);
    switch (action.type) {
        case GET_USER:
            console.log(action.payload);

            return {
                ...state,
                currUser: action.payload,
                loading: false
            }
        // case 
        case SET_SOCKET_ID:
            console.log("socket id", action.payload);
            let currUser = { ...state.currUser, socketId: action.payload }
            return {
                ...state,
                currUser: currUser
            }
        case LOGIN:
            localStorage.setItem("jwt", action.payload.token)
            console.log("login auth", action.payload);

            return {
                ...state,
                currUser: action.payload,
            };
        case SIGN_UP:
            localStorage.setItem("jwt", action.payload.token)

            return state

        case SIGN_OUT:
            localStorage.setItem("jwt", null)
            return {
                ...state,
                currUser: null,
            };
        case EDIT_USER:
            let newUser = action.payload
            return {
                ...state,
                currUser: newUser,
            };

        default:
            return state;
    }
};


export default authReducer;

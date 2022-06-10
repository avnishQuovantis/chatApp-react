const { SET_URL } = require("../descriptor/descriptors")

let initialState = {
    path: "/chat"
}

const urlReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_URL:
            return {
                path: action.payload
            }
        default: return state
    }
}
export default urlReducer
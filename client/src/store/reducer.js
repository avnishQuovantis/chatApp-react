import React from 'react'
import { combineReducers } from 'redux'
import authReducer from './reducers/authReducer'
import mainReducer from "./reducers/mainReducer"
import urlReducer from "./reducers/urlReducer"
// import shop from './shop'
export default combineReducers({
    auth: authReducer,
    main: mainReducer,
    url: urlReducer
})
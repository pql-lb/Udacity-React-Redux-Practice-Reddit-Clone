import { combineReducers } from 'redux'
import standard from './standard'
import comments from './comments'
import user from './user'

export default combineReducers({
    standard,
    comments,
    user,
})
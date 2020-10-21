import { GET_COMMENTS } from '../actions/getComment'
import { ADD_COMMENT } from '../actions/addComment'

export default function comments (state=[], action) {
    switch(action.type) {
        case GET_COMMENTS :
            return Object.assign({}, state, {comments: action.comment})
        case ADD_COMMENT :
            
            const newState = state.comments.flat().concat(action.comment)
            return Object.assign({}, state, {comments: newState})
        default :
            return state
    }
}
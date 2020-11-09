import { GET_COMMENTS } from '../actions/getComment'
import { VOTE_COMMENT } from '../actions/getComment'
import { ADD_COMMENT } from '../actions/addComment'

export default function comments (state=[], action) {
    switch(action.type) {
        case GET_COMMENTS :
            return Object.assign({}, state, {comments: action.comment})
        case ADD_COMMENT :
            const newState = state.comments.flat().concat(action.comment)
            const sorted = newState.sort((a, b) => a.timestamp - b.timestamp)
            const emptyOne = []
            emptyOne.push(sorted)
            return Object.assign({}, state, {comments: emptyOne})
        case VOTE_COMMENT :
            const commentID = action.comment[0].id
            const commentObj = state.comments.map(x => x.filter(x => x.id !== commentID))
            const commentObjFlat = commentObj.flat()
            const newArray = commentObjFlat.concat(action.comment[0])
            //Keeping the structure the same - can flatten action.comment on get if want to change this
            const empty = []
            empty.push(newArray)
            return Object.assign({}, state, {comments: empty})
        default :
            return state
    }
}
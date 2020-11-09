import * as API from '../utils/data'
import {updatePostsPre} from './posts'
export const ADD_COMMENT = 'ADD_COMMENT'


function addComment (comment) {
    return {
        type: ADD_COMMENT,
        comment
    }
}

export function addCommentPre (body, author, parentID) {
    return (dispatch) => {
        return Promise.all([
            API.addComment(body, author, parentID)
        ])
        .then(comment => dispatch(addComment(comment)))
    }
}
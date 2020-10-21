import * as API from '../utils/data'
export const GET_COMMENTS = 'GET_COMMENTS'

function getComment (comment) {
    return {
        type: GET_COMMENTS,
        comment
    }
}

export function getCommentPre(id) {
    return(dispatch) => {
        return Promise.all([
            API.getSingleComments(id)
        ])
        .then(comment => dispatch(getComment(comment)))
    }
}

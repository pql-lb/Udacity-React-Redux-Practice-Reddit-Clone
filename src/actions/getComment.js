import * as API from '../utils/data'
export const GET_COMMENTS = 'GET_COMMENTS'
export const VOTE_COMMENT = 'VOTE_COMMENT'


function getComment (comment) {
    return {
        type: GET_COMMENTS,
        comment
    }
}

function voteComment (comment) {
    return {
        type: VOTE_COMMENT,
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

export function voteCommentPre(id, option) {
    return(dispatch) => {
        return Promise.all([
            API.upvoteComment(id, option)
        ])
        .then(comment => dispatch(voteComment(comment)))
    }
}


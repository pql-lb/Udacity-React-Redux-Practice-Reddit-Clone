import * as API from '../utils/data'
export const VOTE_POST = 'VOTE_POST'

function votePost (post) {
    return {
        type: VOTE_POST,
        post
    }
}


export function votePostPre (id, option) {
    return (dispatch) => {
        return Promise.all([ API.upvotePost(id, option) ])
        .then(post => dispatch(votePost(post)))
    }
}
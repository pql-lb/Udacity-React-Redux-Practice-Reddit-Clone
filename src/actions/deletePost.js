import * as API from '../utils/data'
export const DELETE_POST = 'DELETE_POST'

function deletePost (post) {
    return {
        type: DELETE_POST,
        post
    }
}

export function deletePostPre (id) {
    return (dispatch) => {
        return Promise.all([
          API.deletePost(id)  
        ])
        .then(data => dispatch(deletePost(data)))
    }
}
import * as API from '../utils/data'
export const EDIT_POST = 'EDIT_POST'

function editPost (post) {
    return {
        type: EDIT_POST,
        post
    }
}

export function editPostPre (id, title, body) {
    return(dispatch) => {
        return Promise.all([
            API.editPost(id, title, body)
        ])
        .then(post => dispatch(editPost(post)))
    }
}
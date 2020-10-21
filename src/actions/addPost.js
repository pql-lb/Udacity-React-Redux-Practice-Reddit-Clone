import * as API from '../utils/data'
export const ADD_POST = 'ADD_POST'

function addPost (post) {
    return {
        type: ADD_POST,
        post
    }
}

export function addPostPre(title, body, author, category) {
    return(dispatch) => {
        return Promise.all([
            API.addPostA(title, body, author, category)
        ])
        .then(post => dispatch(addPost(post)))
    }
}

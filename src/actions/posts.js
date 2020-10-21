import * as API from '../utils/data'
export const UPDATE_POSTS = 'UPDATE_POSTS'


function updatePosts (posts) {
    return {
        type: UPDATE_POSTS,
        posts
    }
}

export function updatePostsPre () {
    return (dispatch) => {
        return new Promise((res, rej) => {
            setTimeout(() => res(API.getPosts(), 500))
        })
        .then((post) => dispatch(updatePosts(post)))
    }
}
import { UPDATE_POSTS } from '../actions/posts'
import { UPDATE_CAT } from '../actions/categories'
import { ADD_POST } from '../actions/addPost'
import { DELETE_POST } from '../actions/deletePost'
import { GET_SINGLE } from '../actions/singlePost'
import { EDIT_POST } from '../actions/editPost'
import { VOTE_POST } from '../actions/votePost'


export default function standard (state=[], action) {
    switch(action.type) {
        case UPDATE_POSTS :
            //console.log(action.posts, state.posts)
            return Object.assign({}, state, {posts: action.posts.filter(x => x.id)} )
        case UPDATE_CAT :
            return Object.assign({}, state, {categories: action.cat} )
        case ADD_POST :
            return Object.assign({}, state, {posts: state.posts.concat(action.post)} )
        case DELETE_POST :
            const newState = state.posts.filter(x => x.id !== action.post[0].id)
            return Object.assign({}, state, {posts: newState} )
        case GET_SINGLE :
            return Object.assign({}, state, {singlePost: action.post})
        case EDIT_POST :
            return Object.assign({}, state, {singlePost: action.post} )
        case VOTE_POST :
            return Object.assign({}, state, {singlePost: action.post} )
        default :
            return state
    }
}
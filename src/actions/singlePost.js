import * as API from '../utils/data'
export const GET_SINGLE = 'GET_SINGLE'

function getSingle (post) {
    return {
        type: GET_SINGLE,
        post
    }
}

export function getSinglePre (id) {
    return (dispatch) => {
        return Promise.all([
            API.getSingle(id)
        ])
        .then(post => dispatch(getSingle(post)))
    }
}

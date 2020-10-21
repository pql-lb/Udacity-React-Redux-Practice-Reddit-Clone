import * as API from '../utils/data'
export const UPDATE_CAT = 'UPDATE_CAT'

function updateCat (cat) {
    return {
        type: UPDATE_CAT,
        cat
    }
}

export function updateCatPre () {
    return (dispatch) => {
        return new Promise((res, rej) => {
            setTimeout(() => res(API.getCategories(), 500))
        })
        .then((cat) => dispatch(updateCat(cat)))
    }
}
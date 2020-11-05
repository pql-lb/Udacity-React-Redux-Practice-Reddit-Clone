import * as API from '../utils/data'
export const UPDATE_CAT = 'UPDATE_CAT'
export const GET_CAT = 'GET_CAT'

function updateCat (cat) {
    return {
        type: UPDATE_CAT,
        cat
    }
}

function getSpecificCat (cat) {
    return {
        type: GET_CAT,
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

export function getSpecificCatPre (cat) {
    return (dispatch) => {
        return new Promise((res, rej) => {
            setTimeout(() => res(API.getCats(cat), 500))
        })
        .then((cat) => dispatch(getSpecificCat(cat)))
    }
}
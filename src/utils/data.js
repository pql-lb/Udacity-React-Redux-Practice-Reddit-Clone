const api = 'http://localhost:3001'

let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
    'Accept': 'application/json',
    'Authorization': token
  }

//Get categories
export const getCategories = () => 
fetch(`${api}/categories`, { headers })
    .then(res => res.json())
//Get Posts
export const getPosts = () => 
fetch(`${api}/posts`, { headers })
    .then(res => res.json())
 
const id = Math.round(Math.random() * 1000000)
const timestamp = Date.now()
//Add post
export const addPostA = (title, body, author, category) => 
fetch(`${api}/posts`, { 
    method: 'POST', 
    headers: {
    ...headers,
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "id": id,
        "timestamp": timestamp,
        "title": title,
        "body": body,
        "author": author,
        "category": category
    })
 }).then(res => res.json())

//Delete post
export const deletePost = (id) =>
fetch(`${api}/posts/${id}`, { 
    method: 'DELETE',
    headers: {
        ...headers
    }
    })
    .then(data => data.json())

//Get single post
export const getSingle = (id) =>
fetch(`${api}/posts/${id}`, {
    method: 'GET',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    }
    })
    .then(data => data.json())

//Edit
export const editPost = (id, title, body) =>
fetch(`${api}/posts/${id}`, {
    method: 'PUT',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
        },
    body: JSON.stringify({
       "title": title,
       "body": body,
    })    
})
.then(data => data.json())

//Upvote Post
export const upvotePost = (id, option) =>
fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
        },
    body: JSON.stringify({option})
    })
    .then(data => data.json())


    
//Comments on single post
export const getSingleComments = (idd) => 
fetch(`${api}/posts/${idd}/comments`, {
    method: 'GET',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())


//Add comment 
export const addComment = (body, author, parentId) =>
fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
        },
    body: JSON.stringify({
        "id": String(id),
        "parentId": String(parentId),
        "timestamp": timestamp,
        "body": body,
        "author": author,
    })
    })
    .then(data => data.json())


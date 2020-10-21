
import React from 'react';
import { connect } from 'react-redux';
import Header from './header'
import {Link} from 'react-router-dom'
import {deletePostPre} from '../actions/deletePost'

class Home extends React.Component {
    delete = (e) => {
        this.props.dispatch(deletePostPre(e.target.value))
        this.forceUpdate()
    }
    render() {
        const {posts} = this.props.info
        let sorted = this.props.info.posts.sort((a, b) => b.timestamp - a.timestamp)
        return (
        <div>
        <Link style={{textDecoration: "none"}} to='/add'><button className="button addBtn">Add Post</button></Link>
        {sorted !== undefined &&
        sorted.map(x => {
        return (
            <div key={x.id} className="posts">
            {x.timestamp}
            <button 
            value={x.id}
            onClick={(e) => this.delete(e)}
            className="buttonEdit">X</button>

            <Header author={x.author} category={x.category} />
            <Link style={{textDecoration: "none", color: "black"}} to={`/posts/${x.id}`}>
            <li className="title">{x.title}</li>
            </Link>
            <li>{x.body}</li>

            </div>
        )
        })}
        </div>

        )
    }
}

export default connect((state) => ({
    info: state.standard,
}))(Home)
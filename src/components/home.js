
import React from 'react';
import { connect } from 'react-redux';
import Header from './header'
import {Link, Redirect} from 'react-router-dom'
import {deletePostPre} from '../actions/deletePost'
import NavBar from './navbar'
import Title from './title'

class Home extends React.Component {

    delete = (e) => {
        this.props.dispatch(deletePostPre(e.target.value))
        this.forceUpdate()
    }

    render() {
        console.log(this.props.info)
        let sorted = this.props.info.posts.sort((a, b) => b.timestamp - a.timestamp)
        if(this.props.user !== null) {
            return (
            <div className="homeDivider">
                <NavBar />
                <div className="postSection">
                <Title />
                {sorted !== undefined &&
                sorted.map(x => {
                return (
                <div key={x.id} className="posts">

                    <button 
                    value={x.id}
                    onClick={(e) => this.delete(e)}
                    className="buttonEdit">X</button>
                    <div className="voteSquare">
                        
                        <i style={{paddingLeft: "5px"}} className={x.voteScore > -1 ? "fas fa-arrow-up" : "fas fa-arrow-down"}></i>
                        <li className="voteScore"> {x.voteScore} </li>
                    </div>
                    <div className="row">
                        <Link style={{textDecoration: "none", color: "black"}} to={`/posts/${x.id}`}>
                        <li className="title"> {x.title} </li>
                        </Link>
                        <br /><br />
                        <Header author={x.author} category={x.category} comments={x.commentCount} time={x.timestamp} />
                    </div>
                </div>       
            )
        })}
        </div>
        </div>
        )
        } else {
            return <div>
                <Redirect to="/login" />
            </div>
        }
    }
}

export default connect((state) => ({
    info: state.standard,
    user: state.user,
}))(Home)
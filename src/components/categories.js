import React from 'react';
import { connect } from 'react-redux';
import NavBar from './navbar'
import Header from './header'
import {Link} from 'react-router-dom'
import CatBar from './catBar'

class Categories extends React.Component {
    
    render() {
        console.log(this.props.info.categories.categories)
        if (this.props.info.category === undefined) {
        return (
            <div>
                <div className="homeDivider">
                    <NavBar />
                    <CatBar />
                </div>
                <h1 className="absolute">Please Select A Category</h1>
                </div>
        )
        } else {
            return (
                <div className="homeDivider">
                    <NavBar />
                    <div className="catFlex">
                        <CatBar active="active" />
                    {this.props.info.category.length !== 0 ? (
                        <h1 className="btnColor"> {this.props.info.category[0].category} </h1>
                    ) : (
                        <h1 className="noPosts">No posts have been added to this category</h1>
                    )}
                    {this.props.info.category.map(x => {
                        return (
                        <div key={x.id} className="postsSingle">
                            <button 
                            value={x.id}
                            onClick={(e) => this.delete(e)}
                            className="buttonEdit">X</button>
                                <div className="voteSquareCat">
                                <i style={{paddingLeft: "5px"}} className="fas fa-arrow-up"></i>
                                <li className="voteScoreCat"> {x.voteScore} </li>
                                </div>
                                <div className="row">
                                    <Link style={{textDecoration: "none", color: "black"}} to={`/posts/${x.id}`}>
                                        <li className="title">{x.title}</li>
                                    </Link>
                                    <br /><br />
                                    <Header time={x.timestamp} comments={x.commentCount} author={x.author} category={x.category} />
                                </div>  
                            </div>
                        )
                    })}
                    
                </div>
                </div>
            )
        }
    }
}
                  



export default connect((state) => ({
    info: state.standard,
    comments: state.comments,
    user: state.user
}))(Categories)


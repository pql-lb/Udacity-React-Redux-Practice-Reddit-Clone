import React from 'react';
import Header from './header'
import { connect } from 'react-redux';
import {getSinglePre} from '../actions/singlePost'
import {editPostPre} from '../actions/editPost'
import {votePostPre} from '../actions/votePost'
import {updatePostsPre} from '../actions/posts'
import {getCommentPre, voteCommentPre} from '../actions/getComment'
import { addCommentPre } from '../actions/addComment';
import NavBar from './navbar'
import * as API from '../utils/data'

class singlePage extends React.Component {
    componentDidMount () {
        this.props.dispatch(getSinglePre(this.props.match.params.id))
        this.props.dispatch(getCommentPre(this.props.match.params.id))
    }

    state = {
        editable: false,
        inputOne: '',
        inputTwo: '',
        commentSection: false,
        comment: ''
    }

    edit = (title, body) => {
        this.setState((prev) => ({
            editable: !prev.editable,
            inputOne: title,
            inputTwo: body
        }))
    }

    submit = (id) => {
        //Submit condition
        if (this.state.editable === true) {
            new Promise((res, rej) => {
                res(this.props.dispatch(editPostPre(id, this.state.inputOne, this.state.inputTwo)))
            }) 
            .then(() => {
                this.setState((prev) => ({
                editable: !prev.editable,
                }))
            })
            .catch(err => console.log(err))
        }
    }

    update = (e) => {
        this.setState({
            inputOne: e
        })
    }
    updateTwo = (e) => {
        this.setState({
            inputTwo: e
        })
    }

    vote = (id, condition) => {
        if (condition === "upVote") {
            let option = "upVote"
            this.props.dispatch(votePostPre(id, option))
        } else {
            let option = "downVote"
            this.props.dispatch(votePostPre(id, option))
        }
    }

    comments = (id) => {
        this.setState((prev) => ({
            commentSection: !prev.commentSection
        }))
    }

    submitComment = (body, author, parentID) => {
        new Promise((res) => {
            res( this.props.dispatch(addCommentPre(body, author, parentID)) )
        })
        .then(() => this.props.dispatch(updatePostsPre()))
        .then(() => this.props.dispatch(getSinglePre(this.props.match.params.id)) )
        .then(() => this.props.dispatch(getCommentPre(this.props.match.params.id)) )
    }

    commentVote = (id, e) => {
        this.props.dispatch(voteCommentPre(id, e.target.id)) 
    }

    render() {
        const {singlePost} = this.props.info
        const {comments} = this.props.comments

        const sorted = (comments !== undefined) ? comments.flat().sort((a, b) => b.timestamp - a.timestamp) : []


        if (singlePost !== undefined) {
            return (
                <div className="homeDivider">
                    <NavBar />
                    <div className="testing">
                    {singlePost.map(x => {
                        let time = new Date(x.timestamp)
                        let longDate = time.getDate() + "/" + time.getMonth() + "/" + time.getFullYear()
                        
                        return (
                            <div key={x.title} className="postSingle">
                                
                                {this.state.editable === false ? 
                                <button 
                                onClick={() => this.edit(x.title, x.body)}
                                className="editBtn">Edit</button> :
                                <button 
                                onClick={() => this.submit(x.id)}
                                className="editBtn">Submit</button>
                                }

                                <Header time={x.timestamp} comments={x.commentCount} author={x.author} category={x.category} />
                                
                                {this.state.editable === false &&
                                <div className="moveTop">
                                    <li className="font24">{x.title}</li>
                                    <li className="moveTopTwo">{x.body}</li>
                                </div>
                                }

                                {this.state.editable === true &&
                                    <div className="moveTop">
                                    <input 
                                    className="editInput font24"
                                    value={this.state.inputOne}
                                    onChange={(e) => this.update(e.target.value)}>
                                    </input>
                                    <input 
                                    className="editInput font18 moveTopTwo"
                                    value={this.state.inputTwo}
                                    onChange={(e) => this.updateTwo(e.target.value)}></input>
                                    </div>
                                }

                                <div className="infoBox">
                                <li>Votes: {x.voteScore} 
                                <span 
                                className="interact"
                                id="upVote"
                                onClick={(e) => this.vote(x.id, e.target.id)}
                                >+</span> 
                                
                                <span 
                                className="interact"
                                id="downVote"
                                onClick={(e) => this.vote(x.id, e.target.id)}
                                >-</span> 
                                </li>
                                <li
                                className="interact"
                                onClick={() => this.comments()}
                                >Comments: {x.commentCount}</li>

                                </div>

                                
                                {this.state.commentSection !== false && 
                                <div>
  
                                <div className="comments">COMMENTS</div>
                                
                                {sorted !== [] &&
                                (
                                    <div>
                                        
                                        {sorted.flat().map(x => {
                                            let date = new Date(x.timestamp).toLocaleString().split(',')
                                           
                                            return (
                                                <div className="commentList" key={Math.random()}>
                                                  
                                                    <div className={(x.voteScore > -1) ? "commentVoteSquare" : "commentVoteSquareNeg"} >
                                                        <li className="commentVote"> {x.voteScore} </li>
                                                    </div>
                                                    <div className="votingComment">
                                                        <li id="upVote" onClick={(e) => this.commentVote(x.id, e)} > + </li>
                                                        <li id="downVote" onClick={(e) => this.commentVote(x.id, e)} > - </li>
                                                    </div>
                                                    <li> <span className="bold"> {x.author}: </span> {x.body} </li>
                                                    <li className="commentDate"> Posted at {date[1]} on {date[0]} </li>
                                                </div>
                                            )

                                        })}

                                    </div>
                                )                                
                                }
                                
                                <div className="align">
                                <input
                                className="commentAdder"
                                value={this.state.comment}
                                onChange={(e) => {
                                    this.setState({
                                        comment: e.target.value
                                    })
                                }}
                                ></input>
                                <button
                                className="button commentSubmit"
                                onClick={() => this.submitComment(this.state.comment, this.props.user, x.id)}
                                >Submit</button>
                                </div>

                                </div>
        
                            }       
                            </div>
                        )
                    })
                    }
                </div>
                </div>

                                
            )
   



        } else {
            return <div>
                LOADING
            </div>
        }



    }
}
                  



export default connect((state) => ({
    info: state.standard,
    comments: state.comments,
    user: state.user
}))(singlePage)

/*
            return (
                <div>
                    {singlePost.map(x => {
                        let time = new Date(x.timestamp)
                        let longDate = time.getDate() + "/" + time.getMonth() + "/" + time.getFullYear()
                        const h = time.getHours()
                        const m = (time.getMinutes() < 10) ? "0" + time.getMinutes() : time.getMinutes()
    
                        return (
                            <div key={x.title} className="posts">
                                
                                {this.state.editable === false ? 
                                <button 
                                onClick={() => this.edit(x.title, x.body)}
                                className="editBtn">Edit</button> :
                                <button 
                                onClick={() => this.submit(x.id)}
                                className="editBtn">Submit</button>
                                }

                                <Header author={x.author} category={x.category} />
                                
                                {this.state.editable === false &&
                                <div>
                                <li>{x.title}</li>
                                <li>{x.body}</li>
                                </div>
                                }

                                {this.state.editable === true &&
                                    <div>
                                    <input 
                                    className="editInput"
                                    value={this.state.inputOne}
                                    onChange={(e) => this.update(e.target.value)}>
                                    </input>
                                    <input 
                                    className="editInput"
                                    value={this.state.inputTwo}
                                    onChange={(e) => this.updateTwo(e.target.value)}></input>
                                    </div>
                                }

                                <div className="infoBox">
                                <li>Posted on: {longDate}</li>
                                <li>Votes: {x.voteScore} 
                                <span 
                                className="interact"
                                id="upVote"
                                onClick={(e) => this.vote(x.id, e.target.id)}
                                >+</span> 
                                
                                <span 
                                className="interact"
                                id="downVote"
                                onClick={(e) => this.vote(x.id, e.target.id)}
                                >-</span> 
                                </li>
                                <li
                                className="interact"
                                onClick={() => this.comments(x.id)}
                                >Comments: {x.commentCount}</li>

                                </div>

                                {this.state.commentSection === true &&
                                <div>
                                <div className="comments">COMMENTS</div>
                                
                                {comments !== undefined &&
                                (
                                    <div>
                                        
                                        {comments.flat().map(x => {

                                            return (
                                                <div className="commentList" key={x.id}>
                                                    <li> {x.author} : {x.body} </li>
                                                    <li className="commentDate"> {x.timestamp} </li>
                                                </div>
                                            )

                                        })}

                                    </div>
                                )                                
                                }

                                <div className="align">
                                <input
                                className="commentAdder"
                                value={this.state.comment}
                                onChange={(e) => {
                                    this.setState({
                                        comment: e.target.value
                                    })
                                }}
                                ></input>
                                <button
                                className="button commentSubmit"
                                onClick={() => this.submitComment(this.state.comment, "Lael", x.id)}
                                >Submit</button>
                                </div>

                                </div>
                                }

                            </div>
                        )
                    })

                    }
                </div>
            )
            */
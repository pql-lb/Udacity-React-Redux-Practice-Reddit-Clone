import React from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import {login} from '../actions/login'

class Title extends React.Component {
    logout = () => {
        this.props.dispatch(login(null))
    }
    render() {
        return (
            <div>
            <div className="titleTwo">
                <h1 className="titleTwoH1">Lorem <span className="colorTwo">Ipsum</span></h1>
                <h2 className="titleTwoH2">Lorem ipsum slogan goes here.</h2>
                <hr className="titleTwoHR"/>
            </div>
            <Link style={{textDecoration: "none"}} to='/add'><button className="addPostBtn">Add Post</button></Link>
            </div>
        )
    }
}

export default connect((state) => ({
    user: state.user,
}))(Title)
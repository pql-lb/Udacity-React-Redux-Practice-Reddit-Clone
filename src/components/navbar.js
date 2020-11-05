import React from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import {login} from '../actions/login'

class NavBar extends React.Component {
    logout = () => {
        this.props.dispatch(login(null))
    }
    render() {
        return (
                <div className="link">
                    <div className="top">
                    <Link style={{textDecoration: "none"}} to='/'><button className="addBtn">Home</button></Link>
                    <Link style={{textDecoration: "none"}} to='/categories'><button className="addBtn">Categories</button></Link>
                    <Link style={{textDecoration: "none"}} to='/login'>
                        <button 
                        onClick={() => this.logout()}
                        className="addBtn">Logout</button>
                    </Link>
                    </div>
                </div>
        )
    }
}

export default connect((state) => ({
    user: state.user,
}))(NavBar)
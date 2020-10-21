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
            <div>
                <div className="link">
                    <Link style={{textDecoration: "none"}} to='/add'><button className="button addBtn">Add Post</button></Link>
                    <Link style={{textDecoration: "none"}} to='/login'>
                        <button 
                        onClick={() => this.logout()}
                        className="button addBtn">Logout</button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default connect((state) => ({
    user: state.user,
}))(NavBar)
import React from 'react';
import { connect } from 'react-redux';
import {login} from '../actions/login'
import {Redirect} from 'react-router-dom'

class Login extends React.Component {
    login = (user) => {
        if (user.length < 0) {
            this.props.dispatch(login(user))
        } else {
            this.props.dispatch(login("Elle"))
        }
        this.props.log()
    }
    state = {
        input: ''
    }
    update = (value) => {
        this.setState({
            input: value
        })
    }
    render() {
        console.log(this.props.user)
        return (
            <div className="logPage">
                <label style={{margin: "0 auto", fontSize: "25px", marginBottom: "10px"}}>
                    Please Enter A UserName
                </label>
                <input
                className="userName"
                value={this.state.input}
                onChange={(e) => this.update(e.target.value)}></input>
                <button 
                onClick={() => this.login(this.state.input)}
                className="button login">Login</button>
            </div>
        )
    }
}

export default connect((state) => ({
    user: state.user
}))(Login)


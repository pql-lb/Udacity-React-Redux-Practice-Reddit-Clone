import React from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import {login} from '../actions/login'
import {getSpecificCatPre} from '../actions/categories'


class NavBar extends React.Component {
    logout = () => {
        this.props.dispatch(login(null))
    }
    state = {
        option: '',
        categories: false,
    }
    handleChange = (e) => {
        if (e.target.value !== "Categories") {
        new Promise((res) => {
            res(
                this.setState({
                    option: e.target.value
                })
            )
        })
        .then(() => this.props.dispatch(getSpecificCatPre(this.state.option)))
        .then(() => this.setState((prev) => ({categories: !prev.categories})))
        }
    }
    render() {
        return (
                <div className="link">
                    <div className="top">
                    <Link style={{textDecoration: "none"}} to='/'><button className="addBtn">Home</button></Link>
                        <div className="selectCenter">
                            {this.state.categories === true &&
                                <Redirect to="/categories" />
                            }
                            <select 
                            className="selectCategory" 
                            value={this.state.option} 
                            onChange={(e) => this.handleChange(e)}>
                                <option className="addCategory">Categories</option>
                                {this.props.info.categories.categories.map(x => {
                                    return (
                                        <option className="addCategory" key={x.name}>{x.name}</option>
                                    )
                                    })
                                }
                            </select>
                        </div>
                        
                    
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
    info: state.standard,
}))(NavBar)
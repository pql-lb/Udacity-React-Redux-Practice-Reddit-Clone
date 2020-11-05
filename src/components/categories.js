import React from 'react';
import { connect } from 'react-redux';
import NavBar from './navbar'
import Header from './header'
import {Link} from 'react-router-dom'
import * as API from '../utils/data'
import {getSpecificCatPre} from '../actions/categories'

class Categories extends React.Component {
    componentDidMount () {

    }
    state = {
        option: '',
    }
    handleChange = (e) => {
        this.setState({
            option: e.target.value
        })
    }
    handleSubmit = () => {
        //API.getCats(this.state.option).then(data => console.log(data))
        this.props.dispatch(getSpecificCatPre(this.state.option))
    }
    render() {
        console.log(this.props.info.category)
        if (this.props.info.category === undefined) {
        return (
                <div className="homeDivider">
                    <NavBar />
                    <div className="central">
                        <h1>Pick A Category</h1>
                        <select value={this.state.option} onChange={(e) => this.handleChange(e)} className="categorySelector">
                        <option>Please select...</option>
                        {this.props.info.categories.categories.map(x => 
                            {
                                return (
                                    <option key={x.name}>{x.name}</option>
                                )
                            }
                            )}
                        </select>
                        <button onClick={this.handleSubmit} className="button">Select</button>
                    </div>
                </div>
        )
        } else {
            return (
                <div>
                    <NavBar />
                    {this.props.info.category.map(x => {
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
}
                  



export default connect((state) => ({
    info: state.standard,
    comments: state.comments,
    user: state.user
}))(Categories)


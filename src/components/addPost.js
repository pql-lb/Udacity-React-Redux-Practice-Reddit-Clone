import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {addPostPre} from '../actions/addPost'
import NavBar from './navbar'

class addPost extends React.Component {
    state = {
        title: '',
        body: '',
        category: '',
        author: this.props.user,
        submit: false,
        alert: false
      }
      update = (value, e) => {
        if (e.target.name === "title") {
          this.setState({
            title: value
          })
        } else if (e.target.name === "body") {
          this.setState({
            body: value
          })
        } else if (e.target.name === "category") {
          this.setState({
            category: value
          })
        } 
      }
      submit = () => {
        if (this.state.title.length !== 0 && this.state.body.length !== 0 && this.state.category.length !== 0) {
          const promise = new Promise( (res, rej) => {
            res( this.format(this.state.title, this.state.body, this.state.author, this.state.category) )
          })
          .then(() => {
             this.setState((prev) => ({
              submit: !prev.submit
            })) 
          })
        } else {
          this.setState((prev) => ({
            alert: true
          })) 
        }
      }
      format = (title, body, author, category) => {
        this.props.dispatch(addPostPre(title, body, author, category))
      }
    render() {
        const {categories} = this.props.info
        return (
            <div>
            <NavBar />
            {this.state.submit === true &&
            <Redirect to="/" />
            }
            {categories !== undefined &&
            <div>
            
            {this.state.alert === true ? <div className="alert">Please ensure all options are filled in before submitting.</div> : <div></div> }
      
            <div className="addPost">
                <label>Title</label>
                <input onChange={(e) => this.update(e.target.value, e)} 
                name="title"
                value={this.state.title}
                ></input>
                <label>Content</label>
                <input onChange={(e) => this.update(e.target.value, e)} 
                name="body"
                value={this.state.body}
                ></input>
                <label>Category</label>

                <select 
                onChange={(e) => this.update(e.target.value, e)}
                name="category"
                value={this.state.category}>
                <option>Select Category</option>
                {categories.categories.map(x => {
                    return (
                    <option key={x.name}
                    >{x.name}</option>
                    )
                })}
                </select>

                <button 
                onClick={() => this.submit()}
                className="button">Submit</button>
            </div>
            </div>
            }
            </div>
        )
    }
}

export default connect((state) => ({
    info: state.standard,
    user: state.user
}))(addPost)
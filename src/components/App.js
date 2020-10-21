import React from 'react';
import singlePage from './singlePage'
import addPost from './addPost'
import Home from './home'
import Login from './login'
import { connect } from 'react-redux';
import {updatePostsPre} from '../actions/posts'
import {updateCatPre} from '../actions/categories'
import {Route, Redirect, useHistory, useLocation, Switch} from 'react-router-dom'
import {deletePostPre} from '../actions/deletePost'

function LoginPage() {
  let history = useHistory()
  let location = useLocation()
  let {from} = location.state || {from: {pathName: "/"}}
  let login = () => {
      history.replace(from)
  } 
  return (
      <Route exact path='/login'>
          <Login log={login} />  
      </Route> 
  )
}


class App extends React.Component {
  
  componentDidMount() {
    this.props.dispatch(updateCatPre())
    this.props.dispatch(updatePostsPre())
  }
  
  render() {
    const {user} = this.props


    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        user !== null
          ? <Component {...props} />
          : <Redirect to={{
              pathname: '/login',
              state: { from: props.location }
            }} />
      )} />
    )

    return (
      
      <div className="App center">

      {user === null ?
        <div>
        <LoginPage test={this.test}/>
        <PrivateRoute exact path='/' component={Home} />
        <PrivateRoute path='/posts/:id' component={singlePage} />
        <PrivateRoute path='/add' component={addPost} /> 
        </div>
        :
        <div>
        <Route exact path='/' component={Home} />
        <Route path='/posts/:id' component={singlePage} />
        <Route path='/add' component={addPost} /> 
        </div>    
      }
        

      </div>
    )
  }
}

export default connect((state) => ({
    info: state.standard,
    user: state.user
}))(App)

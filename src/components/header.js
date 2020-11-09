import React from 'react';
import {connect} from 'react-redux'

class Header extends React.Component {
    render() {
        const today = new Date(Date.now()).toLocaleString()
        const date = new Date(this.props.time).toLocaleString()
        const diff = Date.now() - this.props.time
        const diffMinutes = (diff / 1000) / 60
        const diffHours = diffMinutes / 60
        const diffDays = diffHours / 24
        const diffMonths = diffDays / 28

        return (
            <div key={this.props.time} className="grey">

              <li><i className="far fa-clock"></i>
              { (diffMinutes < 60) ? Math.round(diffMinutes) + " minutes ago" : (diffHours < 24) ? Math.round(diffHours) + " hours ago" : (diffDays < 28) ? Math.round(diffDays) + " days ago" : "Over " + Math.round(diffMonths) + " months ago" }
              </li>

              <li><i className="fas fa-clipboard-list"></i>{this.props.category}</li>
              <li><i className="fas fa-user"></i>{this.props.author}</li>
              <li><i className="fas fa-comment"></i>{this.props.comments}</li>
            </div>
        )
    }
}

export default connect((state) => ({
    
}))(Header)
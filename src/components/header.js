import React from 'react';
import {connect} from 'react-redux'

class Header extends React.Component {
    render() {

        return (
            <div key={this.props.author} className="grey">
              <li>{this.props.category}</li>
              <li>{this.props.author}</li>
            </div>
        )
    }
}

export default connect((state) => ({
    
}))(Header)
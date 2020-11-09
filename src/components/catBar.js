import React from 'react'
import {connect} from 'react-redux'
import {getSpecificCatPre} from '../actions/categories'

class CatBar extends React.Component {
    handleClick = (e) => {
        console.log(e.target.id)
        this.props.dispatch(getSpecificCatPre(e.target.id))
    }
    render() {
        return (
            <div className={this.props.active === undefined ? "catFlexTwo" : "catFlexThree"} >
                {this.props.info.categories.categories.map(x => {
                   return (
                        <div id={x.name} key={x.name} onClick={(e) => this.handleClick(e)} className="catBtn">
                            {x.name}
                         </div>
                        )
                    })
                }
          </div>
        )
    }
}

export default connect((state) => ({
    info: state.standard,
}))(CatBar)
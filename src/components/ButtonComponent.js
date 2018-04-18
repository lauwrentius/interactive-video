import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import {initSelection} from 'actions'

class ButtonComponent extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  }
  constructor(props){
    super(props)
  }
  buttonClick = (evt) => {
    this.props.initSelection({prevSelection:"RESTART"})
  }
  render(){
    const {playbackState, data} = this.props

    if(!data) return ''
    if(data.in > playbackState.time || data.out < playbackState.time)
      return ''

    return (
      <div className="buttonComponent"
        style={{left:data.x, top:data.y,width:data.w,height:data.h}}
        onClick={this.buttonClick}>
        {data.val}
      </div>
    )
  }
}


function mapStateToProps ({ playbackState }) {
  return {
    playbackState
  }
}

function mapDispatchToProps (dispatch) {
  return {
    initSelection: (data) => dispatch(initSelection(data))
  }
}



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonComponent)

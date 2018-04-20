import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class TextComponent extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  }
  render(){
    const {playbackState, data} = this.props

    if(!data) return ''
    if(data.in > playbackState.time || data.out < playbackState.time)
      return ''

    return (
      <div className="textComponent"
        style={{left:data.x, top:data.y}}>
        {data.val}
      </div>
    )
  }
}


function mapStateToProps ({ playbackState }) {
  return {
    playbackState: playbackState
  }
}

function mapDispatchToProps (dispatch) {
  return {
  }
}



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TextComponent)

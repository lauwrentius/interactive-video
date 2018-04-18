import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import TextComponent from 'components/TextComponent'
import ButtonComponent from 'components/ButtonComponent'
import DragDropComponent from 'components/DragDropComponent'


class Overlays extends Component {
  // static propTypes = {
  //   items: PropTypes.array.isRequired
  // }
  render(){
    const {interactionState} = this.props
    const overlays = (interactionState.overlays)?interactionState.overlays:[]
    // console.log("ASDASDASD",overlays)
    return (
      <div className="overlays">
        {overlays.map((o,i)=>{
          if(o.type === "droppable")
            return(<DragDropComponent key={i} data={o} />)
          if(o.type === "text")
            return(<TextComponent key={i} data={o} />)
          if(o.type === "button"){
            return(<ButtonComponent key={i} data={o} />)
          }
        })}
      </div>
    )
  }
}


function mapStateToProps ({ videoState, interactionState, playbackState }) {
  return {
    videoState,
    interactionState,
    playbackState
  }
}

function mapDispatchToProps (dispatch) {
  return {
  }
}



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Overlays)

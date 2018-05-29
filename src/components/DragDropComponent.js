import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import $ from 'jquery'
import 'jquery-ui/ui/core'
import 'jquery-ui/ui/widgets/draggable'
import 'jquery-ui/ui/widgets/droppable'

import {updateVideo,initSelection} from 'actions'
// import {loadAssetsURL} from 'utils/api'


window.jQuery = window.$ = $;
require('jquery-ui-touch-punch')

// const PHONE_BG = 'images/TMphone60by100.png'
const PHONE_BG = 'https://vmgstudios.blob.core.windows.net/images/TMphone60by100.png'

class DragDropComponent extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  }
  state = {
    dropImg: PHONE_BG
  }
  constructor(props){
    super(props)
    this.dropEl = []
    // loadAssetsURL(PHONE_BG).then(res=>{
    //   this.setState({dropImg:res})
    // })
  }
  componentDidMount(){

    const w = window

    // console.log('-->>>',this.dragEl,w)
    const {initSelection, updateVideo,data,selectionState} = this.props

    $(this.dragEl).draggable({
      containment: "parent"
    })
    this.dropEl.map((o,i)=>{

      if(selectionState.prevSelection === i) return ''

      return $(o).droppable({
        drop: (evt,ui) => {
          const id = data.droppableZone[i].url
          w.parent.postMessage(data.droppableZone[i].val, '*')
          updateVideo(id)
          // loadVideoData(id)
          initSelection({prevSelection:i})
        }
      })
    })
  }
  render(){
    const {playbackState,selectionState, data} = this.props
    const {dropImg} = this.state

    if(!data) return ''
    const hide = (data.in > playbackState.time)?"hidden":""

    return (
      <div className={`dragDropComponent ${hide}`}>
        <div className={"dragEl"}
          ref={el => this.dragEl = el}
          style={{left:`${data.x}px`, top:`${data.y}px`}}>
          { dropImg !== "" &&
            <img src={dropImg} alt="phone" />
          }
        </div>
        {data.droppableZone.map((o,i)=>(
          <div className={"dropEl "+(selectionState.prevSelection === i?"disabled":"")}
            style={{
              left:`${o.x}px`,
              top:`${o.y}px`,
              width:`${o.w}px`,
              height:`${o.h}px`
            }}
            key={`drop-${i}`}
            ref={el=>this.dropEl[i]=el}>
          </div>
        ))}
      </div>
    )
  }
}


function mapStateToProps ({ playbackState,selectionState }) {
  return {
    playbackState,
    selectionState
  }
}

function mapDispatchToProps (dispatch) {
  return {
    updateVideo: (data) => dispatch(updateVideo(data)),
    initSelection: (data) => dispatch(initSelection(data))
  }
}



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DragDropComponent)

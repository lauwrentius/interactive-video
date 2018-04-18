import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import $ from 'jquery'
import 'jquery-ui/ui/core'
import 'jquery-ui/ui/widgets/draggable'
import 'jquery-ui/ui/widgets/droppable'

import {initVideo,initInteraction,initSelection} from 'actions'
import {loadAssetsURL,loadVideoData} from 'utils/api'

const PHONE_BG = 'images/TMphone60by100.png'


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
    loadAssetsURL(PHONE_BG).then(res=>{
      this.setState({dropImg:res})
    })
  }
  componentDidMount(){
    console.log('asdasd',this.dragEl)
    const {initVideo,initInteraction,initSelection,data,selectionState} = this.props

    $(this.dragEl).draggable({
      containment: "parent"
    })
    this.dropEl.map((o,i)=>{

      if(selectionState.prevSelection === i) return

      $(o).droppable({
        drop: (evt,ui) => {
          // console.log("DROPPED", data.droppableZone[i].url)
          const id = data.droppableZone[i].url
          //===========loads VIDEO DATA (end + overlays)
          /*loadVideoData(id).then(res=>{
            console.log('----DROP',res)
            initInteraction(res)
          })

          //===========loads VIDEO URL
          loadAssetsURL(`${id}.mp4`).then(res=>{
            initVideo({
              autoplay: true,
              poster: "",
              sources: [{
                src: res,
                type: 'video/mp4'
              }]
            })
          })*/
          loadVideoData(id)
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
            <img src={dropImg} />
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
            DROP
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
    initVideo: (data) => dispatch(initVideo(data)),
    initInteraction: (data) => dispatch(initInteraction(data)),
    initSelection: (data) => dispatch(initSelection(data))
  }
}



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DragDropComponent)

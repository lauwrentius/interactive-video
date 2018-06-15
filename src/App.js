import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import {initProject} from 'actions'

import VideoPlayer from 'components/VideoPlayer'
import Overlays from 'components/Overlays'

import './App.css';

const PROJECT1_ID = 'video1'

class App extends Component {
  state = {
    title: "",
    entryPoster: "",
    entryVideo: "",
    entyId: ""
  }

  constructor(props) {
    super(props)
    this.initProject()
  }
  initProject = () => {
    const {location,initProject} = this.props
    const {pathname} = location

    const id = pathname.substring(1)===""?PROJECT1_ID:pathname.substring(1)
    initProject(id)
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    if(this.props.selectionState.prevSelection === "RESTART" &&
      prevProps.selectionState.prevSelection !== "RESTART"){
      this.initProject()
    }
  }


  render() {
    return (
      <div className="App" style={{position:'relative'}}>
        <Overlays />
        <VideoPlayer />
{/*
        <span>3QOM99IW6P</span>
        <hr />
        <h4>VIDEO STATE</h4>
        {JSON.stringify(this.props.videoState)}
        <hr />
        <h4>INTERACTION STATE</h4>
        {JSON.stringify(this.props.interactionState)}
        <hr />
        <h4>PLAYBACK STATE</h4>
        {JSON.stringify(this.props.playbackState)}
        <h4>SELECTION STATE</h4>
        {JSON.stringify(this.props.selectionState)}
        */}
      </div>
    )
  }
}

function mapStateToProps ({ videoState, playbackState, interactionState, selectionState }) {
  return {
    videoState,
    interactionState,
    playbackState,
    selectionState
  }
}

/**
* @description Dispatch actions to the store.
*/
function mapDispatchToProps (dispatch) {
  return {
    initProject: (data) => dispatch(initProject(data))
  }
}



export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))

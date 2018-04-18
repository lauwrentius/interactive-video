import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import firebase from 'utils/firebase.js'

import {setVideo,initInteraction,initSelection} from 'actions'

import VideoPlayer from 'components/VideoPlayer'
import Overlays from 'components/Overlays'
import {loadAssetsURL,loadVideoData,loadProjectsData} from 'utils/api'

import './App.css';

const PROJECT1_ID = 'f94712431d8c40d3a13b968d472733fb'

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
    const {location,setVideo,initInteraction,initSelection} = this.props
    const {pathname} = location

    const id = pathname.substring(1)===""?PROJECT1_ID:pathname.substring(1)

    loadProjectsData(id).then(projData=>{
      console.log(projData)

      loadVideoData(projData.entry, projData.poster, false)
      /*this.setState({title: res.title})
      //===========loads POSTER
      loadAssetsURL(res.poster).then(res=>{
        setVideo({poster:res})
        // this.setState({entryPoster:res})
      })
      //===========loads VIDEO URL
      loadAssetsURL(`${res.entry}.mp4`).then(res=>{
        // this.setState({entryVideo:res})
        setVideo({
          autoplay: false,
          sources: [{
            src: res,
            type: 'video/mp4'
          }]
        })
      })*/
      //===========loads VIDEO DATA (end + overlays)
      // loadVideoData(projData.entry).then(videoData=>{
      //   initInteraction(videoData)
      //   setVideo({
      //     poster: projData.poster,
      //     autoplay: false,
      //     sources: [{
      //       src: videoData.url,
      //       type: 'video/mp4'
      //     }]
      //   })
      // })
      initSelection({"prevSelection":null})
    })
  }
  componentDidUpdate(prevProps, prevState, snapshot){
    if(this.props.selectionState.prevSelection === "RESTART" &&
      prevProps.selectionState.prevSelection !== "RESTART"){

      // console.log("RESTART APPP")
      this.initProject()
      // this.props.initSelection({prevSelection:null})
      // setVideo({
      //   poster: this.state.entryPoster
      //   autoplay: false,
      //   sources: [{
      //     src: this.state.entryVideo,
      //     type: 'video/mp4'
      //   }]
      // })
      // loadVideoData(res.entry).then(res=>{
      //   initInteraction(res)
      // })
    }
  }

  // shouldComponentUpdate(nextProps, nextState){
  //   if(nextProps.selectionState.prevSelection === "RESTART"){
  //     initSelection({prevSelection:null})
  //     // this.initProject()
  //     return false
  //   }
  //
  //   return true
  // }

  render() {
    const {title,overlays}=this.state
    return (
      <div className="App" style={{position:'relative'}}>
        <Overlays />
        <VideoPlayer />
        <h3>{title}</h3>
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
      </div>
    );
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
    setVideo: (data) => dispatch(setVideo(data)),
    initInteraction: (data) => dispatch(initInteraction(data)),
    initSelection: (data) => dispatch(initSelection(data))
  }
}



export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))

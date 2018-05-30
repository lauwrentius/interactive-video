import React from 'react'
import { connect } from 'react-redux'

import videojs from 'video.js'
import 'video.js/dist/video-js.min.css'

import { setPlayback,updateVideo } from 'actions'
// import {loadVideoData} from 'utils/api'


class VideoPlayer extends React.Component {
  state = {
    player: null,
    videoJsOptions: {
      autoplay: false,
      controls: true,
      height: 405,
      width: 720,
      textTrackSettings: true,
      bigPlayButton: true,
      controlBar:{
        fullscreenToggle: false,
        remainingTimeDisplay: false,
        progressControl: false
      }
    }
  }

  componentDidMount() {
    // instantiate Video.js
    const {videoJsOptions} = this.state
    const w = window

    const player = videojs(this.videoNode, videoJsOptions, ()=>{
      this.setState({player})


      player.on('timeupdate', () => {
        this.props.setPlayback({time:player.currentTime()})
      })
      player.on('ended', () => {
        const {interactionState,updateVideo} = this.props

        if(interactionState.complete)
          w.parent.postMessage("COMPLETED", '*')


        if(interactionState.end !== null){
          updateVideo(interactionState.end)
        }
      })
    });
  }
  componentDidUpdate(){
    const {player} = this.state
    const {videoState} = this.props

    if(!player) return

    if(videoState.sources){
      // player.reset()
      player.remoteTextTracks().tracks_.map(
        o=>player.removeRemoteTextTrack(o))
      // console.log(player.remoteTextTracks())
      player.src(videoState.sources)
      // let tt = player.remoteTextTracks()
      // tt[0].src = videoState.cc
      if(videoState.cc)
        player.addRemoteTextTrack({
          src: videoState.cc,
          kind: "captions",
          TextTrackMode: "showing",
          label:"en",
          default: true
        }, true)

      if(videoState.autoplay){
        player.play()
      }

    }
  }
  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    const {videoState} = this.props
    // console.log(this.props.videoState)
    // const crossorigin = "anonymus"

    return (
      <div>
        <div data-vjs-player>
          <video
            poster={videoState.poster}
            ref={ node => this.videoNode = node }
            className="video-js">
          </video>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ videoState,interactionState }) {
  return {
    videoState,
    interactionState
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setPlayback: (data) => dispatch(setPlayback(data)),
    updateVideo: (data) => dispatch(updateVideo(data)),
    // initVideo: (data) => dispatch(initVideo(data)),
    // initInteraction: (data) => dispatch(initInteraction(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoPlayer)

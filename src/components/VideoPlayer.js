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
        // remainingTimeDisplay: false,
        // progressControl: false
      }
    }
  }

  componentDidMount() {
    // instantiate Video.js
    const {videoJsOptions} = this.state
    const w = window

    const player = videojs(this.videoNode, videoJsOptions, ()=>{
      this.setState({player})
      player.volume(0.25);
      // player.addRemoteTextTrack({
      //   kind: "captions",
      //   // src: videoState.cc,
      //   TextTrackMode: "showing",
      //   label:"en",
      //   default: false
      // })
      // player.removeChild('BigPlayButton')
      // player.controlBar.fullscreenToggle.hide()

      player.on('timeupdate', () => {
        this.props.setPlayback({time:player.currentTime()})
      })
      player.on('ended', () => {
        const {interactionState,updateVideo} = this.props

        if(interactionState.complete)
          w.parent.postMessage("COMPLETED", '*')

        if(interactionState.end !== undefined){
          updateVideo(interactionState.end)
          // loadVideoData(interactionState.end)

          //===========loads VIDEO URL
          /*loadAssetsURL(`${interactionState.end}.mp4`).then(res=>{
            this.props.initVideo({
              autoplay: true,
              poster: "",
              sources: [{
                src: res,
                type: 'video/mp4'
              }]
            })
          })

          //===========loads VIDEO DATA (end + overlays)
          loadVideoData(interactionState.end).then(res=>{
            console.log("END VIDEO DATA",videoState.end, res)
            this.props.initInteraction(Object.assign({overlays:[]},res))
          })*/
        }
      })
    });
    // console.log(player)
  }
  shouldComponentUpdate(nextProps, nextState){
    const {player} = this.state
    const {videoState} = nextProps


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
    return true
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

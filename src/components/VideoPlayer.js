import React from 'react'
import { connect } from 'react-redux'


// import videojs from 'video.js'

import 'video.js/dist/video-js.min.css'


// import 'videojs-contrib-hls'

import { setPlayback,updateVideo } from 'actions'

// require('dashjs')
// require('videojs-contrib-dash')

class VideoPlayer extends React.Component {
  state = {
    player: null,
    videoJsOptions: {
      autoplay: true,
      controls: true,
      height: 405,
      width: 720,
      textTrackSettings: true,
      bigPlayButton: true,
      controlBar:{
        fullscreenToggle: false,
        remainingTimeDisplay: false,
        // progressControl: false
      }
    }
  }

  componentDidMount() {
    // instantiate Video.js
    const {videoJsOptions} = this.state
    const w = window

    console.log(window)
    const videojs = window.videojs
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

      player.remoteTextTracks().tracks_.map(
        o=>player.removeRemoteTextTrack(o))


      player.src({
        src: videoState.sources[0],
        type: 'application/dash+xml'
      })
      // player.src({
      //   src: 'http://tmobileinteractive-uswe.streaming.media.azure.net/ee1012a9-3ff4-4ef9-abed-5ede1acba871/VMG-Timelapses.ism/manifest(format=mpd-time-csf)',
      //   type: 'application/dash+xml'
      // })
      // player.src({
      //   src: 'http://tmobileinteractive-uswe.streaming.media.azure.net/ee1012a9-3ff4-4ef9-abed-5ede1acba871/VMG-Timelapses.ism/manifest(format=m3u8-aapl)',
      //   type: 'application/x-mpegURL',
      //   withCredentials: true
      // });

      this.props.setPlayback({time:0})


      // if(videoState.cc){
      //   fetch(videoState.cc)
      //     .then(res=>res.json())
      //     .then(res=>{
      //       // console.log(res.length)
      //       const caption = player.addRemoteTextTrack({
      //         kind: "captions",
      //         mode: "showing",
      //         label: "en"
      //       },true)
      //
      //       res.forEach(v=>{
      //         caption.track.addCue(new VTTCue(v.start,v.end,v.part))
      //       })
      //       // console.log(caption.track.cues.cues_.length)
      //
      //     })
      // }


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

  render() {
    const {videoState} = this.props

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

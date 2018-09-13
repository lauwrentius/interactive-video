import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'


import { setPlayback,updateVideo } from 'actions'

// import 'utils/azuremediaplayer.min.css'
// require('https://amp.azure.net/libs/amp/2.1.4/azuremediaplayer.min.js')
// require('https://amp.azure.net/libs/amp/2.1.4/skins/amp-default/azuremediaplayer.min.css')

class AzurePlayer extends React.Component {
  state = {
    player: null,
    timerControl: "false"
  }
  componentDidMount() {
    const myOptions = {
    	"nativeControlsForTouch": true,
    	controls: true,
    	// autoplay: false,
    	width: "720",
    	height: "405",
      // corsPolicy: {Anonymous:"Anonymous", UseCredentials: "UseCredentials"}
    }
    console.log(window.amp.CorsConfig)

    const player = window.amp("azuremediaplayer", myOptions)
    var timerControl = false
    // player.options = window.amp.CorsConfig
    // player.corsPolicy(window.amp.CorsConfig)
    console.log(player.poster, player.corsPolicy)

    if(this.props.location.search === "?controls")
      timerControl = true

    this.setState({player,timerControl})
    player.addEventListener('timeupdate', ()=>{
      this.props.setPlayback({time:player.currentTime()})
    })
    player.addEventListener('ended',()=>{
      const {interactionState,updateVideo} = this.props

      if(interactionState.complete)
        window.parent.postMessage("COMPLETED", '*')

      if(interactionState.end !== null)
        updateVideo(interactionState.end)

    })
  }
  componentDidUpdate(){
    const {player} = this.state
    const {videoState} = this.props

    if(!player) return

    if(videoState.sources){
      const captions = (videoState.captions !== "")?
        [{src:videoState.captions,
          srclang: "en",
          kind: "subtitles",
          label: "english"}]:[]

      const sources = [
        // {src:videoState.sources[0], type: "application/dash+xml"},
        {src:videoState.sources[1], type: "video/mp4"}
      ]

      player.poster(videoState.poster)
      player.autoplay(videoState.autoplay)
      player.src(sources, captions)


      this.props.setPlayback({time:0})

    }
  }

  render() {
    const {timerControl} = this.state
    // console.log(timerControl, timerControlClass)

    return (
      <div className={"Player-video-container " + (!timerControl?"hideTimerControl":"")}>
        <video
          id="azuremediaplayer"
          className="azuremediaplayer amp-default-skin"
          tabIndex="0"
          ref={(input) => { this.videoRef = input; }}
        />
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

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(AzurePlayer))

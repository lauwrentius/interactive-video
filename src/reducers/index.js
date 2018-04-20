import { combineReducers } from 'redux'
import { INIT_PROJECT, UPDATE_VIDEO, INIT_VIDEO, SET_VIDEO, INIT_INTERACTION, SET_INTERACTION, SET_PLAYBACK,INIT_SELECTION } from 'actions'

// poster: projData.poster,
//   //     autoplay: false,
//   //     sources: [{
//   //       src: videoData.url,
//   //       type: 'video/mp4'

function videoState (state = {}, action) {
  const {obj} = action

  switch (action.type){
    case INIT_PROJECT:
      return {
          poster: obj.poster,
          autoplay:false,
          cc: obj.cc,
          sources:[{
            src: obj.url,
            type: 'video/mp4'
          }]
        }
    case UPDATE_VIDEO:
      return {
        poster: '',
        autoplay: true,
        cc: obj.cc,
        sources:[{
          src: obj.url,
          type: 'video/mp4'
        }]
      }

    case INIT_VIDEO:
      return Object.assign({},action.video)
    case SET_VIDEO:
      return Object.assign({},state,action.video)
    default:
      return state
  }
}

function interactionState (state = {overlays:[]}, action) {
  const {obj} = action
  switch (action.type){
    case INIT_PROJECT:
      return {overlays:obj.overlays}

    case UPDATE_VIDEO:
      return {...action.obj}

    case INIT_INTERACTION:
      return Object.assign({},action.interaction)
    case SET_INTERACTION:
      return Object.assign({},state,action.interaction)
    default:
      return state
  }
}

function playbackState (state = {time:0}, action) {
  switch (action.type){
    case INIT_PROJECT:
      return {"time":null}
    case UPDATE_VIDEO:
      return {"time":null}
    case SET_PLAYBACK:
      return {...action.playback}

    default:
      return state
  }
}

function selectionState (state = {prevSelection:null}, action) {
  switch (action.type){
    case INIT_PROJECT:
      return {"prevSelection":null}

    case INIT_SELECTION:
      return Object.assign(action.selection)
    default:
      return state
  }
}

export default combineReducers({
  videoState,
  interactionState,
  playbackState,
  selectionState
})

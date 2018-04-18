import { combineReducers } from 'redux'
import { INIT_VIDEO, SET_VIDEO, INIT_INTERACTION, SET_INTERACTION, SET_PLAYBACK,INIT_SELECTION } from 'actions'

function videoState (state = {}, action) {
  switch (action.type){
    case INIT_VIDEO:
      return Object.assign({},action.video)
    case SET_VIDEO:
      return Object.assign({},state,action.video)
    default:
      return state
  }
}

function interactionState (state = {overlays:[]}, action) {
  switch (action.type){
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
    case SET_PLAYBACK:
      return Object.assign({},action.playback)
    default:
      return state
  }
}

function selectionState (state = {prevSelection:null}, action) {
  switch (action.type){
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

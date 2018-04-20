import {loadVideoData,loadProjectsData} from 'utils/api'

export const INIT_PROJECT = 'INIT_PROJECT'
export const UPDATE_VIDEO = 'UPDATE_VIDEO'

export const INIT_VIDEO = 'INIT_VIDEO'
export const SET_VIDEO = 'SET_VIDEO'
export const INIT_INTERACTION = 'INIT_INTERACTION'
export const SET_INTERACTION = 'SET_INTERACTION'
export const SET_PLAYBACK = 'SET_PLAYBACK'
export const INIT_SELECTION = 'INIT_SELECTION'

export function initProject(id){
  return (dispatch) => {
    loadProjectsData(id).then(projData=>{
      loadVideoData(projData.entry).then(videoData=>{
        dispatch(asyncCallback(INIT_PROJECT, {...projData,...videoData}))
      })
    })
  }
}

export function updateVideo(id){
  return (dispatch) => {
    loadVideoData(id).then(res=>{
      dispatch(asyncCallback(UPDATE_VIDEO, {...res}))
    })
  }
}

export function initSelection(selection) {
  return {
    type: INIT_SELECTION,
    selection
  }
}

export function setPlayback(playback) {
  return {
    type: SET_PLAYBACK,
    playback
  }
}

/*
export function initVideo(video) {
  return {
    type: INIT_VIDEO,
    video
  }
}
export function setVideo(video) {
  return {
    type: SET_VIDEO,
    video
  }
}

export function initInteraction(interaction) {
  return {
    type: INIT_INTERACTION,
    interaction
  }
}
export function setInteraction(interaction) {
  return {
    type: SET_INTERACTION,
    interaction
  }
}
*/


function asyncCallback(type, obj){
  return {type, obj}
}

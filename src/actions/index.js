import {loadVideoData,loadProjectsData} from 'utils/api'

export const INIT_PROJECT = 'INIT_PROJECT'
export const UPDATE_VIDEO = 'UPDATE_VIDEO'
export const SET_PLAYBACK = 'SET_PLAYBACK'
export const INIT_SELECTION = 'INIT_SELECTION'

export function initProject(id){
  return (dispatch) => {
    const projData = loadProjectsData(id)

    const videoData = loadVideoData(projData.entry)
    // console.log( {...projData,...videoData} )
    dispatch(asyncCallback(INIT_PROJECT, {...projData,...videoData}))

    // loadProjectsData(id).then(projData=>{
    //   loadVideoData(projData.entry).then(videoData=>{
    //     dispatch(asyncCallback(INIT_PROJECT, {...projData,...videoData}))
    //   })
    // })
  }
}

export function updateVideo(id){
  return (dispatch) => {
    const videoData = loadVideoData(id)
    dispatch(asyncCallback(UPDATE_VIDEO, {...videoData}))

    // loadVideoData(id).then(res=>{
    //   dispatch(asyncCallback(UPDATE_VIDEO, {...res}))
    // })
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

function asyncCallback(type, obj){
  return {type, obj}
}

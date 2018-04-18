export const INIT_VIDEO = 'INIT_VIDEO'
export const SET_VIDEO = 'SET_VIDEO'
export const INIT_INTERACTION = 'INIT_INTERACTION'
export const SET_INTERACTION = 'SET_INTERACTION'
export const SET_PLAYBACK = 'SET_PLAYBACK'
export const INIT_SELECTION = 'INIT_SELECTION'

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
export function setPlayback(playback) {
  return {
    type: SET_PLAYBACK,
    playback
  }
}
export function initSelection(selection) {
  return {
    type: INIT_SELECTION,
    selection
  }
}

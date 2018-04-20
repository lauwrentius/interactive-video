import firebase from 'utils/firebase.js'

export function loadAssetsURL(ref){
  return firebase.storage().ref(ref).getDownloadURL()
}

export function loadProjectsData(id){
  const db = firebase.database().ref()
  return db.child(`/projects/${id}`)
    .once('value').then(res=>res.val())
}

export function loadVideoData(id){
  const db = firebase.database().ref()
  return db.child(`/videos/${id}`)
    .once('value')
    .then(res=>res.val())
}

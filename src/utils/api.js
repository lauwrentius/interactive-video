// import firebase from 'utils/firebase.js'
import * as json_data from './data.json'

export function loadAssetsURL(ref){
  // return firebase.storage().ref(ref).getDownloadURL()
  return null
}

export function loadProjectsData(id){
  return json_data['projects'][id]

  // const db = firebase.database().ref()
  // return db.child(`/projects/${id}`)
  //   .once('value').then(res=>res.val())
}

export function loadVideoData(id){
  console.log(json_data['videos'][id])
  return json_data['videos'][id]

  // const db = firebase.database().ref()
  // return db.child(`/videos/${id}`)
  //   .once('value')
  //   .then(res=>res.val())
}

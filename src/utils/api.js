import firebase from 'utils/firebase.js'
import {store} from "index";

import {setVideo,initInteraction,initSelection} from 'actions'


export function loadAssetsURL(ref){
  return firebase.storage().ref(ref).getDownloadURL()
}

export function loadProjectsData(id){
  const db = firebase.database().ref()
  return db.child(`/projects/${id}`)
    .once('value').then(res=>res.val())
}

export function loadVideoData(id,poster="", autoplay="true"){
  const db = firebase.database().ref()
  db.child(`/videos/${id}`)
    .once('value')
    .then(res=>res.val())
    .then(res=>{
      console.log("****",res)
      const {overlays, end, cc} = res
      store.dispatch(initInteraction({overlays, end}))
      store.dispatch(setVideo({
        poster,
        autoplay,
        cc,
        sources: [{
          src: res.url,
          type: 'video/mp4'
        }]
      }))
    })
}
/*
db.child(`/projects/${id}`)
  .once('value', proj=>{
    db.child(`/videos/${proj.child('entry').val()}`)
      .once('value',res=>{
        const vid = res.val()
        this.setState({title: vid.title})
        setVideo({overlays:vid.overlays})
        loadAssets(proj.val().poster).then(res=>{
          setVideo({poster: res})
        })
        console.log()
        loadAssets(`${vid.url}.mp4`).then(res=>{
          setVideo({
            autoplay: false,
            sources: [{
              src: res,
              type: 'video/mp4'
            }]
          })
        })
      })
  })*/

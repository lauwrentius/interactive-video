import firebase from 'firebase'
const config = {
  apiKey: "AIzaSyCWujCT7hVyQu5vjFvYSkxWpnpn8eGfopc",
  authDomain: "t-mobile-interactive.firebaseapp.com",
  databaseURL: "https://t-mobile-interactive.firebaseio.com",
  projectId: "t-mobile-interactive",
  storageBucket: "t-mobile-interactive.appspot.com",
  messagingSenderId: "568820660280"
};
firebase.initializeApp(config);
export default firebase;

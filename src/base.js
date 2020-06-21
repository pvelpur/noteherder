import Rebase from 're-base'
import firebase from 'firebase/app'
import database from 'firebase/database'

const app = firebase.initializeApp({
    apiKey: "AIzaSyAYHm0JbojejaiG-pTLDtQRXMB_N0-inu8",
    authDomain: "noteherder-128d1.firebaseapp.com",
    databaseURL: "https://noteherder-128d1.firebaseio.com",
    projectId: "noteherder-128d1",
    storageBucket: "noteherder-128d1.appspot.com",
    messagingSenderId: "988280756198",
  })

const db = firebase.database(app)

export default Rebase.createClass(db)